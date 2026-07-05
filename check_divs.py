import re

html = open('src/main/resources/templates/home.html').read()
start = html.find('<div class="col-md-7">')
if start == -1:
    print("Not found")
    exit()

count = 0
pos = start
in_comment = False
while pos < len(html):
    if html[pos:pos+4] == '<!--':
        in_comment = True
    elif html[pos:pos+3] == '-->':
        in_comment = False
    
    if not in_comment:
        if html[pos:pos+4] == '<div':
            count += 1
        elif html[pos:pos+5] == '</div':
            count -= 1
            if count == 0:
                print(f"col-md-7 ends at index {pos}")
                print(f"Content length: {pos - start}")
                
                # Check what comes after
                after = html[pos:pos+200]
                print(f"After: {after}")
                break
    pos += 1
