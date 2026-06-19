$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\home.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    # Remove the custom-flyout-sidebar block
    $pattern = '(?s)<style id="custom-flyout-sidebar">.*?</style>'
    if ($content -match $pattern) {
        $content = $content -replace $pattern, ''
        Set-Content -Path $path -Value $content -Encoding UTF8
        Write-Output "Removed custom flyout CSS to keep sidebar open."
    } else {
        Write-Output "Custom flyout CSS not found."
    }
} else {
    Write-Output "home.html not found."
}
