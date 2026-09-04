package com.school.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.lang.NonNull;
/**
 * Configures static resource handling so that uploaded profile pictures
 * stored in the local {@code uploads} directory can be served via the
 * {@code /uploads/**} URL path.
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @org.springframework.beans.factory.annotation.Autowired
    private ActiveUserInterceptor activeUserInterceptor;
    
    @org.springframework.beans.factory.annotation.Autowired
    @org.springframework.beans.factory.annotation.Qualifier("siteVisitInterceptor")
    private org.springframework.web.servlet.HandlerInterceptor siteVisitInterceptor;

    @org.springframework.beans.factory.annotation.Autowired
    private RateLimitInterceptor rateLimitInterceptor;

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        // Serve files from the "uploads" folder located at the project root.
        // Fallback to classpath:/static/uploads/ if not found externally.
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/", "classpath:/static/uploads/");
    }

    @Override
    public void addInterceptors(org.springframework.web.servlet.config.annotation.InterceptorRegistry registry) {
        registry.addInterceptor(activeUserInterceptor);
        registry.addInterceptor(siteVisitInterceptor);
        
        // Register Rate Limiting for critical endpoints (Notes views and downloads).
        // The two /api/search* routes are public, unauthenticated, and build a
        // MongoDB $regex from the request param — even with the value now
        // escaped against ReDoS, they're still an easy target for volumetric
        // abuse without this.
        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns("/download/**", "/view/**", "/proxy/**", "/api/search", "/api/notes/filter");
    }
}
