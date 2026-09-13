package com.school.core;

import com.school.notes.Note;
import com.school.academic.AcademicCalendar;
import com.school.notes.NoteRepository;
import com.school.academic.AcademicCalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Controller
public class HomeController {

    public static class ModuleAdvice {
        private String name;
        private String subtitle;
        private String description;

        public ModuleAdvice(String name, String subtitle, String description) {
            this.name = name;
            this.subtitle = subtitle;
            this.description = description;
        }

        public String getName() { return name; }
        public String getSubtitle() { return subtitle; }
        public String getDescription() { return description; }
    }

    private static ModuleAdvice getAdviceForModule(String moduleName) {
        String upper = moduleName.toUpperCase();
        if (upper.contains("MATHEMATICS") || upper.contains("CALCULUS")) {
            return new ModuleAdvice(moduleName, "PRACTICE INTENSIVE", "Focus heavily on practicing past papers. Mastering formulas and step-by-step problem solving is crucial for the University Exams.");
        } else if (upper.contains("PROGRAMMING") || upper.contains("JAVA") || upper.contains("C++") || upper.contains("PYTHON")) {
            return new ModuleAdvice(moduleName, "PRACTICAL FOCUS", "Don't just read notes. Write and test code daily. Focus on understanding core object-oriented concepts and syntax.");
        } else if (upper.contains("COMMUNICATION") || upper.contains("SKILLS")) {
            return new ModuleAdvice(moduleName, "ESSENTIAL SOFT SKILL", "Focus on report structure, grammar, and presentation formats. A vital skill for your final year projects.");
        } else if (upper.contains("NETWORK") || upper.contains("ROUTING")) {
            return new ModuleAdvice(moduleName, "CORE IT CONCEPT", "Understand topologies, IP addressing, and routing protocols. Hands-on practice with network simulators is highly recommended.");
        } else if (upper.contains("DATABASE") || upper.contains("SQL")) {
            return new ModuleAdvice(moduleName, "HIGH VALUE SKILL", "Master SQL queries and database normalization. This is a fundamental skill needed for almost all IT careers.");
        } else {
            return new ModuleAdvice(moduleName, "IMPORTANT FOCUS AREA", "Master the core concepts of this module. Consistent revision and reviewing past papers will guarantee your success.");
        }
    }

        private NoteRepository noteRepository;

        private AcademicCalendarRepository academicCalendarRepository;

        private com.school.academic.CourseRepository courseRepository;

    public HomeController(NoteRepository noteRepository, AcademicCalendarRepository academicCalendarRepository, com.school.academic.CourseRepository courseRepository) {
        this.noteRepository = noteRepository;
        this.academicCalendarRepository = academicCalendarRepository;
        this.courseRepository = courseRepository;
    }


    @GetMapping("/")
    public String home(Model model, jakarta.servlet.http.HttpSession session,
                        jakarta.servlet.http.HttpServletRequest request,
                        @org.springframework.web.bind.annotation.RequestParam(value = "openGpa", required = false) String openGpa) {
        // Logged-in users are normally sent straight to their dashboard, but the
        // GPA Calculator only exists on this page, so the "GPA CALCULATOR" nav
        // link (fragments/sjuit_components.html) needs an escape hatch to land
        // here instead of bouncing back to the dashboard.
        if (session.getAttribute("user") != null && !"true".equals(openGpa)) {
            return "redirect:/dashboard";
        }
        // Fetch the absolute 10 most recent uploads (Public Quick Access), filtering duplicates.
        // Once a guest has picked a college (the college-picker cookie), this
        // is scoped to just that college — the picker's own banner promises
        // "see notes made for you", so the very first notes a guest sees
        // shouldn't be a random mix from every college. No cookie yet (the
        // guest hasn't chosen, or dismissed the banner) falls back to the
        // cross-college pool, same as before.
        String cookieInstitutionId = com.school.core.CollegePickerController.readSelectedInstitutionId(request);
        java.util.Set<String> seenTitles = new java.util.HashSet<>();
        List<Note> notePool = cookieInstitutionId != null
                ? noteRepository.findTop50ByInstitutionIdOrderByIdDesc(cookieInstitutionId)
                : noteRepository.findTop50ByOrderByIdDesc();
        List<Note> popularNotes = notePool.stream()
                .filter(n -> n != null && (n.getIsPublic() == null || Boolean.TRUE.equals(n.getIsPublic())))
                .filter(n -> seenTitles.add(n.getTitle())) // only keep the first occurrence of each title
                .limit(10)
                .collect(Collectors.toList());
        
        // Fetch distinct module names from database and map to advice
        List<ModuleAdvice> criticalModules = noteRepository.findDistinctModuleNames().stream()
                .filter(m -> m != null && !m.isBlank())
                .map(HomeController::getAdviceForModule)
                .collect(Collectors.toList());

        // currentCalendar/cat1Passed/cat2Passed/uePassed and
        // diplomaCourses/degreeCourses are NOT set here on purpose — both
        // used to duplicate GlobalSidebarAdvice's logic with an unscoped
        // query, and because @ControllerAdvice model attributes are added
        // before the handler runs, this method's own model.addAttribute()
        // calls silently overwrote GlobalSidebarAdvice's institution-scoped
        // values on every load of "/" — the one page most guests actually
        // land on. Let that single source of truth stand instead of
        // recomputing (and re-breaking) it here.

        model.addAttribute("popularNotes", popularNotes);
        model.addAttribute("criticalModules", criticalModules);
        return "public/home";
    }

