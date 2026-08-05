const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 1: Network Design Fundamentals";

const questions = [
    // --- Final Exhaustive Batch (No Duplicates) ---

    // Security Details
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Within the Security design objective, what is the specific role of Encryption?",
        options: [
            "To block unauthorized IP addresses from entering the network.",
            "To scramble data so it cannot be read if intercepted.",
            "To verify the identity of a user logging into the system.",
            "To ensure redundant backup links take over during failure."
        ],
        correctAnswer: "To scramble data so it cannot be read if intercepted.",
        explanation: "Encryption protects data confidentiality by scrambling it. Firewalls block IPs, and Authentication verifies identity."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "If an administrator configures Access Control Lists (ACLs) to determine which departments can communicate, which layer of the Hierarchical Model is typically responsible for this?",
        options: [
            "Access Layer",
            "Core Layer",
            "Distribution Layer",
            "Physical Layer"
        ],
        correctAnswer: "Distribution Layer",
        explanation: "The Distribution Layer handles policy enforcement and security implementation, including the application of ACLs between VLANs."
    },

    // Detailed Design Objectives
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A network design heavily relies on a single high-capacity Core switch to save initial costs. According to the Hierarchical Model's disadvantages, what is the greatest risk of this design?",
        options: [
            "It will be impossible to connect new users at the Access layer.",
            "A failure in the core layer will affect the entire network (Dependency on Core).",
            "The distribution layer will be unable to filter traffic.",
            "The network will suffer from horizontal scalability limitations."
        ],
        correctAnswer: "A failure in the core layer will affect the entire network (Dependency on Core).",
        explanation: "A major disadvantage of the model is dependency on the core layer; if a single core device fails without redundancy, the entire network halts."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which of the following best describes 'Low Latency' in the context of the Performance design objective?",
        options: [
            "The network can transfer huge files using maximum bandwidth.",
            "Data packets experience minimal delay when traveling from source to destination.",
            "The network can stay online 24/7 without power interruptions.",
            "The network automatically blocks all cyber threats."
        ],
        correctAnswer: "Data packets experience minimal delay when traveling from source to destination.",
        explanation: "Latency refers to delay. Low latency means data travels quickly without pausing, which is critical for real-time apps like video conferencing."
    },

    // Complex Scalability
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Why is Horizontal Scalability (Scale-Out) generally considered to provide 'Better Fault Tolerance' than Vertical Scalability (Scale-Up)?",
        options: [
            "Because upgrading the CPU of a single device automatically creates backups.",
            "Because distributing the workload across multiple devices means one device's failure doesn't cripple the whole system.",
            "Because adding more switches completely eliminates the need for a Core layer.",
            "Because Horizontal Scalability is always 100% free of charge."
        ],
        correctAnswer: "Because distributing the workload across multiple devices means one device's failure doesn't cripple the whole system.",
        explanation: "In Horizontal scaling, if one of the many devices fails, the others can continue operating (fault tolerance). Vertical scaling relies on a single, highly-upgraded point of failure."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 2", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which scalability method involves 'Simple implementation' and 'Less configuration changes' but has a 'High hardware upgrade cost'?",
        options: [
            "Horizontal Scalability (Scale-Out)",
            "Vertical Scalability (Scale-Up)",
            "Logical Network Scalability",
            "Fault Tolerant Scaling"
        ],
        correctAnswer: "Vertical Scalability (Scale-Up)",
        explanation: "Vertical Scalability simply involves swapping parts (like RAM) so it requires little configuration, but buying high-end parts is expensive."
    },

    // Extreme specifics of Documentation
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "An IT department is recovering from a major failure. They need to physically find the cable connecting the HR switch to the Core switch, and then check what VLAN the HR port belongs to. Which two documents must they use respectively?",
        options: [
            "Configuration Documentation, then Operational Documentation.",
            "Physical Network Documentation, then Logical Network Documentation.",
            "Operational Documentation, then Security Documentation.",
            "Logical Network Documentation, then Physical Network Documentation."
        ],
        correctAnswer: "Physical Network Documentation, then Logical Network Documentation.",
        explanation: "Physical Docs show cable paths (how to find it). Logical Docs show VLAN structures and IP schemes (checking the port's VLAN)."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "What specific information is typically found inside 'Operational Documentation'?",
        options: [
            "Rack layouts and patch panel details.",
            "IP addressing tables and Routing protocols.",
            "Troubleshooting guides and maintenance schedules.",
            "VPN settings and Firewall policies."
        ],
        correctAnswer: "Troubleshooting guides and maintenance schedules.",
        explanation: "Operational documentation is used for daily network operations, including backups, troubleshooting guides, and monitoring reports."
    },

    // Final Core/Dist/Access nuances
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "In a massive university network, why would the Core layer deliberately avoid applying complex Security ACLs and Traffic Filtering?",
        options: [
            "Because the Core layer lacks the physical ports to support ACLs.",
            "Because applying complex filters would slow down the high-speed data transfer required at the Core.",
            "Because security is only necessary at the Access layer where users connect.",
            "Because the Distribution layer cannot connect to a secure Core layer."
        ],
        correctAnswer: "Because applying complex filters would slow down the high-speed data transfer required at the Core.",
        explanation: "The Core layer's sole purpose is moving packets as fast as possible. Processing complex ACLs would introduce latency, so filtering is delegated to the Distribution layer."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which statement best describes the 'Constraints' identified during the Requirements Analysis phase?",
        options: [
            "The specific IP subnet masks required by the servers.",
            "The physical location of the wireless access points.",
            "The limitations imposed by budget, time, and existing infrastructure.",
            "The brand of cables required for horizontal scaling."
        ],
        correctAnswer: "The limitations imposed by budget, time, and existing infrastructure.",
        explanation: "Constraints in methodology are the boundaries you must work within, such as limited funds (budget), deadlines (time), or legacy equipment."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which of the following is an example of 'Redundancy' in physical network design?",
        options: [
            "Using a single, very fast fiber optic cable.",
            "Installing backup links and failover systems.",
            "Using strong passwords and firewalls.",
            "Documenting all IP addresses perfectly."
        ],
        correctAnswer: "Installing backup links and failover systems.",
        explanation: "Redundancy means having duplicate components (backup links) so if one fails, the network stays operational."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which of the following correctly pairs the layer with its primary devices in the Hierarchical Network Model?",
        options: [
            "Access Layer: High-performance Core Routers",
            "Distribution Layer: Layer 3 Switches and Routers",
            "Core Layer: Wireless Access Points",
            "Access Layer: Redundant Backbone Switches"
        ],
        correctAnswer: "Distribution Layer: Layer 3 Switches and Routers",
        explanation: "Access uses access switches/WAPs. Distribution uses Layer 3 switches/routers for inter-VLAN routing. Core uses high-performance core switches/routers."
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
        console.log(`Successfully generated and inserted ${inserted} FINAL exhaustive questions in Batch 4! (Skipped ${duplicates} duplicates)`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
