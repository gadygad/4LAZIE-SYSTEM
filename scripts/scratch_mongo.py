from pymongo import MongoClient

try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["4LAZIE"] # Assuming database name is 4LAZIE or similar. Let's list dbs.
    print(client.list_database_names())
    
    # Try typical names: test, sjuit, 4lazie, etc.
    for db_name in client.list_database_names():
        db = client[db_name]
        if "notes" in db.list_collection_names():
            print(f"Found 'notes' collection in DB: {db_name}")
            notes = list(db.notes.find({"category": "ASSIGNMENT"}))
            print(f"Found {len(notes)} ASSIGNMENT notes.")
            for n in notes:
                print(f"  Title: {n.get('title')}, Program: {n.get('programType')}, Sem: {n.get('semesterNo')}, Level: {n.get('levelNo')}, Public: {n.get('isPublic')}")
except Exception as e:
    print(e)
