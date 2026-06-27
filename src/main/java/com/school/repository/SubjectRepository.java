package com.school.repository;

import com.school.model.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;

@Repository
public interface SubjectRepository extends MongoRepository<Subject, String> {
    List<Subject> findByCourseId(String courseId);
    List<Subject> findByCourseIdAndSemesterNo(String courseId, Integer semesterNo);
    List<Subject> findByCourseIdAndLevelNoAndSemesterNo(String courseId, Integer levelNo, Integer semesterNo);
    
    @Cacheable(value = "subjectsByCourseLevelSemester", key = "#courseId + '-' + #levelNo + '-' + #semesterNo")
    List<Subject> findByCourseIdAndLevelNoAndSemesterNoOrderByIdAsc(String courseId, Integer levelNo, Integer semesterNo);
}
