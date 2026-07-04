const { MongoClient } = require('mongodb'); 
async function run() { 
    const client = new MongoClient('mongodb://127.0.0.1:27017'); 
    await client.connect(); 
    const db = client.db('school_db'); 
    await db.collection('timetables').updateMany({programType: 'DEG_CE'}, {$set: {programType: 'DEGREE'}}); 
    console.log('Updated to DEGREE'); 
    await client.close(); 
} 
run().catch(console.dir);
