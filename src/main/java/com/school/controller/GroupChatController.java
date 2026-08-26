package com.school.controller;

import com.school.model.ChatMessage;
import com.school.model.GroupChat;
import com.school.model.User;
import com.school.repository.UserRepository;
import com.school.service.GroupChatService;
import com.school.util.AuthUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * Student-created group chats — MVP: name + members chosen at creation time,
 * flat text messages broadcast to every member via SSE. Mirrors the
 * PeerChatController plumbing but fans a message out to N members instead
 * of just the other side of a 1:1 chat.
 */
@Controller
public class GroupChatController {

    private final GroupChatService groupChatService;
    private final UserRepository userRepository;
    private final AuthUtil authUtil;

    public GroupChatController(GroupChatService groupChatService, UserRepository userRepository, AuthUtil authUtil) {
        this.groupChatService = groupChatService;
        this.userRepository = userRepository;
        this.authUtil = authUtil;
    }

    private static final Map<String, List<SseEmitter>> groupEmitters = new ConcurrentHashMap<>();
    private static final Map<SseEmitter, String> emitterViewers = new ConcurrentHashMap<>();

    private User currentUser(HttpSession session) {
        User u = (User) session.getAttribute("user");
        return u != null ? u : authUtil.getLoggedInUser();
    }

