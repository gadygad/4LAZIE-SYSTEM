from pymongo import MongoClient

try:
    client = MongoClient('mongodb://localhost:27017/', serverSelectionTimeoutMS=2000)
    client.admin.command('ping')
    print("Local Mongo is running.")
    db = client['4lazie_db_local']
    print("Local subjects:", db['subjects'].count_documents({}))
    print("Local questions:", db['questions'].count_documents({}))
    
    db2 = client['school_db']
    print("Local school_db subjects:", db2['subjects'].count_documents({}))
    print("Local school_db questions:", db2['questions'].count_documents({}))
except Exception as e:
    print("Could not connect to local Mongo:", e)
