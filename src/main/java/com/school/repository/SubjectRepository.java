package com.school.repository;

import com.school.model.Subject;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<Subject, Long> {
    List<Subject> findByCourseId(Long courseId);
    List<Subject> findByCourseIdAndSemesterNo(Long courseId, Integer semesterNo);
    List<Subject> findByCourseIdAndLevelNoAndSemesterNo(Long courseId, Integer levelNo, Integer semesterNo);
}
