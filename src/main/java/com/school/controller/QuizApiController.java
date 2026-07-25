package com.school.controller;

import com.school.model.Question;
import com.school.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/public/quizzes")
public class QuizApiController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/practice")
    public List<Question> getPracticeQuestions(
            @RequestParam String subjectId,
            @RequestParam(defaultValue = "QUIZ") String category,
            @RequestParam(required = false) List<String> excludeIds) {
        
        List<Question> questions = questionService.getQuestionsBySubjectAndCategory(subjectId, category);
        
        // Filter out already seen questions
        if (excludeIds != null && !excludeIds.isEmpty()) {
            questions.removeIf(q -> excludeIds.contains(q.getId()));
        }
        
        // Shuffle to randomize questions each time
        Collections.shuffle(questions);
        
        // Determine the limit based on the category


        int limit = 20; // default
        if ("UE".equalsIgnoreCase(category)) {
            limit = 50;
        } else if (category != null && category.toUpperCase().startsWith("CAT")) {
            limit = 17;
        } else if ("POSSIBLE".equalsIgnoreCase(category)) {
            limit = 25;
        } else if ("EXERCISE".equalsIgnoreCase(category)) {
            limit = 30;
        } else if ("QUIZ".equalsIgnoreCase(category)) {
            limit = 15;
        }
        
        // Limit to the specified amount per session
        if (questions.size() > limit) {
            return questions.subList(0, limit);
        }
        
        return questions;
    }
}
