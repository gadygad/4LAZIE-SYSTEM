const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("school_db");
        const questionsCollection = db.collection("questions");
        
        const questions = await questionsCollection.find({ 
            $or: [ 
                { difficultyLevel: { $exists: false } }, 
                { difficultyLevel: null }, 
                { difficultyLevel: "" } 
            ] 
        }).toArray();
        
        let easyCount = 0, mediumCount = 0, hardCount = 0;
        
        for (let i = 0; i < questions.length; i++) {
            let diff;
            if (i % 3 === 0) { diff = "EASY"; easyCount++; }
            else if (i % 3 === 1) { diff = "MEDIUM"; mediumCount++; }
            else { diff = "HARD"; hardCount++; }
            
            await questionsCollection.updateOne({ _id: questions[i]._id }, { $set: { difficultyLevel: diff } });
        }
        
        console.log(`✨ UCHAWI UMEKUBALI KWA KIWANGO CHA JUU SANA!`);
        console.log(`Tumefanikiwa kugawanya maswali ${questions.length} kwenye database.`);
        console.log(`EASY: ${easyCount}, MEDIUM: ${mediumCount}, HARD: ${hardCount}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();
