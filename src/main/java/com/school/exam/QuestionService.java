package com.school.exam;

import com.school.exam.Question;
import com.school.exam.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

        private QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
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
}
