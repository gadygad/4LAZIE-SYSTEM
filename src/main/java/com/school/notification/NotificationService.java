package com.school.notification;

import com.school.notification.Notification;
import com.school.notification.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

        private NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
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
}
