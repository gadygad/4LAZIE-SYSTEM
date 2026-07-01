package com.school.repository;

import com.school.model.Timetable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;

public interface TimetableRepository extends MongoRepository<Timetable, String> {
    Optional<Timetable> findByProgramTypeAndLevelNoAndSemesterNo(String programType, Integer levelNo, Integer semesterNo);
    
    // To list all timetables for the admin panel
    List<Timetable> findAllByOrderByUploadDateDesc();
}
