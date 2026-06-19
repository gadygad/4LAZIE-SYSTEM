import json
import re

log_path = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"
content_pieces = {}

with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get("step_index", 0) > 1000: continue
        content = data.get("content", "")
        if "Total Lines:" in content and "login.html" in content and "The following code has been modified" in content:
            lines = content.split('\n')
            for l in lines:
                match = re.match(r'^(\d+): (.*)$', l)
                if match:
                    content_pieces[int(match.group(1))] = match.group(2)

with open('../src/main/resources/templates/login.html', 'w') as out:
    for i in range(1, max(content_pieces.keys()) + 1):
        if i in content_pieces:
            out.write(content_pieces[i] + '\n')
        else:
            out.write('\n')
print(f"Reconstructed {len(content_pieces)} lines for login.html! Max line: {max(content_pieces.keys()) if content_pieces else 0}")

content_pieces_reg = {}
with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get("step_index", 0) > 1000: continue
        content = data.get("content", "")
        if "Total Lines:" in content and "register.html" in content and "The following code has been modified" in content:
            lines = content.split('\n')
            for l in lines:
                match = re.match(r'^(\d+): (.*)$', l)
                if match:
                    content_pieces_reg[int(match.group(1))] = match.group(2)

if content_pieces_reg:
    with open('../src/main/resources/templates/register.html', 'w') as out:
        for i in range(1, max(content_pieces_reg.keys()) + 1):
            if i in content_pieces_reg:
                out.write(content_pieces_reg[i] + '\n')
            else:
                out.write('\n')
    print(f"Reconstructed {len(content_pieces_reg)} lines for register.html! Max line: {max(content_pieces_reg.keys())}")
