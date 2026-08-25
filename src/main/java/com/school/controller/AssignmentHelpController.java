package com.school.controller;

import com.school.model.AssignmentRequest;
import com.school.model.DirectChat;
import com.school.model.ChatMessage;
import com.school.model.User;
import com.school.repository.UserRepository;
import com.school.service.AssignmentHelpService;
import com.school.service.DirectChatService;
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
    private DirectChatService directChatService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.school.repository.AssignmentRequestRepository assignmentRequestRepository;

    @Autowired
    private com.school.repository.PendingActionRepository pendingActionRepository;

    @Autowired
    private com.school.service.EmailService emailService;

    @Autowired
    private com.school.service.PushNotificationService pushNotificationService;

    // --- USER ENDPOINTS ---

    @GetMapping("/messages")
    public String getUserMessages(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            return "redirect:/login";
        }
        List<AssignmentRequest> requests = assignmentHelpService.getUserRequests(user.getId());
        model.addAttribute("messages", requests);

        // Fetch this student's direct chat with admin (if any)
        DirectChat directChat = directChatService.getStudentInbox(user.getId())
                .stream().findFirst().orElse(null);
        model.addAttribute("directChat", directChat);
        if (directChat != null) {
            model.addAttribute("directChatUnread", directChat.isHasUnreadForStudent());
        }
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
            assignmentHelpService.markAsRead(id, user.getId());
            response.put("success", true);
            return ResponseEntity.ok(response);
        }
        
        response.put("success", false);
        return ResponseEntity.status(401).body(response);
    }

    @PostMapping("/api/assignments/admin-read/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> markAsReadAdmin(@PathVariable String id, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        User admin = (User) session.getAttribute("user");
        if (admin != null && (admin.getRole().name().equals("ADMIN") || admin.getRole().name().equals("SUPER_ADMIN"))) {
            assignmentHelpService.markAsRead(id, "ADMIN");
            response.put("success", true);
            return ResponseEntity.ok(response);
        }
        response.put("success", false);
        return ResponseEntity.status(401).body(response);
    }

    @PostMapping("/api/public/contact")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> submitPublicContact(
            @RequestParam("fullName") String fullName,
            @RequestParam("email") String email,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("subject") String subject,
            @RequestParam("message") String message) {
        
        Map<String, Object> response = new HashMap<>();
        try {
            assignmentHelpService.createPublicContactRequest(fullName, email, phoneNumber, subject, message);
            response.put("success", true);
            response.put("message", "Message sent successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Failed to send message: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    // --- ADMIN ENDPOINTS ---

    @GetMapping("/admin/assignments")
    public String getAdminAssignments(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size,
            @RequestParam(defaultValue = "ALL") String status,
            HttpSession session, Model model) {
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!"ADMIN".equals(admin.getRole().name()) && !"SUPER_ADMIN".equals(admin.getRole().name()))) {
            return "redirect:/login";
        }
        
        org.springframework.data.domain.Page<AssignmentRequest> requestsPage = assignmentHelpService.getAdminRequestsPaginated(status, page, size);
        model.addAttribute("requestsPage", requestsPage);
        model.addAttribute("requests", requestsPage.getContent());
        model.addAttribute("currentStatus", status);
        
        // Add user map for resolving names
        Map<String, User> userMap = new HashMap<>();
        for (AssignmentRequest req : requestsPage.getContent()) {
            if (req.getUserId() != null && !userMap.containsKey(req.getUserId())) {
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
            @RequestParam(value = "replyMessage", required = false) String replyMessage,
            HttpSession session,
            RedirectAttributes redirectAttributes) {
            
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!"ADMIN".equals(admin.getRole().name()) && !"SUPER_ADMIN".equals(admin.getRole().name()))) {
            return "redirect:/login";
        }

        try {
            AssignmentRequest req = assignmentHelpService.getRequestById(id).orElse(null);
            if (req != null) {
                if (req.isPublicContact()) {
                    // For public contacts, Admin submits a draft which requires Super Admin approval,
                    // but Super Admin's reply goes directly.
                    if (replyMessage == null || replyMessage.trim().isEmpty()) {
                        redirectAttributes.addFlashAttribute("error", "Reply message cannot be empty.");
                        return "redirect:/admin/assignments";
                    }
                    
                    req.setAdminReply(replyMessage);
                    
                    if ("SUPER_ADMIN".equals(admin.getRole().name())) {
                        req.setStatus("SOLVED");
                        req.setSolvedAt(java.time.LocalDateTime.now());
                        assignmentRequestRepository.save(req);
                        emailService.sendSupportReplyEmail(req.getEmail(), req.getFullName(), replyMessage, req.getQuestionText());
                        redirectAttributes.addFlashAttribute("success", "Reply sent directly to user.");
                    } else {
                        // Admin: Save as draft
                        assignmentRequestRepository.save(req);
                        
                        // Create Pending Action for Super Admin
                        com.school.model.PendingAction pendingAction = new com.school.model.PendingAction(
                            admin.getId(), 
                            admin.getName(), 
                            "CONTACT_MESSAGE", 
                            req.getId(), 
                            "Reply to: " + req.getFullName() + " (" + req.getEmail() + ")", 
                            "REPLY"
                        );
                        pendingActionRepository.save(pendingAction);
                        
                        redirectAttributes.addFlashAttribute("success", "Reply drafted and sent to Super Admin for approval.");
                    }
                } else {
                    User student = userRepository.findById(req.getUserId()).orElse(null);
                    String studentName = (student != null) ? student.getName() : "Mwanafunzi";
                    assignmentHelpService.replyToRequest(id, file, studentName);
                    
                    if (pushNotificationService != null && req.getUserId() != null) {
                        pushNotificationService.sendToUser(req.getUserId(), "Assignment Reply", "An admin has replied to your " + req.getSubjectName() + " assignment.", "/messages");
                    }
                    
                    redirectAttributes.addFlashAttribute("success", "Automated Magic Reply sent successfully!");
                }
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
            @RequestParam(value = "replyToMessageId", required = false) String replyToMessageId,
            @RequestParam(value = "replyToSenderName", required = false) String replyToSenderName,
            @RequestParam(value = "replyToMessageText", required = false) String replyToMessageText,
            HttpSession session) {
        
        Map<String, Object> response = new HashMap<>();
        User user = (User) session.getAttribute("user");
        if (user == null) {
            response.put("success", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        
        try {
            AssignmentRequest req = assignmentHelpService.addChatMessage(id, user.getId(), user.getName(), messageText, file, replyToMessageId, replyToSenderName, replyToMessageText);
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
            @RequestParam(value = "replyToMessageId", required = false) String replyToMessageId,
            @RequestParam(value = "replyToSenderName", required = false) String replyToSenderName,
            @RequestParam(value = "replyToMessageText", required = false) String replyToMessageText,
            HttpSession session) {
            
        Map<String, Object> response = new HashMap<>();
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!"ADMIN".equals(admin.getRole().name()) && !"SUPER_ADMIN".equals(admin.getRole().name()))) {
            response.put("success", false);
            response.put("message", "Unauthorized");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        try {
            AssignmentRequest req = assignmentHelpService.addChatMessage(id, "ADMIN", "4LAZIE", messageText, file, replyToMessageId, replyToSenderName, replyToMessageText);
            if (req != null && req.getMessages() != null && !req.getMessages().isEmpty()) {
                ChatMessage lastMsg = req.getMessages().get(req.getMessages().size() - 1);
                response.put("success", true);
                response.put("messageText", lastMsg.getMessageText());
                response.put("time", java.time.format.DateTimeFormatter.ofPattern("hh:mm a").format(lastMsg.getTimestamp()));
                response.put("attachmentUrl", lastMsg.getAttachmentUrl());
                
                if (pushNotificationService != null && req.getUserId() != null) {
                    pushNotificationService.sendToUser(req.getUserId(), "New Message", "An admin sent you a message about your " + req.getSubjectName() + " assignment.", "/messages");
                }
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
