package com.school.controller;

import com.school.model.Role;
import com.school.model.User;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExamGeneratorController {

    @Autowired
    private UserRepository userRepository;

    private User getLoggedInUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return null;
        }
        return userRepository.findByEmail(auth.getName()).orElse(null);
    }

    /**
     * Hub page — choose university / institution
     * URL: /generator-hub
     */
    @GetMapping("/generator-hub")
    public String showGeneratorHub(Model model) {
        User user = getLoggedInUser();
        model.addAttribute("user", user);
        model.addAttribute("activePage", "generator");
        return "notes/generator_hub";
    }

    /**
     * Actual exam builder page
     * URL: /generate-exam
     */
    @GetMapping("/generate-exam")
    public String showGenerateExam(Model model) {
        User user = getLoggedInUser();
        model.addAttribute("user", user);
        model.addAttribute("activePage", "generator");
        return "notes/generate_exam";
    }

    /**
     * SJUIT Diploma UE Exam builder page
     * URL: /generate-exam/sjuit-diploma-ue
     */
    @GetMapping("/generate-exam/sjuit-diploma-ue")
    public String showSjuitDiplomaUeExam(Model model) {
        User user = getLoggedInUser();
        model.addAttribute("user", user);
        model.addAttribute("activePage", "generator");
        return "notes/sjuit_diploma_ue";
    }
}

