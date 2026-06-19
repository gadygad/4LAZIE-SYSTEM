$lines = Get-Content "premium_sidebar_extracted.html" -Encoding UTF8
$start = -1
$end = -1
for($i=0; $i -lt $lines.Length; $i++) {
    if($lines[$i] -match 'th:fragment="premium_sidebar"') {
        $start = $i
    }
    if($start -ne -1 -and ($lines[$i] -match '<!-- End Premium Sidebar -->' -or $lines[$i] -match '<!-- Close th:fragment="premium_sidebar" -->')) {
        $end = $i
        break
    }
}
if ($end -eq -1 -and $start -ne -1) {
    # Try to find a matching closing div at the end
    $end = $lines.Length - 1
    for($j=$end; $j -gt $start; $j--) {
        if ($lines[$j] -match '</div>' -and $lines[$j-1] -match '</body>|</html>') {
            $end = $j - 2
        }
    }
}
if ($start -ne -1) {
    $lines[$start..$end] | Set-Content "premium_sidebar_final.html" -Encoding UTF8
    Write-Output "Done isolating premium_sidebar."
} else {
    Write-Output "Could not find premium_sidebar"
}
