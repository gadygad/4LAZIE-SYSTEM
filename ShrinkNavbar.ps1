$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\guest_notes.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    # 1. Reduce navbar padding from py-3 to py-1 or py-2
    $content = $content -replace 'sticky-top py-3', 'sticky-top py-1'
    
    # 2. Fix the Logo container from flex-column to flex-row and reduce sizes
    $oldLogo = '<div class="d-flex flex-column align-items-start">
                    <span style="font-family: ''Outfit'', sans-serif; font-weight: 900; font-size: 2rem; color: #0f172a; letter-spacing: -1.5px; line-height: 1;">4LAZIE</span>
                    <div class="d-none d-sm-flex align-items-center position-relative mt-1"'
    
    $newLogo = '<div class="d-flex align-items-center gap-3">
                    <span style="font-family: ''Outfit'', sans-serif; font-weight: 900; font-size: 1.5rem; color: #0f172a; letter-spacing: -1px; line-height: 1; text-transform: uppercase;">4LAZIE</span>
                    <div class="d-none d-sm-flex align-items-center position-relative"'
                    
    $content = $content.Replace($oldLogo, $newLogo)
    
    # 3. Reduce back button size
    $oldBackBtn = 'width: 40px; height: 40px;'
    $newBackBtn = 'width: 32px; height: 32px;'
    $content = $content.Replace($oldBackBtn, $newBackBtn)
    $content = $content.Replace('font-size: 1.2rem; color: #3b82f6;', 'font-size: 1rem; color: #3b82f6;')
    
    # 4. Reduce Search Bar padding
    $oldSearch = 'padding: 12px 20px 12px 50px;'
    $newSearch = 'padding: 8px 16px 8px 45px;'
    $content = $content.Replace($oldSearch, $newSearch)
    
    # 5. Reduce Sign In button padding
    $content = $content -replace 'btn fw-bold rounded-pill px-4 py-2', 'btn fw-bold rounded-pill px-3 py-1'
    
    Set-Content -Path $path -Value $content -Encoding UTF8
    Write-Output "Successfully reduced the height of the guest_notes navbar."
} else {
    Write-Output "File not found"
}
