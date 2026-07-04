package com.school.repository;

import com.school.model.ActivityLog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityLogRepository extends MongoRepository<ActivityLog, String> {
    List<ActivityLog> findTop50ByOrderByTimestampDesc();
    org.springframework.data.domain.Page<ActivityLog> findAllByOrderByTimestampDesc(org.springframework.data.domain.Pageable pageable);
    List<ActivityLog> findByUserIdOrderByTimestampDesc(String userId);
}
