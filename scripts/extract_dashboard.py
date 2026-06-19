import json
import re

log_file = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"

all_lines = {}
with open(log_file, 'r') as f:
    for line in f:
        try:
            data = json.loads(line)
        except:
            continue
            
        content = data.get('content', '')
        if content and isinstance(content, str):
            if 'File Path: `file:///home/careen/4LAZIE/src/main/resources/templates/dashboard.html`' in content:
                for l in content.split('\n'):
                    match = re.match(r'^(\d+):\s(.*)$', l)
                    if match:
                        line_num = int(match.group(1))
                        line_content = match.group(2)
                        # We only want the LATEST version of the line! Since we read sequentially,
                        # this naturally overwrites old versions with new ones as long as we process in order.
                        # Wait, we want the version BEFORE I ran replace.py!
                        # Replace.py was run at 2026-06-13T01:09:25Z (step 1410).
                        # Let's just collect all lines from the transcript up to step 1350.
                        step_index = data.get('step_index', 0)
                        if step_index < 1400:
                            all_lines[line_num] = line_content

print(f"Unique lines: {len(all_lines)}")

if len(all_lines) > 0:
    with open('/home/careen/4LAZIE/recovered_dashboard.html', 'w') as out:
        max_l = max(all_lines.keys())
        for i in range(1, max_l + 1):
            out.write(all_lines.get(i, f"<!-- MISSING {i} -->") + '\n')
