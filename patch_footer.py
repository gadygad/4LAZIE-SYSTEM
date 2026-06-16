import re

with open('/home/careen/4LAZIE/src/main/resources/templates/index.html', 'r') as f:
    index_content = f.read()

with open('/home/careen/4LAZIE/src/main/resources/templates/home.html', 'r') as f:
    home_content = f.read()

footer_pattern = re.compile(r'(<!-- FOOTER -->\s*<footer class="footer-custom.*?</footer>)', re.DOTALL)
index_footer = footer_pattern.search(index_content)

if index_footer:
    home_footer_pattern = re.compile(r'(<!-- FOOTER -->\s*<footer class="footer-custom.*?</footer>)', re.DOTALL)
    new_home = home_footer_pattern.sub(index_footer.group(1), home_content)
    
    with open('/home/careen/4LAZIE/src/main/resources/templates/home.html', 'w') as f:
        f.write(new_home)
    print("Footer replaced successfully")
else:
    print("Footer not found in index.html")
