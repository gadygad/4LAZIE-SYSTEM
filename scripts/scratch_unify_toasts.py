import glob
import re

files = glob.glob('src/main/resources/templates/**/*.html', recursive=True)

# The beautiful green glassmorphism style requested
green_glass_style = "background: rgba(16, 185, 129, 0.85); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3); color: white; border-radius: 50px; padding: 12px 24px;"

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    original_content = content
    
    # 1. Update admin_users.html and admin_notes.html red error styles to green
    content = content.replace("border: 1px solid rgba(220, 38, 38, 0.25); box-shadow: 0 8px 32px rgba(220, 38, 38, 0.15); color: #991b1b;", "border: 1px solid rgba(16, 185, 129, 0.25); box-shadow: 0 8px 32px rgba(16, 185, 129, 0.18); color: #065f46;")
    
    # 2. Update upload.html red error toast to green
    content = content.replace("border-color: rgba(220, 38, 38, 0.3); box-shadow: 0 10px 40px rgba(220, 38, 38, 0.15); color: #7f1d1d;", "border-color: rgba(16, 185, 129, 0.3); box-shadow: 0 10px 40px rgba(16, 185, 129, 0.15); color: #065f46;")
    
    # 3. Update register.html, forgot_password.html, reset_password.html alerts to green glass
    red_alert_style = "background: rgba(225, 29, 72, 0.15); border: 1px solid rgba(225, 29, 72, 0.3); color: #9f1239; font-size: 0.85rem; backdrop-filter: blur(5px);"
    green_alert_style = "background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #065f46; font-size: 0.85rem; backdrop-filter: blur(5px); transition: all 0.3s ease;"
    content = content.replace(red_alert_style, green_alert_style)
    
    # 4. Make sure login.html errors are green (they already are bg-green in custom-toast)
    
    if content != original_content:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Unified to green glassmorphism in {file}")

