package com.school.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.school.chat.DirectChat;
import com.school.chat.ChatMessage;
import com.school.auth.User;
import com.school.chat.DirectChatService;
import com.school.auth.UserRepository;
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

    @Autowired
    private com.school.notification.PushNotificationService pushNotificationService;

    private UserRepository userRepository;

    private static UserRepository userRepoStatic;
    private static DirectChatService directChatServiceStatic;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
        DirectChatController.userRepoStatic = userRepository;
    }

    @jakarta.annotation.PostConstruct
    private void initStaticServiceRef() {
        DirectChatController.directChatServiceStatic = this.directChatService;
    }

    /**
     * Every 30s, re-broadcast presence to any chat with at least one open SSE
     * connection. A live emitter is the strongest online signal, but mobile
     * browsers routinely kill SSE streams when a tab is backgrounded or the
     * screen locks — long before the student has actually left the site —
     * which used to leave admins staring at a stuck "Offline" for someone
     * still actively using 4LAZIE elsewhere. This periodic tick lets the
     * lastActiveTime fallback inside broadcastPresence() correct that without
     * waiting for the next connect/disconnect event.
     */
    @org.springframework.scheduling.annotation.Scheduled(fixedRate = 30_000L)
    public void refreshPresenceForOpenChats() {
        for (String chatId : chatEmitters.keySet()) {
            broadcastPresence(chatId);
        }
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
        java.util.concurrent.CompletableFuture.runAsync(() -> {
            List<SseEmitter> emitters = chatEmitters.getOrDefault(chatId, Collections.emptyList());
            List<SseEmitter> dead = new ArrayList<>();
            for (SseEmitter emitter : emitters) {
                String viewer = emitterViewers.getOrDefault(emitter, "ADMIN");
                try {
                    List<Map<String, Object>> payload = buildMessageListStatic(updatedChat, viewer);
                    emitter.send(SseEmitter.event().name("message").data(payload, MediaType.APPLICATION_JSON));
                } catch (Exception e) {
                    dead.add(emitter);
                }
            }
            for (SseEmitter d : dead) {
                emitters.remove(d);
                emitterViewers.remove(d);
            }
        });
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
            m.put("replyToMessageId",     msg.getReplyToMessageId());
            m.put("replyToSenderName",    msg.getReplyToSenderName());
            m.put("replyToMessageText",   msg.getReplyToMessageText());
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

    private static void broadcastPresence(String chatId) {
        java.util.concurrent.CompletableFuture.runAsync(() -> {
            List<SseEmitter> emitters = chatEmitters.getOrDefault(chatId, Collections.emptyList());
            boolean adminOnline = false;
            boolean studentOnline = false;
            for (SseEmitter emitter : emitters) {
                String role = emitterViewers.get(emitter);
                if ("ADMIN".equals(role)) adminOnline = true;
                else if (role != null) studentOnline = true; // Anyone else is a student
            }

            // No live emitter for the student doesn't mean they're gone — fall
            // back to whether they've touched the site recently at all
            // (ActiveUserInterceptor stamps lastActiveTime on every request),
            // since their chat tab's SSE connection is the flakiest part of
            // this, not their actual presence on 4LAZIE.
            if (!studentOnline && directChatServiceStatic != null && userRepoStatic != null) {
                DirectChat chat = directChatServiceStatic.getChatById(chatId);
                if (chat != null && chat.getStudentId() != null) {
                    User student = userRepoStatic.findById(chat.getStudentId()).orElse(null);
                    if (student != null && student.getLastActiveTime() != null
                            && student.getLastActiveTime().isAfter(LocalDateTime.now().minusMinutes(2))) {
                        studentOnline = true;
                    }
                }
            }

            Map<String, Object> presenceData = new HashMap<>();
            presenceData.put("adminOnline", adminOnline);
            presenceData.put("studentOnline", studentOnline);

            List<SseEmitter> dead = new ArrayList<>();
            for (SseEmitter emitter : emitters) {
                try {
                    emitter.send(SseEmitter.event().name("presence").data(presenceData, MediaType.APPLICATION_JSON));
                } catch (Exception e) {
                    dead.add(emitter);
                }
            }
            for (SseEmitter d : dead) {
                emitters.remove(d);
                emitterViewers.remove(d);
            }
        });
    }

    /** Helper to register emitter with viewer identifier and handle cleanup */
    private static void registerEmitter(String chatId, SseEmitter emitter, String viewerIdentifier) {
        chatEmitters.computeIfAbsent(chatId, k -> new CopyOnWriteArrayList<>()).add(emitter);
        emitterViewers.put(emitter, viewerIdentifier);
        
        broadcastPresence(chatId); // Broadcast immediately on connect
        
        emitter.onCompletion(() -> {
            chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter);
            emitterViewers.remove(emitter);
            broadcastPresence(chatId); // Broadcast on disconnect
        });
        emitter.onTimeout(() -> {
            chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter);
            emitterViewers.remove(emitter);
            broadcastPresence(chatId); // Broadcast on disconnect
        });
    }

    /**
     * Pushes a live "is typing" signal to the OTHER party in a chat (never
     * echoed back to whoever sent it). Purely ephemeral — nothing is
     * persisted, it just rides the same SSE connection presence already uses.
     */
    private static void broadcastTyping(String chatId, String fromViewer, boolean typing) {
        java.util.concurrent.CompletableFuture.runAsync(() -> {
            List<SseEmitter> emitters = chatEmitters.getOrDefault(chatId, Collections.emptyList());
            Map<String, Object> data = new HashMap<>();
            data.put("from", fromViewer);
            data.put("typing", typing);

            List<SseEmitter> dead = new ArrayList<>();
            for (SseEmitter emitter : emitters) {
                String viewer = emitterViewers.get(emitter);
                if (viewer == null || viewer.equals(fromViewer)) continue;
                try {
                    emitter.send(SseEmitter.event().name("typing").data(data, MediaType.APPLICATION_JSON));
                } catch (Exception e) {
                    dead.add(emitter);
                }
            }
            for (SseEmitter d : dead) {
                emitters.remove(d);
                emitterViewers.remove(d);
            }
        });
    }

    /** Admin's textarea firing "typing"/"stopped typing" — POST /admin/chat/{chatId}/typing */
    @PostMapping("/admin/chat/{chatId}/typing")
    @ResponseBody
    public ResponseEntity<Void> adminTyping(@PathVariable String chatId,
                                             @RequestParam("typing") boolean typing,
                                             HttpSession session) {
        User admin = (User) session.getAttribute("user");
        if (admin == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        broadcastTyping(chatId, "ADMIN", typing);
        return ResponseEntity.ok().build();
    }

    /** Student's textarea firing "typing"/"stopped typing" — POST /student/chat/{chatId}/typing */
    @PostMapping("/student/chat/{chatId}/typing")
    @ResponseBody
    public ResponseEntity<Void> studentTyping(@PathVariable String chatId,
                                               @RequestParam("typing") boolean typing,
                                               HttpSession session) {
        User student = (User) session.getAttribute("user");
        if (student == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        broadcastTyping(chatId, student.getId(), typing);
        return ResponseEntity.ok().build();
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
        return "redirect:/admin/messages";
    }

    /** Admin anaangalia chat page — GET /admin/chat/{chatId} */
    @GetMapping("/admin/chat/{chatId}")
    public String adminChatPage(@PathVariable String chatId, Model model, HttpSession session) {
        User admin = (User) session.getAttribute("user");
        if (admin == null || (!admin.getRole().name().equals("ADMIN") && !admin.getRole().name().equals("SUPER_ADMIN"))) {
            return "redirect:/login";
        }
        return "redirect:/admin/messages";
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
            @RequestParam(value = "replyToMessageId", required = false) String replyToMessageId,
            @RequestParam(value = "replyToSenderName", required = false) String replyToSenderName,
            @RequestParam(value = "replyToMessageText", required = false) String replyToMessageText,
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
        // sendMessage() already pushes a notification to the student — sending
        // another one here would double up (the student would get two pushes
        // for one message, one of them in Swahili and out of step with the rest
        // of the app's English-only notification text).
        DirectChat chat = directChatService.sendMessage(chatId, "ADMIN", "4LAZIE Admin", messageText.trim(), replyToMessageId, replyToSenderName, replyToMessageText);
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
        if (chat == null) {
            resp.put("success", false); return ResponseEntity.status(HttpStatus.FORBIDDEN).body(resp);
        }
        directChatService.markReadForAdmin(chatId);
        // Broadcast the updated read status to the Student if they are online
        notifyChat(chatId, directChatService.getChatById(chatId));
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
        return "redirect:/messages";
    }

    /** Student anaangalia chat — GET /student/chat/{chatId} */
    @GetMapping("/student/chat/{chatId}")
    public String studentChatPage(@PathVariable String chatId, Model model, HttpSession session) {
        User student = (User) session.getAttribute("user");
        if (student == null) return "redirect:/login";
        return "redirect:/messages";
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
            @RequestParam(value = "replyToMessageId", required = false) String replyToMessageId,
            @RequestParam(value = "replyToSenderName", required = false) String replyToSenderName,
            @RequestParam(value = "replyToMessageText", required = false) String replyToMessageText,
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
        // sendMessage() already pushes a notification to every admin — sending
        // another one here would double up (each admin would get two pushes
        // for one message, one of them in Swahili and out of step with the
        // rest of the app's English-only notification text).
        DirectChat updated = directChatService.sendMessage(chatId, student.getId(), student.getName(), messageText.trim(), replyToMessageId, replyToSenderName, replyToMessageText);
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
        // Broadcast the updated read status to the Admin if they are online
        notifyChat(chatId, directChatService.getChatById(chatId));
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
