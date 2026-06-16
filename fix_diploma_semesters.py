with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

def replace_levels(program):
    old_content = f"""<a th:href="@{{'/guest-notes?program={program}&level=4&semester=1'}}" th:style="${{selectedProgram == '{program}' and selectedLevel == 4 ? 'color: #fff;' : ''}}">NTA LEVEL 4</a>
                            <a th:href="@{{'/guest-notes?program={program}&level=5&semester=1'}}" th:style="${{selectedProgram == '{program}' and selectedLevel == 5 ? 'color: #fff;' : ''}}">NTA LEVEL 5</a>
                            <a th:href="@{{'/guest-notes?program={program}&level=6&semester=1'}}" th:style="${{selectedProgram == '{program}' and selectedLevel == 6 ? 'color: #fff;' : ''}}">NTA LEVEL 6</a>"""
    
    new_content = f"""<a th:href="@{{'/guest-notes?program={program}&level=4&semester=1'}}" th:style="${{selectedProgram == '{program}' and selectedLevel == 4 and selectedSemester == 1 ? 'color: #fff;' : ''}}">Level 4 - Sem 1</a>
                            <a th:href="@{{'/guest-notes?program={program}&level=4&semester=2'}}" th:style="${{selectedProgram == '{program}' and selectedLevel == 4 and selectedSemester == 2 ? 'color: #fff;' : ''}}">Level 4 - Sem 2</a>
                            <a th:href="@{{'/guest-notes?program={program}&level=5&semester=1'}}" th:style="${{selectedProgram == '{program}' and selectedLevel == 5 and selectedSemester == 1 ? 'color: #fff;' : ''}}">Level 5 - Sem 1</a>
                            <a th:href="@{{'/guest-notes?program={program}&level=5&semester=2'}}" th:style="${{selectedProgram == '{program}' and selectedLevel == 5 and selectedSemester == 2 ? 'color: #fff;' : ''}}">Level 5 - Sem 2</a>
                            <a th:href="@{{'/guest-notes?program={program}&level=6&semester=1'}}" th:style="${{selectedProgram == '{program}' and selectedLevel == 6 and selectedSemester == 1 ? 'color: #fff;' : ''}}">Level 6 - Sem 1</a>
                            <a th:href="@{{'/guest-notes?program={program}&level=6&semester=2'}}" th:style="${{selectedProgram == '{program}' and selectedLevel == 6 and selectedSemester == 2 ? 'color: #fff;' : ''}}">Level 6 - Sem 2</a>"""
    
    return content.replace(old_content, new_content)

content = replace_levels('DIP_IT')
content = replace_levels('DIP_CSE')
content = replace_levels('DIP_CE')
content = replace_levels('DIP_ME')

with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)
print("Diploma semesters fixed")
