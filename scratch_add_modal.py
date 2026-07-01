import glob
import re

# 1. Append modal to bottom_nav.html
with open('src/main/resources/templates/fragments/bottom_nav.html', 'r') as f:
    nav_content = f.read()

modal_html = """
<!-- Document Viewer Modal -->
<div class="modal fade" id="documentViewerModal" tabindex="-1" aria-labelledby="documentViewerModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content" style="border-radius: 20px; overflow: hidden; border: none; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(15px); box-shadow: 0 20px 50px rgba(0,0,0,0.15);">
      <div class="modal-header border-0 pb-0" style="padding: 15px 24px;">
        <h5 class="modal-title fw-bold" id="documentViewerModalLabel" style="font-family: 'Outfit', sans-serif; color: #0f172a;"><i class="bi bi-file-earmark-text-fill me-2" style="color: #10b981;"></i>Document Viewer</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" style="background-color: rgba(16, 185, 129, 0.1); border-radius: 50%; opacity: 1; transition: all 0.2s;" onmouseover="this.style.backgroundColor='rgba(16, 185, 129, 0.2)'" onmouseout="this.style.backgroundColor='rgba(16, 185, 129, 0.1)'"></button>
      </div>
      <div class="modal-body p-0" style="height: 80vh; position: relative;">
        <!-- Loading spinner -->
        <div id="documentViewerLoading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: rgba(248, 250, 252, 0.8); z-index: 5;">
            <div class="spinner-border text-success" role="status" style="width: 3rem; height: 3rem;">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        <iframe id="documentViewerIframe" src="" style="width: 100%; height: 100%; border: none; background: #f8fafc; position: relative; z-index: 10;" onload="document.getElementById('documentViewerLoading').style.display='none'"></iframe>
      </div>
    </div>
  </div>
</div>
"""

if "id=\"documentViewerModal\"" not in nav_content:
    nav_content = nav_content.replace('</body>', modal_html + '\n</body>')
    with open('src/main/resources/templates/fragments/bottom_nav.html', 'w') as f:
        f.write(nav_content)

# 2. Update the buttons in templates and add script
files = glob.glob('src/main/resources/templates/*_papers.html') + ['src/main/resources/templates/ue_exams.html']

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Replace the read button href
    content = re.sub(r'<a href="/download/\$\{note\.id\}" target="_blank" class="btn btn-sm', r'<a href="javascript:void(0)" onclick="openDocumentViewer(\'/view/${note.id}\')" class="btn btn-sm', content)
    
    # Add JS function if not exists
    js_func = """
    function openDocumentViewer(url) {
        document.getElementById('documentViewerLoading').style.display = 'flex';
        document.getElementById('documentViewerIframe').src = url;
        var myModal = new bootstrap.Modal(document.getElementById('documentViewerModal'));
        myModal.show();
    }
    """
    
    if "openDocumentViewer" not in content:
        content = content.replace('</script>', js_func + '\n</script>')
        
    with open(file, 'w') as f:
        f.write(content)

