package com.school.academic;

import com.school.academic.Timetable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
import java.util.List;

public interface TimetableRepository extends MongoRepository<Timetable, String> {
    Optional<Timetable> findByProgramTypeAndLevelNoAndSemesterNoAndAcademicYear(String programType, Integer levelNo, Integer semesterNo, String academicYear);

    // The explicit "current" pick for this program/level/semester — see
    // Timetable.isCurrent for why this replaced inferring it from academic
    // year strings.
    Optional<Timetable> findByProgramTypeAndLevelNoAndSemesterNoAndIsCurrentTrue(String programType, Integer levelNo, Integer semesterNo);

    // Existence check for "is this the first upload ever for this group".
    // Deliberately not a single-result Optional finder on these three
    // fields alone — that shape throws IncorrectResultSizeDataAccessException
    // the moment a group has more than one academic year on record, which
    // is now the normal case once anything's been archived.
    boolean existsByProgramTypeAndLevelNoAndSemesterNo(String programType, Integer levelNo, Integer semesterNo);

    // Custom query to find distinct academic years for a program/level
    @org.springframework.data.mongodb.repository.Query(value="{ 'programType' : ?0, 'levelNo' : ?1, 'semesterNo' : ?2 }")
    List<Timetable> findDistinctAcademicYears(String programType, Integer levelNo, Integer semesterNo); // We'll map this to get unique years in service

    // To list all timetables for the admin panel
    List<Timetable> findAllByOrderByUploadDateDesc();
}
