package com.school.controller;

import com.school.model.PushSubscription;
import com.school.model.User;
import com.school.repository.PushSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class PushNotificationController {

    private static final Logger log = LoggerFactory.getLogger(PushNotificationController.class);

        private PushSubscriptionRepository subscriptionRepository;

    @org.springframework.beans.factory.annotation.Value("${vapid.public.key}")
    private String publicKey;

    @GetMapping("/public-key")
    public ResponseEntity<?> getPublicKey() {
        return ResponseEntity.ok(Map.of("publicKey", publicKey));
    }

        private com.school.util.AuthUtil authUtil;

    public PushNotificationController(PushSubscriptionRepository subscriptionRepository, com.school.util.AuthUtil authUtil) {
        this.subscriptionRepository = subscriptionRepository;
        this.authUtil = authUtil;
    }


    @PostMapping("/subscribe")
    public ResponseEntity<?> subscribe(@RequestBody Map<String, Object> payload) {
        try {
            String endpoint = (String) payload.get("endpoint");
            Map<String, String> keys = (Map<String, String>) payload.get("keys");
            String p256dh = keys.get("p256dh");
            String auth = keys.get("auth");

            User user = authUtil.getLoggedInUser();
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
            log.error("Failed to process push subscription", e);
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }
}
