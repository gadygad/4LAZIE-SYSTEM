package com.school.auth;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VerificationRequestRepository extends MongoRepository<VerificationRequest, String> {
    List<VerificationRequest> findByStatusOrderByRequestDateDesc(String status);
    Optional<VerificationRequest> findByUserIdAndStatus(String userId, String status);
    long countByStatus(String status);
}
