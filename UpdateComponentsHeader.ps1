$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    $oldPrem = '<h5 class="fw-bold" style="color: #f59e0b; font-family: ''Outfit'', sans-serif; letter-spacing: 1px; text-transform: uppercase; border-bottom: 3px solid #fde047; padding-bottom: 5px; display: inline-block;">PREMIUM FEATURES</h5>'
    $newPrem = '<h6 class="fw-bold text-uppercase" style="font-size: 1.05rem; font-family: ''Outfit'', sans-serif; background: linear-gradient(135deg, #FFDF00 0%, #D4AF37 50%, #B8860B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3); letter-spacing: 1.5px; border-bottom: 2px solid rgba(212, 175, 55, 0.5); padding-bottom: 5px; margin-bottom: 0; display: inline-flex; align-items: center; gap: 8px;"><i class="bi bi-gem" style="-webkit-text-fill-color: #D4AF37; font-size: 1.1rem; filter: drop-shadow(0 2px 4px rgba(212,175,55,0.4));"></i> PREMIUM FEATURES</h6>'
    
    $content = $content.Replace($oldPrem, $newPrem)
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Output "Updated PREMIUM FEATURES in sjuit_components.html"
} else {
    Write-Output "File not found"
}
