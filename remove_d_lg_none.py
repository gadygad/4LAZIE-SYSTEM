import os
import re
import glob

# Search in templates directory
search_dir = r'd:\4LAZIE\src\main\resources\templates'

for root, _, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.html'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original = content
            
            # Find buttons with data-bs-toggle="offcanvas" and remove d-lg-none or d-xl-none
            # We will use regex to find lines containing data-bs-toggle="offcanvas" and data-bs-target="#mobileSidebar" or "#mobileOffcanvasSidebar"
            # and replace d-lg-none or d-xl-none with nothing.
            
            def replacer(match):
                button_tag = match.group(0)
                # Remove d-lg-none and d-xl-none
                button_tag = re.sub(r'\bd-lg-none\b', '', button_tag)
                button_tag = re.sub(r'\bd-xl-none\b', '', button_tag)
                return button_tag

            content = re.sub(r'<button[^>]+data-bs-toggle="offcanvas"[^>]+>', replacer, content)

            if content != original:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {filepath}")
