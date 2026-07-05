package com.school.repository;

import com.school.model.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    
    @Cacheable(value = "coursesByProgram", key = "#programType")
    List<Course> findByProgramType(String programType);

    @Override
    @Cacheable("allCourses")
    List<Course> findAll();
}
