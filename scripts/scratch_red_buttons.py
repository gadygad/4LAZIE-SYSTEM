import glob
import re

files = glob.glob('src/main/resources/templates/*_papers.html') + ['src/main/resources/templates/ue_exams.html']

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Change Read button color
    content = content.replace("background: rgba(16, 185, 129, 0.1); color: #059669;", "background: rgba(239, 68, 68, 0.1); color: #dc2626;")
    
    # Change Download button color
    content = content.replace("background: linear-gradient(135deg, #10b981, #059669); color: white;", "background: linear-gradient(135deg, #ef4444, #dc2626); color: white;")
    content = content.replace("box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);", "box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);")

    with open(file, 'w') as f:
        f.write(content)
    print(f"Updated colors in {file}")

