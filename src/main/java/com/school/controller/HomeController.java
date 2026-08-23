package com.school.controller;

import com.school.model.Note;
import com.school.model.AcademicCalendar;
import com.school.repository.NoteRepository;
import com.school.repository.AcademicCalendarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

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

        private com.school.repository.CourseRepository courseRepository;

    public HomeController(NoteRepository noteRepository, AcademicCalendarRepository academicCalendarRepository, com.school.repository.CourseRepository courseRepository) {
        this.noteRepository = noteRepository;
        this.academicCalendarRepository = academicCalendarRepository;
        this.courseRepository = courseRepository;
    }


    @GetMapping("/")
    public String home(Model model, jakarta.servlet.http.HttpSession session,
                        @org.springframework.web.bind.annotation.RequestParam(value = "openGpa", required = false) String openGpa) {
        // Logged-in users are normally sent straight to their dashboard, but the
        // GPA Calculator only exists on this page, so the "GPA CALCULATOR" nav
        // link (fragments/sjuit_components.html) needs an escape hatch to land
        // here instead of bouncing back to the dashboard.
        if (session.getAttribute("user") != null && !"true".equals(openGpa)) {
            return "redirect:/dashboard";
        }
        // Fetch the absolute 10 most recent uploads (Public Quick Access), filtering duplicates
        java.util.Set<String> seenTitles = new java.util.HashSet<>();
        List<Note> popularNotes = noteRepository.findTop50ByOrderByIdDesc().stream()
                .filter(n -> n != null && (n.getIsPublic() == null || Boolean.TRUE.equals(n.getIsPublic())))
                .filter(n -> seenTitles.add(n.getTitle())) // only keep the first occurrence of each title
                .limit(10)
                .collect(Collectors.toList());
        
        // Fetch distinct module names from database and map to advice
        List<ModuleAdvice> criticalModules = noteRepository.findDistinctModuleNames().stream()
                .map(HomeController::getAdviceForModule)
                .collect(Collectors.toList());

        // Fetch current academic calendar and compute exam-passed flags
        AcademicCalendar[] calHolder = new AcademicCalendar[1];
        academicCalendarRepository.findByIsCurrentTrue().ifPresent(calendar -> {
            model.addAttribute("currentCalendar", calendar);
            calHolder[0] = calendar;
        });

        // Determine if each exam type's dates have ALL passed
        if (calHolder[0] != null) {
            AcademicCalendar cal = calHolder[0];
            model.addAttribute("cat1Passed", 
                hasDatePassed(cal.getSem1Cat1DegreeDate()) && hasDatePassed(cal.getSem1Cat1DiplomaDate()) && 
                hasDatePassed(cal.getSem2Cat1DegreeDate()) && hasDatePassed(cal.getSem2Cat1DiplomaDate()));
            model.addAttribute("cat2Passed", 
                hasDatePassed(cal.getSem1Cat2DegreeDate()) && hasDatePassed(cal.getSem1Cat2DiplomaDate()) && 
                hasDatePassed(cal.getSem2Cat2DegreeDate()) && hasDatePassed(cal.getSem2Cat2DiplomaDate()));
            model.addAttribute("uePassed", 
                hasDatePassed(cal.getSem1UeDegreeDate()) && hasDatePassed(cal.getSem1UeDiplomaDate()) && 
                hasDatePassed(cal.getSem2UeDegreeDate()) && hasDatePassed(cal.getSem2UeDiplomaDate()));
        } else {
            model.addAttribute("cat1Passed", false);
            model.addAttribute("cat2Passed", false);
            model.addAttribute("uePassed", false);
        }

        List<com.school.model.Course> allCourses = courseRepository.findAll();
        List<com.school.model.Course> diplomaCourses = allCourses.stream()
                .filter(c -> c.getProgramType() != null && c.getProgramType().startsWith("DIP_"))
                .collect(Collectors.toList());
        List<com.school.model.Course> degreeCourses = allCourses.stream()
                .filter(c -> c.getProgramType() != null && c.getProgramType().startsWith("DEG_"))
                .collect(Collectors.toList());
        model.addAttribute("diplomaCourses", diplomaCourses);
        model.addAttribute("degreeCourses", degreeCourses);

        model.addAttribute("popularNotes", popularNotes);
        model.addAttribute("criticalModules", criticalModules);
        return "public/home";
    }

    /**
     * Parses a date string like "13 Jan 2026" or a range like "23 Mar 2026 - 02 Apr 2026"
     * and returns true if the date (or the END date of a range) is in the past.
     */
    private boolean hasDatePassed(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return false;
        try {
            // If it's a range like "23 Mar 2026 - 02 Apr 2026", take the last part
            String cleaned = dateStr.trim();
            if (cleaned.contains("-")) {
                String[] parts = cleaned.split("-");
                cleaned = parts[parts.length - 1].trim();
            }
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy", Locale.ENGLISH);
            LocalDate examDate = LocalDate.parse(cleaned, formatter);
            return LocalDate.now().isAfter(examDate);
        } catch (DateTimeParseException e) {
            // If parsing fails, don't hide the button
            return false;
        }
    }

    @Autowired
    private com.school.service.TeamMemberService teamMemberService;

    @GetMapping("/init")
    @org.springframework.web.bind.annotation.ResponseBody
    public String init() {
        return "Init is handled by data.sql now";
    }

    @GetMapping("/about")
    public String about(Model model) {
        List<com.school.model.TeamMember> teamMembers = teamMemberService.getActiveTeamMembers();
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
}
