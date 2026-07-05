const { MongoClient } = require('mongodb');
const fs = require('fs');

async function updateTimetable() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('school_db');
        const coll = db.collection('timetables');
        
        let html = fs.readFileSync('update_tt_theme2.js', 'utf8').split('const html = `')[1].split('`;')[0];
        html = html
            .replace(/<\/?thead>/g, '')
            .replace(/<\/?tbody>/g, '')
            .replace(/<th rowspan="7" style="border: 1px solid #000; background: #a3a3a3;/g, '<th rowspan="7" style="border: 1px solid #000; background: #e5e7eb;');
        
        await coll.updateMany({ programType: "DEG_CE", levelNo: 3, semesterNo: 2 }, { $set: { htmlContent: html } });
        console.log(`Updated timetables Year 3 Sem 2.`);
    } finally {
        await client.close();
    }
}
updateTimetable().catch(console.error);
