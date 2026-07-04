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
    }
}
