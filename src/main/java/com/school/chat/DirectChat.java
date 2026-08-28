package com.school.chat;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "direct_chats")
public class DirectChat {

    @Id
    private String id;

    @Indexed
    private String adminId;

    @Indexed
    private String studentId;

    private String studentName;    // cached for display
    private String adminName;      // cached for display

    private List<ChatMessage> messages = new ArrayList<>();

    private LocalDateTime createdAt;
    private LocalDateTime lastMessageAt;

    private boolean hasUnreadForAdmin   = false;
    private boolean hasUnreadForStudent = false;

    public DirectChat() {
        this.createdAt    = LocalDateTime.now();
        this.lastMessageAt = LocalDateTime.now();
    }

    // --- Getters & Setters ---

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAdminId() { return adminId; }
    public void setAdminId(String adminId) { this.adminId = adminId; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getAdminName() { return adminName; }
    public void setAdminName(String adminName) { this.adminName = adminName; }

    public List<ChatMessage> getMessages() { return messages; }
    public void setMessages(List<ChatMessage> messages) { this.messages = messages; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getLastMessageAt() { return lastMessageAt; }
    public void setLastMessageAt(LocalDateTime lastMessageAt) { this.lastMessageAt = lastMessageAt; }

    public boolean isHasUnreadForAdmin() { return hasUnreadForAdmin; }
    public void setHasUnreadForAdmin(boolean hasUnreadForAdmin) { this.hasUnreadForAdmin = hasUnreadForAdmin; }

    public boolean isHasUnreadForStudent() { return hasUnreadForStudent; }
    public void setHasUnreadForStudent(boolean hasUnreadForStudent) { this.hasUnreadForStudent = hasUnreadForStudent; }
}
