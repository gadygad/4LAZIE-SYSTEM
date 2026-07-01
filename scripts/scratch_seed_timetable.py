import re
from pymongo import MongoClient
from datetime import datetime

MONGO_URI = "mongodb://mongo:okOeKbLeGvqLhIvbSWnYbAbaKrqfPhvi@reseau.proxy.rlwy.net:45222/school_db?authSource=admin"

# Read view_timetable.html
with open('src/main/resources/templates/view_timetable.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract content inside <div id="timetable-wrapper"> ... </div>
# Using regex with dotall
match = re.search(r'<div id="timetable-wrapper">(.*?)<button class="print-btn"', html, re.DOTALL)
if match:
    timetable_html = match.group(1).strip()
    # Add back the button since we used it in regex
    timetable_html += '\n        <button class="print-btn" onclick="window.print()">\n            <i class="bi bi-printer-fill" style="margin-right: 8px;"></i> Save as PDF / Print\n        </button>'
else:
    print("Could not find timetable wrapper content!")
    exit(1)

client = MongoClient(MONGO_URI)
db = client['school_db']
timetables_col = db['timetables']

# The user said: "hii ratiba ni semister ya 2 nta level 5 course ya computer science and engineering pale juu inasoma semister 4 kwasababu mwaka wa kwanza nta level 4 una semester 2,hivyo nta level 5 na yenyewe ina semester 2 ndio maana una ona 4"
# Course: COMPUTER SCIENCE AND ENGINEERING
# Level: 5
# Semester: 2
# Academic Year: 2025/2026

# Upsert timetable
doc = {
    "programType": "COMPUTER SCIENCE AND ENGINEERING",
    "levelNo": 5,
    "semesterNo": 2,
    "academicYear": "2025/2026",
    "htmlContent": timetable_html,
    "uploadDate": datetime.now()
}

result = timetables_col.update_one(
    {
        "programType": doc["programType"], 
        "levelNo": doc["levelNo"], 
        "semesterNo": doc["semesterNo"],
        "academicYear": doc["academicYear"]
    },
    {"$set": doc},
    upsert=True
)

print(f"Inserted/Updated timetable: {result.modified_count} modified, {result.upserted_id} upserted")
