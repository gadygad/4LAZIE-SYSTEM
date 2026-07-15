package com.school.controller;

import com.school.model.User;
import com.school.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

@ControllerAdvice
public class GlobalControllerAdvice {

    @Autowired
    private AuthUtil authUtil;

    @ModelAttribute("loggedInUser")
    public User getLoggedInUser() {
        return authUtil.getLoggedInUser();
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    public String handleException(Exception ex, org.springframework.ui.Model model) {
        ex.printStackTrace(); // Log exact trace
        model.addAttribute("errorMessage", "Error: " + ex.toString());
        return "error";
    }
}
