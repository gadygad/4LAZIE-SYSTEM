package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "push_subscriptions")
public class PushSubscription {
    @Id
    private String id;
    
    private String endpoint;
    private String p256dh;
    private String auth;
    private String userId; // Optional, can be null if guest
    private LocalDateTime createdAt = LocalDateTime.now();

    public PushSubscription() {}

    public PushSubscription(String endpoint, String p256dh, String auth, String userId) {
        this.endpoint = endpoint;
        this.p256dh = p256dh;
        this.auth = auth;
        this.userId = userId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEndpoint() { return endpoint; }
    public void setEndpoint(String endpoint) { this.endpoint = endpoint; }

    public String getP256dh() { return p256dh; }
    public void setP256dh(String p256dh) { this.p256dh = p256dh; }

    public String getAuth() { return auth; }
    public void setAuth(String auth) { this.auth = auth; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
