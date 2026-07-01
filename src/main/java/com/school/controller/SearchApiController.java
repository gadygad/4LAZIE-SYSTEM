package com.school.controller;

import com.school.model.Note;
import com.school.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.domain.Sort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class SearchApiController {

    @Autowired
    private NoteRepository noteRepository;
    
    @Autowired
    private MongoTemplate mongoTemplate;

    private static final Logger logger = LoggerFactory.getLogger(SearchApiController.class);

    @GetMapping("/api/search")
    public ResponseEntity<Map<String, Object>> searchNotes(@RequestParam("q") String query) {
        org.springframework.data.domain.Page<Note> matchesPage = noteRepository.searchNotes(query.trim(), org.springframework.data.domain.PageRequest.of(0, 50));
        List<Note> allMatches = matchesPage.getContent();
        List<Note> topResults = allMatches.stream()
                .filter(n -> n != null && Boolean.TRUE.equals(n.getIsPublic()))
                .limit(5)
                .collect(Collectors.toList());

        List<Map<String, Object>> results = topResults.stream().map(note -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", note.getId());
            map.put("title", note.getTitle());
            map.put("category", note.getCategory());
            map.put("levelNo", note.getLevelNo());
            map.put("fileUrl", note.getFileUrl());
            return map;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("results", results);
        response.put("totalMatches", matchesPage.getTotalElements());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/api/notes/filter")
    public ResponseEntity<List<Map<String, Object>>> filterNotes(
            @RequestParam("category") String category,
            @RequestParam(value = "program", required = false) String program,
            @RequestParam(value = "semester", required = false) Integer semester,
            @RequestParam(value = "level", required = false) Integer level) {
            
        logger.info("API Called with: category={}, program={}, semester={}, level={}", category, program, semester, level);

        Query query = new Query();
        query.addCriteria(Criteria.where("category").regex("^" + category + "$", "i"));
        // Assuming we only want public notes for API filtering
        query.addCriteria(Criteria.where("isPublic").is(true));
        
        if (program != null && !program.isEmpty()) {
            query.addCriteria(Criteria.where("programType").regex(program, "i"));
        }
        if (semester != null) {
            query.addCriteria(Criteria.where("semesterNo").is(semester));
        }
        if (level != null) {
            query.addCriteria(Criteria.where("levelNo").is(level));
        }
        query.with(Sort.by(Sort.Direction.DESC, "id"));

        List<Note> notes = mongoTemplate.find(query, Note.class);
        logger.info("Found {} notes after database filtering", notes.size());
        
        List<Map<String, Object>> results = notes.stream()
                .map(note -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", note.getId());
                    map.put("title", note.getTitle());
                    map.put("moduleName", note.getModuleName());
                    map.put("year", note.getAcademicYear());
                    map.put("fileUrl", note.getFileUrl());
                    map.put("viewCount", note.getViewCount() != null ? note.getViewCount() : 0);
                    map.put("downloadCount", note.getDownloadCount() != null ? note.getDownloadCount() : 0);
                    map.put("semester", note.getSemesterNo() != null ? note.getSemesterNo() : 1);
                    return map;
                }).collect(Collectors.toList());

        return ResponseEntity.ok(results);
    }
}
