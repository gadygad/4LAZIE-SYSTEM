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

import java.util.List;

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
