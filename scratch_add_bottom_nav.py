import re

with open('src/main/resources/templates/guest_notes.html', 'r') as f:
    content = f.read()

# Add bottom_nav just before the closing </body> tag
bottom_nav = """
    <!-- Mobile Bottom Navigation -->
    <div th:replace="~{fragments/bottom_nav :: nav('notes')}"></div>
"""

content = content.replace('</body>', bottom_nav + '\n</body>')

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(content)
