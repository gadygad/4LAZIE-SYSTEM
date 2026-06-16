import re

with open('/home/careen/4LAZIE/src/main/resources/templates/index.html', 'r') as f:
    content = f.read()

# Extract Left Text
left_text_pattern = re.compile(r'(<!-- Left Text -->\s*<div class="col-lg-7 hero-text mb-5 mb-lg-0 pe-lg-5">.*?)<!-- Right Login Form -->', re.DOTALL)
match_left = left_text_pattern.search(content)
left_text = match_left.group(1)

# Extract Right Login Form
right_login_pattern = re.compile(r'(<!-- Right Login Form -->\s*<div class="col-lg-5">.*?)</div>\s*</div>\s*</div>\s*</section>', re.DOTALL)
match_right = right_login_pattern.search(content)
right_login = match_right.group(1)

# Replace the whole section
new_content = content[:match_left.start()] + right_login + "</div>\n" + left_text + content[match_right.end()-38:]

with open('/home/careen/4LAZIE/src/main/resources/templates/index.html', 'w') as f:
    f.write(new_content)
