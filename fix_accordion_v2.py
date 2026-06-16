import glob

files = ['src/main/resources/templates/guest_notes.html', 'src/main/resources/templates/dashboard.html']

accordion_html = """<!-- Dynamic Modules Section -->
                <div th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="accordion accordion-flush mb-5" id="modulesAccordion" style="border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 15px rgba(0,0,0,0.03); background: #ffffff; overflow: hidden;">
                    <div th:each="entry, stat : ${groupedNotes}" class="accordion-item" style="border-bottom: 1px solid rgba(0,0,0,0.05); background: transparent; border-top: none;">
                        <h2 class="accordion-header" th:id="'heading' + ${stat.index}">
                            <button class="accordion-button collapsed py-3 px-4 fw-bold" type="button" data-bs-toggle="collapse" th:data-bs-target="'#collapse' + ${stat.index}" aria-expanded="false" th:aria-controls="'collapse' + ${stat.index}" style="background: transparent; box-shadow: none;">
                                <div class="d-flex align-items-center justify-content-between w-100 pe-3">
                                    <div class="d-flex align-items-center">
                                        <i class="bi bi-folder-fill me-3 fs-4" style="color: #111827;"></i>
                                        <div class="d-flex flex-column">
                                            <span class="text-uppercase" style="font-size: 0.95rem; color: #6b7280; font-weight: 700;" th:text="${moduleCodes[entry.key] != null ? moduleCodes[entry.key] : entry.key}">CSE 05206</span>
                                            <span style="font-size: 0.75rem; color: #9ca3af; font-weight: 500;" th:if="${moduleCodes[entry.key] != null}" th:text="${entry.key}">Software Engineering</span>
                                        </div>
                                    </div>
                                    <span class="badge rounded-pill d-flex align-items-center" style="background: #111827; color: #ffffff; font-size: 0.75rem; padding: 8px 14px;">
                                        <span th:text="${#lists.size(entry.value)} + ' Notes'">1 Notes</span>
                                    </span>
                                </div>
                            </button>
                        </h2>
                        <div th:id="'collapse' + ${stat.index}" class="accordion-collapse collapse" th:aria-labelledby="'heading' + ${stat.index}" data-bs-parent="#modulesAccordion">
                            <div class="accordion-body p-0">
                                <div class="list-group list-group-flush">
                                    <div th:each="note : ${entry.value}" class="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom" style="background: #f8fafc; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#ffffff';" onmouseout="this.style.backgroundColor='#f8fafc';">
                                        <div class="d-flex align-items-center pe-3">
                                            <div class="icon-box rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 36px; height: 36px; min-width: 36px; background: rgba(37,99,235,0.1);">
                                                <i class="bi bi-file-earmark-text-fill fs-6" style="color: #3b82f6;"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-1 fw-bold text-uppercase" style="font-size: 0.85rem; color: #1e293b; line-height: 1.3;" th:text="${note.title}">NOTE TITLE</h6>
                                                <div class="d-flex align-items-center gap-2 flex-wrap mt-1">
                                                    <span class="badge" style="background: rgba(100,116,139,0.1); color: #64748b; font-size: 0.6rem; font-weight: 600; border: 1px solid rgba(100,116,139,0.2);" th:text="${note.category}">Category</span>
                                                    <span class="badge" style="background: rgba(37,99,235,0.08); color: #2563eb; font-size: 0.6rem; font-weight: 600; border: 1px solid rgba(37,99,235,0.15);" th:text="'Year: ' + ${#temporals.format(note.uploadDate, 'yyyy')}">Year: 2026</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-2">
                                            <a th:if="${session.user != null}" th:href="@{'/view/' + ${note.id}}" class="btn btn-sm btn-light rounded-pill text-primary fw-bold d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; border: 1px solid rgba(37, 99, 235, 0.2); transition: all 0.2s;">
                                                <i class="bi bi-eye-fill me-1"></i> Read
                                            </a>
                                            <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; background: #111827; color: white; border: none; transition: all 0.2s;">
                                                <i class="bi bi-cloud-download-fill me-1"></i> Download
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>"""

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # guest_notes.html replacement
    if 'id="modulesAccordion"' in content:
        # we are in guest notes, replace the existing accordion
        start_idx = content.find('<div th:if="${groupedNotes != null')
        end_idx = content.find('</div>\n\n<div th:if="${notes == null')
        if end_idx == -1:
            end_idx = content.find('</div>\n\n                <div th:if="${notes == null')
        
        if start_idx != -1 and end_idx != -1:
            content = content[:start_idx] + accordion_html + content[end_idx:]
            
    # dashboard.html replacement
    elif '<div class="mb-5" th:if="${not #maps.isEmpty(groupedNotes)}">' in content:
        start_idx = content.find('<div class="mb-5" th:if="${not #maps.isEmpty(groupedNotes)}">')
        end_idx = content.find('<!-- Empty State -->')
        if start_idx != -1 and end_idx != -1:
            content = content[:start_idx] + accordion_html + "\n                " + content[end_idx:]

    with open(file, 'w') as f:
        f.write(content)
    print(f"Updated {file}")
