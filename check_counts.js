const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de';

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('school_db');
        
        const pipeline = [
            { $match: { subjectId: subjectId } },
            { $group: { _id: "$category", count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ];
        
        const results = await db.collection('questions').aggregate(pipeline).toArray();
        let total = 0;
        
        console.log("BREAKDOWN BY CATEGORY:");
        for (let r of results) {
            console.log(`- ${r._id}: ${r.count} maswali`);
            total += r.count;
        }
        console.log(`\nTOTAL QUESTIONS FOR COURSE: ${total}`);
        
    } finally {
        await client.close();
    }
}
run();
