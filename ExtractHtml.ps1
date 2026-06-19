$json = Get-Content "premium_sidebar_log.txt" -Raw -Encoding UTF8 | ConvertFrom-Json
$content = $json.content
# The content contains the raw text output of a command that printed the file.
# So $content is a string that starts with "Created At..." and then has the file content.
Set-Content -Path "premium_sidebar_extracted.html" -Value $content -Encoding UTF8
Write-Output "Extracted raw content from JSON."
