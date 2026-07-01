import re

with open('src/main/resources/templates/guest_notes.html', 'r') as f:
    content = f.read()

# Pattern to match the Dashboard button block
pattern = r'<a th:if="\$\{session\.user != null\}" th:href="@\{/dashboard\}" class="btn d-flex align-items-center".*?<i class="bi bi-speedometer2 me-1"></i> <span class="d-none d-sm-inline">Dashboard</span>\s*</a>'

# Remove it
new_content = re.sub(pattern, '', content, flags=re.DOTALL)

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(new_content)
