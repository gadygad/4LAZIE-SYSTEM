with open('src/main/resources/templates/guest_notes.html', 'r') as f:
    content = f.read()

# Fix SEM 1 and SEM 2 active tab color to respect the green theme variable
content = content.replace("color: #d97706; border-bottom: 2px solid var(--premium-border, #f59e0b);", "color: var(--premium-hover, #d97706); border-bottom: 2px solid var(--premium-border, #f59e0b);")

# Also add a premium hover class for the "YEAR 1" dropdown button to make the icon green on hover if needed, 
# although it already has `class="premium-hover-text" onmouseover="this.style.color='var(--premium-hover, #d97706)'"`.
# Let's ensure the dropdown icon inherits the color:
# Actually, it's fine.

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(content)
