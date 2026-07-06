import sys

with open("src/main/resources/templates/home.html", "r") as f:
    lines = f.readlines()

new_lines = []
skip = False
for i, line in enumerate(lines):
    # line indices are 0-based. 1151 is index 1150
    # Wait, the line numbers shown in view_file were 1151 to 1230.
    # To be safe, we can match the exact text.
    if "<!-- DIPLOMA -->" in line:
        skip = True
    
    if not skip:
        new_lines.append(line)
        
    if skip and "</div>" in line and i >= 1229 and "<!-- DEGREE -->" not in line:
        # Looking at lines 1191: <!-- DEGREE -->
        # Line 1229:                 </div>
        # Let's use string replacement instead to be precise.
        pass

with open("src/main/resources/templates/home.html", "r") as f:
    content = f.read()

start_str = "                <!-- DIPLOMA -->"
end_str = "                <!-- Search Bar (center) -->"

if start_str in content and end_str in content:
    start_idx = content.find(start_str)
    end_idx = content.find(end_str)
    
    if start_idx != -1 and end_idx != -1:
        new_content = content[:start_idx] + "                " + content[end_idx:]
        with open("src/main/resources/templates/home.html", "w") as f:
            f.write(new_content)
        print("Deleted Diploma and Degree buttons successfully")
    else:
        print("Indices not found")
else:
    print("Strings not found")
