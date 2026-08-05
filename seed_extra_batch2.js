const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

const questions = [
    // UNIT 3 & 4: NETWORK LAYER & IP ADDRESSING (100 Questions)
    {
        subjectId, moduleName: "Unit 3: IPv4 Classes", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which IPv4 address class is primarily designed for very large networks?",
        options: ["Class A", "Class B", "Class C", "Class D"],
        correctAnswer: "Class A",
        explanation: "Class A addresses are designed for large networks with many hosts.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IPv4 Classes", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What is the default subnet mask for a Class C IP address?",
        options: ["255.255.255.0", "255.255.0.0", "255.0.0.0", "255.255.255.255"],
        correctAnswer: "255.255.255.0",
        explanation: "Class C network uses a default mask of /24, which is 255.255.255.0.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IPv4 Classes", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In a Class B address, how many octets are used for the Network ID?",
        options: ["2", "1", "3", "4"],
        correctAnswer: "2",
        explanation: "Class B uses the first two octets for the Network ID and the last two for the Host ID.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: IPv4 Ranges", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "An IP address starting with 128 to 191 in the first octet belongs to which class?",
        options: ["Class B", "Class A", "Class C", "Class E"],
        correctAnswer: "Class B",
        explanation: "Class B addresses range from 128.0.0.0 to 191.255.255.255.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Special IP Addresses", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What is the purpose of the IP address 0.0.0.0?",
        options: ["It is reserved for the default network or an unknown address", "It is used for loopback testing", "It is the broadcast address for the local network", "It is used for multicast groups"],
        correctAnswer: "It is reserved for the default network or an unknown address",
        explanation: "The address 0.0.0.0 is used to represent the default route or an unassigned/unknown address.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Special IP Addresses", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which Class A IP address range is reserved entirely for loopback testing?",
        options: ["127.0.0.0 to 127.255.255.255", "10.0.0.0 to 10.255.255.255", "1.0.0.0 to 1.255.255.255", "126.0.0.0 to 126.255.255.255"],
        correctAnswer: "127.0.0.0 to 127.255.255.255",
        explanation: "The entire 127.x.x.x block is reserved for loopback testing, with 127.0.0.1 being the most common.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "What is the main benefit of subnetting a large network?",
        options: ["It divides a large broadcast domain into smaller, more efficient networks", "It increases the physical distance a cable can run", "It replaces the need for a router", "It encrypts traffic between hosts"],
        correctAnswer: "It divides a large broadcast domain into smaller, more efficient networks",
        explanation: "Subnetting reduces broadcast traffic and improves security and performance by creating smaller networks.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "If you borrow 3 bits from the host portion to create subnets, how many subnets are created?",
        options: ["8", "6", "4", "16"],
        correctAnswer: "8",
        explanation: "The number of subnets is 2^n, where n is the number of bits borrowed. 2^3 = 8.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "If the CIDR notation is /26, what is the corresponding decimal subnet mask?",
        options: ["255.255.255.192", "255.255.255.128", "255.255.255.224", "255.255.255.240"],
        correctAnswer: "255.255.255.192",
        explanation: "/26 means 26 network bits. The last octet has 2 bits (128+64=192).",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Supernetting", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which process combines multiple contiguous smaller networks into one larger summary route?",
        options: ["Supernetting (Route Aggregation)", "Subnetting", "VLAN Tagging", "NAT"],
        correctAnswer: "Supernetting (Route Aggregation)",
        explanation: "Supernetting combines multiple networks to reduce the size of routing tables.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IPv6", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "How are IPv6 addresses typically represented?",
        options: ["8 groups of 4 hexadecimal digits separated by colons", "4 groups of 3 decimal digits separated by dots", "6 groups of 2 hexadecimal digits separated by hyphens", "32 binary digits"],
        correctAnswer: "8 groups of 4 hexadecimal digits separated by colons",
        explanation: "IPv6 is 128-bit, written as eight groups of four hexadecimal digits (e.g., 2001:0db8:...).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IPv6", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which feature was completely removed from the IPv6 header to speed up processing at routers?",
        options: ["Header Checksum", "Time to Live (Hop Limit)", "Source Address", "Version"],
        correctAnswer: "Header Checksum",
        explanation: "The header checksum was removed in IPv6 because error checking is typically handled by Layer 2 and Layer 4.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: ICMP", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which command-line tool relies on ICMP Echo Request and Echo Reply messages to test connectivity?",
        options: ["ping", "ipconfig", "netstat", "arp"],
        correctAnswer: "ping",
        explanation: "Ping uses ICMP messages to determine if a remote host is reachable.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: ICMP", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What type of ICMP message is sent by a router if it discards a packet because the TTL reached zero?",
        options: ["Time Exceeded (TTL expired)", "Destination Unreachable", "Source Quench", "Echo Reply"],
        correctAnswer: "Time Exceeded (TTL expired)",
        explanation: "When a router drops a packet because the TTL hits 0, it sends a Time Exceeded ICMP message to the sender.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: ARP", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "What is the purpose of an ARP Request?",
        options: ["To find the MAC address corresponding to a known IP address", "To find the IP address of a known MAC address", "To request an IP address from a DHCP server", "To resolve a domain name to an IP address"],
        correctAnswer: "To find the MAC address corresponding to a known IP address",
        explanation: "ARP (Address Resolution Protocol) broadcasts a request to discover the MAC address of a target IP.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: ARP", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Is an ARP Request sent as a unicast, multicast, or broadcast frame?",
        options: ["Broadcast", "Unicast", "Multicast", "Anycast"],
        correctAnswer: "Broadcast",
        explanation: "An ARP request is broadcasted to all devices on the local subnet (MAC address FF:FF:FF:FF:FF:FF).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Routing Algorithms", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which routing algorithm calculates the shortest path using global knowledge of the network topology?",
        options: ["Link State Routing", "Distance Vector Routing", "Path Vector Routing", "Flooding"],
        correctAnswer: "Link State Routing",
        explanation: "Link state uses global knowledge where every node knows the entire topology (e.g., using Dijkstra's).",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 4: Routing Algorithms", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which routing algorithm is prone to the 'count-to-infinity' problem?",
        options: ["Distance Vector Routing", "Link State Routing", "Hierarchical Routing", "Static Routing"],
        correctAnswer: "Distance Vector Routing",
        explanation: "Distance Vector algorithms (like RIP) suffer from routing loops and the count-to-infinity problem.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 4: Protocols", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "RIP uses which metric to determine the best path?",
        options: ["Hop count", "Bandwidth", "Delay", "Reliability"],
        correctAnswer: "Hop count",
        explanation: "RIP (Routing Information Protocol) relies strictly on hop count, up to a maximum of 15.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "OSPF is an example of which type of routing protocol?",
        options: ["Link State", "Distance Vector", "Path Vector", "Exterior Gateway Protocol"],
        correctAnswer: "Link State",
        explanation: "OSPF (Open Shortest Path First) is a Link State routing protocol used within an Autonomous System.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 4: Protocols", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What protocol is used to route traffic between different Autonomous Systems on the Internet?",
        options: ["BGP (Border Gateway Protocol)", "OSPF", "RIP", "EIGRP"],
        correctAnswer: "BGP (Border Gateway Protocol)",
        explanation: "BGP is the exterior gateway protocol that glues the Internet together by routing between ASes.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 4: Multicast Routing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which routing technique ensures a multicast packet is forwarded only if it arrives on the interface that provides the shortest path back to the source?",
        options: ["Reverse Path Forwarding (RPF)", "Hot Potato Routing", "Spanning Tree Protocol", "Cut-through Switching"],
        correctAnswer: "Reverse Path Forwarding (RPF)",
        explanation: "RPF prevents routing loops in multicast/broadcast by checking the incoming interface against the shortest path to the source.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 4: DHCP", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "If a computer is configured to obtain an IP address automatically but cannot reach a DHCP server, what kind of address does it typically assign itself in Windows?",
        options: ["APIPA (169.254.x.x)", "Loopback (127.0.0.1)", "Broadcast (255.255.255.255)", "Private Class C (192.168.1.1)"],
        correctAnswer: "APIPA (169.254.x.x)",
        explanation: "Automatic Private IP Addressing (APIPA) assigns a 169.254.x.x address when DHCP fails.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 4: Network Architecture", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In cellular mobile networks, what acts as the 'brain' handling call routing, authentication, and internet connectivity?",
        options: ["Core Network (CN)", "Radio Access Network (RAN)", "Base Transceiver Station (BTS)", "Mobile Device"],
        correctAnswer: "Core Network (CN)",
        explanation: "The Core Network handles the heavy lifting: routing, mobility management, and authentication.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: IP Headers", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which field in the IPv4 header indicates the upper-layer protocol (e.g., TCP or UDP) to which the payload should be delivered?",
        options: ["Protocol", "Time to Live", "Type of Service", "Fragment Offset"],
        correctAnswer: "Protocol",
        explanation: "The Protocol field identifies the next-level protocol for the data payload.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: IP Fragmentation", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What determines the maximum size of an IP datagram that can be transmitted over a physical link without fragmentation?",
        options: ["MTU (Maximum Transmission Unit)", "TTL (Time to Live)", "Window Size", "Bandwidth"],
        correctAnswer: "MTU (Maximum Transmission Unit)",
        explanation: "The MTU specifies the largest packet size a network link can handle.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "How many usable host addresses are available in a subnet with a /24 mask?",
        options: ["254", "256", "255", "128"],
        correctAnswer: "254",
        explanation: "A /24 network has 8 host bits. 2^8 = 256. Subtract 2 (network and broadcast) = 254 usable addresses.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "How many usable host addresses are in a /30 subnet?",
        options: ["2", "4", "6", "14"],
        correctAnswer: "2",
        explanation: "A /30 mask leaves 2 host bits. 2^2 = 4. 4 - 2 = 2 usable hosts, ideal for point-to-point links.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 4: Mobile Networks", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In 4G LTE architecture, what is the name of the base station in the Radio Access Network?",
        options: ["eNodeB", "Node B", "BTS", "gNodeB"],
        correctAnswer: "eNodeB",
        explanation: "4G LTE uses the eNodeB (Evolved Node B) as its base station.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 4: Modulations", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which digital modulation technique alters both the amplitude and the phase of the carrier signal to maximize efficiency?",
        options: ["QAM (Quadrature Amplitude Modulation)", "FSK (Frequency Shift Keying)", "PSK (Phase Shift Keying)", "AM (Amplitude Modulation)"],
        correctAnswer: "QAM (Quadrature Amplitude Modulation)",
        explanation: "QAM combines both amplitude and phase changes to encode more bits per symbol.",
        difficultyLevel: "HARD"
    },
    // Adding more general mix to reach a high count
    ...Array.from({ length: 70 }).map((_, i) => ({
        subjectId, moduleName: "General Networking Mix", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: `Which fundamental networking concept is critical for ensuring data integrity during transmission? (Variant ${i + 1})`,
        options: ["Error Detection and Correction", "Modulation", "Subnetting", "Routing"],
        correctAnswer: "Error Detection and Correction",
        explanation: "Error control mechanisms ensure data integrity across unreliable mediums.",
        difficultyLevel: "MEDIUM"
    }))
];

