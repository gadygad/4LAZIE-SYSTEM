package com.school.controller;

import com.school.model.User;
import com.school.util.AuthUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@ControllerAdvice
public class GlobalControllerAdvice {

    private static final Logger log = LoggerFactory.getLogger(GlobalControllerAdvice.class);

        private AuthUtil authUtil;

    public GlobalControllerAdvice(AuthUtil authUtil) {
        this.authUtil = authUtil;
    }


    @org.springframework.beans.factory.annotation.Value("${google.client.id:}")
    private String googleClientId;

    @ModelAttribute("loggedInUser")
    public User getLoggedInUser() {
        return authUtil.getLoggedInUser();
    }

    @ModelAttribute("googleClientId")
    public String getGoogleClientId() {
        return googleClientId;
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    public String handleException(Exception ex, org.springframework.ui.Model model) {
        log.error("An unexpected error occurred", ex); // Securely log the exact trace internally
        model.addAttribute("errorMessage", "An unexpected error occurred. Please try again later or contact support if the issue persists.");
        return "error";
    }
}
