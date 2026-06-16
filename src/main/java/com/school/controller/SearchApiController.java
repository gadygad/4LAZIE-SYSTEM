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
        List<Note> allMatches = noteRepository.searchNotes(query.trim());
        List<Note> topResults = allMatches.stream()
                .filter(Note::getIsPublic)
                .limit(5)
                .collect(Collectors.toList());

        List<Map<String, Object>> results = topResults.stream().map(note -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", note.getId());
            map.put("title", note.getTitle());
            map.put("category", note.getCategory());
            map.put("levelNo", note.getLevelNo());
            return map;
        }).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("results", results);
        response.put("totalMatches", allMatches.size());

        return ResponseEntity.ok(response);
    }
}
