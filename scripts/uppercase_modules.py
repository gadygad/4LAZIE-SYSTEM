import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Define the old block regex to capture the exact structure
old_block_regex = r'<!-- NTA Level 5 Semester 2 \(DIP_CSE\) Premium UI Cards -->.*?</div>\s*<!-- Dynamic Modules Section for other semesters -->'

new_block = """<!-- NTA Level 5 Semester 2 (DIP_CSE) Premium UI Cards -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 2 && selectedProgram == 'DIP_CSE'}" class="mb-5">
                    <div class="d-flex flex-column gap-3">
                        
                        <!-- Module 1 -->
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.03);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 30px rgba(59, 130, 246, 0.15)'; this.style.borderColor='rgba(59, 130, 246, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod1">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 52px; height: 52px; border-radius: 14px; background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
                                        <i class="bi bi-hdd-network fs-4"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bolder mb-1" style="font-size: 1.05rem; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">SERVER ADMINISTRATION</h6>
                                        <div class="d-flex align-items-center mt-1">
                                            <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 12 Notes Available</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="btn btn-sm rounded-pill fw-bold" style="background: rgba(59, 130, 246, 0.08); color: #3b82f6; font-size: 0.75rem; padding: 8px 20px; transition: all 0.3s ease;" onmouseover="this.style.background='#3b82f6'; this.style.color='#fff';" onmouseout="this.style.background='rgba(59, 130, 246, 0.08)'; this.style.color='#3b82f6';">
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
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.03);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 30px rgba(244, 63, 94, 0.15)'; this.style.borderColor='rgba(244, 63, 94, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod2">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 52px; height: 52px; border-radius: 14px; background: rgba(244, 63, 94, 0.1); color: #f43f5e;">
                                        <i class="bi bi-globe fs-4"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bolder mb-1" style="font-size: 1.05rem; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">WEB DESIGNING</h6>
                                        <div class="d-flex align-items-center mt-1">
                                            <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 8 Notes Available</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="btn btn-sm rounded-pill fw-bold" style="background: rgba(244, 63, 94, 0.08); color: #f43f5e; font-size: 0.75rem; padding: 8px 20px; transition: all 0.3s ease;" onmouseover="this.style.background='#f43f5e'; this.style.color='#fff';" onmouseout="this.style.background='rgba(244, 63, 94, 0.08)'; this.style.color='#f43f5e';">
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
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.03);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 30px rgba(16, 185, 129, 0.15)'; this.style.borderColor='rgba(16, 185, 129, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod3">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 52px; height: 52px; border-radius: 14px; background: rgba(16, 185, 129, 0.1); color: #10b981;">
                                        <i class="bi bi-cpu fs-4"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bolder mb-1" style="font-size: 1.05rem; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE</h6>
                                        <div class="d-flex align-items-center mt-1">
                                            <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 10 Notes Available</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center ms-3">
                                    <span class="btn btn-sm rounded-pill fw-bold text-nowrap" style="background: rgba(16, 185, 129, 0.08); color: #10b981; font-size: 0.75rem; padding: 8px 20px; transition: all 0.3s ease;" onmouseover="this.style.background='#10b981'; this.style.color='#fff';" onmouseout="this.style.background='rgba(16, 185, 129, 0.08)'; this.style.color='#10b981';">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Module 4 -->
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.03);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 30px rgba(245, 158, 11, 0.15)'; this.style.borderColor='rgba(245, 158, 11, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod4">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 52px; height: 52px; border-radius: 14px; background: rgba(245, 158, 11, 0.1); color: #f59e0b;">
                                        <i class="bi bi-router fs-4"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bolder mb-1" style="font-size: 1.05rem; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">COMPUTER NETWORK</h6>
                                        <div class="d-flex align-items-center mt-1">
                                            <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 15 Notes Available</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <span class="btn btn-sm rounded-pill fw-bold" style="background: rgba(245, 158, 11, 0.08); color: #f59e0b; font-size: 0.75rem; padding: 8px 20px; transition: all 0.3s ease;" onmouseover="this.style.background='#f59e0b'; this.style.color='#fff';" onmouseout="this.style.background='rgba(245, 158, 11, 0.08)'; this.style.color='#f59e0b';">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Module 5 -->
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.03);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 30px rgba(139, 92, 246, 0.15)'; this.style.borderColor='rgba(139, 92, 246, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod5">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 52px; height: 52px; border-radius: 14px; background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">
                                        <i class="bi bi-motherboard fs-4"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bolder mb-1" style="font-size: 1.05rem; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">MICROPROCESSOR AND MICROCONTROLLER</h6>
                                        <div class="d-flex align-items-center mt-1">
                                            <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 7 Notes Available</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center ms-3">
                                    <span class="btn btn-sm rounded-pill fw-bold text-nowrap" style="background: rgba(139, 92, 246, 0.08); color: #8b5cf6; font-size: 0.75rem; padding: 8px 20px; transition: all 0.3s ease;" onmouseover="this.style.background='#8b5cf6'; this.style.color='#fff';" onmouseout="this.style.background='rgba(139, 92, 246, 0.08)'; this.style.color='#8b5cf6';">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Module 6 -->
                        <div class="p-3 position-relative bg-white" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.03);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 30px rgba(14, 165, 233, 0.15)'; this.style.borderColor='rgba(14, 165, 233, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#mod6">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 52px; height: 52px; border-radius: 14px; background: rgba(14, 165, 233, 0.1); color: #0ea5e9;">
                                        <i class="bi bi-diagram-3 fs-4"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bolder mb-1" style="font-size: 1.05rem; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">BASIC DATA COMMUNICATION</h6>
                                        <div class="d-flex align-items-center mt-1">
                                            <span class="text-secondary fw-medium" style="font-size: 0.75rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> 9 Notes Available</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center ms-3">
                                    <span class="btn btn-sm rounded-pill fw-bold text-nowrap" style="background: rgba(14, 165, 233, 0.08); color: #0ea5e9; font-size: 0.75rem; padding: 8px 20px; transition: all 0.3s ease;" onmouseover="this.style.background='#0ea5e9'; this.style.color='#fff';" onmouseout="this.style.background='rgba(14, 165, 233, 0.08)'; this.style.color='#0ea5e9';">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <!-- Dynamic Modules Section for other semesters -->"""

content = re.sub(old_block_regex, new_block, content, flags=re.DOTALL)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)

