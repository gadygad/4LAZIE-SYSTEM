from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
java_subject_id = '6a5fc0d11b56432cd9e6f585'

qs = db['questions'].find({'subjectId': java_subject_id})
cats = set()
for q in qs:
    cats.add(q.get('category'))
print("Categories for Java:", cats)
