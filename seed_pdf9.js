const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

const questions = [
    // NETWORK LAYER INTRODUCTION & FUNCTIONS
    {
        subjectId, moduleName: "Unit 4: Network Layer Basics", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What is the main aim of the network layer?",
        options: ["To deliver packets from source to destination across multiple links", "To handle error-free transmission over a single physical link", "To provide process-to-process communication", "To manage user session and authentication"],
        correctAnswer: "To deliver packets from source to destination across multiple links",
        explanation: "The main aim of the network layer is to deliver packets from source to destination across multiple links (networks).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Network Layer Basics", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "If two computers are connected on the same link, is a network layer needed?",
        options: ["No, there is no need for a network layer", "Yes, for routing", "Yes, for logical addressing", "Yes, for packet switching"],
        correctAnswer: "No, there is no need for a network layer",
        explanation: "If two computers are connected on the same link, then there is no need for a network layer.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Network Layer Basics", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is a function of the Network Layer?",
        options: ["Translating logical network addresses into physical addresses", "Encoding bits into signals", "Ensuring end-to-end reliable data transfer between applications", "Controlling the physical access to the media"],
        correctAnswer: "Translating logical network addresses into physical addresses",
        explanation: "Functions of Network Layer include translating logical network address into physical address and routing packets.",
        difficultyLevel: "MEDIUM"
    },
    // VIRTUAL AND DATAGRAM NETWORKS
    {
        subjectId, moduleName: "Unit 4: Virtual & Datagram Networks", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Computer networks that provide only a connectionless service at the network layer are called:",
        options: ["Datagram networks", "Virtual Circuit (VC) networks", "Circuit-switched networks", "Packet-switched networks"],
        correctAnswer: "Datagram networks",
        explanation: "Computer networks that provide only a connectionless service at the network layer are called datagram networks.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Virtual & Datagram Networks", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Computer networks that provide only a connection service at the network layer are called:",
        options: ["Virtual circuit (VC) networks", "Datagram networks", "Connectionless networks", "Local Area Networks"],
        correctAnswer: "Virtual circuit (VC) networks",
        explanation: "Networks providing only a connection service at the network layer are virtual circuit (VC) networks.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Virtual Circuit Networks", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "A Virtual Circuit (VC) consists of a path between source and destination, entries in forwarding tables, and:",
        options: ["VC numbers for each link along the path", "A static IP address for the sender", "A physical dedicated wire", "A broadcast domain"],
        correctAnswer: "VC numbers for each link along the path",
        explanation: "A VC consists of a path, VC numbers (one for each link), and entries in forwarding tables.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 4: Virtual Circuit Networks", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Why doesn't a packet keep the same VC number on each of the links along its route?",
        options: ["To simplify VC setup by allowing independent VC number selection on each link", "Because routers cannot store large numbers", "To increase the length of the VC field", "To ensure security from packet sniffers"],
        correctAnswer: "To simplify VC setup by allowing independent VC number selection on each link",
        explanation: "Replacing the number reduces the length of the VC field and significantly simplifies VC setup by permitting independent VC numbers at each link.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 4: Virtual Circuit Networks", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In a VC network, must routers maintain connection state information for ongoing connections?",
        options: ["Yes, each time a new connection is established, a new entry is added", "No, routers only forward based on destination IP", "Only if the packet is dropped", "Only gateway routers maintain state"],
        correctAnswer: "Yes, each time a new connection is established, a new entry is added",
        explanation: "In a VC network, the network's routers must maintain connection state information for the ongoing connections.",
        difficultyLevel: "MEDIUM"
    },
    // IP PROTOCOL AND ADDRESSING
    {
        subjectId, moduleName: "Unit 4: IP Addressing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "An IP address consists of a 32-bit number. Each decimal number in an IP address is called an:",
        options: ["Octet", "Segment", "Fragment", "Nibble"],
        correctAnswer: "Octet",
        explanation: "Each decimal number in an IP address is called an octet, which is a vendor-neutral term for a byte.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: IP Addressing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which IP address is reserved for the software loopback interface and is not physically connected to the network?",
        options: ["127.0.0.1", "192.168.1.1", "0.0.0.0", "255.255.255.255"],
        correctAnswer: "127.0.0.1",
        explanation: "Loop back Address - 127.0.0.1 is designated for the Software loop back interface.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: IP Addressing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is the correct structure for a Class B IP address?",
        options: ["Network. Network. Host. Host", "Network. Host. Host. Host", "Network. Network. Network. Host", "Host. Host. Host. Host"],
        correctAnswer: "Network. Network. Host. Host",
        explanation: "Class B structure is Network. Network. Host. Host with a subnet mask of 255.255.0.0.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 4: IP Addressing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which IP address class is specifically used for Multicast Addressing?",
        options: ["Class D", "Class A", "Class B", "Class C"],
        correctAnswer: "Class D",
        explanation: "Class D is used for Multicast Addressing (Range 224 to 239).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: IP Addressing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is a private IP address range for Class C?",
        options: ["192.168.0.0 – 192.168.255.255", "10.0.0.0 – 10.255.255.255", "172.16.0.0 – 172.31.255.255", "192.0.0.0 – 192.0.255.255"],
        correctAnswer: "192.168.0.0 – 192.168.255.255",
        explanation: "The reserved private IPv4 address range for Class C is 192.168.0.0 – 192.168.255.255.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 4: IP Addressing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What IP address is used for Broadcast in an IPv4 network?",
        options: ["255.255.255.255", "0.0.0.0", "127.0.0.1", "224.0.0.0"],
        correctAnswer: "255.255.255.255",
        explanation: "IP Add. 255.255.255.255 is Used for Broadcast.",
        difficultyLevel: "EASY"
    },
    // ROUTERS
    {
        subjectId, moduleName: "Unit 4: Routers", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Unlike bridges, what capability do routers have regarding multiple network paths?",
        options: ["They are able to keep track of multiple active paths between source and destination", "They only allow one single active path at any time", "They broadcast on all active paths to find the destination", "They disable all but one path to prevent loops"],
        correctAnswer: "They are able to keep track of multiple active paths between source and destination",
        explanation: "Routers are able to keep track of multiple active paths between any given source and destination network.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 4: Routers", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which type of router requires the administrator to manually configure routes between each network?",
        options: ["Static Router", "Dynamic Router", "Autonomous Router", "Gateway Router"],
        correctAnswer: "Static Router",
        explanation: "In Static Routers, administrators have to manually configure routes because the routers do not communicate amongst themselves.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Routers", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Why are routers generally slower than bridges?",
        options: ["Because they perform complex tasks and process data intensively", "Because they have smaller buffers", "Because they operate at the physical layer", "Because they only use single active paths"],
        correctAnswer: "Because they perform complex tasks and process data intensively",
        explanation: "Routers perform complex tasks and continuously process data, meaning they are slower than bridges.",
        difficultyLevel: "MEDIUM"
    },
    // ROUTING ALGORITHMS
    {
        subjectId, moduleName: "Unit 4: Routing Algorithms", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "An adaptive routing algorithm makes routing decisions based on:",
        options: ["Topology and network traffic", "Manual configuration by an administrator", "MAC addresses only", "The length of the packet"],
        correctAnswer: "Topology and network traffic",
        explanation: "An adaptive routing algorithm (dynamic routing) makes decisions based on the topology and network traffic.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Routing Algorithms", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which classification of adaptive routing algorithm computes the least-cost path by using complete and global knowledge about the network?",
        options: ["Centralized algorithm", "Isolation algorithm", "Distributed algorithm", "Flooding algorithm"],
        correctAnswer: "Centralized algorithm",
        explanation: "A Centralized algorithm (global routing algorithm) computes the path using complete and global knowledge about the network.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 4: Routing Algorithms", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "A Distance Vector algorithm is an example of which type of routing algorithm?",
        options: ["Distributed algorithm", "Centralized algorithm", "Isolation algorithm", "Non-adaptive algorithm"],
        correctAnswer: "Distributed algorithm",
        explanation: "A Distance vector algorithm is a decentralized/distributed algorithm as it computes the path in an iterative and distributed manner.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 4: Routing Algorithms", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is a Non-Adaptive Routing algorithm?",
        options: ["Flooding", "Distance Vector", "Link State", "Centralized Routing"],
        correctAnswer: "Flooding",
        explanation: "Flooding and Random walks are types of Non-Adaptive (static) Routing algorithms.",
        difficultyLevel: "MEDIUM"
    },
    // BROADCAST AND MULTICAST ROUTING
    {
        subjectId, moduleName: "Unit 4: Broadcast/Multicast", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What is unicast routing?",
        options: ["Routing data to a specific, already known destination", "Routing data to all devices on the network", "Routing data to a selected group of devices", "Routing data using random walks"],
        correctAnswer: "Routing data to a specific, already known destination",
        explanation: "Unicast routing is sending traffic with a specified destination. It is the simplest form because the destination is already known.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Broadcast/Multicast", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "By default, are broadcast packets routed and forwarded by routers to other networks?",
        options: ["No, routers create broadcast domains and do not forward broadcasts by default", "Yes, they always forward them", "Yes, but only if they are fragmented", "No, because switches handle all broadcasts"],
        correctAnswer: "No, routers create broadcast domains and do not forward broadcasts by default",
        explanation: "By default, the broadcast packets are not routed and forwarded by the routers. Routers create broadcast domains.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 4: Broadcast/Multicast", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In broadcast routing, what technique helps a router detect and discard duplicate packets by knowing its predecessor in advance?",
        options: ["Reverse path forwarding", "Spanning tree protocol", "Flooding", "Link state advertising"],
        correctAnswer: "Reverse path forwarding",
        explanation: "Reverse path forwarding is a technique where the router knows in advance its predecessor to receive broadcasts, used to discard duplicates.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 4: Broadcast/Multicast", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "How does Multicast routing differ from Broadcast routing?",
        options: ["Multicast sends data only to nodes that wish to receive it, whereas Broadcast sends to all nodes", "Broadcast sends to one node, Multicast sends to all", "Multicast is used for static routing, Broadcast for dynamic", "There is no difference between the two"],
        correctAnswer: "Multicast sends data only to nodes that wish to receive it, whereas Broadcast sends to all nodes",
        explanation: "In broadcast routing, packets are sent to all nodes even if they don't want it. In Multicast, data is sent only to nodes which want to receive it.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Broadcast/Multicast", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What protocol does Multicast routing use to avoid looping?",
        options: ["Spanning tree protocol", "Border Gateway Protocol", "Distance Vector protocol", "Open Shortest Path First"],
        correctAnswer: "Spanning tree protocol",
        explanation: "Multicast routing works with the spanning tree protocol to avoid looping.",
        difficultyLevel: "MEDIUM"
    }
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
    console.log(`\n✅ PDF 9 (Unit 4: Network Layer) IMEKAMILIKA!`);
    console.log(`   Maswali mapya: ${inserted} | Yaliyorukwa: ${skipped} | JUMLA: ${total}`);
  } finally { await client.close(); }
}
run().catch(console.dir);
