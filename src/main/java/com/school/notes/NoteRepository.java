package com.school.notes;

import com.school.notes.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Aggregation;
import java.util.List;

public interface NoteRepository extends MongoRepository<Note, String> {

    @Query("{ '$or': [ { 'title': { $regex: ?0, $options: 'i' } }, { 'category': { $regex: ?0, $options: 'i' } } ] }")
    org.springframework.data.domain.Page<Note> searchNotes(String query, org.springframework.data.domain.Pageable pageable);

    @Query("{ 'programType': ?0, 'levelNo': ?1, '$or': [ { 'title': { $regex: ?2, $options: 'i' } }, { 'category': { $regex: ?2, $options: 'i' } } ] }")
    org.springframework.data.domain.Page<Note> searchNotesByProgramAndLevel(String programType, Integer levelNo, String query, org.springframework.data.domain.Pageable pageable);

    @Query("{ 'levelNo': ?1, '$and': [ { '$or': [ { 'programType': ?0 }, { 'isGeneral': true } ] }, { '$or': [ { 'title': { $regex: ?2, $options: 'i' } }, { 'category': { $regex: ?2, $options: 'i' } } ] } ] }")
    org.springframework.data.domain.Page<Note> searchNotesByProgramAndLevelWithGeneral(String programType, Integer levelNo, String query, org.springframework.data.domain.Pageable pageable);

    @Query("{ 'programType': ?0, 'levelNo': ?1, 'semesterNo': ?2, '$or': [ { 'title': { $regex: ?3, $options: 'i' } }, { 'category': { $regex: ?3, $options: 'i' } } ] }")
    org.springframework.data.domain.Page<Note> searchNotesByProgramLevelAndSemester(String programType, Integer levelNo, Integer semesterNo, String query, org.springframework.data.domain.Pageable pageable);

    @Query("{ 'levelNo': ?1, 'semesterNo': ?2, '$and': [ { '$or': [ { 'programType': ?0 }, { 'isGeneral': true } ] }, { '$or': [ { 'title': { $regex: ?3, $options: 'i' } }, { 'category': { $regex: ?3, $options: 'i' } } ] } ] }")
    org.springframework.data.domain.Page<Note> searchNotesByProgramLevelAndSemesterWithGeneral(String programType, Integer levelNo, Integer semesterNo, String query, org.springframework.data.domain.Pageable pageable);

    @Query("{ 'programType': ?0, 'levelNo': ?1, 'semesterNo': ?2, 'category': ?3, 'title': { $regex: ?4, $options: 'i' } }")
    org.springframework.data.domain.Page<Note> searchNotesByProgramLevelSemesterAndCategory(String programType, Integer levelNo, Integer semesterNo, String category, String query, org.springframework.data.domain.Pageable pageable);

    @Query("{ 'levelNo': ?1, 'semesterNo': ?2, 'category': ?3, '$and': [ { '$or': [ { 'programType': ?0 }, { 'isGeneral': true } ] }, { 'title': { $regex: ?4, $options: 'i' } } ] }")
    org.springframework.data.domain.Page<Note> searchNotesByProgramLevelSemesterAndCategoryWithGeneral(String programType, Integer levelNo, Integer semesterNo, String category, String query, org.springframework.data.domain.Pageable pageable);

    List<Note> findByProgramTypeAndLevelNoAndSemesterNoAndCategoryOrderByIdDesc(String programType, Integer levelNo, Integer semesterNo, String category);

    // Level-only, no program filter — backs the /community folder pages,
    // which are deliberately cross-college/cross-program so a student from
    // any institution can browse and download another college's materials
    // for the same level.
    List<Note> findByLevelNoOrderByIdDesc(Integer levelNo);

    // Level + semester, no program filter — same cross-college intent as
    // findByLevelNoOrderByIdDesc, but split per semester so a folder never
    // mixes a level's Semester 1 and Semester 2 materials together.
    List<Note> findByLevelNoAndSemesterNoOrderByIdDesc(Integer levelNo, Integer semesterNo);

    @Query(value = "{ 'levelNo': ?1, 'semesterNo': ?2, 'category': ?3, '$or': [ { 'programType': ?0 }, { 'isGeneral': true } ] }", sort = "{ '_id': -1 }")
    List<Note> findByProgramTypeAndLevelNoAndSemesterNoAndCategoryWithGeneral(String programType, Integer levelNo, Integer semesterNo, String category);

    List<Note> findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(String programType, Integer levelNo, Integer semesterNo);

