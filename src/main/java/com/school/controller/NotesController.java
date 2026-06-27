package com.school.controller;

import com.school.model.Note;
import com.school.model.User;
import com.school.service.NoteService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
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
import org.springframework.core.io.InputStreamResource;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.ByteArrayOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.ArrayList;
import com.school.service.FileStorageService;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
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
    private FileStorageService fileStorageService;

    @Autowired
    private Cloudinary cloudinary;

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
        return "index";
    }

    @GetMapping("/semesters")
    public String selectSemester(@RequestParam("level") Integer level, HttpSession session, Model model) {
        if (getLoggedInUser() == null) return "redirect:/login";
        model.addAttribute("selectedLevel", level);
        return "semesters";
    }

    @GetMapping("/notes")
    public String browseNotes(@RequestParam(value = "program", required = false, defaultValue = "DIP_CSE") String program,
                              @RequestParam(value = "level", required = false) Integer level,
                              @RequestParam(value = "semester", required = false) Integer semester,
                              @RequestParam(value = "category", required = false) String category,
                              @RequestParam(value = "search", required = false) String search,
                              @RequestParam(value = "page", defaultValue = "0") int page,
                              HttpSession session, Model model) {
        org.springframework.data.domain.Page<Note> notesPage;
        if (level != null && semester != null) {
            if (category != null && !category.trim().isEmpty()) {
                if (search != null && !search.trim().isEmpty()) {
                    List<Note> list = noteRepository.searchNotesByProgramLevelSemesterAndCategory(program, level, semester, category, search.trim());
                    notesPage = new org.springframework.data.domain.PageImpl<>(list);
                    model.addAttribute("searchQuery", search);
                } else {
                    List<Note> list = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoAndCategoryOrderByIdDesc(program, level, semester, category);
                    notesPage = new org.springframework.data.domain.PageImpl<>(list);
                }
                model.addAttribute("selectedCategory", category);
            } else {
                if (search != null && !search.trim().isEmpty()) {
                    List<Note> list = noteRepository.searchNotesByProgramLevelAndSemester(program, level, semester, search.trim());
                    notesPage = new org.springframework.data.domain.PageImpl<>(list);
                    model.addAttribute("searchQuery", search);
                } else {
                    notesPage = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(program, level, semester, org.springframework.data.domain.PageRequest.of(page, 50));
                }
            }
            model.addAttribute("selectedLevel", level);
            model.addAttribute("selectedSemester", semester);
        } else {
            if (search != null && !search.trim().isEmpty()) {
                List<Note> list = noteRepository.searchNotes(search.trim());
                notesPage = new org.springframework.data.domain.PageImpl<>(list);
                model.addAttribute("searchQuery", search);
            } else {
                notesPage = noteRepository.findAllByOrderByIdDesc(org.springframework.data.domain.PageRequest.of(page, 50));
            }
        }
        model.addAttribute("notesPage", notesPage);
        model.addAttribute("notes", notesPage.getContent());
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", notesPage.getTotalPages());
        model.addAttribute("selectedProgram", program);
        model.addAttribute("popularNotes", noteRepository.findTop5ByOrderByDownloadCountDesc());
        return "notes";
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

        org.springframework.data.domain.Page<Note> notesPage;
        if (search != null && !search.trim().isEmpty()) {
            List<Note> list = noteRepository.searchNotesByProgramLevelAndSemester(program, level, semester, search.trim());
            notesPage = new org.springframework.data.domain.PageImpl<>(list);
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

        model.addAttribute("popularNotes", noteRepository.findTop5ByOrderByDownloadCountDesc());
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
                             HttpSession session) {
        User loggedInUser = getLoggedInUser();
        if (loggedInUser == null || !Role.ADMIN.equals(loggedInUser.getRole())) return "redirect:/dashboard";

        if (file.isEmpty()) return "redirect:/upload?error=Please select a file to upload.";

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
        } catch (IOException e) {
            return "redirect:/upload?error=Upload failed: " + e.getMessage();
        }
        return "redirect:/upload?success=Note uploaded successfully!";
    }


    @GetMapping("/download/{id}")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@PathVariable("id") String id, HttpSession session) {
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null) return ResponseEntity.notFound().build();

        note.setDownloadCount((note.getDownloadCount() == null ? 0 : note.getDownloadCount()) + 1);
        noteRepository.save(note);

        if (note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, note.getFileUrl())
                    .build();
        }

        String filename = note.getFilename();
        if (filename == null || filename.isEmpty()) filename = "note-" + id + ".txt";

        String fileContent = "=== STUDENT NOTES HUB ===\n" +
                "Title: " + note.getTitle() + "\nProgram: " + note.getProgramType() + "\n" +
                "Level/Year: " + note.getLevelNo() + "\nSemester: " + note.getSemesterNo() + "\n" +
                "Category: " + note.getCategory() + "\nUploaded: " + note.getUploadDate() + "\n" +
                "=========================\nDownloaded from 4LAZIE Student Notes Hub.";

        ByteArrayResource resource = new ByteArrayResource(fileContent.getBytes());
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(fileContent.length())
                .body(resource);
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

    @GetMapping("/view/{id}")
    public String viewNotePage(@PathVariable("id") String id, HttpSession session, org.springframework.ui.Model model) {
        User loggedInUser = getLoggedInUser();
        Note note = noteRepository.findById(id).orElse(null);
        
        if (note == null) {
            return "redirect:/dashboard";
        }
        
        if (!note.getIsPublic() && loggedInUser == null) {
            return "redirect:/login";
        }
        
        // Exclusive Resource Check Logic
        if (note.getCategory() != null && !note.getCategory().equalsIgnoreCase("Note")) {
            if (loggedInUser == null) {
                return "redirect:/login";
            }
        }
        
        model.addAttribute("note", note);
        model.addAttribute("user", loggedInUser);
        
        return "view_note";
    }

    @GetMapping("/stream/{id}")
    public Object streamNote(@PathVariable("id") String id, HttpSession session) {
        Note note = noteRepository.findById(id).orElse(null);

        if (note != null && note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
            String fileUrl = note.getFileUrl();
            String lowerName = note.getFilename() != null ? note.getFilename().toLowerCase() : "";
            
            if (lowerName.endsWith(".pdf") || lowerName.endsWith(".doc") || lowerName.endsWith(".docx") || lowerName.endsWith(".ppt") || lowerName.endsWith(".pptx")) {
                try {
                    String encodedUrl = java.net.URLEncoder.encode(fileUrl, "UTF-8");
                    String viewerUrl = "https://docs.google.com/viewer?url=" + encodedUrl + "&embedded=true";
                    return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                            .header(HttpHeaders.LOCATION, viewerUrl)
                            .build();
                } catch (Exception e) {
                    // Fallback to direct URL if encoding fails
                }
            }
            
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, fileUrl)
                    .build();
        }

        String title = note != null ? note.getTitle() : "Document " + id;
        String filename = note != null ? note.getFilename() : "document-" + id + ".txt";

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

    @GetMapping("/guest-notes")
    public String guestNotesList(@RequestParam(value = "program", required = false, defaultValue = "DIP_CSE") String program,
                                 @RequestParam(value = "level", required = false, defaultValue = "5") Integer level, 
                                 @RequestParam(value = "semester", required = false, defaultValue = "2") Integer semester,
                                 @RequestParam(value = "page", defaultValue = "0") int page,
                                 org.springframework.ui.Model model, HttpSession session) {
        if (getLoggedInUser() != null) {
            return "redirect:/notes?program=" + program + "&level=" + level + "&semester=" + semester + "&page=" + page;
        }
        
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

