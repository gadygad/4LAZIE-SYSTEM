const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 2: Addressing & Routing Design";

const questions = [
    // --- IPv4 vs IPv6 ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary difference in address length between IPv4 and IPv6?",
        options: [
            "IPv4 is 16-bit and IPv6 is 64-bit.",
            "IPv4 is 32-bit and IPv6 is 128-bit.",
            "IPv4 is 64-bit and IPv6 is 256-bit.",
            "IPv4 is 128-bit and IPv6 is 32-bit."
        ],
        correctAnswer: "IPv4 is 32-bit and IPv6 is 128-bit.",
        explanation: "IPv4 uses a 32-bit decimal format, while IPv6 was developed using a 128-bit hexadecimal format to solve the address shortage."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which of the following is a key advantage that IPv6 holds over IPv4 regarding network translation?",
        options: [
            "IPv6 requires complex NAT to function correctly.",
            "IPv6 does not require Network Address Translation (NAT).",
            "IPv6 relies heavily on broadcast traffic for NAT.",
            "IPv6 limits the number of public addresses to avoid NAT."
        ],
        correctAnswer: "IPv6 does not require Network Address Translation (NAT).",
        explanation: "Because IPv6 has a virtually unlimited address space (128-bit), NAT is not required as every device can have a unique global address."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "An organization is migrating from IPv4 to IPv6. They note that IPv6 has 'Built-in security'. What specific feature provides this in IPv6?",
        options: [
            "Mandatory Access Control Lists (ACLs).",
            "Built-in IPSec (Internet Protocol Security).",
            "Automatic VLAN routing.",
            "Dynamic ARP inspection."
        ],
        correctAnswer: "Built-in IPSec (Internet Protocol Security).",
        explanation: "While IPSec is optional and often complex to implement in IPv4, it is built directly into the IPv6 protocol suite by design."
    },

    // --- Subnetting (FLSM vs VLSM) ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary purpose of subnetting a large network?",
        options: [
            "To increase the amount of broadcast traffic.",
            "To divide one large network into smaller, manageable networks.",
            "To convert IPv4 addresses into IPv6 addresses automatically.",
            "To replace routers with high-speed core switches."
        ],
        correctAnswer: "To divide one large network into smaller, manageable networks.",
        explanation: "Subnetting divides a large network into smaller subnets, which improves performance, security, and traffic management."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "A network uses a subnet mask of 255.255.255.0. What does the subnet mask specifically identify?",
        options: [
            "It identifies the router's physical MAC address.",
            "It identifies the difference between the network portion and the host portion of the IP.",
            "It identifies the number of switches present in the local area network.",
            "It identifies the exact distance vector metric of the protocol."
        ],
        correctAnswer: "It identifies the difference between the network portion and the host portion of the IP.",
        explanation: "The subnet mask is used to separate the network ID from the host ID within an IP address."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A company needs to divide its 192.168.10.0/24 network. HR needs 100 hosts, Sales needs 50 hosts, and Admin needs 25 hosts. Which subnetting technique allows this without wasting IP addresses, and which department is calculated first?",
        options: [
            "FLSM; The Admin department is calculated first.",
            "VLSM; The HR department is calculated first.",
            "FLSM; The HR department is calculated first.",
            "VLSM; The Admin department is calculated first."
        ],
        correctAnswer: "VLSM; The HR department is calculated first.",
        explanation: "Variable Length Subnet Mask (VLSM) allows different subnet sizes for efficient IP usage. You always calculate starting with the largest network first (HR: 100 hosts)."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "In Fixed Length Subnet Mask (FLSM), if a network borrows 2 bits for subnetting (2^2 = 4), what happens to the resulting subnets?",
        options: [
            "They will all have different subnet masks and host capacities.",
            "They will all use the same subnet mask and support the same number of hosts.",
            "Only the first subnet will be usable for data transmission.",
            "The network will automatically switch to IPv6 prefix routing."
        ],
        correctAnswer: "They will all use the same subnet mask and support the same number of hosts.",
        explanation: "In FLSM, all created subnets are of equal size, meaning they share the same subnet mask and number of hosts, which can lead to inefficient IP usage."
    },

    // --- Routing Protocols Overview ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary function of a Routing Protocol?",
        options: [
            "To assign dynamic IP addresses to end users.",
            "To share network information, discover routes, and select the best path.",
            "To encrypt data packets before they cross the internet.",
            "To physically connect cables in the Access layer."
        ],
        correctAnswer: "To share network information, discover routes, and select the best path.",
        explanation: "A routing protocol is a set of rules used by routers to discover networks, exchange routing info, and update routing tables."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "What is a major disadvantage of using Static Routing over Dynamic Routing in a large enterprise network?",
        options: [
            "It generates too much routing overhead on the CPU.",
            "It is highly unsecure and vulnerable to attacks.",
            "It is difficult to manage and requires manual updates if a link fails.",
            "It forces the routers to use the slow RIP protocol."
        ],
        correctAnswer: "It is difficult to manage and requires manual updates if a link fails.",
        explanation: "Static routes must be manually configured. In a large network, if a topology changes or a link fails, the administrator must manually update the routes."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Which of the following routing protocols is classified as an Exterior Gateway Protocol (EGP) used between different organizations and ISPs?",
        options: [
            "OSPF (Open Shortest Path First)",
            "RIP (Routing Information Protocol)",
            "EIGRP (Enhanced Interior Gateway Routing Protocol)",
            "BGP (Border Gateway Protocol)"
        ],
        correctAnswer: "BGP (Border Gateway Protocol)",
        explanation: "BGP is the only Exterior Gateway Protocol (EGP) listed, used for Internet-scale, policy-based routing between different autonomous systems or ISPs."
    },

    // --- RIP, OSPF, EIGRP Specifics ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which routing protocol uses 'Hop Count' as its metric and has a maximum limit of 15 hops?",
        options: [
            "RIP",
            "OSPF",
            "EIGRP",
            "BGP"
        ],
        correctAnswer: "RIP",
        explanation: "Routing Information Protocol (RIP) is a distance-vector protocol that uses hop count as its metric, making it unsuitable for large networks (max 15 hops)."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "OSPF is an Interior Gateway Protocol (IGP) that relies on a specific algorithm to find the shortest path. Which algorithm does it use?",
        options: [
            "Distance Vector Algorithm",
            "DUAL (Diffusing Update Algorithm)",
            "Dijkstra Shortest Path First Algorithm",
            "Path Vector Algorithm"
        ],
        correctAnswer: "Dijkstra Shortest Path First Algorithm",
        explanation: "OSPF is a Link-State protocol that builds a topology database and runs the Dijkstra Shortest Path First (SPF) algorithm to select the best routes."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "EIGRP calculates its metric using a specific formula. Which two primary factors are used by default in the EIGRP metric calculation?",
        options: [
            "Hop Count and Link Cost",
            "Bandwidth and Delay",
            "Reliability and MTU",
            "Link State and Path Vector"
        ],
        correctAnswer: "Bandwidth and Delay",
        explanation: "While EIGRP can use Reliability, Load, and MTU, its default metric calculation formula primarily relies on Bandwidth and Delay, multiplied by 256."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 2", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "In OSPF network design, what is the specific role of 'Area 0'?",
        options: [
            "It is the stub area that receives no external routes.",
            "It is the Backbone Area to which all other areas must connect.",
            "It is the area reserved exclusively for IPv6 routing.",
            "It is the administrative area for VLSM configuration."
        ],
        correctAnswer: "It is the Backbone Area to which all other areas must connect.",
        explanation: "OSPF uses a hierarchical design where Area 0 is the Backbone Area. All other areas must physically or logically connect to Area 0."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which routing protocol is described as a 'Hybrid Routing Protocol' because it combines features of both Distance Vector and Link-State protocols?",
        options: [
            "RIP",
            "OSPF",
            "EIGRP",
            "BGP"
        ],
        correctAnswer: "EIGRP",
        explanation: "Developed by Cisco, EIGRP is considered an advanced Distance Vector or Hybrid protocol because it utilizes both distance-vector logic and link-state rapid convergence features."
    },

    // --- Route Summarization ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary benefit of Route Summarization in a computer network?",
        options: [
            "It increases the size of the routing table for accuracy.",
            "It combines multiple network routes into a single summarized route to reduce table size.",
            "It converts IPv4 addresses to IPv6 automatically.",
            "It forces routers to process every single sub-network individually."
        ],
        correctAnswer: "It combines multiple network routes into a single summarized route to reduce table size.",
        explanation: "Route summarization (or Route Aggregation) compresses multiple routes into one, reducing routing table size, CPU usage, and memory."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "When performing Route Summarization, you must align the binary formats of the IP addresses. The summarized prefix is determined by what?",
        options: [
            "The number of different bits between all the addresses.",
            "The common matching bits from left to right across all addresses.",
            "The total number of host bits remaining in the subnet mask.",
            "The highest IP address present in the network group."
        ],
        correctAnswer: "The common matching bits from left to right across all addresses.",
        explanation: "In summarization, you convert addresses to binary and count the consecutive common matching bits from the left to determine the new summary prefix."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "In OSPF, where does Route Summarization typically occur by design?",
        options: [
            "At any generic Access Layer switch.",
            "Between ASBRs and ISPs only.",
            "At the Area Border Router (ABR) between areas.",
            "Inside the routing table of a PC."
        ],
        correctAnswer: "At the Area Border Router (ABR) between areas.",
        explanation: "OSPF does not support automatic summarization everywhere; manual summarization is typically performed at the Area Border Router (ABR) connecting an Area to Area 0."
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
        console.log(`Successfully generated and inserted ${inserted} elite questions for Unit 2!`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
