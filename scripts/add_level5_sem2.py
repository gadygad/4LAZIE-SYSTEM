import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

html_block = """
                <!-- Empty State -->
                <div th:if="${#maps.isEmpty(groupedNotes) && !(selectedLevel == 5 && selectedSemester == 2 && selectedProgram == 'DIP_CSE')}" class="d-flex align-items-center p-3 mb-5" style="background: rgba(245, 158, 11, 0.05); border-radius: 12px; border: 1px dashed rgba(245, 158, 11, 0.3); box-shadow: 0 4px 10px rgba(0,0,0,0.02);">
                    <div class="rounded-circle d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px; background: rgba(245, 158, 11, 0.1);">
                        <i class="bi bi-folder-x text-warning fs-5"></i>
                    </div>
                    <div>
                        <h6 class="mb-1 fw-bold text-dark" style="font-size: 0.95rem;">No Modules Uploaded Yet</h6>
                        <p class="text-muted mb-0" style="font-size: 0.8rem;">Study materials for this level and semester will appear here once uploaded.</p>
                    </div>
                </div>

                <!-- NTA Level 5 Semester 2 (DIP_CSE) Premium UI Cards -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 2 && selectedProgram == 'DIP_CSE'}" class="mb-5">
                    <div class="row g-3">
                        <!-- Module 1 -->
                        <div class="col-md-6">
                            <div class="p-3 h-100 position-relative" style="background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 25px rgba(59, 130, 246, 0.15)'; this.style.borderColor='rgba(59, 130, 246, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.05)';" data-bs-toggle="collapse" data-bs-target="#mod1">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(59, 130, 246, 0.1); color: #3b82f6;"><i class="bi bi-hdd-network fs-5"></i></div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.9rem; font-family: 'Outfit', sans-serif;">Server Administration</h6>
                                        <span class="badge" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-radius: 50rem; font-size: 0.65rem;">CSE 05201</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3" style="border-color: rgba(0,0,0,0.05) !important;">
                                    <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 12 Notes</span>
                                    <span style="font-size: 0.75rem; color: #3b82f6; font-weight: 700;">OPEN <i class="bi bi-chevron-down ms-1"></i></span>
                                </div>
                            </div>
                            <div class="collapse mt-2" id="mod1">
                                <div class="p-3" style="background: #f8fafc; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05);">
                                    <div class="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded-3 shadow-sm" style="border: 1px solid rgba(0,0,0,0.03);">
                                        <div class="d-flex align-items-center"><i class="bi bi-file-pdf text-danger me-2"></i><span style="font-size: 0.75rem; font-weight: 600;">Server Config Basics.pdf</span></div>
                                        <a href="#" class="btn btn-sm btn-light py-0 px-2" style="font-size: 0.7rem;"><i class="bi bi-download"></i></a>
                                    </div>
                                    <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 shadow-sm" style="border: 1px solid rgba(0,0,0,0.03);">
                                        <div class="d-flex align-items-center"><i class="bi bi-file-pdf text-danger me-2"></i><span style="font-size: 0.75rem; font-weight: 600;">Active Directory Setup.pdf</span></div>
                                        <a href="#" class="btn btn-sm btn-light py-0 px-2" style="font-size: 0.7rem;"><i class="bi bi-download"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Module 2 -->
                        <div class="col-md-6">
                            <div class="p-3 h-100 position-relative" style="background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 25px rgba(244, 63, 94, 0.15)'; this.style.borderColor='rgba(244, 63, 94, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.05)';" data-bs-toggle="collapse" data-bs-target="#mod2">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(244, 63, 94, 0.1); color: #f43f5e;"><i class="bi bi-globe fs-5"></i></div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.9rem; font-family: 'Outfit', sans-serif;">Web Designing</h6>
                                        <span class="badge" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e; border-radius: 50rem; font-size: 0.65rem;">CSE 05202</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3" style="border-color: rgba(0,0,0,0.05) !important;">
                                    <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 8 Notes</span>
                                    <span style="font-size: 0.75rem; color: #f43f5e; font-weight: 700;">OPEN <i class="bi bi-chevron-down ms-1"></i></span>
                                </div>
                            </div>
                            <div class="collapse mt-2" id="mod2">
                                <div class="p-3" style="background: #f8fafc; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05);">
                                    <div class="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded-3 shadow-sm" style="border: 1px solid rgba(0,0,0,0.03);">
                                        <div class="d-flex align-items-center"><i class="bi bi-file-pdf text-danger me-2"></i><span style="font-size: 0.75rem; font-weight: 600;">HTML5 & CSS3 Masterclass.pdf</span></div>
                                        <a href="#" class="btn btn-sm btn-light py-0 px-2" style="font-size: 0.7rem;"><i class="bi bi-download"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Module 3 -->
                        <div class="col-md-6">
                            <div class="p-3 h-100 position-relative" style="background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 25px rgba(16, 185, 129, 0.15)'; this.style.borderColor='rgba(16, 185, 129, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.05)';" data-bs-toggle="collapse" data-bs-target="#mod3">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); color: #10b981;"><i class="bi bi-cpu fs-5"></i></div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.9rem; font-family: 'Outfit', sans-serif;">Computer Architecture & Assembly</h6>
                                        <span class="badge" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border-radius: 50rem; font-size: 0.65rem;">CSE 05203</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3" style="border-color: rgba(0,0,0,0.05) !important;">
                                    <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 10 Notes</span>
                                    <span style="font-size: 0.75rem; color: #10b981; font-weight: 700;">OPEN <i class="bi bi-chevron-down ms-1"></i></span>
                                </div>
                            </div>
                        </div>

                        <!-- Module 4 -->
                        <div class="col-md-6">
                            <div class="p-3 h-100 position-relative" style="background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 25px rgba(245, 158, 11, 0.15)'; this.style.borderColor='rgba(245, 158, 11, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.05)';" data-bs-toggle="collapse" data-bs-target="#mod4">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); color: #f59e0b;"><i class="bi bi-router fs-5"></i></div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.9rem; font-family: 'Outfit', sans-serif;">Computer Network</h6>
                                        <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; border-radius: 50rem; font-size: 0.65rem;">CSE 05204</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3" style="border-color: rgba(0,0,0,0.05) !important;">
                                    <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 15 Notes</span>
                                    <span style="font-size: 0.75rem; color: #f59e0b; font-weight: 700;">OPEN <i class="bi bi-chevron-down ms-1"></i></span>
                                </div>
                            </div>
                        </div>

                        <!-- Module 5 -->
                        <div class="col-md-6">
                            <div class="p-3 h-100 position-relative" style="background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 25px rgba(139, 92, 246, 0.15)'; this.style.borderColor='rgba(139, 92, 246, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.05)';" data-bs-toggle="collapse" data-bs-target="#mod5">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(139, 92, 246, 0.1); color: #8b5cf6;"><i class="bi bi-motherboard fs-5"></i></div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.9rem; font-family: 'Outfit', sans-serif;">Microprocessor & Microcontroller</h6>
                                        <span class="badge" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border-radius: 50rem; font-size: 0.65rem;">CSE 05205</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3" style="border-color: rgba(0,0,0,0.05) !important;">
                                    <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 7 Notes</span>
                                    <span style="font-size: 0.75rem; color: #8b5cf6; font-weight: 700;">OPEN <i class="bi bi-chevron-down ms-1"></i></span>
                                </div>
                            </div>
                        </div>

                        <!-- Module 6 -->
                        <div class="col-md-6">
                            <div class="p-3 h-100 position-relative" style="background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 25px rgba(14, 165, 233, 0.15)'; this.style.borderColor='rgba(14, 165, 233, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.05)';" data-bs-toggle="collapse" data-bs-target="#mod6">
                                <div class="d-flex align-items-center mb-3">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(14, 165, 233, 0.1); color: #0ea5e9;"><i class="bi bi-diagram-3 fs-5"></i></div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.9rem; font-family: 'Outfit', sans-serif;">Basic Data Communication</h6>
                                        <span class="badge" style="background: rgba(14, 165, 233, 0.1); color: #0ea5e9; border-radius: 50rem; font-size: 0.65rem;">CSE 05206</span>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between align-items-center mt-3 border-top pt-3" style="border-color: rgba(0,0,0,0.05) !important;">
                                    <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 9 Notes</span>
                                    <span style="font-size: 0.75rem; color: #0ea5e9; font-weight: 700;">OPEN <i class="bi bi-chevron-down ms-1"></i></span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- Dynamic Modules Section for other semesters -->
                <div th:if="${!(selectedLevel == 5 && selectedSemester == 2 && selectedProgram == 'DIP_CSE')}">
"""

content = re.sub(
    r'<!-- Empty State -->\s*<div th:if="\$\{#maps\.isEmpty\(groupedNotes\)\}" class="d-flex align-items-center p-3 mb-5".*?</p>\s*</div>\s*</div>',
    html_block, 
    content, 
    flags=re.DOTALL
)

content = content.replace(
    '<!-- Dynamic Modules Section -->\n                <div th:replace="~{fragments/sjuit_components :: notes_accordion}"></div>',
    '<!-- Dynamic Modules Section -->\n                    <div th:replace="~{fragments/sjuit_components :: notes_accordion}"></div>\n                </div>'
)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)

