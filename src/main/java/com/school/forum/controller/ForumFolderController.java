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
        // Uploading lets one file be attached to more than one course, which
        // creates a separate Note document per course pointing at the exact
        // same uploaded file — those are the same document and must never
        // show twice here, no matter what course/category/year each copy
        // recorded, so fileUrl (the actual file) is the primary dedup key.
        // Only notes missing a fileUrl fall back to a title+category+year
        // match, which still lets a genuinely different document (e.g. last
        // year's CAT 2 vs this year's) show as its own entry.
        java.util.Map<String, List<Note>> notesBySubject = new java.util.LinkedHashMap<>();
        java.util.Set<String> seenDuplicateKeys = new java.util.HashSet<>();
        for (Note n : levelNotes) {
            String dupKey = (n.getFileUrl() != null && !n.getFileUrl().isBlank())
                    ? "file:" + n.getFileUrl().trim().toLowerCase()
                    : "meta:" + String.join("|",
                            n.getTitle() != null ? n.getTitle().trim().toLowerCase() : "",
                            n.getCategory() != null ? n.getCategory().trim().toLowerCase() : "",
                            n.getAcademicYear() != null ? n.getAcademicYear().trim().toLowerCase() : "");
            if (!seenDuplicateKeys.add(dupKey)) continue;

            String subject = (n.getModuleName() != null && !n.getModuleName().isBlank())
                    ? n.getModuleName() : "Other Materials";
            notesBySubject.computeIfAbsent(subject, k -> new java.util.ArrayList<>()).add(n);
        }
        model.addAttribute("notesBySubject", notesBySubject);
        // Deduped count — the "N Resources available" header must match what's
        // actually listed below, not the raw pre-dedup document count.
        int resourceCount = notesBySubject.values().stream().mapToInt(List::size).sum();
        model.addAttribute("resourceCount", resourceCount);

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
     * actually has notes. Degree levels are 1-3, Diploma (NTA) levels are
     * 4+; picking a balanced mix of both instead of just sorting everything
     * by level and taking the first few means Degree folders don't vanish
     * from the picker just because Diploma content happens to dominate the
     * most-recently-uploaded notes. The order is shuffled per request too,
     * so reloading the page surfaces a different rotating sample instead of
     * always the exact same folders. */
    private List<java.util.Map<String, Object>> buildLatestFolders() {
        List<Note> recentNotes = noteRepository.findTop500ByOrderByIdDesc();
        java.util.Map<java.util.List<Integer>, List<Note>> grouped = recentNotes.stream()
                .filter(n -> n.getLevelNo() != null)
                .collect(java.util.stream.Collectors.groupingBy(
                        n -> java.util.Arrays.asList(n.getLevelNo(), n.getSemesterNo() != null ? n.getSemesterNo() : 0)));

        List<java.util.List<Integer>> degreeKeys = new java.util.ArrayList<>();
        List<java.util.List<Integer>> diplomaKeys = new java.util.ArrayList<>();
        for (java.util.List<Integer> key : grouped.keySet()) {
            (key.get(0) >= 4 ? diplomaKeys : degreeKeys).add(key);
        }
        java.util.Collections.shuffle(degreeKeys);
        java.util.Collections.shuffle(diplomaKeys);

        List<java.util.List<Integer>> picked = new java.util.ArrayList<>();
        int perSide = 4; // up to 4 folders from each side, 8 total
        picked.addAll(degreeKeys.subList(0, Math.min(perSide, degreeKeys.size())));
        picked.addAll(diplomaKeys.subList(0, Math.min(perSide, diplomaKeys.size())));
        java.util.Collections.shuffle(picked);

        return picked.stream()
                .map(key -> {
                    List<Note> notes = grouped.get(key);
                    java.util.Map<String, Object> map = new java.util.HashMap<>();
                    Integer lvl = key.get(0);
                    Integer sem = key.get(1);
                    map.put("year", levelLabel(lvl) + (sem > 0 ? " · Sem " + sem : ""));
                    map.put("levelNo", lvl);
                    map.put("semesterNo", sem > 0 ? sem : 1);
                    map.put("count", (long) notes.size());
                    map.put("notes", notes.stream().limit(5).collect(Collectors.toList()));
                    return map;
                })
                .collect(Collectors.toList());
    }
}
