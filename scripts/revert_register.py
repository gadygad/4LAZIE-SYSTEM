import re

register_html = """<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Notes System - Register</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #ffffff;
            --bg-dark: #050505;
            --card-bg: #121212;
            --text-main: #ffffff;
            --text-muted: #a1a1aa;
            --input-bg: rgba(255, 255, 255, 0.05);
            --input-border: #27272a;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            overflow-x: hidden;
        }

        .login-wrapper {
            display: flex;
            min-height: 100vh;
            width: 100%;
        }

        .left {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 4vh 4vw;
            border-right: 1px solid var(--input-border);
            background: linear-gradient(135deg, #0a0a0a 0%, #121212 100%);
        }

        .branding-header {
            margin-bottom: 2rem;
            text-align: center;
        }

        .branding-header .title {
            font-family: 'Outfit', sans-serif;
            font-size: clamp(2rem, 5vh, 2.8rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            background: linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .branding-header .motto {
            font-family: 'Outfit', sans-serif;
            font-size: 0.85rem;
            letter-spacing: 0.3em;
            color: var(--text-muted);
            margin-top: 0.5rem;
            text-transform: uppercase;
            font-weight: 600;
        }

        .login-box {
            width: 100%;
            max-width: 400px;
            background: var(--card-bg);
            border: 1px solid var(--input-border);
            padding: 2.5rem;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.8);
        }

        .login-box h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 8px;
            text-align: center;
            color: var(--text-main);
        }

        .login-box .subtitle-text {
            color: var(--text-muted);
            text-align: center;
            margin-bottom: 25px;
            font-size: 0.9rem;
        }

        .form-group {
            margin-bottom: 16px;
        }

        .login-box label {
            display: block;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-muted);
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .login-box input[type="text"],
        .login-box input[type="email"],
        .login-box input[type="password"] {
            width: 100%;
            padding: 12px 14px;
            background: var(--input-bg);
            border: 1px solid var(--input-border);
            border-radius: 12px;
            color: var(--text-main);
            font-size: 0.95rem;
            box-sizing: border-box;
            transition: all 0.3s ease;
        }

        .login-box input:focus {
            outline: none;
            border-color: #666;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
        }

        .login-box button[type="submit"] {
            width: 100%;
            padding: 14px;
            background: #ffffff;
            color: #000000;
            border: none;
            font-size: 1rem;
            font-weight: 800;
            font-family: 'Outfit', sans-serif;
            letter-spacing: 0.05em;
            border-radius: 12px;
            cursor: pointer;
            text-transform: uppercase;
            transition: all 0.3s;
            margin-top: 10px;
        }

        .login-box button[type="submit"]:hover {
            background: #cccccc;
            transform: translateY(-2px);
        }

        .register-text {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        .register-text a {
            color: #ffffff;
            font-weight: 600;
            text-decoration: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            margin-left: 4px;
        }

        .auth-personnel {
            text-align: center;
            margin-top: 24px;
            font-size: 0.8rem;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .alert {
            border: none;
            border-radius: 12px;
            padding: 12px 16px;
            font-size: 0.95rem;
            margin-bottom: 24px;
        }

        .alert-danger {
            background: rgba(239, 68, 68, 0.1);
            color: #ef4444;
            border: 1px solid rgba(239, 68, 68, 0.2);
        }

        /* Right side */
        .right {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: var(--bg-dark);
            padding: 4vh 4vw;
        }

        /* Premium Guest Dashboard Styles */
        .guest-dashboard {
            width: 100%;
            max-width: clamp(320px, 90%, 550px);
            z-index: 1;
            background: rgba(18, 18, 18, 0.7);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 24px;
            padding: 2.5rem;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .guest-dashboard .header {
            margin-bottom: 1.2rem;
            text-align: center;
        }

        .guest-dashboard .header h3 {
            font-size: clamp(1.4rem, 3vh, 1.8rem);
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 0.2rem;
            font-family: 'Outfit', sans-serif;
        }

        .guest-dashboard .header p {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin: 0;
            font-family: 'Outfit', sans-serif;
        }

        .nta-levels {
            display: flex;
            justify-content: center;
            gap: 8px;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }

        .nta-badge {
            background: rgba(255, 255, 255, 0.05);
            color: #ffffff;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            border: 1px solid rgba(255, 255, 255, 0.1);
            text-decoration: none;
        }

        .section-title {
            font-size: 0.95rem;
            font-weight: 600;
            color: var(--text-main);
            margin-bottom: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-family: 'Outfit', sans-serif;
        }

        .notes-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-bottom: 1.5rem;
        }

        .note-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.05);
            padding: 10px 14px;
            border-radius: 12px;
        }

        .note-info {
            display: flex;
            align-items: center;
            gap: 12px;
            color: #ffffff;
            font-size: 0.85rem;
            font-weight: 500;
        }

        .note-icon {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            width: 28px;
            height: 28px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9rem;
        }

        .download-btn {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            border: none;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
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
            font-family: 'Outfit', sans-serif;
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
            font-family: 'Outfit', sans-serif;
        }

        .btn-register {
            background: #ffffff;
            color: #000000;
        }

        .btn-login {
            background: transparent;
            color: #ffffff;
            border: 1px solid #ffffff;
        }

        @media (max-width: 900px) {
            .login-wrapper {
                flex-direction: column;
            }
            .left, .right {
                width: 100%;
                padding: 4vh 4vw;
            }
        }
    </style>
</head>
<body>
    <div class="login-wrapper">
        <div class="left">
            <div class="branding-header">
                <div class="title">4LAZIE</div>
                <div class="motto">SMART IN BRAIN</div>
            </div>
            
            <div class="login-box">
                <h2>📝 Create Account</h2>
                <div class="subtitle-text">Join 4LAZIE to access premium notes.</div>
                
                <div th:if="${error}" class="alert alert-danger" role="alert" th:text="${error}">
                    Error message
                </div>
                
                <form th:action="@{/register}" method="post" th:object="${user}" novalidate>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" name="username" th:field="*{username}" placeholder="Choose a username" required />
                    </div>
                    
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" name="email" th:field="*{email}" placeholder="Enter your email" required />
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" th:field="*{password}" placeholder="Create a password" required />
                    </div>
                    
                    <button type="submit">REGISTER</button>
                </form>
                
                <div class="register-text">
                    Already have an account? <a th:href="@{/login}">Login</a>
                </div>
                
                <div class="auth-personnel">Students & Authorized Personnel Only</div>
            </div>
        </div>
        
        <div class="right">
            <div class="guest-dashboard">
                <div class="header">
                    <h3>4LAZIE</h3>
                    <p>Smart Learning Made Easy</p>
                </div>
                
                <div class="nta-levels">
                    <a href="#" class="nta-badge">NTA LEVEL 4</a>
                    <a href="#" class="nta-badge">NTA LEVEL 5</a>
                    <a href="#" class="nta-badge">NTA LEVEL 6</a>
                </div>

                <div class="section-title">⭐ Popular Notes</div>
                <div class="notes-list">
                    <div class="note-item">
                        <div class="note-info">
                            <div class="note-icon">☕</div>
                            Java Programming Notes
                        </div>
                        <button class="download-btn">Download</button>
                    </div>
                    <div class="note-item">
                        <div class="note-info">
                            <div class="note-icon">💾</div>
                            Database Notes
                        </div>
                        <button class="download-btn">Download</button>
                    </div>
                    <div class="note-item">
                        <div class="note-info">
                            <div class="note-icon">🌐</div>
                            Networking Notes
                        </div>
                        <button class="download-btn">Download</button>
                    </div>
                </div>

                <div class="section-title">🔒 Premium Features</div>
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
                    <div class="premium-card">
                        <div class="premium-icon">👤</div>
                        <div class="premium-text">Personal Profile</div>
                    </div>
                    <div class="premium-card">
                        <div class="premium-icon">🔖</div>
                        <div class="premium-text">Saved Notes</div>
                    </div>
                </div>

                <div class="restricted-banner">
                    <h4>Access Restricted</h4>
                    <p>Create a free account to unlock premium features and past papers.</p>
                    <div class="banner-actions">
                        <a th:href="@{/register}" class="banner-btn btn-register">Register Now</a>
                        <a href="#" class="banner-btn btn-login">Login</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>"""

with open('../src/main/resources/templates/register.html', 'w') as f:
    f.write(register_html)
