package com.school.controller;

import com.school.model.Note;
import com.school.repository.NoteRepository;
import com.school.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping
    public String adminDashboard(Model model) {
        model.addAttribute("totalNotes", noteRepository.count());
        return "admin_dashboard";
    }

    @PostMapping("/upload-note")
    public String uploadNote(
            @RequestParam("title") String title,
            @RequestParam("programType") String programType,
            @RequestParam("levelNo") Integer levelNo,
            @RequestParam("semesterNo") Integer semesterNo,
            @RequestParam("category") String category,
            @RequestParam("moduleName") String moduleName,
            @RequestParam("moduleCode") String moduleCode,
            @RequestParam("academicYear") String academicYear,
            @RequestParam(value = "unitNumber", required = false) Integer unitNumber,
            @RequestParam("file") MultipartFile file,
            RedirectAttributes redirectAttributes) {

        try {
            if (file.isEmpty()) {
                redirectAttributes.addFlashAttribute("error", "Please select a file to upload.");
                return "redirect:/admin";
            }

            // Check for duplication BEFORE uploading to Cloudinary
            boolean exists = noteRepository.existsByTitleIgnoreCaseAndProgramTypeAndLevelNoAndSemesterNoAndModuleNameIgnoreCaseAndUnitNumber(
                    title, programType, levelNo, semesterNo, moduleName, unitNumber);
                    
            if (exists) {
                redirectAttributes.addFlashAttribute("error", "Duplication Error: A material with the exact same Title, Program, Level, Semester, and Unit already exists!");
                return "redirect:/admin";
            }

            // 1. Upload to Cloudinary
            String fileUrl = fileStorageService.uploadFile(file);

            // 2. Save Note to DB (Constructor auto-converts title and academicYear to UPPERCASE)
            Note note = new Note(
                    title,
                    file.getOriginalFilename(),
                    fileUrl,
                    programType,
                    levelNo,
                    semesterNo,
                    category,
                    moduleName,
                    moduleCode,
                    academicYear,
                    LocalDateTime.now()
            );
            
            if (unitNumber != null) {
                note.setUnitNumber(unitNumber);
            }
            
            noteRepository.save(note);

            redirectAttributes.addFlashAttribute("success", "File successfully uploaded and saved!");

        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "An error occurred while saving the file: " + e.getMessage());
        }

        return "redirect:/admin";
    }
}
