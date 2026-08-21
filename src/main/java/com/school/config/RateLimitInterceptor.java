package com.school.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    // Kanzidata ya muda (Cache) kutunza Bucket ya kila IP Address
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

    // Sheria yetu: Maombi 200 kwa kila dakika moja (Kulinda bajeti ya server)
    private Bucket createNewBucket() {
        Refill refill = Refill.intervally(200, Duration.ofMinutes(1));
        Bandwidth limit = Bandwidth.classic(200, refill);
        return Bucket.builder().addLimit(limit).build();
    }

    // Njia ya kupata IP Address halisi ya mtumiaji
    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String ip = getClientIP(request);
        Bucket bucket = cache.computeIfAbsent(ip, k -> createNewBucket());

        // Jaribu kupunguza token 1 kwenye bucket
        if (bucket.tryConsume(1)) {
            return true; // Ruhusu aendelee
        }

        // Mtu amezidisha ukomo (Uchawi unafanya kazi hapa)
        response.setStatus(429); // 429 Too Many Requests
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"You've reached your usage limit for now. Please wait a moment before trying again (Error 429).\"}");
        return false; // Mzuie asiendelee
    }
}
