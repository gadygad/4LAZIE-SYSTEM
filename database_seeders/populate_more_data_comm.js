const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const subjectId = "6a49ecb738bb37720e3e9197"; // BASIC DATA COMMUNICATION

const advancedMcqBank = [
    { q: "What is the primary purpose of Byte Stuffing in character-oriented framing?", opts: ["To prevent a flag pattern in the data from being interpreted as the end of the frame", "To detect and correct burst errors in transmission", "To synchronize the sender and receiver clocks", "To compress the data before transmission"], ans: "To prevent a flag pattern in the data from being interpreted as the end of the frame", exp: "Byte stuffing adds a special ESC (escape) byte before any accidental flag pattern in the user data, ensuring the receiver doesn't cut the frame short." },
    { q: "In Bit Stuffing, what is the rule used by the sender to maintain data transparency?", opts: ["Insert a 0 after every five consecutive 1s in the data stream", "Insert a 1 after every five consecutive 0s in the data stream", "Replace the flag pattern with an ESC character", "Append a parity bit after every 8 bits of data"], ans: "Insert a 0 after every five consecutive 1s in the data stream", exp: "By forcing a 0 after five 1s, the sender ensures the flag pattern (01111110) never accidentally appears in the payload data." },
    { q: "What is the Hamming distance between the codewords 00000 and 01101?", opts: ["3", "2", "4", "5"], ans: "3", exp: "The Hamming distance is the number of differing bits between two words. Comparing 00000 and 01101, three bits are different." },
    { q: "According to Hamming Distance rules, what is the minimum distance (dmin) required to correct 't' errors?", opts: ["2t + 1", "t + 1", "t + 2", "2t - 1"], ans: "2t + 1", exp: "To correct 't' errors safely, the minimum Hamming distance between valid codewords must be at least 2t + 1." },
    { q: "Which of the following routing algorithms uses the Bellman-Ford equation?", opts: ["Distance Vector Routing", "Link State Routing", "Path Vector Routing", "Flooding"], ans: "Distance Vector Routing", exp: "Distance Vector algorithms (like RIP) iteratively compute shortest paths using the Bellman-Ford dynamic programming equation." },
    { q: "What is the 'Count-to-Infinity' problem primarily associated with?", opts: ["Distance Vector Routing when bad news (link failures) travels slowly", "Link State Routing during topology broadcasts", "Subnetting when hosts exceed 254", "CSMA/CD during high collision rates"], ans: "Distance Vector Routing when bad news (link failures) travels slowly", exp: "In Distance Vector, if a link fails, nodes can mistakenly update each other in a loop, counting up to infinity before realizing the path is dead." },
    { q: "Which routing protocol uses Dijkstra's algorithm to compute the shortest path tree?", opts: ["OSPF (Open Shortest Path First)", "RIP (Routing Information Protocol)", "BGP (Border Gateway Protocol)", "ARP (Address Resolution Protocol)"], ans: "OSPF (Open Shortest Path First)", exp: "OSPF is a Link State protocol that requires every router to have a complete map of the network to run Dijkstra's algorithm locally." },
    { q: "What is the main function of NAT (Network Address Translation)?", opts: ["It allows multiple devices on a local network to share a single public IP address", "It translates MAC addresses into IP addresses", "It provides error correction for corrupted IP packets", "It establishes virtual circuits for ATM networks"], ans: "It allows multiple devices on a local network to share a single public IP address", exp: "NAT routers rewrite the source IP and Port numbers of outgoing packets to a single public IP, solving the IPv4 address shortage problem." },
    { q: "Which ICMP message type is used by the 'ping' command?", opts: ["Echo Request / Echo Reply", "Destination Unreachable", "Time Exceeded", "Source Quench"], ans: "Echo Request / Echo Reply", exp: "Ping sends an ICMP Type 8 (Echo Request) and waits for a Type 0 (Echo Reply) to verify connectivity." },
    { q: "What is the role of the TTL (Time To Live) field in an IPv4 packet header?", opts: ["To prevent packets from looping endlessly in the network", "To specify the priority of the packet", "To determine the fragmentation offset", "To identify the upper-layer protocol (TCP or UDP)"], ans: "To prevent packets from looping endlessly in the network", exp: "Every router decrements the TTL by 1. If it hits 0, the packet is discarded and an ICMP Time Exceeded message is sent back." },
    { q: "In BGP (Border Gateway Protocol), what does the AS-PATH attribute do?", opts: ["It lists the Autonomous Systems the prefix advertisement has passed through to prevent loops", "It calculates the shortest path using Dijkstra's algorithm", "It translates private IPs to public IPs", "It manages the MAC address tables for Ethernet switches"], ans: "It lists the Autonomous Systems the prefix advertisement has passed through to prevent loops", exp: "BGP uses AS-PATH to track the route and prevent routing loops on the global Internet." },
    { q: "What is the primary difference between a Hub and a Switch?", opts: ["A Switch operates at Layer 2 and isolates collision domains, while a Hub operates at Layer 1 and broadcasts to all ports", "A Hub routes packets between different IP networks, while a Switch only handles local traffic", "A Switch requires IP address configuration, while a Hub is plug-and-play", "A Hub uses CSMA/CA, while a Switch uses Pure ALOHA"], ans: "A Switch operates at Layer 2 and isolates collision domains, while a Hub operates at Layer 1 and broadcasts to all ports", exp: "Hubs are physical layer repeaters resulting in one large collision domain. Switches use MAC addresses to forward frames intelligently." },
    { q: "Which addressing is used to deliver a datagram from one interface to another physically-connected interface on the same LAN?", opts: ["MAC Address", "IP Address", "Port Number", "Subnet Mask"], ans: "MAC Address", exp: "While IP addresses provide end-to-end delivery, MAC (Hardware) addresses are used for hop-by-hop delivery across a single LAN segment." },
    { q: "What happens during the Exponential Backoff phase in CSMA/CD?", opts: ["After a collision, a node waits a random amount of time before retransmitting, which doubles with each successive collision", "The sender increases its transmission speed exponentially", "The network drops all packets until traffic clears", "The receiver sends negative acknowledgments exponentially"], ans: "After a collision, a node waits a random amount of time before retransmitting, which doubles with each successive collision", exp: "Exponential backoff adapts to network load. The wait time window grows (0, 1, 2, 4, 8) after repeated collisions." },
    { q: "Which IPv6 feature replaces the IPv4 Checksum?", opts: ["It is removed entirely to reduce processing time at each hop", "It is replaced by a 128-bit CRC", "It is handled by the Flow Label", "It is replaced by an IPSec hash"], ans: "It is removed entirely to reduce processing time at each hop", exp: "To speed up router forwarding, IPv6 relies on Data Link Layer (like Ethernet CRC) and Transport Layer (TCP/UDP checksums) for error detection." }
];

