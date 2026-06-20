import re

with open('src/main/resources/templates/admin_dashboard.html', 'r') as f:
    content = f.read()

# 1. Add CSS
css_addition = """
        /* ----- PREMIUM TABS & TABLE ----- */
        .premium-tabs .nav-link {
            color: var(--text-muted);
            font-weight: 700;
            border-radius: 12px;
            padding: 12px 24px;
            margin-right: 10px;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.5);
            border: 1px solid rgba(0,0,0,0.05);
        }
        .premium-tabs .nav-link.active {
            background: linear-gradient(135deg, #D4AF37 0%, #B8860B 100%);
            color: #ffffff;
            box-shadow: 0 8px 20px rgba(184, 134, 11, 0.3);
            border: none;
            transform: translateY(-2px);
        }
        
        .premium-table-wrapper {
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.03);
            border: 1px solid rgba(197, 160, 89, 0.2);
            overflow: hidden;
        }
        .premium-table {
            width: 100%;
            border-collapse: collapse;
        }
        .premium-table th {
            background: #f8fafc;
            color: #64748b;
            font-weight: 700;
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            padding: 16px 20px;
            border-bottom: 2px solid rgba(197, 160, 89, 0.1);
        }
        .premium-table td {
            padding: 16px 20px;
            color: #0f172a;
            font-size: 0.95rem;
            font-weight: 500;
            border-bottom: 1px solid #f1f5f9;
            vertical-align: middle;
        }
        .premium-table tr:last-child td {
            border-bottom: none;
        }
        .premium-table tr:hover td {
            background-color: #fcfdfd;
        }
        
        .btn-delete {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border: none;
            border-radius: 8px;
            padding: 6px 12px;
            font-size: 0.85rem;
            font-weight: 700;
            transition: all 0.2s ease;
        }
        .btn-delete:hover {
            background: #ef4444;
            color: #ffffff;
            box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
            transform: scale(1.05);
        }

        /* ----- ALERTS ----- */"""

content = content.replace("/* ----- ALERTS ----- */", css_addition)

# 2. Add Tabs wrapper
# Find the start of the upload form section
start_marker = "<!-- UPLOAD FORM SECTION -->"
end_marker = "</main>"

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

upload_form_content = content[start_idx:end_idx]

tab_structure_start = """
        <!-- PREMIUM TABS -->
        <ul class="nav nav-pills mb-4 premium-tabs" id="adminTabs" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="upload-tab" data-bs-toggle="pill" data-bs-target="#upload" type="button" role="tab" aria-controls="upload" aria-selected="true">
                    <i class="bi bi-cloud-arrow-up-fill me-2"></i>Upload Material
                </button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="manage-tab" data-bs-toggle="pill" data-bs-target="#manage" type="button" role="tab" aria-controls="manage" aria-selected="false">
                    <i class="bi bi-collection-fill me-2"></i>Manage Materials
                </button>
            </li>
        </ul>

        <div class="tab-content" id="adminTabsContent">
            <!-- UPLOAD TAB -->
            <div class="tab-pane fade show active" id="upload" role="tabpanel" aria-labelledby="upload-tab">
"""

tab_structure_end = """
            </div>
            
            <!-- MANAGE TAB -->
            <div class="tab-pane fade" id="manage" role="tabpanel" aria-labelledby="manage-tab">
                <div class="premium-table-wrapper">
                    <div class="p-4 d-flex justify-content-between align-items-center border-bottom" style="border-color: rgba(197, 160, 89, 0.1) !important;">
                        <h4 class="m-0" style="color: #996515; font-weight: 800; font-size: 1.2rem;"><i class="bi bi-folder2-open me-2"></i> All Uploaded Materials</h4>
                    </div>
                    <div class="table-responsive">
                        <table class="premium-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title & Module</th>
                                    <th>Category</th>
                                    <th>Program / Lvl / Sem</th>
                                    <th>Date</th>
                                    <th class="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr th:each="note : ${notes}">
                                    <td th:text="'#' + ${note.id}">#1</td>
                                    <td>
                                        <div style="font-weight: 700; color: #1e293b;" th:text="${note.title}">Title</div>
                                        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;">
                                            <span th:if="${note.unitNumber != null}" class="badge bg-warning text-dark me-1" th:text="'UNIT ' + ${note.unitNumber}">UNIT 1</span>
                                            <span th:text="${note.moduleName}">Module</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="badge" style="background: rgba(197, 160, 89, 0.1); color: #B8860B;" th:text="${note.category}">Note</span>
                                    </td>
                                    <td>
                                        <div th:text="${note.programType}">DIP_IT</div>
                                        <div style="font-size: 0.8rem; color: #94a3b8; margin-top: 2px;" th:text="'Level ' + ${note.levelNo} + ' • Sem ' + ${note.semesterNo}">Lvl 4 • Sem 1</div>
                                    </td>
                                    <td th:text="${#temporals.format(note.uploadDate, 'dd MMM yyyy')}">Date</td>
                                    <td class="text-end">
                                        <button class="btn-delete" th:onclick="'openDeleteModal(' + ${note.id} + ', \\\'' + ${#strings.replace(note.title, '''', '\\''')} + '\\\')'">
                                            <i class="bi bi-trash-fill"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                                <tr th:if="${#lists.isEmpty(notes)}">
                                    <td colspan="6" class="text-center py-5" style="color: #94a3b8;">
                                        <i class="bi bi-inbox fs-2 d-block mb-2"></i>
                                        No materials uploaded yet.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="border-radius: 16px; border: none; box-shadow: 0 20px 50px rgba(0,0,0,0.1);">
                    <div class="modal-body text-center p-5">
                        <div style="width: 80px; height: 80px; background: #FEF2F2; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px;">
                            <i class="bi bi-exclamation-triangle-fill" style="font-size: 2.5rem; color: #EF4444;"></i>
                        </div>
                        <h4 class="fw-bold mb-3" style="color: #0f172a;">Delete Material?</h4>
                        <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 30px;">
                            Are you sure you want to delete <strong id="deleteMaterialName" style="color: #0f172a;"></strong>? This action cannot be undone and will permanently remove it from the system.
                        </p>
                        <form id="deleteForm" method="post" action="">
                            <input type="hidden" th:name="${_csrf.parameterName}" th:value="${_csrf.token}" th:if="${_csrf != null}"/>
                            <div class="d-flex gap-3 justify-content-center">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal" style="border-radius: 10px; padding: 10px 24px; font-weight: 600;">Cancel</button>
                                <button type="submit" class="btn btn-danger" style="border-radius: 10px; padding: 10px 24px; font-weight: 600; box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);">Yes, Delete</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <script>
            function openDeleteModal(id, title) {
                document.getElementById('deleteMaterialName').textContent = title;
                document.getElementById('deleteForm').action = '/admin/delete-note/' + id;
                const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
                modal.show();
            }
        </script>
"""

new_content = content[:start_idx] + tab_structure_start + upload_form_content + tab_structure_end + content[end_idx:]

with open('src/main/resources/templates/admin_dashboard.html', 'w') as f:
    f.write(new_content)
print("Updated admin_dashboard.html successfully.")
