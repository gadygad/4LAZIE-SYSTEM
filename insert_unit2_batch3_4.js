const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 2: Addressing & Routing Design";

const questions = [
    // --- Deep Cuts: Subnetting Math & Theory ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "If a network administrator borrows 3 bits for subnetting in an FLSM design, how many new subnets are created according to the standard formula (2^n)?",
        options: [
            "4 subnets",
            "6 subnets",
            "8 subnets",
            "16 subnets"
        ],
        correctAnswer: "8 subnets",
        explanation: "The formula for calculating the number of subnets is 2^n, where n is the number of borrowed bits. 2^3 = 8."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "In IPv4 routing, what specific issue does 'Route Summarization' (Supernetting) primarily solve?",
        options: [
            "It automatically assigns DHCP addresses to access layer switches.",
            "It solves the issue of excessively large routing tables consuming memory and CPU.",
            "It prevents the need for NAT translation on edge routers.",
            "It converts Distance Vector protocols into Link-State protocols."
        ],
        correctAnswer: "It solves the issue of excessively large routing tables consuming memory and CPU.",
        explanation: "Route summarization combines multiple separate routes into a single prefix, significantly reducing the routing table size and conserving router CPU and memory."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 2", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "When performing route summarization for networks 192.168.0.0/24 through 192.168.3.0/24, how is the new summarized prefix determined?",
        options: [
            "By taking the highest IP address and adding a /16 mask.",
            "By converting the addresses to binary and counting the common matching bits from left to right.",
            "By multiplying the number of subnets by the borrowed host bits.",
            "By converting the decimal format to hexadecimal."
        ],
        correctAnswer: "By converting the addresses to binary and counting the common matching bits from left to right.",
        explanation: "To summarize routes, network addresses are converted to binary, and the consecutive matching bits shared by all addresses determine the new subnet mask (/prefix)."
    },

    // --- Deep Cuts: IPv6 ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "How is an IPv6 address formally represented compared to an IPv4 address?",
        options: [
            "It is written in 32-bit decimal format.",
            "It is written in 64-bit binary format.",
            "It is written in 128-bit hexadecimal format.",
            "It is written in 256-bit octal format."
        ],
        correctAnswer: "It is written in 128-bit hexadecimal format.",
        explanation: "IPv6 uses 128 bits represented as 8 groups of 4 hexadecimal digits."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Unlike IPv4, IPv6 does not use traditional subnet masks (like 255.255.255.0). What does it use instead?",
        options: [
            "Network Prefix lengths (e.g., /64 or /48).",
            "Distance Vector hop counts.",
            "Area Border Router tags.",
            "Link-State Advertisements."
        ],
        correctAnswer: "Network Prefix lengths (e.g., /64 or /48).",
        explanation: "IPv6 subnetting relies exclusively on CIDR-style prefix lengths (e.g., /64) rather than dotted-decimal subnet masks."
    },

    // --- Deep Cuts: Routing Protocols Specifics ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "What does the 'Slow convergence' disadvantage of RIP mean in a practical network environment?",
        options: [
            "The router takes a long time to boot up when powered on.",
            "If a link fails, it takes a long time for all routers to learn about the failure and find a new path.",
            "The protocol only supports 10 Mbps ethernet speeds.",
            "It forces network traffic to stop entirely during peak hours."
        ],
        correctAnswer: "If a link fails, it takes a long time for all routers to learn about the failure and find a new path.",
        explanation: "Convergence time is how fast routers update their tables after a topology change. RIP is slow, meaning broken links cause routing loops or black holes for a long time."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which routing protocol maintains three specific tables: the Neighbor Table, Topology Table, and Routing Table?",
        options: [
            "RIP",
            "BGP",
            "EIGRP",
            "Static Routing"
        ],
        correctAnswer: "EIGRP",
        explanation: "EIGRP maintains a Neighbor table (who is connected), a Topology table (all known routes), and a Routing table (the best routes selected)."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "In OSPF, what is the specific purpose of the 'DBD' (Database Description) packet type?",
        options: [
            "To send a greeting to discover new neighbors.",
            "To request a specific piece of link-state information from a neighbor.",
            "To provide a summary of the router's link-state database during initial exchange.",
            "To acknowledge the receipt of an update."
        ],
        correctAnswer: "To provide a summary of the router's link-state database during initial exchange.",
        explanation: "The DBD (Database Description) packet contains a summary of the link-state database, allowing neighbors to check if they have missing information before requesting the full updates (LSR)."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Which statement accurately describes a key disadvantage of EIGRP compared to OSPF?",
        options: [
            "EIGRP suffers from the 15-hop limit restriction.",
            "EIGRP is limited by vendor support, as it is primarily a Cisco-proprietary protocol.",
            "EIGRP cannot support Variable Length Subnet Masks (VLSM).",
            "EIGRP relies solely on hop count, ignoring bandwidth."
        ],
        correctAnswer: "EIGRP is limited by vendor support, as it is primarily a Cisco-proprietary protocol.",
        explanation: "Unlike OSPF which is an open standard, EIGRP was developed by Cisco and is less supported on non-Cisco networking equipment."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "What does the abbreviation 'CIDR' stand for, and what problem does it address?",
        options: [
            "Classless Inter-Domain Routing; it replaces strict IP classes (A, B, C) with flexible prefix lengths to save IPs.",
            "Central Internet Data Registry; it stores global MAC addresses.",
            "Computer Internal Distance Routing; it acts as an Interior Gateway Protocol.",
            "Core Interface Default Router; it manages the backbone hardware of a network."
        ],
        correctAnswer: "Classless Inter-Domain Routing; it replaces strict IP classes (A, B, C) with flexible prefix lengths to save IPs.",
        explanation: "CIDR (Classless Inter-Domain Routing) eliminated the strict boundaries of Class A, B, and C networks, allowing subnet masks to be flexibly applied (e.g., /22 or /26) to prevent IP wastage."
    },

    // --- Deep Cuts: OSPF Metrics and BGP ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 2", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "According to the OSPF metric formula, if the interface bandwidth increases (e.g., from 100Mbps to 1Gbps), what happens to the OSPF Cost?",
        options: [
            "The Cost increases.",
            "The Cost remains the same but hop count decreases.",
            "The Cost decreases.",
            "The Cost is multiplied by 256."
        ],
        correctAnswer: "The Cost decreases.",
        explanation: "OSPF Cost = (Reference Bandwidth / Interface Bandwidth). A higher interface bandwidth results in a lower cost, making it the preferred route."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which routing protocol is specifically categorized as a 'Path Vector' protocol?",
        options: [
            "OSPF",
            "RIP",
            "BGP",
            "EIGRP"
        ],
        correctAnswer: "BGP",
        explanation: "BGP (Border Gateway Protocol) uses Path Vector logic to route traffic across the Internet between different Autonomous Systems."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "If an Area Border Router (ABR) performs route summarization in OSPF, what is the primary benefit to the routers inside Area 0?",
        options: [
            "They will convert all IPv4 packets to IPv6.",
            "They will receive smaller routing updates and consume less CPU.",
            "They will switch to a Distance Vector algorithm.",
            "They will be able to bypass firewall ACLs."
        ],
        correctAnswer: "They will receive smaller routing updates and consume less CPU.",
        explanation: "Summarization at the ABR hides the detailed subnets of one area from Area 0, significantly reducing the size of the routing tables the Core routers must process."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which routing protocol features 'Partial updates only' rather than sending the entire routing table periodically?",
        options: [
            "RIP",
            "Static Routing",
            "EIGRP",
            "BGP"
        ],
        correctAnswer: "EIGRP",
        explanation: "EIGRP only sends partial, triggered updates when a topology change occurs, drastically saving bandwidth compared to RIP which sends the full table every 30 seconds."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "What is the primary characteristic of an Interior Gateway Protocol (IGP)?",
        options: [
            "It is used exclusively to route traffic between ISPs on the global internet.",
            "It is used inside a single organization or administrative network domain.",
            "It relies entirely on manual configuration by the administrator.",
            "It converts MAC addresses to IP addresses internally."
        ],
        correctAnswer: "It is used inside a single organization or administrative network domain.",
        explanation: "IGPs (like OSPF, RIP, EIGRP) are used to route traffic within a single organization's network, unlike EGPs (like BGP) which route between organizations."
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
        console.log(`Successfully generated and inserted ${inserted} deep-cut questions for Unit 2 Batch 3&4!`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
