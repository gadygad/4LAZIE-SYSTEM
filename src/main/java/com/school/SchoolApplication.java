package com.school;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import com.school.repository.NoteRepository;

@SpringBootApplication
public class SchoolApplication {
    public static void main(String[] args) {
        SpringApplication.run(SchoolApplication.class, args);
    }

    @Bean
    public CommandLineRunner wipeData(NoteRepository noteRepository) {
        return args -> {
            System.out.println("⚠️ Wiping all notes from database as requested by user...");
            noteRepository.deleteAll();
            System.out.println("✅ All notes have been wiped successfully.");
        };
    }
}
