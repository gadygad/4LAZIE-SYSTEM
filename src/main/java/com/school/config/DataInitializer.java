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
public class DataInitializer {

    @Bean
    public CommandLineRunner initData(CourseRepository courseRepository, SubjectRepository subjectRepository) {
        return args -> {
            // Check if course already exists
            List<Course> courses = courseRepository.findByProgramType("DIP_IT");
            Course diplomaIT;
            if (courses.isEmpty()) {
                diplomaIT = new Course("DIPLOMA IN IT", "DIP_IT");
                diplomaIT = courseRepository.save(diplomaIT);
            } else {
                diplomaIT = courses.get(0);
            }

            // Check if subjects for level 5 semester 2 exist
            List<Subject> existingSubjects = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(diplomaIT.getId(), 5, 2);
            if (existingSubjects.isEmpty()) {
                List<String> moduleNames = Arrays.asList(
                        "SERVER ADMINISTRATION",
                        "COMPUTER NETWORKS",
                        "COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE",
                        "WEB DESIGNING",
                        "BASIC DATA COMMUNICATION"
                );

                for (String name : moduleNames) {
                    Subject subject = new Subject();
                    subject.setName(name);
                    subject.setSemesterNo(2);
                    subject.setLevelNo(5);
                    subject.setCourse(diplomaIT);
                    subject.setCode("DIP" + (520 + moduleNames.indexOf(name) + 1));
                    subjectRepository.save(subject);
                }
            }
        };
    }
}
