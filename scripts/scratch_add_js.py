import glob
import re

files = glob.glob('src/main/resources/templates/*_papers.html') + ['src/main/resources/templates/ue_exams.html']

js_func = """
<script>
    function openDocumentViewer(url) {
        document.getElementById('documentViewerLoading').style.display = 'flex';
        document.getElementById('documentViewerIframe').src = url;
        var myModal = new bootstrap.Modal(document.getElementById('documentViewerModal'));
        myModal.show();
    }
</script>
"""

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # If the function body doesn't exist, append it before </body>
    if "function openDocumentViewer(url)" not in content:
        content = content.replace('</body>', js_func + '\n</body>')
        with open(file, 'w') as f:
            f.write(content)
        print(f"Added JS to {file}")

