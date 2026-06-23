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

        // Dummy notes removed for production
    }
}

