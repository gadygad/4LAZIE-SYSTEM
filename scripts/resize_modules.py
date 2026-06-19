import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Make the outer container smaller: p-3 -> px-3 py-2
content = re.sub(
    r'<div class="p-3 position-relative bg-white" style="border-radius: 16px;', 
    r'<div class="px-3 py-2 position-relative bg-white" style="border-radius: 14px;', 
    content
)

# Shrink the icon box: 52px -> 40px, border-radius 14px -> 10px, fs-4 -> fs-5
content = re.sub(
    r'style="width: 52px; height: 52px; border-radius: 14px; background: rgba\((.*?), 0.1\); color: (.*?);">\n\s*<i class="(.*?) fs-4"></i>',
    r'style="width: 40px; height: 40px; border-radius: 10px; background: rgba(\1, 0.1); color: \2;">\n                                        <i class="\3" style="font-size: 1.1rem;"></i>',
    content
)

# Shrink the module title font size: 1.05rem -> 0.85rem
content = re.sub(
    r'<h6 class="fw-bolder mb-1" style="font-size: 1.05rem; color: #0f172a; font-family: \'Outfit\', sans-serif; letter-spacing: 0.5px;">',
    r'<h6 class="fw-bolder mb-1" style="font-size: 0.85rem; color: #0f172a; font-family: \'Outfit\', sans-serif; letter-spacing: 0.5px;">',
    content
)

# Shrink the 'Notes Available' text: 0.75rem -> 0.7rem
content = re.sub(
    r'<span class="text-secondary fw-medium" style="font-size: 0.75rem;">',
    r'<span class="text-secondary fw-medium" style="font-size: 0.7rem;">',
    content
)

# Shrink the OPEN button: padding: 8px 20px -> 6px 14px, 0.75rem -> 0.7rem
content = re.sub(
    r'font-size: 0.75rem; padding: 8px 20px;',
    r'font-size: 0.7rem; padding: 6px 14px;',
    content
)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)
