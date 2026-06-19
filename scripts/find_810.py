import json

log_path = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"
with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "VIEW_FILE" and "login.html" in data.get("content", ""):
            content = data.get("content", "")
            lines = content.split('\n')
            for l in lines:
                if "Total Lines:" in l:
                    print(f"Step {data.get('step_index')}: {l}")
