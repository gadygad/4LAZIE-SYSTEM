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
    public CommandLineRunner wipeAllNotes(NoteRepository noteRepository) {
        return args -> {
            long count = noteRepository.count();
            noteRepository.deleteAll();
            System.out.println("========== WIPED " + count + " NOTES ==========");
        };
    }
}
