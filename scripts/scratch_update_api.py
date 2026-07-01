import re

with open('src/main/java/com/school/controller/SearchApiController.java', 'r') as f:
    content = f.read()

# Update map.put for /api/notes/filter
new_mapping = """                    Map<String, Object> map = new HashMap<>();
                    map.put("id", note.getId());
                    map.put("title", note.getTitle());
                    map.put("moduleName", note.getModuleName());
                    map.put("year", note.getAcademicYear());
                    map.put("fileUrl", note.getFileUrl());
                    map.put("viewCount", note.getViewCount() != null ? note.getViewCount() : 0);
                    map.put("downloadCount", note.getDownloadCount() != null ? note.getDownloadCount() : 0);
                    map.put("semester", note.getSemesterNo() != null ? note.getSemesterNo() : 1);
                    return map;"""

# Replace in filterNotes
content = re.sub(r'Map<String, Object> map = new HashMap<>\(\);\s*map\.put\("id", note\.getId\(\)\);\s*map\.put\("title", note\.getTitle\(\)\);\s*map\.put\("moduleName", note\.getModuleName\(\)\);\s*map\.put\("year", note\.getAcademicYear\(\)\);\s*map\.put\("fileUrl", note\.getFileUrl\(\)\);\s*return map;', new_mapping, content)

with open('src/main/java/com/school/controller/SearchApiController.java', 'w') as f:
    f.write(content)
