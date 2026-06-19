import re

with open('../src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# Replace College Name link
old_college = """                <a href="#stJosephPrograms" data-bs-toggle="collapse" style="display:flex; justify-content:space-between; align-items:center; gap:12px; text-decoration:none; color:rgba(255,255,255,0.9); transition:all 0.3s ease; margin-bottom: 20px; font-family:'Outfit',sans-serif;" onmouseover="this.style.color='#fff';" onmouseout="this.style.color='rgba(255,255,255,0.9)';">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <i class="bi bi-building" style="font-size:1.4rem; color: #3b82f6;"></i>
                        <span style="font-size:0.9rem; font-weight:600; line-height:1.4;" th:text="${currentInstitution != null ? currentInstitution.name : 'St. Joseph College of Engineering and Technology'}">St. Joseph College of Engineering and Technology</span>
                    </div>
                    <i class="bi bi-chevron-down" style="font-size: 0.8rem;"></i>
                </a>"""

new_college = """                <a href="#stJosephPrograms" data-bs-toggle="collapse" class="premium-sidebar-badge text-decoration-none">
                    <div class="d-flex align-items-center flex-grow-1" style="gap: 12px; min-width: 0;">
                        <div class="icon-container flex-shrink-0">
                            <i class="bi bi-building"></i>
                        </div>
                        <span class="text-white text-truncate" style="font-size: 0.85rem; font-weight: 700; line-height: 1.3;" title="St. Joseph College of Engineering and Technology" th:text="${currentInstitution != null ? currentInstitution.name : 'St. Joseph College of Engineering and Technology'}">St. Joseph College of Engineering and Technology</span>
                    </div>
                    <i class="bi bi-chevron-down flex-shrink-0" style="color: rgba(255,255,255,0.5); font-size: 0.8rem; transition: transform 0.3s;"></i>
                </a>"""

content = content.replace(old_college, new_college)

# Now, we need to convert inline th:style to th:classappend on the parent div.
# Pattern:
# <div class="sidebar-hover-item(\s+mt-2)*"(.*?)>
#    <div class="sidebar-hover-btn" th:style="\$\{selectedProgram == '([^']+)' \? 'background: [^']+;' : ''\}">

def repl(match):
    mt = match.group(1) or ""
    others = match.group(2)
    prog = match.group(3)
    return f'<div class="sidebar-hover-item{mt}" th:classappend="${{selectedProgram == \'{prog}\' ? \'active\' : \'\'}}"{others}>\n                        <div class="sidebar-hover-btn">'

pattern = r'<div class="sidebar-hover-item(\s+mt-2)?"(.*?onmouseleave="hideFlyout\(this\)".*?)>\s*<div class="sidebar-hover-btn" th:style="\$\{selectedProgram == \'([^\']+)\' \? \'[^\']+\' : \'\'\}">'
content = re.sub(pattern, repl, content)

with open('../src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)

print("Done replacing.")
