package com.school.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import java.util.List;

/**
 * MongoDB custom converter configuration.
 * Registers the RoleReadConverter so that unknown/corrupted role values
 * in the database don't crash the application.
 */
@Configuration
public class MongoConverterConfig {

    @Bean
    public MongoCustomConversions customConversions() {
        return new MongoCustomConversions(List.of(new RoleReadConverter()));
    }
}
