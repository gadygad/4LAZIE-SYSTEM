package com.school.controller;

import com.school.model.Note;
import com.school.model.User;
import com.school.service.NoteService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import com.school.repository.UserRepository;

import com.school.repository.NoteRepository;
import com.school.model.Institution;
import com.school.repository.CourseRepository;
import com.school.repository.InstitutionRepository;
import com.school.repository.SubjectRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.LinkedHashMap;
import com.school.service.FileStorageService;
import com.school.service.PushNotificationService;
import com.school.service.NotificationService;
import com.school.service.EmailService;
import com.cloudinary.Cloudinary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.school.model.Role;

@Controller
public class NotesController {
    private static final Logger log = LoggerFactory.getLogger(NotesController.class);

    @Autowired
    private com.school.util.AuthUtil authUtil;

    private User getLoggedInUser() {
        return authUtil.getLoggedInUser();
    }

    // Utility to prevent ReDoS by escaping Regex special characters
    private String escapeRegex(String input) {
        if (input == null) return null;
        return input.replaceAll("([\\\\\\.\\[\\{\\(\\*\\+\\?\\^\\$\\|])", "\\\\$1");
    }


    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private NoteService noteService;

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstitutionRepository institutionRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private com.school.repository.ActivityLogRepository activityLogRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired(required = false)
    private PushNotificationService pushNotificationService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private EmailService emailService;


    @GetMapping("/home")
    public String home(@RequestParam(value = "program", required = false, defaultValue = "DIPLOMA") String program,
                       @RequestParam(value = "level", required = false) Integer level,
                       @RequestParam(value = "search", required = false) String search,
                       Model model, HttpSession session) {
        if (getLoggedInUser() != null) {
            return "redirect:/dashboard";
        }
        if (level == null) level = 4;

        List<Note> notes;
        if (search != null && !search.trim().isEmpty()) {
            String safeSearch = escapeRegex(search.trim());
            notes = noteRepository.searchNotesByProgramAndLevelWithGeneral(program, level, safeSearch, org.springframework.data.domain.PageRequest.of(0, 3)).getContent().stream()
                    .filter(n -> n != null && (n.getIsPublic() == null || Boolean.TRUE.equals(n.getIsPublic())))
                    .collect(Collectors.toList());
            model.addAttribute("searchQuery", search);
        } else {
            notes = noteRepository.findByProgramTypeAndLevelNoWithGeneral(program, level).stream()
                    .filter(n -> n != null && (n.getIsPublic() == null || Boolean.TRUE.equals(n.getIsPublic())))
                    .limit(3)
                    .collect(Collectors.toList());
        }
        model.addAttribute("notes", notes);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedProgram", program);
        return "public/index";
    }

    @GetMapping("/semesters")
    public String selectSemester(@RequestParam("level") Integer level, HttpSession session, Model model) {
        if (getLoggedInUser() == null) return "redirect:/login";
        model.addAttribute("selectedLevel", level);
        return "timetable/semesters";
    }

