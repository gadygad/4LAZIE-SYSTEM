import re

with open("../src/main/resources/templates/dashboard.html", "r") as f:
    content = f.read()

# 1. Remove old inline styles
pattern_styles = r'<style>.*?\.icon-success \{ background: rgba\(16, 185, 129, 0\.1\); color: #10b981; \}.*?</style>'
content = re.sub(pattern_styles, '', content, flags=re.DOTALL)

# 2. Add dashboard.css if not present
if "dashboard.css" not in content:
    content = content.replace(
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css}">',
        '<link rel="stylesheet" th:href="@{/css/premium-theme.css}">\n    <link rel="stylesheet" th:href="@{/css/dashboard.css}">'
    )

# 3. Replace the "Open Notes Section" header with the exact one from guest_notes.html
old_header_pattern = r'<div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 mt-0 gap-3">\s*<h2 class="fw-bold m-0 d-flex align-items-center"[^>]*>.*?</h2>'
new_header = """<div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 mt-0 gap-3">
                    <div class="d-flex align-items-center p-2 rounded-4" style="background: #ffffff; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                        <div class="premium-icon-box me-3 d-flex align-items-center justify-content-center" style="width: 44px; height: 44px; min-width: 44px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #ffffff; box-shadow: 0 4px 10px rgba(245, 158, 11, 0.2); border-radius: 12px; font-size: 1.2rem;">
                            <i class="bi bi-journal-album"></i>
                        </div> 
                        <div>
                            <h2 class="fw-bold m-0 fs-6" style="font-family: 'Outfit', sans-serif; color: #1e293b; letter-spacing: 0.5px; text-transform: uppercase;">
                                <span th:text="${selectedProgram == 'DIP_IT' ? 'DIP IN IT' : (selectedProgram == 'DIP_CSE' ? 'DIP IN CSE' : (selectedProgram == 'DIP_CE' ? 'DIP IN CE' : (selectedProgram == 'DIP_ME' ? 'DIP IN ME' : 'MODULES')))}">MODULES</span> 
                            </h2>
                            <div class="mt-1" style="font-size: 0.75rem; font-family: 'Outfit', sans-serif; font-weight: 600;">
                                <span style="color: #64748b;">LEVEL <span th:text="${selectedLevel != null ? selectedLevel : '4'}">4</span></span>
                                <span th:if="${selectedSemester != null}" style="color: #cbd5e1; margin: 0 6px;">|</span>
                                <span th:if="${selectedSemester != null}" th:text="'SEMESTER ' + ${selectedSemester}" style="color: #f59e0b;">SEMESTER 1</span>
                            </div>
                        </div>
                    </div>"""

content = re.sub(old_header_pattern, new_header, content, flags=re.DOTALL)

with open("../src/main/resources/templates/dashboard.html", "w") as f:
    f.write(content)
