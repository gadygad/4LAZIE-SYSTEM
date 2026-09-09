package com.school.exam;

import com.school.academic.Subject;
import com.school.academic.SubjectRepository;
import com.school.auth.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.stream.Collectors;

// "My Progress" — the student-facing counterpart to every quiz attempt now
// being persisted (see QuizApiController.saveAttempt). Turns what used to be
// a one-time "Practice Complete!" screen into something a student has a
// reason to come back and check: a streak, overall accuracy, and which
// subjects need more work.
@Controller
public class QuizProgressController {

    private final QuizAttemptRepository quizAttemptRepository;
    private final SubjectRepository subjectRepository;

    public QuizProgressController(QuizAttemptRepository quizAttemptRepository, SubjectRepository subjectRepository) {
        this.quizAttemptRepository = quizAttemptRepository;
        this.subjectRepository = subjectRepository;
    }

    public static class SubjectStat {
        private final String subjectName;
        private final int attempts;
        private final int correct;
        private final int total;

        public SubjectStat(String subjectName, int attempts, int correct, int total) {
            this.subjectName = subjectName;
            this.attempts = attempts;
            this.correct = correct;
            this.total = total;
        }

        public String getSubjectName() { return subjectName; }
        public int getAttempts() { return attempts; }
        public int getAccuracy() { return total > 0 ? (int) Math.round(100.0 * correct / total) : 0; }
    }

    @GetMapping("/progress")
    public String myProgress(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        }

        List<QuizAttempt> attempts = quizAttemptRepository.findTop200ByUserIdOrderByAttemptDateDesc(user.getId());

        int totalAttempts = attempts.size();
        int totalCorrect = attempts.stream().mapToInt(QuizAttempt::getScore).sum();
        int totalQuestions = attempts.stream().mapToInt(QuizAttempt::getTotalQuestions).sum();
        int overallAccuracy = totalQuestions > 0 ? (int) Math.round(100.0 * totalCorrect / totalQuestions) : 0;
        int streak = computeStreak(attempts);

        // Batch-resolve subject names in one query instead of one lookup per
        // attempt (or per distinct subject) — the exact N+1 shape fixed
        // elsewhere in this app earlier tonight.
        Set<String> subjectIds = attempts.stream().map(QuizAttempt::getSubjectId)
                .filter(id -> id != null && !id.isBlank())
                .collect(Collectors.toSet());
        Map<String, String> subjectNames = new HashMap<>();
        for (Subject s : subjectRepository.findAllById(subjectIds)) {
            subjectNames.put(s.getId(), s.getName());
        }

        Map<String, int[]> bySubject = new HashMap<>(); // subjectId -> [attempts, correct, total]
        for (QuizAttempt a : attempts) {
            if (a.getSubjectId() == null) continue;
            int[] agg = bySubject.computeIfAbsent(a.getSubjectId(), k -> new int[3]);
            agg[0]++;
            agg[1] += a.getScore();
            agg[2] += a.getTotalQuestions();
        }
        List<SubjectStat> subjectStats = new ArrayList<>();
        for (Map.Entry<String, int[]> e : bySubject.entrySet()) {
            String name = subjectNames.getOrDefault(e.getKey(), "Unknown Subject");
            int[] agg = e.getValue();
            subjectStats.add(new SubjectStat(name, agg[0], agg[1], agg[2]));
        }
        // Weakest first — that's the whole point of surfacing this at all.
        subjectStats.sort(Comparator.comparingInt(SubjectStat::getAccuracy));

        List<QuizAttempt> recentAttempts = attempts.size() > 10 ? attempts.subList(0, 10) : attempts;

        model.addAttribute("totalAttempts", totalAttempts);
        model.addAttribute("overallAccuracy", overallAccuracy);
        model.addAttribute("streak", streak);
        model.addAttribute("subjectStats", subjectStats);
        model.addAttribute("recentAttempts", recentAttempts);
        model.addAttribute("subjectNames", subjectNames);
        return "user/progress";
    }

    // Consecutive calendar days with at least one attempt, anchored at today
    // or yesterday — anchoring at yesterday too means the streak doesn't
    // drop to zero the instant midnight passes, before a student has had a
    // chance to practice today.
    private int computeStreak(List<QuizAttempt> attemptsDesc) {
        TreeSet<LocalDate> days = new TreeSet<>(Comparator.reverseOrder());
        for (QuizAttempt a : attemptsDesc) {
            if (a.getAttemptDate() != null) {
                days.add(a.getAttemptDate().toLocalDate());
            }
        }
        if (days.isEmpty()) return 0;

        LocalDate today = LocalDate.now();
        LocalDate mostRecent = days.first();
        if (!mostRecent.equals(today) && !mostRecent.equals(today.minusDays(1))) {
            return 0;
        }

        int streak = 1;
        LocalDate cursor = mostRecent;
        for (LocalDate day : days) {
            if (day.equals(cursor)) continue;
            if (day.equals(cursor.minusDays(1))) {
                streak++;
                cursor = day;
            } else {
                break;
            }
        }
        return streak;
    }
}
