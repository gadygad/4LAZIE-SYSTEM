package com.school.forum.controller;

import com.school.auth.User;
import com.school.auth.AuthUtil;
import com.school.notes.Note;
import com.school.notes.NoteRepository;
import com.school.notes.NoteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class ForumFolderController {

    private static final Logger log = LoggerFactory.getLogger(ForumFolderController.class);

    @Autowired private AuthUtil authUtil;
    @Autowired private NoteRepository noteRepository;
    @Autowired private NoteService noteService;

    @GetMapping("/community/folder/{level}")
    public String showFolder(@PathVariable("level") Integer level, Model model) {
        User user = authUtil.getLoggedInUser();
        model.addAttribute("user", user);
        
        List<Note> allNotes = noteRepository.findAll();
        List<Note> levelNotes = allNotes.stream()
            .filter(n -> n.getLevelNo() != null && n.getLevelNo().equals(level))
            .sorted((a, b) -> b.getId().compareTo(a.getId()))
            .collect(Collectors.toList());
            
        model.addAttribute("level", level);
        model.addAttribute("notes", levelNotes);

        // Group by subject (moduleName) so a student can tell at a glance
        // which subject's materials a folder holds instead of one long
        // undifferentiated list — levelNotes is already newest-first, and
        // LinkedHashMap preserves that ordering across groups too.
        java.util.Map<String, List<Note>> notesBySubject = new java.util.LinkedHashMap<>();
        for (Note n : levelNotes) {
            String subject = (n.getModuleName() != null && !n.getModuleName().isBlank())
                    ? n.getModuleName() : "Other Materials";
            notesBySubject.computeIfAbsent(subject, k -> new java.util.ArrayList<>()).add(n);
        }
        model.addAttribute("notesBySubject", notesBySubject);

        // We also need latestFolders for the sidebar
        List<Note> recentNotes = noteRepository.findTop50ByOrderByIdDesc();
        java.util.Map<Integer, List<Note>> notesByLevel = recentNotes.stream()
            .filter(n -> n.getLevelNo() != null)
            .collect(java.util.stream.Collectors.groupingBy(Note::getLevelNo));
            
        List<java.util.Map<String, Object>> latestFolders = notesByLevel.entrySet().stream()
            .sorted(java.util.Map.Entry.<Integer, List<Note>>comparingByKey())
            .limit(4)
            .map(e -> {
                java.util.Map<String, Object> map = new java.util.HashMap<>();
                Integer lvl = e.getKey();
                String levelStr = (lvl >= 4) ? "LEVEL " + lvl : "YEAR " + lvl;
                map.put("year", levelStr);
                map.put("levelNo", lvl);
                map.put("count", (long) e.getValue().size());
                map.put("notes", e.getValue().stream().limit(5).collect(Collectors.toList()));
                return map;
            })
            .collect(Collectors.toList());
        model.addAttribute("latestFolders", latestFolders);

        return "forum/folder";
    }

    /** Zips every note for this level, across every college/program — matches
     * exactly what showFolder() above lists on the page, unlike the older
     * /notes/download/level/{level} endpoint which is scoped to one program. */
    @GetMapping("/community/folder/{level}/download-all")
    @ResponseBody
    public ResponseEntity<ByteArrayResource> downloadAll(@PathVariable("level") Integer level) {
        try {
            byte[] zipBytes = noteService.createAllNotesZipForLevel(level);
            if (zipBytes == null) {
                return ResponseEntity.notFound().build();
            }
            ByteArrayResource resource = new ByteArrayResource(zipBytes);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"level-" + level + "-all-materials.zip\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .contentLength(zipBytes.length)
                    .body(resource);
        } catch (IOException e) {
            log.error("Failed to generate level {} zip", level, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
