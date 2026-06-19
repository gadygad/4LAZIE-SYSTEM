$files = @(
    "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\home.html",
    "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\index.html"
)

foreach ($path in $files) {
    if (Test-Path $path) {
        $content = Get-Content -Path $path -Raw -Encoding UTF8
        
        # 1. Fix the header z-index so it is above the sticky premium features
        $targetHeader = '<header class="navbar navbar-custom sticky-top py-2" style="'
        if ($content.Contains($targetHeader) -and -not $content.Contains('style="z-index: 1050;')) {
            $content = $content.Replace($targetHeader, '<header class="navbar navbar-custom sticky-top py-2" style="z-index: 1050; ')
        }
        
        # 2. Fix the tooltip text
        $content = $content.Replace('title="Filter Options"', 'title="see more"')
        
        Set-Content -Path $path -Value $content -Encoding UTF8
    }
}
Write-Output "Fixed z-index and tooltip in headers."
