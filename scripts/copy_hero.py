import re

with open('/home/careen/4LAZIE/src/main/resources/templates/index.html', 'r') as f:
    index_content = f.read()

with open('/home/careen/4LAZIE/src/main/resources/templates/home.html', 'r') as f:
    home_content = f.read()

hero_pattern = re.compile(r'(<div class="row w-100 align-items-start">.*?</div>\s*</div>\s*</div>\s*</section>)', re.DOTALL)
index_hero = hero_pattern.search(index_content)

if index_hero:
    # In home.html, find the hero section to replace
    home_hero_pattern = re.compile(r'(<div class="row w-100 align-items-start">.*?</section>)', re.DOTALL)
    new_home = home_hero_pattern.sub(index_hero.group(1), home_content)
    
    with open('/home/careen/4LAZIE/src/main/resources/templates/home.html', 'w') as f:
        f.write(new_home)
    print("Hero section copied successfully")
else:
    print("Hero section not found in index.html")
