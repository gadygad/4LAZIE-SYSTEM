import re

def update_guest_notes():
    filename = 'src/main/resources/templates/guest_notes.html'
    with open(filename, 'r') as f:
        content = f.read()

    # The Read button in guest_notes currently looks like:
    # <a th:if="${session.user != null}" th:href="@{'/view/' + ${note.id}}" class="btn btn-sm btn-light rounded-pill text-primary fw-bold d-flex align-items-center justify-content-center" style="padding: 4px 12px; font-size: 0.65rem; border: 1px solid rgba(37, 99, 235, 0.2); transition: all 0.2s;">
    
    old_read_btn = '<a th:if="${session.user != null}" th:href="@{\'/view/\' + ${note.id}}"'
    new_read_btn = '<a th:href="@{\'/view/\' + ${note.id}}"'
    
    if old_read_btn in content:
        content = content.replace(old_read_btn, new_read_btn)
        with open(filename, 'w') as f:
            f.write(content)
        print("Updated Read button in guest_notes.html")
    else:
        print("Could not find Read button in guest_notes.html")

update_guest_notes()
