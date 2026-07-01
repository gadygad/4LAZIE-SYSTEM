package com.school.controller;

import com.school.model.Note;
import com.school.model.Role;
import com.school.model.User;
import com.school.repository.NoteRepository;
import com.school.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.school.model.Timetable;
import com.school.repository.TimetableRepository;
import com.school.service.FileStorageService;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;
    
    @Autowired
    private TimetableRepository timetableRepository;
    
    @Autowired
    private FileStorageService fileStorageService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public String listUsers(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }
        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);
        return "admin_users";
    }

    @PostMapping("/users/{id}/delete")
    public String deleteUser(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }
        
        if (user.getId().equals(id)) {
            redirectAttributes.addFlashAttribute("error", "You cannot delete yourself.");
            return "redirect:/admin/users";
        }
        
        userRepository.deleteById(id);
        redirectAttributes.addFlashAttribute("success", "User deleted successfully.");
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/reset-password")
    public String resetUserPassword(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            targetUser.setPassword(passwordEncoder.encode("SJUIT@123"));
            userRepository.save(targetUser);
            redirectAttributes.addFlashAttribute("success", "Password for " + targetUser.getName() + " has been reset to 'SJUIT@123'.");
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/role")
    public String changeUserRole(@PathVariable String id, @RequestParam("role") Role role, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }
        
        if (user.getId().equals(id)) {
            redirectAttributes.addFlashAttribute("error", "You cannot change your own role here.");
            return "redirect:/admin/users";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            targetUser.setRole(role);
            userRepository.save(targetUser);
            redirectAttributes.addFlashAttribute("success", "Role updated successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    // ============ ADMIN NOTES MANAGEMENT ============

    @GetMapping("/notes")
    public String listNotes(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }
        List<Note> notes = noteRepository.findAll();
        model.addAttribute("notes", notes);
        return "admin_notes";
    }

    @PostMapping("/notes/{id}/delete")
    public String deleteNote(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }
        noteRepository.deleteById(id);
        redirectAttributes.addFlashAttribute("success", "Note deleted successfully.");
        return "redirect:/admin/notes";
    }

    // ============ ADMIN TIMETABLES MANAGEMENT ============

    @GetMapping("/timetables")
    public String listTimetables(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }
        List<Timetable> timetables = timetableRepository.findAllByOrderByUploadDateDesc();
        model.addAttribute("timetables", timetables);
        return "admin_timetables";
    }

    @PostMapping("/timetables/upload")
    public String uploadTimetable(
            @RequestParam("file") MultipartFile file,
            @RequestParam("programType") String programType,
            @RequestParam("levelNo") Integer levelNo,
            @RequestParam("semesterNo") Integer semesterNo,
            @RequestParam("academicYear") String academicYear,
            HttpSession session, RedirectAttributes redirectAttributes) {
        
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }

        if (file.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Please select a file to upload.");
            return "redirect:/admin/timetables";
        }

        try {
            // First check if one already exists and delete the old one
            timetableRepository.findByProgramTypeAndLevelNoAndSemesterNo(programType, levelNo, semesterNo)
                .ifPresent(existing -> {
                    try {
                        String publicId = fileStorageService.extractCloudinaryPublicId(existing.getImageUrl());
                        fileStorageService.deleteFile(publicId);
                    } catch(Exception ignored) {}
                    timetableRepository.delete(existing);
                });

            // Upload the new file (Image or PDF) to Cloudinary
            String fileUrl = fileStorageService.uploadFile(file);
            
            Timetable timetable = new Timetable(programType, levelNo, semesterNo, academicYear, fileUrl);
            timetableRepository.save(timetable);
            
            redirectAttributes.addFlashAttribute("success", "Timetable uploaded successfully.");
        } catch (IOException e) {
            redirectAttributes.addFlashAttribute("error", "Failed to upload timetable: " + e.getMessage());
        }

        return "redirect:/admin/timetables";
    }

    @PostMapping("/timetables/{id}/delete")
    public String deleteTimetable(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }
        
        timetableRepository.findById(id).ifPresent(timetable -> {
            try {
                String publicId = fileStorageService.extractCloudinaryPublicId(timetable.getImageUrl());
                fileStorageService.deleteFile(publicId);
            } catch(Exception ignored) {}
            timetableRepository.delete(timetable);
        });
        
        redirectAttributes.addFlashAttribute("success", "Timetable deleted successfully.");
        return "redirect:/admin/timetables";
    }
}
