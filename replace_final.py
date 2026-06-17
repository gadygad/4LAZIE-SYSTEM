import re

with open("src/main/resources/templates/fragments/sjuit_components.html", "r") as f:
    content = f.read()

start_str = '<!-- Dynamic Modules Section -->'
end_str = '<div th:if="${notes == null || #lists.isEmpty(notes)}"'

if start_str in content and end_str in content:
    idx_start = content.rfind(start_str)
    idx_end = content.find(end_str)

    new_html = """<!-- Dynamic Modules Section -->
<div th:fragment="notes_accordion" th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-5 px-3">
    
    <div class="premium-text-list" style="font-family: 'Outfit', sans-serif;">
        <div th:each="entry, stat : ${groupedNotes}" class="mb-4" style="border-bottom: 1px solid rgba(245, 158, 11, 0.15); padding-bottom: 1.5rem; animation: fadeIn 0.8s ease forwards;" th:styleappend="'animation-delay: ' + (${stat.index} * 0.1) + 's;'">
            
            <!-- Header (Text Only, Small Size) -->
            <div class="d-flex align-items-center mb-3">
                <span class="fw-light me-3" style="color: #d97706; font-size: 1.1rem; font-family: serif;">[[${stat.count < 10 ? '0' + stat.count : stat.count}]].</span>
                <h4 class="mb-0 fw-bold text-uppercase" style="color: #78350f; letter-spacing: 1px; font-size: 0.95rem; transition: color 0.3s;" onmouseover="this.style.color='#d97706'" onmouseout="this.style.color='#78350f'" th:text="${entry.key}">MODULE NAME</h4>
                <span class="ms-3 px-2 py-1" style="font-size: 0.65rem; color: #b45309; background: rgba(245, 158, 11, 0.1); border-radius: 4px; letter-spacing: 1px;" th:text="${moduleCodes[entry.key] != null && !moduleCodes[entry.key].isEmpty() && moduleCodes[entry.key] != entry.key ? moduleCodes[entry.key] : 'SUBJECT CODE'}">CODE</span>
                
                <span th:if="${entry.value.isEmpty()}" class="ms-auto" style="color: #f59e0b; font-size: 0.75rem; font-style: italic; letter-spacing: 0.5px;">
                    Premium Pending...
                </span>
            </div>
            
            <!-- Body -->
            <div th:unless="${entry.value.isEmpty()}" class="ms-5 ps-3 mt-3" style="border-left: 1px solid rgba(245, 158, 11, 0.2);">
                <div class="row g-4">
                    <!-- Current Notes List (Left) -->
                    <div class="col-md-7">
                        <p class="mb-2 text-uppercase" style="font-size: 0.75rem; color: #b45309; font-weight: 700; letter-spacing: 2px;">Current Notes</p>
                        <ul class="list-unstyled mb-0" style="font-size: 0.95rem;">
                            <li th:each="unitNum : ${#numbers.sequence(1, 5)}" class="mb-2">
                                <th:block th:with="unitNotes=${entry.value.?[unitNumber == unitNum]}">
                                    <div th:if="${not #lists.isEmpty(unitNotes)}" class="d-flex align-items-center">
                                        <i class="bi bi-circle-fill me-2" style="color: #f59e0b; font-size: 0.3rem;"></i>
                                        <span class="fw-semibold me-2" style="color: #475569; min-width: 50px;">Unit [[${unitNum}]]:</span>
                                        <th:block th:each="note : ${unitNotes}">
                                            <a th:href="@{'/view/' + ${note.id}}" class="text-decoration-none me-2" style="color: #78350f; transition: color 0.3s;" onmouseover="this.style.color='#d97706'; this.style.textDecoration='underline !important';" onmouseout="this.style.color='#78350f'; this.style.textDecoration='none !important';" th:text="${note.title}">Note Title</a>
                                            <a th:href="@{'/download/' + ${note.id}}" class="text-muted" title="Download"><i class="bi bi-download" style="font-size: 0.8rem;"></i></a>
                                        </th:block>
                                    </div>
                                    <div th:if="${#lists.isEmpty(unitNotes)}" class="d-flex align-items-center" style="opacity: 0.5;">
                                        <i class="bi bi-circle me-2" style="color: #cbd5e1; font-size: 0.4rem;"></i>
                                        <span class="fw-semibold me-2" style="color: #94a3b8; min-width: 50px;">Unit [[${unitNum}]]:</span>
                                        <span style="font-size: 0.85rem; font-style: italic; color: #94a3b8;">Pending upload</span>
                                    </div>
                                </th:block>
                            </li>
                        </ul>
                    </div>
                    
                    <!-- Premium Resources List (Right) - Restored Smooth Appeal -->
                    <div class="col-md-5">
                        <div class="p-4 h-100" style="background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border-radius: 16px; border: 1px solid rgba(0,0,0,0.04);">
                            <h6 class="fw-bold mb-3 d-flex align-items-center" style="color: #1e293b; font-family: 'Outfit', sans-serif;">
                                <i class="bi bi-star-fill me-2" style="color: #f59e0b;"></i> PREMIUM RESOURCES
                            </h6>
                            <!-- Assignments and CATs -->
                            <th:block th:each="resource : ${T(java.util.Arrays).asList('ASSIGNMENT 1', 'CAT 1', 'ASSIGNMENT 2', 'CAT 2', 'UNIVERSITY EXAM (UE)')}">
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
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</div>

<div th:if="${notes == null || #lists.isEmpty(notes)}\""""

    new_full_content = content[:idx_start] + new_html + content[idx_end + len('<div th:if="${notes == null || #lists.isEmpty(notes)}"'):]
    
    with open("src/main/resources/templates/fragments/sjuit_components.html", "w") as f:
        f.write(new_full_content)
    print("Replaced successfully")
else:
    print("Could not find delimiters")
