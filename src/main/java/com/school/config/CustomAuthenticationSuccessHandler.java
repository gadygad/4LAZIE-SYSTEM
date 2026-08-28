package com.school.config;

import com.school.auth.Role;
import com.school.auth.User;
import com.school.auth.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Optional;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private static final Logger log = LoggerFactory.getLogger(CustomAuthenticationSuccessHandler.class);

        private UserRepository userRepository;

    public CustomAuthenticationSuccessHandler(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        
        String email = authentication.getName();
        User user = null;

        // Primary lookup
        try {
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isPresent()) {
                user = userOpt.get();
            }
        } catch (Exception e) {
            log.warn("findByEmail failed for '{}': {}", email, e.getMessage());
        }

        // Fallback: case-insensitive lookup
        if (user == null) {
            try {
                Optional<User> userOpt = userRepository.findFirstByEmailIgnoreCaseOrNameIgnoreCase(email, email);
                if (userOpt.isPresent()) {
                    user = userOpt.get();
                }
            } catch (Exception e) {
                log.warn("Case-insensitive lookup failed for '{}': {}", email, e.getMessage());
            }
        }
        
        if (user != null) {
            try {
                user.setLastLoginTime(java.time.LocalDateTime.now());
                userRepository.save(user);
            } catch (Exception e) {
                log.warn("Failed to update lastLoginTime for '{}': {}", email, e.getMessage());
            }

            HttpSession session = request.getSession();
            session.setAttribute("user", user);
            
            boolean isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_" + com.school.auth.Role.ADMIN.name()) || 
                                   a.getAuthority().equals("ROLE_" + com.school.auth.Role.SUPER_ADMIN.name()));
                    
            String redirectUrl = (String) session.getAttribute("redirectUrl");
            if (redirectUrl != null && !redirectUrl.isEmpty()) {
                session.removeAttribute("redirectUrl");
                response.sendRedirect(redirectUrl);
                return;
            }

            if (isAdmin) {
                response.sendRedirect("/admin/dashboard");
                return;
            }
            response.sendRedirect("/dashboard");
        } else {
            // User authenticated by Spring Security but not found in DB (phantom session)
            log.error("Authenticated user '{}' not found in database", email);
            request.getSession().invalidate();
            org.springframework.security.core.context.SecurityContextHolder.clearContext();
            response.sendRedirect("/login?error=true");
        }
    }
}

