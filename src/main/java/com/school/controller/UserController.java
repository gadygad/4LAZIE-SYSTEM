package com.school.controller;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

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

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @GetMapping("/profile")
    public String getProfile(@RequestParam(value = "edit", required = false, defaultValue = "false") boolean edit,
                             HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        }
        model.addAttribute("user", user);
        model.addAttribute("editMode", edit);
        return "profile";
    }

    @PostMapping("/profile")
public String updateProfile(@ModelAttribute("user") User formUser,
                         @RequestParam(value = "file", required = false) MultipartFile file,
                         HttpSession session, Model model) {

        User sessionUser = (User) session.getAttribute("user");
        if (sessionUser == null) {
            return "redirect:/login";
        }
        
        if (!sessionUser.getEmail().equalsIgnoreCase(formUser.getEmail())) {
            Optional<User> existingUser = userRepository.findByEmail(formUser.getEmail());
            if (existingUser.isPresent()) {
                model.addAttribute("error", "Email tayari inatumiwa na mtu mwingine.");
                model.addAttribute("user", sessionUser); // Revert form data
                model.addAttribute("editMode", true);
                return "profile";
            }
        }
        
        // Update mutable fields
        sessionUser.setName(formUser.getName());
        sessionUser.setEmail(formUser.getEmail());
        // Handle profile picture upload if present
        if (file != null && !file.isEmpty()) {
            try {
                String fileUrl = fileStorageService.uploadFile(file);
                sessionUser.setProfilePicture(fileUrl);
            } catch (IOException e) {
                model.addAttribute("error", "Failed to upload profile picture: " + e.getMessage());
                model.addAttribute("user", sessionUser);
                model.addAttribute("editMode", true);
                return "profile";
            }
        } else {
            // Preserve existing picture if no new file provided
            sessionUser.setProfilePicture(formUser.getProfilePicture());
        }
        sessionUser.setCourseProgram(formUser.getCourseProgram());
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
        model.addAttribute("success", "Profile updated successfully!");
        model.addAttribute("editMode", false);
        return "profile";
    }
}
