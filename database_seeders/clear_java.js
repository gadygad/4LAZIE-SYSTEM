const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('school_db');
        const subject = await db.collection('subjects').findOne({ name: /Object Oriented/i });
        if(subject) {
            await db.collection('questions').deleteMany({ subjectId: subject._id.toString() });
            console.log("Cleared!");
        }
    } finally {
        await client.close();
    }
}
run();
