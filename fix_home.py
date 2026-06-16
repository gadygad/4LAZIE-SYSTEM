import re

with open('/home/careen/4LAZIE/src/main/resources/templates/home.html', 'r') as f:
    content = f.read()

# 1 & 2 & 3: Modal Replacement (from <div class="row"> inside POPULAR NOTES to the end of section)
# Find POPULAR NOTES SECTION
pop_notes_pattern = re.compile(r'(<!-- POPULAR NOTES SECTION -->\s*<section class="py-4 my-3">\s*<div class="container">\s*<style>.*?</style>\s*<h2 class="section-title text-start mb-4 text-dark" style="font-size: 2rem;">POPULAR NOTES</h2>\s*<div class="row">).*?(</section>)', re.DOTALL)

# In the current home.html, we need to extract the accordion items to keep the Thymeleaf loop intact
accordion_pattern = re.compile(r'(<div class="col-lg-7">\s*<div class="accordion accordion-flush" id="popularNotesAccordion">.*?</div>\s*</div>)', re.DOTALL)
acc_match = accordion_pattern.search(content)

if acc_match:
    acc_content = acc_match.group(1)
    # Change col-lg-7 to col-lg-10 mx-auto mb-4 mb-lg-0
    acc_content = acc_content.replace('<div class="col-lg-7">', '<div class="col-lg-10 mx-auto mb-4 mb-lg-0">')
    
    # Change the onclick loadPreview
    acc_content = re.sub(r'loadPreview\(\'\[\[\$\{note\.id\}\]\]\'\)', r'loadPreview([[${note.id}]], \'[[${note.title}]]\')', acc_content)
    
    modal_code = """
            </div> <!-- End row -->
            
            <!-- Document Preview Modal -->
            <div class="modal fade" id="previewModal" tabindex="-1" aria-labelledby="previewModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered">
                    <div class="modal-content border-0" style="border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
                        <div class="modal-header border-0 bg-light" style="padding: 1.5rem;">
                            <h5 class="modal-title fw-bold text-dark d-flex align-items-center" id="previewModalLabel" style="font-family: 'Outfit', sans-serif;">
                                <i class="bi bi-book me-2 text-primary"></i> <span id="modalDocumentTitle">Online Reader</span>
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0" style="height: 75vh; background: #f8fafc; position: relative;">
                            <!-- Placeholder Message -->
                            <div id="previewPlaceholder" class="text-center p-5" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                                <div class="spinner-border text-primary mb-3" role="status" style="width: 3rem; height: 3rem;">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                                <h6 class="fw-bold text-dark">Loading Document...</h6>
                            </div>
                            
                            <!-- Iframe -->
                            <iframe id="docPreviewFrame" src="" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; display: none;"></iframe>
                        </div>
                        <div class="modal-footer border-0 bg-light justify-content-between" style="padding: 1rem 1.5rem;">
                            <button type="button" class="btn btn-light border fw-bold px-4 py-2" data-bs-dismiss="modal" style="border-radius: 10px;">Close</button>
                            <a id="previewDownloadBtn" href="#" class="btn fw-bold d-flex align-items-center px-4 py-2" 
                               style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; border: none; border-radius: 10px; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(37,99,235,0.2);">
                                <i class="bi bi-cloud-arrow-down me-2"></i> Download Document
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <script>
                function loadPreview(id, title) {
                    const placeholder = document.getElementById('previewPlaceholder');
                    const iframe = document.getElementById('docPreviewFrame');
                    const downloadBtn = document.getElementById('previewDownloadBtn');
                    const modalTitle = document.getElementById('modalDocumentTitle');
                    
                    const previewModal = new bootstrap.Modal(document.getElementById('previewModal'));
                    previewModal.show();
                    
                    modalTitle.innerText = title;
                    
                    placeholder.style.display = 'block';
                    iframe.style.display = 'none';
                    
                    iframe.src = '/view/' + id;
                    
                    iframe.onload = function() {
                        placeholder.style.display = 'none';
                        iframe.style.display = 'block';
                    };
                    
                    downloadBtn.href = '/download/' + id;
                }
            </script>
        </div>
"""
    
    # Replace the whole <div class="row">...</div> inside POPULAR NOTES
    # First, let's find the start of <div class="row"> inside POPULAR NOTES and the end of the container
    row_start = content.find('<div class="row">', content.find('POPULAR NOTES SECTION'))
    # The container ends right before </section> of POPULAR NOTES SECTION
    section_end = content.find('</section>', row_start)
    
    # We replace from row_start to section_end with:
    # <div class="row">\n + acc_content + modal_code
    new_section = '<div class="row">\n' + acc_content + modal_code
    
    content = content[:row_start] + new_section + content[section_end:]

# Fix the Swap
left_pattern = re.compile(r'(<!-- Left Text -->\s*<div class="col-lg-7 hero-text mb-5 mb-lg-0 pe-lg-5">.*?)<!-- Right Login Form -->', re.DOTALL)
m_left = left_pattern.search(content)

right_pattern = re.compile(r'(<!-- Right Login Form -->\s*<div class="col-lg-5">.*?)</div>\s*</div>\s*</div>\s*</section>', re.DOTALL)
m_right = right_pattern.search(content)

if m_left and m_right:
    left_code = m_left.group(1)
    # Adjust padding so left login has pe-lg-5 and right text has ps-lg-5
    right_code = m_right.group(1).replace('<div class="col-lg-5">', '<div class="col-lg-5 mb-5 mb-lg-0 pe-lg-5">')
    left_code = left_code.replace('<div class="col-lg-7 hero-text mb-5 mb-lg-0 pe-lg-5">', '<div class="col-lg-7 hero-text">')
    
    # Also change email input to name="email" in login form
    right_code = right_code.replace('name="username"', 'name="email"')
    
    swapped = right_code + "</div>\n" + left_code
    
    content = content[:m_left.start()] + swapped + content[m_right.end()-38:]

# Fix footer
with open('/home/careen/4LAZIE/src/main/resources/templates/index.html', 'r') as f:
    idx = f.read()

footer_match = re.search(r'(<!-- FOOTER -->.*?)</body>', idx, re.DOTALL)
if footer_match:
    good_footer = footer_match.group(1)
    content = re.sub(r'<!-- FOOTER -->.*?</body>', good_footer + '</body>', content, flags=re.DOTALL)

with open('/home/careen/4LAZIE/src/main/resources/templates/home.html', 'w') as f:
    f.write(content)

print("Done fixing home.html")
