import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Define the pattern to replace the ENTIRE block
pattern = r'<!-- NTA Level 5 Semester 2 \(DIP_CSE\) Premium UI Cards -->.*?<!-- Dynamic Modules Section for other semesters -->'

inner_layout = """<div class="p-3" style="background: #f8fafc; border-radius: 12px; border: 1px solid rgba(0,0,0,0.03);">
                                    
                                    <!-- NOTES (UNLOCKED) -->
                                    <div class="mb-3">
                                        <h6 class="fw-bold mb-2" style="font-size: 0.7rem; color: #64748b; letter-spacing: 0.8px;">NOTES</h6>
                                        <div class="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded-3 shadow-sm" style="border: 1px solid rgba(0,0,0,0.03); transition: all 0.2s ease;" onmouseover="this.style.borderColor='rgba(59, 130, 246, 0.3)'" onmouseout="this.style.borderColor='rgba(0,0,0,0.03)'">
                                            <div class="d-flex align-items-center"><i class="bi bi-file-earmark-pdf-fill text-danger me-2"></i><span style="font-size: 0.75rem; font-weight: 600; color: #1e293b;">Topic 1: Introduction Notes</span></div>
                                            <div class="d-flex gap-2">
                                                <a href="#" class="btn btn-sm btn-light py-0 px-2 text-primary fw-bold" style="font-size: 0.65rem; border-radius: 6px;"><i class="bi bi-eye-fill"></i> READ</a>
                                                <a href="#" class="btn btn-sm py-0 px-2 text-white fw-bold" style="font-size: 0.65rem; background: #111827; border-radius: 6px;"><i class="bi bi-cloud-download-fill"></i></a>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 shadow-sm" style="border: 1px solid rgba(0,0,0,0.03); transition: all 0.2s ease;" onmouseover="this.style.borderColor='rgba(59, 130, 246, 0.3)'" onmouseout="this.style.borderColor='rgba(0,0,0,0.03)'">
                                            <div class="d-flex align-items-center"><i class="bi bi-file-earmark-pdf-fill text-danger me-2"></i><span style="font-size: 0.75rem; font-weight: 600; color: #1e293b;">Topic 2: Detailed Coursework</span></div>
                                            <div class="d-flex gap-2">
                                                <a href="#" class="btn btn-sm btn-light py-0 px-2 text-primary fw-bold" style="font-size: 0.65rem; border-radius: 6px;"><i class="bi bi-eye-fill"></i> READ</a>
                                                <a href="#" class="btn btn-sm py-0 px-2 text-white fw-bold" style="font-size: 0.65rem; background: #111827; border-radius: 6px;"><i class="bi bi-cloud-download-fill"></i></a>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- ASSIGNMENT 1 (LOCKED) -->
                                    <div class="mb-3">
                                        <h6 class="fw-bold mb-2" style="font-size: 0.7rem; color: #64748b; letter-spacing: 0.8px;">ASSIGNMENT 1</h6>
                                        <a href="/register" class="text-decoration-none d-block">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 shadow-sm position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.5); opacity: 0.9; transition: all 0.2s ease;" onmouseover="this.style.opacity='1'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.opacity='0.9'; this.style.borderColor='rgba(245, 158, 11, 0.5)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center"><i class="bi bi-file-earmark-lock2-fill text-warning me-2"></i><span style="font-size: 0.75rem; font-weight: 600; color: #1e293b;">Assignment 1 Questions & Answers</span></div>
                                                <span class="badge bg-warning text-dark fw-bold" style="font-size: 0.6rem; padding: 4px 8px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>
                                    </div>

                                    <!-- CAT 1 (LOCKED) -->
                                    <div class="mb-3">
                                        <h6 class="fw-bold mb-2" style="font-size: 0.7rem; color: #64748b; letter-spacing: 0.8px;">CAT 1</h6>
                                        <a href="/register" class="text-decoration-none d-block">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 shadow-sm position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.5); opacity: 0.9; transition: all 0.2s ease;" onmouseover="this.style.opacity='1'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.opacity='0.9'; this.style.borderColor='rgba(245, 158, 11, 0.5)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center"><i class="bi bi-file-earmark-lock2-fill text-warning me-2"></i><span style="font-size: 0.75rem; font-weight: 600; color: #1e293b;">CAT 1 Past Paper + Marking Scheme</span></div>
                                                <span class="badge bg-warning text-dark fw-bold" style="font-size: 0.6rem; padding: 4px 8px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>
                                    </div>

                                    <!-- ASSIGNMENT 2 (LOCKED) -->
                                    <div class="mb-3">
                                        <h6 class="fw-bold mb-2" style="font-size: 0.7rem; color: #64748b; letter-spacing: 0.8px;">ASSIGNMENT 2</h6>
                                        <a href="/register" class="text-decoration-none d-block">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 shadow-sm position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.5); opacity: 0.9; transition: all 0.2s ease;" onmouseover="this.style.opacity='1'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.opacity='0.9'; this.style.borderColor='rgba(245, 158, 11, 0.5)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center"><i class="bi bi-file-earmark-lock2-fill text-warning me-2"></i><span style="font-size: 0.75rem; font-weight: 600; color: #1e293b;">Assignment 2 Guidelines</span></div>
                                                <span class="badge bg-warning text-dark fw-bold" style="font-size: 0.6rem; padding: 4px 8px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>
                                    </div>

                                    <!-- CAT 2 (LOCKED) -->
                                    <div class="mb-3">
                                        <h6 class="fw-bold mb-2" style="font-size: 0.7rem; color: #64748b; letter-spacing: 0.8px;">CAT 2</h6>
                                        <a href="/register" class="text-decoration-none d-block">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 shadow-sm position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.5); opacity: 0.9; transition: all 0.2s ease;" onmouseover="this.style.opacity='1'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.opacity='0.9'; this.style.borderColor='rgba(245, 158, 11, 0.5)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center"><i class="bi bi-file-earmark-lock2-fill text-warning me-2"></i><span style="font-size: 0.75rem; font-weight: 600; color: #1e293b;">CAT 2 Revision Material</span></div>
                                                <span class="badge bg-warning text-dark fw-bold" style="font-size: 0.6rem; padding: 4px 8px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>
                                    </div>

                                    <!-- UNIVERSITY EXAMINATION (UE) (LOCKED) -->
                                    <div class="mb-3">
                                        <h6 class="fw-bold mb-2" style="font-size: 0.7rem; color: #64748b; letter-spacing: 0.8px;">UNIVERSITY EXAMINATION (UE)</h6>
                                        <a href="/register" class="text-decoration-none d-block">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 shadow-sm position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.5); opacity: 0.9; transition: all 0.2s ease;" onmouseover="this.style.opacity='1'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.opacity='0.9'; this.style.borderColor='rgba(245, 158, 11, 0.5)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center"><i class="bi bi-file-earmark-lock2-fill text-warning me-2"></i><span style="font-size: 0.75rem; font-weight: 600; color: #1e293b;">Final UE Past Papers & Answers</span></div>
                                                <span class="badge bg-warning text-dark fw-bold" style="font-size: 0.6rem; padding: 4px 8px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>
                                    </div>

                                    <!-- OTHER YEARS (LOCKED) -->
                                    <div class="mb-1">
                                        <h6 class="fw-bold mb-2" style="font-size: 0.7rem; color: #64748b; letter-spacing: 0.8px;">OTHER YEARS (PAST PAPERS, ASSIGNMENTS, CATS, UE)</h6>
                                        <a href="/register" class="text-decoration-none d-block">
                                            <div class="d-flex align-items-center justify-content-between p-2 rounded-3 shadow-sm position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(245, 158, 11, 0.1)); border: 1px solid rgba(245, 158, 11, 0.2); transition: all 0.2s ease;" onmouseover="this.style.boxShadow='0 4px 12px rgba(245, 158, 11, 0.2)';" onmouseout="this.style.boxShadow='0 2px 4px rgba(0,0,0,0.02)';">
                                                <div class="d-flex align-items-center"><i class="bi bi-archive-fill text-warning me-2"></i><span style="font-size: 0.75rem; font-weight: 600; color: #d97706;">Explore Previous Years Materials</span></div>
                                                <span class="badge bg-warning text-dark fw-bold" style="font-size: 0.6rem; padding: 4px 8px;"><i class="bi bi-gem"></i> PREMIUM</span>
                                            </div>
                                        </a>
                                    </div>
                                    
                                </div>"""

