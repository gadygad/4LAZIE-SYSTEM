const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 1: Network Design Fundamentals";

const questions = [
    // --- Highly specific, scenario-based questions (No Duplicates from Batch 1 & 2) ---

    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "An engineer is experiencing high network congestion and needs to identify the exact bottleneck in data flow. Which specific monitoring tools should be utilized according to the network design methodology?",
        options: [
            "Ping and Traceroute testing suites.",
            "SNMP and NetFlow monitoring tools.",
            "Access Control Lists and Firewalls.",
            "OSPF and BGP routing protocols."
        ],
        correctAnswer: "SNMP and NetFlow monitoring tools.",
        explanation: "In the Monitoring and Optimization phase, SNMP and NetFlow are the standard tools used to track performance, usage, and identify network bottlenecks."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "During the 'Testing and Validation' phase, a technician runs a throughput and latency test. What specific type of testing is this classified as?",
        options: [
            "Security testing",
            "Failover testing",
            "Performance testing",
            "Connectivity testing"
        ],
        correctAnswer: "Performance testing",
        explanation: "Throughput and latency tests are used specifically for Performance testing to ensure the network meets speed and efficiency requirements."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "A network design objective is 'Manageability'. Which of the following is a direct feature of a highly manageable network?",
        options: [
            "Hardware upgrade costs are significantly lower.",
            "It requires multiple complex networking devices.",
            "Administrators can monitor all switches from one centralized system.",
            "It automatically blocks unauthorized penetration tests."
        ],
        correctAnswer: "Administrators can monitor all switches from one centralized system.",
        explanation: "Manageability features centralized management, monitoring tools, and easy troubleshooting from a single point."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which of the following is a documented disadvantage of the Hierarchical Network Model?",
        options: [
            "It is completely incapable of supporting large enterprise networks.",
            "It provides very poor fault tolerance and security isolation.",
            "It requires multiple networking devices, leading to a high initial cost.",
            "It forces all traffic to bypass the distribution layer."
        ],
        correctAnswer: "It requires multiple networking devices, leading to a high initial cost.",
        explanation: "The Hierarchical Model relies on dedicated switches and routers for Access, Distribution, and Core layers, making the initial hardware cost very high."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A junior admin is tasked with applying IP addressing and routing configurations to physical devices. According to the Network Design Methodology, which phase is currently being executed?",
        options: [
            "Logical Network Design",
            "Physical Network Design",
            "Implementation (Deployment)",
            "Testing and Validation"
        ],
        correctAnswer: "Implementation (Deployment)",
        explanation: "While IP addressing is planned in the Logical phase, actually applying them and installing the devices happens during the Implementation (Deployment) phase."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "If a company ensures their servers have backup power systems to keep them running 24/7, which specific network design objective are they fulfilling?",
        options: [
            "Cost Efficiency",
            "Availability",
            "Flexibility",
            "Horizontal Scalability"
        ],
        correctAnswer: "Availability",
        explanation: "Availability (high uptime, 24/7 connectivity, backup power) ensures the network is accessible whenever users need it."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "In the Hierarchical Model, which specific function is uniquely assigned to the Distribution Layer rather than the Core Layer?",
        options: [
            "Providing high-speed data transfer between entire buildings.",
            "Connecting wireless access points directly to user laptops.",
            "Load balancing and filtering traffic between different VLANs.",
            "Serving as the ultimate high-performance backbone of the campus."
        ],
        correctAnswer: "Load balancing and filtering traffic between different VLANs.",
        explanation: "The Distribution Layer handles policy enforcement, VLAN routing, and load balancing. The Core layer focuses purely on high-speed reliable transport."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A network experiences frequent failures in a specific department, but the rest of the college network remains unaffected. Which advantage of the Hierarchical Model is actively working here?",
        options: [
            "Easy Expansion (Scalability)",
            "Fault Isolation",
            "Better Performance",
            "Centralized Manageability"
        ],
        correctAnswer: "Fault Isolation",
        explanation: "Fault isolation confines network problems to a specific area (like one department's access/distribution switch), preventing it from taking down the core."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "When creating Configuration Documentation for a network, what specific information MUST be included?",
        options: [
            "The physical location of servers in the rack.",
            "VLAN structure and overall routing topology.",
            "Router configuration commands and switch settings.",
            "The daily schedule for automated data backups."
        ],
        correctAnswer: "Router configuration commands and switch settings.",
        explanation: "Configuration Documentation focuses on device settings (router commands, switch configs). Physical maps are Physical Docs, topologies are Logical Docs, and backups are Operational Docs."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which connectivity testing tools are considered standard in the Testing and Validation phase?",
        options: [
            "SNMP and NetFlow monitors.",
            "Ping and Traceroute utilities.",
            "VLANs and ACL firewalls.",
            "Backup links and failover systems."
        ],
        correctAnswer: "Ping and Traceroute utilities.",
        explanation: "Ping and traceroute are used specifically for Connectivity testing to ensure devices can reach each other."
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
        console.log(`Successfully generated and inserted ${inserted} deep-cut questions in Batch 3! (Skipped ${duplicates} duplicates)`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
