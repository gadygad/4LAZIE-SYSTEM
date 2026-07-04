package com.school.config;

import org.springframework.boot.autoconfigure.mongo.MongoClientSettingsBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

@Configuration
public class MongoPoolConfig {

    @Bean
    public MongoClientSettingsBuilderCustomizer mongoConnectionPoolCustomizer() {
        return builder -> builder.applyToConnectionPoolSettings(pool -> {
            pool.minSize(10) // Minimum idle connections
                .maxSize(100) // Maximum connections to prevent server overload
                .maxConnectionIdleTime(60, TimeUnit.SECONDS) // Close connection if idle for 60 seconds
                .maxWaitTime(10, TimeUnit.SECONDS); // Maximum wait time for a connection to prevent long timeouts
        });
    }
}
