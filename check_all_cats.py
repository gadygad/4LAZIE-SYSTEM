from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
cats = set()
for q in db['questions'].find():
    cats.add(q.get('category'))
print("All categories in DB:", cats)
