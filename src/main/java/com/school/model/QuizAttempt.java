package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.util.Map;
import java.time.LocalDateTime;

@Document(collection = "quiz_attempts")
public class QuizAttempt {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String subjectId;
    
    private String category; // QUIZ, EXERCISE, CAT, UE, ASSIGNMENT

    private int score;
    private int totalQuestions;
    
    // Key: Question ID, Value: User's provided answer
    private Map<String, String> userAnswers;

    private LocalDateTime attemptDate = LocalDateTime.now();
    
    private long timeTakenSeconds;

    public QuizAttempt() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }
    public Map<String, String> getUserAnswers() { return userAnswers; }
    public void setUserAnswers(Map<String, String> userAnswers) { this.userAnswers = userAnswers; }
    public LocalDateTime getAttemptDate() { return attemptDate; }
    public void setAttemptDate(LocalDateTime attemptDate) { this.attemptDate = attemptDate; }
    public long getTimeTakenSeconds() { return timeTakenSeconds; }
    public void setTimeTakenSeconds(long timeTakenSeconds) { this.timeTakenSeconds = timeTakenSeconds; }
}
