package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "academic_calendars")
public class AcademicCalendar {

    @Id
    private String id;
    private String academicYear;
    private String fileUrl;
    
    // Timetable URLs (Degree & Diploma)
    private String sem1Cat1DegreeUrl;
    private String sem1Cat1DiplomaUrl;
    private String sem1Cat2DegreeUrl;
    private String sem1Cat2DiplomaUrl;
    private String sem1UeDegreeUrl;
    private String sem1UeDiplomaUrl;
    private String sem2Cat1DegreeUrl;
    private String sem2Cat1DiplomaUrl;
    private String sem2Cat2DegreeUrl;
    private String sem2Cat2DiplomaUrl;
    private String sem2UeDegreeUrl;
    private String sem2UeDiplomaUrl;
    
    private String sem1Cat1DegreeDate;
    private String sem1Cat1DegreeEndDate;
    private String sem1Cat1DiplomaDate;
    private String sem1Cat1DiplomaEndDate;
    private String sem1Cat2DegreeDate;
    private String sem1Cat2DegreeEndDate;
    private String sem1Cat2DiplomaDate;
    private String sem1Cat2DiplomaEndDate;
    private String sem1UeDegreeDate;
    private String sem1UeDegreeEndDate;
    private String sem1UeDiplomaDate;
    private String sem1UeDiplomaEndDate;
    
    private String sem2Cat1DegreeDate;
    private String sem2Cat1DegreeEndDate;
    private String sem2Cat1DiplomaDate;
    private String sem2Cat1DiplomaEndDate;
    private String sem2Cat2DegreeDate;
    private String sem2Cat2DegreeEndDate;
    private String sem2Cat2DiplomaDate;
    private String sem2Cat2DiplomaEndDate;
    private String sem2UeDegreeDate;
    private String sem2UeDegreeEndDate;
    private String sem2UeDiplomaDate;
    private String sem2UeDiplomaEndDate;
    
    private boolean isCurrent;
    private LocalDateTime uploadedAt;

    public AcademicCalendar() {
        this.uploadedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }

    public String getSem1Cat1DegreeUrl() { return sem1Cat1DegreeUrl; }
    public void setSem1Cat1DegreeUrl(String sem1Cat1DegreeUrl) { this.sem1Cat1DegreeUrl = sem1Cat1DegreeUrl; }

    public String getSem1Cat1DiplomaUrl() { return sem1Cat1DiplomaUrl; }
    public void setSem1Cat1DiplomaUrl(String sem1Cat1DiplomaUrl) { this.sem1Cat1DiplomaUrl = sem1Cat1DiplomaUrl; }

    public String getSem1Cat2DegreeUrl() { return sem1Cat2DegreeUrl; }
    public void setSem1Cat2DegreeUrl(String sem1Cat2DegreeUrl) { this.sem1Cat2DegreeUrl = sem1Cat2DegreeUrl; }

    public String getSem1Cat2DiplomaUrl() { return sem1Cat2DiplomaUrl; }
    public void setSem1Cat2DiplomaUrl(String sem1Cat2DiplomaUrl) { this.sem1Cat2DiplomaUrl = sem1Cat2DiplomaUrl; }

    public String getSem1UeDegreeUrl() { return sem1UeDegreeUrl; }
    public void setSem1UeDegreeUrl(String sem1UeDegreeUrl) { this.sem1UeDegreeUrl = sem1UeDegreeUrl; }

    public String getSem1UeDiplomaUrl() { return sem1UeDiplomaUrl; }
    public void setSem1UeDiplomaUrl(String sem1UeDiplomaUrl) { this.sem1UeDiplomaUrl = sem1UeDiplomaUrl; }

    public String getSem2Cat1DegreeUrl() { return sem2Cat1DegreeUrl; }
    public void setSem2Cat1DegreeUrl(String sem2Cat1DegreeUrl) { this.sem2Cat1DegreeUrl = sem2Cat1DegreeUrl; }

