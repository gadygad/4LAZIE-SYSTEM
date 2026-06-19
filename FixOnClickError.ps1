$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"
$content = Get-Content $path -Raw -Encoding UTF8

# Replace the invalid th:onclick with valid data attributes and standard onclick
$badString1 = "th:onclick=`"'openPreviewModal(\'`' + ${note.id} + '\`', \'`' + ${#strings.replace(note.title, '''''''', '\`''''')} + '\`')'`""
$badStringRegex = 'th:onclick="''openPreviewModal\(\\'''' \+ \$\{note\.id\} \+ ''\\'', \\'''' \+ \$\{#strings\.replace\(note\.title, '''''''' , ''\\''''''\)\} \+ ''\\''\)''"'
$goodString1 = 'th:data-note-id="${note.id}" th:data-note-title="${note.title}" onclick="openPreviewModal(this.getAttribute(''data-note-id''), this.getAttribute(''data-note-title''))"'

$content = $content -replace $badStringRegex, $goodString1

# In case my regex failed, let's try a simpler replacement:
$content = $content -replace 'th:onclick="''openPreviewModal[^"]+"', $goodString1

Set-Content -Path $path -Value $content -Encoding UTF8
Write-Output "Fixed Thymeleaf XSS security error for onclick."