modules_data = [
    ("mod1", "SERVER ADMINISTRATION", "bi-hdd-network", "59, 130, 246", "#3b82f6"),
    ("mod2", "WEB DESIGNING", "bi-globe", "244, 63, 94", "#f43f5e"),
    ("mod3", "COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE", "bi-cpu", "16, 185, 129", "#10b981"),
    ("mod4", "COMPUTER NETWORK", "bi-router", "245, 158, 11", "#f59e0b"),
    ("mod5", "MICROPROCESSOR AND MICROCONTROLLER", "bi-motherboard", "139, 92, 246", "#8b5cf6"),
    ("mod6", "BASIC DATA COMMUNICATION", "bi-diagram-3", "14, 165, 233", "#0ea5e9")
]

modules_html = ""
for mod_id, title, icon, rgb, hexcolor in modules_data:
    modules_html += f"""
                        <!-- {title} -->
                        <div class="px-3 py-2 position-relative bg-white" style="border-radius: 14px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.03);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 30px rgba({rgb}, 0.15)'; this.style.borderColor='rgba({rgb}, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#{mod_id}">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; border-radius: 10px; background: rgba({rgb}, 0.1); color: {hexcolor};">
                                        <i class="{icon}" style="font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bolder mb-1" style="font-size: 0.85rem; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">{title}</h6>
                                        <div class="d-flex align-items-center mt-1">
                                            <span class="text-secondary fw-medium" style="font-size: 0.7rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> Multiple Resources</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center ms-3">
                                    <span class="btn btn-sm rounded-pill fw-bold text-nowrap" style="background: rgba({rgb}, 0.08); color: {hexcolor}; font-size: 0.7rem; padding: 6px 14px; transition: all 0.3s ease;" onmouseover="this.style.background='{hexcolor}'; this.style.color='#fff';" onmouseout="this.style.background='rgba({rgb}, 0.08)'; this.style.color='{hexcolor}';">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="collapse mt-3" id="{mod_id}">
                                {inner_layout}
                            </div>
                        </div>"""

new_block = f"""<!-- NTA Level 5 Semester 2 (DIP_CSE) Premium UI Cards -->
                <div th:if="${{selectedLevel == 5 && selectedSemester == 2 && selectedProgram == 'DIP_CSE'}}" class="mb-5">
                    <div class="d-flex flex-column gap-3">{modules_html}
                    </div>
                </div>
                <!-- Dynamic Modules Section for other semesters -->"""

content = re.sub(pattern, new_block, content, flags=re.DOTALL)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)

