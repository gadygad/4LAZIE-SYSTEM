import re

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# 1. Change title
content = content.replace('<title>GUEST VIEW - LEVEL NOTES</title>', '<title>Premium Dashboard - 4LAZIE</title>')

# 2. Change the Navbar
old_nav = """    <nav class="navbar navbar-light sticky-top py-3" style="background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.05); z-index: 1020;">
        <div class="container d-flex justify-content-between align-items-center">
            <!-- Brand -->
            <a class="navbar-brand d-flex align-items-center m-0" href="/guest-notes" style="text-decoration: none;">
                <div class="icon-box me-2" style="background: linear-gradient(135deg, #2563eb, #3b82f6); border-radius: 12px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(37,99,235,0.2);">
                    <i class="bi bi-journal-album text-white fs-5"></i>
                </div>
                <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.5rem; letter-spacing: -0.5px; color: #1e293b;">
                    4LAZIE <span style="color: #64748b; font-weight: 500;">NOTES</span>
                </span>
            </a>

            <!-- Search Bar (Hidden on Mobile) -->
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
    </nav>"""

new_nav = """    <nav class="navbar navbar-light sticky-top py-3" style="background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.05); z-index: 1020;">
        <div class="container d-flex justify-content-between align-items-center">
            <!-- Brand -->
            <a class="navbar-brand d-flex align-items-center m-0" href="/dashboard" style="text-decoration: none;">
                <div class="icon-box me-2" style="background: linear-gradient(135deg, #2563eb, #3b82f6); border-radius: 12px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(37,99,235,0.2);">
                    <i class="bi bi-journal-album text-white fs-5"></i>
                </div>
                <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.5rem; letter-spacing: -0.5px; color: #1e293b;">
                    4LAZIE <span style="color: #64748b; font-weight: 500;">NOTES</span>
                </span>
            </a>

            <!-- Search Bar (Hidden on Mobile) -->
            <div class="search-container position-relative mx-3 d-none d-md-block" style="flex-grow: 1; max-width: 450px;">
                <form action="/dashboard" method="get">
                    <input type="hidden" name="level" th:value="${selectedLevel}">
                    <input type="hidden" name="semester" th:value="${selectedSemester}">
                    <i class="bi bi-search position-absolute text-muted" style="left: 18px; top: 50%; transform: translateY(-50%); font-size: 1rem;"></i>
                    <input type="text" name="search" class="form-control" th:value="${searchQuery}" placeholder="Search modules, notes, or past papers..." 
                           style="padding: 12px 20px 12px 50px; border-radius: 100px; border: 1px solid rgba(0,0,0,0.1); background: #f8fafc; font-size: 0.95rem; font-weight: 500; transition: all 0.3s ease; box-shadow: inset 0 2px 4px rgba(0,0,0,0.02);"
                           onfocus="this.style.boxShadow='0 0 0 4px rgba(59,130,246,0.1)'; this.style.borderColor='var(--primary)'; this.style.background='#fff';"
                           onblur="this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(0,0,0,0.1)'; this.style.background='#f8fafc';">
                </form>
            </div>

            <div class="d-flex align-items-center gap-3">
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle text-dark user-dropdown-toggle px-2 py-1" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false" style="background: rgba(0,0,0,0.03); border-radius: 50px; padding-right: 15px !important;">
                        <img th:if="${user.profilePicture}" th:src="@{'/uploads/' + ${user.profilePicture}}" alt="Avatar" class="rounded-circle me-2" style="width:40px;height:40px;object-fit:cover; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" />
                        <img th:unless="${user.profilePicture}" src="https://ui-avatars.com/api/?name=Student&background=2563eb&color=fff" alt="Avatar" class="rounded-circle me-2" style="width:40px;height:40px;object-fit:cover; border: 2px solid #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" />
                        <div class="d-none d-md-flex flex-column lh-1 text-start me-2">
                            <span class="fw-bold" style="color: #1e293b; font-size: 0.9rem;" th:text="${user.name}">John Doe</span>
                            <small style="color: #64748b; font-size: 0.7rem; font-weight: 600;" th:text="${user.role}">STUDENT</small>
                        </div>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0" aria-labelledby="userDropdown" style="border-radius: 16px; margin-top: 10px; padding: 10px; min-width: 200px;">
                        <li><a class="dropdown-item rounded-3 mb-1" href="/profile" style="padding: 10px 15px; font-weight: 500;"><i class="bi bi-person-fill me-2 text-primary"></i>My Profile</a></li>
                        <li><a class="dropdown-item rounded-3 mb-1" href="/profile" style="padding: 10px 15px; font-weight: 500;"><i class="bi bi-bookmark-fill me-2 text-warning"></i>Saved Notes</a></li>
                        <li><a class="dropdown-item rounded-3 mb-1" href="/profile" style="padding: 10px 15px; font-weight: 500;"><i class="bi bi-gear-fill me-2 text-secondary"></i>Settings</a></li>
                        <li th:if="${user.role == 'ADMIN'}"><hr class="dropdown-divider"></li>
                        <li th:if="${user.role == 'ADMIN'}"><a class="dropdown-item rounded-3 mb-1" href="/upload" style="padding: 10px 15px; font-weight: 500;"><i class="bi bi-cloud-arrow-up-fill me-2 text-success"></i>Upload Notes</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item rounded-3 text-danger" href="/logout" style="padding: 10px 15px; font-weight: 600;"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>"""