    public String getSem2Cat1DiplomaUrl() { return sem2Cat1DiplomaUrl; }
    public void setSem2Cat1DiplomaUrl(String sem2Cat1DiplomaUrl) { this.sem2Cat1DiplomaUrl = sem2Cat1DiplomaUrl; }

    public String getSem2Cat2DegreeUrl() { return sem2Cat2DegreeUrl; }
    public void setSem2Cat2DegreeUrl(String sem2Cat2DegreeUrl) { this.sem2Cat2DegreeUrl = sem2Cat2DegreeUrl; }

    public String getSem2Cat2DiplomaUrl() { return sem2Cat2DiplomaUrl; }
    public void setSem2Cat2DiplomaUrl(String sem2Cat2DiplomaUrl) { this.sem2Cat2DiplomaUrl = sem2Cat2DiplomaUrl; }

    public String getSem2UeDegreeUrl() { return sem2UeDegreeUrl; }
    public void setSem2UeDegreeUrl(String sem2UeDegreeUrl) { this.sem2UeDegreeUrl = sem2UeDegreeUrl; }

    public String getSem2UeDiplomaUrl() { return sem2UeDiplomaUrl; }
    public void setSem2UeDiplomaUrl(String sem2UeDiplomaUrl) { this.sem2UeDiplomaUrl = sem2UeDiplomaUrl; }

    public String getSem1Cat1DegreeDate() { return sem1Cat1DegreeDate; }
    public void setSem1Cat1DegreeDate(String sem1Cat1DegreeDate) { this.sem1Cat1DegreeDate = sem1Cat1DegreeDate; }
    public String getSem1Cat1DegreeEndDate() { return sem1Cat1DegreeEndDate; }
    public void setSem1Cat1DegreeEndDate(String sem1Cat1DegreeEndDate) { this.sem1Cat1DegreeEndDate = sem1Cat1DegreeEndDate; }

    public String getSem1Cat1DiplomaDate() { return sem1Cat1DiplomaDate; }
    public void setSem1Cat1DiplomaDate(String sem1Cat1DiplomaDate) { this.sem1Cat1DiplomaDate = sem1Cat1DiplomaDate; }
    public String getSem1Cat1DiplomaEndDate() { return sem1Cat1DiplomaEndDate; }
    public void setSem1Cat1DiplomaEndDate(String sem1Cat1DiplomaEndDate) { this.sem1Cat1DiplomaEndDate = sem1Cat1DiplomaEndDate; }

    public String getSem1Cat2DegreeDate() { return sem1Cat2DegreeDate; }
    public void setSem1Cat2DegreeDate(String sem1Cat2DegreeDate) { this.sem1Cat2DegreeDate = sem1Cat2DegreeDate; }
    public String getSem1Cat2DegreeEndDate() { return sem1Cat2DegreeEndDate; }
    public void setSem1Cat2DegreeEndDate(String sem1Cat2DegreeEndDate) { this.sem1Cat2DegreeEndDate = sem1Cat2DegreeEndDate; }

    public String getSem1Cat2DiplomaDate() { return sem1Cat2DiplomaDate; }
    public void setSem1Cat2DiplomaDate(String sem1Cat2DiplomaDate) { this.sem1Cat2DiplomaDate = sem1Cat2DiplomaDate; }
    public String getSem1Cat2DiplomaEndDate() { return sem1Cat2DiplomaEndDate; }
    public void setSem1Cat2DiplomaEndDate(String sem1Cat2DiplomaEndDate) { this.sem1Cat2DiplomaEndDate = sem1Cat2DiplomaEndDate; }

    public String getSem1UeDegreeDate() { return sem1UeDegreeDate; }
    public void setSem1UeDegreeDate(String sem1UeDegreeDate) { this.sem1UeDegreeDate = sem1UeDegreeDate; }
    public String getSem1UeDegreeEndDate() { return sem1UeDegreeEndDate; }
    public void setSem1UeDegreeEndDate(String sem1UeDegreeEndDate) { this.sem1UeDegreeEndDate = sem1UeDegreeEndDate; }

