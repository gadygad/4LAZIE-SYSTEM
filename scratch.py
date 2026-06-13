import os

dir_path = "/home/careen/4LAZIE/src/main/resources/templates/"

replacements = {
    "Student Notes System": "STUDENT NOTES SYSTEM",
    "premium notes": "PREMIUM NOTES",
    "Popular Notes": "POPULAR NOTES",
    "Java Programming Notes": "JAVA PROGRAMMING NOTES",
    "Database Notes": "DATABASE NOTES",
    "Networking Notes": "NETWORKING NOTES",
    "Saved Notes": "SAVED NOTES",
    "Student Notes Hub": "STUDENT NOTES HUB",
    "academic notes": "ACADEMIC NOTES",
    "Academic Notes Feed": "ACADEMIC NOTES FEED",
    "Upload Notes": "UPLOAD NOTES",
    "My Notes": "MY NOTES",
    "Guest View - Level Notes": "GUEST VIEW - LEVEL NOTES",
    "public notes": "PUBLIC NOTES",
    "Java Notes": "JAVA NOTES",
    "(Notes)": "(NOTES)",
    ">Notes<": ">NOTES<",
    "No public notes": "No public NOTES"
}

for filename in os.listdir(dir_path):
    if filename.endswith(".html"):
        filepath = os.path.join(dir_path, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        for k, v in replacements.items():
            content = content.replace(k, v)
            # also replace lowercase versions just in case
            content = content.replace(k.lower(), v)
            
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)

print("Done")
