import urllib.request
import json
import time

url = f"https://4lazie.com/api/public/quizzes/practice?subjectId=6a5fc0d11b56432cd9e6f585&category=QUIZ&excludeIds=&_t={int(time.time()*1000)}"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode())
    print(f"Items: {len(data)}")
except Exception as e:
    print(f"Error: {e}")
