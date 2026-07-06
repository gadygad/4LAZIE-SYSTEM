import os
import glob

template_dir = '/run/media/careen/EE68-0880/4LAZIE/src/main/resources/templates'
link_tag = '    <link rel="stylesheet" href="/css/mobile-spacing-standards.css">\n'

html_files = glob.glob(os.path.join(template_dir, '**/*.html'), recursive=True)

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'mobile-spacing-standards.css' in content:
        continue # Already added
        
    if '</head>' in content:
        content = content.replace('</head>', link_tag + '</head>')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Added to {file_path}")
    else:
        # Try to find <head> if </head> is missing for some reason
        if '<head>' in content:
            content = content.replace('<head>', '<head>\n' + link_tag)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Added to {file_path} (after <head>)")

print("Done inserting mobile-spacing-standards.css")
