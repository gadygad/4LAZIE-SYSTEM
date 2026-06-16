import re

with open("src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Change MODULES / MASOMO to COURSE MODULES
content = content.replace("MODULES / MASOMO", "COURSE MODULES")

# Replace Semester 2 block
old_sem2_block = r'<!-- NTA Level 5 Semester 2 Modules -->\s*<div th:if="\$\{selectedLevel == 5 && selectedSemester == 2\}" class="row g-3 mb-5">.*?</div>\s*</div>\s*</div>'

new_sem2_block = """<!-- NTA Level 5 Semester 2 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 2}" class="row g-3 mb-5">
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='var(--primary)';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box icon-primary" style="width: 45px; height: 45px; border-radius: 12px;"><i class="bi bi-server fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">SERVER ADMINISTRATION</h6>
                                    <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill" style="font-size: 0.7rem;">ITT 05201</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 10 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: var(--bg-subtle); color: var(--primary);">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#f43f5e';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(244, 63, 94, 0.1); color: #f43f5e;"><i class="bi bi-globe fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">WEB DESIGNING</h6>
                                    <span class="badge" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e; border-radius: 50rem; font-size: 0.7rem;">ITT 05202</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 14 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#10b981';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); color: #10b981;"><i class="bi bi-cpu fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.85rem; line-height: 1.3;">COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE</h6>
                                    <span class="badge bg-success bg-opacity-10 text-success rounded-pill" style="font-size: 0.7rem;">ITT 05203</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 12 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#3b82f6';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(59, 130, 246, 0.1); color: #3b82f6;"><i class="bi bi-router fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">COMPUTER NETWORK</h6>
                                    <span class="badge" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-radius: 50rem; font-size: 0.7rem;">ITT 05204</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 15 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#8b5cf6';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(139, 92, 246, 0.1); color: #8b5cf6;"><i class="bi bi-motherboard fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.90rem;">MICROPROCESSOR AND MICROCONTROLLER</h6>
                                    <span class="badge" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border-radius: 50rem; font-size: 0.7rem;">ITT 05205</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 8 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#f59e0b';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); color: #f59e0b;"><i class="bi bi-diagram-2 fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">BASIC DATA COMMUNICATION</h6>
                                    <span class="badge bg-warning bg-opacity-10 text-warning rounded-pill" style="font-size: 0.7rem;">ITT 05206</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 7 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                </div>"""

content = re.sub(old_sem2_block, new_sem2_block, content, flags=re.DOTALL)

with open("src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)
