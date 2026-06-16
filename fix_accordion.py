import re
import os

guest_file = 'src/main/resources/templates/guest_notes.html'
components_file = 'src/main/resources/templates/fragments/sjuit_components.html'

with open(guest_file, 'r') as f:
    content = f.read()

# The Accordion starts at: <!-- MODULE NAMES HEADING -->
acc_start = '<!-- MODULE NAMES HEADING -->'
# Ends at: </div> <!-- Close col-lg-7 -->
# We need to grab everything from acc_start to just before </div> <!-- Close col-lg-7 -->
acc_end = '            </div> <!-- Close col-lg-7 -->'

s_idx = content.find(acc_start)
e_idx = content.find(acc_end)
if s_idx == -1 or e_idx == -1:
    print("Could not find accordion boundaries.")
    exit(1)
    
accordion_html = content[s_idx:e_idx]

# We need to replace the list-group inside accordion_html with the unit-grouped version
# Find the list-group
lg_start = '<div class="list-group list-group-flush">'
lg_end = '</div>\n                            </div>\n                        </div>\n                    </div>\n                </div>'
# wait, the list-group ends before the accordion-body ends.
lg_end_tag = '</div>\n                            </div>'

# Let's just do a regex or string replace on the innermost loop
inner_loop_start = '<div class="list-group list-group-flush">'
inner_loop_end = '                                </div>\n                            </div>\n                        </div>'

# We'll replace it with a new list-group structure
new_list_group = """<div class="list-group list-group-flush">
                                    <!-- UNIT 1 TO 5 -->
                                    <th:block th:each="unitNum : ${#numbers.sequence(1, 5)}">
                                        <div th:with="unitNotes=${entry.value.?[unitNumber == __${unitNum}__]}">
                                            <div th:if="${not #lists.isEmpty(unitNotes)}">
                                                <div class="px-4 py-2" style="background: rgba(245, 158, 11, 0.05); border-bottom: 1px solid rgba(245, 158, 11, 0.1);">
                                                    <h6 class="m-0 fw-bold" style="color: #d97706; font-size: 0.8rem; letter-spacing: 1px;">UNIT <span th:text="${unitNum}"></span></h6>
                                                </div>
                                                <div th:each="note : ${unitNotes}" class="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom" style="background: #f8fafc; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#ffffff';" onmouseout="this.style.backgroundColor='#f8fafc';">
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
                                                        <a th:href="@{'/view/' + ${note.id}}" class="btn btn-sm btn-light rounded-pill text-primary fw-bold d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; border: 1px solid rgba(37, 99, 235, 0.2); transition: all 0.2s;">
                                                            <i class="bi bi-eye-fill me-1"></i> Read
                                                        </a>
                                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; background: #111827; color: white; border: none; transition: all 0.2s;">
                                                            <i class="bi bi-cloud-download-fill me-1"></i> Download
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </th:block>

                                    <!-- OTHER MATERIALS (No Unit) -->
                                    <div th:with="otherNotes=${entry.value.?[unitNumber == null]}">
                                        <div th:if="${not #lists.isEmpty(otherNotes)}">
                                            <div class="px-4 py-2" style="background: rgba(100, 116, 139, 0.05); border-bottom: 1px solid rgba(100, 116, 139, 0.1);">
                                                <h6 class="m-0 fw-bold" style="color: #475569; font-size: 0.8rem; letter-spacing: 1px;">OTHER MATERIALS</h6>
                                            </div>
                                            <div th:each="note : ${otherNotes}" class="list-group-item d-flex justify-content-between align-items-center py-3 px-4 border-0 border-bottom" style="background: #f8fafc; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#ffffff';" onmouseout="this.style.backgroundColor='#f8fafc';">
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
                                                    <a th:href="@{'/view/' + ${note.id}}" class="btn btn-sm btn-light rounded-pill text-primary fw-bold d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; border: 1px solid rgba(37, 99, 235, 0.2); transition: all 0.2s;">
                                                        <i class="bi bi-eye-fill me-1"></i> Read
                                                    </a>
                                                    <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; background: #111827; color: white; border: none; transition: all 0.2s;">
                                                        <i class="bi bi-cloud-download-fill me-1"></i> Download
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>"""

old_list_group_pattern = re.compile(r'<div class="list-group list-group-flush">.*?</div>\s*</div>\s*</div>', re.DOTALL)
# Actually, replacing the exact string is safer.
old_lg_str = """<div class="list-group list-group-flush">
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
                                            <a th:href="@{'/view/' + ${note.id}}" class="btn btn-sm btn-light rounded-pill text-primary fw-bold d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; border: 1px solid rgba(37, 99, 235, 0.2); transition: all 0.2s;">
                                                <i class="bi bi-eye-fill me-1"></i> Read
                                            </a>
                                            <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; background: #111827; color: white; border: none; transition: all 0.2s;">
                                                <i class="bi bi-cloud-download-fill me-1"></i> Download
                                            </a>
                                        </div>
                                    </div>
                                </div>"""

if old_lg_str in accordion_html:
    accordion_html = accordion_html.replace(old_lg_str, new_list_group)
else:
    print("Could not find list group inside accordion HTML")
    exit(1)

accordion_fragment = f'<div th:fragment="notes_accordion">\n{accordion_html}\n</div>'

# Now append this new fragment to sjuit_components.html
with open(components_file, 'r') as f:
    comps = f.read()
    
# Insert before </body>
comps = comps.replace('</body>', f'{accordion_fragment}\n</body>')

with open(components_file, 'w') as f:
    f.write(comps)
    
# Now replace the accordion in guest_notes.html with the fragment include
new_guest = content.replace(content[s_idx:e_idx], '<div th:replace="~{fragments/sjuit_components :: notes_accordion}"></div>\n\n')
with open(guest_file, 'w') as f:
    f.write(new_guest)

# And replace in dashboard.html
dash_file = 'src/main/resources/templates/dashboard.html'
with open(dash_file, 'r') as f:
    dash_content = f.read()

# dashboard accordion is the same, let's find it.
d_s_idx = dash_content.find(acc_start)
d_e_idx = dash_content.find(acc_end)
if d_s_idx != -1 and d_e_idx != -1:
    new_dash = dash_content.replace(dash_content[d_s_idx:d_e_idx], '<div th:replace="~{fragments/sjuit_components :: notes_accordion}"></div>\n\n')
    with open(dash_file, 'w') as f:
        f.write(new_dash)
    print("Successfully refactored accordion to fragments.")
else:
    print("Could not find accordion in dashboard.html")

