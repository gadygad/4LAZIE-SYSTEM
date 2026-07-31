package com.school.repository;

import com.school.model.AssignmentRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRequestRepository extends MongoRepository<AssignmentRequest, String> {
    List<AssignmentRequest> findByUserIdOrderByCreatedAtDesc(String userId);
    List<AssignmentRequest> findAllByOrderByCreatedAtDesc();
}
