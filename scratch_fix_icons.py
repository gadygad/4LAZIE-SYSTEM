import re

with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# Fix hardcoded green icons for guest users
content = content.replace('th:if="${session.user == null}"><i class="bi bi-cloud-arrow-down-fill me-1" style="color: #10b981;"', 'th:if="${session.user == null}"><i class="bi bi-cloud-arrow-down-fill me-1" style="color: #f59e0b;"')

# Fix "DIPLOMA IN ME" and "DEGREE IN ME" icons that are #34d399
content = content.replace('style="color: #34d399;"', 'th:style="${session.user != null} ? \'color: #34d399;\' : \'color: #f59e0b;\'"')

with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)
