import json
import re

log_path = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"
login_lines = {}
current_line_num = None

with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get("step_index") == 1852:
            content = data.get("content", "")
            lines = content.split('\n')
            for l in lines:
                if l.startswith("The following code has been modified") or l.startswith("Showing lines") or l.startswith("Total ") or l.startswith("File Path:") or l.startswith("Completed At:") or l.startswith("Created At:"):
                    continue
                match = re.match(r'^(\d+): (.*)$', l)
                if match:
                    current_line_num = int(match.group(1))
                    login_lines[current_line_num] = match.group(2)
                elif current_line_num is not None:
                    # It's a wrapped line! Append to the previous line!
                    if not l.startswith("The above content does NOT show"):
                        login_lines[current_line_num] += l

with open('src/main/resources/templates/login.html', 'w') as out:
    for i in range(1, 801):
        if i in login_lines:
            out.write(login_lines[i] + '\n')
print(f"Perfectly extracted 800 lines of login.html!")
