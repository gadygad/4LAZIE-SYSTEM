const { MongoClient } = require('mongodb');
const MONGO_URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function fixUser() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const users = db.collection('users');
        
        // Reset passwords for all students to '123456' plain text so it matches or equals
        const result = await users.updateMany(
            { role: 'STUDENT' },
            { $set: { password: '123456', isVerified: true } }
        );
        console.log(`Updated ${result.modifiedCount} users to password '123456' and isVerified=true.`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
fixUser();
