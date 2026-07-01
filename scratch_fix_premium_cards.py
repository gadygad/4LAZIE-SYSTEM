import re

with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# We need to extract the existing style block for premium features
match = re.search(r'<!-- Features List CSS -->\s*<style>(.*?)</style>', content, re.DOTALL)
if match:
    css_content = match.group(1)
    
    # Create Gold version
    gold_css = css_content.replace('rgba(16, 185, 129', 'rgba(245, 158, 11')
    gold_css = gold_css.replace('#34d399', '#fbbf24').replace('#10b981', '#f59e0b').replace('#059669', '#d97706')
    
    # Create Green version (the original css_content)
    green_css = css_content

    replacement = f"""<!-- Features List CSS -->
    <style th:if="${{session.user == null}}">{gold_css}</style>
    <style th:if="${{session.user != null}}">{green_css}</style>"""
    
    content = content.replace(match.group(0), replacement)

    with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
        f.write(content)
