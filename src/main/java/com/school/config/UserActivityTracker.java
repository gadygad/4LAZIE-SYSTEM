package com.school.config;

import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.core.ActivityLog;
import com.school.core.ActivityLogRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

// A separate bean (not a method on ActiveUserInterceptor itself) is required
// for @Async to actually take effect here: Spring's method-level annotations
// only apply through the proxy, and a class calling its own method directly
// (self-invocation) bypasses that proxy entirely, running "synchronously"
// no matter what the annotation says.
@Service
public class UserActivityTracker {

    private final UserRepository userRepository;
    private final ActivityLogRepository activityLogRepository;

    public UserActivityTracker(UserRepository userRepository, ActivityLogRepository activityLogRepository) {
        this.userRepository = userRepository;
        this.activityLogRepository = activityLogRepository;
    }

    @Async
    public void recordActivity(User user, String action, String uri, String ipAddress, String deviceInfo) {
        try {
            user.setLastActiveTime(LocalDateTime.now());
            user.setLastAction(action);
            userRepository.save(user);
        } catch (Exception e) {
            // Don't let user tracking failures break page loading
        }

        try {
            ActivityLog log = new ActivityLog(
                user.getId(),
                user.getName(),
                user.getRole() != null ? user.getRole().name() : "STUDENT",
                action,
                uri,
                ipAddress,
                deviceInfo
            );
            activityLogRepository.save(log);
        } catch (Exception e) {
            // Don't let activity logging failures break page loading
        }
    }
}
