package com.school.chat;

import com.school.chat.ChatMessage;
import com.school.chat.PeerChat;
import com.school.auth.Role;
import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.chat.PeerChatService;
import com.school.auth.AuthUtil;
import com.school.notification.NotificationService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Student-to-student direct messaging — open to any two logged-in users
 * (no "connect first" requirement, per product decision). Mirrors the
 * SSE/typing/presence patterns already proven out in DirectChatController,
 * but with both sides being real user IDs instead of one being "ADMIN".
 */
@Controller
public class PeerChatController {

    private final PeerChatService peerChatService;
    private final UserRepository userRepository;
    private final AuthUtil authUtil;
    private final NotificationService notificationService;

    public PeerChatController(PeerChatService peerChatService, UserRepository userRepository, AuthUtil authUtil, NotificationService notificationService) {
        this.peerChatService = peerChatService;
        this.userRepository = userRepository;
        this.authUtil = authUtil;
        this.notificationService = notificationService;
    }

    private static final Map<String, List<SseEmitter>> chatEmitters = new ConcurrentHashMap<>();
    private static final Map<SseEmitter, String> emitterViewers = new ConcurrentHashMap<>();

    private User currentUser(HttpSession session) {
        User u = (User) session.getAttribute("user");
        return u != null ? u : authUtil.getLoggedInUser();
    }

    // ─────────────────────────────────────────────
    //  Student directory — every registered student, any course/college,
    //  so any logged-in student can start a chat with anyone.
    // ─────────────────────────────────────────────
    @GetMapping("/api/students/directory")
    @ResponseBody
    public ResponseEntity<?> studentDirectory(HttpSession session) {
        User me = currentUser(session);
        if (me == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        List<Map<String, Object>> result = new ArrayList<>();
        for (User u : userRepository.findByRole(Role.STUDENT)) {
            if (u.getId().equals(me.getId())) continue;
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", u.getId());
            m.put("name", u.getName());
            m.put("profilePicture", u.getProfilePicture());
            m.put("courseProgram", u.getCourseProgram());
            m.put("level", u.getLevel());
            m.put("hasVerifiedBadge", Boolean.TRUE.equals(u.getHasVerifiedBadge()));
            result.add(m);
        }
        result.sort(Comparator.comparing(m -> String.valueOf(m.get("name"))));
        return ResponseEntity.ok(result);
    }

    // ─────────────────────────────────────────────
    //  Inbox — this user's existing peer conversations
    // ─────────────────────────────────────────────
    @GetMapping("/api/peer-chat/inbox")
    @ResponseBody
    public ResponseEntity<?> inbox(HttpSession session) {
        User me = currentUser(session);
        if (me == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("hh:mm a");
        List<Map<String, Object>> result = new ArrayList<>();
        for (PeerChat chat : peerChatService.getInbox(me.getId())) {
            String otherId = chat.otherUserId(me.getId());
            User other = userRepository.findById(otherId).orElse(null);
            ChatMessage last = chat.getMessages().isEmpty() ? null : chat.getMessages().get(chat.getMessages().size() - 1);

            Map<String, Object> m = new LinkedHashMap<>();
            m.put("chatId", chat.getId());
            m.put("otherUserId", otherId);
            m.put("otherUserName", other != null ? other.getName() : chat.otherUserName(me.getId()));
            m.put("otherUserProfilePicture", other != null ? other.getProfilePicture() : null);
            m.put("otherUserHasVerifiedBadge", other != null && Boolean.TRUE.equals(other.getHasVerifiedBadge()));
            m.put("lastMessage", last != null ? last.getMessageText() : "");
            m.put("lastMessageTime", last != null && last.getTimestamp() != null ? fmt.format(last.getTimestamp()) : "");
            m.put("hasUnread", chat.isUser1(me.getId()) ? chat.isHasUnreadForUser1() : chat.isHasUnreadForUser2());
            result.add(m);
        }
        return ResponseEntity.ok(result);
    }

    // ─────────────────────────────────────────────
    //  Start (or resume) a chat with another student
    // ─────────────────────────────────────────────
    @PostMapping("/api/peer-chat/start/{otherUserId}")
    @ResponseBody
    public ResponseEntity<?> start(@PathVariable String otherUserId, HttpSession session) {
        User me = currentUser(session);
        if (me == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (otherUserId.equals(me.getId())) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "You can't message yourself."));
        }
        User other = userRepository.findById(otherUserId).orElse(null);
        if (other == null) return ResponseEntity.notFound().build();

        PeerChat chat = peerChatService.startOrGetChat(me.getId(), otherUserId);
        return ResponseEntity.ok(Map.of("success", true, "chatId", chat.getId()));
    }

