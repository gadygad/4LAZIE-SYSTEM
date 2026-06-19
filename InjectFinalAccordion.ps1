$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"
$lines = Get-Content $path -Encoding UTF8
$startIndex = -1

for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'th:fragment="notes_accordion"') {
        $startIndex = $i
        break
    }
}

if ($startIndex -ne -1) {
    # Keep lines before notes_accordion
    $prefix = $lines[0..($startIndex-1)]
    
    # Append the new accordions
    $newContent = @'
<!-- ============================================================
     NOTES ACCORDION (Module-based)
     ============================================================ -->
<div th:fragment="notes_accordion" th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-5 px-3">
    <div class="accordion custom-module-accordion" id="accordionModules" style="font-family: 'Outfit', sans-serif;">
        <div th:each="entry, stat : ${groupedNotes}"
             class="accordion-item mb-3 position-relative"
             style="background: transparent; border: none; animation: fadeIn 0.5s ease forwards; opacity:0;"
             th:styleappend="'animation-delay: ' + (${stat.index} * 0.08) + 's;'">

            <!-- MODULE HEADER -->
            <h2 class="accordion-header m-0" th:id="'moduleHeading' + ${stat.index}">
                <button class="accordion-button collapsed py-3 px-4" type="button"
                        data-bs-toggle="collapse"
                        th:data-bs-target="'#moduleCollapse' + ${stat.index}"
                        aria-expanded="false"
                        style="border-radius: 12px; background: #fff; border: 1px solid rgba(217,119,6,0.12); box-shadow: 0 2px 8px rgba(0,0,0,0.04); transition: all 0.3s ease; font-family: 'Outfit', sans-serif;">
                    <div class="d-flex w-100 align-items-center justify-content-between me-2">
                        <div class="d-flex align-items-center">
                            <div class="d-flex align-items-center justify-content-center me-3 fw-bold"
                                 style="min-width:28px; height:28px; border-radius:8px; background: rgba(217,119,6,0.1); color: #d97706; font-size:0.75rem;">
                                [[${stat.count < 10 ? '0' + stat.count : stat.count}]]
                            </div>
                            <div class="d-flex flex-column">
                                <span class="fw-bold text-uppercase"
                                      style="font-size: 0.8rem; background: linear-gradient(to right, #92400e, #d97706); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: 0.5px;"
                                      th:text="${entry.key}">MODULE NAME</span>
                                <span class="fw-bold mt-1"
                                      style="font-size: 0.55rem; color: #92400e; background: rgba(217,119,6,0.08); border-radius: 4px; border: 1px solid rgba(217,119,6,0.12); padding: 1px 6px; max-width: max-content; letter-spacing: 0.5px;"
                                      th:text="${moduleCodes[entry.key] != null && !moduleCodes[entry.key].isEmpty() && moduleCodes[entry.key] != entry.key ? moduleCodes[entry.key] : 'SUBJECT CODE'}">CODE</span>
                            </div>
                        </div>
                        <div class="ms-auto me-2">
                            <span th:if="${entry.value.isEmpty()}"
                                  style="font-size: 0.6rem; color: #d97706; background: rgba(217,119,6,0.07); padding: 3px 8px; border-radius: 20px; font-weight: 700;">
                                <i class="bi bi-clock me-1"></i>Pending
                            </span>
                            <span th:if="${not entry.value.isEmpty()}"
                                  style="font-size: 0.6rem; color: #059669; background: rgba(16,185,129,0.07); padding: 3px 8px; border-radius: 20px; font-weight: 700;">
                                <i class="bi bi-check-circle-fill me-1"></i>Available
                            </span>
                        </div>
                    </div>
                </button>
            </h2>

            <!-- MODULE BODY -->
            <div th:id="'moduleCollapse' + ${stat.index}" class="accordion-collapse collapse">
                <div class="accordion-body px-0 pt-2 pb-0">
                    <!-- CATEGORY ACCORDION -->
                    <div class="accordion custom-category-accordion px-3 pb-3" th:id="'accordionCategory' + ${stat.index}">
                        
                        <!-- 1. LECTURE NOTES ITEM -->
                        <div class="accordion-item mb-2" style="border: 1px solid rgba(59,130,246,0.15); border-radius: 16px; background: rgba(248,250,255,0.8); overflow: hidden;">
                            <h2 class="accordion-header m-0">
                                <button class="accordion-button collapsed px-3 py-3" type="button" data-bs-toggle="collapse" th:data-bs-target="'#categoryCollapse1_' + ${stat.index}" style="background: transparent; border: none; box-shadow: none;">
                                    <div class="d-flex align-items-center w-100 me-2">
                                        <div style="width:28px; height:28px; border-radius:8px; background: rgba(59,130,246,0.12); color: #3b82f6; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right: 10px;">
                                            <i class="bi bi-book-half" style="font-size:0.9rem;"></i>
                                        </div>
                                        <span class="fw-bold" style="color: #1e40af; font-size: 0.85rem; letter-spacing: 0.5px;">1. LECTURE NOTES</span>
                                        <span class="ms-auto" style="background: rgba(16,185,129,0.12); color: #059669; border: 1px solid rgba(16,185,129,0.2); font-size: 0.55rem; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-family:'Outfit',sans-serif;">FREE</span>
                                    </div>
                                </button>
                            </h2>
                            <div th:id="'categoryCollapse1_' + ${stat.index}" class="accordion-collapse collapse" th:data-bs-parent="'#accordionCategory' + ${stat.index}">
                                <div class="accordion-body p-3 pt-0">
                                    <div class="accordion" th:id="'accordionUnits' + ${stat.index}" style="display:flex; flex-direction:column; gap:8px;">
                                        <div th:each="unitNum : ${#numbers.sequence(1, 5)}"
                                             style="border-radius: 12px; overflow: hidden; border: 1px solid rgba(59,130,246,0.12); background: #fff; box-shadow: 0 2px 5px rgba(0,0,0,0.02);">
                                            <th:block th:with="unitNotes=${entry.value.?[unitNumber == #unitNum]}">
                                                <button class="accordion-button collapsed px-3 py-2 w-100"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        th:data-bs-target="'#unitCollapse' + ${stat.index} + '_' + ${unitNum}"
                                                        style="background: transparent; border: none; font-family: 'Outfit', sans-serif; border-radius: 12px; box-shadow: none;">
                                                    <div class="d-flex align-items-center gap-3 w-100">
                                                        <div style="width:28px; height:28px; border-radius:8px; background: rgba(59,130,246,0.08); color: #3b82f6; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                                                            <i class="bi bi-sd-card"></i>
                                                        </div>
                                                        <div class="d-flex flex-column text-start">
                                                            <span class="fw-bold" style="color: #1e293b; font-size: 0.8rem; letter-spacing: 0.5px;">UNIT [[${unitNum}]]</span>
                                                            <span th:if="${#lists.isEmpty(unitNotes)}" style="font-size: 0.6rem; color: #94a3b8; font-weight: 600;">Pending</span>
                                                            <span th:if="${not #lists.isEmpty(unitNotes)}" style="font-size: 0.6rem; color: #10b981; font-weight: 700;">[[${#lists.size(unitNotes)}]] file(s) available</span>
                                                        </div>
                                                    </div>
                                                </button>
                                                <div th:id="'unitCollapse' + ${stat.index} + '_' + ${unitNum}"
                                                     class="accordion-collapse collapse"
                                                     th:data-bs-parent="'#accordionUnits' + ${stat.index}">
                                                    <div class="px-3 pb-3 pt-1 d-flex flex-column gap-2">
                                                        <th:block th:if="${not #lists.isEmpty(unitNotes)}" th:each="note : ${unitNotes}">
                                                            <div class="d-flex align-items-center bg-white rounded-3 p-2"
                                                                 style="border: 1px dashed rgba(59,130,246,0.2); gap:8px;">
                                                                <i class="bi bi-file-earmark-pdf-fill" style="color: #ef4444; font-size: 1rem;"></i>
                                                                <span class="text-truncate fw-semibold flex-grow-1" style="color: #334155; font-size: 0.75rem;" th:text="${note.title}">Note Title</span>
                                                                <div class="d-flex gap-2 flex-shrink-0">
                                                                    <button th:onclick="'openPreviewModal(\'' + ${note.id} + '\', \'' + ${#strings.replace(note.title, '''', '\''')} + '\')'"
                                                                            class="btn btn-sm fw-bold d-flex align-items-center" style="background:rgba(245,158,11,0.1); color:#d97706; padding:4px 10px; border-radius:8px; font-size: 0.7rem; transition: all 0.2s; border:none;" onmouseover="this.style.background='rgba(245,158,11,0.2)'" onmouseout="this.style.background='rgba(245,158,11,0.1)'">
                                                                        <i class="bi bi-book-half me-1"></i> Read
                                                                    </button>
                                                                    <a th:href="@{'/download/' + ${note.id}}"
                                                                       class="btn btn-sm fw-bold d-flex align-items-center" style="background:rgba(16,185,129,0.1); color:#059669; padding:4px 10px; border-radius:8px; font-size: 0.7rem; transition: all 0.2s; border:none; text-decoration: none;" onmouseover="this.style.background='rgba(16,185,129,0.2)'" onmouseout="this.style.background='rgba(16,185,129,0.1)'">
                                                                        <i class="bi bi-cloud-arrow-down-fill me-1"></i> Download
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </th:block>
                                                        <div th:if="${#lists.isEmpty(unitNotes)}" class="text-center py-2" style="color:#94a3b8; font-size:0.7rem;">
                                                            Not uploaded yet
                                                        </div>
                                                    </div>
                                                </div>
                                            </th:block>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2. ASSIGNMENTS ITEM -->
                        <div class="accordion-item mb-2" style="border: 1px solid rgba(245,158,11,0.2); border-radius: 16px; background: rgba(255,251,235,0.6); overflow: hidden;">
                            <h2 class="accordion-header m-0">
                                <button class="accordion-button collapsed px-3 py-3" type="button" data-bs-toggle="collapse" th:data-bs-target="'#categoryCollapse2_' + ${stat.index}" style="background: transparent; border: none; box-shadow: none;">
                                    <div class="d-flex align-items-center w-100 me-2">
                                        <div style="width:28px; height:28px; border-radius:8px; background: rgba(245,158,11,0.15); color: #d97706; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right: 10px;">
                                            <i class="bi bi-clipboard2-check-fill" style="font-size:0.9rem;"></i>
                                        </div>
                                        <span class="fw-bold" style="color: #92400e; font-size: 0.85rem; letter-spacing: 0.5px;">2. ASSIGNMENTS</span>
                                        <span class="ms-auto" style="background: rgba(245,158,11,0.15); color: #d97706; border: 1px solid rgba(245,158,11,0.25); font-size: 0.55rem; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-family:'Outfit',sans-serif;">EXCLUSIVE</span>
                                    </div>
                                </button>
                            </h2>
                            <div th:id="'categoryCollapse2_' + ${stat.index}" class="accordion-collapse collapse" th:data-bs-parent="'#accordionCategory' + ${stat.index}">
                                <div class="accordion-body p-3 pt-0">
                                    <div class="d-flex flex-column gap-2">
                                        <a href="/upgrade" class="bg-white rounded-3 p-3 text-decoration-none text-start d-flex justify-content-between align-items-center" style="border: 1px solid rgba(245,158,11,0.2); box-shadow: 0 2px 8px rgba(0,0,0,0.03); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(245,158,11,0.1)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.03)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-journal-text me-3" style="color: #d97706; font-size: 1.1rem;"></i>
                                                <span class="fw-bold text-dark" style="font-size:0.85rem; letter-spacing:0.3px;">Assignments & Solutions</span>
                                            </div>
                                            <span style="font-size:0.65rem; color:#b45309; background:rgba(245,158,11,0.1); padding:4px 8px; border-radius:6px; font-weight:bold;"><i class="bi bi-lock-fill me-1"></i>Premium</span>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-3 text-decoration-none text-start d-flex justify-content-between align-items-center" style="border: 1px solid rgba(245,158,11,0.2); box-shadow: 0 2px 8px rgba(0,0,0,0.03); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(245,158,11,0.1)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.03)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-ui-checks me-3" style="color: #d97706; font-size: 1.1rem;"></i>
                                                <span class="fw-bold text-dark" style="font-size:0.85rem; letter-spacing:0.3px;">CAT 1</span>
                                            </div>
                                            <span style="font-size:0.65rem; color:#b45309; background:rgba(245,158,11,0.1); padding:4px 8px; border-radius:6px; font-weight:bold;"><i class="bi bi-lock-fill me-1"></i>Premium</span>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-3 text-decoration-none text-start d-flex justify-content-between align-items-center" style="border: 1px solid rgba(245,158,11,0.2); box-shadow: 0 2px 8px rgba(0,0,0,0.03); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(245,158,11,0.1)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.03)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-ui-checks-grid me-3" style="color: #d97706; font-size: 1.1rem;"></i>
                                                <span class="fw-bold text-dark" style="font-size:0.85rem; letter-spacing:0.3px;">CAT 2</span>
                                            </div>
                                            <span style="font-size:0.65rem; color:#b45309; background:rgba(245,158,11,0.1); padding:4px 8px; border-radius:6px; font-weight:bold;"><i class="bi bi-lock-fill me-1"></i>Premium</span>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-3 text-decoration-none text-start d-flex justify-content-between align-items-center" style="border: 1px solid rgba(245,158,11,0.2); box-shadow: 0 2px 8px rgba(0,0,0,0.03); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(245,158,11,0.1)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.03)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-mortarboard-fill me-3" style="color: #d97706; font-size: 1.1rem;"></i>
                                                <span class="fw-bold text-dark" style="font-size:0.85rem; letter-spacing:0.3px;">University Exams (UE)</span>
                                            </div>
                                            <span style="font-size:0.65rem; color:#b45309; background:rgba(245,158,11,0.1); padding:4px 8px; border-radius:6px; font-weight:bold;"><i class="bi bi-lock-fill me-1"></i>Premium</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 3. PAST PAPERS ITEM -->
                        <div class="accordion-item" style="border: 1px solid rgba(217,119,6,0.3); border-radius: 16px; background: linear-gradient(135deg, #fffbeb, #fef3c7); overflow: hidden; box-shadow: 0 4px 15px rgba(217,119,6,0.1);">
                            <h2 class="accordion-header m-0">
                                <button class="accordion-button collapsed px-3 py-3" type="button" data-bs-toggle="collapse" th:data-bs-target="'#categoryCollapse3_' + ${stat.index}" style="background: transparent; border: none; box-shadow: none;">
                                    <div class="d-flex align-items-center w-100 me-2">
                                        <div style="width:28px; height:28px; border-radius:8px; background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right: 10px; box-shadow: 0 2px 5px rgba(217,119,6,0.3);">
                                            <i class="bi bi-archive-fill" style="font-size:0.85rem;"></i>
                                        </div>
                                        <span class="fw-bold" style="color: #92400e; font-size: 0.85rem; letter-spacing: 0.5px;">3. PAST PAPERS <span style="font-size:0.7rem; font-weight:600; color:#b45309;">(ARCHIVES)</span></span>
                                        <span class="ms-auto" style="background: linear-gradient(90deg, #f59e0b, #d97706); color: #fff; border: none; font-size: 0.55rem; padding: 3px 8px; border-radius: 6px; font-weight: 800; font-family:'Outfit',sans-serif; letter-spacing:0.5px; box-shadow: 0 2px 4px rgba(217,119,6,0.3);">PREMIUM</span>
                                    </div>
                                </button>
                            </h2>
                            <div th:id="'categoryCollapse3_' + ${stat.index}" class="accordion-collapse collapse" th:data-bs-parent="'#accordionCategory' + ${stat.index}">
                                <div class="accordion-body p-3 pt-0">
                                    <p style="font-size:0.7rem; color:#b45309; line-height:1.5; margin:0; margin-bottom:12px; font-weight:500;">Access complete premium archives from previous academic years to boost your preparation.</p>
                                    <div class="d-flex flex-column gap-2">
                                        <a href="/upgrade" class="bg-white rounded-3 p-3 text-decoration-none text-start d-flex justify-content-between align-items-center" style="border: 1px solid rgba(217,119,6,0.2); box-shadow: 0 2px 8px rgba(217,119,6,0.05); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(217,119,6,0.15)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(217,119,6,0.05)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-journal-text me-3" style="color: #d97706; font-size: 1.1rem;"></i>
                                                <span class="fw-bold" style="color:#92400e; font-size:0.85rem; letter-spacing:0.3px;">Past Assignments</span>
                                            </div>
                                            <span style="font-size:0.65rem; color:#fff; background:linear-gradient(135deg, #f59e0b, #d97706); padding:4px 8px; border-radius:6px; font-weight:bold; box-shadow: 0 2px 4px rgba(217,119,6,0.3);"><i class="bi bi-star-fill me-1" style="font-size:0.55rem;"></i>Gold</span>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-3 text-decoration-none text-start d-flex justify-content-between align-items-center" style="border: 1px solid rgba(217,119,6,0.2); box-shadow: 0 2px 8px rgba(217,119,6,0.05); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(217,119,6,0.15)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(217,119,6,0.05)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-ui-checks me-3" style="color: #d97706; font-size: 1.1rem;"></i>
                                                <span class="fw-bold" style="color:#92400e; font-size:0.85rem; letter-spacing:0.3px;">Past CAT 1</span>
                                            </div>
                                            <span style="font-size:0.65rem; color:#fff; background:linear-gradient(135deg, #f59e0b, #d97706); padding:4px 8px; border-radius:6px; font-weight:bold; box-shadow: 0 2px 4px rgba(217,119,6,0.3);"><i class="bi bi-star-fill me-1" style="font-size:0.55rem;"></i>Gold</span>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-3 text-decoration-none text-start d-flex justify-content-between align-items-center" style="border: 1px solid rgba(217,119,6,0.2); box-shadow: 0 2px 8px rgba(217,119,6,0.05); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(217,119,6,0.15)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(217,119,6,0.05)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-ui-checks-grid me-3" style="color: #d97706; font-size: 1.1rem;"></i>
                                                <span class="fw-bold" style="color:#92400e; font-size:0.85rem; letter-spacing:0.3px;">Past CAT 2</span>
                                            </div>
                                            <span style="font-size:0.65rem; color:#fff; background:linear-gradient(135deg, #f59e0b, #d97706); padding:4px 8px; border-radius:6px; font-weight:bold; box-shadow: 0 2px 4px rgba(217,119,6,0.3);"><i class="bi bi-star-fill me-1" style="font-size:0.55rem;"></i>Gold</span>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-3 text-decoration-none text-start d-flex justify-content-between align-items-center" style="border: 1px solid rgba(217,119,6,0.2); box-shadow: 0 2px 8px rgba(217,119,6,0.05); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(217,119,6,0.15)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(217,119,6,0.05)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-mortarboard-fill me-3" style="color: #d97706; font-size: 1.1rem;"></i>
                                                <span class="fw-bold" style="color:#92400e; font-size:0.85rem; letter-spacing:0.3px;">Past Univ. Exams (UE)</span>
                                            </div>
                                            <span style="font-size:0.65rem; color:#fff; background:linear-gradient(135deg, #f59e0b, #d97706); padding:4px 8px; border-radius:6px; font-weight:bold; box-shadow: 0 2px 4px rgba(217,119,6,0.3);"><i class="bi bi-star-fill me-1" style="font-size:0.55rem;"></i>Gold</span>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-3 text-decoration-none text-start d-flex justify-content-between align-items-center" style="border: 1px solid rgba(217,119,6,0.2); box-shadow: 0 2px 8px rgba(217,119,6,0.05); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 12px rgba(217,119,6,0.15)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 8px rgba(217,119,6,0.05)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-book-half me-3" style="color: #d97706; font-size: 1.1rem;"></i>
                                                <span class="fw-bold" style="color:#92400e; font-size:0.85rem; letter-spacing:0.3px;">Reference Books</span>
                                            </div>
                                            <span style="font-size:0.65rem; color:#fff; background:linear-gradient(135deg, #f59e0b, #d97706); padding:4px 8px; border-radius:6px; font-weight:bold; box-shadow: 0 2px 4px rgba(217,119,6,0.3);"><i class="bi bi-star-fill me-1" style="font-size:0.55rem;"></i>Gold</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <script>
            function toggleSection(btn, id) {
                const body = document.getElementById(id);
                if (!body) return;
                const isOpen = body.classList.contains('open');
                btn.classList.toggle('open', !isOpen);
                body.classList.toggle('open', !isOpen);
            }
            </script>
        </div>
    </div>
</div> <!-- Close th:fragment="notes_accordion" -->

<!-- ============================================================
     RESTRICTED MODAL (Guest Login Prompt)
     ============================================================ -->
<div th:fragment="restricted_modal">
    <div class="modal fade" id="restrictedModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" style="max-width: 420px;">
            <div class="modal-content border-0 position-relative overflow-hidden"
                 style="background: rgba(255, 255, 255, 0.97); backdrop-filter: blur(30px); border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05);">
                <!-- Top gradient -->
                <div style="position:absolute; top:0; left:0; right:0; height:4px; background: linear-gradient(90deg, #f59e0b, #d97706, #7c3aed);"></div>
                <button type="button" class="btn-close shadow-none position-absolute" data-bs-dismiss="modal" aria-label="Close"
                        style="top: 20px; right: 20px; z-index: 10; cursor: pointer; pointer-events: auto;"></button>
                <div class="modal-body p-4 pt-5">
                    <div class="text-center mb-4">
                        <div class="d-inline-flex align-items-center justify-content-center mb-3"
                             style="width:64px; height:64px; border-radius:20px; background: linear-gradient(135deg, rgba(245,158,11,0.1), rgba(217,119,6,0.15)); border: 1px solid rgba(245,158,11,0.2);">
                            <i class="bi bi-lock-fill" style="font-size:1.8rem; color:#d97706;"></i>
                        </div>
                        <h5 class="fw-bold mb-2" style="font-family:'Outfit',sans-serif; color:#1e293b;">Sign In Required</h5>
                        <p style="color:#64748b; font-size:0.85rem; line-height:1.6; margin:0;">
                            Create a free account or sign in to access this content and more exclusive study materials.
                        </p>
                    </div>
                    <div class="d-flex flex-column gap-2">
                        <a href="/login" class="btn fw-bold py-3 text-decoration-none"
                           style="background: linear-gradient(135deg, #f59e0b, #d97706); color:#fff; border:none; border-radius:14px; font-family:'Outfit',sans-serif; font-size:0.9rem; letter-spacing:0.5px; box-shadow: 0 4px 14px rgba(245,158,11,0.35);">
                            <i class="bi bi-box-arrow-in-right me-2"></i>Sign In
                        </a>
                        <a href="/register" class="btn fw-bold py-3 text-decoration-none"
                           style="background: transparent; color:#1e293b; border: 1px solid rgba(0,0,0,0.1); border-radius:14px; font-family:'Outfit',sans-serif; font-size:0.9rem;">
                            <i class="bi bi-person-plus me-2"></i>Create Free Account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
'@

    $finalContent = $prefix + $newContent
    Set-Content -Path $path -Value $finalContent -Encoding UTF8
    Write-Output "Successfully replaced notes_accordion from start index $startIndex."
} else {
    Write-Output "Could not find notes_accordion to replace."
}
