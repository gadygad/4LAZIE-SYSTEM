package com.school.config;

import com.school.model.Note;
import com.school.model.User;
import com.school.repository.NoteRepository;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // 1. Initialize Users if empty
        if (userRepository.findByEmail("alex@school.edu").isEmpty()) {
            User lecturer = new User("Dr. Alex Carter", "alex@school.edu", passwordEncoder.encode("password123"), "ADMIN");
            userRepository.save(lecturer);
        }
        if (userRepository.findByEmail("john@student.edu").isEmpty()) {
            User student = new User("John Doe", "john@student.edu", passwordEncoder.encode("password123"), "STUDENT");
            userRepository.save(student);
        }
        if (userRepository.findByEmail("admin@school.com").isEmpty()) {
            User admin = new User("System Admin", "admin@school.com", passwordEncoder.encode("admin123"), "ADMIN");
            userRepository.save(admin);
        }

        // 2. Ensure BASIC ENGINEERING MATHEMATICS exists for all Level 4 Sem 1 Diploma courses
        String[] programs = {"DIP_IT", "DIP_CSE", "DIP_CE", "DIP_ME"};
        for (String prog : programs) {
            if (noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(prog, 4, 1).isEmpty()) {
                noteRepository.save(createNote("Basic Engineering Mathematics", "math_notes.pdf", prog, 4, 1, "Note",
                        "BASIC ENGINEERING MATHEMATICS", "ITT 04102", 85));
            }
        }

        // 3. Force cleanup: Delete ANY note that is NOT BASIC ENGINEERING MATHEMATICS
        java.util.List<Note> allNotes = noteRepository.findAll();
        for (Note n : allNotes) {
            String modName = n.getModuleName() != null ? n.getModuleName().toUpperCase() : "";
            if (!modName.equals("BASIC ENGINEERING MATHEMATICS")) {
                noteRepository.delete(n);
            }
        }
    }

    private Note createNote(String title, String filename, String program, int level, int semester, String type,
            String moduleName, String moduleCode, int downloads) {
        Note note = new Note(title, filename, program, level, semester, type, moduleName, moduleCode, "2023/2024",
                LocalDateTime.now().minusDays((long) (Math.random() * 10)));
        note.setDownloadCount(downloads);
        return note;
    }

    private Note createNoteWithUnit(String title, String filename, String program, int level, int semester, String type,
            String moduleName, String moduleCode, int downloads, int unitNumber) {
        Note note = createNote(title, filename, program, level, semester, type, moduleName, moduleCode, downloads);
        note.setUnitNumber(unitNumber);
        return note;
    }
}
