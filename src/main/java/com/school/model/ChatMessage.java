package com.school.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class ChatMessage {
    private String id = UUID.randomUUID().toString();
    private String senderId;             // "ADMIN" or user's ID
    private String senderName;            // E.g. "4LAZIE", "John Doe"
    private String senderProfilePicture;  // Profile picture URL (null = use initial)
    private String messageText;
    private String attachmentUrl;
    private LocalDateTime timestamp;
    private boolean isRead = false;

    private String replyToMessageId;
    private String replyToSenderName;
    private String replyToMessageText;

    public ChatMessage() {
    }

    public ChatMessage(String senderId, String senderName, String messageText, String attachmentUrl) {
        this.senderId = senderId;
        this.senderName = senderName;
        this.messageText = messageText;
        this.attachmentUrl = attachmentUrl;
        this.timestamp = LocalDateTime.now();
    }

    public ChatMessage(String senderId, String senderName, String senderProfilePicture, String messageText, String attachmentUrl) {
        this.senderId = senderId;
        this.senderName = senderName;
        this.senderProfilePicture = senderProfilePicture;
        this.messageText = messageText;
        this.attachmentUrl = attachmentUrl;
        this.timestamp = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public String getSenderProfilePicture() {
        return senderProfilePicture;
    }

    public void setSenderProfilePicture(String senderProfilePicture) {
        this.senderProfilePicture = senderProfilePicture;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public String getAttachmentUrl() {
        return attachmentUrl;
    }

    public void setAttachmentUrl(String attachmentUrl) {
        this.attachmentUrl = attachmentUrl;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    public String getReplyToMessageId() {
        return replyToMessageId;
    }

    public void setReplyToMessageId(String replyToMessageId) {
        this.replyToMessageId = replyToMessageId;
    }

    public String getReplyToSenderName() {
        return replyToSenderName;
    }

    public void setReplyToSenderName(String replyToSenderName) {
        this.replyToSenderName = replyToSenderName;
    }

    public String getReplyToMessageText() {
        return replyToMessageText;
    }

    public void setReplyToMessageText(String replyToMessageText) {
        this.replyToMessageText = replyToMessageText;
    }
}
