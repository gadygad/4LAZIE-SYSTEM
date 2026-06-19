$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\static\css\premium-theme.css"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8
    
    # We want to remove the "@media (min-width: 992px) {" block that contains ".program-levels { position: absolute"
    # Using a regex that precisely targets this block.
    $pattern = '(?s)/\* Premium Desktop Flyout Menu \*/\s*@media \(min-width: 992px\) \{.*?\/\* Inner section dropdowns'
    
    if ($content -match $pattern) {
        $content = $content -replace $pattern, '/* Inner section dropdowns'
        Set-Content -Path $path -Value $content -Encoding UTF8
        Write-Output "Removed the Desktop Flyout Menu block to restore accordion behavior."
    } else {
        Write-Output "Pattern not found."
    }
} else {
    Write-Output "File not found"
}
