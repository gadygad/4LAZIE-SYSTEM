from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
subs = db['subjects'].find({'name': {'$regex': 'java', '$options': 'i'}})
print("All Java Subjects:")
for s in subs:
    print(s)
