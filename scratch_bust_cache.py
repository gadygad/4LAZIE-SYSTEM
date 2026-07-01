import glob
import re

files = glob.glob('src/main/resources/templates/*.html')
files.extend(glob.glob('src/main/resources/templates/*/*.html'))

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Replace any version of dashboard-premium.css with ?v=5
    new_content = re.sub(r'@{/css/dashboard-premium\.css[^}]*}', '@{/css/dashboard-premium.css?v=5}', content)
    
    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Updated {file}")

