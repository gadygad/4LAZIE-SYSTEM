package com.school.chat;

import com.school.chat.ChatMessage;
import com.school.chat.PeerChat;
import com.school.auth.User;
import com.school.chat.PeerChatRepository;
import com.school.auth.UserRepository;
import com.school.notification.PushNotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class PeerChatService {

    @Autowired
    private PeerChatRepository peerChatRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PushNotificationService pushNotificationService;

    @Autowired
    private CacheManager cacheManager;

    /** Same Caffeine cache pattern as GroupChatService — a chat is re-read
     * on every open/SSE-connect/send, but only changes on a write, so
     * caching it by id turns most reads into an in-memory hit instead of a
     * MongoDB round trip. Every write below updates the cache right after
     * saving so readers never see stale data. */
    private static final String CACHE_NAME = "peerChats";

    private Cache cache() {
        return cacheManager.getCache(CACHE_NAME);
    }

    /** ADMIN/SUPER_ADMIN users appear to everyone else as "4LAZIE" with the
     * brand logo instead of their personal name/photo — same convention the
     * forum and DirectChat support inbox already use. */
    private boolean isAdmin(User user) {
        return user != null && user.getRole() != null &&
                (user.getRole().name().equals("ADMIN") || user.getRole().name().equals("SUPER_ADMIN"));
    }

    private String brandedName(User user) {
        return isAdmin(user) ? "4LAZIE" : (user != null ? user.getName() : "Student");
    }

    private String brandedPicture(User user) {
        return isAdmin(user) ? "/images/logo.png" : (user != null ? user.getProfilePicture() : null);
    }

    private PeerChat save(PeerChat chat) {
        PeerChat saved = peerChatRepository.save(chat);
        Cache cache = cache();
        if (cache != null) cache.put(saved.getId(), saved);
        return saved;
    }

    /**
     * Starts (or reuses) a chat between two users. The pair is always stored
     * with the lexicographically smaller ID as user1Id, so it doesn't matter
     * which of the two users starts it — there's only ever one chat per pair.
     */
    public PeerChat startOrGetChat(String userIdA, String userIdB) {
        String user1Id = userIdA.compareTo(userIdB) <= 0 ? userIdA : userIdB;
        String user2Id = userIdA.compareTo(userIdB) <= 0 ? userIdB : userIdA;

        Optional<PeerChat> existing = peerChatRepository.findByUser1IdAndUser2Id(user1Id, user2Id);
        if (existing.isPresent()) {
            return existing.get();
        }

        User user1 = userRepository.findById(user1Id).orElse(null);
        User user2 = userRepository.findById(user2Id).orElse(null);

        PeerChat chat = new PeerChat();
        chat.setUser1Id(user1Id);
        chat.setUser2Id(user2Id);
        chat.setUser1Name(brandedName(user1));
        chat.setUser2Name(brandedName(user2));

        return save(chat);
    }

    public PeerChat sendMessage(String chatId, String senderId, String senderName, String messageText,
                                 String replyToMessageId, String replyToSenderName, String replyToMessageText) {
        PeerChat chat = getChatById(chatId);
        if (chat == null) return null;

        User sender = userRepository.findById(senderId).orElse(null);
        String brandedSenderName = isAdmin(sender) ? "4LAZIE" : senderName;
        String profilePicture = brandedPicture(sender);

        ChatMessage msg = new ChatMessage(senderId, brandedSenderName, profilePicture, messageText, null);
        msg.setReplyToMessageId(replyToMessageId);
        msg.setReplyToSenderName(replyToSenderName);
        msg.setReplyToMessageText(replyToMessageText);
        chat.getMessages().add(msg);
        chat.setLastMessageAt(LocalDateTime.now());

        String recipientId = chat.otherUserId(senderId);
        if (chat.isUser1(recipientId)) {
            chat.setHasUnreadForUser1(true);
        } else {
            chat.setHasUnreadForUser2(true);
        }

        // Deep-link straight into this conversation instead of the bare
        // inbox — tapping the notification should land the recipient with
        // the reply box already in view, not make them hunt for the chat.
        pushNotificationService.sendToUser(recipientId, "New Message from " + brandedSenderName, messageText,
                "/messages?openPeerChat=" + chatId);

        return save(chat);
    }

    /**
     * Returns the saved chat so callers (e.g. the live-status SSE broadcast)
     * can reuse it instead of issuing another database round trip just to
     * re-fetch what this method already loaded and saved.
     */
    public PeerChat markRead(String chatId, String readerId) {
        PeerChat chat = getChatById(chatId);
        if (chat == null) return null;

        if (chat.isUser1(readerId)) {
            chat.setHasUnreadForUser1(false);
        } else {
            chat.setHasUnreadForUser2(false);
        }
        String otherId = chat.otherUserId(readerId);
        if (chat.getMessages() != null) {
            chat.getMessages().forEach(m -> {
                if (otherId.equals(m.getSenderId())) m.setRead(true);
            });
        }
        return save(chat);
    }

    public PeerChat getChatById(String chatId) {
        Cache cache = cache();
        if (cache != null) {
            PeerChat cached = cache.get(chatId, PeerChat.class);
            if (cached != null) return cached;
        }
        PeerChat chat = peerChatRepository.findById(chatId).orElse(null);
        if (chat != null && cache != null) cache.put(chatId, chat);
        return chat;
    }

    /** All of a user's peer conversations, most recently active first. */
    public List<PeerChat> getInbox(String userId) {
        List<PeerChat> chats = peerChatRepository.findAllForUser(userId);
        chats.sort(Comparator.comparing(PeerChat::getLastMessageAt,
                Comparator.nullsLast(Comparator.reverseOrder())));
        return chats;
    }
}
