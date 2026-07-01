with open('src/main/resources/templates/guest_notes.html', 'r') as f:
    content = f.read()

content = content.replace('class="d-flex flex-wrap align-items-center justify-content-between mb-4 pb-2" class="premium-filter-border"', 'class="d-flex flex-wrap align-items-center justify-content-between mb-4 pb-2 premium-filter-border"')
content = content.replace('class="btn p-0 border-0 d-flex align-items-center gap-1" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #94a3b8; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.5px; transition: color 0.3s;" class="premium-hover-text"', 'class="btn p-0 border-0 d-flex align-items-center gap-1 premium-hover-text" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: #94a3b8; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.5px; transition: color 0.3s;"')

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(content)
