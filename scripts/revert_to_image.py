import re

light_theme_html = """<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Notes System - Login</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-left: #f4f5f7;
            --bg-right: #ffffff;
            --text-main: #111827;
            --text-muted: #6b7280;
            --border-color: #e5e7eb;
            --btn-bg: #000000;
            --btn-text: #ffffff;
            --accent: #000000;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            color: var(--text-main);
            overflow-x: hidden;
            background-color: var(--bg-right);
        }

        .login-wrapper {
            display: flex;
            min-height: 100vh;
            width: 100%;
        }

        /* Left Side */
        .left {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: var(--bg-left);
            padding: 4vh 4vw;
        }

        .branding-header {
            margin-bottom: 2rem;
            text-align: center;
        }

        .branding-header .title {
            font-size: 1.8rem;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 0.2rem;
            letter-spacing: -0.02em;
        }

        .branding-header .motto {
            font-size: 0.75rem;
            letter-spacing: 0.3em;
            color: var(--text-muted);
            text-transform: uppercase;
            font-weight: 600;
        }

        .login-box {
            width: 100%;
            max-width: 380px;
        }

        .login-box h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 8px;
            text-align: center;
            color: var(--text-main);
        }

        .login-box .subtitle-text {
            color: var(--text-muted);
            text-align: center;
            margin-bottom: 30px;
            font-size: 0.9rem;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .login-box label {
            display: block;
            font-size: 0.85rem;
            font-weight: 500;
            color: var(--text-muted);
            margin-bottom: 8px;
        }

        .login-box input[type="text"],
        .login-box input[type="password"] {
            width: 100%;
            padding: 12px 16px;
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-main);
            font-size: 0.95rem;
            transition: all 0.2s ease;
        }

        .login-box input:focus {
            outline: none;
            border-color: var(--accent);
            box-shadow: 0 0 0 3px rgba(0,0,0,0.05);
        }

        .options-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            font-size: 0.85rem;
        }

        /* Custom Toggle Switch for Remember Me */
        .form-switch .form-check-input {
            width: 2.5em;
            height: 1.25em;
            margin-top: 0;
            cursor: pointer;
            border: 1px solid #d1d5db;
        }
        .form-switch .form-check-input:checked {
            background-color: var(--accent);
            border-color: var(--accent);
        }

        .forgot-link {
            color: var(--text-main);
            text-decoration: none;
            font-weight: 600;
        }

        .login-box button[type="submit"] {
            width: 100%;
            padding: 14px;
            background: var(--btn-bg);
            color: var(--btn-text);
            border: none;
            font-size: 0.95rem;
            font-weight: 700;
            border-radius: 8px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            transition: all 0.2s;
        }

        .login-box button[type="submit"]:hover {
            background: #333333;
        }

        .register-text {
            text-align: center;
            margin-top: 24px;
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        .register-text a {
            color: var(--text-main);
            font-weight: 700;
            text-decoration: none;
        }

        /* Right side */
        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: var(--bg-right);
            padding: 4vh 4vw;
            overflow-y: auto;
        }

        .guest-dashboard {
            width: 100%;
            max-width: 500px;
        }

        .guest-dashboard .header {
            margin-bottom: 2.5rem;
            text-align: center;
        }

        .guest-dashboard .header h3 {
            font-size: 1.4rem;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 0.2rem;
        }

        .guest-dashboard .header p {
            color: var(--text-muted);
            font-size: 0.9rem;
            margin: 0;
        }

        .section-title {
            font-size: 0.85rem;
            font-weight: 700;
            color: var(--text-main);
            margin-bottom: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .nta-levels {
            display: flex;
            gap: 12px;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .nta-badge {
            background: #f3f4f6;
            color: var(--text-main);
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-decoration: none;
            border: 1px solid var(--border-color);
        }

        .notes-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 1.5rem;
        }

        .note-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            border: 1px solid var(--border-color);
            padding: 12px 16px;
            border-radius: 8px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .note-info {
            display: flex;
            align-items: center;
            gap: 16px;
            color: var(--text-main);
            font-size: 0.9rem;
            font-weight: 500;
        }

        .note-icon {
            background: #9ca3af;
            color: #ffffff;
            width: 20px;
            height: 24px;
            border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .download-btn {
            background: transparent;
            color: var(--text-muted);
            border: none;
            font-size: 0.8rem;
            font-weight: 600;
            cursor: pointer;
        }

        .view-all {
            text-align: center;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text-muted);
            margin: 1rem 0 2rem;
            cursor: pointer;
        }

        .premium-black-card {
            background: var(--btn-bg);
            color: var(--btn-text);
            border-radius: 12px;
            overflow: hidden;
            margin-bottom: 2rem;
        }

        .premium-black-card .card-header {
            text-align: center;
            padding: 1rem;
            font-weight: 700;
            font-size: 0.9rem;
            letter-spacing: 0.1em;
            border-bottom: 1px solid #333;
        }

        .premium-black-card .card-body {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 1.5rem;
            background: #ffffff;
            color: #000000;
        }

        .premium-black-card .card-body .title {
            font-weight: 700;
            font-size: 0.85rem;
            letter-spacing: 0.05em;
        }

        .black-download-btn {
            background: #000000;
            color: #ffffff;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            border: none;
        }

        @media (max-width: 900px) {
            .login-wrapper {
                flex-direction: column;
            }
            .left, .right {
                width: 100%;
                padding: 4vh 6vw;
            }
            .right {
                background: #ffffff;
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
                <h2>Student Login</h2>
                <div class="subtitle-text">Welcome back! Please enter your details.</div>
                
                <div th:if="${param.registered}" class="alert alert-success" role="alert" style="font-size: 0.85rem;">
                    Registration successful! You can now log in.
                </div>
                <div th:if="${param.error}" class="alert alert-danger" role="alert" style="font-size: 0.85rem;">
                    Invalid username or password.
                </div>
                
                <form th:action="@{/login}" method="post" novalidate>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" name="username" placeholder="student@example.com" required />
                    </div>
                    
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter password" required />
                    </div>
                    
                    <div class="options-row">
                        <div class="form-check form-switch d-flex align-items-center gap-2 m-0 p-0">
                            <input class="form-check-input m-0" type="checkbox" name="remember" id="remember" />
                            <label class="form-check-label m-0 text-muted" for="remember" style="font-size: 0.85rem; text-transform: none; letter-spacing: normal;">Remember Me</label>
                        </div>
                        <a href="#" class="forgot-link">Forgot Password?</a>
                    </div>
                    
                    <button type="submit">LOGIN</button>
                </form>
                
                <div class="register-text">
                    Don't have an account? <a th:href="@{/register}">Register</a>
                </div>
            </div>
        </div>
        
        <div class="right">
            <div class="guest-dashboard">
                <div class="header">
                    <h3>4LAZIE</h3>
                    <p>Smart Learning Made Easy</p>
                </div>
                
                <div class="section-title">ACADEMIC LEVELS</div>
                <div class="nta-levels">
                    <a href="#" class="nta-badge">NTA LEVEL 4</a>
                    <a href="#" class="nta-badge">NTA LEVEL 5</a>
                    <a href="#" class="nta-badge">NTA LEVEL 6</a>
                </div>

                <div class="section-title">⭐ POPULAR NOTES</div>
                <div class="notes-list">
                    <div class="note-item">
                        <div class="note-info">
                            <div class="note-icon"></div>
                            Networking Handout
                        </div>
                        <button class="download-btn">Download</button>
                    </div>
                    <div class="note-item">
                        <div class="note-info">
                            <div class="note-icon"></div>
                            Database Design & Implementation
                        </div>
                        <button class="download-btn">Download</button>
                    </div>
                    <div class="note-item">
                        <div class="note-info">
                            <div class="note-icon"></div>
                            Programming Assignment 1
                        </div>
                        <button class="download-btn">Download</button>
                    </div>
                </div>

                <div class="view-all">[ View All Notes ]</div>

                <div class="premium-black-card">
                    <div class="card-header">
                        JAVA PROGRAMMING
                    </div>
                    <div class="card-body">
                        <div class="title">NOTES</div>
                        <button class="black-download-btn">DOWNLOAD</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</body>
</html>"""

with open('../src/main/resources/templates/login.html', 'w') as f:
    f.write(light_theme_html)

register_html = light_theme_html.replace('Student Login', 'Create Account')\
    .replace('Welcome back! Please enter your details.', 'Join 4LAZIE to access premium notes.')\
    .replace('name="username" placeholder="student@example.com"', 'name="username" placeholder="Choose a username"')\
    .replace('<div class="options-row">', '<!-- <div class="options-row">')\
    .replace('Forgot Password?</a>\n                    </div>', 'Forgot Password?</a>\n                    </div> -->')\
    .replace('<button type="submit">LOGIN</button>', '<div class="form-group"><label>Email</label><input type="email" name="email" placeholder="student@example.com" required /></div><button type="submit">REGISTER</button>')\
    .replace('Don\'t have an account? <a th:href="@{/register}">Register</a>', 'Already have an account? <a th:href="@{/login}">Login</a>')\
    .replace('th:action="@{/login}"', 'th:action="@{/register}"')

with open('../src/main/resources/templates/register.html', 'w') as f:
    f.write(register_html)
