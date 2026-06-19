import os
import glob

# Search in src/main/resources/templates and target/classes/templates
dirs = ['../src/main/resources/templates/*.html', 'target/classes/templates/*.html']

for d in dirs:
    for filepath in glob.glob(d):
        try:
            with open(filepath, 'r') as f:
                content = f.read()
                
            if 'cursor: default;' in content and 'SMART IN BRAIN' in content:
                # Replace cursor: default; with cursor: pointer; for the badge
                content = content.replace('cursor: default;', 'cursor: pointer;')
                
                # Also ensure the 4LAZIE text has a hover effect or just pointer
                
                with open(filepath, 'w') as f:
                    f.write(content)
                print(f"Fixed cursor in {filepath}")
        except Exception as e:
            print(f"Error on {filepath}: {e}")
