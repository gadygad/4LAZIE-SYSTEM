from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
q = db['questions'].find_one()
print(f"subjectId type: {type(q.get('subjectId'))}")
print(f"subjectId value: {repr(q.get('subjectId'))}")
