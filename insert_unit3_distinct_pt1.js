const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 3: Enterprise Network Design";

// 50 hand-crafted distinct questions extracted bullet-by-bullet from Unit 3
const questions = [
    // Campus Network Design Definition & Idea
    { questionText: "What is the primary purpose of a Campus Network?", options: ["To connect devices globally across continents.", "To provide fast, secure, and scalable communication between buildings in a limited area.", "To replace standard ISP connections.", "To store enterprise data in a centralized cloud."], correctAnswer: "To provide fast, secure, and scalable communication between buildings in a limited area.", explanation: "A campus network connects multiple buildings within a limited geographical area (like a college) to provide fast, secure, scalable communication." },
    { questionText: "How are different departments, libraries, and hostels connected in a Campus Network?", options: ["Through standalone wireless networks.", "Through a central backbone network.", "Through direct satellite links.", "Through isolated VPN tunnels."], correctAnswer: "Through a central backbone network.", explanation: "All locations in a campus network are connected through a central backbone network." },

    // Access Layer
    { questionText: "Which hierarchical layer is described as the 'first layer where users connect'?", options: ["Core Layer", "Distribution Layer", "Access Layer", "Physical Layer"], correctAnswer: "Access Layer", explanation: "The Access Layer is the lowest tier, serving as the first point of entry for user devices." },
    { questionText: "Which of the following devices typically connect directly to the Access Layer?", options: ["High-speed Core Switches", "PCs, Printers, and IP Phones", "Data Center SANs", "BGP Edge Routers"], correctAnswer: "PCs, Printers, and IP Phones", explanation: "End devices like PCs, IP Phones, and Printers connect directly to access switches." },
    { questionText: "At which layer of the Campus Network design are VLANs initially assigned to end devices?", options: ["Access Layer", "Core Layer", "Distribution Layer", "Internet Layer"], correctAnswer: "Access Layer", explanation: "One of the key functions of the Access Layer is to assign VLANs to incoming connections." },

    // Distribution Layer
    { questionText: "Which layer acts specifically as a 'middle layer' between the access layer and the core?", options: ["Perimeter Layer", "Aggregation Layer", "Distribution Layer", "Gateway Layer"], correctAnswer: "Distribution Layer", explanation: "The Distribution Layer acts as a bridge between the access switches and the high-speed core." },
    { questionText: "Which layer is strictly responsible for 'Inter-VLAN routing'?", options: ["Access Layer", "Core Layer", "Distribution Layer", "Network Layer"], correctAnswer: "Distribution Layer", explanation: "The Distribution layer handles routing traffic between different VLANs." },
    { questionText: "Where in the Campus Network is 'Traffic filtering' primarily performed?", options: ["Access Layer", "Distribution Layer", "Core Layer", "Physical Layer"], correctAnswer: "Distribution Layer", explanation: "Traffic filtering and policy enforcement are key functions of the Distribution Layer." },
    { questionText: "Which layer handles 'Load balancing' of traffic before it reaches the backbone?", options: ["Core Layer", "Access Layer", "Distribution Layer", "Server Layer"], correctAnswer: "Distribution Layer", explanation: "The Distribution layer aggregates and load-balances traffic from access switches to the core." },

    // Core Layer
    { questionText: "Which layer is defined as the 'backbone of the network'?", options: ["Access Layer", "Distribution Layer", "Core Layer", "Service Layer"], correctAnswer: "Core Layer", explanation: "The Core Layer is the high-speed backbone that connects all distribution layers." },
    { questionText: "What is the most critical function of the Core Layer?", options: ["Applying strict port security.", "Providing high-speed data transfer and fast switching.", "Routing traffic between individual VLANs.", "Assigning IP addresses via DHCP."], correctAnswer: "Providing high-speed data transfer and fast switching.", explanation: "The core's sole job is to move data as fast as possible across the backbone." },
    { questionText: "Why does the Core Layer feature 'Minimal processing for speed'?", options: ["Because core switches lack modern CPUs.", "To avoid slowing down the massive volume of backbone traffic with complex filtering.", "Because it only handles wireless traffic.", "Because it operates at Layer 1 of the OSI model."], correctAnswer: "To avoid slowing down the massive volume of backbone traffic with complex filtering.", explanation: "Complex processing (like ACL filtering) causes delay; the core avoids this to maximize speed." },

    // Design Objectives
    { questionText: "Which Design Objective ensures that the network 'should support future expansion'?", options: ["Security", "High Performance", "Reliability", "Scalability"], correctAnswer: "Scalability", explanation: "Scalability is the ability to grow and add new nodes without redesigning the network." },
    { questionText: "Using VLANs and firewalls to 'Prevent unauthorized access' fulfills which Design Objective?", options: ["Reliability", "Security", "Manageability", "High Performance"], correctAnswer: "Security", explanation: "Security objectives aim to protect the network from unauthorized access and data breaches." },
    { questionText: "Which Design Objective focuses on ensuring 'fast data transfer with minimal delay'?", options: ["High Performance", "Reliability", "Scalability", "Manageability"], correctAnswer: "High Performance", explanation: "High performance relates directly to speed and low latency (minimal delay)." },
    { questionText: "Ensuring the network is 'stable and always available' satisfies which Design Objective?", options: ["Reliability", "Security", "Manageability", "Scalability"], correctAnswer: "Reliability", explanation: "Reliability ensures the network has high uptime and is always available when needed." },
    { questionText: "Providing tools for 'Easy monitoring and maintenance' fulfills the objective of:", options: ["High Performance", "Reliability", "Manageability", "Scalability"], correctAnswer: "Manageability", explanation: "Manageability ensures administrators can easily monitor and troubleshoot the network." },

    // VLAN in Campus Network
    { questionText: "What is the primary function of VLANs in a Campus Network?", options: ["To physically divide the network using different cables.", "To divide the network logically and reduce broadcast traffic.", "To increase the physical distance a signal can travel.", "To provide wireless access to students."], correctAnswer: "To divide the network logically and reduce broadcast traffic.", explanation: "VLANs (Virtual LANs) create logical boundaries that reduce broadcast domains and improve security." },
    { questionText: "Which of the following is a direct benefit of separating Students, Staff, and Admin into different VLANs?", options: ["It improves security by isolating traffic.", "It allows everyone to share the same IP address.", "It removes the need for a Core Layer.", "It increases the number of physical switches required."], correctAnswer: "It improves security by isolating traffic.", explanation: "Isolating different user groups logically prevents unauthorized access between departments." },
    { questionText: "If a Student on the 'Students VLAN' wants to access the 'Library Server VLAN', what specific networking concept is required?", options: ["Intra-VLAN Switching", "Inter-VLAN Routing", "VLAN Trunking", "Spanning Tree Protocol"], correctAnswer: "Inter-VLAN Routing", explanation: "Communication between two different VLANs always requires Inter-VLAN Routing." },
    { questionText: "Which device is capable of performing Inter-VLAN Routing?", options: ["Layer 2 Switch", "Layer 3 Switch", "Access Point", "Unmanaged Hub"], correctAnswer: "Layer 3 Switch", explanation: "A Layer 3 Switch (or a Router) is required to route traffic between different VLAN subnets." },

    // Advantages / Disadvantages of Campus Networks
    { questionText: "Which of the following is an advantage of a Campus Network design?", options: ["Centralized network control", "High installation cost", "Complex setup", "Requires no skilled management"], correctAnswer: "Centralized network control", explanation: "A campus network provides centralized control over the entire institution's IT infrastructure." },
    { questionText: "What is a major disadvantage of implementing a large-scale Campus Network?", options: ["Low installation cost", "High installation cost and complex setup", "Decreased security", "Slow communication speeds"], correctAnswer: "High installation cost and complex setup", explanation: "Building a full 3-tier campus network requires expensive hardware and complex configuration." },
    { questionText: "Why is 'Security risks if misconfigured' listed as a disadvantage for Campus Networks?", options: ["Because campus networks do not support firewalls.", "Because a single misconfiguration in the centralized core/distribution can expose the entire campus.", "Because VLANs are inherently unsecure.", "Because they rely entirely on public internet connections."], correctAnswer: "Because a single misconfiguration in the centralized core/distribution can expose the entire campus.", explanation: "Centralized, complex setups mean that an error (like a misconfigured ACL) can compromise the whole network." },

    // WAN Design Concepts
    { questionText: "What does a Wide Area Network (WAN) primarily connect?", options: ["Computers within a single room.", "Multiple LANs across long distances such as cities or countries.", "Virtual machines inside a single server.", "Storage devices inside a Data Center."], correctAnswer: "Multiple LANs across long distances such as cities or countries.", explanation: "A WAN is designed to connect multiple Local Area Networks (LANs) over large geographic areas." },
    { questionText: "Which of the following is the largest known example of a WAN?", options: ["A Hospital Campus Network", "A Colocation Data Center", "The Internet", "A University LAN"], correctAnswer: "The Internet", explanation: "The Internet is the ultimate WAN, connecting networks globally." },
    { questionText: "Unlike a LAN which is owned entirely by an organization, a WAN typically requires the use of:", options: ["Unmanaged switches", "Service Providers (ISPs or Telecom companies)", "Wireless Access Points", "VLANs"], correctAnswer: "Service Providers (ISPs or Telecom companies)", explanation: "Because WANs cross public land and long distances, organizations must lease lines or services from ISPs." },
    
    // WAN Characteristics
    { questionText: "Which of the following is a fundamental characteristic of a WAN compared to a LAN?", options: ["Lower Cost", "Higher Speed", "Large Coverage Area", "Less Latency"], correctAnswer: "Large Coverage Area", explanation: "WANs cover massive areas (cities, countries), whereas LANs are localized." },
    { questionText: "Why is a WAN typically considered to have a 'High Cost'?", options: ["Because routers are cheaper than switches.", "Because leasing long-distance connections from Telecom companies is expensive.", "Because WANs require zero maintenance.", "Because WANs use free public Wi-Fi."], correctAnswer: "Because leasing long-distance connections from Telecom companies is expensive.", explanation: "Organizations must pay recurring leasing fees to Service Providers for WAN links, making them expensive." },
    { questionText: "Why does a WAN generally experience 'More Latency' than a LAN?", options: ["Because data has to travel over much longer physical distances.", "Because WANs use faster cables.", "Because WANs do not use routers.", "Because WANs only use wireless signals."], correctAnswer: "Because data has to travel over much longer physical distances.", explanation: "Latency is the delay in data transfer; longer geographic distances naturally result in higher latency." },

    // WAN Components & Topologies
    { questionText: "Which of the following is considered a 'Transmission media' for WANs?", options: ["Fiber optics and Satellite links", "Unmanaged switches", "VLANs", "Software Applications"], correctAnswer: "Fiber optics and Satellite links", explanation: "WANs transmit data over physical media like Fiber optics, Leased lines, and Satellite links." },
    { questionText: "In which WAN topology does every single site have a direct connection to every other site?", options: ["Point-to-Point", "Hub-and-Spoke", "Full Mesh", "Partial Mesh"], correctAnswer: "Full Mesh", explanation: "A Full Mesh topology provides maximum redundancy by connecting every site directly to all others." },
    { questionText: "In a 'Hub-and-Spoke' WAN topology, how do branch offices communicate with each other?", options: ["Directly via Point-to-Point links.", "All communication must pass through the central Hub (HQ).", "Via a Full Mesh network.", "They cannot communicate with each other."], correctAnswer: "All communication must pass through the central Hub (HQ).", explanation: "In Hub-and-Spoke, branches (spokes) only connect to the center (hub). Spoke-to-spoke traffic routes through the hub." },
    { questionText: "Which WAN topology features 'some sites being interconnected' but not all?", options: ["Full Mesh", "Hub-and-Spoke", "Partial Mesh", "Point-to-Point"], correctAnswer: "Partial Mesh", explanation: "A Partial Mesh balances cost and redundancy by interconnecting only the most critical sites." },

    // WAN Objectives & Tech
    { questionText: "Protecting WAN data using 'VPNs and Encryption' fulfills which WAN Design Objective?", options: ["Reliability", "Scalability", "Cost Efficiency", "Security"], correctAnswer: "Security", explanation: "VPNs and Encryption protect data as it crosses the public internet, fulfilling the Security objective." },
    { questionText: "Which WAN technology stands for 'Multiprotocol Label Switching'?", options: ["ATM", "SD-WAN", "MPLS", "Frame Relay"], correctAnswer: "MPLS", explanation: "MPLS is a widely used WAN technology that directs data based on short path labels." },
    { questionText: "Which older WAN technology has largely been replaced by MPLS and SD-WAN?", options: ["Frame Relay", "Fiber Optics", "VPN", "VLAN"], correctAnswer: "Frame Relay", explanation: "Frame Relay is an older packet-switching WAN technology that is now mostly obsolete." },
    { questionText: "What is a major advantage of implementing a WAN?", options: ["Centralized data access for all global branches.", "No need for security firewalls.", "Zero installation cost.", "It guarantees zero latency."], correctAnswer: "Centralized data access for all global branches.", explanation: "A WAN allows remote branches to seamlessly access data stored in the central HQ." },
    { questionText: "Which of the following is a disadvantage of a WAN?", options: ["Global connectivity", "Scalable architecture", "Dependence on service providers", "Easy branch connectivity"], correctAnswer: "Dependence on service providers", explanation: "Because organizations do not own the cables spanning cities, they are dependent on ISPs." },

    // Data Center Basics
    { questionText: "How is a 'Data Center' defined?", options: ["A single computer that stores a student's files.", "A dedicated facility that stores, processes, and manages large amounts of data and applications.", "An internet service provider's billing office.", "A network switch placed in a hallway."], correctAnswer: "A dedicated facility that stores, processes, and manages large amounts of data and applications.", explanation: "Data Centers are the massive, centralized facilities that act as the brain of modern IT." },
    { questionText: "What are the two primary types of 'Storage Systems' in a Data Center?", options: ["RAM and ROM", "SAN and NAS", "CD and DVD", "VLAN and VPN"], correctAnswer: "SAN and NAS", explanation: "Storage Area Networks (SAN) and Network Attached Storage (NAS) are the primary storage systems." },
    { questionText: "Which Data Center networking equipment is primarily used to distribute incoming traffic evenly across multiple servers?", options: ["Switches", "Routers", "Firewalls", "Load balancers"], correctAnswer: "Load balancers", explanation: "Load balancers ensure that no single server gets overwhelmed by distributing the incoming requests." },
    { questionText: "In a Data Center's Power System, what is the function of a UPS?", options: ["To route packets to the internet.", "To cool down overheated servers.", "To provide Uninterruptible Power Supply during an outage.", "To detect network intrusions."], correctAnswer: "To provide Uninterruptible Power Supply during an outage.", explanation: "A UPS provides immediate backup power using batteries when the main power fails." },
    { questionText: "Why is 'VLAN segmentation' a critical part of Data Center Network Design?", options: ["It provides backup paths.", "It isolates different types of traffic (e.g., storage traffic vs web traffic) for security and performance.", "It increases the physical temperature of the servers.", "It replaces the need for Layer 3 switches."], correctAnswer: "It isolates different types of traffic (e.g., storage traffic vs web traffic) for security and performance.", explanation: "VLANs isolate traffic logically, preventing broadcast storms and restricting unauthorized access." },

    // Types of Data Centers
    { questionText: "A Data Center that is completely owned and used internally by a single company is called a(n):", options: ["Cloud Data Center", "Enterprise Data Center", "Colocation Data Center", "Public Data Center"], correctAnswer: "Enterprise Data Center", explanation: "Enterprise Data Centers are built, owned, and operated by the company they serve." },
    { questionText: "A shared facility where multiple companies rent space, power, and cooling for their own servers is a:", options: ["Colocation Data Center", "Enterprise Data Center", "Cloud Data Center", "Virtual Data Center"], correctAnswer: "Colocation Data Center", explanation: "Colocation (Colo) facilities rent out space to multiple tenants." },
    { questionText: "AWS, Azure, and Google Cloud are examples of which type of Data Center?", options: ["Colocation Data Center", "Enterprise Data Center", "Cloud Data Center", "Local Data Center"], correctAnswer: "Cloud Data Center", explanation: "Cloud Data Centers are massive facilities operated by cloud providers that offer resources on-demand." },

    // DC Security & Tiers
    { questionText: "Which of the following falls under 'Physical Security' for a Data Center?", options: ["Firewalls", "CCTV cameras and Biometric access", "Encryption", "IDS/IPS"], correctAnswer: "CCTV cameras and Biometric access", explanation: "Physical security controls actual physical access to the building and server rooms." },
    { questionText: "What defines a 'Tier 1' Data Center?", options: ["Basic infrastructure with no redundancy.", "Partial redundancy.", "High availability without shutdown.", "Fully fault-tolerant with maximum uptime."], correctAnswer: "Basic infrastructure with no redundancy.", explanation: "Tier 1 is the lowest tier, featuring a single path for power/cooling and no redundant components." },
    { questionText: "Which Data Center Tier provides 'High availability' and allows 'Maintenance without shutdown'?", options: ["Tier 1", "Tier 2", "Tier 3", "Tier 4"], correctAnswer: "Tier 3", explanation: "Tier 3 Data Centers have multiple paths for power and cooling, allowing any component to be shut down for maintenance without affecting operations." },
    { questionText: "What is the key characteristic of a 'Tier 4' Data Center?", options: ["It has no redundancy.", "It is fully fault-tolerant, offering maximum uptime.", "It allows maintenance with some shutdown required.", "It only hosts cloud computing services."], correctAnswer: "It is fully fault-tolerant, offering maximum uptime.", explanation: "Tier 4 is the highest standard, designed to withstand faults and failures without any interruption." }
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
            // Randomly assign a category from the list
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
        console.log(`Successfully inserted ${inserted} distinct handcrafted questions for Unit 3!`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
