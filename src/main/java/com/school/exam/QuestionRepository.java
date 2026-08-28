package com.school.exam;

import com.school.exam.Question;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findBySubjectId(String subjectId);
    List<Question> findBySubjectIdAndCategoryStartingWithIgnoreCase(String subjectId, String category);
    List<Question> findBySubjectIdAndCategoryAndModuleName(String subjectId, String category, String moduleName);
    List<Question> findBySubjectIdAndCategoryStartingWithIgnoreCaseAndDifficultyIgnoreCase(String subjectId, String category, String difficulty);
    long countBySubjectId(String subjectId);
    long countBySubjectIdAndCategory(String subjectId, String category);
}
