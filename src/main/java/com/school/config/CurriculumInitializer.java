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

    private void seedCourse(CourseRepository repo, String name, String type, String shortName, String subtitle, String icon, String color, String bg, int duration, String levelPrefix, int startLevel) {
        List<Course> existingCourses = repo.findByProgramType(type);
        if (existingCourses.isEmpty()) {
            Course course = new Course(name, type, shortName, subtitle, icon, color, bg, duration, levelPrefix, startLevel);
            repo.save(course);
        } else {
            for (Course course : existingCourses) {
                boolean updated = false;
                if (course.getDuration() != duration) {
                    course.setDuration(duration);
                    updated = true;
                }
                if (!name.equals(course.getName())) {
                    course.setName(name);
                    updated = true;
                }
                if (!shortName.equals(course.getShortName())) {
                    course.setShortName(shortName);
                    updated = true;
                }
                if (!subtitle.equals(course.getSubtitle())) {
                    course.setSubtitle(subtitle);
                    updated = true;
                }
                if (!icon.equals(course.getIconClass())) {
                    course.setIconClass(icon);
                    updated = true;
                }
                if (!color.equals(course.getIconColor())) {
                    course.setIconColor(color);
                    updated = true;
                }
                if (!bg.equals(course.getIconBg())) {
                    course.setIconBg(bg);
                    updated = true;
                }
                if (!levelPrefix.equals(course.getLevelPrefix())) {
                    course.setLevelPrefix(levelPrefix);
                    updated = true;
                }
                if (course.getStartLevel() != startLevel) {
                    course.setStartLevel(startLevel);
                    updated = true;
                }
                if (updated) {
                    repo.save(course);
                }
            }
        }
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
            // Seed DEG_CSE Year 4 Sem 2
            Course degreeCSE = courseRepository.findByProgramType("DEG_CSE").get(0);
            List<String> degCseYear4Sem2 = Arrays.asList(
                    "MANAGEMENT INFORMATION SYSTEM",
                    "DISASTER MANAGEMENT",
                    "ENTREPRENEURSHIP DEVELOPMENT",
                    "COURSE FOR DESIGN PROFESSIONAL",
                    "TECHNICAL SEMINAR",
                    "PROJECT"
            );
            List<Subject> existingDegCseY4S2 = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(degreeCSE.getId(), 4, 2);
            for (String name : degCseYear4Sem2) {
                boolean exists = existingDegCseY4S2.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(2);
                    subject.setLevelNo(4);
                    subject.setCourse(degreeCSE);
                    subject.setCode("");
                    subjectRepository.save(subject);
                }
            }
            // Seed DIP_CSE Level 6 Sem 2
            Course diplomaCse6 = courseRepository.findByProgramType("DIP_CSE").get(0);
            List<String> dipCseLevel6Sem2 = Arrays.asList(
                    "MOBILE COMPUTING",
                    "COMPUTER NETWORK SECURITY",
                    "SOFTWARE DESIGNING AND DEVELOPMENT",
                    "SUPERVISORY SKILLS",
                    "EMBEDED SYSTEM"
            );
            List<Subject> existingDipCseL6S2 = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaCse6.getId(), 6, 2);
            for (String name : dipCseLevel6Sem2) {
                boolean exists = existingDipCseL6S2.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(2);
                    subject.setLevelNo(6);
                    subject.setCourse(diplomaCse6);
                    subject.setCode("");
                    subjectRepository.save(subject);
                }
            }
            // Seed DEG_CS Year 1 Sem 1
            Course degreeCS = courseRepository.findByProgramType("DEG_CS").get(0);
            List<String> degCsYear1Sem1 = Arrays.asList(
                    "COMPUTATIONAL METHODS",
                    "BUSSINESS COMMUNICATION",
                    "PROGRAMMING IN C",
                    "COMPUTER ARCHITECTURE",
                    "COMPUTER INSTALLATION AND SERVICING"
            );
            List<Subject> existingDegCsY1S1 = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(degreeCS.getId(), 1, 1);
            for (String name : degCsYear1Sem1) {
                boolean exists = existingDegCsY1S1.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(1);
                    subject.setLevelNo(1);
                    subject.setCourse(degreeCS);
                    subject.setCode("");
                    subjectRepository.save(subject);
                }
            }
        };
    }
}
