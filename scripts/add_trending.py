import re

def add_trending_section():
    filename = '../src/main/resources/templates/guest_notes.html'
    with open(filename, 'r') as f:
        content = f.read()

    trending_html = """
                    <!-- TRENDING NOTES SECTION -->
                    <div class="trending-section mt-4 position-relative" th:if="${notes != null && !#lists.isEmpty(notes)}">
                        <div class="d-flex align-items-center mb-3">
                            <div class="icon-box d-flex align-items-center justify-content-center me-2" style="width: 30px; height: 30px; border-radius: 8px; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; box-shadow: 0 4px 10px rgba(239,68,68,0.3);">
                                <i class="bi bi-fire"></i>
                            </div>
                            <h3 class="fw-bold m-0" style="font-size: 1.1rem; color: #1e293b; letter-spacing: 0.5px; text-transform: uppercase;">Most Downloaded</h3>
                        </div>
                        
                        <div class="d-flex flex-column gap-3">
                            <div th:each="note, stat : ${notes}" th:if="${stat.index < 3}" class="trending-card p-3 rounded-4 position-relative overflow-hidden" style="background: #ffffff; border: 1px solid rgba(0,0,0,0.03); box-shadow: 0 4px 15px rgba(0,0,0,0.02); transition: all 0.3s ease;">
                                <!-- Subtle gradient background on hover -->
                                <div class="hover-gradient position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(135deg, transparent, rgba(37,99,235,0.03)); opacity: 0; transition: opacity 0.3s ease;"></div>
                                
                                <div class="d-flex align-items-center position-relative z-1">
                                    <div class="rank-badge d-flex align-items-center justify-content-center me-3 fw-bold" style="width: 35px; height: 35px; min-width: 35px; border-radius: 10px; background: #f8fafc; color: #64748b; font-size: 1rem; border: 1px solid rgba(0,0,0,0.05); transition: all 0.3s ease;" th:text="'#' + ${stat.index + 1}">#1</div>
                                    
                                    <div class="flex-grow-1 overflow-hidden me-2">
                                        <h6 class="mb-1 fw-bold text-truncate" style="font-size: 0.95rem; color: #0f172a;" th:text="${note.title}">Note Title</h6>
                                        <div class="d-flex align-items-center gap-2">
                                            <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.65rem; border: 1px solid rgba(245, 158, 11, 0.2);"><i class="bi bi-star-fill me-1"></i>Premium</span>
                                            <small class="text-secondary fw-semibold" style="font-size: 0.75rem;"><i class="bi bi-cloud-arrow-down-fill me-1" style="color: #2563eb;"></i><span th:text="${(850 - (stat.index * 230)) + '+'}">850+</span></small>
                                        </div>
                                    </div>
                                    
                                    <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm d-flex align-items-center justify-content-center trending-dl-btn" style="width: 36px; height: 36px; min-width: 36px; border-radius: 10px; background: rgba(37,99,235,0.05); color: #2563eb; border: 1px solid rgba(37,99,235,0.1); transition: all 0.2s;">
                                        <i class="bi bi-download"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                        
                        <style>
                            .trending-card:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.05) !important; border-color: rgba(37,99,235,0.1) !important; }
                            .trending-card:hover .hover-gradient { opacity: 1; }
                            .trending-card:hover .rank-badge { background: linear-gradient(135deg, #2563eb, #3b82f6) !important; color: white !important; border-color: transparent !important; box-shadow: 0 4px 10px rgba(37,99,235,0.3); }
                            .trending-dl-btn:hover { background: #2563eb !important; color: white !important; box-shadow: 0 4px 10px rgba(37,99,235,0.3); }
                        </style>
                    </div>"""

    # We need to insert this right after the premium-card ends.
    # The premium-card ends at:
    #                             </a>
    #                         </div>
    #                     </div>
    #                 </div>
    # 
    #         </div>
    
    target_str = """                            </a>
                        </div>
                    </div>"""
                    
    replacement_str = target_str + "\n" + trending_html
    
    if target_str in content:
        content = content.replace(target_str, replacement_str)
        with open(filename, 'w') as f:
            f.write(content)
        print("Successfully added trending section")
    else:
        print("Could not find insertion point")

add_trending_section()
