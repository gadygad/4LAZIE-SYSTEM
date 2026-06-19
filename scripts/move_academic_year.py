import re

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# 1. Add Academic Year to Filters
filter_replacement = """                                <div class="d-flex align-items-center gap-3 mb-3">
                                    <span class="fw-bold text-secondary text-uppercase small tracking-wider"><i class="bi bi-calendar-check-fill me-2"></i>ACADEMIC YEAR:</span>
                                    <div class="d-flex gap-2">
                                        <a href="#" class="btn-filter px-3 py-1 text-decoration-none rounded text-secondary" style="border: 1px solid #27272a;">[2024/2025]</a>
                                        <a href="#" class="btn-filter px-3 py-1 text-decoration-none rounded bg-light text-dark fw-bold" style="border: 1px solid #27272a;">[2025/2026]</a>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center gap-3">
                                    <span class="fw-bold text-secondary text-uppercase small tracking-wider"><i class="bi bi-calendar-event me-2"></i>SEMESTERS:</span>"""

content = content.replace('                                <div class="d-flex align-items-center gap-3">\n                                    <span class="fw-bold text-secondary text-uppercase small tracking-wider"><i class="bi bi-calendar-event me-2"></i>SEMESTERS:</span>', filter_replacement)


# 2. Remove the Academic Year Wrapper from the Accordion
academic_year_wrapper_start_pattern = re.compile(
    r'                            <!-- Academic Year Accordion -->\s*<div class="notes-tree mt-5" id="academicYearAccordion">\s*<div class="tree-node mb-4">\s*<h4 class="fw-bold text-light mb-3 brand-font d-flex align-items-center" data-bs-toggle="collapse" href="#collapseAcademicYear" role="button" aria-expanded="true" aria-controls="collapseAcademicYear" style="cursor: pointer; font-size: 1\.4rem;">\s*<i class="bi bi-calendar-check-fill text-white me-2"></i>ACADEMIC YEAR <span class="ms-1">2025/2026</span>\s*<i class="bi bi-chevron-down ms-2 fs-6 text-secondary"></i>\s*</h4>\s*<div class="collapse show tree-children ms-3 border-start border-secondary ps-4" id="collapseAcademicYear" data-bs-parent="#academicYearAccordion">\s*<!-- Notes Tree Structure \(Accordion\) -->\s*<div class="notes-tree mt-4" id="levelAccordion">'
)

content = academic_year_wrapper_start_pattern.sub('                            <!-- Notes Tree Structure (Accordion) -->\n                            <div class="notes-tree mt-5" id="levelAccordion">', content)

# 3. Remove the wrapper's closing tags
academic_year_wrapper_end_pattern = re.compile(
    r'                                        </div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*<!-- Right Sidebar \(col-lg-4\) -->'
)

content = academic_year_wrapper_end_pattern.sub(r'                                    </div>\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n\n                    <!-- Right Sidebar (col-lg-4) -->', content)

with open('../src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)
