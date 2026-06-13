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

    @Column(name = "level")
    private Integer levelNo; // 4, 5, 6

    @Column(name = "semester")
    private Integer semesterNo; // 1, 2

    @Column(name = "category", length = 50)
    private String category; // Note, Past Paper, Assignment, Video Tutorial

    @Column(name = "filename", length = 255)
    private String filename;

    @Column(name = "upload_date")
    private LocalDateTime uploadDate;

    @Column(name = "is_public", nullable = false, columnDefinition = "boolean default true")
    private Boolean isPublic = true;

    @Column(name = "download_count", nullable = false, columnDefinition = "int default 0")
    private Integer downloadCount = 0;

    // Constructors
    public Note() {
    }

    public Note(String title, String filename, Integer levelNo, Integer semesterNo, String category, LocalDateTime uploadDate) {
        this.title = title;
        this.filename = filename;
        this.levelNo = levelNo;
        this.semesterNo = semesterNo;
        this.category = category;
        this.uploadDate = uploadDate;
    }

    // Getters and Setters
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
        this.title = title;
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
}
