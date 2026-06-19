import re

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

nested_archive_html = """                                                                            <div class="accordion-body py-3 ms-4">
                                                                                <div class="accordion accordion-flush" id="archiveNestedAccordion">
                                                                                    
                                                                                    <!-- Previous Notes -->
                                                                                    <div class="accordion-item bg-transparent border-0 mb-2">
                                                                                        <h2 class="accordion-header" id="headingPrevNotes">
                                                                                            <button class="accordion-button collapsed bg-dark text-white rounded p-3 premium-list-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrevNotes" aria-expanded="false" style="box-shadow: none;">
                                                                                                <i class="bi bi-folder2-open text-warning me-3 fs-5"></i> Previous Notes
                                                                                            </button>
                                                                                        </h2>
                                                                                        <div id="collapsePrevNotes" class="accordion-collapse collapse" data-bs-parent="#archiveNestedAccordion">
                                                                                            <div class="accordion-body py-2 ms-3 border-start border-secondary">
                                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-2 small fw-medium">
                                                                                                    <li class="text-secondary fst-italic">No previous notes archived yet.</li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- Previous Assignments -->
                                                                                    <div class="accordion-item bg-transparent border-0 mb-2">
                                                                                        <h2 class="accordion-header" id="headingPrevAssignments">
                                                                                            <button class="accordion-button collapsed bg-dark text-white rounded p-3 premium-list-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrevAssignments" aria-expanded="false" style="box-shadow: none;">
                                                                                                <i class="bi bi-folder2-open text-warning me-3 fs-5"></i> Previous Assignments
                                                                                            </button>
                                                                                        </h2>
                                                                                        <div id="collapsePrevAssignments" class="accordion-collapse collapse" data-bs-parent="#archiveNestedAccordion">
                                                                                            <div class="accordion-body py-2 ms-3 border-start border-secondary">
                                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-2 small fw-medium">
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>Assignment 1 - 2025</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>Assignment 1 - 2024</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>Assignment 1 - 2023</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item mt-2" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>Assignment 2 - 2025</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>Assignment 2 - 2024</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>Assignment 2 - 2023</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- CAT 1 Past Papers -->
                                                                                    <div class="accordion-item bg-transparent border-0 mb-2">
                                                                                        <h2 class="accordion-header" id="headingPrevCat1">
                                                                                            <button class="accordion-button collapsed bg-dark text-white rounded p-3 premium-list-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrevCat1" aria-expanded="false" style="box-shadow: none;">
                                                                                                <i class="bi bi-folder2-open text-warning me-3 fs-5"></i> CAT 1 Past Papers
                                                                                            </button>
                                                                                        </h2>
                                                                                        <div id="collapsePrevCat1" class="accordion-collapse collapse" data-bs-parent="#archiveNestedAccordion">
                                                                                            <div class="accordion-body py-2 ms-3 border-start border-secondary">
                                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-2 small fw-medium">
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>CAT 1 - 2025</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>CAT 1 - 2024</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>CAT 1 - 2023</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item mt-2" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-info"><i class="bi bi-archive-fill text-info me-2"></i>Archived CAT 1 Papers</a>
                                                                                                        <i class="bi bi-chevron-right text-secondary"></i>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- CAT 2 Past Papers -->
                                                                                    <div class="accordion-item bg-transparent border-0 mb-2">
                                                                                        <h2 class="accordion-header" id="headingPrevCat2">
                                                                                            <button class="accordion-button collapsed bg-dark text-white rounded p-3 premium-list-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrevCat2" aria-expanded="false" style="box-shadow: none;">
                                                                                                <i class="bi bi-folder2-open text-warning me-3 fs-5"></i> CAT 2 Past Papers
                                                                                            </button>
                                                                                        </h2>
                                                                                        <div id="collapsePrevCat2" class="accordion-collapse collapse" data-bs-parent="#archiveNestedAccordion">
                                                                                            <div class="accordion-body py-2 ms-3 border-start border-secondary">
                                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-2 small fw-medium">
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>CAT 2 - 2025</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>CAT 2 - 2024</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>CAT 2 - 2023</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item mt-2" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-info"><i class="bi bi-archive-fill text-info me-2"></i>Archived CAT 2 Papers</a>
                                                                                                        <i class="bi bi-chevron-right text-secondary"></i>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                    <!-- University Examination Archive -->
                                                                                    <div class="accordion-item bg-transparent border-0 mb-2">
                                                                                        <h2 class="accordion-header" id="headingPrevUE">
                                                                                            <button class="accordion-button collapsed bg-dark text-white rounded p-3 premium-list-item" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePrevUE" aria-expanded="false" style="box-shadow: none;">
                                                                                                <i class="bi bi-folder2-open text-warning me-3 fs-5"></i> University Examination Archive
                                                                                            </button>
                                                                                        </h2>
                                                                                        <div id="collapsePrevUE" class="accordion-collapse collapse" data-bs-parent="#archiveNestedAccordion">
                                                                                            <div class="accordion-body py-2 ms-3 border-start border-secondary">
                                                                                                <ul class="list-unstyled mb-0 d-flex flex-column gap-2 small fw-medium">
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>UE - 2025</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>UE - 2024</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-light"><i class="bi bi-file-earmark-pdf text-danger me-2"></i>UE - 2023</a>
                                                                                                        <i class="bi bi-download text-secondary" style="cursor:pointer;"></i>
                                                                                                    </li>
                                                                                                    <li class="d-flex justify-content-between align-items-center p-2 rounded premium-list-item mt-2" style="background-color: #1a1a1a;">
                                                                                                        <a href="#" class="text-decoration-none text-info"><i class="bi bi-archive-fill text-info me-2"></i>Historical Examination Archive</a>
                                                                                                        <i class="bi bi-chevron-right text-secondary"></i>
                                                                                                    </li>
                                                                                                </ul>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                </div>
                                                                            </div>"""

start_str = '<div class="accordion-body py-3 ms-4">'
end_str = '</div>\n                                                                        </div>\n                                                                    </div>\n\n                                                                </div>\n                                                            </div>'
# We will use regex to find the block inside #collapseArchive
pattern = re.compile(r'<div id="collapseArchive" class="accordion-collapse collapse" aria-labelledby="headingArchive" data-bs-parent="#subjectContentAccordion">\s*<div class="accordion-body py-3 ms-4">.*?</div>\s*</div>\s*</div>', re.DOTALL)

replacement_full = f"""<div id="collapseArchive" class="accordion-collapse collapse" aria-labelledby="headingArchive" data-bs-parent="#subjectContentAccordion">\n{nested_archive_html}\n                                                                        </div>\n                                                                    </div>"""

content = pattern.sub(replacement_full, content)

with open('../src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)
