import sys

files_to_fix = [
    '../src/main/resources/templates/upload.html',
    '../src/main/resources/templates/profile.html',
    '../src/main/resources/templates/semesters.html'
]

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
        
        .navbar-custom, .sticky-top { background: rgba(15, 23, 42, 0.8) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border-bottom: 1px solid rgba(255,255,255,0.08) !important; }
        .bg-light, .bg-white { background-color: rgba(15, 23, 42, 0.6) !important; color: #f8fafc !important; border: 1px solid rgba(255,255,255,0.08) !important; }
        .rounded-4.p-5.text-center { background: rgba(15, 23, 42, 0.6) !important; backdrop-filter: blur(12px) !important; border: 1px dashed rgba(255,255,255,0.1) !important; color: #f8fafc !important; }
        .rounded-4.p-5.text-center h5, .rounded-4.p-5.text-center p { color: #94a3b8 !important; }
        
        /* Premium Pill Switcher */
        .premium-pill-active { background: linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.05)) !important; border: 1px solid rgba(255,255,255,0.2) !important; color: #ffffff !important; box-shadow: 0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1) !important; }
        .premium-pill-inactive { background: transparent !important; color: #94a3b8 !important; }
        .premium-pill-inactive:hover { color: #f8fafc !important; background: rgba(255,255,255,0.05) !important; }

        .premium-download-btn { background: rgba(255,255,255,0.1) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #f8fafc !important; }
        .premium-download-btn:hover { background: rgba(255,255,255,0.2) !important; color: #fff !important; transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.3) !important; }

        /* Subtle Glow for Sidebar */
        .hero-sidebar { border-right: 1px solid rgba(255,255,255,0.05); }
    </style>
</head>
"""

for file_path in files_to_fix:
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        if "FORCE DARK MODE PREMIUM OVERRIDES" not in content and '</head>' in content:
            content = content.replace('</head>', css_override)
            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Updated {file_path}")
    except FileNotFoundError:
        pass

