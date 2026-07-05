const { MongoClient, ObjectId } = require('mongodb');

// Get the URI from application.properties or default local
const MONGO_URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function seedData() {
    console.log("Connecting to MongoDB Atlas...");
    const client = new MongoClient(MONGO_URI);
    
    try {
        await client.connect();
        console.log("Connected successfully!");
        
        const db = client.db('school_db');
        const notesCollection = db.collection('notes');
        
        console.log("Clearing old dummy notes...");
        await notesCollection.deleteMany({ isDummy: true });
        
        const dummyNotes = [
            {
                title: "Introduction to Java Programming",
                moduleName: "CS101",
                programType: "COMPUTER SCIENCE AND ENGINEERING",
                levelNo: 4,
                semesterNo: 1,
                academicYear: "2025/2026",
                category: "Note",
                fileUrl: "dummy_java.pdf",
                isPublic: true,
                uploadDate: new Date(),
                viewCount: 150,
                downloadCount: 45,
                isDummy: true
            },
            {
                title: "Data Structures & Algorithms - Final CAT",
                moduleName: "CS102",
                programType: "COMPUTER SCIENCE AND ENGINEERING",
                levelNo: 5,
                semesterNo: 1,
                academicYear: "2025/2026",
                category: "Past Paper",
                fileUrl: "dummy_dsa_cat.pdf",
                isPublic: true,
                uploadDate: new Date(),
                viewCount: 300,
                downloadCount: 120,
                isDummy: true
            },
            {
                title: "Network Security Configuration Lab",
                moduleName: "IT204",
                programType: "INFORMATION TECHNOLOGY",
                levelNo: 6,
                semesterNo: 2,
                academicYear: "2025/2026",
                category: "Assignment",
                fileUrl: "dummy_lab.pdf",
                isPublic: true,
                uploadDate: new Date(),
                viewCount: 50,
                downloadCount: 10,
                isDummy: true
            },
            {
                title: "Calculus I Lecture 1-4",
                moduleName: "MT101",
                programType: "COMPUTER SCIENCE AND ENGINEERING",
                levelNo: 4,
                semesterNo: 1,
                academicYear: "2025/2026",
                category: "Note",
                fileUrl: "dummy_calc.pdf",
                isPublic: true,
                uploadDate: new Date(Date.now() - 86400000), // yesterday
                viewCount: 220,
                downloadCount: 80,
                isDummy: true
            },
            {
                title: "Software Engineering Methodology UE",
                moduleName: "SE301",
                programType: "SOFTWARE ENGINEERING",
                levelNo: 6,
                semesterNo: 2,
                academicYear: "2024/2025",
                category: "Past Paper",
                fileUrl: "dummy_se_ue.pdf",
                isPublic: true,
                uploadDate: new Date(Date.now() - 172800000), // 2 days ago
                viewCount: 500,
                downloadCount: 300,
                isDummy: true
            }
        ];
        
        console.log("Inserting dummy notes...");
        const result = await notesCollection.insertMany(dummyNotes);
        console.log(`Inserted ${result.insertedCount} documents!`);
        
    } catch (err) {
        console.error("Error during seeding:", err);
    } finally {
        await client.close();
        console.log("Connection closed.");
    }
}

seedData();
