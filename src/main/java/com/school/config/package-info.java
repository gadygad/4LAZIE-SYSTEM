/**
 * Application configuration layer.
 *
 * <p>Contains Spring Boot configuration classes grouped by concern:
 * <ul>
 *   <li><strong>Security</strong> – {@code SecurityConfig}, {@code LoginRateLimitFilter},
 *       {@code CustomAuthenticationSuccessHandler}, {@code LoginSuccessListener}</li>
 *   <li><strong>Database</strong> – {@code LocalMongoConfig}, {@code MongoConverterConfig},
 *       {@code MongoPoolConfig}, {@code DatabaseInitializer}, {@code DataSeeder},
 *       {@code CurriculumInitializer}, {@code RoleReadConverter}</li>
 *   <li><strong>Web / MVC</strong> – {@code WebMvcConfig}, {@code AppConfig},
 *       {@code ActiveUserInterceptor}, {@code SiteVisitInterceptor},
 *       {@code RateLimitInterceptor}, {@code GlobalModelAttributes}</li>
 *   <li><strong>Storage</strong> – {@code CloudinaryConfig}</li>
 *   <li><strong>Caching</strong> – {@code CacheConfig}</li>
 *   <li><strong>Error Handling</strong> – {@code FileUploadExceptionHandler},
 *       {@code GlobalApiExceptionHandler}</li>
 * </ul>
 *
 * @since 1.0
 */
package com.school.config;
