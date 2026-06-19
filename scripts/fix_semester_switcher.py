import os
import glob

files = glob.glob('../src/main/resources/templates/*.html')

old_switcher = 'style="background: rgba(30,41,59,0.5); padding: 4px; border-radius: 50px; border: 1px solid var(--border-subtle); display: inline-flex; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);"'
new_switcher = 'style="background: transparent; padding: 4px; display: inline-flex; gap: 10px;"'

# We should also reduce the padding and font-size of the buttons inside it.
# The buttons currently have:
# style="border-radius: 50px; padding: 6px 24px; font-weight: 600; font-size: 0.85rem; transition: all 0.3s ease;"
old_btn = 'style="border-radius: 50px; padding: 6px 24px; font-weight: 600; font-size: 0.85rem; transition: all 0.3s ease;"'
new_btn = 'style="border-radius: 50px; padding: 4px 16px; font-weight: 600; font-size: 0.75rem; transition: all 0.3s ease;"'

for file in files:
    with open(file, 'r') as f:
        content = f.read()
        
    changed = False
    if old_switcher in content:
        content = content.replace(old_switcher, new_switcher)
        changed = True
        
    if old_btn in content:
        content = content.replace(old_btn, new_btn)
        changed = True
        
    if changed:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")
