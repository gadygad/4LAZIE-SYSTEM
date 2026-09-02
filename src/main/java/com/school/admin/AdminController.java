package com.school.admin;

import com.school.notes.Note;
import com.school.auth.Role;
import com.school.auth.User;
import com.school.notes.NoteRepository;
import com.school.auth.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.school.academic.Timetable;
import com.school.academic.TimetableRepository;
import com.school.auth.Role;
import com.school.auth.User;
import com.school.auth.UserRepository;
import com.school.auth.PasswordResetToken;
import com.school.auth.PasswordResetTokenRepository;
import com.school.auth.AuthUtil;
import com.school.academic.AcademicCalendar;
import com.school.academic.AcademicCalendarRepository;
import com.school.academic.Subject;
import com.school.academic.Course;
import com.school.academic.SubjectRepository;
import com.school.academic.CourseRepository;
import com.school.core.FileStorageService;
import com.school.core.PdfParsingService;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.bson.Document;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private MongoTemplate mongoTemplate;

        private UserRepository userRepository;

        private NoteRepository noteRepository;

        @Autowired
        private com.school.notes.NoteService noteService;
    
        private PasswordResetTokenRepository passwordResetTokenRepository;
    
        private TimetableRepository timetableRepository;

        private PdfParsingService pdfParsingService;

        private AcademicCalendarRepository academicCalendarRepository;
    
        private SubjectRepository subjectRepository;

        private CourseRepository courseRepository;
    
        private FileStorageService fileStorageService;

        private com.school.core.EmailService emailService;
    
        private PasswordEncoder passwordEncoder;

        private com.school.core.PendingActionRepository pendingActionRepository;

        private com.school.core.ActivityLogRepository activityLogRepository;

        private com.school.auth.AuthUtil authUtil;

        @org.springframework.beans.factory.annotation.Autowired
        private com.school.user.AssignmentRequestRepository assignmentRequestRepository;

        @org.springframework.beans.factory.annotation.Autowired
        private com.school.core.TeamMemberService teamMemberService;

        @org.springframework.beans.factory.annotation.Autowired
        private com.school.auth.VerificationRequestRepository verificationRequestRepository;

    private User getLoggedInUser() {
        return authUtil.getLoggedInUser();
    }

        private com.school.admin.AdminService adminService;
        
        private com.school.core.SiteVisitRepository siteVisitRepository;

    public AdminController(UserRepository userRepository, NoteRepository noteRepository, PasswordResetTokenRepository passwordResetTokenRepository, TimetableRepository timetableRepository, PdfParsingService pdfParsingService, AcademicCalendarRepository academicCalendarRepository, SubjectRepository subjectRepository, CourseRepository courseRepository, FileStorageService fileStorageService, com.school.core.EmailService emailService, PasswordEncoder passwordEncoder, com.school.core.PendingActionRepository pendingActionRepository, com.school.core.ActivityLogRepository activityLogRepository, com.school.auth.AuthUtil authUtil, com.school.admin.AdminService adminService, com.school.core.SiteVisitRepository siteVisitRepository) {
        this.userRepository = userRepository;
        this.noteRepository = noteRepository;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.timetableRepository = timetableRepository;
        this.pdfParsingService = pdfParsingService;
        this.academicCalendarRepository = academicCalendarRepository;
        this.subjectRepository = subjectRepository;
        this.courseRepository = courseRepository;
        this.fileStorageService = fileStorageService;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
        this.pendingActionRepository = pendingActionRepository;
        this.activityLogRepository = activityLogRepository;
        this.authUtil = authUtil;
        this.adminService = adminService;
        this.siteVisitRepository = siteVisitRepository;
    }


    private String handleDeletionRequest(User admin, String entityType, String entityId, String entityDesc, RedirectAttributes redirectAttributes) {
        String result = adminService.processDeletionRequest(admin, entityType, entityId, entityDesc);
        if ("PENDING".equals(result)) {
            redirectAttributes.addFlashAttribute("info", "Deletion request submitted to Super Admin for approval.");
        }
        return result;
    }

    private void logAdminAction(User admin, String action, String details) {
        try {
            com.school.core.ActivityLog log = new com.school.core.ActivityLog(
                admin.getId(), admin.getName(), admin.getRole().name(), action, details, null, "Admin Portal"
            );
            activityLogRepository.save(log);
        } catch (Exception ignored) {
        }
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
        
        // Analytics Defaults
        Long totalUniqueVisitors = 0L;
        Long guestVisitors = 0L;
        Long registeredVisitors = 0L;
        Long mobileVisitors = 0L;
        Long desktopVisitors = 0L;
        Long guestViews = 0L;
        Long guestDownloads = 0L;

        List<User> recentUsers = java.util.Collections.emptyList();
        List<Note> popularNotes = java.util.Collections.emptyList();
        List<com.school.core.ActivityLog> recentLogs = java.util.Collections.emptyList();
        
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
        
        // Fetch Site Analytics
        try {
            totalUniqueVisitors = siteVisitRepository.countTotalUniqueVisitors();
            if (totalUniqueVisitors == null) totalUniqueVisitors = 0L;
            
            guestVisitors = siteVisitRepository.countGuestVisitors();
            if (guestVisitors == null) guestVisitors = 0L;
            
            guestViews = siteVisitRepository.countGuestViews();
            if (guestViews == null) guestViews = 0L;
            
            guestDownloads = siteVisitRepository.countGuestDownloads();
            if (guestDownloads == null) guestDownloads = 0L;
            
            registeredVisitors = siteVisitRepository.countRegisteredVisitors();
            if (registeredVisitors == null) registeredVisitors = 0L;
            
            mobileVisitors = siteVisitRepository.countMobileVisitors();
            if (mobileVisitors == null) mobileVisitors = 0L;
            
            desktopVisitors = siteVisitRepository.countDesktopVisitors();
            if (desktopVisitors == null) desktopVisitors = 0L;
        } catch (Exception e) {
            log.warn("Failed to get site analytics: {}", e.getMessage(), e);
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
        
        log.info("Dashboard data loaded - Users: {}, Notes: {}, Downloads: {}, UniqueVisitors: {}",
                totalUsers, totalNotes, totalDownloads, totalUniqueVisitors);
        
        model.addAttribute("totalUsers", totalUsers);
        model.addAttribute("totalNotes", totalNotes);
        model.addAttribute("totalDownloads", totalDownloads != null ? totalDownloads : 0L);
        
        // Pass Analytics to view
        model.addAttribute("totalUniqueVisitors", totalUniqueVisitors);
        model.addAttribute("guestVisitors", guestVisitors);
        model.addAttribute("guestViews", guestViews);
        model.addAttribute("guestDownloads", guestDownloads);
        model.addAttribute("registeredVisitors", registeredVisitors);
        model.addAttribute("mobileVisitors", mobileVisitors);
        model.addAttribute("desktopVisitors", desktopVisitors);
        
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

    @GetMapping("/users/{id}/profile")
    public String viewUserProfile(@PathVariable String id, HttpSession session, Model model) {
        User admin = getLoggedInUser();
        if (!adminService.hasPermission(admin, "MANAGE_USERS")) {
            return "redirect:/login";
        }
        User profileUser = userRepository.findById(id).orElse(null);
        if (profileUser == null) {
            return "redirect:/admin/users";
        }
        model.addAttribute("loggedInUser", admin);
        model.addAttribute("profileUser", profileUser);
        return "admin/admin_user_profile";
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
            logAdminAction(user, "DELETE_USER", "Deleted user " + targetUser.getName() + " (" + targetUser.getEmail() + ")");
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
            logAdminAction(admin, !currentStatus ? "SUSPEND_USER" : "REACTIVATE_USER", (!currentStatus ? "Suspended " : "Reactivated ") + targetUser.getName() + " (" + targetUser.getEmail() + ")");

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
            logAdminAction(admin, "WARN_USER", "Warned " + targetUser.getName() + ": " + warningMessage.trim());

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
            Role oldRole = targetUser.getRole();
            targetUser.setRole(role);
            userRepository.save(targetUser);
            logAdminAction(user, "CHANGE_ROLE", "Changed " + targetUser.getName() + "'s role from " + oldRole + " to " + role);
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
            logAdminAction(user, "UPDATE_PERMISSIONS", "Set permissions for " + targetUser.getName() + " to " + newPermissions);
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
        model.addAttribute("isSuperAdmin", user.getRole() == Role.SUPER_ADMIN);
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
            logAdminAction(user, "DELETE_NOTE", "Deleted note \"" + note.getTitle() + "\"");
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

    /**
     * Edit entry point for a note — Super Admin only. Generated exams (UE /
     * CAT 1 / CAT 2, identified by having a contentJson) redirect straight
     * into their own generator page pre-filled for editing, since that page
     * already has all the question-builder UI. Plain uploaded notes (just a
     * file + metadata) get a small standalone metadata-edit form instead,
     * since there's no "content" to edit beyond that — the file itself lives
     * in Cloudinary.
     */
    @GetMapping("/notes/{id}/edit")
    public String editNote(@PathVariable String id, Model model, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            redirectAttributes.addFlashAttribute("error", "Only Super Admin can edit a note.");
            return "redirect:/admin/notes";
        }
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null) {
            redirectAttributes.addFlashAttribute("error", "Note not found.");
            return "redirect:/admin/notes";
        }

        if (note.getContentJson() != null) {
            String category = note.getCategory() != null ? note.getCategory().trim() : "";
            if ("CAT 1".equalsIgnoreCase(category)) {
                return "redirect:/generate-exam/sjuit-diploma-cat1?editId=" + id;
            } else if ("CAT 2".equalsIgnoreCase(category)) {
                return "redirect:/generate-exam/sjuit-diploma-cat2?editId=" + id;
            }
            return "redirect:/generate-exam/sjuit-diploma-ue?editId=" + id;
        }

        model.addAttribute("note", note);
        model.addAttribute("user", user);
        return "admin/edit_note";
    }

    @PostMapping("/notes/{id}/edit")
    public String updateNoteMetadata(@PathVariable String id,
                                      @RequestParam String title,
                                      @RequestParam(required = false) String moduleCode,
                                      @RequestParam(required = false) String moduleName,
                                      @RequestParam(required = false) String academicYear,
                                      @RequestParam(required = false) Integer levelNo,
                                      @RequestParam(required = false) Integer semesterNo,
                                      @RequestParam(required = false) String category,
                                      RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            redirectAttributes.addFlashAttribute("error", "Only Super Admin can edit a note.");
            return "redirect:/admin/notes";
        }
        Note note = noteRepository.findById(id).orElse(null);
        if (note == null) {
            redirectAttributes.addFlashAttribute("error", "Note not found.");
            return "redirect:/admin/notes";
        }

        note.setTitle(title);
        note.setModuleCode(moduleCode);
        note.setModuleName(moduleName);
        note.setAcademicYear(academicYear);
        note.setLevelNo(levelNo);
        note.setSemesterNo(semesterNo);
        if (category != null && !category.isBlank()) {
            note.setCategory(category);
        }
        noteRepository.save(note);
        redirectAttributes.addFlashAttribute("success", "Note updated successfully.");
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
        if (!adminService.hasPermission(user, "MANAGE_SUBJECTS")) {
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
        if (!adminService.hasPermission(user, "MANAGE_TIMETABLES")) {
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
        return "admin/admin_calendar";
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
        List<com.school.core.PendingAction> pendingActions = pendingActionRepository.findByStatusOrderByRequestDateDesc("PENDING");
        
        java.util.Map<String, String> draftReplies = new java.util.HashMap<>();
        for (com.school.core.PendingAction action : pendingActions) {
            if ("CONTACT_MESSAGE".equals(action.getTargetEntity()) && "REPLY".equals(action.getActionType())) {
                assignmentRequestRepository.findById(action.getTargetId()).ifPresent(req -> {
                    draftReplies.put(action.getId(), req.getAdminReply());
                });
            }
        }
        
        model.addAttribute("pendingActions", pendingActions);
        model.addAttribute("draftReplies", draftReplies);
        return "admin/admin_approvals";
    }

    @PostMapping("/approvals/{id}/approve")
    public String approveAction(@PathVariable String id, @RequestParam(value = "editedReply", required = false) String editedReply, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || user.getRole() != Role.SUPER_ADMIN) {
            return "redirect:/login";
        }
        
        com.school.core.PendingAction action = pendingActionRepository.findById(id).orElse(null);
        if (action != null && "PENDING".equals(action.getStatus())) {
            // Execute actual action based on entity type and action type
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
                } else if ("REPLY".equals(action.getActionType()) && "CONTACT_MESSAGE".equals(action.getTargetEntity())) {
                    com.school.user.AssignmentRequest request = assignmentRequestRepository.findById(action.getTargetId()).orElse(null);
                    if (request != null) {
                        String replyMessage = editedReply != null && !editedReply.trim().isEmpty() ? editedReply : request.getAdminReply();
                        request.setAdminReply(replyMessage);
                        request.setStatus("SOLVED");
                        request.setSolvedAt(java.time.LocalDateTime.now());
                        assignmentRequestRepository.save(request);
                        
                        emailService.sendSupportReplyEmail(request.getEmail(), request.getFullName(), replyMessage, request.getQuestionText());
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
        
        com.school.core.PendingAction action = pendingActionRepository.findById(id).orElse(null);
        if (action != null && "PENDING".equals(action.getStatus())) {
            action.setStatus("REJECTED");
            pendingActionRepository.save(action);
            redirectAttributes.addFlashAttribute("success", "Action rejected.");
        }
        return "redirect:/admin/approvals";
    }

    // ============ VERIFIED BADGE REQUESTS ============
    // SUPER_ADMIN always manages verification; SUPER_ADMIN can additionally
    // delegate that ability to any other user via the "canVerifyUsers"
    // permission string (reusing the existing generic permissions set).

    private boolean canManageVerification(User user) {
        return user != null && (user.getRole() == Role.SUPER_ADMIN
                || (user.getPermissions() != null && user.getPermissions().contains("canVerifyUsers")));
    }

    @GetMapping("/verification-requests")
    public String viewVerificationRequests(Model model) {
        User user = getLoggedInUser();
        if (!canManageVerification(user)) {
            return "redirect:/login";
        }
        List<com.school.auth.VerificationRequest> requests = verificationRequestRepository.findByStatusOrderByRequestDateDesc("PENDING");
        java.util.Map<String, User> requesters = new java.util.HashMap<>();
        for (com.school.auth.VerificationRequest r : requests) {
            userRepository.findById(r.getUserId()).ifPresent(u -> requesters.put(r.getUserId(), u));
        }
        model.addAttribute("requests", requests);
        model.addAttribute("requesters", requesters);
        return "admin/admin_verification_requests";
    }

    @PostMapping("/verification-requests/{id}/approve")
    public String approveVerification(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!canManageVerification(user)) {
            return "redirect:/login";
        }
        com.school.auth.VerificationRequest req = verificationRequestRepository.findById(id).orElse(null);
        if (req != null && "PENDING".equals(req.getStatus())) {
            req.setStatus("APPROVED");
            req.setReviewedByUserId(user.getId());
            req.setReviewedAt(java.time.LocalDateTime.now());
            verificationRequestRepository.save(req);
            userRepository.findById(req.getUserId()).ifPresent(u -> {
                u.setHasVerifiedBadge(true);
                userRepository.save(u);
            });
            redirectAttributes.addFlashAttribute("success", "Verification approved.");
        }
        return "redirect:/admin/verification-requests";
    }

    @PostMapping("/verification-requests/{id}/reject")
    public String rejectVerification(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (!canManageVerification(user)) {
            return "redirect:/login";
        }
        com.school.auth.VerificationRequest req = verificationRequestRepository.findById(id).orElse(null);
        if (req != null && "PENDING".equals(req.getStatus())) {
            req.setStatus("REJECTED");
            req.setReviewedByUserId(user.getId());
            req.setReviewedAt(java.time.LocalDateTime.now());
            verificationRequestRepository.save(req);
            redirectAttributes.addFlashAttribute("success", "Request rejected.");
        }
        return "redirect:/admin/verification-requests";
    }

    // Direct grant — an admin with verification rights can badge someone
    // without them ever having submitted a request.
    @PostMapping("/users/{id}/grant-badge")
    public String grantBadge(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User admin = getLoggedInUser();
        if (!canManageVerification(admin)) {
            return "redirect:/login";
        }
        User target = userRepository.findById(id).orElse(null);
        if (target != null) {
            target.setHasVerifiedBadge(true);
            userRepository.save(target);
            redirectAttributes.addFlashAttribute("success", target.getName() + " is now verified.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/revoke-badge")
    public String revokeBadge(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User admin = getLoggedInUser();
        if (!canManageVerification(admin)) {
            return "redirect:/login";
        }
        User target = userRepository.findById(id).orElse(null);
        if (target != null) {
            target.setHasVerifiedBadge(false);
            userRepository.save(target);
            redirectAttributes.addFlashAttribute("success", "Badge revoked from " + target.getName() + ".");
        }
        return "redirect:/admin/users";
    }

    // Delegation — only SUPER_ADMIN can grant/revoke another admin's ability
    // to manage verification themselves.
    @PostMapping("/users/{id}/toggle-can-verify")
    public String toggleCanVerify(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User admin = getLoggedInUser();
        if (admin == null || admin.getRole() != Role.SUPER_ADMIN) {
            return "redirect:/login";
        }
        User target = userRepository.findById(id).orElse(null);
        if (target != null) {
            if (target.getPermissions() == null) target.setPermissions(new java.util.HashSet<>());
            if (target.getPermissions().contains("canVerifyUsers")) {
                target.getPermissions().remove("canVerifyUsers");
                redirectAttributes.addFlashAttribute("success", target.getName() + " can no longer approve verification requests.");
            } else {
                target.getPermissions().add("canVerifyUsers");
                redirectAttributes.addFlashAttribute("success", target.getName() + " can now approve verification requests.");
            }
            userRepository.save(target);
        }
        return "redirect:/admin/users";
    }

    // ============ ADMIN TEAM MEMBERS MANAGEMENT ============

    @GetMapping("/team-members")
    public String listTeamMembers(HttpSession session, Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        
        List<com.school.core.TeamMember> teamMembers = teamMemberService.getAllTeamMembers();
        model.addAttribute("teamMembers", teamMembers);
        return "admin/admin_team_members";
    }

    @PostMapping("/team-members/add")
    public String addTeamMember(@ModelAttribute com.school.core.TeamMember teamMember,
                                @RequestParam(value = "image", required = false) MultipartFile image,
                                RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        try {
            teamMemberService.saveTeamMember(teamMember, image);
            redirectAttributes.addFlashAttribute("success", "Team member added successfully!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error adding team member: " + e.getMessage());
        }
        return "redirect:/admin/team-members";
    }

    @PostMapping("/team-members/{id}/edit")
    public String editTeamMember(@PathVariable String id,
                                 @ModelAttribute com.school.core.TeamMember updatedMember,
                                 @RequestParam(value = "image", required = false) MultipartFile image,
                                 RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        try {
            com.school.core.TeamMember existing = teamMemberService.getTeamMemberById(id);
            if (existing != null) {
                existing.setName(updatedMember.getName());
                existing.setRole(updatedMember.getRole());
                existing.setQuote(updatedMember.getQuote());
                existing.setDisplayOrder(updatedMember.getDisplayOrder());
                teamMemberService.saveTeamMember(existing, image);
                redirectAttributes.addFlashAttribute("success", "Team member updated successfully!");
            }
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error updating team member: " + e.getMessage());
        }
        return "redirect:/admin/team-members";
    }

    @PostMapping("/team-members/{id}/delete")
    public String deleteTeamMember(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        teamMemberService.deleteTeamMember(id);
        redirectAttributes.addFlashAttribute("success", "Team member deleted successfully!");
        return "redirect:/admin/team-members";
    }

    @PostMapping("/team-members/{id}/toggle-status")
    public String toggleTeamMemberStatus(@PathVariable String id, RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        teamMemberService.toggleStatus(id);
        redirectAttributes.addFlashAttribute("success", "Status changed successfully!");
        return "redirect:/admin/team-members";
    }

    @GetMapping("/upload-shared")
    public String showUploadSharedPage(Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        
        List<Course> allCourses = courseRepository.findAll();
        
        // Use MongoTemplate to fetch raw documents and avoid N+1 DBRef lazy loading queries
        List<Document> rawSubjects = mongoTemplate.findAll(Document.class, "subjects");
        java.util.Map<String, java.util.List<Subject>> subjectsByCourseId = new java.util.HashMap<>();
        
        for (Document rawSub : rawSubjects) {
            Object courseObj = rawSub.get("course");
            if (courseObj instanceof com.mongodb.DBRef) {
                com.mongodb.DBRef courseRef = (com.mongodb.DBRef) courseObj;
                String courseId = courseRef.getId().toString();
                
                Subject sub = new Subject();
                sub.setId(rawSub.getObjectId("_id").toHexString());
                sub.setName(rawSub.getString("name"));
                sub.setCode(rawSub.getString("code"));
                sub.setLevelNo(rawSub.getInteger("levelNo"));
                sub.setSemesterNo(rawSub.getInteger("semesterNo"));
                
                subjectsByCourseId.computeIfAbsent(courseId, k -> new java.util.ArrayList<>()).add(sub);
            }
        }
        
        model.addAttribute("courses", allCourses);
        model.addAttribute("subjectsByCourseId", subjectsByCourseId);
        model.addAttribute("activePage", "upload-shared");
        
        return "notes/upload_shared";
    }

    @PostMapping("/upload-shared")
    public String processUploadShared(@RequestParam("title") String title,
                                      @RequestParam("category") String category,
                                      @RequestParam("academicYear") String academicYear,
                                      @RequestParam("file") MultipartFile file,
                                      @RequestParam(value = "targetCourses", required = false) List<String> targetCourses,
                                      jakarta.servlet.http.HttpServletRequest request,
                                      RedirectAttributes redirectAttributes) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        
        if (targetCourses == null || targetCourses.isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Please select at least one course/module.");
            return "redirect:/admin/upload-shared";
        }
        
        try {
            String appUrl = request.getScheme() + "://" + request.getServerName() + 
                            ("http".equals(request.getScheme()) && request.getServerPort() == 80 || "https".equals(request.getScheme()) && request.getServerPort() == 443 ? "" : ":" + request.getServerPort());
                            
            noteService.uploadSharedNote(title, category, academicYear, file, targetCourses, user, appUrl);
            redirectAttributes.addFlashAttribute("success", "Shared document uploaded and assigned successfully to " + targetCourses.size() + " modules!");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Failed to upload document: " + e.getMessage());
        }
        
        return "redirect:/admin/upload-shared";
    }

}
