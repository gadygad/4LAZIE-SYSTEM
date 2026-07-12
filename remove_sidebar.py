import re
import os

target_files = [
    r'd:\4LAZIE\src\main\resources\templates\public\home.html',
    r'd:\4LAZIE\src\main\resources\templates\public\index.html',
    r'd:\4LAZIE\src\main\resources\templates\timetable\semesters.html',
    r'd:\4LAZIE\src\main\resources\templates\timetable\departments.html',
    r'd:\4LAZIE\src\main\resources\templates\notes\guest_notes.html'
]

for file_path in target_files:
    if not os.path.exists(file_path):
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove the aside or div that replaces sjuit_components :: sidebar
    content = re.sub(r'<aside th:replace="~{fragments/sjuit_components :: sidebar}"></aside>\s*', '', content)
    content = re.sub(r'<div th:replace="~{fragments/sjuit_components :: sidebar}"></div>\s*', '', content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        print(f"Updated {file_path}")
