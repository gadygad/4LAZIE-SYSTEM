package com.school.exam;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import java.util.Map;
import java.time.LocalDateTime;

// The My Progress page filters by userId and sorts by attemptDate on every
// load — a compound index lets Mongo satisfy both together instead of an
// in-memory sort of everything that matched the single-field userId index.
@CompoundIndexes({
    @CompoundIndex(name = "user_recent_attempts_idx", def = "{'userId': 1, 'attemptDate': -1}")
})
@Document(collection = "quiz_attempts")
public class QuizAttempt {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String subjectId;
    
    private String category; // QUIZ, EXERCISE, CAT, UE, ASSIGNMENT

    private String difficulty; // EASY, MEDIUM, HARD, ALL — null for older attempts recorded before this field existed

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
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
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
