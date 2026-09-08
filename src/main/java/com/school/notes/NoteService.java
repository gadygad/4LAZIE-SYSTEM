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
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
        List<Note> notes = noteRepository.findByProgramTypeAndLevelNoWithGeneral(program, level);
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
        note.setFileHash(sha256(file.getBytes()));
        note.setUploadDate(java.time.LocalDateTime.now());
        note.setIsPublic(true);
        note.setInstitution(loggedInUser.getInstitution());
        if (Boolean.TRUE.equals(note.getIsGeneral())) {
            note.setApplicablePrograms(resolveApplicablePrograms(note));
        }
        noteRepository.save(note);

        triggerNotificationsForNote(note, loggedInUser, appUrl);
    }

    // Called instead of uploadAndSaveNote() when the admin confirms, from the
    // duplicate-file warning, that what they're about to upload is the exact
    // same file (byte-for-byte, per fileHash) as one already on the site —
    // the whole point is to make ANOTHER course able to see it without ever
    // touching FileStorageService again, so no second copy of the PDF is
    // ever written to Cloudinary/disk. The existing Note's own fileUrl and
    // fileHash are simply reused.
    public Map<String, Object> linkExistingNoteToCourse(String existingNoteId, String title, String programType,
                                                          Integer levelNo, Integer semesterNo, String moduleName,
                                                          String moduleCode, String category, String academicYear,
                                                          Integer unitNumber, com.school.auth.User loggedInUser) {
        Note existing = noteRepository.findById(existingNoteId)
                .orElseThrow(() -> new IllegalArgumentException("The original file no longer exists."));

        boolean sameSlot = java.util.Objects.equals(existing.getLevelNo(), levelNo)
                && java.util.Objects.equals(existing.getSemesterNo(), semesterNo)
                && java.util.Objects.equals(existing.getCategory(), category)
                && existing.getModuleName() != null && moduleName != null
                && existing.getModuleName().trim().equalsIgnoreCase(moduleName.trim());

        Map<String, Object> result = new HashMap<>();
        if (sameSlot) {
            // Same Level/Semester/Module/Category as the existing note — this
            // is just another course teaching the identical slot, so extend
            // that ONE note's visibility instead of creating a second record.
            java.util.LinkedHashSet<String> programs = new java.util.LinkedHashSet<>();
            if (existing.getApplicablePrograms() != null) programs.addAll(existing.getApplicablePrograms());
            programs.add(programType);
            programs.remove(existing.getProgramType());
            existing.setApplicablePrograms(new ArrayList<>(programs));
            existing.setIsGeneral(true);
            noteRepository.save(existing);
            result.put("mode", "linked");
            result.put("noteId", existing.getId());
            return result;
        }

        // Different slot (level/semester/module/category) — that genuinely
        // needs its own record so browsing/filtering for THIS slot finds it,
        // but the file itself is never re-uploaded: same fileUrl + fileHash
        // as the original, so storage only ever holds the one copy.
        Note note = new Note();
        note.setTitle(title);
        note.setProgramType(programType);
        note.setLevelNo(levelNo);
        note.setSemesterNo(semesterNo);
        note.setModuleName(moduleName != null && !moduleName.isBlank() ? moduleName.trim().toUpperCase() : "GENERAL MODULE");
        note.setModuleCode(moduleCode != null ? moduleCode.trim().toUpperCase() : "");
        note.setCategory(category == null || category.isBlank() ? "Note" : category);
        note.setUnitNumber(unitNumber);
        note.setAcademicYear(academicYear != null ? academicYear.trim() : null);
        note.setFilename(existing.getFilename());
        note.setFileUrl(existing.getFileUrl());
        note.setFileHash(existing.getFileHash());
        note.setUploadDate(java.time.LocalDateTime.now());
        note.setIsPublic(true);
        note.setInstitution(loggedInUser.getInstitution());
        noteRepository.save(note);
        result.put("mode", "created");
        result.put("noteId", note.getId());
        return result;
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
        String fileHash = sha256(file.getBytes());
        java.time.LocalDateTime now = java.time.LocalDateTime.now();

        // Targets that share the same (level, semester, moduleName) are the
        // same subject taught in several courses — group them so that case
        // becomes ONE Note record (with applicablePrograms listing the extra
        // courses) instead of a separate, duplicate Note per course all
        // pointing at the identical fileUrl. A target with a genuinely
        // different level/semester/module still gets its own Note, since one
        // Note can't represent two different subjects at once.
        Map<String, List<String[]>> groups = new java.util.LinkedHashMap<>();
        for (String target : targetCourses) {
            // target format: "programType|levelNo|semesterNo|moduleName|moduleCode"
            String[] parts = target.split("\\|");
            if (parts.length < 5) continue;
            String key = parts[1] + "|" + parts[2] + "|" + parts[3].trim().toUpperCase();
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(parts);
        }

        for (List<String[]> group : groups.values()) {
            String[] first = group.get(0);
            Note note = new Note();
            note.setTitle(title);
            note.setCategory(category);
            note.setAcademicYear(academicYear);
            note.setFilename(originalFilename);
            note.setFileUrl(fileUrl);
            note.setFileHash(fileHash);
            note.setUploadDate(now);
            note.setIsPublic(true);
            note.setInstitution(loggedInUser.getInstitution());

            note.setProgramType(first[0]);
            try {
                note.setLevelNo(Integer.parseInt(first[1]));
                note.setSemesterNo(Integer.parseInt(first[2]));
            } catch (NumberFormatException e) {
                log.error("Invalid level/semester format in shared note upload: " + first[1] + "/" + first[2]);
                continue;
            }
            note.setModuleName(first[3]);
            note.setModuleCode(first[4]);

            if (group.size() > 1) {
                note.setIsGeneral(true);
                List<String> extraPrograms = new ArrayList<>();
                for (int i = 1; i < group.size(); i++) {
                    extraPrograms.add(group.get(i)[0]);
                }
                note.setApplicablePrograms(extraPrograms);
            }

            noteRepository.save(note);

            // We can add push notifications here if needed, but skipped for brevity or add it similarly
        }
    }

    private String sha256(byte[] bytes) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(bytes);
            StringBuilder sb = new StringBuilder(hash.length * 2);
            for (byte b : hash) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            // SHA-256 is guaranteed available on every JVM — this can't
            // actually happen, but a null hash just disables exact-match
            // duplicate detection for this one upload rather than failing it.
            log.warn("SHA-256 unavailable, skipping file hash", e);
            return null;
        }
    }

    // Warns an admin uploading a file about anything that looks like it's
    // already on the site, ranked by how confident the match is:
    //  1. exactMatches   — byte-for-byte the same file (any title/category)
    //  2. slotMatches    — a note already filed for this exact
    //                      Program/Level/Semester/Module/Category (and Year/
    //                      Unit, once those are filled in), just under a
    //                      different title — e.g. re-uploading "CAT 1" for a
    //                      subject that already has one, worded differently
    //  3. similarMatches — a suspiciously similar title anywhere in the same
    //                      module, across every category
    // Returns at most a handful of each.
    public Map<String, Object> checkForDuplicates(String fileHash, String title, String moduleName,
                                                    String programType, Integer levelNo, Integer semesterNo,
                                                    String category, String academicYear, Integer unitNumber) {
        List<Map<String, Object>> exactMatches = new ArrayList<>();
        Set<String> matchedIds = new HashSet<>();
        if (fileHash != null && !fileHash.isBlank()) {
            for (Note n : noteRepository.findByFileHash(fileHash)) {
                exactMatches.add(noteSummary(n, 1.0));
                matchedIds.add(n.getId());
            }
        }

        List<Map<String, Object>> slotMatches = new ArrayList<>();
        if (programType != null && !programType.isBlank() && levelNo != null && semesterNo != null
                && moduleName != null && !moduleName.isBlank() && category != null && !category.isBlank()) {
            org.springframework.data.mongodb.core.query.Query slotQuery = new org.springframework.data.mongodb.core.query.Query();
            slotQuery.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("programType").is(programType));
            slotQuery.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("levelNo").is(levelNo));
            slotQuery.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("semesterNo").is(semesterNo));
            slotQuery.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("moduleName").regex("^" + java.util.regex.Pattern.quote(moduleName.trim()) + "$", "i"));
            slotQuery.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("category").is(category));
            if (academicYear != null && !academicYear.isBlank()) {
                slotQuery.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("academicYear").is(academicYear.trim().toUpperCase()));
            }
            if (unitNumber != null) {
                slotQuery.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("unitNumber").is(unitNumber));
            }
            for (Note n : mongoTemplate.find(slotQuery, Note.class)) {
                if (matchedIds.contains(n.getId())) continue;
                slotMatches.add(noteSummary(n, -1));
                matchedIds.add(n.getId());
            }
        }

        List<Map<String, Object>> similarMatches = new ArrayList<>();
        if (title != null && !title.isBlank()) {
            List<Note> candidates;
            if (moduleName != null && !moduleName.isBlank() && levelNo != null && semesterNo != null) {
                // Scoped by Level/Semester too — the same subject name can
                // legitimately recur at a different level (e.g. a first-year
                // and a final-year "Communication Skills"), and those
                // shouldn't be flagged as similar to each other.
                candidates = noteRepository.findByModuleNameIgnoreCaseAndLevelNoAndSemesterNo(moduleName.trim(), levelNo, semesterNo);
            } else if (moduleName != null && !moduleName.isBlank()) {
                candidates = noteRepository.findByModuleNameIgnoreCase(moduleName.trim());
            } else if (programType != null && levelNo != null && semesterNo != null) {
                candidates = noteRepository.findByProgramTypeAndLevelNoAndSemesterNoOrderByIdDesc(programType, levelNo, semesterNo);
            } else {
                candidates = Collections.emptyList();
            }
            final double SIMILARITY_THRESHOLD = 0.62;
            for (Note n : candidates) {
                if (matchedIds.contains(n.getId())) continue;
                double sim = titleSimilarity(title, n.getTitle());
                if (sim >= SIMILARITY_THRESHOLD) {
                    similarMatches.add(noteSummary(n, sim));
                }
            }
            similarMatches.sort(Comparator.comparingDouble((Map<String, Object> m) -> (Double) m.get("similarity")).reversed());
            if (similarMatches.size() > 5) {
                similarMatches = similarMatches.subList(0, 5);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("exactMatches", exactMatches);
        result.put("slotMatches", slotMatches);
        result.put("similarMatches", similarMatches);
        return result;
    }

    private Map<String, Object> noteSummary(Note n, double similarity) {
        Map<String, Object> m = new HashMap<>();
        m.put("id", n.getId());
        m.put("title", n.getTitle());
        m.put("category", n.getCategory());
        m.put("moduleName", n.getModuleName());
        m.put("uploadDate", n.getUploadDate() != null ? n.getUploadDate().toString() : null);
        m.put("similarity", similarity);
        return m;
    }

    private double titleSimilarity(String a, String b) {
        String na = normalizeTitle(a);
        String nb = normalizeTitle(b);
        if (na.isEmpty() || nb.isEmpty()) return 0;
        int dist = levenshtein(na, nb);
        int maxLen = Math.max(na.length(), nb.length());
        return 1.0 - ((double) dist / maxLen);
    }

    private String normalizeTitle(String s) {
        return s == null ? "" : s.toLowerCase().replaceAll("[^a-z0-9]+", " ").trim();
    }

    private int levenshtein(String a, String b) {
        int[] prev = new int[b.length() + 1];
        int[] curr = new int[b.length() + 1];
        for (int j = 0; j <= b.length(); j++) prev[j] = j;
        for (int i = 1; i <= a.length(); i++) {
            curr[0] = i;
            for (int j = 1; j <= b.length(); j++) {
                int cost = a.charAt(i - 1) == b.charAt(j - 1) ? 0 : 1;
                curr[j] = Math.min(Math.min(curr[j - 1] + 1, prev[j] + 1), prev[j - 1] + cost);
            }
            int[] tmp = prev; prev = curr; curr = tmp;
        }
        return prev[b.length()];
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
            // "General" notes carry their owner's programType but list other
            // courses that also teach the subject in applicablePrograms — a
            // strict programType-only match silently hid every general note
            // from students in those other courses.
            query.addCriteria(new org.springframework.data.mongodb.core.query.Criteria().orOperator(
                org.springframework.data.mongodb.core.query.Criteria.where("programType").is(program),
                org.springframework.data.mongodb.core.query.Criteria.where("applicablePrograms").is(program)
            ));
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
            query.addCriteria(new org.springframework.data.mongodb.core.query.Criteria().orOperator(
                org.springframework.data.mongodb.core.query.Criteria.where("programType").is(programPrefix),
                org.springframework.data.mongodb.core.query.Criteria.where("applicablePrograms").is(programPrefix)
            ));
        }

        query.with(org.springframework.data.domain.Sort.by(org.springframework.data.domain.Sort.Direction.DESC, sortBy));
        query.limit(limit);
        
        return mongoTemplate.find(query, Note.class);
    }

    public org.springframework.data.domain.Page<Note> fetchRecentMaterialsPaginated(String programPrefix, int page) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query();
        
        if (programPrefix != null && !programPrefix.isEmpty()) {
            // A blanket isGeneral==true check here would show a general note to
            // every program at every level, not just the specific courses that
            // actually teach the subject — the same bug already fixed for the
            // toggle itself (see resolveApplicablePrograms).
            query.addCriteria(new org.springframework.data.mongodb.core.query.Criteria().orOperator(
                org.springframework.data.mongodb.core.query.Criteria.where("programType").is(programPrefix),
                org.springframework.data.mongodb.core.query.Criteria.where("applicablePrograms").is(programPrefix)
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
            // A blanket isGeneral==true check here would show a general note to
            // every program at every level, not just the specific courses that
            // actually teach the subject — the same bug already fixed for the
            // toggle itself (see resolveApplicablePrograms).
            query.addCriteria(new org.springframework.data.mongodb.core.query.Criteria().orOperator(
                org.springframework.data.mongodb.core.query.Criteria.where("programType").is(programPrefix),
                org.springframework.data.mongodb.core.query.Criteria.where("applicablePrograms").is(programPrefix)
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
