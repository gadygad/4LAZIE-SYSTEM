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

        // Allowed subjects list for cleanup
        java.util.Set<String> allowedSubjects = new java.util.HashSet<>(java.util.Arrays.asList(
            "BASIC ENGINEERING MATHEMATICS",
            "COMMUNICATION SKILLS",
            "BASIC ENGINEERING PHYSICS",
            "SERVER ADMINISTRATION",
            "COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE",
            "COMPUTER NETWORK",
            "MICROPROCESSOR AND MICROCONTROLLER",
            "BASIC DATA COMMUNICATION",
            "WEB DESIGNING",
            "ENGINEERING ENTREPRENEURSHIP",
            "ENGINEERING MATHEMATICS",
            "APPLIED CHEMISTRY",
            "OBJECT ORIENTED PROGRAMMING WITH JAVA",
            "BASIC VISUAL PROGRAMMING",
            "OPERATING SYSTEM"
        ));

        // 2. Ensure general subjects exist for all Level 4 Sem 1 Diploma courses
        String[] programs = {"DIP_IT", "DIP_CSE", "DIP_CE", "DIP_ME", "DIP_EEE", "DIP_MTE"};
        for (String prog : programs) {
            java.util.List<Note> existingNotes = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(prog, 4, 1);
            
            boolean mathExists = existingNotes.stream().anyMatch(n -> 
                "BASIC ENGINEERING MATHEMATICS".equals(n.getModuleName() != null ? n.getModuleName().toUpperCase() : ""));
            if (!mathExists) {
                noteRepository.save(createNote("BASIC ENGINEERING MATHEMATICS", "math_notes.pdf", prog, 4, 1, "Note",
                        "BASIC ENGINEERING MATHEMATICS", "", 85));
            }

            boolean commExists = existingNotes.stream().anyMatch(n -> 
                "COMMUNICATION SKILLS".equals(n.getModuleName() != null ? n.getModuleName().toUpperCase() : ""));
            if (!commExists) {
                noteRepository.save(createNote("COMMUNICATION SKILLS", "comm_skills_notes.pdf", prog, 4, 1, "Note",
                        "COMMUNICATION SKILLS", "", 60));
            }

            boolean physicsExists = existingNotes.stream().anyMatch(n -> 
                "BASIC ENGINEERING PHYSICS".equals(n.getModuleName() != null ? n.getModuleName().toUpperCase() : ""));
            if (!physicsExists) {
                noteRepository.save(createNote("BASIC ENGINEERING PHYSICS", "physics_notes.pdf", prog, 4, 1, "Note",
                        "BASIC ENGINEERING PHYSICS", "", 75));
            }

            // Also ensure general subjects exist for Level 5 Sem 1
            java.util.List<Note> existingNotesL5S1 = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(prog, 5, 1);
            
            boolean entExists = existingNotesL5S1.stream().anyMatch(n -> 
                "ENGINEERING ENTREPRENEURSHIP".equals(n.getModuleName() != null ? n.getModuleName().toUpperCase() : ""));
            if (!entExists) {
                noteRepository.save(createNote("ENGINEERING ENTREPRENEURSHIP", "entrepreneurship_notes.pdf", prog, 5, 1, "Note",
                        "ENGINEERING ENTREPRENEURSHIP", "", 40));
            }

            boolean math5Exists = existingNotesL5S1.stream().anyMatch(n -> 
                "ENGINEERING MATHEMATICS".equals(n.getModuleName() != null ? n.getModuleName().toUpperCase() : ""));
            if (!math5Exists) {
                noteRepository.save(createNote("ENGINEERING MATHEMATICS", "eng_math_notes.pdf", prog, 5, 1, "Note",
                        "ENGINEERING MATHEMATICS", "", 55));
            }

            boolean chemExists = existingNotesL5S1.stream().anyMatch(n -> 
                "APPLIED CHEMISTRY".equals(n.getModuleName() != null ? n.getModuleName().toUpperCase() : ""));
            if (!chemExists) {
                noteRepository.save(createNote("APPLIED CHEMISTRY", "applied_chemistry.pdf", prog, 5, 1, "Note",
                        "APPLIED CHEMISTRY", "", 35));
            }
        }

        // 3. Ensure subjects exist for CSE Level 5 Sem 1 (Specifics)
        java.util.List<Note> existingCseNotesL5S1 = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc("DIP_CSE", 5, 1);
        String[] cseSpecificsL5S1 = {
            "OBJECT ORIENTED PROGRAMMING WITH JAVA",
            "BASIC VISUAL PROGRAMMING",
            "OPERATING SYSTEM"
        };
        for (String subject : cseSpecificsL5S1) {
            boolean exists = existingCseNotesL5S1.stream().anyMatch(n -> 
                subject.equals(n.getModuleName() != null ? n.getModuleName().toUpperCase() : ""));
            if (!exists) {
                noteRepository.save(createNote(subject, subject.toLowerCase().replace(" ", "_") + ".pdf", "DIP_CSE", 5, 1, "Note",
                        subject, "", 45));
            }
        }

        // 4. Ensure subjects exist for CSE Level 5 Sem 2
        java.util.List<Note> existingCseNotes = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc("DIP_CSE", 5, 2);
        
        String[] cseSubjects = {
            "SERVER ADMINISTRATION",
            "COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE",
            "COMPUTER NETWORK",
            "MICROPROCESSOR AND MICROCONTROLLER",
            "BASIC DATA COMMUNICATION"
        };
        
        for (String subject : cseSubjects) {
            boolean exists = existingCseNotes.stream().anyMatch(n -> 
                subject.equals(n.getModuleName() != null ? n.getModuleName().toUpperCase() : ""));
            if (!exists) {
                noteRepository.save(createNote(subject, subject.toLowerCase().replace(" ", "_") + ".pdf", "DIP_CSE", 5, 2, "Note",
                        subject, "", 50));
            }
        }

        // 4. Force cleanup: Delete ANY note that is NOT in allowedSubjects
        java.util.List<Note> allNotes = noteRepository.findAll();
        for (Note n : allNotes) {
            String modName = n.getModuleName() != null ? n.getModuleName().toUpperCase() : "";
            if (!allowedSubjects.contains(modName)) {
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
