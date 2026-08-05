package com.school.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.web.multipart.MultipartFile;

public class NoteUploadDTO {

    @NotBlank(message = "Title is required")
    private String title;

    private String programType = "DIPLOMA";

    @NotNull(message = "Level is required")
    private Integer levelNo;

    @NotNull(message = "Semester is required")
    private Integer semesterNo;

    private String moduleName;
    private String moduleCode;
    private String category;
    private Integer unitNumber;
    private String academicYear;
    private Boolean isGeneral = false;

    @NotNull(message = "File is required")
    private MultipartFile file;

    // Getters and Setters

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

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

    public Integer getUnitNumber() { return unitNumber; }
    public void setUnitNumber(Integer unitNumber) { this.unitNumber = unitNumber; }

    public String getAcademicYear() { return academicYear; }
    public void setAcademicYear(String academicYear) { this.academicYear = academicYear; }

    public Boolean getIsGeneral() { return isGeneral; }
    public void setIsGeneral(Boolean isGeneral) { this.isGeneral = isGeneral; }

    public MultipartFile getFile() { return file; }
    public void setFile(MultipartFile file) { this.file = file; }
}
