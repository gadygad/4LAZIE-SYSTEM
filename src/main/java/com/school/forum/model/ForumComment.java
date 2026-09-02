package com.school.forum.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

// Every read (listing, counting) filters by postId and sorts by createdAt —
// without this index it's a full collection scan that gets slower as
// comments pile up, which is why opening the comments panel felt slow.
@CompoundIndexes({
    @CompoundIndex(name = "postId_createdAt_idx", def = "{'postId': 1, 'createdAt': 1}")
})
@Document(collection = "forum_comments")
public class ForumComment {

    @Id
    private String id;

    private String postId;

    private String authorId;

    @org.springframework.data.annotation.Transient
    private com.school.auth.User author;

    private String content;

    private LocalDateTime createdAt = LocalDateTime.now();

    // Denormalized snapshot of the comment being replied to (same pattern as
    // ChatMessage's replyTo* fields) — avoids a join just to render the quote.
    private String replyToCommentId;
    private String replyToAuthorName;
    private String replyToContent;

    // Same like pattern as ForumPost: likesCount mirrors likedBy's size so
    // existing consumers reading a plain count don't need to change.
    private int likesCount = 0;
    private java.util.Set<String> likedBy = new java.util.LinkedHashSet<>();

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

    public com.school.auth.User getAuthor() { return author; }
    public void setAuthor(com.school.auth.User author) { this.author = author; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public String getReplyToCommentId() { return replyToCommentId; }
    public void setReplyToCommentId(String replyToCommentId) { this.replyToCommentId = replyToCommentId; }

    public String getReplyToAuthorName() { return replyToAuthorName; }
    public void setReplyToAuthorName(String replyToAuthorName) { this.replyToAuthorName = replyToAuthorName; }

    public String getReplyToContent() { return replyToContent; }
    public void setReplyToContent(String replyToContent) { this.replyToContent = replyToContent; }

    public int getLikesCount() { return likesCount; }
    public void setLikesCount(int likesCount) { this.likesCount = likesCount; }

    public java.util.Set<String> getLikedBy() { return likedBy; }
    public void setLikedBy(java.util.Set<String> likedBy) { this.likedBy = likedBy != null ? likedBy : new java.util.LinkedHashSet<>(); }
}
