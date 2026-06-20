package com.school.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "title", length = 200)
    private String title;

    @Column(name = "program_type", length = 50)
    private String programType = "DIPLOMA"; // e.g., DIPLOMA, DEGREE_ENG, DEGREE_EDU

    @Column(name = "level")
    private Integer levelNo; // 4, 5, 6 for Diploma OR 1, 2, 3, 4 for Degree Years

    @Column(name = "semester")
    private Integer semesterNo; // 1, 2

    @Column(name = "module_name", length = 150)
    private String moduleName;

    @Column(name = "module_code", length = 20)
    private String moduleCode;

    @Column(name = "category", length = 50)
    private String category; // Note, Past Paper, Assignment, Video Tutorial

    @Column(name = "filename", length = 255)
    private String filename;

    @Column(name = "file_url", length = 500)
    private String fileUrl;

    @Column(name = "academic_year", length = 20)
    private String academicYear;

    @Column(name = "upload_date")
    private LocalDateTime uploadDate;

    @Column(name = "is_public", nullable = false, columnDefinition = "boolean default true")
    private Boolean isPublic = true;

    @Column(name = "download_count", nullable = false, columnDefinition = "int default 0")
    private Integer downloadCount = 0;

    @Column(name = "unit_number")
    private Integer unitNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "institution_id")
    private Institution institution;

    // Constructors
    public Note() {
    }

    // Backwards compatible constructor for existing initializers
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

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear != null ? academicYear.toUpperCase() : null;
    }

    // Getters and Setters
    public String getProgramType() {
        return programType;
    }

    public void setProgramType(String programType) {
        this.programType = programType;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title != null ? title.toUpperCase() : null;
    }

    public Integer getLevelNo() {
        return levelNo;
    }

    public void setLevelNo(Integer levelNo) {
        this.levelNo = levelNo;
    }

    public Integer getSemesterNo() {
        return semesterNo;
    }

    public void setSemesterNo(Integer semesterNo) {
        this.semesterNo = semesterNo;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getModuleCode() {
        return moduleCode;
    }

    public void setModuleCode(String moduleCode) {
        this.moduleCode = moduleCode;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFileUrl() {
        return fileUrl;
    }

    public void setFileUrl(String fileUrl) {
        this.fileUrl = fileUrl;
    }

    public LocalDateTime getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(LocalDateTime uploadDate) {
        this.uploadDate = uploadDate;
    }

    public Boolean getIsPublic() {
        return isPublic;
    }

    public void setIsPublic(Boolean isPublic) {
        this.isPublic = isPublic;
    }

    public Integer getDownloadCount() {
        return downloadCount;
    }

    public void setDownloadCount(Integer downloadCount) {
        this.downloadCount = downloadCount;
    }

    public Integer getUnitNumber() {
        return unitNumber;
    }

    public void setUnitNumber(Integer unitNumber) {
        this.unitNumber = unitNumber;
    }

    public Institution getInstitution() {
        return institution;
    }

    public void setInstitution(Institution institution) {
        this.institution = institution;
    }
}
