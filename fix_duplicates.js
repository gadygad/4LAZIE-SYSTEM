const { MongoClient } = require('mongodb');
const MONGO_URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function fixDuplicates() {
    const client = new MongoClient(MONGO_URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const timetables = db.collection('timetables');
        
        // Find duplicates
        const docs = await timetables.find({ programType: "DEG_CE", levelNo: 4, semesterNo: 1 }).toArray();
        if (docs.length > 1) {
            console.log(`Found ${docs.length} duplicates. Deleting the oldest ones...`);
            // Sort by _id or creation time, keep the newest one
            const toDelete = docs.slice(0, docs.length - 1).map(d => d._id);
            await timetables.deleteMany({ _id: { $in: toDelete } });
            console.log("Deleted old duplicates successfully.");
        } else {
            console.log("No duplicates found.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
fixDuplicates();
