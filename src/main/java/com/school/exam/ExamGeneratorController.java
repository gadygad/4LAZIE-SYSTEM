package com.school.exam;

import com.school.auth.Role;
import com.school.auth.User;
import com.school.auth.UserRepository;
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

import com.school.notes.Note;
import com.school.academic.Course;
import com.school.notes.NoteRepository;
import com.school.academic.CourseRepository;
import com.school.notes.NoteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ExamGeneratorController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private NoteService noteService;

    private final ObjectMapper objectMapper = new ObjectMapper();

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
     * Pass ?editId={noteId} (Super Admin only) to load an existing saved exam
     * into the form for editing instead of starting a blank one.
     */
    @GetMapping("/generate-exam/sjuit-diploma-ue")
    public String showSjuitDiplomaUeExam(@RequestParam(required = false) String editId, Model model) {
        User user = getLoggedInUser();
        model.addAttribute("user", user);
        model.addAttribute("activePage", "generator");
        applyEditNote(editId, user, model, false, 0);
        return "notes/sjuit_diploma_ue";
    }

    /**
     * SJUIT Diploma CAT 1 / CAT 2 builder page (shares one template — CAT 1
     * and CAT 2 use an identical fixed 17-question, 3-part layout, they only
     * differ in the "TEST - I"/"TEST - II" wording and saved category).
     * URL: /generate-exam/sjuit-diploma-cat1 or .../sjuit-diploma-cat2
     */
    @GetMapping("/generate-exam/sjuit-diploma-cat1")
    public String showSjuitDiplomaCat1Exam(@RequestParam(required = false) String editId, Model model) {
        return showSjuitDiplomaCatExam(editId, model, 1);
    }

    @GetMapping("/generate-exam/sjuit-diploma-cat2")
    public String showSjuitDiplomaCat2Exam(@RequestParam(required = false) String editId, Model model) {
        return showSjuitDiplomaCatExam(editId, model, 2);
    }

    private String showSjuitDiplomaCatExam(String editId, Model model, int catNumber) {
        User user = getLoggedInUser();
        model.addAttribute("user", user);
        model.addAttribute("activePage", "generator");
        model.addAttribute("catNumber", catNumber);
        applyEditNote(editId, user, model, true, catNumber);
        return "notes/sjuit_diploma_cat";
    }

    /**
     * Only Super Admin can edit an already-saved exam — regular Admins still
     * get the normal blank generator. Builds the same shape of object the
     * page's own draft-restore JS (restoreDraft()) already expects, so
     * loading a saved exam for editing reuses that existing mechanism
     * instead of a second parallel prefill code path.
     */
    private void applyEditNote(String editId, User user, Model model, boolean isCat, int catNumber) {
        if (editId == null || editId.isBlank()) return;
        if (user == null || user.getRole() != Role.SUPER_ADMIN) return;

        Note note = noteRepository.findById(editId).orElse(null);
        if (note == null || note.getContentJson() == null) return;

        try {
            JsonNode content = objectMapper.readTree(note.getContentJson());
            String programName = courseRepository.findAll().stream()
                    .filter(c -> note.getProgramType() != null && note.getProgramType().equals(c.getProgramType()))
                    .findFirst()
                    .map(Course::getName)
                    .map(String::toUpperCase)
                    .orElse("");

            Map<String, Object> editData = new HashMap<>();
            editData.put("mNtaLevel", note.getLevelNo() != null ? String.valueOf(note.getLevelNo()) : "4");
            editData.put("mProgram", programName);
            editData.put("mAcademicYear", note.getAcademicYear());
            editData.put("mCode", note.getModuleCode());
            editData.put("mName", note.getModuleName());
            editData.put("mModuleSelect", "");
            editData.put("extras", java.util.List.of());
            editData.put("questions", objectMapper.convertValue(content.path("questions"), java.util.List.class));

            if (isCat) {
                editData.put("mSemester", note.getSemesterNo() != null ? String.valueOf(note.getSemesterNo()) : "1");
                editData.put("mDate", content.path("examDate").asText(""));
            } else {
                editData.put("mLevel", "DIPLOMA");
                editData.put("mSemester", note.getSemesterNo() != null && note.getSemesterNo() == 2 ? "SEM: II" : "SEM: I");
                editData.put("mType", content.path("examType").asText(""));
                editData.put("mDate", content.path("examDate").asText(""));
                editData.put("mTime", content.path("examTime").asText(""));
                editData.put("mInstructions", content.path("instructions").asText(""));
            }

            model.addAttribute("editNoteId", note.getId());
            model.addAttribute("editNoteDataJson", objectMapper.writeValueAsString(editData));
        } catch (Exception e) {
            e.printStackTrace();
        }
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

    /**
     * Updates an already-saved generated exam in place, instead of creating a
     * new Note — only Super Admin may do this. Used when editing from
     * /admin/notes rather than generating a fresh exam.
     */
    @PutMapping("/api/generate-exam/update/{id}")
    @ResponseBody
    public ResponseEntity<?> updateGeneratedExam(@PathVariable String id, @RequestBody ExamSubmissionRequest request) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            return ResponseEntity.status(403).body(Map.of("success", false, "message", "Only Super Admin can edit a saved exam."));
        }

        Note note = noteRepository.findById(id).orElse(null);
        if (note == null) {
            return ResponseEntity.status(404).body(Map.of("success", false, "message", "Note not found"));
        }

        try {
            note.setTitle(request.title);
            note.setProgramType(request.programType);
            note.setLevelNo(request.levelNo);
            note.setSemesterNo(request.semesterNo);
            note.setModuleName(request.moduleName);
            note.setModuleCode(request.moduleCode);
            note.setAcademicYear(request.academicYear);
            note.setContentJson(request.contentJson);
            // category/uploadDate/isGeneral intentionally left untouched — this
            // is an edit of the existing note, not a new upload.
            noteRepository.save(note);
            return ResponseEntity.ok(Map.of("success", true, "message", "Exam updated successfully", "noteId", note.getId()));
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

