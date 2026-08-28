package com.school.config;

import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.notification.NotificationService;
import com.school.chat.DirectChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalModelAttributes {

    private static final Logger log = LoggerFactory.getLogger(GlobalModelAttributes.class);

        private NotificationService notificationService;
    
        private UserRepository userRepository;

        private DirectChatService directChatService;

    public GlobalModelAttributes(NotificationService notificationService, UserRepository userRepository, DirectChatService directChatService) {
        this.notificationService = notificationService;
        this.userRepository = userRepository;
        this.directChatService = directChatService;
    }


    @ModelAttribute
    public void addGlobalAttributes(HttpServletRequest request, org.springframework.ui.Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        // We only want to add these attributes if the user is authenticated and not anonymous
        if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
            try {
                String email = auth.getName();
                User user = null;

                // Primary: exact email match
                try {
                    user = userRepository.findByEmail(email).orElse(null);
                } catch (Exception e) {
                    log.warn("findByEmail failed in GlobalModelAttributes for '{}': {}", email, e.getMessage());
                }

                // Fallback: case-insensitive
                if (user == null) {
                    try {
                        user = userRepository.findFirstByEmailIgnoreCaseOrNameIgnoreCase(email, email).orElse(null);
                    } catch (Exception e) {
                        log.warn("Case-insensitive lookup failed in GlobalModelAttributes for '{}': {}", email, e.getMessage());
                    }
                }

                if (user != null) {
                    // Ensure the user object is globally available, overriding session attributes if needed
                    model.addAttribute("user", user);
                    
                    // Add notification details
                    try {
                        java.util.List<com.school.notification.Notification> allNotifs = notificationService.getUserNotifications(user.getId());
                        java.util.List<com.school.notification.Notification> recentNotifs = allNotifs.stream().limit(10).toList();
                        model.addAttribute("notifications", recentNotifs);
                        model.addAttribute("unreadNotificationCount", notificationService.getUnreadCount(user.getId()));
                        
                        // Add DirectChat unread counts globally
                        if (user.getRole() != null && (user.getRole().name().equals("ADMIN") || user.getRole().name().equals("SUPER_ADMIN"))) {
                            model.addAttribute("totalUnreadAdmin", directChatService.getTotalUnreadForAdmin());
                        } else {
                            model.addAttribute("totalUnreadStudent", directChatService.getUnreadCountForStudent(user.getId()));
                        }
                    } catch (Exception e) {
                        log.warn("Failed to load notifications for user '{}': {}", email, e.getMessage());
                        model.addAttribute("notifications", java.util.Collections.emptyList());
                        model.addAttribute("unreadNotificationCount", 0);
                        model.addAttribute("totalUnreadAdmin", 0);
                        model.addAttribute("totalUnreadStudent", 0);
                    }
                }
            } catch (Exception e) {
                // Ignore database connection error to allow pages to load for authenticated users
                log.warn("Failed to add global attributes: {}", e.getMessage());
            }
        }
    }
}

