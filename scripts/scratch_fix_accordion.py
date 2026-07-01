import re

with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# Replace hardcoded colors with CSS variables with fallbacks
content = content.replace('style="color: #d97706; display:flex; align-items:center; justify-content:center; flex-shrink:0;"', 'style="color: var(--acc-icon-color, #d97706); display:flex; align-items:center; justify-content:center; flex-shrink:0;"')
content = content.replace('style="font-size: 0.65rem; color: #d97706; font-weight: 600;"', 'style="font-size: 0.65rem; color: var(--acc-text-light, #d97706); font-weight: 600;"')
content = content.replace('style="border-left: 2px solid rgba(245,158,11,0.2);', 'style="border-left: 2px solid var(--acc-border, rgba(245,158,11,0.2));')
content = content.replace('border-bottom: 1px solid rgba(245,158,11,0.05);"', 'border-bottom: 1px solid var(--acc-border-light, rgba(245,158,11,0.05));"')
content = content.replace("onmouseover=\"this.style.backgroundColor='rgba(245,158,11,0.03)';", "onmouseover=\"this.style.backgroundColor='var(--acc-bg-hover, rgba(245,158,11,0.03))';")
content = content.replace('style="width: 32px; height: 32px; border-radius: 8px; background: rgba(245,158,11,0.1); color: #d97706;"', 'style="width: 32px; height: 32px; border-radius: 8px; background: var(--acc-icon-bg, rgba(245,158,11,0.1)); color: var(--acc-icon-color, #d97706);"')
content = content.replace('style="color: #b45309; font-size: 0.9rem; letter-spacing: 0.3px; font-family: \'Outfit\', sans-serif;"', 'style="color: var(--acc-text-bold, #b45309); font-size: 0.9rem; letter-spacing: 0.3px; font-family: \'Outfit\', sans-serif;"')
content = content.replace('style="font-size: 0.65rem; color: #d97706; font-weight: 600; opacity: 0.8;"', 'style="font-size: 0.65rem; color: var(--acc-text-light, #d97706); font-weight: 600; opacity: 0.8;"')

content = content.replace('style="background: rgba(245, 158, 11, 0.15); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #b45309; border: 1px solid rgba(245, 158, 11, 0.3);', 'style="background: var(--acc-btn-read-bg, rgba(245, 158, 11, 0.15)); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: var(--acc-text-bold, #b45309); border: 1px solid var(--acc-btn-read-border, rgba(245, 158, 11, 0.3));')
content = content.replace("this.style.background='rgba(245, 158, 11, 0.25)'", "this.style.background='var(--acc-btn-read-bg-hover, rgba(245, 158, 11, 0.25))'")
content = content.replace("this.style.boxShadow='0 6px 12px rgba(245, 158, 11, 0.15)'", "this.style.boxShadow='var(--acc-btn-read-shadow-hover, 0 6px 12px rgba(245, 158, 11, 0.15))'")
content = content.replace("this.style.background='rgba(245, 158, 11, 0.15)'", "this.style.background='var(--acc-btn-read-bg, rgba(245, 158, 11, 0.15))'")

content = content.replace('style="background: rgba(217, 119, 6, 0.85); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #ffffff; border: 1px solid rgba(217, 119, 6, 0.4);', 'style="background: var(--acc-btn-down-bg, rgba(217, 119, 6, 0.85)); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); color: #ffffff; border: 1px solid var(--acc-btn-down-border, rgba(217, 119, 6, 0.4));')
content = content.replace("this.style.background='rgba(217, 119, 6, 1)'", "this.style.background='var(--acc-btn-down-bg-hover, rgba(217, 119, 6, 1))'")
content = content.replace("this.style.boxShadow='0 6px 15px rgba(217, 119, 6, 0.3)'", "this.style.boxShadow='var(--acc-btn-down-shadow-hover, 0 6px 15px rgba(217, 119, 6, 0.3))'")
content = content.replace("this.style.background='rgba(217, 119, 6, 0.85)'", "this.style.background='var(--acc-btn-down-bg, rgba(217, 119, 6, 0.85))'")

with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)

with open('src/main/resources/templates/guest_notes.html', 'r') as f:
    guest_notes = f.read()

new_css = """
        /* Green variables for Accordion Inner Elements */
        :root {
            --premium-hover: #10b981;
            --premium-border: #10b981;
            --premium-bg-light: rgba(16, 185, 129, 0.08);
            --premium-border-light: rgba(16, 185, 129, 0.2);
            --premium-text-dark: #10b981;

            --acc-icon-color: #10b981;
            --acc-text-light: #10b981;
            --acc-text-bold: #059669;
            --acc-border: rgba(16, 185, 129, 0.3);
            --acc-border-light: rgba(16, 185, 129, 0.1);
            --acc-bg-hover: rgba(16, 185, 129, 0.05);
            --acc-icon-bg: rgba(16, 185, 129, 0.15);
            
            --acc-btn-read-bg: rgba(16, 185, 129, 0.15);
            --acc-btn-read-border: rgba(16, 185, 129, 0.3);
            --acc-btn-read-bg-hover: rgba(16, 185, 129, 0.25);
            --acc-btn-read-shadow-hover: 0 6px 12px rgba(16, 185, 129, 0.2);
            
            --acc-btn-down-bg: rgba(5, 150, 105, 0.85);
            --acc-btn-down-border: rgba(5, 150, 105, 0.4);
            --acc-btn-down-bg-hover: rgba(5, 150, 105, 1);
            --acc-btn-down-shadow-hover: 0 6px 15px rgba(5, 150, 105, 0.35);
        }
"""

guest_notes = re.sub(r':root \{.*?(?=\s*\.premium-filter-border)', new_css, guest_notes, flags=re.DOTALL)

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(guest_notes)
