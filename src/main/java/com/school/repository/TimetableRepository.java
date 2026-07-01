package com.school.repository;

import com.school.model.Timetable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;

public interface TimetableRepository extends MongoRepository<Timetable, String> {
    Optional<Timetable> findByProgramTypeAndLevelNoAndSemesterNo(String programType, Integer levelNo, Integer semesterNo);
    
    Optional<Timetable> findByProgramTypeAndLevelNoAndSemesterNoAndAcademicYear(String programType, Integer levelNo, Integer semesterNo, String academicYear);
    
    // Custom query to find distinct academic years for a program/level
    @org.springframework.data.mongodb.repository.Query(value="{ 'programType' : ?0, 'levelNo' : ?1, 'semesterNo' : ?2 }")
    List<Timetable> findDistinctAcademicYears(String programType, Integer levelNo, Integer semesterNo); // We'll map this to get unique years in service

    // To list all timetables for the admin panel
    List<Timetable> findAllByOrderByUploadDateDesc();
}
