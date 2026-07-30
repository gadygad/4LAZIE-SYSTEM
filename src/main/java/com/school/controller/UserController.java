package com.school.controller;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import com.school.model.User;
import com.school.repository.UserRepository;
import com.school.service.FileStorageService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@Controller
public class UserController {

        private UserRepository userRepository;

        private com.school.util.AuthUtil authUtil;

    private User getLoggedInUser() {
        return authUtil.getLoggedInUser();
    }

        private com.school.service.NotificationService notificationService;

        private com.school.repository.NoteRepository noteRepository;

        private FileStorageService fileStorageService;

    public UserController(UserRepository userRepository, com.school.util.AuthUtil authUtil, com.school.service.NotificationService notificationService, com.school.repository.NoteRepository noteRepository, FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.authUtil = authUtil;
        this.notificationService = notificationService;
        this.noteRepository = noteRepository;
        this.fileStorageService = fileStorageService;
    }


    @GetMapping("/explore")
    public String getExplorePage() {
        return "notes/explore";
    }

    @GetMapping("/notifications")
    public String getAllNotifications(Model model) {
        User sessionUser = getLoggedInUser();
        if (sessionUser == null) {
            return "redirect:/login";
        }
        model.addAttribute("notifications", notificationService.getUserNotifications(sessionUser.getId()));
        return "user/notifications";
    }

    @GetMapping("/profile")
    public String getProfile(@RequestParam(value = "edit", required = false, defaultValue = "false") boolean edit,
                             Model model) {
        User sessionUser = getLoggedInUser();
        if (sessionUser == null) {
            return "redirect:/login";
        }
        
        // Fetch fresh user from DB to ensure we have the latest institution and stats
        User user = userRepository.findById(sessionUser.getId()).orElse(sessionUser);
        
        // Safely get coverPhoto via reflection (handles old compiled classes without the field)
        String coverPhoto = null;
        try {
            java.lang.reflect.Method m = user.getClass().getMethod("getCoverPhoto");
            coverPhoto = (String) m.invoke(user);
        } catch (Exception ignored) { }
        model.addAttribute("coverPhoto", coverPhoto);
        
        // Self-heal: If user has no institution, assign default SJUIT
        if (user.getInstitution() == null) {
            com.school.model.Institution sjuit = new com.school.model.Institution();
            sjuit.setId("1");
            sjuit.setName("St. Joseph University in Tanzania");
            sjuit.setShortName("SJUIT");
            user.setInstitution(sjuit);
            userRepository.save(user); // Save back to database!
        }
        
        model.addAttribute("user", user);
        model.addAttribute("editMode", edit);
        return "user/profile";
    }

