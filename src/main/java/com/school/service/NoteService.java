package com.school.service;

import com.school.model.Note;
import com.school.repository.NoteRepository;
import com.school.model.Course;
import com.school.model.Subject;
import com.school.repository.CourseRepository;
import com.school.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    public void groupNotesByModule(List<Note> notes, String program, Integer level, Integer semester, 
                                   Map<String, List<Note>> groupedNotes, Map<String, String> moduleCodes) {
        // 1. Fetch subjects for this program, level, and semester FIRST to establish correct order
        List<Course> courses = courseRepository.findByProgramType(program);
        if (!courses.isEmpty()) {
            Course course = courses.get(0);
            List<Subject> subjects = subjectRepository.findByCourseIdAndLevelNoAndSemesterNoOrderByIdAsc(course.getId(), level, semester);
            for (Subject sub : subjects) {
                groupedNotes.put(sub.getName(), new ArrayList<>());
                moduleCodes.put(sub.getName(), sub.getCode() != null ? sub.getCode() : "");
            }
        }

        // 2. Now add notes to the established buckets
        for (Note note : notes) {
            String modName = note.getModuleName() != null ? note.getModuleName() : "GENERAL MODULE";
            
            // This will append non-matching subjects (like "GENERAL MODULE") at the bottom
            groupedNotes.computeIfAbsent(modName, k -> new ArrayList<>()).add(note);
            if (!moduleCodes.containsKey(modName) && note.getModuleCode() != null && !note.getModuleCode().isEmpty()) {
                moduleCodes.put(modName, note.getModuleCode());
            }
        }
    }
}
