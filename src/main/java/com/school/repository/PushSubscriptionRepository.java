package com.school.repository;

import com.school.model.PushSubscription;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PushSubscriptionRepository extends MongoRepository<PushSubscription, String> {
    PushSubscription findByEndpoint(String endpoint);
}
