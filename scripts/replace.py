import re

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# We want to replace everything from <!-- Profile Banner --> down to the closing div of col-lg-12.
# The col-lg-12 closing div is right before <!-- Modal for View + Download -->

pattern = re.compile(r'<!-- Profile Banner -->.*?(?=<!-- Modal for View \+ Download -->)', re.DOTALL)

replacement = """<!-- Integrated Student Profile Banner -->
                <div class="profile-banner mb-4 p-4 rounded-4 position-relative" style="background-color: #1a1a1a; border: 1px solid var(--border-color);">
                    <div class="d-flex align-items-center gap-3">
                        <img th:if="${user.profilePicture}" th:src="@{'/uploads/' + ${user.profilePicture}}" alt="Avatar" class="rounded-circle" style="width:80px;height:80px;object-fit:cover; border: 2px solid #555;" />
                        <img th:unless="${user.profilePicture}" src="https://ui-avatars.com/api/?name=Student&background=000&color=fff" alt="Avatar" class="rounded-circle" style="width:80px;height:80px;object-fit:cover; border: 2px solid #555;" />
                        <div>
                            <h3 class="m-0 text-white fw-bold brand-font d-flex align-items-center gap-2">
                                <i class="bi bi-camera"></i> Welcome, <span th:text="${user.name}">John Doe</span>
                            </h3>
                            <div class="d-flex gap-3 mt-2 text-secondary fw-semibold">
                                <span><i class="bi bi-mortarboard-fill me-1"></i>NTA Level <span th:text="${selectedLevel != null ? selectedLevel : '4'}">4</span></span>
                                <span>•</span>
                                <span><i class="bi bi-calendar3 me-1"></i>Semester <span th:text="${selectedSemester != null ? selectedSemester : '1'}">1</span></span>
                            </div>
                        </div>
                    </div>
                    <!-- Mock Notifications Bell -->
                    <div class="position-absolute top-0 end-0 p-4">
                        <a href="#" class="text-white text-decoration-none position-relative fs-4">
                            <i class="bi bi-bell-fill"></i>
                            <span class="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-dark rounded-circle">
                                <span class="visually-hidden">New alerts</span>
                            </span>
                        </a>
                    </div>
                </div>

                <!-- Global Notes Search -->
                <div class="mb-5">
                    <form action="/dashboard" method="get">
                        <input type="hidden" name="level" th:value="${selectedLevel}">
                        <input type="hidden" name="semester" th:value="${selectedSemester}">
                        <div class="d-flex gap-2">
                            <input type="text" name="search" id="search" th:value="${searchQuery}" class="form-control form-control-custom fs-5 py-3" placeholder="🔍 Search Notes, CATs, Assignments, UE..." style="background-color: rgba(255,255,255,0.05) !important;">
                            <button type="submit" class="btn btn-tech-dark px-5 fs-5 fw-bold">Search</button>
                        </div>
                    </form>
                </div>

                <!-- Inline Horizontal Subjects -->
                <div class="d-flex flex-column gap-4 mb-5">
                    
                    <!-- Subject 1 -->
                    <div class="p-4 rounded-4" style="background-color: #121212; border: 1px solid #27272a;">
                        <h5 class="fw-bold text-white mb-4 brand-font text-uppercase d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-book-half text-secondary me-2"></i> <span th:text="${(user.courseProgram != null and !user.courseProgram.isEmpty() ? user.courseProgram : 'JAVA PROGRAMMING')}">JAVA PROGRAMMING</span></span>
                            <span class="badge bg-dark text-secondary border border-secondary">Level <span th:text="${selectedLevel}">4</span></span>
                        </h5>
                        <div class="d-flex flex-wrap gap-2">
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-journal-text me-1"></i>Notes</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pin-angle me-1"></i>A1</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pencil-square me-1"></i>CAT 1</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pin-angle me-1"></i>A2</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pencil-square me-1"></i>CAT 2</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-mortarboard me-1"></i>UE</a>
                        </div>
                    </div>

                    <!-- Subject 2 (Mocked) -->
                    <div class="p-4 rounded-4" style="background-color: #121212; border: 1px solid #27272a;">
                        <h5 class="fw-bold text-white mb-4 brand-font text-uppercase d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-server text-secondary me-2"></i> DATABASE SYSTEMS</span>
                            <span class="badge bg-dark text-secondary border border-secondary">Level <span th:text="${selectedLevel}">4</span></span>
                        </h5>
                        <div class="d-flex flex-wrap gap-2">
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-journal-text me-1"></i>Notes</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pin-angle me-1"></i>A1</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pencil-square me-1"></i>CAT 1</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pin-angle me-1"></i>A2</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pencil-square me-1"></i>CAT 2</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-mortarboard me-1"></i>UE</a>
                        </div>
                    </div>

                    <!-- Subject 3 (Mocked) -->
                    <div class="p-4 rounded-4" style="background-color: #121212; border: 1px solid #27272a;">
                        <h5 class="fw-bold text-white mb-4 brand-font text-uppercase d-flex justify-content-between align-items-center">
                            <span><i class="bi bi-router text-secondary me-2"></i> NETWORKING</span>
                            <span class="badge bg-dark text-secondary border border-secondary">Level <span th:text="${selectedLevel}">4</span></span>
                        </h5>
                        <div class="d-flex flex-wrap gap-2">
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-journal-text me-1"></i>Notes</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pin-angle me-1"></i>A1</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pencil-square me-1"></i>CAT 1</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pin-angle me-1"></i>A2</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-pencil-square me-1"></i>CAT 2</a>
                            <a href="#" class="btn btn-sm btn-outline-light rounded-pill px-3 fw-semibold"><i class="bi bi-mortarboard me-1"></i>UE</a>
                        </div>
                    </div>
                </div>

                <!-- Quick Access Footer Bar -->
                <div class="d-flex justify-content-between align-items-center p-3 rounded-pill mb-5" style="background-color: #1a1a1a; border: 1px solid #333;">
                    <a href="#" class="btn btn-link text-decoration-none text-light fw-bold px-4"><i class="bi bi-star-fill text-warning me-2"></i>Saved Notes</a>
                    <a href="#" class="btn btn-link text-decoration-none text-light fw-bold px-4"><i class="bi bi-download text-primary me-2"></i>Downloads</a>
                    <a href="#" class="btn btn-link text-decoration-none text-light fw-bold px-4"><i class="bi bi-graph-up text-success me-2"></i>Progress</a>
                    <a href="/profile" class="btn btn-link text-decoration-none text-light fw-bold px-4"><i class="bi bi-person-circle text-info me-2"></i>Profile</a>
                </div>

            </div>
        </div>

    </div>

    """

new_content = pattern.sub(replacement, content)

with open('../src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(new_content)
