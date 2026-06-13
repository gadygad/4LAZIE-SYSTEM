import json
import re

log_file = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"

all_lines = {}
found_count = 0
with open(log_file, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
        except:
            continue
            
        content = data.get('content', '')
        if content and isinstance(content, str):
            for l in content.split('\n'):
                match = re.match(r'^(\d+):\s(.*)$', l)
                if match:
                    line_num = int(match.group(1))
                    line_content = match.group(2)
                    all_lines[line_num] = line_content
                    found_count += 1

print(f"Total lines found: {found_count}")
print(f"Unique lines: {len(all_lines)}")

if len(all_lines) > 0:
    with open('recovered.html', 'w') as out:
        max_l = max(all_lines.keys())
        for i in range(1, max_l + 1):
            out.write(all_lines.get(i, f"<!-- MISSING {i} -->") + '\n')
