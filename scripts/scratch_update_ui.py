import glob
import re

files = glob.glob('src/main/resources/templates/*_papers.html') + ['src/main/resources/templates/ue_exams.html']

old_html_block = r"let html = '<div class=\"accordion\" id=\"resultsAccordion\">';.*?html \+= '</div>';"

new_html_block = """let html = '<div class="results-list" style="display: flex; flex-direction: column; gap: 8px;">';
                        data.forEach((note, index) => {
                            const yearStr = note.year ? note.year : new Date().getFullYear();
                            const semStr = note.semester ? 'Sem ' + note.semester : 'Sem 1';
                            
                            html += `
                                <div class="premium-result-card" style="background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(15px); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 14px; padding: 12px 16px; display: flex; flex-direction: column; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); box-shadow: 0 4px 12px rgba(0,0,0,0.02); cursor: default; animation: fadeIn 0.4s ease-out forwards; animation-delay: ${index * 0.05}s; opacity: 0; position: relative; overflow: hidden;">
                                    <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(180deg, #10b981, #34d399); border-radius: 14px 0 0 14px; opacity: 0.8;"></div>
                                    <div class="d-flex justify-content-between align-items-center mb-2 ms-2">
                                        <div class="d-flex align-items-center">
                                            <div style="width: 36px; height: 36px; background: rgba(16, 185, 129, 0.1); border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-right: 12px; box-shadow: inset 0 2px 4px rgba(255,255,255,0.5);">
                                                <i class="bi bi-file-earmark-text-fill" style="color: #10b981; font-size: 1.1rem;"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-0 fw-bold text-truncate" style="font-family: 'Outfit', sans-serif; color: #0f172a; font-size: 0.95rem; line-height: 1.2; max-width: 200px;" title="${note.title || 'Document'}">${note.title || 'Document'}</h6>
                                                <span style="font-size: 0.72rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.3px;">${note.moduleName || 'General'} &bull; ${semStr} &bull; ${yearStr}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center mt-1 ms-2">
                                        <div class="d-flex gap-3 text-muted" style="font-size: 0.75rem; font-weight: 700;">
                                            <span title="Views" class="d-flex align-items-center"><i class="bi bi-eye-fill me-1" style="color: #94a3b8; font-size: 0.85rem;"></i>${note.viewCount || 0}</span>
                                            <span title="Downloads" class="d-flex align-items-center"><i class="bi bi-cloud-arrow-down-fill me-1" style="color: #94a3b8; font-size: 0.85rem;"></i>${note.downloadCount || 0}</span>
                                        </div>
                                        <div class="d-flex gap-2">
                                            <a href="/download/${note.id}" target="_blank" class="btn btn-sm d-flex align-items-center justify-content-center" style="background: rgba(16, 185, 129, 0.1); color: #059669; font-weight: 700; font-size: 0.75rem; padding: 5px 14px; border-radius: 8px; transition: all 0.2s;"><i class="bi bi-eye me-1"></i>Read</a>
                                            <a href="/download/${note.id}?force=true" class="btn btn-sm d-flex align-items-center justify-content-center" style="background: linear-gradient(135deg, #10b981, #059669); color: white; font-weight: 700; font-size: 0.75rem; padding: 5px 14px; border-radius: 8px; transition: all 0.2s; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3); border: none;"><i class="bi bi-download me-1"></i>Download</a>
                                        </div>
                                    </div>
                                </div>
                            `;
                        });
                        html += '</div>';"""

for file in files:
    with open(file, 'r') as f:
        content = f.read()
    
    # Replace accordion with new UI
    new_content = re.sub(old_html_block, new_html_block, content, flags=re.DOTALL)
    
    # Inject CSS for premium-result-card hover if not exists
    css = """        .premium-result-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(16, 185, 129, 0.12) !important;
            border-color: rgba(16, 185, 129, 0.3) !important;
            background: rgba(255, 255, 255, 0.95) !important;
        }"""
    if "premium-result-card" not in new_content:
        new_content = new_content.replace('</style>', css + '\n    </style>')
    
    if new_content != content:
        with open(file, 'w') as f:
            f.write(new_content)
        print(f"Updated {file}")
    else:
        print(f"No match in {file}")

