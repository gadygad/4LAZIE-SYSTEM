import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# 1. Update COURSE MODULES to be h4, underlined and smaller
old_course_modules = r'<h2 class="fw-bold mb-4 mt-4 text-dark d-flex align-items-center" style="font-family: \'Outfit\', sans-serif;">\s*<div class="premium-icon-box icon-primary"><i class="bi bi-journal-album fs-5"></i></div> COURSE MODULES\s*</h2>'
new_course_modules = """<h4 class="fw-bold mb-4 mt-4 text-dark d-flex align-items-center text-decoration-underline" style="font-family: 'Outfit', sans-serif;">
                    <div class="premium-icon-box icon-primary"><i class="bi bi-journal-album fs-6"></i></div> COURSE MODULES
                </h4>"""

content = re.sub(old_course_modules, new_course_modules, content)

# 2. Replace Sem 1 and Sem 2 blocks
old_sem_blocks = r'<!-- NTA Level 5 Semester 1 Modules -->.*?<!-- NTA Level 5 Semester 2 Modules -->'
new_sem_blocks = """<!-- NTA Level 5 Semester 1 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 1}" class="premium-grid mb-5">
                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-code-slash me-2" style="color: var(--primary);"></i> OBJECT ORIENTED PROGRAMMING (JAVA)
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05101</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">12 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>
                    
                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-database me-2" style="color: #10b981;"></i> DATABASE MANAGEMENT SYSTEMS
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05102</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">8 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>
                    
                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-diagram-3 me-2" style="color: #f59e0b;"></i> SYSTEM ANALYSIS & DESIGN
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05103</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">10 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>

                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-pc-display me-2" style="color: #8b5cf6;"></i> COMPUTER MAINTENANCE
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05104</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">6 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>
                </div>

                <!-- NTA Level 5 Semester 2 Modules -->"""
content = re.sub(old_sem_blocks, new_sem_blocks, content, flags=re.DOTALL)

old_sem2_block = r'<!-- NTA Level 5 Semester 2 Modules -->\s*<div th:if="\$\{selectedLevel == 5 && selectedSemester == 2\}".*?</div>\s*</div>\s*<h3 class="fw-bold mb-4 mt-2 text-dark'
new_sem2_block = """<!-- NTA Level 5 Semester 2 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 2}" class="premium-grid mb-5">
                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-server me-2" style="color: var(--primary);"></i> SERVER ADMINISTRATION
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05201</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">10 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>

                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-globe me-2" style="color: #f43f5e;"></i> WEB DESIGNING
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05202</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">14 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>

                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-cpu me-2" style="color: #10b981;"></i> COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05203</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">12 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>

                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-router me-2" style="color: #3b82f6;"></i> COMPUTER NETWORK
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05204</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">15 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>

                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-motherboard me-2" style="color: #8b5cf6;"></i> MICROPROCESSOR AND MICROCONTROLLER
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05205</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">8 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>

                    <a href="#" class="premium-item">
                        <span class="icon-text text-dark text-uppercase fw-bold" style="font-size: 0.95rem;">
                            <i class="bi bi-diagram-2 me-2" style="color: #f59e0b;"></i> BASIC DATA COMMUNICATION
                            <br><small class="text-secondary fw-semibold ms-4" style="font-size: 0.75rem;">ITT 05206</small>
                        </span>
                        <span class="arrow text-secondary badge bg-light rounded-pill border py-2 px-3 fw-bold" style="font-size:0.8rem;">7 Notes <i class="bi bi-chevron-right ms-1"></i></span>
                    </a>
                </div>
                <h3 class="fw-bold mb-4 mt-2 text-dark'"""

content = re.sub(old_sem2_block, new_sem2_block, content, flags=re.DOTALL)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)

