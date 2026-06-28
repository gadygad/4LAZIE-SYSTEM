package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.index.CompoundIndex;

@Document(collection = "subjects")
@CompoundIndex(name = "course_level_semester_idx", def = "{'course': 1, 'levelNo': 1, 'semesterNo': 1}")
public class Subject {

    @Id
    private String id;
    private String name;
    private String code;
    private Integer semesterNo;
    private Integer levelNo;

    @DBRef
    private Course course;

    public Subject() {}

    public Subject(String name, String code, Integer semesterNo, Integer levelNo, Course course) {
        this.name = name;
        this.code = code;
        this.semesterNo = semesterNo;
        this.levelNo = levelNo;
        this.course = course;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public Integer getSemesterNo() { return semesterNo; }
    public void setSemesterNo(Integer semesterNo) { this.semesterNo = semesterNo; }
    public Integer getLevelNo() { return levelNo; }
    public void setLevelNo(Integer levelNo) { this.levelNo = levelNo; }
    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }
}
