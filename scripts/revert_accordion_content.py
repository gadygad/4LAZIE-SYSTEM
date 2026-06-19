import re

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

pattern = re.compile(r'(<div class="accordion accordion-flush" id="subjectContentAccordion">).*?(</div>\s*</div>\s*</div>\s*</div>)', re.DOTALL)

replacement = r"""\1
                                                                    
                                                                    <!-- Notes & Learning Materials -->
                                                                    <div class="accordion-item bg-transparent border-bottom">
                                                                        <h2 class="accordion-header" id="headingNotes">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNotes" aria-expanded="false" aria-controls="collapseNotes" style="font-size: 1.1rem; letter-spacing: 1px;">
                                                                                <span style="font-size: 1.3rem;" class="me-3">📘</span> NOTES & LEARNING MATERIALS
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseNotes" class="accordion-collapse collapse" aria-labelledby="headingNotes" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'Note'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <span style="font-size: 1.2rem;" class="me-2">📄</span>
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
                                                                    
                                                                    <!-- Assignment 1 -->
                                                                    <div class="accordion-item bg-transparent border-bottom">
                                                                        <h2 class="accordion-header" id="headingAssignment1">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAssignment1" aria-expanded="false" aria-controls="collapseAssignment1" style="font-size: 1.1rem; letter-spacing: 1px;">
                                                                                <span style="font-size: 1.3rem;" class="me-3">📌</span> ASSIGNMENT 1
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseAssignment1" class="accordion-collapse collapse" aria-labelledby="headingAssignment1" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'Assignment 1'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <span style="font-size: 1.2rem;" class="me-2">📄</span>
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

                                                                    <!-- CAT 1 -->
                                                                    <div class="accordion-item bg-transparent border-bottom">
                                                                        <h2 class="accordion-header" id="headingCat1">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCat1" aria-expanded="false" aria-controls="collapseCat1" style="font-size: 1.1rem; letter-spacing: 1px;">
                                                                                <span style="font-size: 1.3rem;" class="me-3">📝</span> CAT 1
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseCat1" class="accordion-collapse collapse" aria-labelledby="headingCat1" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'CAT 1'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <span style="font-size: 1.2rem;" class="me-2">📄</span>
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

                                                                    <!-- Assignment 2 -->
                                                                    <div class="accordion-item bg-transparent border-bottom">
                                                                        <h2 class="accordion-header" id="headingAssignment2">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAssignment2" aria-expanded="false" aria-controls="collapseAssignment2" style="font-size: 1.1rem; letter-spacing: 1px;">
                                                                                <span style="font-size: 1.3rem;" class="me-3">📌</span> ASSIGNMENT 2
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseAssignment2" class="accordion-collapse collapse" aria-labelledby="headingAssignment2" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'Assignment 2'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <span style="font-size: 1.2rem;" class="me-2">📄</span>
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

                                                                    <!-- CAT 2 -->
                                                                    <div class="accordion-item bg-transparent border-bottom">
                                                                        <h2 class="accordion-header" id="headingCat2">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCat2" aria-expanded="false" aria-controls="collapseCat2" style="font-size: 1.1rem; letter-spacing: 1px;">
                                                                                <span style="font-size: 1.3rem;" class="me-3">📝</span> CAT 2
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseCat2" class="accordion-collapse collapse" aria-labelledby="headingCat2" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'CAT 2'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <span style="font-size: 1.2rem;" class="me-2">📄</span>
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

                                                                    <!-- UE -->
                                                                    <div class="accordion-item bg-transparent border-bottom">
                                                                        <h2 class="accordion-header" id="headingUE">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#collapseUE" aria-expanded="false" aria-controls="collapseUE" style="font-size: 1.1rem; letter-spacing: 1px;">
                                                                                <span style="font-size: 1.3rem;" class="me-3">🎓</span> UNIVERSITY EXAMINATION (UE)
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseUE" class="accordion-collapse collapse" aria-labelledby="headingUE" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'University Examination'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <span style="font-size: 1.2rem;" class="me-2">📄</span>
                                                                                            <span th:text="${note.title}">UE Paper</span>
                                                                                        </a>
                                                                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm btn-outline-secondary rounded-pill" title="Download">
                                                                                            <i class="bi bi-download"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <!-- Archive -->
                                                                    <div class="accordion-item bg-transparent border-bottom">
                                                                        <h2 class="accordion-header" id="headingArchive">
                                                                            <button class="accordion-button collapsed bg-transparent text-white fw-bold text-uppercase" type="button" data-bs-toggle="collapse" data-bs-target="#collapseArchive" aria-expanded="false" aria-controls="collapseArchive" style="font-size: 1.1rem; letter-spacing: 1px;">
                                                                                <span style="font-size: 1.3rem;" class="me-3">📚</span> ACADEMIC REVISION & PAST PAPERS CENTER
                                                                            </button>
                                                                        </h2>
                                                                        <div id="collapseArchive" class="accordion-collapse collapse" aria-labelledby="headingArchive" data-bs-parent="#subjectContentAccordion">
                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-3 small fw-medium">
                                                                                    <li th:each="note : ${notes}" th:if="${note.category == 'Past Paper'}" class="d-flex justify-content-between align-items-center bg-dark p-2 rounded">
                                                                                        <a href="#" class="text-decoration-none text-light d-flex align-items-center" th:onclick="'openPreview(' + ${note.id} + ', \'' + ${note.title} + '\'); return false;'">
                                                                                            <span style="font-size: 1.2rem;" class="me-2">📄</span>
                                                                                            <span th:text="${note.title}">Past Paper</span>
                                                                                        </a>
                                                                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm btn-outline-secondary rounded-pill" title="Download">
                                                                                            <i class="bi bi-download"></i>
                                                                                        </a>
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>

\2"""

new_content = pattern.sub(replacement, content)

with open('../src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(new_content)
