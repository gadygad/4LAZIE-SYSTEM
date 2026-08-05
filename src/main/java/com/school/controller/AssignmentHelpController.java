package com.school.controller;

import com.school.model.AssignmentRequest;
import com.school.model.ChatMessage;
import com.school.model.User;
import com.school.repository.UserRepository;
import com.school.service.AssignmentHelpService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
public class AssignmentHelpController {

    @Autowired
    private AssignmentHelpService assignmentHelpService;

    @Autowired
    private UserRepository userRepository;

    // --- USER ENDPOINTS ---

    @GetMapping("/messages")
    public String getUserMessages(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        }
        
        List<AssignmentRequest> requests = assignmentHelpService.getUserRequests(user.getId());
        model.addAttribute("messages", requests);
        return "user/messages";
    }

    @PostMapping("/api/assignments/request")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> submitRequest(
            @RequestParam("subjectName") String subjectName,
            @RequestParam(value = "questionText", required = false) String questionText,
            @RequestParam(value = "deadline", required = false) String deadline,
            @RequestParam(value = "file", required = false) MultipartFile file,
            HttpSession session) {
        
        System.out.println("======> RECEIVED ASSIGNMENT REQUEST: " + subjectName);
        
        Map<String, Object> response = new HashMap<>();
        User user = (User) session.getAttribute("user");
        
        if (user == null) {
            response.put("success", false);
            response.put("message", "User not logged in");
            return ResponseEntity.status(401).body(response);
        }

        try {
            assignmentHelpService.createRequest(user.getId(), subjectName, questionText, deadline, file);
            response.put("success", true);
            response.put("message", "Request submitted successfully");
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            response.put("success", false);
            response.put("message", "Failed to upload file");
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/api/assignments/read/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> markAsRead(@PathVariable String id, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        User user = (User) session.getAttribute("user");
        
        if (user != null) {
            assignmentHelpService.markAsRead(id);
            response.put("success", true);
            return ResponseEntity.ok(response);
        }
        
        response.put("success", false);
        return ResponseEntity.status(401).body(response);
    }

    // --- ADMIN ENDPOINTS ---

    @GetMapping("/admin/assignments")
    public String getAdminAssignments(HttpSession session, Model model) {
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!"ADMIN".equals(admin.getRole().name()) && !"SUPER_ADMIN".equals(admin.getRole().name()))) {
            return "redirect:/login";
        }
        
        List<AssignmentRequest> requests = assignmentHelpService.getAllRequests();
        model.addAttribute("requests", requests);
        
        // Add user map for resolving names
        Map<String, User> userMap = new HashMap<>();
        for (AssignmentRequest req : requests) {
            if (!userMap.containsKey(req.getUserId())) {
                userRepository.findById(req.getUserId()).ifPresent(u -> userMap.put(req.getUserId(), u));
            }
        }
        model.addAttribute("userMap", userMap);
        
        return "admin/admin_assignments";
    }

    @PostMapping("/admin/assignments/reply/{id}")
    public String replyToAssignment(
            @PathVariable String id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            HttpSession session,
            RedirectAttributes redirectAttributes) {
            
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!"ADMIN".equals(admin.getRole().name()) && !"SUPER_ADMIN".equals(admin.getRole().name()))) {
            return "redirect:/login";
        }

        try {
            AssignmentRequest req = assignmentHelpService.getRequestById(id).orElse(null);
            if (req != null) {
                User student = userRepository.findById(req.getUserId()).orElse(null);
                String studentName = (student != null) ? student.getName() : "Mwanafunzi";
                assignmentHelpService.replyToRequest(id, file, studentName);
                redirectAttributes.addFlashAttribute("success", "Automated Magic Reply sent successfully!");
            }
        } catch (IOException e) {
            redirectAttributes.addFlashAttribute("error", "Failed to upload reply file.");
        }

        return "redirect:/admin/assignments";
    }
    
    @PostMapping("/api/assignments/chat/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> addChatUserAjax(
            @PathVariable String id,
            @RequestParam("messageText") String messageText,
            @RequestParam(value = "file", required = false) MultipartFile file,
            HttpSession session) {
        
        Map<String, Object> response = new HashMap<>();
        User user = (User) session.getAttribute("user");
        if (user == null) {
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        try {
            AssignmentRequest req = assignmentHelpService.addChatMessage(id, user.getId(), user.getName(), messageText, file);
            if (req != null && req.getMessages() != null && !req.getMessages().isEmpty()) {
                ChatMessage lastMsg = req.getMessages().get(req.getMessages().size() - 1);
                response.put("success", true);
                response.put("messageText", lastMsg.getMessageText());
                response.put("time", java.time.format.DateTimeFormatter.ofPattern("hh:mm a").format(lastMsg.getTimestamp()));
                response.put("attachmentUrl", lastMsg.getAttachmentUrl());
            } else {
                response.put("success", false);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PostMapping("/admin/assignments/chat/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> addChatAdmin(
            @PathVariable String id,
            @RequestParam("messageText") String messageText,
            @RequestParam(value = "file", required = false) MultipartFile file,
            HttpSession session) {
            
        Map<String, Object> response = new HashMap<>();
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!"ADMIN".equals(admin.getRole().name()) && !"SUPER_ADMIN".equals(admin.getRole().name()))) {
            response.put("success", false);
            response.put("message", "Unauthorized");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            AssignmentRequest req = assignmentHelpService.addChatMessage(id, "ADMIN", "4LAZIE", messageText, file);
            if (req != null && req.getMessages() != null && !req.getMessages().isEmpty()) {
                ChatMessage lastMsg = req.getMessages().get(req.getMessages().size() - 1);
                response.put("success", true);
                response.put("messageText", lastMsg.getMessageText());
                response.put("time", java.time.format.DateTimeFormatter.ofPattern("hh:mm a").format(lastMsg.getTimestamp()));
                response.put("attachmentUrl", lastMsg.getAttachmentUrl());
            } else {
                response.put("success", false);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
