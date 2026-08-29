package com.school.config;

import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
@EnableCaching
public class CacheConfig {

    @Bean
    public CacheManager cacheManager() {
        CaffeineCacheManager cacheManager = new CaffeineCacheManager();
        cacheManager.setCaffeine(Caffeine.newBuilder()
                .expireAfterWrite(15, TimeUnit.MINUTES)
                .maximumSize(500));

        // The community feed rebuilds itself from ~9 sequential MongoDB round
        // trips (notes, admin lookup, comment-count aggregation, posts,
        // authors...), which is why hitting the browser's Back button — a
        // full fresh GET /community, since Spring Security's no-cache headers
        // disable bfcache — felt slow. A short-lived cache turns repeat loads
        // within a few seconds (Back, double navigation) into an in-memory
        // hit, while staying short enough that new posts/likes/comments show
        // up for everyone else almost immediately.
        cacheManager.registerCustomCache("forumFeed", Caffeine.newBuilder()
                .expireAfterWrite(8, TimeUnit.SECONDS)
                .maximumSize(1)
                .build());

        return cacheManager;
    }
}
