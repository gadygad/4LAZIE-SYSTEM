package com.school.academic;

import com.school.academic.Subject;
import com.school.academic.Course;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;

public interface SubjectRepository extends MongoRepository<Subject, String> {
    List<Subject> findByCourse(Course course);
    List<Subject> findByCourseAndSemesterNo(Course course, Integer semesterNo);
    List<Subject> findByCourseAndLevelNoAndSemesterNo(Course course, Integer levelNo, Integer semesterNo);
    
    @Cacheable(value = "subjectsByCourseLevelSemester", key = "#course.id + '-' + #levelNo + '-' + #semesterNo")
    List<Subject> findByCourseAndLevelNoAndSemesterNoOrderByIdAsc(Course course, Integer levelNo, Integer semesterNo);

    // Used to resolve which other courses actually teach a subject with this
    // exact name at this level/semester, for the "General Subject" upload
    // toggle — deliberately not scoped to a single course.
    List<Subject> findByNameIgnoreCaseAndLevelNoAndSemesterNo(String name, Integer levelNo, Integer semesterNo);
}
