import re

with open('src/main/resources/templates/fragments/navbar_actions.html', 'r') as f:
    content = f.read()

css_block = """
                <style>
                    /* Theme Variables for Notifications */
                    :root {
                        --noti-color: #e67e22;
                        --noti-color-dark: #d35400;
                        --noti-bg-light: rgba(230, 126, 34, 0.04);
                        --noti-bg-medium: rgba(230, 126, 34, 0.15);
                        --noti-bg-dark: rgba(211, 84, 0, 0.25);
                        --noti-shadow: rgba(230, 126, 34, 0.3);
                        --noti-border: rgba(230, 126, 34, 0.4);
                    }
                </style>
                <style th:if="${session.user != null}">
                    /* Green Theme for Logged-In Users */
                    :root {
                        --noti-color: #10b981;
                        --noti-color-dark: #059669;
                        --noti-bg-light: rgba(16, 185, 129, 0.04);
                        --noti-bg-medium: rgba(16, 185, 129, 0.15);
                        --noti-bg-dark: rgba(5, 150, 105, 0.25);
                        --noti-shadow: rgba(16, 185, 129, 0.3);
                        --noti-border: rgba(16, 185, 129, 0.4);
                    }
                </style>
"""

# Insert CSS variables block before the existing popupAnim style
content = content.replace('<style>\n                    @keyframes popupAnim', css_block + '                <style>\n                    @keyframes popupAnim')

# Now replace hardcoded colors with CSS variables
# Bell Hover
content = content.replace("this.style.boxShadow='0 8px 25px rgba(230, 126, 34, 0.3)", "this.style.boxShadow='0 8px 25px var(--noti-shadow)")
content = content.replace("this.style.borderColor='rgba(230, 126, 34, 0.4)'", "this.style.borderColor='var(--noti-border)'")
content = content.replace("this.querySelector('i').style.color='#e67e22'", "this.querySelector('i').style.color='var(--noti-color)'")

# Notification Badge
content = content.replace('style="background-color: #e67e22;', 'style="background-color: var(--noti-color);')

# Dropdown Header Badge
content = content.replace('style="background: linear-gradient(135deg, #e67e22, #d35400);', 'style="background: linear-gradient(135deg, var(--noti-color), var(--noti-color-dark));')
content = content.replace('box-shadow: 0 2px 8px rgba(230,126,34,0.3);', 'box-shadow: 0 2px 8px var(--noti-shadow);')

# Notification Item Background
content = content.replace("'rgba(230, 126, 34, 0.04)'", "'var(--noti-bg-light)'")

# Notification Icon Background
content = content.replace('background: linear-gradient(135deg, rgba(230,126,34,0.15), rgba(211,84,0,0.25));', 'background: linear-gradient(135deg, var(--noti-bg-medium), var(--noti-bg-dark));')
content = content.replace('box-shadow: 0 2px 10px rgba(230,126,34,0.1);', 'box-shadow: 0 2px 10px var(--noti-shadow);')
content = content.replace('color: #e67e22;', 'color: var(--noti-color);')

# User profile active state
content = content.replace('color: #e67e22;"', 'color: var(--noti-color);"')
content = content.replace("this.style.backgroundColor='rgba(230, 126, 34, 0.08)'", "this.style.backgroundColor='var(--noti-bg-light)'")

with open('src/main/resources/templates/fragments/navbar_actions.html', 'w') as f:
    f.write(content)
