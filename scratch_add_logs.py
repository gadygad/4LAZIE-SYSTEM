import re

with open('src/main/java/com/school/controller/SearchApiController.java', 'r') as f:
    content = f.read()

# Add logging inside filterNotes
log_statement = """        System.out.println("API Called with: category=" + category + ", program=" + program + ", semester=" + semester + ", level=" + level);
        List<Note> notes = noteRepository.findByCategoryOrderByIdDesc(category);
        System.out.println("Found " + notes.size() + " notes with category " + category);
        
        for (Note n : notes) {
            System.out.println("Checking Note: " + n.getTitle() + " | DB Program: " + n.getProgramType() + " | DB Semester: " + n.getSemesterNo() + " | DB Level: " + n.getLevelNo() + " | isPublic: " + n.getIsPublic());
        }
"""

content = content.replace("List<Note> notes = noteRepository.findByCategoryOrderByIdDesc(category);", log_statement)

with open('src/main/java/com/school/controller/SearchApiController.java', 'w') as f:
    f.write(content)
