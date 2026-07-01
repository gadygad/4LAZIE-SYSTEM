import re

with open('src/main/resources/templates/fragments/navbar_actions.html', 'r') as f:
    content = f.read()

# Pattern to extract the entire profile dropdown ul
pattern = r'(<ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-3" aria-labelledby="profileDropdown".*?</ul>)'

new_ul = """<ul class="dropdown-menu dropdown-menu-end border-0 mt-3 p-2" aria-labelledby="profileDropdown" style="border-radius: 24px; min-width: 260px; background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15), inset 0 2px 10px rgba(255,255,255,1); border: 1px solid rgba(255,255,255,0.7); animation: popupAnim 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; transform-origin: top right;">
                <li class="px-4 py-3 mb-2" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.15)); border-radius: 16px; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 60%); animation: rotateGlow 10s linear infinite;"></div>
                    <p class="mb-0 fw-bold text-dark position-relative" style="font-size: 1.05rem; font-family: 'Outfit', sans-serif; letter-spacing: -0.3px;" th:text="${session.user != null ? session.user.name : 'Student'}">John Doe</p>
                    <p class="mb-0 fw-bold position-relative" style="font-size: 0.7rem; color: #10b981; letter-spacing: 1px; text-transform: uppercase;" th:text="${session.user != null and session.user.courseProgram != null ? session.user.courseProgram : 'STUDENT'}">STUDENT</p>
                </li>
                
                <style>
                    @keyframes rotateGlow { 100% { transform: rotate(360deg); } }
                    .premium-dropdown-item {
                        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
                        border-radius: 14px;
                        margin-bottom: 4px;
                        display: flex;
                        align-items: center;
                    }
                    .premium-dropdown-item:hover {
                        background: rgba(16, 185, 129, 0.1) !important;
                        transform: translateX(5px);
                        color: #059669 !important;
                    }
                    .premium-dropdown-item:hover .icon-box {
                        transform: scale(1.1);
                        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                    }
                    .icon-box {
                        width: 36px; height: 36px;
                        border-radius: 10px;
                        display: flex; align-items: center; justify-content: center;
                        transition: all 0.3s ease;
                    }
                    .icon-box-green { background: rgba(16, 185, 129, 0.15); color: #10b981; }
                    .icon-box-red { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
                </style>

                <li th:if="${session.user != null and session.user.role == 'ADMIN'}">
                    <a class="dropdown-item py-2 px-3 fw-bold premium-dropdown-item text-secondary" href="/upload" style="font-size: 0.95rem;">
                        <div class="icon-box icon-box-green me-3"><i class="bi bi-speedometer2"></i></div>
                        Admin Dashboard
                    </a>
                </li>
                <li th:unless="${session.user != null and session.user.role == 'ADMIN'}">
                    <a class="dropdown-item py-2 px-3 fw-medium premium-dropdown-item text-secondary" href="/dashboard" style="font-size: 0.95rem;">
                        <div class="icon-box icon-box-green me-3"><i class="bi bi-grid-1x2-fill"></i></div>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a class="dropdown-item py-2 px-3 fw-medium premium-dropdown-item text-secondary" href="/profile" style="font-size: 0.95rem;">
                        <div class="icon-box icon-box-green me-3"><i class="bi bi-person-fill"></i></div>
                        My Profile
                    </a>
                </li>
                <li>
                    <a class="dropdown-item py-2 px-3 fw-medium premium-dropdown-item text-secondary" href="#" style="font-size: 0.95rem;">
                        <div class="icon-box icon-box-green me-3"><i class="bi bi-gear-fill"></i></div>
                        Settings
                    </a>
                </li>
                <li><hr class="dropdown-divider my-2 opacity-25" style="border-color: rgba(16, 185, 129, 0.3);"></li>
                <li>
                    <a class="dropdown-item py-2 px-3 mb-1 fw-bold text-secondary" href="/logout" style="font-size: 0.95rem; border-radius: 14px; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; align-items: center;" onmouseover="this.style.background='rgba(239, 68, 68, 0.1)'; this.style.transform='translateX(5px)'; this.style.color='#dc2626';" onmouseout="this.style.background='transparent'; this.style.transform='none'; this.style.color='#6c757d';">
                        <div class="icon-box icon-box-red me-3"><i class="bi bi-box-arrow-right"></i></div>
                        Logout
                    </a>
                </li>
            </ul>"""

match = re.search(pattern, content, re.DOTALL)
if match:
    new_content = content[:match.start()] + new_ul + content[match.end():]
    with open('src/main/resources/templates/fragments/navbar_actions.html', 'w') as f:
        f.write(new_content)
    print("Successfully upgraded profile dropdown.")
else:
    print("Could not find the dropdown ul.")
