package com.school.config;

import com.school.core.SiteVisit;
import com.school.auth.User;
import com.school.core.SiteVisitRepository;
import com.school.auth.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.scheduling.annotation.Async;

import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

@Component
public class SiteVisitInterceptor implements HandlerInterceptor {

    private final SiteVisitRepository siteVisitRepository;
    private final UserRepository userRepository;

    public SiteVisitInterceptor(SiteVisitRepository siteVisitRepository, UserRepository userRepository) {
        this.siteVisitRepository = siteVisitRepository;
        this.userRepository = userRepository;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String uri = request.getRequestURI();
        
        // Skip static resources and specific API paths to avoid spamming the database
        if (uri.startsWith("/css") || uri.startsWith("/js") || uri.startsWith("/images") 
            || uri.startsWith("/webjars") || uri.startsWith("/favicon.ico") || uri.startsWith("/api/")) {
            return true;
        }

        String visitorId = getVisitorIdFromCookie(request);
        
        if (visitorId == null) {
            visitorId = UUID.randomUUID().toString();
            Cookie cookie = new Cookie("_visitor_id", visitorId);
            cookie.setMaxAge(60 * 60 * 24 * 365); // 1 year
            cookie.setPath("/");
            cookie.setHttpOnly(true);
            response.addCookie(cookie);
        }

        // Gather metrics
        String ipAddress = getClientIpAddress(request);
        String rawUserAgent = request.getHeader("User-Agent");
        String deviceType = determineDeviceType(rawUserAgent);
        String browser = determineBrowser(rawUserAgent);
        String os = determineOS(rawUserAgent);
        
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        boolean isRegisteredUser = auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser");
        
        String userId = null;
        String userName = null;
        String userRole = null;
        String courseName = null;
        String institutionName = null;
        
        if (isRegisteredUser) {
            String email = auth.getName();
            Optional<User> userOpt = userRepository.findByEmail(email);
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                userId = user.getId();
                userName = user.getName();
                userRole = user.getRole() != null ? user.getRole().name() : "STUDENT";
                courseName = user.getCourseProgram();
                if (user.getInstitution() != null) {
                    institutionName = user.getInstitution().getShortName() != null ? user.getInstitution().getShortName() : user.getInstitution().getName();
                }
            }
        }

        // Save asynchronously to ensure zero impact on page load times ("uchawi wa kiwango cha juu")
        saveVisitAsync(visitorId, ipAddress, deviceType, browser, os, uri, isRegisteredUser, userId, userName, userRole, courseName, institutionName);

        return true;
    }

    @Async
    public void saveVisitAsync(String visitorId, String ipAddress, String deviceType, String browser, String os, String uri, boolean isRegisteredUser, String userId, String userName, String userRole, String courseName, String institutionName) {
        try {
            SiteVisit visit = new SiteVisit(visitorId, ipAddress, deviceType, browser, os, uri, isRegisteredUser);
            visit.setUserId(userId);
            visit.setUserName(userName);
            visit.setUserRole(userRole);
            visit.setCourseName(courseName);
            visit.setInstitutionName(institutionName);
            siteVisitRepository.save(visit);
        } catch (Exception e) {
            // Ignore exceptions to not break the app if MongoDB has a hiccup
            System.err.println("Failed to save site visit: " + e.getMessage());
        }
    }

    private String getVisitorIdFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("_visitor_id".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

    private String getClientIpAddress(HttpServletRequest request) {
        String ipAddress = request.getHeader("X-Forwarded-For");
        if (ipAddress == null || ipAddress.isEmpty() || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
        } else if (ipAddress.contains(",")) {
            ipAddress = ipAddress.split(",")[0].trim();
        }
        return ipAddress;
    }

    private boolean isUserLoggedIn() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser");
    }

    private String determineDeviceType(String userAgent) {
        if (userAgent == null) return "Unknown";
        String ua = userAgent.toLowerCase();
        if (ua.contains("mobile") || ua.contains("android") || ua.contains("iphone")) {
            return "Mobile";
        }
        return "Desktop";
    }

    private String determineBrowser(String userAgent) {
        if (userAgent == null) return "Unknown";
        if (userAgent.contains("Edg")) return "Edge";
        if (userAgent.contains("Chrome")) return "Chrome";
        if (userAgent.contains("Firefox")) return "Firefox";
        if (userAgent.contains("Safari") && !userAgent.contains("Chrome")) return "Safari";
        if (userAgent.contains("Opera") || userAgent.contains("OPR")) return "Opera";
        return "Unknown";
    }

    private String determineOS(String userAgent) {
        if (userAgent == null) return "Unknown";
        if (userAgent.contains("Windows")) return "Windows";
        if (userAgent.contains("Mac OS X")) return "Mac OS";
        if (userAgent.contains("Linux")) return "Linux";
        if (userAgent.contains("Android")) return "Android";
        if (userAgent.contains("iPhone") || userAgent.contains("iPad")) return "iOS";
        return "Unknown";
    }
}
