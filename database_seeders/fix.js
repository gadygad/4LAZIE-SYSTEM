const fs = require('fs');
const filepath = 'd:/4LAZIE/src/main/resources/templates/fragments/top_actions.html';

let content = fs.readFileSync(filepath, 'utf8');

const startMarker = '        <!-- Profile Dropdown -->';
const endMarker = '            // ====== FAST SEARCH FUNCTIONALITY (Navbar) ======';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
    console.error('Markers not found');
    process.exit(1);
}

const replacement = `        <!-- Profile Dropdown -->
        <div class="dropdown ms-3" th:if="\${session.user != null}">
            <a href="#" class="d-flex align-items-center text-decoration-none dropdown-toggle" id="profileDropdownTop" data-bs-toggle="dropdown" aria-expanded="false" 
               style="background: rgba(255, 255, 255, 0.9); border: 1px solid rgba(255,255,255,0.6); padding: 5px 16px 5px 5px; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.05), inset 0 2px 5px rgba(255,255,255,0.8); backdrop-filter: blur(8px); transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);"
               onmouseover="this.style.boxShadow='0 8px 25px rgba(16, 185, 129, 0.3), inset 0 2px 5px rgba(255,255,255,1)'; this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(16, 185, 129, 0.4)';" 
               onmouseout="this.style.boxShadow='0 4px 15px rgba(0,0,0,0.05), inset 0 2px 5px rgba(255,255,255,0.8)'; this.style.transform='none'; this.style.borderColor='rgba(255, 255, 255, 0.6)';">
                <img loading="lazy" th:if="\${session.user != null and session.user.profilePicture != null}" th:src="\${#strings.startsWith(session.user.profilePicture, 'http')} ? \${session.user.profilePicture} : @{'/uploads/' + \${session.user.profilePicture}}" alt="Profile" class="rounded-circle d-none d-sm-inline-block me-2" style="width: 40px; height: 40px; object-fit: cover; border: 2px solid #fff; box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);">
                <img loading="lazy" th:unless="\${session.user != null and session.user.profilePicture != null}" th:src="'https://ui-avatars.com/api/?name=' + \${session.user != null ? session.user.name : 'Student'} + '&background=10b981&color=fff'" alt="Profile" class="rounded-circle d-none d-sm-inline-block me-2" style="width: 40px; height: 40px; object-fit: cover; border: 2px solid #fff; box-shadow: 0 2px 10px rgba(16, 185, 129, 0.2);">
                <!-- Mobile-only avatar without margin -->
                <img loading="lazy" th:if="\${session.user != null and session.user.profilePicture != null}" th:src="\${#strings.startsWith(session.user.profilePicture, 'http')} ? \${session.user.profilePicture} : @{'/uploads/' + \${session.user.profilePicture}}" alt="Profile" class="rounded-circle d-sm-none" style="width: 40px; height: 40px; object-fit: cover; border: 2px solid #fff; box-shadow: 0 2px 10px rgba(16, 185, 129, 0.3);">
                <img loading="lazy" th:unless="\${session.user != null and session.user.profilePicture != null}" th:src="'https://ui-avatars.com/api/?name=' + \${session.user != null ? session.user.name : 'Student'} + '&background=10b981&color=fff'" alt="Profile" class="rounded-circle d-sm-none" style="width: 40px; height: 40px; object-fit: cover; border: 2px solid #fff; box-shadow: 0 2px 10px rgba(16, 185, 129, 0.2);">
                
                <div class="d-none d-sm-flex flex-column justify-content-center me-2">
                    <span class="fw-bold lh-1" style="font-family: 'Outfit', sans-serif; font-size: 0.9rem; color: #1e293b;" th:text="\${session.user != null ? session.user.name : 'Student'}">John Doe</span>
                    <span class="lh-1 mt-1" style="font-size: 0.65rem; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; color: #10b981;">Premium</span>
                </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end border-0 mt-3 p-2" aria-labelledby="profileDropdownTop" style="border-radius: 24px; min-width: 260px; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15), inset 0 2px 10px rgba(255,255,255,1); border: 1px solid rgba(255,255,255,0.7); animation: popupAnim 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; transform-origin: top right;">
                <li class="px-4 py-3 mb-2" style="background: #ecfdf5; border-radius: 16px; border: 1px solid rgba(16, 185, 129, 0.2);">
                    <p class="mb-0 fw-bold position-relative" style="font-size: 1.05rem; font-family: 'Outfit', sans-serif; letter-spacing: -0.3px; color: #064e3b !important;" th:text="\${session.user != null ? session.user.name : 'Student'}">John Doe</p>
                    <p class="mb-0 fw-bold position-relative" style="font-size: 0.7rem; color: #059669 !important; letter-spacing: 1px; text-transform: uppercase;" th:text="\${session.user != null and session.user.courseProgram != null ? session.user.courseProgram : 'STUDENT'}">STUDENT</p>
                </li>
                
                <style>
                    @keyframes popupAnim {
                        0% { opacity: 0; transform: scale(0.9) translateY(-10px); }
                        100% { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    @keyframes rotateGlow { 100% { transform: rotate(360deg); } }
                    .premium-dropdown-item {
                        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
                        border-radius: 14px;
                        margin-bottom: 4px;
                        display: flex;
                        align-items: center;
                    }
                    .premium-dropdown-item:hover {
                        background: linear-gradient(90deg, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0.05) 100%) !important;
                        transform: translateX(8px);
                        color: #047857 !important;
                        font-weight: 700 !important;
                        border-left: 3px solid #10b981;
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

                <li th:if="\${session.user != null and (session.user.role.name() == 'ADMIN' or session.user.role.name() == 'SUPER_ADMIN')}">
                    <a class="dropdown-item py-2 px-3 fw-bold premium-dropdown-item text-secondary" href="/admin/dashboard" style="font-size: 0.95rem;">
                        <div class="icon-box icon-box-green me-3"><i class="bi bi-speedometer2"></i></div>
                        Admin Dashboard
                    </a>
                </li>
                <li th:unless="\${session.user != null and (session.user.role.name() == 'ADMIN' or session.user.role.name() == 'SUPER_ADMIN')}">
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
                <li><hr class="dropdown-divider my-2 opacity-25" style="border-color: rgba(16, 185, 129, 0.3);"></li>
                <li>
                    <a class="dropdown-item py-2 px-3 mb-1 fw-bold text-secondary" href="/logout" style="font-size: 0.95rem; border-radius: 14px; transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); display: flex; align-items: center;" onmouseover="this.style.background='linear-gradient(90deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.02) 100%)'; this.style.borderLeft='3px solid #ef4444'; this.style.transform='translateX(5px)'; this.style.color='#dc2626';" onmouseout="this.style.background='transparent'; this.style.borderLeft='none'; this.style.transform='none'; this.style.color='#6c757d';">
                        <div class="icon-box icon-box-red me-3"><i class="bi bi-box-arrow-right"></i></div>
                        Logout
                    </a>
                </li>
            </ul>
        </div>
            
    <!-- Mobile Search Collapse (Appears below navbar on mobile) -->
    <div class="collapse w-100 d-md-none position-absolute start-0 px-3" id="mobileSearchCollapseGlobal" style="top: 100%; z-index: 1010; background: rgba(255,255,255,0.98); padding-bottom: 15px; border-bottom: 1px solid rgba(16,185,129,0.1); box-shadow: 0 10px 20px rgba(0,0,0,0.05);">
        <div class="position-relative mt-2">
            <i class="bi bi-search position-absolute text-muted" style="left: 14px; top: 50%; transform: translateY(-50%); font-size: 0.9rem; z-index: 5; color: #059669 !important;"></i>
            <input type="text" id="globalMobileSearch" autocomplete="off" class="form-control w-100" placeholder="Search modules, notes..."
                   style="padding: 10px 16px 10px 40px !important; border-radius: 12px; border: 1px solid rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.05); font-size: 0.9rem; font-family: 'Inter', sans-serif; color: #1e293b; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);"
                   onfocus="this.style.boxShadow='0 8px 25px rgba(16, 185, 129,0.15)'; this.style.borderColor='#059669'; this.style.background='#ffffff';"
                   onblur="setTimeout(()=>{document.getElementById('globalMobileResults').classList.add('d-none')}, 200); this.style.boxShadow='inset 0 1px 3px rgba(0,0,0,0.02)'; this.style.borderColor='rgba(16, 185, 129, 0.3)'; this.style.background='rgba(16, 185, 129, 0.05)';">
            <!-- Mobile Search Results Dropdown -->
            <div id="globalMobileResults" class="d-none" style="position: absolute; top: 100%; left: 0; right: 0; z-index: 9999; margin-top: 8px; background: rgba(255,255,255,0.98); backdrop-filter: blur(20px); border-radius: 16px; border: 1px solid rgba(16,185,129,0.15); box-shadow: 0 15px 40px rgba(0,0,0,0.12); overflow: hidden; max-height: 300px; overflow-y: auto;"></div>
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
`;

const newContent = content.substring(0, startIdx) + replacement + content.substring(endIdx);
fs.writeFileSync(filepath, newContent, 'utf8');
console.log('Done fixing HTML');
