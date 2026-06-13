import re

with open('src/main/resources/templates/profile.html', 'r') as f:
    content = f.read()

# I will replace the <div class="container my-4"> entirely.
pattern = re.compile(r'<div class="container my-4">.*?(?=<script)', re.DOTALL)

replacement = """<div class="container my-5">
        <div class="row g-4">
            
            <!-- Left Column: Info & Activity -->
            <div class="col-lg-5">
                
                <!-- Student Information Card -->
                <div class="section-card mb-4" style="padding: 2rem;">
                    <h4 class="brand-font fw-bold mb-4 d-flex align-items-center"><i class="bi bi-person-badge text-primary me-2"></i> Student Information</h4>
                    
                    <div class="text-center mb-4">
                        <img th:if="${user.profilePicture}" th:src="@{'/uploads/' + ${user.profilePicture}}" alt="Profile Picture" class="rounded-circle border border-secondary shadow-sm" style="width:130px;height:130px;object-fit:cover; padding: 4px; background-color: #1a1a1a;">
                        <img th:unless="${user.profilePicture}" src="https://ui-avatars.com/api/?name=Student&background=000&color=fff" alt="Profile Picture" class="rounded-circle border border-secondary shadow-sm" style="width:130px;height:130px;object-fit:cover; padding: 4px; background-color: #1a1a1a;">
                        <h4 class="mt-3 mb-1 fw-bold text-white" th:text="${user.name}">John Doe</h4>
                        <span class="badge bg-dark text-secondary border border-secondary" th:text="${user.courseProgram != null ? user.courseProgram : 'Student Program'}">Program</span>
                    </div>

                    <ul class="list-group list-group-flush bg-transparent">
                        <li class="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between align-items-center px-0">
                            <span class="text-secondary"><i class="bi bi-envelope me-2"></i>Email</span>
                            <span class="fw-semibold" th:text="${user.email}">student@example.com</span>
                        </li>
                        <li class="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between align-items-center px-0">
                            <span class="text-secondary"><i class="bi bi-mortarboard me-2"></i>NTA Level</span>
                            <span class="fw-semibold badge bg-primary" th:text="${user.level}">4</span>
                        </li>
                        <li class="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between align-items-center px-0">
                            <span class="text-secondary"><i class="bi bi-calendar3 me-2"></i>Semester</span>
                            <span class="fw-semibold badge bg-info text-dark" th:text="${user.semester}">1</span>
                        </li>
                        <li class="list-group-item bg-transparent text-light border-secondary d-flex justify-content-between align-items-center px-0">
                            <span class="text-secondary"><i class="bi bi-clock-history me-2"></i>Join Date</span>
                            <span class="fw-semibold" th:text="${#dates.format(user.dateJoined, 'dd MMM yyyy')}">01 Jan 2026</span>
                        </li>
                    </ul>
                </div>

                <!-- Academic Activity (Mock Data) -->
                <div class="section-card" style="padding: 2rem;">
                    <h4 class="brand-font fw-bold mb-4 d-flex align-items-center"><i class="bi bi-activity text-success me-2"></i> Academic Activity</h4>
                    
                    <div class="d-flex flex-column gap-3">
                        <div class="d-flex justify-content-between align-items-center p-3 rounded-3" style="background-color: #1a1a1a; border: 1px solid #27272a;">
                            <div>
                                <h6 class="mb-0 text-white fw-semibold"><i class="bi bi-star-fill text-warning me-2"></i>Saved Notes</h6>
                                <small class="text-secondary">Your personal collection</small>
                            </div>
                            <span class="badge bg-dark border border-secondary fs-6">12 Items</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center p-3 rounded-3" style="background-color: #1a1a1a; border: 1px solid #27272a;">
                            <div>
                                <h6 class="mb-0 text-white fw-semibold"><i class="bi bi-download text-primary me-2"></i>Download History</h6>
                                <small class="text-secondary">Past offline materials</small>
                            </div>
                            <span class="badge bg-dark border border-secondary fs-6">25 Files</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center p-3 rounded-3" style="background-color: #1a1a1a; border: 1px solid #27272a;">
                            <div>
                                <h6 class="mb-0 text-white fw-semibold"><i class="bi bi-journal-check text-success me-2"></i>Submitted Assignments</h6>
                                <small class="text-secondary">Tracked submissions</small>
                            </div>
                            <span class="badge bg-dark border border-secondary fs-6">8 Completed</span>
                        </div>
                        <div class="d-flex justify-content-between align-items-center p-3 rounded-3" style="background-color: #1a1a1a; border: 1px solid #27272a;">
                            <div>
                                <h6 class="mb-0 text-white fw-semibold"><i class="bi bi-file-text text-info me-2"></i>CAT History</h6>
                                <small class="text-secondary">Past test papers</small>
                            </div>
                            <span class="badge bg-dark border border-secondary fs-6">14 Viewed</span>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Right Column: Account Settings -->
            <div class="col-lg-7">
                <div class="section-card h-100" style="padding: 2rem;">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h4 class="brand-font fw-bold m-0 d-flex align-items-center"><i class="bi bi-gear-fill text-secondary me-2"></i> Account Settings</h4>
                        <a th:if="${editMode == false}" th:href="@{'/profile?edit=true'}" class="btn btn-sm btn-outline-light rounded-pill px-3"><i class="bi bi-pencil me-1"></i> Edit Profile</a>
                        <a th:if="${editMode}" th:href="@{'/profile'}" class="btn btn-sm btn-outline-danger rounded-pill px-3"><i class="bi bi-x-circle me-1"></i> Cancel</a>
                    </div>

                    <div th:if="${param.success}" class="alert alert-success alert-dismissible fade show" role="alert" style="background-color: rgba(25, 135, 84, 0.1); border-color: #198754; color: #75b798;">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        <span th:text="${param.success}">Profile updated successfully!</span>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    <div th:if="${param.error}" class="alert alert-danger alert-dismissible fade show" role="alert" style="background-color: rgba(220, 53, 69, 0.1); border-color: #dc3545; color: #ea868f;">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i>
                        <span th:text="${param.error}">Error updating profile.</span>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>

                    <div th:if="${editMode == false}" class="h-100 d-flex flex-column justify-content-center align-items-center text-secondary">
                        <i class="bi bi-shield-lock text-secondary opacity-50" style="font-size: 4rem; margin-bottom: 1rem;"></i>
                        <h5 class="text-white">Your settings are secure</h5>
                        <p class="text-center">Click the "Edit Profile" button to unlock your account settings, update your profile picture, and change your password.</p>
                    </div>

                    <form th:if="${editMode}" th:action="@{/profile}" method="post" enctype="multipart/form-data" th:object="${user}" class="mt-4">
                        <h6 class="text-secondary text-uppercase tracking-wider fw-bold mb-3"><i class="bi bi-image me-2"></i>Update Picture</h6>
                        <div class="mb-4 p-3 rounded-3" style="background-color: #1a1a1a; border: 1px solid #27272a;">
                            <label class="form-label text-light">Choose a new profile image</label>
                            <input type="file" name="file" class="form-control form-control-custom bg-dark" accept="image/*" />
                        </div>

                        <h6 class="text-secondary text-uppercase tracking-wider fw-bold mb-3 mt-5"><i class="bi bi-person-lines-fill me-2"></i>Personal Details</h6>
                        <div class="row g-3 mb-4 p-3 rounded-3" style="background-color: #1a1a1a; border: 1px solid #27272a;">
                            <div class="col-md-12 mb-2">
                                <label class="form-label text-light">Full Name</label>
                                <input type="text" th:field="*{name}" class="form-control form-control-custom" required />
                            </div>
                            <div class="col-md-12 mb-2">
                                <label class="form-label text-light">Email Address</label>
                                <input type="email" th:field="*{email}" class="form-control form-control-custom" required />
                            </div>
                            <div class="col-md-12 mb-2">
                                <label class="form-label text-light">Course / Program</label>
                                <input type="text" th:field="*{courseProgram}" class="form-control form-control-custom" placeholder="e.g., Computer Science" />
                            </div>
                        </div>

                        <h6 class="text-secondary text-uppercase tracking-wider fw-bold mb-3 mt-5"><i class="bi bi-mortarboard me-2"></i>Academic Status</h6>
                        <div class="row g-3 mb-5 p-3 rounded-3" style="background-color: #1a1a1a; border: 1px solid #27272a;">
                            <div class="col-md-6 mb-2">
                                <label class="form-label text-light">NTA Level</label>
                                <select th:field="*{level}" class="form-select form-select-custom">
                                    <option th:value="" disabled>Select level</option>
                                    <option th:value="4">4</option>
                                    <option th:value="5">5</option>
                                    <option th:value="6">6</option>
                                </select>
                            </div>
                            <div class="col-md-6 mb-2">
                                <label class="form-label text-light">Current Semester</label>
                                <select th:field="*{semester}" class="form-select form-select-custom">
                                    <option th:value="" disabled>Select semester</option>
                                    <option th:value="1">1</option>
                                    <option th:value="2">2</option>
                                </select>
                            </div>
                            <!-- Date Joined (Hidden for form binding but displayed readonly if wanted) -->
                            <input type="hidden" th:value="${#dates.format(user.dateJoined, 'yyyy-MM-dd HH:mm')}" />
                        </div>
                        
                        <div class="d-grid mt-4">
                            <button type="submit" class="btn btn-gradient py-3 fs-5"><i class="bi bi-save2-fill me-2"></i>Save Account Settings</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    </div>
    """

new_content = pattern.sub(replacement, content)

with open('src/main/resources/templates/profile.html', 'w') as f:
    f.write(new_content)