    @Query(value = "{ 'levelNo': ?1, 'semesterNo': ?2, '$or': [ { 'programType': ?0 }, { 'isGeneral': true } ] }", sort = "{ '_id': -1 }")
    List<Note> findByProgramTypeAndLevelNoAndSemesterNoWithGeneral(String programType, Integer levelNo, Integer semesterNo);
    
    org.springframework.data.domain.Page<Note> findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(String programType, Integer levelNo, Integer semesterNo, org.springframework.data.domain.Pageable pageable);
    
    @Query(value = "{ 'levelNo': ?1, 'semesterNo': ?2, '$or': [ { 'programType': ?0 }, { 'isGeneral': true } ] }", sort = "{ '_id': -1 }")
    org.springframework.data.domain.Page<Note> findByProgramTypeAndLevelNoAndSemesterNoWithGeneral(String programType, Integer levelNo, Integer semesterNo, org.springframework.data.domain.Pageable pageable);
    
    org.springframework.data.domain.Page<Note> findAllByOrderByIdDesc(org.springframework.data.domain.Pageable pageable);

    List<Note> findByProgramTypeAndLevelNoOrderByIdDesc(String programType, Integer levelNo);

    @Query("{ '$or': [ { 'programType': ?0 }, { 'isGeneral': true } ] }")
    List<Note> findByProgramTypeWithGeneral(String programType, org.springframework.data.domain.Pageable pageable);

    @Query(value = "{ 'levelNo': ?1, '$or': [ { 'programType': ?0 }, { 'isGeneral': true } ] }", sort = "{ '_id': -1 }")
    List<Note> findByProgramTypeAndLevelNoWithGeneral(String programType, Integer levelNo);

    List<Note> findAllByOrderByIdDesc();

    
    List<Note> findTop3ByOrderByDownloadCountDesc();
    List<Note> findTop5ByOrderByDownloadCountDesc();

    List<Note> findTop5ByInstitutionIdOrderByDownloadCountDesc(String institutionId);

    List<Note> findTop5ByOrderByUploadDateDesc();

    List<Note> findTop5ByInstitutionIdOrderByUploadDateDesc(String institutionId);

    List<Note> findByInstitutionIdAndProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(String institutionId, String programType, Integer levelNo, Integer semesterNo);

    boolean existsByInstitutionIdAndProgramType(String institutionId, String programType);

    boolean existsByTitleIgnoreCaseAndProgramTypeAndLevelNoAndSemesterNoAndModuleNameIgnoreCaseAndUnitNumber(String title, String programType, Integer levelNo, Integer semesterNo, String moduleName, Integer unitNumber);


    List<Note> findByCategoryIgnoreCaseOrderByIdDesc(String category);

    class AggregationCount {
        private Long total;
        public Long getTotal() { return total; }
        public void setTotal(Long total) { this.total = total; }
    }

    @Aggregation(pipeline = {
        "{ '$group': { '_id': null, 'total': { '$sum': '$downloadCount' } } }"
    })
    AggregationCount aggregateTotalDownloadCount();

    default Long getTotalDownloadCount() {
        AggregationCount count = aggregateTotalDownloadCount();
        return (count != null && count.getTotal() != null) ? count.getTotal() : 0L;
    }

    @Aggregation(pipeline = {
        "{ '$group': { '_id': null, 'total': { '$sum': '$viewCount' } } }"
    })
    AggregationCount aggregateTotalViewCount();

    default Long getTotalViewCount() {
        AggregationCount count = aggregateTotalViewCount();
        return (count != null && count.getTotal() != null) ? count.getTotal() : 0L;
    }

    @org.springframework.cache.annotation.Cacheable(value = "popularNotes", key = "'top3-' + #category")
    List<Note> findTop3ByCategoryOrderByIdDesc(String category);
    
    @org.springframework.cache.annotation.Cacheable(value = "popularNotes", key = "'top10-' + #category")
    List<Note> findTop10ByCategoryOrderByIdDesc(String category);


    
    // Fetch latest 10 notes across all categories
    List<Note> findTop10ByOrderByIdDesc();
    List<Note> findTop50ByOrderByIdDesc();
    // Wide enough pool for the /community folder picker to reliably see
    // every (level, semester) combo with notes, not just whichever ones
    // happened to be uploaded most recently — findTop50 was recency-biased
    // enough that an entire program type (e.g. all of Degree) could vanish
    // from the picker just because Diploma content was uploaded more
    // recently, even though Degree notes still existed.
    List<Note> findTop500ByOrderByIdDesc();
    List<Note> findTop6ByOrderByIdDesc();

    @Aggregation(pipeline = {
        "{ '$group': { '_id': '$moduleName' } }"
    })
    List<String> findDistinctModuleNames();

    long countByUploadDateAfter(java.time.LocalDateTime date);
}
