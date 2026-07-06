const { MongoClient } = require('mongodb');

// Get the URI from application.properties or default local
const MONGO_URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function deleteDummyData() {
    console.log("Connecting to MongoDB Atlas...");
    const client = new MongoClient(MONGO_URI);
    
    try {
        await client.connect();
        console.log("Connected successfully!");
        
        const db = client.db('school_db');
        const notesCollection = db.collection('notes');
        
        console.log("Deleting dummy notes...");
        const result = await notesCollection.deleteMany({ isDummy: true });
        
        console.log(`Deleted ${result.deletedCount} dummy documents!`);
        
    } catch (err) {
        console.error("Error during deletion:", err);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

deleteDummyData();
