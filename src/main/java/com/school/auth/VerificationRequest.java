package com.school.auth;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "verification_requests")
public class VerificationRequest {

    @Id
    private String id;

    private String userId;

    // One of the short preset options (CLASS_REPRESENTATIVE, ACTIVE_CONTRIBUTOR,
    // LECTURER, OTHER) shown as a dropdown in the request form.
    private String category;

    private String reason;

    // PENDING, APPROVED, REJECTED
    private String status = "PENDING";

    private LocalDateTime requestDate = LocalDateTime.now();

    private String reviewedByUserId;
    private LocalDateTime reviewedAt;

    public VerificationRequest() {}

    public VerificationRequest(String userId, String category, String reason) {
        this.userId = userId;
        this.category = category;
        this.reason = reason;
        this.requestDate = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getRequestDate() { return requestDate; }
    public void setRequestDate(LocalDateTime requestDate) { this.requestDate = requestDate; }

    public String getReviewedByUserId() { return reviewedByUserId; }
    public void setReviewedByUserId(String reviewedByUserId) { this.reviewedByUserId = reviewedByUserId; }

    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
}
