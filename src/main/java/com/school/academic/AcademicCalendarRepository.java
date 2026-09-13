package com.school.academic;

import com.school.academic.AcademicCalendar;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
import java.util.Optional;

public interface AcademicCalendarRepository extends MongoRepository<AcademicCalendar, String> {
    // Legacy, unscoped lookup — kept only for records predating multi-college
    // support and for a currentInstitution-resolution failure to fall back
    // on. Every normal caller should use the institution-scoped variants
    // below instead.
    Optional<AcademicCalendar> findByIsCurrentTrue();

    Optional<AcademicCalendar> findByInstitutionIdAndIsCurrentTrue(String institutionId);
    List<AcademicCalendar> findByInstitutionId(String institutionId);
    boolean existsByInstitutionId(String institutionId);
}
