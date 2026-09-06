package com.school.academic;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;

@Document(collection = "timetables")
public class Timetable {

    @Id
    private String id;

    @Indexed
    private String programType; // e.g., DIPLOMA, DEGREE

    @Indexed
    private Integer levelNo; // e.g., 4, 5, 6 for Diploma, or 1, 2, 3 for Degree

    @Indexed
    private Integer semesterNo; // e.g., 1, 2

    private String academicYear;

    private String imageUrl; // URL to the uploaded timetable image (Cloudinary)

    private String htmlContent; // Raw HTML code for the timetable layout

    private LocalDateTime uploadDate;

    // Which academicYear is "current" for this exact (programType, levelNo,
    // semesterNo) combination — set explicitly rather than inferred, since
    // inferring it from the single largest academicYear string across the
    // WHOLE collection (the old approach) meant uploading a newer year for
    // one program silently marked every other program's still-current-for-
    // itself timetable as "past" the moment that string comparison lost.
    private boolean isCurrent;

    public Timetable() {
        this.uploadDate = LocalDateTime.now();
    }

    public Timetable(String programType, Integer levelNo, Integer semesterNo, String academicYear, String imageUrl) {
        this.programType = programType;
        this.levelNo = levelNo;
        this.semesterNo = semesterNo;
        this.academicYear = academicYear;
        this.imageUrl = imageUrl;
        this.uploadDate = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getProgramType() { return programType; }
    public void setProgramType(String programType) { this.programType = programType; }
    public Integer getLevelNo() { return levelNo; }
    public void setLevelNo(Integer levelNo) { this.levelNo = levelNo; }
    public Integer getSemesterNo() { return semesterNo; }
    public void setSemesterNo(Integer semesterNo) { this.semesterNo = semesterNo; }
    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getHtmlContent() { return htmlContent; }
    public void setHtmlContent(String htmlContent) { this.htmlContent = htmlContent; }
    public LocalDateTime getUploadDate() { return uploadDate; }
    public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }
    public boolean getIsCurrent() { return isCurrent; }
    public void setIsCurrent(boolean isCurrent) { this.isCurrent = isCurrent; }
}
