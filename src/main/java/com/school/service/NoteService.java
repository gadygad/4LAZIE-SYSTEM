package com.school.service;

import com.school.model.Note;
import com.school.repository.NoteRepository;
import com.school.model.Course;
import com.school.model.Subject;
import com.school.repository.CourseRepository;
import com.school.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cloudinary.Cloudinary;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class NoteService {
    private static final Logger log = LoggerFactory.getLogger(NoteService.class);

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private com.school.service.FileStorageService fileStorageService;

    @Autowired(required = false)
    private com.school.service.PushNotificationService pushNotificationService;

    @Autowired
    private com.school.service.NotificationService notificationService;

    @Autowired
    private com.school.service.EmailService emailService;

    @Autowired
    private com.school.repository.UserRepository userRepository;
    public void groupNotesByModule(List<Note> notes, String program, Integer level, Integer semester, 
                                   Map<String, List<Note>> groupedNotes, Map<String, String> moduleCodes) {
        // 1. Fetch subjects for this program, level, and semester FIRST to establish correct order
        List<Course> courses = courseRepository.findByProgramType(program);
        if (!courses.isEmpty()) {
            Course course = courses.get(0);
            log.info("Fetching subjects for course ID: {}, program: {}, level: {}, semester: {}", course.getId(), program, level, semester);
            List<Subject> subjects = subjectRepository.findByCourseAndLevelNoAndSemesterNoOrderByIdAsc(course, level, semester);
            log.info("Cached method returned {} subjects", subjects.size());
            
            if (subjects.isEmpty()) {
                log.info("Falling back to non-cached method...");
                subjects = subjectRepository.findByCourseAndLevelNoAndSemesterNo(course, level, semester);
                log.info("Non-cached method returned {} subjects", subjects.size());
            }
            
            for (Subject sub : subjects) {
                groupedNotes.put(sub.getName(), new ArrayList<>());
                moduleCodes.put(sub.getName(), sub.getCode() != null ? sub.getCode() : "");
            }
        } else {
            log.warn("No course found for program: {}", program);
        }

        // The subjects have been fetched from the database above. No hardcoded fallbacks here.

        // 2. Now add notes to the established buckets
        for (Note note : notes) {
            String modName = note.getModuleName() != null ? note.getModuleName() : "GENERAL MODULE";
            
            // This will append non-matching subjects (like "GENERAL MODULE") at the bottom
            groupedNotes.computeIfAbsent(modName, k -> new ArrayList<>()).add(note);
            if (!moduleCodes.containsKey(modName) && note.getModuleCode() != null && !note.getModuleCode().isEmpty()) {
                moduleCodes.put(modName, note.getModuleCode());
            }
        }
    }

    public byte[] createLevelNotesZip(String program, Integer level) throws IOException {
        List<Note> notes = noteRepository.findByProgramTypeAndLevelNoOrderByIdDesc(program, level);
        if (notes.isEmpty()) return null;

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             ZipOutputStream zos = new ZipOutputStream(baos)) {

            for (Note note : notes) {
                String filename = note.getFilename() != null && !note.getFilename().isEmpty() ? note.getFilename() : "note-" + note.getId() + ".pdf";
                boolean fileAdded = false;
                
                if (note.getFileUrl() != null && !note.getFileUrl().isEmpty()) {
                    try {
                        java.net.HttpURLConnection conn = (java.net.HttpURLConnection) new java.net.URL(note.getFileUrl()).openConnection();
                        conn.setInstanceFollowRedirects(true);
                        conn.setRequestMethod("GET");
                        
                        if (conn.getResponseCode() == 200) {
                            ZipEntry entry = new ZipEntry(filename);
                            zos.putNextEntry(entry);
                            conn.getInputStream().transferTo(zos);
                            zos.closeEntry();
                            fileAdded = true;
                        }
                        conn.disconnect();
                    } catch (Exception e) {
                        log.error("Failed to fetch zip entry from Cloudinary", e);
                    }
                }
                
                if (!fileAdded) {
                    byte[] contentBytes;
                    String fileContent = "=== STUDENT NOTES HUB ===\nTitle: " + note.getTitle() + "\nLevel: " + note.getLevelNo() + "\nFile could not be located on server.";
                    contentBytes = fileContent.getBytes();
                    ZipEntry entry = new ZipEntry("error_" + filename + ".txt");
                    zos.putNextEntry(entry);
                    zos.write(contentBytes);
                    zos.closeEntry();
                }
            }
            zos.finish();
            return baos.toByteArray();
        }
    }

    public void uploadAndSaveNote(Note note, org.springframework.web.multipart.MultipartFile file, com.school.model.User loggedInUser, String appUrl) throws IOException {
        String fileUrl = fileStorageService.uploadFile(file);
        note.setFilename(file.getOriginalFilename());
        note.setFileUrl(fileUrl);
        note.setUploadDate(java.time.LocalDateTime.now());
        note.setIsPublic(true);
        note.setInstitution(loggedInUser.getInstitution());
        noteRepository.save(note);

        if (pushNotificationService != null) {
            String pushTitle = "New Notes Added! 🎉";
            String categoryLabel = (note.getCategory() == null || note.getCategory().trim().isEmpty()) ? "Note" : note.getCategory();
            String pushBody = "Hey there! We just added a new " + categoryLabel + " titled '" + note.getTitle() + "'. Tap here to check it out!";
            String pushUrl = "/view/" + note.getEncryptedSlug();
            
            pushNotificationService.sendToAllSubscribers(pushTitle, pushBody, pushUrl);
            
            if (notificationService != null && userRepository != null) {
                List<com.school.model.User> matchedUsers = userRepository.findAll().stream()
                    .filter(u -> note.getProgramType().equals(u.getCourseProgram()) &&
                                 note.getLevelNo().equals(u.getLevel()) &&
                                 note.getSemesterNo().equals(u.getSemester()))
                    .collect(java.util.stream.Collectors.toList());
                    
                for (com.school.model.User u : matchedUsers) {
                    if (!u.getId().equals(loggedInUser.getId())) {
                        notificationService.createNotification(u.getId(), pushTitle, pushBody);
                        String emailLink = appUrl + pushUrl;
                        emailService.sendNewNoteNotification(u.getEmail(), note.getTitle(), categoryLabel, emailLink);
                    }
                }
            }
        }
    }
}
