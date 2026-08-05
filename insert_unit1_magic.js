const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; // COURSE FOR DESIGN PROFESSIONAL
const moduleName = "Unit 1: Network Design Fundamentals";

const questions = [
    // --- EASY ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary function of the Access Layer in the Hierarchical Network Model?",
        options: [
            "To provide high-speed data transfer across the network backbone.",
            "To manage routing between different VLANs and enforce security policies.",
            "To connect end devices like PCs, printers, and IP phones to the network.",
            "To isolate network faults and monitor global network performance."
        ],
        correctAnswer: "To connect end devices like PCs, printers, and IP phones to the network.",
        explanation: "The Access Layer is the lowest layer of the network where end devices connect."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which step in the Network Design Methodology focuses on identifying business goals and technical needs?",
        options: [
            "Logical Network Design",
            "Physical Network Design",
            "Requirements Analysis",
            "Testing and Validation"
        ],
        correctAnswer: "Requirements Analysis",
        explanation: "Requirements Analysis is the foundation step where business goals, user requirements, and technical needs are identified."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "In the context of scalability, what does 'Scale-Out' or Horizontal Scalability refer to?",
        options: [
            "Adding more devices such as switches and servers to the network.",
            "Upgrading the CPU and RAM of the existing networking devices.",
            "Replacing all existing cables with high-speed fiber optics.",
            "Implementing stricter security policies across the entire network."
        ],
        correctAnswer: "Adding more devices such as switches and servers to the network.",
        explanation: "Horizontal scalability involves expanding the network by adding more devices rather than upgrading existing ones."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "Which type of network documentation specifically shows the physical arrangement of devices and cables?",
        options: [
            "Logical Network Documentation",
            "Physical Network Documentation",
            "Configuration Documentation",
            "Operational Documentation"
        ],
        correctAnswer: "Physical Network Documentation",
        explanation: "Physical Network Documentation shows physical layouts such as device locations, rack layouts, and cable connections."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "EASY", createdAt: new Date(),
        questionText: "What is the primary role of the Core Layer in a hierarchical network design?",
        options: [
            "Connecting wireless access points to the LAN.",
            "Enforcing access control and traffic filtering.",
            "Providing high-speed and reliable data transfer.",
            "Assigning IP addresses to user workstations."
        ],
        correctAnswer: "Providing high-speed and reliable data transfer.",
        explanation: "The Core Layer is the backbone of the network, responsible for high-speed switching and fast routing."
    },

    // --- MEDIUM ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "A college network administrator needs to support a newly built computer lab. Instead of upgrading the current main switch's processor, they simply add a new access switch. Which concept does this represent?",
        options: [
            "Vertical Scalability (Scale-Up)",
            "Horizontal Scalability (Scale-Out)",
            "Centralized Manageability",
            "Network Fault Tolerance"
        ],
        correctAnswer: "Horizontal Scalability (Scale-Out)",
        explanation: "Horizontal scalability means adding more devices (like a new switch) to the network, whereas vertical means upgrading the capacity of an existing device."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "During which phase of the Network Design Methodology would an engineer decide on the IP addressing scheme and routing protocols?",
        options: [
            "Requirements Analysis",
            "Logical Network Design",
            "Physical Network Design",
            "Implementation and Deployment"
        ],
        correctAnswer: "Logical Network Design",
        explanation: "Logical Network Design focuses on 'what' the network should do, including IP addressing, topologies, and routing protocols, before selecting actual physical hardware."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which of the following is a primary function performed at the Distribution Layer?",
        options: [
            "Providing direct physical connection to user laptops.",
            "Acting as the high-speed backbone for the entire campus.",
            "Routing between VLANs and enforcing security policies.",
            "Managing the physical rack layout and patch panels."
        ],
        correctAnswer: "Routing between VLANs and enforcing security policies.",
        explanation: "The Distribution Layer sits between Access and Core, handling routing between VLANs, traffic filtering, and policy enforcement."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "Which document would an administrator consult to find the specific firewall rules and router access control lists currently in effect?",
        options: [
            "Logical Network Documentation",
            "Physical Network Documentation",
            "Configuration Documentation",
            "Security Documentation"
        ],
        correctAnswer: "Security Documentation",
        explanation: "Security Documentation specifically contains firewall policies, ACLs, user permissions, and VPN settings."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "MEDIUM", createdAt: new Date(),
        questionText: "What is a major disadvantage of Vertical Scalability (Scale-Up) compared to Horizontal Scalability?",
        options: [
            "It requires adding many new switches to the network.",
            "It involves extremely complex configuration changes.",
            "It has a limited expansion capacity bounded by hardware limits.",
            "It decreases the overall security of the core network."
        ],
        correctAnswer: "It has a limited expansion capacity bounded by hardware limits.",
        explanation: "Vertical scalability is limited by the maximum hardware specifications (CPU, RAM) a single device can support."
    },

    // --- HARD ---
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "QUIZ", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "An organization is designing a banking network that must process transactions 24/7 without interruption. Which network design objective is the highest priority, and which testing method validates it?",
        options: [
            "Reliability; validated by performance testing for latency.",
            "Availability; validated by failover and redundancy testing.",
            "Scalability; validated by connectivity testing such as ping.",
            "Flexibility; validated by security penetration testing."
        ],
        correctAnswer: "Availability; validated by failover and redundancy testing.",
        explanation: "Availability ensures the network is accessible 24/7 (e.g., banking). Failover testing is used to ensure backup systems take over automatically if a link fails."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "EXERCISE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "If the Core Layer of a hierarchical network experiences a total failure, what is the most likely consequence, and how is this mitigated in a proper design?",
        options: [
            "Only local VLANs are affected; mitigated by adding more access switches.",
            "The entire network halts communication; mitigated by redundancy and fault tolerance.",
            "Security policies are bypassed; mitigated by placing firewalls at the access layer.",
            "Network speed drops slightly; mitigated by implementing horizontal scalability."
        ],
        correctAnswer: "The entire network halts communication; mitigated by redundancy and fault tolerance.",
        explanation: "The Core Layer is the backbone; its failure affects the entire network. This is mitigated by building redundancy (backup links and redundant core switches)."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "CAT 1", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "A network architect is translating a Logical Network Design into a Physical Network Design. Which of the following tasks belongs strictly to the Physical phase?",
        options: [
            "Selecting OSPF as the primary routing protocol for the WAN.",
            "Defining the subnet masks for the HR and Finance departments.",
            "Determining the cable paths and data center rack layouts.",
            "Establishing the security architecture and ACL strategies."
        ],
        correctAnswer: "Determining the cable paths and data center rack layouts.",
        explanation: "While protocols and subnets belong to the Logical design (what to do), selecting hardware, cables, and rack layouts belongs to the Physical design (how to implement it)."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "UE", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Why is 'Fault Isolation' considered a significant advantage of the Hierarchical Network Model?",
        options: [
            "It allows the core layer to automatically reboot failed access switches.",
            "It confines network issues to specific layers, making troubleshooting much faster.",
            "It prevents unauthorized users from physically accessing the server room.",
            "It completely eliminates the need for redundant devices in the distribution layer."
        ],
        correctAnswer: "It confines network issues to specific layers, making troubleshooting much faster.",
        explanation: "By dividing the network into distinct layers (Access, Distribution, Core), problems can be isolated to a specific layer, preventing network-wide outages and speeding up recovery."
    },
    {
        subjectId, moduleName, type: "MULTIPLE_CHOICE",
        category: "POSSIBLE QNS", difficultyLevel: "HARD", createdAt: new Date(),
        questionText: "Which of the following scenarios best demonstrates the concept of 'Flexibility' as a design objective?",
        options: [
            "Deploying backup power systems to ensure the network stays up 24/7.",
            "Using VLANs to logically separate departments without buying new switches.",
            "Seamlessly integrating new wireless access points into an older wired infrastructure.",
            "Replacing a 24-port core switch with a 48-port core switch for more users."
        ],
        correctAnswer: "Seamlessly integrating new wireless access points into an older wired infrastructure.",
        explanation: "Flexibility means the network can easily adapt to new technologies and requirements, such as integrating wireless into a wired network. (Using VLANs is Cost Efficiency; adding ports is Scalability)."
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
        console.log(`Successfully generated and inserted ${inserted} advanced questions! (Skipped ${duplicates} duplicates)`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
