package com.school.repository;

import com.school.model.PendingAction;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PendingActionRepository extends MongoRepository<PendingAction, String> {
    List<PendingAction> findByStatusOrderByRequestDateDesc(String status);
}
