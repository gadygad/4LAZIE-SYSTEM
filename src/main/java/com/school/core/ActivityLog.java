package com.school.core;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;

@Document(collection = "activity_logs")
public class ActivityLog {

    @Id
    private String id;

    @Indexed
    private String userId;

    private String userName;
    private String userRole;

    private String action;
    private String details;
    
    private String ipAddress;
    private String deviceInfo;
    
    @Indexed
    private LocalDateTime timestamp;

    public ActivityLog() {
        this.timestamp = LocalDateTime.now();
    }

    public ActivityLog(String userId, String userName, String userRole, String action, String details, String ipAddress, String deviceInfo) {
        this.userId = userId;
        this.userName = userName;
        this.userRole = userRole;
        this.action = action;
        this.details = details;
        this.ipAddress = ipAddress;
        this.deviceInfo = deviceInfo;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    
    public String getUserRole() { return userRole; }
    public void setUserRole(String userRole) { this.userRole = userRole; }
    
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    
    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }
    
    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }
    
    public String getDeviceInfo() { return deviceInfo; }
    public void setDeviceInfo(String deviceInfo) { this.deviceInfo = deviceInfo; }
    
    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
