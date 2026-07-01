with open('src/main/resources/templates/guest_notes.html', 'r') as f:
    content = f.read()

# Fix the duplicate classes manually
content = content.replace('class="bi bi-journal-bookmark" class="premium-text-gold"', 'class="bi bi-journal-bookmark premium-text-gold"')
content = content.replace('class="text-uppercase fw-bold" class="premium-text-gold"', 'class="text-uppercase fw-bold premium-text-gold"')
content = content.replace('class="bi bi-stack me-2" class="premium-text-gold"', 'class="bi bi-stack me-2 premium-text-gold"')

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(content)
