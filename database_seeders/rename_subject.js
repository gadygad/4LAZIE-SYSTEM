const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('school_db');
        const result = await db.collection('notes').updateMany(
            { moduleName: 'COMPUTER NETWORK' },
            { $set: { moduleName: 'COMPUTER NETWORKS' } }
        );
        console.log(`Notes Matched: ${result.matchedCount}, Notes Modified: ${result.modifiedCount}`);
        
    } finally {
        await client.close();
    }
}
run();
