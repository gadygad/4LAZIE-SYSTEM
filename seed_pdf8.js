const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

const questions = [
    // ROUTING AND FORWARDING
    {
        subjectId, moduleName: "Unit 3: Network Layer (Ch 4)", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What is the primary function of forwarding in the network layer?",
        options: ["Moving packets from a router's input to the appropriate router output", "Determining the route taken by packets from source to destination", "Establishing a virtual connection before datagrams flow", "Handling bit-level reception on the physical link"],
        correctAnswer: "Moving packets from a router's input to the appropriate router output",
        explanation: "Forwarding moves packets from a router's input to the appropriate router output, while routing determines the path taken from source to destination.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer (Ch 4)", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following determines the route taken by packets from the source to the destination?",
        options: ["Routing algorithms", "Switching fabrics", "Input ports", "Subnet masks"],
        correctAnswer: "Routing algorithms",
        explanation: "Routing algorithms determine the path or route taken by packets from the source to the destination.",
        difficultyLevel: "EASY"
    },
    // VIRTUAL CIRCUITS VS DATAGRAMS
    {
        subjectId, moduleName: "Unit 3: Network Layer (Ch 4)", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In a Virtual Circuit (VC) network, what happens before data can flow?",
        options: ["Call setup and teardown", "Packets are forwarded based on destination host address", "Routers broadcast their distance vectors", "The sender requests an IP address via DHCP"],
        correctAnswer: "Call setup and teardown",
        explanation: "Virtual circuits require call setup and teardown for each call before data can flow.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer (Ch 4)", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In a datagram network, packets are forwarded using the:",
        options: ["Destination host address", "Virtual Circuit (VC) identifier", "Source MAC address", "Time-To-Live (TTL) value"],
        correctAnswer: "Destination host address",
        explanation: "In datagram networks, packets are forwarded using the destination host address, and there is no call setup at the network layer.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer (Ch 4)", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Why is the Internet designed as a datagram network rather than a VC network?",
        options: ["It assumes 'smart' end systems (computers) that can perform control and error recovery", "It evolved from telephony which required strict timing", "It relies on 'dumb' end systems like traditional telephones", "It requires guaranteed service and bandwidth for every flow"],
        correctAnswer: "It assumes 'smart' end systems (computers) that can perform control and error recovery",
        explanation: "The Internet uses a datagram model because it has 'smart' end systems that can adapt and recover from errors, keeping the network core simple.",
        difficultyLevel: "HARD"
    },
    // ROUTER ARCHITECTURE
    {
        subjectId, moduleName: "Unit 3: Router Architecture", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which type of switching fabric allows a datagram to move from input port memory to output port memory via a shared bus, limited by bus bandwidth?",
        options: ["Switching via a bus", "Switching via memory", "Switching via an interconnection network", "Switching via Banyan networks"],
        correctAnswer: "Switching via a bus",
        explanation: "Switching via a bus involves moving a datagram across a shared bus, and the speed is limited by the bus bandwidth.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Router Architecture", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What phenomenon occurs when a queued datagram at the front of the input queue prevents others in the queue from moving forward?",
        options: ["Head-of-the-Line (HOL) blocking", "Routing loop", "Count-to-infinity problem", "Broadcast storm"],
        correctAnswer: "Head-of-the-Line (HOL) blocking",
        explanation: "Head-of-the-Line (HOL) blocking happens when a datagram at the front of an input queue blocks others behind it.",
        difficultyLevel: "HARD"
    },
    // IP PROTOCOL (FORMAT, FRAGMENTATION)
    {
        subjectId, moduleName: "Unit 3: IPv4", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "What is the typical size of an IPv4 header without options?",
        options: ["20 bytes", "40 bytes", "16 bytes", "32 bytes"],
        correctAnswer: "20 bytes",
        explanation: "A standard IPv4 header is 20 bytes long. With 20 bytes of TCP, the total overhead is usually 40 bytes.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IPv4", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which IPv4 header field is decremented at each router to prevent a packet from circulating endlessly?",
        options: ["Time to live (TTL)", "Header checksum", "Fragment offset", "Type of service"],
        correctAnswer: "Time to live (TTL)",
        explanation: "The Time to Live (TTL) field is decremented at each router to ensure packets don't loop forever.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IPv4", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Where are fragmented IP datagrams typically reassembled?",
        options: ["Only at the final destination", "At the next hop router", "At every gateway router", "At the source host before transmission"],
        correctAnswer: "Only at the final destination",
        explanation: "IP fragments are reassembled only at the final destination host.",
        difficultyLevel: "MEDIUM"
    },
    // IP ADDRESSING (CIDR, DHCP, NAT)
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In CIDR notation (e.g., a.b.c.d/x), what does the 'x' represent?",
        options: ["The number of bits in the subnet portion of the address", "The number of bits in the host portion of the address", "The number of subnets available", "The time-to-live for the route advertisement"],
        correctAnswer: "The number of bits in the subnet portion of the address",
        explanation: "In CIDR (Classless Inter-Domain Routing), the /x indicates the number of bits in the network/subnet portion.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which protocol allows a host to dynamically obtain its IP address from a network server when it joins the network?",
        options: ["DHCP", "DNS", "ARP", "ICMP"],
        correctAnswer: "DHCP",
        explanation: "DHCP (Dynamic Host Configuration Protocol) allows a host to dynamically get an IP address.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In a DHCP client-server scenario, what is the first message broadcasted by a new client?",
        options: ["DHCP discover", "DHCP offer", "DHCP request", "DHCP ack"],
        correctAnswer: "DHCP discover",
        explanation: "The client first broadcasts a 'DHCP discover' message to find a DHCP server.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What technology allows a local network to use just one public IP address as far as the outside world is concerned?",
        options: ["NAT (Network Address Translation)", "CIDR (Classless Inter-Domain Routing)", "DHCP", "BGP"],
        correctAnswer: "NAT (Network Address Translation)",
        explanation: "NAT allows an entire local network to share a single public IP address using different port numbers.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What information does a NAT router use in its translation table to map incoming datagrams to the correct internal host?",
        options: ["NAT IP address and new port number", "Internal host MAC address", "DHCP lease time", "Subnet mask and default gateway"],
        correctAnswer: "NAT IP address and new port number",
        explanation: "NAT routers replace the NAT IP and new port number in the destination fields of incoming datagrams with the corresponding internal source IP and port.",
        difficultyLevel: "HARD"
    },
    // ICMP and IPv6
    {
        subjectId, moduleName: "Unit 3: ICMP & IPv6", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which protocol is used by hosts and routers to communicate network-level information, such as error reporting (e.g., host unreachable)?",
        options: ["ICMP", "TCP", "UDP", "ARP"],
        correctAnswer: "ICMP",
        explanation: "ICMP (Internet Control Message Protocol) is used for error reporting and diagnostics like ping.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: ICMP & IPv6", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "How many bytes does the fixed-length header of an IPv6 datagram contain?",
        options: ["40 bytes", "20 bytes", "32 bytes", "64 bytes"],
        correctAnswer: "40 bytes",
        explanation: "IPv6 has a fixed-length 40-byte header.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: ICMP & IPv6", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is NOT allowed in an IPv6 datagram by intermediate routers?",
        options: ["Fragmentation", "Routing", "Forwarding", "Quality of Service (QoS) flow labeling"],
        correctAnswer: "Fragmentation",
        explanation: "In IPv6, fragmentation is not allowed at intermediate routers; it can only be done by the source.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: ICMP & IPv6", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In the transition from IPv4 to IPv6, what technique carries an IPv6 datagram as the payload in an IPv4 datagram?",
        options: ["Tunneling", "Translation", "Dual-stack routing", "Multiplexing"],
        correctAnswer: "Tunneling",
        explanation: "Tunneling is used to carry IPv6 packets across IPv4 networks by encapsulating them within IPv4 datagrams.",
        difficultyLevel: "MEDIUM"
    },
    // ROUTING ALGORITHMS (LS & DV)
    {
        subjectId, moduleName: "Unit 3: Routing Algorithms", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Dijkstra's algorithm is an example of which type of routing algorithm?",
        options: ["Link State (LS)", "Distance Vector (DV)", "Hierarchical", "Path Vector"],
        correctAnswer: "Link State (LS)",
        explanation: "Dijkstra's algorithm is a Link State routing algorithm that requires full network topology and link costs.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Routing Algorithms", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In a Distance Vector (DV) algorithm, what is the basis for distance calculation?",
        options: ["Bellman-Ford equation", "Dijkstra's algorithm", "Prim's algorithm", "Spanning tree protocol"],
        correctAnswer: "Bellman-Ford equation",
        explanation: "Distance Vector algorithms use the Bellman-Ford equation for dynamic programming to calculate least-cost paths.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Routing Algorithms", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which problem in Distance Vector routing is described as 'bad news travels slow'?",
        options: ["Count-to-infinity problem", "Head-of-the-Line blocking", "Broadcast storm", "Subnet masking error"],
        correctAnswer: "Count-to-infinity problem",
        explanation: "The count-to-infinity problem occurs in DV routing when routing loops cause distances to continuously increase before stabilizing.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Routing Algorithms", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What mechanism is used in Distance Vector routing to prevent ping-pong loops by advertising an infinite distance?",
        options: ["Poisoned reverse", "Split horizon", "Hold-down timers", "Triggered updates"],
        correctAnswer: "Poisoned reverse",
        explanation: "Poison reverse is used where a router advertises an infinite distance to a destination on the interface it uses to reach that destination.",
        difficultyLevel: "HARD"
    },
    // INTERNET ROUTING (AS, RIP, OSPF, BGP)
    {
        subjectId, moduleName: "Unit 3: Internet Routing", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "To solve scaling and administrative autonomy issues, the Internet aggregates routers into regions called:",
        options: ["Autonomous Systems (AS)", "Subnets", "Collision Domains", "Virtual LANs"],
        correctAnswer: "Autonomous Systems (AS)",
        explanation: "Routers are grouped into Autonomous Systems (AS) to manage scale and autonomy.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Internet Routing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What routing technique sends a packet towards the closest gateway among multiple options?",
        options: ["Hot potato routing", "Cold potato routing", "Source routing", "Link state routing"],
        correctAnswer: "Hot potato routing",
        explanation: "Hot potato routing chooses the gateway that has the smallest least cost within the AS to rid the network of the packet quickly.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Internet Routing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "RIP (Routing Information Protocol) uses a distance metric of number of hops, with a maximum of:",
        options: ["15 hops", "255 hops", "16 hops", "32 hops"],
        correctAnswer: "15 hops",
        explanation: "In RIP, the maximum valid distance is 15 hops; 16 hops is considered infinite (unreachable).",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Internet Routing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "OSPF (Open Shortest Path First) uses which type of routing algorithm?",
        options: ["Link State algorithm", "Distance Vector algorithm", "Path Vector algorithm", "Static routing"],
        correctAnswer: "Link State algorithm",
        explanation: "OSPF uses a Link State algorithm with Dijkstra's algorithm for route computation.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Internet Routing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which protocol is the de facto standard for inter-AS routing (between different Autonomous Systems) in the Internet?",
        options: ["BGP (Border Gateway Protocol)", "OSPF (Open Shortest Path First)", "RIP (Routing Information Protocol)", "IGRP"],
        correctAnswer: "BGP (Border Gateway Protocol)",
        explanation: "BGP is the protocol used to exchange routing information between different Autonomous Systems across the Internet.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Internet Routing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In BGP, which attribute indicates the list of Autonomous Systems through which a prefix advertisement has passed?",
        options: ["AS-PATH", "NEXT-HOP", "LOCAL-PREF", "MULTI-EXIT-DISC"],
        correctAnswer: "AS-PATH",
        explanation: "The AS-PATH attribute contains the sequence of ASs the route advertisement has traversed.",
        difficultyLevel: "MEDIUM"
    },
    // BROADCAST AND MULTICAST
    {
        subjectId, moduleName: "Unit 3: Broadcast & Multicast", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What problem arises when using uncontrolled flooding for broadcast routing?",
        options: ["Broadcast storms and cycles", "High latency", "Packet fragmentation", "Subnet mask conflicts"],
        correctAnswer: "Broadcast storms and cycles",
        explanation: "Uncontrolled flooding causes nodes to endlessly forward duplicate packets, leading to broadcast storms.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Broadcast & Multicast", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "To ensure that no redundant packets are received by any node during a broadcast, networks often use a:",
        options: ["Spanning tree", "Mesh topology", "Ring topology", "Hub-and-spoke configuration"],
        correctAnswer: "Spanning tree",
        explanation: "A spanning tree creates a loop-free path connecting all nodes, preventing duplicate broadcasts.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Broadcast & Multicast", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In Reverse Path Forwarding (RPF), a router forwards a multicast datagram ONLY if it arrived on:",
        options: ["The shortest path back to the sender", "A designated rendezvous point link", "A pre-configured spanning tree link", "The default gateway link"],
        correctAnswer: "The shortest path back to the sender",
        explanation: "RPF checks if the incoming datagram arrived on the interface that provides the shortest path back to the source.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Broadcast & Multicast", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which multicast routing approach relies on routers explicitly sending 'join' messages to a Rendezvous Point (RP)?",
        options: ["PIM Sparse Mode", "PIM Dense Mode", "DVMRP", "Source-based Shortest Path Tree"],
        correctAnswer: "PIM Sparse Mode",
        explanation: "PIM Sparse Mode uses a center-based approach where routers must explicitly join a Rendezvous Point.",
        difficultyLevel: "HARD"
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
    console.log(`\n✅ PDF 8 (Chapter 4) IMEKAMILIKA!`);
    console.log(`   Maswali mapya: ${inserted} | Yaliyorukwa: ${skipped} | JUMLA: ${total}`);
  } finally { await client.close(); }
}
run().catch(console.dir);
