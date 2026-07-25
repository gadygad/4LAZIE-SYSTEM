from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
java_subject_id = '6a5fc0d11b56432cd9e6f585'

sub = db['subjects'].find_one({'_id': ObjectId(java_subject_id)})
print("Subject from DB:", sub)
