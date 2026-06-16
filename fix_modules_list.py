import re

with open("src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# 1. Update COURSE MODULES to be h2, underlined and smaller size (fs-5 or 1.5rem)
old_course_modules = r'<h4 class="fw-bold mb-4 mt-4 text-dark d-flex align-items-center text-decoration-underline" style="font-family: \'Outfit\', sans-serif;">\s*<div class="premium-icon-box icon-primary"><i class="bi bi-journal-album fs-6"></i></div> COURSE MODULES\s*</h4>'
new_course_modules = """<h2 class="fw-bold mb-4 mt-4 text-dark d-flex align-items-center text-decoration-underline" style="font-family: 'Outfit', sans-serif; font-size: 1.4rem;">
                    <div class="premium-icon-box icon-primary"><i class="bi bi-journal-album fs-5"></i></div> COURSE MODULES
                </h2>"""
content = re.sub(old_course_modules, new_course_modules, content)

# 2. Replace Sem 1 and Sem 2 blocks with a clean list-group
old_sem_blocks = r'<!-- NTA Level 5 Semester 1 Modules -->.*?<!-- NTA Level 5 Semester 2 Modules -->'
new_sem_blocks = """<!-- NTA Level 5 Semester 1 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 1}" class="mb-5">
                    <div class="list-group list-group-flush" style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-subtle); box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent; border-bottom: 1px solid var(--border-subtle);" onmouseover="this.style.borderLeftColor='var(--primary)'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-code-slash fs-5 me-3" style="color: var(--primary);"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">OBJECT ORIENTED PROGRAMMING (JAVA)</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05101</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">12 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>
                        
                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent; border-bottom: 1px solid var(--border-subtle);" onmouseover="this.style.borderLeftColor='#10b981'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-database fs-5 me-3" style="color: #10b981;"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">DATABASE MANAGEMENT SYSTEMS</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05102</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">8 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>
                        
                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent; border-bottom: 1px solid var(--border-subtle);" onmouseover="this.style.borderLeftColor='#f59e0b'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-diagram-3 fs-5 me-3" style="color: #f59e0b;"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">SYSTEM ANALYSIS & DESIGN</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05103</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">10 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent;" onmouseover="this.style.borderLeftColor='#8b5cf6'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-pc-display fs-5 me-3" style="color: #8b5cf6;"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">COMPUTER MAINTENANCE</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05104</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">6 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>
                    </div>
                </div>

                <!-- NTA Level 5 Semester 2 Modules -->"""
content = re.sub(old_sem_blocks, new_sem_blocks, content, flags=re.DOTALL)

old_sem2_block = r'<!-- NTA Level 5 Semester 2 Modules -->\s*<div th:if="\$\{selectedLevel == 5 && selectedSemester == 2\}" class="premium-grid mb-5">.*?</div>\s*<h3 class="fw-bold mb-4 mt-2 text-dark'
new_sem2_block = """<!-- NTA Level 5 Semester 2 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 2}" class="mb-5">
                    <div class="list-group list-group-flush" style="border-radius: 12px; overflow: hidden; border: 1px solid var(--border-subtle); box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent; border-bottom: 1px solid var(--border-subtle);" onmouseover="this.style.borderLeftColor='var(--primary)'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-server fs-5 me-3" style="color: var(--primary);"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">SERVER ADMINISTRATION</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05201</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">10 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent; border-bottom: 1px solid var(--border-subtle);" onmouseover="this.style.borderLeftColor='#f43f5e'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-globe fs-5 me-3" style="color: #f43f5e;"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">WEB DESIGNING</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05202</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">14 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent; border-bottom: 1px solid var(--border-subtle);" onmouseover="this.style.borderLeftColor='#10b981'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-cpu fs-5 me-3" style="color: #10b981;"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05203</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">12 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent; border-bottom: 1px solid var(--border-subtle);" onmouseover="this.style.borderLeftColor='#3b82f6'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-router fs-5 me-3" style="color: #3b82f6;"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">COMPUTER NETWORK</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05204</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">15 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent; border-bottom: 1px solid var(--border-subtle);" onmouseover="this.style.borderLeftColor='#8b5cf6'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-motherboard fs-5 me-3" style="color: #8b5cf6;"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">MICROPROCESSOR AND MICROCONTROLLER</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05205</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">8 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>

                        <a href="#" class="list-group-item list-group-item-action d-flex align-items-center justify-content-between py-3 px-4" style="transition: all 0.3s ease; border-left: 4px solid transparent;" onmouseover="this.style.borderLeftColor='#f59e0b'; this.style.backgroundColor='#f8fafc';" onmouseout="this.style.borderLeftColor='transparent'; this.style.backgroundColor='transparent';">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-diagram-2 fs-5 me-3" style="color: #f59e0b;"></i>
                                <div>
                                    <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">BASIC DATA COMMUNICATION</h6>
                                    <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05206</small>
                                </div>
                            </div>
                            <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">7 Notes <i class="bi bi-arrow-right ms-1"></i></span>
                        </a>
                    </div>
                </div>
                <h3 class="fw-bold mb-4 mt-2 text-dark'"""
content = re.sub(old_sem2_block, new_sem2_block, content, flags=re.DOTALL)

with open("src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)