    private List<Map<String, Object>> buildMessageList(PeerChat chat, String viewerId) {
        return buildMessageListStatic(chat, viewerId);
    }

    @GetMapping("/api/peer-chat/{chatId}/messages")
    @ResponseBody
    public ResponseEntity<?> messages(@PathVariable String chatId, HttpSession session) {
        User me = currentUser(session);
        if (me == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        PeerChat chat = peerChatService.getChatById(chatId);
        if (chat == null || !(chat.getUser1Id().equals(me.getId()) || chat.getUser2Id().equals(me.getId()))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        // markRead() already returns the freshly-saved chat, so reuse it for
        // the live-status broadcast below instead of a third redundant fetch
        // — this endpoint used to hit the database 3 times (fetch, markRead's
        // own fetch+save, and another fetch just to notify) for one page open.
        PeerChat updatedChat = peerChatService.markRead(chatId, me.getId());
        // Push the now-read status back out so the SENDER's open chat (if any)
        // flips "Delivered" to "Read" live instead of only on their next reload.
        if (updatedChat != null) notifyChat(chatId, updatedChat);
        // Include the other participant's online status so the polling
        // fallback (used once the SSE stream drops, e.g. on mobile
        // backgrounding) can keep the status dot accurate instead of it
        // freezing on whatever it last was when the stream died.
        String otherUserId = chat.getUser1Id().equals(me.getId()) ? chat.getUser2Id() : chat.getUser1Id();
        boolean otherOnline = isViewerOnline(chatId, otherUserId);
        return ResponseEntity.ok(Map.of("success", true, "messages", buildMessageList(chat, me.getId()), "otherOnline", otherOnline));
    }

    @GetMapping(value = "/api/peer-chat/{chatId}/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @ResponseBody
    public SseEmitter stream(@PathVariable String chatId, HttpSession session, jakarta.servlet.http.HttpServletResponse response) {
        // Render's edge proxy buffers streaming responses by default, which
        // silently held every SSE event until the connection closed — chat
        // messages never appeared live, only the separate push notification
        // did. This nginx-style header tells it to pass bytes straight
        // through instead of buffering them.
        response.setHeader("X-Accel-Buffering", "no");
        User me = currentUser(session);
        SseEmitter emitter = new SseEmitter(180_000L);
        if (me == null) { emitter.complete(); return emitter; }

        PeerChat chat = peerChatService.getChatById(chatId);
        if (chat == null || !(chat.getUser1Id().equals(me.getId()) || chat.getUser2Id().equals(me.getId()))) {
            emitter.complete();
            return emitter;
        }

        registerEmitter(chatId, emitter, me.getId());

        try {
            emitter.send(SseEmitter.event().name("init").data(buildMessageList(chat, me.getId()), MediaType.APPLICATION_JSON));
        } catch (IOException e) { /* ignore */ }

        return emitter;
    }

    @PostMapping("/api/peer-chat/{chatId}/send")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> send(@PathVariable String chatId,
                                                      @RequestParam("messageText") String messageText,
                                                      @RequestParam(value = "replyToMessageId", required = false) String replyToMessageId,
                                                      @RequestParam(value = "replyToSenderName", required = false) String replyToSenderName,
                                                      @RequestParam(value = "replyToMessageText", required = false) String replyToMessageText,
                                                      HttpSession session) {
        Map<String, Object> resp = new HashMap<>();
        User me = currentUser(session);
        if (me == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp); }
        if (messageText == null || messageText.trim().isEmpty()) {
            resp.put("success", false); return ResponseEntity.badRequest().body(resp);
        }

        PeerChat existing = peerChatService.getChatById(chatId);
        if (existing == null || !(existing.getUser1Id().equals(me.getId()) || existing.getUser2Id().equals(me.getId()))) {
            resp.put("success", false); return ResponseEntity.status(HttpStatus.FORBIDDEN).body(resp);
        }

        PeerChat updated = peerChatService.sendMessage(chatId, me.getId(), me.getName(), messageText.trim(),
                replyToMessageId, replyToSenderName, replyToMessageText);
        if (updated == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resp); }

        notifyChat(chatId, updated);
        
        // Send a bell notification to the receiver
        String receiverId = existing.otherUserId(me.getId());
        if (receiverId != null) {
            notificationService.createNotification(
                receiverId,
                "New Message ✉️",
                me.getName() + " sent you a new message.",
                "/messages"
            );
        }

        ChatMessage last = updated.getMessages().get(updated.getMessages().size() - 1);
        resp.put("success", true);
        resp.put("id", last.getId());
        resp.put("messageText", last.getMessageText());
        resp.put("time", DateTimeFormatter.ofPattern("hh:mm a").format(last.getTimestamp()));
        return ResponseEntity.ok(resp);
    }

    @PostMapping("/api/peer-chat/{chatId}/typing")
    @ResponseBody
    public ResponseEntity<Void> typing(@PathVariable String chatId,
                                        @RequestParam("typing") boolean typing,
                                        HttpSession session) {
        User me = currentUser(session);
        if (me == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        broadcastTyping(chatId, me.getId(), typing);
        return ResponseEntity.ok().build();
    }

    // ─────────────────────────────────────────────
    //  SSE plumbing
    // ─────────────────────────────────────────────

    private static void registerEmitter(String chatId, SseEmitter emitter, String viewerId) {
        chatEmitters.computeIfAbsent(chatId, k -> new CopyOnWriteArrayList<>()).add(emitter);
        emitterViewers.put(emitter, viewerId);

        broadcastPresence(chatId);

        emitter.onCompletion(() -> {
            chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter);
            emitterViewers.remove(emitter);
            broadcastPresence(chatId);
        });
        emitter.onTimeout(() -> {
            chatEmitters.getOrDefault(chatId, Collections.emptyList()).remove(emitter);
            emitterViewers.remove(emitter);
            broadcastPresence(chatId);
        });
    }

    private static void notifyChat(String chatId, PeerChat updatedChat) {
        CompletableFuture.runAsync(() -> {
            List<SseEmitter> emitters = chatEmitters.getOrDefault(chatId, Collections.emptyList());
            List<SseEmitter> dead = new ArrayList<>();
            for (SseEmitter emitter : emitters) {
                String viewer = emitterViewers.get(emitter);
                if (viewer == null) continue;
                try {
                    emitter.send(SseEmitter.event().name("message")
                            .data(buildMessageListStatic(updatedChat, viewer), MediaType.APPLICATION_JSON));
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

    private static List<Map<String, Object>> buildMessageListStatic(PeerChat chat, String viewerId) {
        List<Map<String, Object>> result = new ArrayList<>();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("hh:mm a");
        DateTimeFormatter dateFmt = DateTimeFormatter.ofPattern("dd MMM");
        for (ChatMessage msg : chat.getMessages()) {
            Map<String, Object> m = new HashMap<>();
            m.put("id", msg.getId());
            m.put("senderId", msg.getSenderId());
            m.put("senderName", msg.getSenderName());
            m.put("senderProfilePicture", msg.getSenderProfilePicture());
            m.put("messageText", msg.getMessageText());
            m.put("replyToMessageId", msg.getReplyToMessageId());
            m.put("replyToSenderName", msg.getReplyToSenderName());
            m.put("replyToMessageText", msg.getReplyToMessageText());
            m.put("time", msg.getTimestamp() != null ? fmt.format(msg.getTimestamp()) : "");
            m.put("date", msg.getTimestamp() != null ? dateFmt.format(msg.getTimestamp()) : "");
            
            boolean hasBadge = false;
            if (userRepoStatic != null) {
                User senderUser = userRepoStatic.findById(msg.getSenderId()).orElse(null);
                if (senderUser != null && Boolean.TRUE.equals(senderUser.getHasVerifiedBadge())) {
                    hasBadge = true;
                }
            }
            m.put("senderHasVerifiedBadge", hasBadge);
            
            boolean isSelf = viewerId.equals(msg.getSenderId());
            m.put("isSelf", isSelf);

            // Sent / Delivered / Read, same three-state ladder as DirectChatController —
            // only meaningful (and only rendered client-side) for the viewer's own messages.
            String status = "Sent";
            if (msg.isRead()) {
                status = "Read";
            } else if (isSelf && userRepoStatic != null) {
                String recipientId = chat.otherUserId(viewerId);
                User recipient = userRepoStatic.findById(recipientId).orElse(null);
                if (recipient != null && recipient.getLastActiveTime() != null
                        && recipient.getLastActiveTime().isAfter(LocalDateTime.now().minusMinutes(5))) {
                    status = "Delivered";
                }
            }
            m.put("status", status);
            result.add(m);
        }
        return result;
    }

    /** Same lastActiveTime fallback pattern used for admin/student presence:
     * a live SSE connection is the strongest signal, but mobile browsers kill
     * SSE streams on backgrounding well before someone has actually left. */
    private static UserRepository userRepoStatic;
    private static PeerChatService peerChatServiceStatic;

    @jakarta.annotation.PostConstruct
    private void initStatics() {
        PeerChatController.userRepoStatic = this.userRepository;
        PeerChatController.peerChatServiceStatic = this.peerChatService;
    }

    /** Shared by the SSE presence broadcast and the polling-fallback /messages
     * endpoint, so a user's status is computed identically however the client
     * currently finds out about it. */
    private static boolean isViewerOnline(String chatId, String viewerId) {
        List<SseEmitter> emitters = chatEmitters.getOrDefault(chatId, Collections.emptyList());
        for (SseEmitter emitter : emitters) {
            if (viewerId.equals(emitterViewers.get(emitter))) return true;
        }
        if (userRepoStatic != null) {
            User u = userRepoStatic.findById(viewerId).orElse(null);
            if (u != null && u.getLastActiveTime() != null
                    && u.getLastActiveTime().isAfter(LocalDateTime.now().minusMinutes(2))) {
                return true;
            }
        }
        return false;
    }

    private static void broadcastPresence(String chatId) {
        CompletableFuture.runAsync(() -> {
            PeerChat chat = peerChatServiceStatic != null ? peerChatServiceStatic.getChatById(chatId) : null;
            if (chat == null) return;
            List<SseEmitter> emitters = chatEmitters.getOrDefault(chatId, Collections.emptyList());

            for (String viewerId : List.of(chat.getUser1Id(), chat.getUser2Id())) {
                boolean online = isViewerOnline(chatId, viewerId);
                Map<String, Object> data = new HashMap<>();
                data.put("userId", viewerId);
                data.put("online", online);
                for (SseEmitter emitter : emitters) {
                    String viewer = emitterViewers.get(emitter);
                    // Only tell each connected side about the OTHER side's presence.
                    if (viewer == null || viewer.equals(viewerId)) continue;
                    try {
                        emitter.send(SseEmitter.event().name("presence").data(data, MediaType.APPLICATION_JSON));
                    } catch (Exception ignored) { }
                }
            }
        });
    }

    private static void broadcastTyping(String chatId, String fromViewer, boolean typing) {
        CompletableFuture.runAsync(() -> {
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

    /** 30s tick so presence for open peer chats self-corrects, same as admin/student chat. */
    @org.springframework.scheduling.annotation.Scheduled(fixedRate = 30_000L)
    public void refreshPresenceForOpenPeerChats() {
        for (String chatId : chatEmitters.keySet()) {
            broadcastPresence(chatId);
        }
    }
}
