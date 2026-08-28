package com.school.core;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "team_members")
public class TeamMember {

    @Id
    private String id;

    private String name;
    private String role;
    private String quote;
    private String imagePath;
    private int displayOrder = 0;
    private boolean isActive = true;
    private LocalDateTime createdAt = LocalDateTime.now();

    public TeamMember() {}

    public TeamMember(String name, String role, String quote, String imagePath, int displayOrder, boolean isActive) {
        this.name = name;
        this.role = role;
        this.quote = quote;
        this.imagePath = imagePath;
        this.displayOrder = displayOrder;
        this.isActive = isActive;
        this.createdAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getQuote() { return quote; }
    public void setQuote(String quote) { this.quote = quote; }

    public String getImagePath() { return imagePath; }
    public void setImagePath(String imagePath) { this.imagePath = imagePath; }

    public int getDisplayOrder() { return displayOrder; }
    public void setDisplayOrder(int displayOrder) { this.displayOrder = displayOrder; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
