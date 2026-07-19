package com.school.controller;

import com.school.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import java.security.Principal;

@Controller
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping
    public String showQuizzesHub(Model model, Principal principal) {
        boolean isGuest = (principal == null);
        model.addAttribute("isGuest", isGuest);
        
        if (!isGuest) {
            model.addAttribute("username", principal.getName());
        }
        
        model.addAttribute("subjects", subjectRepository.findAll());
        return "quizzes/list";
    }
}
