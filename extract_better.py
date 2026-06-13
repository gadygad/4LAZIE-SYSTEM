import json
import re
import os

log_file = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"

all_lines = {}

with open(log_file, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
        except:
            continue
            
        if data.get('type') == 'VIEW_FILE_RESPONSE' or (data.get('type') == 'TOOL_RESPONSE' and data.get('source') == 'SYSTEM'):
            content = data.get('content', '')
            if 'dashboard.html' in content:
                # view_file response
                for l in content.split('\n'):
                    match = re.match(r'^(\d+):\s(.*)$', l)
                    if match:
                        line_num = int(match.group(1))
                        line_content = match.group(2)
                        all_lines[line_num] = line_content

print(f"Recovered {len(all_lines)} lines.")
if len(all_lines) > 0:
    max_line = max(all_lines.keys())
    print(f"Max line: {max_line}")
    with open('recovered.html', 'w') as out:
        for i in range(1, max_line + 1):
            out.write(all_lines.get(i, f"<!-- MISSING {i} -->") + '\n')
