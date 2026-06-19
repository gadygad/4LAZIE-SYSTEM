import sys
import re

filepath = '../src/main/resources/templates/guest_notes.html'
try:
    with open(filepath, 'r') as f:
        content = f.read()

    list_replacement = """<div class="list-group mb-5" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 15px rgba(0,0,0,0.2); overflow: hidden;">
    <div th:each="note : ${notes}" class="list-group-item d-flex justify-content-between align-items-center py-3 px-4" style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: background-color 0.2s; border-left: 3px solid transparent;" onmouseover="this.style.backgroundColor='rgba(255,255,255,0.05)'; this.style.borderLeftColor='#3b82f6';" onmouseout="this.style.backgroundColor='transparent'; this.style.borderLeftColor='transparent';">
        <div class="d-flex align-items-center pe-3">
            <div class="icon-box rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px; min-width: 40px; background: rgba(37,99,235,0.1);">
                <i class="bi bi-file-earmark-text-fill fs-5" style="color: #3b82f6;"></i>
            </div>
            <div>
                <h6 class="mb-1 fw-bold text-uppercase" style="font-size: 0.95rem; color: #f59e0b; line-height: 1.3;" th:text="${note.title}">NOTE TITLE</h6>
                <div class="d-flex align-items-center gap-2 flex-wrap mt-1">
                    <span class="badge" style="background: rgba(100,116,139,0.1); color: #94a3b8; font-size: 0.65rem; font-weight: 600; border: 1px solid rgba(100,116,139,0.2);" th:text="${note.category}">Category</span>
                    <span class="badge" style="background: rgba(37,99,235,0.08); color: #60a5fa; font-size: 0.65rem; font-weight: 600; border: 1px solid rgba(37,99,235,0.15);" th:text="'Level: ' + ${note.levelNo}">Level</span>
                    <span class="badge" style="background: rgba(168,85,247,0.1); color: #c084fc; font-size: 0.65rem; font-weight: 600; border: 1px solid rgba(168,85,247,0.2);" th:text="'Semester ' + ${note.semesterNo}">Semester 1</span>
                    <span class="text-secondary small ms-2" style="font-size: 0.7rem;"><i class="bi bi-calendar3 me-1"></i><span th:text="${#temporals.format(note.uploadDate, 'yyyy-MM-dd')}">2026-06-12</span></span>
                </div>
            </div>
        </div>
        <div class="d-flex gap-2">
            <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm rounded-pill fw-bold shadow-sm premium-download-btn d-flex align-items-center justify-content-center" style="padding: 6px 16px; font-size: 0.7rem; transition: all 0.2s;">
                <i class="bi bi-cloud-download-fill me-1"></i> Download
            </a>
        </div>
    </div>
</div>

<div th:if="${notes == null || #lists.isEmpty(notes)}" class="text-center p-5 mb-5" style="background: rgba(15, 23, 42, 0.6); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
    <i class="bi bi-journal-x text-secondary fs-1 mb-3 d-block"></i>
    <p class="text-secondary fw-semibold mb-0" style="font-size: 1.1rem;">No materials found for this selection yet.</p>
</div>"""

    if '<div class="row g-4 mb-5">' in content:
        content = re.sub(r'<div class="row g-4 mb-5">.*?<p class="text-secondary fw-semibold mb-0">No free notes available for this section yet.</p>\s*</div>\s*</div>', list_replacement, content, flags=re.DOTALL)
        
        with open(filepath, 'w') as f:
            f.write(content)
        print("Restored list layout in guest_notes.html")
    else:
        print("Could not find grid layout in guest_notes.html")
except Exception as e:
    print(f"Error: {e}")
