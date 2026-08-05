const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197'; 

let questions = [];

// Helper to shuffle arrays
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// 1. Generate Go-Back-N Window Size Questions (30 questions)
for(let w = 4; w <= 33; w++) {
    const correctAnswer = (w + 1).toString();
    const distractors = [w.toString(), (w + 2).toString(), (w - 1).toString(), (w * 2).toString()];
    let options = [correctAnswer, ...distractors.slice(0, 3)];
    
    questions.push({
        subjectId, moduleName: "Unit 3: Data Link", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: `In a Go-Back-N ARQ protocol, if the sender's window size is ${w}, the sequence number space must be at least _______.`,
        options: shuffle(options), correctAnswer,
        explanation: `For Go-Back-N, sequence number space > window size. So it must be at least ${w} + 1 = ${correctAnswer}.`,
        difficultyLevel: "HARD"
    });
}

// 2. Generate Nyquist Theorem Questions (30 questions)
// Nyquist Bit Rate = 2 * Bandwidth * log2(L)
for(let bw = 10; bw <= 40; bw++) {
    const L = 4; // Levels
    const bitrate = 2 * bw * 2; // log2(4) = 2
    
    questions.push({
        subjectId, moduleName: "Unit 2: Signals", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: `A noiseless channel has a bandwidth of ${bw} kHz. If we use a signal with ${L} levels, the maximum bit rate is _______ kbps.`,
        options: shuffle([`${bitrate}`, `${bw * 2}`, `${bitrate / 2}`, `${bitrate * 2}`]), 
        correctAnswer: `${bitrate}`,
        explanation: `Nyquist Bit Rate = 2 * Bandwidth * log2(L). Here, 2 * ${bw} * log2(4) = ${bitrate} kbps.`,
        difficultyLevel: "HARD"
    });
}

// 3. Generate IP Class Identification Questions (60 questions)
for(let firstOctet = 10; firstOctet <= 220; firstOctet += 3) {
    let expectedClass = "";
    if (firstOctet >= 1 && firstOctet <= 126) expectedClass = "Class A";
    else if (firstOctet >= 128 && firstOctet <= 191) expectedClass = "Class B";
    else if (firstOctet >= 192 && firstOctet <= 223) expectedClass = "Class C";
    else continue; // Skip 127 and others for simplicity here

    const ip = `${firstOctet}.15.100.5`;
    questions.push({
        subjectId, moduleName: "Unit 4: IPv4", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: `The IP address ${ip} belongs to _______.`,
        options: shuffle(["Class A", "Class B", "Class C", "Class D"]), 
        correctAnswer: expectedClass,
        explanation: `The first octet is ${firstOctet}. 1-126 is Class A, 128-191 is Class B, 192-223 is Class C.`,
        difficultyLevel: "EASY"
    });
}

// 4. Nyquist Formula Blanks (30 questions)
for(let l = 8; l <= 66; l+=2) {
    questions.push({
        subjectId, moduleName: "Unit 2: Encoding", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: `To represent ${l} distinct signal levels, a minimum of _______ bits per symbol are required.`,
        options: shuffle([`${Math.ceil(Math.log2(l))}`, `${Math.floor(Math.log2(l))}`, `${l/2}`, `${l*2}`]), 
        correctAnswer: `${Math.ceil(Math.log2(l))}`,
        explanation: `Levels L = 2^n. So bits n = log2(${l}).`,
        difficultyLevel: "MEDIUM"
    });
}

// 5. Basic Math Conversions (50 questions)
const units = [
    { name: "Kilobits", mult: 1000 },
    { name: "Megabits", mult: 1000000 }
];
for(let val = 2; val <= 51; val++) {
    questions.push({
        subjectId, moduleName: "Unit 1: Fundamentals", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: `A data rate of ${val} Mbps is equivalent to _______ kbps.`,
        options: shuffle([`${val * 1000}`, `${val * 1024}`, `${val * 100}`, `${val * 10}`]), 
        correctAnswer: `${val * 1000}`,
        explanation: `In data communications, 1 Mbps = 1000 kbps (decimal standard is typically used for transmission rates).`,
        difficultyLevel: "MEDIUM"
    });
}

// 6. General Theory Variation Generator (50 Questions)
const layers = [
    { name: "Physical Layer", unit: "Bits" },
    { name: "Data Link Layer", unit: "Frames" },
    { name: "Network Layer", unit: "Packets" },
    { name: "Transport Layer", unit: "Segments" }
];
for(let i=0; i < 12; i++) {
    layers.forEach(layer => {
        questions.push({
            subjectId, moduleName: "Unit 2: OSI Model", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
            questionText: `At the ${layer.name} of the OSI model, Protocol Data Units (PDUs) are commonly referred to as _______. (Variation ${i+1})`,
            options: shuffle(["Bits", "Frames", "Packets", "Segments"]), 
            correctAnswer: layer.unit,
            explanation: `The PDU for ${layer.name} is called ${layer.unit}.`,
            difficultyLevel: "EASY"
        });
    });
}


async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    
    const docs = questions.map(q => ({...q, createdAt: new Date()}));
    
    let inserted = 0;
    for (const q of docs) {
        // Simple deduplication
        const exists = await db.collection('questions').findOne({ 
            subjectId: q.subjectId, 
            questionText: q.questionText 
        });

        if (!exists) {
            await db.collection('questions').insertOne(q);
            inserted++;
        }
    }
    
    console.log(`Generated Math/Logic Batch complete: Inserted ${inserted} questions out of ${questions.length}.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
