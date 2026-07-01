import re

for filename in ['src/main/resources/templates/my_notes.html', 'src/main/resources/templates/view_note.html']:
    try:
        with open(filename, 'r') as f:
            content = f.read()

        if 'fragments/bottom_nav' not in content:
            bottom_nav = """
    <!-- Mobile Bottom Navigation -->
    <div th:replace="~{fragments/bottom_nav :: nav('notes')}"></div>
"""
            content = content.replace('</body>', bottom_nav + '\n</body>')

            with open(filename, 'w') as f:
                f.write(content)
    except FileNotFoundError:
        pass
