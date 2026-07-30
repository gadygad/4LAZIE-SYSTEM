const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function checkSubject() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const subjects = await db.collection('subjects').find({
            name: { $regex: /computer network/i }
        }).toArray();
        console.log("Subjects found:");
        console.log(JSON.stringify(subjects, null, 2));
    } finally {
        await client.close();
    }
}
checkSubject().catch(console.error);
