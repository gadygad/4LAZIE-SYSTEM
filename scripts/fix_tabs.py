import sys

files = ['../src/main/resources/templates/notes.html', '../src/main/resources/templates/guest_notes.html']

css_tabs = """
        /* Category Tabs Premium Styling */
        .category-tabs { display: flex; gap: 12px; margin-bottom: 2rem; flex-wrap: wrap; justify-content: center; }
        .category-tab-btn {
            background: rgba(15, 23, 42, 0.6) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            color: #94a3b8 !important;
            padding: 8px 24px;
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 600;
            text-decoration: none !important;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
        }
        .category-tab-btn:hover {
            color: #f8fafc !important;
            background: rgba(255, 255, 255, 0.05) !important;
            transform: translateY(-2px);
        }
        .category-tab-btn.active {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(168, 85, 247, 0.2)) !important;
            border-color: rgba(168, 85, 247, 0.3) !important;
            color: #ffffff !important;
            box-shadow: 0 4px 15px rgba(168, 85, 247, 0.15) !important;
        }
"""

for file_path in files:
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        if "Category Tabs Premium Styling" not in content and "/* Subtle Glow for Sidebar */" in content:
            content = content.replace("/* Subtle Glow for Sidebar */", css_tabs + "\n        /* Subtle Glow for Sidebar */")
            
            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Updated {file_path}")
    except FileNotFoundError:
        pass
