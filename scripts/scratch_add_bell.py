import re

with open('src/main/resources/templates/fragments/navbar_actions.html', 'r') as f:
    nav_actions = f.read()

# Extract the style block we created
style_match = re.search(r'<style>.*?</style>\s*<style th:if="\$\{session.user != null\}">.*?</style>', nav_actions, re.DOTALL)
styles = style_match.group(0) if style_match else ""

# Extract the notification dropdown
bell_match = re.search(r'<div class="dropdown me-2 me-md-3">.*?</ul>\s*</div>', nav_actions, re.DOTALL)
bell_html = bell_match.group(0) if bell_match else ""

if bell_html:
    with open('src/main/resources/templates/guest_notes.html', 'r') as f:
        guest_notes = f.read()
    
    # We want to insert the bell BEFORE the User Profile Dropdown or Sign In Button
    # Find "<!-- Premium Gold Sign In Button -->"
    insert_point = guest_notes.find('<!-- Premium Gold Sign In Button -->')
    
    if insert_point != -1:
        # Wrap the bell in th:if="${session.user != null}"
        bell_wrapped = f"""
            {styles}
            <div th:if="${{session.user != null}}" class="d-flex align-items-center">
                {bell_html}
            </div>
        """
        
        new_content = guest_notes[:insert_point] + bell_wrapped + "\n" + guest_notes[insert_point:]
        
        with open('src/main/resources/templates/guest_notes.html', 'w') as f:
            f.write(new_content)
        print("Successfully added bell to guest_notes.html")
    else:
        print("Could not find insert point in guest_notes.html")
