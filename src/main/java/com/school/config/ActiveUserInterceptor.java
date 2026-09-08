package com.school.config;

import com.school.auth.User;
import com.school.auth.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class ActiveUserInterceptor implements HandlerInterceptor {

        private UserRepository userRepository;

        private UserActivityTracker userActivityTracker;

    public ActiveUserInterceptor(UserRepository userRepository, UserActivityTracker userActivityTracker) {
        this.userRepository = userRepository;
        this.userActivityTracker = userActivityTracker;
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

                        String ipAddress = request.getHeader("X-Forwarded-For");
                        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
                            ipAddress = request.getRemoteAddr();
                        } else if (ipAddress.contains(",")) {
                            // If multiple IPs are present in X-Forwarded-For, take the first one
                            ipAddress = ipAddress.split(",")[0].trim();
                        }
                        String deviceInfo = parseUserAgent(request.getHeader("User-Agent"));

                        // Neither of these two writes affects what gets
                        // rendered for this request — handed off to a
                        // separate @Async bean so activity tracking never
                        // adds to page load time. Must be a genuinely
                        // different bean, not a method on this class: Spring
                        // only applies @Async through the proxy, and a class
                        // calling its own method bypasses that proxy
                        // entirely (mirrors SiteVisitInterceptor's intent,
                        // fixed to actually take effect).
                        userActivityTracker.recordActivity(user, action, uri, ipAddress, deviceInfo);
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
