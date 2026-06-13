package com.school.controller;

import com.school.model.Note;
import com.school.model.User;
import com.school.repository.NoteRepository;
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

@Controller
@SuppressWarnings("null")
public class NotesController {

    @Autowired
    private NoteRepository noteRepository;

    // NOTE: The root ("/") mapping is handled by HomeController. This method is retained for backward compatibility but now maps to "/home".
    @GetMapping("/home")
    public String home(@RequestParam(value = "level", required = false) Integer level,
                       @RequestParam(value = "search", required = false) String search,
                       Model model, HttpSession session) {
        // Logged-in users go straight to their dashboard
        if (session.getAttribute("user") != null) {
            return "redirect:/dashboard";
        }

        // Defaults
        if (level == null) {
            level = 4;
        }

        List<Note> notes;
        if (search != null && !search.trim().isEmpty()) {
            notes = noteRepository.searchNotesByLevel(level, search.trim()).stream()
                    .filter(Note::getIsPublic)
                    .limit(3)
                    .collect(Collectors.toList());
            model.addAttribute("searchQuery", search);
        } else {
            notes = noteRepository.findByLevelNoOrderByIdDesc(level).stream()
                    .filter(Note::getIsPublic)
                    .limit(3)
                    .collect(Collectors.toList());
        }
        model.addAttribute("notes", notes);
        model.addAttribute("selectedLevel", level);
        return "index";
    }

