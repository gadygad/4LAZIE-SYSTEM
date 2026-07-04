const { MongoClient } = require('mongodb'); 
async function run() { 
    const client = new MongoClient('mongodb://127.0.0.1:27017'); 
    await client.connect(); 
    const db = client.db('school_db'); 
    
    // Find the DEG_CE course
    const course = await db.collection('courses').findOne({ programType: 'DEG_CE' });
    if (!course) {
        console.log('ERROR: DEG_CE course not found!');
        await client.close();
        return;
    }
    console.log('Found course:', course.name, course._id);

    const subjects = [
        "PRINCIPLES OF MANAGEMENT AND PROFFESIONAL ETHICS (T)",
        "QUANTITY SURVEYING AND VALUATION (T)",
        "REPAIR AND REHABILITATION OF STRUCTURES (T)",
        "ENVIRONMENTAL IMPACT ASSESSMENT (T)",
        "COMPUTER AIDED STRUCTURAL ANALYSIS LAB (P)",
        "PROJECT WORK PHASE I AND VIVA VOICE (P)"
    ];

    for (const name of subjects) {
        const existing = await db.collection('subjects').findOne({
            'course.$id': course._id,
            levelNo: 4,
            semesterNo: 1,
            name: name
        });
        if (!existing) {
            await db.collection('subjects').insertOne({
                name: name,
                code: "",
                semesterNo: 1,
                levelNo: 4,
                course: { "$ref": "courses", "$id": course._id },
                _class: "com.school.model.Subject"
            });
            console.log('Inserted:', name);
        } else {
            console.log('Already exists:', name);
        }
    }

    await client.close();
} 
run().catch(console.dir);
