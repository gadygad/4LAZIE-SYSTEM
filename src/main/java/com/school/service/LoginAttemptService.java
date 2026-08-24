package com.school.service;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class LoginAttemptService {

    private final int MAX_ATTEMPT = 5;
    private final long LOCK_TIME_DURATION_MINUTES = 15;

    // Both caches self-evict, so a burst of one-off/garbage login names never
    // accumulates in memory the way an unbounded Map would.
    private final Cache<String, AtomicInteger> attemptsCache = Caffeine.newBuilder()
            .expireAfterWrite(LOCK_TIME_DURATION_MINUTES, TimeUnit.MINUTES)
            .maximumSize(50_000)
            .build();

    private final Cache<String, Boolean> lockCache = Caffeine.newBuilder()
            .expireAfterWrite(LOCK_TIME_DURATION_MINUTES, TimeUnit.MINUTES)
            .maximumSize(50_000)
            .build();

    // The login form matches accounts case-insensitively (findByEmailIgnoreCase),
    // so the attempt counter must key on the same normalized identity, otherwise
    // "User@x.com", "user@x.com", "USER@X.COM", ... would each get their own
    // fresh 5-attempt budget and the lockout would never actually trigger.
    private String normalize(String key) {
        return key == null ? "" : key.trim().toLowerCase();
    }

    public void loginSucceeded(String key) {
        String k = normalize(key);
        attemptsCache.invalidate(k);
        lockCache.invalidate(k);
    }

    public void loginFailed(String key) {
        String k = normalize(key);
        int attempts = attemptsCache.get(k, key2 -> new AtomicInteger(0)).incrementAndGet();
        if (attempts >= MAX_ATTEMPT) {
            lockCache.put(k, Boolean.TRUE);
        }
    }

    public boolean isBlocked(String key) {
        return lockCache.getIfPresent(normalize(key)) != null;
    }
}
