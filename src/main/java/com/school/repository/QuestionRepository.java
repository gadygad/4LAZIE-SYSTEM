package com.school.repository;

import com.school.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findBySubjectId(String subjectId);
    List<Question> findBySubjectIdAndCategory(String subjectId, String category);
    List<Question> findBySubjectIdAndCategoryAndModuleName(String subjectId, String category, String moduleName);
    long countBySubjectId(String subjectId);
    long countBySubjectIdAndCategory(String subjectId, String category);
}
