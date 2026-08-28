package com.school.config;

import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.core.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class LoginSuccessListener implements ApplicationListener<AuthenticationSuccessEvent> {

        private HttpServletRequest request;

        private EmailService emailService;

        private UserRepository userRepository;

    public LoginSuccessListener(HttpServletRequest request, EmailService emailService, UserRepository userRepository) {
        this.request = request;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }


    @Override
    public void onApplicationEvent(AuthenticationSuccessEvent event) {
        Authentication authentication = event.getAuthentication();
        
        if (authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername(); // We use email as principal name
            
            // Get IP Address
            String ipAddress = request.getHeader("X-Forwarded-For");
            if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getRemoteAddr();
            }
            
            // Get Device details (User-Agent)
            String userAgent = request.getHeader("User-Agent");
            if (userAgent == null) {
                userAgent = "Unknown Device";
            }
            
            Optional<User> userOpt = userRepository.findFirstByEmailIgnoreCaseOrNameIgnoreCase(email, email);
            if (userOpt.isPresent()) {
                // In a full implementation, you'd compare this IP with their last known IP
                // For optimal security, we send an alert for new logins
                emailService.sendNewLoginAlertEmail(email, ipAddress, userAgent);
            }
        }
    }
}
