import re

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# I want to replace everything from <!-- Profile Banner --> down to the closing div of col-lg-12.
pattern = re.compile(r'<!-- Integrated Student Profile Banner -->.*?(?=<!-- Modal for View \+ Download -->)', re.DOTALL)

replacement = """<!-- Profile Banner -->
                <div class="profile-banner mb-4 d-flex align-items-center gap-3 p-4 rounded-4" style="background-color: #1a1a1a; border: 1px solid var(--border-color);">
                    <img th:if="${user.profilePicture}" th:src="@{'/uploads/' + ${user.profilePicture}}" alt="Avatar" class="rounded-circle" style="width:70px;height:70px;object-fit:cover; border: 2px solid #555;" />
                    <img th:unless="${user.profilePicture}" src="https://ui-avatars.com/api/?name=Student&background=000&color=fff" alt="Avatar" class="rounded-circle" style="width:70px;height:70px;object-fit:cover; border: 2px solid #555;" />
                    <div>
                        <h3 class="m-0 text-white fw-bold brand-font">Welcome, <span th:text="${user.name}">Student Name</span></h3>
                        <span class="text-secondary">Ready to continue your learning journey?</span>
                    </div>
                </div>

                <div class="row g-4">
                    <!-- Main Feed (col-lg-8) -->
                    <div class="col-lg-8">
                        <div class="section-card mb-4">
                            <!-- Global Notes Search -->
                            <div class="mb-5">
                                <form action="/dashboard" method="get">
                                    <input type="hidden" name="level" th:value="${selectedLevel}">
                                    <input type="hidden" name="semester" th:value="${selectedSemester}">
                                    
                                    <div class="mb-2 text-start">
                                        <label for="search" class="form-label fw-bold text-secondary text-uppercase small tracking-wider"><i class="bi bi-search me-1"></i>Search notes:</label>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <input type="text" name="search" id="search" th:value="${searchQuery}" class="form-control form-control-custom" placeholder="Search by title or keywords...">
                                        <button type="submit" class="btn btn-tech-dark px-4">Search</button>
                                    </div>
                                </form>
                            </div>

                            <!-- Filters Section -->
                            <div class="mb-4 text-start bg-light bg-opacity-50 p-4 rounded-4" style="border: 1px solid var(--border-color);">
                                <div class="d-flex align-items-center gap-3 mb-3">
                                    <span class="fw-bold text-secondary text-uppercase small tracking-wider"><i class="bi-bar-chart-fill me-1"></i>Levels:</span>
                                    <div class="d-flex gap-2">
                                        <a th:href="@{'/dashboard?level=4&semester=' + ${selectedSemester} + ${searchQuery != null ? '&search=' + searchQuery : ''}}" class="btn-filter px-3 py-1.5" th:classappend="${selectedLevel == 4} ? 'active' : ''">[4]</a>
                                        <a th:href="@{'/dashboard?level=5&semester=' + ${selectedSemester} + ${searchQuery != null ? '&search=' + searchQuery : ''}}" class="btn-filter px-3 py-1.5" th:classappend="${selectedLevel == 5} ? 'active' : ''">[5]</a>
                                        <a th:href="@{'/dashboard?level=6&semester=' + ${selectedSemester} + ${searchQuery != null ? '&search=' + searchQuery : ''}}" class="btn-filter px-3 py-1.5" th:classappend="${selectedLevel == 6} ? 'active' : ''">[6]</a>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-3 mb-3">
                                    <span class="fw-bold text-secondary text-uppercase small tracking-wider"><i class="bi bi-calendar-event me-1"></i>Semesters:</span>
                                    <div class="d-flex gap-2">
                                        <a th:href="@{'/dashboard?level=' + ${selectedLevel} + '&semester=1' + ${searchQuery != null ? '&search=' + searchQuery : ''}}" class="btn-filter px-3 py-1.5" th:classappend="${selectedSemester == 1} ? 'active' : ''">[1]</a>
                                        <a th:href="@{'/dashboard?level=' + ${selectedLevel} + '&semester=2' + ${searchQuery != null ? '&search=' + searchQuery : ''}}" class="btn-filter px-3 py-1.5" th:classappend="${selectedSemester == 2} ? 'active' : ''">[2]</a>
                                    </div>
                                </div>
                            </div>

                            <!-- Notes Tree Structure (Accordion) -->
                            <div class="notes-tree mt-4" id="levelAccordion">
                                <div class="tree-node mb-4">
                                    <h4 class="fw-bold text-white mb-3 brand-font d-flex align-items-center" data-bs-toggle="collapse" href="#collapseLevel" role="button" aria-expanded="true" aria-controls="collapseLevel" style="cursor: pointer;">
                                        <i class="bi bi-mortarboard-fill text-primary me-2"></i>NTA LEVEL <span th:text="${selectedLevel}" class="ms-1">4</span>
                                        <i class="bi bi-chevron-down ms-2 fs-6 text-secondary"></i>
                                    </h4>
                                    <div class="collapse show tree-children ms-3 border-start border-secondary ps-4" id="collapseLevel" data-bs-parent="#levelAccordion">
                                        <div class="tree-node mb-4" id="semesterAccordion">
                                            <h5 class="fw-bold text-white mb-3 brand-font d-flex align-items-center" data-bs-toggle="collapse" href="#collapseSemester" role="button" aria-expanded="true" aria-controls="collapseSemester" style="cursor: pointer;">
                                                <i class="bi bi-calendar3 text-info me-2"></i>Semester <span th:text="${selectedSemester}" class="ms-1">1</span>
                                                <i class="bi bi-chevron-down ms-2 fs-6 text-secondary"></i>
                                            </h5>
                                            <div class="collapse show tree-children ms-3 border-start border-secondary ps-4" id="collapseSemester" data-bs-parent="#semesterAccordion">
                                                
                                                <div class="tree-node mb-4" id="subjectAccordion">
                                                    <div class="py-3 px-4 mb-4 mt-3 d-flex justify-content-between align-items-center rounded shadow-sm hover-lift" data-bs-toggle="collapse" href="#collapseSubject" role="button" aria-expanded="true" aria-controls="collapseSubject" style="background-color: #121212; border: 1px solid #27272a; cursor: pointer;">
                                                        <h6 class="fw-bold text-white m-0 brand-font text-center text-uppercase w-100" style="letter-spacing: 1.5px; font-size: 0.95rem;" th:text="${(user.courseProgram != null and !user.courseProgram.isEmpty() ? user.courseProgram : 'JAVA PROGRAMMING') + ' - LEVEL ' + selectedLevel + ' SEM ' + selectedSemester}">JAVA PROGRAMMING</h6>
                                                        <i class="bi bi-chevron-down fs-5 text-secondary"></i>
                                                    </div>
                                                    <div class="collapse show" id="collapseSubject" data-bs-parent="#subjectAccordion">
                                                        <div class="card shadow-sm border-0 rounded-4 mt-2 mb-4" style="background-color: #121212; border: 1px solid #27272a !important;">
                                                            <div class="card-body p-0">
                                                                <div class="accordion accordion-flush" id="subjectContentAccordion">
                                                                    
                                                                    <!-- Notes & Learning Materials -->
                                                                    <div class="accordion-item bg-transparent border-bottom border-secondary">
                                                                        <h2 class="accordion-header" id="headingNotes">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNotes" aria-expanded="false" aria-controls="collapseNotes">
                                                                                <i class="bi bi-book-half text-primary me-2 fs-5"></i> Notes & Learning Materials
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseNotes" class="accordion-collapse collapse" aria-labelledby="headingNotes" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'Note'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <i class="bi bi-file-earmark-text text-primary me-2"></i>
                                                                                            <span th:text="${note.title}">Note Title</span>
                                                                                        </a>
                                                                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm btn-outline-secondary rounded-pill" title="Download">
                                                                                            <i class="bi bi-download"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <!-- Assignments -->
                                                                    <div class="accordion-item bg-transparent border-bottom border-secondary">
                                                                        <h2 class="accordion-header" id="headingAssignment">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAssignment" aria-expanded="false" aria-controls="collapseAssignment">
                                                                                <i class="bi bi-pin-angle-fill text-info me-2 fs-5"></i> Assignments
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseAssignment" class="accordion-collapse collapse" aria-labelledby="headingAssignment" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'Assignment'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <i class="bi bi-journal-check text-info me-2"></i>
                                                                                            <span th:text="${note.title}">Assignment Title</span>
                                                                                        </a>
                                                                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm btn-outline-secondary rounded-pill" title="Download">
                                                                                            <i class="bi bi-download"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    
                                                                    <!-- CATs -->
                                                                    <div class="accordion-item bg-transparent border-bottom border-secondary">
                                                                        <h2 class="accordion-header" id="headingCats">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCats" aria-expanded="false" aria-controls="collapseCats">
                                                                                <i class="bi bi-pencil-square text-warning me-2 fs-5"></i> CAT Papers
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseCats" class="accordion-collapse collapse" aria-labelledby="headingCats" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'Past Paper'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <i class="bi bi-file-earmark-text text-warning me-2"></i>
                                                                                            <span th:text="${note.title}">CAT Title</span>
                                                                                        </a>
                                                                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm btn-outline-secondary rounded-pill" title="Download">
                                                                                            <i class="bi bi-download"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Right Sidebar (col-lg-4) -->
                    <div class="col-lg-4">
                        
                        <!-- Quick Links Card (MOVED ABOVE USER FEATURES) -->
                        <div class="sidebar-card mb-4" style="background-color: #121212; border: 1px solid #27272a; border-radius: 20px; padding: 2rem;">
                            <h4 class="brand-font fw-bold mb-4 text-white" style="font-size: 1.25rem;">
                                <i class="bi bi-folder2-open text-primary me-2"></i> Quick Links
                            </h4>
                            <div class="d-flex flex-column gap-2">
                                <a href="/dashboard" class="btn btn-outline-secondary text-start border-0 fw-medium d-flex align-items-center p-2 text-light rounded-3 hover-bg-dark" style="transition: all 0.2s;">
                                    <i class="bi bi-grid-fill me-3 text-secondary fs-5"></i> Dashboard Home
                                </a>
                                <a href="/profile" class="btn btn-outline-secondary text-start border-0 fw-medium d-flex align-items-center p-2 text-light rounded-3 hover-bg-dark" style="transition: all 0.2s;">
                                    <i class="bi bi-person-circle me-3 text-secondary fs-5"></i> My Profile
                                </a>
                                <a th:if="${user.role == 'ADMIN'}" href="/upload" class="btn btn-outline-secondary text-start border-0 fw-medium d-flex align-items-center p-2 text-light rounded-3 hover-bg-dark" style="transition: all 0.2s;">
                                    <i class="bi bi-cloud-arrow-up-fill me-3 text-secondary fs-5"></i> Upload Notes
                                </a>
                            </div>
                        </div>

                        <!-- User Features Card -->
                        <div class="sidebar-card mb-4" style="background-color: #121212; border: 1px solid #27272a; border-radius: 20px; padding: 2rem;">
                            <h4 class="brand-font fw-bold mb-4 text-white" style="font-size: 1.25rem;">
                                <i class="bi bi-shield-check text-success me-2"></i> User Features
                            </h4>
                            <ul class="list-unstyled mb-0">
                                <li class="mb-3 d-flex align-items-center text-secondary small">
                                    <i class="bi bi-check-circle-fill text-success me-2 fs-6"></i> Access Assignments
                                </li>
                                <li class="mb-3 d-flex align-items-center text-secondary small">
                                    <i class="bi bi-check-circle-fill text-success me-2 fs-6"></i> Download Learning Materials
                                </li>
                                <li class="mb-3 d-flex align-items-center text-secondary small">
                                    <i class="bi bi-check-circle-fill text-success me-2 fs-6"></i> View Past Papers
                                </li>
                                <li class="d-flex align-items-center text-secondary small">
                                    <i class="bi bi-check-circle-fill text-success me-2 fs-6"></i> Interactive Preview
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                """

new_content = pattern.sub(replacement, content)

with open('../src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(new_content)
