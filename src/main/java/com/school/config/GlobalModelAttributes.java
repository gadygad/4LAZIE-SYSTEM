package com.school.config;

import com.school.model.User;
import com.school.repository.UserRepository;
import com.school.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalModelAttributes {

    @Autowired
    private NotificationService notificationService;
    
    @Autowired
    private UserRepository userRepository;

    @ModelAttribute
    public void addGlobalAttributes(HttpServletRequest request, org.springframework.ui.Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        // We only want to add these attributes if the user is authenticated and not anonymous
        if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
            try {
                String email = auth.getName();
                userRepository.findByEmail(email).ifPresent(user -> {
                    // Ensure the user object is globally available, overriding session attributes if needed
                    model.addAttribute("user", user);
                    
                    // Add notification details
                    model.addAttribute("notifications", notificationService.getUserNotifications(user.getId()));
                    model.addAttribute("unreadNotificationCount", notificationService.getUnreadCount(user.getId()));
                });
            } catch (Exception e) {
                // Ignore database connection error to allow pages to load for authenticated users
            }
        }
    }
}
