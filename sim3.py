from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
courses = db['courses'].find({'name': 'DIPLOMA IN COMPUTER SCIENCE ENGINEERING'})
for c in courses:
    print(c)

print("Now subjects with Java:")
subs = db['subjects'].find({'name': 'OBJECT ORIENTED PROGRAMMING WITH JAVA'})
for s in subs:
    print(s)
