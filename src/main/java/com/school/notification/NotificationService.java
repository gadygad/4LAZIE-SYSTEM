package com.school.notification;

import com.school.notification.Notification;
import com.school.notification.NotificationRepository;
import com.school.auth.Role;
import com.school.auth.User;
import com.school.auth.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

        private NotificationRepository notificationRepository;
        private UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }


    public void createNotification(String userId, String title, String message) {
        Notification notification = new Notification(userId, title, message);
        notificationRepository.save(notification);
    }
    
    public void createNotification(String userId, String title, String message, String link) {
        Notification notification = new Notification(userId, title, message, link);
        notificationRepository.save(notification);
    }

    public Notification findById(String id) {
        return notificationRepository.findById(id).orElse(null);
    }

    public List<Notification> getUserNotifications(String userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Notification> getUnreadNotifications(String userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
            .filter(n -> !n.isRead())
            .toList();
    }

    public int getUnreadCount(String userId) {
        return notificationRepository.countByUserIdAndIsReadFalse(userId);
    }

    public void markAsRead(String notificationId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
        });
    }
    
    public void markAllAsRead(String userId) {
        List<Notification> unread = notificationRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
            .filter(n -> !n.isRead())
            .toList();

        unread.forEach(n -> n.setRead(true));
        notificationRepository.saveAll(unread);
    }

    // Pushes an item straight into an admin's existing notification bell the
    // moment it lands in one of their queues, instead of relying on them to
    // remember to open the dashboard and check. Fire-and-forget: a failure
    // here must never break whatever student-facing action triggered it.
    public void notifySuperAdmins(String title, String message, String link) {
        try {
            for (User admin : userRepository.findByRole(Role.SUPER_ADMIN)) {
                createNotification(admin.getId(), title, message, link);
            }
        } catch (Exception ignored) {
        }
    }

    // requiredPermission == null means "any admin" (matches AdminService.hasPermission's
    // own "no specific permission needed" convention) — every SUPER_ADMIN always
    // qualifies, an ADMIN only if they hold that specific permission string.
    public void notifyAdminsWithPermission(String requiredPermission, String title, String message, String link) {
        notifySuperAdmins(title, message, link);
        try {
            for (User admin : userRepository.findByRole(Role.ADMIN)) {
                if (requiredPermission == null || (admin.getPermissions() != null && admin.getPermissions().contains(requiredPermission))) {
                    createNotification(admin.getId(), title, message, link);
                }
            }
        } catch (Exception ignored) {
        }
    }
}
