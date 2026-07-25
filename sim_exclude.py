import urllib.request
import json
import time

url = f"https://4lazie.com/api/public/quizzes/practice?subjectId=6a5fc0d11b56432cd9e6f585&category=QUIZ&excludeIds=123&_t={int(time.time()*1000)}"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    content = response.read().decode()
    try:
        data = json.loads(content)
        print(f"Type: {type(data)}")
        if isinstance(data, list):
            print(f"Items: {len(data)}")
        else:
            print(f"Response: {data}")
    except json.JSONDecodeError:
        print(f"Content: {content}")
except urllib.error.HTTPError as e:
    print(f"HTTP Error: {e.code}")
    print(e.read().decode())