    @GetMapping("/semesters")
    public String selectSemester(@RequestParam("level") Integer level, HttpSession session, Model model) {
        // Require login to view semester structure
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null) {
            return "redirect:/login";
        }
        model.addAttribute("selectedLevel", level);
        return "semesters";
    }

    @GetMapping("/notes")
    public String browseNotes(@RequestParam(value = "level", required = false) Integer level,
                              @RequestParam(value = "semester", required = false) Integer semester,
                              @RequestParam(value = "category", required = false) String category,
                              @RequestParam(value = "search", required = false) String search,
                              HttpSession session,
                              Model model) {
        // Require login to browse notes and use advanced search
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null) {
            return "redirect:/login";
        }

        List<Note> notes;
        if (level != null && semester != null) {
            if (category != null && !category.trim().isEmpty()) {
                if (search != null && !search.trim().isEmpty()) {
                    notes = noteRepository.searchNotesByLevelSemesterAndCategory(level, semester, category, search.trim());
                    model.addAttribute("searchQuery", search);
                } else {
                    notes = noteRepository.findByLevelNoAndSemesterNoAndCategoryOrderByIdDesc(level, semester, category);
                }
                model.addAttribute("selectedCategory", category);
            } else {
                if (search != null && !search.trim().isEmpty()) {
                    notes = noteRepository.searchNotesByLevelAndSemester(level, semester, search.trim());
                    model.addAttribute("searchQuery", search);
                } else {
                    notes = noteRepository.findByLevelNoAndSemesterNoOrderByIdDesc(level, semester);
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
        return "notes";
    }

    @GetMapping("/dashboard")
    public String dashboard(@RequestParam(value = "level", required = false) Integer level,
                            @RequestParam(value = "semester", required = false) Integer semester,
                            @RequestParam(value = "search", required = false) String search, 
                            HttpSession session, 
                            Model model) {
        // Require login to view dashboard
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null) {
            return "redirect:/login";
        }

        // Defaults
        if (level == null) {
            level = (loggedInUser.getLevel() != null) ? loggedInUser.getLevel() : 4;
        }
        if (semester == null) {
            semester = (loggedInUser.getSemester() != null) ? loggedInUser.getSemester() : 1;
        }

        List<Note> notes;
        if (search != null && !search.trim().isEmpty()) {
            notes = noteRepository.searchNotesByLevelAndSemester(level, semester, search.trim());
            model.addAttribute("searchQuery", search);
        } else {
            notes = noteRepository.findByLevelNoAndSemesterNoOrderByIdDesc(level, semester);
        }

        model.addAttribute("notes", notes);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedSemester", semester);
        model.addAttribute("user", loggedInUser);

        // Analytics data for the sidebar
        List<Note> popularNotes = noteRepository.findTop5ByOrderByDownloadCountDesc();
        List<Note> recentNotes = noteRepository.findTop5ByOrderByUploadDateDesc();
        long totalNotes = noteRepository.count();
        int totalDownloads = noteRepository.findAll().stream()
                .mapToInt(n -> n.getDownloadCount() != null ? n.getDownloadCount() : 0)
                .sum();

        model.addAttribute("popularNotes", popularNotes);
        model.addAttribute("recentNotes", recentNotes);
        model.addAttribute("totalNotes", totalNotes);
        model.addAttribute("totalDownloads", totalDownloads);

        return "dashboard";
    }

    @GetMapping("/upload")
    public String showUploadPage(HttpSession session, Model model) {
        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null || !"ADMIN".equals(loggedInUser.getRole())) {
            return "redirect:/dashboard";
        }
        model.addAttribute("user", loggedInUser);
        return "upload";
    }

    @PostMapping("/upload")
    public String uploadNote(@RequestParam("title") String title,
                             @RequestParam("levelNo") Integer levelNo,
                             @RequestParam("semesterNo") Integer semesterNo,
                             @RequestParam(value = "category", required = false) String category,
                             @RequestParam("file") MultipartFile file,
                             HttpSession session) {
        User loggedInUser = (User) session.getAttribute("user");
        // Require admin role to upload notes
        if (loggedInUser == null || !"ADMIN".equals(loggedInUser.getRole())) {
            return "redirect:/dashboard";
        }

        if (file.isEmpty()) {
            return "redirect:/upload?error=Please select a file to upload.";
        }

        try {
            Path uploadDir = Paths.get("uploads");
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadDir.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            Note note = new Note();
            note.setTitle(title);
            note.setLevelNo(levelNo);
            note.setSemesterNo(semesterNo);
            note.setCategory(category == null || category.trim().isEmpty() ? "Note" : category);
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
        if (note == null) {
            return ResponseEntity.notFound().build();
        }

        User loggedInUser = (User) session.getAttribute("user");
        if (loggedInUser == null && !note.getIsPublic()) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.UNAUTHORIZED).build();
        }

        // Increment download count safely
        Integer currentCount = note.getDownloadCount();
        note.setDownloadCount((currentCount == null ? 0 : currentCount) + 1);
        noteRepository.save(note);

        String filename = note.getFilename();
        if (filename == null || filename.isEmpty()) {
            filename = "note-" + id + ".txt";
        }

        Path filePath = Paths.get("uploads").resolve(filename);
        if (Files.exists(filePath)) {
            try {
                Resource resource = new UrlResource(filePath.toUri());
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .body(resource);
            } catch (MalformedURLException e) {
                // fall back to mock
            }
        }

        String fileContent = "=== STUDENT NOTES HUB ===\n" +
                "Title: " + note.getTitle() + "\n" +
                "Level: " + note.getLevelNo() + "\n" +
                "Semester: " + note.getSemesterNo() + "\n" +
                "Category: " + note.getCategory() + "\n" +
                "Uploaded: " + note.getUploadDate() + "\n" +
                "=========================\n" +
                "Downloaded from 4LAZIE Student Notes Hub.";

        ByteArrayResource resource = new ByteArrayResource(fileContent.getBytes());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .contentLength(fileContent.length())
                .body(resource);
    }

    @GetMapping("/download/level/{level}")
    @ResponseBody
    public ResponseEntity<Resource> downloadLevelNotes(@PathVariable("level") Integer level) {
        List<Note> notes = noteRepository.findByLevelNoOrderByIdDesc(level);
        if (notes.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             ZipOutputStream zos = new ZipOutputStream(baos)) {

            for (Note note : notes) {
                String filename = note.getFilename();
                if (filename == null || filename.isEmpty()) {
                    filename = "note-" + note.getId() + ".txt";
                }

                byte[] contentBytes;
                Path filePath = Paths.get("uploads").resolve(filename);
                if (Files.exists(filePath)) {
                    contentBytes = Files.readAllBytes(filePath);
                } else {
                    String fileContent = "=== STUDENT NOTES HUB ===\n" +
                            "Title: " + note.getTitle() + "\n" +
                            "Level: " + note.getLevelNo() + "\n" +
                            "Semester: " + note.getSemesterNo() + "\n" +
                            "Category: " + note.getCategory() + "\n" +
                            "Uploaded: " + note.getUploadDate() + "\n" +
                            "=========================\n" +
                            "Downloaded from 4LAZIE Student Notes Hub.";
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
    public ResponseEntity<Resource> viewNote(@PathVariable("id") Integer id) {
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null || note.getFilename() == null) {
            return ResponseEntity.notFound().build();
        }

        try {
            Path filePath = Paths.get("uploads").resolve(note.getFilename());
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                String mimeType = Files.probeContentType(filePath);
                if (mimeType == null) {
                    mimeType = MediaType.APPLICATION_OCTET_STREAM_VALUE;
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(mimeType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + note.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.internalServerError().build();
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/guest-notes")
    public String guestNotesList(@RequestParam("level") Integer level, 
                                 @RequestParam(value = "semester", required = false) Integer semester,
                                 org.springframework.ui.Model model, HttpSession session) {
        if (session.getAttribute("user") != null) {
            return "redirect:/notes?level=" + level + (semester != null ? "&semester=" + semester : "");
        }
        int sem = semester != null ? semester : 1;
        List<Note> notes = noteRepository.findByLevelNoAndSemesterNoOrderByIdDesc(level, sem);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedSemester", sem);
        model.addAttribute("notes", notes);
        return "guest_notes";
    }
}
