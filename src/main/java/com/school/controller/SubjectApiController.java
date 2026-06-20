package com.school.controller;

import com.school.model.Course;
import com.school.model.Subject;
import com.school.repository.CourseRepository;
import com.school.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class SubjectApiController {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping("/api/subjects")
    public ResponseEntity<?> getSubjects(
            @RequestParam("programType") String programType,
            @RequestParam("levelNo") Integer levelNo,
            @RequestParam("semesterNo") Integer semesterNo) {
        
        List<Course> courses = courseRepository.findByProgramType(programType);
        if (courses.isEmpty()) {
            return ResponseEntity.ok(List.of()); // Return empty list if course not found
        }
        
        Course course = courses.get(0); // Assuming one course per program type for simplicity
        
        List<Subject> subjects = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(course.getId(), levelNo, semesterNo);
        
        // Map to avoid infinite recursion with lazy loaded Course
        List<Map<String, Object>> response = subjects.stream().map(s -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", s.getId());
            map.put("name", s.getName());
            map.put("code", s.getCode());
            return map;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
}
