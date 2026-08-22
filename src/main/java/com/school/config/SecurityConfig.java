package com.school.config;

import org.springframework.beans.factory.annotation.Autowired;
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

    public SecurityConfig(CustomAuthenticationSuccessHandler successHandler) {
        this.successHandler = successHandler;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .dispatcherTypeMatchers(jakarta.servlet.DispatcherType.FORWARD, jakarta.servlet.DispatcherType.ERROR, jakarta.servlet.DispatcherType.INCLUDE).permitAll()
                // Allow public access to static resources and public pages
                .requestMatchers("/", "/home", "/index", "/about", "/premium", "/ue-exams", "/register", "/register/google", "/login", "/forgot-password", "/reset-password", "/verify-email", "/verify-otp", "/css/**", "/js/**", "/images/**", "/uploads/**", "/api/search", "/api/subjects", "/api/courses", "/api/notes/filter", "/policy", "/terms", "/contact", "/api/public/contact", "/sw.js", "/manifest.json", "/offline.html", "/api/notifications/**", "/quizzes", "/api/public/quizzes/**", "/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                .requestMatchers("/guest-notes", "/notes", "/view/**", "/download/**", "/stream/**", "/proxy/**", "/timetable/**", "/mobile-viewer/**", "/view-generated-exam/**").permitAll()
                .requestMatchers("/generate-exam", "/generator-hub").authenticated()
                // Require ADMIN or SUPER_ADMIN role for admin pages and upload page
                .requestMatchers("/upload", "/admin/**").hasAnyRole(com.school.model.Role.ADMIN.name(), com.school.model.Role.SUPER_ADMIN.name())
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
            .csrf(csrf -> csrf
                .ignoringRequestMatchers("/api/**", "/admin/assignments/reply/**", "/admin/assignments/chat/**",
                        "/admin/chat/**", "/student/chat/**")
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
            )
            .sessionManagement(session -> session
                .maximumSessions(-1)
                .sessionRegistry(sessionRegistry())
            )
            .headers(headers -> headers
                .frameOptions(frame -> frame.sameOrigin())
                .contentSecurityPolicy(csp -> csp.policyDirectives("default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-src 'self' blob:; img-src 'self' https: data: blob:; frame-ancestors 'self'"))
            );

        return http.build();
    }
}