content = content.replace(old_nav, new_nav)

# 3. Change the links from guest-notes to dashboard
content = content.replace('href="/guest-notes', 'href="/dashboard')

# 4. Replace Premium Features with Profile Card
old_premium = """                    <h3 class="section-title text-start mb-4" style="font-size: 1.5rem; color: #f59e0b; font-family: 'Outfit', sans-serif; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; text-decoration: underline; text-underline-offset: 8px; text-decoration-thickness: 3px; text-decoration-color: rgba(245, 158, 11, 0.4);">PREMIUM FEATURES</h3>"""

new_premium = """                    <h3 class="section-title text-start mb-4" style="font-size: 1.5rem; color: #1e293b; font-family: 'Outfit', sans-serif; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; text-decoration: underline; text-underline-offset: 8px; text-decoration-thickness: 3px; text-decoration-color: rgba(37, 99, 235, 0.4);">YOUR PROFILE</h3>"""

content = content.replace(old_premium, new_premium)

old_card = """<div class="premium-card position-relative" style="background: linear-gradient(145deg, #ffffff, #f8fafc); border-radius: 20px; border: 1px solid rgba(245, 158, 11, 0.2); box-shadow: 0 15px 35px rgba(37, 99, 235, 0.05), inset 0 0 0 1px rgba(255,255,255,0.5); overflow: hidden;">
                        <!-- Decorative Top Border -->
                        <div style="height: 4px; width: 100%; background: linear-gradient(90deg, #f59e0b, #2563eb);"></div>
                        
                        <!-- Background Glow -->
                        <div class="position-absolute" style="top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
                        
                        <div class="p-4 relative z-1">
                            <div class="d-flex align-items-center gap-3 mb-4">
                                <div class="icon-box" style="width: 45px; height: 45px; min-width: 45px; border-radius: 14px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(245, 158, 11, 0.2)); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(245,158,11,0.15);">
                                    <i class="bi bi-star-fill" style="color: #f59e0b; font-size: 1.2rem;"></i>
                                </div>
                                <div>
                                    <h4 class="mb-0 fw-bold" style="font-family: 'Outfit', sans-serif; font-size: 1.1rem; color: #1e293b; letter-spacing: 0.5px;">Unlock Premium</h4>
                                    <p class="mb-0 text-secondary" style="font-size: 0.8rem;">Get full access to all resources</p>
                                </div>
                            </div>

                            <ul class="list-unstyled mb-4 d-flex flex-column gap-3">
                                <li class="d-flex align-items-center p-2 rounded-3" style="background: rgba(37,99,235,0.03); border: 1px solid rgba(37,99,235,0.05); transition: transform 0.2s;" onmouseover="this.style.transform='translateX(5px)';" onmouseout="this.style.transform='none';">
                                    <i class="bi bi-file-earmark-pdf-fill me-3" style="color: #2563eb; font-size: 1.1rem;"></i>
                                    <span class="fw-semibold text-dark flex-grow-1" style="font-size: 0.85rem;">CAT 1 & 2 Past Papers</span>
                                    <i class="bi bi-lock-fill text-muted" style="font-size: 0.8rem;"></i>
                                </li>
                                <li class="d-flex align-items-center p-2 rounded-3" style="background: rgba(37,99,235,0.03); border: 1px solid rgba(37,99,235,0.05); transition: transform 0.2s;" onmouseover="this.style.transform='translateX(5px)';" onmouseout="this.style.transform='none';">
                                    <i class="bi bi-journal-check me-3" style="color: #2563eb; font-size: 1.1rem;"></i>
                                    <span class="fw-semibold text-dark flex-grow-1" style="font-size: 0.85rem;">Assignments & Solutions</span>
                                    <i class="bi bi-lock-fill text-muted" style="font-size: 0.8rem;"></i>
                                </li>
                                <li class="d-flex align-items-center p-2 rounded-3" style="background: rgba(37,99,235,0.03); border: 1px solid rgba(37,99,235,0.05); transition: transform 0.2s;" onmouseover="this.style.transform='translateX(5px)';" onmouseout="this.style.transform='none';">
                                    <i class="bi bi-award-fill me-3" style="color: #2563eb; font-size: 1.1rem;"></i>
                                    <span class="fw-semibold text-dark flex-grow-1" style="font-size: 0.85rem;">University Exams (UE)</span>
                                    <i class="bi bi-lock-fill text-muted" style="font-size: 0.8rem;"></i>
                                </li>
                            </ul>

                            <div style="background: rgba(245, 158, 11, 0.05); border-radius: 12px; padding: 15px; margin-bottom: 20px; border: 1px dashed rgba(245, 158, 11, 0.3);">
                                <p class="mb-0 text-center" style="font-size: 0.75rem; color: #64748b; line-height: 1.5;">Create a free account to download all past papers, assignments, and premium notes without limits.</p>
                            </div>

                            <a href="/register" class="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 position-relative overflow-hidden" 
                               style="background: linear-gradient(135deg, #f59e0b, #ea580c); color: white; border: none; padding: 12px; border-radius: 12px; font-size: 0.9rem; font-family: 'Outfit', sans-serif; box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3); transition: all 0.3s ease;" 
                               onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(245, 158, 11, 0.4)';" 
                               onmouseout="this.style.transform='none'; this.style.boxShadow='0 8px 20px rgba(245, 158, 11, 0.3)';">
                                <i class="bi bi-person-plus-fill"></i> Create Free Account
                                <div style="position: absolute; top: 0; left: -100%; width: 50%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animation: shimmer 3s infinite;"></div>
                            </a>
                        </div>
                    </div>"""

