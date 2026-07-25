from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
java_subject_id = '6a5fc0d11b56432cd9e6f585'

qs = db['questions'].find({'subjectId': java_subject_id})
modules = set()
for q in qs:
    mod = q.get('moduleName')
    if mod:
        modules.add(mod)
print("Modules for Java:", modules)
