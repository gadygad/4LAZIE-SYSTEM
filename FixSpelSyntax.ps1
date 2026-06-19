$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"
$content = Get-Content $path -Raw -Encoding UTF8
$content = $content -replace "unitNumber == #unitNum", "unitNumber == __`${unitNum}__"
Set-Content -Path $path -Value $content -Encoding UTF8
Write-Output "Fixed SpEL syntax error."
