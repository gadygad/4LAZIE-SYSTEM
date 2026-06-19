$files = @(
    "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\home.html",
    "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\index.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content -Path $file -Raw -Encoding UTF8
        
        # Remove the Program Nav Links from the navbar
        $pattern = '(?s)<!-- Program Nav Links -->.*?<!-- Search Bar \(center\) -->'
        $replacement = '<!-- Search Bar (center) -->'
        
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $replacement
            Set-Content -Path $file -Value $content -Encoding UTF8
            Write-Output "Removed Program Nav Links from $file"
        } else {
            Write-Output "Program Nav Links not found in $file"
        }
    }
}
