import re

with open("../src/main/resources/templates/guest_notes.html", "r") as f:
    content = f.read()

# The pattern looks for the end of the download button which currently only has the icon
# and we will add the text "DOWNLOAD" to it.
old_text = r'"><i class="bi bi-cloud-download-fill"></i></a>'
new_text = r'"><i class="bi bi-cloud-download-fill"></i> DOWNLOAD</a>'

content = content.replace(old_text, new_text)

with open("../src/main/resources/templates/guest_notes.html", "w") as f:
    f.write(content)
