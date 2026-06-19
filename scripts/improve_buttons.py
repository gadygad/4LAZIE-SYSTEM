import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

old_read_btn = r'<a href="#" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1" style="font-size: 0.65rem; border-radius: 8px; background: rgba\(59, 130, 246, 0.08\); color: #3b82f6; transition: all 0.2s;" onmouseover="this.style.background=\'#3b82f6\'; this.style.color=\'#fff\';" onmouseout="this.style.background=\'rgba\(59, 130, 246, 0.08\)\'; this.style.color=\'#3b82f6\';"><i class="bi bi-eye-fill"></i> READ</a>'

new_read_btn = r"""<a href="#" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1 position-relative overflow-hidden" style="font-size: 0.65rem; border-radius: 8px; background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.02)); border: 1px solid rgba(59,130,246,0.2); color: #3b82f6; box-shadow: 0 2px 6px rgba(59,130,246,0.06); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); text-transform: uppercase; letter-spacing: 0.5px;" onmouseover="this.style.background='linear-gradient(135deg, #3b82f6, #2563eb)'; this.style.color='#fff'; this.style.borderColor='transparent'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(59,130,246,0.25)';" onmouseout="this.style.background='linear-gradient(135deg, rgba(59,130,246,0.1), rgba(59,130,246,0.02))'; this.style.color='#3b82f6'; this.style.borderColor='rgba(59,130,246,0.2)'; this.style.transform='none'; this.style.boxShadow='0 2px 6px rgba(59,130,246,0.06)';"><i class="bi bi-eye-fill"></i> READ</a>"""

old_dl_btn = r'<a href="#" class="btn btn-sm py-1 px-2 fw-bold" style="font-size: 0.65rem; background: #0f172a; color: #fff; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background=\'#3b82f6\';" onmouseout="this.style.background=\'#0f172a\';"><i class="bi bi-cloud-download-fill"></i></a>'

new_dl_btn = r"""<a href="#" class="btn btn-sm py-1 px-2 fw-bold position-relative overflow-hidden" style="font-size: 0.65rem; background: linear-gradient(135deg, #1e293b, #0f172a); color: #fff; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 10px rgba(15,23,42,0.15); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);" onmouseover="this.style.background='linear-gradient(135deg, #3b82f6, #2563eb)'; this.style.borderColor='transparent'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 15px rgba(59,130,246,0.3)';" onmouseout="this.style.background='linear-gradient(135deg, #1e293b, #0f172a)'; this.style.borderColor='rgba(255,255,255,0.08)'; this.style.transform='none'; this.style.boxShadow='0 4px 10px rgba(15,23,42,0.15)';"><i class="bi bi-cloud-download-fill"></i></a>"""

content = re.sub(old_read_btn, new_read_btn, content)
content = re.sub(old_dl_btn, new_dl_btn, content)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)
