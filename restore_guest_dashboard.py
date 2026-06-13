import re

def inject_guest_dashboard(file_path):
    with open(file_path, 'r') as f:
        html = f.read()

    # Define the new Guest Dashboard CSS to be inserted before </style>
    guest_dashboard_css = """
        /* Premium Guest Dashboard Styles */
        .guest-dashboard {
            width: 100%;
            max-width: clamp(320px, 90%, 480px);
            z-index: 1;
            animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            background: rgba(18, 18, 18, 0.7);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 24px;
            padding: 2.5rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .guest-dashboard .header {
            margin-bottom: 2rem;
            text-align: center;
        }

        .guest-dashboard .header h3 {
            font-size: clamp(1.4rem, 3vh, 1.8rem);
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 0.2rem;
            letter-spacing: -0.02em;
        }

        .guest-dashboard .header p {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin: 0;
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }

        .nta-levels {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .nta-badge {
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            cursor: default;
        }

        .nta-badge:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }

        .section-title {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--text-muted);
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .notes-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 2rem;
        }

        .note-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 12px 16px;
            border-radius: 14px;
            transition: all 0.2s;
        }

        .note-item:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.1);
        }

        .note-info {
            display: flex;
            align-items: center;
            gap: 14px;
            color: #ffffff;
            font-size: 0.9rem;
            font-weight: 500;
        }

        .note-icon {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            width: 32px;
            height: 32px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
        }

        .download-btn {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border: none;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .download-btn:hover {
            background: #ffffff;
            color: #000000;
        }
        
        .premium-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 1rem;
        }

        .premium-card {
            background: rgba(0, 0, 0, 0.4);
            border: 1px dashed rgba(255, 255, 255, 0.15);
            padding: 14px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            gap: 12px;
            transition: all 0.2s;
        }

        .premium-card:hover {
            background: rgba(255, 255, 255, 0.05);
            border-color: rgba(255, 255, 255, 0.3);
        }

        .premium-icon {
            font-size: 1.2rem;
            opacity: 0.8;
        }

        .premium-text {
            color: #a1a1aa;
            font-size: 0.8rem;
            font-weight: 500;
        }
    </style>
</head>"""

    # Replace head close with css + head close
    html = html.replace('</style>\n</head>', guest_dashboard_css)

    # Define the new Guest Dashboard HTML
    guest_dashboard_html = """
    <!-- Right Side: Premium Guest Dashboard Showcase -->
    <div class="right d-none d-lg-flex">
        <div class="guest-dashboard">
            <div class="header">
                <h3 class="brand-font">📚 4LAZIE</h3>
                <p class="brand-font">Smart Learning Made Easy</p>
            </div>
            
            <div class="nta-levels">
                <span class="nta-badge brand-font">NTA LEVEL 4</span>
                <span class="nta-badge brand-font">NTA LEVEL 5</span>
                <span class="nta-badge brand-font">NTA LEVEL 6</span>
            </div>

            <div class="section-title brand-font"><i class="bi bi-star-fill text-warning"></i> Popular Notes</div>
            <div class="notes-list">
                <div class="note-item">
                    <div class="note-info">
                        <div class="note-icon"><i class="bi bi-cup-hot-fill"></i></div>
                        Java Programming Notes
                    </div>
                    <button class="download-btn brand-font">Download</button>
                </div>
                <div class="note-item">
                    <div class="note-info">
                        <div class="note-icon"><i class="bi bi-database-fill"></i></div>
                        Database Notes
                    </div>
                    <button class="download-btn brand-font">Download</button>
                </div>
                <div class="note-item">
                    <div class="note-info">
                        <div class="note-icon"><i class="bi bi-globe"></i></div>
                        Networking Notes
                    </div>
                    <button class="download-btn brand-font">Download</button>
                </div>
            </div>

            <div class="section-title brand-font"><i class="bi bi-lock-fill text-danger"></i> Premium Features</div>
            <div class="premium-grid">
                <div class="premium-card">
                    <div class="premium-icon">📝</div>
                    <div class="premium-text">CAT 1 Past Papers</div>
                </div>
                <div class="premium-card">
                    <div class="premium-icon">📝</div>
                    <div class="premium-text">CAT 2 Past Papers</div>
                </div>
                <div class="premium-card">
                    <div class="premium-icon">📌</div>
                    <div class="premium-text">Assignments</div>
                </div>
                <div class="premium-card">
                    <div class="premium-icon">💡</div>
                    <div class="premium-text">Solutions</div>
                </div>
            </div>
        </div>
    </div>"""

    # Replace the right side content
    pattern = r'<!-- Right Side: Premium Abstract Visual Showcase -->\s*<div class="right d-none d-lg-flex">\s*<div class="showcase-content">.*?</div>\s*</div>'
    html = re.sub(pattern, guest_dashboard_html.strip(), html, flags=re.DOTALL)

    with open(file_path, 'w') as f:
        f.write(html)

inject_guest_dashboard('src/main/resources/templates/login.html')
inject_guest_dashboard('src/main/resources/templates/register.html')
