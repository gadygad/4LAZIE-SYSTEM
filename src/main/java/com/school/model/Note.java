package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.index.Indexed;
import java.time.LocalDateTime;

@Document(collection = "notes")
public class Note {

    @Id
    private String id;

    private String title;

    @Indexed
    private String programType = "DIPLOMA"; // e.g., DIPLOMA, DEGREE_ENG, DEGREE_EDU

    @Indexed
    private Integer levelNo; // 4, 5, 6 for Diploma OR 1, 2, 3, 4 for Degree Years

    @Indexed
    private Integer semesterNo; // 1, 2

    private String moduleName;
    private String moduleCode;

    @Indexed
    private String category; // Note, Past Paper, Assignment, Video Tutorial

    private String filename;
    private String fileUrl;
    private String academicYear;

    @Indexed
    private LocalDateTime uploadDate;

    private Boolean isPublic = true;
    private Integer downloadCount = 0;
    private Integer unitNumber;

    @DBRef
    private Institution institution;

    // Constructors
    public Note() {
    }

    public Note(String title, String filename, String programType, Integer levelNo, Integer semesterNo, String category, String moduleName, String moduleCode, String academicYear, LocalDateTime uploadDate) {
        this.title = title != null ? title.toUpperCase() : null;
        this.filename = filename;
        this.fileUrl = "";
        this.programType = programType;
        this.levelNo = levelNo;
        this.semesterNo = semesterNo;
        this.category = category;
        this.moduleName = moduleName;
        this.moduleCode = moduleCode;
        this.academicYear = academicYear != null ? academicYear.toUpperCase() : null;
        this.uploadDate = uploadDate;
    }

    public Note(String title, String filename, String fileUrl, String programType, Integer levelNo, Integer semesterNo, String category, String moduleName, String moduleCode, String academicYear, LocalDateTime uploadDate) {
        this.title = title != null ? title.toUpperCase() : null;
        this.filename = filename;
        this.fileUrl = fileUrl;
        this.programType = programType;
        this.levelNo = levelNo;
        this.semesterNo = semesterNo;
        this.category = category;
        this.moduleName = moduleName;
        this.moduleCode = moduleCode;
        this.academicYear = academicYear != null ? academicYear.toUpperCase() : null;
        this.uploadDate = uploadDate;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title != null ? title.toUpperCase() : null; }
    public String getProgramType() { return programType; }
    public void setProgramType(String programType) { this.programType = programType; }
    public Integer getLevelNo() { return levelNo; }
    public void setLevelNo(Integer levelNo) { this.levelNo = levelNo; }
    public Integer getSemesterNo() { return semesterNo; }
    public void setSemesterNo(Integer semesterNo) { this.semesterNo = semesterNo; }
    public String getModuleName() { return moduleName; }
    public void setModuleName(String moduleName) { this.moduleName = moduleName; }
    public String getModuleCode() { return moduleCode; }
    public void setModuleCode(String moduleCode) { this.moduleCode = moduleCode; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getFilename() { return filename; }
    public void setFilename(String filename) { this.filename = filename; }
    public String getFileUrl() { return fileUrl; }
    public void setFileUrl(String fileUrl) { this.fileUrl = fileUrl; }
    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear != null ? academicYear.toUpperCase() : null; }
    public LocalDateTime getUploadDate() { return uploadDate; }
    public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }
    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
    public Integer getDownloadCount() { return downloadCount; }
    public void setDownloadCount(Integer downloadCount) { this.downloadCount = downloadCount; }
    public Integer getUnitNumber() { return unitNumber; }
    public void setUnitNumber(Integer unitNumber) { this.unitNumber = unitNumber; }
    public Institution getInstitution() { return institution; }
    public void setInstitution(Institution institution) { this.institution = institution; }

    public String getSlug() {
        if (title == null) return id;
        String cleanTitle = title.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("-$", "").replaceAll("^-", "");
        return id + "-" + cleanTitle;
    }
}
