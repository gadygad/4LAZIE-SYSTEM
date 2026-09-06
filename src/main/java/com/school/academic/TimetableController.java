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
        private AcademicCalendarRepository academicCalendarRepository;

    public TimetableController(TimetableRepository timetableRepository, AcademicCalendarRepository academicCalendarRepository) {
        this.timetableRepository = timetableRepository;
        this.academicCalendarRepository = academicCalendarRepository;
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

        // Determine which academicYear to load. An explicit year always
        // wins; otherwise this program/level/semester's own isCurrent
        // record wins — never "whichever year string sorts highest across
        // the whole site", which used to pick a different program's newer
        // upload over this one's actual current year.
        String selectedYear = academicYear;
        Optional<Timetable> timetableOpt;
        if (selectedYear != null && !selectedYear.isEmpty()) {
            timetableOpt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNoAndAcademicYear(programType, level, semester, selectedYear);
        } else {
            timetableOpt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNoAndIsCurrentTrue(programType, level, semester);
            if (timetableOpt.isEmpty() && !availableYears.isEmpty()) {
                // Defensive fallback for a group the isCurrent backfill
                // hasn't reached yet — should be unreachable in practice.
                selectedYear = availableYears.get(0);
                timetableOpt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNoAndAcademicYear(programType, level, semester, selectedYear);
            } else if (timetableOpt.isPresent()) {
                selectedYear = timetableOpt.get().getAcademicYear();
            }
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
            model.addAttribute("isCurrentYear", timetable.getIsCurrent());
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

        // A timetable is "past" purely by its own isCurrent flag now — never
        // by comparing academic year strings against some single site-wide
        // "current" year, which used to lump a still-current timetable from
        // one program in with genuinely archived ones just because another
        // program had since uploaded a newer year.
        java.util.Map<String, java.util.List<Timetable>> pastTimetablesMap = allTimetables.stream()
                .filter(t -> !t.getIsCurrent() && t.getAcademicYear() != null && !t.getAcademicYear().isEmpty())
                .collect(java.util.stream.Collectors.groupingBy(Timetable::getAcademicYear));

        // Sort years descending
        java.util.Map<String, java.util.List<Timetable>> sortedPastTimetables = new java.util.TreeMap<>(java.util.Collections.reverseOrder());
        sortedPastTimetables.putAll(pastTimetablesMap);

        model.addAttribute("pastTimetables", sortedPastTimetables);

        // Academic calendars (CAT/UE exam dates) live in their own
        // collection with an explicit isCurrent flag, so — unlike
        // timetables — there's no need to infer "current" by comparing
        // year strings. Every calendar ever uploaded is shown here now;
        // before this, a calendar that lost isCurrent when a newer one was
        // uploaded became reachable only from the admin panel.
        java.util.List<AcademicCalendar> academicCalendars = academicCalendarRepository.findAll();
        academicCalendars.sort((a, b) -> {
            String ay = a.getAcademicYear() != null ? a.getAcademicYear() : "";
            String by = b.getAcademicYear() != null ? b.getAcademicYear() : "";
            return by.compareTo(ay);
        });
        model.addAttribute("academicCalendars", academicCalendars);

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
