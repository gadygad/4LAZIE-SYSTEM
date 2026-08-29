package com.school.user;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

import com.school.auth.Role;
import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.core.FileStorageService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Optional;

@Controller
public class UserController {

        private UserRepository userRepository;

        private com.school.auth.AuthUtil authUtil;

    private User getLoggedInUser() {
        return authUtil.getLoggedInUser();
    }

        private com.school.notification.NotificationService notificationService;

        private com.school.notes.NoteRepository noteRepository;

        private FileStorageService fileStorageService;

        private com.school.notification.PushNotificationService pushNotificationService;

        @Autowired
        private com.school.auth.VerificationRequestRepository verificationRequestRepository;

    public UserController(UserRepository userRepository, com.school.auth.AuthUtil authUtil, com.school.notification.NotificationService notificationService, com.school.notes.NoteRepository noteRepository, FileStorageService fileStorageService, com.school.notification.PushNotificationService pushNotificationService) {
        this.userRepository = userRepository;
        this.authUtil = authUtil;
        this.notificationService = notificationService;
        this.noteRepository = noteRepository;
        this.fileStorageService = fileStorageService;
        this.pushNotificationService = pushNotificationService;
    }

    /** Resolves a user's cover photo via reflection so this still works even
     * against an older compiled User class that predates the field. */
    private String resolveCoverPhoto(User user) {
        try {
            java.lang.reflect.Method m = user.getClass().getMethod("getCoverPhoto");
            return (String) m.invoke(user);
        } catch (Exception ignored) {
            return null;
        }
    }

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @Autowired
    private org.springframework.security.core.session.SessionRegistry sessionRegistry;

    @Autowired
    private com.school.core.EmailService emailService;

    @GetMapping("/explore")
    public String getExplorePage() {
        return "notes/explore";
    }

    @GetMapping("/notifications")
    public String getAllNotifications(Model model) {
        User sessionUser = getLoggedInUser();
        if (sessionUser == null) {
            return "redirect:/login";
        }
        model.addAttribute("notifications", notificationService.getUserNotifications(sessionUser.getId()));
        return "user/notifications";
    }

