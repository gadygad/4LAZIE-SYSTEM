import re

files_to_update = [
    '../src/main/resources/templates/dashboard.html',
    '../src/main/resources/templates/notes.html',
    '../src/main/resources/templates/guest_notes.html'
]

for file_path in files_to_update:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Update premium-theme.css
    content = content.replace(
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css}">',
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css?v=2.1}">'
    )
    content = content.replace(
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css?v=2.0}">',
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css?v=2.1}">'
    )
    content = content.replace(
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css?v=1.1}">',
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css?v=2.1}">'
    )
    
    with open(file_path, 'w') as f:
        f.write(content)

# Now remove the old inline CSS from notes.html
with open('../src/main/resources/templates/notes.html', 'r') as f:
    content = f.read()

content = re.sub(r'\.sidebar-hover-item \{.*?i\.chevron \{ transform: rotate\(180deg\); \}', '', content, flags=re.DOTALL)

with open('../src/main/resources/templates/notes.html', 'w') as f:
    f.write(content)

print("Cache busted and CSS cleaned")
