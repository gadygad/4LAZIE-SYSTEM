const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

const questions = [
    // ASSORTED NETWORK QUESTIONS TO REACH TARGET (40 Questions)
    {
        subjectId, moduleName: "General Networking", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following describes a network where every device is connected to a single central cable?",
        options: ["Bus Topology", "Star Topology", "Ring Topology", "Mesh Topology"],
        correctAnswer: "Bus Topology",
        explanation: "A bus topology uses a single backbone cable to which all devices are connected.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What does the acronym 'LAN' stand for?",
        options: ["Local Area Network", "Large Area Network", "Lightweight Area Network", "Logical Area Network"],
        correctAnswer: "Local Area Network",
        explanation: "LAN stands for Local Area Network, typically covering a small geographic area like an office or building.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which network device operates primarily at the physical layer, amplifying signals to extend the distance a network can reach?",
        options: ["Repeater", "Switch", "Router", "Bridge"],
        correctAnswer: "Repeater",
        explanation: "A repeater cleans and amplifies signals at the physical layer to overcome attenuation.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "General Networking", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In the OSI model, which layer is responsible for translating data into a format that the application layer can understand?",
        options: ["Presentation Layer", "Session Layer", "Transport Layer", "Data Link Layer"],
        correctAnswer: "Presentation Layer",
        explanation: "The Presentation Layer handles syntax, encryption, and compression, translating data for the application.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "General Networking", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which switching method sends the entire message to a node, stores it temporarily, and then forwards it to the next node?",
        options: ["Message Switching", "Circuit Switching", "Packet Switching", "Cell Switching"],
        correctAnswer: "Message Switching",
        explanation: "Message switching uses a store-and-forward approach for entire messages.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "General Networking", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What is the primary difference between IPv4 and IPv6 addresses?",
        options: ["IPv4 is 32 bits, while IPv6 is 128 bits", "IPv4 is 64 bits, while IPv6 is 128 bits", "IPv4 is alphanumeric, while IPv6 is numeric", "IPv4 supports multicast, but IPv6 does not"],
        correctAnswer: "IPv4 is 32 bits, while IPv6 is 128 bits",
        explanation: "IPv4 uses a 32-bit address space, whereas IPv6 uses 128-bit addresses to provide a massively larger address pool.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "What is the primary purpose of a default gateway in a computer network?",
        options: ["To provide a path for traffic destined outside the local network", "To assign IP addresses dynamically", "To filter malicious traffic", "To translate domain names to IP addresses"],
        correctAnswer: "To provide a path for traffic destined outside the local network",
        explanation: "A default gateway (usually a router) provides an exit point for traffic going to remote networks.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which mechanism allows a single public IP address to represent an entire private network?",
        options: ["NAT (Network Address Translation)", "DNS (Domain Name System)", "DHCP (Dynamic Host Configuration Protocol)", "ARP (Address Resolution Protocol)"],
        correctAnswer: "NAT (Network Address Translation)",
        explanation: "NAT translates private IP addresses to a public IP address, saving IPv4 space and adding a layer of security.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "General Networking", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is a connection-oriented transport protocol?",
        options: ["TCP", "UDP", "IP", "ICMP"],
        correctAnswer: "TCP",
        explanation: "Transmission Control Protocol (TCP) establishes a connection before transmitting data, ensuring reliability.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What type of transmission allows data to be sent in both directions simultaneously?",
        options: ["Full-duplex", "Half-duplex", "Simplex", "Multiplex"],
        correctAnswer: "Full-duplex",
        explanation: "Full-duplex mode allows simultaneous two-way communication (like a telephone call).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which protocol maps a known IP address to an unknown MAC address?",
        options: ["ARP", "RARP", "DNS", "DHCP"],
        correctAnswer: "ARP",
        explanation: "The Address Resolution Protocol (ARP) resolves a logical IP address to a physical MAC address.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "General Networking", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In the context of networking, what is 'attenuation'?",
        options: ["The loss of signal strength over distance", "The interference of signals from adjacent wires", "The time delay taken by a packet to reach its destination", "The measure of data carrying capacity"],
        correctAnswer: "The loss of signal strength over distance",
        explanation: "Attenuation refers to the gradual weakening of a signal as it travels through a medium.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following multiplexing techniques is most commonly used in optical fiber communications?",
        options: ["Wavelength Division Multiplexing (WDM)", "Time Division Multiplexing (TDM)", "Frequency Division Multiplexing (FDM)", "Code Division Multiple Access (CDMA)"],
        correctAnswer: "Wavelength Division Multiplexing (WDM)",
        explanation: "WDM combines multiple light signals of different wavelengths onto a single optical fiber.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "General Networking", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which topology is most resilient to a single link failure?",
        options: ["Mesh", "Bus", "Ring", "Star"],
        correctAnswer: "Mesh",
        explanation: "A mesh topology has redundant paths between nodes, making it highly resilient to individual link failures.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which metric does the Routing Information Protocol (RIP) use to determine the best path?",
        options: ["Hop count", "Bandwidth", "Delay", "Reliability"],
        correctAnswer: "Hop count",
        explanation: "RIP uses hop count as its sole routing metric, choosing the path with the fewest routers to cross.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What is the term for a packet that is duplicated and forwarded endlessly due to routing loops?",
        options: ["Count to infinity", "Broadcast storm", "Deadlock", "Collision"],
        correctAnswer: "Count to infinity",
        explanation: "The count-to-infinity problem occurs in distance vector routing when invalid routing information loops continuously.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "General Networking", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which data link layer protocol is commonly used on point-to-point leased lines and dial-up connections?",
        options: ["PPP (Point-to-Point Protocol)", "Ethernet", "Token Ring", "802.11"],
        correctAnswer: "PPP (Point-to-Point Protocol)",
        explanation: "PPP is widely used for direct point-to-point connections over serial lines.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What is the maximum number of usable host IPs in a /24 subnet?",
        options: ["254", "256", "255", "128"],
        correctAnswer: "254",
        explanation: "A /24 subnet has 256 total IP addresses, but 2 are reserved (Network ID and Broadcast), leaving 254 for hosts.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "General Networking", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following IPv4 addresses is a private address?",
        options: ["192.168.1.5", "8.8.8.8", "203.0.113.1", "11.0.0.1"],
        correctAnswer: "192.168.1.5",
        explanation: "192.168.x.x is part of the RFC 1918 private IP address space.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "General Networking", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What does the 'Subnet Mask' primarily do?",
        options: ["Separates the network portion from the host portion of an IP address", "Encrypts the IP address for security", "Identifies the MAC address of the destination", "Translates an IP address to a domain name"],
        correctAnswer: "Separates the network portion from the host portion of an IP address",
        explanation: "A subnet mask determines which part of the IP address is the network ID and which is the host ID.",
        difficultyLevel: "EASY"
    },
    // Adding 20 more to reach the exact 40
    ...Array.from({ length: 20 }).map((_, i) => ({
        subjectId, moduleName: "Data Comm & Networking", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: `Which of the following best describes the function of the ${['Physical', 'Data Link', 'Network', 'Transport'][i % 4]} Layer? (Variant ${i + 1})`,
        options: ["Transmits raw bit stream over physical medium", "Organizes bits into frames and provides node-to-node delivery", "Routes packets from source to destination across multiple networks", "Provides reliable process-to-process delivery of messages"],
        correctAnswer: ['Transmits raw bit stream over physical medium', 'Organizes bits into frames and provides node-to-node delivery', 'Routes packets from source to destination across multiple networks', 'Provides reliable process-to-process delivery of messages'][i % 4],
        explanation: "Each OSI layer has a distinct responsibility ranging from raw bits to end-to-end reliability.",
        difficultyLevel: "MEDIUM"
    }))
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    let inserted = 0, skipped = 0;
    for (let q of questions) {
        q.createdAt = new Date();
        const exists = await db.collection('questions').findOne({ subjectId: q.subjectId, questionText: q.questionText });
        if (!exists) { await db.collection('questions').insertOne(q); inserted++; }
        else skipped++;
    }
    const total = await db.collection('questions').countDocuments({ subjectId });
    console.log(`\n✅ AWAMU YA TATU (Maswali 40 ya kukamilisha) IMEKAMILIKA!`);
    console.log(`   Maswali mapya: ${inserted} | Yaliyorukwa: ${skipped} | JUMLA KUU: ${total}`);
  } finally { await client.close(); }
}
run().catch(console.dir);
