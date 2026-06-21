import sys

path = "src/main/resources/templates/fragments/sjuit_components.html"
with open(path, "r") as f:
    content = f.read()

new_content = content.replace("th:href=\"@{'/guest-notes", "href=\"guest_notes.html\" th:href=\"@{'/guest-notes")

with open(path, "w") as f:
    f.write(new_content)

print("Done")
