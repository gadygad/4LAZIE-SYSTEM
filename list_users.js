const { MongoClient } = require('mongodb');
const MONGO_URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function getUsers() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const users = db.collection('users');
        
        const allUsers = await users.find({ role: 'STUDENT' }).toArray();
        console.log("Found Users:");
        allUsers.forEach(u => {
            console.log(`Email: ${u.email}, isVerified: ${u.isVerified}`);
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getUsers();
