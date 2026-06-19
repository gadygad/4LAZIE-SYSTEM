$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\home.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    # 1. Add onclick="showPremiumPopup(event, 'Feature Name')" to the specific links
    
    # Past Papers
    $ppTarget = '<li><a class="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3" href="#" style="font-size: 0.9rem; font-weight: 500;"><div style="width:30px; height:30px; border-radius:8px; background:rgba(16,185,129,0.1); display:flex; align-items:center; justify-content:center;"><i class="bi bi-file-earmark-check text-success"></i></div> Past Papers</a></li>'
    $ppReplace = '<li><a class="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3" href="#" onclick="showPremiumPopup(event, ''Past Papers'')" style="font-size: 0.9rem; font-weight: 500;"><div style="width:30px; height:30px; border-radius:8px; background:rgba(16,185,129,0.1); display:flex; align-items:center; justify-content:center;"><i class="bi bi-file-earmark-check text-success"></i></div> Past Papers</a></li>'
    $content = $content.Replace($ppTarget, $ppReplace)
    
    # Assignments
    $asTarget = '<li><a class="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3" href="#" style="font-size: 0.9rem; font-weight: 500;"><div style="width:30px; height:30px; border-radius:8px; background:rgba(245,158,11,0.1); display:flex; align-items:center; justify-content:center;"><i class="bi bi-pen text-warning"></i></div> Assignments</a></li>'
    $asReplace = '<li><a class="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3" href="#" onclick="showPremiumPopup(event, ''Assignments & Solutions'')" style="font-size: 0.9rem; font-weight: 500;"><div style="width:30px; height:30px; border-radius:8px; background:rgba(245,158,11,0.1); display:flex; align-items:center; justify-content:center;"><i class="bi bi-pen text-warning"></i></div> Assignments</a></li>'
    $content = $content.Replace($asTarget, $asReplace)
    
    # Request a Note
    $rqTarget = '<li><a class="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3 text-danger" href="#" style="font-size: 0.9rem; font-weight: 500;"><div style="width:30px; height:30px; border-radius:8px; background:rgba(239,68,68,0.1); display:flex; align-items:center; justify-content:center;"><i class="bi bi-chat-left-text"></i></div> Request a Note</a></li>'
    $rqReplace = '<li><a class="dropdown-item d-flex align-items-center gap-3 py-2 rounded-3 text-danger" href="#" onclick="showPremiumPopup(event, ''Request a Note'')" style="font-size: 0.9rem; font-weight: 500;"><div style="width:30px; height:30px; border-radius:8px; background:rgba(239,68,68,0.1); display:flex; align-items:center; justify-content:center;"><i class="bi bi-chat-left-text"></i></div> Request a Note</a></li>'
    $content = $content.Replace($rqTarget, $rqReplace)
    
    # 2. Append the Modal and JS right before </body> if not already there
    $modalCode = @"
<!-- Premium Access Modal -->
<div class="modal fade" id="premiumAccessModal" tabindex="-1" aria-labelledby="premiumAccessModalLabel" aria-hidden="true" style="z-index: 10000;">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content" style="border: 1px solid rgba(255,255,255,0.4); border-radius: 24px; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 30px 60px rgba(0,0,0,0.12);">
            <div class="modal-header border-0 pb-0" style="position: relative;">
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="position: absolute; right: 20px; top: 20px; z-index: 2; background-color: rgba(0,0,0,0.05); border-radius: 50%; padding: 10px;"></button>
            </div>
            <div class="modal-body text-center px-4 pb-5 pt-3">
                <div class="mb-4 mx-auto d-flex align-items-center justify-content-center" style="width: 80px; height: 80px; background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.15)); border-radius: 50%; box-shadow: 0 10px 25px rgba(245, 158, 11, 0.2); position: relative;">
                    <div style="position: absolute; top: -5px; right: -5px; width: 20px; height: 20px; background: #f59e0b; border-radius: 50%; border: 3px solid white;"></div>
                    <i class="bi bi-rocket-takeoff-fill" style="font-size: 2.5rem; color: #f59e0b; transform: rotate(15deg);"></i>
                </div>
                <h3 class="fw-bold mb-3" style="font-family: 'Outfit', sans-serif; font-size: 1.6rem; color: #0f172a; letter-spacing: -0.5px;">Premium Feature</h3>
                <p class="text-secondary mb-4 mx-auto" style="font-size: 1rem; line-height: 1.6; max-width: 90%;">
                    Unlock access to <strong id="premiumAccessModalFeature" style="color: #1e293b;">this feature</strong> and many more exclusive study materials by creating a free account today.
                </p>
                <div class="d-flex flex-column gap-3 mt-2 px-sm-3">
                    <a href="/register" class="btn fw-bold w-100 py-3 d-flex align-items-center justify-content-center gap-2" style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; border-radius: 14px; font-size: 1.05rem; box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3); transition: all 0.3s ease; border: none;" onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 12px 25px rgba(59, 130, 246, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 8px 20px rgba(59, 130, 246, 0.3)';">
                        Create Free Account <i class="bi bi-arrow-right"></i>
                    </a>
                    <button type="button" class="btn w-100 py-2" data-bs-dismiss="modal" style="background: transparent; color: #64748b; font-weight: 600; font-size: 0.95rem; transition: all 0.2s ease; border: none;" onmouseover="this.style.color='#0f172a';">
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    function showPremiumPopup(event, featureName) {
        event.preventDefault(); // Prevent default link behavior
        
        // Hide the dropdown menu smoothly
        const dropdownMenu = event.target.closest('.dropdown-menu');
        if (dropdownMenu) {
            dropdownMenu.classList.remove('show');
        }
        
        // Set the dynamic feature text
        document.getElementById('premiumAccessModalFeature').innerText = featureName;
        
        // Initialize and show the Bootstrap modal
        const premiumModal = new bootstrap.Modal(document.getElementById('premiumAccessModal'));
        premiumModal.show();
    }
</script>
</body>
"@

    if (-not $content.Contains('id="premiumAccessModal"')) {
        $content = $content.Replace("</body>", $modalCode)
    }
    
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Output "Injected Premium Modal and JS into home.html"
} else {
    Write-Output "File not found"
}
