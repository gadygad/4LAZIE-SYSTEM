package com.school.exam;

import com.school.exam.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    List<QuizAttempt> findByUserIdOrderByAttemptDateDesc(String userId);
    // Capped at the query level for the My Progress page — an active
    // student's full attempt history has no natural upper bound, and the
    // last 200 is already far more than enough to compute streak/accuracy
    // stats and a recent-activity list.
    List<QuizAttempt> findTop200ByUserIdOrderByAttemptDateDesc(String userId);
    List<QuizAttempt> findByUserIdAndSubjectIdOrderByAttemptDateDesc(String userId, String subjectId);
    List<QuizAttempt> findBySubjectIdOrderByScoreDesc(String subjectId);
}
