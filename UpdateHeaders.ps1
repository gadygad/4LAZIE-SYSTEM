$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\home.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    # Target 1: RECOMMENDED NOTES
    $oldRecPattern = '(?s)<h3 class="premium-gradient-header" style="font-size: 1\.4rem;[^>]*>RECOMMENDED NOTES</h3>'
    $newRec = '<h6 class="premium-gradient-header fw-bold text-uppercase" style="font-size: 1.05rem; background: linear-gradient(135deg, #FFDF00 0%, #D4AF37 50%, #B8860B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 20px rgba(212, 175, 55, 0.4); letter-spacing: 1.5px; margin-bottom: 0; display: inline-flex; align-items: center; gap: 8px;"><i class="bi bi-stars" style="-webkit-text-fill-color: #D4AF37; font-size: 1.1rem; filter: drop-shadow(0 2px 4px rgba(212,175,55,0.4));"></i> RECOMMENDED NOTES</h6>'
    
    if ($content -match $oldRecPattern) {
        $content = $content -replace $oldRecPattern, $newRec
        Write-Output "Updated RECOMMENDED NOTES header."
    }
    
    # Target 2: PREMIUM FEATURES
    $oldPremPattern = '(?s)<h3 class="premium-gradient-header" style="font-size: 1\.4rem;[^>]*>PREMIUM FEATURES</h3>'
    $newPrem = '<h6 class="premium-gradient-header fw-bold text-uppercase" style="font-size: 1.05rem; background: linear-gradient(135deg, #FFDF00 0%, #D4AF37 50%, #B8860B 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-shadow: 0 4px 20px rgba(212, 175, 55, 0.4); letter-spacing: 1.5px; margin-bottom: 0; display: inline-flex; align-items: center; gap: 8px;"><i class="bi bi-gem" style="-webkit-text-fill-color: #D4AF37; font-size: 1.1rem; filter: drop-shadow(0 2px 4px rgba(212,175,55,0.4));"></i> PREMIUM FEATURES</h6>'
    
    if ($content -match $oldPremPattern) {
        $content = $content -replace $oldPremPattern, $newPrem
        Write-Output "Updated PREMIUM FEATURES header."
    }
    
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Output "Headers successfully updated in home.html"
} else {
    Write-Output "File not found"
}
