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
            pool.minSize(10) // Kima cha chini cha connections zinazobaki wazi (Min Connections)
                .maxSize(100) // Kima cha juu kabisa (Max Connections) kuepusha server kuelemewa
                .maxConnectionIdleTime(60, TimeUnit.SECONDS) // Kufunga connection ikiwa kimya kwa sekunde 60
                .maxWaitTime(10, TimeUnit.SECONDS); // Muda wa kusubiri kupata connection (kuepuka timeout za muda mrefu)
        });
    }
}
