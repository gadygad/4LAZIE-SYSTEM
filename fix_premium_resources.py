import re

with open("src/main/resources/templates/fragments/sjuit_components.html", "r") as f:
    content = f.read()

# Replace the links inside the Right Column
def replace_resource(match):
    full = match.group(0)
    title = match.group(1)
    desc = match.group(2)
    bg_color = match.group(3)
    
    return f"""
                        <!-- {title} -->
                        <a th:href="${{user != null ? '#' : '/register'}}" class="text-decoration-none d-block mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;" th:class="${{user != null ? 'bi bi-file-earmark-text-fill text-success me-3' : 'bi bi-file-earmark-lock2-fill text-warning me-3'}}"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">{title}</span>
                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">{desc}</span>
                                    </div>
                                </div>
                                <span th:if="${{user == null}}" class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                <span th:if="${{user != null}}" class="badge" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-unlock-fill"></i> UNLOCKED</span>
                            </div>
                        </a>"""

# Since my python script earlier just hardcoded Assignment 1, CAT 1 etc, let me just rewrite the entire col-md-5 block manually.

new_col_md_5 = """
                <!-- Right Column: Premium Resources -->
                <div class="col-md-5">
                    <div class="p-4 h-100" style="background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border-radius: 16px; border: 1px solid rgba(0,0,0,0.04);">
                        <h6 class="fw-bold mb-3 d-flex align-items-center" style="color: #1e293b; font-family: 'Outfit', sans-serif;">
                            <i class="bi bi-star-fill me-2" style="color: #f59e0b;"></i> PREMIUM RESOURCES
                        </h6>

                        <!-- ASSIGNMENT 1 -->
                        <a th:href="${user != null ? '#' : '/register'}" class="text-decoration-none d-block mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                <div class="d-flex align-items-center">
                                    <i th:class="${user != null ? 'bi bi-file-earmark-text-fill text-success me-3' : 'bi bi-file-earmark-lock2-fill text-warning me-3'}" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">ASSIGNMENT 1</span>
                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Questions & Marking Scheme</span>
                                    </div>
                                </div>
                                <span th:if="${user == null}" class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                <span th:if="${user != null}" class="badge" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-unlock-fill"></i> UNLOCKED</span>
                            </div>
                        </a>

                        <!-- CAT 1 -->
                        <a th:href="${user != null ? '#' : '/register'}" class="text-decoration-none d-block mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                <div class="d-flex align-items-center">
                                    <i th:class="${user != null ? 'bi bi-file-earmark-text-fill text-success me-3' : 'bi bi-file-earmark-lock2-fill text-warning me-3'}" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">CAT 1</span>
                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Past Paper + Answers</span>
                                    </div>
                                </div>
                                <span th:if="${user == null}" class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                <span th:if="${user != null}" class="badge" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-unlock-fill"></i> UNLOCKED</span>
                            </div>
                        </a>

                        <!-- ASSIGNMENT 2 -->
                        <a th:href="${user != null ? '#' : '/register'}" class="text-decoration-none d-block mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                <div class="d-flex align-items-center">
                                    <i th:class="${user != null ? 'bi bi-file-earmark-text-fill text-success me-3' : 'bi bi-file-earmark-lock2-fill text-warning me-3'}" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">ASSIGNMENT 2</span>
                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Questions & Marking Scheme</span>
                                    </div>
                                </div>
                                <span th:if="${user == null}" class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                <span th:if="${user != null}" class="badge" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-unlock-fill"></i> UNLOCKED</span>
                            </div>
                        </a>

                        <!-- CAT 2 -->
                        <a th:href="${user != null ? '#' : '/register'}" class="text-decoration-none d-block mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                <div class="d-flex align-items-center">
                                    <i th:class="${user != null ? 'bi bi-file-earmark-text-fill text-success me-3' : 'bi bi-file-earmark-lock2-fill text-warning me-3'}" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">CAT 2</span>
                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Past Paper + Answers</span>
                                    </div>
                                </div>
                                <span th:if="${user == null}" class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                <span th:if="${user != null}" class="badge" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-unlock-fill"></i> UNLOCKED</span>
                            </div>
                        </a>

                        <!-- UNIVERSITY EXAMINATION (UE) -->
                        <a th:href="${user != null ? '#' : '/register'}" class="text-decoration-none d-block">
                            <div class="d-flex align-items-center justify-content-between p-2 rounded-3 position-relative overflow-hidden" th:style="${user != null ? 'background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05)); border: 1px solid rgba(16, 185, 129, 0.2); transition: all 0.3s ease;' : 'background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(220, 38, 38, 0.05)); border: 1px solid rgba(239, 68, 68, 0.2); transition: all 0.3s ease;'}" th:onmouseover="${user != null ? 'this.style.transform=\\'translateX(4px)\\'; this.style.borderColor=\\'#10b981\\'; this.style.background=\\'rgba(16, 185, 129, 0.1)\\';' : 'this.style.transform=\\'translateX(4px)\\'; this.style.borderColor=\\'#ef4444\\'; this.style.background=\\'rgba(239, 68, 68, 0.1)\\';'}" th:onmouseout="${user != null ? 'this.style.transform=\\'none\\'; this.style.borderColor=\\'rgba(16, 185, 129, 0.2)\\'; this.style.background=\\'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))\\';' : 'this.style.transform=\\'none\\'; this.style.borderColor=\\'rgba(239, 68, 68, 0.2)\\'; this.style.background=\\'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(220, 38, 38, 0.05))\\';'}">
                                <div class="d-flex align-items-center">
                                    <i th:class="${user != null ? 'bi bi-shield-check-fill text-success me-3' : 'bi bi-shield-lock-fill text-danger me-3'}" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 800;" th:styleappend="${user != null ? 'color: #047857;' : 'color: #b91c1c;'}">UNIVERSITY EXAM (UE)</span>
                                        <span class="d-block" style="font-size: 0.6rem; margin-top: 2px; opacity: 0.8;" th:styleappend="${user != null ? 'color: #059669;' : 'color: #ef4444;'}">Past Papers + Marking Schemes</span>
                                    </div>
                                </div>
                                <span th:if="${user == null}" class="badge" style="background: rgba(239, 68, 68, 0.1); color: #ef4444; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                <span th:if="${user != null}" class="badge" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-unlock-fill"></i> UNLOCKED</span>
                            </div>
                        </a>

                    </div>
                </div>
"""

pattern = r'<!-- Right Column: Premium Resources -->.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>'
content = re.sub(pattern, new_col_md_5 + '\n            </div>\n        </div>\n    </div>\n</div>\n', content, flags=re.DOTALL)

with open("src/main/resources/templates/fragments/sjuit_components.html", "w") as f:
    f.write(content)
