const { MongoClient } = require('mongodb');

const MONGO_URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function checkDuplicates() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const notesCollection = db.collection('notes');
        
        const notes = await notesCollection.find({ title: "CST 05102 - OOP with Java (CAT 1 Answers)" }).toArray();
        console.log(`Found ${notes.length} notes with this title:`);
        notes.forEach(n => {
            console.log(`- ID: ${n._id.toString()}, FileUrl: ${n.fileUrl}`);
        });
        
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}
checkDuplicates();
