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

    private User getLoggedInUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth instanceof AnonymousAuthenticationToken) {
            return null;
        }
        Object principal = auth.getPrincipal();
        String email;
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            email = (String) principal;
        } else {
            return null;
        }
        return userRepository.findByEmail(email).orElse(null);
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
            notes = noteRepository.searchNotesByProgramAndLevel(program, level, safeSearch, org.springframework.data.domain.PageRequest.of(0, 3)).getContent().stream()
                    .filter(n -> n != null && Boolean.TRUE.equals(n.getIsPublic()))
                    .collect(Collectors.toList());
            model.addAttribute("searchQuery", search);
        } else {
            notes = noteRepository.findByProgramTypeAndLevelNoOrderByIdDesc(program, level).stream()
                    .filter(n -> n != null && Boolean.TRUE.equals(n.getIsPublic()))
                    .limit(3)
                    .collect(Collectors.toList());
        }
        model.addAttribute("notes", notes);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedProgram", program);
        return "index";
    }

    @GetMapping("/semesters")
    public String selectSemester(@RequestParam("level") Integer level, HttpSession session, Model model) {
        if (getLoggedInUser() == null) return "redirect:/login";
        model.addAttribute("selectedLevel", level);
        return "semesters";
    }

    @GetMapping("/notes")
    public String browseNotes(@RequestParam(value = "program", required = false) String program,
                              @RequestParam(value = "level", required = false) Integer level,
                              @RequestParam(value = "semester", required = false) Integer semester,
                              @RequestParam(value = "category", required = false) String category,
                              @RequestParam(value = "search", required = false) String search,
                              @RequestParam(value = "page", defaultValue = "0") int page,
                              HttpSession session, Model model) {
        User loggedInUser = getLoggedInUser();
        
        // If parameters are missing, fallback to logged-in user profile, otherwise default to DIP_CSE/4/1
        if (program == null || program.isEmpty()) {
            program = (loggedInUser != null && loggedInUser.getCourseProgram() != null && !loggedInUser.getCourseProgram().isEmpty()) 
                      ? loggedInUser.getCourseProgram() : "DIP_CSE";
        }
        if (level == null) {
            level = (loggedInUser != null && loggedInUser.getLevel() != null) ? loggedInUser.getLevel() : 4;
        }
        if (semester == null) {
            semester = (loggedInUser != null && loggedInUser.getSemester() != null) ? loggedInUser.getSemester() : 1;
        }
        org.springframework.data.domain.Page<Note> notesPage;
        if (level != null && semester != null) {
            if (category != null && !category.trim().isEmpty()) {
                if (search != null && !search.trim().isEmpty()) {
                    String safeSearch = escapeRegex(search.trim());
                    notesPage = noteRepository.searchNotesByProgramLevelSemesterAndCategory(program, level, semester, category, safeSearch, org.springframework.data.domain.PageRequest.of(page, 50));
                    model.addAttribute("searchQuery", search);
                } else {
                    List<Note> list = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoAndCategoryOrderByIdDesc(program, level, semester, category);
                    notesPage = new org.springframework.data.domain.PageImpl<>(list);
                }
                model.addAttribute("selectedCategory", category);
            } else {
                if (search != null && !search.trim().isEmpty()) {
                    String safeSearch = escapeRegex(search.trim());
                    notesPage = noteRepository.searchNotesByProgramLevelAndSemester(program, level, semester, safeSearch, org.springframework.data.domain.PageRequest.of(page, 50));
                    model.addAttribute("searchQuery", search);
                } else {
                    notesPage = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(program, level, semester, org.springframework.data.domain.PageRequest.of(page, 50));
                }
            }
            model.addAttribute("selectedLevel", level);
            model.addAttribute("selectedSemester", semester);
        } else {
            if (search != null && !search.trim().isEmpty()) {
                String safeSearch = escapeRegex(search.trim());
                notesPage = noteRepository.searchNotes(safeSearch, org.springframework.data.domain.PageRequest.of(page, 50));
                model.addAttribute("searchQuery", search);
            } else {
                notesPage = noteRepository.findAllByOrderByIdDesc(org.springframework.data.domain.PageRequest.of(page, 50));
            }
        }
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
        model.addAttribute("popularNotes", noteRepository.findTop3ByOrderByDownloadCountDesc());
        model.addAttribute("courses", getSimpleCourses());
        return "notes";
    }

    private List<Map<String, String>> getSimpleCourses() {
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
        return "cat1_past_papers";
    }

    @GetMapping("/cat2")
    public String cat2PastPapers(Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";
        model.addAttribute("courses", getSimpleCourses());
        model.addAttribute("user", loggedInUser);
        return "cat2_past_papers";
    }

    @GetMapping("/assignments")
    public String assignmentsPastPapers(Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";
        model.addAttribute("courses", getSimpleCourses());
        model.addAttribute("user", loggedInUser);
        return "assignments_past_papers";
    }

    @GetMapping("/ue_exams")
    public String ueExamsPastPapers(Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";
        model.addAttribute("courses", getSimpleCourses());
        model.addAttribute("user", loggedInUser);
        return "ue_past_papers";
    }

    @GetMapping("/projects")
    public String projectsPastPapers(Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";
        model.addAttribute("courses", getSimpleCourses());
        model.addAttribute("user", loggedInUser);
        return "projects_past_papers";
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

        if (level == null) level = (loggedInUser.getLevel() != null) ? loggedInUser.getLevel() : 4;
        if (semester == null) semester = (loggedInUser.getSemester() != null) ? loggedInUser.getSemester() : 1;
        
        if ("DIPLOMA".equals(program) || "DIP_CSE".equals(program)) {
            if (loggedInUser.getCourseProgram() != null && !loggedInUser.getCourseProgram().isEmpty()) {
                program = loggedInUser.getCourseProgram();
            }
        }

        org.springframework.data.domain.Page<Note> notesPage;
        if (search != null && !search.trim().isEmpty()) {
            String safeSearch = escapeRegex(search.trim());
            notesPage = noteRepository.searchNotesByProgramLevelAndSemester(program, level, semester, safeSearch, org.springframework.data.domain.PageRequest.of(page, 50));
            model.addAttribute("searchQuery", search);
        } else {
            notesPage = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(program, level, semester, org.springframework.data.domain.PageRequest.of(page, 50));
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

        model.addAttribute("popularNotes", noteRepository.findTop3ByOrderByDownloadCountDesc());
        model.addAttribute("recentNotes", noteRepository.findTop5ByOrderByUploadDateDesc());
        model.addAttribute("totalNotes", noteRepository.count());
        model.addAttribute("totalDownloads", noteRepository.getTotalDownloadCount());

        return "dashboard";
    }

    @GetMapping("/upload")
    public String showUploadPage(HttpSession session, Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null || !Role.ADMIN.equals(loggedInUser.getRole())) return "redirect:/dashboard";
        model.addAttribute("user", loggedInUser);
        model.addAttribute("courses", courseRepository.findAll());
        return "upload";
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
                             @RequestParam("file") MultipartFile file,
                             HttpSession session, jakarta.servlet.http.HttpServletRequest request) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null || !Role.ADMIN.equals(loggedInUser.getRole())) return "redirect:/dashboard";

        if (file.isEmpty()) return "redirect:/upload?error=Please select a file to upload.";

        // Validate File Extension to prevent uploading malicious scripts/executables
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null) {
            String ext = originalFilename.substring(originalFilename.lastIndexOf('.') + 1).toLowerCase();
            List<String> allowedExtensions = List.of("pdf", "doc", "docx", "ppt", "pptx", "xls", "xlsx", "jpg", "jpeg", "png", "txt");
            if (!allowedExtensions.contains(ext)) {
                return "redirect:/upload?error=Security Alert: Invalid file type. Only standard documents and images are allowed.";
            }
        }

        try {
            // Upload to Cloudinary
            String fileUrl = fileStorageService.uploadFile(file);
            String filename = file.getOriginalFilename();

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
            note.setFilename(filename);
            note.setFileUrl(fileUrl);
            note.setUploadDate(LocalDateTime.now());
            note.setIsPublic(true);
            // Link to SJUIT (institution id=1) automatically
            Institution institution = institutionRepository.findById("1").orElse(null);
            note.setInstitution(institution);
            noteRepository.save(note);
            
            // Send Push Notification
            if (pushNotificationService != null) {
                String pushTitle = "Fresh Material Dropped!";
                String categoryLabel = (category == null || category.trim().isEmpty()) ? "Note" : category;
                String pushBody = "New " + categoryLabel + ": " + title + " is now available. Tap to view and stay ahead!";
                String pushUrl = "/view/" + note.getEncryptedSlug();
                
                // Send async to not block the upload response (Now uses @Async in service)
                pushNotificationService.sendToAllSubscribers(pushTitle, pushBody, pushUrl);
                
                // Also create in-app notification and send EMAIL to matched students
                if (notificationService != null && userRepository != null) {
                    List<User> matchedUsers = userRepository.findAll().stream()
                        .filter(u -> programType.equals(u.getCourseProgram()) &&
                                     levelNo.equals(u.getLevel()) &&
                                     semesterNo.equals(u.getSemester()))
                        .collect(Collectors.toList());
                        
                    for (User u : matchedUsers) {
                        // Notify everyone except the uploader (Admin)
                        if (!u.getId().equals(loggedInUser.getId())) {
                            notificationService.createNotification(u.getId(), pushTitle, pushBody);
                            
                            // Send HTML Email using the base URL
                            String appUrl = "https://" + request.getServerName();
                            if (request.getServerPort() != 80 && request.getServerPort() != 443) {
                                appUrl += ":" + request.getServerPort();
                            }
                            String emailLink = appUrl + pushUrl;
                            emailService.sendNewNoteNotification(u.getEmail(), title, categoryLabel, emailLink);
                        }
                    }
                }
            }
            
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
        // Support both old {id}-{title} slugs and new AES encrypted slugs
        String id;
        if (slug.contains("-")) {
            id = slug.split("-")[0];
        } else {
            id = com.school.util.EncryptionUtil.decrypt(slug);
        }
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null) {
            response.sendError(404, "Note not found");
            return;
        }

        User loggedInUser = getLoggedInUser();
        
        // Ensure only Assignments, Past Papers, CAT, UE, Projects require login.
        if (note.getCategory() != null && loggedInUser == null) {
            String cat = note.getCategory().toUpperCase();
            if (cat.contains("ASSIGNMENT") || cat.contains("PROJECT") || cat.contains("UE") || cat.contains("CAT") || cat.contains("PAST")) {
                response.sendRedirect("/login");
                return;
            }
        }

        note.setDownloadCount((note.getDownloadCount() == null ? 0 : note.getDownloadCount()) + 1);
        noteRepository.save(note);

        if (loggedInUser != null) {
            loggedInUser.getDownloadedNotes().add(note.getId());
            userRepository.save(loggedInUser);
        }

        if (note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
            String cloudinaryUrl = note.getFileUrl().replaceFirst("^http://", "https://");
            
            // Format a nice, branded filename for the download
            String cleanTitle = note.getTitle() != null ? note.getTitle().replaceAll("[^a-zA-Z0-9]", "_") : "Document";
            String brandedName = "4LAZIE_" + cleanTitle;
            
            if (cloudinaryUrl.contains("/upload/")) {
                cloudinaryUrl = cloudinaryUrl.replace("/upload/", "/upload/fl_attachment:" + brandedName + "/");
            }
            try {
                response.sendRedirect(cloudinaryUrl);
                return;
            } catch (Exception e) {
                // fall through to text fallback
            }
        }

        String filename = note.getFilename();
        if (filename == null || filename.isEmpty()) filename = "note-" + id + ".txt";

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
    public String viewNotePage(@PathVariable("slug") String slug, HttpSession session, org.springframework.ui.Model model) {
        String id;
        if (slug.contains("-")) {
            id = slug.split("-")[0];
        } else {
            id = com.school.util.EncryptionUtil.decrypt(slug);
        }
        User loggedInUser = getLoggedInUser();
        Note note = noteRepository.findById(id).orElse(null);
        
        if (note == null) {
            return "redirect:/dashboard";
        }
        
        // Ensure only Assignments, Past Papers, CAT, UE, Projects require login.
        if (note.getCategory() != null && loggedInUser == null) {
            String cat = note.getCategory().toUpperCase();
            if (cat.contains("ASSIGNMENT") || cat.contains("PROJECT") || cat.contains("UE") || cat.contains("CAT") || cat.contains("PAST")) {
                return "redirect:/login";
            }
        }
        
        note.setViewCount((note.getViewCount() == null ? 0 : note.getViewCount()) + 1);
        noteRepository.save(note);
        
        model.addAttribute("note", note);
        model.addAttribute("user", loggedInUser);
        
        return "view_note";
    }

    @GetMapping("/stream/{slug}")
    public Object streamNote(@PathVariable("slug") String slug, HttpSession session) {
        String id;
        if (slug.contains("-")) {
            id = slug.split("-")[0];
        } else {
            id = com.school.util.EncryptionUtil.decrypt(slug);
        }
        Note note = noteRepository.findById(id).orElse(null);

        User loggedInUser = getLoggedInUser();
        if (note != null && !note.getIsPublic() && loggedInUser == null) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND).header(HttpHeaders.LOCATION, "/login").build();
        }
        if (note != null && note.getCategory() != null && !note.getCategory().equalsIgnoreCase("Note") && loggedInUser == null) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND).header(HttpHeaders.LOCATION, "/login").build();
        }

        if (note != null && note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, note.getFileUrl())
                    .build();
        }

        String title = note != null ? note.getTitle() : "Document " + id;

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

    // proxyDocument has been removed for better scalability.

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

        // if (getLoggedInUser() != null) {
        //     return "redirect:/notes?program=" + program + "&level=" + level + "&semester=" + semester + "&page=" + page;
        // }
        
        org.springframework.data.domain.Page<Note> notesPage = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(program, level, semester, org.springframework.data.domain.PageRequest.of(page, 50));
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
        return "guest_notes";
    }

    @GetMapping("/upgrade")
    public String upgrade(HttpSession session, Model model) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null) return "redirect:/login";

        model.addAttribute("user", loggedInUser);
        return "upgrade";
    }

}

