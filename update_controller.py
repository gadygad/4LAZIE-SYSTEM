import re

filename = 'src/main/java/com/school/controller/NotesController.java'
with open(filename, 'r') as f:
    content = f.read()

# Update handleUpload signature
target_upload_method = """    @PostMapping("/upload")
    public String handleUpload(@RequestParam("title") String title,
                               @RequestParam("file") MultipartFile file,
                               @RequestParam(value = "program", required = false) String programType,
                               @RequestParam("levelNo") Integer levelNo,
                               @RequestParam("semesterNo") Integer semesterNo,
                               @RequestParam("category") String category,
                               @RequestParam("moduleName") String moduleName,
                               @RequestParam("moduleCode") String moduleCode,
                               HttpSession session) {"""
                               
new_upload_method = """    @PostMapping("/upload")
    public String handleUpload(@RequestParam("title") String title,
                               @RequestParam("file") MultipartFile file,
                               @RequestParam(value = "program", required = false) String programType,
                               @RequestParam("levelNo") Integer levelNo,
                               @RequestParam("semesterNo") Integer semesterNo,
                               @RequestParam("category") String category,
                               @RequestParam("moduleName") String moduleName,
                               @RequestParam("moduleCode") String moduleCode,
                               @RequestParam(value = "unitNumber", required = false) Integer unitNumber,
                               HttpSession session) {"""

if target_upload_method in content:
    content = content.replace(target_upload_method, new_upload_method)
    
# Update Note creation
target_note_creation = """            Note note = new Note(title, newFilename, programType, levelNo, semesterNo, category, moduleName, moduleCode, LocalDateTime.now());"""
new_note_creation = """            Note note = new Note(title, newFilename, programType, levelNo, semesterNo, category, moduleName, moduleCode, LocalDateTime.now());
            if ("Note".equals(category) && unitNumber != null) {
                note.setUnitNumber(unitNumber);
            }"""

if target_note_creation in content:
    content = content.replace(target_note_creation, new_note_creation)

with open(filename, 'w') as f:
    f.write(content)
