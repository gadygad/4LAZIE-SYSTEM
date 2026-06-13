import json
import re

log_path = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"
content_pieces = {}

with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        content = data.get("content", "")
        # The agent probably viewed the file multiple times. Let's find step 12.
        if data.get("step_index") in [12, 19, 28, 36, 41, 60]:
            if "The following code has been modified" in content:
                lines = content.split('\n')
                for l in lines:
                    match = re.match(r'^(\d+): (.*)$', l)
                    if match:
                        content_pieces[int(match.group(1))] = match.group(2)

with open('old_login_reconstructed.html', 'w') as out:
    for i in sorted(content_pieces.keys()):
        out.write(content_pieces[i] + '\n')
print(f"Reconstructed {len(content_pieces)} lines!")
