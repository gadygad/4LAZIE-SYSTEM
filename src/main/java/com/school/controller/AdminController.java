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

import com.school.model.User;
import com.school.repository.UserRepository;
import java.security.Principal;
import java.util.Optional;
import java.time.LocalDateTime;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public String adminDashboard(Model model) {
        model.addAttribute("totalNotes", noteRepository.count());
        model.addAttribute("notes", noteRepository.findAllByOrderByIdDesc());
        model.addAttribute("users", userRepository.findAll());
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

    @PostMapping("/delete-note/{id}")
    public String deleteNote(@PathVariable("id") Integer id, RedirectAttributes redirectAttributes) {
        try {
            if (noteRepository.existsById(id)) {
                noteRepository.deleteById(id);
                redirectAttributes.addFlashAttribute("success", "Material successfully deleted.");
            } else {
                redirectAttributes.addFlashAttribute("error", "Material not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Error deleting material: " + e.getMessage());
        }
        return "redirect:/admin";
    }

    // --- USER MANAGEMENT ENDPOINTS ---

    @PostMapping("/delete-user/{id}")
    public String deleteUser(@PathVariable("id") Integer id, Principal principal, RedirectAttributes redirectAttributes) {
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                // Prevent admin from deleting themselves
                if (principal != null && user.getEmail().equals(principal.getName())) {
                    redirectAttributes.addFlashAttribute("error", "Action Denied: You cannot delete your own admin account.");
                    return "redirect:/admin";
                }
                userRepository.deleteById(id);
                redirectAttributes.addFlashAttribute("success", "User successfully deleted.");
            } else {
                redirectAttributes.addFlashAttribute("error", "User not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Error deleting user: " + e.getMessage());
        }
        return "redirect:/admin";
    }

    @PostMapping("/toggle-premium/{id}")
    public String togglePremium(@PathVariable("id") Integer id, RedirectAttributes redirectAttributes) {
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                user.setIsPremium(user.getIsPremium() == null ? true : !user.getIsPremium());
                userRepository.save(user);
                redirectAttributes.addFlashAttribute("success", "User premium status successfully updated.");
            } else {
                redirectAttributes.addFlashAttribute("error", "User not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Error updating premium status: " + e.getMessage());
        }
        return "redirect:/admin";
    }

    @PostMapping("/change-role/{id}")
    public String changeRole(@PathVariable("id") Integer id, @RequestParam("role") String newRole, Principal principal, RedirectAttributes redirectAttributes) {
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                // Prevent admin from downgrading themselves
                if (principal != null && user.getEmail().equals(principal.getName()) && !newRole.equals("ADMIN")) {
                    redirectAttributes.addFlashAttribute("error", "Action Denied: You cannot remove your own admin privileges.");
                    return "redirect:/admin";
                }
                user.setRole(newRole);
                userRepository.save(user);
                redirectAttributes.addFlashAttribute("success", "User role successfully updated to " + newRole + ".");
            } else {
                redirectAttributes.addFlashAttribute("error", "User not found.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            redirectAttributes.addFlashAttribute("error", "Error changing role: " + e.getMessage());
        }
        return "redirect:/admin";
    }
}
