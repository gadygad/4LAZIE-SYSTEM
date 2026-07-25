from pymongo import MongoClient
client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']

# Find the java subject
sub = db['subjects'].find_one({'name': {'$regex': 'java', '$options': 'i'}})
print("Java Subject:", sub)
print("Course DBRef:", sub.get('course'))
course_id = sub.get('course').id
course = db['courses'].find_one({'_id': course_id})
print("Course:", course)

