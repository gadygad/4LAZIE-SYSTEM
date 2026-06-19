import re

with open('/home/careen/4LAZIE/src/main/resources/templates/home.html', 'r') as f:
    content = f.read()

# First fix the two extra closing divs at the end of the Hero Section
# Lines 401 and 402 are extra. We'll replace the block.
content = re.sub(r'</div>\s*</div>\s*</div>\s*</div>\s*</section>', r'</div>\n        </div>\n    </section>', content)

# Extract Left Text
left_text_pattern = re.compile(r'(<!-- Left Text -->\s*<div class="col-lg-7 hero-text mb-5 mb-lg-0 pe-lg-5">.*?)<!-- Right Login Form -->', re.DOTALL)
match_left = left_text_pattern.search(content)
if match_left:
    left_text = match_left.group(1)

    # Extract Right Login Form (now it only has 2 closing divs because we fixed it)
    right_login_pattern = re.compile(r'(<!-- Right Login Form -->\s*<div class="col-lg-5">.*?)</div>\s*</div>\s*</section>', re.DOTALL)
    match_right = right_login_pattern.search(content)

    if match_right:
        right_login = match_right.group(1)
        
        # Replace the whole section
        new_content = content[:match_left.start()] + right_login + "</div>\n" + left_text + content[match_right.end()-28:]
        
        with open('/home/careen/4LAZIE/src/main/resources/templates/home.html', 'w') as f:
            f.write(new_content)
        print("Swap successful")
    else:
        print("Right login not found")
else:
    print("Left text not found")

