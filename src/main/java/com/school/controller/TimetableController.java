package com.school.controller;

import com.school.model.Timetable;
import com.school.model.User;
import com.school.repository.TimetableRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class TimetableController {

    @Autowired
    private TimetableRepository timetableRepository;

    @GetMapping("/timetable/view")
    public String viewTimetable(
            @RequestParam(name = "program", required = false) String program,
            @RequestParam(name = "level", required = false) Integer level,
            @RequestParam(name = "semester", required = false) Integer semester,
            @RequestParam(name = "academicYear", required = false) String academicYear,
            HttpSession session, 
            Model model) {
        
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        model.addAttribute("loggedInUser", loggedInUser);

        // If user is logged in and didn't provide specific params, try to use their profile
        if (loggedInUser != null && program == null && level == null) {
            program = loggedInUser.getCourseProgram(); // E.g., "DIPLOMA"
            level = loggedInUser.getLevel();
            semester = loggedInUser.getSemester();
        }

        // Validate params
        if (program == null || program.isEmpty() || level == null) {
            model.addAttribute("errorMsg", "Please select your program and level to view the timetable.");
            return "view_timetable";
        }

        // Default semester to 1 if not provided
        if (semester == null) {
            semester = 1;
        }

        // Fetch distinct years for this program/level/semester
        java.util.List<Timetable> timetables = timetableRepository.findDistinctAcademicYears(program.toUpperCase(), level, semester);
        java.util.List<String> availableYears = timetables.stream()
                .map(Timetable::getAcademicYear)
                .filter(year -> year != null && !year.isEmpty())
                .distinct()
                .sorted(java.util.Collections.reverseOrder())
                .collect(java.util.stream.Collectors.toList());

        model.addAttribute("availableYears", availableYears);

        // Determine which academicYear to load
        String selectedYear = academicYear;
        if ((selectedYear == null || selectedYear.isEmpty()) && !availableYears.isEmpty()) {
            selectedYear = availableYears.get(0); // default to the latest year
        }

        Optional<Timetable> timetableOpt;
        if (selectedYear != null && !selectedYear.isEmpty()) {
            timetableOpt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNoAndAcademicYear(program.toUpperCase(), level, semester, selectedYear);
        } else {
            timetableOpt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNo(program.toUpperCase(), level, semester);
        }
        
        if (timetableOpt.isPresent()) {
            model.addAttribute("timetable", timetableOpt.get());
        } else {
            model.addAttribute("errorMsg", "No timetable found for " + program + " Level " + level + " Semester " + semester + (selectedYear != null ? " (" + selectedYear + ")" : "") + ". Please check back later.");
        }

        model.addAttribute("program", program);
        model.addAttribute("level", level);
        model.addAttribute("semester", semester);
        model.addAttribute("selectedYear", selectedYear);

        return "view_timetable";
    }

    @GetMapping("/timetable/seed")
    @org.springframework.web.bind.annotation.ResponseBody
    public String seedTimetable() {
        try {
            org.springframework.core.io.Resource resource = new org.springframework.core.io.ClassPathResource("templates/view_timetable.html");
            String html = new String(resource.getInputStream().readAllBytes(), java.nio.charset.StandardCharsets.UTF_8);
            java.util.regex.Matcher matcher = java.util.regex.Pattern.compile("<div id=\"timetable-wrapper\">(.*?)<button class=\"print-btn\"", java.util.regex.Pattern.DOTALL).matcher(html);
            if (matcher.find()) {
                String tableHtml = matcher.group(1).trim();
                tableHtml += "\n        <button class=\"print-btn\" onclick=\"window.print()\">\n            <i class=\"bi bi-printer-fill\" style=\"margin-right: 8px;\"></i> Save as PDF / Print\n        </button>";
                
                Timetable t = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNo("DIPLOMA", 5, 2)
                        .orElse(new Timetable());
                
                t.setProgramType("DIPLOMA");
                t.setLevelNo(5);
                t.setSemesterNo(2);
                t.setAcademicYear("2025/2026");
                t.setHtmlContent(tableHtml);
                t.setUploadDate(java.time.LocalDateTime.now());
                
                timetableRepository.save(t);
                return "Successfully seeded timetable for DIPLOMA Level 5 Semester 2 (2025/2026)";
            }
            return "Failed to find timetable wrapper in HTML";
        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
