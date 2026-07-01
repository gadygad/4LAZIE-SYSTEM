import re

with open('scratch_original_guest_notes.html', 'r') as f:
    content = f.read()

# 1. Replace notesResults with the accordion
content = re.sub(
    r'<div id="notesResults" class="mb-5">\s*<!-- Results Accordion will be injected here -->\s*</div>',
    r'<!-- Server Rendered Notes Accordion -->\n        <div th:replace="~{fragments/sjuit_components :: notes_accordion}"></div>',
    content
)

# 2. Replace JS fetch logic with redirect
js_pattern = r'let url = `/api/notes/filter\?category=\$\{category\}\&program=\$\{program\}\&semester=\$\{semester\}`;.*?\}\);\s*\}\);'

new_js = """let url = `/guest-notes?program=${program}&semester=${semester}`;
            if (level) {
                url += `&level=${level}`;
            }
            
            searchBtn.innerHTML = '<i class="bi bi-arrow-repeat spin-icon me-2"></i> Loading...';
            window.location.href = url;
        });"""

content = re.sub(js_pattern, new_js, content, flags=re.DOTALL)

# 3. Add green theme override right before </head>
green_theme = """
    <!-- Green Theme Override for Logged-In Users -->
    <style th:if="${session.user != null}">
        /* Override Gold Theme to Green for Logged-In Users */
        .premium-input-group { box-shadow: 0 10px 30px rgba(16, 185, 129, 0.04) !important; }
        .premium-input-group:hover { box-shadow: 0 15px 35px rgba(16, 185, 129, 0.08) !important; }
        .premium-select { border: 2px solid rgba(16, 185, 129, 0.1) !important; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2310b981' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E") !important; }
        .premium-select:hover { border-color: rgba(16, 185, 129, 0.3) !important; }
        .premium-select:focus { border-color: #10b981 !important; box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.15) !important; }
        .btn-premium-search { background: linear-gradient(135deg, #10b981, #059669) !important; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2) !important; }
        .btn-premium-search:hover { box-shadow: 0 15px 35px rgba(16, 185, 129, 0.4) !important; color: white !important; }
        
        .accordion-button::after { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2310b981' class='bi bi-chevron-down' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E") !important; }
        .accordion-body { border-top: 1px dashed rgba(16, 185, 129, 0.2) !important; }
        .btn-read { background: rgba(16, 185, 129, 0.1) !important; color: #059669 !important; }
        .btn-read:hover { background: #10b981 !important; color: white !important; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3) !important; }
    </style>
</head>"""

content = content.replace('</head>', green_theme)

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(content)
