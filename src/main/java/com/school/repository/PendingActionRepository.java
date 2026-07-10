package com.school.repository;

import com.school.model.PendingAction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PendingActionRepository extends MongoRepository<PendingAction, String> {
    List<PendingAction> findByStatusOrderByRequestDateDesc(String status);
}
