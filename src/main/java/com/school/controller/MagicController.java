package com.school.controller;

import com.school.model.Question;
import com.school.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/magic")
public class MagicController {

    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/assign-difficulty")
    public String assignDifficulty() {
        List<Question> questions = questionRepository.findAll();
        int count = 0;
        int easyCount = 0;
        int mediumCount = 0;
        int hardCount = 0;
        
        for (Question q : questions) {
            if (q.getDifficulty() == null || q.getDifficulty().trim().isEmpty()) {
                if (count % 3 == 0) {
                    q.setDifficulty("EASY");
                    easyCount++;
                } else if (count % 3 == 1) {
                    q.setDifficulty("MEDIUM");
                    mediumCount++;
                } else {
                    q.setDifficulty("HARD");
                    hardCount++;
                }
                questionRepository.save(q);
                count++;
            }
        }
        
        return "✨ UCHAWI UMEKUBALI KWA KIWANGO CHA JUU SANA! Tumefanikiwa kugawanya maswali " + count + 
               " (EASY: " + easyCount + ", MEDIUM: " + mediumCount + ", HARD: " + hardCount + ").";
    }
}
