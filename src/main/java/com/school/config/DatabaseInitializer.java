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

        // 2. Initialize Notes if empty
        if (noteRepository.count() == 0) {
            // DIP_IT - Level 4 Semester 1
            noteRepository.save(createNote("Computer Fundamentals", "cf_notes.pdf", "DIP_IT", 4, 1, "Note",
                    "COMPUTER FUNDAMENTALS", "ITT 04101", 120));
            noteRepository.save(createNote("Basic Mathematics", "math_notes.pdf", "DIP_IT", 4, 1, "Note",
                    "BASIC MATHEMATICS", "ITT 04102", 85));
            noteRepository.save(createNote("Communication Skills", "comm_skills.pdf", "DIP_IT", 4, 1, "Note",
                    "COMMUNICATION SKILLS", "ITT 04103", 40));
            noteRepository.save(createNote("Computer Networking", "networking_basics.pdf", "DIP_IT", 4, 1, "Note",
                    "COMPUTER NETWORKING", "ITT 04104", 110));

            // DIP_IT - Level 4 Semester 2
            noteRepository.save(createNote("Programming Concepts", "c_programming.pdf", "DIP_IT", 4, 2, "Note",
                    "PROGRAMMING CONCEPTS", "ITT 04201", 150));
            noteRepository.save(
                    createNote("Web Design", "html_css.pdf", "DIP_IT", 4, 2, "Note", "WEB DESIGN", "ITT 04202", 200));
            noteRepository.save(createNote("Database Principles", "db_intro.pdf", "DIP_IT", 4, 2, "Note",
                    "DATABASE PRINCIPLES", "ITT 04203", 95));

            // DIP_IT - Level 5 Semester 1
            noteRepository.save(createNote("Object Oriented Programming", "java_oop.pdf", "DIP_IT", 5, 1, "Note",
                    "OBJECT ORIENTED PROGRAMMING", "ITT 05101", 180));
            noteRepository.save(createNote("Systems Analysis and Design", "sad_notes.pdf", "DIP_IT", 5, 1, "Note",
                    "SYSTEMS ANALYSIS AND DESIGN", "ITT 05102", 70));

            // DIP_IT - Level 5 Semester 2
            noteRepository.save(createNote("Web Programming", "php_mysql.pdf", "DIP_IT", 5, 2, "Note",
                    "WEB PROGRAMMING", "ITT 05201", 160));
            noteRepository.save(createNote("Database Management Systems", "dbms_advanced.pdf", "DIP_IT", 5, 2, "Note",
                    "DATABASE MANAGEMENT SYSTEMS", "ITT 05202", 110));
            noteRepository.save(createNote("System Administration", "sys_admin.pdf", "DIP_IT", 5, 2, "Note",
                    "SYSTEM ADMINISTRATION", "ITT 05203", 85));

            // DIP_IT - Level 6 Semester 1
            noteRepository.save(createNote("IT Project Management", "it_pm.pdf", "DIP_IT", 6, 1, "Note",
                    "IT PROJECT MANAGEMENT", "ITT 06101", 60));
            noteRepository.save(createNote("Information Security", "info_sec.pdf", "DIP_IT", 6, 1, "Note",
                    "INFORMATION SECURITY", "ITT 06102", 140));

            // DIP_CSE - Level 4 Semester 1
            noteRepository.save(createNote("Programming Fundamentals", "prog_basics.pdf", "DIP_CSE", 4, 1, "Note",
                    "PROGRAMMING FUNDAMENTALS", "CSE 04101", 90));
            noteRepository.save(createNote("Computer Systems", "comp_sys.pdf", "DIP_CSE", 4, 1, "Note",
                    "COMPUTER SYSTEMS", "CSE 04102", 115));
            noteRepository.save(createNote("Basic Mathematics", "math_notes.pdf", "DIP_CSE", 4, 1, "Note",
                    "BASIC MATHEMATICS", "ITT 04102", 80));

            // DIP_CSE - Level 4 Semester 2
            noteRepository.save(createNote("Data Structures", "data_structures.pdf", "DIP_CSE", 4, 2, "Note",
                    "DATA STRUCTURES", "CSE 04201", 130));
            noteRepository.save(createNote("Programming Concepts", "c_programming.pdf", "DIP_CSE", 4, 2, "Note",
                    "PROGRAMMING CONCEPTS", "ITT 04201", 145));

            // DIP_CSE - Level 5 Semester 1
            noteRepository.save(createNote("Operating Systems", "os_notes.pdf", "DIP_CSE", 5, 1, "Note",
                    "OPERATING SYSTEMS", "CSE 05101", 105));
            noteRepository.save(createNote("Computer Networks", "networks.pdf", "DIP_CSE", 5, 1, "Note",
                    "COMPUTER NETWORKS", "CSE 05102", 95));

            // DIP_CSE - Level 5 Semester 2
            noteRepository.save(createNote("Server Administration", "server_admin.pdf", "DIP_CSE", 5, 2, "Note",
                    "SERVER ADMINISTRATION", "CSE 05201", 125));
            noteRepository.save(createNote("Web Designing", "web_design.pdf", "DIP_CSE", 5, 2, "Note", "WEB DESIGNING",
                    "CSE 05202", 110));
            noteRepository.save(createNote("Computer Architecture and Assembly Programming Language",
                    "comp_arch_asm.pdf", "DIP_CSE", 5, 2, "Note",
                    "COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE", "CSE 05203", 95));
            noteRepository.save(createNote("Computer Networks", "comp_network.pdf", "DIP_CSE", 5, 2, "Note",
                    "COMPUTER NETWORKS", "CSE 05204", 130));
            noteRepository.save(createNote("Basic Data Communication", "data_comm.pdf", "DIP_CSE", 5, 2, "Note",
                    "BASIC DATA COMMUNICATION", "CSE 05206", 85));


            // DIP_CE (Civil Engineering) - Level 4 Semester 1
            noteRepository.save(createNote("Engineering Drawing", "eng_drawing.pdf", "DIP_CE", 4, 1, "Note",
                    "ENGINEERING DRAWING", "CE 04101", 95));
            noteRepository.save(createNote("Surveying I", "surveying_1.pdf", "DIP_CE", 4, 1, "Note", "SURVEYING I",
                    "CE 04102", 80));
            noteRepository.save(createNote("Basic Mathematics", "math_notes.pdf", "DIP_CE", 4, 1, "Note",
                    "BASIC MATHEMATICS", "ITT 04102", 70));

            // DIP_CE - Level 4 Semester 2
            noteRepository.save(createNote("Building Construction", "building_const.pdf", "DIP_CE", 4, 2, "Note",
                    "BUILDING CONSTRUCTION", "CE 04201", 120));
            noteRepository.save(createNote("Strength of Materials", "strength_mat.pdf", "DIP_CE", 4, 2, "Note",
                    "STRENGTH OF MATERIALS", "CE 04202", 100));

            // DIP_CE - Level 5 Semester 1
            noteRepository.save(createNote("Structural Analysis", "structural.pdf", "DIP_CE", 5, 1, "Note",
                    "STRUCTURAL ANALYSIS", "CE 05101", 90));
            noteRepository.save(
                    createNote("Hydraulics", "hydraulics.pdf", "DIP_CE", 5, 1, "Note", "HYDRAULICS", "CE 05102", 85));

            // DIP_CE - Level 5 Semester 2
            noteRepository.save(createNote("Highway Engineering", "highway.pdf", "DIP_CE", 5, 2, "Note",
                    "HIGHWAY ENGINEERING", "CE 05201", 75));
            noteRepository.save(createNote("Soil Mechanics", "soil_mech.pdf", "DIP_CE", 5, 2, "Note", "SOIL MECHANICS",
                    "CE 05202", 65));

            // DIP_ME (Mechanical Engineering) - Level 4 Semester 1
            noteRepository.save(createNote("Workshop Technology", "workshop_tech.pdf", "DIP_ME", 4, 1, "Note",
                    "WORKSHOP TECHNOLOGY", "ME 04101", 100));
            noteRepository.save(createNote("Engineering Drawing", "eng_drawing.pdf", "DIP_ME", 4, 1, "Note",
                    "ENGINEERING DRAWING", "ME 04102", 88));
            noteRepository.save(createNote("Basic Mathematics", "math_notes.pdf", "DIP_ME", 4, 1, "Note",
                    "BASIC MATHEMATICS", "ITT 04102", 72));

            // DIP_ME - Level 4 Semester 2
            noteRepository.save(createNote("Applied Mechanics", "applied_mech.pdf", "DIP_ME", 4, 2, "Note",
                    "APPLIED MECHANICS", "ME 04201", 110));
            noteRepository.save(createNote("Fluid Mechanics", "fluid_mech.pdf", "DIP_ME", 4, 2, "Note",
                    "FLUID MECHANICS", "ME 04202", 95));

            // DIP_ME - Level 5 Semester 1
            noteRepository.save(createNote("Thermodynamics", "thermo.pdf", "DIP_ME", 5, 1, "Note", "THERMODYNAMICS",
                    "ME 05101", 115));
            noteRepository.save(createNote("Machine Design", "machine_design.pdf", "DIP_ME", 5, 1, "Note",
                    "MACHINE DESIGN", "ME 05102", 90));

            // DIP_ME - Level 5 Semester 2
            noteRepository.save(createNote("Manufacturing Technology", "manufacturing.pdf", "DIP_ME", 5, 2, "Note",
                    "MANUFACTURING TECHNOLOGY", "ME 05201", 80));
            noteRepository.save(createNote("Refrigeration & Air Conditioning", "refrigeration.pdf", "DIP_ME", 5, 2,
                    "Note", "REFRIGERATION & AC", "ME 05202", 70));
            // DEGREE (ENGINEERING) - Year 1
            noteRepository.save(createNote("Engineering Mathematics I", "eng_math_1.pdf", "DEGREE_ENG", 1, 1, "Note",
                    "ENGINEERING MATHEMATICS", "ENG 101", 10));

            // DEGREE (EDUCATION) - Year 1
            noteRepository.save(createNote("Educational Psychology", "edu_psychology.pdf", "DEGREE_EDU", 1, 1, "Note",
                    "EDUCATIONAL PSYCHOLOGY", "EDU 101", 5));
        }
    }

    private Note createNote(String title, String filename, String program, int level, int semester, String type,
            String moduleName, String moduleCode, int downloads) {
        Note note = new Note(title, filename, program, level, semester, type, moduleName, moduleCode, "2023/2024",
                LocalDateTime.now().minusDays((long) (Math.random() * 10)));
        note.setDownloadCount(downloads);
        return note;
    }
}
