package com.school.auth;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "verification_requests")
public class VerificationRequest {

    @Id
    private String id;

    private String userId;

    private String reason;

    // PENDING, APPROVED, REJECTED
    private String status = "PENDING";

    private LocalDateTime requestDate = LocalDateTime.now();

    private String reviewedByUserId;
    private LocalDateTime reviewedAt;

    public VerificationRequest() {}

    public VerificationRequest(String userId, String reason) {
        this.userId = userId;
        this.reason = reason;
        this.requestDate = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

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
