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
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Controller
public class DirectChatController {

    @Autowired
    private DirectChatService directChatService;

    @Autowired
    private UserRepository userRepository;

    // ─────────────────────────────────────────────
    //  SSE Emitter Registry — chatId → list of emitters
    // ─────────────────────────────────────────────
    private static final Map<String, List<SseEmitter>> chatEmitters = new ConcurrentHashMap<>();

    /** Notify all listeners of a chatId that new messages are available */
    public static void notifyChat(String chatId, Object payload) {
        List<SseEmitter> emitters = chatEmitters.getOrDefault(chatId, Collections.emptyList());
        List<SseEmitter> dead = new ArrayList<>();
        for (SseEmitter emitter : emitters) {
            try {
                emitter.send(SseEmitter.event().name("message").data(payload, MediaType.APPLICATION_JSON));
            } catch (IOException e) {
                dead.add(emitter);
            }
        }
        emitters.removeAll(dead);
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
        SseEmitter emitter = new SseEmitter(180_000L); // 3 min timeout
        if (admin == null) { emitter.complete(); return emitter; }

        chatEmitters.computeIfAbsent(chatId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        // Send current state immediately
        DirectChat chat = directChatService.getChatById(chatId);
        if (chat != null) {
            try {
                emitter.send(SseEmitter.event().name("init")
                        .data(buildMessageList(chat, "ADMIN"), MediaType.APPLICATION_JSON));
            } catch (IOException e) { /* ignore */ }
        }

        emitter.onCompletion(() -> chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter));
        emitter.onTimeout(() -> chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter));
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

        // Push to ALL listeners via SSE
        notifyChat(chatId, buildMessageList(chat, "STUDENT_SIDE"));

        ChatMessage last = chat.getMessages().get(chat.getMessages().size() - 1);
        resp.put("success", true);
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

        chatEmitters.computeIfAbsent(chatId, k -> new CopyOnWriteArrayList<>()).add(emitter);

        DirectChat chat = directChatService.getChatById(chatId);
        if (chat != null) {
            try {
                emitter.send(SseEmitter.event().name("init")
                        .data(buildMessageList(chat, student.getId()), MediaType.APPLICATION_JSON));
            } catch (IOException e) { /* ignore */ }
        }
        emitter.onCompletion(() -> chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter));
        emitter.onTimeout(() -> chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter));
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

        // Push to ALL listeners (admin, student) via SSE
        notifyChat(chatId, buildMessageList(updated, "ADMIN"));

        ChatMessage last = updated.getMessages().get(updated.getMessages().size() - 1);
        resp.put("success", true);
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
    //  Helper — build JSON message list
    // ─────────────────────────────────────────────
    private List<Map<String, Object>> buildMessageList(DirectChat chat, String viewerIdentifier) {
        List<Map<String, Object>> result = new ArrayList<>();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("hh:mm a");
        DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("dd MMM");
        for (ChatMessage msg : chat.getMessages()) {
            Map<String, Object> m = new HashMap<>();
            m.put("senderId",    msg.getSenderId());
            m.put("senderName",  msg.getSenderName());
            m.put("messageText", msg.getMessageText());
            m.put("time",  msg.getTimestamp() != null ? fmt.format(msg.getTimestamp()) : "");
            m.put("date",  msg.getTimestamp() != null ? dateFmt.format(msg.getTimestamp()) : "");
            // isSelf from the perspective of each viewer
            boolean isSelf = "ADMIN".equals(viewerIdentifier)
                    ? "ADMIN".equals(msg.getSenderId())
                    : viewerIdentifier.equals(msg.getSenderId());
            m.put("isSelf", isSelf);
            result.add(m);
        }
        return result;
    }
}
