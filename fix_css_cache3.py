import re

files_to_update = [
    'src/main/resources/templates/dashboard.html',
    'src/main/resources/templates/notes.html',
    'src/main/resources/templates/guest_notes.html'
]

for file_path in files_to_update:
    with open(file_path, 'r') as f:
        content = f.read()
    
    content = content.replace('premium-theme.css?v=2.2', 'premium-theme.css?v=2.3')
    content = content.replace('premium-theme.css?v=2.1', 'premium-theme.css?v=2.3')
    content = content.replace('premium-theme.css', 'premium-theme.css?v=2.3')
    
    # Fix the double v2.3 issue if any
    content = content.replace('premium-theme.css?v=2.3?v=2.3', 'premium-theme.css?v=2.3')
    
    with open(file_path, 'w') as f:
        f.write(content)

print("Cache busted to v2.3")
