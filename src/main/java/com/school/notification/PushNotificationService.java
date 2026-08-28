package com.school.notification;

import com.school.notification.PushSubscription;
import com.school.notification.PushSubscriptionRepository;
import nl.martijndwars.webpush.Encoding;
import nl.martijndwars.webpush.Notification;
import nl.martijndwars.webpush.PushService;
import nl.martijndwars.webpush.Subscription;
import org.apache.http.HttpResponse;
import org.apache.http.util.EntityUtils;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private PushSubscriptionRepository subscriptionRepository;

    public PushNotificationService(PushSubscriptionRepository subscriptionRepository) {
        this.subscriptionRepository = subscriptionRepository;
    }

    private PushService pushService;

    @PostConstruct
    private void init() {
        // Skip gracefully if VAPID keys are not configured (e.g. dev/staging environment)
        if (publicKey == null || publicKey.isBlank() ||
            privateKey == null || privateKey.isBlank()) {
            logger.warn("VAPID keys not configured — Web Push notifications are DISABLED. " +
                        "Set VAPID_PUBLIC_KEY and VAPID_PRIVATE_KEY environment variables to enable.");
            return;
        }
        try {
            if (Security.getProvider(BouncyCastleProvider.PROVIDER_NAME) == null) {
                Security.addProvider(new BouncyCastleProvider());
            }
            pushService = new PushService(publicKey, privateKey, subject);
            logger.info("PushService initialized successfully.");
        } catch (Exception e) {
            logger.error("Failed to initialize PushService — Push notifications disabled.", e);
        }
    }

    @Async
    public void sendToAllSubscribers(String title, String body, String url) {
        if (pushService == null) return;
        String payload = buildPayload(title, body, url);
        for (PushSubscription sub : subscriptionRepository.findAll()) {
            sendToSubscription(sub, payload);
        }
    }

    @Async
    public void sendToUser(String userId, String title, String body, String url) {
        sendToUser(userId, title, body, url, null);
    }

    /**
     * Same as sendToUser(), but with a "connectUserId" data field the
     * service worker can act on directly — e.g. a "Connect Back" action
     * button on a new-connection notification that fires the connect API
     * without the user having to open the app first.
     */
    @Async
    public void sendToUser(String userId, String title, String body, String url, String connectUserId) {
        if (pushService == null) return;
        List<PushSubscription> subs = subscriptionRepository.findByUserId(userId);
        if (subs == null || subs.isEmpty()) return;
        String payload = buildPayload(title, body, url, connectUserId);
        for (PushSubscription sub : subs) {
            sendToSubscription(sub, payload);
        }
    }

    /**
     * PushService.send() does NOT throw on a non-2xx response — it returns an
     * HttpResponse the caller is responsible for inspecting. The previous code
     * never read that response at all, so a bad VAPID key, an expired
     * subscription (410), an unknown endpoint (404), or an oversized payload
     * (413) all looked exactly like success: no exception, nothing logged,
     * dead subscriptions never cleaned up. That silent-failure gap is why
     * push could appear to "send" from the server's point of view while
     * nothing ever reached a device.
     */
    private void sendToSubscription(PushSubscription sub, String payload) {
        try {
            Subscription.Keys keys = new Subscription.Keys(sub.getP256dh(), sub.getAuth());
            Subscription subscription = new Subscription(sub.getEndpoint(), keys);
            Notification notification = new Notification(subscription, payload);
            HttpResponse response = pushService.send(notification, Encoding.AES128GCM);

            int status = response.getStatusLine().getStatusCode();
            if (status >= 200 && status < 300) {
                logger.debug("Push delivered to {}", sub.getEndpoint());
                return;
            }

            String responseBody = "";
            try {
                if (response.getEntity() != null) {
                    responseBody = EntityUtils.toString(response.getEntity());
                }
            } catch (Exception ignored) { /* best-effort diagnostics only */ }

            if (status == 404 || status == 410) {
                logger.warn("Push subscription gone (HTTP {}) for endpoint {} — removing it.", status, sub.getEndpoint());
                subscriptionRepository.delete(sub);
            } else if (status == 401 || status == 403) {
                // A VAPID-mismatch rejection is permanent for THIS subscription —
                // the browser already self-heals by unsubscribing and creating a
                // fresh subscription (new endpoint) the next time it loads the
                // app with mismatched keys (see push-subscription.js), but that
                // leaves this orphaned old-endpoint row behind forever, failing
                // — and logging an error — on every single send. Delete it so
                // the noise doesn't repeat indefinitely; the client's own
                // resubscribe already restored real push delivery for this user.
                logger.warn("Push subscription permanently rejected (HTTP {}) for endpoint {} — VAPID key " +
                        "mismatch, removing this orphaned subscription. The client resubscribes with a new " +
                        "endpoint automatically on its next page load. Response: {}", status, sub.getEndpoint(), responseBody);
                subscriptionRepository.delete(sub);
            } else {
                logger.error("Push failed (HTTP {}) for endpoint {}. Response: {}", status, sub.getEndpoint(), responseBody);
            }
        } catch (Exception e) {
            logger.error("Failed to send push to endpoint: " + sub.getEndpoint(), e);
        }
    }

    private String buildPayload(String title, String body, String url) {
        return buildPayload(title, body, url, null);
    }

    private String buildPayload(String title, String body, String url, String connectUserId) {
        String base = String.format("{\"title\": \"%s\", \"body\": \"%s\", \"url\": \"%s\"",
                escapeJson(title), escapeJson(body), escapeJson(url));
        if (connectUserId != null && !connectUserId.isBlank()) {
            base += String.format(", \"connectUserId\": \"%s\"", escapeJson(connectUserId));
        }
        return base + "}";
    }

    private String escapeJson(String input) {
        if (input == null) return "";
        return input.replace("\\", "\\\\").replace("\"", "\\\"")
                .replace("\n", "\\n").replace("\r", "\\r").replace("\t", "\\t");
    }
}
