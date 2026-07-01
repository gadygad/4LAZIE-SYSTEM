import re

with open('src/main/resources/templates/fragments/navbar_actions.html', 'r') as f:
    content = f.read()

# Profile Button Hover (line 152, 153)
content = content.replace("rgba(230,126,34,0.2)", "var(--noti-shadow)")
content = content.replace("rgba(230, 126, 34, 0.3)", "var(--noti-border)")

# Avatar border shadow
content = content.replace("rgba(230,126,34,0.2)", "var(--noti-shadow)")

# Dropdown Header
content = content.replace("rgba(230, 126, 34, 0.05)", "var(--noti-bg-light)")
content = content.replace("border-bottom: 2px solid #e67e22 !important;", "border-bottom: 2px solid var(--noti-color) !important;")

# Dropdown Items Hover Effects
content = content.replace("this.style.background='rgba(230,126,34,0.05)'", "this.style.background='var(--noti-bg-light)'")
content = content.replace("this.style.color='#e67e22'", "this.style.color='var(--noti-color)'")

# Logout button
content = content.replace("rgba(220, 38, 38, 0.05)", "rgba(239, 68, 68, 0.15)")
content = content.replace("this.style.background='transparent'", "this.style.background='transparent'") # Keep this

with open('src/main/resources/templates/fragments/navbar_actions.html', 'w') as f:
    f.write(content)
