$logPath = "C:\Users\minde\.gemini\antigravity-ide\brain\1ebee33d-abdc-4851-bca1-dffa7b92991e\.system_generated\logs\transcript.jsonl"
$lines = Get-Content $logPath -Encoding UTF8

foreach ($line in $lines) {
    if ($line -match 'th:fragment=\\"premium_sidebar\\"') {
        Set-Content -Path "premium_sidebar_log.txt" -Value $line -Encoding UTF8
        Write-Output "Found premium_sidebar in transcript!"
        break
    }
}
