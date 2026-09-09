package com.school.exam;

import com.school.exam.Question;
import com.school.exam.QuestionService;
import com.school.auth.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public/quizzes")
public class QuizApiController {

        private QuestionService questionService;
        private QuizAttemptRepository quizAttemptRepository;

    public QuizApiController(QuestionService questionService, QuizAttemptRepository quizAttemptRepository) {
        this.questionService = questionService;
        this.quizAttemptRepository = quizAttemptRepository;
    }


    @GetMapping("/practice")
    public List<Question> getPracticeQuestions(
            @RequestParam String subjectId,
            @RequestParam(defaultValue = "QUIZ") String category,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) List<String> excludeIds) {
        
        List<Question> questions = questionService.getQuestionsBySubjectCategoryAndDifficulty(subjectId, category, difficulty);
        
        // Filter out already seen questions
        if (excludeIds != null && !excludeIds.isEmpty()) {
            questions.removeIf(q -> excludeIds.contains(q.getId()));
        }
        
        // Shuffle to randomize questions each time
        Collections.shuffle(questions);
        
        // Determine the limit based on the category


        int limit = 20; // default
        if ("UE".equalsIgnoreCase(category)) {
            limit = 50;
        } else if (category != null && category.toUpperCase().startsWith("CAT")) {
            limit = 17;
        } else if ("POSSIBLE".equalsIgnoreCase(category)) {
            limit = 25;
        } else if ("EXERCISE".equalsIgnoreCase(category)) {
            limit = 30;
        } else if ("QUIZ".equalsIgnoreCase(category)) {
            limit = 15;
        }
        
        // Limit to the specified amount per session
        if (questions.size() > limit) {
            return questions.subList(0, limit);
        }
        
        return questions;
    }

    // Powers the "My Progress" page — called once from the results screen
    // when a logged-in student finishes a practice session. Guests aren't
    // tracked (nothing to attach the attempt to); the client already knows
    // not to call this when isGuest, but the 401 here is the real guard.
    @PostMapping("/attempt")
    public ResponseEntity<?> saveAttempt(@RequestBody Map<String, Object> body, HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String subjectId = body.get("subjectId") != null ? body.get("subjectId").toString() : null;
        if (subjectId == null || subjectId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }
        int totalQuestions = asInt(body.get("totalQuestions"), 0);
        if (totalQuestions <= 0) {
            return ResponseEntity.badRequest().build();
        }
        // Clamp rather than trust: this only ever affects the submitting
        // student's own stats, but a garbage/negative score would still
        // corrupt their own accuracy numbers and streak display.
        int score = Math.max(0, Math.min(asInt(body.get("score"), 0), totalQuestions));
        long timeTakenSeconds = Math.max(0, asInt(body.get("timeTakenSeconds"), 0));

        QuizAttempt attempt = new QuizAttempt();
        attempt.setUserId(user.getId());
        attempt.setSubjectId(subjectId);
        attempt.setCategory(body.get("category") != null ? body.get("category").toString() : null);
        attempt.setDifficulty(body.get("difficulty") != null ? body.get("difficulty").toString() : null);
        attempt.setScore(score);
        attempt.setTotalQuestions(totalQuestions);
        attempt.setTimeTakenSeconds(timeTakenSeconds);
        attempt.setAttemptDate(LocalDateTime.now()); // server clock, never client-supplied — keeps streaks honest
        quizAttemptRepository.save(attempt);

        return ResponseEntity.ok().build();
    }

    private int asInt(Object value, int fallback) {
        if (value == null) return fallback;
        try {
            return (int) Double.parseDouble(value.toString());
        } catch (NumberFormatException e) {
            return fallback;
        }
    }
}
