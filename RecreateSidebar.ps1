$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"
$content = Get-Content $path -Raw -Encoding UTF8

# Find the start of PREMIUM SIDEBAR
$index = $content.IndexOf("<!-- ============================================================")
$lastIndex = $content.LastIndexOf("<!-- ============================================================")

# We know the PREMIUM SIDEBAR is the last thing we injected, so let's cut it off.
if ($lastIndex -gt 0) {
    $cleanContent = $content.Substring(0, $lastIndex)
    
    $premiumSidebar = @"
<!-- ============================================================
     PREMIUM SIDEBAR
     ============================================================ -->
<div th:fragment="premium_sidebar" class="mb-4 p-4 rounded-4 position-relative overflow-hidden"
     style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 10px 40px rgba(0,0,0,0.2);">
    
    <!-- Background Decor -->
    <div style="position:absolute; top:-20px; right:-20px; width:120px; height:120px; border-radius:50%; background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0) 70%); pointer-events:none;"></div>
    <div style="position:absolute; bottom:-30px; left:-30px; width:150px; height:150px; border-radius:50%; background: radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(59,130,246,0) 70%); pointer-events:none;"></div>

    <div class="d-flex align-items-center gap-3 mb-4 position-relative">
        <div style="width:48px; height:48px; border-radius:14px; background: linear-gradient(135deg, #f59e0b, #d97706); display:flex; align-items:center; justify-content:center; box-shadow: 0 8px 20px rgba(245,158,11,0.4); flex-shrink:0;">
            <i class="bi bi-star-fill" style="color:#fff; font-size:1.3rem;"></i>
        </div>
        <div>
            <div style="font-family:'Outfit',sans-serif; font-weight:800; font-size:1.1rem; color:#fff; letter-spacing: 0.5px;">PREMIUM FEATURES</div>
            <div style="font-size:0.75rem; color:rgba(255,255,255,0.6); font-weight:500;">Unlock Exclusive Content</div>
        </div>
    </div>

    <!-- Features List -->
    <div class="d-flex flex-column gap-3 mb-4 position-relative">
        
        <!-- Assignment -->
        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between p-3 rounded-3 text-decoration-none" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s ease;" onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.borderColor='rgba(245,158,11,0.3)';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='rgba(255,255,255,0.05)';">
            <div class="d-flex align-items-center gap-3">
                <div style="width:32px; height:32px; border-radius:8px; background:rgba(59,130,246,0.15); display:flex; align-items:center; justify-content:center;">
                    <i class="bi bi-journal-check text-primary" style="font-size:1.1rem;"></i>
                </div>
                <span style="color:#f8fafc; font-family:'Outfit',sans-serif; font-weight:600; font-size:0.9rem;">Assignments</span>
            </div>
            <i class="bi bi-lock-fill text-secondary" style="font-size:0.9rem;"></i>
        </a>

        <!-- UE -->
        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between p-3 rounded-3 text-decoration-none" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s ease;" onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.borderColor='rgba(245,158,11,0.3)';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='rgba(255,255,255,0.05)';">
            <div class="d-flex align-items-center gap-3">
                <div style="width:32px; height:32px; border-radius:8px; background:rgba(245,158,11,0.15); display:flex; align-items:center; justify-content:center;">
                    <i class="bi bi-mortarboard-fill text-warning" style="font-size:1.1rem;"></i>
                </div>
                <span style="color:#f8fafc; font-family:'Outfit',sans-serif; font-weight:600; font-size:0.9rem;">University Exams (UE)</span>
            </div>
            <i class="bi bi-lock-fill text-secondary" style="font-size:0.9rem;"></i>
        </a>

        <!-- Past Papers -->
        <a href="javascript:void(0)" class="d-flex align-items-center justify-content-between p-3 rounded-3 text-decoration-none" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s ease;" onmouseover="this.style.background='rgba(255,255,255,0.08)'; this.style.borderColor='rgba(245,158,11,0.3)';" onmouseout="this.style.background='rgba(255,255,255,0.03)'; this.style.borderColor='rgba(255,255,255,0.05)';">
            <div class="d-flex align-items-center gap-3">
                <div style="width:32px; height:32px; border-radius:8px; background:rgba(16,185,129,0.15); display:flex; align-items:center; justify-content:center;">
                    <i class="bi bi-file-earmark-pdf-fill text-success" style="font-size:1.1rem;"></i>
                </div>
                <span style="color:#f8fafc; font-family:'Outfit',sans-serif; font-weight:600; font-size:0.9rem;">Past Papers (Cat 1 & 2)</span>
            </div>
            <i class="bi bi-lock-fill text-secondary" style="font-size:0.9rem;"></i>
        </a>
    </div>

    <!-- Upgrade Button -->
    <a href="/upgrade" class="btn w-100 rounded-pill fw-bold text-white d-flex align-items-center justify-content-center gap-2" 
       style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 12px; font-size:0.9rem; border:none; box-shadow: 0 4px 15px rgba(245,158,11,0.3); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(245,158,11,0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(245,158,11,0.3)';">
        <i class="bi bi-gem"></i> Upgrade to Premium
    </a>
</div>

</body>
</html>
"@

    $cleanContent = $cleanContent + $premiumSidebar
    Set-Content -Path $path -Value $cleanContent -Encoding UTF8
    Write-Output "Successfully recreated premium_sidebar."
} else {
    Write-Output "Could not find last index of PREMIUM SIDEBAR."
}
