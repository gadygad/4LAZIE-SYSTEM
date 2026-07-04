const { MongoClient } = require('mongodb'); 
async function run() { 
    const client = new MongoClient('mongodb://127.0.0.1:27017'); 
    await client.connect(); 
    const db = client.db('school_db'); 
    
    // Find the DIP_ME course
    const course = await db.collection('courses').findOne({ programType: 'DIP_ME' });
    if (!course) {
        console.log('ERROR: DIP_ME course not found!');
        await client.close();
        return;
    }
    console.log('Found course:', course.name, course._id);

    const subjects = [
        "INTRODUCTION TO WELDING AND FOUNDRY TECHNOLOGIES",
        "MACHINE COMPONENT PRODUCTION",
        "FLUID MECHANICS AND FLUID POWER",
        "APPLIED THERMODYNAMICS",
        "METAL CUTTING PROCESSES",
        "INDUSTRIAL PRACTICAL TRAINING II"
    ];

    for (const name of subjects) {
        const existing = await db.collection('subjects').findOne({
            'course.$id': course._id,
            levelNo: 5,
            semesterNo: 2,
            name: name
        });
        if (!existing) {
            await db.collection('subjects').insertOne({
                name: name,
                code: "",
                semesterNo: 2,
                levelNo: 5,
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
