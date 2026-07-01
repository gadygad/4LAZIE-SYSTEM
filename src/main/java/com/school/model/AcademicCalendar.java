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
    
    private String sem1Cat1Date;
    private String sem1Cat2Date;
    private String sem1UeDate;
    
    private String sem2Cat1Date;
    private String sem2Cat2Date;
    private String sem2UeDate;
    
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

    public String getSem1Cat1Date() { return sem1Cat1Date; }
    public void setSem1Cat1Date(String sem1Cat1Date) { this.sem1Cat1Date = sem1Cat1Date; }

    public String getSem1Cat2Date() { return sem1Cat2Date; }
    public void setSem1Cat2Date(String sem1Cat2Date) { this.sem1Cat2Date = sem1Cat2Date; }

    public String getSem1UeDate() { return sem1UeDate; }
    public void setSem1UeDate(String sem1UeDate) { this.sem1UeDate = sem1UeDate; }

    public String getSem2Cat1Date() { return sem2Cat1Date; }
    public void setSem2Cat1Date(String sem2Cat1Date) { this.sem2Cat1Date = sem2Cat1Date; }

    public String getSem2Cat2Date() { return sem2Cat2Date; }
    public void setSem2Cat2Date(String sem2Cat2Date) { this.sem2Cat2Date = sem2Cat2Date; }

    public String getSem2UeDate() { return sem2UeDate; }
    public void setSem2UeDate(String sem2UeDate) { this.sem2UeDate = sem2UeDate; }

    public boolean getIsCurrent() { return isCurrent; }
    public void setIsCurrent(boolean isCurrent) { this.isCurrent = isCurrent; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
