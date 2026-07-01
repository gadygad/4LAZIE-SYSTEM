const fs = require('fs');
const { MongoClient } = require('mongodb');

const MONGO_URI = "mongodb://mongo:okOeKbLeGvqLhIvbSWnYbAbaKrqfPhvi@reseau.proxy.rlwy.net:45222/school_db?authSource=admin";

async function run() {
    console.log("Reading HTML...");
    const html = fs.readFileSync('src/main/resources/templates/view_timetable.html', 'utf8');
    
    const match = html.match(/<div id="timetable-wrapper">([\s\S]*?)<button class="print-btn"/);
    if (!match) {
        console.error("Could not find timetable wrapper");
        return;
    }
    
    let tableHtml = match[1].trim();
    tableHtml += '\n        <button class="print-btn" onclick="window.print()">\n            <i class="bi bi-printer-fill" style="margin-right: 8px;"></i> Save as PDF / Print\n        </button>';
    
    console.log("Connecting to MongoDB...");
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("Connected");
    
    const db = client.db('school_db');
    const collection = db.collection('timetables');
    
    const doc = {
        programType: "COMPUTER SCIENCE AND ENGINEERING",
        levelNo: 5,
        semesterNo: 2,
        academicYear: "2025/2026",
        htmlContent: tableHtml,
        uploadDate: new Date()
    };
    
    const result = await collection.updateOne(
        {
            programType: doc.programType,
            levelNo: doc.levelNo,
            semesterNo: doc.semesterNo,
            academicYear: doc.academicYear
        },
        { $set: doc },
        { upsert: true }
    );
    
    console.log(`Inserted/Updated: ${result.modifiedCount} modified, upsertedId: ${result.upsertedId}`);
    
    await client.close();
}

run().catch(console.dir);
