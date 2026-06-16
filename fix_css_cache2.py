import re

files_to_update = [
    'src/main/resources/templates/dashboard.html',
    'src/main/resources/templates/notes.html',
    'src/main/resources/templates/guest_notes.html'
]

for file_path in files_to_update:
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Update premium-theme.css version
    content = content.replace(
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css?v=2.1}">',
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css?v=2.2}">'
    )
    
    with open(file_path, 'w') as f:
        f.write(content)

print("Cache busted to v2.2")
