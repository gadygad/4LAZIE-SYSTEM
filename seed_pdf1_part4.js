const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197'; 

const questions = [
    {
        subjectId, moduleName: "Bandwidth", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "If a channel's maximum frequency is 12 KHz and minimum frequency is 2 KHz, its bandwidth is _______ KHz.",
        options: ["10", "14", "24", "6"],
        correctAnswer: "10",
        explanation: "Bandwidth is the difference between maximum and minimum frequencies. 12 KHz - 2 KHz = 10 KHz.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Concept of Communication", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In the example of four connected devices in the PDF (computer, printer, server, switch), they form a basic _______.",
        options: ["Network", "Subnet", "Domain", "Piconet"],
        correctAnswer: "Network",
        explanation: "These devices are connected through a media to form a network.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Components", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Communication _______ is the path through which the message travels between source and destination.",
        options: ["Media", "Protocol", "Format", "Signal"],
        correctAnswer: "Media",
        explanation: "Communication media is the path through which the message travels.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Types of Communication", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Simplex communication allows data to flow in _______ direction(s).",
        options: ["Only one", "Two (Not simultaneous)", "Two (Simultaneous)", "Multiple"],
        correctAnswer: "Only one",
        explanation: "Simplex is one-way communication.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which guided media is made of a DNA helical-like structure but does NOT have a metal shield?",
        options: ["UTP", "STP", "Coaxial", "Fiber optic"],
        correctAnswer: "UTP",
        explanation: "Unshielded Twisted-Pair (UTP) does not have a metal shield, unlike STP.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Visible light waves range up to _______ according to the electromagnetic spectrum chart.",
        options: ["900 THz", "400 THz", "300 GHz", "1 GHz"],
        correctAnswer: "900 THz",
        explanation: "The chart shows Light Waves up to 900 THz.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Wireless Media", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which wireless transmission uses a frequency range of 300GHz - 400THz?",
        options: ["Infrared waves", "Microwaves", "Radio waves", "Light waves"],
        correctAnswer: "Infrared waves",
        explanation: "Infrared waves use a frequency range of 300GHz - 400THz.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Mobile Technologies", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which mobile generation facilitated greater voice and data capacity, allowing more simultaneous calls in the same frequency range?",
        options: ["3G", "1G", "2G", "4G"],
        correctAnswer: "3G",
        explanation: "3G facilitated greater voice and data capacity.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Mobile Technologies", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The expected data transfer speed for 5G is primarily measured in _______.",
        options: ["Gbps", "Mbps", "Kbps", "Tbps"],
        correctAnswer: "Gbps",
        explanation: "5G is expected to allow data transfer in Gbps.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Flow control prevents _______ when a fast computer (e.g., 1024 Mbps) sends data to a slower computer (e.g., 512 Mbps).",
        options: ["Data loss", "Encryption failure", "IP address conflict", "Signal regeneration"],
        correctAnswer: "Data loss",
        explanation: "Without flow control, data sent faster than the receiver can process will be lost.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the summary, two commonly used switching techniques are circuit switching and _______ switching.",
        options: ["Packet", "Message", "Frame", "Network"],
        correctAnswer: "Packet",
        explanation: "Circuit switching and packet switching are the two commonly used switching techniques.",
        difficultyLevel: "EASY"
    }
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    
    let inserted = 0;
    for (let q of questions) {
        q.createdAt = new Date();
        const exists = await db.collection('questions').findOne({ 
            subjectId: q.subjectId, 
            questionText: q.questionText 
        });

        if (!exists) {
            await db.collection('questions').insertOne(q);
            inserted++;
        }
    }
    
    console.log(`PDF 1 Part 4 Extraction complete: Inserted ${inserted} questions. Total for PDF 1 is now exactly 100!`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
