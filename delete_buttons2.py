with open("src/main/resources/templates/home.html", "r") as f:
    lines = f.readlines()

# find exact indices
start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if "<!-- DIPLOMA -->" in line and start_idx == -1:
        start_idx = i
    if "<!-- Search Bar (center) -->" in line and end_idx == -1:
        # We want to keep the closing </div> of the parent container which is before the search bar
        # Let's find the closing div of the DEGREE block. It ends around 1230.
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    # the </div> closing the left side is at end_idx - 2 usually, let's keep it.
    # Lines 1231:             </div>
    # Let's find the exactly </div> before Search Bar
    target_end = end_idx
    for j in range(end_idx - 1, start_idx, -1):
        if "</div>" in lines[j]:
            target_end = j
            break
            
    # delete from start_idx to target_end - 1
    new_lines = lines[:start_idx] + lines[target_end:]
    
    with open("src/main/resources/templates/home.html", "w") as f:
        f.writelines(new_lines)
    print(f"Deleted from {start_idx} to {target_end - 1}")
else:
    print("Not found")
