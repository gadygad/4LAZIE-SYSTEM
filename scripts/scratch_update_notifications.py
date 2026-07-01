import glob
import re

files = glob.glob('src/main/resources/templates/**/*.html', recursive=True)

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    original_content = content
    
    # Standardize timeout to 5000ms (5 seconds)
    content = re.sub(r'setTimeout\(\(\) => toast\.remove\(\), \d+\)', 'setTimeout(() => toast.remove(), 5000)', content)
    content = re.sub(r'setTimeout\(function\(\)\s*\{\s*toast\.remove\(\);\s*\}, \d+\)', 'setTimeout(function() { toast.remove(); }, 5000)', content)
    content = re.sub(r'hideTimeout = setTimeout\(hideToast, \d+\)', 'hideTimeout = setTimeout(hideToast, 5000)', content)
    
    # Update CSS animations for toasts to 5 seconds (5s delay + 0.5s fadeOut)
    content = re.sub(r'fadeOut 0\.5s ease 2\.5s forwards', 'fadeOut 0.5s ease 5s forwards', content)
    
    if content != original_content:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Updated notifications in {file}")

