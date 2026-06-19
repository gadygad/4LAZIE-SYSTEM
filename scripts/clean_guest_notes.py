import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Fix the empty state condition
content = content.replace(
    'th:if="${#maps.isEmpty(groupedNotes) && !(selectedLevel == 5 && selectedSemester == 2 && selectedProgram == \'DIP_CSE\')}"',
    'th:if="${#maps.isEmpty(groupedNotes)}"'
)

# Remove the hardcoded block and the wrapper for the dynamic block
pattern = r'<!-- NTA Level 5 Semester 2 \(DIP_CSE\) Premium UI Cards -->.*?<div th:if="\$\{\!\(selectedLevel == 5 && selectedSemester == 2 && selectedProgram == \'DIP_CSE\'\)\}">\s*<div th:replace="~\{fragments/sjuit_components :: notes_accordion\}"></div>\s*</div>'

replacement = """<!-- Dynamic Modules rendered from components -->
                <div th:replace="~{fragments/sjuit_components :: notes_accordion}"></div>"""

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(new_content)

print("guest_notes.html cleaned successfully")
