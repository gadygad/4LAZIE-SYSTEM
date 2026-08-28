package com.school.academic;

import com.school.academic.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;

public interface CourseRepository extends MongoRepository<Course, String> {
    
    @Cacheable(value = "coursesByProgram", key = "#programType")
    List<Course> findByProgramType(String programType);

    @Override
    @Cacheable("allCourses")
    List<Course> findAll();
}
