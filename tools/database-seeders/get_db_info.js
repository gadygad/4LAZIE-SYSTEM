const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const courses = await db.collection('courses').find().toArray();
        console.log("=== COURSES ===");
        courses.forEach(c => console.log(`Course: ${c.name}, ID: ${c._id}, Semesters: ${c.semesters}`));
        
        const subjects = await db.collection('subjects').find().toArray();
        console.log("\n=== SUBJECTS ===");
        subjects.forEach(s => console.log(`Subject: ${s.name}, ID: ${s._id}, CourseID: ${s.courseId}, Semester: ${s.semester}`));
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();
