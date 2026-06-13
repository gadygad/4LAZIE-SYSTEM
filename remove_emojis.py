import re

with open('src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# Replacements
replacements = [
    (r'<span style="font-size: 1\.3rem;" class="me-3">📘</span>', r'<i class="bi bi-journal-text fs-4 me-3 text-light"></i>'),
    (r'<span style="font-size: 1\.3rem;" class="me-3">📌</span>', r'<i class="bi bi-pin-angle fs-4 me-3 text-light"></i>'),
    (r'<span style="font-size: 1\.3rem;" class="me-3">📝</span>', r'<i class="bi bi-pencil-square fs-4 me-3 text-light"></i>'),
    (r'<span style="font-size: 1\.3rem;" class="me-3">🎓</span>', r'<i class="bi bi-mortarboard fs-4 me-3 text-light"></i>'),
    (r'<span style="font-size: 1\.3rem;" class="me-3">📚</span>', r'<i class="bi bi-archive fs-4 me-3 text-light"></i>'),
    (r'<span style="font-size: 1\.2rem;" class="me-2">📄</span>', r'<i class="bi bi-file-earmark-text text-light me-2 fs-5"></i>')
]

for old, new in replacements:
    content = re.sub(old, new, content)

# I should also refine the styling of the accordion items slightly to ensure they look premium
# Currently: class="accordion-button collapsed bg-transparent text-white fw-bold text-uppercase" style="font-size: 1.1rem; letter-spacing: 1px;"
# Let's add a subtle hover effect if it's not already there by appending a custom class, or just keep it as is.

with open('src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)
