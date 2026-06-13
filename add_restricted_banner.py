import re

def add_restricted_banner(file_path):
    with open(file_path, 'r') as f:
        html = f.read()

    # Define the new Restricted Banner CSS
    restricted_banner_css = """
        .restricted-banner {
            margin-top: 2rem;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 14px;
            padding: 1.5rem;
            text-align: center;
        }

        .restricted-banner h4 {
            color: #ffffff;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
            font-weight: 700;
        }

        .restricted-banner p {
            color: #a1a1aa;
            font-size: 0.85rem;
            margin-bottom: 1.2rem;
        }

        .banner-actions {
            display: flex;
            justify-content: center;
            gap: 12px;
        }

        .banner-btn {
            padding: 8px 20px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s;
        }

        .btn-register {
            background: #ffffff;
            color: #000000;
        }

        .btn-register:hover {
            background: #cccccc;
            color: #000000;
            transform: translateY(-2px);
        }

        .btn-login {
            background: transparent;
            color: #ffffff;
            border: 1px solid #ffffff;
        }

        .btn-login:hover {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
        }
    </style>
"""

    if ".restricted-banner {" not in html:
        html = html.replace('</style>', restricted_banner_css)

    # Define the HTML for the restricted banner
    restricted_banner_html = """
            <div class="restricted-banner">
                <h4 class="brand-font">Access Restricted</h4>
                <p>Create a free account to unlock premium features and past papers.</p>
                <div class="banner-actions">
                    <a href="/register" class="banner-btn btn-register brand-font">Register Now</a>
                    <a href="/login" class="banner-btn btn-login brand-font">Login</a>
                </div>
            </div>
        </div>
    </div>"""

    # Inject the banner before the closing tags of the guest-dashboard
    if "restricted-banner" not in html:
        html = html.replace('        </div>\n    </div>\n\n    <!-- Bootstrap 5 JS -->', restricted_banner_html + '\n\n    <!-- Bootstrap 5 JS -->')

    with open(file_path, 'w') as f:
        f.write(html)

add_restricted_banner('src/main/resources/templates/login.html')
add_restricted_banner('src/main/resources/templates/register.html')