    @GetMapping("/profile")
    public String getProfile(@RequestParam(value = "edit", required = false, defaultValue = "false") boolean edit,
                             Model model) {
        User sessionUser = getLoggedInUser();
        if (sessionUser == null) {
            return "redirect:/login";
        }
        
        // Fetch fresh user from DB to ensure we have the latest institution and stats
        User user = userRepository.findById(sessionUser.getId()).orElse(sessionUser);
        
        // Safely get coverPhoto via reflection (handles old compiled classes without the field)
        String coverPhoto = null;
        try {
            java.lang.reflect.Method m = user.getClass().getMethod("getCoverPhoto");
            coverPhoto = (String) m.invoke(user);
        } catch (Exception ignored) { }
        model.addAttribute("coverPhoto", coverPhoto);
        
        // Retrieve active sessions
        java.util.List<org.springframework.security.core.session.SessionInformation> activeSessions = new java.util.ArrayList<>();
        for (Object principal : sessionRegistry.getAllPrincipals()) {
            if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
                org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) principal;
                if (userDetails.getUsername().equals(user.getEmail())) {
                    activeSessions.addAll(sessionRegistry.getAllSessions(principal, false));
                }
            }
        }
        model.addAttribute("activeSessions", activeSessions);
        
        // Self-heal: If user has no institution, assign default SJUIT
        if (user.getInstitution() == null) {
            com.school.academic.Institution sjuit = new com.school.academic.Institution();
            sjuit.setId("1");
            sjuit.setName("St. Joseph University in Tanzania");
            sjuit.setShortName("SJUIT");
            user.setInstitution(sjuit);
            userRepository.save(user); // Save back to database!
        }
        
        model.addAttribute("user", user);
        model.addAttribute("editMode", edit);
        model.addAttribute("isOwnProfile", true);
        model.addAttribute("connectionsCount", user.getFollowers() != null ? user.getFollowers().size() : 0);
        model.addAttribute("hasPendingVerification",
                verificationRequestRepository.findByUserIdAndStatus(user.getId(), "PENDING").isPresent());
        return "user/profile";
    }

    // Student requests the community "verified" trust badge — goes into the
    // same admin queue as any other approval-style request in this app.
    @PostMapping("/profile/request-verification")
    public String requestVerification(@RequestParam String reason,
                                       org.springframework.web.servlet.mvc.support.RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null) return "redirect:/login";

        if (Boolean.TRUE.equals(user.getHasVerifiedBadge())) {
            redirectAttributes.addFlashAttribute("info", "You're already verified.");
            return "redirect:/profile";
        }
        if (verificationRequestRepository.findByUserIdAndStatus(user.getId(), "PENDING").isPresent()) {
            redirectAttributes.addFlashAttribute("info", "You already have a pending verification request.");
            return "redirect:/profile";
        }
        if (reason == null || reason.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Please explain why you're requesting verification.");
            return "redirect:/profile";
        }
        verificationRequestRepository.save(new com.school.auth.VerificationRequest(user.getId(), reason.trim()));
        redirectAttributes.addFlashAttribute("success", "Verification request submitted — an admin will review it soon.");
        return "redirect:/profile";
    }

    /**
     * Read-only view of ANOTHER student's profile — same template as one's own
     * (per product requirement), just with editing/private-activity sections
     * hidden and a Connect/Message section shown instead.
     */
    @GetMapping("/students/{id}/profile")
    public String viewStudentProfile(@org.springframework.web.bind.annotation.PathVariable String id, Model model) {
        User me = getLoggedInUser();
        if (me == null) return "redirect:/login";

        if (id.equals(me.getId())) {
            return "redirect:/profile";
        }

        User target = userRepository.findById(id).orElse(null);
        if (target == null || target.getRole() != com.school.auth.Role.STUDENT
                || Boolean.TRUE.equals(target.getIsSuspended())) {
            return "redirect:/messages";
        }

        model.addAttribute("coverPhoto", resolveCoverPhoto(target));
        model.addAttribute("user", target);
        model.addAttribute("editMode", false);
        model.addAttribute("isOwnProfile", false);
        // "Connect" is one-way: am I (the viewer) already following THEM?
        model.addAttribute("isConnected", me.getFollowing() != null && me.getFollowing().contains(target.getId()));
        // "Connections" shown on a profile = that profile's follower count.
        model.addAttribute("connectionsCount", target.getFollowers() != null ? target.getFollowers().size() : 0);
        return "user/profile";
    }

    /**
     * Connect = follow, one-way. Clicking it on someone's profile adds them
     * to YOUR following list and adds YOU to THEIR followers list — it does
     * not make them follow you back.
     */
    @PostMapping("/api/connections/{id}/toggle")
    @org.springframework.web.bind.annotation.ResponseBody
    public org.springframework.http.ResponseEntity<?> toggleConnection(@org.springframework.web.bind.annotation.PathVariable String id) {
        User me = getLoggedInUser();
        if (me == null) {
            return org.springframework.http.ResponseEntity.status(401).body(java.util.Map.of("success", false));
        }
        if (id.equals(me.getId())) {
            return org.springframework.http.ResponseEntity.badRequest()
                    .body(java.util.Map.of("success", false, "message", "You can't connect with yourself."));
        }
        User target = userRepository.findById(id).orElse(null);
        if (target == null) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }

        if (me.getFollowing() == null) me.setFollowing(new java.util.HashSet<>());
        if (target.getFollowers() == null) target.setFollowers(new java.util.HashSet<>());

        boolean nowConnected;
        if (me.getFollowing().contains(target.getId())) {
            me.getFollowing().remove(target.getId());
            target.getFollowers().remove(me.getId());
            nowConnected = false;
        } else {
            me.getFollowing().add(target.getId());
            target.getFollowers().add(me.getId());
            nowConnected = true;
            pushNotificationService.sendToUser(target.getId(), "New Connection",
                    me.getName() + " connected with you.", "/students/" + me.getId() + "/profile", me.getId());
        }
        userRepository.save(me);
        userRepository.save(target);

        return org.springframework.http.ResponseEntity.ok(java.util.Map.of(
                "success", true,
                "connected", nowConnected,
                "connectionsCount", target.getFollowers().size()));
    }

    /** Who follows this user — powers the Connections list modal on a profile. */
    @GetMapping("/api/connections/{id}/followers")
    @org.springframework.web.bind.annotation.ResponseBody
    public org.springframework.http.ResponseEntity<?> getFollowers(@org.springframework.web.bind.annotation.PathVariable String id) {
        User me = getLoggedInUser();
        if (me == null) {
            return org.springframework.http.ResponseEntity.status(401).body(java.util.Map.of("success", false));
        }
        User target = userRepository.findById(id).orElse(null);
        if (target == null) {
            return org.springframework.http.ResponseEntity.notFound().build();
        }

        java.util.Set<String> followerIds = target.getFollowers() != null ? target.getFollowers() : java.util.Set.of();
        java.util.List<java.util.Map<String, Object>> followers = new java.util.ArrayList<>();
        for (User u : userRepository.findAllById(followerIds)) {
            java.util.Map<String, Object> m = new java.util.HashMap<>();
            m.put("id", u.getId());
            m.put("name", u.getName());
            m.put("profilePicture", u.getProfilePicture());
            m.put("courseProgram", u.getCourseProgram());
            m.put("isMe", u.getId().equals(me.getId()));
            m.put("isFollowedByMe", me.getFollowing() != null && me.getFollowing().contains(u.getId()));
            followers.add(m);
        }
        followers.sort((a, b) -> ((String) a.get("name")).compareToIgnoreCase((String) b.get("name")));

        return org.springframework.http.ResponseEntity.ok(java.util.Map.of("success", true, "followers", followers));
    }

    @PostMapping("/profile")
    public String updateProfile(@jakarta.validation.Valid @ModelAttribute("formUser") com.school.dto.UserProfileUpdateDTO formUser,
                             org.springframework.validation.BindingResult bindingResult,
                             HttpSession session, Model model, jakarta.servlet.http.HttpServletRequest request) {

        User sessionUser = getLoggedInUser();
        if (sessionUser == null) {
            return "redirect:/login";
        }
        
        if (bindingResult.hasErrors()) {
            model.addAttribute("error", bindingResult.getAllErrors().get(0).getDefaultMessage());
            model.addAttribute("user", sessionUser); // Revert to current data for display
            model.addAttribute("editMode", true);
            return "user/profile";
        }
        
        if (!sessionUser.getEmail().equalsIgnoreCase(formUser.getEmail())) {
            Optional<User> existingUser = userRepository.findByEmail(formUser.getEmail());
            if (existingUser.isPresent()) {
                model.addAttribute("error", "Email is already in use by another account.");
                model.addAttribute("user", sessionUser); // Revert form data
                model.addAttribute("editMode", true);
                return "user/profile";
            }
        }
        
        // Update mutable fields
        sessionUser.setName(formUser.getName());
        sessionUser.setEmail(formUser.getEmail());
        
        MultipartFile file = formUser.getFile();
        MultipartFile coverPhotoFile = formUser.getCoverPhotoFile();
        
        // Handle profile picture upload if present
        if (file != null && !file.isEmpty()) {
            try {
                String fileUrl = fileStorageService.uploadFile(file);
                sessionUser.setProfilePicture(fileUrl);
            } catch (IOException e) {
                model.addAttribute("error", "Failed to upload profile picture: " + e.getMessage());
                model.addAttribute("user", sessionUser);
                model.addAttribute("editMode", true);
                return "user/profile";
            }
        }
        
        // Handle cover photo upload if present
        if (coverPhotoFile != null && !coverPhotoFile.isEmpty()) {
            try {
                String coverUrl = fileStorageService.uploadFile(coverPhotoFile);
                sessionUser.setCoverPhoto(coverUrl);
            } catch (IOException e) {
                model.addAttribute("error", "Failed to upload cover photo: " + e.getMessage());
                model.addAttribute("user", sessionUser);
                model.addAttribute("editMode", true);
                return "user/profile";
            }
        }
        
        // Handle password change
        if (formUser.getNewPassword() != null && !formUser.getNewPassword().trim().isEmpty()) {
            if (formUser.getCurrentPassword() == null || !passwordEncoder.matches(formUser.getCurrentPassword(), sessionUser.getPassword())) {
                model.addAttribute("error", "Current password is incorrect.");
                model.addAttribute("user", sessionUser);
                model.addAttribute("editMode", true);
                return "user/profile";
            }
            if (!formUser.getNewPassword().equals(formUser.getConfirmPassword())) {
                model.addAttribute("error", "New passwords do not match.");
                model.addAttribute("user", sessionUser);
                model.addAttribute("editMode", true);
                return "user/profile";
            }
            sessionUser.setPassword(passwordEncoder.encode(formUser.getNewPassword()));
            
            // Generate security token and send email alert
            String securityToken = java.util.UUID.randomUUID().toString();
            sessionUser.setSecurityToken(securityToken);
            String deviceDetails = request.getHeader("User-Agent");
            String ipAddress = request.getRemoteAddr();
            String appUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
            emailService.sendPasswordChangeAlert(sessionUser.getEmail(), sessionUser.getName(), deviceDetails + " (IP: " + ipAddress + ")", securityToken, appUrl);
        }

        sessionUser.setLevel(formUser.getLevel());
        sessionUser.setSemester(formUser.getSemester());
        sessionUser.setBio(formUser.getBio());
        sessionUser.setGithubLink(formUser.getGithubLink());
        sessionUser.setLinkedinLink(formUser.getLinkedinLink());
        sessionUser.setTwitterLink(formUser.getTwitterLink());
        sessionUser.setFacebookLink(formUser.getFacebookLink());
        sessionUser.setInstagramLink(formUser.getInstagramLink());
        sessionUser.setTelegramLink(formUser.getTelegramLink());
        sessionUser.setYoutubeLink(formUser.getYoutubeLink());
        // Save changes
        userRepository.save(sessionUser);
        // Update session attribute
        session.setAttribute("user", sessionUser);
        
        // Update Security Context
        org.springframework.security.core.Authentication currentAuth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        if (currentAuth != null) {
            String role = sessionUser.getRole() != null ? sessionUser.getRole().name() : com.school.auth.Role.STUDENT.name();
            org.springframework.security.core.userdetails.UserDetails newUserDetails = 
                new org.springframework.security.core.userdetails.User(
                    sessionUser.getEmail(), 
                    sessionUser.getPassword(), 
                    java.util.Collections.singletonList(new org.springframework.security.core.authority.SimpleGrantedAuthority("ROLE_" + role.toUpperCase()))
                );
            org.springframework.security.authentication.UsernamePasswordAuthenticationToken newAuth = 
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                    newUserDetails, currentAuth.getCredentials(), newUserDetails.getAuthorities());
            org.springframework.security.core.context.SecurityContextHolder.getContext().setAuthentication(newAuth);
        }
        
        model.addAttribute("user", sessionUser);
        // Pass coverPhoto safely for template
        String coverPhoto = null;
        try {
            java.lang.reflect.Method m = sessionUser.getClass().getMethod("getCoverPhoto");
            coverPhoto = (String) m.invoke(sessionUser);
        } catch (Exception ignored) { }
        model.addAttribute("coverPhoto", coverPhoto);
        model.addAttribute("success", "Profile updated successfully!");
        model.addAttribute("editMode", false);
        return "user/profile";
    }

    @GetMapping("/profile/saved")
    public String getSavedNotes(Model model) {
        User user = getLoggedInUser();
        if (user == null) {
            return "redirect:/login";
        }
        
        // Refresh user from DB to get latest saved items
        user = userRepository.findById(user.getId()).orElse(user);
        java.util.List<com.school.notes.Note> notes = new java.util.ArrayList<>();
        if (user.getSavedNotes() != null && !user.getSavedNotes().isEmpty()) {
            noteRepository.findAllById(user.getSavedNotes()).forEach(notes::add);
        }
        
        model.addAttribute("notes", notes);
        model.addAttribute("pageTitle", "Saved Items");
        model.addAttribute("pageIcon", "bi-bookmark-fill");
        return "user/my_notes";
    }

    @GetMapping("/profile/downloads")
    public String getDownloadedNotes(Model model) {
        User user = getLoggedInUser();
        if (user == null) {
            return "redirect:/login";
        }

        // Refresh user from DB
        user = userRepository.findById(user.getId()).orElse(user);
        java.util.List<com.school.notes.Note> notes = new java.util.ArrayList<>();
        if (user.getDownloadedNotes() != null && !user.getDownloadedNotes().isEmpty()) {
            noteRepository.findAllById(user.getDownloadedNotes()).forEach(notes::add);
        }

        model.addAttribute("notes", notes);
        model.addAttribute("pageTitle", "Download History");
        model.addAttribute("pageIcon", "bi-cloud-arrow-down-fill");
        return "user/my_notes";
    }

    @PostMapping("/profile/sessions/revoke")
    public String revokeSession(@RequestParam("sessionId") String sessionId, org.springframework.web.servlet.mvc.support.RedirectAttributes redirectAttributes) {
        org.springframework.security.core.session.SessionInformation sessionInformation = sessionRegistry.getSessionInformation(sessionId);
        if (sessionInformation != null) {
            sessionInformation.expireNow();
            redirectAttributes.addFlashAttribute("success", "Device logged out successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Could not find active session for this device.");
        }
        return "redirect:/profile?edit=true";
    }

    @GetMapping("/secure-account")
    public String secureAccount(@RequestParam("token") String token, Model model, jakarta.servlet.http.HttpServletRequest request) {
        Optional<User> userOpt = userRepository.findBySecurityToken(token);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            // Suspend account to protect it
            user.setIsSuspended(true);
            user.setSecurityToken(null); // invalidate token
            userRepository.save(user);
            
            // Invalidate all sessions globally
            for (Object principal : sessionRegistry.getAllPrincipals()) {
                if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
                    org.springframework.security.core.userdetails.UserDetails userDetails = (org.springframework.security.core.userdetails.UserDetails) principal;
                    if (userDetails.getUsername().equals(user.getEmail())) {
                        java.util.List<org.springframework.security.core.session.SessionInformation> sessions = sessionRegistry.getAllSessions(principal, false);
                        for (org.springframework.security.core.session.SessionInformation sessionInfo : sessions) {
                            sessionInfo.expireNow();
                        }
                    }
                }
            }
            
            // Invalidate current session if the attacker is clicking it (or the victim is logged in)
            HttpSession currentSession = request.getSession(false);
            if (currentSession != null) {
                currentSession.invalidate();
            }
            
            model.addAttribute("error", "Account Secured Successfully! All active devices have been logged out, and your account is temporarily locked. Please contact support or reset your password to regain access.");
            return "auth/login"; 
        }
        model.addAttribute("error", "Invalid or expired security token.");
        return "auth/login";
    }
}
