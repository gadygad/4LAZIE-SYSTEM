package com.school;

import com.school.repository.SubjectRepository;
import com.school.model.Subject;
import com.school.model.Course;
import com.school.repository.CourseRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class TestRunner implements CommandLineRunner {
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("================= STARTING TEST =================");
        List<Course> courses = courseRepository.findByProgramType("DIP_CSE");
        if (courses.isEmpty()) {
            System.out.println("No DIP_CSE course found.");
            return;
        }
        Course course = courses.get(0);
        System.out.println("Course ID: " + course.getId());
        
        List<Subject> subjects1 = subjectRepository.findByCourseAndLevelNoAndSemesterNo(course, 5, 2);
        System.out.println("findByCourseAndLevelNoAndSemesterNo size: " + subjects1.size());
        
        List<Subject> subjects2 = subjectRepository.findByCourseAndLevelNoAndSemesterNoOrderByIdAsc(course, 5, 2);
        System.out.println("findByCourseAndLevelNoAndSemesterNoOrderByIdAsc size: " + subjects2.size());
        
        System.out.println("================= ENDING TEST =================");
        System.exit(0);
    }
}
