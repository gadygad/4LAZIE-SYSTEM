import os
import re
import shutil

# Configuration
PROJECT_DIR = r"D:\4LAZIE"
TEMPLATES_DIR = os.path.join(PROJECT_DIR, r"src\main\resources\templates")
STATIC_UPLOADS_DIR = os.path.join(PROJECT_DIR, r"src\main\resources\static\uploads")
CONTROLLERS_DIR = os.path.join(PROJECT_DIR, r"src\main\java\com\school\controller")

# Mapping of HTML file (without extension) to its new subfolder
TEMPLATE_MAPPING = {
    # Auth
    "login": "auth",
    "register": "auth",
    "forgot_password": "auth",
    "reset_password": "auth",
    "verify_otp": "auth",
    
    # Admin
    "admin_dashboard": "admin",
    "admin_users": "admin",
    "admin_notes": "admin",
    "admin_courses": "admin",
    "admin_subjects": "admin",
    "admin_timetables": "admin",
    "admin_approvals": "admin",
    
    # User
    "dashboard": "user",
    "profile": "user",
    "my_notes": "user",
    "notifications": "user",
    "premium": "user",
    "upgrade": "user",
    
    # Notes
    "notes": "notes",
    "guest_notes": "notes",
    "explore": "notes",
    "upload": "notes",
    "view_note": "notes",
    "assignments_past_papers": "notes",
    "cat1_past_papers": "notes",
    "cat2_past_papers": "notes",
    "ue_past_papers": "notes",
    "projects_past_papers": "notes",
    
    # Public
    "index": "public",
    "home": "public",
    "about": "public",
    "policy": "public",
    
    # Timetable
    "view_timetable": "timetable",
    "timetable_archive": "timetable",
    "semesters": "timetable",
    "ue_exams": "timetable"
}

def move_templates():
    print("Moving HTML templates...")
    for filename, folder in TEMPLATE_MAPPING.items():
        src = os.path.join(TEMPLATES_DIR, f"{filename}.html")
        dst_folder = os.path.join(TEMPLATES_DIR, folder)
        dst = os.path.join(dst_folder, f"{filename}.html")
        
        if os.path.exists(src):
            os.makedirs(dst_folder, exist_ok=True)
            shutil.move(src, dst)
            print(f"  Moved {filename}.html -> {folder}/")
        else:
            if not os.path.exists(dst):
                print(f"  Warning: {filename}.html not found!")

def move_pdf():
    src = os.path.join(TEMPLATES_DIR, "CSE.pdf")
    dst = os.path.join(STATIC_UPLOADS_DIR, "CSE.pdf")
    if os.path.exists(src):
        os.makedirs(STATIC_UPLOADS_DIR, exist_ok=True)
        shutil.move(src, dst)
        print("Moved CSE.pdf to static/uploads/")

def update_controllers():
    print("Updating Java Controllers...")
    if not os.path.exists(CONTROLLERS_DIR):
        print(f"Controllers dir not found: {CONTROLLERS_DIR}")
        return

    # Regex to find `return "view_name";` or `return "view_name"`
    pattern = re.compile(r'return\s+"([^"]+)";?')

    for root, dirs, files in os.walk(CONTROLLERS_DIR):
        for file in files:
            if not file.endswith(".java"):
                continue
            
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            updated_content = content
            changes = 0
            
            # Find all return "xxx" statements
            matches = pattern.finditer(content)
            for match in matches:
                full_match = match.group(0)
                view_name = match.group(1)
                
                if view_name in TEMPLATE_MAPPING:
                    new_view_name = f"{TEMPLATE_MAPPING[view_name]}/{view_name}"
                    new_full_match = full_match.replace(f'"{view_name}"', f'"{new_view_name}"')
                    updated_content = updated_content.replace(full_match, new_full_match)
                    changes += 1
            
            if changes > 0:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(updated_content)
                print(f"  Updated {file} ({changes} changes)")

if __name__ == "__main__":
    move_templates()
    move_pdf()
    update_controllers()
    print("Done!")
