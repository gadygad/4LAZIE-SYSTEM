import sys

# File 1: notes.html
try:
    with open('../src/main/resources/templates/notes.html', 'r') as f:
        content1 = f.read()
    
    old_header_notes = """<div class="d-flex align-items-center">
                    <div class="premium-icon-box me-3 d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; min-width: 48px; background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(168, 85, 247, 0.15)); color: #818cf8; border: 1px solid rgba(168, 85, 247, 0.3); box-shadow: 0 0 20px rgba(168, 85, 247, 0.15); border-radius: 14px;">
                        <i class="bi bi-folder-symlink-fill fs-4"></i>
                    </div>
                    <h3 class="brand-font fw-bold m-0 fs-3" style="background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.5px;">
                        <span th:text="${selectedLevel != null ? 'Level ' + selectedLevel : 'All Levels'}">Level 4</span>
                        <span th:if="${selectedSemester != null}" th:text="' - Semester ' + ${selectedSemester}" style="background: linear-gradient(135deg, #60a5fa, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"> - Semester 1</span>
                        <span th:if="${selectedCategory != null}" th:text="' (' + ${selectedCategory} + 's)'" style="font-size: 0.9em; opacity: 0.8;"> (NOTES)</span>
                        <span> Materials</span>
                    </h3>
                </div>"""
                
    new_header_notes = """<div class="d-flex align-items-center p-3 rounded-4" style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
                    <div class="premium-icon-box me-3 d-flex align-items-center justify-content-center" style="width: 54px; height: 54px; min-width: 54px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: #ffffff; box-shadow: 0 8px 20px rgba(139, 92, 246, 0.3); border-radius: 16px; font-size: 1.5rem;">
                        <i class="bi bi-stack"></i>
                    </div>
                    <h3 class="brand-font fw-bold m-0 fs-3" style="color: #f8fafc; letter-spacing: -0.5px;">
                        <span th:text="${selectedLevel != null ? 'Level ' + selectedLevel : 'All Levels'}">Level 4</span>
                        <span th:if="${selectedSemester != null}" th:text="' - Semester ' + ${selectedSemester}" style="color: #a78bfa;"> - Semester 1</span>
                        <span th:if="${selectedCategory != null}" th:text="' (' + ${selectedCategory} + 's)'" style="font-size: 0.8em; color: #94a3b8; font-weight: normal;"> (NOTES)</span>
                        <span style="color: #60a5fa; font-weight: 300;"> Materials</span>
                    </h3>
                </div>"""
                
    if old_header_notes in content1:
        content1 = content1.replace(old_header_notes, new_header_notes)
        with open('../src/main/resources/templates/notes.html', 'w') as f:
            f.write(content1)
        print("Updated notes.html header")
except FileNotFoundError:
    pass

# File 2: guest_notes.html
try:
    with open('../src/main/resources/templates/guest_notes.html', 'r') as f:
        content2 = f.read()
        
    old_header_guest = """<h2 class="fw-bold m-0 d-flex align-items-center" style="font-family: 'Outfit', sans-serif; font-size: 1.1rem; color: #f59e0b; letter-spacing: 1px; text-transform: uppercase; text-decoration: underline; text-underline-offset: 8px; text-decoration-thickness: 3px; text-decoration-color: rgba(245, 158, 11, 0.4);">
                        <div class="premium-icon-box" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; border-radius: 12px; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; margin-right: 12px;"><i class="bi bi-journal-album fs-6"></i></div> 
                        <span th:text="${selectedProgram == 'DIP_IT' ? 'DIP IN IT' : (selectedProgram == 'DIP_CSE' ? 'DIP IN CSE' : (selectedProgram == 'DIP_CE' ? 'DIP IN CE' : (selectedProgram == 'DIP_ME' ? 'DIP IN ME' : 'MODULES')))}">MODULES</span> &nbsp;- LEVEL <span th:text="${selectedLevel != null ? selectedLevel : '4'}" class="ms-1">4</span>
                    </h2>"""
                    
    new_header_guest = """<div class="d-flex align-items-center p-3 rounded-4" style="background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
                        <div class="premium-icon-box me-3 d-flex align-items-center justify-content-center" style="width: 54px; height: 54px; min-width: 54px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #ffffff; box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3); border-radius: 16px; font-size: 1.5rem;">
                            <i class="bi bi-journal-album"></i>
                        </div> 
                        <h2 class="fw-bold m-0 fs-4" style="font-family: 'Outfit', sans-serif; color: #f8fafc; letter-spacing: 0.5px; text-transform: uppercase;">
                            <span th:text="${selectedProgram == 'DIP_IT' ? 'DIP IN IT' : (selectedProgram == 'DIP_CSE' ? 'DIP IN CSE' : (selectedProgram == 'DIP_CE' ? 'DIP IN CE' : (selectedProgram == 'DIP_ME' ? 'DIP IN ME' : 'MODULES')))}">MODULES</span> 
                            <span style="color: #fcd34d;"> - LEVEL <span th:text="${selectedLevel != null ? selectedLevel : '4'}">4</span></span>
                            <span th:if="${selectedSemester != null}" th:text="' | SEMESTER ' + ${selectedSemester}" style="color: #fb923c; font-weight: 300;"> | SEMESTER 1</span>
                        </h2>
                    </div>"""
                    
    if old_header_guest in content2:
        content2 = content2.replace(old_header_guest, new_header_guest)
        with open('../src/main/resources/templates/guest_notes.html', 'w') as f:
            f.write(content2)
        print("Updated guest_notes.html header")
except FileNotFoundError:
    pass
