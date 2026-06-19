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
            padding: 4vh 4vw;
            position: relative;
            box-sizing: border-box;
            border-right: 1px solid #27272a;
            z-index: 2;
            overflow-y: auto;
            align-items: center;
        }

        /* Scrollbar styling for left side */
        .left::-webkit-scrollbar {
            width: 6px;
        }
        .left::-webkit-scrollbar-track {
            background: transparent;
        }
        .left::-webkit-scrollbar-thumb {
            background: #27272a;
            border-radius: 10px;
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
            margin-top: 2rem;
            margin-bottom: 2rem;
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

        .auth-card {
            width: 100%;
            max-width: 500px;
            background: var(--card-bg);
            border: 1px solid var(--input-border);
            padding: 2.5rem;
            border-radius: 24px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.8);
            animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            z-index: 1;
            margin-bottom: 2rem;
        }

        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .auth-card h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 8px;
            text-align: center;
            color: var(--text-main);
        }

        .auth-card .subtitle-text {
            color: var(--text-muted);
            text-align: center;
            margin-bottom: 30px;
            font-size: 0.9rem;
        }

        .auth-card label {
            display: block;
            font-size: 0.8rem;
            font-weight: 600;
            color: var(--text-muted);
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .form-control-custom {
            width: 100%;
            padding: 12px 14px;
            background: var(--input-bg) !important;
            border: 1px solid var(--input-border);
            border-radius: 12px;
            color: var(--text-main) !important;
            font-size: 0.95rem;
            transition: all 0.3s ease;
        }

        .form-control-custom:focus {
            outline: none;
            border-color: #666;
            background: rgba(255, 255, 255, 0.08) !important;
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
        }

        .form-control-custom::placeholder {
            color: #52525b;
        }

        .form-select.form-control-custom {
            background-color: var(--input-bg);
            color: var(--text-main);
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23ffffff' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
        }

        .btn-gradient {
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
            margin-top: 10px;
        }

        .btn-gradient:hover {
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

        @media (max-width: 991px) {
            body {
                flex-direction: column;
                overflow-y: auto;
            }
            .left {
                border-right: none;
                border-bottom: 1px solid #27272a;
                padding: 6vh 4vw;
                width: 100%;
            }
            .right {
                padding: 6vh 4vw;
                min-height: 40vh;
                width: 100%;
            }
        }
    </style>
</head>
<body>

    <!-- Left Side: Registration Form -->
    <div class="left">
        <div class="branding-header">
            <h1 class="title brand-font">
                <i class="bi bi-mortarboard-fill"></i> 4LAZIE
            </h1>
            <div class="motto brand-font">Smart In Brain</div>
        </div>

        <div class="auth-card">
            <h2 class="brand-font">Create Account</h2>
            <div class="subtitle-text">Join the ultimate student notes platform</div>

            <!-- Error Alert -->
            <div th:if="${error}" class="alert alert-danger d-flex align-items-center mb-4" role="alert" style="background-color: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #f87171; border-radius: 10px;">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                <div th:text="${error}">Error message</div>
            </div>

            <form action="/register" method="post" th:object="${user}" enctype="multipart/form-data" class="row g-3">
                <div class="col-md-12 mb-2">
                    <label for="name">Username</label>
                    <input type="text" th:field="*{name}" id="name" class="form-control-custom" placeholder="John Doe" required>
                </div>

                <div class="col-md-12 mb-2">
                    <label for="email">Email Address</label>
                    <input type="email" th:field="*{email}" id="email" class="form-control-custom" placeholder="student@school.edu" required>
                </div>

                <div class="col-md-6 mb-2">
                    <label for="password">Password</label>
                    <input type="password" th:field="*{password}" id="password" class="form-control-custom" placeholder="••••••••" required>
                </div>

                <div class="col-md-6 mb-2">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" name="confirmPassword" id="confirmPassword" class="form-control-custom" placeholder="••••••••" required>
                </div>

                <div class="col-md-12 mb-2">
                    <label for="courseProgram">Course</label>
                    <input type="text" th:field="*{courseProgram}" id="courseProgram" class="form-control-custom" placeholder="e.g. Computer Science" required>
                </div>

                <div class="col-md-4 mb-2">
                    <label for="year">Year</label>
                    <input type="number" th:field="*{year}" id="year" class="form-control-custom" min="1" max="10" required>
                </div>

                <div class="col-md-4 mb-2">
                    <label for="semester">Semester</label>
                    <select th:field="*{semester}" id="semester" class="form-select form-control-custom" required>
                        <option value="" disabled selected>Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>

                <div class="col-md-4 mb-2">
                    <label for="level">NTA LEVEL</label>
                    <select th:field="*{level}" id="level" class="form-select form-control-custom" required>
                        <option value="" disabled selected>Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>

                <div class="col-md-12 mb-2">
                    <label for="profilePic">Profile Picture (optional)</label>
                    <input type="file" name="profilePic" id="profilePic" class="form-control-custom" style="padding-top: 10px; padding-bottom: 10px;" accept="image/*">
                </div>

                <div class="col-12 mt-4">
                    <button type="submit" class="btn-gradient brand-font">Create Account</button>
                </div>

                <div class="col-12 my-3 d-flex align-items-center">
                    <hr class="flex-grow-1" style="border-top: 1px solid var(--border-color);">
                    <span class="mx-3 text-secondary small fw-bold tracking-wider">OR</span>
                    <hr class="flex-grow-1" style="border-top: 1px solid var(--border-color);">
                </div>

                <div class="col-12 text-center d-flex justify-content-center">
                    <!-- Google Sign-In Button -->
                    <script src="https://accounts.google.com/gsi/client" async defer></script>
                    <div id="g_id_onload"
                         data-client_id="PLACEHOLDER_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
                         data-context="signup"
                         data-ux_mode="popup"
                         data-login_uri="http://localhost:8082/register/google"
                         data-auto_prompt="false">
                    </div>
                    <div class="g_id_signin"
                         data-type="standard"
                         data-shape="rectangular"
                         data-theme="outline"
                         data-text="signup_with"
                         data-size="large"
                         data-logo_alignment="left"
                         data-width="300">
                    </div>
                </div>
            </form>

            <div class="register-link">
                Already have an account? <a href="/login">Sign In</a>
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

with open('../src/main/resources/templates/register.html', 'w') as f:
    f.write(register_html)
