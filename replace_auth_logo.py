import sys

def replace_logo(filepath, old_text, new_text):
    with open(filepath, 'r') as f:
        content = f.read()
    
    if old_text in content:
        content = content.replace(old_text, new_text)
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Updated {filepath}")
    else:
        print(f"Text not found in {filepath}")

old_text = '<span class="fw-bold" style="font-size: 2.2rem; letter-spacing: -1.8px; color: #0f172a; font-weight: 900 !important;">4LAZIE</span>'
new_text = '<div style="background-color: #111111; border: 3px solid #10b981; padding: 6px 16px; margin: 0 auto; display: inline-flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2); border-radius: 8px;">\n                        <span style="color: #ffffff; font-family: \'Outfit\', sans-serif; font-weight: 900; font-size: 1.8rem; letter-spacing: 2px; line-height: 1; text-transform: uppercase;">4LAZIE</span>\n                    </div>'

replace_logo('src/main/resources/templates/auth/login.html', old_text, new_text)
replace_logo('src/main/resources/templates/auth/register.html', old_text, new_text)
