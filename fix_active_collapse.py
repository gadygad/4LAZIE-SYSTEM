with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# Fix DIP IT
content = content.replace(
    '<div class="sidebar-hover-content collapse" id="menuDipIt">',
    '<div th:class="${selectedProgram == \'DIP_IT\' ? \'sidebar-hover-content collapse show\' : \'sidebar-hover-content collapse\'}" id="menuDipIt">'
)
# Fix DIP CSE
content = content.replace(
    '<div class="sidebar-hover-content collapse" id="menuDipCse">',
    '<div th:class="${selectedProgram == \'DIP_CSE\' ? \'sidebar-hover-content collapse show\' : \'sidebar-hover-content collapse\'}" id="menuDipCse">'
)
# Fix DIP CE
content = content.replace(
    '<div class="sidebar-hover-content collapse" id="menuDipCe">',
    '<div th:class="${selectedProgram == \'DIP_CE\' ? \'sidebar-hover-content collapse show\' : \'sidebar-hover-content collapse\'}" id="menuDipCe">'
)
# Fix DIP ME
content = content.replace(
    '<div class="sidebar-hover-content collapse" id="menuDipMe">',
    '<div th:class="${selectedProgram == \'DIP_ME\' ? \'sidebar-hover-content collapse show\' : \'sidebar-hover-content collapse\'}" id="menuDipMe">'
)

# Fix DEG ENG
content = content.replace(
    '<div class="sidebar-hover-content collapse" th:id="\'menuDegEng\' + ${year}">',
    '<div th:class="${selectedProgram == \'DEGREE_ENG\' and selectedLevel == year ? \'sidebar-hover-content collapse show\' : \'sidebar-hover-content collapse\'}" th:id="\'menuDegEng\' + ${year}">'
)

# Fix DEG EDU
content = content.replace(
    '<div class="sidebar-hover-content collapse" th:id="\'menuDegEdu\' + ${year}">',
    '<div th:class="${selectedProgram == \'DEGREE_EDU\' and selectedLevel == year ? \'sidebar-hover-content collapse show\' : \'sidebar-hover-content collapse\'}" th:id="\'menuDegEdu\' + ${year}">'
)

with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)

print("Added 'show' class to active collapse menus")
