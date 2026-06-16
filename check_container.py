with open('src/main/resources/templates/dashboard.html', 'r') as f:
    lines = f.readlines()
    
depth = 0
container_depth = -1
for i, line in enumerate(lines):
    if '<div' in line:
        depth += line.count('<div')
        if 'class="container my-5"' in line:
            container_depth = depth
    if '</div' in line:
        depth -= line.count('</div')
        if container_depth != -1 and depth < container_depth:
            print(f"Container closed at line {i+1}")
            container_depth = -1
            
    if 'Shared Footer' in line:
        print(f"Footer at line {i+1}, current depth: {depth}")
