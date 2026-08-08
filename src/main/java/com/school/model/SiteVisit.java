package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "site_visits")
public class SiteVisit {

    @Id
    private String id;
    
    private String sessionId; // A unique UUID stored in a cookie
    
    private String ipAddress;
    
    private String deviceType; // "Mobile" or "Desktop"
    
    private String browser;
    
    private String os;
    
    private String visitedUrl;
    
    private boolean registeredUser; // True if they have a logged in session
    
    private LocalDateTime timestamp;

    public SiteVisit() {
        this.timestamp = LocalDateTime.now();
    }

    public SiteVisit(String sessionId, String ipAddress, String deviceType, String browser, String os, String visitedUrl, boolean registeredUser) {
        this.sessionId = sessionId;
        this.ipAddress = ipAddress;
        this.deviceType = deviceType;
        this.browser = browser;
        this.os = os;
        this.visitedUrl = visitedUrl;
        this.registeredUser = registeredUser;
        this.timestamp = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public void setDeviceType(String deviceType) {
        this.deviceType = deviceType;
    }

    public String getBrowser() {
        return browser;
    }

    public void setBrowser(String browser) {
        this.browser = browser;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getVisitedUrl() {
        return visitedUrl;
    }

    public void setVisitedUrl(String visitedUrl) {
        this.visitedUrl = visitedUrl;
    }

    public boolean isRegisteredUser() {
        return registeredUser;
    }

    public void setRegisteredUser(boolean registeredUser) {
        this.registeredUser = registeredUser;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
