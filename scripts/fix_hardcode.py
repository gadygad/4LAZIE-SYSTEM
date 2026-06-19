import os

file_path = '../src/main/resources/templates/fragments/sjuit_components.html'
with open(file_path, 'r') as f:
    content = f.read()

# I will replace the unit loop with hardcoded blocks
start_marker = '<!-- UNIT 1 TO 5 -->'
end_marker = '<!-- OTHER MATERIALS (No Unit) -->'

s_idx = content.find(start_marker)
e_idx = content.find(end_marker)

if s_idx != -1 and e_idx != -1:
    new_blocks = ""
    for i in range(1, 6):
        block = f"""
                                    <th:block th:with="unitNotes=${{entry.value.?[unitNumber == {i}]}}">
                                        <div th:if="${{not #lists.isEmpty(unitNotes)}}">
                                            <div class="px-4 py-2" style="background: rgba(245, 158, 11, 0.05); border-bottom: 1px solid rgba(245, 158, 11, 0.1);">
                                                <h6 class="m-0 fw-bold" style="color: #d97706; font-size: 0.8rem; letter-spacing: 1px;">UNIT {i}</h6>
                                            </div>
                                            <div th:each="note : ${{unitNotes}}" class="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom" style="background: #f8fafc; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#ffffff';" onmouseout="this.style.backgroundColor='#f8fafc';">
                                                <div class="d-flex align-items-center pe-3">
                                                    <div class="icon-box rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 36px; height: 36px; min-width: 36px; background: rgba(37,99,235,0.1);">
                                                        <i class="bi bi-file-earmark-text-fill fs-6" style="color: #3b82f6;"></i>
                                                    </div>
                                                    <div>
                                                        <h6 class="mb-1 fw-bold text-uppercase" style="font-size: 0.85rem; color: #1e293b; line-height: 1.3;" th:text="${{note.title}}">NOTE TITLE</h6>
                                                        <div class="d-flex align-items-center gap-2 flex-wrap mt-1">
                                                            <span class="badge" style="background: rgba(100,116,139,0.1); color: #64748b; font-size: 0.6rem; font-weight: 600; border: 1px solid rgba(100,116,139,0.2);" th:text="${{note.category}}">Category</span>
                                                            <span class="badge" style="background: rgba(37,99,235,0.08); color: #2563eb; font-size: 0.6rem; font-weight: 600; border: 1px solid rgba(37,99,235,0.15);" th:text="'Year: ' + ${{currentYear}}">Year</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="d-flex gap-2">
                                                    <a th:href="@{{'/view/' + ${{note.id}}}}" class="btn btn-sm btn-light rounded-pill text-primary fw-bold d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; border: 1px solid rgba(37, 99, 235, 0.2); transition: all 0.2s;">
                                                        <i class="bi bi-eye-fill me-1"></i> Read
                                                    </a>
                                                    <a th:href="@{{'/download/' + ${{note.id}}}}" class="btn btn-sm rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; background: #111827; color: white; border: none; transition: all 0.2s;">
                                                        <i class="bi bi-cloud-download-fill me-1"></i> Download
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </th:block>
"""
        new_blocks += block
        
    new_content = content[:s_idx] + start_marker + '\n' + new_blocks + '\n                                    ' + content[e_idx:]
    
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("Replaced successfully with hardcoded blocks")
else:
    print("Markers not found")
