import re

with open('src/main/java/com/school/repository/NoteRepository.java', 'r') as f:
    content = f.read()

content = content.replace("List<Note> findByCategoryOrderByIdDesc(String category);", "List<Note> findByCategoryIgnoreCaseOrderByIdDesc(String category);")

with open('src/main/java/com/school/repository/NoteRepository.java', 'w') as f:
    f.write(content)

with open('src/main/java/com/school/controller/SearchApiController.java', 'r') as f:
    content2 = f.read()

content2 = content2.replace("findByCategoryOrderByIdDesc(", "findByCategoryIgnoreCaseOrderByIdDesc(")

# Also let's make the stream filters null-safe and robust
robust_filters = """        List<Map<String, Object>> results = notes.stream()
                .filter(n -> program == null || program.isEmpty() || program.equalsIgnoreCase(n.getProgramType()) ||
                             (n.getProgramType() != null && n.getProgramType().toLowerCase().contains(program.toLowerCase())))
                .filter(n -> semester == null || semester.equals(n.getSemesterNo()))
                .filter(n -> level == null || level.equals(n.getLevelNo()))
                .filter(n -> n.getIsPublic() == null || Boolean.TRUE.equals(n.getIsPublic()))
"""

# Replace the stream filters in SearchApiController.java
# We need to find the specific block
content2 = re.sub(r'List<Map<String, Object>> results = notes\.stream\(\).*?\.filter\(n -> Boolean\.TRUE\.equals\(n\.getIsPublic\(\)\)\)', robust_filters, content2, flags=re.DOTALL)

with open('src/main/java/com/school/controller/SearchApiController.java', 'w') as f:
    f.write(content2)

