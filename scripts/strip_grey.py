import glob

files = glob.glob('../src/main/resources/templates/*.html')

for file in files:
    with open(file, 'r') as f:
        content = f.read()
        
    changed = False
    
    # 1. Search bar background
    old_search_bg = 'background: rgba(30,41,59,0.5);'
    new_search_bg = 'background: #ffffff;'
    if old_search_bg in content:
        content = content.replace(old_search_bg, new_search_bg)
        changed = True
        
    old_search_focus = 'background-color: rgba(30,41,59,0.5);'
    new_search_focus = 'background-color: #ffffff;'
    if old_search_focus in content:
        content = content.replace(old_search_focus, new_search_focus)
        changed = True
        
    # 2. Premium card background
    old_premium_card = 'background: linear-gradient(145deg, rgba(30,41,59,0.7), rgba(15,23,42,0.8));'
    new_premium_card = 'background: linear-gradient(145deg, #f8fafc, #ffffff);'
    if old_premium_card in content:
        content = content.replace(old_premium_card, new_premium_card)
        changed = True
        
    # 3. Premium card text (needs to be dark if background is light)
    if 'text-white' in content and 'Unlock All Materials' in content:
        content = content.replace('<h4 class="text-white fw-bold mb-3">', '<h4 class="text-dark fw-bold mb-3">')
        content = content.replace('<p class="text-white-50 mb-4" style="font-size: 0.9rem;">', '<p class="text-secondary mb-4" style="font-size: 0.9rem;">')
        changed = True
        
    if changed:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed grey in {file}")

