const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const subjectId = "6a49ecb738bb37720e3e9197"; // BASIC DATA COMMUNICATION

const mcqBank = [
    { q: "What does ASCII stand for?", opts: ["American Standard Code for Information Interchange", "African Standard Code for Internet Interchange", "American System Code for Information Integration", "American Standard Code for International Interchange"], ans: "American Standard Code for Information Interchange", exp: "ASCII is a character encoding standard for electronic communication." },
    { q: "How many bits are used in Standard ASCII and how many characters can it represent?", opts: ["7 bits, 128 characters", "8 bits, 256 characters", "16 bits, 65536 characters", "7 bits, 256 characters"], ans: "7 bits, 128 characters", exp: "Standard ASCII uses 7 bits and can represent 128 characters (0-127)." },
    { q: "What is the decimal ASCII value for the uppercase letter 'A'?", opts: ["65", "97", "48", "32"], ans: "65", exp: "The ASCII value for uppercase A is 65, while lowercase 'a' is 97." },
    { q: "Which of the following describes Unicode?", opts: ["A universal standard that assigns a unique number to characters of almost all writing systems", "A 7-bit character encoding system for English", "An error detection algorithm", "A multiplexing technique"], ans: "A universal standard that assigns a unique number to characters of almost all writing systems", exp: "Unicode can represent millions of characters, including emojis and symbols from different languages." },
    { q: "The Data Link Layer is divided into which two sub-layers?", opts: ["LLC and MAC", "Network and Physical", "IP and TCP", "Transport and Session"], ans: "LLC and MAC", exp: "Logical Link Control (LLC) and Media Access Control (MAC) make up the Data Link Layer." },
    { q: "Which error detection method uses a generator polynomial and binary division, and is widely used in Ethernet?", opts: ["CRC (Cyclic Redundancy Check)", "Parity Check", "Checksum", "Hamming Code"], ans: "CRC (Cyclic Redundancy Check)", exp: "CRC is a highly effective error detection technique used heavily in Ethernet and Wi-Fi." },
    { q: "Which multiple access protocol requires devices to 'listen before transmitting'?", opts: ["CSMA (Carrier Sense Multiple Access)", "Pure ALOHA", "Token Passing", "Slotted ALOHA"], ans: "CSMA (Carrier Sense Multiple Access)", exp: "CSMA improves upon ALOHA by sensing the carrier channel before sending data." },
    { q: "Which collision avoidance mechanism is primarily used in Wireless networks (Wi-Fi)?", opts: ["CSMA/CA", "CSMA/CD", "Pure ALOHA", "Token Ring"], ans: "CSMA/CA", exp: "Carrier Sense Multiple Access with Collision Avoidance is used in wireless networks because collisions cannot be easily detected while transmitting." },
    { q: "What is the size of an IPv4 address?", opts: ["32 bits", "64 bits", "128 bits", "16 bits"], ans: "32 bits", exp: "An IPv4 address is 32 bits long, usually written in four decimal octets." },
    { q: "Which subnet mask corresponds to a CIDR notation of /24?", opts: ["255.255.255.0", "255.255.0.0", "255.255.255.128", "255.255.255.224"], ans: "255.255.255.0", exp: "/24 means the first 24 bits are 1s, which converts to 255.255.255.0 in decimal." },
    { q: "In the OSI model, which layer is responsible for logical addressing (IP) and routing?", opts: ["Network Layer", "Data Link Layer", "Transport Layer", "Physical Layer"], ans: "Network Layer", exp: "The Network Layer (Layer 3) handles IP addressing, path determination, and routing." },
    { q: "Which routing protocol uses the Bellman-Ford algorithm and shares its routing table with neighbors?", opts: ["Distance Vector Routing (e.g., RIP)", "Link State Routing (e.g., OSPF)", "Path Vector Routing (e.g., BGP)", "Hierarchical Routing"], ans: "Distance Vector Routing (e.g., RIP)", exp: "Distance Vector routers determine the path based on distance (cost) and direction." },
    { q: "Which transmission mode allows communication in both directions, but NOT at the same time?", opts: ["Half-duplex", "Simplex", "Full-duplex", "Multiplex"], ans: "Half-duplex", exp: "In Half-duplex (like a walkie-talkie), both can transmit and receive, but must take turns." },
    { q: "Which network topology connects all devices to a single central backbone cable?", opts: ["Bus Topology", "Star Topology", "Ring Topology", "Mesh Topology"], ans: "Bus Topology", exp: "Bus topology uses a single common cable to which all nodes are connected." },
    { q: "Which multiplexing technique divides the transmission channel by assigning different frequencies to each signal?", opts: ["FDM (Frequency Division Multiplexing)", "TDM (Time Division Multiplexing)", "WDM (Wavelength Division Multiplexing)", "CDMA"], ans: "FDM (Frequency Division Multiplexing)", exp: "FDM assigns a specific frequency band to each signal, commonly used in radio stations." },
    { q: "Which of the following is an example of unguided (wireless) transmission media?", opts: ["Microwaves", "Coaxial Cable", "Optical Fiber", "Twisted Pair"], ans: "Microwaves", exp: "Microwaves, radio waves, and infrared are unguided (wireless) media." },
    { q: "What is the primary advantage of Optical Fiber over copper cables?", opts: ["Immunity to electromagnetic interference and higher bandwidth", "It is cheaper to install", "It is easier to bend and route", "It uses standard RJ-45 connectors"], ans: "Immunity to electromagnetic interference and higher bandwidth", exp: "Fiber optic cables transmit light, making them extremely fast and immune to electrical noise." },
    { q: "Which layer of the OSI model deals with raw bits, electrical signals, and cables?", opts: ["Physical Layer", "Data Link Layer", "Network Layer", "Presentation Layer"], ans: "Physical Layer", exp: "Layer 1 (Physical) converts digital bits into physical signals over the medium." },
    { q: "What does a Router use to determine the best path for a packet?", opts: ["Routing tables and algorithms", "MAC address tables", "ARP cache", "DNS resolution"], ans: "Routing tables and algorithms", exp: "Routers consult their routing tables to find the optimal path to the destination network." },
    { q: "What is the main function of the ARP (Address Resolution Protocol)?", opts: ["To convert an IP address into a MAC address", "To convert a domain name into an IP address", "To route packets between different networks", "To detect errors in data transmission"], ans: "To convert an IP address into a MAC address", exp: "ARP resolves logical IP addresses to physical MAC addresses on a local network." },
    { q: "How many hosts can be accommodated in a /27 subnet?", opts: ["30", "32", "62", "14"], ans: "30", exp: "Formula is 2^n - 2. /27 leaves 5 host bits. 2^5 - 2 = 32 - 2 = 30 usable hosts." },
    { q: "Which of the following is considered a 'Private' IPv4 address range?", opts: ["192.168.0.0 - 192.168.255.255", "8.8.8.8", "1.0.0.0 - 126.255.255.255", "127.0.0.1"], ans: "192.168.0.0 - 192.168.255.255", exp: "192.168.x.x is a Class C private IP range used in local networks." },
    { q: "What is Supernetting?", opts: ["Combining multiple smaller networks into one larger summary network", "Dividing a large network into smaller subnets", "Translating private IPs to public IPs", "A routing algorithm for OSPF"], ans: "Combining multiple smaller networks into one larger summary network", exp: "Supernetting (Route Aggregation) reduces routing table sizes by summarizing contiguous networks." },
    { q: "In a mobile network architecture, what does RAN stand for?", opts: ["Radio Access Network", "Routing Algorithm Node", "Random Access Node", "Regional Area Network"], ans: "Radio Access Network", exp: "RAN connects mobile devices (phones) to the core network via base stations (towers)." },
    { q: "What does HTTP stand for in the Application Layer?", opts: ["HyperText Transfer Protocol", "High Transfer Text Protocol", "Hyper Transfer Transport Protocol", "HyperText Transmission Process"], ans: "HyperText Transfer Protocol", exp: "HTTP is the foundational protocol for data communication on the World Wide Web." }
];

