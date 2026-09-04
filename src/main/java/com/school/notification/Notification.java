package com.school.notification;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;

@Document(collection = "notifications")
public class Notification {
    
    @Id
    private String id;
    
    @Indexed
    private String userId;
    
    private String title;
    
    private String message;
    
    private boolean isRead = false;
    
    private String link = "/dashboard";
    
    private LocalDateTime createdAt = LocalDateTime.now();

    public Notification() {}

    public Notification(String userId, String title, String message) {
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.createdAt = LocalDateTime.now();
    }
    
    public Notification(String userId, String title, String message, String link) {
        this.userId = userId;
        this.title = title;
        this.message = message;
        this.link = link;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    
    public boolean isRead() { return isRead; }
    public void setRead(boolean isRead) { this.isRead = isRead; }
    
    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    // Derived, not persisted — Spring Data maps this document by its fields,
    // so a getter-only method is invisible to the Mongo converter. Classifies
    // by the title's fixed prefix so the dropdown can give each kind of
    // notification its own icon and color instead of one flat generic look.
    public String getCategory() {
        if (title == null) return "default";
        if (title.startsWith("New Forum Report")) return "report";
        if (title.startsWith("Repeat Offender")) return "offender";
        if (title.startsWith("New Verification Request")) return "verify";
        if (title.startsWith("New Student Question") || title.startsWith("New Contact Message")) return "question";
        if (title.startsWith("Approval Needed")) return "approval";
        if (title.startsWith("New Like")) return "like";
        if (title.startsWith("New Reply") || title.startsWith("New Comment")) return "reply";
        if (title.startsWith("New Message")) return "message";
        if (title.startsWith("Magic Reply")) return "magic";
        if (title.startsWith("New Notes Added")) return "notes";
        return "default";
    }

    public String getIconClass() {
        switch (getCategory()) {
            case "report": return "bi-flag-fill";
            case "offender": return "bi-exclamation-octagon-fill";
            case "verify": return "bi-patch-check-fill";
            case "question": return "bi-question-circle-fill";
            case "approval": return "bi-stamp";
            case "like": return "bi-heart-fill";
            case "reply": return "bi-chat-left-text-fill";
            case "message": return "bi-envelope-fill";
            case "magic": return "bi-magic";
            case "notes": return "bi-journal-plus";
            default: return "bi-info-circle-fill";
        }
    }

    public String getRelativeTime() {
        if (createdAt == null) return "";
        long seconds = java.time.Duration.between(createdAt, LocalDateTime.now()).getSeconds();
        if (seconds < 5) return "Just now";
        if (seconds < 60) return seconds + "s ago";
        long minutes = seconds / 60;
        if (minutes < 60) return minutes + "m ago";
        long hours = minutes / 60;
        if (hours < 24) return hours + "h ago";
        long days = hours / 24;
        if (days < 7) return days + "d ago";
        return createdAt.format(java.time.format.DateTimeFormatter.ofPattern("dd MMM"));
    }
}
