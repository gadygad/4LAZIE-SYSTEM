import re
import os

fragment_call = '            <div th:replace="~{fragments/navbar_actions :: actions}"></div>'

def replace_in_file(filepath):
    if not os.path.exists(filepath):
        return
    with open(filepath, 'r') as f:
        content = f.read()
    
    # We want to replace from <!-- Action Buttons --> down to the end of the profile dropdown
    # The profile dropdown ends with </ul> \n </div> \n </div> (depending on the file)
    # This regex matches the block:
    # <!-- Action Buttons --> ... </div> (the wrapper d-flex align-items-center) ... <div class="d-flex align-items-center dropdown"> ... </div> (end of dropdown)
    
    # Let's try a robust regex to find the right-side section.
    # In dashboard, notes, guest_notes, upload, profile we have something like:
    # <div class="d-flex align-items-center dropdown"> or <!-- Action Buttons -->
    
    # Since I just added <!-- Action Buttons --> in dashboard, notes, guest_notes
    if "<!-- Action Buttons -->" in content:
        pattern = re.compile(r'            <!-- Action Buttons -->.*?</ul>\s*</div>\s*</div>\s*</div>', re.DOTALL)
        content = pattern.sub(fragment_call + '\n        </div>', content)
        
        # In case the regex matched too much or too little, let's use a simpler string replace for the rest if it missed
    
    # In profile.html, we have:
    if "profile.html" in filepath or "upload.html" in filepath:
        if '<div class="d-flex align-items-center dropdown">' in content:
            pattern2 = re.compile(r'            <div class="d-flex align-items-center dropdown">.*?</ul>\s*</div>\s*</div>', re.DOTALL)
            content = pattern2.sub(fragment_call + '\n        </div>', content)
            
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Refactored {filepath}")

files = [
    'src/main/resources/templates/dashboard.html',
    'src/main/resources/templates/notes.html',
    'src/main/resources/templates/guest_notes.html',
    'src/main/resources/templates/profile.html',
    'src/main/resources/templates/upload.html'
]

for f in files:
    replace_in_file(f)

# Now for semesters.html, we need to inject the full navbar
with open('src/main/resources/templates/semesters.html', 'r') as f:
    semesters = f.read()

navbar_code = """
        <!-- Header Navigation -->
        <nav class="navbar navbar-light navbar-custom sticky-top py-3" style="background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); z-index: 1020; border-bottom: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);">
            <div class="container d-flex justify-content-between align-items-center">
                <a class="navbar-brand d-flex align-items-center" href="/dashboard" style="text-decoration: none;">
                    <i class="bi bi-arrow-left fs-4 me-2 text-secondary"></i>
                    <span class="fs-3 me-2" style="font-family: 'Outfit', sans-serif; font-weight: 900; letter-spacing: -1px; background: linear-gradient(135deg, #0f172a 0%, #2563eb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">4LAZIE</span>
                </a>
                
                <div th:replace="~{fragments/navbar_actions :: actions}"></div>
            </div>
        </nav>
"""

if "<nav class=\"navbar" not in semesters:
    semesters = semesters.replace('<div class="hub-container">', navbar_code + '\n    <div class="hub-container">')
    with open('src/main/resources/templates/semesters.html', 'w') as f:
        f.write(semesters)
    print("Injected navbar into semesters.html")

