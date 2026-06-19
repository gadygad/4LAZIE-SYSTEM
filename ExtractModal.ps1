$lines = Get-Content sjuit_components_backup.html -Encoding UTF8
$start = -1
$end = -1

for($i=0; $i -lt $lines.Length; $i++) { 
    if($lines[$i] -match 'th:fragment="preview_modal"') { 
        $start = $i 
    } 
    # Try to find the end of the div or just the end of the modal
    if($start -ne -1 -and $lines[$i] -match '<!-- Close th:fragment="preview_modal" -->|<!-- End Preview Modal -->') { 
        $end = $i
        break 
    } 
} 

if ($end -eq -1 -and $start -ne -1) {
    # If no explicit comment, just find the matching </div>?
    # Actually, in sjuit_components_old, let's just grab from start to the end of the file, minus body/html tags.
    $end = $lines.Length - 1
    for($j=$end; $j -gt $start; $j--) {
        if ($lines[$j] -match '</body>|</html>') {
            $end = $j - 1
        }
    }
}

if($start -ne -1) { 
    $lines[$start..$end] | Set-Content preview_modal.html -Encoding UTF8
    Write-Output "Found and extracted preview_modal." 
} else {
    Write-Output "Could not find preview_modal"
}
