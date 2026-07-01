import re

with open('src/main/resources/templates/fragments/bottom_nav.html', 'r') as f:
    content = f.read()

# We need to insert a Settings link right after My Profile in bottom_nav.html
settings_html = """                <li><a class="dropdown-item py-2 px-3 mb-1 rounded-3 fw-medium text-decoration-none d-flex align-items-center" href="/profile" style="font-size: 0.95rem; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); color: #334155 !important;" onmouseover="this.style.background='rgba(16, 185, 129, 0.1)'; this.style.color='#059669 !important'; this.style.transform='translateX(6px)';" onmouseout="this.style.background='transparent'; this.style.color='#334155 !important'; this.style.transform='none';"><div class="d-flex align-items-center justify-content-center me-3 shadow-sm" style="width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(52, 211, 153, 0.2)); border: 1px solid rgba(255,255,255,0.6);"><i class="bi bi-gear-fill" style="color: #10b981; font-size: 1.1rem;"></i></div>Settings</a></li>
"""

# Let's find "My Profile" and insert it after
pattern = r'(<li><a class="dropdown-item[^>]*>.*?<i class="bi bi-person-fill"[^>]*></i>.*?My Profile</a></li>)'

match = re.search(pattern, content, re.DOTALL)
if match:
    new_content = content[:match.end()] + "\n" + settings_html + content[match.end():]
    with open('src/main/resources/templates/fragments/bottom_nav.html', 'w') as f:
        f.write(new_content)
    print("Settings added successfully.")
else:
    print("Could not find My Profile.")

