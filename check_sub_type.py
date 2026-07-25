from pymongo import MongoClient
client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
s = db['subjects'].find_one({'name': {'$regex': 'java', '$options': 'i'}})
print(s.get('_id'), type(s.get('_id')))
