import re

with open('../src/main/resources/templates/dashboard.html', 'r') as f:
    lines = f.readlines()

depth = 0
for i, line in enumerate(lines):
    opens = len(re.findall(r'<div\b[^>]*>', line))
    closes = len(re.findall(r'</div\s*>', line))
    depth += opens
    depth -= closes
    
    if i+1 in [309, 314, 350, 576, 577, 580, 587, 588]:
        print(f"Line {i+1}: opens={opens}, closes={closes}, depth_after={depth}")
        
