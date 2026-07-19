package com.school.repository;

import com.school.model.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    List<QuizAttempt> findByUserIdOrderByAttemptDateDesc(String userId);
    List<QuizAttempt> findByUserIdAndSubjectIdOrderByAttemptDateDesc(String userId, String subjectId);
    List<QuizAttempt> findBySubjectIdOrderByScoreDesc(String subjectId);
}
