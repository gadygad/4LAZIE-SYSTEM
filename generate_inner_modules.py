import re

with open("src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

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

# Replace the inner collapse content for all 6 modules.
for i in range(1, 7):
    # Match the collapse div correctly using regex
    # The current inner content is `<div class="p-3" style="background: #f8fafc; border-radius: 12px; border: 1px solid rgba(0,0,0,0.03);"> ... </div>` inside `<div class="collapse mt-3" id="modX">`.
    pattern = rf'<div class="collapse mt-3" id="mod{i}">\s*<div class="p-3" style="background: #f8fafc; border-radius: 12px; border: 1px solid rgba\(0,0,0,0.03\);">.*?</div>\s*</div>'
    replacement = f'<div class="collapse mt-3" id="mod{i}">\n                                {inner_layout}\n                            </div>'
    content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open("src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)