    @Autowired
    private com.school.core.TeamMemberService teamMemberService;

    @GetMapping("/init")
    @org.springframework.web.bind.annotation.ResponseBody
    public String init() {
        return "Init is handled by data.sql now";
    }

    @GetMapping("/about")
    public String about(Model model) {
        List<com.school.core.TeamMember> teamMembers = teamMemberService.getActiveTeamMembers();
        model.addAttribute("teamMembers", teamMembers);
        return "public/about";
    }

    @GetMapping("/premium")
    public String premium() {
        return "user/premium";
    }

    @GetMapping("/ue-exams")
    public String ueExams(Model model) {
        List<Note> pastPapers = noteRepository.findByCategoryIgnoreCaseOrderByIdDesc("Past Paper");
        model.addAttribute("pastPapers", pastPapers);
        return "timetable/ue_exams";
    }

    @GetMapping("/policy")
    public String policy() {
        return "public/policy";
    }

    @GetMapping("/terms")
    public String terms() {
        return "public/terms";
    }

    @GetMapping("/contact")
    public String contact() {
        return "public/contact"; // in case they ask for contact too
    }

    // Renders the current Academic Calendar through the same PDF.js viewer
    // used for notes, instead of a raw target="_blank" link that leaves
    // rendering entirely up to whatever PDF support the visitor's browser
    // happens to have (unreliable on several mobile browsers).
    @GetMapping("/calendar/view")
    public org.springframework.http.ResponseEntity<String> viewAcademicCalendar(
            jakarta.servlet.http.HttpSession session, jakarta.servlet.http.HttpServletRequest request) {
        // Same institution resolution as GlobalSidebarAdvice: a logged-in
        // user's own college first, then the guest college-picker cookie,
        // falling back to the unscoped lookup for a pre-multi-college
        // record with no institution set at all.
        com.school.auth.User user = (com.school.auth.User) session.getAttribute("user");
        String institutionId = user != null && user.getInstitution() != null
                ? user.getInstitution().getId()
                : com.school.core.CollegePickerController.readSelectedInstitutionId(request);
        AcademicCalendar current = institutionId != null
                ? academicCalendarRepository.findByInstitutionIdAndIsCurrentTrue(institutionId).orElse(null)
                : academicCalendarRepository.findByIsCurrentTrue().orElse(null);
        return renderCalendarOrRedirect(current);
    }

    // Same viewer, but for a specific past calendar (not necessarily the
    // current one) — used by the Records Archive so old calendars stay
    // reachable instead of being admin-only once superseded.
    @GetMapping("/calendar/view/{id}")
    public org.springframework.http.ResponseEntity<String> viewAcademicCalendarById(
            @org.springframework.web.bind.annotation.PathVariable String id) {
        AcademicCalendar calendar = academicCalendarRepository.findById(id).orElse(null);
        return renderCalendarOrRedirect(calendar);
    }

    private org.springframework.http.ResponseEntity<String> renderCalendarOrRedirect(AcademicCalendar calendar) {
        String fileUrl = calendar != null ? calendar.getFileUrl() : null;
        if (fileUrl == null || fileUrl.isBlank()) {
            return org.springframework.http.ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(org.springframework.http.HttpHeaders.LOCATION, "/dashboard").build();
        }
        String resolvedUrl = fileUrl.startsWith("http") ? fileUrl : "/uploads/" + fileUrl;
        String title = calendar.getAcademicYear() != null && !calendar.getAcademicYear().isBlank()
                ? "Academic Calendar " + calendar.getAcademicYear()
                : "Academic Calendar";
        // Downloading is only offered for a calendar once it's no longer
        // current — while it's the active one, viewing it here (rather than
        // saving a copy) is the whole point of keeping it on the site.
        String html = PdfViewerHtml.render(title, resolvedUrl, resolvedUrl, !calendar.getIsCurrent());
        return org.springframework.http.ResponseEntity.ok()
                .contentType(org.springframework.http.MediaType.TEXT_HTML)
                .body(html);
    }
}
