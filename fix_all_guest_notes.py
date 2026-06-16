import re

with open("src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Find where "<!-- NTA Level 5 Semester 1 Modules -->" starts
start_idx = content.find("<!-- NTA Level 5 Semester 1 Modules -->")

# Find where "<h3 class=\"fw-bold mb-4 mt-2 text-dark" starts (which is "RECENT UPLOADS" right after the modules)
end_idx = content.find("<h3 class=\"fw-bold mb-4 mt-2 text-dark'''")
if end_idx == -1:
    end_idx = content.find("<h3 class=\"fw-bold mb-4 mt-2 text-dark")

if start_idx != -1 and end_idx != -1:
    before = content[:start_idx]
    after = content[end_idx:]
    
    new_block = """<!-- Dynamic Modules Section -->
                <div class="mb-5" th:if="${not #maps.isEmpty(groupedNotes)}">
                    <div class="list-group list-group-flush" style="border-radius: 12px; border: 1px solid var(--border-subtle); box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                        
                        <div class="list-group-item p-0 module-item" style="border-bottom: 1px solid var(--border-subtle);" th:each="entry, iterStat : ${groupedNotes}">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='var(--primary)';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-folder-fill fs-5 me-3" style="color: var(--primary);"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;" th:text="${entry.key}">MODULE NAME</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;" th:text="${moduleCodes[entry.key] != null ? moduleCodes[entry.key] : ''}">MODULE CODE</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">
                                    <span th:text="${#lists.size(entry.value)} + ' Notes'">0 Notes</span>
                                    <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i>
                                </span>
                            </div>
                            <div class="module-dropdown" th:if="${not #lists.isEmpty(entry.value)}">
                                <div th:each="note : ${entry.value}" class="unit-item d-flex justify-content-between align-items-center">
                                    <span class="fw-semibold">
                                        <i class="bi bi-file-earmark-text me-2 text-primary" th:if="${note.category == 'Note' || note.category == null}"></i>
                                        <i class="bi bi-file-earmark-pdf me-2 text-danger" th:if="${note.category == 'Past Paper'}"></i>
                                        <i class="bi bi-camera-video me-2 text-warning" th:if="${note.category == 'Video Tutorial'}"></i>
                                        <i class="bi bi-clipboard-check me-2 text-success" th:if="${note.category == 'Assignment'}"></i>
                                        <span th:text="${note.title}">Note Title</span>
                                    </span>
                                    <div class="d-flex gap-2">
                                        <a th:href="@{'/view/' + ${note.id}}" class="btn btn-sm btn-light rounded-pill px-3 text-primary fw-bold" style="font-size: 0.8rem; border: 1px solid rgba(37, 99, 235, 0.2); transition: all 0.2s;">
                                            <i class="bi bi-eye-fill me-1"></i> Read
                                        </a>
                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm btn-primary rounded-pill px-3 fw-bold shadow-sm" style="font-size: 0.8rem; transition: all 0.2s;">
                                            <i class="bi bi-cloud-download-fill me-1"></i> Download
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div class="module-dropdown" th:if="${#lists.isEmpty(entry.value)}">
                                <div class="unit-item text-muted">No notes available for this module yet.</div>
                            </div>
                        </div>

                    </div>
                </div>
                
                <!-- Empty State -->
                <div th:if="${#maps.isEmpty(groupedNotes)}" class="text-center py-5 bg-light mb-5" style="border-radius: 12px; border: 1px dashed var(--border-subtle);">
                    <i class="bi bi-folder-x text-muted" style="font-size: 4rem;"></i>
                    <h4 class="mt-3 fw-bold text-secondary">No notes available</h4>
                    <p class="text-muted">Study materials for this level and semester have not been uploaded yet.</p>
                </div>
                
                """
    
    with open("src/main/resources/templates/guest_notes.html", "w") as f:
        f.write(before + new_block + after)
        print("Success")
else:
    print("Failed to find boundaries")

