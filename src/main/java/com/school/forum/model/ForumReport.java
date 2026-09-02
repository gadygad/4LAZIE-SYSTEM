package com.school.forum.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

// A report stays PENDING (content stays visible) until an admin/super-admin
// actually reviews it — it never auto-hides anything on its own. Reviewing
// either DISMISSes it (content was fine) or REMOVES the content (reusing the
// normal post/comment delete path) and records who decided and when, the
// same accountability trail a real moderation queue keeps.
@Document(collection = "forum_reports")
public class ForumReport {

    @Id
    private String id;

    private String contentType; // "POST" or "COMMENT"
    private String contentId;   // the reported post's or comment's own id
    private String postId;      // the post it belongs to either way — a comment report needs this to link back, a post report just repeats contentId

    private String reporterId;
    private String reason;      // one of REASONS below
    private String details;     // optional free text the reporter adds

    private String status = "PENDING"; // PENDING, DISMISSED, REMOVED
    private String reviewedByUserId;
    private LocalDateTime reviewedAt;

    private LocalDateTime createdAt = LocalDateTime.now();

    public static final java.util.List<String> REASONS = java.util.List.of(
            "Spam", "Harassment or Bullying", "Hate Speech", "Inappropriate Content", "False Information", "Other"
    );

    public ForumReport() {}

    public ForumReport(String contentType, String contentId, String postId, String reporterId, String reason, String details) {
        this.contentType = contentType;
        this.contentId = contentId;
        this.postId = postId;
        this.reporterId = reporterId;
        this.reason = reason;
        this.details = details;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getContentType() { return contentType; }
    public void setContentType(String contentType) { this.contentType = contentType; }

    public String getContentId() { return contentId; }
    public void setContentId(String contentId) { this.contentId = contentId; }

    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }

    public String getReporterId() { return reporterId; }
    public void setReporterId(String reporterId) { this.reporterId = reporterId; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReviewedByUserId() { return reviewedByUserId; }
    public void setReviewedByUserId(String reviewedByUserId) { this.reviewedByUserId = reviewedByUserId; }

    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
