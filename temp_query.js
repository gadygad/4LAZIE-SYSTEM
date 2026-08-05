const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    
    console.log("Connected to MongoDB.");
    const course = await db.collection('programs').findOne({ name: { $regex: /Diploma/i }, name: { $regex: /Computer Science/i } });
    
    // Broad search for subject
    const allSubjects = await db.collection('subjects').find({ name: { $regex: /Data Communication/i } }).toArray();
    if(allSubjects.length > 0) {
        console.log("\nFound these subjects:");
        allSubjects.forEach(s => {
            console.log(`- Name: ${s.name}, Semester: ${s.semesterNo}, Level: ${s.levelNo}, ID: ${s._id}, Program: ${s.programType}`);
        });
    } else {
        console.log("\nSubject 'Data Communication' not found.");
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
