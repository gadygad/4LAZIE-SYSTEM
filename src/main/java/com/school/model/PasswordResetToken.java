package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;

@Document(collection = "password_reset_tokens")
public class PasswordResetToken {

    @Id
    private String id;

    @Indexed(unique = true)
    private String token;

    @DBRef
    private User user;

    private LocalDateTime expiryDate;

    public PasswordResetToken() {}

    public PasswordResetToken(String token, User user, int expirationMinutes) {
        this.token = token;
        this.user = user;
        // The user specified exactly 2 minutes
        this.expiryDate = LocalDateTime.now().plusMinutes(expirationMinutes);
    }

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(this.expiryDate);
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }
}
