import json
import re

log_path = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"
content_pieces = {}

with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        content = data.get("content", "")
        if "Total Lines:" in content and "login.html" in content and "The following code has been modified" in content:
            step = data.get("step_index")
            if step >= 1852 and step < 1900:  # Search around step 1852
                lines = content.split('\n')
                for l in lines:
                    match = re.match(r'^(\d+): (.*)$', l)
                    if match:
                        line_num = int(match.group(1))
                        line_content = match.group(2)
                        content_pieces[line_num] = line_content

# If we didn't find all lines in step 1852, let's search backwards!
if not content_pieces:
    for step_to_check in [1852, 1209, 1203, 1200, 1191, 1188, 1185]:
        with open(log_path, 'r') as f:
            for line in f:
                data = json.loads(line)
                if data.get("step_index") == step_to_check and "login.html" in data.get("content", ""):
                    lines = data.get("content", "").split('\n')
                    for l in lines:
                        match = re.match(r'^(\d+): (.*)$', l)
                        if match:
                            content_pieces[int(match.group(1))] = match.group(2)
        if len(content_pieces) > 100:
            break

with open('old_login_reconstructed.html', 'w') as out:
    for i in sorted(content_pieces.keys()):
        out.write(content_pieces[i] + '\n')
print(f"Reconstructed {len(content_pieces)} lines!")
