import re
import os

def extract_and_replace():
    guest_file = 'src/main/resources/templates/guest_notes.html'
    dash_file = 'src/main/resources/templates/dashboard.html'
    fragments_file = 'src/main/resources/templates/fragments/sjuit_components.html'
    
    with open(guest_file, 'r') as f:
        content = f.read()

    # 1. Extract the sidebar
    # Starts with: <aside class="hero-sidebar">
    # Ends with: </aside>
    sidebar_start = '<aside class="hero-sidebar">'
    sidebar_end = '</aside>'
    
    s_idx = content.find(sidebar_start)
    e_idx = content.find(sidebar_end, s_idx) + len(sidebar_end)
    sidebar_html = content[s_idx:e_idx]
    
    # 2. Extract the accordion
    # Starts with: <!-- MODULE NAMES HEADING -->
    # Ends with the div that closes the accordion. Wait, the accordion id is "modulesAccordion"
    acc_start = '<!-- MODULE NAMES HEADING -->'
    # Let's find the closing tag for the accordion. 
    # Actually, it's easier to just find the Empty State and grab everything between header and Empty State.
    # Wait, the accordion might be better as its own fragment.
    # Let's just create a fragment for the whole "Notes List Area"
    # Starting from: <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 mt-0 gap-3">
    # Ending at: <!-- Empty State -->
    
    # Actually, the sidebar is the most important one that is duplicated. Let's start with the sidebar.
    
    # Modify sidebar to have th:fragment
    modified_sidebar = sidebar_html.replace('<aside class="hero-sidebar">', '<aside class="hero-sidebar" th:fragment="sidebar">')
    
    # 3. Extract Trending Notes
    # Starts with: <!-- TRENDING NOTES SECTION -->
    trending_start = '<!-- TRENDING NOTES SECTION -->'
    # Ends at: </style>\n                    </div>
    trending_end = '</style>\n                    </div>'
    t_s_idx = content.find(trending_start)
    t_e_idx = content.find(trending_end, t_s_idx) + len(trending_end)
    trending_html = content[t_s_idx:t_e_idx]
    
    modified_trending = trending_html.replace('<div class="trending-section mt-4 position-relative" th:if="${notes != null && !#lists.isEmpty(notes)}">', 
                                              '<div class="trending-section mt-4 position-relative" th:fragment="trending_notes" th:if="${notes != null && !#lists.isEmpty(notes)}">')
    
    # Combine into fragments file
    fragments_content = f"""<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<body>

{modified_sidebar}

{modified_trending}

</body>
</html>
"""
    with open(fragments_file, 'w') as f:
        f.write(fragments_content)
        
    print("Created fragments file.")

    # Replace in guest_notes.html
    guest_content = content.replace(sidebar_html, '<aside th:replace="~{fragments/sjuit_components :: sidebar}"></aside>')
    guest_content = guest_content.replace(trending_html, '<div th:replace="~{fragments/sjuit_components :: trending_notes}"></div>')
    with open(guest_file, 'w') as f:
        f.write(guest_content)
    print("Replaced in guest_notes.html")
    
    # Replace in dashboard.html
    with open(dash_file, 'r') as f:
        dash_content = f.read()
    
    # In dashboard.html, the sidebar might not have the exact exact same whitespace, but it should be very close.
    # We can use regex to find and replace the sidebar.
    dash_sidebar_match = re.search(r'<aside class="hero-sidebar">.*?</aside>', dash_content, re.DOTALL)
    if dash_sidebar_match:
        dash_content = dash_content.replace(dash_sidebar_match.group(0), '<aside th:replace="~{fragments/sjuit_components :: sidebar}"></aside>')
        print("Replaced sidebar in dashboard.html")
    else:
        print("Could not find sidebar in dashboard.html")
        
    # In dashboard.html, it might not have the trending notes yet, or it does if we added it?
    # Wait, we only added trending to guest_notes! Let's add it to dashboard too if they want it.
    # The user said "mpangilio wa notes na kila kitu tulichofanya hapa kwa sjuit uwe kwa page zake zote".
    # So dashboard should also have Trending Notes!
    # Let's insert Trending Notes after the notes list in dashboard.
    
    with open(dash_file, 'w') as f:
        f.write(dash_content)

extract_and_replace()
