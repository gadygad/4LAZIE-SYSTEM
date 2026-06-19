with open('/home/careen/4LAZIE/src/main/resources/templates/home.html', 'r') as f:
    content = f.read()

start = content.find('<!-- POPULAR NOTES SECTION -->')
end = content.find('<!-- FOOTER -->')

print(f"Start: {start}, End: {end}")
