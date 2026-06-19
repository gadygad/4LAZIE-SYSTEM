$path = "c:\Users\minde\OneDrive\Desktop\4LAZIE\src\main\resources\templates\fragments\sjuit_components.html"
$content = Get-Content $path -Raw -Encoding UTF8

$modalHtml = @"

<!-- ============================================================
     PREVIEW MODAL
     ============================================================ -->
<div th:fragment="preview_modal">
    <div class="modal fade" id="previewModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content border-0" style="border-radius: 16px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.3);">
                <div class="modal-header border-0 px-4 py-3" style="background: linear-gradient(135deg, #0f172a, #1e293b);">
                    <h6 class="modal-title fw-bold m-0" id="previewModalTitle" style="color:#fff; font-family:'Outfit',sans-serif; font-size:0.9rem;"></h6>
                    <button type="button" class="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-0" style="height: 80vh;">
                    <iframe id="previewFrame" src="" style="width:100%; height:100%; border:none;"></iframe>
                </div>
                <div class="modal-footer border-0 px-4 py-3 d-flex gap-2 justify-content-end" style="background:#f8fafc;">
                    <button type="button" class="btn btn-secondary rounded-pill px-4" data-bs-dismiss="modal">Close</button>
                    <a id="previewDownloadLink" href="#" class="btn rounded-pill px-4 fw-bold"
                       style="background: linear-gradient(135deg, #f59e0b, #d97706); color:#fff; border:none;">
                        <i class="bi bi-cloud-arrow-down-fill me-1"></i>Download
                    </a>
                </div>
            </div>
        </div>
    </div>
    <script>
    function openPreviewModal(noteId, title) {
        document.getElementById('previewModalTitle').textContent = title;
        document.getElementById('previewFrame').src = '/view/' + noteId;
        document.getElementById('previewDownloadLink').href = '/download/' + noteId;
        const modal = new bootstrap.Modal(document.getElementById('previewModal'));
        modal.show();
    }
    </script>
</div>
</body>
</html>
"@

# Replace the closing body tags with the modal and the closing tags
$content = $content -replace "</body>\s*</html>", $modalHtml

Set-Content -Path $path -Value $content -Encoding UTF8
Write-Output "Successfully injected preview_modal back into sjuit_components.html."
