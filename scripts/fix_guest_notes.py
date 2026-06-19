import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Delete everything from <!-- NTA Level 5 Semester 2 (DIP_CSE) Premium UI Cards -->
# down to right before <!-- Dynamic Modules Section -->
pattern = r'<!-- NTA Level 5 Semester 2 \(DIP_CSE\) Premium UI Cards -->.*?<div th:if="\$\{\!\(selectedLevel == 5 && selectedSemester == 2 && selectedProgram == \'DIP_CSE\'\)\}">\s*<!-- Dynamic Modules Section -->'
replacement = "<!-- Dynamic Modules Section -->"
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(new_content)
