import re

with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# Hide Premium lock badges
content = content.replace(
    '<span style="font-size:0.65rem; color:#b45309; background:rgba(245,158,11,0.1); padding:4px 8px; border-radius:6px; font-weight:bold;"><i class="bi bi-lock-fill me-1"></i>Premium</span>',
    '<span th:if="${session.user == null}" style="font-size:0.65rem; color:#b45309; background:rgba(245,158,11,0.1); padding:4px 8px; border-radius:6px; font-weight:bold;"><i class="bi bi-lock-fill me-1"></i>Premium</span>'
)

with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)
