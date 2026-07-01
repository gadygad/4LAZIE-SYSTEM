import glob
import re

files = glob.glob('src/main/resources/templates/*_papers.html') + ['src/main/resources/templates/ue_exams.html']

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Slim down card padding and gap
    content = content.replace("gap: 8px;", "gap: 6px;")
    content = content.replace("padding: 12px 16px;", "padding: 8px 12px;")
    
    # Slim down icon size
    content = content.replace("width: 36px; height: 36px;", "width: 28px; height: 28px;")
    content = content.replace("font-size: 1.1rem;", "font-size: 0.9rem;")
    
    # Slim down title size
    content = content.replace("font-size: 0.95rem;", "font-size: 0.85rem;")
    
    # Slim down subtitle
    content = content.replace("font-size: 0.72rem;", "font-size: 0.65rem;")
    
    # Slim down view/download counts
    content = content.replace("font-size: 0.75rem; font-weight: 700;", "font-size: 0.7rem; font-weight: 700;")
    content = content.replace("font-size: 0.85rem;", "font-size: 0.75rem;")
    
    # Slim down buttons
    content = content.replace("padding: 5px 14px;", "padding: 3px 10px;")
    content = content.replace("font-size: 0.75rem; padding:", "font-size: 0.7rem; padding:")

    with open(file, 'w') as f:
        f.write(content)
    print(f"Slimmed cards in {file}")

