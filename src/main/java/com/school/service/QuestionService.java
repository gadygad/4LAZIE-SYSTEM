package com.school.service;

import com.school.model.Question;
import com.school.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public List<Question> getQuestionsBySubjectAndCategory(String subjectId, String category) {
        return questionRepository.findBySubjectIdAndCategory(subjectId, category);
    }
    
    public List<Question> getQuestionsBySubjectCategoryAndModule(String subjectId, String category, String moduleName) {
        return questionRepository.findBySubjectIdAndCategoryAndModuleName(subjectId, category, moduleName);
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
