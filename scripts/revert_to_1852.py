import json
import re

log_path = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"
login_lines = {}

with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get("step_index") == 1852:
            content = data.get("content", "")
            lines = content.split('\n')
            for l in lines:
                match = re.match(r'^(\d+): (.*)$', l)
                if match:
                    login_lines[int(match.group(1))] = match.group(2)

with open('../src/main/resources/templates/login.html', 'w') as out:
    for i in sorted(login_lines.keys()):
        out.write(login_lines[i] + '\n')
print(f"Extracted {len(login_lines)} lines for login.html from step 1852!")
