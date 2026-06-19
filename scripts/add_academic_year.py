import re

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

# I want to find the <div class="notes-tree mt-5" id="levelAccordion"> and wrap it in academicYearAccordion
# But wait, in the current dashboard.html, it's <div class="notes-tree mt-5" id="levelAccordion">

academic_year_wrapper_start = """                            <!-- Academic Year Accordion -->
                            <div class="notes-tree mt-5" id="academicYearAccordion">
                                <div class="tree-node mb-4">
                                    <h4 class="fw-bold text-light mb-3 brand-font d-flex align-items-center" data-bs-toggle="collapse" href="#collapseAcademicYear" role="button" aria-expanded="true" aria-controls="collapseAcademicYear" style="cursor: pointer; font-size: 1.4rem;">
                                        <i class="bi bi-calendar-check-fill text-white me-2"></i>ACADEMIC YEAR <span class="ms-1">2025/2026</span>
                                        <i class="bi bi-chevron-down ms-2 fs-6 text-secondary"></i>
                                    </h4>
                                    <div class="collapse show tree-children ms-3 border-start border-secondary ps-4" id="collapseAcademicYear" data-bs-parent="#academicYearAccordion">
                                        
                                        <!-- Notes Tree Structure (Accordion) -->
                                        <div class="notes-tree mt-4" id="levelAccordion">"""

academic_year_wrapper_end = """                                        </div>

                                    </div>
                                </div>
                            </div>"""

# Replace the start
content = content.replace('                            <!-- Notes Tree Structure (Accordion) -->\n                            <div class="notes-tree mt-5" id="levelAccordion">', academic_year_wrapper_start)

# The end of levelAccordion is just before:
#                         </div>
#                     </div>
#                     <!-- Right Sidebar (col-lg-4) -->

# I will replace:
#                                             </div>
#                                         </div>
#                                     </div>
#                                 </div>
#                             </div>
#
#                         </div>
#                     </div>

# Let's find the closing divs for levelAccordion
pattern_end = re.compile(r'(                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n\n                    <!-- Right Sidebar \(col-lg-4\) -->)')

content = pattern_end.sub(academic_year_wrapper_end + r'\n                        </div>\n                    </div>\n\n                    <!-- Right Sidebar (col-lg-4) -->', content)

with open('../src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)
