package com.school.core;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "pending_actions")
public class PendingAction {
    @Id
    private String id;
    private String requesterId;
    private String requesterName;
    private String targetEntity; // "USER", "NOTE", "SUBJECT", "COURSE"
    private String targetId;
    private String targetDescription; // Friendly name (e.g. "Note: Chapter 1")
    private String actionType; // "DELETE", "SUSPEND"
    private String status; // "PENDING", "APPROVED", "REJECTED"
    private LocalDateTime requestDate;

    public PendingAction() {
        this.status = "PENDING";
        this.requestDate = LocalDateTime.now();
    }

    public PendingAction(String requesterId, String requesterName, String targetEntity, String targetId, String targetDescription, String actionType) {
        this();
        this.requesterId = requesterId;
        this.requesterName = requesterName;
        this.targetEntity = targetEntity;
        this.targetId = targetId;
        this.targetDescription = targetDescription;
        this.actionType = actionType;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getRequesterId() { return requesterId; }
    public void setRequesterId(String requesterId) { this.requesterId = requesterId; }
    public String getRequesterName() { return requesterName; }
    public void setRequesterName(String requesterName) { this.requesterName = requesterName; }
    public String getTargetEntity() { return targetEntity; }
    public void setTargetEntity(String targetEntity) { this.targetEntity = targetEntity; }
    public String getTargetId() { return targetId; }
    public void setTargetId(String targetId) { this.targetId = targetId; }
    public String getTargetDescription() { return targetDescription; }
    public void setTargetDescription(String targetDescription) { this.targetDescription = targetDescription; }
    public String getActionType() { return actionType; }
    public void setActionType(String actionType) { this.actionType = actionType; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getRequestDate() { return requestDate; }
    public void setRequestDate(LocalDateTime requestDate) { this.requestDate = requestDate; }
}
