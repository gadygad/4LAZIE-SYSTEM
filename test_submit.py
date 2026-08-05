import requests

session = requests.Session()

# 1. Get the login page to get the initial CSRF token
response = session.get('http://localhost:8080/login')
csrf_token = response.cookies.get('XSRF-TOKEN')

if not csrf_token:
    print("Could not get CSRF token from cookies.")
    exit(1)

# 2. Login
login_data = {
    'email': 'john@student.edu',
    'password': 'password123',
    '_csrf': csrf_token
}
response = session.post('http://localhost:8080/login', data=login_data)
print("Login status:", response.status_code)

# 3. Submit the form
csrf_token = session.cookies.get('XSRF-TOKEN')
headers = {
    'X-XSRF-TOKEN': csrf_token,
    'X-CSRF-TOKEN': csrf_token
}
form_data = {
    'subjectName': 'Math',
    'questionText': 'How to solve this?',
    'deadline': 'Tomorrow'
}
response = session.post('http://localhost:8080/api/assignments/request', data=form_data, headers=headers)
print("Submit status:", response.status_code)
print("Response:", response.text)

