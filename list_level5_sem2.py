import re

with open("src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# We need to replace the entire <!-- NTA Level 5 Semester 2 (DIP_CSE) Premium UI Cards --> block.
old_block_regex = r'<!-- NTA Level 5 Semester 2 \(DIP_CSE\) Premium UI Cards -->.*?</div>\s*<!-- Dynamic Modules Section for other semesters -->'

new_block = """<!-- NTA Level 5 Semester 2 (DIP_CSE) Premium UI Cards -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 2 && selectedProgram == 'DIP_CSE'}" class="mb-5">
                    <div class="d-flex flex-column gap-3">
                        
                        <!-- Module 1 -->
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(59, 130, 246, 0.12)'; this.style.borderColor='rgba(59, 130, 246, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod1">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; border-radius: 12px; background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
                                        <i class="bi bi-hdd-network fs-5"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1" style="font-size: 0.95rem; color: #1e293b; font-family: 'Outfit', sans-serif;">Server Administration</h6>
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="badge" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-radius: 50rem; font-size: 0.65rem; padding: 4px 8px;">CSE 05201</span>
                                            <span class="text-secondary fw-medium" style="font-size: 0.7rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 12 Notes</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="btn btn-sm rounded-pill fw-bold" style="background: rgba(59, 130, 246, 0.08); color: #3b82f6; font-size: 0.7rem; padding: 6px 16px;">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="collapse mt-3" id="mod1">
                                <div class="p-3" style="background: #f8fafc; border-radius: 12px; border: 1px solid rgba(0,0,0,0.03);">
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
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(244, 63, 94, 0.12)'; this.style.borderColor='rgba(244, 63, 94, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod2">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; border-radius: 12px; background: rgba(244, 63, 94, 0.1); color: #f43f5e;">
                                        <i class="bi bi-globe fs-5"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1" style="font-size: 0.95rem; color: #1e293b; font-family: 'Outfit', sans-serif;">Web Designing</h6>
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="badge" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e; border-radius: 50rem; font-size: 0.65rem; padding: 4px 8px;">CSE 05202</span>
                                            <span class="text-secondary fw-medium" style="font-size: 0.7rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 8 Notes</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="btn btn-sm rounded-pill fw-bold" style="background: rgba(244, 63, 94, 0.08); color: #f43f5e; font-size: 0.7rem; padding: 6px 16px;">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="collapse mt-3" id="mod2">
                                <div class="p-3" style="background: #f8fafc; border-radius: 12px; border: 1px solid rgba(0,0,0,0.03);">
                                    <div class="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded-3 shadow-sm" style="border: 1px solid rgba(0,0,0,0.03);">
                                        <div class="d-flex align-items-center"><i class="bi bi-file-pdf text-danger me-2"></i><span style="font-size: 0.75rem; font-weight: 600;">HTML5 & CSS3 Masterclass.pdf</span></div>
                                        <a href="#" class="btn btn-sm btn-light py-0 px-2" style="font-size: 0.7rem;"><i class="bi bi-download"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Module 3 -->
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(16, 185, 129, 0.12)'; this.style.borderColor='rgba(16, 185, 129, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod3">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); color: #10b981;">
                                        <i class="bi bi-cpu fs-5"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1" style="font-size: 0.95rem; color: #1e293b; font-family: 'Outfit', sans-serif;">Computer Architecture & Assembly</h6>
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="badge" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border-radius: 50rem; font-size: 0.65rem; padding: 4px 8px;">CSE 05203</span>
                                            <span class="text-secondary fw-medium" style="font-size: 0.7rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 10 Notes</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="btn btn-sm rounded-pill fw-bold" style="background: rgba(16, 185, 129, 0.08); color: #10b981; font-size: 0.7rem; padding: 6px 16px;">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Module 4 -->
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(245, 158, 11, 0.12)'; this.style.borderColor='rgba(245, 158, 11, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod4">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
                                        <i class="bi bi-router fs-5"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1" style="font-size: 0.95rem; color: #1e293b; font-family: 'Outfit', sans-serif;">Computer Network</h6>
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; border-radius: 50rem; font-size: 0.65rem; padding: 4px 8px;">CSE 05204</span>
                                            <span class="text-secondary fw-medium" style="font-size: 0.7rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 15 Notes</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="btn btn-sm rounded-pill fw-bold" style="background: rgba(245, 158, 11, 0.08); color: #f59e0b; font-size: 0.7rem; padding: 6px 16px;">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Module 5 -->
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(139, 92, 246, 0.12)'; this.style.borderColor='rgba(139, 92, 246, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod5">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; border-radius: 12px; background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">
                                        <i class="bi bi-motherboard fs-5"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1" style="font-size: 0.95rem; color: #1e293b; font-family: 'Outfit', sans-serif;">Microprocessor & Microcontroller</h6>
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="badge" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border-radius: 50rem; font-size: 0.65rem; padding: 4px 8px;">CSE 05205</span>
                                            <span class="text-secondary fw-medium" style="font-size: 0.7rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 7 Notes</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="btn btn-sm rounded-pill fw-bold" style="background: rgba(139, 92, 246, 0.08); color: #8b5cf6; font-size: 0.7rem; padding: 6px 16px;">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Module 6 -->
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 2px 10px rgba(0,0,0,0.02);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(14, 165, 233, 0.12)'; this.style.borderColor='rgba(14, 165, 233, 0.3)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 10px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod6">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 48px; height: 48px; border-radius: 12px; background: rgba(14, 165, 233, 0.1); color: #0ea5e9;">
                                        <i class="bi bi-diagram-3 fs-5"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bold mb-1" style="font-size: 0.95rem; color: #1e293b; font-family: 'Outfit', sans-serif;">Basic Data Communication</h6>
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="badge" style="background: rgba(14, 165, 233, 0.1); color: #0ea5e9; border-radius: 50rem; font-size: 0.65rem; padding: 4px 8px;">CSE 05206</span>
                                            <span class="text-secondary fw-medium" style="font-size: 0.7rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 9 Notes</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="btn btn-sm rounded-pill fw-bold" style="background: rgba(14, 165, 233, 0.08); color: #0ea5e9; font-size: 0.7rem; padding: 6px 16px;">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- Dynamic Modules Section for other semesters -->"""

content = re.sub(old_block_regex, new_block, content, flags=re.DOTALL)

with open("src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)

