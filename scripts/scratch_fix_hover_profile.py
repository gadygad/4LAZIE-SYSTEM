import re

with open('src/main/resources/templates/fragments/navbar_actions.html', 'r') as f:
    content = f.read()

# Make the background more opaque to prevent text bleed-through ruining the look
content = content.replace('background: rgba(255,255,255,0.85);', 'background: rgba(255,255,255,0.95);')

# Enhance the hover effect for premium-dropdown-item
# We will replace the existing hover block
old_hover = """
                    .premium-dropdown-item:hover {
                        background: rgba(16, 185, 129, 0.1) !important;
                        transform: translateX(5px);
                        color: #059669 !important;
                    }"""

new_hover = """
                    .premium-dropdown-item:hover {
                        background: linear-gradient(90deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%) !important;
                        transform: translateX(8px);
                        color: #047857 !important;
                        font-weight: 700 !important;
                        border-left: 3px solid #10b981;
                    }"""

content = content.replace(old_hover, new_hover)

# Also fix the logout hover to have the same enhanced effect
old_logout_hover = "onmouseover=\"this.style.background='rgba(239, 68, 68, 0.1)';"
new_logout_hover = "onmouseover=\"this.style.background='linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.02) 100%)'; this.style.borderLeft='3px solid #ef4444';"

old_logout_out = "onmouseout=\"this.style.background='transparent';"
new_logout_out = "onmouseout=\"this.style.background='transparent'; this.style.borderLeft='none';"

content = content.replace(old_logout_hover, new_logout_hover)
content = content.replace(old_logout_out, new_logout_out)

with open('src/main/resources/templates/fragments/navbar_actions.html', 'w') as f:
    f.write(content)