    @GetMapping("/notes")
    public String browseNotes(@RequestParam(value = "program", required = false) String program,
                              @RequestParam(value = "level", required = false) Integer level,
                              @RequestParam(value = "semester", required = false) Integer semester,
                              @RequestParam(value = "category", required = false) String category,
                              @RequestParam(value = "search", required = false) String search,
                              @RequestParam(value = "institution", required = false) String institutionId,
                              @RequestParam(value = "page", defaultValue = "0") int page,
                              HttpSession session, Model model) {
        User loggedInUser = getLoggedInUser();
        
        // Enforce course boundaries for students
        if (loggedInUser != null && loggedInUser.getRole() != Role.ADMIN && loggedInUser.getRole() != Role.SUPER_ADMIN) {
            program = loggedInUser.getCourseProgram();
        } else if (program == null || program.isEmpty()) {
            // Fallback for admins/guests when program is empty
            program = (loggedInUser != null && loggedInUser.getCourseProgram() != null && !loggedInUser.getCourseProgram().isEmpty()) 
                      ? loggedInUser.getCourseProgram() : "DIP_CSE";
        }

        if (institutionId == null || institutionId.isEmpty()) {
            if (loggedInUser != null && loggedInUser.getInstitution() != null) {
                institutionId = loggedInUser.getInstitution().getId();
            } else {
                institutionId = "1"; // Default to primary institution
            }
        }

        if (level == null) {
            level = (loggedInUser != null && loggedInUser.getLevel() != null) ? loggedInUser.getLevel() : 4;
        }
        if (semester == null) {
            semester = (loggedInUser != null && loggedInUser.getSemester() != null) ? loggedInUser.getSemester() : 1;
        }
        
        org.springframework.data.domain.Page<Note> notesPage = noteService.fetchFilteredNotes(institutionId, program, level, semester, category, search, page);
        
        model.addAttribute("searchQuery", search);
        model.addAttribute("selectedCategory", category);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedSemester", semester);
        model.addAttribute("selectedInstitutionId", institutionId);
        model.addAttribute("notesPage", notesPage);
        model.addAttribute("notes", notesPage.getContent());
        
        Map<String, List<Note>> groupedNotes = new LinkedHashMap<>();
        Map<String, String> moduleCodes = new LinkedHashMap<>();
        if (level != null && semester != null) {
            noteService.groupNotesByModule(notesPage.getContent(), program, level, semester, groupedNotes, moduleCodes);
        }
        model.addAttribute("groupedNotes", groupedNotes);
        model.addAttribute("moduleCodes", moduleCodes);

        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", notesPage.getTotalPages());
        model.addAttribute("selectedProgram", program);

        List<Note> popularNotes;
        if (loggedInUser != null && loggedInUser.getRole() != Role.ADMIN && loggedInUser.getRole() != Role.SUPER_ADMIN) {
            popularNotes = noteRepository.findByProgramTypeWithGeneral(program, org.springframework.data.domain.PageRequest.of(0, 3, org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "downloadCount")));
        } else {
            popularNotes = noteRepository.findTop3ByOrderByDownloadCountDesc();
        }
        model.addAttribute("popularNotes", popularNotes);
        model.addAttribute("courses", getSimpleCourses());
        return "notes/notes";
    }

    private List<Map<String, String>> getSimpleCourses() {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser != null && loggedInUser.getRole() != Role.ADMIN && loggedInUser.getRole() != Role.SUPER_ADMIN) {
            String userProg = loggedInUser.getCourseProgram();
            return courseRepository.findAll().stream()
                .filter(c -> c.getProgramType() != null && c.getProgramType().equalsIgnoreCase(userProg))
                .map(c -> {
                    Map<String, String> map = new LinkedHashMap<>();
                    map.put("programType", c.getProgramType());
                    map.put("name", c.getName());
                    return map;
                }).collect(Collectors.toList());
        }
        return courseRepository.findAll().stream()
            .map(c -> {
                Map<String, String> map = new LinkedHashMap<>();
                map.put("programType", c.getProgramType());
                map.put("name", c.getName());
                return map;
            }).collect(Collectors.toList());
    }

    @GetMapping("/cat1")
    public String cat1PastPapers(Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";
        model.addAttribute("courses", getSimpleCourses());
        model.addAttribute("user", loggedInUser);
        return "notes/cat1_past_papers";
    }

    @GetMapping("/cat2")
    public String cat2PastPapers(Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";
        model.addAttribute("courses", getSimpleCourses());
        model.addAttribute("user", loggedInUser);
        return "notes/cat2_past_papers";
    }

    @GetMapping("/assignments")
    public String assignmentsPastPapers(Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";
        model.addAttribute("courses", getSimpleCourses());
        model.addAttribute("user", loggedInUser);
        return "notes/assignments_past_papers";
    }

    @GetMapping("/ue_exams")
    public String ueExamsPastPapers(Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";
        model.addAttribute("courses", getSimpleCourses());
        model.addAttribute("user", loggedInUser);
        return "notes/ue_past_papers";
    }

    @GetMapping("/projects")
    public String projectsPastPapers(Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";
        model.addAttribute("courses", getSimpleCourses());
        model.addAttribute("user", loggedInUser);
        return "notes/projects_past_papers";
    }

    @GetMapping("/dashboard")
    public String dashboard(@RequestParam(value = "program", required = false, defaultValue = "DIPLOMA") String program,
                            @RequestParam(value = "level", required = false) Integer level,
                            @RequestParam(value = "semester", required = false) Integer semester,
                            @RequestParam(value = "search", required = false) String search, 
                            @RequestParam(value = "page", defaultValue = "0") int page,
                            HttpSession session, Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";

        // Enforce course boundaries for students
        if (loggedInUser.getRole() != Role.ADMIN && loggedInUser.getRole() != Role.SUPER_ADMIN) {
            program = loggedInUser.getCourseProgram();
        } else if ("DIPLOMA".equals(program)) {
            if (loggedInUser.getCourseProgram() != null && !loggedInUser.getCourseProgram().isEmpty()) {
                program = loggedInUser.getCourseProgram();
            } else {
                program = "DIP_CSE";
            }
        }

        if (level == null) level = (loggedInUser.getLevel() != null) ? loggedInUser.getLevel() : 4;
        if (semester == null) semester = (loggedInUser.getSemester() != null) ? loggedInUser.getSemester() : 1;

        org.springframework.data.domain.Page<Note> notesPage;
        if (search != null && !search.trim().isEmpty()) {
            String safeSearch = escapeRegex(search.trim());
            notesPage = noteRepository.searchNotesByProgramLevelAndSemesterWithGeneral(program, level, semester, safeSearch, org.springframework.data.domain.PageRequest.of(page, 50));
            model.addAttribute("searchQuery", search);
        } else {
            notesPage = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoWithGeneral(program, level, semester, org.springframework.data.domain.PageRequest.of(page, 50));
        }

        List<Note> notes = notesPage.getContent();
        model.addAttribute("notesPage", notesPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", notesPage.getTotalPages());
        model.addAttribute("notes", notes);
        
        Map<String, List<Note>> groupedNotes = new LinkedHashMap<>();
        Map<String, String> moduleCodes = new LinkedHashMap<>();
        noteService.groupNotesByModule(notes, program, level, semester, groupedNotes, moduleCodes);

        model.addAttribute("groupedNotes", groupedNotes);
        model.addAttribute("moduleCodes", moduleCodes);
        
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedSemester", semester);
        model.addAttribute("selectedProgram", program);
        model.addAttribute("user", loggedInUser);

        List<Note> popularNotes;
        List<Note> recentNotes;
        if (loggedInUser.getRole() != Role.ADMIN && loggedInUser.getRole() != Role.SUPER_ADMIN) {
            popularNotes = noteService.fetchDashboardNotes(program, "downloadCount", 5);
            recentNotes = noteService.fetchDashboardNotes(program, "uploadDate", 5);
        } else {
            popularNotes = noteRepository.findTop5ByOrderByDownloadCountDesc();
            recentNotes = noteRepository.findTop5ByOrderByUploadDateDesc();
        }

        model.addAttribute("popularNotes", popularNotes);
        model.addAttribute("recentNotes", recentNotes);
        model.addAttribute("totalNotes", noteRepository.count());
        model.addAttribute("totalDownloads", noteRepository.getTotalDownloadCount());

        return "user/dashboard";
    }


    @GetMapping("/upload")
    public String showUploadPage(HttpSession session, Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null || !Role.ADMIN.equals(loggedInUser.getRole())) return "redirect:/dashboard";
        model.addAttribute("user", loggedInUser);
        model.addAttribute("courses", courseRepository.findAll());
        return "notes/upload";
    }

    @PostMapping("/upload")
    public String uploadNote(@RequestParam("title") String title,
                             @RequestParam(value = "programType", defaultValue = "DIPLOMA") String programType,
                             @RequestParam("levelNo") Integer levelNo,
                             @RequestParam("semesterNo") Integer semesterNo,
                             @RequestParam(value = "moduleName", required = false) String moduleName,
                             @RequestParam(value = "moduleCode", required = false) String moduleCode,
                             @RequestParam(value = "category", required = false) String category,
                             @RequestParam(value = "unitNumber", required = false) Integer unitNumber,
                             @RequestParam(value = "academicYear", required = false) String academicYear,
                             @RequestParam(value = "isGeneral", required = false, defaultValue = "false") Boolean isGeneral,
                             @RequestParam("file") MultipartFile file,
                             HttpSession session, jakarta.servlet.http.HttpServletRequest request) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null || !Role.ADMIN.equals(loggedInUser.getRole())) return "redirect:/dashboard";

        if (file.isEmpty()) return "redirect:/upload?error=Please select a file to upload.";

        // Validate File Extension to prevent uploading malicious scripts/executables
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null) {
            int dotIndex = originalFilename.lastIndexOf('.');
            if (dotIndex < 0 || dotIndex == originalFilename.length() - 1) {
                return "redirect:/upload?error=Security Alert: Invalid file format. No extension found.";
            }
            String ext = originalFilename.substring(dotIndex + 1).toLowerCase();
            List<String> allowedExtensions = List.of("pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "jpg", "jpeg", "png", "txt");
            if (!allowedExtensions.contains(ext)) {
                return "redirect:/upload?error=Security Alert: Invalid file type. Only standard documents and images are allowed.";
            }
        }

        try {
            Note note = new Note();
            note.setTitle(title);
            note.setProgramType(programType);
            note.setLevelNo(levelNo);
            note.setSemesterNo(semesterNo);
            note.setModuleName(moduleName != null && !moduleName.trim().isEmpty() ? moduleName.trim().toUpperCase() : "GENERAL MODULE");
            note.setModuleCode(moduleCode != null ? moduleCode.trim().toUpperCase() : "");
            note.setCategory(category == null || category.trim().isEmpty() ? "Note" : category);
            note.setUnitNumber(unitNumber);
            note.setAcademicYear(academicYear != null ? academicYear.trim() : null);
            note.setIsGeneral(isGeneral);

            String appUrl = "https://" + request.getServerName();
            if (request.getServerPort() != 80 && request.getServerPort() != 443) {
                appUrl += ":" + request.getServerPort();
            }

            noteService.uploadAndSaveNote(note, file, loggedInUser, appUrl);
            
        } catch (IOException e) {
            return "redirect:/upload?error=Upload failed: " + e.getMessage();
        }
        return "redirect:/upload?success=Note uploaded successfully!";
    }


    @GetMapping("/download/{slug}")
    public void downloadFile(@PathVariable("slug") String slug, 
                               @RequestParam(value = "force", required = false) String force,
                               HttpSession session,
                               jakarta.servlet.http.HttpServletResponse response) throws java.io.IOException {
        Note note = null;
        if (slug.length() == 24 && slug.matches("^[0-9a-fA-F]+$")) {
            note = noteRepository.findById(slug).orElse(null);
        }
        
        // 2. If not found, try decrypting as AES slug or old format
        if (note == null) {
            String id = null;
            if (slug.contains("-")) {
                String potentialId = slug.split("-")[0];
                if (potentialId.length() == 24 && potentialId.matches("^[0-9a-fA-F]+$")) {
                    id = potentialId;
                }
            }
            if (id == null) {
                id = com.school.util.EncryptionUtil.decrypt(slug);
            }
            if (id != null && !id.equals(slug)) {
                note = noteRepository.findById(id).orElse(null);
            }
        }
        
        if (note == null) {
            response.sendError(404, "Note not found");
            return;
        }

        User loggedInUser = getLoggedInUser();
        
        // Enforce course boundaries for students
        if (loggedInUser != null && loggedInUser.getRole() != Role.ADMIN && loggedInUser.getRole() != Role.SUPER_ADMIN) {
            boolean isCourseMatch = note.getProgramType() != null && note.getProgramType().equalsIgnoreCase(loggedInUser.getCourseProgram());
            if (!isCourseMatch && !Boolean.TRUE.equals(note.getIsGeneral())) {
                response.sendError(403, "Access Denied: You can only access materials related to your course (" + loggedInUser.getCourseProgram() + ")");
                return;
            }
        }
        
        // Strict Whitelist: Only allow 'Note' or empty category for Guests
        if (loggedInUser == null) {
            boolean isAllowed = false;
            if (note.getCategory() == null || note.getCategory().trim().isEmpty()) {
                isAllowed = true;
            } else {
                String cat = note.getCategory().toUpperCase().trim().replaceAll("\\s+", "");
                if (cat.contains("NOTE") || cat.equals("MODULE") || cat.contains("COURSEMATERIAL")) {
                    isAllowed = true;
                } else if (cat.contains("ASSIGNMENT") || cat.contains("PROJECT") || cat.contains("UE") || cat.contains("CAT") || cat.contains("PASTPAPER") || cat.contains("EXAM") || cat.contains("TEST")) {
                    isAllowed = false;
                }
            }
            if (!isAllowed) {
                response.sendRedirect("/login");
                return;
            }
        }

        note.setDownloadCount((note.getDownloadCount() == null ? 0 : note.getDownloadCount()) + 1);
        noteRepository.save(note);

        if (loggedInUser != null) {
            if (loggedInUser.getDownloadedNotes() == null) {
                loggedInUser.setDownloadedNotes(new java.util.HashSet<>());
            }
            loggedInUser.getDownloadedNotes().add(note.getId());
            userRepository.save(loggedInUser);
        }

        if (note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
            String cleanTitle = note.getTitle() != null ? note.getTitle().replaceAll("[^a-zA-Z0-9_-]", "_") : "Document";
            String ext = note.getFilename() != null && note.getFilename().contains(".") ? note.getFilename().substring(note.getFilename().lastIndexOf(".")) : ".pdf";
            String brandedName = "4LAZIE_" + cleanTitle + ext;
            try {
                response.sendRedirect("/proxy/" + note.getId() + "/" + brandedName);
                return;
            } catch (Exception e) {
                // fall through to text fallback
            }
        }

        String filename = note.getFilename();
        if (filename == null || filename.isEmpty()) filename = "note-" + note.getId() + ".txt";

        String fileContent = "=== STUDENT NOTES HUB ===\n" +
                "Title: " + note.getTitle() + "\nProgram: " + note.getProgramType() + "\n" +
                "Level/Year: " + note.getLevelNo() + "\nSemester: " + note.getSemesterNo() + "\n" +
                "Category: " + note.getCategory() + "\nUploaded: " + note.getUploadDate() + "\n" +
                "=========================\nDownloaded from 4LAZIE Student Notes Hub.";

        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
        response.getOutputStream().write(fileContent.getBytes());
    }

    @GetMapping("/download/level/{level}")
    @ResponseBody
    public ResponseEntity<Resource> downloadLevelNotes(@RequestParam(value="program", defaultValue="DIPLOMA") String program, @PathVariable("level") Integer level) {
        try {
            byte[] zipBytes = noteService.createLevelNotesZip(program, level);
            if (zipBytes == null) {
                return ResponseEntity.notFound().build();
            }

            ByteArrayResource resource = new ByteArrayResource(zipBytes);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"level-" + level + "-notes.zip\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .contentLength(zipBytes.length)
                    .body(resource);
        } catch (IOException e) {
            log.error("Failed to generate ZIP", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/view/{slug}")
    public void viewNotePage(@PathVariable("slug") String slug, 
                               HttpSession session,
                               jakarta.servlet.http.HttpServletRequest request,
                               jakarta.servlet.http.HttpServletResponse response) throws java.io.IOException {
        Note note = null;
        if (slug.length() == 24 && slug.matches("^[0-9a-fA-F]+$")) {
            note = noteRepository.findById(slug).orElse(null);
        }
        
        // 2. If not found, try decrypting as AES slug
        if (note == null) {
            String id = null;
            if (slug.contains("-")) {
                String potentialId = slug.split("-")[0];
                if (potentialId.length() == 24 && potentialId.matches("^[0-9a-fA-F]+$")) {
                    id = potentialId;
                }
            }
            if (id == null) {
                id = com.school.util.EncryptionUtil.decrypt(slug);
            }
            if (id != null && !id.equals(slug)) {
                note = noteRepository.findById(id).orElse(null);
            }
        }
        
        if (note == null) {
            response.sendRedirect("/dashboard");
            return;
        }

        User loggedInUser = getLoggedInUser();
        
        // Enforce course boundaries for students
        if (loggedInUser != null && loggedInUser.getRole() != Role.ADMIN && loggedInUser.getRole() != Role.SUPER_ADMIN) {
            boolean isCourseMatch = note.getProgramType() != null && note.getProgramType().equalsIgnoreCase(loggedInUser.getCourseProgram());
            if (!isCourseMatch && !Boolean.TRUE.equals(note.getIsGeneral())) {
                response.sendError(403, "Access Denied: You can only view materials related to your course (" + loggedInUser.getCourseProgram() + ")");
                return;
            }
        }
        
        // Strict Whitelist: Only allow 'Note' or empty category for Guests
        if (loggedInUser == null) {
            boolean isAllowed = false;
            if (note.getCategory() == null || note.getCategory().trim().isEmpty()) {
                isAllowed = true;
            } else {
                String cat = note.getCategory().toUpperCase().trim().replaceAll("\\s+", "");
                if (cat.contains("NOTE") || cat.equals("MODULE") || cat.contains("COURSEMATERIAL")) {
                    isAllowed = true;
                } else if (cat.contains("ASSIGNMENT") || cat.contains("PROJECT") || cat.contains("UE") || cat.contains("CAT") || cat.contains("PASTPAPER") || cat.contains("EXAM") || cat.contains("TEST")) {
                    isAllowed = false;
                }
            }
            if (!isAllowed) {
                response.sendRedirect("/login");
                return;
            }
        }

        note.setViewCount((note.getViewCount() == null ? 0 : note.getViewCount()) + 1);
        noteRepository.save(note);

        if (note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
            String cleanTitle = note.getTitle() != null ? note.getTitle().replaceAll("[^a-zA-Z0-9_-]", "_") : "Document";
            String ext = note.getFilename() != null && note.getFilename().contains(".") ? note.getFilename().substring(note.getFilename().lastIndexOf(".")) : ".pdf";
            String brandedName = "4LAZIE_" + cleanTitle + ext;
            
            String userAgent = request.getHeader("User-Agent");
            boolean isMobile = userAgent != null && userAgent.toLowerCase().matches(".*(android|webos|iphone|ipad|ipod|blackberry|windows phone).*");
            
            if (isMobile && ext.equalsIgnoreCase(".pdf")) {
                response.sendRedirect("/mobile-viewer/" + note.getId());
                return;
            }
            
            response.sendRedirect("/proxy/" + note.getId() + "/" + brandedName);
            return;
        }

        String filename = note.getFilename();
        if (filename == null || filename.isEmpty()) filename = "note-" + note.getId() + ".txt";

        String fileContent = "=== STUDENT NOTES HUB ===\n" +
                "Title: " + note.getTitle() + "\nProgram: " + note.getProgramType() + "\n" +
                "Level/Year: " + note.getLevelNo() + "\nSemester: " + note.getSemesterNo() + "\n" +
                "Category: " + note.getCategory() + "\nUploaded: " + note.getUploadDate() + "\n" +
                "=========================\nDownloaded from 4LAZIE Student Notes Hub.";

        response.setContentType(MediaType.APPLICATION_OCTET_STREAM_VALUE);
        response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");
        response.getOutputStream().write(fileContent.getBytes());
    }

    @GetMapping("/mobile-viewer/{id}")
    public String mobileViewer(@PathVariable("id") String id, Model model) {
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null || note.getFileUrl() == null || note.getFileUrl().isEmpty()) {
            return "redirect:/dashboard";
        }
        try {
            String encodedUrl = java.net.URLEncoder.encode(note.getFileUrl(), "UTF-8");
            model.addAttribute("googleDocsUrl", "https://docs.google.com/gview?embedded=true&url=" + encodedUrl);
            model.addAttribute("note", note);
        } catch (Exception e) {
            return "redirect:/dashboard";
        }
        return "public/mobile_viewer";
    }

    @GetMapping("/stream/{slug}")
    public Object streamNote(@PathVariable("slug") String slug, HttpSession session) {
        Note note = null;
        if (slug.length() == 24 && slug.matches("^[0-9a-fA-F]+$")) {
            note = noteRepository.findById(slug).orElse(null);
        }
        
        // 2. If not found, try decrypting
        if (note == null) {
            String id = null;
            if (slug.contains("-")) {
                String potentialId = slug.split("-")[0];
                if (potentialId.length() == 24 && potentialId.matches("^[0-9a-fA-F]+$")) {
                    id = potentialId;
                }
            }
            if (id == null) {
                id = com.school.util.EncryptionUtil.decrypt(slug);
            }
            if (id != null && !id.equals(slug)) {
                note = noteRepository.findById(id).orElse(null);
            }
        }

        User loggedInUser = getLoggedInUser();
        if (note != null && !note.getIsPublic() && loggedInUser == null) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND).header(HttpHeaders.LOCATION, "/login").build();
        }
        if (note != null && note.getCategory() != null && loggedInUser == null) {
            String cat = note.getCategory().toUpperCase().trim();
            if (cat.equals("ASSIGNMENT") || cat.equals("PROJECT") || cat.equals("UE") || cat.startsWith("CAT ") || cat.equals("CAT") || cat.contains("PAST PAPER")) {
                return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND).header(HttpHeaders.LOCATION, "/login").build();
            }
        }

        if (note != null && note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, note.getFileUrl())
                    .build();
        }

        String title = note != null ? note.getTitle() : "Document " + slug;

        // Removed local uploads fallback to ensure Cloudinary persistency

        String mockHtml = "<html><head><style>" +
            "body{background:#0f172a;color:#f8fafc;font-family:'Segoe UI',sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;margin:0;}" +
            ".card{background:rgba(30,41,59,0.7);padding:40px;border-radius:16px;text-align:center;border:1px solid rgba(255,255,255,0.05);box-shadow:0 10px 30px rgba(0,0,0,0.5);max-width:500px;}" +
            ".icon{font-size:60px;margin-bottom:20px;display:block;}" +
            "h2{color:#f59e0b;margin-top:0;font-size:1.5rem;}" +
            "p{color:#94a3b8;font-size:1rem;line-height:1.5;}" +
            "</style></head><body><div class='card'>" +
            "<span class='icon'>📄❌</span>" +
            "<h2>Document Not Found</h2>" +
            "<p>The document <b>" + title + "</b> could not be located. It may have been permanently deleted from the server or never uploaded properly.</p>" +
            "<p style='margin-top:20px;font-size:0.85rem;color:#64748b;'>Please contact your administrator or re-upload the document.</p>" +
            "</div></body></html>";
        ByteArrayResource mockResource = new ByteArrayResource(mockHtml.getBytes());
        return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND).contentType(MediaType.TEXT_HTML).header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"error.html\"").body(mockResource);
    }

    @GetMapping({"/proxy/{id}", "/proxy/{id}/{filename}"})
    public ResponseEntity<org.springframework.core.io.Resource> proxyDocument(@PathVariable("id") String id) {
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null || note.getFileUrl() == null || note.getFileUrl().isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        try {
            java.net.URL url = new java.net.URL(note.getFileUrl());
            java.net.HttpURLConnection connection = (java.net.HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Mozilla/5.0");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(30000);
            
            String filename = note.getFilename() != null ? note.getFilename().toLowerCase() : "document.pdf";
            MediaType mediaType = MediaType.APPLICATION_OCTET_STREAM;
            if (filename.endsWith(".pdf")) {
                mediaType = MediaType.APPLICATION_PDF;
            } else if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
                mediaType = MediaType.IMAGE_JPEG;
            } else if (filename.endsWith(".png")) {
                mediaType = MediaType.IMAGE_PNG;
            }
            
            org.springframework.core.io.InputStreamResource resource = new org.springframework.core.io.InputStreamResource(connection.getInputStream());
            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + (note.getFilename() != null ? note.getFilename() : "document.pdf") + "\"")
                    .body(resource);
        } catch (Exception e) {
            log.error("Error proxying document", e);
            return ResponseEntity.internalServerError().build();
        }
    }
    @PostMapping("/save-note/{id}")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> saveNoteToggle(@PathVariable("id") String id, HttpSession session) {
        User loggedInUser = getLoggedInUser();
        Map<String, Object> response = new LinkedHashMap<>();
        if (loggedInUser == null) {
            response.put("success", false);
            response.put("message", "Not logged in");
            return ResponseEntity.status(401).body(response);
        }

        boolean saved = false;
        if (loggedInUser.getSavedNotes() == null) {
            loggedInUser.setSavedNotes(new java.util.HashSet<>());
        }
        if (loggedInUser.getSavedNotes().contains(id)) {
            loggedInUser.getSavedNotes().remove(id);
        } else {
            loggedInUser.getSavedNotes().add(id);
            saved = true;
        }
        userRepository.save(loggedInUser);

        response.put("success", true);
        response.put("saved", saved);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/guest-notes")
    public String guestNotesList(@RequestParam(value = "program", required = false) String program,
                                 @RequestParam(value = "level", required = false) Integer level, 
                                 @RequestParam(value = "semester", required = false) Integer semester,
                                 @RequestParam(value = "page", defaultValue = "0") int page,
                                 org.springframework.ui.Model model, HttpSession session) {
                                     
        // Set defaults if not provided in URL
        if (program == null || program.isEmpty()) program = "DIP_CSE";
        if (level == null) level = 4;
        if (semester == null) semester = 1;

        if (getLoggedInUser() != null) {
            return "redirect:/notes?program=" + program + "&level=" + level + "&semester=" + semester + "&page=" + page;
        }
        
        org.springframework.data.domain.Page<Note> notesPage = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoWithGeneral(program, level, semester, org.springframework.data.domain.PageRequest.of(page, 50));
        List<Note> notes = notesPage.getContent();
        
        Map<String, List<Note>> groupedNotes = new LinkedHashMap<>();
        Map<String, String> moduleCodes = new LinkedHashMap<>();
        noteService.groupNotesByModule(notes, program, level, semester, groupedNotes, moduleCodes);
        
        model.addAttribute("selectedProgram", program);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedSemester", semester);
        model.addAttribute("groupedNotes", groupedNotes);
        model.addAttribute("moduleCodes", moduleCodes);
        model.addAttribute("notes", notes);
        model.addAttribute("notesPage", notesPage);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", notesPage.getTotalPages());
        return "notes/guest_notes";
    }

    @GetMapping("/upgrade")
    public String upgrade(HttpSession session, Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";

        model.addAttribute("user", loggedInUser);
        return "user/upgrade";
    }

}

