import re

with open("../src/main/resources/templates/fragments/sjuit_components.html", "r") as f:
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
            
            <!-- Header (Text Only) -->
            <div class="d-flex align-items-center mb-3">
                <span class="fw-light me-3" style="color: #d97706; font-size: 1.5rem; font-family: serif;">[[${stat.count < 10 ? '0' + stat.count : stat.count}]].</span>
                <h4 class="mb-0 fw-bold text-uppercase" style="color: #78350f; letter-spacing: 1.5px; font-size: 1.2rem; transition: color 0.3s;" onmouseover="this.style.color='#d97706'" onmouseout="this.style.color='#78350f'" th:text="${entry.key}">MODULE NAME</h4>
                <span class="ms-3 px-2 py-1" style="font-size: 0.7rem; color: #b45309; background: rgba(245, 158, 11, 0.1); border-radius: 4px; letter-spacing: 1px;" th:text="${moduleCodes[entry.key] != null && !moduleCodes[entry.key].isEmpty() && moduleCodes[entry.key] != entry.key ? moduleCodes[entry.key] : 'SUBJECT CODE'}">CODE</span>
                
                <span th:if="${entry.value.isEmpty()}" class="ms-auto" style="color: #f59e0b; font-size: 0.8rem; font-style: italic; letter-spacing: 0.5px;">
                    Premium Pending...
                </span>
            </div>
            
            <!-- Body (Text Only) -->
            <div th:unless="${entry.value.isEmpty()}" class="ms-5 ps-3 mt-3" style="border-left: 1px solid rgba(245, 158, 11, 0.2);">
                <div class="row g-4">
                    <!-- Current Notes List -->
                    <div class="col-md-6">
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
                    
                    <!-- Premium Resources List -->
                    <div class="col-md-6">
                        <p class="mb-2 text-uppercase" style="font-size: 0.75rem; color: #b45309; font-weight: 700; letter-spacing: 2px;">Premium Resources</p>
                        <ul class="list-unstyled mb-0" style="font-size: 0.95rem;">
                            <!-- Assignments and CATs -->
                            <th:block th:each="resource : ${T(java.util.Arrays).asList('Assignment 1', 'CAT 1', 'Assignment 2', 'CAT 2', 'University Exam (UE)')}">
                                <li class="mb-2 d-flex align-items-center">
                                    <i class="bi bi-circle-fill me-2" style="color: #f59e0b; font-size: 0.3rem;"></i>
                                    <a th:href="${user != null ? '#' : '/register'}" class="text-decoration-none" style="color: #78350f; transition: color 0.3s;" onmouseover="this.style.color='#d97706'" onmouseout="this.style.color='#78350f'" th:text="${resource}">Resource Name</a>
                                    <i th:if="${user == null}" class="bi bi-lock-fill ms-2" style="color: #f59e0b; font-size: 0.7rem;" title="Premium Content"></i>
                                    <i th:if="${user != null}" class="bi bi-unlock-fill ms-2" style="color: #10b981; font-size: 0.7rem;" title="Unlocked"></i>
                                </li>
                            </th:block>
                        </ul>
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
