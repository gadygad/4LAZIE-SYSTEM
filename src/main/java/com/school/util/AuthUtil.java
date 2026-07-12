package com.school.util;

import com.school.model.User;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class AuthUtil {

    private static final Logger log = LoggerFactory.getLogger(AuthUtil.class);

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

        // Primary lookup: exact email match
        try {
            user = userRepository.findByEmail(email).orElse(null);
        } catch (Exception e) {
            log.warn("Failed to load user by exact email '{}': {}", email, e.getMessage());
        }

        // Fallback: case-insensitive lookup if exact match failed
        if (user == null) {
            try {
                user = userRepository.findFirstByEmailIgnoreCaseOrNameIgnoreCase(email, email).orElse(null);
            } catch (Exception e) {
                log.warn("Failed to load user by case-insensitive email '{}': {}", email, e.getMessage());
            }
        }

        if (user == null) {
            log.warn("Could not find user for authenticated principal: {}", email);
            return null;
        }

        // Auto-promote first ADMIN to SUPER_ADMIN if no SUPER_ADMIN exists
        if (user.getRole() == com.school.model.Role.ADMIN) {
            try {
                long superAdminCount = userRepository.countByRole(com.school.model.Role.SUPER_ADMIN);
                if (superAdminCount == 0) {
                    user.setRole(com.school.model.Role.SUPER_ADMIN);
                    userRepository.save(user);
                    log.info("Auto-promoted user '{}' to SUPER_ADMIN (no existing SUPER_ADMIN found)", email);
                }
            } catch (Exception e) {
                log.warn("Failed to check/promote SUPER_ADMIN status: {}", e.getMessage());
                // Don't return null here - user is still valid, just couldn't auto-promote
            }
        }

        return user;
    }
}

