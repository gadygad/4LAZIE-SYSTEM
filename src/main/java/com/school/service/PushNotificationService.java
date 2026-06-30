package com.school.service;

import com.school.model.PushSubscription;
import com.school.repository.PushSubscriptionRepository;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

import jakarta.annotation.PostConstruct;
import java.security.Security;
import java.util.List;

@Service
public class PushNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(PushNotificationService.class);

    @Value("${vapid.public.key}")
    private String publicKey;

    @Value("${vapid.private.key}")
    private String privateKey;

    @Value("${vapid.subject}")
    private String subject;

    @Autowired
    private PushSubscriptionRepository subscriptionRepository;

    private PushService pushService;

    @PostConstruct
    private void init() {
        try {
            if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
                Security.addProvider(new BouncyCastleProvider());
            }
            pushService = new PushService(publicKey, privateKey, subject);
        } catch (Exception e) {
            logger.error("Failed to initialize PushService", e);
        }
    }

    @Async
    public void sendToAllSubscribers(String title, String body, String url) {
        if (pushService == null) return;

        List<PushSubscription> subs = subscriptionRepository.findAll();
        
        // Build JSON payload
        String payload = String.format("{\"title\": \"%s\", \"body\": \"%s\", \"url\": \"%s\"}", 
            escapeJson(title), escapeJson(body), escapeJson(url));

        for (PushSubscription sub : subs) {
            try {
                Subscription.Keys keys = new Subscription.Keys(sub.getP256dh(), sub.getAuth());
                Subscription subscription = new Subscription(sub.getEndpoint(), keys);
                Notification notification = new Notification(subscription, payload);
                pushService.send(notification);
            } catch (Exception e) {
                logger.error("Failed to send push to endpoint: " + sub.getEndpoint(), e);
                // If endpoint is invalid or expired, we might want to delete it from DB
                if (e.getMessage() != null && (e.getMessage().contains("404") || e.getMessage().contains("410"))) {
                    subscriptionRepository.delete(sub);
                }
            }
        }
    }

    private String escapeJson(String input) {
        if (input == null) return "";
        return input.replace("\"", "\\\"").replace("\n", "\\n");
    }
}
