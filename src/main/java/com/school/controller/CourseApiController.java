package com.school.controller;

import com.school.model.Course;
import com.school.repository.CourseRepository;
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
public class CourseApiController {

    @Autowired
    private CourseRepository courseRepository;

    @GetMapping("/api/courses")
    public ResponseEntity<?> getCourses(@RequestParam(value = "programType", required = false) String programType) {
        List<Course> allCourses = courseRepository.findAll();
        
        if (programType != null && !programType.isEmpty()) {
            String prefix = programType.equalsIgnoreCase("DIPLOMA") ? "DIP_" : "DEG_";
            allCourses = allCourses.stream()
                .filter(c -> c.getProgramType() != null && c.getProgramType().startsWith(prefix))
                .collect(Collectors.toList());
        }
        
        List<Map<String, Object>> response = allCourses.stream().map(c -> {
            Map<String, Object> map = new HashMap<>();
            map.put("code", c.getProgramType()); // Uses programType as unique code identifier (e.g. DIP_CSE)
            map.put("name", c.getName());
            return map;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
}
