const { MongoClient } = require('mongodb');
const MONGO_URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function verifyAllUsers() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const users = db.collection('users');
        
        const result = await users.updateMany(
            {},
            { $set: { isVerified: true } }
        );
        console.log(`Successfully verified ${result.modifiedCount} users.`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
verifyAllUsers();
