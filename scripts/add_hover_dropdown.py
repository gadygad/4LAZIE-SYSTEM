import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Add the styles if not present
if "module-dropdown" not in content:
    style_block = """
    <style>
        .module-item {
            transition: all 0.3s ease;
            border-left: 4px solid transparent;
            background-color: transparent;
        }
        .module-item:hover {
            background-color: #f8fafc;
        }
        .module-dropdown {
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-in-out, opacity 0.4s ease-in-out, margin 0.3s ease-in-out;
            padding-left: 3.5rem;
            padding-right: 1.5rem;
            margin-bottom: 0;
        }
        .module-item:hover .module-dropdown {
            max-height: 300px;
            opacity: 1;
            margin-bottom: 15px;
        }
        .dropdown-icon {
            transition: transform 0.3s ease;
        }
        .module-item:hover .dropdown-icon {
            transform: rotate(180deg);
        }
        .unit-item {
            padding: 8px 16px;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: var(--text-main);
            text-decoration: none;
            font-size: 0.85rem;
            transition: all 0.2s ease;
            background: rgba(255, 255, 255, 0.5);
            border: 1px solid transparent;
            margin-bottom: 4px;
        }
        .unit-item:hover {
            background-color: #ffffff;
            border-color: var(--border-subtle);
            color: var(--primary);
            transform: translateX(4px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
    </style>
    <!-- Open Notes Section -->"""
    content = content.replace("<!-- Open Notes Section -->", style_block)

# Sem 1 replace
old_sem_1_block = r'<!-- NTA Level 5 Semester 1 Modules -->.*?<!-- NTA Level 5 Semester 2 Modules -->'
new_sem_1_block = """<!-- NTA Level 5 Semester 1 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 1}" class="mb-5">
                    <div class="list-group list-group-flush" style="border-radius: 12px; border: 1px solid var(--border-subtle); box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                        
                        <div class="list-group-item p-0 module-item" style="border-bottom: 1px solid var(--border-subtle);">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='var(--primary)';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-code-slash fs-5 me-3" style="color: var(--primary);"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">OBJECT ORIENTED PROGRAMMING (JAVA)</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05101</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">12 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>
                        
                        <div class="list-group-item p-0 module-item" style="border-bottom: 1px solid var(--border-subtle);">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='#10b981';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-database fs-5 me-3" style="color: #10b981;"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">DATABASE MANAGEMENT SYSTEMS</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05102</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">8 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>
                        
                        <div class="list-group-item p-0 module-item" style="border-bottom: 1px solid var(--border-subtle);">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='#f59e0b';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-diagram-3 fs-5 me-3" style="color: #f59e0b;"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">SYSTEM ANALYSIS & DESIGN</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05103</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">10 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>

                        <div class="list-group-item p-0 module-item">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='#8b5cf6';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-pc-display fs-5 me-3" style="color: #8b5cf6;"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">COMPUTER MAINTENANCE</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05104</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">6 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- NTA Level 5 Semester 2 Modules -->"""
content = re.sub(old_sem_1_block, new_sem_1_block, content, flags=re.DOTALL)

old_sem_2_block = r'<!-- NTA Level 5 Semester 2 Modules -->.*?<h3 class="fw-bold mb-4 mt-2 text-dark'
new_sem_2_block = """<!-- NTA Level 5 Semester 2 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 2}" class="mb-5">
                    <div class="list-group list-group-flush" style="border-radius: 12px; border: 1px solid var(--border-subtle); box-shadow: 0 4px 15px rgba(0,0,0,0.03);">
                        
                        <div class="list-group-item p-0 module-item" style="border-bottom: 1px solid var(--border-subtle);">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='var(--primary)';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-server fs-5 me-3" style="color: var(--primary);"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">SERVER ADMINISTRATION</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05201</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">10 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>

                        <div class="list-group-item p-0 module-item" style="border-bottom: 1px solid var(--border-subtle);">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='#f43f5e';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-globe fs-5 me-3" style="color: #f43f5e;"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">WEB DESIGNING</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05202</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">14 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>

                        <div class="list-group-item p-0 module-item" style="border-bottom: 1px solid var(--border-subtle);">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='#10b981';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-cpu fs-5 me-3" style="color: #10b981;"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05203</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">12 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>

                        <div class="list-group-item p-0 module-item" style="border-bottom: 1px solid var(--border-subtle);">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='#3b82f6';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-router fs-5 me-3" style="color: #3b82f6;"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">COMPUTER NETWORK</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05204</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">15 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>

                        <div class="list-group-item p-0 module-item" style="border-bottom: 1px solid var(--border-subtle);">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='#8b5cf6';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-motherboard fs-5 me-3" style="color: #8b5cf6;"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">MICROPROCESSOR AND MICROCONTROLLER</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05205</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">8 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>

                        <div class="list-group-item p-0 module-item">
                            <div class="d-flex align-items-center justify-content-between py-3 px-4" onmouseover="this.parentElement.style.borderLeftColor='#f59e0b';" onmouseout="this.parentElement.style.borderLeftColor='transparent';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-diagram-2 fs-5 me-3" style="color: #f59e0b;"></i>
                                    <div>
                                        <h6 class="mb-0 fw-bold text-dark text-uppercase" style="font-size: 0.95rem; letter-spacing: 0.5px;">BASIC DATA COMMUNICATION</h6>
                                        <small class="text-secondary fw-semibold" style="font-size: 0.75rem;">ITT 05206</small>
                                    </div>
                                </div>
                                <span class="badge bg-light text-secondary rounded-pill border px-3 py-2 fw-bold" style="font-size: 0.8rem;">7 Notes <i class="bi bi-chevron-down ms-1 dropdown-icon d-inline-block"></i></span>
                            </div>
                            <div class="module-dropdown">
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 1</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 2</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 3</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 4</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                                <a href="/register" class="unit-item"><span class="fw-semibold"><i class="bi bi-file-earmark-pdf me-2 text-danger"></i> Unit 5</span><span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3">View</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="fw-bold mb-4 mt-2 text-dark'"""

content = re.sub(old_sem_2_block, new_sem_2_block, content, flags=re.DOTALL)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)

