package com.school.config;

import com.school.model.Note;
import com.school.model.User;
import com.school.repository.NoteRepository;
import com.school.repository.UserRepository;
import com.school.repository.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.school.model.Role;

@Component
public class DatabaseInitializer implements CommandLineRunner {
    private static final Logger log = LoggerFactory.getLogger(DatabaseInitializer.class);


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InstitutionRepository institutionRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    // ── Credentials zinasomwa kutoka properties/env vars (sio hardcoded) ──
    @Value("${app.admin.email:admin@school.com}")
    private String adminEmail;

    @Value("${app.admin.password:change_me_please_2024}")
    private String adminPassword;

    @Value("${app.admin2.email:alex@school.edu}")
    private String lecturerEmail;

    @Value("${app.student.email:john@student.edu}")
    private String studentEmail;

    @Value("${app.student.password:student_change_me_2024}")
    private String studentPassword;

    @Override
    public void run(String... args) throws Exception {
        // 1. Initialize Users if empty
        try {
            if (userRepository.findByEmail(lecturerEmail).isEmpty()) {
                User lecturer = new User("Dr. Alex Carter", lecturerEmail, passwordEncoder.encode(adminPassword), Role.ADMIN);
                userRepository.save(lecturer);
            }
            if (userRepository.findByEmail(studentEmail).isEmpty()) {
                User student = new User("John Doe", studentEmail, passwordEncoder.encode(studentPassword), Role.STUDENT);
                userRepository.save(student);
            }
            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User("System Admin", adminEmail, passwordEncoder.encode(adminPassword), Role.ADMIN);
                userRepository.save(admin);
            }
        } catch (Exception e) {
            log.warn("Could not seed users: " + e.getMessage());
        }

        try {
            // Seed Default Institution
            if (institutionRepository.count() == 0) {
                com.school.model.Institution sjuit = new com.school.model.Institution();
                sjuit.setId("1");
                sjuit.setName("St. Joseph University in Tanzania");
                sjuit.setShortName("SJUIT");
                sjuit.setLogoUrl("/images/sjuit-logo.png");
                institutionRepository.save(sjuit);
                log.info("Default institution seeded: SJUIT");
            }

            // Fix users with no institution
            userRepository.findAll().forEach(u -> {
                if (u.getInstitution() == null) {
                    institutionRepository.findById("1").ifPresent(inst -> {
                        u.setInstitution(inst);
                        userRepository.save(u);
                    });
                }
            });
        } catch (Exception e) {
            log.warn("Could not seed institutions: " + e.getMessage());
        }


        
        // Seed some dummy notes if database is empty so marquee works
        /* 
        if (noteRepository.count() == 0) {
            for (String mod : allowedSubjects) {
                noteRepository.save(createNote(mod + " Notes", "notes.pdf", "BSc", 4, 1, "Note", mod, mod.substring(0, 3) + "101", 10));
            }
        }
        */

        // 2. Ensure general subjects exist for all Level 4 Sem 1 Diploma courses
        /*
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
        */

        // DUMMY NOTES REMOVED FOR PRODUCTION
        // We only create users, no fake notes.
        log.info("Database Initialization complete (Users only).");
    }

    private Note createNote(String title, String filename, String program, int level, int semester, String type,
            String moduleName, String moduleCode, int downloads) {
        Note note = new Note(title, filename, program, level, semester, type, moduleName, moduleCode, "2023/2024",
                LocalDateTime.now().minusDays((long) (Math.random() * 10)));
        note.setDownloadCount(downloads);
        note.setIsPublic(true);
        return note;
    }

    private Note createNoteWithUnit(String title, String filename, String program, int level, int semester, String type,
            String moduleName, String moduleCode, int downloads, int unitNumber) {
        Note note = createNote(title, filename, program, level, semester, type, moduleName, moduleCode, downloads);
        note.setUnitNumber(unitNumber);
        return note;
    }
}
