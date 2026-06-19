import urllib.request

try:
    response = urllib.request.urlopen("http://localhost:8082/guest-notes?program=DIP_CSE&level=5&semester=2")
    html = response.read().decode('utf-8')
    if "PREMIUM FEATURES" in html:
        print("SUCCESS")
    else:
        print("FAILED")
except Exception as e:
    print("ERROR:", e)
