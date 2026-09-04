package com.school.auth;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.school.auth.Role;
import com.school.auth.User;
import com.school.auth.UserService;
import com.school.auth.AuthUtil;
import com.school.notes.Note;
import com.school.notes.NoteRepository;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class LoginController {


        private NoteRepository noteRepository;

    public LoginController(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }


    @GetMapping("/login")
    public String login(@RequestParam(value = "program", required = false, defaultValue = "DIPLOMA") String program,
                        @RequestParam(value = "level", required = false) Integer level,
                        @RequestParam(value = "search", required = false) String search,
                        @RequestParam(value = "redirect", required = false) String redirectUrl,
                        HttpSession session, Model model) {
        if (redirectUrl != null && !redirectUrl.isEmpty() && redirectUrl.startsWith("/")) {
            session.setAttribute("redirectUrl", redirectUrl);
        }
        if (session.getAttribute("user") != null) {
            return "redirect:/dashboard";
        }

        // Defaults for guest view
        if (level == null) {
            level = 4;
        }

        List<Note> notes = new java.util.ArrayList<>();
        try {
            if (search != null && !search.trim().isEmpty()) {
                // This is a public, unauthenticated, unrate-limited endpoint —
                // the search term must never reach $regex unescaped, or a
                // pathological pattern (e.g. catastrophic-backtracking) lets
                // anyone trigger a ReDoS against the notes collection.
                String safeSearch = java.util.regex.Pattern.quote(search.trim());
                notes = noteRepository.searchNotesByProgramAndLevelWithGeneral(program, level, safeSearch, org.springframework.data.domain.PageRequest.of(0, 10)).getContent().stream()
                        .filter(n -> n != null && Boolean.TRUE.equals(n.getIsPublic()))
                        .limit(3)
                        .collect(Collectors.toList());
                model.addAttribute("searchQuery", search);
            } else {
                notes = noteRepository.findByProgramTypeAndLevelNoWithGeneral(program, level).stream()
                        .filter(n -> n != null && Boolean.TRUE.equals(n.getIsPublic()))
                        .limit(3)
                        .collect(Collectors.toList());
            }
        } catch (Exception e) {
            // Ignore database connection error to allow the login page to load
        }
        
        model.addAttribute("notes", notes);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedProgram", program);

        return "auth/login";
    }

}
