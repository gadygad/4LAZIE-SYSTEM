package com.school.controller;

import com.school.model.PushSubscription;
import com.school.model.User;
import com.school.repository.PushSubscriptionRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class PushNotificationController {

    @Autowired
    private PushSubscriptionRepository subscriptionRepository;

    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, Object> payload, HttpSession session) {
        try {
            String endpoint = (String) payload.get("endpoint");
            Map<String, String> keys = (Map<String, String>) payload.get("keys");
            String p256dh = keys.get("p256dh");
            String auth = keys.get("auth");

            User user = (User) session.getAttribute("user");
            String userId = user != null ? user.getId() : null;

            PushSubscription existing = subscriptionRepository.findByEndpoint(endpoint);
            if (existing != null) {
                // Update if exists
                existing.setP256dh(p256dh);
                existing.setAuth(auth);
                existing.setUserId(userId);
                subscriptionRepository.save(existing);
            } else {
                PushSubscription sub = new PushSubscription(endpoint, p256dh, auth, userId);
                subscriptionRepository.save(sub);
            }

            return ResponseEntity.ok(Map.of("success", true, "message", "Subscribed successfully"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
