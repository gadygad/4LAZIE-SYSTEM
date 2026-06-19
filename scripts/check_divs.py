import sys

def check_file(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
        
    depth = 0
    main_content_start = -1
    main_content_end = -1
    
    for i, line in enumerate(lines):
        if '<div' in line:
            depth += line.count('<div')
            if 'class="main-content"' in line:
                main_content_start = i
                main_content_depth = depth
        if '</div' in line:
            if main_content_start != -1 and depth == main_content_depth:
                main_content_end = i
            depth -= line.count('</div')
            
        if '<!-- Shared Footer -->' in line:
            print(f"Footer found at line {i+1}, div depth: {depth}")
            
    print(f"File {filename}: Final depth: {depth}, main_content started at {main_content_start+1}, ended at {main_content_end+1}")

check_file('../src/main/resources/templates/dashboard.html')
