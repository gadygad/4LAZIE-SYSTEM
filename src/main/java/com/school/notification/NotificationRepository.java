package com.school.notification;

import com.school.notification.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    List<Notification> findByUserIdOrderByCreatedAtDesc(String userId);
    // Limited at the query level (not fetch-everything-then-truncate) — used
    // by the navbar preview, which only ever shows the 10 most recent.
    List<Notification> findTop10ByUserIdOrderByCreatedAtDesc(String userId);
    int countByUserIdAndIsReadFalse(String userId);
}
