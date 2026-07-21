const { MongoClient } = require('mongodb');

async function updateUser() {
    const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("school_db"); 
        const users = database.collection("users");
        
        const result = await users.updateOne(
            { email: "mindenlabs24@gmail.com" },
            { $set: { isVerified: true, verificationToken: null, tokenExpiryDate: null } }
        );
        console.log(`Updated ${result.modifiedCount} user(s).`);
    } finally {
        await client.close();
    }
}
updateUser().catch(console.dir);
