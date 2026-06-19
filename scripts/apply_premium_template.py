import re

html_content = """
<!-- Dynamic Modules Section -->
<div th:fragment="notes_accordion" th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-5">
    
    <div th:each="entry, stat : ${groupedNotes}" class="mb-4" style="animation: fadeInUp 0.5s ease forwards;" th:styleappend="'animation-delay: ' + (${stat.index} * 0.1) + 's;'">
        <div class="p-4 bg-white position-relative overflow-hidden" 
             style="border-radius: 20px; border: 1px solid rgba(0,0,0,0.03); box-shadow: 0 10px 30px rgba(0,0,0,0.04); transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
            
            <!-- Dynamic colorful gradient background -->
            <div class="position-absolute top-0 start-0 w-100 h-100 opacity-25" 
                 th:style="'background: ' + (${stat.index} % 5 == 0 ? 'linear-gradient(135deg, rgba(59,130,246,0.1), transparent)' : (${stat.index} % 5 == 1 ? 'linear-gradient(135deg, rgba(236,72,153,0.1), transparent)' : (${stat.index} % 5 == 2 ? 'linear-gradient(135deg, rgba(16,185,129,0.1), transparent)' : (${stat.index} % 5 == 3 ? 'linear-gradient(135deg, rgba(245,158,11,0.1), transparent)' : 'linear-gradient(135deg, rgba(139,92,246,0.1), transparent)')))) + '; pointer-events: none; z-index: 0;'">
            </div>

            <div class="d-flex align-items-center mb-4 position-relative z-1">
                <div class="icon-box rounded-4 d-flex align-items-center justify-content-center me-3 shadow-sm" 
                     th:style="'width: 55px; height: 55px; min-width: 55px; color: white; background: ' + (${stat.index} % 5 == 0 ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : (${stat.index} % 5 == 1 ? 'linear-gradient(135deg, #ec4899, #db2777)' : (${stat.index} % 5 == 2 ? 'linear-gradient(135deg, #10b981, #059669)' : (${stat.index} % 5 == 3 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #8b5cf6, #7c3aed'))))">
                    <i class="bi bi-stack fs-3"></i>
                </div>
                <div>
                    <h4 class="mb-1 fw-bold text-uppercase" style="color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: -0.5px; font-size: 1.3rem;" th:text="${entry.key}">MODULE NAME</h4>
                    <span class="badge" th:style="'font-size: 0.7rem; padding: 6px 12px; border-radius: 8px; font-weight: 600; color: ' + (${stat.index} % 5 == 0 ? '#2563eb; background: rgba(59,130,246,0.1);' : (${stat.index} % 5 == 1 ? '#db2777; background: rgba(236,72,153,0.1);' : (${stat.index} % 5 == 2 ? '#059669; background: rgba(16,185,129,0.1);' : (${stat.index} % 5 == 3 ? '#d97706; background: rgba(245,158,11,0.1);' : '#7c3aed; background: rgba(139,92,246,0.1);'))))" th:text="${moduleCodes[entry.key] != null && !moduleCodes[entry.key].isEmpty() && moduleCodes[entry.key] != entry.key ? moduleCodes[entry.key] : 'MODULE CODE'}">CODE</span>
                </div>
            </div>

            <div class="row g-4 position-relative z-1">
                <!-- Left Column: Current Notes -->
                <div class="col-md-7">
                    <div class="p-4 h-100" style="background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border-radius: 16px; border: 1px solid rgba(0,0,0,0.04);">
                        <h6 class="fw-bold mb-3 d-flex align-items-center" style="color: #1e293b; font-family: 'Outfit', sans-serif;">
                            <i class="bi bi-journal-bookmark-fill me-2" style="color: #3b82f6;"></i> CURRENT NOTES
                        </h6>
                        <div class="d-flex flex-column gap-2">
                            
                            <!-- Iterate Units 1 to 5 -->
                            <div th:each="unitNum : ${#numbers.sequence(1, 5)}">
                                <th:block th:with="unitNotes=${entry.value.?[unitNumber == unitNum]}">
                                    
                                    <!-- Case 1: Notes exist for this unit -->
                                    <div th:if="${not #lists.isEmpty(unitNotes)}">
                                        <div th:each="note : ${unitNotes}" class="d-flex align-items-center justify-content-between p-2 rounded-3 mb-2" style="background: #f8fafc; border: 1px solid rgba(0,0,0,0.03); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(5px)'; this.style.borderColor='rgba(59,130,246,0.2)'; this.style.background='#ffffff'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.03)';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(0,0,0,0.03)'; this.style.background='#f8fafc'; this.style.boxShadow='none';">
                                            <div class="d-flex align-items-center">
                                                <div class="icon-box d-flex align-items-center justify-content-center me-3" style="width: 35px; height: 35px; border-radius: 10px; background: rgba(59,130,246,0.1); color: #3b82f6;">
                                                    <i class="bi bi-file-earmark-text-fill"></i>
                                                </div>
                                                <div>
                                                    <span class="d-block fw-bold text-uppercase" style="font-size: 0.8rem; color: #1e293b;" th:text="'UNIT ' + ${unitNum}">UNIT</span>
                                                    <span class="d-block text-secondary text-uppercase" style="font-size: 0.65rem; margin-top: 2px;" th:text="${note.title}">NOTE TITLE</span>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-2">
                                                <a th:href="@{'/view/' + ${note.id}}" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1 position-relative overflow-hidden" style="font-size: 0.65rem; border-radius: 8px; background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.02)); border: 1px solid rgba(59,130,246,0.2); color: #3b82f6; box-shadow: 0 2px 6px rgba(59,130,246,0.06); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-transform: uppercase; letter-spacing: 0.5px;" onmouseover="this.style.background='linear-gradient(135deg, #3b82f6, #2563eb)'; this.style.color='#fff'; this.style.borderColor='transparent'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(59,130,246,0.25)';" onmouseout="this.style.background='linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.02))'; this.style.color='#3b82f6'; this.style.borderColor='rgba(59,130,246,0.2)'; this.style.transform='none'; this.style.boxShadow='0 2px 6px rgba(59,130,246,0.06)';"><i class="bi bi-eye-fill"></i> READ</a>
                                                <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1 position-relative overflow-hidden" style="font-size: 0.65rem; border-radius: 8px; background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; box-shadow: 0 4px 10px rgba(15,23,42,0.2); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-transform: uppercase; letter-spacing: 0.5px;" onmouseover="this.style.background='linear-gradient(135deg, #3b82f6, #2563eb)'; this.style.color='#fff'; this.style.borderColor='transparent'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(37,99,235,0.3)';" onmouseout="this.style.background='linear-gradient(135deg, #1e293b, #0f172a)'; this.style.color='#f8fafc'; this.style.borderColor='rgba(255,255,255,0.1)'; this.style.transform='none'; this.style.boxShadow='0 4px 10px rgba(15,23,42,0.2)';"><i class="bi bi-cloud-download-fill"></i> DOWNLOAD</a>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Case 2: No Notes for this unit (Show Placeholder) -->
                                    <div th:if="${#lists.isEmpty(unitNotes)}">
                                        <div class="d-flex align-items-center justify-content-between p-2 rounded-3 mb-2" style="background: #f8fafc; border: 1px solid rgba(0,0,0,0.03); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(5px)'; this.style.borderColor='rgba(59,130,246,0.2)'; this.style.background='#ffffff'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.03)';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(0,0,0,0.03)'; this.style.background='#f8fafc'; this.style.boxShadow='none';">
                                            <div class="d-flex align-items-center">
                                                <div class="icon-box d-flex align-items-center justify-content-center me-3" style="width: 35px; height: 35px; border-radius: 10px; background: rgba(59,130,246,0.1); color: #3b82f6;">
                                                    <i class="bi bi-file-earmark-text-fill"></i>
                                                </div>
                                                <div>
                                                    <span class="d-block fw-bold" style="font-size: 0.8rem; color: #1e293b;" th:text="'UNIT ' + ${unitNum}">UNIT</span>
                                                    <span class="d-block text-secondary" style="font-size: 0.65rem; margin-top: 2px;">Waiting for upload</span>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-2">
                                                <a href="#" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1 position-relative overflow-hidden" style="font-size: 0.65rem; border-radius: 8px; background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.02)); border: 1px solid rgba(59,130,246,0.2); color: #3b82f6; box-shadow: 0 2px 6px rgba(59,130,246,0.06); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-transform: uppercase; letter-spacing: 0.5px;" onmouseover="this.style.background='linear-gradient(135deg, #3b82f6, #2563eb)'; this.style.color='#fff'; this.style.borderColor='transparent'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(59,130,246,0.25)';" onmouseout="this.style.background='linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.02))'; this.style.color='#3b82f6'; this.style.borderColor='rgba(59,130,246,0.2)'; this.style.transform='none'; this.style.boxShadow='0 2px 6px rgba(59,130,246,0.06)';"><i class="bi bi-eye-fill"></i> READ</a>
                                                <a href="#" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1 position-relative overflow-hidden" style="font-size: 0.65rem; border-radius: 8px; background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; box-shadow: 0 4px 10px rgba(15,23,42,0.2); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-transform: uppercase; letter-spacing: 0.5px;" onmouseover="this.style.background='linear-gradient(135deg, #3b82f6, #2563eb)'; this.style.color='#fff'; this.style.borderColor='transparent'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(37,99,235,0.3)';" onmouseout="this.style.background='linear-gradient(135deg, #1e293b, #0f172a)'; this.style.color='#f8fafc'; this.style.borderColor='rgba(255,255,255,0.1)'; this.style.transform='none'; this.style.boxShadow='0 4px 10px rgba(15,23,42,0.2)';"><i class="bi bi-cloud-download-fill"></i> DOWNLOAD</a>
                                            </div>
                                        </div>
                                    </div>

                                </th:block>
                            </div>

                        </div>

                        <!-- Previous Years Box -->
                        <div class="mt-4 p-3 rounded-4 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95)); border: 1px solid rgba(255,255,255,0.1);">
                            <!-- Glass shine -->
                            <div class="position-absolute top-0 start-0 w-100 h-100" style="background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%); pointer-events: none;"></div>
                            <div class="d-flex align-items-center justify-content-between position-relative z-1">
                                <div class="d-flex align-items-center">
                                    <div class="icon-box d-flex align-items-center justify-content-center me-3" style="width: 40px; height: 40px; border-radius: 12px; background: rgba(255,255,255,0.1); color: #fff; backdrop-filter: blur(5px);">
                                        <i class="bi bi-clock-history fs-5"></i>
                                    </div>
                                    <div>
                                        <h6 class="m-0 fw-bold text-white" style="font-size: 0.9rem;">Previous Years Notes</h6>
                                        <span style="font-size: 0.7rem; color: #94a3b8;">Explore archived materials</span>
                                    </div>
                                </div>
                                <a href="/register" class="btn btn-sm fw-bold text-white" style="background: rgba(255,255,255,0.15); border-radius: 8px; font-size: 0.7rem; padding: 6px 12px; transition: all 0.3s ease;" onmouseover="this.style.background='#fff'; this.style.color='#0f172a';" onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.color='#fff';">
                                    Explore Archive
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Premium Resources -->
                <div class="col-md-5">
                    <div class="p-4 h-100" style="background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border-radius: 16px; border: 1px solid rgba(0,0,0,0.04);">
                        <h6 class="fw-bold mb-3 d-flex align-items-center" style="color: #1e293b; font-family: 'Outfit', sans-serif;">
                            <i class="bi bi-star-fill me-2" style="color: #f59e0b;"></i> PREMIUM RESOURCES
                        </h6>

                        <!-- ASSIGNMENT 1 -->
                        <a href="/register" class="text-decoration-none d-block mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">ASSIGNMENT 1</span>
                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Questions & Marking Scheme</span>
                                    </div>
                                </div>
                                <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                            </div>
                        </a>

                        <!-- CAT 1 -->
                        <a href="/register" class="text-decoration-none d-block mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">CAT 1</span>
                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Past Paper + Answers</span>
                                    </div>
                                </div>
                                <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                            </div>
                        </a>

                        <!-- ASSIGNMENT 2 -->
                        <a href="/register" class="text-decoration-none d-block mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">ASSIGNMENT 2</span>
                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Questions & Marking Scheme</span>
                                    </div>
                                </div>
                                <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                            </div>
                        </a>

                        <!-- CAT 2 -->
                        <a href="/register" class="text-decoration-none d-block mb-2">
                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">CAT 2</span>
                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Past Paper + Answers</span>
                                    </div>
                                </div>
                                <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                            </div>
                        </a>

                        <!-- UNIVERSITY EXAMINATION (UE) -->
                        <a href="/register" class="text-decoration-none d-block">
                            <div class="d-flex align-items-center justify-content-between p-2 rounded-3 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(220, 38, 38, 0.05)); border: 1px solid rgba(239, 68, 68, 0.2); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#ef4444'; this.style.background='rgba(239, 68, 68, 0.1)';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(239, 68, 68, 0.2)'; this.style.background='linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(220, 38, 38, 0.05))';">
                                <div class="d-flex align-items-center">
                                    <i class="bi bi-shield-lock-fill text-danger me-3" style="font-size: 1.1rem;"></i>
                                    <div>
                                        <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 800; color: #b91c1c;">UNIVERSITY EXAM (UE)</span>
                                        <span class="d-block text-danger" style="font-size: 0.6rem; margin-top: 2px; opacity: 0.8;">Past Papers + Marking Schemes</span>
                                    </div>
                                </div>
                                <span class="badge" style="background: rgba(239, 68, 68, 0.1); color: #ef4444; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                            </div>
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
"""

with open("../src/main/resources/templates/fragments/sjuit_components.html", "r") as f:
    components = f.read()

# Replace the notes_accordion fragment
# We need to find <div th:fragment="notes_accordion" ... and everything inside it up to <div th:if="${notes == null || #lists.isEmpty(notes)}"
pattern = r'<div th:fragment="notes_accordion"[\s\S]*?(?=<div th:if="\$\{notes == null \|\| #lists\.isEmpty\(notes\)\}")'

new_components = re.sub(pattern, html_content + '\n', components)

with open("../src/main/resources/templates/fragments/sjuit_components.html", "w") as f:
    f.write(new_components)

print("Applied premium template to sjuit_components.html")
