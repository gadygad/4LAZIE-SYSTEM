package com.school.user;

import com.school.user.AssignmentRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRequestRepository extends MongoRepository<AssignmentRequest, String> {
    List<AssignmentRequest> findByUserIdOrderByCreatedAtDesc(String userId);
    List<AssignmentRequest> findAllByOrderByCreatedAtDesc();
    
    // Pagination & Filtering
    org.springframework.data.domain.Page<AssignmentRequest> findAllByOrderByCreatedAtDesc(org.springframework.data.domain.Pageable pageable);
    org.springframework.data.domain.Page<AssignmentRequest> findByStatusOrderByCreatedAtDesc(String status, org.springframework.data.domain.Pageable pageable);
    long countByStatus(String status);
}
