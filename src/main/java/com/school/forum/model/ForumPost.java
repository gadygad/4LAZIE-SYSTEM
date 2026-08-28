package com.school.forum.model;

import com.school.auth.User;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "forum_posts")
public class ForumPost {

    @Id
    private String id;

    private User author;

    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    private int likesCount = 0;
    private int commentsCount = 0;

    // Transient flag set at runtime (not saved to DB) for template use
    @org.springframework.data.annotation.Transient
    private boolean adminPost = false;

    @org.springframework.data.annotation.Transient
    private String authorRole = "STUDENT"; // ADMIN, SUPER_ADMIN, LECTURE, CLASS_REPRESENTATIVE, STUDENT

    public boolean isAdminPost() { return adminPost; }
    public void setAdminPost(boolean adminPost) { this.adminPost = adminPost; }

    public String getAuthorRole() { return authorRole; }
    public void setAuthorRole(String authorRole) { this.authorRole = authorRole; }

    public ForumPost() {}

    public ForumPost(User author, String content) {
        this.author = author;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public User getAuthor() {
        return author;
    }

    public void setAuthor(User author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public int getLikesCount() {
        return likesCount;
    }

    public void setLikesCount(int likesCount) {
        this.likesCount = likesCount;
    }

    public int getCommentsCount() {
        return commentsCount;
    }

    public void setCommentsCount(int commentsCount) {
        this.commentsCount = commentsCount;
    }
}
