package com.school.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

/**
 * Local development profile configuration.
 * When running with -Dspring-boot.run.profiles=local, the app connects
 * to the MongoDB URI specified in application-local.properties:
 *   spring.data.mongodb.uri=mongodb://localhost:27017/4lazie_db_local
 *
 * No embedded Mongo needed — just run a local mongod instance or use
 * the Railway MongoDB URI for testing.
 */
@Configuration
@Profile("local")
public class LocalMongoConfig {
    // Spring Data MongoDB auto-configures from application-local.properties
    // No additional beans needed
}
