import urllib.request
import json

url = "https://4lazie.com/api/subjects?programType=DIP_CSE&levelNo=5&semesterNo=1"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    response = urllib.request.urlopen(req)
    data = json.loads(response.read().decode())
    print("Subjects returned:")
    for d in data:
        print(f"Name: {d.get('name')}, ID: {d.get('id')}")
except Exception as e:
    print(f"Error: {e}")
