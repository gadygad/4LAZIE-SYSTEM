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

    @ModelAttribute
    public void addSidebarDataToModel(Model model, jakarta.servlet.http.HttpSession session) {
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

        com.school.model.User user = (com.school.model.User) session.getAttribute("user");
        if (user != null) {
            List<com.school.model.Notification> notifications = notificationRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
            int unreadCount = notificationRepository.countByUserIdAndIsReadFalse(user.getId());
            model.addAttribute("notifications", notifications);
            model.addAttribute("unreadNotificationCount", unreadCount);
        } else {
            model.addAttribute("notifications", java.util.Collections.emptyList());
            model.addAttribute("unreadNotificationCount", 0);
        }
    }
}
