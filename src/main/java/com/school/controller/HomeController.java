package com.school.controller;

import com.school.model.Note;
import com.school.model.Institution;
import com.school.repository.NoteRepository;
import com.school.repository.InstitutionRepository;
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

    @Autowired
    private InstitutionRepository institutionRepository;

    @GetMapping("/")
    public String home(Model model, jakarta.servlet.http.HttpSession session) {
        // Fetch up to 3 recent public notes for SJCET (institution ID 1)
        List<Note> popularNotes = noteRepository.findAll().stream()
                .filter(Note::getIsPublic)
                .filter(n -> "Note".equals(n.getCategory()))
                .filter(n -> n.getInstitution() != null && n.getInstitution().getId() == 1L)
                .sorted((n1, n2) -> n2.getId().compareTo(n1.getId()))
                .limit(3)
                .collect(Collectors.toList());
        
        Institution currentInstitution = institutionRepository.findById(1L).orElse(null);
        model.addAttribute("currentInstitution", currentInstitution);
        model.addAttribute("popularNotes", popularNotes);
        return "home";
    }

    @GetMapping("/init")
    @org.springframework.web.bind.annotation.ResponseBody
    public String init() {
        return "Init is handled by data.sql now";
    }
}
