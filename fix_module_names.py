import glob

files = ['src/main/resources/templates/guest_notes.html', 'src/main/resources/templates/dashboard.html']

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # The current string in the accordion header:
    old_code_span = '<span class="text-uppercase" style="font-size: 0.95rem; color: #6b7280; font-weight: 700;" th:text="${moduleCodes[entry.key] != null ? moduleCodes[entry.key] : entry.key}">CSE 05206</span>'
    old_name_span = '<span style="font-size: 0.75rem; color: #9ca3af; font-weight: 500;" th:if="${moduleCodes[entry.key] != null}" th:text="${entry.key}">Software Engineering</span>'
    
    new_code_span = '<span class="text-uppercase" style="font-size: 0.95rem; color: #6b7280; font-weight: 700;" th:text="${entry.key}">SOFTWARE ENGINEERING</span>'
    new_name_span = '<span style="font-size: 0.75rem; color: #9ca3af; font-weight: 500;" th:if="${moduleCodes[entry.key] != null && !moduleCodes[entry.key].isEmpty() && moduleCodes[entry.key] != entry.key}" th:text="${moduleCodes[entry.key]}">CSE 05206</span>'

    # Do replacements
    content = content.replace(old_code_span, new_code_span)
    content = content.replace(old_name_span, new_name_span)

    with open(file, 'w') as f:
        f.write(content)
    print(f"Updated {file}")
