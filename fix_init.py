import re

with open("src/main/java/com/school/config/DatabaseInitializer.java", "r") as f:
    content = f.read()

# Replace the instantiations
replacements = [
    (
        '"Note",\n                LocalDateTime.now().minusDays(5)',
        '"Note",\n                "COMPUTER FUNDAMENTALS",\n                "ITT 04101",\n                LocalDateTime.now().minusDays(5)'
    ),
    (
        '"Note",\n                LocalDateTime.now().minusDays(4)',
        '"Note",\n                "COMMUNICATION SKILLS",\n                "ITT 04102",\n                LocalDateTime.now().minusDays(4)'
    ),
    (
        '"Note",\n                LocalDateTime.now().minusDays(3)',
        '"Note",\n                "BASIC MATHEMATICS",\n                "ITT 04103",\n                LocalDateTime.now().minusDays(3)'
    ),
    (
        '"Assignment",\n                LocalDateTime.now().minusDays(2)',
        '"Assignment",\n                "PROGRAMMING BASICS",\n                "ITT 04201",\n                LocalDateTime.now().minusDays(2)'
    ),
    (
        '"Past Paper",\n                LocalDateTime.now().minusDays(1)',
        '"Past Paper",\n                "DATABASE SYSTEMS",\n                "ITT 04202",\n                LocalDateTime.now().minusDays(1)'
    ),
    (
        '"Note",\n                LocalDateTime.now()',
        '"Note",\n                "NETWORKING FUNDAMENTALS",\n                "ITT 04203",\n                LocalDateTime.now()'
    )
]

for old, new in replacements:
    content = content.replace(old, new)

with open("src/main/java/com/school/config/DatabaseInitializer.java", "w") as f:
    f.write(content)

