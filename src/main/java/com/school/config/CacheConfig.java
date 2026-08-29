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

        // Opening a post's permalink page re-fetches the post AND its whole
        // comment thread from MongoDB every single time, even if the same
        // post was just viewed seconds ago — that round trip is what made
        // reopening a post feel slow. Both are evicted immediately whenever
        // that specific post changes (new comment/reply, like), so an
        // interaction never shows stale data to the person who caused it —
        // this cache only saves repeat *reads* of unchanged posts.
        cacheManager.registerCustomCache("postDetail", Caffeine.newBuilder()
                .expireAfterWrite(30, TimeUnit.SECONDS)
                .maximumSize(200)
                .build());
        cacheManager.registerCustomCache("postComments", Caffeine.newBuilder()
                .expireAfterWrite(30, TimeUnit.SECONDS)
                .maximumSize(200)
                .build());

        return cacheManager;
    }
}
