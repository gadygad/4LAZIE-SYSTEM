import re

files = [
    'src/main/resources/templates/guest_notes.html',
    'src/main/resources/templates/my_notes.html',
    'src/main/resources/templates/view_note.html'
]

for filename in files:
    try:
        with open(filename, 'r') as f:
            content = f.read()

        # Add dashboard-premium.css if it doesn't exist
        if 'dashboard-premium.css' not in content:
            # We'll insert it right after global-premium.css or bootstrap-icons
            if '<link rel="stylesheet" th:href="@{/css/global-premium.css}">' in content:
                content = content.replace(
                    '<link rel="stylesheet" th:href="@{/css/global-premium.css}">', 
                    '<link rel="stylesheet" th:href="@{/css/global-premium.css}">\n    <link rel="stylesheet" th:href="@{/css/dashboard-premium.css}">'
                )
            elif '<link rel="stylesheet" th:href="@{/css/dashboard.css}">' in content:
                content = content.replace(
                    '<link rel="stylesheet" th:href="@{/css/dashboard.css}">', 
                    '<link rel="stylesheet" th:href="@{/css/dashboard.css}">\n    <link rel="stylesheet" th:href="@{/css/dashboard-premium.css}">'
                )
            elif 'bootstrap-icons.min.css" rel="stylesheet">' in content:
                content = content.replace(
                    'bootstrap-icons.min.css" rel="stylesheet">', 
                    'bootstrap-icons.min.css" rel="stylesheet">\n    <link rel="stylesheet" th:href="@{/css/dashboard-premium.css}">'
                )
            
            with open(filename, 'w') as f:
                f.write(content)
            print(f"Added dashboard-premium.css to {filename}")
    except FileNotFoundError:
        print(f"Could not find {filename}")