const shortAnswerBank = [
    { q: "Explain the difference between ASCII and Unicode.", ans: "ASCII uses 7 bits (128 characters) mostly for English. Unicode assigns a unique code point to characters from almost all languages, supporting millions of characters and emojis.", exp: "Unicode was developed because ASCII's 128 character limit was insufficient for global communication and multiple writing systems." },
    { q: "Describe the primary functions of the Data Link Layer.", ans: "Framing, Physical (MAC) Addressing, Error Detection/Correction, Flow Control, and Access Control.", exp: "The Data Link Layer ensures reliable transfer of data between directly connected devices on a local network." },
    { q: "Differentiate between CSMA/CD and CSMA/CA.", ans: "CSMA/CD (Collision Detection) is used in wired Ethernet to detect and react to collisions. CSMA/CA (Collision Avoidance) is used in Wi-Fi to prevent collisions before they happen.", exp: "Wireless networks use CSMA/CA because a wireless device cannot easily listen and transmit at the same time to detect collisions." },
    { q: "What is Subnetting and why is it used?", ans: "Subnetting is dividing one large network into smaller sub-networks. It is used to improve performance, manage IP addresses efficiently, and increase security.", exp: "By creating subnets, broadcast traffic is localized, preventing network congestion." },
    { q: "Given the IP address 192.168.10.0/26, calculate the subnet mask and the number of usable hosts per subnet.", ans: "Subnet mask: 255.255.255.192. Usable hosts: 62.", exp: "/26 means 26 network bits and 6 host bits. Subnet mask ends in 192. Hosts = 2^6 - 2 = 64 - 2 = 62." },
    { q: "Explain the three main types of routing algorithms.", ans: "1. Static Routing (manually configured). 2. Distance Vector (shares tables with neighbors, e.g., RIP). 3. Link State (builds full network map, uses shortest path, e.g., OSPF).", exp: "Dynamic routing algorithms (Distance Vector and Link State) automatically adapt to network topology changes." },
    { q: "Compare Simplex, Half-Duplex, and Full-Duplex communication modes with examples.", ans: "Simplex: One direction only (e.g., Keyboard). Half-Duplex: Both directions, but not simultaneously (e.g., Walkie-talkie). Full-Duplex: Both directions simultaneously (e.g., Mobile phone).", exp: "The communication mode defines how the channel bandwidth is utilized by the sender and receiver." },
    { q: "What is Multiplexing? Briefly explain FDM and TDM.", ans: "Multiplexing combines multiple signals over a single channel. FDM divides the channel by frequencies (e.g., Radio). TDM divides the channel by time slots.", exp: "Multiplexing maximizes the utilization of high-capacity transmission mediums." },
    { q: "List and briefly explain three common network topologies.", ans: "Star: All devices connect to a central switch. Bus: All devices share a single backbone cable. Mesh: Every device connects to multiple or all other devices for high redundancy.", exp: "The choice of topology affects network reliability, cost, and scalability." },
    { q: "What are the three major parts of a Mobile Network Architecture?", ans: "1. Radio Access Network (RAN - base stations/towers). 2. Core Network (CN - call routing, authentication). 3. Backhaul Network (connects RAN to CN).", exp: "When you make a call, the phone connects to the RAN, which forwards the request to the Core Network via the Backhaul." }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function run() {
    try {
        await client.connect();
        const db = client.db('school_db');
        
        let questionsToInsert = [];
        
        const addMCQs = (count, category) => {
            for(let i=0; i<count; i++) {
                const baseQ = mcqBank[i % mcqBank.length];
                const finalOptions = [...baseQ.opts];
                shuffle(finalOptions);
                questionsToInsert.push({
                    subjectId: subjectId,
                    category: category,
                    type: "MULTIPLE_CHOICE",
                    difficulty: "MEDIUM",
                    questionText: baseQ.q,
                    correctAnswer: baseQ.ans,
                    explanation: baseQ.exp,
                    options: finalOptions,
                    _class: "com.school.model.Question"
                });
            }
        };

        const addShortAnswers = (count, category) => {
            for(let i=0; i<count; i++) {
                const baseQ = shortAnswerBank[i % shortAnswerBank.length];
                questionsToInsert.push({
                    subjectId: subjectId,
                    category: category,
                    type: "SHORT_ANSWER",
                    difficulty: "HARD",
                    questionText: baseQ.q,
                    correctAnswer: baseQ.ans,
                    explanation: baseQ.exp,
                    options: [],
                    _class: "com.school.model.Question"
                });
            }
        };

        // Generation Strategy:
        addMCQs(15, "QUIZ");
        addMCQs(30, "EXERCISE");
        addShortAnswers(40, "POSSIBLE QNS");
        
        addMCQs(10, "CAT 1");
        addShortAnswers(7, "CAT 1");

        addMCQs(10, "CAT 2");
        addShortAnswers(7, "CAT 2");

        addMCQs(20, "UE");
        addShortAnswers(10, "UE");

        const result = await db.collection('questions').insertMany(questionsToInsert);
        console.log(`Successfully inserted ${result.insertedCount} questions for BASIC DATA COMMUNICATION.`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
