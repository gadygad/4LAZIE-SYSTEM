import sys

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# Add a few more CSS overrides inside the <style> block we injected
extra_css = """
        /* MORE DARK OVERRIDES */
        .navbar-custom, .sticky-top { background: rgba(15, 23, 42, 0.8) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
        .text-dark { color: #f8fafc !important; }
        .bg-light, .bg-white { background-color: rgba(15, 23, 42, 0.6) !important; color: #f8fafc !important; border: 1px solid rgba(255,255,255,0.08) !important; }
        .rounded-4.p-5.text-center { background: rgba(15, 23, 42, 0.6) !important; backdrop-filter: blur(12px) !important; border: 1px dashed rgba(255,255,255,0.1) !important; color: #f8fafc !important; }
        .rounded-4.p-5.text-center h5, .rounded-4.p-5.text-center p { color: #94a3b8 !important; }
"""

content = content.replace('/* Subtle Glow for Sidebar */', extra_css + '\n        /* Subtle Glow for Sidebar */')

with open('../src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)
