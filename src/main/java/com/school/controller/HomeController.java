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

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private AcademicCalendarRepository academicCalendarRepository;

    @GetMapping("/")
    public String home(Model model, jakarta.servlet.http.HttpSession session) {
        // Fetch the absolute 10 most recent uploads for Note category (Public Quick Access)
        List<Note> popularNotes = noteRepository.findTop10ByCategoryOrderByIdDesc("Note");
        
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
            model.addAttribute("cat1Passed", hasDatePassed(cal.getSem1Cat1Date()) && hasDatePassed(cal.getSem2Cat1Date()));
            model.addAttribute("cat2Passed", hasDatePassed(cal.getSem1Cat2Date()) && hasDatePassed(cal.getSem2Cat2Date()));
            model.addAttribute("uePassed", hasDatePassed(cal.getSem1UeDate()) && hasDatePassed(cal.getSem2UeDate()));
        } else {
            model.addAttribute("cat1Passed", false);
            model.addAttribute("cat2Passed", false);
            model.addAttribute("uePassed", false);
        }

        model.addAttribute("popularNotes", popularNotes);
        model.addAttribute("criticalModules", criticalModules);
        return "home";
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

    @GetMapping("/init")
    @org.springframework.web.bind.annotation.ResponseBody
    public String init() {
        return "Init is handled by data.sql now";
    }

    @GetMapping("/about")
    public String about() {
        return "about";
    }

    @GetMapping("/premium")
    public String premium() {
        return "premium";
    }

    @GetMapping("/ue-exams")
    public String ueExams(Model model) {
        List<Note> pastPapers = noteRepository.findByCategoryIgnoreCaseOrderByIdDesc("Past Paper");
        model.addAttribute("pastPapers", pastPapers);
        return "ue_exams";
    }
}
