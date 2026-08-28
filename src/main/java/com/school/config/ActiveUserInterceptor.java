package com.school.config;

import com.school.core.ActivityLog;
import com.school.auth.User;
import com.school.core.ActivityLogRepository;
import com.school.auth.UserRepository;
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

        private UserRepository userRepository;

        private ActivityLogRepository activityLogRepository;

    public ActiveUserInterceptor(UserRepository userRepository, ActivityLogRepository activityLogRepository) {
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
    }


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
                User user = null;
                
                // Primary lookup
                try {
                    user = userRepository.findByEmail(email).orElse(null);
                } catch (Exception e) {
                    // Silently continue to fallback
                }
                
                // Fallback: case-insensitive
                if (user == null) {
                    try {
                        user = userRepository.findFirstByEmailIgnoreCaseOrNameIgnoreCase(email, email).orElse(null);
                    } catch (Exception ignored) {
                        // Silently continue
                    }
                }
                
                if (user != null) {
                    // Rehydrate HTTP Session if missing (e.g. session expired but Spring Security auth remains)
                    if (request.getSession().getAttribute("user") == null) {
                        request.getSession().setAttribute("user", user);
                    }

                    String uri = request.getRequestURI();
                    String method = request.getMethod();
                    
                    // Filter out static resources and frequent background polling if any
                    if (!uri.startsWith("/css") && !uri.startsWith("/js") && !uri.startsWith("/images") && !uri.startsWith("/webjars")) {
                        String action = determineAction(method, uri);
                        
                        try {
                            // Update User
                            user.setLastActiveTime(LocalDateTime.now());
                            user.setLastAction(action);
                            userRepository.save(user);
                        } catch (Exception e) {
                            // Don't let user tracking failures break page loading
                        }

                        try {
                            // Save Activity Log
                            String ipAddress = request.getHeader("X-Forwarded-For");
                            if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                                ipAddress = request.getRemoteAddr();
                            } else {
                                // If multiple IPs are present in X-Forwarded-For, take the first one
                                if (ipAddress.contains(",")) {
                                    ipAddress = ipAddress.split(",")[0].trim();
                                }
                            }
                            
                            String rawUserAgent = request.getHeader("User-Agent");
                            String deviceInfo = parseUserAgent(rawUserAgent);
                            
                            ActivityLog log = new ActivityLog(
                                user.getId(),
                                user.getName(),
                                user.getRole() != null ? user.getRole().name() : "STUDENT",
                                action,
                                uri,
                                ipAddress,
                                deviceInfo
                            );
                            activityLogRepository.save(log);
                        } catch (Exception e) {
                            // Don't let activity logging failures break page loading
                        }
                    }
                }
            }
        }
        return true;
    }

    private String parseUserAgent(String userAgent) {
        if (userAgent == null || userAgent.isEmpty()) return "Unknown Device";
        
        String os = "Unknown OS";
        String browser = "Unknown Browser";
        
        if (userAgent.contains("Windows")) os = "Windows";
        else if (userAgent.contains("Mac OS X")) os = "Mac OS";
        else if (userAgent.contains("Linux")) os = "Linux";
        else if (userAgent.contains("Android")) os = "Android";
        else if (userAgent.contains("iPhone") || userAgent.contains("iPad")) os = "iOS";
        
        if (userAgent.contains("Edg")) browser = "Edge";
        else if (userAgent.contains("Chrome")) browser = "Chrome";
        else if (userAgent.contains("Firefox")) browser = "Firefox";
        else if (userAgent.contains("Safari") && !userAgent.contains("Chrome")) browser = "Safari";
        else if (userAgent.contains("Opera") || userAgent.contains("OPR")) browser = "Opera";
        
        return os + " / " + browser;
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
