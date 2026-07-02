package com.school.controller;

import com.school.model.Institution;
import com.school.repository.InstitutionRepository;
import com.school.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.ui.Model;

import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalSidebarAdvice {

    @Autowired
    private InstitutionRepository institutionRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private com.school.repository.NotificationRepository notificationRepository;

    @Autowired
    private com.school.repository.AcademicCalendarRepository academicCalendarRepository;

    @ModelAttribute
    public void addSidebarDataToModel(Model model, jakarta.servlet.http.HttpSession session) {
        try {
            Institution currentInstitution = institutionRepository.findById("1").orElse(null);
            
            List<com.school.model.Course> allCourses = courseRepository.findAll();
            List<com.school.model.Course> diplomaCourses = allCourses.stream()
                    .filter(c -> c.getProgramType() != null && c.getProgramType().startsWith("DIP_"))
                    .collect(Collectors.toList());
            List<com.school.model.Course> degreeCourses = allCourses.stream()
                    .filter(c -> c.getProgramType() != null && c.getProgramType().startsWith("DEG_"))
                    .collect(Collectors.toList());

            model.addAttribute("currentInstitution", currentInstitution);
            model.addAttribute("diplomaCourses", diplomaCourses);
            model.addAttribute("degreeCourses", degreeCourses);
        } catch (Exception e) {
            model.addAttribute("currentInstitution", null);
            model.addAttribute("diplomaCourses", java.util.Collections.emptyList());
            model.addAttribute("degreeCourses", java.util.Collections.emptyList());
        }

        com.school.model.User user = (com.school.model.User) session.getAttribute("user");
        if (user != null) {
            try {
                List<com.school.model.Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
                int unreadCount = notificationRepository.countByUserIdAndIsReadFalse(user.getId());
                model.addAttribute("notifications", notifications);
                model.addAttribute("unreadNotificationCount", unreadCount);
            } catch (Exception e) {
                model.addAttribute("notifications", java.util.Collections.emptyList());
                model.addAttribute("unreadNotificationCount", 0);
            }
        } else {
            model.addAttribute("notifications", java.util.Collections.emptyList());
            model.addAttribute("unreadNotificationCount", 0);
        }

        try {
            com.school.model.AcademicCalendar[] calHolder = new com.school.model.AcademicCalendar[1];
            academicCalendarRepository.findByIsCurrentTrue().ifPresent(calendar -> {
                model.addAttribute("currentCalendar", calendar);
                calHolder[0] = calendar;
            });

            if (calHolder[0] != null) {
                com.school.model.AcademicCalendar cal = calHolder[0];
                model.addAttribute("cat1Passed", hasDatePassed(cal.getSem1Cat1Date()) && hasDatePassed(cal.getSem2Cat1Date()));
                model.addAttribute("cat2Passed", hasDatePassed(cal.getSem1Cat2Date()) && hasDatePassed(cal.getSem2Cat2Date()));
                model.addAttribute("uePassed", hasDatePassed(cal.getSem1UeDate()) && hasDatePassed(cal.getSem2UeDate()));
            } else {
                model.addAttribute("cat1Passed", false);
                model.addAttribute("cat2Passed", false);
                model.addAttribute("uePassed", false);
            }
        } catch (Exception e) {
            model.addAttribute("cat1Passed", false);
            model.addAttribute("cat2Passed", false);
            model.addAttribute("uePassed", false);
        }
    }

    private boolean hasDatePassed(String dateStr) {
        if (dateStr == null || dateStr.isBlank()) return false;
        try {
            String cleaned = dateStr.trim();
            if (cleaned.contains("-")) {
                String[] parts = cleaned.split("-");
                cleaned = parts[parts.length - 1].trim();
            }
            java.time.format.DateTimeFormatter formatter = java.time.format.DateTimeFormatter.ofPattern("dd MMM yyyy", java.util.Locale.ENGLISH);
            java.time.LocalDate examDate = java.time.LocalDate.parse(cleaned, formatter);
            return java.time.LocalDate.now().isAfter(examDate);
        } catch (java.time.format.DateTimeParseException e) {
            return false;
        }
    }
}
