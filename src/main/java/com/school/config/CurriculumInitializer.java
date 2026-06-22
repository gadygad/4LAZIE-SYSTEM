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

    @Bean
    public CommandLineRunner initCurriculumData(CourseRepository courseRepository, SubjectRepository subjectRepository) {
        return args -> {
            // Check if course already exists for CSE
            List<Course> coursesCSE = courseRepository.findByProgramType("DIP_CSE");
            Course diplomaCSE;
            if (coursesCSE.isEmpty()) {
                diplomaCSE = new Course("DIPLOMA IN CSE", "DIP_CSE");
                diplomaCSE = courseRepository.save(diplomaCSE);
            } else {
                diplomaCSE = coursesCSE.get(0);
            }

            // Check if course already exists for IT
            List<Course> coursesIT = courseRepository.findByProgramType("DIP_IT");
            Course diplomaIT;
            if (coursesIT.isEmpty()) {
                diplomaIT = new Course("DIPLOMA IN IT", "DIP_IT");
                diplomaIT = courseRepository.save(diplomaIT);
            } else {
                diplomaIT = coursesIT.get(0);
            }

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
            
            // Cleanup unwanted subjects
            for (Subject s : existingSubjectsCSE) {
                if (!moduleNamesCSE.contains(s.getName())) {
                    subjectRepository.delete(s);
                }
            }

            // Reload existing subjects after cleanup
            existingSubjectsCSE = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaCSE.getId(), 5, 2);

            // Add missing subjects for CSE
            for (String name : moduleNamesCSE) {
                boolean exists = existingSubjectsCSE.stream().anyMatch(s -> s.getName().equals(name));
                if (!exists) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(2);
                    subject.setLevelNo(5);
                    subject.setCourse(diplomaCSE);
                    subject.setCode(""); // Removed module code as requested
                    subjectRepository.save(subject);
                }
            }
            
            // Update existing ones to remove code for CSE
            for (Subject s : existingSubjectsCSE) {
                if (s.getCode() != null && !s.getCode().isEmpty()) {
                    s.setCode("");
                    subjectRepository.save(s);
                }
            }

            // Target subjects for IT Level 5 Sem 2
            List<String> moduleNamesIT = Arrays.asList(
                    "WEB DESIGNING"
            );

            List<Subject> existingSubjectsIT = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaIT.getId(), 5, 2);
            
            // Cleanup unwanted subjects for IT
            for (Subject s : existingSubjectsIT) {
                if (!moduleNamesIT.contains(s.getName())) {
                    subjectRepository.delete(s);
                }
            }

            // Reload existing subjects after cleanup
            existingSubjectsIT = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaIT.getId(), 5, 2);

            // Add missing subjects for IT
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
            
            // Update existing ones to remove code for IT
            for (Subject s : existingSubjectsIT) {
                if (s.getCode() != null && !s.getCode().isEmpty()) {
                    s.setCode("");
                    subjectRepository.save(s);
                }
            }

            // Add general subjects for Level 5 Semester 1 to all courses
            List<Course> allCourses = courseRepository.findAll();
            List<String> generalLevel5Sem1 = Arrays.asList(
                    "ENGINEERING ENTREPRENEURSHIP",
                    "ENGINEERING MATHEMATICS",
                    "APPLIED CHEMISTRY"
            );
            
            for (Course course : allCourses) {
                List<Subject> existingLevel5Sem1 = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(course.getId(), 5, 1);
                
                // Cleanup unwanted subjects for Level 5 Sem 1
                for (Subject s : existingLevel5Sem1) {
                    if (!generalLevel5Sem1.contains(s.getName())) {
                        subjectRepository.delete(s);
                    }
                }

                // Reload after cleanup
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
            // Add specific subjects for CSE Level 5 Sem 1
            List<String> cseLevel5Sem1 = Arrays.asList(
                    "OBJECT ORIENTED PROGRAMMING WITH JAVA",
                    "BASIC VISUAL PROGRAMMING",
                    "OPERATING SYSTEM"
            );
            
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
