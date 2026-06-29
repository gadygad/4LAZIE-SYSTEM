import re

with open('src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# Find Notification block
notif_start = content.find('<!-- Notification Button (Triggers Dropdown) -->')
notif_end = content.find('<!-- Profile Dropdown -->')

# Find Profile block
prof_start = notif_end
prof_end = content.find('</div>\n            </div>\n            <!-- Premium Horizontal Separator Line -->')

if notif_start != -1 and prof_start != -1 and prof_end != -1:
    notif_block = content[notif_start:notif_end]
    prof_block = content[prof_start:prof_end]
    
    # Remove d-none d-lg-block from notif block
    notif_block = notif_block.replace('<div class="dropdown d-none d-lg-block">', '<div class="dropdown">')
    
    # Ensure profile block has no d-none d-lg-block
    prof_block = prof_block.replace('<div class="dropdown d-none d-lg-block">', '<div class="dropdown">')
    
    new_content = content[:notif_start] + prof_block + notif_block + content[prof_end:]
    
    with open('src/main/resources/templates/dashboard.html', 'w') as f:
        f.write(new_content)
    print("Successfully swapped and updated classes.")
else:
    print("Could not find blocks.")
