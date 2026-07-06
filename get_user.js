const { MongoClient } = require('mongodb');
const MONGO_URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function getCredentials() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const users = db.collection('users');
        
        const user = await users.findOne({ role: 'USER' });
        if (user) {
            console.log("Found User:");
            console.log("Email/Username:", user.email || user.username);
            console.log("Role:", user.role);
            // Password might be hashed. If it is hashed, we cannot see it.
        } else {
            console.log("No regular user found.");
        }
        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
getCredentials();
