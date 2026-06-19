import re

def fix_dashboard():
    filename = '../src/main/resources/templates/dashboard.html'
    with open(filename, 'r') as f:
        content = f.read()
    
    # We want to replace the current MODULE NAMES header with a more prominent one
    old_header = """                <div th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-3 mt-4 d-flex align-items-center">
                    <i class="bi bi-journals me-2 fs-5" style="color: #64748b;"></i>
                    <h3 class="fw-bold m-0" style="font-size: 1.05rem; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">MODULE NAMES</h3>
                </div>"""
                
    new_header = """                <!-- MODULE NAMES HEADING -->
                <div th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-3 mt-4 pb-2" style="border-bottom: 2px solid rgba(0,0,0,0.05);">
                    <h3 class="fw-bold m-0 d-flex align-items-center" style="font-size: 1.1rem; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'Outfit', sans-serif;">
                        <i class="bi bi-collection me-2" style="color: #f59e0b;"></i> MODULE NAMES
                    </h3>
                </div>"""
                
    if old_header in content:
        content = content.replace(old_header, new_header)
        with open(filename, 'w') as f:
            f.write(content)
        print("Updated dashboard.html header")
    else:
        print("Could not find old header in dashboard.html")

def fix_guest_notes():
    filename = '../src/main/resources/templates/guest_notes.html'
    with open(filename, 'r') as f:
        content = f.read()

    # First, let's remove the entire old list group
    # It starts with: <!-- Dynamic Modules Section -->\n                <div class="mb-5" th:if="${not #maps.isEmpty(groupedNotes)}">
    # and ends right before <!-- Empty State -->
    start_marker = '                <!-- Dynamic Modules Section -->\n                <div class="mb-5" th:if="${not #maps.isEmpty(groupedNotes)}">'
    end_marker = '                <!-- Empty State -->'
    
    if start_marker in content and end_marker in content:
        start_idx = content.find(start_marker)
        end_idx = content.find(end_marker)
        content = content[:start_idx] + content[end_idx:]
        print("Removed old list-group from guest_notes.html")
    else:
        print("Could not find old list-group bounds in guest_notes.html")

    # Now replace the header
    old_header = """                <div th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-3 mt-4 d-flex align-items-center">
                    <i class="bi bi-journals me-2 fs-5" style="color: #64748b;"></i>
                    <h3 class="fw-bold m-0" style="font-size: 1.05rem; color: #475569; text-transform: uppercase; letter-spacing: 0.5px;">MODULE NAMES</h3>
                </div>"""
                
    new_header = """                <!-- MODULE NAMES HEADING -->
                <div th:if="${groupedNotes != null && !groupedNotes.isEmpty()}" class="mb-3 mt-4 pb-2" style="border-bottom: 2px solid rgba(0,0,0,0.05);">
                    <h3 class="fw-bold m-0 d-flex align-items-center" style="font-size: 1.1rem; color: #1e293b; text-transform: uppercase; letter-spacing: 0.5px; font-family: 'Outfit', sans-serif;">
                        <i class="bi bi-collection me-2" style="color: #f59e0b;"></i> MODULE NAMES
                    </h3>
                </div>"""
                
    if old_header in content:
        content = content.replace(old_header, new_header)
        print("Updated guest_notes.html header")
        
    with open(filename, 'w') as f:
        f.write(content)

fix_dashboard()
fix_guest_notes()
