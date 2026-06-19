$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"

if (Test-Path $path) {
    $lines = Get-Content -Path $path -Encoding UTF8
    
    $startIndex = -1
    $endIndex = -1
    
    for ($i = 0; $i -lt $lines.Count; $i++) {
        if ($lines[$i] -match '<!-- 3. PAST PAPERS ITEM -->') {
            $startIndex = $i
        }
        if ($startIndex -ne -1 -and $lines[$i] -match '</div><!-- end row -->') {
            $endIndex = $i - 1
            break
        }
    }
    
    if ($startIndex -ne -1 -and $endIndex -ne -1) {
        $newContent = @'
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
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(100,116,139,0.15); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-file-earmark-pdf me-2" style="color: #475569; font-size: 0.9rem;"></i>
                                                    <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past Notes (Miaka ya Nyuma)</span>
                                                </div>
                                                <span style="font-size:0.6rem; color:#475569; background:rgba(100,116,139,0.1); padding:2px 6px; border-radius:4px;"><i class="bi bi-lock-fill me-1"></i>Login</span>
                                            </div>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(100,116,139,0.15); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-journal-text me-2" style="color: #475569; font-size: 0.9rem;"></i>
                                                    <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past Assignments</span>
                                                </div>
                                                <span style="font-size:0.6rem; color:#475569; background:rgba(100,116,139,0.1); padding:2px 6px; border-radius:4px;"><i class="bi bi-lock-fill me-1"></i>Login</span>
                                            </div>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(100,116,139,0.15); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-file-earmark-check me-2" style="color: #475569; font-size: 0.9rem;"></i>
                                                    <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past CAT 1 Papers</span>
                                                </div>
                                                <span style="font-size:0.6rem; color:#475569; background:rgba(100,116,139,0.1); padding:2px 6px; border-radius:4px;"><i class="bi bi-lock-fill me-1"></i>Login</span>
                                            </div>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(100,116,139,0.15); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-file-earmark-check me-2" style="color: #475569; font-size: 0.9rem;"></i>
                                                    <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past CAT 2 Papers</span>
                                                </div>
                                                <span style="font-size:0.6rem; color:#475569; background:rgba(100,116,139,0.1); padding:2px 6px; border-radius:4px;"><i class="bi bi-lock-fill me-1"></i>Login</span>
                                            </div>
                                        </a>
                                        <a href="/upgrade" class="bg-white rounded-3 p-2 text-decoration-none text-start" style="border: 1px solid rgba(100,116,139,0.15); box-shadow: 0 2px 5px rgba(0,0,0,0.02); transition: all 0.2s;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 10px rgba(0,0,0,0.05)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.02)';">
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-mortarboard-fill me-2" style="color: #475569; font-size: 0.9rem;"></i>
                                                    <span class="fw-bold text-dark" style="font-size:0.75rem; letter-spacing:0.3px;">Past University Exams (UE)</span>
                                                </div>
                                                <span style="font-size:0.6rem; color:#475569; background:rgba(100,116,139,0.1); padding:2px 6px; border-radius:4px;"><i class="bi bi-lock-fill me-1"></i>Login</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
'@
        $prefix = $lines[0..($startIndex-1)]
        $suffix = $lines[($endIndex+1)..($lines.Count-1)]
        
        $finalContent = $prefix + $newContent + $suffix
        Set-Content -Path $path -Value $finalContent -Encoding UTF8
        Write-Output "Successfully updated Past Papers layout."
    } else {
        Write-Output "Could not find start or end index."
    }
} else {
    Write-Output "File not found."
}
