import glob
import re

files = glob.glob('src/main/resources/templates/*.html')

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # We want to find the url construction: let url = `/api/notes/filter?...`
    # and replace ${program} with ${encodeURIComponent(program)}
    new_content = re.sub(r'program=\${program}', r'program=${encodeURIComponent(program)}', content)
    
    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Updated fetch URL in {file}")

