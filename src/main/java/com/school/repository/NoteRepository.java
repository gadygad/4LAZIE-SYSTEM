package com.school.repository;

import com.school.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {

    @Query("SELECT n FROM Note n WHERE LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) " +
           "OR LOWER(n.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Note> searchNotes(@Param("query") String query);

    @Query("SELECT n FROM Note n WHERE n.programType = :programType AND n.levelNo = :levelNo AND " +
           "(LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(n.category) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Note> searchNotesByProgramAndLevel(@Param("programType") String programType, @Param("levelNo") Integer levelNo, @Param("query") String query);

    @Query("SELECT n FROM Note n WHERE n.programType = :programType AND n.levelNo = :levelNo AND n.semesterNo = :semesterNo AND " +
           "(LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(n.category) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Note> searchNotesByProgramLevelAndSemester(@Param("programType") String programType, @Param("levelNo") Integer levelNo, @Param("semesterNo") Integer semesterNo, @Param("query") String query);

    @Query("SELECT n FROM Note n WHERE n.programType = :programType AND n.levelNo = :levelNo AND n.semesterNo = :semesterNo AND n.category = :category AND " +
           "LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Note> searchNotesByProgramLevelSemesterAndCategory(@Param("programType") String programType, @Param("levelNo") Integer levelNo, @Param("semesterNo") Integer semesterNo, @Param("category") String category, @Param("query") String query);

    List<Note> findByProgramTypeAndLevelNoAndSemesterNoAndCategoryOrderByIdDesc(String programType, Integer levelNo, Integer semesterNo, String category);

    List<Note> findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(String programType, Integer levelNo, Integer semesterNo);

    List<Note> findByProgramTypeAndLevelNoOrderByIdDesc(String programType, Integer levelNo);

    List<Note> findAllByOrderByIdDesc();

    List<Note> findTop5ByOrderByDownloadCountDesc();

    List<Note> findTop5ByInstitutionIdOrderByDownloadCountDesc(Long institutionId);

    List<Note> findTop5ByOrderByUploadDateDesc();

    List<Note> findTop5ByInstitutionIdOrderByUploadDateDesc(Long institutionId);

    List<Note> findByInstitutionIdAndProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(Long institutionId, String programType, Integer levelNo, Integer semesterNo);

    boolean existsByTitleIgnoreCaseAndProgramTypeAndLevelNoAndSemesterNoAndModuleNameIgnoreCaseAndUnitNumber(String title, String programType, Integer levelNo, Integer semesterNo, String moduleName, Integer unitNumber);

    List<Note> findByCategoryOrderByIdDesc(String category);

    // ── Queries Bora (Badala ya findAll() + stream) ─────────────────────────

    /** Jumla ya downloads zote — haraka zaidi kuliko findAll().stream().sum() */
    @Query("SELECT COALESCE(SUM(n.downloadCount), 0) FROM Note n")
    Long getTotalDownloadCount();

    /** Notes 3 za hivi karibuni kwa category — badala ya findAll().filter().limit(3) */
    List<Note> findTop3ByCategoryOrderByIdDesc(String category);

    /** Majina tofauti ya modules — badala ya findAll().stream().distinct() */
    @Query("SELECT DISTINCT n.moduleName FROM Note n WHERE n.moduleName IS NOT NULL AND n.moduleName <> '' ORDER BY n.moduleName")
    List<String> findDistinctModuleNames();
}
