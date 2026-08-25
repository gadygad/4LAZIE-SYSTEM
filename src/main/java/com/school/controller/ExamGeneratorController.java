package com.school.controller;

import com.school.model.Role;
import com.school.model.User;
import com.school.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;
import java.time.LocalDateTime;

import com.school.model.Note;
import com.school.repository.NoteRepository;
import com.school.service.NoteService;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class ExamGeneratorController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private NoteService noteService;

    private User getLoggedInUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            return null;
        }
        return userRepository.findByEmail(auth.getName()).orElse(null);
    }

    /**
     * Hub page — choose university / institution
     * URL: /generator-hub
     */
    @GetMapping("/generator-hub")
    public String showGeneratorHub(Model model) {
        User user = getLoggedInUser();
        model.addAttribute("user", user);
        model.addAttribute("activePage", "generator");
        return "notes/generator_hub";
    }

    /**
     * Actual exam builder page
     * URL: /generate-exam
     */
    @GetMapping("/generate-exam")
    public String showGenerateExam(Model model) {
        User user = getLoggedInUser();
        model.addAttribute("user", user);
        model.addAttribute("activePage", "generator");
        return "notes/generate_exam";
    }

    /**
     * SJUIT Diploma UE Exam builder page
     * URL: /generate-exam/sjuit-diploma-ue
     */
    @GetMapping("/generate-exam/sjuit-diploma-ue")
    public String showSjuitDiplomaUeExam(Model model) {
        User user = getLoggedInUser();
        model.addAttribute("user", user);
        model.addAttribute("activePage", "generator");
        return "notes/sjuit_diploma_ue";
    }

    /**
     * SJUIT Diploma CAT 1 / CAT 2 builder page (shares one template — CAT 1
     * and CAT 2 use an identical fixed 17-question, 3-part layout, they only
     * differ in the "TEST - I"/"TEST - II" wording and saved category).
     * URL: /generate-exam/sjuit-diploma-cat1 or .../sjuit-diploma-cat2
     */
    @GetMapping("/generate-exam/sjuit-diploma-cat1")
    public String showSjuitDiplomaCat1Exam(Model model) {
        return showSjuitDiplomaCatExam(model, 1);
    }

    @GetMapping("/generate-exam/sjuit-diploma-cat2")
    public String showSjuitDiplomaCat2Exam(Model model) {
        return showSjuitDiplomaCatExam(model, 2);
    }

    private String showSjuitDiplomaCatExam(Model model, int catNumber) {
        User user = getLoggedInUser();
        model.addAttribute("user", user);
        model.addAttribute("activePage", "generator");
        model.addAttribute("catNumber", catNumber);
        return "notes/sjuit_diploma_cat";
    }

    public static class ExamSubmissionRequest {
        public String title;
        public String programType;
        public Integer levelNo;
        public Integer semesterNo;
        public String moduleName;
        public String moduleCode;
        public String academicYear;
        public String contentJson;
        // "UE", "CAT 1", "CAT 2" — defaults to "UE" so the existing UE generator
        // page (which never sends this field) keeps behaving exactly as before.
        public String category;
    }

    @PostMapping("/api/generate-exam/save")
    @ResponseBody
    public ResponseEntity<?> saveGeneratedExam(@RequestBody ExamSubmissionRequest request, HttpServletRequest httpRequest) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return ResponseEntity.status(403).body(Map.of("success", false, "message", "Unauthorized"));
        }

        try {
            Note note = new Note();
            note.setTitle(request.title);
            note.setProgramType(request.programType);
            note.setLevelNo(request.levelNo);
            note.setSemesterNo(request.semesterNo);
            note.setModuleName(request.moduleName);
            note.setModuleCode(request.moduleCode);
            note.setAcademicYear(request.academicYear);
            note.setCategory(request.category != null && !request.category.isBlank() ? request.category : "UE");
            note.setContentJson(request.contentJson);
            note.setUploadDate(LocalDateTime.now());
            note.setIsPublic(true);
            note.setIsGeneral(false);
            
            // Dummy filename since we don't have a real file
            note.setFilename(request.moduleCode + "_Generated.pdf");

            noteRepository.save(note);
            
            // --- NEW: Trigger Notifications ---
            String appUrl = httpRequest.getScheme() + "://" + httpRequest.getServerName() + 
                            (httpRequest.getServerPort() != 80 && httpRequest.getServerPort() != 443 ? ":" + httpRequest.getServerPort() : "");
            noteService.triggerNotificationsForNote(note, user, appUrl);
            // ----------------------------------
            
            return ResponseEntity.ok(Map.of("success", true, "message", "Exam saved successfully", "noteId", note.getId()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "Server error: " + e.getMessage()));
        }
    }

    @GetMapping("/view-generated-exam/{id}")
    public String viewGeneratedExam(@org.springframework.web.bind.annotation.PathVariable("id") String id, 
                                    @org.springframework.web.bind.annotation.RequestParam(value = "action", required = false, defaultValue = "read") String action,
                                    Model model) {
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null || note.getContentJson() == null) {
            return "redirect:/dashboard";
        }
        model.addAttribute("note", note);
        model.addAttribute("action", action);
        model.addAttribute("user", getLoggedInUser());
        return "notes/view_generated_exam";
    }
}

