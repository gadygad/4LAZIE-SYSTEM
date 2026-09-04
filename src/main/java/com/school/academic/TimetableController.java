package com.school.academic;

import com.school.academic.Timetable;
import com.school.auth.Role;
import com.school.auth.User;
import com.school.academic.TimetableRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
public class TimetableController {

        private TimetableRepository timetableRepository;

    public TimetableController(TimetableRepository timetableRepository) {
        this.timetableRepository = timetableRepository;
    }


    @GetMapping("/timetable/view")
    public String viewTimetable(
            @RequestParam(name = "program", required = false) String program,
            @RequestParam(name = "course", required = false) String course,
            @RequestParam(name = "level", required = false) Integer level,
            @RequestParam(name = "semester", required = false) Integer semester,
            @RequestParam(name = "academicYear", required = false) String academicYear,
            HttpSession session, 
            Model model) {
        
        User loggedInUser = (User) session.getAttribute("loggedInUser");
        model.addAttribute("loggedInUser", loggedInUser);

        // Enforce course boundaries for students
        if (loggedInUser != null && loggedInUser.getRole() != com.school.auth.Role.ADMIN && loggedInUser.getRole() != com.school.auth.Role.SUPER_ADMIN) {
            program = loggedInUser.getCourseProgram();
            // We do not force level here because a student might want to look at previous semester/level timetables
            if (level == null) level = loggedInUser.getLevel();
            if (semester == null) semester = loggedInUser.getSemester();
        } else if (loggedInUser != null && program == null && level == null) {
            program = loggedInUser.getCourseProgram(); 
            level = loggedInUser.getLevel();
            semester = loggedInUser.getSemester();
        }

        // Validate params
        if (program == null || program.isEmpty() || level == null) {
            model.addAttribute("errorMsg", "Please select your program and level to view the timetable.");
            return "timetable/view_timetable";
        }

        // Default semester to 1 if not provided
        if (semester == null) {
            semester = 1;
        }

        // Determine actual programType (e.g. DEG_CE)
        String programType = program.toUpperCase();
        if (course != null && !course.isEmpty()) {
            if (programType.equals("DEGREE")) {
                programType = "DEG_" + course.toUpperCase();
            } else if (programType.equals("DIPLOMA")) {
                programType = "DIP_" + course.toUpperCase();
            } else {
                programType = programType + "_" + course.toUpperCase();
            }
        }

        // Fetch distinct years for this program/level/semester
        java.util.List<Timetable> timetables = timetableRepository.findDistinctAcademicYears(programType, level, semester);
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

        // Determine the "Current" Academic Year (the one with the largest string value)
        java.util.List<Timetable> allTimetables = timetableRepository.findAllByOrderByUploadDateDesc();
        String currentYear = allTimetables.stream()
                .map(Timetable::getAcademicYear)
                .filter(y -> y != null && !y.isEmpty())
                .max(String::compareTo)
                .orElse("0000/0000");

        Optional<Timetable> timetableOpt;
        if (selectedYear != null && !selectedYear.isEmpty()) {
            timetableOpt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNoAndAcademicYear(programType, level, semester, selectedYear);
        } else {
            timetableOpt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNo(programType, level, semester);
        }
        
        if (timetableOpt.isPresent()) {
            Timetable timetable = timetableOpt.get();
            // Defense in depth: /admin/timetables/upload already sanitizes
            // htmlContent before saving, but at least one existing DB record
            // was found to contain a second, full <html>...<body> document
            // (an accidentally-saved error page) concatenated after the real
            // table — the browser "recovers" from that malformed markup by
            // rendering both, so a broken error card shows up below a
            // student's real timetable. Re-sanitizing here means any already-
            // corrupted or otherwise-unsafe stored content is cleaned up on
            // render, without needing a one-off data migration.
            if (timetable.getHtmlContent() != null) {
                org.owasp.html.PolicyFactory policy = org.owasp.html.Sanitizers.FORMATTING
                        .and(org.owasp.html.Sanitizers.LINKS)
                        .and(org.owasp.html.Sanitizers.BLOCKS)
                        .and(org.owasp.html.Sanitizers.STYLES)
                        .and(org.owasp.html.Sanitizers.TABLES);
                timetable.setHtmlContent(policy.sanitize(timetable.getHtmlContent()));
            }
            model.addAttribute("timetable", timetable);
            boolean isCurrentYear = (selectedYear != null && selectedYear.equals(currentYear)) ||
                                    (timetableOpt.get().getAcademicYear() != null && timetableOpt.get().getAcademicYear().equals(currentYear));
            model.addAttribute("isCurrentYear", isCurrentYear);
        } else {
            model.addAttribute("errorMsg", "No timetable found for " + program + " Level " + level + " Semester " + semester + (selectedYear != null ? " (" + selectedYear + ")" : "") + ". Please check back later.");
        }

        model.addAttribute("program", program);
        model.addAttribute("level", level);
        model.addAttribute("semester", semester);
        model.addAttribute("selectedYear", selectedYear);

        return "timetable/view_timetable";
    }

    @GetMapping("/timetable/archive")
    public String viewArchive(Model model) {
        java.util.List<Timetable> allTimetables = timetableRepository.findAllByOrderByUploadDateDesc();
        
        // Determine the "Current" Academic Year
        String currentYear = allTimetables.stream()
                .map(Timetable::getAcademicYear)
                .filter(y -> y != null && !y.isEmpty())
                .max(String::compareTo)
                .orElse("0000/0000");
                
        // Group past timetables by academic year
        java.util.Map<String, java.util.List<Timetable>> pastTimetablesMap = allTimetables.stream()
                .filter(t -> t.getAcademicYear() != null && !t.getAcademicYear().equals(currentYear))
                .collect(java.util.stream.Collectors.groupingBy(Timetable::getAcademicYear));
                
        // Sort years descending
        java.util.Map<String, java.util.List<Timetable>> sortedPastTimetables = new java.util.TreeMap<>(java.util.Collections.reverseOrder());
        sortedPastTimetables.putAll(pastTimetablesMap);

        model.addAttribute("pastTimetables", sortedPastTimetables);
        model.addAttribute("currentYear", currentYear);
        return "timetable/timetable_archive";
    }

    // A "/timetable/seed" debug endpoint used to live here: unauthenticated
    // (this whole /timetable/** prefix is permitAll in SecurityConfig),
    // triggerable by anyone with a GET request, and it read the raw
    // view_timetable.html template file off disk, regex-extracted whatever
    // fell between two HTML markers, and overwrote the real DIPLOMA
    // Level 5 Semester 2 timetable's stored content with it. That's almost
    // certainly how a live timetable record ended up with a second, garbled
    // HTML document (a rendered error page) appended after the real table —
    // removed entirely rather than fixed, since a template-scraping seed
    // utility has no legitimate reason to be reachable in production.
}
