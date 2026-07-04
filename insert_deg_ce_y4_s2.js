const { MongoClient, ObjectId } = require('mongodb'); 
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
        "ENTREPRENEURSHIP DEVELOPMENT (T)",
        "TECHNICAL SEMINAR (P)",
        "CONSTRUCTION TECHNIQUES,EQUIPMENT & PRACTICE (T)",
        "BRIDGE ENGINEERING (T)",
        "PROJECT PHASE II (P)"
    ];

    for (const name of subjects) {
        const existing = await db.collection('subjects').findOne({
            'course.$id': course._id,
            levelNo: 4,
            semesterNo: 2,
            name: name
        });
        if (!existing) {
            await db.collection('subjects').insertOne({
                name: name,
                code: "",
                semesterNo: 2,
                levelNo: 4,
                course: { "$ref": "courses", "$id": course._id },
                _class: "com.school.model.Subject"
            });
            console.log('Inserted:', name);
        } else {
            console.log('Already exists:', name);
        }
    }

    // Verify
    const all = await db.collection('subjects').find({
        'course.$id': course._id,
        levelNo: 4,
        semesterNo: 2
    }).toArray();
    console.log('Total subjects for DEG_CE Year 4 Sem 2:', all.length);
    console.log(all.map(s => s.name));

    await client.close();
} 
run().catch(console.dir);
