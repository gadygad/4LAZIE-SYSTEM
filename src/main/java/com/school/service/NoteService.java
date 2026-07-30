package com.school.service;

import com.school.model.Note;
import com.school.repository.NoteRepository;
import com.school.model.Course;
import com.school.model.Subject;
import com.school.repository.CourseRepository;
import com.school.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        private NoteRepository noteRepository;

        private CourseRepository courseRepository;

        private SubjectRepository subjectRepository;

        private com.school.service.FileStorageService fileStorageService;

    @Autowired(required = false)
    private com.school.service.PushNotificationService pushNotificationService;

        private com.school.service.NotificationService notificationService;

        private com.school.service.EmailService emailService;

        private com.school.repository.UserRepository userRepository;

    public void groupNotesByModule(List<Note> notes, String program, Integer level, Integer semester,
                                   Map<String, List<Note>> groupedNotes, Map<String, String> moduleCodes) {
        // 1. Fetch subjects for this program, level, and semester FIRST to establish correct order
        List<Course> courses = courseRepository.findByProgramType(program);
        if (!courses.isEmpty()) {
            for (Course course : courses) {
                log.debug("Fetching subjects for course ID: {}, program: {}, level: {}, semester: {}", course.getId(), program, level, semester);

                // Try cached query first
                List<Subject> subjects = subjectRepository.findByCourseAndLevelNoAndSemesterNoOrderByIdAsc(course, level, semester);

                // Always verify with non-cached query if cached returned fewer results
                List<Subject> directSubjects = subjectRepository.findByCourseAndLevelNoAndSemesterNo(course, level, semester);

                // Use whichever returned more results (handles stale cache)
                if (directSubjects.size() > subjects.size()) {
                    log.warn("Subject cache was stale for course '{}' (cached: {}, direct: {}). Using direct results.", course.getId(), subjects.size(), directSubjects.size());
                    subjects = directSubjects;
                }

                log.debug("Loaded {} subjects for course '{}' level {} sem {}", subjects.size(), course.getId(), level, semester);
                for (Subject sub : subjects) {
                    groupedNotes.putIfAbsent(sub.getName(), new ArrayList<>());
                    moduleCodes.putIfAbsent(sub.getName(), sub.getCode() != null ? sub.getCode() : "");
                }
            }
        } else {
            log.warn("No course found for program: {}", program);
        }

        // The subjects have been fetched from the database above. No hardcoded fallbacks here.
        log.debug("After fetching subjects, groupedNotes has {} entries: {}", groupedNotes.size(), groupedNotes.keySet());

        // 2. Now add notes to the established buckets
        log.debug("Processing {} notes into buckets", notes.size());
        for (Note note : notes) {
            String modName = note.getModuleName() != null ? note.getModuleName() : "GENERAL MODULE";
            log.debug("  Note '{}' -> module '{}' (programType={}, levelNo={}, semesterNo={})", 
                     note.getTitle(), modName, note.getProgramType(), note.getLevelNo(), note.getSemesterNo());
            
            // This will append non-matching subjects (like "GENERAL MODULE") at the bottom
            groupedNotes.computeIfAbsent(modName, k -> new ArrayList<>()).add(note);
            if (!moduleCodes.containsKey(modName) && note.getModuleCode() != null && !note.getModuleCode().isEmpty()) {
                moduleCodes.put(modName, note.getModuleCode());
            }
        }
        log.debug("FINAL groupedNotes has {} entries. Keys: {}", groupedNotes.size(), groupedNotes.keySet());
        for (Map.Entry<String, List<Note>> e : groupedNotes.entrySet()) {
            log.debug("  Module '{}' -> {} notes", e.getKey(), e.getValue().size());
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
        private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    public NoteService(NoteRepository noteRepository, CourseRepository courseRepository, SubjectRepository subjectRepository, com.school.service.FileStorageService fileStorageService, com.school.service.NotificationService notificationService, com.school.service.EmailService emailService, com.school.repository.UserRepository userRepository, org.springframework.data.mongodb.core.MongoTemplate mongoTemplate) {
        this.noteRepository = noteRepository;
        this.courseRepository = courseRepository;
        this.subjectRepository = subjectRepository;
        this.fileStorageService = fileStorageService;
        this.notificationService = notificationService;
        this.emailService = emailService;
        this.userRepository = userRepository;
        this.mongoTemplate = mongoTemplate;
    }


    public org.springframework.data.domain.Page<Note> fetchFilteredNotes(String institutionId, String program, Integer level, Integer semester, String category, String search, int page) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query();
        
        if (institutionId != null && !institutionId.isEmpty()) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("institution.$id").is(new org.bson.types.ObjectId(institutionId)));
        }

        if (program != null && !program.isEmpty()) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("programType").is(program));
        }

        if (level != null) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("levelNo").is(level));
        }
        if (semester != null) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("semesterNo").is(semester));
        }
        if (category != null && !category.isEmpty()) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("category").is(category));
        }
        
        if (search != null && !search.trim().isEmpty()) {
            String safeSearch = search.trim().replaceAll("([\\\\\\.\\[\\{\\(\\*\\+\\?\\^\\$\\|])", "\\\\$1");
            query.addCriteria(new org.springframework.data.mongodb.core.query.Criteria().orOperator(
                org.springframework.data.mongodb.core.query.Criteria.where("title").regex(safeSearch, "i"),
                org.springframework.data.mongodb.core.query.Criteria.where("category").regex(safeSearch, "i")
            ));
        }

        long total = mongoTemplate.count(query, Note.class);
        
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, 50);
        query.with(pageable);
        query.with(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "_id"));
        
        List<Note> notes = mongoTemplate.find(query, Note.class);
        return new org.springframework.data.domain.PageImpl<>(notes, pageable, total);
    }
    public List<Note> fetchDashboardNotes(String programPrefix, String sortBy, int limit) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query();
        
        if (programPrefix != null && !programPrefix.isEmpty()) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("programType").is(programPrefix));
        }

        query.with(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, sortBy));
        query.limit(limit);
        
        return mongoTemplate.find(query, Note.class);
    }
}
