package com.school.config;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * File uploads (profile pictures, group pictures, assignment attachments,
 * notes, exam materials, calendar imports...) are spread across half a
 * dozen controllers with no shared base path, and none of them were
 * rate-limited — each POST costs real Cloudinary/storage quota, so an
 * automated script could exhaust the free-tier storage budget quickly.
 * Rather than enumerate and keep enumerating every current and future
 * upload endpoint's exact path, this limits any multipart/form-data POST
 * by IP, which covers all of them uniformly.
 */
@Component
public class UploadRateLimitFilter extends OncePerRequestFilter {

    private static final int MAX_UPLOADS = 60;
    private static final Duration WINDOW = Duration.ofHours(1);

    private final Cache<String, Bucket> buckets = Caffeine.newBuilder()
            .expireAfterAccess(2, TimeUnit.HOURS)
            .maximumSize(50_000)
            .build();

    private String resolveClientIp(HttpServletRequest request) {
        String xff = request.getHeader("X-Forwarded-For");
        if (xff == null || xff.isBlank()) {
            return request.getRemoteAddr();
        }
        String[] hops = xff.split(",");
        return hops[hops.length - 1].trim();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String contentType = request.getContentType();
        return !("POST".equalsIgnoreCase(request.getMethod())
                && contentType != null
                && contentType.toLowerCase().startsWith("multipart/form-data"));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String ip = resolveClientIp(request);

        Bucket bucket = buckets.get(ip, k -> {
            Refill refill = Refill.intervally(MAX_UPLOADS, WINDOW);
            Bandwidth bandwidth = Bandwidth.classic(MAX_UPLOADS, refill);
            return Bucket.builder().addLimit(bandwidth).build();
        });

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
            return;
        }

        response.setStatus(429);
        response.setContentType("application/json");
        response.getWriter().write("{\"error\": \"Too many uploads from this network. Please wait a while and try again.\"}");
    }
}
