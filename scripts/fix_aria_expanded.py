with open('../src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# Replace aria-expanded="false" with a thymeleaf expression for the active state
# DIP IT
content = content.replace(
    'aria-expanded="false" th:style="${selectedProgram == \'DIP_IT\'',
    'th:aria-expanded="${selectedProgram == \'DIP_IT\' ? \'true\' : \'false\'}" th:style="${selectedProgram == \'DIP_IT\''
)
# DIP CSE
content = content.replace(
    'aria-expanded="false" th:style="${selectedProgram == \'DIP_CSE\'',
    'th:aria-expanded="${selectedProgram == \'DIP_CSE\' ? \'true\' : \'false\'}" th:style="${selectedProgram == \'DIP_CSE\''
)
# DIP CE
content = content.replace(
    'aria-expanded="false" th:style="${selectedProgram == \'DIP_CE\'',
    'th:aria-expanded="${selectedProgram == \'DIP_CE\' ? \'true\' : \'false\'}" th:style="${selectedProgram == \'DIP_CE\''
)
# DIP ME
content = content.replace(
    'aria-expanded="false" th:style="${selectedProgram == \'DIP_ME\'',
    'th:aria-expanded="${selectedProgram == \'DIP_ME\' ? \'true\' : \'false\'}" th:style="${selectedProgram == \'DIP_ME\''
)
# DEG ENG
content = content.replace(
    'aria-expanded="false" th:style="${selectedProgram == \'DEGREE_ENG\'',
    'th:aria-expanded="${selectedProgram == \'DEGREE_ENG\' and selectedLevel == year ? \'true\' : \'false\'}" th:style="${selectedProgram == \'DEGREE_ENG\''
)
# DEG EDU
content = content.replace(
    'aria-expanded="false" th:style="${selectedProgram == \'DEGREE_EDU\'',
    'th:aria-expanded="${selectedProgram == \'DEGREE_EDU\' and selectedLevel == year ? \'true\' : \'false\'}" th:style="${selectedProgram == \'DEGREE_EDU\''
)

with open('../src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)
print("aria-expanded fixed")
