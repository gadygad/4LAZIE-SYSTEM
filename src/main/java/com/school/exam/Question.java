package com.school.exam;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.index.Indexed;
import java.util.List;
import java.time.LocalDateTime;

@Document(collection = "questions")
public class Question {

    @Id
    private String id;

    @DBRef(lazy = true)
    private com.school.academic.Subject subject;
    
    @Indexed
    private String subjectId; // To allow easy querying without dereferencing

    private String moduleName;

    @Indexed
    private String category; // QUIZ, EXERCISE, CAT, UE, ASSIGNMENT

    private String type; // MULTIPLE_CHOICE, TRUE_FALSE, SHORT_ANSWER

    private String questionText;
    
    // For MULTIPLE_CHOICE or TRUE_FALSE
    private List<String> options; 
    
    // Index of the correct option (0-based) for MCQ, or exact text for SHORT_ANSWER
    private String correctAnswer; 
    
    private String explanation; // Shown after answering (Solution)
    
    @org.springframework.data.mongodb.core.mapping.Field("difficultyLevel")
    private String difficulty; // EASY, MEDIUM, HARD
    
    private String imageUrl; // Optional image for the question

    private LocalDateTime createdAt = LocalDateTime.now();

    public Question() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public com.school.academic.Subject getSubject() { return subject; }
    public void setSubject(com.school.academic.Subject subject) { 
        this.subject = subject; 
        if (subject != null) this.subjectId = subject.getId();
    }
    public String getSubjectId() { return subjectId; }
    public void setSubjectId(String subjectId) { this.subjectId = subjectId; }
    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }
    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }
    public String getCorrectAnswer() { return correctAnswer; }
    public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
