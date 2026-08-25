package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * A direct chat between two students (or any two regular users) — unlike
 * DirectChat, neither side is hardcoded to "ADMIN". user1Id/user2Id are
 * always stored with the lexicographically smaller ID first so a chat
 * between the same two people is never created twice regardless of who
 * started it.
 */
@Document(collection = "peer_chats")
public class PeerChat {

    @Id
    private String id;

    @Indexed
    private String user1Id;

    @Indexed
    private String user2Id;

    private String user1Name;
    private String user2Name;

    private List<ChatMessage> messages = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime lastMessageAt;

    private boolean hasUnreadForUser1 = false;
    private boolean hasUnreadForUser2 = false;

    public PeerChat() {
        this.createdAt = LocalDateTime.now();
        this.lastMessageAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUser1Id() { return user1Id; }
    public void setUser1Id(String user1Id) { this.user1Id = user1Id; }

    public String getUser2Id() { return user2Id; }
    public void setUser2Id(String user2Id) { this.user2Id = user2Id; }

    public String getUser1Name() { return user1Name; }
    public void setUser1Name(String user1Name) { this.user1Name = user1Name; }

    public String getUser2Name() { return user2Name; }
    public void setUser2Name(String user2Name) { this.user2Name = user2Name; }

    public List<ChatMessage> getMessages() { return messages; }
    public void setMessages(List<ChatMessage> messages) { this.messages = messages; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getLastMessageAt() { return lastMessageAt; }
    public void setLastMessageAt(LocalDateTime lastMessageAt) { this.lastMessageAt = lastMessageAt; }

    public boolean isHasUnreadForUser1() { return hasUnreadForUser1; }
    public void setHasUnreadForUser1(boolean hasUnreadForUser1) { this.hasUnreadForUser1 = hasUnreadForUser1; }

    public boolean isHasUnreadForUser2() { return hasUnreadForUser2; }
    public void setHasUnreadForUser2(boolean hasUnreadForUser2) { this.hasUnreadForUser2 = hasUnreadForUser2; }

    /** Which cached name/unread-flag belongs to a given user ID (must be user1Id or user2Id). */
    public boolean isUser1(String userId) { return user1Id != null && user1Id.equals(userId); }

    /** The OTHER participant's ID, given one side. */
    public String otherUserId(String userId) { return isUser1(userId) ? user2Id : user1Id; }

    public String otherUserName(String userId) { return isUser1(userId) ? user2Name : user1Name; }
}
