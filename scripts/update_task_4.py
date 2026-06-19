import re

with open("/home/careen/.gemini/antigravity-ide/brain/ed86c044-68a0-45a5-9c3c-4f01e18ba2a9/task.md", "r") as f:
    content = f.read()

content = content.replace("- `[/]` **4. Kuboresha Guest", "- `[x]` **4. Kuboresha Guest")
content = content.replace("- `[ ]` **5. Majaribio", "- `[/]` **5. Majaribio")

with open("/home/careen/.gemini/antigravity-ide/brain/ed86c044-68a0-45a5-9c3c-4f01e18ba2a9/task.md", "w") as f:
    f.write(content)

