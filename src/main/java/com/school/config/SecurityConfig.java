package com.school.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Bean
    public org.springframework.security.core.session.SessionRegistry sessionRegistry() {
        return new org.springframework.security.core.session.SessionRegistryImpl();
    }

    @Bean
    public org.springframework.security.web.session.HttpSessionEventPublisher httpSessionEventPublisher() {
        return new org.springframework.security.web.session.HttpSessionEventPublisher();
    }

        private CustomAuthenticationSuccessHandler successHandler;
        private LoginRateLimitFilter loginRateLimitFilter;
        private com.school.auth.CustomUserDetailsService customUserDetailsService;

    // Signs the "remember me" cookie. Must come from an env var in production —
    // anyone who knows this key can forge a valid remember-me cookie for any
    // account (including admins) just by knowing their email. The literal
    // default here only applies when REMEMBER_ME_KEY is unset, which is fine
    // for local dev but must never be relied on in production.
    @Value("${REMEMBER_ME_KEY:4lazie-remember-me-9f3c7a1e}")
    private String rememberMeKey;

    public SecurityConfig(CustomAuthenticationSuccessHandler successHandler, LoginRateLimitFilter loginRateLimitFilter,
                           com.school.auth.CustomUserDetailsService customUserDetailsService) {
        this.successHandler = successHandler;
        this.loginRateLimitFilter = loginRateLimitFilter;
        this.customUserDetailsService = customUserDetailsService;
    }



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .addFilterBefore(loginRateLimitFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(auth -> auth
                .dispatcherTypeMatchers(jakarta.servlet.DispatcherType.FORWARD, jakarta.servlet.DispatcherType.ERROR, jakarta.servlet.DispatcherType.INCLUDE).permitAll()
                // Allow public access to static resources and public pages
                .requestMatchers("/", "/home", "/index", "/about", "/premium", "/ue-exams", "/register", "/register/google", "/login", "/forgot-password", "/reset-password", "/verify-email", "/verify-otp", "/css/**", "/js/**", "/images/**", "/uploads/**", "/api/search", "/api/subjects", "/api/courses", "/api/notes/filter", "/policy", "/terms", "/contact", "/api/public/contact", "/sw.js", "/manifest.json", "/offline.html", "/api/notifications/**", "/quizzes", "/api/public/quizzes/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/community", "/community/**", "/guest-notes", "/notes", "/view/**", "/download/**", "/stream/**", "/proxy/**", "/timetable/**", "/mobile-viewer/**", "/view-generated-exam/**", "/calendar/view", "/calendar/view/**").permitAll()
                .requestMatchers("/generate-exam", "/generator-hub").authenticated()
                // Require ADMIN or SUPER_ADMIN role for admin pages and upload page
                .requestMatchers("/upload", "/admin/**").hasAnyRole(com.school.auth.Role.ADMIN.name(), com.school.auth.Role.SUPER_ADMIN.name())
                // All other requests require authentication
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .loginProcessingUrl("/login")
                .usernameParameter("email")
                .passwordParameter("password")
                .successHandler(successHandler)
                .failureUrl("/login?error=true")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/")
                .permitAll()
            )
            // The login page's "Keep me signed in" checkbox (name="remember")
            // was previously wired to nothing — checking it did nothing, and
            // everyone got logged out after the plain 30-minute default
            // session timeout regardless. Checking it now keeps the user
            // signed in for 30 days via a signed cookie; the session-timeout
            // bump below (application.properties) covers everyone who leaves
            // it unchecked.
            .rememberMe(remember -> remember
                .key(rememberMeKey)
                .rememberMeParameter("remember")
                .tokenValiditySeconds(60 * 60 * 24 * 30)
                .userDetailsService(customUserDetailsService)
            )
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/api/**", "/admin/assignments/reply/**", "/admin/assignments/chat/**",
                        "/admin/chat/**", "/student/chat/**",
                        "/community/post/*/like", "/community/post/*/comment", "/community/comment/*/like",
                        "/community/post/*/edit", "/community/post/*/delete",
                        "/community/comment/*/edit", "/community/comment/*/delete",
                        "/community/post/*/report", "/community/comment/*/report",
                        "/upload/check-duplicate")
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            )
            .sessionManagement(session -> session
                .maximumSessions(-1)
                .sessionRegistry(sessionRegistry())
            )
            .headers(headers -> headers
                .frameOptions(frame -> frame.sameOrigin())
                .contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-src 'self' blob:; img-src 'self' https: data: blob:; frame-ancestors 'self'"))
            )
            // A CSRF failure almost always means the form the user submitted was
            // stale — served from a cached page (old PWA install, a tab left open
            // across a deploy) whose embedded token no longer matches their current
            // cookie — not a real attack. Bouncing them to a dead "403 Forbidden"
            // error page leaves them stuck; sending them back to where they came
            // from instead gets them a fresh token for free and usually lets them
            // just retry immediately.
            .exceptionHandling(exceptions -> exceptions
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    if (accessDeniedException instanceof org.springframework.security.web.csrf.CsrfException) {
                        String referer = request.getHeader("Referer");
                        String target = (referer != null && referer.contains(request.getServerName()))
                                ? referer : request.getContextPath() + "/";
                        response.sendRedirect(target);
                    } else {
                        response.sendError(jakarta.servlet.http.HttpServletResponse.SC_FORBIDDEN);
                    }
                })
            );

        return http.build();
    }
}
