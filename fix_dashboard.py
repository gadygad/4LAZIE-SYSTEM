import sys

with open('src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# Replace light gradients and backgrounds
content = content.replace('background: linear-gradient(145deg, #ffffff, #f8fafc)', 'background: linear-gradient(145deg, rgba(30,41,59,0.7), rgba(15,23,42,0.8))')
content = content.replace('background: #f8fafc', 'background: rgba(30,41,59,0.5)')
content = content.replace('background-color: #f8fafc', 'background-color: rgba(30,41,59,0.5)')
content = content.replace('background: #ffffff', 'background: transparent')
content = content.replace('color: #000000', 'color: #f8fafc')
content = content.replace('color: #212529', 'color: #f8fafc')

# Inject CSS overrides before </head>
css_override = """
    <style>
        /* FORCE DARK MODE PREMIUM OVERRIDES */
        body { background: #050b14 !important; color: #f8fafc !important; }
        .main-content { background: transparent !important; }
        .premium-card { background: rgba(15, 23, 42, 0.6) !important; backdrop-filter: blur(12px) !important; -webkit-backdrop-filter: blur(12px) !important; border-color: rgba(255,255,255,0.08) !important; color: #f8fafc !important; }
        .list-card, .permissions-box, .accordion-item { background: rgba(15, 23, 42, 0.6) !important; border-color: rgba(255,255,255,0.08) !important; }
        .text-muted { color: #94a3b8 !important; }
        .list-group-item { background: transparent !important; border-color: rgba(255,255,255,0.05) !important; color: #f8fafc !important; }
        .list-group { border-color: rgba(255,255,255,0.08) !important; background: rgba(15, 23, 42, 0.6) !important; backdrop-filter: blur(16px) !important; -webkit-backdrop-filter: blur(16px) !important; }
        .module-item:hover { background-color: rgba(255,255,255,0.03) !important; }
        .unit-item { background: rgba(0,0,0,0.3) !important; color: #e2e8f0 !important; border-color: rgba(255,255,255,0.05) !important; }
        .unit-item:hover { background-color: rgba(255,255,255,0.08) !important; color: #fff !important; }
        .semester-switcher { background: rgba(15, 23, 42, 0.6) !important; border-color: rgba(255,255,255,0.08) !important; }
        .custom-select { background-color: rgba(15, 23, 42, 0.6) !important; border-color: rgba(255,255,255,0.08) !important; color: #f8fafc !important; }
        .custom-select-options { background: #0f172a !important; border-color: rgba(255,255,255,0.08) !important; }
        .custom-option { color: #f8fafc !important; }
        .custom-option:hover { background: rgba(255,255,255,0.05) !important; }
        .custom-option.selected { background: rgba(59, 130, 246, 0.2) !important; color: #60a5fa !important; }
        input.form-control, .form-control:focus { background: rgba(15, 23, 42, 0.6) !important; border-color: rgba(255,255,255,0.08) !important; color: #f8fafc !important; }
        h1, h2, h3, h4, h5, h6, .text-dark { color: #f8fafc !important; }
        .btn-light { background: rgba(255,255,255,0.1) !important; color: #fff !important; border: none !important; }
        .btn-light:hover { background: rgba(255,255,255,0.2) !important; }
        
        /* Subtle Glow for Sidebar */
        .hero-sidebar { border-right: 1px solid rgba(255,255,255,0.05); }
    </style>
</head>
"""

content = content.replace('</head>', css_override)

with open('src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)
