package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/** A student-created group chat — MVP: name, members, and a flat message list (reuses ChatMessage). */
@Document(collection = "group_chats")
public class GroupChat {

    @Id
    private String id;
    private String name;
    private String groupPicture;
    private String createdBy;
    private Set<String> memberIds = new LinkedHashSet<>();
    private List<ChatMessage> messages = new ArrayList<>();
    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime lastMessageAt;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGroupPicture() { return groupPicture; }
    public void setGroupPicture(String groupPicture) { this.groupPicture = groupPicture; }

    public String getCreatedBy() { return createdBy; }
    public void setCreatedBy(String createdBy) { this.createdBy = createdBy; }

    public Set<String> getMemberIds() { return memberIds; }
    public void setMemberIds(Set<String> memberIds) { this.memberIds = memberIds; }

    public List<ChatMessage> getMessages() { return messages; }
    public void setMessages(List<ChatMessage> messages) { this.messages = messages; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getLastMessageAt() { return lastMessageAt; }
    public void setLastMessageAt(LocalDateTime lastMessageAt) { this.lastMessageAt = lastMessageAt; }
}
