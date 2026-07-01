package com.school.repository;

import com.school.model.AcademicCalendar;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface AcademicCalendarRepository extends MongoRepository<AcademicCalendar, String> {
    Optional<AcademicCalendar> findByIsCurrentTrue();
}
