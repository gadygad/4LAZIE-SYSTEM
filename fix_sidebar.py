import re

with open('src/main/resources/templates/fragments/sjuit_components.html', 'r') as f:
    content = f.read()

# 1. Remove the JS script block for showFlyout
content = re.sub(r'<script>\s*// JS for sidebar flyout menus.*?</script>', '', content, flags=re.DOTALL)

# 2. Add data-bs-toggle to the buttons and IDs to the contents
# DIP IT
content = content.replace(
    '<div class="sidebar-hover-item" onmouseenter="showFlyout(this)" onmouseleave="hideFlyout(this)">\n                        <div class="sidebar-hover-btn"',
    '<div class="sidebar-hover-item">\n                        <div class="sidebar-hover-btn" data-bs-toggle="collapse" href="#menuDipIt" role="button" aria-expanded="false"'
)
content = content.replace(
    '<div class="sidebar-hover-content">\n                            <a th:href="@{\'/guest-notes?program=DIP_IT',
    '<div class="sidebar-hover-content collapse" id="menuDipIt">\n                            <a th:href="@{\'/guest-notes?program=DIP_IT'
)

# DIP CSE
content = content.replace(
    '<div class="sidebar-hover-item mt-2" onmouseenter="showFlyout(this)" onmouseleave="hideFlyout(this)">\n                        <div class="sidebar-hover-btn" th:style="${selectedProgram == \'DIP_CSE\'',
    '<div class="sidebar-hover-item mt-2">\n                        <div class="sidebar-hover-btn" data-bs-toggle="collapse" href="#menuDipCse" role="button" aria-expanded="false" th:style="${selectedProgram == \'DIP_CSE\''
)
content = content.replace(
    '<div class="sidebar-hover-content">\n                            <a th:href="@{\'/guest-notes?program=DIP_CSE',
    '<div class="sidebar-hover-content collapse" id="menuDipCse">\n                            <a th:href="@{\'/guest-notes?program=DIP_CSE'
)

# DIP CE
content = content.replace(
    '<div class="sidebar-hover-item mt-2" onmouseenter="showFlyout(this)" onmouseleave="hideFlyout(this)">\n                        <div class="sidebar-hover-btn" th:style="${selectedProgram == \'DIP_CE\'',
    '<div class="sidebar-hover-item mt-2">\n                        <div class="sidebar-hover-btn" data-bs-toggle="collapse" href="#menuDipCe" role="button" aria-expanded="false" th:style="${selectedProgram == \'DIP_CE\''
)
content = content.replace(
    '<div class="sidebar-hover-content">\n                            <a th:href="@{\'/guest-notes?program=DIP_CE',
    '<div class="sidebar-hover-content collapse" id="menuDipCe">\n                            <a th:href="@{\'/guest-notes?program=DIP_CE'
)

# DIP ME
content = content.replace(
    '<div class="sidebar-hover-item mt-2" onmouseenter="showFlyout(this)" onmouseleave="hideFlyout(this)">\n                        <div class="sidebar-hover-btn" th:style="${selectedProgram == \'DIP_ME\'',
    '<div class="sidebar-hover-item mt-2">\n                        <div class="sidebar-hover-btn" data-bs-toggle="collapse" href="#menuDipMe" role="button" aria-expanded="false" th:style="${selectedProgram == \'DIP_ME\''
)
content = content.replace(
    '<div class="sidebar-hover-content">\n                            <a th:href="@{\'/guest-notes?program=DIP_ME',
    '<div class="sidebar-hover-content collapse" id="menuDipMe">\n                            <a th:href="@{\'/guest-notes?program=DIP_ME'
)

# DEGREE ENG
content = content.replace(
    '<div class="sidebar-hover-item" th:each="year : ${#numbers.sequence(1, 4)}" onmouseenter="showFlyout(this)" onmouseleave="hideFlyout(this)">\n                        <div class="sidebar-hover-btn" th:style="${selectedProgram == \'DEGREE_ENG\'',
    '<div class="sidebar-hover-item" th:each="year : ${#numbers.sequence(1, 4)}">\n                        <div class="sidebar-hover-btn" data-bs-toggle="collapse" th:href="\'#menuDegEng\' + ${year}" role="button" aria-expanded="false" th:style="${selectedProgram == \'DEGREE_ENG\''
)
content = content.replace(
    '<div class="sidebar-hover-content">\n                            <a th:href="@{\'/guest-notes?program=DEGREE_ENG',
    '<div class="sidebar-hover-content collapse" th:id="\'menuDegEng\' + ${year}">\n                            <a th:href="@{\'/guest-notes?program=DEGREE_ENG'
)

# DEGREE EDU
content = content.replace(
    '<div class="sidebar-hover-item" th:each="year : ${#numbers.sequence(1, 3)}" onmouseenter="showFlyout(this)" onmouseleave="hideFlyout(this)">\n                        <div class="sidebar-hover-btn" th:style="${selectedProgram == \'DEGREE_EDU\'',
    '<div class="sidebar-hover-item" th:each="year : ${#numbers.sequence(1, 3)}">\n                        <div class="sidebar-hover-btn" data-bs-toggle="collapse" th:href="\'#menuDegEdu\' + ${year}" role="button" aria-expanded="false" th:style="${selectedProgram == \'DEGREE_EDU\''
)
content = content.replace(
    '<div class="sidebar-hover-content">\n                            <a th:href="@{\'/guest-notes?program=DEGREE_EDU',
    '<div class="sidebar-hover-content collapse" th:id="\'menuDegEdu\' + ${year}">\n                            <a th:href="@{\'/guest-notes?program=DEGREE_EDU'
)

with open('src/main/resources/templates/fragments/sjuit_components.html', 'w') as f:
    f.write(content)
print("Fix applied")
