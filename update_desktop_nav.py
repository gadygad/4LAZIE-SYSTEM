import re

with open('src/main/resources/templates/home.html', 'r') as f:
    content = f.read()

replacement = """<a th:href="@{/}" class="text-decoration-none d-flex align-items-center position-relative" style="font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 0.95rem; color: #0f172a; padding: 5px 0;">
                    Home
                    <span style="position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(90deg, #3b82f6, #9333ea); border-radius: 2px;"></span>
                </a>
                
                <style>
                    /* Desktop Mega Dropdown Styles */
                    .desktop-dropdown {
                        position: relative;
                        display: flex;
                        align-items: center;
                        height: 100%;
                        padding: 10px 0;
                    }
                    .desktop-dropdown-toggle {
                        font-family: 'Outfit', sans-serif;
                        font-weight: 600;
                        font-size: 0.95rem;
                        color: #64748b;
                        text-decoration: none;
                        transition: color 0.3s ease;
                        cursor: default;
                        display: flex;
                        align-items: center;
                        gap: 6px;
                    }
                    .desktop-dropdown:hover .desktop-dropdown-toggle {
                        color: #0f172a;
                    }
                    .desktop-dropdown-menu {
                        position: absolute;
                        top: 100%;
                        left: -20px;
                        width: 340px;
                        background: #ffffff;
                        border-radius: 16px;
                        box-shadow: 0 15px 35px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.03);
                        padding: 15px;
                        opacity: 0;
                        visibility: hidden;
                        transform: translateY(10px) scale(0.98);
                        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                        z-index: 1050;
                    }
                    .desktop-dropdown:hover .desktop-dropdown-menu {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0) scale(1);
                    }
                    .desktop-course-item {
                        position: relative;
                        margin-bottom: 5px;
                        border-radius: 10px;
                        transition: background 0.2s ease;
                    }
                    .desktop-course-item:hover {
                        background: #f8fafc;
                    }
                    .desktop-course-btn {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 10px 14px;
                        width: 100%;
                        text-decoration: none;
                        color: inherit;
                        border: none;
                        background: transparent;
                    }
                    .desktop-course-submenu {
                        position: absolute;
                        top: 0;
                        left: 100%;
                        width: 200px;
                        background: #ffffff;
                        border-radius: 16px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03);
                        padding: 12px;
                        opacity: 0;
                        visibility: hidden;
                        transform: translateX(10px);
                        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                        z-index: 1060;
                        margin-left: 5px;
                    }
                    .desktop-course-item:hover .desktop-course-submenu {
                        opacity: 1;
                        visibility: visible;
                        transform: translateX(0);
                    }
                    .desktop-course-submenu a {
                        display: block;
                        padding: 8px 12px;
                        color: #475569;
                        text-decoration: none;
                        font-size: 0.85rem;
                        font-weight: 500;
                        border-radius: 8px;
                        transition: all 0.2s ease;
                    }
                    .desktop-course-submenu a:hover {
                        color: #2563eb;
                        background: #eff6ff;
                        transform: translateX(4px);
                    }
                </style>
                
                <!-- DIPLOMA -->
                <div class="desktop-dropdown">
                    <div class="desktop-dropdown-toggle">
                        Diploma <i class="bi bi-chevron-down" style="font-size: 0.75rem;"></i>
                    </div>
                    <div class="desktop-dropdown-menu">
                        <!-- IT -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(96, 165, 250, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-laptop" style="color: #3b82f6; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Diploma in IT</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Information Technology</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_IT&level=4&semester=1'}">Level 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_IT&level=4&semester=2'}">Level 4 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_IT&level=5&semester=1'}">Level 5 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_IT&level=5&semester=2'}">Level 5 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_IT&level=6&semester=1'}">Level 6 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_IT&level=6&semester=2'}">Level 6 - Sem 2</a>
                            </div>
                        </div>
                        <!-- CSE -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(52, 211, 153, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-code-slash" style="color: #10b981; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Diploma in CSE</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Computer Science Eng.</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CSE&level=4&semester=1'}">Level 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CSE&level=4&semester=2'}">Level 4 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CSE&level=5&semester=1'}">Level 5 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CSE&level=5&semester=2'}">Level 5 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CSE&level=6&semester=1'}">Level 6 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CSE&level=6&semester=2'}">Level 6 - Sem 2</a>
                            </div>
                        </div>
                        <!-- CE -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(245, 158, 11, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-cone-striped" style="color: #d97706; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Diploma in CE</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Civil Engineering</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CE&level=4&semester=1'}">Level 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CE&level=4&semester=2'}">Level 4 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CE&level=5&semester=1'}">Level 5 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CE&level=5&semester=2'}">Level 5 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CE&level=6&semester=1'}">Level 6 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_CE&level=6&semester=2'}">Level 6 - Sem 2</a>
                            </div>
                        </div>
                        <!-- ME -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(167, 139, 250, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-gear-fill" style="color: #7c3aed; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Diploma in ME</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Mechanical Engineering</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_ME&level=4&semester=1'}">Level 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_ME&level=4&semester=2'}">Level 4 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_ME&level=5&semester=1'}">Level 5 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_ME&level=5&semester=2'}">Level 5 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_ME&level=6&semester=1'}">Level 6 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_ME&level=6&semester=2'}">Level 6 - Sem 2</a>
                            </div>
                        </div>
                        <!-- MTE -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(248, 113, 113, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-cpu" style="color: #dc2626; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Diploma in MTE</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Mechatronics Engineering</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_MTE&level=4&semester=1'}">Level 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_MTE&level=4&semester=2'}">Level 4 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_MTE&level=5&semester=1'}">Level 5 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_MTE&level=5&semester=2'}">Level 5 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_MTE&level=6&semester=1'}">Level 6 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_MTE&level=6&semester=2'}">Level 6 - Sem 2</a>
                            </div>
                        </div>
                        <!-- EEE -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(251, 191, 36, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-lightning-charge-fill" style="color: #d97706; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Diploma in EEE</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Electrical & Electronics</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_EEE&level=4&semester=1'}">Level 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_EEE&level=4&semester=2'}">Level 4 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_EEE&level=5&semester=1'}">Level 5 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_EEE&level=5&semester=2'}">Level 5 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_EEE&level=6&semester=1'}">Level 6 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DIP_EEE&level=6&semester=2'}">Level 6 - Sem 2</a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- DEGREE -->
                <div class="desktop-dropdown">
                    <div class="desktop-dropdown-toggle">
                        Degree <i class="bi bi-chevron-down" style="font-size: 0.75rem;"></i>
                    </div>
                    <div class="desktop-dropdown-menu">
                        <!-- IT -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(96, 165, 250, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-laptop" style="color: #3b82f6; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Degree in IT</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Information Technology</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_IT&level=Y1&semester=1'}">Year 1 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_IT&level=Y1&semester=2'}">Year 1 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_IT&level=Y2&semester=1'}">Year 2 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_IT&level=Y2&semester=2'}">Year 2 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_IT&level=Y3&semester=1'}">Year 3 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_IT&level=Y3&semester=2'}">Year 3 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_IT&level=Y4&semester=1'}">Year 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_IT&level=Y4&semester=2'}">Year 4 - Sem 2</a>
                            </div>
                        </div>
                        <!-- CSE -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(52, 211, 153, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-code-slash" style="color: #10b981; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Degree in CSE</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Computer Science Eng.</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CSE&level=Y1&semester=1'}">Year 1 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CSE&level=Y1&semester=2'}">Year 1 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CSE&level=Y2&semester=1'}">Year 2 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CSE&level=Y2&semester=2'}">Year 2 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CSE&level=Y3&semester=1'}">Year 3 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CSE&level=Y3&semester=2'}">Year 3 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CSE&level=Y4&semester=1'}">Year 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CSE&level=Y4&semester=2'}">Year 4 - Sem 2</a>
                            </div>
                        </div>
                        <!-- CE -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(245, 158, 11, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-cone-striped" style="color: #d97706; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Degree in CE</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Civil Engineering</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CE&level=Y1&semester=1'}">Year 1 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CE&level=Y1&semester=2'}">Year 1 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CE&level=Y2&semester=1'}">Year 2 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CE&level=Y2&semester=2'}">Year 2 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CE&level=Y3&semester=1'}">Year 3 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CE&level=Y3&semester=2'}">Year 3 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CE&level=Y4&semester=1'}">Year 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_CE&level=Y4&semester=2'}">Year 4 - Sem 2</a>
                            </div>
                        </div>
                        <!-- ME -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(167, 139, 250, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-gear-fill" style="color: #7c3aed; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Degree in ME</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Mechanical Engineering</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_ME&level=Y1&semester=1'}">Year 1 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_ME&level=Y1&semester=2'}">Year 1 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_ME&level=Y2&semester=1'}">Year 2 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_ME&level=Y2&semester=2'}">Year 2 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_ME&level=Y3&semester=1'}">Year 3 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_ME&level=Y3&semester=2'}">Year 3 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_ME&level=Y4&semester=1'}">Year 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_ME&level=Y4&semester=2'}">Year 4 - Sem 2</a>
                            </div>
                        </div>
                        <!-- MTE -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(248, 113, 113, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-cpu" style="color: #dc2626; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Degree in MTE</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Mechatronics Engineering</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_MTE&level=Y1&semester=1'}">Year 1 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_MTE&level=Y1&semester=2'}">Year 1 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_MTE&level=Y2&semester=1'}">Year 2 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_MTE&level=Y2&semester=2'}">Year 2 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_MTE&level=Y3&semester=1'}">Year 3 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_MTE&level=Y3&semester=2'}">Year 3 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_MTE&level=Y4&semester=1'}">Year 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_MTE&level=Y4&semester=2'}">Year 4 - Sem 2</a>
                            </div>
                        </div>
                        <!-- EEE -->
                        <div class="desktop-course-item">
                            <div class="desktop-course-btn">
                                <div class="d-flex align-items-center gap-3">
                                    <div style="background: rgba(251, 191, 36, 0.1); padding: 8px; border-radius: 8px;">
                                        <i class="bi bi-lightning-charge-fill" style="color: #d97706; font-size: 1.1rem;"></i>
                                    </div>
                                    <div class="d-flex flex-column">
                                        <span style="font-weight: 700; font-size: 0.9rem; color: #0f172a;">Degree in EEE</span>
                                        <span style="font-size: 0.7rem; color: #64748b;">Electrical & Electronics</span>
                                    </div>
                                </div>
                                <i class="bi bi-chevron-right text-muted" style="font-size: 0.8rem;"></i>
                            </div>
                            <div class="desktop-course-submenu">
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_EEE&level=Y1&semester=1'}">Year 1 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_EEE&level=Y1&semester=2'}">Year 1 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_EEE&level=Y2&semester=1'}">Year 2 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_EEE&level=Y2&semester=2'}">Year 2 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_EEE&level=Y3&semester=1'}">Year 3 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_EEE&level=Y3&semester=2'}">Year 3 - Sem 2</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_EEE&level=Y4&semester=1'}">Year 4 - Sem 1</a>
                                <a href="guest_notes.html" th:href="@{'/guest-notes?program=DEG_EEE&level=Y4&semester=2'}">Year 4 - Sem 2</a>
                            </div>
                        </div>
                    </div>
                </div>"""

pattern = r'<a th:href="@{/}" class="text-decoration-none d-flex align-items-center position-relative".*?Home.*?</a>'
new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('src/main/resources/templates/home.html', 'w') as f:
    f.write(new_content)

print("Update successful")
