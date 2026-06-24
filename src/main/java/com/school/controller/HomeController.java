package com.school.controller;

import com.school.model.Note;
import com.school.model.Institution;
import com.school.repository.NoteRepository;
import com.school.repository.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
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

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private InstitutionRepository institutionRepository;

    @GetMapping("/")
    public String home(Model model, jakarta.servlet.http.HttpSession session) {
        // Fetch up to 3 recent public notes for SJCET (institution ID 1)
        // Tumia query ya moja kwa moja — haraka zaidi kuliko findAll()
        List<Note> popularNotes = noteRepository.findTop3ByCategoryOrderByIdDesc("Note");
        
        Institution currentInstitution = institutionRepository.findById(1L).orElse(null);
        
        // Fetch distinct module names from database and map to advice
        // Tumia query ya DB kupata module names tofauti — haraka zaidi
        List<ModuleAdvice> criticalModules = noteRepository.findDistinctModuleNames().stream()
                .limit(8) // Limit to 8 for the marquee
                .map(HomeController::getAdviceForModule)
                .collect(Collectors.toList());

        model.addAttribute("currentInstitution", currentInstitution);
        model.addAttribute("popularNotes", popularNotes);
        model.addAttribute("criticalModules", criticalModules);
        return "home";
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
        List<Note> pastPapers = noteRepository.findByCategoryOrderByIdDesc("Past Paper");
        model.addAttribute("pastPapers", pastPapers);
        return "ue_exams";
    }
}
