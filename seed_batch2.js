const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197'; // Basic Data Communication

const questions = [
    // --- DIRECT QUESTIONS (Mchanganyiko) ---
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Fundamentals",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is NOT a fundamental characteristic of a data communication system?",
        options: ["Delivery", "Accuracy", "Timeliness", "Cost"],
        correctAnswer: "Cost",
        explanation: "The fundamental characteristics are Delivery, Accuracy, Timeliness, and Jitter. Cost is an economic factor, not a technical characteristic.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: OSI Model",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "Which layer of the OSI model is responsible for dialogue control and token management?",
        options: ["Session Layer", "Transport Layer", "Network Layer", "Application Layer"],
        correctAnswer: "Session Layer",
        explanation: "The Session layer establishes, maintains, and synchronizes the interaction (dialogue) between communicating systems.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Network Models",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "In the TCP/IP protocol suite, which layer is equivalent to the combined Session, Presentation, and Application layers of the OSI model?",
        options: ["Application Layer", "Transport Layer", "Internet Layer", "Network Access Layer"],
        correctAnswer: "Application Layer",
        explanation: "The TCP/IP Application layer handles the functions of the top three layers of the OSI model.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Data Link",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "What is the primary function of the Logical Link Control (LLC) sublayer?",
        options: ["Hardware addressing", "Media access", "Framing and error control", "Routing packets"],
        correctAnswer: "Framing and error control",
        explanation: "The Data Link layer is divided into LLC and MAC. LLC is responsible for framing, flow control, and error control.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Data Link",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "In a Go-Back-N ARQ protocol, if the sender's window size is 15, what is the sequence number space required?",
        options: ["15", "16", "31", "32"],
        correctAnswer: "16",
        explanation: "For Go-Back-N, the sequence number space must be at least window size + 1. So 15 + 1 = 16.",
        difficultyLevel: "HARD"
    },
    // --- FILL IN THE BLANKS ---
    {
        subjectId: subjectId,
        moduleName: "Unit 4: Network Layer",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "The _______ protocol is responsible for mapping a known IP address to an unknown MAC address.",
        options: ["RARP", "ARP", "ICMP", "IGMP"],
        correctAnswer: "ARP",
        explanation: "Address Resolution Protocol (ARP) translates logical IP addresses to physical MAC addresses.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 4: IPv4",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "An IPv4 address in Class B uses _______ bits for the network ID.",
        options: ["8", "16", "24", "32"],
        correctAnswer: "16",
        explanation: "Class B addresses use 16 bits for the network ID and 16 bits for the host ID.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 4: Routing",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "A router operates primarily at the _______ layer of the OSI model.",
        options: ["Data Link", "Network", "Transport", "Physical"],
        correctAnswer: "Network",
        explanation: "Routers forward packets across computer networks based on IP addresses, which is a Layer 3 (Network) function.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 5: Transport",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "TCP ensures reliable delivery by using a mechanism called _______.",
        options: ["Best-effort", "Three-way handshake", "Flooding", "CSMA/CA"],
        correctAnswer: "Three-way handshake",
        explanation: "TCP uses a 3-way handshake (SYN, SYN-ACK, ACK) to establish a reliable connection before data transfer.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Transmission",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "Fiber optic cables transmit data as pulses of _______.",
        options: ["Electricity", "Radio waves", "Light", "Sound"],
        correctAnswer: "Light",
        explanation: "Optical fibers carry digital data signals in the form of modulated light pulses.",
        difficultyLevel: "EASY"
    },
    // --- MORE DIRECT QUESTIONS ---
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Signals",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "If a periodic signal completes one cycle in 0.001 seconds, what is its frequency?",
        options: ["100 Hz", "1 kHz", "10 kHz", "1 MHz"],
        correctAnswer: "1 kHz",
        explanation: "Frequency (f) = 1 / Period (T). f = 1 / 0.001 = 1000 Hz or 1 kHz.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Multiple Access",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "Which collision resolution method is predominantly used in modern wireless LANs (IEEE 802.11)?",
        options: ["CSMA/CD", "CSMA/CA", "Token Passing", "Polling"],
        correctAnswer: "CSMA/CA",
        explanation: "Wireless networks cannot detect collisions easily, so they use Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA).",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 4: IP Addressing",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "What is the purpose of the loopback address (e.g., 127.0.0.1)?",
        options: ["To broadcast messages to the local network", "To test the local network interface card (NIC) and TCP/IP stack", "To configure the default gateway", "To resolve domain names"],
        correctAnswer: "To test the local network interface card (NIC) and TCP/IP stack",
        explanation: "Loopback addresses route packets back to the host machine without reaching the physical network, useful for diagnostics.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Topologies",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "Which topology offers the highest reliability and fault tolerance, but is the most expensive to implement?",
        options: ["Star topology", "Ring topology", "Bus topology", "Mesh topology"],
        correctAnswer: "Mesh topology",
        explanation: "In a fully connected mesh, every node connects to every other node, providing maximum redundancy but requiring enormous cabling.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Multiplexing",
        category: "CAT 1",
        type: "MULTIPLE_CHOICE",
        questionText: "In Time Division Multiplexing (TDM), how are multiple signals transmitted over a single channel?",
        options: ["By assigning different frequencies", "By assigning different time slots", "By using different light wavelengths", "By modulating phase differences"],
        correctAnswer: "By assigning different time slots",
        explanation: "TDM divides the channel into time slots, assigning each user a specific time slot to transmit their data.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Multiplexing",
        category: "CAT 1",
        type: "MULTIPLE_CHOICE",
        questionText: "Wavelength Division Multiplexing (WDM) is conceptually similar to _______, but applied to optical signals.",
        options: ["FDM", "TDM", "CDM", "SDM"],
        correctAnswer: "FDM",
        explanation: "WDM combines different wavelengths (frequencies of light) onto a single fiber, much like FDM does for electrical frequencies.",
        difficultyLevel: "HARD"
    },
    // --- ADD MORE ---
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Signals",
        category: "CAT 1",
        type: "MULTIPLE_CHOICE",
        questionText: "The _______ of a signal is its absolute value of its highest intensity, proportional to the energy it carries.",
        options: ["Phase", "Frequency", "Amplitude", "Wavelength"],
        correctAnswer: "Amplitude",
        explanation: "Peak amplitude is the maximum absolute value of a signal's intensity over a cycle.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Error Control",
        category: "CAT 1",
        type: "MULTIPLE_CHOICE",
        questionText: "Which error detection method involves summing all data words and taking the 1s complement of the sum?",
        options: ["Parity Check", "Cyclic Redundancy Check", "Checksum", "Hamming Code"],
        correctAnswer: "Checksum",
        explanation: "Checksum calculation sums the data segments and takes the ones' complement to generate the checksum value.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 5: Transport",
        category: "CAT 2",
        type: "MULTIPLE_CHOICE",
        questionText: "Which protocol is connectionless and does NOT guarantee delivery of packets?",
        options: ["TCP", "UDP", "FTP", "HTTP"],
        correctAnswer: "UDP",
        explanation: "User Datagram Protocol (UDP) is a connectionless, best-effort transport protocol with no reliability guarantees.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 5: Application",
        category: "CAT 2",
        type: "MULTIPLE_CHOICE",
        questionText: "What port number does HTTP use by default?",
        options: ["21", "25", "80", "443"],
        correctAnswer: "80",
        explanation: "HTTP uses port 80, while HTTPS uses port 443.",
        difficultyLevel: "EASY"
    }
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    
    // Auto-fill createdAt
    const docs = questions.map(q => ({...q, createdAt: new Date()}));
    
    let inserted = 0;
    for (const q of docs) {
        const exists = await db.collection('questions').findOne({ 
            subjectId: q.subjectId, 
            questionText: q.questionText 
        });

        if (!exists) {
            await db.collection('questions').insertOne(q);
            inserted++;
        }
    }
    
    console.log(`Batch 2 complete: Inserted ${inserted} questions.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
