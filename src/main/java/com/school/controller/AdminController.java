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
    private AcademicCalendarRepository academicCalendarRepository;
    
    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private FileStorageService fileStorageService;
    
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

    private boolean hasPermission(User user, String requiredPermission) {
        if (user == null) return false;
        if (user.getRole() == Role.SUPER_ADMIN) return true;
        if ((user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) return false;
        if (requiredPermission == null || requiredPermission.isEmpty()) return true; // Just basic admin check
        return user.getPermissions() != null && user.getPermissions().contains(requiredPermission);
    }

    private String handleDeletionRequest(User admin, String entityType, String entityId, String entityDesc, RedirectAttributes redirectAttributes) {
        if (admin.getRole() == Role.SUPER_ADMIN) {
            return "PROCEED";
        } else {
            com.school.model.PendingAction pa = new com.school.model.PendingAction(admin.getId(), admin.getName(), entityType, entityId, entityDesc, "DELETE");
            pendingActionRepository.save(pa);
            redirectAttributes.addFlashAttribute("info", "Deletion request submitted to Super Admin for approval.");
            return "PENDING";
        }
    }

    @GetMapping({"", "/", "/dashboard"})
    public String adminDashboard(HttpSession session, Model model) {
        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }
        
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
            org.slf4j.LoggerFactory.getLogger(AdminController.class).warn("Failed to count users: {}", e.getMessage());
        }
        try {
            totalNotes = noteRepository.count();
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(AdminController.class).warn("Failed to count notes: {}", e.getMessage());
        }
        try {
            totalDownloads = noteRepository.getTotalDownloadCount();
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(AdminController.class).warn("Failed to get download count: {}", e.getMessage());
        }
        try {
            totalViews = noteRepository.getTotalViewCount();
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(AdminController.class).warn("Failed to get view count: {}", e.getMessage());
        }
        try {
            recentUsers = userRepository.findTop5ByOrderByDateJoinedDesc();
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(AdminController.class).warn("Failed to get recent users: {}", e.getMessage());
        }
        try {
            popularNotes = noteRepository.findTop5ByOrderByDownloadCountDesc();
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(AdminController.class).warn("Failed to get popular notes: {}", e.getMessage());
        }
        try {
            recentLogs = activityLogRepository.findTop50ByOrderByTimestampDesc();
            if (recentLogs.size() > 10) {
                recentLogs = recentLogs.subList(0, 10);
            }
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(AdminController.class).warn("Failed to get activity logs: {}", e.getMessage());
        }
        
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
        if (!hasPermission(user, "MANAGE_USERS")) {
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
        if (!hasPermission(user, "MANAGE_USERS")) {
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
        if (!hasPermission(user, "MANAGE_USERS")) {
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
    public String sendRecoveryLink(@PathVariable String id, jakarta.servlet.http.HttpServletRequest request, HttpSession session, RedirectAttributes redirectAttributes) {
        User admin = getLoggedInUser();
        if (!hasPermission(admin, "MANAGE_USERS")) {
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
            
            // Send email
            com.school.service.EmailService emailService = org.springframework.web.context.support.WebApplicationContextUtils
                .getRequiredWebApplicationContext(session.getServletContext())
                .getBean(com.school.service.EmailService.class);
            emailService.sendRecoveryMagicLink(targetUser.getEmail(), targetUser.getName(), magicLink);
            
            redirectAttributes.addFlashAttribute("success", "Secure recovery link sent to " + targetUser.getName() + " (" + targetUser.getEmail() + ").");
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/suspend")
    public String toggleUserSuspension(@PathVariable String id, HttpSession session, RedirectAttributes redirectAttributes) {
        User admin = getLoggedInUser();
        if (!hasPermission(admin, "MANAGE_USERS")) {
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
            
            // Send email
            com.school.service.EmailService emailService = org.springframework.web.context.support.WebApplicationContextUtils
                .getRequiredWebApplicationContext(session.getServletContext())
                .getBean(com.school.service.EmailService.class);
            emailService.sendAccountSuspensionEmail(targetUser.getEmail(), targetUser.getName(), !currentStatus);
            
            String msg = !currentStatus ? "User suspended successfully." : "User reactivated successfully.";
            redirectAttributes.addFlashAttribute("success", msg);
        } else {
            redirectAttributes.addFlashAttribute("error", "User not found.");
        }
        return "redirect:/admin/users";
    }

    @PostMapping("/users/{id}/warn")
    public String warnUser(@PathVariable String id, @RequestParam("warningMessage") String warningMessage, HttpSession session, RedirectAttributes redirectAttributes) {
        User admin = getLoggedInUser();
        if (!hasPermission(admin, "MANAGE_USERS")) {
            return "redirect:/login";
        }
        
        if (warningMessage == null || warningMessage.trim().isEmpty()) {
            redirectAttributes.addFlashAttribute("error", "Warning message cannot be empty.");
            return "redirect:/admin/users";
        }
        
        User targetUser = userRepository.findById(id).orElse(null);
        if (targetUser != null) {
            // Send email
            com.school.service.EmailService emailService = org.springframework.web.context.support.WebApplicationContextUtils
                .getRequiredWebApplicationContext(session.getServletContext())
                .getBean(com.school.service.EmailService.class);
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
        if (!hasPermission(user, "MANAGE_NOTES")) {
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
        if (!hasPermission(user, "MANAGE_SUBJECTS")) {
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
            String safeHtml = htmlContent.trim()
                .replaceAll("(?is)<script.*?>.*?</script.*?>", "")
                .replaceAll("(?is)<iframe.*?>.*?</iframe.*?>", "")
                .replaceAll("(?i)onload\\s*=\\s*['\"].*?['\"]", "");
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
        if (!hasPermission(user, "MANAGE_TIMETABLES")) {
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

    @PostMapping("/calendar/upload")
    public String uploadCalendar(
            @RequestParam("file") MultipartFile file,
            @RequestParam("academicYear") String academicYear,
            @RequestParam("sem1Cat1Date") String sem1Cat1Date,
            @RequestParam("sem1Cat2Date") String sem1Cat2Date,
            @RequestParam("sem1UeDate") String sem1UeDate,
            @RequestParam("sem2Cat1Date") String sem2Cat1Date,
            @RequestParam("sem2Cat2Date") String sem2Cat2Date,
            @RequestParam("sem2UeDate") String sem2UeDate,
            @RequestParam(value = "isCurrent", required = false) boolean isCurrent,
            HttpSession session, RedirectAttributes redirectAttributes) {

        User user = getLoggedInUser();
        if (user == null || (user.getRole() != Role.ADMIN && user.getRole() != Role.SUPER_ADMIN)) {
            return "redirect:/login";
        }

        try {
            AcademicCalendar calendar = new AcademicCalendar();
            calendar.setAcademicYear(academicYear);
            calendar.setSem1Cat1Date(sem1Cat1Date);
            calendar.setSem1Cat2Date(sem1Cat2Date);
            calendar.setSem1UeDate(sem1UeDate);
            calendar.setSem2Cat1Date(sem2Cat1Date);
            calendar.setSem2Cat2Date(sem2Cat2Date);
            calendar.setSem2UeDate(sem2UeDate);
            
            if (isCurrent) {
                // unset others
                academicCalendarRepository.findByIsCurrentTrue().ifPresent(old -> {
                    old.setIsCurrent(false);
                    academicCalendarRepository.save(old);
                });
            }
            calendar.setIsCurrent(isCurrent || academicCalendarRepository.count() == 0);

            if (!file.isEmpty()) {
                String fileUrl = fileStorageService.uploadFile(file);
                calendar.setFileUrl(fileUrl);
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
        if (!hasPermission(user, "MANAGE_CALENDAR")) {
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
        if (!hasPermission(user, "MANAGE_COURSES")) {
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
