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
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Throttles, per client IP, the handful of POST endpoints where a low
 * request cost combined with no limit turns into a real account-takeover or
 * abuse tool:
 *
 *  - /verify-otp and /reset-password both accept a 6-digit OTP as the only
 *    credential (1,000,000 possible values) with no other check — unlimited
 *    guesses makes that number meaningless. 20 tries per 15 minutes leaves
 *    a legitimate user (who mistypes at most once or twice) untouched while
 *    making a brute-force attempt take, on average, tens of thousands of
 *    fifteen-minute windows.
 *  - /register and /forgot-password cost the app real money/quota (an email
 *    or SMS send, a new DB document) per request and were completely open —
 *    a script could spam either into oblivion or OTP-bomb a victim's inbox.
 *
 * Deliberately separate from the existing general-purpose RateLimitInterceptor
 * (200 req/min — sized for page views, far too loose for a credential guess)
 * and mirrors LoginRateLimitFilter's trusted-proxy IP resolution rather than
 * the interceptor's spoofable X-Forwarded-For[0] read.
 */
@Component
public class SensitiveAuthRateLimitFilter extends OncePerRequestFilter {

    // Read and cleared by PasswordResetController#showForgotPasswordForm and
    // RegistrationController#showRegisterForm on their next GET. A plain
    // HttpSession attribute, not Spring's RedirectAttributes/flash-map
    // mechanism, because this filter runs ahead of DispatcherServlet and a
    // blocked request never reaches it to hand off a flash map correctly.
    public static final String SESSION_ERROR_ATTR = "rateLimitError";

    private static final Map<String, Limit> LIMITS = Map.of(
            "/verify-otp",      new Limit(20, Duration.ofMinutes(15)),
            "/reset-password",  new Limit(20, Duration.ofMinutes(15)),
            "/forgot-password", new Limit(10, Duration.ofHours(1)),
            "/register",        new Limit(10, Duration.ofHours(1))
    );

    private record Limit(int maxAttempts, Duration window) {}

    // Keyed by "path|ip" so each endpoint gets its own independent budget —
    // otherwise a legitimate user retrying a mistyped OTP a few times could
    // burn through the budget register/forgot-password also need.
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
        return !("POST".equalsIgnoreCase(request.getMethod()) && LIMITS.containsKey(request.getServletPath()));
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getServletPath();
        Limit limit = LIMITS.get(path);
        String ip = resolveClientIp(request);
        String key = path + "|" + ip;

        Bucket bucket = buckets.get(key, k -> {
            Refill refill = Refill.intervally(limit.maxAttempts(), limit.window());
            Bandwidth bandwidth = Bandwidth.classic(limit.maxAttempts(), refill);
            return Bucket.builder().addLimit(bandwidth).build();
        });

        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response);
            return;
        }

        // /verify-otp and /reset-password both need a query param their own
        // path doesn't have on this rejected request (email / token) to
        // render correctly on GET, so a locked-out guesser is sent back to
        // the start of the flow instead — no functional loss for a real
        // user, since requesting a fresh OTP is what they'd need to do next
        // anyway once truly locked out.
        boolean isOtpFlow = "/verify-otp".equals(path) || "/reset-password".equals(path);
        String target = isOtpFlow ? "/forgot-password" : path;
        String message = isOtpFlow
                ? "Too many attempts from this network. Please request a new OTP and try again shortly."
                : "Too many attempts from this network. Please wait a while and try again.";

        request.getSession(true).setAttribute(SESSION_ERROR_ATTR, message);
        response.sendRedirect(request.getContextPath() + target);
    }
}
