import re

files_to_update = [
    'src/main/resources/templates/dashboard.html',
    'src/main/resources/templates/notes.html',
    'src/main/resources/templates/guest_notes.html'
]

buttons_html = """            <!-- Action Buttons -->
            <div class="d-flex align-items-center me-2 me-md-4">
                <!-- Home Button -->
                <a href="/" class="d-flex align-items-center justify-content-center me-3 text-decoration-none" 
                   style="width: 42px; height: 42px; border-radius: 50%; background: #ffffff; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 10px rgba(0,0,0,0.03); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);"
                   onmouseover="this.style.boxShadow='0 8px 25px rgba(37, 99, 235, 0.15)'; this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(37, 99, 235, 0.2)'; this.querySelector('i').style.color='#2563eb';" 
                   onmouseout="this.style.boxShadow='0 4px 10px rgba(0,0,0,0.03)'; this.style.transform='none'; this.style.borderColor='rgba(0,0,0,0.06)'; this.querySelector('i').style.color='#64748b';">
                    <i class="bi bi-house-door-fill" style="color: #64748b; font-size: 1.1rem; transition: color 0.3s;"></i>
                </a>

                <!-- Notification Button -->
                <div class="dropdown me-3">
                    <a href="#" class="d-flex align-items-center justify-content-center text-decoration-none position-relative" id="notificationDropdown" data-bs-toggle="dropdown" aria-expanded="false"
                       style="width: 42px; height: 42px; border-radius: 50%; background: #ffffff; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 4px 10px rgba(0,0,0,0.03); transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);"
                       onmouseover="this.style.boxShadow='0 8px 25px rgba(245, 158, 11, 0.15)'; this.style.transform='translateY(-2px)'; this.style.borderColor='rgba(245, 158, 11, 0.2)'; this.querySelector('i').style.color='#f59e0b';" 
                       onmouseout="this.style.boxShadow='0 4px 10px rgba(0,0,0,0.03)'; this.style.transform='none'; this.style.borderColor='rgba(0,0,0,0.06)'; this.querySelector('i').style.color='#64748b';">
                        <i class="bi bi-bell-fill" style="color: #64748b; font-size: 1.1rem; transition: color 0.3s;"></i>
                        <!-- Notification Badge with Pulse -->
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style="font-size: 0.6rem; padding: 0.35em 0.5em; border: 2px solid #fff; transform: translate(-30%, 30%) !important; box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); animation: pulse-danger 2s infinite;">
                            3
                        </span>
                        <style>
                            @keyframes pulse-danger {
                                0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.7); }
                                70% { box-shadow: 0 0 0 6px rgba(220, 38, 38, 0); }
                                100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
                            }
                        </style>
                    </a>
                    
                    <!-- Notification Dropdown Menu -->
                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-3 p-0" aria-labelledby="notificationDropdown" style="border-radius: 20px; min-width: 320px; overflow: hidden; animation: fadeIn 0.2s ease-out;">
                        <li class="px-4 py-3 border-bottom d-flex justify-content-between align-items-center" style="background: rgba(248, 250, 252, 0.9); backdrop-filter: blur(10px);">
                            <span class="fw-bold text-dark" style="font-family: 'Outfit', sans-serif; font-size: 1.1rem;">Notifications</span>
                            <span class="badge bg-primary rounded-pill px-3 py-2" style="font-weight: 600;">3 New</span>
                        </li>
                        <li>
                            <div class="list-group list-group-flush">
                                <a href="#" class="list-group-item list-group-item-action py-3 px-4 border-bottom" style="transition: background 0.2s; background: rgba(59, 130, 246, 0.03);">
                                    <div class="d-flex w-100 justify-content-between align-items-start">
                                        <div class="d-flex align-items-start">
                                            <div class="me-3 d-flex justify-content-center align-items-center mt-1" style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.2));">
                                                <i class="bi bi-file-earmark-text-fill text-primary" style="font-size: 1.1rem;"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-1 fw-bold text-dark" style="font-size: 0.9rem;">New Notes Added</h6>
                                                <p class="mb-1 text-muted" style="font-size: 0.8rem; line-height: 1.4;">IT Level 5 Semester 1 Networking notes are now available.</p>
                                                <small class="text-primary fw-bold" style="font-size: 0.7rem;">Just now</small>
                                            </div>
                                        </div>
                                        <div style="width: 8px; height: 8px; background: #3b82f6; border-radius: 50%; margin-top: 6px;"></div>
                                    </div>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action py-3 px-4 border-bottom" style="transition: background 0.2s;">
                                    <div class="d-flex w-100 justify-content-between align-items-start">
                                        <div class="d-flex align-items-start">
                                            <div class="me-3 d-flex justify-content-center align-items-center mt-1" style="width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, rgba(16,185,129,0.1), rgba(5,150,105,0.2));">
                                                <i class="bi bi-shield-check text-success" style="font-size: 1.2rem;"></i>
                                            </div>
                                            <div>
                                                <h6 class="mb-1 fw-bold text-dark" style="font-size: 0.9rem;">Premium Active</h6>
                                                <p class="mb-1 text-muted" style="font-size: 0.8rem; line-height: 1.4;">Your account has been upgraded successfully.</p>
                                                <small class="text-muted" style="font-size: 0.7rem;">2h ago</small>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </li>
                        <li class="text-center py-3 bg-light border-top">
                            <a href="#" class="text-decoration-none fw-bold" style="font-size: 0.85rem; color: #2563eb; transition: color 0.2s;" onmouseover="this.style.color='#1d4ed8'" onmouseout="this.style.color='#2563eb'">View All Notifications</a>
                        </li>
                    </ul>
                </div>
            </div>

"""

target_pattern = '<div class="d-flex align-items-center dropdown">'

for file_path in files_to_update:
    try:
        with open(file_path, 'r') as f:
            content = f.read()
            
        if "<!-- Home Button -->" not in content:
            # We add it right before the profile dropdown wrapper
            content = content.replace(target_pattern, buttons_html + target_pattern)
            
            with open(file_path, 'w') as f:
                f.write(content)
            print(f"Updated {file_path}")
    except FileNotFoundError:
        print(f"Skipped {file_path} - file not found")

