package com.school.config;

import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.notification.NotificationService;
import com.school.chat.DirectChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalModelAttributes {

    private static final Logger log = LoggerFactory.getLogger(GlobalModelAttributes.class);

        private NotificationService notificationService;
    
        private UserRepository userRepository;

        private DirectChatService directChatService;
        private com.school.chat.PeerChatService peerChatService;

    public GlobalModelAttributes(NotificationService notificationService, UserRepository userRepository, DirectChatService directChatService, com.school.chat.PeerChatService peerChatService) {
        this.notificationService = notificationService;
        this.userRepository = userRepository;
        this.directChatService = directChatService;
        this.peerChatService = peerChatService;
    }


    @ModelAttribute
    public void addGlobalAttributes(HttpServletRequest request, org.springframework.ui.Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        // We only want to add these attributes if the user is authenticated and not anonymous
        if (auth != null && auth.isAuthenticated() && !auth.getPrincipal().equals("anonymousUser")) {
            try {
                String email = auth.getName();
                User user = null;

                // Primary: exact email match
                try {
                    user = userRepository.findByEmail(email).orElse(null);
                } catch (Exception e) {
                    log.warn("findByEmail failed in GlobalModelAttributes for '{}': {}", email, e.getMessage());
                }

                // Fallback: case-insensitive
                if (user == null) {
                    try {
                        user = userRepository.findFirstByEmailIgnoreCaseOrNameIgnoreCase(email, email).orElse(null);
                    } catch (Exception e) {
                        log.warn("Case-insensitive lookup failed in GlobalModelAttributes for '{}': {}", email, e.getMessage());
                    }
                }

                if (user != null) {
                    // Ensure the user object is globally available, overriding session attributes if needed
                    model.addAttribute("user", user);
                    // Add notification details
                    try {
                        java.util.List<com.school.notification.Notification> allNotifs = notificationService.getUserNotifications(user.getId());
                        java.util.List<com.school.notification.Notification> recentNotifs = allNotifs.stream().limit(10).toList();
                        model.addAttribute("notifications", recentNotifs);
                        model.addAttribute("unreadNotificationCount", notificationService.getUnreadCount(user.getId()));
                        
                        // Add DirectChat unread counts globally
                        long unreadDirect = 0;
                        java.util.List<com.school.chat.DirectChat> directChats = new java.util.ArrayList<>();
                        if (user.getRole() != null && (user.getRole().name().equals("ADMIN") || user.getRole().name().equals("SUPER_ADMIN"))) {
                            unreadDirect = directChatService.getTotalUnreadForAdmin();
                            directChats = directChatService.getAllChats();
                            model.addAttribute("totalUnreadAdmin", unreadDirect);
                        } else {
                            unreadDirect = directChatService.getUnreadCountForStudent(user.getId());
                            directChats = directChatService.getStudentInbox(user.getId());
                            model.addAttribute("totalUnreadStudent", unreadDirect);
                        }

                        // Add PeerChat unread counts globally
                        long unreadPeer = peerChatService.getUnreadCount(user.getId());
                        java.util.List<com.school.chat.PeerChat> peerChats = peerChatService.getInbox(user.getId());
                        
                        model.addAttribute("unreadMessageCount", unreadDirect + unreadPeer);

                        // Aggregate latest messages for preview dropdown
                        java.util.List<MessagePreview> previews = new java.util.ArrayList<>();
                        
                        for (com.school.chat.DirectChat dc : directChats) {
                            if (dc.getMessages() != null && !dc.getMessages().isEmpty()) {
                                com.school.chat.ChatMessage lastMsg = dc.getMessages().get(dc.getMessages().size() - 1);
                                boolean isAdmin = user.getRole() != null && (user.getRole().name().equals("ADMIN") || user.getRole().name().equals("SUPER_ADMIN"));
                                boolean isUnread = isAdmin ? dc.isHasUnreadForAdmin() : dc.isHasUnreadForStudent();
                                
                                String chatName = isAdmin ? dc.getStudentName() : (dc.getAdminName() != null ? dc.getAdminName() : "4LAZIE Admin");
                                String partnerId = isAdmin ? dc.getStudentId() : dc.getAdminId();
                                String partnerAvatar = null;
                                for (int i = dc.getMessages().size() - 1; i >= 0; i--) {
                                    com.school.chat.ChatMessage m = dc.getMessages().get(i);
                                    if (m.getSenderId() != null && m.getSenderId().equals(partnerId) && m.getSenderProfilePicture() != null) {
                                        partnerAvatar = m.getSenderProfilePicture();
                                        break;
                                    }
                                }
                                
                                String messageText = lastMsg.getSenderId().equals(user.getId()) ? "You: " + lastMsg.getMessageText() : lastMsg.getMessageText();
                                String link = isAdmin ? "/admin/messages?chatId=" + dc.getId() : "/messages?openDirect=1";
                                previews.add(new MessagePreview(chatName, messageText, dc.getLastMessageAt(), link, partnerAvatar, isUnread));
                            }
                        }

                        for (com.school.chat.PeerChat pc : peerChats) {
                            if (pc.getMessages() != null && !pc.getMessages().isEmpty()) {
                                com.school.chat.ChatMessage lastMsg = pc.getMessages().get(pc.getMessages().size() - 1);
                                boolean isUnread = pc.isUser1(user.getId()) ? pc.isHasUnreadForUser1() : pc.isHasUnreadForUser2();
                                
                                String chatName = pc.otherUserName(user.getId());
                                String partnerId = pc.otherUserId(user.getId());
                                String partnerAvatar = null;
                                for (int i = pc.getMessages().size() - 1; i >= 0; i--) {
                                    com.school.chat.ChatMessage m = pc.getMessages().get(i);
                                    if (m.getSenderId() != null && m.getSenderId().equals(partnerId) && m.getSenderProfilePicture() != null) {
                                        partnerAvatar = m.getSenderProfilePicture();
                                        break;
                                    }
                                }
                                
                                String messageText = lastMsg.getSenderId().equals(user.getId()) ? "You: " + lastMsg.getMessageText() : lastMsg.getMessageText();
                                String link = "/messages?openPeerChat=" + pc.getId();
                                previews.add(new MessagePreview(chatName, messageText, pc.getLastMessageAt(), link, partnerAvatar, isUnread));
                            }
                        }

                        previews.sort((a, b) -> b.getTime().compareTo(a.getTime()));
                        model.addAttribute("latestMessages", previews.stream().limit(5).toList());

                    } catch (Exception e) {
                        log.warn("Failed to load notifications or messages for user '{}': {}", email, e.getMessage());
                        model.addAttribute("notifications", java.util.Collections.emptyList());
                        model.addAttribute("unreadNotificationCount", 0);
                        model.addAttribute("unreadMessageCount", 0);
                        model.addAttribute("totalUnreadAdmin", 0);
                        model.addAttribute("totalUnreadStudent", 0);
                        model.addAttribute("latestMessages", java.util.Collections.emptyList());
                    }
                }
            } catch (Exception e) {
                // Ignore database connection error to allow pages to load for authenticated users
                log.warn("Failed to add global attributes: {}", e.getMessage());
            }
        }
    }

    public static class MessagePreview {
        private String senderName;
        private String text;
        private java.time.LocalDateTime time;
        private String link;
        private String avatar;
        private boolean unread;

        public MessagePreview(String senderName, String text, java.time.LocalDateTime time, String link, String avatar, boolean unread) {
            this.senderName = senderName;
            this.text = text;
            this.time = time;
            this.link = link;
            this.avatar = avatar;
            this.unread = unread;
        }

        public String getSenderName() { return senderName; }
        public String getText() { return text; }
        public java.time.LocalDateTime getTime() { return time; }
        public String getLink() { return link; }
        public String getAvatar() { return avatar; }
        public boolean isUnread() { return unread; }
    }
}

