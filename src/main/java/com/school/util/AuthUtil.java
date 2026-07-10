package com.school.util;

import com.school.model.User;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class AuthUtil {

    @Autowired
    private UserRepository userRepository;

    public User getLoggedInUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth instanceof AnonymousAuthenticationToken || "anonymousUser".equals(auth.getPrincipal())) {
            return null;
        }

        Object principal = auth.getPrincipal();
        String email;

        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            email = (String) principal;
        } else {
            return null;
        }

        User user = null;
        try {
            user = userRepository.findByEmail(email).orElse(null);
        } catch (Exception e) {
            // Handle corrupted user data (e.g., invalid Role enum in database)
            org.slf4j.LoggerFactory.getLogger(AuthUtil.class)
                .warn("Failed to load user by email '{}': {}", email, e.getMessage());
            return null;
        }
        if (user != null && user.getRole() == com.school.model.Role.ADMIN) {
            // Auto-promote to SUPER_ADMIN if no SUPER_ADMIN exists in the system
            try {
                long superAdminCount = userRepository.countByRole(com.school.model.Role.SUPER_ADMIN);
                if (superAdminCount == 0) {
                    user.setRole(com.school.model.Role.SUPER_ADMIN);
                    userRepository.save(user);
                }
            } catch (Exception e) {
                org.slf4j.LoggerFactory.getLogger(AuthUtil.class)
                    .warn("Failed to count SUPER_ADMIN users: {}", e.getMessage());
            }
        }
        return user;
    }
}
