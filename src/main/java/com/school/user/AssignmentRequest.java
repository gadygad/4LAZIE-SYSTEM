package com.school.user;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import com.school.chat.ChatMessage;

import java.time.LocalDateTime;

@Document(collection = "assignment_requests")
public class AssignmentRequest {

    @Id
    private String id;
    private String userId; // The student's ID
    private String subjectName; // Will act as the heading
    private String questionText; // Optional if they just attach a file
    private String attachmentUrl; // The image or PDF they uploaded
    private String deadline; // When they need the assignment by
    private String status; // "PENDING", "IN_PROGRESS", "SOLVED"
    
    // Admin Reply (Legacy)
    private String adminReply;
    private String replyPdfUrl;

    // Public Contact Form Fields
    private boolean isPublicContact;
    private String email;
    private String fullName;
    private String phoneNumber;
    
    // Chat Thread Messages
    private java.util.List<ChatMessage> messages = new java.util.ArrayList<>();
    
    // Read Status
    private boolean isRead;
    private LocalDateTime readAt;
    
    private LocalDateTime createdAt;
    private LocalDateTime solvedAt;

    public AssignmentRequest() {
        this.createdAt = LocalDateTime.now();
        this.status = "PENDING";
        this.isRead = false;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getAttachmentUrl() {
        return attachmentUrl;
    }

    public void setAttachmentUrl(String attachmentUrl) {
        this.attachmentUrl = attachmentUrl;
    }

    public String getDeadline() {
        return deadline;
    }

    public void setDeadline(String deadline) {
        this.deadline = deadline;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAdminReply() {
        return adminReply;
    }

    public void setAdminReply(String adminReply) {
        this.adminReply = adminReply;
    }

    public String getReplyPdfUrl() {
        return replyPdfUrl;
    }

    public void setReplyPdfUrl(String replyPdfUrl) {
        this.replyPdfUrl = replyPdfUrl;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getSolvedAt() {
        return solvedAt;
    }

    public void setSolvedAt(LocalDateTime solvedAt) {
        this.solvedAt = solvedAt;
    }

    public java.util.List<ChatMessage> getMessages() {
        return messages;
    }

    public void setMessages(java.util.List<ChatMessage> messages) {
        this.messages = messages;
    }

    public boolean isPublicContact() {
        return isPublicContact;
    }

    public void setPublicContact(boolean publicContact) {
        isPublicContact = publicContact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
