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

import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;

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
            redirectAttributes.addFlashAttribute("error", "Hauwezi kujifuta mwenyewe.");
            return "redirect:/admin/users";
        }
        
        userRepository.deleteById(id);
        redirectAttributes.addFlashAttribute("success", "User deleted successfully.");
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/role")
    public String changeUserRole(@PathVariable String id, @RequestParam("role") Role role, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = (User) session.getAttribute("user");
        if (user == null || user.getRole() != Role.ADMIN) {
            return "redirect:/login";
        }
        
        if (user.getId().equals(id)) {
            redirectAttributes.addFlashAttribute("error", "Hauwezi kubadili cheo chako mwenyewe hapa.");
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
}
