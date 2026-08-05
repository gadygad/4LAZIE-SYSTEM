const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    
    const course = await db.collection('courses').findOne({ _id: new ObjectId("6a49ecb138bb37720e3e918e") });
    console.log(JSON.stringify(course, null, 2));

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
