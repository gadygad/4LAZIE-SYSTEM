import sys
import re

file_path = '../src/main/resources/templates/guest_notes.html'
try:
    with open(file_path, 'r') as f:
        content = f.read()
        
    # 1. Add dashboard.css if missing
    if 'dashboard.css' not in content:
        content = content.replace(
            '<link rel="stylesheet" th:href="@{/css/premium-theme.css}">', 
            '<link rel="stylesheet" th:href="@{/css/premium-theme.css}">\n    <link rel="stylesheet" th:href="@{/css/dashboard.css}">'
        )
        
    # 2. Replace the list-group with row g-4
    list_pattern = re.compile(r'<div class="list-group mb-5" style=".*?">.*?</div>\s*</div>', re.DOTALL)
    
    # Wait, the structure in guest_notes is:
    # <div class="list-group mb-5" ...>
    #    <div th:each... list-group-item ...> ... </div>
    #    <div th:if... text-center p-4 ...> ... </div>
    # </div>
    
    grid_replacement = """<div class="row g-4 mb-5">
                    <div class="col-md-6" th:each="note : ${notes}" th:if="${note.category == 'Note'}">
                        <div class="note-card premium-card" style="background: rgba(15, 23, 42, 0.6) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; padding: 1.25rem; border-radius: 12px;">
                            <div>
                                <div class="d-flex gap-2 flex-wrap">
                                    <span class="badge" style="background: rgba(37,99,235,0.1); color: #3b82f6; border: 1px solid rgba(37,99,235,0.2); padding: 0.3rem 0.6rem; font-size: 0.7rem;" th:text="'Level ' + ${note.levelNo}">Level 4</span>
                                    <span class="badge" style="background: rgba(168,85,247,0.1); color: #a855f7; border: 1px solid rgba(168,85,247,0.2); padding: 0.3rem 0.6rem; font-size: 0.7rem;" th:text="'Semester ' + ${note.semesterNo}">Semester 1</span>
                                    <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.2); padding: 0.3rem 0.6rem; font-size: 0.7rem;" th:text="${note.category}">Note</span>
                                </div>
                                <h4 class="note-title text-truncate mt-3" style="color: #f8fafc; font-size: 1.1rem; font-weight: 600;" th:text="${note.title}">JAVA NOTES</h4>
                            </div>
        
                            <div class="w-100 mt-4">
                                <div class="d-flex justify-content-between align-items-center pt-3 border-top" style="border-color: rgba(255, 255, 255, 0.05) !important;">
                                    <span class="text-secondary small"><i class="bi bi-calendar3 me-1"></i><span th:text="${#temporals.format(note.uploadDate, 'yyyy-MM-dd')}">2026-06-12</span></span>
                                    <div class="d-flex gap-2">
                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm rounded-pill fw-bold premium-download-btn" style="padding: 4px 12px; font-size: 0.65rem; background: rgba(255,255,255,0.1); color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);">
                                            <i class="bi bi-cloud-download-fill"></i> Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div th:if="${notes == null || #lists.isEmpty(notes.?[category == 'Note'])}" class="col-12 text-center p-4" style="background: rgba(15, 23, 42, 0.6); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
                        <i class="bi bi-journal-x text-secondary fs-1 mb-2 d-block"></i>
                        <p class="text-secondary fw-semibold mb-0">No free notes available for this section yet.</p>
                    </div>
                </div>"""

    # We need to find the exact list-group block
    start_str = '<div class="list-group mb-5"'
    
    # Let's read lines and find start and end
    lines = content.split('\n')
    start_idx = -1
    end_idx = -1
    
    for i, line in enumerate(lines):
        if start_str in line:
            start_idx = i
            break
            
    if start_idx != -1:
        # find the closing div of list-group
        div_count = 0
        for i in range(start_idx, len(lines)):
            line = lines[i]
            if '<div' in line:
                div_count += line.count('<div')
            if '</div' in line:
                div_count -= line.count('</div')
                if div_count == 0:
                    end_idx = i
                    break
                    
        if end_idx != -1:
            lines = lines[:start_idx] + [grid_replacement] + lines[end_idx+1:]
            content = '\n'.join(lines)
            
            with open(file_path, 'w') as f:
                f.write(content)
            print("Successfully updated guest_notes.html layout.")
        else:
            print("Could not find end of list-group block")
    else:
        print("Could not find start of list-group block")
            
except Exception as e:
    print(f"Error: {e}")
