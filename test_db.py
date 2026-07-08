from pymongo import MongoClient
import os

client = MongoClient('mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0')
db = client['school_db']
notes = db['notes'].find({'programType': 'DIP_IT'})
count = 0
for n in notes:
    count += 1
    print("Found DIP_IT Note:", n.get('title'), "| cat:", n.get('category'))
print("Total notes for DIP_IT:", count)
