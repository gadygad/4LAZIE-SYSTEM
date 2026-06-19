$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\guest_notes.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    # Replace flex-column logo container with flex-row
    $patternLogo = '(?s)<div class="d-flex flex-column align-items-start">\s*<span style="font-family: ''Outfit'', sans-serif; font-weight: 900; font-size: 2rem; color: #0f172a; letter-spacing: -1.5px; line-height: 1;">4LAZIE</span>\s*<div class="d-none d-sm-flex align-items-center position-relative mt-1"'
    $newLogo = '<div class="d-flex align-items-center gap-2">
                    <span style="font-family: ''Outfit'', sans-serif; font-weight: 900; font-size: 1.5rem; color: #0f172a; letter-spacing: -1px; line-height: 1;">4LAZIE</span>
                    <div class="d-none d-sm-flex align-items-center position-relative"'
    
    if ($content -match $patternLogo) {
        $content = $content -replace $patternLogo, $newLogo
        Write-Output "Fixed Logo"
    }
    
    # Replace top padding
    $patternPadding = 'sticky-top py-3'
    if ($content -match $patternPadding) {
        $content = $content -replace $patternPadding, 'sticky-top py-1'
        Write-Output "Fixed Padding"
    }
    
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Output "Successfully applied all navbar shrinking fixes."
} else {
    Write-Output "File not found"
}
