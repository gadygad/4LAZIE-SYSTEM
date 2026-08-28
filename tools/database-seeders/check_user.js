const { MongoClient } = require('mongodb');

async function checkUser() {
    const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const database = client.db("school_db"); 
        const users = database.collection("users");
        
        // Find the most recently created user
        const recentUser = await users.find().sort({dateJoined: -1}).limit(1).toArray();
        if (recentUser.length > 0) {
            console.log("Most recent user:");
            console.log(JSON.stringify(recentUser[0], null, 2));
        } else {
            console.log("No users found.");
        }
        
    } finally {
        await client.close();
    }
}
checkUser().catch(console.dir);
