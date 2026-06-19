$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"

if (Test-Path $path) {
    $lines = Get-Content -Path $path -Encoding UTF8
    
    $startIndex = -1
    $endIndex = -1
    
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '<!-- GRID LAYOUT -->') {
            $startIndex = $i
        }
        if ($startIndex -ne -1 -and $lines[$i] -match '</div><!-- end row -->') {
            $endIndex = $i
            break
        }
    }
    
    if ($startIndex -ne -1 -and $endIndex -ne -1) {
        $newContent = @'
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
                                                                <div class="d-flex gap-1 flex-shrink-0">
                                                                    <button th:onclick="'openPreviewModal(\'' + ${note.id} + '\', \'' + ${#strings.replace(note.title, '''', '\''')} + '\')'"
                                                                            class="btn btn-sm" style="background:rgba(245,158,11,0.1); color:#d97706; padding:4px 8px; border-radius:6px;"><i class="bi bi-eye-fill"></i></button>
                                                                    <a th:href="@{'/download/' + ${note.id}}"
                                                                       class="btn btn-sm" style="background:rgba(16,185,129,0.1); color:#059669; padding:4px 8px; border-radius:6px;"><i class="bi bi-cloud-arrow-down-fill"></i></a>
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

                        <!-- 2. ASSESSMENTS ITEM -->
                        <div class="accordion-item mb-2" style="border: 1px solid rgba(245,158,11,0.2); border-radius: 16px; background: rgba(255,251,235,0.6); overflow: hidden;">
                            <h2 class="accordion-header m-0">
                                <button class="accordion-button collapsed px-3 py-3" type="button" data-bs-toggle="collapse" th:data-bs-target="'#categoryCollapse2_' + ${stat.index}" style="background: transparent; border: none; box-shadow: none;">
                                    <div class="d-flex align-items-center w-100 me-2">
                                        <div style="width:28px; height:28px; border-radius:8px; background: rgba(245,158,11,0.15); color: #d97706; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right: 10px;">
                                            <i class="bi bi-clipboard2-check-fill" style="font-size:0.9rem;"></i>
                                        </div>
                                        <span class="fw-bold" style="color: #92400e; font-size: 0.85rem; letter-spacing: 0.5px;">2. ASSESSMENTS</span>
                                        <span class="ms-auto" style="background: rgba(245,158,11,0.15); color: #d97706; border: 1px solid rgba(245,158,11,0.25); font-size: 0.55rem; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-family:'Outfit',sans-serif;">EXCLUSIVE</span>
                                    </div>
                                </button>
                            </h2>
                            <div th:id="'categoryCollapse2_' + ${stat.index}" class="accordion-collapse collapse" th:data-bs-parent="'#accordionCategory' + ${stat.index}">
                                <div class="accordion-body p-3 pt-0">
                                    <div class="row g-2">
                                        <div class="col-6">
                                            <a href="/upgrade" class="d-flex flex-column justify-content-center align-items-center p-2 rounded-3 text-decoration-none text-center" style="background: #fff; border: 1px dashed rgba(245,158,11,0.3); height:100%; transition: all 0.2s;" onmouseover="this.style.background='rgba(245,158,11,0.05)';" onmouseout="this.style.background='#fff';">
                                                <span class="fw-bold text-dark mb-1" style="font-size:0.75rem;">ASSIGNMENT</span>
                                                <span style="font-size:0.55rem; color:#b45309;">Login Required</span>
                                            </a>
                                        </div>
                                        <div class="col-6">
                                            <a href="/upgrade" class="d-flex flex-column justify-content-center align-items-center p-2 rounded-3 text-decoration-none text-center" style="background: #fff; border: 1px dashed rgba(245,158,11,0.3); height:100%; transition: all 0.2s;" onmouseover="this.style.background='rgba(245,158,11,0.05)';" onmouseout="this.style.background='#fff';">
                                                <span class="fw-bold text-dark mb-1" style="font-size:0.75rem;">CAT 1</span>
                                                <span style="font-size:0.55rem; color:#b45309;">Login Required</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 3. PAST PAPERS ITEM -->
                        <div class="accordion-item" style="border: 1px solid rgba(0,0,0,0.05); border-radius: 16px; background: #f8fafc; overflow: hidden;">
                            <h2 class="accordion-header m-0">
                                <button class="accordion-button collapsed px-3 py-3" type="button" data-bs-toggle="collapse" th:data-bs-target="'#categoryCollapse3_' + ${stat.index}" style="background: transparent; border: none; box-shadow: none;">
                                    <div class="d-flex align-items-center w-100 me-2">
                                        <div style="width:28px; height:28px; border-radius:8px; background: rgba(100,116,139,0.15); color: #475569; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right: 10px;">
                                            <i class="bi bi-archive-fill" style="font-size:0.9rem;"></i>
                                        </div>
                                        <span class="fw-bold" style="color: #1e293b; font-size: 0.85rem; letter-spacing: 0.5px;">3. PAST PAPERS <span style="font-size:0.7rem; font-weight:600; color:#64748b;">(ARCHIVES)</span></span>
                                        <span class="ms-auto" style="background: rgba(100,116,139,0.15); color: #475569; border: 1px solid rgba(100,116,139,0.25); font-size: 0.55rem; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-family:'Outfit',sans-serif;">PREMIUM</span>
                                    </div>
                                </button>
                            </h2>
                            <div th:id="'categoryCollapse3_' + ${stat.index}" class="accordion-collapse collapse" th:data-bs-parent="'#accordionCategory' + ${stat.index}">
                                <div class="accordion-body p-3 pt-0">
                                    <p style="font-size:0.7rem; color:#64748b; line-height:1.5; margin:0; margin-bottom:12px;">Access complete archives from previous academic years to boost your preparation.</p>
                                    <div class="d-flex flex-column gap-2">
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past Notes (Miaka ya Nyuma)</span>
                                                <span style="font-size:0.6rem; color:#94a3b8;"><i class="bi bi-lock-fill"></i></span>
                                            </div>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past Assignments</span>
                                                <span style="font-size:0.6rem; color:#94a3b8;"><i class="bi bi-lock-fill"></i></span>
                                            </div>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past CAT 1 Papers</span>
                                                <span style="font-size:0.6rem; color:#94a3b8;"><i class="bi bi-lock-fill"></i></span>
                                            </div>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past CAT 2 Papers</span>
                                                <span style="font-size:0.6rem; color:#94a3b8;"><i class="bi bi-lock-fill"></i></span>
                                            </div>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past University Exams (UE)</span>
                                                <span style="font-size:0.6rem; color:#94a3b8;"><i class="bi bi-lock-fill"></i></span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
'@
        $prefix = $lines[0..($startIndex-1)]
        $suffix = $lines[($endIndex+1)..($lines.Count-1)]
        
        $finalContent = $prefix + $newContent + $suffix
        Set-Content -Path $path -Value $finalContent -Encoding UTF8
        Write-Output "Successfully transformed the grid into an accordion."
    } else {
        Write-Output "Could not find start or end index."
    }
} else {
    Write-Output "File not found."
}
