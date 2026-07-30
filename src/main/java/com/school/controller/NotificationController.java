package com.school.controller;

import com.school.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.school.repository.UserRepository;
import com.school.model.Notification;
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
    public ResponseEntity<?> clickNotification(@PathVariable String id) {
        Notification n = notificationService.findById(id);
        if (n != null) {
            notificationService.markAsRead(id);
            String target = n.getLink() != null ? n.getLink() : "/dashboard";
            return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(target)).build();
        }
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create("/dashboard")).build();
    }
}
