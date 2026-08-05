const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 3: Enterprise Network Design";

const questions = [
    // --- Campus Network Design ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary defining characteristic of a Campus Network?",
        options: [
            "It connects networks globally across continents.",
            "It connects multiple buildings within a limited geographical area.",
            "It is used exclusively for wireless communication.",
            "It is designed solely to store large amounts of enterprise data."
        ],
        correctAnswer: "It connects multiple buildings within a limited geographical area.",
        explanation: "A Campus Network connects buildings within a limited area like a college, university, office, or hospital."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "In the 3-layer Campus Network design, which layer is strictly responsible for 'Inter-VLAN routing' and 'Policy enforcement'?",
        options: [
            "Core Layer",
            "Access Layer",
            "Distribution Layer",
            "Physical Layer"
        ],
        correctAnswer: "Distribution Layer",
        explanation: "The Distribution Layer acts as a middle layer that handles policy enforcement, traffic filtering, and Inter-VLAN routing."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Why does the Core Layer in a Campus Network require 'Minimal processing'?",
        options: [
            "Because it relies on the Access Layer to handle all complex security firewalls.",
            "Because applying heavy processing and filtering at the Core would severely reduce the high-speed data transfer required for the backbone.",
            "Because Core Layer switches are incapable of understanding IP addresses.",
            "Because the Core Layer only connects wireless access points which do not need processing."
        ],
        correctAnswer: "Because applying heavy processing and filtering at the Core would severely reduce the high-speed data transfer required for the backbone.",
        explanation: "The primary function of the Core is high-speed data transfer. Minimal processing ensures it can switch packets extremely fast without being bottlenecked by complex tasks."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which device is absolutely necessary to allow communication between a 'Students VLAN' and a 'Library Server VLAN'?",
        options: [
            "A standard Layer 2 Switch",
            "A Router or a Layer 3 Switch",
            "An Access Point",
            "A Firewall Appliance"
        ],
        correctAnswer: "A Router or a Layer 3 Switch",
        explanation: "VLANs divide networks logically. To communicate between different VLANs (Inter-VLAN Routing), a Layer 3 device (Router or L3 Switch) is required."
    },
    
    // --- WAN Design Concepts ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is considered the largest Wide Area Network (WAN) in the world?",
        options: [
            "A university campus network",
            "A global banking data center",
            "The Internet",
            "A telecom MPLS network"
        ],
        correctAnswer: "The Internet",
        explanation: "The Internet connects computers and networks globally, making it the largest example of a WAN."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which WAN topology involves every single site having a direct connection to every other site?",
        options: [
            "Hub-and-Spoke",
            "Point-to-Point",
            "Full Mesh",
            "Partial Mesh"
        ],
        correctAnswer: "Full Mesh",
        explanation: "In a Full Mesh topology, every site connects to every other site, providing maximum redundancy but at a very high cost."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 2", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Compared to a LAN, why does a WAN typically suffer from 'More Latency'?",
        options: [
            "Because WANs completely lack hardware switches.",
            "Because the physical distance the data must travel is much larger, causing delays.",
            "Because WANs do not use encryption for security.",
            "Because WANs rely entirely on old Frame Relay technology."
        ],
        correctAnswer: "Because the physical distance the data must travel is much larger, causing delays.",
        explanation: "Long-distance transmission across cities or countries naturally introduces higher delay (latency) in data transfer compared to a localized LAN."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which of the following is a recognized modern WAN technology?",
        options: [
            "SD-WAN (Software Defined WAN)",
            "VLAN (Virtual LAN)",
            "STP (Spanning Tree Protocol)",
            "OSPF (Open Shortest Path First)"
        ],
        correctAnswer: "SD-WAN (Software Defined WAN)",
        explanation: "SD-WAN, MPLS, Frame Relay, and ATM are WAN technologies. VLAN and STP are LAN technologies, and OSPF is a routing protocol."
    },

    // --- Data Center Basics ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary function of a Data Center?",
        options: [
            "To connect student laptops in a single building.",
            "To provide internet access to a neighborhood.",
            "To act as a dedicated facility that stores, processes, and manages large amounts of data and applications.",
            "To replace standard desktop computers in an office."
        ],
        correctAnswer: "To act as a dedicated facility that stores, processes, and manages large amounts of data and applications.",
        explanation: "A Data Center is often referred to as the 'central brain' of modern IT systems, dedicated to storing and processing massive amounts of data."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "In a Data Center's Storage Systems, what do 'SAN' and 'NAS' stand for?",
        options: [
            "System Area Network and Network Allocation System",
            "Storage Area Network and Network Attached Storage",
            "Secure Access Node and Network Application Storage",
            "Standard Area Network and Native Attached Storage"
        ],
        correctAnswer: "Storage Area Network and Network Attached Storage",
        explanation: "SAN (Storage Area Network) and NAS (Network Attached Storage) are the two primary types of large-scale storage systems used in Data Centers."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "If a company does not want to build their own Data Center but wants to rent space in a shared facility while providing their own servers, which type of Data Center should they use?",
        options: [
            "Enterprise Data Center",
            "Colocation Data Center",
            "Cloud Data Center",
            "Virtual Data Center"
        ],
        correctAnswer: "Colocation Data Center",
        explanation: "A Colocation Data Center is a shared facility where companies can rent physical space, power, and cooling to host their own servers."
    },

    // --- Data Center Tiers and Technologies ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "According to Data Center Tier Levels, what defines a 'Tier 4' Data Center?",
        options: [
            "It has basic infrastructure with no redundancy.",
            "It has partial redundancy and frequent downtime.",
            "It offers high availability and maintenance without shutdown.",
            "It is fully fault tolerant and guarantees maximum uptime."
        ],
        correctAnswer: "It is fully fault tolerant and guarantees maximum uptime.",
        explanation: "Tier 4 is the highest level, offering fully fault-tolerant infrastructure and the highest possible maximum uptime."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Which of the following is considered a 'Physical Security' measure in a Data Center rather than a 'Network Security' measure?",
        options: [
            "Biometric access control",
            "Firewalls",
            "Intrusion Detection Systems (IDS/IPS)",
            "Data Encryption"
        ],
        correctAnswer: "Biometric access control",
        explanation: "Biometric access (like fingerprint or retina scanners) and CCTV cameras protect the physical facility. Firewalls, IDS, and Encryption protect the network logically."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which technology allows a Data Center to run multiple isolated operating systems on a single physical server hardware?",
        options: [
            "Software Defined Networking (SDN)",
            "Virtualization (VMware, Hyper-V)",
            "Containerization (Docker)",
            "Cloud Computing (AWS)"
        ],
        correctAnswer: "Virtualization (VMware, Hyper-V)",
        explanation: "Virtualization technologies like VMware or Hyper-V abstract the hardware, allowing multiple Virtual Machines (VMs) to run on one physical server."
    },
    
    // --- Deep Cuts ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "In a WAN Hub-and-Spoke topology, if the central HQ router completely fails, what happens to the communication between two branch offices?",
        options: [
            "They will continue communicating via direct point-to-point links.",
            "They will automatically route traffic through the Internet VPN backup.",
            "They will lose all communication with each other.",
            "They will switch to a Full Mesh topology instantly."
        ],
        correctAnswer: "They will lose all communication with each other.",
        explanation: "In a Hub-and-Spoke design, all branches (spokes) connect only to the center (hub). If the hub fails, spoke-to-spoke communication is severed."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 2", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "A banking data center heavily utilizes Fraud Detection Systems and ATM operations. What is the primary disadvantage of maintaining such an Enterprise Data Center?",
        options: [
            "It provides very low performance for databases.",
            "It is impossible to secure properly.",
            "It has a very high installation cost and requires skilled engineers.",
            "It cannot support any form of virtualization."
        ],
        correctAnswer: "It has a very high installation cost and requires skilled engineers.",
        explanation: "Building and maintaining an Enterprise Data Center (like a bank's) is extremely expensive (high power, cooling, hardware costs) and requires complex management by skilled engineers."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "In Campus Network Design, what is the primary benefit of applying 'Port Security' at the Access Layer?",
        options: [
            "It speeds up data transfer to the Core Layer.",
            "It ensures that only authorized devices (PCs, IP Phones) can physically connect to the network switches.",
            "It encrypts all data leaving the campus WAN.",
            "It automatically assigns VLANs based on MAC addresses."
        ],
        correctAnswer: "It ensures that only authorized devices (PCs, IP Phones) can physically connect to the network switches.",
        explanation: "The Access Layer is the first point of entry. Port Security is applied here to prevent unauthorized devices from plugging into the network jacks and gaining access."
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
        console.log(`Successfully generated and inserted ${inserted} deep-cut questions for Unit 3! (Skipped ${duplicates} duplicates)`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
