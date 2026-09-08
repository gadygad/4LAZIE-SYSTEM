package com.school.admin;

import com.school.exam.Question;
import com.school.academic.Subject;
import com.school.exam.QuestionService;
import com.school.academic.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Controller
@RequestMapping("/admin/questions")
public class AdminQuestionController {

        private QuestionService questionService;

        private SubjectRepository subjectRepository;

    public AdminQuestionController(QuestionService questionService, SubjectRepository subjectRepository) {
        this.questionService = questionService;
        this.subjectRepository = subjectRepository;
    }


    @GetMapping
    public String listQuestions(Model model) {
        List<Subject> subjects = subjectRepository.findAll();
        model.addAttribute("subjects", subjects);
        // By default we can load an empty list or latest questions,
        // but for now we'll just show the subject selector in the UI
        return "admin/questions";
    }

    // Every subject still missing one or more of the 5 practice-question
    // categories, so the admin doesn't have to remember which subjects
    // they've already fully stocked and which are still incomplete.
    @GetMapping("/gaps")
    public String contentGaps(Model model) {
        List<Subject> subjects = subjectRepository.findAll();
        Map<String, Set<String>> present = questionService.getCategoriesPresentBySubjectId();

        List<SubjectGap> gaps = new ArrayList<>();
        for (Subject s : subjects) {
            List<String> missing = questionService.getMissingCategories(s.getId(), present);
            if (!missing.isEmpty()) {
                gaps.add(new SubjectGap(s, missing));
            }
        }
        gaps.sort(Comparator
                .comparing((SubjectGap g) -> g.getSubject().getLevelNo() == null ? 0 : g.getSubject().getLevelNo())
                .thenComparing(g -> g.getSubject().getSemesterNo() == null ? 0 : g.getSubject().getSemesterNo())
                .thenComparing(g -> g.getSubject().getName() == null ? "" : g.getSubject().getName()));

        model.addAttribute("gaps", gaps);
        model.addAttribute("totalSubjects", subjects.size());
        return "admin/admin_content_gaps";
    }

    public static class SubjectGap {
        private final Subject subject;
        private final List<String> missingCategories;
        public SubjectGap(Subject subject, List<String> missingCategories) {
            this.subject = subject;
            this.missingCategories = missingCategories;
        }
        public Subject getSubject() { return subject; }
        public List<String> getMissingCategories() { return missingCategories; }
    }

    @PostMapping("/add")
    public String addQuestion(@ModelAttribute Question question, RedirectAttributes redirectAttributes) {
        try {
            questionService.saveQuestion(question);
            redirectAttributes.addFlashAttribute("successMessage", "Question saved successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error saving question: " + e.getMessage());
        }
        return "redirect:/admin/questions";
    }

    @PostMapping("/delete/{id}")
    public String deleteQuestion(@PathVariable String id, RedirectAttributes redirectAttributes) {
        try {
            questionService.deleteQuestion(id);
            redirectAttributes.addFlashAttribute("successMessage", "Question deleted successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("errorMessage", "Error deleting question: " + e.getMessage());
        }
        return "redirect:/admin/questions";
    }
}
