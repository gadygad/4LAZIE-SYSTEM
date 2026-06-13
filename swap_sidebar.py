import re

with open('src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# I need to extract the Student Profile Card and the Quick Links Card and swap them.
# The block starts at: <!-- Student Profile Card -->
# and ends at the end of Quick Links Card

student_profile_pattern = re.compile(r'(<!-- Student Profile Card -->.*?</div>\s*</div>)', re.DOTALL)
quick_links_pattern = re.compile(r'(<!-- Quick Links Card \(MOVED UNDER STUDENT PROFILE\) -->.*?</div>\s*</div>)', re.DOTALL)

student_match = student_profile_pattern.search(content)
quick_match = quick_links_pattern.search(content)

if student_match and quick_match:
    student_html = student_match.group(1)
    quick_html = quick_match.group(1)
    
    # We remove both from content
    content = content.replace(student_html, '')
    content = content.replace(quick_html, '')
    
    # Now we find the start of col-lg-4
    col_lg_4_marker = '<div class="col-lg-4">'
    
    # We want to insert quick_html FIRST, then student_html
    insertion = f"{col_lg_4_marker}\n                        \n                        {quick_html}\n\n                        {student_html}"
    content = content.replace(col_lg_4_marker, insertion)
    
    with open('src/main/resources/templates/dashboard.html', 'w') as f:
        f.write(content)
else:
    print("Could not find the cards")
