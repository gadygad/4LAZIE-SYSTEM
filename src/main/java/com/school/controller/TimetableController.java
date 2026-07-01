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

        Optional<Timetable> timetableOpt = timetableRepository.findByProgramTypeAndLevelNoAndSemesterNo(program.toUpperCase(), level, semester);
        
        if (timetableOpt.isPresent()) {
            model.addAttribute("timetable", timetableOpt.get());
        } else {
            model.addAttribute("errorMsg", "No timetable found for " + program + " Level " + level + " Semester " + semester + ". Please check back later.");
        }

        model.addAttribute("program", program);
        model.addAttribute("level", level);
        model.addAttribute("semester", semester);

        return "view_timetable";
    }
}
