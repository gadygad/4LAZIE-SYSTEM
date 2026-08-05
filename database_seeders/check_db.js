const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_test_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('school_test_db');

    console.log("--- INSTITUTIONS ---");
    const insts = await db.collection('institutions').find().toArray();
    console.log(JSON.stringify(insts, null, 2));

    console.log("\n--- USERS (Sample of 3) ---");
    const users = await db.collection('users').find().limit(3).toArray();
    for (let u of users) {
        console.log(`User: ${u.email} | Role: ${u.role} | Institution:`, u.institution);
    }

    console.log("\n--- NOTES (Sample of 3) ---");
    const notes = await db.collection('notes').find().limit(3).toArray();
    for (let n of notes) {
        console.log(`Note: ${n.title} | Public: ${n.isPublic} | Institution:`, n.institution);
    }

    console.log("\n--- TIMETABLES (Sample of 3) ---");
    const tts = await db.collection('timetables').find().limit(3).toArray();
    for (let t of tts) {
        console.log(`Timetable: ${t.programType} Level ${t.levelNo} Sem ${t.semesterNo}`);
    }

  } finally {
    await client.close();
  }
}
run().catch(console.dir);
