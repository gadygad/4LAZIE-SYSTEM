import re

with open("../src/main/java/com/school/controller/NotesController.java", "r") as f:
    content = f.read()

# Add imports for grouping
if "import java.util.Map;" not in content:
    content = content.replace("import java.util.stream.Collectors;", "import java.util.stream.Collectors;\nimport java.util.Map;\nimport java.util.LinkedHashMap;\nimport java.util.ArrayList;")

# Update uploadNote signature
old_upload_sig = """                             @RequestParam("semesterNo") Integer semesterNo,
                             @RequestParam(value = "category", required = false) String category,
                             @RequestParam("file") MultipartFile file,"""
new_upload_sig = """                             @RequestParam("semesterNo") Integer semesterNo,
                             @RequestParam(value = "moduleName", required = false) String moduleName,
                             @RequestParam(value = "moduleCode", required = false) String moduleCode,
                             @RequestParam(value = "category", required = false) String category,
                             @RequestParam("file") MultipartFile file,"""
content = content.replace(old_upload_sig, new_upload_sig)

# Update uploadNote body
old_upload_body = """            note.setLevelNo(levelNo);
            note.setSemesterNo(semesterNo);
            note.setCategory(category == null || category.trim().isEmpty() ? "Note" : category);"""
new_upload_body = """            note.setLevelNo(levelNo);
            note.setSemesterNo(semesterNo);
            note.setModuleName(moduleName != null && !moduleName.trim().isEmpty() ? moduleName.trim().toUpperCase() : "GENERAL MODULE");
            note.setModuleCode(moduleCode != null ? moduleCode.trim().toUpperCase() : "");
            note.setCategory(category == null || category.trim().isEmpty() ? "Note" : category);"""
content = content.replace(old_upload_body, new_upload_body)

# Update guestNotesList
old_guest = """    @GetMapping("/guest-notes")
    public String guestNotesList(@RequestParam("level") Integer level, 
                                 @RequestParam(value = "semester", required = false) Integer semester,
                                 org.springframework.ui.Model model, HttpSession session) {
        if (session.getAttribute("user") != null) {
            return "redirect:/notes?level=" + level + (semester != null ? "&semester=" + semester : "");
        }
        int sem = semester != null ? semester : 1;
        List<Note> notes = noteRepository.findByLevelNoAndSemesterNoOrderByIdDesc(level, sem);
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedSemester", sem);
        model.addAttribute("notes", notes);
        return "guest_notes";
    }"""
new_guest = """    @GetMapping("/guest-notes")
    public String guestNotesList(@RequestParam("level") Integer level, 
                                 @RequestParam(value = "semester", required = false) Integer semester,
                                 org.springframework.ui.Model model, HttpSession session) {
        if (session.getAttribute("user") != null) {
            return "redirect:/notes?level=" + level + (semester != null ? "&semester=" + semester : "");
        }
        int sem = semester != null ? semester : 1;
        List<Note> notes = noteRepository.findByLevelNoAndSemesterNoOrderByIdDesc(level, sem);
        
        // Group notes by moduleName
        Map<String, List<Note>> groupedNotes = new LinkedHashMap<>();
        for (Note note : notes) {
            String modName = note.getModuleName() != null ? note.getModuleName() : "GENERAL MODULE";
            groupedNotes.computeIfAbsent(modName, k -> new ArrayList<>()).add(note);
        }
        
        // Also extract module code mapping for UI display
        Map<String, String> moduleCodes = new LinkedHashMap<>();
        for (Note note : notes) {
            String modName = note.getModuleName() != null ? note.getModuleName() : "GENERAL MODULE";
            if (!moduleCodes.containsKey(modName) && note.getModuleCode() != null && !note.getModuleCode().isEmpty()) {
                moduleCodes.put(modName, note.getModuleCode());
            }
        }
        
        model.addAttribute("selectedLevel", level);
        model.addAttribute("selectedSemester", sem);
        model.addAttribute("groupedNotes", groupedNotes);
        model.addAttribute("moduleCodes", moduleCodes);
        model.addAttribute("notes", notes);
        return "guest_notes";
    }"""
content = content.replace(old_guest, new_guest)

# Update Note model inside notes endpoint for download authentication handling (Step 2 of the plan)
old_view = """    @GetMapping("/view/{id}")
    public ResponseEntity<Resource> viewNote(@PathVariable("id") Integer id) {"""
new_view = """    @GetMapping("/view/{id}")
    public Object viewNote(@PathVariable("id") Integer id, HttpSession session) {
        User loggedInUser = (User) session.getAttribute("user");
        Note note = noteRepository.findById(id).orElse(null);
        
        if (note != null && !note.getIsPublic() && loggedInUser == null) {
            // Or return redirect to login. We will return a string view name to redirect.
            // Since this returns ResponseEntity currently, we'll return a redirect ResponseEntity.
            return ResponseEntity.status(org.springframework.http.HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, "/login")
                    .build();
        }"""
content = content.replace(old_view, new_view)

old_view_sig2 = """    public ResponseEntity<Resource> viewNote(@PathVariable("id") Integer id) {"""
# we already replaced it in the chunk above, let's just make sure.

with open("../src/main/java/com/school/controller/NotesController.java", "w") as f:
    f.write(content)

