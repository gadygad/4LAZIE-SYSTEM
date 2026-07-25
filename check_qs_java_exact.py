from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
java_subject_id = '6a5fc0d11b56432cd9e6f585'

sub = db['subjects'].find_one({'_id': java_subject_id})
print("Subject from DB:", sub)

# Find one question for this subject
q = db['questions'].find_one({'subjectId': java_subject_id})
print("One question:", q)

# Check count for different categories
print("Count QUIZ:", db['questions'].count_documents({'subjectId': java_subject_id, 'category': {'$regex': '^QUIZ', '$options': 'i'}}))
print("Count UE:", db['questions'].count_documents({'subjectId': java_subject_id, 'category': {'$regex': '^UE', '$options': 'i'}}))

