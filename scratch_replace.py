import re

with open('src/main/resources/templates/guest_notes.html', 'r') as f:
    content = f.read()

# 1. Read the old premium layout
with open('scratch_premium_guest_notes.html', 'r') as f:
    old_content = f.read()

# Extract the Minimal Text-Only Gold Filters section and Premium Section Header
match = re.search(r'(<!-- Minimal Text-Only Gold Filters -->.*?<!-- Empty State \(General\) -->)', old_content, re.DOTALL)
premium_header = match.group(1)

# Modify the premium header to support green theme dynamically if possible
# It's easier to just use CSS !important in the head. We already added green theme overrides.
# Let's add classes to these inline elements so the green theme can target them.

premium_header = premium_header.replace('style="border-bottom: 1px solid rgba(245, 158, 11, 0.15);"', 'class="premium-filter-border" style="border-bottom: 1px solid rgba(245, 158, 11, 0.15);"')
premium_header = premium_header.replace('style="color: #d97706;', 'class="premium-text-gold" style="color: #d97706;')
premium_header = premium_header.replace("onmouseover=\"this.style.color='#d97706'\"", "class=\"premium-hover-text\" onmouseover=\"this.style.color='var(--premium-hover, #d97706)'\"")
premium_header = premium_header.replace("onmouseover=\"if(!this.style.borderBottom) this.style.color='#d97706'\"", "onmouseover=\"if(!this.style.borderBottom) this.style.color='var(--premium-hover, #d97706)'\"")
premium_header = premium_header.replace('border-bottom: 2px solid #f59e0b', 'border-bottom: 2px solid var(--premium-border, #f59e0b)')
premium_header = premium_header.replace('background: linear-gradient(to right, rgba(245, 158, 11, 0.08), transparent)', 'background: linear-gradient(to right, var(--premium-bg-light, rgba(245, 158, 11, 0.08)), transparent)')
premium_header = premium_header.replace('border-left: 3px solid #f59e0b', 'border-left: 3px solid var(--premium-border, #f59e0b)')
premium_header = premium_header.replace('color: #92400e', 'color: var(--premium-text-dark, #92400e)')
premium_header = premium_header.replace('linear-gradient(to right, rgba(245, 158, 11, 0.2), transparent)', 'linear-gradient(to right, var(--premium-border-light, rgba(245, 158, 11, 0.2)), transparent)')

# Add CSS variables to the Green Theme Override
css_addition = """
        /* Green variables for Minimal Filters */
        :root {
            --premium-hover: #10b981;
            --premium-border: #10b981;
            --premium-bg-light: rgba(16, 185, 129, 0.08);
            --premium-border-light: rgba(16, 185, 129, 0.2);
            --premium-text-dark: #065f46;
        }
        .premium-filter-border { border-bottom-color: rgba(16, 185, 129, 0.15) !important; }
        .premium-text-gold { color: #10b981 !important; }
"""

# Replace the plain-text-form we added previously
content = re.sub(r'<!-- Notes Fetch Form \(Guest Theme\) -->.*?</div>\s*<!-- Server Rendered Notes Accordion -->', premium_header + '<!-- Server Rendered Notes Accordion -->', content, flags=re.DOTALL)

# Remove the JS script block we added
content = re.sub(r'<script th:inline="javascript">.*?// Initialize on load.*?</script>', '', content, flags=re.DOTALL)

# Insert the CSS variables into the green theme block
content = content.replace('/* Override Gold Theme to Green for Logged-In Users */', '/* Override Gold Theme to Green for Logged-In Users */' + css_addition)

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(content)
