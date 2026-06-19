$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"
$content = Get-Content $path -Raw -Encoding UTF8

$index = $content.IndexOf("<!-- ============================================================")
$lastIndex = $content.LastIndexOf("<!-- ============================================================")

if ($lastIndex -gt 0) {
    $cleanContent = $content.Substring(0, $lastIndex)
    
    $premiumSidebar = @"
<!-- ============================================================
     PREMIUM SIDEBAR
     ============================================================ -->
<div th:fragment="premium_sidebar" class="mb-4">
    <!-- Header -->
    <div class="mb-4">
        <h5 class="fw-bold mb-2 pb-1 d-inline-block" style="color: #f59e0b; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px; border-bottom: 3px solid rgba(245, 158, 11, 0.4);">
            PREMIUM FEATURES
        </h5>
        <div style="color: #64748b; font-size: 0.95rem; font-weight: 500;">Exclusive tools &amp; resources</div>
    </div>

    <!-- Features List -->
    <div class="d-flex flex-column gap-3 mb-4">
        
        <!-- CAT 1 PAST PAPERS -->
        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between p-4 rounded-4 text-decoration-none" 
           style="background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); transition: all 0.3s ease;" 
           onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.06)';" 
           onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.03)';">
            <span class="fw-bold" style="color: #1e293b; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">CAT 1 PAST PAPERS</span>
            <i class="bi bi-lock-fill" style="color: #cbd5e1; font-size: 1.1rem;"></i>
        </a>

        <!-- CAT 2 PAST PAPERS -->
        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between p-4 rounded-4 text-decoration-none" 
           style="background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); transition: all 0.3s ease;" 
           onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.06)';" 
           onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.03)';">
            <span class="fw-bold" style="color: #1e293b; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">CAT 2 PAST PAPERS</span>
            <i class="bi bi-lock-fill" style="color: #cbd5e1; font-size: 1.1rem;"></i>
        </a>

        <!-- ASSIGNMENTS & SOLUTIONS -->
        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between p-4 rounded-4 text-decoration-none" 
           style="background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); transition: all 0.3s ease;" 
           onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.06)';" 
           onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.03)';">
            <span class="fw-bold" style="color: #1e293b; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">ASSIGNMENTS &amp; SOLUTIONS</span>
            <i class="bi bi-lock-fill" style="color: #cbd5e1; font-size: 1.1rem;"></i>
        </a>

        <!-- UNIVERSITY EXAMS (UE) -->
        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between p-4 rounded-4 text-decoration-none" 
           style="background: #ffffff; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.02); transition: all 0.3s ease;" 
           onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(0,0,0,0.06)';" 
           onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 20px rgba(0,0,0,0.03)';">
            <span class="fw-bold" style="color: #1e293b; font-family: 'Outfit', sans-serif; font-size: 0.95rem;">UNIVERSITY EXAMS (UE)</span>
            <i class="bi bi-lock-fill" style="color: #cbd5e1; font-size: 1.1rem;"></i>
        </a>
    </div>

    <!-- Bottom Dark Card with Rocket -->
    <a href="/premium" class="d-block text-decoration-none rounded-4 p-4 position-relative overflow-hidden" 
       style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); box-shadow: 0 10px 30px rgba(0,0,0,0.15); transition: all 0.3s ease;" 
       onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 15px 35px rgba(0,0,0,0.2)';" 
       onmouseout="this.style.transform='none'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.15)';">
        <div class="d-flex align-items-center gap-3">
            <div style="width: 50px; height: 50px; border-radius: 14px; border: 1px solid rgba(245, 158, 11, 0.3); display: flex; align-items: center; justify-content: center; background: rgba(245, 158, 11, 0.05); flex-shrink:0;">
                <i class="bi bi-rocket-takeoff-fill" style="color: #f59e0b; font-size: 1.3rem;"></i>
            </div>
            <div>
                <div class="fw-bold" style="color: #ffffff; font-family: 'Outfit', sans-serif; font-size: 1.05rem;">Upgrade Account</div>
                <div style="color: rgba(255,255,255,0.6); font-size: 0.8rem; font-weight: 500;">Get unlimited access</div>
            </div>
        </div>
    </a>
</div>

</body>
</html>
"@

    $cleanContent = $cleanContent + $premiumSidebar
    Set-Content -Path $path -Value $cleanContent -Encoding UTF8
    Write-Output "Successfully applied light-themed premium sidebar."
} else {
    Write-Output "Error: Could not find PREMIUM SIDEBAR."
}