new_card = """<div class="premium-card position-relative" style="background: linear-gradient(145deg, #ffffff, #f8fafc); border-radius: 20px; border: 1px solid rgba(37, 99, 235, 0.2); box-shadow: 0 15px 35px rgba(37, 99, 235, 0.05), inset 0 0 0 1px rgba(255,255,255,0.5); overflow: hidden;">
                        <div style="height: 4px; width: 100%; background: linear-gradient(90deg, #2563eb, #3b82f6);"></div>
                        
                        <div class="position-absolute" style="top: -50px; right: -50px; width: 150px; height: 150px; background: radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>
                        
                        <div class="p-4 relative z-1 text-center">
                            <img th:if="${user.profilePicture}" th:src="@{'/uploads/' + ${user.profilePicture}}" alt="Avatar" class="rounded-circle mb-3" style="width:90px;height:90px;object-fit:cover; border: 4px solid #fff; box-shadow: 0 8px 20px rgba(0,0,0,0.1);" />
                            <img th:unless="${user.profilePicture}" src="https://ui-avatars.com/api/?name=Student&background=2563eb&color=fff" alt="Avatar" class="rounded-circle mb-3" style="width:90px;height:90px;object-fit:cover; border: 4px solid #fff; box-shadow: 0 8px 20px rgba(0,0,0,0.1);" />
                            
                            <h4 class="mb-1 fw-bold" style="font-family: 'Outfit', sans-serif; font-size: 1.3rem; color: #1e293b;" th:text="${user.name}">John Doe</h4>
                            <p class="mb-3 text-primary fw-semibold" style="font-size: 0.85rem;" th:text="${user.courseProgram != null ? user.courseProgram : 'Student'}">DIPLOMA IN IT</p>

                            <div class="d-flex justify-content-center gap-4 mb-4">
                                <div class="text-center">
                                    <h5 class="fw-bold text-dark mb-0 fs-5" th:text="${totalDownloads != null ? totalDownloads : '0'}">12</h5>
                                    <small class="text-muted fw-medium" style="font-size: 0.75rem;">Downloads</small>
                                </div>
                                <div style="width: 1px; background: rgba(0,0,0,0.1);"></div>
                                <div class="text-center">
                                    <h5 class="fw-bold text-dark mb-0 fs-5" th:text="${totalNotes != null ? totalNotes : '0'}">45</h5>
                                    <small class="text-muted fw-medium" style="font-size: 0.75rem;">Materials</small>
                                </div>
                            </div>

                            <a href="/profile" class="btn w-100 fw-bold d-flex align-items-center justify-content-center gap-2 position-relative overflow-hidden" 
                               style="background: linear-gradient(135deg, #2563eb, #3b82f6); color: white; border: none; padding: 12px; border-radius: 12px; font-size: 0.9rem; font-family: 'Outfit', sans-serif; box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3); transition: all 0.3s ease;" 
                               onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(37, 99, 235, 0.4)';" 
                               onmouseout="this.style.transform='none'; this.style.boxShadow='0 8px 20px rgba(37, 99, 235, 0.3)';">
                                <i class="bi bi-person-fill"></i> View Full Profile
                            </a>
                        </div>
                    </div>"""

content = content.replace(old_card, new_card)

# 5. Remove the Restricted Modal completely!
content = re.sub(r'<!-- Restricted Access Modal -->.*?</div>\s*</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)

with open('../src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)
