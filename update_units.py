import re

with open("src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# Highly Premium Inner Layout Design
inner_layout = """<div class="p-3" style="background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%); border-radius: 12px; border: 1px solid rgba(0,0,0,0.03); box-shadow: inset 0 2px 4px rgba(255,255,255,0.6);">
                                    
                                    <!-- NOTES (UNLOCKED) -->
                                    <div class="mb-4">
                                        <div class="d-flex align-items-center mb-3">
                                            <div style="width: 28px; height: 28px; border-radius: 8px; background: rgba(59, 130, 246, 0.1); color: #3b82f6; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                                <i class="bi bi-journal-text" style="font-size: 0.9rem;"></i>
                                            </div>
                                            <h6 class="fw-bolder mb-0" style="font-size: 0.75rem; color: #334155; letter-spacing: 1px;">CURRENT SEMESTER NOTES</h6>
                                        </div>
                                        
                                        <!-- Unit 1 -->
                                        <div class="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded-3 position-relative" style="border: 1px solid rgba(226, 232, 240, 0.8); box-shadow: 0 2px 8px rgba(0,0,0,0.02); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='rgba(59, 130, 246, 0.3)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.08)';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(226, 232, 240, 0.8)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.02)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-file-earmark-pdf-fill text-danger me-3" style="font-size: 1.2rem;"></i>
                                                <div>
                                                    <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">Unit 1: Introduction and Fundamentals</span>
                                                    <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">PDF Document • 2.4 MB</span>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-2 align-items-center">
                                                <a href="#" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1" style="font-size: 0.65rem; border-radius: 8px; background: rgba(59, 130, 246, 0.08); color: #3b82f6; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6'; this.style.color='#fff';" onmouseout="this.style.background='rgba(59, 130, 246, 0.08)'; this.style.color='#3b82f6';"><i class="bi bi-eye-fill"></i> READ</a>
                                                <a href="#" class="btn btn-sm py-1 px-2 fw-bold" style="font-size: 0.65rem; background: #0f172a; color: #fff; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6';" onmouseout="this.style.background='#0f172a';"><i class="bi bi-cloud-download-fill"></i></a>
                                            </div>
                                        </div>

                                        <!-- Unit 2 -->
                                        <div class="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded-3 position-relative" style="border: 1px solid rgba(226, 232, 240, 0.8); box-shadow: 0 2px 8px rgba(0,0,0,0.02); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='rgba(59, 130, 246, 0.3)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.08)';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(226, 232, 240, 0.8)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.02)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-file-earmark-pdf-fill text-danger me-3" style="font-size: 1.2rem;"></i>
                                                <div>
                                                    <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">Unit 2: Core Concepts & Theories</span>
                                                    <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">PDF Document • 3.1 MB</span>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-2 align-items-center">
                                                <a href="#" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1" style="font-size: 0.65rem; border-radius: 8px; background: rgba(59, 130, 246, 0.08); color: #3b82f6; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6'; this.style.color='#fff';" onmouseout="this.style.background='rgba(59, 130, 246, 0.08)'; this.style.color='#3b82f6';"><i class="bi bi-eye-fill"></i> READ</a>
                                                <a href="#" class="btn btn-sm py-1 px-2 fw-bold" style="font-size: 0.65rem; background: #0f172a; color: #fff; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6';" onmouseout="this.style.background='#0f172a';"><i class="bi bi-cloud-download-fill"></i></a>
                                            </div>
                                        </div>

                                        <!-- Unit 3 -->
                                        <div class="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded-3 position-relative" style="border: 1px solid rgba(226, 232, 240, 0.8); box-shadow: 0 2px 8px rgba(0,0,0,0.02); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='rgba(59, 130, 246, 0.3)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.08)';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(226, 232, 240, 0.8)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.02)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-file-earmark-pdf-fill text-danger me-3" style="font-size: 1.2rem;"></i>
                                                <div>
                                                    <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">Unit 3: Implementation & Practice</span>
                                                    <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">PDF Document • 1.8 MB</span>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-2 align-items-center">
                                                <a href="#" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1" style="font-size: 0.65rem; border-radius: 8px; background: rgba(59, 130, 246, 0.08); color: #3b82f6; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6'; this.style.color='#fff';" onmouseout="this.style.background='rgba(59, 130, 246, 0.08)'; this.style.color='#3b82f6';"><i class="bi bi-eye-fill"></i> READ</a>
                                                <a href="#" class="btn btn-sm py-1 px-2 fw-bold" style="font-size: 0.65rem; background: #0f172a; color: #fff; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6';" onmouseout="this.style.background='#0f172a';"><i class="bi bi-cloud-download-fill"></i></a>
                                            </div>
                                        </div>

                                        <!-- Unit 4 -->
                                        <div class="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded-3 position-relative" style="border: 1px solid rgba(226, 232, 240, 0.8); box-shadow: 0 2px 8px rgba(0,0,0,0.02); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='rgba(59, 130, 246, 0.3)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.08)';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(226, 232, 240, 0.8)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.02)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-file-earmark-pdf-fill text-danger me-3" style="font-size: 1.2rem;"></i>
                                                <div>
                                                    <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">Unit 4: Advanced Principles</span>
                                                    <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">PDF Document • 4.0 MB</span>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-2 align-items-center">
                                                <a href="#" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1" style="font-size: 0.65rem; border-radius: 8px; background: rgba(59, 130, 246, 0.08); color: #3b82f6; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6'; this.style.color='#fff';" onmouseout="this.style.background='rgba(59, 130, 246, 0.08)'; this.style.color='#3b82f6';"><i class="bi bi-eye-fill"></i> READ</a>
                                                <a href="#" class="btn btn-sm py-1 px-2 fw-bold" style="font-size: 0.65rem; background: #0f172a; color: #fff; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6';" onmouseout="this.style.background='#0f172a';"><i class="bi bi-cloud-download-fill"></i></a>
                                            </div>
                                        </div>

                                        <!-- Unit 5 -->
                                        <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative" style="border: 1px solid rgba(226, 232, 240, 0.8); box-shadow: 0 2px 8px rgba(0,0,0,0.02); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='rgba(59, 130, 246, 0.3)'; this.style.boxShadow='0 4px 12px rgba(59, 130, 246, 0.08)';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(226, 232, 240, 0.8)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.02)';">
                                            <div class="d-flex align-items-center">
                                                <i class="bi bi-file-earmark-pdf-fill text-danger me-3" style="font-size: 1.2rem;"></i>
                                                <div>
                                                    <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">Unit 5: Revision & Summary</span>
                                                    <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">PDF Document • 1.2 MB</span>
                                                </div>
                                            </div>
                                            <div class="d-flex gap-2 align-items-center">
                                                <a href="#" class="btn btn-sm py-1 px-3 fw-bold d-flex align-items-center gap-1" style="font-size: 0.65rem; border-radius: 8px; background: rgba(59, 130, 246, 0.08); color: #3b82f6; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6'; this.style.color='#fff';" onmouseout="this.style.background='rgba(59, 130, 246, 0.08)'; this.style.color='#3b82f6';"><i class="bi bi-eye-fill"></i> READ</a>
                                                <a href="#" class="btn btn-sm py-1 px-2 fw-bold" style="font-size: 0.65rem; background: #0f172a; color: #fff; border-radius: 8px; transition: all 0.2s;" onmouseover="this.style.background='#3b82f6';" onmouseout="this.style.background='#0f172a';"><i class="bi bi-cloud-download-fill"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <hr style="border-color: rgba(0,0,0,0.05); margin: 20px 0;">

                                    <!-- PREMIUM ASSESSMENTS & PAST PAPERS -->
                                    <div class="mb-2">
                                        <div class="d-flex align-items-center mb-3">
                                            <div style="width: 28px; height: 28px; border-radius: 8px; background: rgba(245, 158, 11, 0.1); color: #f59e0b; display: flex; align-items: center; justify-content: center; margin-right: 10px;">
                                                <i class="bi bi-star-fill" style="font-size: 0.8rem;"></i>
                                            </div>
                                            <h6 class="fw-bolder mb-0" style="font-size: 0.75rem; color: #d97706; letter-spacing: 1px;">PREMIUM RESOURCES</h6>
                                        </div>

                                        <!-- ASSIGNMENT 1 -->
                                        <a href="/register" class="text-decoration-none d-block mb-2">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;"></i>
                                                    <div>
                                                        <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">ASSIGNMENT 1</span>
                                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Questions & Marking Scheme</span>
                                                    </div>
                                                </div>
                                                <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>

                                        <!-- CAT 1 -->
                                        <a href="/register" class="text-decoration-none d-block mb-2">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;"></i>
                                                    <div>
                                                        <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">CAT 1</span>
                                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Past Paper + Answers</span>
                                                    </div>
                                                </div>
                                                <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>

                                        <!-- ASSIGNMENT 2 -->
                                        <a href="/register" class="text-decoration-none d-block mb-2">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;"></i>
                                                    <div>
                                                        <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">ASSIGNMENT 2</span>
                                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Guidelines & Solutions</span>
                                                    </div>
                                                </div>
                                                <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>

                                        <!-- CAT 2 -->
                                        <a href="/register" class="text-decoration-none d-block mb-2">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;"></i>
                                                    <div>
                                                        <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">CAT 2</span>
                                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Revision Material</span>
                                                    </div>
                                                </div>
                                                <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>

                                        <!-- UNIVERSITY EXAMINATION (UE) -->
                                        <a href="/register" class="text-decoration-none d-block mb-3">
                                            <div class="d-flex align-items-center justify-content-between p-2 bg-white rounded-3 position-relative overflow-hidden" style="border: 1px dashed rgba(245, 158, 11, 0.4); transition: all 0.3s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='#f59e0b'; this.style.background='#fffbeb';" onmouseout="this.style.transform='none'; this.style.borderColor='rgba(245, 158, 11, 0.4)'; this.style.background='#ffffff';">
                                                <div class="d-flex align-items-center">
                                                    <i class="bi bi-file-earmark-lock2-fill text-warning me-3" style="font-size: 1.1rem;"></i>
                                                    <div>
                                                        <span class="d-block" style="font-size: 0.75rem; font-weight: 700; color: #1e293b;">UNIVERSITY EXAMINATION (UE)</span>
                                                        <span class="d-block text-secondary" style="font-size: 0.6rem; margin-top: 2px;">Final Papers & Solutions</span>
                                                    </div>
                                                </div>
                                                <span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #d97706; font-size: 0.6rem; padding: 5px 8px; border-radius: 6px;"><i class="bi bi-lock-fill"></i> PREMIUM</span>
                                            </div>
                                        </a>

                                        <!-- PREVIOUS YEARS NOTES -->
                                        <a href="/register" class="text-decoration-none d-block">
                                            <div class="d-flex align-items-center justify-content-between p-3 rounded-3 position-relative overflow-hidden shadow-sm" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border: 1px solid rgba(255,255,255,0.1); transition: all 0.3s ease;" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.15)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 2px 4px rgba(0,0,0,0.05)';">
                                                <div class="d-flex align-items-center">
                                                    <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(245, 158, 11, 0.15); color: #f59e0b; display: flex; align-items: center; justify-content: center; margin-right: 12px; border: 1px solid rgba(245, 158, 11, 0.3);">
                                                        <i class="bi bi-archive-fill" style="font-size: 1rem;"></i>
                                                    </div>
                                                    <div>
                                                        <span class="d-block" style="font-size: 0.8rem; font-weight: 700; color: #ffffff;">NOTES FOR PREVIOUS YEARS</span>
                                                        <span class="d-block" style="font-size: 0.65rem; color: rgba(255,255,255,0.6); margin-top: 2px;">Past Papers, Assignments, CATs, UE (2020-2023)</span>
                                                    </div>
                                                </div>
                                                <div class="d-flex align-items-center">
                                                    <span class="badge" style="background: linear-gradient(135deg, #f59e0b, #d97706); color: #fff; font-size: 0.6rem; padding: 6px 10px; border-radius: 6px; letter-spacing: 0.5px;"><i class="bi bi-gem me-1"></i> PREMIUM ACCESS</span>
                                                </div>
                                            </div>
                                        </a>
                                        
                                    </div>
                                </div>"""

modules_data = [
    ("mod1", "SERVER ADMINISTRATION", "bi-hdd-network", "59, 130, 246", "#3b82f6"),
    ("mod2", "WEB DESIGNING", "bi-globe", "244, 63, 94", "#f43f5e"),
    ("mod3", "COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE", "bi-cpu", "16, 185, 129", "#10b981"),
    ("mod4", "COMPUTER NETWORK", "bi-router", "245, 158, 11", "#f59e0b"),
    ("mod5", "MICROPROCESSOR AND MICROCONTROLLER", "bi-motherboard", "139, 92, 246", "#8b5cf6"),
    ("mod6", "BASIC DATA COMMUNICATION", "bi-diagram-3", "14, 165, 233", "#0ea5e9")
]

modules_html = ""
for mod_id, title, icon, rgb, hexcolor in modules_data:
    modules_html += f"""
                        <!-- {title} -->
                        <div class="px-3 py-2 position-relative bg-white" style="border-radius: 14px; border: 1px solid rgba(0,0,0,0.06); transition: all 0.3s ease; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.03);" onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 10px 30px rgba({rgb}, 0.15)'; this.style.borderColor='rgba({rgb}, 0.4)';" onmouseout="this.style.transform='none'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'; this.style.borderColor='rgba(0,0,0,0.06)';" data-bs-toggle="collapse" data-bs-target="#{mod_id}">
                            <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                    <div class="d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; border-radius: 10px; background: rgba({rgb}, 0.1); color: {hexcolor};">
                                        <i class="{icon}" style="font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="ms-3">
                                        <h6 class="fw-bolder mb-1" style="font-size: 0.85rem; color: #0f172a; font-family: 'Outfit', sans-serif; letter-spacing: 0.5px;">{title}</h6>
                                        <div class="d-flex align-items-center mt-1">
                                            <span class="text-secondary fw-medium" style="font-size: 0.7rem;"><i class="bi bi-file-earmark-text me-1 text-primary"></i> Multiple Resources</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center ms-3">
                                    <span class="btn btn-sm rounded-pill fw-bold text-nowrap" style="background: rgba({rgb}, 0.08); color: {hexcolor}; font-size: 0.7rem; padding: 6px 14px; transition: all 0.3s ease;" onmouseover="this.style.background='{hexcolor}'; this.style.color='#fff';" onmouseout="this.style.background='rgba({rgb}, 0.08)'; this.style.color='{hexcolor}';">
                                        OPEN <i class="bi bi-chevron-down ms-1"></i>
                                    </span>
                                </div>
                            </div>
                            <div class="collapse mt-3" id="{mod_id}">
                                {inner_layout}
                            </div>
                        </div>"""

new_block = f"""<!-- NTA Level 5 Semester 2 (DIP_CSE) Premium UI Cards -->
                <div th:if="${{selectedLevel == 5 && selectedSemester == 2 && selectedProgram == 'DIP_CSE'}}" class="mb-5">
                    <div class="d-flex flex-column gap-3">{modules_html}
                    </div>
                </div>
                <!-- Dynamic Modules Section for other semesters -->"""

pattern = r'<!-- NTA Level 5 Semester 2 \(DIP_CSE\) Premium UI Cards -->.*?<!-- Dynamic Modules Section for other semesters -->'
content = re.sub(pattern, new_block, content, flags=re.DOTALL)

with open("src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)
