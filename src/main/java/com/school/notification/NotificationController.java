package com.school.notification;

import com.school.notification.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.school.auth.UserRepository;
import com.school.auth.User;
import com.school.notification.Notification;
import java.net.URI;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

        private NotificationService notificationService;
    
        private UserRepository userRepository;

    public NotificationController(NotificationService notificationService, UserRepository userRepository) {
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }


    @PostMapping("/mark-read")
    public ResponseEntity<?> markAllAsRead(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            userRepository.findByEmail(userDetails.getUsername()).ifPresent(user -> {
                notificationService.markAllAsRead(user.getId());
            });
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.status(401).build();
    }
    
    @GetMapping("/click/{id}")
    public ResponseEntity<?> clickNotification(@PathVariable String id, @AuthenticationPrincipal UserDetails userDetails) {
        Notification n = notificationService.findById(id);
        boolean owns = n != null && userDetails != null
                && userRepository.findByEmail(userDetails.getUsername())
                        .map(User::getId)
                        .map(userId -> userId.equals(n.getUserId()))
                        .orElse(false);
        if (owns) {
            notificationService.markAsRead(id);
            // The stored link is always an internal path from our own
            // notification-creation call sites, but redirecting on an
            // unvalidated value is a needless open-redirect risk — enforce
            // that shape rather than trust it.
            String link = n.getLink();
            String target = (link != null && link.startsWith("/")) ? link : "/dashboard";
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(target)).build();
        }
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("/dashboard")).build();
    }
}
