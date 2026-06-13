import json

log_path = "/home/careen/.gemini/antigravity-ide/brain/4cd1d036-7589-46eb-8ba0-0915076d25c7/.system_generated/logs/transcript.jsonl"

login_lines = {}
register_lines = {}

with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "CODE_ACTION":
            # Stop reading once the first code action is performed!
            pass 
        content = data.get("content", "")
        if data.get("type") == "VIEW_FILE":
            if "login.html" in content and not login_lines:
                # wait, view_file only shows 500 lines at a time.
                pass

# A much better way: look for the first 800-line read of login.html
with open(log_path, 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get("type") == "VIEW_FILE" and "login.html" in data.get("content", ""):
            content = data.get("content", "")
            lines = content.split('\n')
            for l in lines:
                if l.startswith("1: "):
                    print(f"Found start of login.html at step {data.get('step_index')}")
            # break
