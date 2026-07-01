import re

with open('src/main/resources/templates/guest_notes.html', 'r') as f:
    content = f.read()

# Make the green theme look exactly like the screenshot
new_css = """
        /* Green variables for Minimal Filters */
        :root {
            --premium-hover: #10b981;
            --premium-border: #10b981;
            --premium-bg-light: rgba(16, 185, 129, 0.08);
            --premium-border-light: rgba(16, 185, 129, 0.2);
            --premium-text-dark: #10b981;
        }
        .premium-filter-border { border-bottom-color: rgba(16, 185, 129, 0.2) !important; }
        .premium-text-gold { color: #10b981 !important; }
        
        /* Premium Hover Effects */
        .premium-hover-text { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important; }
        .premium-hover-text:hover { color: #10b981 !important; transform: translateY(-1px); }
        .sem-tab { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important; position: relative; }
        .sem-tab:hover { color: #10b981 !important; transform: translateY(-1px); }
"""

# Replace old CSS
content = re.sub(r'/\* Green variables for Minimal Filters \*/.*?.premium-text-gold \{ color: #10b981 !important; \}', new_css, content, flags=re.DOTALL)

# Add .sem-tab class to the SEM tabs
content = content.replace('class="text-decoration-none"', 'class="text-decoration-none sem-tab"')

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(content)
