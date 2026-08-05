const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

const questions = [
    // NETWORK LAYER BASICS
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the Network Layer is the _______ layer of the OSI model, responsible for moving data (packets) from source to destination across multiple networks.",
        options: ["3rd", "2nd", "4th", "1st"],
        correctAnswer: "3rd",
        explanation: "Notes: 'The network layer is the 3rd layer of the OSI (Open Systems Interconnection) model.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes list three main responsibilities of the Network Layer. Which of the following is NOT listed?",
        options: ["MAC addressing", "Logical addressing", "Routing", "Packet forwarding"],
        correctAnswer: "MAC addressing",
        explanation: "Notes list: a) Logical addressing, b) Routing, c) Packet forwarding. MAC addressing is a Data Link Layer function.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the Network Layer assigns _______ addresses to devices (e.g., 192.168.1.1).",
        options: ["IP", "MAC", "Port", "Domain"],
        correctAnswer: "IP",
        explanation: "Notes: 'Logical addressing - Assigns IP addresses to devices. Example: 192.168.1.1'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, routing determines the best _______ for data to travel from sender to receiver, working across multiple networks.",
        options: ["Path", "Speed", "Protocol", "Port"],
        correctAnswer: "Path",
        explanation: "Notes: 'Routing - Determines the best path for data to travel from sender to receiver. Works across multiple networks (internetworking).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Fragmentation and Reassembly: if a packet is too large for a network, it is split into smaller _______, then reassembled at the destination.",
        options: ["Fragments", "Frames", "Cells", "Segments"],
        correctAnswer: "Fragments",
        explanation: "Notes: 'Fragmentation and Reassembly - If packet is too large for a network: it is split into smaller fragments. At destination: fragments are reassembled.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the main device that operates at the Network Layer is the _______.",
        options: ["Router", "Hub", "Switch", "Bridge"],
        correctAnswer: "Router",
        explanation: "Notes: 'Devices Used in Network Layer: Routers (Main Device). Operate at network layer. Forward packets based on IP addresses.'",
        difficultyLevel: "EASY"
    },
    // NETWORK LAYER PROTOCOLS
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that ICMP (Internet Control Message Protocol) is used for _______ messages and diagnostics. Example: ping.",
        options: ["Error", "Routing", "Data", "Authentication"],
        correctAnswer: "Error",
        explanation: "Notes: 'ICMP (Internet Control Message Protocol) - Used for error messages and diagnostics. Example: ping.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, ARP (Address Resolution Protocol) at the Network Layer converts an _______ address to a MAC address.",
        options: ["IP", "Port", "DNS", "Domain"],
        correctAnswer: "IP",
        explanation: "Notes: 'ARP (Address Resolution Protocol) - Converts: IP address → MAC address.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes list routing protocols used by routers. Which of the following is NOT listed?",
        options: ["HTTP", "RIP", "OSPF", "BGP"],
        correctAnswer: "HTTP",
        explanation: "Notes list routing protocols: 'RIP (Routing Information Protocol), OSPF (Open Shortest Path First), BGP (Border Gateway Protocol).' HTTP is an application layer protocol.",
        difficultyLevel: "MEDIUM"
    },
    // TYPES OF DELIVERY
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes define Multicast as: one sender to a _______ of devices.",
        options: ["Group", "All", "Single", "Two"],
        correctAnswer: "Group",
        explanation: "Notes: 'Multicast - One sender → group of devices.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Network Layer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, IP (Internet Protocol) provides a _______ (connectionless) service where each packet travels independently with no guarantee of delivery, order, or duplication control.",
        options: ["Best-effort", "Guaranteed", "Reliable", "Ordered"],
        correctAnswer: "Best-effort",
        explanation: "Notes: 'Connectionless (IP) - No prior connection needed. Each packet travels independently. Best-effort delivery. No guarantee of: Delivery, Order, Duplication.'",
        difficultyLevel: "MEDIUM"
    },
    // ROUTING ALGORITHMS
    {
        subjectId, moduleName: "Unit 3: Routing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes define a routing algorithm as a method used by routers to determine the optimal _______ for forwarding packets across a network.",
        options: ["Path", "Address", "Protocol", "Speed"],
        correctAnswer: "Path",
        explanation: "Notes: 'A routing algorithm is a method used by routers to determine the optimal path for forwarding packets across a network.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes classify routing algorithms into two broad categories: Static (Non-Adaptive) and _______ (Adaptive).",
        options: ["Dynamic", "Manual", "Fixed", "Periodic"],
        correctAnswer: "Dynamic",
        explanation: "Notes: '1. Static Routing (Non-Adaptive) - Routes are manually configured. 2. Dynamic Routing (Adaptive) - Routes are updated automatically.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Static Routing is simple to implement but NOT suitable for _______ networks.",
        options: ["Large", "Small", "Local", "Wired"],
        correctAnswer: "Large",
        explanation: "Notes: 'Static Routing: Not suitable for large networks. Example: Small office networks.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Distance Vector Routing as: each router shares its routing table with _______, using distance (cost) and direction (next hop).",
        options: ["Neighbors", "All routers", "The destination only", "The source only"],
        correctAnswer: "Neighbors",
        explanation: "Notes: 'Distance Vector Routing - Each router shares its routing table with neighbors. Uses distance (cost) + direction (next hop).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Distance Vector Routing uses the _______ Algorithm and its example protocol is RIP.",
        options: ["Bellman-Ford", "Dijkstra's", "Floyd-Warshall", "Prim's"],
        correctAnswer: "Bellman-Ford",
        explanation: "Notes: 'Distance Vector Routing - Algorithm Used: Bellman-Ford Algorithm. Example Protocol: RIP (Routing Information Protocol).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes list a disadvantage of Distance Vector Routing as _______ (count-to-infinity problem) and slow convergence.",
        options: ["Routing loops", "High memory usage", "Complex implementation", "No failover"],
        correctAnswer: "Routing loops",
        explanation: "Notes: 'Distance Vector Routing Disadvantages: Slow convergence. Routing loops (count-to-infinity problem).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Link State Routing builds a complete _______ of the network at each router and uses Dijkstra's Algorithm.",
        options: ["Map", "Table only", "Distance vector", "Token ring"],
        correctAnswer: "Map",
        explanation: "Notes: 'Link State Routing - Each router builds a complete map of the network. Algorithm Used: Dijkstra's Algorithm. Example Protocol: OSPF.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that Link State Routing has the advantage of _______ convergence and accurate routing, but requires more memory and CPU.",
        options: ["Fast", "Slow", "Manual", "Periodic"],
        correctAnswer: "Fast",
        explanation: "Notes: 'Link State Routing Advantages: Fast convergence. Accurate routing. Disadvantages: Requires more memory and CPU. Complex to implement.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Path Vector Routing maintains the entire _______ (list of routers/AS) and is used by BGP (Border Gateway Protocol) between Autonomous Systems.",
        options: ["Path", "Distance", "Map", "Frequency"],
        correctAnswer: "Path",
        explanation: "Notes: 'Path Vector Routing - Maintains the entire path (list of routers/AS). Example Protocol: BGP (Border Gateway Protocol). Used in: Internet (between Autonomous Systems).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Flooding as: every incoming packet is sent to all outgoing links. It guarantees delivery but causes _______ redundancy and congestion risk.",
        options: ["Massive", "No", "Minimal", "Selective"],
        correctAnswer: "Massive",
        explanation: "Notes: 'Flooding: Every incoming packet is sent to all outgoing links. Disadvantages: Massive redundancy. Congestion risk.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Flooding is controlled using TTL (Time To Live) and _______ numbers.",
        options: ["Sequence", "Port", "MAC", "IP"],
        correctAnswer: "Sequence",
        explanation: "Notes: 'Flooding - Controlled using: TTL (Time To Live). Sequence numbers.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Routing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Hierarchical Routing as dividing the network into regions or areas. It is scalable because it _______ routing table size.",
        options: ["Reduces", "Increases", "Doubles", "Has no effect on"],
        correctAnswer: "Reduces",
        explanation: "Notes: 'Hierarchical Routing - Network divided into regions or areas. Advantages: Scalable. Reduces routing table size.'",
        difficultyLevel: "MEDIUM"
    },
    // IP ADDRESSES
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes define an IP address as a unique _______ identifier assigned to every device connected to a network, allowing devices to communicate.",
        options: ["Numerical", "Alphabetical", "Physical", "Sequential"],
        correctAnswer: "Numerical",
        explanation: "Notes: 'An IP address (Internet Protocol address) is a unique numerical identifier assigned to every device connected to a network.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, IPv4 uses a _______ address written in dotted decimal format (e.g., 192.168.1.1).",
        options: ["32-bit", "64-bit", "128-bit", "16-bit"],
        correctAnswer: "32-bit",
        explanation: "Notes: 'IPv4: 32-bit address. Written in dotted decimal format. Example: 192.168.1.1.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe IPv4 addresses as divided into 4 _______ (8 bits each), giving a range of 0.0.0.0 to 255.255.255.255.",
        options: ["Octets", "Nibbles", "Bits", "Bytes"],
        correctAnswer: "Octets",
        explanation: "Notes: 'IPv4 Structure: Divided into 4 octets (8 bits each). Range: 0.0.0.0 → 255.255.255.255.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, IPv6 uses a _______ address written in hexadecimal format.",
        options: ["128-bit", "32-bit", "64-bit", "256-bit"],
        correctAnswer: "128-bit",
        explanation: "Notes: 'IPv6: 128-bit address. Written in hexadecimal format. Example: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.'",
        difficultyLevel: "EASY"
    },
    // IPv4 CLASSES
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes show that Class A IPv4 addresses range from 1.0.0.0 to 126.255.255.255, and are used for _______ networks.",
        options: ["Large", "Medium", "Small", "Experimental"],
        correctAnswer: "Large",
        explanation: "Notes: 'Class A: 1.0.0.0 – 126.255.255.255 → Large networks.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Class D IPv4 addresses (224.0.0.0 – 239.255.255.255) are used for _______.",
        options: ["Multicasting", "Large networks", "Experimental", "Small networks"],
        correctAnswer: "Multicasting",
        explanation: "Notes: 'Class D: 224.0.0.0 – 239.255.255.255 → Multicasting.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that Class C IPv4 addresses range from 192.0.0.0 to 223.255.255.255 and are used for _______ networks.",
        options: ["Small", "Large", "Medium", "Experimental"],
        correctAnswer: "Small",
        explanation: "Notes: 'Class C: 192.0.0.0 – 223.255.255.255 → Small networks.'",
        difficultyLevel: "MEDIUM"
    },
    // PUBLIC & PRIVATE IP
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, a Public IP address is assigned by the _______ and is unique globally.",
        options: ["ISP (Internet Service Provider)", "DHCP server only", "The user themselves", "The router"],
        correctAnswer: "ISP (Internet Service Provider)",
        explanation: "Notes: 'Public IP Address - Assigned by Internet Service Provider (ISP). Used on the Internet. Unique globally.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes list private IP ranges. Which of the following is listed as a private IP range?",
        options: ["192.168.0.0 – 192.168.255.255", "8.8.8.0 – 8.8.8.255", "100.0.0.0 – 100.255.255.255", "200.0.0.0 – 200.255.255.255"],
        correctAnswer: "192.168.0.0 – 192.168.255.255",
        explanation: "Notes: 'Private IP Ranges: 10.0.0.0 – 10.255.255.255, 172.16.0.0 – 172.31.255.255, 192.168.0.0 – 192.168.255.255.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the loopback address is _______, used for testing.",
        options: ["127.0.0.1", "192.168.1.1", "255.255.255.255", "0.0.0.0"],
        correctAnswer: "127.0.0.1",
        explanation: "Notes: 'Loopback Address: 127.0.0.1 (used for testing).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes define a Static IP as a _______ address that does not change, typically used for servers.",
        options: ["Fixed", "Dynamic", "Temporary", "Random"],
        correctAnswer: "Fixed",
        explanation: "Notes: 'Static IP: Fixed address. Does not change. Used for servers.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: IP Addressing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, a Dynamic IP is assigned automatically via _______ and changes over time.",
        options: ["DHCP", "DNS", "ARP", "OSPF"],
        correctAnswer: "DHCP",
        explanation: "Notes: 'Dynamic IP: Assigned automatically (via DHCP). Changes over time.'",
        difficultyLevel: "EASY"
    },
    // SUBNET MASK
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes define a subnet mask as dividing the IP address into two parts: a _______ part and a host part.",
        options: ["Network", "Gateway", "Broadcast", "Class"],
        correctAnswer: "Network",
        explanation: "Notes: 'A subnet mask divides the IP into: Network part and Host part.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, CIDR notation /24 means _______ bits are used for the network part.",
        options: ["24", "8", "16", "32"],
        correctAnswer: "24",
        explanation: "Notes: '/24 means 24 bits are 1s (network part). Converting to binary: 11111111.11111111.11111111.00000000. Final Subnet Mask: 255.255.255.0.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that CIDR /24 corresponds to a subnet mask of _______.",
        options: ["255.255.255.0", "255.255.0.0", "255.0.0.0", "255.255.255.128"],
        correctAnswer: "255.255.255.0",
        explanation: "Notes: 'CIDR /24 → Subnet Mask: 255.255.255.0.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the formula for calculating the number of hosts per subnet is: 2^n - _______, where n = number of host bits.",
        options: ["2", "1", "0", "4"],
        correctAnswer: "2",
        explanation: "Notes: 'Formula: 2^n - 2 = number of hosts. Where: n = number of host bits.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe subnetting as dividing one _______ network into smaller sub-networks (subnets).",
        options: ["Large", "Small", "Wireless", "Virtual"],
        correctAnswer: "Large",
        explanation: "Notes: 'Subnetting = dividing one large network into smaller sub-networks (subnets).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, to subnet 192.168.1.0/24 into 4 subnets, you need to borrow _______ bits (because 2^2 = 4).",
        options: ["2", "1", "3", "4"],
        correctAnswer: "2",
        explanation: "Notes: 'We need 4 subnets. 2^2 = 4. Borrow 2 bits. New CIDR = 24 + 2 = /26.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes give the formula for block size in subnetting as: Block size = 256 - _______.",
        options: ["Last octet of subnet mask", "First octet", "Number of hosts", "CIDR number"],
        correctAnswer: "Last octet of subnet mask",
        explanation: "Notes: 'Formula: Block size = 256 - last octet (of subnet mask).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Subnetting", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, CIDR /8 corresponds to a subnet mask of _______.",
        options: ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.128"],
        correctAnswer: "255.0.0.0",
        explanation: "Notes CIDR table: '/8 → 255.0.0.0.'",
        difficultyLevel: "MEDIUM"
    },
    // SUPERNETTING
    {
        subjectId, moduleName: "Unit 3: Supernetting", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes define supernetting as the _______ of subnetting: it combines multiple smaller networks into one larger network.",
        options: ["Opposite", "Extension", "Complement", "Duplicate"],
        correctAnswer: "Opposite",
        explanation: "Notes: 'Supernetting is the opposite of subnetting. Subnetting = divide one network into smaller ones. Supernetting = combine multiple smaller networks into one larger network.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Supernetting", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, supernetting is also called route _______ or CIDR (Classless Inter-Domain Routing).",
        options: ["Aggregation", "Isolation", "Fragmentation", "Splitting"],
        correctAnswer: "Aggregation",
        explanation: "Notes: 'Supernetting is also called route aggregation or CIDR (Classless Inter-Domain Routing).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Supernetting", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that supernetting requires networks to be contiguous, have the same subnet mask, and the number of networks must be a _______ of 2.",
        options: ["Power", "Multiple", "Factor", "Divisor"],
        correctAnswer: "Power",
        explanation: "Notes: 'Conditions for Supernetting: 1. Be contiguous (sequential). 2. Have the same subnet mask. 3. Number of networks must be power of 2 (2, 4, 8, 16...).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Supernetting", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, combining 4 networks using supernetting reduces the prefix by _______ bits (e.g., /24 → /22).",
        options: ["2", "1", "4", "8"],
        correctAnswer: "2",
        explanation: "Notes: '4 networks → 2^2 = 4 → remove 2 bits. Original = /24. 24 - 2 = /22.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Supernetting", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes compare Subnetting and Supernetting. In subnetting, the prefix _______ (e.g., /24 → /26), while in supernetting the prefix decreases.",
        options: ["Increases", "Decreases", "Stays the same", "Doubles"],
        correctAnswer: "Increases",
        explanation: "Notes: 'Subnetting vs Supernetting: Subnetting - Prefix Increases (/24 → /26). Supernetting - Prefix Decreases (/24 → /22).'",
        difficultyLevel: "MEDIUM"
    },
    // MOBILE NETWORK ARCHITECTURE
    {
        subjectId, moduleName: "Unit 3: Mobile Networks", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that mobile network architecture is divided into three major parts: Radio Access Network (RAN), _______ Network (CN), and Backhaul Network.",
        options: ["Core", "Central", "Cloud", "Control"],
        correctAnswer: "Core",
        explanation: "Notes: 'A mobile network is divided into three major parts: 1. Radio Access Network (RAN). 2. Core Network (CN). 3. Backhaul Network.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Mobile Networks", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the RAN (Radio Access Network) connects your phone to the network. In 4G, the base station is called _______.",
        options: ["eNodeB", "BTS", "Node B", "gNodeB"],
        correctAnswer: "eNodeB",
        explanation: "Notes: 'Base Station: 2G → BTS. 3G → Node B. 4G → eNodeB. 5G → gNodeB.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Mobile Networks", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the Core Network (CN) as the 'brain' of the mobile network. Which of the following is listed as a function of the Core Network?",
        options: ["Authentication", "Sending radio signals", "Providing cell coverage", "Handling handover"],
        correctAnswer: "Authentication",
        explanation: "Notes: 'Core Network (CN) Functions: Call routing. Internet connectivity. Authentication. Mobility management.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Mobile Networks", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, HLR (Home Location Register) in the Core Network is used to _______ subscriber information.",
        options: ["Store", "Route", "Authenticate", "Transmit"],
        correctAnswer: "Store",
        explanation: "Notes: 'HLR (Home Location Register) → Stores subscriber info.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Mobile Networks", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the Backhaul Network connects _______ to the Core Network using fiber optic cables, microwave links, or satellite.",
        options: ["RAN (base stations)", "Mobile devices directly", "Internet servers", "The ISP"],
        correctAnswer: "RAN (base stations)",
        explanation: "Notes: 'Backhaul Network: Connects RAN to the Core Network. Technologies: Fiber optic cables. Microwave links. Satellite (in remote areas).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 3: Mobile Networks", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, 5G mobile network is characterized by ultra-low _______ and massive device support (IoT).",
        options: ["Latency", "Bandwidth", "Frequency", "Cost"],
        correctAnswer: "Latency",
        explanation: "Notes: '5G: Ultra-low latency. Massive device support (IoT).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Mobile Networks", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe 4G LTE as an _______ (All IP-based) network with high-speed internet.",
        options: ["All IP-based", "Circuit-switched", "ATM-based", "Analog"],
        correctAnswer: "All IP-based",
        explanation: "Notes: '4G LTE: All IP-based network. High-speed internet.'",
        difficultyLevel: "EASY"
    },
    // MODULATION
    {
        subjectId, moduleName: "Unit 3: Modulation", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes define modulation as the process of encoding information onto a _______ signal (usually a high-frequency wave) so it can travel long distances.",
        options: ["Carrier", "Digital", "Baseband", "Noise"],
        correctAnswer: "Carrier",
        explanation: "Notes: 'Modulation is the process of encoding information onto a carrier signal (usually a high-frequency wave) so it can travel long distances.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Modulation", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in Amplitude Modulation (AM), the _______ of the carrier changes while the frequency remains constant.",
        options: ["Amplitude", "Phase", "Frequency", "Wavelength"],
        correctAnswer: "Amplitude",
        explanation: "Notes: 'Amplitude Modulation (AM) - Amplitude of carrier changes. Frequency remains constant. Used in: AM radio broadcasting.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Modulation", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that FM (Frequency Modulation) has the _______ of the carrier changing while the amplitude remains constant.",
        options: ["Frequency", "Amplitude", "Phase", "Power"],
        correctAnswer: "Frequency",
        explanation: "Notes: 'Frequency Modulation (FM) - Frequency of carrier changes. Amplitude remains constant. Used in: FM radio. High-quality audio transmission.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Modulation", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, digital modulation uses _______ (binary) signals (0s and 1s) to modify the carrier.",
        options: ["Discrete", "Continuous", "Analog", "Random"],
        correctAnswer: "Discrete",
        explanation: "Notes: 'Digital modulation uses discrete (binary) signals (0s and 1s) to modify the carrier.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 3: Modulation", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe QAM (Quadrature Amplitude Modulation) as combining _______ and phase, making it very efficient. It is used in Wi-Fi and 4G/5G.",
        options: ["Amplitude", "Frequency", "Code", "Time"],
        correctAnswer: "Amplitude",
        explanation: "Notes: 'Quadrature Amplitude Modulation (QAM) - Combines amplitude + phase. Very efficient. Used in: Wi-Fi. 4G/5G networks. Digital TV.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 3: Modulation", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, compared to analog modulation, digital modulation is more resistant to _______ and supports higher data rates.",
        options: ["Noise", "Cost", "Simplicity", "Distance"],
        correctAnswer: "Noise",
        explanation: "Notes: 'Advantages of Digital Modulation: More resistant to noise. Higher data rates. Better security.'",
        difficultyLevel: "EASY"
    }
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    let inserted = 0, skipped = 0;
    for (let q of questions) {
        q.createdAt = new Date();
        const exists = await db.collection('questions').findOne({ subjectId: q.subjectId, questionText: q.questionText });
        if (!exists) { await db.collection('questions').insertOne(q); inserted++; }
        else skipped++;
    }
    const total = await db.collection('questions').countDocuments({ subjectId });
    console.log(`\n✅ PDF 7 (Unit 3: Network Layer) IMEKAMILIKA!`);
    console.log(`   Maswali mapya: ${inserted} | Yaliyorukwa: ${skipped} | JUMLA: ${total}`);
  } finally { await client.close(); }
}
run().catch(console.dir);
