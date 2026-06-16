import re

with open("/home/careen/.gemini/antigravity-ide/brain/ed86c044-68a0-45a5-9c3c-4f01e18ba2a9/task.md", "r") as f:
    content = f.read()

content = content.replace("- `[ ]` **2. Kurekebisha Controller", "- `[x]` **2. Kurekebisha Controller")
content = content.replace("- `[ ]` **3. Kurekebisha Sehemu", "- `[x]` **3. Kurekebisha Sehemu")
content = content.replace("- `[ ]` **4. Kuboresha Guest", "- `[/]` **4. Kuboresha Guest")

with open("/home/careen/.gemini/antigravity-ide/brain/ed86c044-68a0-45a5-9c3c-4f01e18ba2a9/task.md", "w") as f:
    f.write(content)

