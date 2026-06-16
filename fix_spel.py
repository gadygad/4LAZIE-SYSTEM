import os

file_path = 'src/main/resources/templates/fragments/sjuit_components.html'
with open(file_path, 'r') as f:
    content = f.read()

# Replace __${unitNum}__ with #unitNum
new_content = content.replace('entry.value.?[unitNumber == __${unitNum}__]', 'entry.value.?[unitNumber == #unitNum]')

with open(file_path, 'w') as f:
    f.write(new_content)

print("Replaced successfully.")