const advancedShortAnswerBank = [
    { q: "Explain how 'Longest Prefix Matching' works in an IP Router's forwarding table.", ans: "When a router receives a packet, it compares the destination IP against its routing table. If multiple subnet prefixes match, the router forwards the packet to the interface associated with the longest (most specific) matching prefix.", exp: "Longest prefix matching allows for hierarchical addressing and route aggregation, ensuring packets are routed to the most specific sub-network possible." },
    { q: "Describe the 'Hidden Terminal Problem' in Wireless LANs and how IEEE 802.11 solves it.", ans: "The Hidden Terminal Problem occurs when two nodes (A and C) can both transmit to B but cannot hear each other, causing collisions at B. It is solved using RTS/CTS (Request To Send / Clear To Send) packets.", exp: "RTS/CTS reserves the channel. A sends RTS, B broadcasts CTS. C hears the CTS and knows to wait, avoiding the collision." },
    { q: "Explain the difference between Link State (LS) and Distance Vector (DV) routing algorithms.", ans: "LS algorithms (OSPF) require every router to have a full topology map to compute shortest paths (Dijkstra). DV algorithms (RIP) only know their neighbors and iteratively share distance estimates (Bellman-Ford).", exp: "LS is faster to converge but requires more memory and CPU. DV is simpler but prone to 'count-to-infinity' routing loops." },
    { q: "What is ARP (Address Resolution Protocol) and why is it essential in a LAN?", ans: "ARP translates a known logical IP address into an unknown physical MAC address. It broadcasts a query asking 'Who has this IP?', and the target responds with its MAC address.", exp: "Even if a packet knows its final IP destination, it cannot traverse the physical Ethernet wire without the destination's MAC address. ARP bridges this gap." },
    { q: "Detail the steps of the CSMA/CD protocol when a collision occurs on an Ethernet network.", ans: "1. Collision detected. 2. Transmission aborted. 3. Jam signal sent to notify all nodes. 4. Nodes enter Exponential Backoff (wait a random time). 5. Retry transmission if channel is idle.", exp: "CSMA/CD (Collision Detection) ensures that when two signals collide, nodes back off randomly to prevent continuous immediate collisions." },
    { q: "Explain the concept of DHCP (Dynamic Host Configuration Protocol) and its 4-step process (DORA).", ans: "DHCP automatically assigns IP addresses to devices. The 4 steps are: Discover (client broadcasts), Offer (server offers IP), Request (client requests it), Acknowledgment (server confirms).", exp: "DHCP eliminates the need for manual IP configuration, making networks 'plug-and-play' for users." },
    { q: "What is IPv6 Tunneling and why is it used during the transition from IPv4?", ans: "Tunneling encapsulates an IPv6 packet inside an IPv4 datagram so it can travel across legacy IPv4 routers, allowing isolated IPv6 networks to communicate.", exp: "Since it's impossible to upgrade the entire Internet to IPv6 at once (no 'flag day'), Tunneling acts as a bridge for compatibility." },
    { q: "Differentiate between Hubs, Bridges, and Routers in terms of OSI layers and collision domains.", ans: "Hub (Layer 1): Broadcasts everything, 1 large collision domain. Bridge/Switch (Layer 2): Filters by MAC, separates collision domains. Router (Layer 3): Routes by IP, separates broadcast domains.", exp: "As you move up the OSI model, networking devices become 'smarter', isolating traffic better to improve network performance." }
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
                const baseQ = advancedMcqBank[i % advancedMcqBank.length];
                const finalOptions = [...baseQ.opts];
                shuffle(finalOptions);
                questionsToInsert.push({
                    subjectId: subjectId,
                    category: category,
                    type: "MULTIPLE_CHOICE",
                    difficulty: "HARD",
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
                const baseQ = advancedShortAnswerBank[i % advancedShortAnswerBank.length];
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

        // Generation Strategy for extra advanced questions:
        addMCQs(10, "QUIZ");
        addMCQs(15, "EXERCISE");
        addShortAnswers(20, "POSSIBLE QNS");
        
        addMCQs(5, "CAT 1");
        addShortAnswers(5, "CAT 1");

        addMCQs(5, "CAT 2");
        addShortAnswers(5, "CAT 2");

        addMCQs(10, "UE");
        addShortAnswers(5, "UE");

        const result = await db.collection('questions').insertMany(questionsToInsert);
        console.log(`Successfully inserted ${result.insertedCount} ADVANCED questions for BASIC DATA COMMUNICATION.`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
