const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 4: Advanced Network Design";

const questions = [
    // --- Cloud Computing Deep Dive (10 questions) ---
    { questionText: "Which Cloud Service Model provides virtualized computing resources like EC2 and Virtual Machines over the Internet?", options: ["SaaS (Software as a Service)", "PaaS (Platform as a Service)", "IaaS (Infrastructure as a Service)", "SDN (Software Defined Network)"], correctAnswer: "IaaS (Infrastructure as a Service)", explanation: "IaaS provides the foundational infrastructure (servers, storage, networking) virtually." },
    { questionText: "Google App Engine is an example of which Cloud Service Model designed for developing and deploying applications?", options: ["PaaS (Platform as a Service)", "IaaS (Infrastructure as a Service)", "SaaS (Software as a Service)", "VPC (Virtual Private Cloud)"], correctAnswer: "PaaS (Platform as a Service)", explanation: "PaaS provides a platform allowing customers to develop, run, and manage applications without the complexity of building the infrastructure." },
    { questionText: "Which characteristic of Cloud Computing allows services to scale up or down automatically based on demand?", options: ["Measured service", "Broad network access", "Rapid elasticity", "Resource pooling"], correctAnswer: "Rapid elasticity", explanation: "Rapid elasticity is the ability to quickly scale resources outward or inward automatically." },
    { questionText: "What does 'Resource pooling' mean in the context of Cloud Computing?", options: ["The provider charges by the minute.", "The provider serves multiple consumers using a multi-tenant model.", "The user can access the cloud from a mobile phone.", "The user must physically pool cables together."], correctAnswer: "The provider serves multiple consumers using a multi-tenant model.", explanation: "Resource pooling means the provider's computing resources are pooled to serve multiple consumers." },
    { questionText: "Which Cloud Deployment Model offers the highest level of security and control, as it is dedicated to a single organization?", options: ["Public Cloud", "Hybrid Cloud", "Private Cloud", "Community Cloud"], correctAnswer: "Private Cloud", explanation: "A Private Cloud is dedicated entirely to one organization, offering maximum privacy." },
    { questionText: "What is a 'Hybrid Cloud'?", options: ["A cloud that uses both Windows and Linux.", "A cloud that combines both public and private clouds.", "A cloud entirely hosted on local physical servers.", "A cloud exclusively for hospitals."], correctAnswer: "A cloud that combines both public and private clouds.", explanation: "A Hybrid Cloud binds public and private clouds together, allowing data and apps to be shared between them." },
    { questionText: "Which of the following is a primary advantage of a Public Cloud?", options: ["Maximum control over hardware.", "Low cost and easy scalability.", "Complete isolation from other companies.", "No need for an internet connection."], correctAnswer: "Low cost and easy scalability.", explanation: "Public clouds spread costs across many users and offer near-infinite scalability." },
    { questionText: "What does VPC stand for in cloud networking?", options: ["Virtual Public Connection", "Virtual Private Cloud", "Verified Protocol Center", "Virtual Processing Core"], correctAnswer: "Virtual Private Cloud", explanation: "A VPC is a logically isolated section of a public cloud." },
    { questionText: "Which feature of a VPC acts as a virtual firewall for your instances to control inbound and outbound traffic?", options: ["Route tables", "Security groups", "Private IP addressing", "Logical isolation"], correctAnswer: "Security groups", explanation: "Security groups control access to resources within the VPC." },
    { questionText: "In a Virtual Network, what is the role of a 'vSwitch'?", options: ["To physically connect physical servers.", "To route packets between different public clouds.", "To act as a software-based switch connecting virtual devices.", "To provide backup electricity."], correctAnswer: "To act as a software-based switch connecting virtual devices.", explanation: "A vSwitch (Virtual Switch) forwards packets between Virtual Machines within a hypervisor." },

    // --- SDN Deep Dive (5 questions) ---
    { questionText: "Which layer of the SDN Architecture specifically 'Makes routing decisions'?", options: ["Application Layer", "Control Layer", "Infrastructure Layer", "Physical Layer"], correctAnswer: "Control Layer", explanation: "In SDN, the Control Layer (SDN Controller) serves as the brain making routing decisions." },
    { questionText: "The 'Infrastructure Layer' in Software Defined Networking (SDN) contains:", options: ["Network applications like firewalls.", "The centralized SDN controller.", "Physical and virtual devices (Switches & Routers).", "Cloud storage databases."], correctAnswer: "Physical and virtual devices (Switches & Routers).", explanation: "The Infrastructure Layer consists of the actual forwarding hardware." },
    { questionText: "What is the primary advantage of Software Defined Networking (SDN)?", options: ["It forces all traffic to use thick coaxial cables.", "It allows Centralized control and easy configuration.", "It increases the physical weight of switches.", "It encrypts all data automatically."], correctAnswer: "It allows Centralized control and easy configuration.", explanation: "Because the control plane is centralized, administrators can configure the entire network from one interface." },
    { questionText: "Which SDN layer sits at the very top and contains network programs like load balancers and intrusion detection systems?", options: ["Application Layer", "Control Layer", "Infrastructure Layer", "Data Layer"], correctAnswer: "Application Layer", explanation: "The Application Layer communicates its network requirements to the SDN Controller." },
    { questionText: "Network Virtualization achieves which primary benefit?", options: ["It requires more physical hardware.", "It separates network services from physical hardware.", "It eliminates the need for IP addresses.", "It stops multicast traffic."], correctAnswer: "It separates network services from physical hardware.", explanation: "This separation simplifies management and improves flexibility." },

    // --- Case Studies Deep Dive (15 questions) ---
    { questionText: "In the 'Campus Network Design' case study, which layer connects the Labs, Library, Hostel, and Admin buildings together?", options: ["Access Switch", "Core Switch", "Distribution Switch", "Firewall"], correctAnswer: "Distribution Switch", explanation: "Distribution switches connect the various building access switches to the Core." },
    { questionText: "According to the 'Enterprise Network Design' case study, how do Remote Employees securely access the Headquarters?", options: ["Via direct physical fiber optic cables.", "Via a VPN Tunnel.", "Via standard unencrypted internet.", "Via a private satellite."], correctAnswer: "Via a VPN Tunnel.", explanation: "VPNs enable secure remote access over the public internet." },
    { questionText: "In the 'Data Center Network Design' case study, what sits immediately between the Firewall and the Servers?", options: ["Internet", "Load Balancer", "Storage Network", "Core Router"], correctAnswer: "Load Balancer", explanation: "The Load Balancer distributes incoming traffic from the firewall evenly across the servers." },
    { questionText: "Why would a startup choose a 'Cloud-Based Network Design' over a physical Data Center?", options: ["Because they want to buy expensive physical hardware.", "For cost-effective infrastructure and rapid deployment.", "Because cloud networks do not require security.", "Because clouds cannot scale."], correctAnswer: "For cost-effective infrastructure and rapid deployment.", explanation: "Startups avoid massive upfront capital costs by using scalable, rapid-deployment cloud infrastructure." },
    { questionText: "In the 'Hospital Network Design' case study, why is the network heavily segmented?", options: ["To combine doctor and patient data for easy access.", "To provide reliable healthcare services and ensure patient data security.", "To reduce the cost of buying a router.", "To increase the network latency intentionally."], correctAnswer: "To provide reliable healthcare services and ensure patient data security.", explanation: "Segmentation isolates critical medical devices and patient data from public/patient Wi-Fi." },
    { questionText: "Which step in the 'Design Methodology' involves 'Defining the IP addressing scheme'?", options: ["Requirement Analysis", "Logical Design", "Physical Design", "Testing and Optimization"], correctAnswer: "Logical Design", explanation: "Logical Design maps out the topology and IP addressing schemes." },
    { questionText: "Selecting the specific router models and cabling technologies occurs in which step of the Design Methodology?", options: ["Requirement Analysis", "Logical Design", "Physical Design", "Implementation"], correctAnswer: "Physical Design", explanation: "Physical Design involves selecting the actual hardware and technologies to be purchased." },
    { questionText: "Deploying the network occurs in the ________ phase of the Design Methodology.", options: ["Requirement Analysis", "Logical Design", "Physical Design", "Implementation"], correctAnswer: "Implementation", explanation: "Implementation is the active deployment and configuration phase." },
    { questionText: "What is the primary objective of a 'Network Design Case Study'?", options: ["To understand real-world applications of network design principles.", "To learn how to manufacture network cables.", "To calculate employee salaries.", "To write software code for routers."], correctAnswer: "To understand real-world applications of network design principles.", explanation: "Case studies bridge the gap between theoretical principles and practical, real-world deployment." },
    { questionText: "In the Enterprise Case Study, what protects the corporate resources at Headquarters from internet threats?", options: ["VLANs", "Firewall", "Cloud Services", "Switches"], correctAnswer: "Firewall", explanation: "The firewall sits at the perimeter to protect internal resources." },
    { questionText: "Which architecture component is critical for 'Fault tolerance' in a Data Center design?", options: ["Single points of failure.", "Redundant Core Switches.", "Unmanaged hubs.", "Standard DSL modems."], correctAnswer: "Redundant Core Switches.", explanation: "Redundancy at the core prevents the entire data center from going offline if one switch fails." },
    { questionText: "In a Cloud-Based Startup scenario, which cloud component isolates their environment from other startup companies on the same public cloud?", options: ["Virtual Private Cloud (VPC)", "SaaS", "Load Balancer", "Virtual Switch"], correctAnswer: "Virtual Private Cloud (VPC)", explanation: "A VPC provides a logically isolated private network within the shared public cloud." },
    { questionText: "For a Hospital Network, which of the following ensures 'Regulatory Compliance' (like HIPAA)?", options: ["Using open Wi-Fi for all devices.", "Strict access control, firewalls, and encryption.", "Eliminating all passwords for doctors.", "Using only legacy software."], correctAnswer: "Strict access control, firewalls, and encryption.", explanation: "Hospitals must legally protect patient data, requiring strict security measures." },
    { questionText: "A university campus requires support for 5000+ users. Which design principle must be heavily utilized?", options: ["Economy of Mechanism", "Scalable architecture", "Data Center Storage", "PaaS"], correctAnswer: "Scalable architecture", explanation: "Supporting 5000+ users and future growth demands a highly scalable network architecture." },
    { questionText: "If a company has Branch Offices, Headquarters, and Remote Employees, what overarching technology connects them all?", options: ["LAN", "WAN", "SAN", "PAN"], correctAnswer: "WAN", explanation: "A Wide Area Network (WAN) connects geographically dispersed locations like branches and remote workers." },

    // --- Extra fill-ins (5 questions) ---
    { questionText: "Which of the following is a classic sign of 'High Jitter'?", options: ["A file takes 5 minutes to download instead of 1 minute.", "A video call constantly freezes and drops audio.", "A user cannot log in to a server.", "A switch port turns off."], correctAnswer: "A video call constantly freezes and drops audio.", explanation: "Jitter heavily disrupts the steady flow required for real-time video/audio." },
    { questionText: "In Multicast, what does 'Efficient bandwidth utilization' mean?", options: ["The sender transmits identical data thousands of times.", "The sender transmits only one copy of the data, and routers duplicate it only where needed.", "The network blocks all video streaming.", "The sender uses the maximum available bandwidth."], correctAnswer: "The sender transmits only one copy of the data, and routers duplicate it only where needed.", explanation: "This saves massive amounts of bandwidth compared to Unicast." },
    { questionText: "Which security principle states that security should not depend on keeping the algorithm a secret?", options: ["Open Design", "Defense in Depth", "Fail-Safe Defaults", "Complete Mediation"], correctAnswer: "Open Design", explanation: "Open Design relies on the secrecy of the keys, not the obscurity of the algorithm." },
    { questionText: "Which QoS component dictates what happens when traffic exceeds the configured rate limit?", options: ["Marking", "Queuing", "Policing", "Classification"], correctAnswer: "Policing", explanation: "Policing drops packets that exceed the rate, directly controlling the traffic rate." },
    { questionText: "What is the main benefit of 'Weighted Fair Queuing (WFQ)' over 'Priority Queuing (PQ)'?", options: ["It drops all low-priority traffic.", "It prevents low-priority traffic from starving by allocating bandwidth fairly.", "It only supports voice traffic.", "It encrypts the queues."], correctAnswer: "It prevents low-priority traffic from starving by allocating bandwidth fairly.", explanation: "WFQ ensures all traffic gets a fair share, whereas PQ can starve low-priority queues completely." }
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
            q.type = "MULTIPLE_CHOICE";
            q.difficultyLevel = ["EASY", "MEDIUM", "HARD"][Math.floor(Math.random() * 3)];
            q.createdAt = new Date();
            
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
        console.log(`Successfully inserted ${inserted} highly distinct handcrafted questions for Unit 4 (Batch 3)!`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
