const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        
        console.log("=== COURSE DETAILS ===");
        const course = await db.collection('courses').findOne({ name: "DIPLOMA IN COMPUTER SCIENCE ENGINEERING" });
        console.log(JSON.stringify(course, null, 2));
        
        console.log("\n=== SUBJECT DETAILS ===");
        const subj1 = await db.collection('subjects').findOne({ name: "COMPUTER ARCHITECTURE AND ASSEMBLY PROGRAMMING LANGUAGE" });
        console.log("Subj 1:", JSON.stringify(subj1, null, 2));
        
        const subj2 = await db.collection('subjects').findOne({ name: "COMPUTER ARCHITECTURE" });
        console.log("\nSubj 2:", JSON.stringify(subj2, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();
