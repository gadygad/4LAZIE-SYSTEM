package com.school.controller;

import com.school.model.Note;
import com.school.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class SearchApiController {

    @Autowired
    private NoteRepository noteRepository;

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
            @RequestParam("program") String program,
            @RequestParam("semester") Integer semester,
            @RequestParam(value = "level", required = false) Integer level) {
            
        // Query the database for the matching notes
        List<Note> notes = noteRepository.findByCategoryOrderByIdDesc(category);
        
        List<Map<String, Object>> results = notes.stream()
                .filter(n -> program.equalsIgnoreCase(n.getProgramType()) || 
                             (n.getProgramType() != null && n.getProgramType().toLowerCase().contains(program.toLowerCase())))
                .filter(n -> semester.equals(n.getSemesterNo()))
                .filter(n -> level == null || level.equals(n.getLevelNo()))
                .filter(n -> Boolean.TRUE.equals(n.getIsPublic()))
                .map(note -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", note.getId());
                    map.put("title", note.getTitle());
                    map.put("moduleName", note.getModuleName());
                    map.put("year", note.getAcademicYear());
                    map.put("fileUrl", note.getFileUrl());
                    return map;
                }).collect(Collectors.toList());

        return ResponseEntity.ok(results);
    }
}
