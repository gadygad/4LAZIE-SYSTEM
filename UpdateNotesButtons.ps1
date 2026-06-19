$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"

if (Test-Path $path) {
    $content = Get-Content -Path $path -Raw -Encoding UTF8

    $oldButtons = @'
                                                                <div class="d-flex gap-1 flex-shrink-0">
                                                                    <button th:onclick="'openPreviewModal(\'' + ${note.id} + '\', \'' + ${#strings.replace(note.title, '''', '\''')} + '\')'"
                                                                            class="btn btn-sm" style="background:rgba(245,158,11,0.1); color:#d97706; padding:4px 8px; border-radius:6px;"><i class="bi bi-eye-fill"></i></button>
                                                                    <a th:href="@{'/download/' + ${note.id}}"
                                                                       class="btn btn-sm" style="background:rgba(16,185,129,0.1); color:#059669; padding:4px 8px; border-radius:6px;"><i class="bi bi-cloud-arrow-down-fill"></i></a>
                                                                </div>
'@

    $newButtons = @'
                                                                <div class="d-flex gap-2 flex-shrink-0">
                                                                    <button th:onclick="'openPreviewModal(\'' + ${note.id} + '\', \'' + ${#strings.replace(note.title, '''', '\''')} + '\')'"
                                                                            class="btn btn-sm fw-bold d-flex align-items-center" style="background:rgba(245,158,11,0.1); color:#d97706; padding:4px 10px; border-radius:8px; font-size: 0.7rem; transition: all 0.2s; border:none;" onmouseover="this.style.background='rgba(245,158,11,0.2)'" onmouseout="this.style.background='rgba(245,158,11,0.1)'">
                                                                        <i class="bi bi-book-half me-1"></i> Read
                                                                    </button>
                                                                    <a th:href="@{'/download/' + ${note.id}}"
                                                                       class="btn btn-sm fw-bold d-flex align-items-center" style="background:rgba(16,185,129,0.1); color:#059669; padding:4px 10px; border-radius:8px; font-size: 0.7rem; transition: all 0.2s; border:none; text-decoration: none;" onmouseover="this.style.background='rgba(16,185,129,0.2)'" onmouseout="this.style.background='rgba(16,185,129,0.1)'">
                                                                        <i class="bi bi-cloud-arrow-down-fill me-1"></i> Download
                                                                    </a>
                                                                </div>
'@

    if ($content -match [regex]::Escape($oldButtons)) {
        $content = $content -replace [regex]::Escape($oldButtons), $newButtons
        Set-Content -Path $path -Value $content -Encoding UTF8
        Write-Output "Successfully updated Notes buttons to include text."
    } else {
        Write-Output "Could not find the exact old buttons text."
    }
} else {
    Write-Output "File not found."
}
