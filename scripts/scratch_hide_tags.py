import re

with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# Hide EXCLUSIVE badge
content = content.replace(
    '<span class="ms-auto" style="background: rgba(245,158,11,0.15); color: #d97706; border: 1px solid rgba(245,158,11,0.25); font-size: 0.55rem; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-family:\'Outfit\',sans-serif;">EXCLUSIVE</span>',
    '<span th:if="${session.user == null}" class="ms-auto" style="background: rgba(245,158,11,0.15); color: #d97706; border: 1px solid rgba(245,158,11,0.25); font-size: 0.55rem; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-family:\'Outfit\',sans-serif;">EXCLUSIVE</span>'
)

# Hide PREMIUM badge
content = content.replace(
    '<span class="ms-auto" style="background: linear-gradient(90deg, #f59e0b, #d97706); color: #fff; border: none; font-size: 0.55rem; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-family:\'Outfit\',sans-serif; letter-spacing:0.5px; box-shadow: 0 2px 4px rgba(217,119,6,0.3);">PREMIUM</span>',
    '<span th:if="${session.user == null}" class="ms-auto" style="background: linear-gradient(90deg, #f59e0b, #d97706); color: #fff; border: none; font-size: 0.55rem; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-family:\'Outfit\',sans-serif; letter-spacing:0.5px; box-shadow: 0 2px 4px rgba(217,119,6,0.3);">PREMIUM</span>'
)

with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)
