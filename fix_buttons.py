import sys

with open('src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# Replace Semester switcher classes
content = content.replace("th:classappend=\"${selectedSemester == 1 ? 'btn-primary shadow-sm text-white' : 'text-secondary'}\"", 
                          "th:classappend=\"${selectedSemester == 1 ? 'premium-pill-active' : 'premium-pill-inactive'}\"")
content = content.replace("th:classappend=\"${selectedSemester == 2 ? 'btn-primary shadow-sm text-white' : 'text-secondary'}\"", 
                          "th:classappend=\"${selectedSemester == 2 ? 'premium-pill-active' : 'premium-pill-inactive'}\"")

# Add the new pill classes to the injected CSS
css_to_add = """
        /* Premium Pill Switcher */
        .premium-pill-active { background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)) !important; border: 1px solid rgba(255,255,255,0.2) !important; color: #ffffff !important; box-shadow: 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1) !important; }
        .premium-pill-inactive { background: transparent !important; color: #94a3b8 !important; }
        .premium-pill-inactive:hover { color: #f8fafc !important; background: rgba(255,255,255,0.05) !important; }
"""
content = content.replace('/* Subtle Glow for Sidebar */', css_to_add + '\n        /* Subtle Glow for Sidebar */')

# Fix the profile avatar gradient (remove the bright blue)
content = content.replace('background: linear-gradient(135deg, #2563eb, #3b82f6);', 'background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)); border: 1px solid rgba(255,255,255,0.1);')

# Fix the View Full Profile button
content = content.replace('background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; border: none;', 'background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02)); color: #f8fafc; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(10px);')
content = content.replace("rgba(37, 99, 235, 0.3)", "rgba(0, 0, 0, 0.4)")
content = content.replace("rgba(37, 99, 235, 0.4)", "rgba(0, 0, 0, 0.6)")

# Fix standard btn-primary downloads to be premium
content = content.replace('btn btn-sm btn-primary rounded-pill fw-bold shadow-sm', 'btn btn-sm rounded-pill fw-bold shadow-sm premium-download-btn')

css_download = """
        .premium-download-btn { background: rgba(255,255,255,0.1) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #f8fafc !important; }
        .premium-download-btn:hover { background: rgba(255,255,255,0.2) !important; color: #fff !important; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important; }
"""
content = content.replace('/* Subtle Glow for Sidebar */', css_download + '\n        /* Subtle Glow for Sidebar */')


with open('src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)
