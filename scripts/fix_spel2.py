import os

file_path = '../src/main/resources/templates/fragments/sjuit_components.html'
with open(file_path, 'r') as f:
    content = f.read()

new_content = content.replace('entry.value.?[unitNumber == #unitNum]', 'entry.value.?[unitNumber == #root.unitNum]')

with open(file_path, 'w') as f:
    f.write(new_content)
