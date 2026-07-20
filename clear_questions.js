const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('school_db');
        const result = await db.collection('questions').deleteMany({});
        console.log(`Successfully deleted ${result.deletedCount} questions from the database.`);
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
