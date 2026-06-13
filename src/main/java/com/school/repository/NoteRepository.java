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

    @Query("SELECT n FROM Note n WHERE n.levelNo = :levelNo AND " +
           "(LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(n.category) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Note> searchNotesByLevel(@Param("levelNo") Integer levelNo, @Param("query") String query);

    @Query("SELECT n FROM Note n WHERE n.levelNo = :levelNo AND n.semesterNo = :semesterNo AND " +
           "(LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(n.category) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Note> searchNotesByLevelAndSemester(@Param("levelNo") Integer levelNo, @Param("semesterNo") Integer semesterNo, @Param("query") String query);

    @Query("SELECT n FROM Note n WHERE n.levelNo = :levelNo AND n.semesterNo = :semesterNo AND n.category = :category AND " +
           "LOWER(n.title) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Note> searchNotesByLevelSemesterAndCategory(@Param("levelNo") Integer levelNo, @Param("semesterNo") Integer semesterNo, @Param("category") String category, @Param("query") String query);

    List<Note> findByLevelNoAndSemesterNoAndCategoryOrderByIdDesc(Integer levelNo, Integer semesterNo, String category);

    List<Note> findByLevelNoAndSemesterNoOrderByIdDesc(Integer levelNo, Integer semesterNo);

    List<Note> findByLevelNoOrderByIdDesc(Integer levelNo);

    List<Note> findAllByOrderByIdDesc();

    List<Note> findTop5ByOrderByDownloadCountDesc();

    List<Note> findTop5ByOrderByUploadDateDesc();
}
