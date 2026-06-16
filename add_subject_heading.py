import glob

# For dashboard.html
with open('src/main/resources/templates/dashboard.html', 'r') as f:
    content = f.read()

dashboard_target = '                <!-- Dynamic Modules Section -->\n                <div th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="accordion accordion-flush mb-5" id="modulesAccordion"'
dashboard_replacement = '''                <!-- Dynamic Modules Section -->
                <div th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-3 mt-4 d-flex align-items-center">
                    <i class="bi bi-journals me-2 fs-5" style="color: #64748b;"></i>
                    <h3 class="fw-bold m-0" style="font-size: 1.05rem; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Subjects List</h3>
                </div>
                <div th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="accordion accordion-flush mb-5" id="modulesAccordion"'''

content = content.replace(dashboard_target, dashboard_replacement)

# Also remove the duplicate comment if it exists
content = content.replace('                <!-- Dynamic Modules Section -->\n                <!-- Dynamic Modules Section -->', '                <!-- Dynamic Modules Section -->')

with open('src/main/resources/templates/dashboard.html', 'w') as f:
    f.write(content)

# For guest_notes.html
with open('src/main/resources/templates/guest_notes.html', 'r') as f:
    content = f.read()

guest_target = '''                <h3 class="fw-bold mb-4 mt-2 text-dark\'\'\' d-flex align-items-center" style="font-size: 1.1rem; text-transform: uppercase;">
                    <i class="bi bi-clock-history me-2 text-secondary"></i> RECENT UPLOADS
                </h3>'''

guest_replacement = '''                <div th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-3 mt-4 d-flex align-items-center">
                    <i class="bi bi-journals me-2 fs-5" style="color: #64748b;"></i>
                    <h3 class="fw-bold m-0" style="font-size: 1.05rem; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">Subjects List</h3>
                </div>'''

content = content.replace(guest_target, guest_replacement)

with open('src/main/resources/templates/guest_notes.html', 'w') as f:
    f.write(content)

print("Updated headings")
