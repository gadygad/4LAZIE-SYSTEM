package com.school.notes;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import com.school.util.EncryptionUtil;
import java.time.LocalDateTime;

// The dashboard/browse queries almost always filter on all four of these
// fields together (programType + levelNo + semesterNo + category) — a
// compound index covering that combination is far more efficient than
// relying on the individual single-field @Indexed ones below for that
// specific, very common query shape.
@CompoundIndexes({
    @CompoundIndex(name = "browse_notes_idx", def = "{'programType': 1, 'levelNo': 1, 'semesterNo': 1, 'category': 1}")
})
@Document(collection = "notes")
public class Note {

    @Id
    private String id;

    @TextIndexed(weight = 2)
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
    @TextIndexed(weight = 1)
    private String category; // Note, Past Paper, Assignment, Video Tutorial

    private String filename;
    private String fileUrl;
    private String academicYear;

    // JSON content for dynamically generated exams (client-side PDF generation)
    private String contentJson;

    @Indexed
    private LocalDateTime uploadDate;

    private Boolean isPublic = true;
    private Integer downloadCount = 0;
    private Integer viewCount = 0;
    private Integer likesCount = 0;
    private java.util.Set<String> likedBy = new java.util.LinkedHashSet<>();
    private Integer unitNumber;
    
    @Indexed
    private Boolean isGeneral = false;

    // When isGeneral is set, this is computed at save time as every
    // programType whose own Subject catalog also has a subject with this
    // note's moduleName at this levelNo/semesterNo — i.e. "general" means
    // visible to the other courses that actually teach this subject, not
    // blanket-visible to every course at that level/semester regardless of
    // whether they offer it at all.
    private java.util.List<String> applicablePrograms = new java.util.ArrayList<>();

    @DBRef(lazy = true)
    private com.school.academic.Institution institution;

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
    public String getContentJson() { return contentJson; }
    public void setContentJson(String contentJson) { this.contentJson = contentJson; }
    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear != null ? academicYear.toUpperCase() : null; }
    public LocalDateTime getUploadDate() { return uploadDate; }
    public void setUploadDate(LocalDateTime uploadDate) { this.uploadDate = uploadDate; }
    public Boolean getIsPublic() { return isPublic; }
    public void setIsPublic(Boolean isPublic) { this.isPublic = isPublic; }
    public Integer getDownloadCount() { return downloadCount; }
    public void setDownloadCount(Integer downloadCount) { this.downloadCount = downloadCount; }

    public Integer getLikesCount() { return likesCount; }
    public void setLikesCount(Integer likesCount) { this.likesCount = likesCount; }

    public java.util.Set<String> getLikedBy() { return likedBy; }
    public void setLikedBy(java.util.Set<String> likedBy) { this.likedBy = likedBy != null ? likedBy : new java.util.LinkedHashSet<>(); }
    public Integer getViewCount() { return viewCount; }
    public void setViewCount(Integer viewCount) { this.viewCount = viewCount; }
    public Integer getUnitNumber() { return unitNumber; }
    public void setUnitNumber(Integer unitNumber) { this.unitNumber = unitNumber; }
    public Boolean getIsGeneral() { return isGeneral != null ? isGeneral : false; }
    public void setIsGeneral(Boolean isGeneral) { this.isGeneral = isGeneral; }
    public java.util.List<String> getApplicablePrograms() { return applicablePrograms; }
    public void setApplicablePrograms(java.util.List<String> applicablePrograms) { this.applicablePrograms = applicablePrograms != null ? applicablePrograms : new java.util.ArrayList<>(); }
    public com.school.academic.Institution getInstitution() { return institution; }
    public void setInstitution(com.school.academic.Institution institution) { this.institution = institution; }

    public String getSlug() {
        String cleanTitle = (title != null) ? title.toLowerCase().replaceAll("[^a-z0-9]+", "-") : "document";
        return id + "-" + cleanTitle;
    }

    public String getEncryptedSlug() {
        return EncryptionUtil.encrypt(id);
    }
}
