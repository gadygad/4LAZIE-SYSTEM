package com.school.academic;

import com.school.academic.Institution;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InstitutionRepository extends MongoRepository<Institution, String> {

    // Institutions rarely change but findAll() is now called on every single
    // page load via GlobalSidebarAdvice (for the college banner, sidebar
    // "other universities" list, etc.) — same caching pattern as
    // CourseRepository#findAll, evicted by InstitutionAdminController
    // whenever a college is added, edited, or deleted.
    @Override
    @Cacheable("allInstitutions")
    List<Institution> findAll();
}
