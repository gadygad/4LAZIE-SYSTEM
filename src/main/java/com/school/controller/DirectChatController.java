package com.school.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.school.model.DirectChat;
import com.school.model.ChatMessage;
import com.school.model.User;
import com.school.service.DirectChatService;
import com.school.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Controller
public class DirectChatController {

    @Autowired
    private DirectChatService directChatService;

    private UserRepository userRepository;
    
    private static UserRepository userRepoStatic;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
        DirectChatController.userRepoStatic = userRepository;
    }

    // ─────────────────────────────────────────────
    //  SSE Emitter Registry — chatId → list of emitters
    //  Each entry stores the emitter + the viewer's identifier
    // ─────────────────────────────────────────────

    // Viewer identifier stored alongside the emitter
    private static final Map<String, List<SseEmitter>> chatEmitters   = new ConcurrentHashMap<>();
    // Maps each emitter to its viewer identifier ("ADMIN" or studentId)
    private static final Map<SseEmitter, String>       emitterViewers = new java.util.concurrent.ConcurrentHashMap<>();

    /**
     * Notify ALL listeners for a chatId with personalized isSelf payloads.
     * Admin sees messages from ADMIN perspective, student sees from their own ID perspective.
     */
    private static void notifyChat(String chatId, DirectChat updatedChat) {
        List<SseEmitter> emitters = chatEmitters.getOrDefault(chatId, Collections.emptyList());
        List<SseEmitter> dead = new ArrayList<>();
        for (SseEmitter emitter : emitters) {
            String viewer = emitterViewers.getOrDefault(emitter, "ADMIN");
            try {
                List<Map<String, Object>> payload = buildMessageListStatic(updatedChat, viewer);
                emitter.send(SseEmitter.event().name("message").data(payload, MediaType.APPLICATION_JSON));
            } catch (IOException e) {
                dead.add(emitter);
            }
        }
        for (SseEmitter d : dead) {
            emitters.remove(d);
            emitterViewers.remove(d);
        }
    }

    /** Static helper usable from notifyChat static context */
    private static List<Map<String, Object>> buildMessageListStatic(DirectChat chat, String viewerIdentifier) {
        List<Map<String, Object>> result = new ArrayList<>();
        DateTimeFormatter fmt     = DateTimeFormatter.ofPattern("hh:mm a");
        DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("dd MMM");
        for (ChatMessage msg : chat.getMessages()) {
            Map<String, Object> m = new HashMap<>();
            m.put("id",                   msg.getId());
            m.put("senderId",            msg.getSenderId());
            m.put("senderName",           msg.getSenderName());
            m.put("senderProfilePicture", msg.getSenderProfilePicture());
            m.put("messageText",          msg.getMessageText());
            m.put("time",  msg.getTimestamp() != null ? fmt.format(msg.getTimestamp()) : "");
            m.put("date",  msg.getTimestamp() != null ? dateFmt.format(msg.getTimestamp()) : "");
            boolean isSelf = "ADMIN".equals(viewerIdentifier)
                    ? "ADMIN".equals(msg.getSenderId())
                    : viewerIdentifier.equals(msg.getSenderId());
            m.put("isSelf", isSelf);
            
            // Calculate message status: Sent, Delivered, or Read
            String status = "Sent";
            if (msg.isRead()) {
                status = "Read";
            } else {
                // Check if recipient is online
                String recipientId = isSelf ? ( "ADMIN".equals(viewerIdentifier) ? chat.getStudentId() : "ADMIN" ) : viewerIdentifier;
                if ("ADMIN".equals(recipientId)) {
                    // Assuming admin is generally online if any admin is online, or we just default to Delivered if active in last 5 mins.
                    // For simplicity, we can check any user with ROLE_ADMIN, but here we just check if ADMIN has an active emitter globally?
                    // Actually, if recipient is ADMIN, we can check if "ADMIN" is in emitterViewers as a rough proxy.
                    if (emitterViewers.containsValue("ADMIN")) {
                        status = "Delivered";
                    }
                } else {
                    if (userRepoStatic != null) {
                        User student = userRepoStatic.findById(recipientId).orElse(null);
                        if (student != null && student.getLastActiveTime() != null) {
                            if (student.getLastActiveTime().isAfter(LocalDateTime.now().minusMinutes(5))) {
                                status = "Delivered";
                            }
                        }
                    }
                }
            }
            m.put("status", status);
            
            result.add(m);
        }
        return result;
    }

    /** Helper to register emitter with viewer identifier and handle cleanup */
    private static void registerEmitter(String chatId, SseEmitter emitter, String viewerIdentifier) {
        chatEmitters.computeIfAbsent(chatId, k -> new CopyOnWriteArrayList<>()).add(emitter);
        emitterViewers.put(emitter, viewerIdentifier);
        emitter.onCompletion(() -> {
            chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter);
            emitterViewers.remove(emitter);
        });
        emitter.onTimeout(() -> {
            chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter);
            emitterViewers.remove(emitter);
        });
    }

    // ─────────────────────────────────────────────
    //  ADMIN SIDE
    // ─────────────────────────────────────────────

    /** Admin anaanzisha au kuendelea chat na mwanafunzi — POST /admin/chat/start/{studentId} */
    @PostMapping("/admin/chat/start/{studentId}")
    public String startChat(@PathVariable String studentId, HttpSession session) {
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!admin.getRole().name().equals("ADMIN") && !admin.getRole().name().equals("SUPER_ADMIN"))) {
            return "redirect:/login";
        }
        DirectChat chat = directChatService.startOrGetChat(admin.getId(), studentId);
        return "redirect:/admin/chat/" + chat.getId();
    }

    /** Admin anaangalia chat page — GET /admin/chat/{chatId} */
    @GetMapping("/admin/chat/{chatId}")
    public String adminChatPage(@PathVariable String chatId, Model model, HttpSession session) {
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!admin.getRole().name().equals("ADMIN") && !admin.getRole().name().equals("SUPER_ADMIN"))) {
            return "redirect:/login";
        }
        DirectChat chat = directChatService.getChatById(chatId);
        if (chat == null) return "redirect:/admin/users";
        directChatService.markReadForAdmin(chatId);
        User student = userRepository.findById(chat.getStudentId()).orElse(null);
        model.addAttribute("chat", chat);
        model.addAttribute("student", student);
        model.addAttribute("loggedInUser", admin);
        return "admin/admin_direct_chat";
    }

    /** SSE stream for admin — GET /admin/chat/{chatId}/stream */
    @GetMapping(value = "/admin/chat/{chatId}/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @ResponseBody
    public SseEmitter adminStream(@PathVariable String chatId, HttpSession session) {
        User admin = (User) session.getAttribute("user");
        SseEmitter emitter = new SseEmitter(180_000L);
        if (admin == null) { emitter.complete(); return emitter; }

        // Register with ADMIN perspective
        registerEmitter(chatId, emitter, "ADMIN");

        // Send current messages immediately from ADMIN's perspective
        DirectChat chat = directChatService.getChatById(chatId);
        if (chat != null) {
            try {
                emitter.send(SseEmitter.event().name("init")
                        .data(buildMessageListStatic(chat, "ADMIN"), MediaType.APPLICATION_JSON));
            } catch (IOException e) { /* ignore */ }
        }
        return emitter;
    }

    /** Admin anatuma message — POST /admin/chat/{chatId}/send */
    @PostMapping("/admin/chat/{chatId}/send")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> adminSend(
            @PathVariable String chatId,
            @RequestParam("messageText") String messageText,
            HttpSession session) {

        Map<String, Object> resp = new HashMap<>();
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!admin.getRole().name().equals("ADMIN") && !admin.getRole().name().equals("SUPER_ADMIN"))) {
            resp.put("success", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp);
        }
        if (messageText == null || messageText.trim().isEmpty()) {
            resp.put("success", false);
            return ResponseEntity.badRequest().body(resp);
        }
        DirectChat chat = directChatService.sendMessage(chatId, "ADMIN", "4LAZIE Admin", messageText.trim());
        if (chat == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp); }

        // Push personalized SSE to every listener (admin sees isSelf=true, student sees isSelf=false)
        notifyChat(chatId, chat);

        ChatMessage last = chat.getMessages().get(chat.getMessages().size() - 1);
        resp.put("success", true);
        resp.put("id", last.getId());
        resp.put("messageText", last.getMessageText());
        resp.put("time", DateTimeFormatter.ofPattern("hh:mm a").format(last.getTimestamp()));
        return ResponseEntity.ok(resp);
    }

    /** Fallback HTTP poll for admin — GET /admin/chat/{chatId}/messages */
    @GetMapping("/admin/chat/{chatId}/messages")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> adminPollMessages(@PathVariable String chatId, HttpSession session) {
        Map<String, Object> resp = new HashMap<>();
        User admin = (User) session.getAttribute("user");
        if (admin == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp); }
        DirectChat chat = directChatService.getChatById(chatId);
        if (chat == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resp); }
        directChatService.markReadForAdmin(chatId);
        List<Map<String, Object>> msgs = buildMessageList(chat, "ADMIN");
        resp.put("success", true);
        resp.put("messages", msgs);
        resp.put("count", msgs.size());
        return ResponseEntity.ok(resp);
    }

    // ─────────────────────────────────────────────
    //  STUDENT SIDE
    // ─────────────────────────────────────────────

    /** Student anaanzisha chat na admin — POST /student/chat/start */
    @PostMapping("/student/chat/start")
    public String studentStartChat(HttpSession session) {
        User student = (User) session.getAttribute("user");
        if (student == null) return "redirect:/login";
        // Find any existing admin to connect with (use first ADMIN found)
        List<User> allUsers = userRepository.findAll();
        User admin = allUsers.stream()
                .filter(u -> u.getRole() != null &&
                        (u.getRole().name().equals("ADMIN") || u.getRole().name().equals("SUPER_ADMIN")))
                .findFirst().orElse(null);
        if (admin == null) return "redirect:/messages?noAdmin=true";

        DirectChat chat = directChatService.startOrGetChat(admin.getId(), student.getId());
        return "redirect:/student/chat/" + chat.getId();
    }

    /** Student anaangalia chat — GET /student/chat/{chatId} */
    @GetMapping("/student/chat/{chatId}")
    public String studentChatPage(@PathVariable String chatId, Model model, HttpSession session) {
        User student = (User) session.getAttribute("user");
        if (student == null) return "redirect:/login";
        DirectChat chat = directChatService.getChatById(chatId);
        if (chat == null || !chat.getStudentId().equals(student.getId())) return "redirect:/messages";
        directChatService.markReadForStudent(chatId);
        model.addAttribute("chat", chat);
        model.addAttribute("loggedInUser", student);
        return "student/student_chat";
    }

    /** SSE stream for student — GET /student/chat/{chatId}/stream */
    @GetMapping(value = "/student/chat/{chatId}/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @ResponseBody
    public SseEmitter studentStream(@PathVariable String chatId, HttpSession session) {
        User student = (User) session.getAttribute("user");
        SseEmitter emitter = new SseEmitter(180_000L);
        if (student == null) { emitter.complete(); return emitter; }

        // Register with student's own ID as perspective
        registerEmitter(chatId, emitter, student.getId());

        // Send current messages from student's perspective
        DirectChat chat = directChatService.getChatById(chatId);
        if (chat != null) {
            try {
                emitter.send(SseEmitter.event().name("init")
                        .data(buildMessageListStatic(chat, student.getId()), MediaType.APPLICATION_JSON));
            } catch (IOException e) { /* ignore */ }
        }
        return emitter;
    }

    /** Student anatuma message — POST /student/chat/{chatId}/send */
    @PostMapping("/student/chat/{chatId}/send")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> studentSend(
            @PathVariable String chatId,
            @RequestParam("messageText") String messageText,
            HttpSession session) {

        Map<String, Object> resp = new HashMap<>();
        User student = (User) session.getAttribute("user");
        if (student == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp); }
        DirectChat chat = directChatService.getChatById(chatId);
        if (chat == null || !chat.getStudentId().equals(student.getId())) {
            resp.put("success", false); return ResponseEntity.status(HttpStatus.FORBIDDEN).body(resp);
        }
        if (messageText == null || messageText.trim().isEmpty()) {
            resp.put("success", false); return ResponseEntity.badRequest().body(resp);
        }
        DirectChat updated = directChatService.sendMessage(chatId, student.getId(), student.getName(), messageText.trim());
        if (updated == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resp); }

        // Push personalized SSE to every listener (student sees isSelf=true, admin sees isSelf=false)
        notifyChat(chatId, updated);

        ChatMessage last = updated.getMessages().get(updated.getMessages().size() - 1);
        resp.put("success", true);
        resp.put("id", last.getId());
        resp.put("messageText", last.getMessageText());
        resp.put("time", DateTimeFormatter.ofPattern("hh:mm a").format(last.getTimestamp()));
        return ResponseEntity.ok(resp);
    }

    /** Fallback poll for student — GET /student/chat/{chatId}/messages */
    @GetMapping("/student/chat/{chatId}/messages")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> studentPollMessages(@PathVariable String chatId, HttpSession session) {
        Map<String, Object> resp = new HashMap<>();
        User student = (User) session.getAttribute("user");
        if (student == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp); }
        DirectChat chat = directChatService.getChatById(chatId);
        if (chat == null || !chat.getStudentId().equals(student.getId())) {
            resp.put("success", false); return ResponseEntity.status(HttpStatus.FORBIDDEN).body(resp);
        }
        directChatService.markReadForStudent(chatId);
        List<Map<String, Object>> msgs = buildMessageList(chat, student.getId());
        resp.put("success", true);
        resp.put("messages", msgs);
        resp.put("count", msgs.size());
        return ResponseEntity.ok(resp);
    }

    // ─────────────────────────────────────────────
    //  Instance helper — wraps the static one
    // ─────────────────────────────────────────────
    private List<Map<String, Object>> buildMessageList(DirectChat chat, String viewerIdentifier) {
        return buildMessageListStatic(chat, viewerIdentifier);
    }

    // ─────────────────────────────────────────────
    //  ADMIN INBOX — GET /admin/messages
    // ─────────────────────────────────────────────

    /** Admin anaona list ya chats zote — GET /admin/messages */
    @GetMapping("/admin/messages")
    public String adminInbox(Model model, HttpSession session) {
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!admin.getRole().name().equals("ADMIN") && !admin.getRole().name().equals("SUPER_ADMIN"))) {
            return "redirect:/login";
        }
        // All chats in system (admin sees all student chats)
        List<DirectChat> allChats = directChatService.getAllChats();
        long unreadCount = directChatService.getTotalUnreadForAdmin();

        // Enrich with student user objects for profile pictures
        List<Map<String, Object>> chatViews = new ArrayList<>();
        for (DirectChat chat : allChats) {
            Map<String, Object> cv = new HashMap<>();
            cv.put("chat", chat);
            User student = userRepository.findById(chat.getStudentId()).orElse(null);
            cv.put("student", student);
            // Last message preview
            if (!chat.getMessages().isEmpty()) {
                ChatMessage last = chat.getMessages().get(chat.getMessages().size() - 1);
                cv.put("lastMsg", last.getMessageText());
                cv.put("lastMsgTime", DateTimeFormatter.ofPattern("hh:mm a").format(last.getTimestamp()));
                cv.put("lastSenderIsAdmin", "ADMIN".equals(last.getSenderId()));
            } else {
                cv.put("lastMsg", "No messages yet");
                cv.put("lastMsgTime", "");
                cv.put("lastSenderIsAdmin", false);
            }
            chatViews.add(cv);
        }

        model.addAttribute("chatViews", chatViews);
        model.addAttribute("unreadCount", unreadCount);
        model.addAttribute("loggedInUser", admin);
        return "admin/admin_messages";
    }

    // ─────────────────────────────────────────────
    //  API ENDPOINTS FOR ADMIN SEARCH
    // ─────────────────────────────────────────────

    @GetMapping("/api/chat/search-students")
    @ResponseBody
    public ResponseEntity<List<Map<String, Object>>> searchStudents(@RequestParam("q") String query, HttpSession session) {
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!admin.getRole().name().equals("ADMIN") && !admin.getRole().name().equals("SUPER_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        List<User> students = userRepository.findByNameContainingIgnoreCase(query);
        List<Map<String, Object>> result = students.stream()
            .filter(u -> u.getRole() != null && u.getRole().name().equals("STUDENT"))
            .limit(10)
            .map(u -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", u.getId());
                map.put("name", u.getName());
                map.put("profilePicture", u.getProfilePicture());
                map.put("courseProgram", u.getCourseProgram());
                return map;
            })
            .collect(java.util.stream.Collectors.toList());
            
        return ResponseEntity.ok(result);
    }

    @PostMapping("/api/chat/start/{studentId}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> apiStartChat(@PathVariable String studentId, HttpSession session) {
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!admin.getRole().name().equals("ADMIN") && !admin.getRole().name().equals("SUPER_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        DirectChat chat = directChatService.startOrGetChat(admin.getId(), studentId);
        User student = userRepository.findById(studentId).orElse(null);
        
        Map<String, Object> resp = new HashMap<>();
        resp.put("chatId", chat.getId());
        if (student != null) {
            resp.put("studentName", student.getName());
            resp.put("studentCourse", student.getCourseProgram());
            resp.put("studentPic", student.getProfilePicture());
        }
        return ResponseEntity.ok(resp);
    }
}
