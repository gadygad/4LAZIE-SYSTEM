const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 1: Network Design Fundamentals";

const questions = [
    // --- TOPIC 1: Network Design Methodology ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary purpose of following a Network Design Methodology?",
        options: [
            "To build networks ad hoc without any documentation.",
            "To ensure the network meets business, technical, and performance requirements.",
            "To quickly purchase hardware before planning the topology.",
            "To bypass logical design and focus solely on physical cabling."
        ],
        correctAnswer: "To ensure the network meets business, technical, and performance requirements.",
        explanation: "A structured methodology ensures the network is scalable, reliable, and cost-effective by aligning with requirements."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "If an engineer is determining the IP addressing scheme and selecting routing protocols (e.g., OSPF), which phase of network design are they in?",
        options: [
            "Requirements Analysis Phase",
            "Logical Network Design Phase",
            "Physical Network Design Phase",
            "Testing and Validation Phase"
        ],
        correctAnswer: "Logical Network Design Phase",
        explanation: "Logical design focuses on 'what' the network will do, including IP schemes, topologies, and routing protocols."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "During a network upgrade, management limits the project cost to $50,000 and restricts downtime to 2 hours. In which stage of the methodology are these factors identified?",
        options: [
            "Physical Network Design",
            "Logical Network Design",
            "Requirements Analysis",
            "Implementation Deployment"
        ],
        correctAnswer: "Requirements Analysis",
        explanation: "Cost constraints, time limits, and business goals are all identified during the foundational Requirements Analysis phase."
    },

    // --- TOPIC 2: Physical vs Logical Design ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which of the following activities belongs strictly to the Physical Network Design phase?",
        options: [
            "Selecting hardware such as routers and deciding rack layouts.",
            "Designing a network segmentation plan using VLANs.",
            "Deciding whether to use a star or mesh logical topology.",
            "Configuring an OSPF routing process for a WAN link."
        ],
        correctAnswer: "Selecting hardware such as routers and deciding rack layouts.",
        explanation: "Physical design deals with actual hardware, cables, rack layouts, and physical redundancy."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "An organization needs a highly secure architecture using firewalls and Access Control Lists (ACLs). When is this architecture primarily mapped out?",
        options: [
            "During the physical cabling installation.",
            "In the Logical Network Design phase.",
            "Only during the testing and validation phase.",
            "After the maintenance and scaling phase."
        ],
        correctAnswer: "In the Logical Network Design phase.",
        explanation: "Security architecture (like firewall placement and ACL planning) is a core component of Logical Network Design."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Why must a Logical Network Design be completed before a Physical Network Design?",
        options: [
            "Because physical hardware is always cheaper if bought early.",
            "Because you must know 'what' the network requires before determining 'how' to physically build it.",
            "Because logical design physically installs the operating systems on servers.",
            "Because physical design only focuses on IP addressing, which is done last."
        ],
        correctAnswer: "Because you must know 'what' the network requires before determining 'how' to physically build it.",
        explanation: "Logical design defines the requirements and topology logically; physical design simply selects the hardware to fulfill that logical blueprint."
    },

    // --- TOPIC 3: Hierarchical Network Model ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which layer of the Hierarchical Network Model is considered the 'backbone' of the network?",
        options: [
            "Access Layer",
            "Distribution Layer",
            "Core Layer",
            "Physical Layer"
        ],
        correctAnswer: "Core Layer",
        explanation: "The Core Layer is the high-speed backbone that connects different parts of the network reliably."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which network layer is typically responsible for routing between VLANs, traffic filtering, and applying security policies?",
        options: [
            "The Core Layer",
            "The Distribution Layer",
            "The Access Layer",
            "The Internet Layer"
        ],
        correctAnswer: "The Distribution Layer",
        explanation: "The Distribution Layer connects Access to Core and handles VLAN routing, ACLs, and policy enforcement."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A university campus network has 50 buildings. If a broadcast storm originates in the Access layer of one building, how does the Hierarchical Model prevent it from affecting the entire campus?",
        options: [
            "The Core layer automatically shuts down the Access switches in that building.",
            "The Access switches possess advanced AI to stop all broadcast traffic immediately.",
            "The Distribution layer acts as a boundary, blocking local broadcast traffic from reaching the Core.",
            "The entire campus network relies on a single subnet to manage the broadcast efficiently."
        ],
        correctAnswer: "The Distribution layer acts as a boundary, blocking local broadcast traffic from reaching the Core.",
        explanation: "The Distribution layer provides fault isolation and limits broadcast domains, preventing local issues from crossing the Core backbone."
    },

    // --- TOPIC 4: Design Objectives ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which design objective ensures that a network operates continuously with minimal downtime?",
        options: [
            "Scalability",
            "Reliability",
            "Manageability",
            "Cost Efficiency"
        ],
        correctAnswer: "Reliability",
        explanation: "Reliability ensures the network remains operational, often utilizing backup links and redundant devices."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "If an administrator wants to easily monitor all switches and troubleshoot problems from a single centralized system, which objective are they prioritizing?",
        options: [
            "Reliability and Redundancy",
            "Performance and Throughput",
            "Manageability and Monitoring",
            "Security and Encryption"
        ],
        correctAnswer: "Manageability and Monitoring",
        explanation: "Manageability ensures the network can be easily monitored and maintained centrally."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A company decides to implement VLANs to separate its HR and Finance departments logically, rather than purchasing completely separate physical switches for each. This primarily satisfies which design objective?",
        options: [
            "Absolute Network Availability",
            "Cost Efficiency (Maximum performance within budget)",
            "Horizontal Scalability",
            "Physical Redundancy"
        ],
        correctAnswer: "Cost Efficiency (Maximum performance within budget)",
        explanation: "Using VLANs reduces the need for extra hardware, saving money while achieving the goal of separation, demonstrating cost efficiency."
    },

    // --- TOPIC 5: Scalability ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What does 'Vertical Scalability' (Scale-Up) mean in networking?",
        options: [
            "Adding completely new switches to the network rack.",
            "Increasing the capacity of existing devices, such as upgrading RAM.",
            "Expanding the network to multiple branch offices in different cities.",
            "Decreasing network capacity to save on power consumption."
        ],
        correctAnswer: "Increasing the capacity of existing devices, such as upgrading RAM.",
        explanation: "Vertical scalability involves upgrading existing hardware components (CPU, RAM, Storage) rather than buying new devices."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which of the following is a known disadvantage of Vertical Scalability?",
        options: [
            "It requires incredibly complex IP configuration changes.",
            "It requires adding dozens of new switches to the network.",
            "It has a limited expansion capability bounded by the device's maximum capacity.",
            "It automatically lowers the security of the distribution layer."
        ],
        correctAnswer: "It has a limited expansion capability bounded by the device's maximum capacity.",
        explanation: "You can only upgrade a device's CPU or RAM up to its motherboard's maximum supported limit."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A fast-growing tech company anticipates its workforce will double every year. They choose to adopt Horizontal Scalability (Scale-Out). What is the primary advantage of this approach?",
        options: [
            "It is completely free because no hardware is purchased.",
            "It supports virtually unlimited expansion by simply adding more devices over time.",
            "It requires zero planning and no management software.",
            "It eliminates the need for a Core Layer entirely."
        ],
        correctAnswer: "It supports virtually unlimited expansion by simply adding more devices over time.",
        explanation: "Horizontal scalability allows an organization to keep adding new servers or switches as needed, providing massive growth potential without hitting single-device limits."
    },

    // --- TOPIC 6: Network Documentation ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Why is Network Documentation critical for administrators?",
        options: [
            "It prevents users from physically stealing cables.",
            "It automatically upgrades router firmware when outdated.",
            "It simplifies troubleshooting and assists new administrators.",
            "It increases the internet bandwidth provided by the ISP."
        ],
        correctAnswer: "It simplifies troubleshooting and assists new administrators.",
        explanation: "Documentation provides the necessary maps and configurations to quickly find and fix issues or train new staff."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 2", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which type of documentation would show how data flows through the network and detail the IP addressing and VLAN structure?",
        options: [
            "Physical Network Documentation",
            "Logical Network Documentation",
            "Security Documentation",
            "Operational Documentation"
        ],
        correctAnswer: "Logical Network Documentation",
        explanation: "Logical documentation maps out IP addresses, routing, and VLAN structures, ignoring the physical hardware placement."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "An auditor asks to review the procedures for daily data backups and routine maintenance schedules. Which specific document type should the administrator provide?",
        options: [
            "Logical Network Documentation",
            "Configuration Documentation",
            "Physical Network Documentation",
            "Operational Documentation"
        ],
        correctAnswer: "Operational Documentation",
        explanation: "Operational Documentation contains daily tasks, backup procedures, maintenance schedules, and monitoring reports."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "If a company replaces a 24-port switch with a 48-port switch, this is an example of what type of scaling?",
        options: [
            "Horizontal Scaling (Scale-Out)",
            "Vertical Scaling (Scale-Up)",
            "Hybrid Logical Scaling",
            "Distributed Access Scaling"
        ],
        correctAnswer: "Vertical Scaling (Scale-Up)",
        explanation: "Replacing an existing device with a higher-capacity single device (like 24-port to 48-port) is considered Vertical Scalability (Scale-Up) because it upgrades the node's capacity."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "In the context of the Hierarchical Network Model, which layer is responsible for connecting wireless access points to the LAN?",
        options: [
            "The Core Layer",
            "The Distribution Layer",
            "The Access Layer",
            "The Internet Gateway Layer"
        ],
        correctAnswer: "The Access Layer",
        explanation: "The Access layer directly connects end-user devices, including Wireless Access Points (WAPs), PCs, and printers."
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
        console.log(`Successfully generated and inserted ${inserted} advanced questions in Batch 2! (Skipped ${duplicates} duplicates)`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
