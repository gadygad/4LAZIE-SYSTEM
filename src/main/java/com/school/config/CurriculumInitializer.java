package com.school.config;

import com.school.model.Course;
import com.school.model.Subject;
import com.school.repository.CourseRepository;
import com.school.repository.SubjectRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CurriculumInitializer {

    private void seedCourse(CourseRepository repo, String name, String progType, String shortName, String subtitle, String iconClass, String iconColor, String iconBg, int duration, String levelPrefix, int startLevel) {
        List<Course> existing = repo.findByProgramType(progType);
        Course c;
        if (existing.isEmpty()) {
            c = new Course(name, progType, shortName, subtitle, iconClass, iconColor, iconBg, duration, levelPrefix, startLevel);
        } else {
            c = existing.get(0);
            c.setName(name);
            c.setShortName(shortName);
            c.setSubtitle(subtitle);
            c.setIconClass(iconClass);
            c.setIconColor(iconColor);
            c.setIconBg(iconBg);
            c.setDuration(duration);
            c.setLevelPrefix(levelPrefix);
            c.setStartLevel(startLevel);
        }
        repo.save(c);
    }

    @Bean
    public CommandLineRunner initCurriculumData(CourseRepository courseRepository, SubjectRepository subjectRepository) {
        return args -> {
            // Seed Diplomas
            seedCourse(courseRepository, "DIPLOMA IN INFORMATION TECHNOLOGY", "DIP_IT", "Diploma in IT", "Information Technology", "bi-laptop", "#3b82f6", "rgba(96, 165, 250, 0.1)", 3, "Level", 4);
            seedCourse(courseRepository, "DIPLOMA IN COMPUTER SCIENCE ENGINEERING", "DIP_CSE", "Diploma in CSE", "Computer Science Eng.", "bi-code-slash", "#10b981", "rgba(52, 211, 153, 0.1)", 3, "Level", 4);
            seedCourse(courseRepository, "DIPLOMA IN CIVIL ENGINEERING", "DIP_CE", "Diploma in CE", "Civil Engineering", "bi-cone-striped", "#f59e0b", "rgba(245, 158, 11, 0.1)", 3, "Level", 4);
            seedCourse(courseRepository, "DIPLOMA IN MECHANICAL ENGINEERING", "DIP_ME", "Diploma in ME", "Mechanical Engineering", "bi-gear-fill", "#a78bfa", "rgba(167, 139, 250, 0.1)", 3, "Level", 4);
            seedCourse(courseRepository, "DIPLOMA IN MECHATRONICS ENGINEERING", "DIP_MTE", "Diploma in MTE", "Mechatronics Engineering", "bi-cpu", "#dc2626", "rgba(248, 113, 113, 0.1)", 3, "Level", 4);
            seedCourse(courseRepository, "DIPLOMA IN ELECTRICAL AND ELECTRONICS ENGINEERING", "DIP_EEE", "Diploma in EEE", "Electrical & Electronics", "bi-lightning-charge-fill", "#d97706", "rgba(251, 191, 36, 0.1)", 3, "Level", 4);

            // Seed Degrees
            seedCourse(courseRepository, "DEGREE IN INFORMATION TECHNOLOGY", "DEG_IT", "Degree in IT", "Information Technology", "bi-laptop", "#3b82f6", "rgba(96, 165, 250, 0.1)", 4, "Year", 1);
            seedCourse(courseRepository, "DEGREE IN COMPUTER SCIENCE", "DEG_CS", "Degree in CS", "Computer Science", "bi-display", "#8b5cf6", "rgba(139, 92, 246, 0.1)", 3, "Year", 1);
            seedCourse(courseRepository, "DEGREE IN COMPUTER SCIENCE ENGINEERING", "DEG_CSE", "Degree in CSE", "Computer Science Eng.", "bi-code-slash", "#10b981", "rgba(52, 211, 153, 0.1)", 4, "Year", 1);
            seedCourse(courseRepository, "DEGREE IN CIVIL ENGINEERING", "DEG_CE", "Degree in CE", "Civil Engineering", "bi-cone-striped", "#f59e0b", "rgba(245, 158, 11, 0.1)", 4, "Year", 1);
            seedCourse(courseRepository, "DEGREE IN MECHANICAL ENGINEERING", "DEG_ME", "Degree in ME", "Mechanical Engineering", "bi-gear-fill", "#a78bfa", "rgba(167, 139, 250, 0.1)", 4, "Year", 1);
            seedCourse(courseRepository, "DEGREE IN MECHATRONICS ENGINEERING", "DEG_MTE", "Degree in MTE", "Mechatronics Engineering", "bi-cpu", "#dc2626", "rgba(248, 113, 113, 0.1)", 4, "Year", 1);
            seedCourse(courseRepository, "DEGREE IN ELECTRICAL AND ELECTRONICS ENGINEERING", "DEG_EEE", "Degree in EEE", "Electrical & Electronics", "bi-lightning-charge-fill", "#d97706", "rgba(251, 191, 36, 0.1)", 4, "Year", 1);

            Course diplomaCSE = courseRepository.findByProgramType("DIP_CSE").get(0);
            Course diplomaIT = courseRepository.findByProgramType("DIP_IT").get(0);

            // Target subjects for CSE Level 5 Sem 2
            List<String> moduleNamesCSE = Arrays.asList(
                    "SERVER ADMINISTRATION",
                    "COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE",
                    "COMPUTER NETWORK",
                    "MICROPROCESSOR AND MICROCONTROLLER",
                    "BASIC DATA COMMUNICATION",
                    "WEB DESIGNING"
            );

            List<Subject> existingSubjectsCSE = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaCSE.getId(), 5, 2);
            for (Subject s : existingSubjectsCSE) {
                if (!moduleNamesCSE.contains(s.getName())) {
                    subjectRepository.delete(s);
                }
            }
            existingSubjectsCSE = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaCSE.getId(), 5, 2);
            for (String name : moduleNamesCSE) {
                boolean exists = existingSubjectsCSE.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(2);
                    subject.setLevelNo(5);
                    subject.setCourse(diplomaCSE);
                    subject.setCode(""); 
                    subjectRepository.save(subject);
                }
            }
            for (Subject s : existingSubjectsCSE) {
                if (s.getCode() != null && !s.getCode().isEmpty()) {
                    s.setCode("");
                    subjectRepository.save(s);
                }
            }

            // Target subjects for IT Level 5 Sem 2
            List<String> moduleNamesIT = Arrays.asList("WEB DESIGNING");
            List<Subject> existingSubjectsIT = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaIT.getId(), 5, 2);
            for (Subject s : existingSubjectsIT) {
                if (!moduleNamesIT.contains(s.getName())) {
                    subjectRepository.delete(s);
                }
            }
            existingSubjectsIT = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaIT.getId(), 5, 2);
            for (String name : moduleNamesIT) {
                boolean exists = existingSubjectsIT.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(2);
                    subject.setLevelNo(5);
                    subject.setCourse(diplomaIT);
                    subject.setCode(""); 
                    subjectRepository.save(subject);
                }
            }
            for (Subject s : existingSubjectsIT) {
                if (s.getCode() != null && !s.getCode().isEmpty()) {
                    s.setCode("");
                    subjectRepository.save(s);
                }
            }

            List<Course> allCourses = courseRepository.findAll();
            List<String> generalLevel5Sem1 = Arrays.asList("ENGINEERING ENTREPRENEURSHIP", "ENGINEERING MATHEMATICS", "APPLIED CHEMISTRY");
            for (Course course : allCourses) {
                if (course.getProgramType().startsWith("DIP_")) {
                    List<Subject> existingLevel5Sem1 = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(course.getId(), 5, 1);
                    for (Subject s : existingLevel5Sem1) {
                        if (!generalLevel5Sem1.contains(s.getName())) {
                            subjectRepository.delete(s);
                        }
                    }
                    existingLevel5Sem1 = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(course.getId(), 5, 1);
                    for (String name : generalLevel5Sem1) {
                        boolean exists = existingLevel5Sem1.stream().anyMatch(s -> s.getName().equals(name));
                        if (!exists) {
                            Subject subject = new Subject();
                            subject.setName(name);
                            subject.setSemesterNo(1);
                            subject.setLevelNo(5);
                            subject.setCourse(course);
                            subject.setCode("");
                            subjectRepository.save(subject);
                        }
                    }
                }
            }

            List<String> generalLevel4Sem1 = Arrays.asList("COMMUNICATION SKILLS", "BASIC ENGINEERING PHYSICS", "BASIC ENGINEERING MATHEMATICS");
            for (Course course : allCourses) {
                if (course.getProgramType().startsWith("DIP_")) {
                    List<Subject> existingLevel4Sem1 = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(course.getId(), 4, 1);
                    for (Subject s : existingLevel4Sem1) {
                        if (!generalLevel4Sem1.contains(s.getName())) {
                            subjectRepository.delete(s);
                        }
                    }
                    existingLevel4Sem1 = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(course.getId(), 4, 1);
                    for (String name : generalLevel4Sem1) {
                        boolean exists = existingLevel4Sem1.stream().anyMatch(s -> s.getName().equals(name));
                        if (!exists) {
                            Subject subject = new Subject();
                            subject.setName(name);
                            subject.setSemesterNo(1);
                            subject.setLevelNo(4);
                            subject.setCourse(course);
                            subject.setCode("");
                            subjectRepository.save(subject);
                        }
                    }
                }
            }

            List<String> cseLevel5Sem1 = Arrays.asList("OBJECT ORIENTED PROGRAMMING WITH JAVA", "BASIC VISUAL PROGRAMMING", "OPERATING SYSTEM");
            List<Subject> existingCseLevel5Sem1 = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaCSE.getId(), 5, 1);
            for (String name : cseLevel5Sem1) {
                boolean exists = existingCseLevel5Sem1.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(1);
                    subject.setLevelNo(5);
                    subject.setCourse(diplomaCSE);
                    subject.setCode("");
                    subjectRepository.save(subject);
                }
            }
        };
    }
}
