package com.school.config;

import com.school.model.Note;
import com.school.repository.NoteRepository;
import com.school.model.Institution;
import com.school.repository.InstitutionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

// @Configuration
public class GeneralModulesInitializer {

    // @Bean
    CommandLineRunner initGeneralModules(NoteRepository noteRepository, InstitutionRepository institutionRepository) {
        return args -> {
            List<Institution> institutions = institutionRepository.findAll();
            if (institutions.isEmpty()) return;
            Institution inst = institutions.get(0);

            List<String> allDiplomaPrograms = Arrays.asList(
                    "DIP_IT", "DIP_CSE", "DIP_CE", "DIP_ME", "DIP_EEE", "DIP_MTE", "DIP_ECE"
            );

            // LEVEL 4 SEMESTER 1
            // Desired: 1. COMMUNICATION SKILLS, 2. BASIC ENGINEERING PHYSICS, 3. BASIC ENGINEERING MATHEMATICS
            // Reverse order for insertion
            List<String> l4s1 = Arrays.asList(
                    "BASIC ENGINEERING MATHEMATICS",
                    "BASIC ENGINEERING PHYSICS",
                    "COMMUNICATION SKILLS"
            );
            for (String prog : allDiplomaPrograms) {
                recreateDummyNotes(noteRepository, inst, prog, 4, 1, l4s1, "GEN_101");
            }

            // LEVEL 4 SEMESTER 2
            // Desired: 1. ENGINEERING ENTREPRENEURSHIP, 2. COMPUTER APPLICATION
            List<String> l4s2 = Arrays.asList(
                    "COMPUTER APPLICATION",
                    "ENGINEERING ENTREPRENEURSHIP"
            );
            for (String prog : allDiplomaPrograms) {
                recreateDummyNotes(noteRepository, inst, prog, 4, 2, l4s2, "GEN_102");
            }

            // LEVEL 5 SEMESTER 1 (General)
            // Desired: 1. APPLIED CHEMISTRY, 2. ENGINEERING MATHEMATICS, 3. COMMUNICATION SKILLS
            List<String> l5s1General = Arrays.asList(
                    "COMMUNICATION SKILLS",
                    "ENGINEERING MATHEMATICS",
                    "APPLIED CHEMISTRY"
            );
            for (String prog : allDiplomaPrograms) {
                if (!prog.equals("DIP_CSE")) {
                    recreateDummyNotes(noteRepository, inst, prog, 5, 1, l5s1General, "GEN_103");
                }
            }

            // DIP_CSE LEVEL 5 SEMESTER 1
            // Desired: General first, then specific
            // Reverse order: Specific first, then General
            clearDummyNotes(noteRepository, "DIP_CSE", 5, 1);
            
            // Insert Specific (appear at bottom)
            List<String> cseL5S1Specific = Arrays.asList(
                    "OBJECT ORIENTED PROGRAMMING WITH JAVA",
                    "OPERATING SYSTEM",
                    "BASIC VISUAL PROGRAMMING"
            );
            for (String mod : cseL5S1Specific) {
                insertDummyNote(noteRepository, inst, "DIP_CSE", 5, 1, mod, "CSE_201");
            }
            
            // Insert General (appear at top)
            for (String mod : l5s1General) {
                insertDummyNote(noteRepository, inst, "DIP_CSE", 5, 1, mod, "GEN_103");
            }

            // DIP_CSE LEVEL 5 SEMESTER 2
            clearDummyNotes(noteRepository, "DIP_CSE", 5, 2);
            insertDummyNote(noteRepository, inst, "DIP_CSE", 5, 2, "MICROCONTROLLER AND MICROPROCESSOR", "CSE_202");
        };
    }

    private void recreateDummyNotes(NoteRepository noteRepository, Institution inst, String prog, int level, int sem, List<String> modulesReverse, String code) {
        clearDummyNotes(noteRepository, prog, level, sem);
        for (String mod : modulesReverse) {
            insertDummyNote(noteRepository, inst, prog, level, sem, mod, code);
        }
    }

    private void clearDummyNotes(NoteRepository noteRepository, String prog, int level, int sem) {
        List<Note> existing = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(prog, level, sem);
        for (Note n : existing) {
            if ("#".equals(n.getFilename())) {
                noteRepository.delete(n);
            }
        }
    }

    private void insertDummyNote(NoteRepository noteRepository, Institution inst, String prog, int level, int sem, String module, String code) {
        Note note = new Note();
        note.setTitle(module + " - Course Outline / Introduction");
        note.setProgramType(prog);
        note.setLevelNo(level);
        note.setSemesterNo(sem);
        note.setModuleName(module);
        note.setModuleCode(code);
        note.setCategory("Note");
        note.setFilename("#");
        note.setUploadDate(LocalDateTime.now());
        note.setIsPublic(true);
        note.setDownloadCount(0);
        note.setUnitNumber(1);
        note.setInstitution(inst);
        noteRepository.save(note);
    }
}
