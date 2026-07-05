package com.school.config;

import com.school.model.ActivityLog;
import com.school.model.User;
import com.school.repository.ActivityLogRepository;
import com.school.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.LocalDateTime;

@Component
public class ActiveUserInterceptor implements HandlerInterceptor {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityLogRepository activityLogRepository;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
            String email = null;
            if (auth.getPrincipal() instanceof UserDetails) {
                email = ((UserDetails) auth.getPrincipal()).getUsername();
            } else if (auth.getPrincipal() instanceof String) {
                email = (String) auth.getPrincipal();
            }

            if (email != null) {
                userRepository.findByEmail(email).ifPresent(user -> {
                    // Rehydrate HTTP Session if missing (e.g. session expired but Spring Security auth remains)
                    if (request.getSession().getAttribute("user") == null) {
                        request.getSession().setAttribute("user", user);
                    }

                    String uri = request.getRequestURI();
                    String method = request.getMethod();
                    
                    // Filter out static resources and frequent background polling if any
                    if (!uri.startsWith("/css") && !uri.startsWith("/js") && !uri.startsWith("/images") && !uri.startsWith("/webjars")) {
                        String action = determineAction(method, uri);
                        
                        // Update User
                        user.setLastActiveTime(LocalDateTime.now());
                        user.setLastAction(action);
                        userRepository.save(user);

                        // Save Activity Log
                        String ipAddress = request.getHeader("X-Forwarded-For");
                        if (ipAddress == null) {
                            ipAddress = request.getRemoteAddr();
                        }
                        
                        ActivityLog log = new ActivityLog(
                            user.getId(),
                            user.getName(),
                            user.getRole() != null ? user.getRole().name() : "STUDENT",
                            action,
                            uri,
                            ipAddress
                        );
                        activityLogRepository.save(log);
                    }
                });
            }
        }
        return true;
    }

    private String determineAction(String method, String uri) {
        if (uri.startsWith("/dashboard")) return "Viewing Dashboard";
        if (uri.startsWith("/notes")) return "Browsing Notes Library";
        if (uri.startsWith("/upload")) return method.equals("POST") ? "Uploading new Note" : "Viewing Upload Page";
        if (uri.startsWith("/download/")) return "Downloading a Document";
        if (uri.startsWith("/view/")) return "Reading a Document";
        if (uri.startsWith("/admin")) return "Accessing Admin Panel (" + uri + ")";
        if (uri.equals("/")) return "Viewing Home Page";
        if (uri.startsWith("/login")) return "Logging In";
        
        return method + " " + uri;
    }
}
