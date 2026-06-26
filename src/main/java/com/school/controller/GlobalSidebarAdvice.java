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

    @ModelAttribute
    public void addSidebarDataToModel(Model model) {
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
    }
}
