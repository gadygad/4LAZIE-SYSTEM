const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 2: Addressing & Routing Design";

const questions = [
    // --- Detailed OSPF & EIGRP ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "In OSPF, when two routers have established 'Bidirectional communication' but have not yet begun the database exchange, what Neighbor State are they in?",
        options: [
            "Init State",
            "2-Way State",
            "ExStart State",
            "Exchange State"
        ],
        correctAnswer: "2-Way State",
        explanation: "In OSPF, '2-Way' means bidirectional communication is established (routers see each other's Hello packets). ExStart is when the database exchange begins."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which of the following describes the specific metric calculation formula used by EIGRP?",
        options: [
            "Metric = Hop Count * 15",
            "Cost = Reference Bandwidth / Interface Bandwidth",
            "Metric = (Bandwidth + Delay) x 256",
            "Cost = (Path Vector + Reliability) / 128"
        ],
        correctAnswer: "Metric = (Bandwidth + Delay) x 256",
        explanation: "EIGRP uses a composite metric primarily based on Bandwidth and Delay, which is mathematically multiplied by 256."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What specific type of OSPF packet is used exclusively to 'Discover neighbors'?",
        options: [
            "LSR (Link-State Request)",
            "LSU (Link-State Update)",
            "Hello Packet",
            "DBD (Database Description)"
        ],
        correctAnswer: "Hello Packet",
        explanation: "OSPF uses Hello packets to discover neighbors and maintain neighbor relationships."
    },

    // --- IPv4 Classes & VLSM ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "An organization is assigned an IPv4 address range that begins with 224.x.x.x. What is the intended usage of this specific address class?",
        options: [
            "Large enterprise networks (Class A).",
            "Small business networks (Class C).",
            "Group communication / Multicast (Class D).",
            "Experimental Research (Class E)."
        ],
        correctAnswer: "Group communication / Multicast (Class D).",
        explanation: "Class D addresses (224-239) are reserved exclusively for Multicasting (group communication)."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Which of the following is a primary disadvantage of using Fixed Length Subnet Mask (FLSM) over Variable Length Subnet Mask (VLSM)?",
        options: [
            "FLSM is incredibly complex to implement on Cisco routers.",
            "FLSM results in less efficient IP usage because all subnets must be the exact same size.",
            "FLSM prevents the use of IPv4 addresses entirely.",
            "FLSM automatically forces all traffic into a single broadcast domain."
        ],
        correctAnswer: "FLSM results in less efficient IP usage because all subnets must be the exact same size.",
        explanation: "In FLSM, every subnet uses the same mask, which wastes IPs if one subnet needs 100 hosts and another only needs 2. VLSM solves this by allowing different subnet sizes."
    },

    // --- Routing Types & Deep Cuts ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "What is a recognized disadvantage of Dynamic Routing compared to Static Routing?",
        options: [
            "It cannot automatically update when a link fails.",
            "It provides zero fault tolerance in the network.",
            "It uses more CPU and network bandwidth to exchange routing tables.",
            "It requires the administrator to manually type every single route."
        ],
        correctAnswer: "It uses more CPU and network bandwidth to exchange routing tables.",
        explanation: "Dynamic routing protocols (OSPF, EIGRP) constantly run algorithms and send updates, consuming router CPU and link bandwidth."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "When comparing OSPF and EIGRP, what is considered a distinct advantage of OSPF?",
        options: [
            "OSPF generally converges faster than EIGRP.",
            "OSPF is Vendor Independent, meaning it works on routers from any manufacturer.",
            "OSPF uses significantly lower bandwidth for routing updates than EIGRP.",
            "OSPF completely bypasses the need for the Dijkstra algorithm."
        ],
        correctAnswer: "OSPF is Vendor Independent, meaning it works on routers from any manufacturer.",
        explanation: "OSPF is an Open Standard (Vendor Independent), whereas EIGRP was developed by Cisco and is mostly used in Cisco-based networks."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 2", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary function of the 'LSU' (Link-State Update) packet in OSPF?",
        options: [
            "To send a hello message to discover a neighbor.",
            "To request missing link-state information.",
            "To provide the actual routing updates and link-state advertisements.",
            "To acknowledge the receipt of a database description."
        ],
        correctAnswer: "To provide the actual routing updates and link-state advertisements.",
        explanation: "LSU packets carry the actual Link-State Advertisements (LSAs) containing the routing updates."
    },

    // --- IPv6 Structure ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "In IPv6 structure, the 128-bit address is divided into how many groups of hexadecimal characters?",
        options: [
            "4 groups",
            "6 groups",
            "8 groups",
            "16 groups"
        ],
        correctAnswer: "8 groups",
        explanation: "An IPv6 address is divided into 8 groups of 4 hexadecimal digits, separated by colons."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Why is 'Auto Configuration Support' considered a major advantage of IPv6?",
        options: [
            "It allows a device to generate its own globally unique IP address without needing a DHCP server.",
            "It forces the router to manually assign IP addresses faster.",
            "It allows the device to bypass all network security firewalls.",
            "It converts hexadecimal formats directly into IPv4 decimal formats."
        ],
        correctAnswer: "It allows a device to generate its own globally unique IP address without needing a DHCP server.",
        explanation: "IPv6 supports Stateless Address Autoconfiguration (SLAAC), allowing devices to self-configure their IPs without relying on a DHCP server."
    }
];

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('school_db');
        const collection = db.collection('questions');
        
        let inserted = 0;
        let duplicates = 0;
        for (const q of questions) {
            const exists = await collection.findOne({ 
                subjectId: q.subjectId, 
                questionText: q.questionText 
            });
            if (!exists) {
                await collection.insertOne(q);
                inserted++;
            } else {
                duplicates++;
            }
        }
        console.log(`Successfully generated and inserted ${inserted} deep-cut questions for Unit 2!`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
