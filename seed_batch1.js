const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197'; // Basic Data Communication

const questions = [
    // --- EASY (QUIZ) ---
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Intro",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "The physical pathway over which a message travels is called a _______.",
        options: ["Protocol", "Medium", "Signal", "Node"],
        correctAnswer: "Medium",
        explanation: "The transmission medium is the physical path by which a message travels from sender to receiver.",
        difficultyLevel: "EASY",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Intro",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "In a _______ connection, more than two devices can share a single link.",
        options: ["Point-to-point", "Multipoint", "Unipoint", "Primary"],
        correctAnswer: "Multipoint",
        explanation: "Multipoint (or multidrop) connection is one in which more than two specific devices share a single link.",
        difficultyLevel: "EASY",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Network Topologies",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "A _______ topology requires a central controller or hub to function.",
        options: ["Mesh", "Star", "Bus", "Ring"],
        correctAnswer: "Star",
        explanation: "In a star topology, each device has a dedicated point-to-point link only to a central controller, usually called a hub.",
        difficultyLevel: "EASY",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Models",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "The OSI model consists of _______ layers.",
        options: ["Five", "Six", "Seven", "Eight"],
        correctAnswer: "Seven",
        explanation: "The Open Systems Interconnection (OSI) model is made up of seven layers.",
        difficultyLevel: "EASY",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Data Link",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "Error detection at the data link layer is achieved by adding a _______ to the end of the frame.",
        options: ["Header", "Trailer", "Payload", "Preamble"],
        correctAnswer: "Trailer",
        explanation: "The data link layer adds a trailer to the frame which contains error detection bits (like FCS/CRC).",
        difficultyLevel: "EASY",
        createdAt: new Date()
    },

    // --- MEDIUM (QUIZ) ---
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Intro",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "Data flow between two devices can occur in both directions, but not at the same time in a _______ transmission mode.",
        options: ["Simplex", "Half-duplex", "Full-duplex", "Auto-duplex"],
        correctAnswer: "Half-duplex",
        explanation: "In half-duplex mode, each station can both transmit and receive, but not at the same time. Walkie-talkies use this mode.",
        difficultyLevel: "MEDIUM",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Data Link",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "Which multiple access technique requires stations to listen to the medium before transmitting to avoid collisions?",
        options: ["ALOHA", "CSMA", "CDMA", "TDMA"],
        correctAnswer: "CSMA",
        explanation: "Carrier Sense Multiple Access (CSMA) requires each station to first listen to the medium (carrier sense) before transmitting.",
        difficultyLevel: "MEDIUM",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 4: Network Layer",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "An IPv4 address consists of exactly _______ bits.",
        options: ["16", "32", "64", "128"],
        correctAnswer: "32",
        explanation: "An IPv4 address is 32 bits long, usually represented in dotted-decimal format.",
        difficultyLevel: "MEDIUM",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 4: Network Layer",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "The process of discovering the optimal path for data packets across a network is known as _______.",
        options: ["Switching", "Routing", "Bridging", "Flooding"],
        correctAnswer: "Routing",
        explanation: "Routing is the process performed by layer 3 devices (routers) to determine the best path for packets to reach their destination.",
        difficultyLevel: "MEDIUM",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Data Link",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "In the Stop-and-Wait ARQ protocol, the sender must receive an _______ before sending the next frame.",
        options: ["Interrupt", "Acknowledgement", "Error code", "Request"],
        correctAnswer: "Acknowledgement",
        explanation: "Stop-and-Wait ARQ requires the sender to wait for an Acknowledgement (ACK) from the receiver before transmitting the next frame.",
        difficultyLevel: "MEDIUM",
        createdAt: new Date()
    },

    // --- HARD (QUIZ) ---
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Signals",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "According to Nyquist theorem, to reproduce the original analog signal, the sampling rate must be at least _______ the highest frequency.",
        options: ["Equal to", "Twice", "Three times", "Half of"],
        correctAnswer: "Twice",
        explanation: "Nyquist theorem states that the sampling rate must be at least 2 times the highest frequency contained in the signal.",
        difficultyLevel: "HARD",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Error Detection",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "In CRC, if the dataword is 101001111 and the divisor is 10111, how many bits will the remainder (CRC appended to data) have?",
        options: ["2 bits", "3 bits", "4 bits", "5 bits"],
        correctAnswer: "4 bits",
        explanation: "The remainder in CRC is always one bit less than the divisor. Divisor length is 5 bits, so CRC is 4 bits.",
        difficultyLevel: "HARD",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 4: Subnetting",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "A class C network has a default subnet mask of _______.",
        options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"],
        correctAnswer: "255.255.255.0",
        explanation: "Class C networks dedicate the first three octets to the network ID, making the default mask 255.255.255.0.",
        difficultyLevel: "HARD",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: MAC",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "In standard Ethernet (10BaseT), the maximum frame size (including header and trailer) is _______ bytes.",
        options: ["64", "512", "1500", "1518"],
        correctAnswer: "1518",
        explanation: "Standard Ethernet frames have a minimum size of 64 bytes and a maximum size of 1518 bytes.",
        difficultyLevel: "HARD",
        createdAt: new Date()
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Transmission",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "Which modulation technique modifies both the amplitude and the phase of the carrier signal simultaneously?",
        options: ["QAM", "FSK", "PSK", "ASK"],
        correctAnswer: "QAM",
        explanation: "Quadrature Amplitude Modulation (QAM) is a combination of Amplitude Shift Keying (ASK) and Phase Shift Keying (PSK).",
        difficultyLevel: "HARD",
        createdAt: new Date()
    }
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    
    console.log("Connected to MongoDB.");

    let inserted = 0;
    for (const q of questions) {
        // Prevent duplication based on questionText
        const exists = await db.collection('questions').findOne({ 
            subjectId: q.subjectId, 
            questionText: q.questionText 
        });

        if (!exists) {
            await db.collection('questions').insertOne(q);
            inserted++;
        }
    }
    
    console.log(`Successfully inserted ${inserted} new questions out of ${questions.length}. Duplicates skipped.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
