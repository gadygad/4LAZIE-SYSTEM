import glob

files = glob.glob('../src/main/resources/templates/*.html')

for file in files:
    with open(file, 'r') as f:
        content = f.read()
        
    changed = False
    
    if '<span class="fw-semibold text-dark flex-grow-1" style="font-size: 0.85rem;">' in content:
        content = content.replace('<span class="fw-semibold text-dark flex-grow-1" style="font-size: 0.85rem;">', '<span class="fw-semibold flex-grow-1" style="font-size: 0.85rem; color: #1e293b;">')
        changed = True

    if changed:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")
