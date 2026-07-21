const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("school_db");
        
        // Tafuta subject halisi kwenye database
        const subject = await db.collection("subjects").findOne({ name: /Object Oriented/i });
        if(subject) {
            const realId = subject._id.toString();
            console.log("✅ Umefanikiwa! ID mpya ya somo ni: ", realId);
            
            // Update maswali yote ili yatumie ID hii mpya
            const result = await db.collection("questions").updateMany(
                { subjectId: "6a5f42236716f82da1368324" }, // ID ya zamani
                { $set: { subjectId: realId } }
            );
            
            console.log(`✅ Tumefanikiwa ku-update maswali ${result.modifiedCount} kwenda kwenye somo sahihi!`);
            
            // Update yale maswali yoyote ambayo labda yaliwekwa bila ID sahihi
            const result2 = await db.collection("questions").updateMany(
                { subjectId: null, category: { $in: ["QUIZ", "EXERCISE", "POSSIBLE", "UE"] } }, 
                { $set: { subjectId: realId } }
            );
            if (result2.modifiedCount > 0) {
                 console.log(`✅ Pia tumefix maswali ${result2.modifiedCount} yaliyokuwa na subjectId null!`);
            }
        } else {
            console.log("❌ Somo halijapatikana!");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();
