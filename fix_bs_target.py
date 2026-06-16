with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# Replace href with data-bs-target for the sidebar buttons
content = content.replace('href="#menuDipIt"', 'data-bs-target="#menuDipIt"')
content = content.replace('href="#menuDipCse"', 'data-bs-target="#menuDipCse"')
content = content.replace('href="#menuDipCe"', 'data-bs-target="#menuDipCe"')
content = content.replace('href="#menuDipMe"', 'data-bs-target="#menuDipMe"')
content = content.replace('th:href="\'#menuDegEng\' + ${year}"', 'th:data-bs-target="\'#menuDegEng\' + ${year}"')
content = content.replace('th:href="\'#menuDegEdu\' + ${year}"', 'th:data-bs-target="\'#menuDegEdu\' + ${year}"')

with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)
print("bs-target fixed")
