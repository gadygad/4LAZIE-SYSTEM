const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 4: Advanced Network Design";

// Hand-crafted, completely distinct questions. No loops, no templates.
const questions = [
    // --- Security Design Principles ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "According to the CIA Triad, which objective ensures that a downloaded file has not been tampered with or modified?",
        options: [
            "Confidentiality",
            "Integrity",
            "Availability",
            "Authentication"
        ],
        correctAnswer: "Integrity",
        explanation: "Integrity ensures data remains accurate and unmodified, often verified using Hashing, Digital Signatures, or Checksums."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which security design principle dictates that a system should remain secure even if its entire architecture and design are publicly known?",
        options: [
            "Fail-Safe Defaults",
            "Complete Mediation",
            "Open Design",
            "Economy of Mechanism"
        ],
        correctAnswer: "Open Design",
        explanation: "Open Design means security should not depend on secrecy. Only the keys (like passwords or encryption keys) must be kept secret, not the design itself."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A bank implements a rule where transferring funds above $10,000 requires the digital approval of two separate managers. Which security principle is being enforced here?",
        options: [
            "Principle of Least Privilege",
            "Separation of Privilege",
            "Defense in Depth",
            "Least Common Mechanism"
        ],
        correctAnswer: "Separation of Privilege",
        explanation: "Separation of Privilege ensures that no single user has complete control over a sensitive operation, requiring multiple conditions or approvals."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "If a newly created user account cannot access any files until an administrator explicitly grants them permission, which security design principle is active?",
        options: [
            "Fail-Safe Defaults",
            "Psychological Acceptability",
            "Accountability and Auditing",
            "Economy of Mechanism"
        ],
        correctAnswer: "Fail-Safe Defaults",
        explanation: "Fail-Safe Defaults means access is denied by default unless explicitly permitted."
    },

    // --- Multicast Concepts ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which protocol is specifically used by host computers and routers to manage membership in a multicast group?",
        options: [
            "IGMP (Internet Group Management Protocol)",
            "PIM (Protocol Independent Multicast)",
            "OSPF (Open Shortest Path First)",
            "ARP (Address Resolution Protocol)"
        ],
        correctAnswer: "IGMP (Internet Group Management Protocol)",
        explanation: "IGMP is used by hosts to join or leave multicast groups and report their membership status to routers."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "An IPv4 address of 224.0.0.1 is being used. What type of traffic transmission is this address reserved for?",
        options: [
            "Unicast traffic to a single server.",
            "Broadcast traffic to all devices on a subnet.",
            "Multicast traffic for a selected group of receivers.",
            "Anycast traffic to the nearest router."
        ],
        correctAnswer: "Multicast traffic for a selected group of receivers.",
        explanation: "IPv4 Class D addresses (224.0.0.0 to 239.255.255.255) are strictly reserved for Multicast groups."
    },

    // --- QoS (Quality of Service) Design ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "In Quality of Service (QoS) Design, how is 'Jitter' accurately defined?",
        options: [
            "The total time taken for a packet to travel from source to destination.",
            "The variation in packet arrival times.",
            "The number of packets dropped due to extreme network congestion.",
            "The amount of data transmitted per second."
        ],
        correctAnswer: "The variation in packet arrival times.",
        explanation: "Jitter is the variance or fluctuation in delay (packet arrival times), which severely degrades real-time traffic like voice and video."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 2", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A network administrator configures a router to simply delay excess packets rather than dropping them entirely to smooth out traffic flow. Which QoS mechanism is being used?",
        options: [
            "Traffic Policing",
            "Traffic Classification",
            "Traffic Shaping",
            "Priority Queuing"
        ],
        correctAnswer: "Traffic Shaping",
        explanation: "Traffic Shaping buffers (delays) excess traffic to smooth the output rate. Traffic Policing, on the other hand, drops excess packets."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which Queuing method transmits packets strictly in the order they arrive, without giving priority to voice or video?",
        options: [
            "Priority Queuing (PQ)",
            "Weighted Fair Queuing (WFQ)",
            "Class-Based Queuing (CBQ)",
            "FIFO (First In First Out)"
        ],
        correctAnswer: "FIFO (First In First Out)",
        explanation: "FIFO treats all packets equally, sending them out exactly in the order they were received."
    },

    // --- Cloud & Virtual Networks ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Google Workspace and Microsoft 365 are prime examples of which specific Cloud Service Model?",
        options: [
            "IaaS (Infrastructure as a Service)",
            "PaaS (Platform as a Service)",
            "SaaS (Software as a Service)",
            "SDN (Software Defined Networking)"
        ],
        correctAnswer: "SaaS (Software as a Service)",
        explanation: "SaaS provides fully functional software applications directly through the internet without requiring local installation."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "In Software Defined Networking (SDN), what is the primary architectural shift compared to traditional networking?",
        options: [
            "It moves all hardware routing to a public cloud.",
            "It strictly separates the Control plane (decision making) from the Data plane (forwarding).",
            "It encrypts all local area network traffic automatically.",
            "It physically removes all switches and replaces them with virtual machines."
        ],
        correctAnswer: "It strictly separates the Control plane (decision making) from the Data plane (forwarding).",
        explanation: "SDN extracts the routing logic (Control Layer/Plane) into a centralized controller, leaving the physical switches just to forward data (Data Layer/Plane)."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "A company wants maximum control and security over their servers, dedicating the entire cloud infrastructure exclusively to their own organization. Which deployment model should they use?",
        options: [
            "Public Cloud",
            "Private Cloud",
            "Hybrid Cloud",
            "Community Cloud"
        ],
        correctAnswer: "Private Cloud",
        explanation: "A Private Cloud is dedicated solely to a single organization, offering greater security and control compared to a shared Public Cloud."
    },

    // --- Design Case Studies ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "According to the Hospital Network Design case study, why is network segmentation critically important?",
        options: [
            "To increase the cost of network installation.",
            "To separate Doctors, Patients, and Medical Devices for security and isolation.",
            "To allow patients to control the medical imaging systems.",
            "To mix all traffic into one broadcast domain for speed."
        ],
        correctAnswer: "To separate Doctors, Patients, and Medical Devices for security and isolation.",
        explanation: "Hospitals segment networks (e.g., Doctors Network vs Guest Wi-Fi) to ensure patient data security and isolate critical medical devices from public interference."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "In an Enterprise Network Design connecting a Headquarters to multiple branch offices securely over the public internet, which specific technology must be implemented?",
        options: [
            "VLAN (Virtual Local Area Network)",
            "VPN (Virtual Private Network)",
            "CSMA/CD (Carrier Sense Multiple Access)",
            "IGMP (Internet Group Management Protocol)"
        ],
        correctAnswer: "VPN (Virtual Private Network)",
        explanation: "A VPN encrypts and tunnels data across public networks (like the internet), allowing secure communication between Headquarters and remote branches."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "When designing a Data Center Network, what is the primary role of a Load Balancer?",
        options: [
            "To store massive amounts of backup data.",
            "To block unauthorized access attempts.",
            "To evenly distribute incoming network traffic across multiple servers.",
            "To cool down overheated server racks."
        ],
        correctAnswer: "To evenly distribute incoming network traffic across multiple servers.",
        explanation: "A Load Balancer sits in front of the servers and distributes incoming client requests across them to ensure no single server is overwhelmed."
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
        console.log(`Successfully generated and inserted ${inserted} highly distinct, handcrafted questions for Unit 4!`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
