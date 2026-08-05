const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 3: Enterprise Network Design";

const questions = [
    // --- Campus Network specifics ---
    { questionText: "Which layer of the Campus Network requires 'Reliable backbone connectivity' as one of its primary functions?", options: ["Access Layer", "Core Layer", "Distribution Layer", "Edge Layer"], correctAnswer: "Core Layer", explanation: "The Core Layer serves as the backbone and requires utmost reliability and high-speed connectivity." },
    { questionText: "What specific security function is applied at the Access Layer to protect against rogue devices?", options: ["Inter-VLAN routing", "Apply port security", "BGP Path filtering", "Hardware Encryption"], correctAnswer: "Apply port security", explanation: "The Access layer connects end devices and is responsible for initial port security." },
    { questionText: "Why do campus networks group 'Guest VLAN' and 'Admin VLAN' separately?", options: ["To physically wire them to different buildings.", "To divide the network logically, improving security and reducing broadcast traffic.", "To increase the cost of installation.", "To allow guests full access to admin tools."], correctAnswer: "To divide the network logically, improving security and reducing broadcast traffic.", explanation: "VLANs divide the network logically, improving security by isolating sensitive traffic." },
    
    // --- Advantages/Disadvantages Deep Dive ---
    { questionText: "Which of the following is considered a 'Cost-related' disadvantage of a Campus Network?", options: ["Requires skilled management", "High installation cost", "Scalable design", "Centralized control"], correctAnswer: "High installation cost", explanation: "Setting up a proper 3-tier campus network requires significant upfront capital for switches, routers, and cabling." },
    { questionText: "Which aspect makes Campus Network management difficult according to the Unit 3 design principles?", options: ["It requires skilled management to properly configure and maintain.", "It does not allow the use of VLANs.", "End devices cannot connect to it.", "It is only compatible with wireless devices."], correctAnswer: "It requires skilled management to properly configure and maintain.", explanation: "A key disadvantage is that complex setups require skilled engineers for management." },

    // --- WAN Deep Dive ---
    { questionText: "A company with branches in New York, London, and Tokyo connects them together. What type of network is this?", options: ["LAN", "MAN", "WAN", "PAN"], correctAnswer: "WAN", explanation: "A Wide Area Network (WAN) connects networks across cities, countries, or globally." },
    { questionText: "Which of the following describes a 'Point-to-Point' WAN topology?", options: ["All branches connect to central HQ.", "Every site connects to every other site.", "Direct connection between two sites.", "Some sites are interconnected."], correctAnswer: "Direct connection between two sites.", explanation: "Point-to-Point provides a dedicated, direct link between exactly two locations." },
    { questionText: "If a company is concerned about 'Network latency' due to long distances, which network type is most prone to this disadvantage?", options: ["LAN", "WAN", "Campus Network", "Data Center Network"], correctAnswer: "WAN", explanation: "WANs inherently suffer from higher latency due to the long physical distances data must travel." },
    { questionText: "In WAN Design Objectives, balancing 'performance and cost' refers to which specific objective?", options: ["Security", "Reliability", "Cost Efficiency", "Scalability"], correctAnswer: "Cost Efficiency", explanation: "Cost efficiency ensures the organization gets the required performance without overspending on leased lines." },
    { questionText: "How do 'Internet VPNs' help achieve WAN Design Objectives?", options: ["They increase the physical speed of the leased line.", "They protect data, ensuring 'Security' across public networks.", "They eliminate the need for ISP services entirely.", "They reduce latency to zero."], correctAnswer: "They protect data, ensuring 'Security' across public networks.", explanation: "VPNs provide encrypted tunnels over the internet, meeting the Security objective." },
    { questionText: "Which of the following is NOT listed as a WAN technology?", options: ["MPLS", "Frame Relay", "SD-WAN", "CSMA/CD"], correctAnswer: "CSMA/CD", explanation: "CSMA/CD is a LAN collision detection protocol (Ethernet), not a WAN technology." },

    // --- Data Center Deep Dive ---
    { questionText: "A 'Data Center' is often described as the _________ of modern IT systems.", options: ["Access layer", "Central brain", "Edge router", "Distribution node"], correctAnswer: "Central brain", explanation: "The Data Center stores, processes, and manages applications, acting as the 'central brain'." },
    { questionText: "Which component of a Data Center is specifically tasked with 'Preventing overheating of servers'?", options: ["Networking Equipment", "Storage Systems", "Cooling Systems", "Power Systems"], correctAnswer: "Cooling Systems", explanation: "Cooling systems (like massive Air Conditioning units) prevent server overheating." },
    { questionText: "Which of the following is an example of an 'Enterprise Data Center'?", options: ["A data center owned by a specific bank and used internally only by that bank.", "A shared facility where 50 different companies rent space.", "Amazon AWS providing public cloud services.", "Google Cloud Platform."], correctAnswer: "A data center owned by a specific bank and used internally only by that bank.", explanation: "Enterprise Data Centers are owned and used exclusively by one organization." },
    { questionText: "Why do Colocation Data Centers appeal to smaller companies?", options: ["Because the company must buy the entire building.", "Because they allow companies to rent shared space, power, and cooling without building their own facility.", "Because they only support wireless servers.", "Because they operate without any security systems."], correctAnswer: "Because they allow companies to rent shared space, power, and cooling without building their own facility.", explanation: "Colocation (Colo) allows companies to share the massive overhead costs of a facility." },
    
    // --- Technologies and Examples ---
    { questionText: "VMware and Hyper-V are examples of which Data Center technology?", options: ["Containerization", "Virtualization", "SDN", "Hardware Load Balancing"], correctAnswer: "Virtualization", explanation: "Virtualization software (like VMware/Hyper-V) allows multiple virtual machines to run on one physical server." },
    { questionText: "Docker and Kubernetes are primarily associated with which technology?", options: ["Virtualization", "SDN", "Containerization", "Physical Security"], correctAnswer: "Containerization", explanation: "Docker and Kubernetes are leading tools for Containerization." },
    { questionText: "What does 'SDN' stand for in modern Data Center environments?", options: ["Software Defined Networking", "Secure Data Node", "Storage Distribution Network", "Server Design Nuance"], correctAnswer: "Software Defined Networking", explanation: "SDN separates the control and data planes, allowing software to control network traffic." },
    { questionText: "Which of the following is a major disadvantage of building a Data Center?", options: ["Easy backup & recovery", "Scalable infrastructure", "High power consumption and very high cost", "Centralized data management"], correctAnswer: "High power consumption and very high cost", explanation: "Data centers are incredibly expensive to build and consume massive amounts of electricity." },
    
    // --- Real Life Banking Example ---
    { questionText: "In a real-life Banking Data Center, which of the following operations is managed centrally?", options: ["Customer transactions and ATM operations", "Assigning port security to a university lab", "Managing student hostel Wi-Fi", "Creating a Hub-and-Spoke WAN for a small shop"], correctAnswer: "Customer transactions and ATM operations", explanation: "Banking Data Centers manage massive operations like transactions, ATMs, online banking, and fraud detection." },
    { questionText: "Why is 'Fraud detection systems' a critical workload for a Banking Data Center?", options: ["To prevent servers from overheating.", "To quickly analyze transactions and stop unauthorized access or theft in real-time.", "To ensure the building's biometric scanners work.", "To increase network latency."], correctAnswer: "To quickly analyze transactions and stop unauthorized access or theft in real-time.", explanation: "Fraud detection requires massive processing power provided by Data Centers to analyze transactions instantly." },

    // --- Fillers for 32 total ---
    { questionText: "Which WAN technology focuses heavily on using software to dynamically route traffic over the best available link (e.g., Internet vs MPLS)?", options: ["SD-WAN (Software Defined WAN)", "Frame Relay", "Dial-up", "Token Ring"], correctAnswer: "SD-WAN (Software Defined WAN)", explanation: "SD-WAN uses software to intelligently manage and route WAN traffic." },
    { questionText: "What distinguishes 'Tier 2' Data Centers from 'Tier 1'?", options: ["Tier 2 has absolutely no redundancy.", "Tier 2 includes 'Partial redundancy' for power and cooling.", "Tier 2 allows maintenance without any shutdown.", "Tier 2 provides 100% maximum uptime fault tolerance."], correctAnswer: "Tier 2 includes 'Partial redundancy' for power and cooling.", explanation: "Tier 2 offers partial redundancy, which is a step above Tier 1's lack of redundancy." },
    { questionText: "A 'Storage Area Network' (SAN) operates primarily to:", options: ["Provide Wi-Fi to guests.", "Store large data sets and provide block-level storage access to servers.", "Route internet traffic.", "Provide backup electrical power."], correctAnswer: "Store large data sets and provide block-level storage access to servers.", explanation: "SANs are specialized high-speed networks dedicated to storage." },
    { questionText: "What does NAS stand for in Data Center storage?", options: ["Network Attached Storage", "Node Access Server", "New Application System", "Network Analysis Software"], correctAnswer: "Network Attached Storage", explanation: "NAS provides file-level data storage connected directly to the network." },
    { questionText: "If a server's power supply fails, what Data Center feature ensures it stays online immediately?", options: ["Biometric access", "Uninterruptible Power Supply (UPS)", "Air conditioning systems", "Firewalls"], correctAnswer: "Uninterruptible Power Supply (UPS)", explanation: "UPS systems use batteries to provide instant backup power." },
    { questionText: "What happens if a Data Center lacks proper 'Air conditioning systems'?", options: ["Servers overheat, leading to hardware failure and downtime.", "The network speed increases.", "Security encryption is bypassed.", "Virtualization stops working."], correctAnswer: "Servers overheat, leading to hardware failure and downtime.", explanation: "Servers generate massive heat; without cooling, they quickly overheat and fail." },
    { questionText: "Which tier of Data Center is the most expensive to build due to requiring completely duplicate, fault-tolerant systems?", options: ["Tier 1", "Tier 2", "Tier 3", "Tier 4"], correctAnswer: "Tier 4", explanation: "Tier 4 requires fully fault-tolerant, 2N+1 infrastructure, making it the most expensive." },
    { questionText: "Which statement best describes 'Redundant links (backup paths)' in a Data Center network design?", options: ["Using a single cable to connect servers.", "Having multiple paths so if one cable/switch fails, traffic takes another route.", "Removing all switches from the network.", "Storing data on a single hard drive."], correctAnswer: "Having multiple paths so if one cable/switch fails, traffic takes another route.", explanation: "Redundancy ensures network availability by providing backup pathways." },
    { questionText: "In a 'Partial Mesh' WAN topology, why don't all sites connect to every other site?", options: ["Because it is physically impossible.", "To balance cost and redundancy, avoiding the extreme cost of a Full Mesh.", "Because routers cannot support more than one connection.", "Because Partial Mesh is slower than Hub-and-Spoke."], correctAnswer: "To balance cost and redundancy, avoiding the extreme cost of a Full Mesh.", explanation: "Full Mesh is very expensive; Partial Mesh connects only the most critical sites directly to save costs." },
    { questionText: "What role do 'Telecom companies' play in a Wide Area Network (WAN)?", options: ["They manufacture the servers used in Data Centers.", "They provide the long-distance leased lines and infrastructure that organizations rent to build their WAN.", "They assign private IP addresses.", "They install local Wi-Fi routers in homes."], correctAnswer: "They provide the long-distance leased lines and infrastructure that organizations rent to build their WAN.", explanation: "Telecoms (ISPs) own the vast, global cabling infrastructure that makes WANs possible." },
    { questionText: "Which layer of the Campus Network acts as the 'Aggregation point' for all end-user switches?", options: ["Access Layer", "Distribution Layer", "Core Layer", "Physical Layer"], correctAnswer: "Distribution Layer", explanation: "The Distribution layer aggregates multiple access switches before sending traffic to the core." }
];

async function run() {
    const categories = ["QUIZ", "EXERCISE", "CAT 1", "CAT 2", "POSSIBLE QNS", "UE"];
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('school_db');
        const collection = db.collection('questions');
        
        let inserted = 0;
        let duplicates = 0;
        for (const q of questions) {
            q.category = categories[Math.floor(Math.random() * categories.length)];
            
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
        console.log(`Successfully inserted ${inserted} additional handcrafted questions for Unit 3!`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
