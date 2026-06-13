package com.school.controller;

import com.school.model.Note;
import com.school.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;

@Controller
@SuppressWarnings("null")
public class HomeController {

    @Autowired
    private NoteRepository noteRepository;

    @GetMapping("/")
    public String home(Model model) {
        // Fetch up to 3 recent public notes across all levels to display as Popular Notes
        List<Note> popularNotes = noteRepository.findAll().stream()
                .filter(Note::getIsPublic)
                .filter(n -> "Note".equals(n.getCategory()))
                .sorted((n1, n2) -> n2.getId().compareTo(n1.getId()))
                .limit(3)
                .collect(Collectors.toList());
        
        model.addAttribute("popularNotes", popularNotes);
        return "home";
    }

    @GetMapping("/init")
    @org.springframework.web.bind.annotation.ResponseBody
    public String init() {
        if (noteRepository.count() == 0) {
            Note n1 = new Note(); n1.setTitle("JAVA PROGRAMMING"); n1.setCategory("Note"); n1.setLevelNo(4); n1.setSemesterNo(1); n1.setFilename("java_notes.pdf"); n1.setIsPublic(true); noteRepository.save(n1);
            Note n2 = new Note(); n2.setTitle("DATABASE MANAGEMENT"); n2.setCategory("Note"); n2.setLevelNo(5); n2.setSemesterNo(1); n2.setFilename("db_notes.pdf"); n2.setIsPublic(true); noteRepository.save(n2);
            Note n3 = new Note(); n3.setTitle("NETWORK SECURITY"); n3.setCategory("Note"); n3.setLevelNo(6); n3.setSemesterNo(1); n3.setFilename("network_notes.pdf"); n3.setIsPublic(true); noteRepository.save(n3);
            return "Initialized 3 notes";
        }
        return "Already initialized";
    }
}
