package com.school.core;

import com.school.core.PendingAction;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PendingActionRepository extends MongoRepository<PendingAction, String> {
    List<PendingAction> findByStatusOrderByRequestDateDesc(String status);
}