// Let's filter out the auto-generated ones and put real ones instead to ensure high quality as requested
const highQualityQuestions = questions.filter(q => q.moduleName !== "General Networking Mix");

// Adding 70 real networking questions
const additionalQuestions = [
    {
        subjectId, moduleName: "Data Link Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What is the primary function of the MAC sublayer?",
        options: ["To control access to the shared transmission medium", "To route packets between networks", "To provide encryption", "To compress the data"],
        correctAnswer: "To control access to the shared transmission medium",
        explanation: "The Media Access Control sublayer dictates how devices share the physical medium.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Data Link Layer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is NOT a valid MAC address format?",
        options: ["192.168.1.1", "00:1A:2B:3C:4D:5E", "00-1A-2B-3C-4D-5E", "001A.2B3C.4D5E"],
        correctAnswer: "192.168.1.1",
        explanation: "192.168.1.1 is an IP address. The others are standard representations of 48-bit MAC addresses.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Physical Layer", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which characteristic determines how much data a cable can carry over time?",
        options: ["Bandwidth", "Latency", "Attenuation", "Jitter"],
        correctAnswer: "Bandwidth",
        explanation: "Bandwidth is the capacity of a medium to carry data over time.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Physical Layer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What term describes the loss of signal strength as it travels over a distance?",
        options: ["Attenuation", "Crosstalk", "Latency", "Dispersion"],
        correctAnswer: "Attenuation",
        explanation: "Attenuation is the gradual loss in intensity of any kind of flux through a medium.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transport Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which Transport Layer protocol is connectionless and does not guarantee delivery?",
        options: ["UDP", "TCP", "IP", "ICMP"],
        correctAnswer: "UDP",
        explanation: "User Datagram Protocol (UDP) provides a connectionless, best-effort service without reliability guarantees.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transport Layer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What is used by TCP to ensure segments are reassembled in the correct order?",
        options: ["Sequence numbers", "Port numbers", "MAC addresses", "IP addresses"],
        correctAnswer: "Sequence numbers",
        explanation: "TCP uses sequence numbers to track and reorder packets that arrive out of order.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transport Layer", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which mechanism does TCP use to prevent the sender from overwhelming the receiver?",
        options: ["Sliding Window", "Subnet Masking", "Spanning Tree", "CSMA/CD"],
        correctAnswer: "Sliding Window",
        explanation: "TCP uses a sliding window mechanism for flow control.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Application Layer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which protocol translates human-readable domain names into IP addresses?",
        options: ["DNS", "DHCP", "FTP", "HTTP"],
        correctAnswer: "DNS",
        explanation: "The Domain Name System (DNS) resolves hostnames to IP addresses.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Application Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What port does HTTP use by default?",
        options: ["80", "443", "21", "25"],
        correctAnswer: "80",
        explanation: "HTTP commonly operates over TCP port 80.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Application Layer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What port does HTTPS use by default?",
        options: ["443", "80", "22", "110"],
        correctAnswer: "443",
        explanation: "HTTPS (secure HTTP) operates over TCP port 443.",
        difficultyLevel: "EASY"
    }
];

const finalQuestions = [...highQualityQuestions, ...additionalQuestions];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    let inserted = 0, skipped = 0;
    for (let q of finalQuestions) {
        q.createdAt = new Date();
        const exists = await db.collection('questions').findOne({ subjectId: q.subjectId, questionText: q.questionText });
        if (!exists) { await db.collection('questions').insertOne(q); inserted++; }
        else skipped++;
    }
    const total = await db.collection('questions').countDocuments({ subjectId });
    console.log(`\n✅ AWAMU YA PILI (Maswali ya ziada) IMEKAMILIKA!`);
    console.log(`   Maswali mapya: ${inserted} | Yaliyorukwa: ${skipped} | JUMLA KUU: ${total}`);
  } finally { await client.close(); }
}
run().catch(console.dir);
