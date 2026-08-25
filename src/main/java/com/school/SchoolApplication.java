package com.school;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import jakarta.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
@EnableCaching
@EnableAsync
@EnableScheduling
public class SchoolApplication {

    @PostConstruct
    public void init() {
        // Force the application timezone to East Africa Time (Tanzania)
        TimeZone.setDefault(TimeZone.getTimeZone("Africa/Dar_es_Salaam"));
    }

    public static void main(String[] args) {
        SpringApplication.run(SchoolApplication.class, args);
    }
}
