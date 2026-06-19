import os
import glob
import re

files_to_check = glob.glob('../src/main/resources/templates/*.html')

dark_mode_pattern = re.compile(r'\s*/\* FORCE DARK MODE PREMIUM OVERRIDES \*/.*?(?=</style>)', re.DOTALL)
# Alternatively, I can just replace everything between FORCE DARK MODE and </style> or the end of the style block.
# Wait, let's just do a string split since the dark mode block is usually at the end of the <style> block.

for filepath in files_to_check:
    with open(filepath, 'r') as f:
        content = f.read()

    changed = False

    # 1. Remove the Dark Mode CSS block
    if '/* FORCE DARK MODE PREMIUM OVERRIDES */' in content:
        parts = content.split('/* FORCE DARK MODE PREMIUM OVERRIDES */')
        
        # The CSS block usually ends right before </style>
        # Let's find the first occurrence of </style> after the split
        if '</style>' in parts[1]:
            end_idx = parts[1].find('</style>')
            new_content = parts[0] + '\n    ' + parts[1][end_idx:]
            content = new_content
            changed = True
            
    # 2. Fix the Premium Headers inline styles (I added dark backgrounds to them recently)
    # The new premium header in notes/guest_notes has:
    # `background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.05);`
    # Let's replace it with a light background:
    old_header_bg = 'background: rgba(30, 41, 59, 0.4); border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);'
    new_header_bg = 'background: #ffffff; border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 15px rgba(0,0,0,0.05);'
    
    if old_header_bg in content:
        content = content.replace(old_header_bg, new_header_bg)
        changed = True

    # Fix text colors inside the header (white to dark)
    if '<h3 class="brand-font fw-bold m-0 fs-3" style="color: #f8fafc;' in content:
        content = content.replace('color: #f8fafc;', 'color: #1e293b;')
        changed = True
        
    if '<h2 class="fw-bold m-0 fs-4" style="font-family: \'Outfit\', sans-serif; color: #f8fafc;' in content:
        content = content.replace('color: #f8fafc;', 'color: #1e293b;')
        changed = True

    # 3. Fix the list view dark backgrounds
    # `<div class="list-group mb-5" style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 15px rgba(0,0,0,0.2); overflow: hidden;">`
    # to light theme
    old_list_container = 'border: 1px solid rgba(255,255,255,0.08); box-shadow: 0 4px 15px rgba(0,0,0,0.2);'
    new_list_container = 'border: 1px solid rgba(0,0,0,0.05); box-shadow: 0 4px 15px rgba(0,0,0,0.03); background: #ffffff;'
    if old_list_container in content:
        content = content.replace(old_list_container, new_list_container)
        changed = True

    # List items:
    old_list_item = 'border-bottom: 1px solid rgba(255,255,255,0.05); transition: background-color 0.2s; border-left: 3px solid transparent;" onmouseover="this.style.backgroundColor=\'rgba(255,255,255,0.05)\';'
    new_list_item = 'border-bottom: 1px solid rgba(0,0,0,0.05); transition: background-color 0.2s; border-left: 3px solid transparent;" onmouseover="this.style.backgroundColor=\'#f8fafc\';'
    if old_list_item in content:
        content = content.replace(old_list_item, new_list_item)
        changed = True

    # Download button in list
    old_dl_btn = 'background: rgba(255,255,255,0.1); color: #f8fafc; border: 1px solid rgba(255,255,255,0.1);'
    new_dl_btn = 'background: #3b82f6; color: #ffffff; border: none;'
    if old_dl_btn in content:
        content = content.replace(old_dl_btn, new_dl_btn)
        changed = True
        
    # Empty states
    old_empty = 'background: rgba(15, 23, 42, 0.6); border-radius: 16px; border: 1px dashed rgba(255,255,255,0.1);'
    new_empty = 'background: #f8fafc; border-radius: 16px; border: 1px dashed rgba(0,0,0,0.1);'
    if old_empty in content:
        content = content.replace(old_empty, new_empty)
        changed = True
        
    # Fix the RECENT UPLOADS header color
    old_recent = '<h3 class="fw-bold mb-4 mt-2 text-dark d-flex align-items-center" style="font-size: 1.1rem; text-transform: uppercase; color: #f8fafc !important;">'
    new_recent = '<h3 class="fw-bold mb-4 mt-2 text-dark d-flex align-items-center" style="font-size: 1.1rem; text-transform: uppercase; color: #1e293b !important;">'
    if old_recent in content:
        content = content.replace(old_recent, new_recent)
        changed = True

    if changed:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Cleaned up {filepath}")

