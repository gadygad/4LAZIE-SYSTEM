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

    /** NTA levels (Diploma) start at 4; below that it's a Degree "Year". */
    private static String levelLabel(Integer level) {
        return (level != null && level >= 4) ? "NTA Level " + level : "Year " + level;
    }

    @GetMapping("/community/folder/{level}/{semester}")
    public String showFolder(@PathVariable("level") Integer level, @PathVariable("semester") Integer semester, Model model) {
        User user = authUtil.getLoggedInUser();
        model.addAttribute("user", user);

        List<Note> levelNotes = noteRepository.findByLevelNoAndSemesterNoOrderByIdDesc(level, semester);

        model.addAttribute("level", level);
        model.addAttribute("semester", semester);
        model.addAttribute("levelLabel", levelLabel(level));
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

        model.addAttribute("latestFolders", buildLatestFolders());

        return "forum/folder";
    }

    /** Zips every note for this level+semester, across every college/program
     * — matches exactly what showFolder() above lists on the page, unlike
     * the older /notes/download/level/{level} endpoint which is scoped to
     * one program. */
    @GetMapping("/community/folder/{level}/{semester}/download-all")
    @ResponseBody
    public ResponseEntity<ByteArrayResource> downloadAll(@PathVariable("level") Integer level, @PathVariable("semester") Integer semester) {
        try {
            byte[] zipBytes = noteService.createAllNotesZipForLevelAndSemester(level, semester);
            if (zipBytes == null) {
                return ResponseEntity.notFound().build();
            }
            ByteArrayResource resource = new ByteArrayResource(zipBytes);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"level-" + level + "-semester-" + semester + "-all-materials.zip\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .contentLength(zipBytes.length)
                    .body(resource);
        } catch (IOException e) {
            log.error("Failed to generate level {} semester {} zip", level, semester, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    /** Folder cards shown in sidebars — one per (level, semester) combo that
     * actually has notes, newest-uploaded-first among the most recent 50. */
    private List<java.util.Map<String, Object>> buildLatestFolders() {
        List<Note> recentNotes = noteRepository.findTop50ByOrderByIdDesc();
        java.util.Map<java.util.List<Integer>, List<Note>> grouped = recentNotes.stream()
                .filter(n -> n.getLevelNo() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        n -> java.util.Arrays.asList(n.getLevelNo(), n.getSemesterNo() != null ? n.getSemesterNo() : 0)));

        return grouped.entrySet().stream()
                .sorted((a, b) -> {
                    int levelCompare = a.getKey().get(0).compareTo(b.getKey().get(0));
                    return levelCompare != 0 ? levelCompare : a.getKey().get(1).compareTo(b.getKey().get(1));
                })
                .limit(6)
                .map(e -> {
                    java.util.Map<String, Object> map = new java.util.HashMap<>();
                    Integer lvl = e.getKey().get(0);
                    Integer sem = e.getKey().get(1);
                    map.put("year", levelLabel(lvl) + (sem > 0 ? " · Sem " + sem : ""));
                    map.put("levelNo", lvl);
                    map.put("semesterNo", sem > 0 ? sem : 1);
                    map.put("count", (long) e.getValue().size());
                    map.put("notes", e.getValue().stream().limit(5).collect(Collectors.toList()));
                    return map;
                })
                .collect(Collectors.toList());
    }
}
