import glob

files = ['src/main/resources/templates/guest_notes.html', 'src/main/resources/templates/dashboard.html']

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    old_span = '<span class="text-uppercase" style="font-size: 1.1rem; color: #1e293b; font-weight: 800; letter-spacing: 0.5px;" th:text="${entry.key}">'
    new_span = '<span class="text-uppercase" style="font-size: 0.95rem; color: #1e293b; font-weight: 700;" th:text="${entry.key}">'

    content = content.replace(old_span, new_span)

    with open(file, 'w') as f:
        f.write(content)
    print(f"Updated {file}")
