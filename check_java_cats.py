from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
java_subject_id = '6a5fc0d11b56432cd9e6f585'

cats = ['QUIZ', 'EXERCISE', 'POSSIBLE', 'UE', 'CAT 1', 'CAT 2']
for c in cats:
    count = db['questions'].count_documents({'subjectId': java_subject_id, 'category': {'$regex': f'^{c}', '$options': 'i'}})
    print(f"Count {c}: {count}")
