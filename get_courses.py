from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
courses = db['courses'].find({'name': {'$regex': 'COMPUTER', '$options': 'i'}})
for c in courses:
    print(c)