    @PostMapping("/profile")
    public String updateProfile(@jakarta.validation.Valid @ModelAttribute("formUser") com.school.dto.UserProfileUpdateDTO formUser,
                             org.springframework.validation.BindingResult bindingResult,
                             HttpSession session, Model model) {

        User sessionUser = getLoggedInUser();
        if (sessionUser == null) {
            return "redirect:/login";
        }
        
        if (bindingResult.hasErrors()) {
            model.addAttribute("error", bindingResult.getAllErrors().get(0).getDefaultMessage());
            model.addAttribute("user", sessionUser); // Revert to current data for display
            model.addAttribute("editMode", true);
            return "user/profile";
        }
        
        if (!sessionUser.getEmail().equalsIgnoreCase(formUser.getEmail())) {
            Optional<User> existingUser = userRepository.findByEmail(formUser.getEmail());
            if (existingUser.isPresent()) {
                model.addAttribute("error", "Email is already in use by another account.");
                model.addAttribute("user", sessionUser); // Revert form data
                model.addAttribute("editMode", true);
                return "user/profile";
            }
        }
        
        // Update mutable fields
        sessionUser.setName(formUser.getName());
        sessionUser.setEmail(formUser.getEmail());
        
        MultipartFile file = formUser.getFile();
        MultipartFile coverPhotoFile = formUser.getCoverPhotoFile();
        
        // Handle profile picture upload if present
        if (file != null && !file.isEmpty()) {
            try {
                String fileUrl = fileStorageService.uploadFile(file);
                sessionUser.setProfilePicture(fileUrl);
            } catch (IOException e) {
                model.addAttribute("error", "Failed to upload profile picture: " + e.getMessage());
                model.addAttribute("user", sessionUser);
                model.addAttribute("editMode", true);
                return "user/profile";
            }
        }
        
        // Handle cover photo upload if present
        if (coverPhotoFile != null && !coverPhotoFile.isEmpty()) {
            try {
                String coverUrl = fileStorageService.uploadFile(coverPhotoFile);
                sessionUser.setCoverPhoto(coverUrl);
            } catch (IOException e) {
                model.addAttribute("error", "Failed to upload cover photo: " + e.getMessage());
                model.addAttribute("user", sessionUser);
                model.addAttribute("editMode", true);
                return "user/profile";
            }
        }
        
        sessionUser.setLevel(formUser.getLevel());
        sessionUser.setSemester(formUser.getSemester());
        // Save changes
        userRepository.save(sessionUser);
        // Update session attribute
        session.setAttribute("user", sessionUser);
        
        // Update Security Context
        org.springframework.security.core.Authentication currentAuth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (currentAuth != null) {
            String role = sessionUser.getRole() != null ? sessionUser.getRole().name() : com.school.model.Role.STUDENT.name();
            org.springframework.security.core.userdetails.UserDetails newUserDetails = 
                new org.springframework.security.core.userdetails.User(
                    sessionUser.getEmail(), 
                    sessionUser.getPassword(), 
                    java.util.Collections.singletonList(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                );
            org.springframework.security.authentication.UsernamePasswordAuthenticationToken newAuth = 
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                    newUserDetails, currentAuth.getCredentials(), newUserDetails.getAuthorities());
            org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(newAuth);
        }
        
        model.addAttribute("user", sessionUser);
        // Pass coverPhoto safely for template
        String coverPhoto = null;
        try {
            java.lang.reflect.Method m = sessionUser.getClass().getMethod("getCoverPhoto");
            coverPhoto = (String) m.invoke(sessionUser);
        } catch (Exception ignored) { }
        model.addAttribute("coverPhoto", coverPhoto);
        model.addAttribute("success", "Profile updated successfully!");
        model.addAttribute("editMode", false);
        return "user/profile";
    }

    @GetMapping("/profile/saved")
    public String getSavedNotes(Model model) {
        User user = getLoggedInUser();
        if (user == null) {
            return "redirect:/login";
        }
        
        // Refresh user from DB to get latest saved items
        user = userRepository.findById(user.getId()).orElse(user);
        java.util.List<com.school.model.Note> notes = new java.util.ArrayList<>();
        if (user.getSavedNotes() != null && !user.getSavedNotes().isEmpty()) {
            noteRepository.findAllById(user.getSavedNotes()).forEach(notes::add);
        }
        
        model.addAttribute("notes", notes);
        model.addAttribute("pageTitle", "Saved Items");
        model.addAttribute("pageIcon", "bi-bookmark-fill");
        return "user/my_notes";
    }

    @GetMapping("/profile/downloads")
    public String getDownloadedNotes(Model model) {
        User user = getLoggedInUser();
        if (user == null) {
            return "redirect:/login";
        }

        // Refresh user from DB
        user = userRepository.findById(user.getId()).orElse(user);
        java.util.List<com.school.model.Note> notes = new java.util.ArrayList<>();
        if (user.getDownloadedNotes() != null && !user.getDownloadedNotes().isEmpty()) {
            noteRepository.findAllById(user.getDownloadedNotes()).forEach(notes::add);
        }

        model.addAttribute("notes", notes);
        model.addAttribute("pageTitle", "Download History");
        model.addAttribute("pageIcon", "bi-cloud-arrow-down-fill");
        return "user/my_notes";
    }
}
