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
    public CommandLineRunner initCurriculumData(CourseRepository courseRepository, SubjectRepository subjectRepository, com.school.repository.TimetableRepository timetableRepository) {
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
                    "MICROCONTROLLER AND MICROPROCESSOR",
                    "BASIC DATA COMMUNICATION",
                    "WEB DESIGNING"
            );

            List<Subject> existingSubjectsCSE = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaCSE, 5, 2);
            for (Subject s : existingSubjectsCSE) {
                if (!moduleNamesCSE.contains(s.getName())) {
                    subjectRepository.delete(s);
                }
            }
            existingSubjectsCSE = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaCSE, 5, 2);
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
            List<Subject> existingSubjectsIT = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaIT, 5, 2);
            for (Subject s : existingSubjectsIT) {
                if (!moduleNamesIT.contains(s.getName())) {
                    subjectRepository.delete(s);
                }
            }
            existingSubjectsIT = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaIT, 5, 2);
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

            // Target subjects for DIP_ME Level 5 Sem 2
            Course diplomaME = courseRepository.findByProgramType("DIP_ME").stream().findFirst().orElse(null);
            if (diplomaME != null) {
                List<String> moduleNamesME = Arrays.asList(
                    "INTRODUCTION TO WELDING AND FOUNDRY TECHNOLOGIES",
                    "MACHINE COMPONENT PRODUCTION",
                    "FLUID MECHANICS AND FLUID POWER",
                    "APPLIED THERMODYNAMICS",
                    "METAL CUTTING PROCESSES",
                    "INDUSTRIAL PRACTICAL TRAINING II"
                );
                List<Subject> existingSubjectsME = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaME, 5, 2);
                for (Subject s : existingSubjectsME) {
                    if (!moduleNamesME.contains(s.getName())) {
                        subjectRepository.delete(s);
                    }
                }
                existingSubjectsME = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaME, 5, 2);
                for (String name : moduleNamesME) {
                    boolean exists = existingSubjectsME.stream().anyMatch(s -> s.getName().equals(name));
                    if (!exists) {
                        Subject subject = new Subject();
                        subject.setName(name);
                        subject.setSemesterNo(2);
                        subject.setLevelNo(5);
                        subject.setCourse(diplomaME);
                        subject.setCode(""); 
                        subjectRepository.save(subject);
                    }
                }
            }

            // Target subjects for DEG_CE Level 3 (Year 3) Sem 2
            Course degreeCE = courseRepository.findByProgramType("DEG_CE").stream().findFirst().orElse(null);
            if (degreeCE != null) {
                List<String> moduleNamesDEG_CE = Arrays.asList(
                    "STRUCTURAL ANALYIS II (T)",
                    "DESIGN OF RC STRUCTURE (T)",
                    "ENVIRONMENT ENGINEERING II (T)",
                    "DESIGN OF STEEL STRUCTURE (T)",
                    "PAVEMENT ENGINEERING (T)",
                    "HYDROLOGY AND WATER RESOURCE ENGINEERING (T)",
                    "ENVIRONMENTAL ENGINEERING LAB (P)",
                    "STRUCTURAL DETAILING & DRAWING LAB (P)"
                );
                List<Subject> existingSubjectsDEG_CE = subjectRepository.findByCourseAndLevelNoAndSemesterNo(degreeCE, 3, 2);
                for (Subject s : existingSubjectsDEG_CE) {
                    if (!moduleNamesDEG_CE.contains(s.getName())) {
                        subjectRepository.delete(s);
                    }
                }
                existingSubjectsDEG_CE = subjectRepository.findByCourseAndLevelNoAndSemesterNo(degreeCE, 3, 2);
                for (String name : moduleNamesDEG_CE) {
                    boolean exists = existingSubjectsDEG_CE.stream().anyMatch(s -> s.getName().equals(name));
                    if (!exists) {
                        Subject subject = new Subject();
                        subject.setName(name);
                        subject.setSemesterNo(2);
                        subject.setLevelNo(3);
                        subject.setCourse(degreeCE);
                        subject.setCode("");
                        subjectRepository.save(subject);
                    }
                }
            }

            // Target subjects for DEG_CE Level 4 (Year 4) Sem 1
            if (degreeCE != null) {
                List<String> moduleNamesCEY4S1 = Arrays.asList(
                    "PRINCIPLES OF MANAGEMENT AND PROFFESIONAL ETHICS (T)",
                    "QUANTITY SURVEYING AND VALUATION (T)",
                    "REPAIR AND REHABILITATION OF STRUCTURES (T)",
                    "ENVIRONMENTAL IMPACT ASSESSMENT (T)",
                    "COMPUTER AIDED STRUCTURAL ANALYSIS LAB (P)",
                    "PROJECT WORK PHASE I AND VIVA VOICE (P)"
                );
                List<Subject> existingCEY4S1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(degreeCE, 4, 1);
                for (Subject s : existingCEY4S1) {
                    if (!moduleNamesCEY4S1.contains(s.getName())) {
                        subjectRepository.delete(s);
                    }
                }
                existingCEY4S1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(degreeCE, 4, 1);
                for (String name : moduleNamesCEY4S1) {
                    boolean exists = existingCEY4S1.stream().anyMatch(s -> s.getName().equals(name));
                    if (!exists) {
                        Subject subject = new Subject();
                        subject.setName(name);
                        subject.setSemesterNo(1);
                        subject.setLevelNo(4);
                        subject.setCourse(degreeCE);
                        subject.setCode(""); 
                        subjectRepository.save(subject);
                    }
                }
            }

            // Target subjects for DEG_CE Level 4 (Year 4) Sem 2
            if (degreeCE != null) {
                List<String> moduleNamesDEG_CE_Y4S2 = Arrays.asList(
                    "ENTREPRENEURSHIP DEVELOPMENT (T)",
                    "TECHNICAL SEMINAR (P)",
                    "CONSTRUCTION TECHNIQUES,EQUIPMENT & PRACTICE (T)",
                    "BRIDGE ENGINEERING (T)",
                    "PROJECT PHASE II (P)"
                );
                List<Subject> existingSubjectsDEG_CE_Y4S2 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(degreeCE, 4, 2);
                for (Subject s : existingSubjectsDEG_CE_Y4S2) {
                    if (!moduleNamesDEG_CE_Y4S2.contains(s.getName())) {
                        subjectRepository.delete(s);
                    }
                }
                existingSubjectsDEG_CE_Y4S2 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(degreeCE, 4, 2);
                for (String name : moduleNamesDEG_CE_Y4S2) {
                    boolean exists = existingSubjectsDEG_CE_Y4S2.stream().anyMatch(s -> s.getName().equals(name));
                    if (!exists) {
                        Subject subject = new Subject();
                        subject.setName(name);
                        subject.setSemesterNo(2);
                        subject.setLevelNo(4);
                        subject.setCourse(degreeCE);
                        subject.setCode("");
                        subjectRepository.save(subject);
                    }
                }
            }

            List<Course> allCourses = courseRepository.findAll();
            List<String> generalLevel5Sem1 = Arrays.asList("ENGINEERING ENTREPRENEURSHIP", "ENGINEERING MATHEMATICS", "APPLIED CHEMISTRY");
            for (Course course : allCourses) {
                if (course.getProgramType().startsWith("DIP_")) {
                    List<Subject> existingLevel5Sem1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(course, 5, 1);
                    for (Subject s : existingLevel5Sem1) {
                        if (!generalLevel5Sem1.contains(s.getName())) {
                            subjectRepository.delete(s);
                        }
                    }
                    existingLevel5Sem1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(course, 5, 1);
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
                    List<Subject> existingLevel4Sem1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(course, 4, 1);
                    for (Subject s : existingLevel4Sem1) {
                        if (!generalLevel4Sem1.contains(s.getName())) {
                            subjectRepository.delete(s);
                        }
                    }
                    existingLevel4Sem1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(course, 4, 1);
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

            // Seed DIP_CSE Level 4 Sem 1
            List<String> cseLevel4Sem1 = Arrays.asList("COMMUNICATION SKILLS", "BASIC ENGINEERING PHYSICS", "BASIC ENGINEERING MATHEMATICS");
            List<Subject> existingCseLevel4Sem1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaCSE, 4, 1);
            for (String name : cseLevel4Sem1) {
                boolean exists = existingCseLevel4Sem1.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(1);
                    subject.setLevelNo(4);
                    subject.setCourse(diplomaCSE);
                    subject.setCode("");
                    subjectRepository.save(subject);
                }
            }

            // Seed DIP_CSE Level 4 Sem 2 (Specifics)
            List<String> cseLevel4Sem2 = Arrays.asList("DATA STRUCTURE");
            List<Subject> existingCseLevel4Sem2 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaCSE, 4, 2);
            for (String name : cseLevel4Sem2) {
                boolean exists = existingCseLevel4Sem2.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(2);
                    subject.setLevelNo(4);
                    subject.setCourse(diplomaCSE);
                    subject.setCode("");
                    subjectRepository.save(subject);
                }
            }

            List<String> cseLevel5Sem1 = Arrays.asList("OBJECT ORIENTED PROGRAMMING WITH JAVA", "BASIC VISUAL PROGRAMMING", "OPERATING SYSTEM");
            List<Subject> existingCseLevel5Sem1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaCSE, 5, 1);
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
            List<Subject> existingDegCseY4S2 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(degreeCSE, 4, 2);
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
            
            // Seed DEG_CSE Year 2 Sem 2
            List<String> degCseYear2Sem2 = Arrays.asList(
                    "OPERATING SYSTEM"
            );
            List<Subject> existingDegCseY2S2 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(degreeCSE, 2, 2);
            for (String name : degCseYear2Sem2) {
                boolean exists = existingDegCseY2S2.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(2);
                    subject.setLevelNo(2);
                    subject.setCourse(degreeCSE);
                    subject.setCode("");
                    subjectRepository.save(subject);
                }
            }
            // Seed DIP_CSE Level 6 Sem 1
            List<String> dipCseLevel6Sem1 = Arrays.asList(
                    "DATABASE ADMINISTRATION",
                    "SOFTWARE ENGINEERING",
                    "SYSTEM ANALYSIS AND DESIGN",
                    "ENTREPRENEURSHIP",
                    "WEB DEVELOPMENT"
            );
            List<Subject> existingDipCseL6S1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaCSE, 6, 1);
            for (String name : dipCseLevel6Sem1) {
                boolean exists = existingDipCseL6S1.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(1);
                    subject.setLevelNo(6);
                    subject.setCourse(diplomaCSE);
                    subject.setCode("");
                    subjectRepository.save(subject);
                }
            }

            // Seed DIP_CSE Level 6 Sem 2
            List<String> dipCseLevel6Sem2 = Arrays.asList(
                    "MOBILE COMPUTING",
                    "COMPUTER NETWORK SECURITY",
                    "SOFTWARE DESIGNING AND DEVELOPMENT",
                    "SUPERVISORY SKILLS",
                    "EMBEDED SYSTEM"
            );
            List<Subject> existingDipCseL6S2 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(diplomaCSE, 6, 2);
            for (String name : dipCseLevel6Sem2) {
                boolean exists = existingDipCseL6S2.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(2);
                    subject.setLevelNo(6);
                    subject.setCourse(diplomaCSE);
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
            List<Subject> existingDegCsY1S1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(degreeCS, 1, 1);
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
            
            // Seed DEG_CE Year 3 Sem 2 Timetable
            com.school.model.Timetable tt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNo("DEG_CE", 3, 2).orElse(new com.school.model.Timetable());
            tt.setProgramType("DEG_CE");
            tt.setLevelNo(3);
            tt.setSemesterNo(2);
                tt.setAcademicYear("2025/2026");
                tt.setUploadDate(java.time.LocalDateTime.now());
                tt.setHtmlContent("<div style=\"font-family: 'Outfit', sans-serif; padding: 20px; background: #ffffff; color: #1e293b; max-width: 1000px; margin: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);\">\n" +
                        "        <!-- HEADER -->\n" +
                        "        <div style=\"text-align: center; margin-bottom: 25px; border-bottom: 2px solid #10b981; padding-bottom: 15px;\">\n" +
                        "            <h1 style=\"font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 0 0 5px 0;\">St. JOSEPH COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>\n" +
                        "            <h2 style=\"font-size: 1.1rem; font-weight: 700; color: #059669; margin: 0 0 5px 0;\">DEPARTMENT OF CIVIL ENGINEERING AND BUILT ENVIRONMENT</h2>\n" +
                        "            <h3 style=\"font-size: 0.95rem; font-weight: 600; color: #475569; margin: 0;\">THIRD YEAR (BATCH 18) SEMESTER II - DEGREE TIMETABLE APRIL 2026</h3>\n" +
                        "            <div style=\"display: flex; justify-content: space-between; margin-top: 15px; font-size: 0.85rem; font-weight: 700; background: #f8fafc; padding: 10px 20px; border-radius: 8px; border: 1px solid #e2e8f0;\">\n" +
                        "                <div>CLASS ADVISOR: MR PRABU</div>\n" +
                        "                <div>STRENGTH: 122</div>\n" +
                        "                <div>LECTURE HALL: 96</div>\n" +
                        "            </div>\n" +
                        "        </div>\n" +
                        "        <!-- TIMETABLE GRID -->\n" +
                        "        <div style=\"overflow-x: auto;\">\n" +
                        "            <table style=\"width: 100%; border-collapse: collapse; text-align: center; font-size: 0.85rem;\">\n" +
                        "                <thead>\n" +
                        "                    <tr>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #0f172a; color: #fff; padding: 10px;\">HOUR</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;\">1</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;\">2</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;\">3</th>\n" +
                        "                        <th rowspan=\"7\" style=\"border: 1px solid #cbd5e1; background: #f1f5f9; color: #0f172a; padding: 10px; width: 40px; font-weight: 800; line-height: 1.5; text-align: center;\">B<br>R<br>E<br>A<br>K</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;\">4</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;\">5</th>\n" +
                        "                        <th rowspan=\"7\" style=\"border: 1px solid #cbd5e1; background: #f1f5f9; color: #0f172a; padding: 10px; width: 40px; font-weight: 800; line-height: 1.5; text-align: center;\">L<br>U<br>N<br>C<br>H<br><br>B<br>R<br>E<br>A<br>K</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;\">6</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;\">7</th>\n" +
                        "                    </tr>\n" +
                        "                    <tr>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px;\">DAY/TIME</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;\">8.00AM<br>TO<br>8.55AM</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;\">8.55AM<br>TO<br>9.50AM</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;\">9.50AM<br>TO<br>10.45AM</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;\">11.00AM<br>TO<br>11.55AM</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;\">11.55AM<br>TO<br>12.45PM</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;\">1.45PM<br>TO<br>2.40PM</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;\">2.40PM<br>TO<br>3.35PM</th>\n" +
                        "                    </tr>\n" +
                        "                </thead>\n" +
                        "                <tbody>\n" +
                        "                    <tr>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;\">MONDAY</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);\">ELCE00036</td>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3211</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);\">ELCE00022</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3211</td>\n" +
                        "                    </tr>\n" +
                        "                    <tr>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;\">TUESDAY</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3209</td>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3208</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);\">CE3208</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3210</td>\n" +
                        "                    </tr>\n" +
                        "                    <tr>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;\">WEDNESDAY</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);\">ELCE00022</td>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3209</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);\">ELCE00036</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; background: #fef3c7; color: #d97706;\">CE3214/CE3215 P</td>\n" +
                        "                    </tr>\n" +
                        "                    <tr>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;\">THURSDAY</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);\">ELCE00036</td>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">ELCE00022</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3209</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; background: #fef3c7; color: #d97706;\">CE3214/CE3215 P</td>\n" +
                        "                    </tr>\n" +
                        "                    <tr>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;\">FRIDAY</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3208</td>\n" +
                        "                        <td style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3210</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);\">CE3211</td>\n" +
                        "                        <td colspan=\"2\" style=\"border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;\">CE3210</td>\n" +
                        "                    </tr>\n" +
                        "                </tbody>\n" +
                        "            </table>\n" +
                        "        </div>\n" +
                        "        <!-- MODULES LIST -->\n" +
                        "        <div style=\"margin-top: 20px; overflow-x: auto;\">\n" +
                        "            <table style=\"width: 100%; border-collapse: collapse; font-size: 0.85rem; border: 1px solid #cbd5e1;\">\n" +
                        "                <thead>\n" +
                        "                    <tr>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #0f172a; color: white; padding: 10px;\">MODULE CODE</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #0f172a; color: white; padding: 10px;\">MODULE NAME</th>\n" +
                        "                        <th style=\"border: 1px solid #cbd5e1; background: #0f172a; color: white; padding: 10px;\">MODULE TEACHER</th>\n" +
                        "                    </tr>\n" +
                        "                </thead>\n" +
                        "                <tbody>\n" +
                        "                    <tr><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;\">CE3208</td><td style=\"border: 1px solid #cbd5e1; padding: 8px;\">STRUCTURAL ANALYSIS II (T)</td><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;\">MR ALLEN</td></tr>\n" +
                        "                    <tr style=\"background: #f8fafc;\"><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;\">CE3209</td><td style=\"border: 1px solid #cbd5e1; padding: 8px;\">DESIGN OF RC STRUCTURE (T)</td><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;\">MR SANTHOSH</td></tr>\n" +
                        "                    <tr><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;\">CE3210</td><td style=\"border: 1px solid #cbd5e1; padding: 8px;\">ENVIRONMENT ENGINEERING II (T)</td><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;\">MR PRABHU</td></tr>\n" +
                        "                    <tr style=\"background: #f8fafc;\"><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;\">CE3211</td><td style=\"border: 1px solid #cbd5e1; padding: 8px;\">DESIGN OF STEEL STRUCTURE (T)</td><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;\">MR SANTHOSH</td></tr>\n" +
                        "                    <tr><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;\">ELCE00022</td><td style=\"border: 1px solid #cbd5e1; padding: 8px;\">PAVEMENT ENGINEERING (T)</td><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;\">PROF N. K. MUSHULE</td></tr>\n" +
                        "                    <tr style=\"background: #f8fafc;\"><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;\">ELCE00036</td><td style=\"border: 1px solid #cbd5e1; padding: 8px;\">HYDROLOGY AND WATER RESOURCE ENG. (T)</td><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;\">MRS DHIVYA</td></tr>\n" +
                        "                    <tr><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;\">CE3214</td><td style=\"border: 1px solid #cbd5e1; padding: 8px;\">ENVIRONMENTAL ENGINEERING LAB (P)</td><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;\">Ms MODESTER</td></tr>\n" +
                        "                    <tr style=\"background: #f8fafc;\"><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;\">CE3215</td><td style=\"border: 1px solid #cbd5e1; padding: 8px;\">STRUCTURAL DETAILING & DRAWING LAB (P)</td><td style=\"border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;\">MR JUMA</td></tr>\n" +
                        "                </tbody>\n" +
                        "            </table>\n" +
                        "        </div>\n" +
                        "    </div>");
            timetableRepository.save(tt);
        };
    }
}
