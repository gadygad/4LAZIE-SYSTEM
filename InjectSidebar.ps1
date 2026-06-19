$sidebarContent = Get-Content "premium_sidebar_final.html" -Raw -Encoding UTF8
$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"
$originalContent = Get-Content $path -Raw -Encoding UTF8

$injection = @"

<!-- ============================================================
     PREMIUM SIDEBAR
     ============================================================ -->
$sidebarContent

</body>
</html>
"@

$newContent = $originalContent -replace "</body>\s*</html>", $injection
Set-Content -Path $path -Value $newContent -Encoding UTF8
Write-Output "Successfully injected premium_sidebar!"
