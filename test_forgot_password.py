import requests
from bs4 import BeautifulSoup

session = requests.Session()
response = session.get('http://localhost:8080/forgot-password')
soup = BeautifulSoup(response.text, 'html.parser')
csrf_token = soup.find('input', {'name': '_csrf'})['value']

data = {
    'email': 'kilingepazasauti@gmail.com',
    '_csrf': csrf_token
}
post_response = session.post('http://localhost:8080/forgot-password', data=data, allow_redirects=False)
print(f"POST Status: {post_response.status_code}")
print(f"Redirect Location: {post_response.headers.get('Location')}")
