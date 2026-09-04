package com.school.notes;

import com.school.notes.Note;
import com.school.auth.User;
import com.school.notes.NoteRepository;
import com.school.academic.Course;
import com.school.academic.Subject;
import com.school.academic.CourseRepository;
import com.school.academic.SubjectRepository;
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

        private com.school.core.FileStorageService fileStorageService;

    @Autowired(required = false)
    private com.school.notification.PushNotificationService pushNotificationService;

        private com.school.notification.NotificationService notificationService;

        private com.school.core.EmailService emailService;

        private com.school.auth.UserRepository userRepository;

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
        return zipNotes(notes);
    }

    /** Same as createLevelNotesZip, but no program filter — matches the
     * /community folder pages, which show every note for a level across
     * every college/program so students can browse other institutions'
     * materials, not just their own. */
    public byte[] createAllNotesZipForLevel(Integer level) throws IOException {
        List<Note> notes = noteRepository.findByLevelNoOrderByIdDesc(level);
        return zipNotes(notes);
    }

    /** Same as createAllNotesZipForLevel, scoped to one semester now that
     * /community folders are split per semester instead of per level. */
    public byte[] createAllNotesZipForLevelAndSemester(Integer level, Integer semester) throws IOException {
        List<Note> notes = noteRepository.findByLevelNoAndSemesterNoOrderByIdDesc(level, semester);
        return zipNotes(notes);
    }

    private byte[] zipNotes(List<Note> notes) throws IOException {
        if (notes.isEmpty()) return null;

        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             ZipOutputStream zos = new ZipOutputStream(baos)) {

            // Notes from different programs/colleges can share the same original
            // filename, which would otherwise crash the zip with a duplicate-entry
            // error — disambiguate repeats by appending the note id.
            java.util.Set<String> usedNames = new java.util.HashSet<>();

            for (Note note : notes) {
                String filename = note.getFilename() != null && !note.getFilename().isEmpty() ? note.getFilename() : "note-" + note.getId() + ".pdf";
                if (!usedNames.add(filename)) {
                    int dot = filename.lastIndexOf('.');
                    filename = dot > 0
                            ? filename.substring(0, dot) + "_" + note.getId() + filename.substring(dot)
                            : filename + "_" + note.getId();
                    usedNames.add(filename);
                }
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

    public void uploadAndSaveNote(Note note, org.springframework.web.multipart.MultipartFile file, com.school.auth.User loggedInUser, String appUrl) throws IOException {
        String fileUrl = fileStorageService.uploadFile(file);
        note.setFilename(file.getOriginalFilename());
        note.setFileUrl(fileUrl);
        note.setUploadDate(java.time.LocalDateTime.now());
        note.setIsPublic(true);
        note.setInstitution(loggedInUser.getInstitution());
        if (Boolean.TRUE.equals(note.getIsGeneral())) {
            note.setApplicablePrograms(resolveApplicablePrograms(note));
        }
        noteRepository.save(note);

        triggerNotificationsForNote(note, loggedInUser, appUrl);
    }

    // "General Subject" is meant to mean "shared by the other courses that
    // also teach this subject" — not "visible to literally every program at
    // this level/semester" (which is what a blanket isGeneral==true check
    // used to do). Each Subject is tied to exactly one Course, so a subject
    // taught in several courses exists as several separate Subject documents
    // with the same name/level/semester — this resolves all of them to their
    // owning courses' programTypes.
    public List<String> resolveApplicablePrograms(Note note) {
        List<String> programs = new java.util.ArrayList<>();
        if (note.getModuleName() == null || note.getModuleName().isBlank()
                || note.getLevelNo() == null || note.getSemesterNo() == null) {
            return programs;
        }
        List<com.school.academic.Subject> matches = subjectRepository.findByNameIgnoreCaseAndLevelNoAndSemesterNo(
                note.getModuleName().trim(), note.getLevelNo(), note.getSemesterNo());
        for (com.school.academic.Subject s : matches) {
            if (s.getCourse() != null && s.getCourse().getProgramType() != null) {
                programs.add(s.getCourse().getProgramType());
            }
        }
        return programs;
    }

    public void triggerNotificationsForNote(Note note, com.school.auth.User loggedInUser, String appUrl) {
        if (pushNotificationService != null) {
            String pushTitle = "New Notes Added! 🎉";
            String categoryLabel = (note.getCategory() == null || note.getCategory().trim().isEmpty()) ? "Note" : note.getCategory();
            String pushBody = "Hey there! We just added a new " + categoryLabel + " titled '" + note.getTitle() + "'. Tap here to check it out!";
            
            // Fix URL for generated exams vs normal notes
            String pushUrl = (note.getContentJson() != null && !note.getContentJson().isEmpty()) 
                            ? "/view-generated-exam/" + note.getId() 
                            : "/view/" + note.getEncryptedSlug();

            pushNotificationService.sendToAllSubscribers(pushTitle, pushBody, pushUrl);

            if (notificationService != null && userRepository != null) {
                List<com.school.auth.User> matchedUsers = userRepository.findByCourseProgramAndLevelAndSemester(
                    note.getProgramType(), note.getLevelNo(), note.getSemesterNo());

                for (com.school.auth.User u : matchedUsers) {
                    if (loggedInUser == null || !u.getId().equals(loggedInUser.getId())) {
                        notificationService.createNotification(u.getId(), pushTitle, pushBody);
                        String emailLink = appUrl + pushUrl;
                        emailService.sendNewNoteNotification(u.getEmail(), note.getTitle(), categoryLabel, emailLink);
                    }
                }
            }
        }
    }

    public void uploadSharedNote(String title, String category, String academicYear, org.springframework.web.multipart.MultipartFile file, List<String> targetCourses, com.school.auth.User loggedInUser, String appUrl) throws IOException {
        // Upload the file once
        String fileUrl = fileStorageService.uploadFile(file);
        String originalFilename = file.getOriginalFilename();
        java.time.LocalDateTime now = java.time.LocalDateTime.now();

        // Create a note for each selected target course
        for (String target : targetCourses) {
            // target format: "programType|levelNo|semesterNo|moduleName|moduleCode"
            String[] parts = target.split("\\|");
            if (parts.length >= 5) {
                Note note = new Note();
                note.setTitle(title);
                note.setCategory(category);
                note.setAcademicYear(academicYear);
                note.setFilename(originalFilename);
                note.setFileUrl(fileUrl);
                note.setUploadDate(now);
                note.setIsPublic(true);
                note.setInstitution(loggedInUser.getInstitution());
                
                note.setProgramType(parts[0]);
                try {
                    note.setLevelNo(Integer.parseInt(parts[1]));
                    note.setSemesterNo(Integer.parseInt(parts[2]));
                } catch(NumberFormatException e) {
                    log.error("Invalid level/semester format in shared note upload: " + target);
                    continue;
                }
                note.setModuleName(parts[3]);
                note.setModuleCode(parts[4]);

                noteRepository.save(note);
                
                // We can add push notifications here if needed, but skipped for brevity or add it similarly
            }
        }
    }
        private org.springframework.data.mongodb.core.MongoTemplate mongoTemplate;

    public NoteService(NoteRepository noteRepository, CourseRepository courseRepository, SubjectRepository subjectRepository, com.school.core.FileStorageService fileStorageService, com.school.notification.NotificationService notificationService, com.school.core.EmailService emailService, com.school.auth.UserRepository userRepository, org.springframework.data.mongodb.core.MongoTemplate mongoTemplate) {
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
            if (institutionId.length() == 24 && institutionId.matches("^[0-9a-fA-F]+$")) {
                query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("institution.$id").is(new org.bson.types.ObjectId(institutionId)));
            }
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

    public org.springframework.data.domain.Page<Note> fetchRecentMaterialsPaginated(String programPrefix, int page) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query();
        
        if (programPrefix != null && !programPrefix.isEmpty()) {
            query.addCriteria(new org.springframework.data.mongodb.core.query.Criteria().orOperator(
                org.springframework.data.mongodb.core.query.Criteria.where("programType").is(programPrefix),
                org.springframework.data.mongodb.core.query.Criteria.where("isGeneral").is(true)
            ));
        }

        long total = mongoTemplate.count(query, Note.class);
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, 20);
        query.with(pageable);
        query.with(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "uploadDate"));
        
        List<Note> notes = mongoTemplate.find(query, Note.class);
        return new org.springframework.data.domain.PageImpl<>(notes, pageable, total);
    }

    public org.springframework.data.domain.Page<Note> fetchPopularMaterialsPaginated(String programPrefix, int page) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query();
        
        if (programPrefix != null && !programPrefix.isEmpty()) {
            query.addCriteria(new org.springframework.data.mongodb.core.query.Criteria().orOperator(
                org.springframework.data.mongodb.core.query.Criteria.where("programType").is(programPrefix),
                org.springframework.data.mongodb.core.query.Criteria.where("isGeneral").is(true)
            ));
        }

        long total = mongoTemplate.count(query, Note.class);
        org.springframework.data.domain.Pageable pageable = org.springframework.data.domain.PageRequest.of(page, 20);
        query.with(pageable);
        query.with(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "downloadCount", "viewCount"));
        
        List<Note> notes = mongoTemplate.find(query, Note.class);
        return new org.springframework.data.domain.PageImpl<>(notes, pageable, total);
    }
}
