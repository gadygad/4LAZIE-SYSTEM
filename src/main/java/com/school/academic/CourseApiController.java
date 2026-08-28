package com.school.academic;

import com.school.academic.Course;
import com.school.academic.Subject;
import com.school.academic.CourseRepository;
import com.school.academic.SubjectRepository;
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

    private CourseRepository courseRepository;
    private SubjectRepository subjectRepository;
    private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    public CourseApiController(CourseRepository courseRepository, SubjectRepository subjectRepository, org.springframework.data.mongodb.core.MongoTemplate mongoTemplate) {
        this.courseRepository = courseRepository;
        this.subjectRepository = subjectRepository;
        this.mongoTemplate = mongoTemplate;
    }


    @GetMapping("/api/courses")
    public ResponseEntity<?> getCourses(@RequestParam(value = "programType", required = false) String programType) {
        List<Course> allCourses = courseRepository.findAll();
        
        if (programType != null && !programType.isEmpty()) {
            String prefix = programType.equalsIgnoreCase("DIPLOMA") ? "DIP_" : "DEG_";
            allCourses = allCourses.stream()
                .filter(c -> c.getProgramType() != null && c.getProgramType().startsWith(prefix))
                .collect(Collectors.toList());
        }
        
        // Fetch raw documents to avoid Spring Data MongoDB N+1 DBRef eager fetching overhead
        List<org.bson.Document> subjectDocs = mongoTemplate.find(new org.springframework.data.mongodb.core.query.Query(), org.bson.Document.class, "subjects");
        
        // Group subjects by course id manually
        Map<String, List<Map<String, Object>>> subjectsByCourseId = new HashMap<>();
        for (org.bson.Document doc : subjectDocs) {
            Object courseRef = doc.get("course");
            String courseId = null;
            if (courseRef instanceof com.mongodb.DBRef) {
                courseId = ((com.mongodb.DBRef) courseRef).getId().toString();
            } else if (courseRef instanceof org.bson.Document) {
                Object idObj = ((org.bson.Document) courseRef).get("$id");
                if (idObj != null) courseId = idObj.toString();
            }
            if (courseId != null) {
                Map<String, Object> smap = new HashMap<>();
                smap.put("code", doc.getString("code") != null ? doc.getString("code") : "");
                smap.put("name", doc.getString("name") != null ? doc.getString("name") : "");
                smap.put("semesterNo", doc.getInteger("semesterNo"));
                smap.put("levelNo", doc.getInteger("levelNo"));
                
                subjectsByCourseId.computeIfAbsent(courseId, k -> new java.util.ArrayList<>()).add(smap);
            }
        }

        List<Map<String, Object>> response = allCourses.stream().map(c -> {
            Map<String, Object> map = new HashMap<>();
            map.put("code", c.getProgramType()); // Uses programType as unique code identifier (e.g. DIP_CSE)
            map.put("name", c.getName());

            List<Map<String, Object>> subjList = subjectsByCourseId.getOrDefault(c.getId(), List.of());
            map.put("subjects", subjList);

            return map;
        }).collect(Collectors.toList());
        
        return ResponseEntity.ok(response);
    }
}