    @PostMapping("/api/groups/create")
    @ResponseBody
    public ResponseEntity<?> create(@RequestParam("name") String name,
                                     @RequestParam("memberIds") List<String> memberIds,
                                     HttpSession session) {
        User me = currentUser(session);
        if (me == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        if (name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Group name is required."));
        }
        if (memberIds == null || memberIds.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "Pick at least one member."));
        }
        List<String> addedMemberNames = new ArrayList<>();
        for (User u : userRepository.findAllById(memberIds)) {
            addedMemberNames.add(u.getName());
        }
        GroupChat group = groupChatService.createGroup(name.trim(), me.getId(), me.getName(), new LinkedHashSet<>(memberIds), addedMemberNames);
        return ResponseEntity.ok(Map.of("success", true, "groupId", group.getId(), "name", group.getName()));
    }

    @GetMapping("/api/groups/mine")
    @ResponseBody
    public ResponseEntity<?> mine(HttpSession session) {
        User me = currentUser(session);
        if (me == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("hh:mm a");
        List<Map<String, Object>> result = new ArrayList<>();
        for (GroupChat group : groupChatService.getGroupsForUser(me.getId())) {
            ChatMessage last = group.getMessages().isEmpty() ? null : group.getMessages().get(group.getMessages().size() - 1);
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("groupId", group.getId());
            m.put("name", group.getName());
            m.put("memberCount", group.getMemberIds().size());
            m.put("lastMessage", last != null ? last.getMessageText() : "");
            m.put("lastMessageTime", last != null && last.getTimestamp() != null ? fmt.format(last.getTimestamp()) : "");
            result.add(m);
        }
        return ResponseEntity.ok(result);
    }

    private boolean isMember(GroupChat group, String userId) {
        return group != null && group.getMemberIds().contains(userId);
    }

    @GetMapping("/api/groups/{groupId}/members")
    @ResponseBody
    public ResponseEntity<?> members(@PathVariable String groupId, HttpSession session) {
        User me = currentUser(session);
        if (me == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        GroupChat group = groupChatService.getGroupById(groupId);
        if (!isMember(group, me.getId())) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        List<Map<String, Object>> result = new ArrayList<>();
        for (User u : userRepository.findAllById(group.getMemberIds())) {
            Map<String, Object> m = new LinkedHashMap<>();
            m.put("id", u.getId());
            m.put("name", u.getName());
            m.put("profilePicture", u.getProfilePicture());
            m.put("role", u.getId().equals(group.getCreatedBy()) ? "Leader" : "Member");
            result.add(m);
        }
        // Leader first, then alphabetical.
        result.sort((a, b) -> {
            boolean aLeader = "Leader".equals(a.get("role"));
            boolean bLeader = "Leader".equals(b.get("role"));
            if (aLeader != bLeader) return aLeader ? -1 : 1;
            return String.valueOf(a.get("name")).compareToIgnoreCase(String.valueOf(b.get("name")));
        });
        return ResponseEntity.ok(Map.of("success", true, "members", result));
    }

    @GetMapping("/api/groups/{groupId}/messages")
    @ResponseBody
    public ResponseEntity<?> messages(@PathVariable String groupId, HttpSession session) {
        User me = currentUser(session);
        if (me == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        GroupChat group = groupChatService.getGroupById(groupId);
        if (!isMember(group, me.getId())) return ResponseEntity.status(HttpStatus.FORBIDDEN).build();

        return ResponseEntity.ok(Map.of(
                "success", true,
                "messages", buildMessageListStatic(group, me.getId()),
                "name", group.getName(),
                "memberCount", group.getMemberIds().size()));
    }

    @GetMapping(value = "/api/groups/{groupId}/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @ResponseBody
    public SseEmitter stream(@PathVariable String groupId, HttpSession session) {
        User me = currentUser(session);
        SseEmitter emitter = new SseEmitter(180_000L);
        if (me == null) { emitter.complete(); return emitter; }

        GroupChat group = groupChatService.getGroupById(groupId);
        if (!isMember(group, me.getId())) { emitter.complete(); return emitter; }

        registerEmitter(groupId, emitter, me.getId());

        try {
            emitter.send(SseEmitter.event().name("init").data(buildMessageListStatic(group, me.getId()), MediaType.APPLICATION_JSON));
        } catch (IOException e) { /* ignore */ }

        return emitter;
    }

    @PostMapping("/api/groups/{groupId}/send")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> send(@PathVariable String groupId,
                                                      @RequestParam("messageText") String messageText,
                                                      HttpSession session) {
        Map<String, Object> resp = new HashMap<>();
        User me = currentUser(session);
        if (me == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp); }
        if (messageText == null || messageText.trim().isEmpty()) {
            resp.put("success", false); return ResponseEntity.badRequest().body(resp);
        }

        GroupChat existing = groupChatService.getGroupById(groupId);
        if (!isMember(existing, me.getId())) {
            resp.put("success", false); return ResponseEntity.status(HttpStatus.FORBIDDEN).body(resp);
        }

        GroupChat updated = groupChatService.sendMessage(groupId, me.getId(), me.getName(), me.getProfilePicture(), messageText.trim());
        if (updated == null) { resp.put("success", false); return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resp); }

        notifyGroup(groupId, updated);

        ChatMessage last = updated.getMessages().get(updated.getMessages().size() - 1);
        resp.put("success", true);
        resp.put("id", last.getId());
        return ResponseEntity.ok(resp);
    }

    // ─────────────────────────────────────────────
    //  SSE plumbing — same shape as PeerChatController, fanned out to every
    //  member instead of just one other side.
    // ─────────────────────────────────────────────

    private static void registerEmitter(String groupId, SseEmitter emitter, String viewerId) {
        groupEmitters.computeIfAbsent(groupId, k -> new CopyOnWriteArrayList<>()).add(emitter);
        emitterViewers.put(emitter, viewerId);

        emitter.onCompletion(() -> {
            groupEmitters.getOrDefault(groupId, Collections.emptyList()).remove(emitter);
            emitterViewers.remove(emitter);
        });
        emitter.onTimeout(() -> {
            groupEmitters.getOrDefault(groupId, Collections.emptyList()).remove(emitter);
            emitterViewers.remove(emitter);
        });
    }

    private static void notifyGroup(String groupId, GroupChat updated) {
        CompletableFuture.runAsync(() -> {
            List<SseEmitter> emitters = groupEmitters.getOrDefault(groupId, Collections.emptyList());
            List<SseEmitter> dead = new ArrayList<>();
            for (SseEmitter emitter : emitters) {
                String viewer = emitterViewers.get(emitter);
                if (viewer == null) continue;
                try {
                    emitter.send(SseEmitter.event().name("message")
                            .data(buildMessageListStatic(updated, viewer), MediaType.APPLICATION_JSON));
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

    private static List<Map<String, Object>> buildMessageListStatic(GroupChat group, String viewerId) {
        List<Map<String, Object>> result = new ArrayList<>();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("hh:mm a");
        for (ChatMessage msg : group.getMessages()) {
            Map<String, Object> m = new HashMap<>();
            m.put("id", msg.getId());
            m.put("senderId", msg.getSenderId());
            m.put("senderName", msg.getSenderName());
            m.put("senderProfilePicture", msg.getSenderProfilePicture());
            m.put("messageText", msg.getMessageText());
            m.put("time", msg.getTimestamp() != null ? fmt.format(msg.getTimestamp()) : "");
            m.put("isSelf", viewerId.equals(msg.getSenderId()));
            m.put("isSystem", com.school.service.GroupChatService.SYSTEM_SENDER_ID.equals(msg.getSenderId()));
            result.add(m);
        }
        return result;
    }
}
