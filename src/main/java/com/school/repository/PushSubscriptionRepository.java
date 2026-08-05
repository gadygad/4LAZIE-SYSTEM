package com.school.repository;

import com.school.model.PushSubscription;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PushSubscriptionRepository extends MongoRepository<PushSubscription, String> {
    PushSubscription findByEndpoint(String endpoint);
    List<PushSubscription> findByUserId(String userId);
}
