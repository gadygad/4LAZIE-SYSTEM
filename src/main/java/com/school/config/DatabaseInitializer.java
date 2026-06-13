package com.school.config;

import com.school.model.Note;
import com.school.model.User;
import com.school.repository.NoteRepository;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Override
    public void run(String... args) throws Exception {
        // 1. Initialize Users if empty
        if (userRepository.count() == 0) {
            User lecturer = new User("Dr. Alex Carter", "alex@school.edu", "password123", "ADMIN");
            User student = new User("John Doe", "john@student.edu", "password123", "STUDENT");
            User admin = new User("System Admin", "admin@school.com", "admin123", "ADMIN");
            
            userRepository.save(lecturer);
            userRepository.save(student);
            userRepository.save(admin);
        }

        // 2. Initialize Notes if empty
        if (noteRepository.count() == 0) {
            // Level 4 - Semester 1 Seed Notes
            Note fundamentals = new Note(
                "Computer Fundamentals",
                "computer_fundamentals.pdf",
                4,
                1,
                "Note",
                LocalDateTime.now().minusDays(5)
            );

            Note commSkills = new Note(
                "Communication Skills",
                "communication_skills.pdf",
                4,
                1,
                "Note",
                LocalDateTime.now().minusDays(4)
            );

            Note basicMath = new Note(
                "Basic Mathematics",
                "basic_mathematics.pdf",
                4,
                1,
                "Note",
                LocalDateTime.now().minusDays(3)
            );
            basicMath.setIsPublic(false); // Private note

            // Level 4 - Semester 2 Seed Notes
            Note programming = new Note(
                "Programming Assignment 1",
                "programming_basics.pdf",
                4,
                2,
                "Assignment",
                LocalDateTime.now().minusDays(2)
            );

            Note database = new Note(
                "Database Design & Implementation",
                "database_systems.pdf",
                4,
                2,
                "Past Paper",
                LocalDateTime.now().minusDays(1)
            );

            Note networking = new Note(
                "Networking Handout",
                "networking_fundamentals.pdf",
                4,
                2,
                "Note",
                LocalDateTime.now()
            );

            fundamentals.setDownloadCount(25);
            commSkills.setDownloadCount(14);
            basicMath.setDownloadCount(8);
            programming.setDownloadCount(42);
            database.setDownloadCount(31);
            networking.setDownloadCount(19);

            noteRepository.save(fundamentals);
            noteRepository.save(commSkills);
            noteRepository.save(basicMath);
            noteRepository.save(programming);
            noteRepository.save(database);
            noteRepository.save(networking);
        }
    }
}
