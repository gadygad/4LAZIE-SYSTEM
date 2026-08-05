const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197'; 

const questions = [
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Data Flow",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "In a _______ communication mode, the capacity of the channel is entirely shared by one device at a time, allowing flow in both directions but not simultaneously.",
        options: ["Simplex", "Half-Duplex", "Full-Duplex", "Multiplex"],
        correctAnswer: "Half-Duplex",
        explanation: "Half-duplex allows communication in both directions, but only one device can transmit at a time. The entire channel capacity is devoted to the transmitting device.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Physical Layer",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "Which transmission medium offers the highest bandwidth and is completely immune to Electromagnetic Interference (EMI)?",
        options: ["Coaxial Cable", "Unshielded Twisted Pair (UTP)", "Fiber Optic Cable", "Shielded Twisted Pair (STP)"],
        correctAnswer: "Fiber Optic Cable",
        explanation: "Fiber optic cables use light to transmit data, making them completely immune to electrical noise (EMI) and offering vastly higher bandwidths than copper cables.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Error Detection",
        category: "CAT 1",
        type: "MULTIPLE_CHOICE",
        questionText: "The simplest error detection technique that appends a single bit to a data unit so that the total number of 1s becomes even or odd is called _______.",
        options: ["Cyclic Redundancy Check (CRC)", "Checksum", "Parity Check", "Hamming Code"],
        correctAnswer: "Parity Check",
        explanation: "A parity check adds one bit (the parity bit) to a block of data to ensure the total number of 1-bits is either even or odd, detecting single-bit errors.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Data Link Layer",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "In the OSI model, the Data Link Layer is divided into two sublayers: the Logical Link Control (LLC) sublayer and the _______ sublayer.",
        options: ["Network Access Control (NAC)", "Media Access Control (MAC)", "Physical Link Control (PLC)", "Data Access Control (DAC)"],
        correctAnswer: "Media Access Control (MAC)",
        explanation: "The Data Link layer consists of the upper LLC sublayer (for multiplexing and flow control) and the lower MAC sublayer (for hardware addressing and media access).",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 4: Network Layer",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "Which IPv4 address class is specifically reserved for multicasting purposes and cannot be assigned to individual hosts?",
        options: ["Class A", "Class B", "Class C", "Class D"],
        correctAnswer: "Class D",
        explanation: "Class D addresses (224.0.0.0 to 239.255.255.255) are strictly reserved for multicast groups.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 5: Transport Layer",
        category: "CAT 2",
        type: "MULTIPLE_CHOICE",
        questionText: "Transmission Control Protocol (TCP) is a connection-oriented protocol that ensures reliability using a mechanism known as _______.",
        options: ["Positive Acknowledgement with Retransmission", "Carrier Sense Multiple Access", "Token Passing", "Sliding Window Protocol"],
        correctAnswer: "Positive Acknowledgement with Retransmission",
        explanation: "TCP uses Positive Acknowledgement with Retransmission (PAR) where the receiver sends ACKs, and the sender retransmits if an ACK is not received before a timeout.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Network Topologies",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "If a network has 6 devices connected in a fully-connected Mesh topology, how many physical communication channels (links) are required?",
        options: ["6", "12", "15", "30"],
        correctAnswer: "15",
        explanation: "The formula for the number of links in a full mesh is n(n-1)/2. For 6 devices: 6(5)/2 = 15 links.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Multiple Access",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "In CSMA/CD, what does a station do immediately after it detects a collision on the network medium?",
        options: ["It retransmits the frame immediately", "It sends a jamming signal and backs off", "It drops the frame permanently", "It increases its transmission power"],
        correctAnswer: "It sends a jamming signal and backs off",
        explanation: "When a collision is detected in CSMA/CD, the station aborts transmission, sends a jam signal to notify others, and waits a random backoff time before retrying.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 4: Subnetting",
        category: "CAT 2",
        type: "MULTIPLE_CHOICE",
        questionText: "A subnet mask of _______ in CIDR notation is equivalent to 255.255.255.192.",
        options: ["/24", "/25", "/26", "/27"],
        correctAnswer: "/26",
        explanation: "255.255.255.192 means the first 24 bits are 1s, plus the first 2 bits of the last octet (128+64=192). 24 + 2 = 26.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Fundamentals",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "The _______ is the physical or logical arrangement of links and nodes in a computer network.",
        options: ["Protocol", "Topology", "Architecture", "Routing Table"],
        correctAnswer: "Topology",
        explanation: "Network topology defines the structural layout of a network (e.g., Star, Bus, Ring).",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 2: Modulation",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "In Amplitude Shift Keying (ASK), the _______ of the carrier signal is varied to represent binary data (0s and 1s).",
        options: ["Phase", "Frequency", "Amplitude", "Wavelength"],
        correctAnswer: "Amplitude",
        explanation: "In ASK, the amplitude (voltage level) of the carrier wave is changed to represent binary 1 and binary 0, while frequency and phase remain constant.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 4: Routing protocols",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "Which of the following routing protocols uses the Distance Vector algorithm and uses 'hop count' as its primary metric?",
        options: ["OSPF", "BGP", "RIP", "IS-IS"],
        correctAnswer: "RIP",
        explanation: "Routing Information Protocol (RIP) is a distance-vector protocol that measures the best path by the number of hops (routers) to the destination.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 3: Framing",
        category: "CAT 1",
        type: "MULTIPLE_CHOICE",
        questionText: "To prevent a special flag sequence from appearing accidentally in the payload of a frame, a technique called _______ is used.",
        options: ["Bit stuffing", "Error correcting", "Frame padding", "Signal jamming"],
        correctAnswer: "Bit stuffing",
        explanation: "Bit stuffing is the process of adding an extra 0 bit whenever there are five consecutive 1s in the data, ensuring the flag sequence (01111110) doesn't appear by mistake.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 1: Network Types",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "A network that connects computers within a very close geographic area, such as a single office building, is called a _______.",
        options: ["WAN", "MAN", "LAN", "PAN"],
        correctAnswer: "LAN",
        explanation: "A Local Area Network (LAN) is designed to cover a small physical area, like an office, school, or home.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Unit 5: Application Layer",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "The _______ protocol is responsible for resolving human-readable domain names (like www.google.com) into IP addresses.",
        options: ["DHCP", "DNS", "FTP", "HTTP"],
        correctAnswer: "DNS",
        explanation: "The Domain Name System (DNS) acts as the phonebook of the internet, translating hostnames into IP addresses.",
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
    
    console.log(`Handcrafted Batch 5 complete: Inserted ${inserted} questions.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
