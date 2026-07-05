import re

html = open('src/main/resources/templates/home.html').read()
lines = html.split('\n')

level = 0
for i in range(1643, 2135):
    line = lines[i]
    if '<!--' in line:
        continue # simplistically ignore comments, but wait some are multi-line
