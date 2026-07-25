from pymongo import MongoClient

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
dip_it = db['courses'].find_one({'programType': 'DIP_IT'})
if dip_it:
    print("DIP_IT Course:", dip_it.get('_id'))
    subjects = db['subjects'].find({'course': {'$ref': 'courses', '$id': dip_it.get('_id')}, 'name': {'$regex': 'java', '$options': 'i'}})
    count = 0
    for s in subjects:
        count += 1
        print("DIP_IT Java Subject:", s)
    print("Total DIP_IT Java subjects:", count)
else:
    print("DIP_IT not found")
