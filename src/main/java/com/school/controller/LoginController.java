package com.school.controller;

import com.school.model.User;
import com.school.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.school.model.Note;
import com.school.repository.NoteRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Controller
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;

    @GetMapping("/login")
    public String login(@RequestParam(value = "program", required = false, defaultValue = "DIPLOMA") String program,
                        @RequestParam(value = "level", required = false) Integer level,
                        @RequestParam(value = "search", required = false) String search,
                        HttpSession session, Model model) {
        if (session.getAttribute("user") != null) {
            return "redirect:/dashboard";
        }

        // Defaults for guest view
        if (level == null) {
            level = 4;
        }

        List<Note> notes;
        if (search != null && !search.trim().isEmpty()) {
            notes = noteRepository.searchNotesByProgramAndLevel(program, level, search.trim()).stream()
                    .filter(Note::getIsPublic)
                    .limit(3)
                    .collect(Collectors.toList());
            model.addAttribute("searchQuery", search);
        } else {
            notes = noteRepository.findByProgramTypeAndLevelNoOrderByIdDesc(program, level).stream()
                    .filter(Note::getIsPublic)
                    .limit(3)
                    .collect(Collectors.toList());
        }
        
        model.addAttribute("notes", notes);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedProgram", program);

        return "login";
    }

}
