package com.school.auth;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import com.school.academic.Institution;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.Pattern;
import java.util.Set;
import java.util.HashSet;
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @NotBlank(message = "Name cannot be empty")
    @Size(min = 2, max = 100)
    @Pattern(regexp = "^[a-zA-Z\\-']+(?:\\s+[a-zA-Z\\-']+)+$", message = "Please enter at least two names (e.g., Careen Godfrey)")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email")
    @Indexed(unique = true)
    private String email;

    @Indexed(unique = true, sparse = true)
    private String phoneNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    private Role role = Role.STUDENT; // STUDENT, ADMIN

    private Boolean isPremium = false;

    // New profile fields
    private String profilePicture;
    private String coverPhoto;
    private String courseProgram;
    private Integer level;
    private Integer semester;
    private Integer year;
    
    // Bio and Social Links
    @Size(max = 250, message = "Bio cannot exceed 250 characters")
    private String bio;
    private String githubLink;
    private String linkedinLink;
    private String twitterLink;
    private String facebookLink;
    private String instagramLink;
    private String telegramLink;
    private String youtubeLink;
    private LocalDateTime dateJoined;
    private LocalDateTime lastLoginTime;
    private LocalDateTime lastActiveTime;
    private String lastAction;

    @DBRef(lazy = true)
    private com.school.academic.Institution institution;

    private Set<String> savedNotes = new HashSet<>();
    private Set<String> downloadedNotes = new HashSet<>();

    // "Connect" is a one-way follow, not a mutual relationship — clicking
    // Connect on someone's profile adds them to YOUR following list and adds
    // YOU to THEIR followers list. A profile's "Connections" count is its
    // follower count. Both directions are stored (rather than derived by
    // counting who has your ID in their following set) so reads stay O(1).
    private Set<String> following = new HashSet<>();
    private Set<String> followers = new HashSet<>();

    private Boolean isVerified = true;
    private String verificationToken;
    private String securityToken;
    private LocalDateTime tokenExpiryDate;

    private Boolean isSuspended = false;
    private Set<String> permissions = new HashSet<>();

    // Bumped by AdminController.warnUser() each time an admin sends this user a
    // formal warning — lets the dashboard flag repeat offenders automatically
    // instead of an admin having to remember each user's warning history.
    private Integer warningCount = 0;

    // Community "verified" trust badge (green name + checkmark on posts/comments/chat) —
    // distinct from isVerified above, which gates login/account-email verification.
    // Granted via admin approval of a VerificationRequest, or directly by an admin.
    private Boolean hasVerifiedBadge = false;

    // Constructors
    public User() {
        this.role = Role.STUDENT;
        this.dateJoined = LocalDateTime.now();
    }

    public User(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.dateJoined = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
    public Boolean getIsPremium() { return isPremium; }
    public void setIsPremium(Boolean isPremium) { this.isPremium = isPremium; }
    public String getProfilePicture() { return profilePicture; }
    public void setProfilePicture(String profilePicture) { this.profilePicture = profilePicture; }
    public String getCoverPhoto() { return coverPhoto; }
    public void setCoverPhoto(String coverPhoto) { this.coverPhoto = coverPhoto; }
    public String getCourseProgram() { return courseProgram; }
    public void setCourseProgram(String courseProgram) { this.courseProgram = courseProgram; }
    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }
    public Integer getSemester() { return semester; }
    public void setSemester(Integer semester) { this.semester = semester; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getGithubLink() { return githubLink; }
    public void setGithubLink(String githubLink) { this.githubLink = githubLink; }
    public String getLinkedinLink() { return linkedinLink; }
    public void setLinkedinLink(String linkedinLink) { this.linkedinLink = linkedinLink; }
    public String getTwitterLink() { return twitterLink; }
    public void setTwitterLink(String twitterLink) { this.twitterLink = twitterLink; }
    public String getFacebookLink() { return facebookLink; }
    public void setFacebookLink(String facebookLink) { this.facebookLink = facebookLink; }
    public String getInstagramLink() { return instagramLink; }
    public void setInstagramLink(String instagramLink) { this.instagramLink = instagramLink; }
    public String getTelegramLink() { return telegramLink; }
    public void setTelegramLink(String telegramLink) { this.telegramLink = telegramLink; }
    public String getYoutubeLink() { return youtubeLink; }
    public void setYoutubeLink(String youtubeLink) { this.youtubeLink = youtubeLink; }
    public LocalDateTime getDateJoined() { return dateJoined; }
    public void setDateJoined(LocalDateTime dateJoined) { this.dateJoined = dateJoined; }
    public LocalDateTime getLastLoginTime() { return lastLoginTime; }
    public void setLastLoginTime(LocalDateTime lastLoginTime) { this.lastLoginTime = lastLoginTime; }
    public LocalDateTime getLastActiveTime() { return lastActiveTime; }
    public void setLastActiveTime(LocalDateTime lastActiveTime) { this.lastActiveTime = lastActiveTime; }
    public String getLastAction() { return lastAction; }
    public void setLastAction(String lastAction) { this.lastAction = lastAction; }
    public com.school.academic.Institution getInstitution() { return institution; }
    public void setInstitution(com.school.academic.Institution institution) { this.institution = institution; }
    public Set<String> getSavedNotes() { return savedNotes; }
    public void setSavedNotes(Set<String> savedNotes) { this.savedNotes = savedNotes; }

    public Set<String> getFollowing() { return following; }
    public void setFollowing(Set<String> following) { this.following = following; }

    public Set<String> getFollowers() { return followers; }
    public void setFollowers(Set<String> followers) { this.followers = followers; }
    public Set<String> getDownloadedNotes() { return downloadedNotes; }
    public void setDownloadedNotes(Set<String> downloadedNotes) { this.downloadedNotes = downloadedNotes; }
    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }
    public String getVerificationToken() { return verificationToken; }
    public void setVerificationToken(String verificationToken) { this.verificationToken = verificationToken; }
    public String getSecurityToken() { return securityToken; }
    public void setSecurityToken(String securityToken) { this.securityToken = securityToken; }
    public LocalDateTime getTokenExpiryDate() { return tokenExpiryDate; }
    public void setTokenExpiryDate(LocalDateTime tokenExpiryDate) { this.tokenExpiryDate = tokenExpiryDate; }
    public Boolean getIsSuspended() { return isSuspended; }
    public void setIsSuspended(Boolean isSuspended) { this.isSuspended = isSuspended; }
    public Integer getWarningCount() { return warningCount != null ? warningCount : 0; }
    public void setWarningCount(Integer warningCount) { this.warningCount = warningCount; }
    public Set<String> getPermissions() { return permissions; }
    public void setPermissions(Set<String> permissions) { this.permissions = permissions; }
    public Boolean getHasVerifiedBadge() { return hasVerifiedBadge; }
    public void setHasVerifiedBadge(Boolean hasVerifiedBadge) { this.hasVerifiedBadge = hasVerifiedBadge; }
}
