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
import org.springframework.security.authentication.LockedException;
import org.springframework.security.web.WebAttributes;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.concurrent.TimeUnit;

/**
 * Throttles POST /login by client IP, independent of which account name is being
 * tried. LoginAttemptService only stops repeated guesses against ONE account; on
 * its own it does nothing to stop credential stuffing (many different emails,
 * few guesses each) from the same attacker. This filter runs before Spring
 * Security's UsernamePasswordAuthenticationFilter, so it can reject a flood
 * before a single query hits the database.
 */
@Component
public class LoginRateLimitFilter extends OncePerRequestFilter {

    // Generous enough that a shared campus/NAT connection with many students
    // won't trip it during normal use, but far too slow (~6/min) for scripted
    // password guessing. The tighter per-account LoginAttemptService (5 tries)
    // remains the primary defense against brute-forcing one specific account;
    // this layer's job is blunting credential-stuffing sprays across many
    // different emails from a single attacker.
    private static final int MAX_ATTEMPTS = 30;
    private static final Duration WINDOW = Duration.ofMinutes(5);

    private final Cache<String, Bucket> buckets = Caffeine.newBuilder()
            .expireAfterAccess(WINDOW.multipliedBy(2).toMinutes(), TimeUnit.MINUTES)
            .maximumSize(50_000)
            .build();

    private Bucket newBucket() {
        Refill refill = Refill.intervally(MAX_ATTEMPTS, WINDOW);
        Bandwidth limit = Bandwidth.classic(MAX_ATTEMPTS, refill);
        return Bucket.builder().addLimit(limit).build();
    }

    // Render (and most PaaS setups) sit as exactly one trusted proxy in front of
    // this app. That proxy APPENDS the real connecting IP as the last hop of
    // X-Forwarded-For; anything earlier in the list is whatever the client itself
    // chose to send and is trivially spoofable. Reading index 0 (as the older
    // download/view rate limiter does) trusts attacker-controlled input.
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
        return !("POST".equalsIgnoreCase(request.getMethod()) && "/login".equals(request.getServletPath()));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String ip = resolveClientIp(request);
        Bucket bucket = buckets.get(ip, k -> newBucket());

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
            return;
        }

        request.getSession().setAttribute(WebAttributes.AUTHENTICATION_EXCEPTION,
                new LockedException("Umejaribu ku-login mara nyingi kutoka mtandao huu. Tafadhali subiri dakika chache kisha jaribu tena."));
        response.sendRedirect(request.getContextPath() + "/login?error=true");
    }
}
