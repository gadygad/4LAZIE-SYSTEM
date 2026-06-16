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
}
