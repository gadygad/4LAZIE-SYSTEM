import sys

files = ['src/main/resources/templates/notes.html', 'src/main/resources/templates/guest_notes.html']

old_header = """<h3 class="brand-font fw-bold m-0 fs-4">
                    <span th:text="${selectedLevel != null ? 'Level ' + selectedLevel : 'All Levels'}">Level 4</span>
                    <span th:if="${selectedSemester != null}" th:text="' - Semester ' + ${selectedSemester}"> - Semester 1</span>
                    <span th:if="${selectedCategory != null}" th:text="' (' + ${selectedCategory} + 's)'"> (NOTES)</span>
                    <span> Materials</span>
                </h3>"""

new_header = """<div class="d-flex align-items-center">
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

for file_path in files:
    try:
        with open(file_path, 'r') as f:
            content = f.read()

        if old_header in content:
            content = content.replace(old_header, new_header)
            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Updated header in {file_path}")
        else:
            print(f"Header not found in {file_path}")
            
    except FileNotFoundError:
        pass
