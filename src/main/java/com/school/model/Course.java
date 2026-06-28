package com.school.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "courses")
public class Course {

    @Id
    private String id;
    private String name;
    private String programType;

    // UI Metadata for Dynamic Menus
    private String shortName;
    private String subtitle;
    private String iconClass;
    private String iconColor;
    private String iconBg;
    private int duration;
    private String levelPrefix;
    private int startLevel;

    @DBRef
    private List<Subject> subjects = new ArrayList<>();

    public Course() {}

    public Course(String name, String programType) {
        this.name = name;
        this.programType = programType;
    }

    public Course(String name, String programType, String shortName, String subtitle, String iconClass, String iconColor, String iconBg, int duration, String levelPrefix, int startLevel) {
        this.name = name;
        this.programType = programType;
        this.shortName = shortName;
        this.subtitle = subtitle;
        this.iconClass = iconClass;
        this.iconColor = iconColor;
        this.iconBg = iconBg;
        this.duration = duration;
        this.levelPrefix = levelPrefix;
        this.startLevel = startLevel;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getProgramType() { return programType; }
    public void setProgramType(String programType) { this.programType = programType; }

    public String getShortName() { return shortName; }
    public void setShortName(String shortName) { this.shortName = shortName; }
    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }
    public String getIconClass() { return iconClass; }
    public void setIconClass(String iconClass) { this.iconClass = iconClass; }
    public String getIconColor() { return iconColor; }
    public void setIconColor(String iconColor) { this.iconColor = iconColor; }
    public String getIconBg() { return iconBg; }
    public void setIconBg(String iconBg) { this.iconBg = iconBg; }
    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }
    public String getLevelPrefix() { return levelPrefix; }
    public void setLevelPrefix(String levelPrefix) { this.levelPrefix = levelPrefix; }
    public int getStartLevel() { return startLevel; }
    public void setStartLevel(int startLevel) { this.startLevel = startLevel; }

    public List<Subject> getSubjects() { return subjects; }
    public void setSubjects(List<Subject> subjects) { this.subjects = subjects; }
    public void addSubject(Subject subject) {
        subjects.add(subject);
        subject.setCourse(this);
    }
    public void removeSubject(Subject subject) {
        subjects.remove(subject);
        subject.setCourse(null);
    }
}
