package com.school.controller;

import com.school.model.Note;
import com.school.model.User;
import com.school.repository.NoteRepository;
import com.school.repository.CourseRepository;
import com.school.repository.SubjectRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
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

@Controller
@SuppressWarnings("null")
public class NotesController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping("/home")
    public String home(@RequestParam(value = "program", required = false, defaultValue = "DIPLOMA") String program,
                       @RequestParam(value = "level", required = false) Integer level,
                       @RequestParam(value = "search", required = false) String search,
                       Model model, HttpSession session) {
        if (session.getAttribute("user") != null) {
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
        if (session.getAttribute("user") == null) return "redirect:/login";
        model.addAttribute("selectedLevel", level);
        return "semesters";
    }

    @GetMapping("/notes")
    public String browseNotes(@RequestParam(value = "program", required = false, defaultValue = "DIPLOMA") String program,
                              @RequestParam(value = "level", required = false) Integer level,
                              @RequestParam(value = "semester", required = false) Integer semester,
                              @RequestParam(value = "category", required = false) String category,
                              @RequestParam(value = "search", required = false) String search,
                              HttpSession session, Model model) {
        if (session.getAttribute("user") == null) return "redirect:/login";

        List<Note> notes;
        if (level != null && semester != null) {
            if (category != null && !category.trim().isEmpty()) {
                if (search != null && !search.trim().isEmpty()) {
                    notes = noteRepository.searchNotesByProgramLevelSemesterAndCategory(program, level, semester, category, search.trim());
                    model.addAttribute("searchQuery", search);
                } else {
                    notes = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoAndCategoryOrderByIdDesc(program, level, semester, category);
                }
                model.addAttribute("selectedCategory", category);
            } else {
                if (search != null && !search.trim().isEmpty()) {
                    notes = noteRepository.searchNotesByProgramLevelAndSemester(program, level, semester, search.trim());
                    model.addAttribute("searchQuery", search);
                } else {
                    notes = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(program, level, semester);
                }
            }
            model.addAttribute("selectedLevel", level);
            model.addAttribute("selectedSemester", semester);
        } else {
            if (search != null && !search.trim().isEmpty()) {
                notes = noteRepository.searchNotes(search.trim());
                model.addAttribute("searchQuery", search);
            } else {
                notes = noteRepository.findAllByOrderByIdDesc();
            }
        }
        model.addAttribute("notes", notes);
        model.addAttribute("selectedProgram", program);
        model.addAttribute("popularNotes", noteRepository.findTop5ByOrderByDownloadCountDesc());
        return "notes";
    }

    @GetMapping("/dashboard")
    public String dashboard(@RequestParam(value = "program", required = false, defaultValue = "DIPLOMA") String program,
                            @RequestParam(value = "level", required = false) Integer level,
                            @RequestParam(value = "semester", required = false) Integer semester,
                            @RequestParam(value = "search", required = false) String search, 
                            HttpSession session, Model model) {
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null) return "redirect:/login";

        if (level == null) level = (loggedInUser.getLevel() != null) ? loggedInUser.getLevel() : 4;
        if (semester == null) semester = (loggedInUser.getSemester() != null) ? loggedInUser.getSemester() : 1;

        List<Note> notes;
        if (search != null && !search.trim().isEmpty()) {
            notes = noteRepository.searchNotesByProgramLevelAndSemester(program, level, semester, search.trim());
            model.addAttribute("searchQuery", search);
        } else {
            notes = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(program, level, semester);
        }

        model.addAttribute("notes", notes);
        
        Map<String, List<Note>> groupedNotes = new LinkedHashMap<>();
        Map<String, String> moduleCodes = new LinkedHashMap<>();
        for (Note note : notes) {
            String modName = note.getModuleName() != null ? note.getModuleName() : "GENERAL MODULE";
            groupedNotes.computeIfAbsent(modName, k -> new ArrayList<>()).add(note);
            if (!moduleCodes.containsKey(modName) && note.getModuleCode() != null && !note.getModuleCode().isEmpty()) {
                moduleCodes.put(modName, note.getModuleCode());
            }
        }
        
        // Fetch subjects for this program, level, and semester to display even if empty
        List<com.school.model.Course> courses = courseRepository.findByProgramType(program);
        if (!courses.isEmpty()) {
            com.school.model.Course course = courses.get(0);
            List<com.school.model.Subject> subjects = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(course.getId(), level, semester);
            for (com.school.model.Subject sub : subjects) {
                groupedNotes.putIfAbsent(sub.getName(), new ArrayList<>());
                moduleCodes.putIfAbsent(sub.getName(), sub.getCode() != null ? sub.getCode() : "");
            }
        }

        model.addAttribute("groupedNotes", groupedNotes);
        model.addAttribute("moduleCodes", moduleCodes);
        
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedSemester", semester);
        model.addAttribute("selectedProgram", program);
        model.addAttribute("user", loggedInUser);

        model.addAttribute("popularNotes", noteRepository.findTop5ByOrderByDownloadCountDesc());
        model.addAttribute("recentNotes", noteRepository.findTop5ByOrderByUploadDateDesc());
        model.addAttribute("totalNotes", noteRepository.count());
        model.addAttribute("totalDownloads", noteRepository.findAll().stream()
                .mapToInt(n -> n.getDownloadCount() != null ? n.getDownloadCount() : 0).sum());

        return "dashboard";
    }

    @GetMapping("/upload")
    public String showUploadPage(HttpSession session, Model model) {
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !"ADMIN".equals(loggedInUser.getRole())) return "redirect:/dashboard";
        model.addAttribute("user", loggedInUser);
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
                             @RequestParam("file") MultipartFile file,
                             HttpSession session) {
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !"ADMIN".equals(loggedInUser.getRole())) return "redirect:/dashboard";

        if (file.isEmpty()) return "redirect:/upload?error=Please select a file to upload.";

        try {
            Path uploadDir = Paths.get("uploads");
            if (!Files.exists(uploadDir)) Files.createDirectories(uploadDir);

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            Note note = new Note();
            note.setTitle(title);
            note.setProgramType(programType);
            note.setLevelNo(levelNo);
            note.setSemesterNo(semesterNo);
            note.setModuleName(moduleName != null && !moduleName.trim().isEmpty() ? moduleName.trim().toUpperCase() : "GENERAL MODULE");
            note.setModuleCode(moduleCode != null ? moduleCode.trim().toUpperCase() : "");
            note.setCategory(category == null || category.trim().isEmpty() ? "Note" : category);
            note.setUnitNumber(unitNumber);
            note.setFilename(filename);
            note.setUploadDate(LocalDateTime.now());
            noteRepository.save(note);
        } catch (IOException e) {
            return "redirect:/upload?error=Upload failed: " + e.getMessage();
        }
        return "redirect:/upload?success=Note uploaded successfully!";
    }

    @GetMapping("/download/{id}")
    @ResponseBody
    public ResponseEntity<Resource> downloadFile(@PathVariable("id") Integer id, HttpSession session) {
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null) return ResponseEntity.notFound().build();

        User loggedInUser = (User) session.getAttribute("user");

        note.setDownloadCount((note.getDownloadCount() == null ? 0 : note.getDownloadCount()) + 1);
        noteRepository.save(note);

        if (note != null && note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
            String downloadUrl = note.getFileUrl();
            if (downloadUrl.contains("/upload/")) {
                downloadUrl = downloadUrl.replace("/upload/", "/upload/fl_attachment/");
            }
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, downloadUrl)
                    .build();
        }

        String filename = note.getFilename();
        if (filename == null || filename.isEmpty()) filename = "note-" + id + ".txt";

        Path filePath = Paths.get("uploads").resolve(filename);
        if (Files.exists(filePath)) {
            try {
                Resource resource = new UrlResource(filePath.toUri());
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            } catch (MalformedURLException e) { }
        }

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
        List<Note> notes = noteRepository.findByProgramTypeAndLevelNoOrderByIdDesc(program, level);
        if (notes.isEmpty()) return ResponseEntity.notFound().build();

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             ZipOutputStream zos = new ZipOutputStream(baos)) {

            for (Note note : notes) {
                String filename = note.getFilename() != null && !note.getFilename().isEmpty() ? note.getFilename() : "note-" + note.getId() + ".txt";
                byte[] contentBytes;
                Path filePath = Paths.get("uploads").resolve(filename);
                if (Files.exists(filePath)) {
                    contentBytes = Files.readAllBytes(filePath);
                } else {
                    String fileContent = "=== STUDENT NOTES HUB ===\nTitle: " + note.getTitle() + "\nLevel: " + note.getLevelNo() + "\nDownloaded from 4LAZIE.";
                    contentBytes = fileContent.getBytes();
                }
                ZipEntry entry = new ZipEntry(filename);
                zos.putNextEntry(entry);
                zos.write(contentBytes);
                zos.closeEntry();
            }
            zos.finish();

            byte[] zipBytes = baos.toByteArray();
            ByteArrayResource resource = new ByteArrayResource(zipBytes);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"level-" + level + "-notes.zip\"")
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .contentLength(zipBytes.length)
                    .body(resource);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/view/{id}")
    public String viewNotePage(@PathVariable("id") Integer id, HttpSession session, org.springframework.ui.Model model) {
        User loggedInUser = (User) session.getAttribute("user");
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
    public void streamNote(@PathVariable("id") Integer id, jakarta.servlet.http.HttpServletResponse response) {
        Note note = noteRepository.findById(id).orElse(null);

        if (note != null && note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
            try {
                java.net.URL url = new java.net.URL(note.getFileUrl());
                java.net.HttpURLConnection connection = (java.net.HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
                connection.setRequestProperty("Accept", "*/*");
                connection.setInstanceFollowRedirects(true);
                connection.connect();

                // If Cloudinary redirects, follow it (HttpURLConnection follows automatically within same protocol)
                int status = connection.getResponseCode();
                if (status == java.net.HttpURLConnection.HTTP_MOVED_TEMP || status == java.net.HttpURLConnection.HTTP_MOVED_PERM || status == java.net.HttpURLConnection.HTTP_SEE_OTHER) {
                    String newUrl = connection.getHeaderField("Location");
                    connection = (java.net.HttpURLConnection) new java.net.URL(newUrl).openConnection();
                    connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
                    connection.connect();
                    status = connection.getResponseCode();
                }

                if (status == 200) {
                    String filename = note.getFilename() != null ? note.getFilename() : "document-" + id + ".pdf";
                    response.setContentType("application/pdf");
                    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"");

                    try (java.io.InputStream in = connection.getInputStream();
                         java.io.OutputStream out = response.getOutputStream()) {
                        byte[] buffer = new byte[8192];
                        int length;
                        while ((length = in.read(buffer)) > 0) {
                            out.write(buffer, 0, length);
                        }
                        out.flush();
                    }
                    return; // Successfully proxied
                }
            } catch (Exception e) {
                // Fallback to mock html
                System.err.println("Proxy failed: " + e.getMessage());
            }
        }

        String title = note != null ? note.getTitle() : "Document " + id;
        String filename = note != null ? note.getFilename() : "document-" + id + ".txt";

        try {
            if (note != null && note.getFilename() != null) {
                Path filePath = Paths.get("uploads").resolve(note.getFilename());
                if (Files.exists(filePath) && Files.isReadable(filePath)) {
                    String mimeType = Files.probeContentType(filePath);
                    if (mimeType == null) mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
                    
                    response.setContentType(mimeType);
                    response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + note.getFilename() + "\"");
                    
                    Files.copy(filePath, response.getOutputStream());
                    response.getOutputStream().flush();
                    return;
                }
            }
        } catch (Exception e) { }

        try {
            String mockHtml = "<html><body style='font-family: Arial, sans-serif; padding: 40px; text-align: center; color: #333;'><h2 style='color: #2563eb;'>" + title + "</h2><div style='border: 1px dashed #ccc; padding: 20px; border-radius: 8px; margin-top: 20px; background: #f9f9f9;'><p>This is a <b>simulated document preview</b> for development purposes.</p></div></body></html>";
            response.setContentType(MediaType.TEXT_HTML_VALUE);
            response.setHeader(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"preview.html\"");
            response.getWriter().write(mockHtml);
            response.getWriter().flush();
        } catch (Exception e) {}
    }

    @GetMapping("/guest-notes")
    public String guestNotesList(@RequestParam(value = "program", required = false, defaultValue = "DIPLOMA") String program,
                                 @RequestParam(value = "level", required = false, defaultValue = "4") Integer level, 
                                 @RequestParam(value = "semester", required = false, defaultValue = "1") Integer semester,
                                 org.springframework.ui.Model model, HttpSession session) {
        if (session.getAttribute("user") != null) {
            return "redirect:/notes?program=" + program + "&level=" + level + "&semester=" + semester;
        }
        
        List<Note> notes = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(program, level, semester);
        
        Map<String, List<Note>> groupedNotes = new LinkedHashMap<>();
        Map<String, String> moduleCodes = new LinkedHashMap<>();
        for (Note note : notes) {
            String modName = note.getModuleName() != null ? note.getModuleName() : "GENERAL MODULE";
            groupedNotes.computeIfAbsent(modName, k -> new ArrayList<>()).add(note);
            if (!moduleCodes.containsKey(modName) && note.getModuleCode() != null && !note.getModuleCode().isEmpty()) {
                moduleCodes.put(modName, note.getModuleCode());
            }
        }
        
        // Fetch subjects for this program, level, and semester to display even if empty
        List<com.school.model.Course> courses = courseRepository.findByProgramType(program);
        if (!courses.isEmpty()) {
            com.school.model.Course course = courses.get(0);
            List<com.school.model.Subject> subjects = subjectRepository.findByCourseIdAndLevelNoAndSemesterNo(course.getId(), level, semester);
            for (com.school.model.Subject sub : subjects) {
                groupedNotes.putIfAbsent(sub.getName(), new ArrayList<>());
                moduleCodes.putIfAbsent(sub.getName(), sub.getCode() != null ? sub.getCode() : "");
            }
        }
        
        model.addAttribute("selectedProgram", program);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedSemester", semester);
        model.addAttribute("groupedNotes", groupedNotes);
        model.addAttribute("moduleCodes", moduleCodes);
        model.addAttribute("notes", notes);
        return "guest_notes";
    }

    @GetMapping("/upgrade")
    public String upgrade(HttpSession session, Model model) {
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null) return "redirect:/login";

        model.addAttribute("user", loggedInUser);
        return "upgrade";
    }
}
