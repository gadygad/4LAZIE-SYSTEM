import re

files = [
    'src/main/resources/templates/guest_notes.html',
    'src/main/resources/templates/my_notes.html',
    'src/main/resources/templates/view_note.html'
]

for filename in files:
    try:
        with open(filename, 'r') as f:
            content = f.read()

        # Add has-bottom-nav class to body if not present
        if '<body class="has-bottom-nav">' not in content:
            content = content.replace('<body>', '<body class="has-bottom-nav">')

        with open(filename, 'w') as f:
            f.write(content)
    except FileNotFoundError:
        print(f"Could not find {filename}")

