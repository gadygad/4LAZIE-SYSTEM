package com.school.repository;

import com.school.model.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {
    List<ActivityLog> findTop50ByOrderByTimestampDesc();
    org.springframework.data.domain.Page<ActivityLog> findAllByOrderByTimestampDesc(org.springframework.data.domain.Pageable pageable);
    List<ActivityLog> findByUserIdOrderByTimestampDesc(String userId);
}
