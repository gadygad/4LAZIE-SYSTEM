import re

login_html = """<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Notes System - Login</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Outfit:wght@400;600;700;800&display=swap" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet">
    <style>
        :root {
            --primary: #ffffff;
            --primary-hover: #cccccc;
            --bg-dark: #050505;
            --card-bg: #121212;
            --text-main: #ffffff;
            --text-muted: #a1a1aa;
            --input-bg: rgba(255, 255, 255, 0.05);
            --input-border: #27272a;
        }

        body {
            height: 100vh;
            width: 100vw;
            margin: 0;
            padding: 0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            overflow: hidden;
            display: flex;
        }

        .brand-font {
            font-family: 'Outfit', sans-serif;
        }

        .left {
            flex: 1;
            background: linear-gradient(135deg, #0a0a0a 0%, #121212 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 4vh 4vw;
            position: relative;
            box-sizing: border-box;
            border-right: 1px solid #27272a;
            z-index: 2;
        }

        .left::before {
            content: '';
            position: absolute;
            width: 150vw;
            height: 150vw;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.02) 0%, transparent 40%),
                        radial-gradient(circle, rgba(255, 255, 255, 0.01) 0%, transparent 40%);
            background-position: 0 0, 50% 50%;
            top: -20%;
            left: -20%;
            z-index: 0;
            pointer-events: none;
        }

        .branding-header {
            z-index: 1;
            margin-bottom: 2.5rem;
            text-align: center;
        }

        .branding-header .title {
            font-size: clamp(2rem, 5vh, 2.8rem);
            font-weight: 800;
            letter-spacing: -0.02em;
            margin: 0;
            background: linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
        }

        .branding-header .title i {
            -webkit-text-fill-color: #ffffff;
            font-size: clamp(1.8rem, 4vh, 2.5rem);
        }

        .branding-header .motto {
            font-size: 0.85rem;
            letter-spacing: 0.3em;
            color: var(--text-muted);
            margin-top: 0.5rem;
            text-transform: uppercase;
            font-weight: 600;
        }

        .login-box {
            width: 100%;
            max-width: clamp(320px, 90%, 400px);
            background: var(--card-bg);
            border: 1px solid var(--input-border);
            padding: 3rem;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.8);
            animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
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
            font-weight: 600;
            color: var(--text-muted);
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .login-box input[type="text"],
        .login-box input[type="password"] {
            width: 100%;
            padding: 14px 16px;
            background: var(--input-bg);
            border: 1px solid var(--input-border);
            border-radius: 12px;
            color: var(--text-main);
            font-size: 0.95rem;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        .login-box input:focus {
            outline: none;
            border-color: #666;
            background: rgba(255, 255, 255, 0.08);
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
        }

        .login-box input::placeholder {
            color: #52525b;
        }

        .options-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            font-size: 0.85rem;
        }

        .form-check-input {
            background-color: var(--input-bg);
            border-color: var(--input-border);
            cursor: pointer;
            width: 1.2em;
            height: 1.2em;
        }

        .form-check-input:checked {
            background-color: var(--primary);
            border-color: var(--primary);
        }

        .form-check-label {
            color: var(--text-muted);
            cursor: pointer;
            font-weight: 500;
        }

        .login-box button[type="submit"] {
            width: 100%;
            padding: 14px;
            background: #ffffff;
            color: #000000;
            border: none;
            font-size: 1rem;
            font-weight: 800;
            letter-spacing: 0.05em;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            text-transform: uppercase;
        }

        .login-box button[type="submit"]:hover {
            background: #cccccc;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(255, 255, 255, 0.15);
        }

        .register-link {
            text-align: center;
            margin-top: 24px;
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        .register-link a {
            color: #ffffff;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.2s;
            margin-left: 4px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }

        .register-link a:hover {
            color: #cccccc;
            border-bottom-color: #ffffff;
        }

        .alert-error {
            background-color: rgba(220, 38, 38, 0.1);
            border: 1px solid rgba(220, 38, 38, 0.3);
            color: #f87171;
            padding: 12px;
            border-radius: 10px;
            font-size: 0.85rem;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .alert-success {
            background-color: rgba(34, 197, 94, 0.1);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #4ade80;
            padding: 12px;
            border-radius: 10px;
            font-size: 0.85rem;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* Right Side: Premium Abstract Visual */
        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: var(--bg-dark);
            position: relative;
            overflow: hidden;
            padding: 4vh 4vw;
            box-sizing: border-box;
        }

        /* Glowing Orbs */
        .right::before {
            content: '';
            position: absolute;
            width: 800px;
            height: 800px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
            border-radius: 50%;
            top: -200px;
            right: -200px;
            filter: blur(60px);
            z-index: 0;
            animation: pulse 8s ease-in-out infinite alternate;
        }

        .right::after {
            content: '';
            position: absolute;
            width: 600px;
            height: 600px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 60%);
            border-radius: 50%;
            bottom: -150px;
            left: -150px;
            filter: blur(40px);
            z-index: 0;
            animation: pulse 12s ease-in-out infinite alternate-reverse;
        }

        @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.8; }
            100% { transform: scale(1.05); opacity: 1; }
        }

        .showcase-content {
            z-index: 1;
            text-align: center;
            max-width: 80%;
            animation: fadeIn 1s ease-out 0.3s both;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        .showcase-content .hero-title {
            font-size: clamp(2.5rem, 6vh, 4rem);
            font-weight: 800;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            color: #ffffff;
            letter-spacing: -0.02em;
        }

        .showcase-content .hero-subtitle {
            font-size: clamp(1rem, 2.5vh, 1.2rem);
            color: var(--text-muted);
            line-height: 1.6;
            max-width: 500px;
            margin: 0 auto;
            font-weight: 400;
        }

        /* Mobile Adjustments */
        @media (max-width: 991px) {
            body {
                flex-direction: column;
                overflow-y: auto;
            }
            .left {
                border-right: none;
                border-bottom: 1px solid #27272a;
                padding: 6vh 4vw;
            }
            .right {
                padding: 6vh 4vw;
                min-height: 40vh;
            }
        }
    </style>
</head>
<body>

    <!-- Left Side: Login Form -->
    <div class="left">
        <div class="branding-header">
            <h1 class="title brand-font">
                <i class="bi bi-mortarboard-fill"></i> 4LAZIE
            </h1>
            <div class="motto brand-font">Smart In Brain</div>
        </div>

        <div class="login-box">
            <h2 class="brand-font">Welcome back</h2>
            <div class="subtitle-text">Please enter your credentials to access your account</div>

            <div th:if="${param.error}" class="alert-error">
                <i class="bi bi-exclamation-circle-fill"></i>
                Invalid username or password.
            </div>

            <div th:if="${param.logout}" class="alert-success">
                <i class="bi bi-check-circle-fill"></i>
                You have been logged out successfully.
            </div>

            <form th:action="@{/login}" method="post">
                <div class="form-group">
                    <label for="username">Username / Email</label>
                    <input type="text" id="username" name="username" placeholder="Enter your email" required autofocus>
                </div>
                
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" required>
                </div>

                <div class="options-row">
                    <div class="form-check d-flex align-items-center gap-2 m-0 p-0">
                        <input type="checkbox" class="form-check-input m-0" id="remember-me" name="remember-me">
                        <label class="form-check-label m-0 text-lowercase" style="text-transform: none; letter-spacing: normal;" for="remember-me">Remember Me</label>
                    </div>
                </div>

                <button type="submit" class="brand-font">Login</button>
            </form>

            <div class="register-link">
                Don't have an account? <a href="/register">Register here</a>
            </div>
        </div>
    </div>

    <!-- Right Side: Premium Abstract Visual Showcase -->
    <div class="right d-none d-lg-flex">
        <div class="showcase-content">
            <h1 class="hero-title brand-font">Smart Learning<br>Made Easy.</h1>
            <p class="hero-subtitle">
                Access your premium dashboard, organize your academic life, and dive into state-of-the-art notes management designed exclusively for students.
            </p>
        </div>
    </div>

    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>"""

with open('src/main/resources/templates/login.html', 'w') as f:
    f.write(login_html)
