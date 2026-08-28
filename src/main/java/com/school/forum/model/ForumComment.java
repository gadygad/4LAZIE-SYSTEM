package com.school.forum.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "forum_comments")
public class ForumComment {

    @Id
    private String id;

    private String postId;

    private String authorId;

    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    public ForumComment() {}

    public ForumComment(String postId, String authorId, String content) {
        this.postId = postId;
        this.authorId = authorId;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }

    public String getAuthorId() { return authorId; }
    public void setAuthorId(String authorId) { this.authorId = authorId; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
