const { MongoClient } = require('mongodb');

async function fixTimetable() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('school_db'); 
        const coll = db.collection('timetables');
        
        let timetables = await coll.find({ programType: "DEG_CE" }).toArray();
        for (let t of timetables) {
            let html = t.htmlContent;
            html = html.replace(/text-orientation: upright; writing-mode: vertical-rl;/g, "line-height: 1.5; text-align: center;");
            html = html.replace('L<br>U<br>N<br>C<br>H</th>', 'L<br>U<br>N<br>C<br>H<br><br>B<br>R<br>E<br>A<br>K</th>');
            
            await coll.updateOne({ _id: t._id }, { $set: { htmlContent: html } });
        }
        console.log(`Updated ${timetables.length} timetables.`);
    } finally {
        await client.close();
    }
}

fixTimetable().catch(console.error);