    public String getSem1UeDiplomaDate() { return sem1UeDiplomaDate; }
    public void setSem1UeDiplomaDate(String sem1UeDiplomaDate) { this.sem1UeDiplomaDate = sem1UeDiplomaDate; }
    public String getSem1UeDiplomaEndDate() { return sem1UeDiplomaEndDate; }
    public void setSem1UeDiplomaEndDate(String sem1UeDiplomaEndDate) { this.sem1UeDiplomaEndDate = sem1UeDiplomaEndDate; }

    public String getSem2Cat1DegreeDate() { return sem2Cat1DegreeDate; }
    public void setSem2Cat1DegreeDate(String sem2Cat1DegreeDate) { this.sem2Cat1DegreeDate = sem2Cat1DegreeDate; }
    public String getSem2Cat1DegreeEndDate() { return sem2Cat1DegreeEndDate; }
    public void setSem2Cat1DegreeEndDate(String sem2Cat1DegreeEndDate) { this.sem2Cat1DegreeEndDate = sem2Cat1DegreeEndDate; }

    public String getSem2Cat1DiplomaDate() { return sem2Cat1DiplomaDate; }
    public void setSem2Cat1DiplomaDate(String sem2Cat1DiplomaDate) { this.sem2Cat1DiplomaDate = sem2Cat1DiplomaDate; }
    public String getSem2Cat1DiplomaEndDate() { return sem2Cat1DiplomaEndDate; }
    public void setSem2Cat1DiplomaEndDate(String sem2Cat1DiplomaEndDate) { this.sem2Cat1DiplomaEndDate = sem2Cat1DiplomaEndDate; }

    public String getSem2Cat2DegreeDate() { return sem2Cat2DegreeDate; }
    public void setSem2Cat2DegreeDate(String sem2Cat2DegreeDate) { this.sem2Cat2DegreeDate = sem2Cat2DegreeDate; }
    public String getSem2Cat2DegreeEndDate() { return sem2Cat2DegreeEndDate; }
    public void setSem2Cat2DegreeEndDate(String sem2Cat2DegreeEndDate) { this.sem2Cat2DegreeEndDate = sem2Cat2DegreeEndDate; }

    public String getSem2Cat2DiplomaDate() { return sem2Cat2DiplomaDate; }
    public void setSem2Cat2DiplomaDate(String sem2Cat2DiplomaDate) { this.sem2Cat2DiplomaDate = sem2Cat2DiplomaDate; }
    public String getSem2Cat2DiplomaEndDate() { return sem2Cat2DiplomaEndDate; }
    public void setSem2Cat2DiplomaEndDate(String sem2Cat2DiplomaEndDate) { this.sem2Cat2DiplomaEndDate = sem2Cat2DiplomaEndDate; }

    public String getSem2UeDegreeDate() { return sem2UeDegreeDate; }
    public void setSem2UeDegreeDate(String sem2UeDegreeDate) { this.sem2UeDegreeDate = sem2UeDegreeDate; }
    public String getSem2UeDegreeEndDate() { return sem2UeDegreeEndDate; }
    public void setSem2UeDegreeEndDate(String sem2UeDegreeEndDate) { this.sem2UeDegreeEndDate = sem2UeDegreeEndDate; }

    public String getSem2UeDiplomaDate() { return sem2UeDiplomaDate; }
    public void setSem2UeDiplomaDate(String sem2UeDiplomaDate) { this.sem2UeDiplomaDate = sem2UeDiplomaDate; }
    public String getSem2UeDiplomaEndDate() { return sem2UeDiplomaEndDate; }
    public void setSem2UeDiplomaEndDate(String sem2UeDiplomaEndDate) { this.sem2UeDiplomaEndDate = sem2UeDiplomaEndDate; }

    public boolean getIsCurrent() { return isCurrent; }
    public void setIsCurrent(boolean isCurrent) { this.isCurrent = isCurrent; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
