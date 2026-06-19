import re

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

new_sidebar = """                    <!-- Right Sidebar (col-lg-4) -->
                    <div class="col-lg-4">
                        
                        <!-- Student Profile Card -->
                        <div class="sidebar-card mb-4" style="background-color: #121212; border: 1px solid #27272a; border-radius: 20px; padding: 2rem; position: relative; overflow: hidden;">
                            <!-- Premium Glow Effect -->
                            <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%;"></div>
                            
                            <div class="d-flex align-items-center mb-4">
                                <div class="rounded-circle d-flex justify-content-center align-items-center" style="width: 60px; height: 60px; background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%); border: 2px solid #333;">
                                    <i class="bi bi-person-fill text-light fs-2"></i>
                                </div>
                                <div class="ms-3">
                                    <h4 class="brand-font fw-bold mb-0 text-white" style="font-size: 1.1rem; letter-spacing: 0.5px;" th:text="${user.name}">Student Name</h4>
                                    <span class="text-secondary small fw-medium" th:text="${user.role}">STUDENT</span>
                                </div>
                            </div>
                            
                            <div class="d-flex flex-column gap-2 mt-2">
                                <div class="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-1">
                                    <span class="text-secondary small"><i class="bi bi-envelope me-2"></i>Email</span>
                                    <span class="text-light small" th:text="${user.email}">student@school.com</span>
                                </div>
                                <div class="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-1">
                                    <span class="text-secondary small"><i class="bi bi-mortarboard me-2"></i>Course</span>
                                    <span class="text-light small" th:text="${user.courseProgram != null ? user.courseProgram : 'Java Programming'}">Program</span>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Links Card (MOVED UNDER STUDENT PROFILE) -->
                        <div class="sidebar-card mb-4" style="background-color: #121212; border: 1px solid #27272a; border-radius: 20px; padding: 2rem; transition: transform 0.3s ease;">
                            <h4 class="brand-font fw-bold mb-4 text-white d-flex align-items-center" style="font-size: 1.1rem;">
                                <i class="bi bi-lightning-charge-fill text-warning me-2"></i> Quick Links
                            </h4>
                            <div class="d-flex flex-column gap-2">
                                <a href="/dashboard" class="btn btn-dark text-start border-0 fw-medium d-flex align-items-center p-3 text-light rounded-4 premium-list-item" style="background-color: #1a1a1a;">
                                    <i class="bi bi-grid-fill me-3 text-secondary fs-5"></i> Dashboard Home
                                    <i class="bi bi-chevron-right ms-auto text-secondary small"></i>
                                </a>
                                <a href="/profile" class="btn btn-dark text-start border-0 fw-medium d-flex align-items-center p-3 text-light rounded-4 premium-list-item" style="background-color: #1a1a1a;">
                                    <i class="bi bi-person-circle me-3 text-secondary fs-5"></i> My Profile
                                    <i class="bi bi-chevron-right ms-auto text-secondary small"></i>
                                </a>
                                <a th:if="${user.role == 'ADMIN'}" href="/upload" class="btn btn-dark text-start border-0 fw-medium d-flex align-items-center p-3 text-light rounded-4 premium-list-item" style="background-color: #1a1a1a;">
                                    <i class="bi bi-cloud-arrow-up-fill me-3 text-secondary fs-5"></i> Upload Notes
                                    <i class="bi bi-chevron-right ms-auto text-secondary small"></i>
                                </a>
                            </div>
                        </div>
"""

# Replace the sidebar block
pattern = re.compile(r'<!-- Right Sidebar \(col-lg-4\) -->.*?<div class="col-lg-4">.*?<!-- Quick Links Card \(MOVED ABOVE USER FEATURES\) -->.*?</div>\s*</div>\s*<!-- User Features Card -->.*?</div>\s*</div>', re.DOTALL)
content = pattern.sub(new_sidebar, content)

with open('../src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)
