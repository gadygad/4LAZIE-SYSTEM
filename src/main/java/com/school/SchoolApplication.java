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
    public CommandLineRunner wipeNotes(NoteRepository noteRepository) {
        return args -> {
            noteRepository.deleteAll();
            System.out.println("========== ALL NOTES WIPED SUCCESSFULLY ON STARTUP ==========");
        };
    }
}
