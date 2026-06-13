package com.school;

import com.school.model.Note;
import com.school.model.User;
import com.school.repository.NoteRepository;
import com.school.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;
    private final NoteRepository noteRepository;

    public DataInitializer(UserService userService, NoteRepository noteRepository) {
        this.userService = userService;
        this.noteRepository = noteRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userService.findByEmail("admin@example.com") == null) {
            User admin = new User("Admin", "admin@example.com", "admin123", "ADMIN");
            userService.registerUser(admin, null);
        }
        if (userService.findByEmail("student@example.com") == null) {
            User student = new User("Student", "student@example.com", "student123", "STUDENT");
            userService.registerUser(student, null);
        }

        // Add dummy notes for popular notes section if empty
        if (noteRepository.count() == 0) {
            Note n1 = new Note();
            n1.setTitle("JAVA PROGRAMMING");
            n1.setCategory("Note");
            n1.setLevelNo(4);
            n1.setSemesterNo(1);
            n1.setFilename("java_notes.pdf");
            n1.setIsPublic(true);
            noteRepository.save(n1);

            Note n2 = new Note();
            n2.setTitle("DATABASE MANAGEMENT");
            n2.setCategory("Note");
            n2.setLevelNo(5);
            n2.setSemesterNo(1);
            n2.setFilename("db_notes.pdf");
            n2.setIsPublic(true);
            noteRepository.save(n2);

            Note n3 = new Note();
            n3.setTitle("NETWORK SECURITY");
            n3.setCategory("Note");
            n3.setLevelNo(6);
            n3.setSemesterNo(1);
            n3.setFilename("network_notes.pdf");
            n3.setIsPublic(true);
            noteRepository.save(n3);
        }
    }
}

