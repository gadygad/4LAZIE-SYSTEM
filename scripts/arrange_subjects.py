import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# 1. Navbar Replacement (Move search bar, add hr)
old_navbar = r'<!-- Header Navigation -->\s*<nav class="navbar navbar-light navbar-custom sticky-top py-3">\s*<div class="container">\s*<a class="navbar-brand d-flex align-items-center" href="/">\s*<i class="bi bi-arrow-left fs-4 me-2 text-secondary"></i>\s*<span class="fs-4 fw-bold">4LAZIE</span>\s*</a>\s*<div class="d-flex align-items-center">\s*<a href="/login" class="btn btn-outline-dark btn-sm rounded-pill px-3">Login</a>\s*</div>\s*</div>\s*</nav>'

new_navbar = """<!-- Header Navigation -->
    <nav class="navbar navbar-light navbar-custom sticky-top py-3" style="background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); z-index: 1020;">
        <div class="container d-flex justify-content-between align-items-center">
            <a class="navbar-brand d-flex align-items-center" href="/">
                <i class="bi bi-arrow-left fs-4 me-2 text-secondary"></i>
                <span class="fs-4 fw-bold gradient-text">4LAZIE</span>
            </a>
            
            <!-- Search Bar moved to navbar -->
            <div class="search-container position-relative mx-3 d-none d-md-block" style="flex-grow: 1; max-width: 450px;">
                <i class="bi bi-search position-absolute text-muted" style="left: 18px; top: 50%; transform: translateY(-50%); font-size: 1rem;"></i>
                <input type="text" class="form-control" placeholder="Search modules, notes, or past papers..." 
                       style="padding: 12px 20px 12px 50px; border-radius: 100px; border: 1px solid rgba(0,0,0,0.1); background: #f8fafc; font-size: 0.95rem; font-weight: 500; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);"
                       onfocus="this.style.boxShadow='0 0 0 4px rgba(59,130,246,0.1)'; this.style.borderColor='var(--primary)'; this.style.background='#fff';"
                       onblur="this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.1)'; this.style.background='#f8fafc';">
            </div>

            <div class="d-flex align-items-center">
                <a href="/login" class="btn btn-premium btn-sm rounded-pill px-4 py-2 fw-bold" style="font-size: 0.9rem;">Login</a>
            </div>
        </div>
    </nav>
    <hr style="margin: 0; border: none; height: 1px; background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent);" />"""

content = re.sub(old_navbar, new_navbar, content, flags=re.DOTALL)

# 2. Remove the old search container in the hero section
old_search_hero = r'<div class="search-container mb-2 position-relative" style="max-width: 500px;">.*?</div>\s*</div>\s*<!-- Open Notes Section -->'
new_search_hero = """</div>
                
                <!-- Open Notes Section -->"""
content = re.sub(old_search_hero, new_search_hero, content, flags=re.DOTALL)

# 3. Add Subject Grids replacing the COURSE NOTES h3
old_notes_h3 = r'<h3 class="fw-bold mb-4 mt-4 text-dark d-flex align-items-center">\s*<div class="premium-icon-box icon-primary"><i class="bi bi-book-half fs-5"></i></div> COURSE NOTES\s*</h3>'

new_subjects_html = """<h3 class="fw-bold mb-4 mt-4 text-dark d-flex align-items-center" style="font-family: 'Outfit', sans-serif;">
                    <div class="premium-icon-box icon-primary"><i class="bi bi-journal-album fs-5"></i></div> MODULES / MASOMO
                </h3>

                <!-- NTA Level 5 Semester 1 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 1}" class="row g-3 mb-5">
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='var(--primary)';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box icon-primary" style="width: 45px; height: 45px; border-radius: 12px;"><i class="bi bi-code-slash fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">Object Oriented Programming (Java)</h6>
                                    <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill" style="font-size: 0.7rem;">ITT 05101</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 12 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: var(--bg-subtle); color: var(--primary);">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#10b981';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(16, 185, 129, 0.1); color: #10b981;"><i class="bi bi-database fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">Database Management Systems</h6>
                                    <span class="badge bg-success bg-opacity-10 text-success rounded-pill" style="font-size: 0.7rem;">ITT 05102</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 8 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(16, 185, 129, 0.1); color: #10b981;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#f59e0b';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(245, 158, 11, 0.1); color: #f59e0b;"><i class="bi bi-diagram-3 fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">System Analysis & Design</h6>
                                    <span class="badge bg-warning bg-opacity-10 text-warning rounded-pill" style="font-size: 0.7rem;">ITT 05103</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 10 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#8b5cf6';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(139, 92, 246, 0.1); color: #8b5cf6;"><i class="bi bi-pc-display fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">Computer Maintenance</h6>
                                    <span class="badge" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6; border-radius: 50rem; font-size: 0.7rem;">ITT 05104</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 6 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(139, 92, 246, 0.1); color: #8b5cf6;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- NTA Level 5 Semester 2 Modules -->
                <div th:if="${selectedLevel == 5 && selectedSemester == 2}" class="row g-3 mb-5">
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#f43f5e';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(244, 63, 94, 0.1); color: #f43f5e;"><i class="bi bi-globe fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">Web Technologies</h6>
                                    <span class="badge" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e; border-radius: 50rem; font-size: 0.7rem;">ITT 05201</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 14 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(244, 63, 94, 0.1); color: #f43f5e;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="subject-card p-3 h-100" style="background: var(--card-bg); border-radius: 16px; border: 1px solid var(--border-subtle); transition: all 0.3s ease; cursor: pointer;" onmouseover="this.style.transform='translateY(-4px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.06)'; this.style.borderColor='#3b82f6';" onmouseout="this.style.transform='none'; this.style.boxShadow='none'; this.style.borderColor='var(--border-subtle)';">
                            <div class="d-flex align-items-center mb-3">
                                <div class="premium-icon-box" style="width: 45px; height: 45px; border-radius: 12px; background: rgba(59, 130, 246, 0.1); color: #3b82f6;"><i class="bi bi-router fs-5"></i></div>
                                <div class="ms-3">
                                    <h6 class="fw-bold mb-1 text-dark" style="font-size: 0.95rem;">Data Communication & Networks</h6>
                                    <span class="badge" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-radius: 50rem; font-size: 0.7rem;">ITT 05202</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-3">
                                <span class="text-secondary small fw-medium"><i class="bi bi-file-earmark-text me-1"></i> 9 Notes</span>
                                <a href="#" class="btn btn-sm rounded-pill fw-bold" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">View <i class="bi bi-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h3 class="fw-bold mb-4 mt-2 text-dark d-flex align-items-center" style="font-size: 1.1rem; text-transform: uppercase;">
                    <i class="bi bi-clock-history me-2 text-secondary"></i> RECENT UPLOADS
                </h3>"""

content = re.sub(old_notes_h3, new_subjects_html, content, flags=re.DOTALL)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)
