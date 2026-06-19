import sys

file_path = '../src/main/resources/templates/notes.html'
try:
    with open(file_path, 'r') as f:
        content = f.read()
        
    empty_state_logic = """
<div th:if="${notes == null || #lists.isEmpty(notes)}" class="text-center p-5 mb-5" style="background: rgba(15, 23, 42, 0.6); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);">
    <i class="bi bi-journal-x text-secondary fs-1 mb-3 d-block"></i>
    <p class="text-secondary fw-semibold mb-0" style="font-size: 1.1rem;">No materials found for this selection yet.</p>
    <a th:href="@{${selectedLevel != null} ? '/semesters?level=' + selectedLevel : '/'}" class="btn btn-outline-light mt-3 px-4 rounded-pill">Select Another Semester</a>
</div>
"""
    
    if '<div class="list-group mb-5"' in content:
        content = content.replace('</div>\n        </div>\n\n    </div>', '</div>\n' + empty_state_logic + '\n        </div>\n\n    </div>')
        with open(file_path, 'w') as f:
            f.write(content)
        print("Fixed empty state in notes.html")
except Exception as e:
    print(e)
