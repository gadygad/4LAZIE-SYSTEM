from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
questions = db['questions'].find()
count = 0
subjects = set()
categories = set()
for q in questions:
    count += 1
    subjects.add(q.get('subjectId'))
    categories.add(q.get('category'))
print("Total questions:", count)
print("Subjects:", subjects)
print("Categories:", categories)

# Let's see if any subject is related to java
print("\nChecking for Java subjects:")
java_subs = db['subjects'].find({'name': {'$regex': 'java', '$options': 'i'}})
for s in java_subs:
    print(s.get('_id'), s.get('name'))
