import re

with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# Replace the hardcoded green heading with a dynamic Thymeleaf one
old_heading = """<h5 class="fw-bold mb-2 pb-1 d-inline-block section-header-premium" style="background: linear-gradient(135deg, #10b981, #34d399, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-family: 'Outfit', sans-serif; letter-spacing: 1px; border-bottom: 3px solid rgba(16, 185, 129, 0.5); filter: drop-shadow(0 4px 6px rgba(16, 185, 129, 0.3));">"""

new_heading = """<h5 class="fw-bold mb-2 pb-1 d-inline-block section-header-premium" 
    th:style="${session.user != null} ? 
    'background: linear-gradient(135deg, #10b981, #34d399, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-family: Outfit, sans-serif; letter-spacing: 1px; border-bottom: 3px solid rgba(16, 185, 129, 0.5); filter: drop-shadow(0 4px 6px rgba(16, 185, 129, 0.3));' : 
    'background: linear-gradient(135deg, #f59e0b, #fbbf24, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-family: Outfit, sans-serif; letter-spacing: 1px; border-bottom: 3px solid rgba(245, 158, 11, 0.5); filter: drop-shadow(0 4px 6px rgba(245, 158, 11, 0.3));'">"""

content = content.replace(old_heading, new_heading)

with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)
