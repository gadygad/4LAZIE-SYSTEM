import re

with open("../src/main/resources/templates/fragments/sjuit_components.html", "r") as f:
    content = f.read()

# Find the start and end of notes_accordion
start_str = '<!-- Dynamic Modules Section -->'
end_str = '<div th:if="${notes == null || #lists.isEmpty(notes)}"'

if start_str in content and end_str in content:
    idx_start = content.rfind(start_str)
    idx_end = content.find(end_str)

    new_html = """<!-- Dynamic Modules Section -->
<div th:fragment="notes_accordion" th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-5">
    
    <div class="accordion accordion-flush" id="premiumNotesAccordion">
        <div th:each="entry, stat : ${groupedNotes}" class="accordion-item mb-3 rounded-4 overflow-hidden border-0" 
             style="background: rgba(255,255,255,0.9); box-shadow: 0 4px 20px rgba(245, 158, 11, 0.05); animation: fadeInUp 0.5s ease forwards;" 
             th:styleappend="'animation-delay: ' + (${stat.index} * 0.1) + 's;'">
            
            <h2 class="accordion-header" th:id="'heading' + ${stat.index}">
                <button class="accordion-button collapsed px-4 py-3" type="button" data-bs-toggle="collapse" 
                        th:data-bs-target="'#collapse' + ${stat.index}" aria-expanded="false" 
                        th:aria-controls="'collapse' + ${stat.index}" 
                        style="background: linear-gradient(135deg, rgba(255,255,255,1), rgba(251,191,36,0.03)); border: 1px solid rgba(245, 158, 11, 0.1); border-radius: 1rem !important; transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);" 
                        onmouseover="this.style.background='linear-gradient(135deg, rgba(255,255,255,1), rgba(251,191,36,0.1))'; this.style.transform='translateX(4px)'; this.style.boxShadow='0 10px 25px rgba(245, 158, 11, 0.1)';" 
                        onmouseout="this.style.background='linear-gradient(135deg, rgba(255,255,255,1), rgba(251,191,36,0.03))'; this.style.transform='none'; this.style.boxShadow='none';">
                    
                    <div class="d-flex w-100 align-items-center justify-content-between pe-3">
                        <div class="d-flex align-items-center gap-3">
                            <div class="icon-box rounded-circle d-flex align-items-center justify-content-center shadow-sm" 
                                 style="width: 48px; height: 48px; min-width: 48px; color: white; background: linear-gradient(135deg, #f59e0b, #d97706); border: 2px solid rgba(251, 191, 36, 0.3);">
                                <i th:class="${entry.value.isEmpty() ? 'bi bi-star-fill' : 'bi bi-stack'}" style="font-size: 1.2rem; filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));"></i>
                            </div>
                            <div class="d-flex flex-column justify-content-center text-start">
                                <h5 class="mb-0 fw-bold text-uppercase" style="color: #78350f; font-family: 'Outfit', sans-serif; letter-spacing: -0.3px; font-size: 1.15rem;" th:text="${entry.key}">MODULE NAME</h5>
                                <span style="font-size: 0.75rem; color: #b45309; font-weight: 600;" th:text="${moduleCodes[entry.key] != null && !moduleCodes[entry.key].isEmpty() && moduleCodes[entry.key] != entry.key ? moduleCodes[entry.key] : 'SUBJECT CODE'}">CODE</span>
                            </div>
                        </div>
                        
                        <div>
                            <span th:if="${entry.value.isEmpty()}" class="badge rounded-pill" 
                                  style="background: linear-gradient(135deg, #1e293b, #0f172a); color: #f59e0b; padding: 6px 12px; font-size: 0.7rem; font-weight: 600; border: 1px solid rgba(245, 158, 11, 0.3); box-shadow: 0 4px 10px rgba(0,0,0,0.1);"><i class="bi bi-lock-fill me-1"></i> PREMIUM PENDING</span>
                            <span th:unless="${entry.value.isEmpty()}" class="badge rounded-pill" 
                                  style="background: linear-gradient(135deg, #fef3c7, #fef08a); color: #b45309; padding: 6px 12px; font-size: 0.7rem; font-weight: 700; border: 1px solid rgba(245, 158, 11, 0.4); box-shadow: 0 4px 10px rgba(245, 158, 11, 0.1);"><i class="bi bi-check-circle-fill me-1"></i> MATERIALS AVAILABLE</span>
                        </div>
                    </div>
                </button>
            </h2>
            
            <div th:id="'collapse' + ${stat.index}" class="accordion-collapse collapse" th:aria-labelledby="'heading' + ${stat.index}" data-bs-parent="#premiumNotesAccordion">
                <div class="accordion-body p-4" style="background: #fafafa; border-top: 1px dashed rgba(245, 158, 11, 0.2);">
                    
                    <!-- CASE 1: EMPTY -->
                    <div th:if="${entry.value.isEmpty()}" class="text-center py-5">
                        <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style="width: 60px; height: 60px; background: rgba(245, 158, 11, 0.1); color: #d97706;">
                            <i class="bi bi-hourglass-split fs-3"></i>
                        </div>
                        <h6 class="fw-bold" style="color: #78350f;">Coming Soon</h6>
                        <p class="text-muted mb-0" style="font-size: 0.9rem;">Course materials & assignments are being prepared.</p>
                    </div>
                    
                    <!-- CASE 2: HAS NOTES -->
                    <div th:unless="${entry.value.isEmpty()}" class="row g-4">
                        <!-- Left Column: Current Notes -->
                        <div class="col-md-7">
                            <div class="p-4 h-100" style="background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.04);">
                                <h6 class="fw-bold mb-3 d-flex align-items-center" style="color: #1e293b; font-family: 'Outfit', sans-serif;">
                                    <i class="bi bi-journal-bookmark-fill me-2" style="color: #3b82f6;"></i> CURRENT NOTES
                                </h6>
                                <div class="d-flex flex-column gap-2">
                                    <div th:each="unitNum : ${#numbers.sequence(1, 5)}">
                                        <th:block th:with="unitNotes=${entry.value.?[unitNumber == unitNum]}">
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
                                                        <a th:href="@{'/view/' + ${note.id}}" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1 position-relative overflow-hidden" style="font-size: 0.65rem; border-radius: 8px; background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.02)); border: 1px solid rgba(59,130,246,0.2); color: #3b82f6; transition: all 0.3s;" onmouseover="this.style.background='linear-gradient(135deg, #3b82f6, #2563eb)'; this.style.color='#fff';" onmouseout="this.style.background='linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.02))'; this.style.color='#3b82f6';"><i class="bi bi-eye-fill"></i> READ</a>
                                                        <a th:href="@{'/download/' + ${note.id}}" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1 position-relative overflow-hidden" style="font-size: 0.65rem; border-radius: 8px; background: linear-gradient(135deg, #1e293b, #0f172a); border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; transition: all 0.3s;" onmouseover="this.style.background='linear-gradient(135deg, #3b82f6, #2563eb)';" onmouseout="this.style.background='linear-gradient(135deg, #1e293b, #0f172a)';"><i class="bi bi-cloud-download-fill"></i> DOWNLOAD</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div th:if="${#lists.isEmpty(unitNotes)}">
                                                <div class="d-flex align-items-center justify-content-between p-2 rounded-3 mb-2" style="background: #f8fafc; border: 1px solid rgba(0,0,0,0.03); opacity: 0.6;">
                                                    <div class="d-flex align-items-center">
                                                        <div class="icon-box d-flex align-items-center justify-content-center me-3" style="width: 35px; height: 35px; border-radius: 10px; background: rgba(59,130,246,0.1); color: #3b82f6;">
                                                            <i class="bi bi-file-earmark-text-fill"></i>
                                                        </div>
                                                        <div>
                                                            <span class="d-block fw-bold" style="font-size: 0.8rem; color: #1e293b;" th:text="'UNIT ' + ${unitNum}">UNIT</span>
                                                            <span class="d-block text-secondary" style="font-size: 0.65rem; margin-top: 2px;">Waiting for upload</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </th:block>
                                    </div>
                                </div>
                                <div class="mt-4 p-3 rounded-4 position-relative overflow-hidden" style="background: linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.95)); border: 1px solid rgba(255,255,255,0.1);">
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
                                        <a href="/register" class="btn btn-sm fw-bold text-white" style="background: rgba(255,255,255,0.15); border-radius: 8px; font-size: 0.7rem; padding: 6px 12px; transition: all 0.3s ease;" onmouseover="this.style.background='#fff'; this.style.color='#0f172a';" onmouseout="this.style.background='rgba(255,255,255,0.15)'; this.style.color='#fff';">Explore Archive</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Right Column: Premium Resources -->
                        <div class="col-md-5">
                            <div class="p-4 h-100" style="background: #ffffff; border-radius: 16px; border: 1px solid rgba(0,0,0,0.04);">
                                <h6 class="fw-bold mb-3 d-flex align-items-center" style="color: #1e293b; font-family: 'Outfit', sans-serif;">
                                    <i class="bi bi-star-fill me-2" style="color: #f59e0b;"></i> PREMIUM RESOURCES
                                </h6>
                                <!-- Loop resources -->
                                <th:block th:each="resource : ${T(java.util.Arrays).asList('ASSIGNMENT 1', 'CAT 1', 'ASSIGNMENT 2', 'CAT 2')}">
                                    <a th:href="${user != null ? '#' : '/register'}" class="text-decoration-none d-block mb-2">
                                        <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                            <div class="d-flex align-items-center">
                                                <i th:class="${user != null ? 'bi bi-file-earmark-text-fill text-success me-3' : 'bi bi-file-earmark-lock2-fill text-warning me-3'}" style="font-size: 1.1rem;"></i>
                                                <div>
                                                    <span class="d-block text-uppercase" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;" th:text="${resource}">RESOURCE</span>
                                                    <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Questions & Marking Scheme</span>
                                                </div>
                                            </div>
                                            <span th:if="${user == null}" class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            <span th:if="${user != null}" class="badge" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-unlock-fill"></i> UNLOCKED</span>
                                        </div>
                                    </a>
                                </th:block>
                                <!-- UE -->
                                <a th:href="${user != null ? '#' : '/register'}" class="text-decoration-none d-block">
                                    <div class="d-flex align-items-center justify-content-between p-2 rounded-3 position-relative overflow-hidden" th:style="${user != null ? 'background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05)); border: 1px solid rgba(16, 185, 129, 0.2); transition: all 0.3s ease;' : 'background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(220, 38, 38, 0.05)); border: 1px solid rgba(239, 68, 68, 0.2); transition: all 0.3s ease;'}" th:onmouseover="${user != null ? 'this.style.transform=\'translateX(4px)\'; this.style.borderColor=\'#10b981\'; this.style.background=\'rgba(16, 185, 129, 0.1)\';' : 'this.style.transform=\'translateX(4px)\'; this.style.borderColor=\'#ef4444\'; this.style.background=\'rgba(239, 68, 68, 0.1)\';'}" th:onmouseout="${user != null ? 'this.style.transform=\'none\'; this.style.borderColor=\'rgba(16, 185, 129, 0.2)\'; this.style.background=\'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))\';' : 'this.style.transform=\'none\'; this.style.borderColor=\'rgba(239, 68, 68, 0.2)\'; this.style.background=\'linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(220, 38, 38, 0.05))\';'}">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div th:if="${notes == null || #lists.isEmpty(notes)}\""""

    new_full_content = content[:idx_start] + new_html + content[idx_end + len('<div th:if="${notes == null || #lists.isEmpty(notes)}"'):]
    
    with open("../src/main/resources/templates/fragments/sjuit_components.html", "w") as f:
        f.write(new_full_content)
    print("Replaced successfully")
else:
    print("Could not find delimiters")
