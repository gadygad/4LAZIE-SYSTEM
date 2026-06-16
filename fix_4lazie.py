import re

def fix_logo(filename):
    with open(filename, 'r') as f:
        content = f.read()

    old_logo = '<span class="fs-4 fw-bold gradient-text me-2">4LAZIE</span>'
    new_logo = '<span class="fs-3 me-2" style="font-family: \'Outfit\', sans-serif; font-weight: 900; letter-spacing: -1px; background: linear-gradient(135deg, #0f172a 0%, #2563eb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; position: relative; z-index: 1;">4LAZIE</span>'
    
    if old_logo in content:
        content = content.replace(old_logo, new_logo)
        with open(filename, 'w') as f:
            f.write(content)
        print(f"Updated 4LAZIE logo in {filename}")
    else:
        print(f"Could not find logo in {filename}")

fix_logo('src/main/resources/templates/dashboard.html')
fix_logo('src/main/resources/templates/guest_notes.html')
