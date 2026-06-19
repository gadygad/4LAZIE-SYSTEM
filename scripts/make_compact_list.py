import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

old_sem1 = r'<!-- NTA Level 5 Semester 1 Modules -->\s*<div th:if="\$\{selectedLevel == 5 && selectedSemester == 1\}" class="row g-3 mb-5">.*?<!-- NTA Level 5 Semester 2 Modules -->'

new_sem1 = """<!-- NTA Level 5 Semester 1 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 1}" class="mb-5">
                    <div class="list-group shadow-sm" style="border-radius: 16px; overflow: hidden; border: 1px solid var(--border-subtle);">
                        
                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid var(--primary); transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box icon-primary" style="width: 36px; height: 36px; min-width: 36px;"><i class="bi bi-code-slash fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">OBJECT ORIENTED PROGRAMMING (JAVA)</h6>
                                    <small class="text-secondary fw-semibold">ITT 05101</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">12 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid #10b981; transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box" style="width: 36px; height: 36px; min-width: 36px; background: rgba(16, 185, 129, 0.1); color: #10b981;"><i class="bi bi-database fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">DATABASE MANAGEMENT SYSTEMS</h6>
                                    <small class="text-secondary fw-semibold">ITT 05102</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">8 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid #f59e0b; transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box" style="width: 36px; height: 36px; min-width: 36px; background: rgba(245, 158, 11, 0.1); color: #f59e0b;"><i class="bi bi-diagram-3 fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">SYSTEM ANALYSIS & DESIGN</h6>
                                    <small class="text-secondary fw-semibold">ITT 05103</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">10 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid #8b5cf6; transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box" style="width: 36px; height: 36px; min-width: 36px; background: rgba(139, 92, 246, 0.1); color: #8b5cf6;"><i class="bi bi-pc-display fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">COMPUTER MAINTENANCE</h6>
                                    <small class="text-secondary fw-semibold">ITT 05104</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">6 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>
                    </div>
                </div>

                <!-- NTA Level 5 Semester 2 Modules -->"""
content = re.sub(old_sem1, new_sem1, content, flags=re.DOTALL)

old_sem2 = r'<!-- NTA Level 5 Semester 2 Modules -->\s*<div th:if="\$\{selectedLevel == 5 && selectedSemester == 2\}" class="row g-3 mb-5">.*?</div>\s*</div>\s*</div>'
new_sem2 = """<!-- NTA Level 5 Semester 2 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 2}" class="mb-5">
                    <div class="list-group shadow-sm" style="border-radius: 16px; overflow: hidden; border: 1px solid var(--border-subtle);">
                        
                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid var(--primary); transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box icon-primary" style="width: 36px; height: 36px; min-width: 36px;"><i class="bi bi-server fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">SERVER ADMINISTRATION</h6>
                                    <small class="text-secondary fw-semibold">ITT 05201</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">10 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid #f43f5e; transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box" style="width: 36px; height: 36px; min-width: 36px; background: rgba(244, 63, 94, 0.1); color: #f43f5e;"><i class="bi bi-globe fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">WEB DESIGNING</h6>
                                    <small class="text-secondary fw-semibold">ITT 05202</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">14 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid #10b981; transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box" style="width: 36px; height: 36px; min-width: 36px; background: rgba(16, 185, 129, 0.1); color: #10b981;"><i class="bi bi-cpu fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE</h6>
                                    <small class="text-secondary fw-semibold">ITT 05203</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">12 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid #3b82f6; transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box" style="width: 36px; height: 36px; min-width: 36px; background: rgba(59, 130, 246, 0.1); color: #3b82f6;"><i class="bi bi-router fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">COMPUTER NETWORK</h6>
                                    <small class="text-secondary fw-semibold">ITT 05204</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">15 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid #8b5cf6; transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box" style="width: 36px; height: 36px; min-width: 36px; background: rgba(139, 92, 246, 0.1); color: #8b5cf6;"><i class="bi bi-motherboard fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">MICROPROCESSOR AND MICROCONTROLLER</h6>
                                    <small class="text-secondary fw-semibold">ITT 05205</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">8 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex flex-column flex-md-row justify-content-between align-items-md-center p-3" style="border-left: 4px solid #f59e0b; transition: all 0.2s;">
                            <div class="d-flex align-items-center mb-2 mb-md-0">
                                <div class="premium-icon-box" style="width: 36px; height: 36px; min-width: 36px; background: rgba(245, 158, 11, 0.1); color: #f59e0b;"><i class="bi bi-diagram-2 fs-6"></i></div>
                                <div class="ms-3">
                                    <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">BASIC DATA COMMUNICATION</h6>
                                    <small class="text-secondary fw-semibold">ITT 05206</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border py-2 px-3 fw-bold">7 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                        </a>
                    </div>
                </div>"""

content = re.sub(old_sem2, new_sem2, content, flags=re.DOTALL)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)
