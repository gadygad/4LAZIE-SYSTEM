import re

# Update login.html
with open('../src/main/resources/templates/login.html', 'r') as f:
    login_content = f.read()

new_login_css = """        :root {
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
            /* Removed grayscale for true premium black/white rendering */
        }

        .left {
            flex: 1;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 4vh 4vw;
            position: relative;
            box-sizing: border-box;
            border-right: 1px solid #27272a;
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

        .branding-header .title {
            font-size: clamp(1.5rem, 4vh, 2rem);
            font-weight: 800;
            letter-spacing: -0.05em;
            margin: 0;
            color: #ffffff;
        }

        .right {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #050505;
            position: relative;
            padding: 4vh 4vw;
            box-sizing: border-box;
        }

        .login-box {
            width: 100%;
            max-width: clamp(280px, 90%, 360px);
            background: var(--card-bg);
            border: 1px solid var(--input-border);
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            margin-top: 1rem;
        }

        .login-box h2 {
            font-size: clamp(1.2rem, 3vh, 1.5rem);
            font-weight: 700;
            margin-bottom: 4px;
            text-align: center;
            color: var(--text-main);
        }

        .login-box input[type="email"],
        .login-box input[type="password"] {
            width: 100%;
            padding: 12px 14px;
            background: var(--input-bg);
            border: 1px solid var(--input-border);
            border-radius: 10px;
            color: var(--text-main);
            font-size: 0.9rem;
            transition: all 0.3s ease;
            box-sizing: border-box;
        }

        .login-box input:focus {
            outline: none;
            border-color: #666;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
        }

        .login-box button[type="submit"] {
            width: 100%;
            padding: 12px;
            background: var(--primary);
            color: #000;
            border: none;
            font-size: 0.95rem;
            font-weight: 700;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
        }

        .login-box button[type="submit"]:hover {
            background: var(--primary-hover);
            transform: translateY(-2px);
        }"""

# Use regex to replace the root variables and some classes
login_content = re.sub(r':root\s*\{.*?\}', ':root {\n            --primary: #ffffff;\n            --primary-hover: #cccccc;\n            --bg-dark: #050505;\n            --card-bg: #121212;\n            --text-main: #ffffff;\n            --text-muted: #a1a1aa;\n            --input-bg: rgba(255, 255, 255, 0.05);\n            --input-border: #27272a;\n        }', login_content, flags=re.DOTALL)
login_content = re.sub(r'filter:\s*grayscale\(100%\);', '', login_content)
login_content = re.sub(r'background:\s*linear-gradient\(135deg,\s*#f8fafc\s*0%,\s*#e2e8f0\s*100%\);', 'background: linear-gradient(135deg, #0a0a0a 0%, #121212 100%); border-right: 1px solid #27272a;', login_content)
login_content = re.sub(r'background:\s*rgba\(79,\s*70,\s*229,\s*0\.15\);', 'background: rgba(255, 255, 255, 0.03);', login_content)
login_content = re.sub(r'background:\s*rgba\(14,\s*165,\s*233,\s*0\.15\);', 'background: rgba(255, 255, 255, 0.02);', login_content)
login_content = re.sub(r'background:\s*transparent;\s*border:\s*none;\s*padding:\s*0;\s*/\*\s*Zero\s*space\s*\*/\s*box-shadow:\s*none;', 'background: #121212; border: 1px solid #27272a; padding: 2.5rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-radius: 20px;', login_content)
login_content = re.sub(r'color:\s*white;', 'color: #000;', login_content) # button text
login_content = re.sub(r'text-primary', 'text-light', login_content)
login_content = re.sub(r'bg-white', 'bg-dark text-white', login_content)
login_content = re.sub(r'#ffffff', '#121212', login_content)

with open('../src/main/resources/templates/login.html', 'w') as f:
    f.write(login_content)

# Update register.html
with open('../src/main/resources/templates/register.html', 'r') as f:
    register_content = f.read()

register_content = re.sub(r':root\s*\{.*?\}', ':root {\n            --bg-color: #050505;\n            --card-bg: #121212;\n            --text-primary: #ffffff;\n            --text-secondary: #a1a1aa;\n            --border-color: #27272a;\n            --accent-gradient: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);\n        }', register_content, flags=re.DOTALL)
register_content = re.sub(r'\[data-theme="light"\]\s*\{.*?\}', '', register_content, flags=re.DOTALL)
register_content = re.sub(r'filter:\s*grayscale\(100%\);', '', register_content)
register_content = re.sub(r'color:\s*white;', 'color: #000;', register_content)

with open('../src/main/resources/templates/register.html', 'w') as f:
    f.write(register_content)
