package com.school.exam;

import com.school.exam.Question;
import com.school.exam.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;
import org.bson.Document;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    // The 5 practice types shown to students on the "Practice & Test
    // Yourself" pills — CATs Qns is really two separately-selectable
    // categories (CAT 1 / CAT 2), so a subject needs both to count as
    // fully stocked.
    public static final List<String> QUESTION_CATEGORIES =
            List.of("QUIZ", "EXERCISE", "POSSIBLE", "UE", "CAT 1", "CAT 2");

        private QuestionRepository questionRepository;
        private MongoTemplate mongoTemplate;

    public QuestionService(QuestionRepository questionRepository, MongoTemplate mongoTemplate) {
        this.questionRepository = questionRepository;
        this.mongoTemplate = mongoTemplate;
    }


    public List<Question> getQuestionsBySubjectAndCategory(String subjectId, String category) {
        return questionRepository.findBySubjectIdAndCategoryStartingWithIgnoreCase(subjectId, category);
    }
    
    public List<Question> getQuestionsBySubjectCategoryAndModule(String subjectId, String category, String moduleName) {
        return questionRepository.findBySubjectIdAndCategoryAndModuleName(subjectId, category, moduleName);
    }
    
    public List<Question> getQuestionsBySubjectCategoryAndDifficulty(String subjectId, String category, String difficulty) {
        if (difficulty == null || difficulty.trim().isEmpty() || difficulty.equalsIgnoreCase("ALL")) {
            return questionRepository.findBySubjectIdAndCategoryStartingWithIgnoreCase(subjectId, category);
        }
        return questionRepository.findBySubjectIdAndCategoryStartingWithIgnoreCaseAndDifficultyIgnoreCase(subjectId, category, difficulty);
    }

    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    public Optional<Question> getQuestionById(String id) {
        return questionRepository.findById(id);
    }

    public void deleteQuestion(String id) {
        questionRepository.deleteById(id);
    }
    
    public long getCountBySubjectAndCategory(String subjectId, String category) {
        return questionRepository.countBySubjectIdAndCategory(subjectId, category);
    }

    // Which categories each subject already has at least one question in —
    // one aggregation instead of (subjects x categories) count queries, so
    // the admin dashboard can cheaply flag under-stocked subjects.
    public Map<String, Set<String>> getCategoriesPresentBySubjectId() {
        Aggregation agg = Aggregation.newAggregation(Aggregation.group("subjectId", "category"));
        AggregationResults<Document> results = mongoTemplate.aggregate(agg, "questions", Document.class);
        Map<String, Set<String>> bySubject = new HashMap<>();
        for (Document doc : results.getMappedResults()) {
            Document id = (Document) doc.get("_id");
            if (id == null) continue;
            String subjectId = id.getString("subjectId");
            String category = id.getString("category");
            if (subjectId == null || category == null) continue;
            bySubject.computeIfAbsent(subjectId, k -> new HashSet<>()).add(category);
        }
        return bySubject;
    }

    public List<String> getMissingCategories(String subjectId, Map<String, Set<String>> presentBySubject) {
        Set<String> have = presentBySubject.getOrDefault(subjectId, Collections.emptySet());
        return QUESTION_CATEGORIES.stream().filter(c -> !have.contains(c)).collect(Collectors.toList());
    }

    public long countSubjectsWithGaps(List<com.school.academic.Subject> subjects) {
        Map<String, Set<String>> present = getCategoriesPresentBySubjectId();
        return subjects.stream().filter(s -> !getMissingCategories(s.getId(), present).isEmpty()).count();
    }
}
