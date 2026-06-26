package com.school.repository;

import com.school.model.Subject;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubjectRepository extends MongoRepository<Subject, String> {
    List<Subject> findByCourseId(String courseId);
    List<Subject> findByCourseIdAndSemesterNo(String courseId, Integer semesterNo);
    List<Subject> findByCourseIdAndLevelNoAndSemesterNo(String courseId, Integer levelNo, Integer semesterNo);
    List<Subject> findByCourseIdAndLevelNoAndSemesterNoOrderByIdAsc(String courseId, Integer levelNo, Integer semesterNo);
}
