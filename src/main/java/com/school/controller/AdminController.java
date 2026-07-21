package com.school.controller;

import com.school.model.Note;
import com.school.model.Role;
import com.school.model.User;
import com.school.repository.NoteRepository;
import com.school.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.school.model.Timetable;
import com.school.repository.TimetableRepository;
import com.school.model.AcademicCalendar;
import com.school.repository.AcademicCalendarRepository;
import com.school.model.PasswordResetToken;
import com.school.repository.PasswordResetTokenRepository;
import com.school.model.Subject;
import com.school.model.Course;
import com.school.repository.SubjectRepository;
import com.school.repository.CourseRepository;
import com.school.service.FileStorageService;
import com.school.service.PdfParsingService;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NoteRepository noteRepository;
    
    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;
    
    @Autowired
    private TimetableRepository timetableRepository;

    @Autowired
    private PdfParsingService pdfParsingService;

    @Autowired
    private AcademicCalendarRepository academicCalendarRepository;
    
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private com.school.service.EmailService emailService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private com.school.repository.PendingActionRepository pendingActionRepository;

    @Autowired
    private com.school.repository.ActivityLogRepository activityLogRepository;

    @Autowired
    private com.school.util.AuthUtil authUtil;

    private User getLoggedInUser() {
        return authUtil.getLoggedInUser();
    }

    @Autowired
    private com.school.service.AdminService adminService;

    private String handleDeletionRequest(User admin, String entityType, String entityId, String entityDesc, RedirectAttributes redirectAttributes) {
        String result = adminService.processDeletionRequest(admin, entityType, entityId, entityDesc);
        if ("PENDING".equals(result)) {
            redirectAttributes.addFlashAttribute("info", "Deletion request submitted to Super Admin for approval.");
        }
        return result;
    }

    @GetMapping({"", "/", "/dashboard"})
    public String adminDashboard(HttpSession session, Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        
        org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(AdminController.class);
        
        // Use safe defaults in case any query fails
        long totalUsers = 0;
        long totalNotes = 0;
        Long totalDownloads = 0L;
        Long totalViews = 0L;
        List<User> recentUsers = java.util.Collections.emptyList();
        List<Note> popularNotes = java.util.Collections.emptyList();
        List<com.school.model.ActivityLog> recentLogs = java.util.Collections.emptyList();
        
        try {
            totalUsers = userRepository.count();
        } catch (Exception e) {
            log.warn("Failed to count users: {}", e.getMessage(), e);
        }
        try {
            totalNotes = noteRepository.count();
        } catch (Exception e) {
            log.warn("Failed to count notes: {}", e.getMessage(), e);
        }
        try {
            totalDownloads = noteRepository.getTotalDownloadCount();
        } catch (Exception e) {
            log.warn("Failed to get download count: {}", e.getMessage(), e);
        }
        try {
            totalViews = noteRepository.getTotalViewCount();
        } catch (Exception e) {
            log.warn("Failed to get view count: {}", e.getMessage(), e);
        }
        try {
            recentUsers = userRepository.findTop5ByOrderByDateJoinedDesc();
        } catch (Exception e) {
            log.warn("Failed to get recent users: {}", e.getMessage(), e);
        }
        try {
            popularNotes = noteRepository.findTop5ByOrderByDownloadCountDesc();
        } catch (Exception e) {
            log.warn("Failed to get popular notes: {}", e.getMessage(), e);
        }
        try {
            recentLogs = activityLogRepository.findTop50ByOrderByTimestampDesc();
            if (recentLogs.size() > 10) {
                recentLogs = recentLogs.subList(0, 10);
            }
        } catch (Exception e) {
            log.warn("Failed to get activity logs: {}", e.getMessage(), e);
        }
        
        log.info("Dashboard data loaded - Users: {}, Notes: {}, Downloads: {}, Views: {}, RecentUsers: {}, PopularNotes: {}, Logs: {}",
                totalUsers, totalNotes, totalDownloads, totalViews, 
                recentUsers.size(), popularNotes.size(), recentLogs.size());
        
        model.addAttribute("totalUsers", totalUsers);
        model.addAttribute("totalNotes", totalNotes);
        model.addAttribute("totalDownloads", totalDownloads != null ? totalDownloads : 0L);
        model.addAttribute("totalViews", totalViews != null ? totalViews : 0L);
        model.addAttribute("recentUsers", recentUsers);
        model.addAttribute("popularNotes", popularNotes);
        model.addAttribute("recentLogs", recentLogs);
        
        return "admin/admin_dashboard";
    }

    @GetMapping("/users")
    public String listUsers(HttpSession session, Model model) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_USERS")) {
            return "redirect:/login";
        }
        
        // Ensure session user object is updated if they were auto-promoted
        if (user != null && "kilingepazasauti@gmail.com".equalsIgnoreCase(user.getEmail()) && user.getRole() != Role.SUPER_ADMIN) {
            user.setRole(Role.SUPER_ADMIN);
            userRepository.save(user);
        }

        if (user != null && user.getRole() == Role.SUPER_ADMIN && session.getAttribute("user") != null) {
            User sessionUser = (User) session.getAttribute("user");
            if (sessionUser.getRole() != Role.SUPER_ADMIN) {
                session.setAttribute("user", user);
            }
        }
        
        model.addAttribute("loggedInUser", user);
        
        List<User> users = userRepository.findAll();
        model.addAttribute("users", users);
        return "admin/admin_users";
    }

    @PostMapping("/users/{id}/delete")
    public String deleteUser(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_USERS")) {
            return "redirect:/login";
        }
        
        if (user.getId().equals(id)) {
            redirectAttributes.addFlashAttribute("error", "You cannot delete yourself.");
            return "redirect:/admin/users";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            if ("PENDING".equals(handleDeletionRequest(user, "USER", id, targetUser.getName(), redirectAttributes))) {
                return "redirect:/admin/users";
            }
            userRepository.deleteById(id);
            redirectAttributes.addFlashAttribute("success", "User deleted successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/reset-password")
    public String resetUserPassword(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_USERS")) {
            return "redirect:/login";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            targetUser.setPassword(passwordEncoder.encode("SJUIT@123"));
            userRepository.save(targetUser);
            redirectAttributes.addFlashAttribute("success", "Password for " + targetUser.getName() + " has been reset to 'SJUIT@123'.");
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/send-recovery")
    public String sendRecoveryLink(@PathVariable String id, jakarta.servlet.http.HttpServletRequest request, RedirectAttributes redirectAttributes) {
        User admin = getLoggedInUser();
        if (!adminService.hasPermission(admin, "MANAGE_USERS")) {
            return "redirect:/login";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            // Delete old tokens
            passwordResetTokenRepository.deleteByUser(targetUser);
            
            // Generate a secure UUID token for the magic link (valid for 30 minutes)
            String token = java.util.UUID.randomUUID().toString();
            PasswordResetToken resetToken = new PasswordResetToken(token, targetUser, 30);
            passwordResetTokenRepository.save(resetToken);
            
            String baseUrl = org.springframework.web.servlet.support.ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            String magicLink = baseUrl + "/reset-password?token=" + token;
            
            emailService.sendRecoveryMagicLink(targetUser.getEmail(), targetUser.getName(), magicLink);
            
            redirectAttributes.addFlashAttribute("success", "Secure recovery link sent to " + targetUser.getName() + " (" + targetUser.getEmail() + ").");
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/suspend")
    public String toggleUserSuspension(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User admin = getLoggedInUser();
        if (!adminService.hasPermission(admin, "MANAGE_USERS")) {
            return "redirect:/login";
        }
        
        if (admin.getId().equals(id)) {
            redirectAttributes.addFlashAttribute("error", "You cannot suspend yourself.");
            return "redirect:/admin/users";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            boolean currentStatus = Boolean.TRUE.equals(targetUser.getIsSuspended());
            targetUser.setIsSuspended(!currentStatus);
            userRepository.save(targetUser);
            
            emailService.sendAccountSuspensionEmail(targetUser.getEmail(), targetUser.getName(), !currentStatus);
            
            String msg = !currentStatus ? "User suspended successfully." : "User reactivated successfully.";
            redirectAttributes.addFlashAttribute("success", msg);
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/warn")
    public String warnUser(@PathVariable String id, @RequestParam("warningMessage") String warningMessage, RedirectAttributes redirectAttributes) {
        User admin = getLoggedInUser();
        if (!adminService.hasPermission(admin, "MANAGE_USERS")) {
            return "redirect:/login";
        }
        
        if (warningMessage == null || warningMessage.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Warning message cannot be empty.");
            return "redirect:/admin/users";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            emailService.sendWarningEmail(targetUser.getEmail(), targetUser.getName(), warningMessage.trim());
            
            redirectAttributes.addFlashAttribute("success", "Warning sent to " + targetUser.getName() + " successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/role")
    public String changeUserRole(@PathVariable String id, @RequestParam("role") Role role, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            redirectAttributes.addFlashAttribute("error", "Only Super Admin can change user roles.");
            return "redirect:/admin/users";
        }
        
        if (user.getId().equals(id)) {
            redirectAttributes.addFlashAttribute("error", "You cannot change your own role here.");
            return "redirect:/admin/users";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            targetUser.setRole(role);
            userRepository.save(targetUser);
            redirectAttributes.addFlashAttribute("success", "Role updated successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/permissions")
    public String updatePermissions(@PathVariable String id, @RequestParam(value = "permissions", required = false) List<String> permissionsList, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            redirectAttributes.addFlashAttribute("error", "Only Super Admin can manage permissions.");
            return "redirect:/admin/users";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            java.util.Set<String> newPermissions = new java.util.HashSet<>();
            if (permissionsList != null) {
                newPermissions.addAll(permissionsList);
            }
            targetUser.setPermissions(newPermissions);
            userRepository.save(targetUser);
            redirectAttributes.addFlashAttribute("success", "Permissions updated successfully for " + targetUser.getName());
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    // ============ ADMIN NOTES MANAGEMENT ============

    @GetMapping("/notes")
    public String listNotes(HttpSession session, Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        List<Note> notes = noteRepository.findAll();
        model.addAttribute("notes", notes);
        return "admin/admin_notes";
    }

    @PostMapping("/notes/{id}/delete")
    public String deleteNote(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_NOTES")) {
            return "redirect:/login";
        }
        Note note = noteRepository.findById(id).orElse(null);
        if (note != null) {
            if ("PENDING".equals(handleDeletionRequest(user, "NOTE", id, note.getTitle(), redirectAttributes))) {
                return "redirect:/admin/notes";
            }
            noteRepository.deleteById(id);
            redirectAttributes.addFlashAttribute("success", "Note deleted successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Note not found.");
        }
        return "redirect:/admin/notes";
    }

    @PostMapping("/notes/{id}/toggle-general")
    public String toggleGeneralNote(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        Note note = noteRepository.findById(id).orElse(null);
        if (note != null) {
            boolean current = note.getIsGeneral() != null ? note.getIsGeneral() : false;
            note.setIsGeneral(!current);
            noteRepository.save(note);
            redirectAttributes.addFlashAttribute("success", "Note updated to " + (!current ? "General" : "Specific") + " Subject successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Note not found.");
        }
        return "redirect:/admin/notes";
    }

    // ============ ADMIN SUBJECTS MANAGEMENT ============

    @GetMapping("/subjects")
    public String listSubjects(HttpSession session, Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        List<Subject> subjects = subjectRepository.findAll();
        List<Course> courses = courseRepository.findAll();
        model.addAttribute("subjects", subjects);
        model.addAttribute("courses", courses);
        return "admin/admin_subjects";
    }

    @PostMapping("/subjects/add")
    public String addSubject(@RequestParam("name") String name,
                             @RequestParam("levelNo") Integer levelNo,
                             @RequestParam("semesterNo") Integer semesterNo,
                             @RequestParam(value = "credits", required = false) Integer credits,
                             @RequestParam("courseId") List<String> courseIds,
                             RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        
        if (name == null || name.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Subject name cannot be empty.");
            return "redirect:/admin/subjects";
        }

        int addedCount = 0;
        for (String courseId : courseIds) {
            Course course = courseRepository.findById(courseId).orElse(null);
            if (course != null) {
                Subject subject = new Subject();
                subject.setName(name.trim().toUpperCase());
                subject.setLevelNo(levelNo);
                subject.setSemesterNo(semesterNo);
                subject.setCourse(course);
                subject.setCode("");
                subject.setCredits(credits != null ? credits : 9); // Default 9 credits for diploma
                subjectRepository.save(subject);
                addedCount++;
            }
        }

        if (addedCount > 0) {
            redirectAttributes.addFlashAttribute("success", "Subject added successfully to " + addedCount + " course(s).");
        } else {
            redirectAttributes.addFlashAttribute("error", "No valid courses found.");
        }
        return "redirect:/admin/subjects";
    }

    @PostMapping("/subjects/{id}/delete")
    public String deleteSubject(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_SUBJECTS")) {
            return "redirect:/login";
        }
        Subject subject = subjectRepository.findById(id).orElse(null);
        if (subject != null) {
            if ("PENDING".equals(handleDeletionRequest(user, "SUBJECT", id, subject.getName(), redirectAttributes))) {
                return "redirect:/admin/subjects";
            }
            subjectRepository.deleteById(id);
            redirectAttributes.addFlashAttribute("success", "Subject deleted successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Subject not found.");
        }
        return "redirect:/admin/subjects";
    }

    @PostMapping("/subjects/{id}/edit")
    public String editSubject(@PathVariable String id,
                              @RequestParam("name") String name,
                              @RequestParam(value = "credits", required = false) Integer credits,
                              RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            redirectAttributes.addFlashAttribute("error", "Access denied. Only Super Admin can edit subjects.");
            return "redirect:/login";
        }
        if (name == null || name.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Subject name cannot be empty.");
            return "redirect:/admin/subjects";
        }
        Subject subject = subjectRepository.findById(id).orElse(null);
        if (subject != null) {
            subject.setName(name.trim().toUpperCase());
            if (credits != null) subject.setCredits(credits);
            subjectRepository.save(subject);
            redirectAttributes.addFlashAttribute("success", "Subject updated successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Subject not found.");
        }
        return "redirect:/admin/subjects";
    }

    // ============ ADMIN TIMETABLES MANAGEMENT ============

    @GetMapping("/timetables")
    public String listTimetables(HttpSession session, Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        List<Timetable> timetables = timetableRepository.findAllByOrderByUploadDateDesc();
        model.addAttribute("timetables", timetables);
        return "admin/admin_timetables";
    }

    @PostMapping("/timetables/upload")
    public String uploadTimetable(
            @RequestParam("htmlContent") String htmlContent,
            @RequestParam("programType") String programType,
            @RequestParam("levelNo") Integer levelNo,
            @RequestParam("semesterNo") Integer semesterNo,
            @RequestParam("academicYear") String academicYear,
            HttpSession session, RedirectAttributes redirectAttributes) {
        
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }

        if (htmlContent == null || htmlContent.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Please paste the HTML code for the timetable.");
            return "redirect:/admin/timetables";
        }

        try {
            // Check if timetable already exists for this semester and year to overwrite or create new
            Timetable timetable = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNoAndAcademicYear(programType, levelNo, semesterNo, academicYear)
                    .orElse(new Timetable());

            timetable.setProgramType(programType);
            timetable.setLevelNo(levelNo);
            timetable.setSemesterNo(semesterNo);
            
            org.owasp.html.PolicyFactory policy = org.owasp.html.Sanitizers.FORMATTING.and(org.owasp.html.Sanitizers.LINKS).and(org.owasp.html.Sanitizers.BLOCKS).and(org.owasp.html.Sanitizers.STYLES).and(org.owasp.html.Sanitizers.TABLES);
            String safeHtml = policy.sanitize(htmlContent.trim());
            
            timetable.setHtmlContent(safeHtml);
            timetable.setUploadDate(java.time.LocalDateTime.now());
            timetable.setAcademicYear(academicYear);

            timetableRepository.save(timetable);

            redirectAttributes.addFlashAttribute("success", "Timetable saved successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to save timetable: " + e.getMessage());
        }

        return "redirect:/admin/timetables";
    }

    @PostMapping("/timetables/{id}/delete")
    public String deleteTimetable(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_TIMETABLES")) {
            return "redirect:/login";
        }
        
        Timetable timetable = timetableRepository.findById(id).orElse(null);
        if (timetable != null) {
            String desc = timetable.getProgramType() + " Sem " + timetable.getSemesterNo() + " (" + timetable.getAcademicYear() + ")";
            if ("PENDING".equals(handleDeletionRequest(user, "TIMETABLE", id, desc, redirectAttributes))) {
                return "redirect:/admin/timetables";
            }
            try {
                String publicId = fileStorageService.extractCloudinaryPublicId(timetable.getImageUrl());
                fileStorageService.deleteFile(publicId);
            } catch(Exception ignored) {}
            timetableRepository.delete(timetable);
            redirectAttributes.addFlashAttribute("success", "Timetable deleted successfully.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Timetable not found.");
        }
        
        return "redirect:/admin/timetables";
    }

    // ============ ADMIN ACADEMIC CALENDAR MANAGEMENT ============

    @GetMapping("/calendar")
    public String viewCalendarAdmin(HttpSession session, Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        
        List<AcademicCalendar> calendars = academicCalendarRepository.findAll();
        model.addAttribute("calendars", calendars);
        return "admin_calendar";
    }

    @org.springframework.web.bind.annotation.GetMapping("/calendar/force-autofill")
    @org.springframework.web.bind.annotation.ResponseBody
    public String forceAutofill() {
        AcademicCalendar cal = academicCalendarRepository.findByIsCurrentTrue().orElse(null);
        if (cal == null) {
            return "No current calendar found.";
        }
        if (cal.getFileUrl() == null || cal.getFileUrl().isEmpty()) {
            return "Current calendar does not have a PDF file attached.";
        }
        try {
            java.nio.file.Path filePath = java.nio.file.Paths.get("uploads", cal.getFileUrl());
            if (!java.nio.file.Files.exists(filePath)) {
                return "PDF file not found in uploads folder: " + filePath.toAbsolutePath();
            }
            java.io.InputStream is = java.nio.file.Files.newInputStream(filePath);
            java.util.Map<String, String> extractedDates = pdfParsingService.extractDatesFromPdf(is);
            is.close();
            
            if (extractedDates.isEmpty()) {
                return "Could not extract any dates from the PDF.";
            }

            // Apply updates
            if (extractedDates.containsKey("CAT1_SEM1")) cal.setSem1Cat1DegreeDate(extractedDates.get("CAT1_SEM1"));
            if (extractedDates.containsKey("CAT1_SEM1")) cal.setSem1Cat1DiplomaDate(extractedDates.get("CAT1_SEM1"));
            if (extractedDates.containsKey("CAT2_SEM1")) cal.setSem1Cat2DegreeDate(extractedDates.get("CAT2_SEM1"));
            if (extractedDates.containsKey("CAT2_SEM1")) cal.setSem1Cat2DiplomaDate(extractedDates.get("CAT2_SEM1"));
            if (extractedDates.containsKey("UE_SEM1")) cal.setSem1UeDegreeDate(extractedDates.get("UE_SEM1"));
            if (extractedDates.containsKey("UE_SEM1")) cal.setSem1UeDiplomaDate(extractedDates.get("UE_SEM1"));

            if (extractedDates.containsKey("CAT1_SEM2")) cal.setSem2Cat1DegreeDate(extractedDates.get("CAT1_SEM2"));
            if (extractedDates.containsKey("CAT1_SEM2")) cal.setSem2Cat1DiplomaDate(extractedDates.get("CAT1_SEM2"));
            if (extractedDates.containsKey("CAT2_SEM2")) cal.setSem2Cat2DegreeDate(extractedDates.get("CAT2_SEM2"));
            if (extractedDates.containsKey("CAT2_SEM2")) cal.setSem2Cat2DiplomaDate(extractedDates.get("CAT2_SEM2"));
            if (extractedDates.containsKey("UE_SEM2")) cal.setSem2UeDegreeDate(extractedDates.get("UE_SEM2"));
            if (extractedDates.containsKey("UE_SEM2")) cal.setSem2UeDiplomaDate(extractedDates.get("UE_SEM2"));
            
            academicCalendarRepository.save(cal);
            return "SUCCESS! Extracted and saved the following dates: " + extractedDates.toString() + ". You can now refresh your page.";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }

    @PostMapping("/calendar/upload")
    public String uploadCalendar(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "academicYear", required = false) String academicYear,
            @RequestParam(value = "sem1Cat1DegreeDate", required = false) String sem1Cat1DegreeDate,
            @RequestParam(value = "sem1Cat1DegreeEndDate", required = false) String sem1Cat1DegreeEndDate,
            @RequestParam(value = "sem1Cat1DiplomaDate", required = false) String sem1Cat1DiplomaDate,
            @RequestParam(value = "sem1Cat1DiplomaEndDate", required = false) String sem1Cat1DiplomaEndDate,
            @RequestParam(value = "sem1Cat2DegreeDate", required = false) String sem1Cat2DegreeDate,
            @RequestParam(value = "sem1Cat2DegreeEndDate", required = false) String sem1Cat2DegreeEndDate,
            @RequestParam(value = "sem1Cat2DiplomaDate", required = false) String sem1Cat2DiplomaDate,
            @RequestParam(value = "sem1Cat2DiplomaEndDate", required = false) String sem1Cat2DiplomaEndDate,
            @RequestParam(value = "sem1UeDegreeDate", required = false) String sem1UeDegreeDate,
            @RequestParam(value = "sem1UeDegreeEndDate", required = false) String sem1UeDegreeEndDate,
            @RequestParam(value = "sem1UeDiplomaDate", required = false) String sem1UeDiplomaDate,
            @RequestParam(value = "sem1UeDiplomaEndDate", required = false) String sem1UeDiplomaEndDate,
            @RequestParam(value = "sem2Cat1DegreeDate", required = false) String sem2Cat1DegreeDate,
            @RequestParam(value = "sem2Cat1DegreeEndDate", required = false) String sem2Cat1DegreeEndDate,
            @RequestParam(value = "sem2Cat1DiplomaDate", required = false) String sem2Cat1DiplomaDate,
            @RequestParam(value = "sem2Cat1DiplomaEndDate", required = false) String sem2Cat1DiplomaEndDate,
            @RequestParam(value = "sem2Cat2DegreeDate", required = false) String sem2Cat2DegreeDate,
            @RequestParam(value = "sem2Cat2DegreeEndDate", required = false) String sem2Cat2DegreeEndDate,
            @RequestParam(value = "sem2Cat2DiplomaDate", required = false) String sem2Cat2DiplomaDate,
            @RequestParam(value = "sem2Cat2DiplomaEndDate", required = false) String sem2Cat2DiplomaEndDate,
            @RequestParam(value = "sem2UeDegreeDate", required = false) String sem2UeDegreeDate,
            @RequestParam(value = "sem2UeDegreeEndDate", required = false) String sem2UeDegreeEndDate,
            @RequestParam(value = "sem2UeDiplomaDate", required = false) String sem2UeDiplomaDate,
            @RequestParam(value = "sem2UeDiplomaEndDate", required = false) String sem2UeDiplomaEndDate,
            @RequestParam(value = "isCurrent", required = false) boolean isCurrent,
            @RequestParam(value = "sem1Cat1DegreeFile", required = false) MultipartFile sem1Cat1DegreeFile,
            @RequestParam(value = "sem1Cat1DiplomaFile", required = false) MultipartFile sem1Cat1DiplomaFile,
            @RequestParam(value = "sem1Cat2DegreeFile", required = false) MultipartFile sem1Cat2DegreeFile,
            @RequestParam(value = "sem1Cat2DiplomaFile", required = false) MultipartFile sem1Cat2DiplomaFile,
            @RequestParam(value = "sem1UeDegreeFile", required = false) MultipartFile sem1UeDegreeFile,
            @RequestParam(value = "sem1UeDiplomaFile", required = false) MultipartFile sem1UeDiplomaFile,
            @RequestParam(value = "sem2Cat1DegreeFile", required = false) MultipartFile sem2Cat1DegreeFile,
            @RequestParam(value = "sem2Cat1DiplomaFile", required = false) MultipartFile sem2Cat1DiplomaFile,
            @RequestParam(value = "sem2Cat2DegreeFile", required = false) MultipartFile sem2Cat2DegreeFile,
            @RequestParam(value = "sem2Cat2DiplomaFile", required = false) MultipartFile sem2Cat2DiplomaFile,
            @RequestParam(value = "sem2UeDegreeFile", required = false) MultipartFile sem2UeDegreeFile,
            @RequestParam(value = "sem2UeDiplomaFile", required = false) MultipartFile sem2UeDiplomaFile,
            HttpSession session, RedirectAttributes redirectAttributes) {

        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }

        try {
            java.util.Map<String, String> extractedDates = new java.util.HashMap<>();
            if (file != null && !file.isEmpty()) {
                extractedDates = pdfParsingService.extractDatesFromPdf(file);
            }

            // Auto-fill Sem1 Dates if empty
            if ((sem1Cat1DegreeDate == null || sem1Cat1DegreeDate.isEmpty()) && extractedDates.containsKey("CAT1_SEM1")) sem1Cat1DegreeDate = extractedDates.get("CAT1_SEM1");
            if ((sem1Cat1DiplomaDate == null || sem1Cat1DiplomaDate.isEmpty()) && extractedDates.containsKey("CAT1_SEM1")) sem1Cat1DiplomaDate = extractedDates.get("CAT1_SEM1");
            
            if ((sem1Cat2DegreeDate == null || sem1Cat2DegreeDate.isEmpty()) && extractedDates.containsKey("CAT2_SEM1")) sem1Cat2DegreeDate = extractedDates.get("CAT2_SEM1");
            if ((sem1Cat2DiplomaDate == null || sem1Cat2DiplomaDate.isEmpty()) && extractedDates.containsKey("CAT2_SEM1")) sem1Cat2DiplomaDate = extractedDates.get("CAT2_SEM1");
            
            if ((sem1UeDegreeDate == null || sem1UeDegreeDate.isEmpty()) && extractedDates.containsKey("UE_SEM1")) sem1UeDegreeDate = extractedDates.get("UE_SEM1");
            if ((sem1UeDiplomaDate == null || sem1UeDiplomaDate.isEmpty()) && extractedDates.containsKey("UE_SEM1")) sem1UeDiplomaDate = extractedDates.get("UE_SEM1");

            // Auto-fill Sem2 Dates if empty
            if ((sem2Cat1DegreeDate == null || sem2Cat1DegreeDate.isEmpty()) && extractedDates.containsKey("CAT1_SEM2")) sem2Cat1DegreeDate = extractedDates.get("CAT1_SEM2");
            if ((sem2Cat1DiplomaDate == null || sem2Cat1DiplomaDate.isEmpty()) && extractedDates.containsKey("CAT1_SEM2")) sem2Cat1DiplomaDate = extractedDates.get("CAT1_SEM2");
            
            if ((sem2Cat2DegreeDate == null || sem2Cat2DegreeDate.isEmpty()) && extractedDates.containsKey("CAT2_SEM2")) sem2Cat2DegreeDate = extractedDates.get("CAT2_SEM2");
            if ((sem2Cat2DiplomaDate == null || sem2Cat2DiplomaDate.isEmpty()) && extractedDates.containsKey("CAT2_SEM2")) sem2Cat2DiplomaDate = extractedDates.get("CAT2_SEM2");
            
            if ((sem2UeDegreeDate == null || sem2UeDegreeDate.isEmpty()) && extractedDates.containsKey("UE_SEM2")) sem2UeDegreeDate = extractedDates.get("UE_SEM2");
            if ((sem2UeDiplomaDate == null || sem2UeDiplomaDate.isEmpty()) && extractedDates.containsKey("UE_SEM2")) sem2UeDiplomaDate = extractedDates.get("UE_SEM2");

            AcademicCalendar calendar = new AcademicCalendar();
            calendar.setAcademicYear(academicYear);
            calendar.setSem1Cat1DegreeDate(sem1Cat1DegreeDate);
            calendar.setSem1Cat1DegreeEndDate(sem1Cat1DegreeEndDate);
            calendar.setSem1Cat1DiplomaDate(sem1Cat1DiplomaDate);
            calendar.setSem1Cat1DiplomaEndDate(sem1Cat1DiplomaEndDate);
            calendar.setSem1Cat2DegreeDate(sem1Cat2DegreeDate);
            calendar.setSem1Cat2DegreeEndDate(sem1Cat2DegreeEndDate);
            calendar.setSem1Cat2DiplomaDate(sem1Cat2DiplomaDate);
            calendar.setSem1Cat2DiplomaEndDate(sem1Cat2DiplomaEndDate);
            calendar.setSem1UeDegreeDate(sem1UeDegreeDate);
            calendar.setSem1UeDegreeEndDate(sem1UeDegreeEndDate);
            calendar.setSem1UeDiplomaDate(sem1UeDiplomaDate);
            calendar.setSem1UeDiplomaEndDate(sem1UeDiplomaEndDate);
            
            calendar.setSem2Cat1DegreeDate(sem2Cat1DegreeDate);
            calendar.setSem2Cat1DegreeEndDate(sem2Cat1DegreeEndDate);
            calendar.setSem2Cat1DiplomaDate(sem2Cat1DiplomaDate);
            calendar.setSem2Cat1DiplomaEndDate(sem2Cat1DiplomaEndDate);
            calendar.setSem2Cat2DegreeDate(sem2Cat2DegreeDate);
            calendar.setSem2Cat2DegreeEndDate(sem2Cat2DegreeEndDate);
            calendar.setSem2Cat2DiplomaDate(sem2Cat2DiplomaDate);
            calendar.setSem2Cat2DiplomaEndDate(sem2Cat2DiplomaEndDate);
            calendar.setSem2UeDegreeDate(sem2UeDegreeDate);
            calendar.setSem2UeDegreeEndDate(sem2UeDegreeEndDate);
            calendar.setSem2UeDiplomaDate(sem2UeDiplomaDate);
            calendar.setSem2UeDiplomaEndDate(sem2UeDiplomaEndDate);
            
            if (isCurrent) {
                // unset others
                academicCalendarRepository.findByIsCurrentTrue().ifPresent(old -> {
                    old.setIsCurrent(false);
                    academicCalendarRepository.save(old);
                });
            }
            calendar.setIsCurrent(isCurrent || academicCalendarRepository.count() == 0);

            if (file != null && !file.isEmpty()) {
                String fileUrl = fileStorageService.uploadFile(file);
                calendar.setFileUrl(fileUrl);
            }
            if (sem1Cat1DegreeFile != null && !sem1Cat1DegreeFile.isEmpty()) {
                calendar.setSem1Cat1DegreeUrl(fileStorageService.uploadFile(sem1Cat1DegreeFile));
            }
            if (sem1Cat1DiplomaFile != null && !sem1Cat1DiplomaFile.isEmpty()) {
                calendar.setSem1Cat1DiplomaUrl(fileStorageService.uploadFile(sem1Cat1DiplomaFile));
            }
            if (sem1Cat2DegreeFile != null && !sem1Cat2DegreeFile.isEmpty()) {
                calendar.setSem1Cat2DegreeUrl(fileStorageService.uploadFile(sem1Cat2DegreeFile));
            }
            if (sem1Cat2DiplomaFile != null && !sem1Cat2DiplomaFile.isEmpty()) {
                calendar.setSem1Cat2DiplomaUrl(fileStorageService.uploadFile(sem1Cat2DiplomaFile));
            }
            if (sem1UeDegreeFile != null && !sem1UeDegreeFile.isEmpty()) {
                calendar.setSem1UeDegreeUrl(fileStorageService.uploadFile(sem1UeDegreeFile));
            }
            if (sem1UeDiplomaFile != null && !sem1UeDiplomaFile.isEmpty()) {
                calendar.setSem1UeDiplomaUrl(fileStorageService.uploadFile(sem1UeDiplomaFile));
            }
            if (sem2Cat1DegreeFile != null && !sem2Cat1DegreeFile.isEmpty()) {
                calendar.setSem2Cat1DegreeUrl(fileStorageService.uploadFile(sem2Cat1DegreeFile));
            }
            if (sem2Cat1DiplomaFile != null && !sem2Cat1DiplomaFile.isEmpty()) {
                calendar.setSem2Cat1DiplomaUrl(fileStorageService.uploadFile(sem2Cat1DiplomaFile));
            }
            if (sem2Cat2DegreeFile != null && !sem2Cat2DegreeFile.isEmpty()) {
                calendar.setSem2Cat2DegreeUrl(fileStorageService.uploadFile(sem2Cat2DegreeFile));
            }
            if (sem2Cat2DiplomaFile != null && !sem2Cat2DiplomaFile.isEmpty()) {
                calendar.setSem2Cat2DiplomaUrl(fileStorageService.uploadFile(sem2Cat2DiplomaFile));
            }
            if (sem2UeDegreeFile != null && !sem2UeDegreeFile.isEmpty()) {
                calendar.setSem2UeDegreeUrl(fileStorageService.uploadFile(sem2UeDegreeFile));
            }
            if (sem2UeDiplomaFile != null && !sem2UeDiplomaFile.isEmpty()) {
                calendar.setSem2UeDiplomaUrl(fileStorageService.uploadFile(sem2UeDiplomaFile));
            }

            academicCalendarRepository.save(calendar);
            redirectAttributes.addFlashAttribute("success", "Academic Calendar uploaded successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to upload Academic Calendar: " + e.getMessage());
        }

        return "redirect:/admin/calendar";
    }

    @PostMapping("/calendar/{id}/delete")
    public String deleteCalendar(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_CALENDAR")) {
            return "redirect:/login";
        }
        
        AcademicCalendar calendar = academicCalendarRepository.findById(id).orElse(null);
        if (calendar != null) {
            String desc = "Calendar " + calendar.getAcademicYear();
            if ("PENDING".equals(handleDeletionRequest(user, "CALENDAR", id, desc, redirectAttributes))) {
                return "redirect:/admin/calendar";
            }
            try {
                if (calendar.getFileUrl() != null) {
                    String publicId = fileStorageService.extractCloudinaryPublicId(calendar.getFileUrl());
                    fileStorageService.deleteFile(publicId);
                }
                if (calendar.getSem1Cat1DegreeUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem1Cat1DegreeUrl()));
                if (calendar.getSem1Cat1DiplomaUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem1Cat1DiplomaUrl()));
                if (calendar.getSem1Cat2DegreeUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem1Cat2DegreeUrl()));
                if (calendar.getSem1Cat2DiplomaUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem1Cat2DiplomaUrl()));
                if (calendar.getSem1UeDegreeUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem1UeDegreeUrl()));
                if (calendar.getSem1UeDiplomaUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem1UeDiplomaUrl()));
                if (calendar.getSem2Cat1DegreeUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem2Cat1DegreeUrl()));
                if (calendar.getSem2Cat1DiplomaUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem2Cat1DiplomaUrl()));
                if (calendar.getSem2Cat2DegreeUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem2Cat2DegreeUrl()));
                if (calendar.getSem2Cat2DiplomaUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem2Cat2DiplomaUrl()));
                if (calendar.getSem2UeDegreeUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem2UeDegreeUrl()));
                if (calendar.getSem2UeDiplomaUrl() != null) fileStorageService.deleteFile(fileStorageService.extractCloudinaryPublicId(calendar.getSem2UeDiplomaUrl()));
            } catch (Exception ignored) {}
            academicCalendarRepository.delete(calendar);
            redirectAttributes.addFlashAttribute("success", "Academic Calendar deleted successfully.");
        }
        
        return "redirect:/admin/calendar";
    }

    // ============ ADMIN COURSES MANAGEMENT ============

    @GetMapping("/courses")
    public String listCourses(Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        List<Course> allCourses = courseRepository.findAll();
        List<Course> diplomaCourses = allCourses.stream()
                .filter(c -> c.getProgramType() != null && c.getProgramType().startsWith("DIP_"))
                .collect(java.util.stream.Collectors.toList());
        List<Course> degreeCourses = allCourses.stream()
                .filter(c -> c.getProgramType() != null && c.getProgramType().startsWith("DEG_"))
                .collect(java.util.stream.Collectors.toList());
        model.addAttribute("allCourses", allCourses);
        model.addAttribute("diplomaList", diplomaCourses);
        model.addAttribute("degreeList", degreeCourses);
        return "admin/admin_courses";
    }

    @PostMapping("/courses/add")
    @org.springframework.cache.annotation.CacheEvict(value = {"allCourses", "coursesByProgram"}, allEntries = true)
    public String addCourse(@RequestParam("name") String name,
                            @RequestParam("programType") String programType,
                            @RequestParam("shortName") String shortName,
                            @RequestParam("subtitle") String subtitle,
                            @RequestParam(value = "iconClass", defaultValue = "bi-book") String iconClass,
                            @RequestParam(value = "iconColor", defaultValue = "#10b981") String iconColor,
                            @RequestParam("duration") int duration,
                            @RequestParam("levelPrefix") String levelPrefix,
                            @RequestParam("startLevel") int startLevel,
                            RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }

        if (name == null || name.trim().isEmpty() || programType == null || programType.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Course name and program type are required.");
            return "redirect:/admin/courses";
        }

        // Check if programType already exists
        List<Course> existing = courseRepository.findByProgramType(programType.trim().toUpperCase());
        if (!existing.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "A course with program type '" + programType + "' already exists.");
            return "redirect:/admin/courses";
        }

        String iconBg = "rgba(16, 185, 129, 0.1)";
        // Generate icon background from color
        if (iconColor != null && iconColor.startsWith("#") && iconColor.length() == 7) {
            int r = Integer.parseInt(iconColor.substring(1, 3), 16);
            int g = Integer.parseInt(iconColor.substring(3, 5), 16);
            int b = Integer.parseInt(iconColor.substring(5, 7), 16);
            iconBg = "rgba(" + r + ", " + g + ", " + b + ", 0.1)";
        }

        Course course = new Course(
                name.trim().toUpperCase(),
                programType.trim().toUpperCase(),
                shortName.trim(),
                subtitle.trim(),
                iconClass.trim(),
                iconColor.trim(),
                iconBg,
                duration,
                levelPrefix.trim(),
                startLevel
        );
        courseRepository.save(course);
        redirectAttributes.addFlashAttribute("success", "Course '" + name.trim().toUpperCase() + "' added successfully!");
        return "redirect:/admin/courses";
    }

    @PostMapping("/courses/{id}/delete")
    @org.springframework.cache.annotation.CacheEvict(value = {"allCourses", "coursesByProgram"}, allEntries = true)
    public String deleteCourse(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!adminService.hasPermission(user, "MANAGE_COURSES")) {
            return "redirect:/login";
        }
        Course course = courseRepository.findById(id).orElse(null);
        if (course != null) {
            if ("PENDING".equals(handleDeletionRequest(user, "COURSE", id, course.getName(), redirectAttributes))) {
                return "redirect:/admin/courses";
            }
            // Delete all subjects linked to this course
            List<Subject> subjects = subjectRepository.findByCourse(course);
            subjectRepository.deleteAll(subjects);
            courseRepository.delete(course);
            redirectAttributes.addFlashAttribute("success", "Course '" + course.getName() + "' and its " + subjects.size() + " subject(s) deleted.");
        } else {
            redirectAttributes.addFlashAttribute("error", "Course not found.");
        }
        return "redirect:/admin/courses";
    }

    // ============ SUPER ADMIN APPROVALS ============

    @GetMapping("/approvals")
    public String viewApprovals(HttpSession session, Model model) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            return "redirect:/login";
        }
        List<com.school.model.PendingAction> pendingActions = pendingActionRepository.findByStatusOrderByRequestDateDesc("PENDING");
        model.addAttribute("pendingActions", pendingActions);
        return "admin/admin_approvals";
    }

    @PostMapping("/approvals/{id}/approve")
    public String approveAction(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            return "redirect:/login";
        }
        
        com.school.model.PendingAction action = pendingActionRepository.findById(id).orElse(null);
        if (action != null && "PENDING".equals(action.getStatus())) {
            // Execute actual deletion based on entity type
            try {
                if ("DELETE".equals(action.getActionType())) {
                    switch (action.getTargetEntity()) {
                        case "USER": userRepository.deleteById(action.getTargetId()); break;
                        case "NOTE": noteRepository.deleteById(action.getTargetId()); break;
                        case "SUBJECT": subjectRepository.deleteById(action.getTargetId()); break;
                        case "COURSE": courseRepository.deleteById(action.getTargetId()); break;
                        case "TIMETABLE": timetableRepository.deleteById(action.getTargetId()); break;
                        case "CALENDAR": academicCalendarRepository.deleteById(action.getTargetId()); break;
                    }
                }
                action.setStatus("APPROVED");
                pendingActionRepository.save(action);
                redirectAttributes.addFlashAttribute("success", "Action approved and executed.");
            } catch(Exception e) {
                redirectAttributes.addFlashAttribute("error", "Error executing action: " + e.getMessage());
            }
        }
        return "redirect:/admin/approvals";
    }

    @PostMapping("/approvals/{id}/reject")
    public String rejectAction(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            return "redirect:/login";
        }
        
        com.school.model.PendingAction action = pendingActionRepository.findById(id).orElse(null);
        if (action != null && "PENDING".equals(action.getStatus())) {
            action.setStatus("REJECTED");
            pendingActionRepository.save(action);
            redirectAttributes.addFlashAttribute("success", "Action rejected.");
        }
        return "redirect:/admin/approvals";
    }

}
