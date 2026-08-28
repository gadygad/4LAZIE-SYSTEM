const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const SID = "6a5d16dbf29e866583f45d27";

const Q = (cat, lvl, q, opts, ans, exp) => ({
    subjectId: SID, category: cat, difficultyLevel: lvl,
    questionText: q, options: opts, correctAnswer: ans, explanation: exp,
    _class: "com.school.model.Question"
});

const questions_part2 = [
// ╔══════════════════════════════════╗
// ║         CAT 1 (20 Qns)           ║
// ╚══════════════════════════════════╝
Q("CAT 1", "EASY", "A computer network is mainly of how many types based on size?", ["2", "3", "4", "5"], "4", "A computer network is mainly of four types: LAN, MAN, WAN, and PAN."),
Q("CAT 1", "EASY", "What does LAN stand for?", ["Large Area Network", "Local Area Network", "Logical Area Network", "Local Array Network"], "Local Area Network", "LAN stands for Local Area Network, covering small areas like a building."),
Q("CAT 1", "EASY", "Which type of network connects devices within a range of about 10 meters?", ["WAN", "MAN", "LAN", "PAN"], "PAN", "PAN (Personal Area Network) connects devices within a typical range of 10 meters."),
Q("CAT 1", "EASY", "Which network covers a large geographical area such as states or countries?", ["PAN", "LAN", "MAN", "WAN"], "WAN", "A Wide Area Network (WAN) extends over a large geographical area."),
Q("CAT 1", "EASY", "What is an example of a Body Area Network?", ["A network covering a city", "A mobile network that moves with a person", "A network connecting office computers", "The global internet"], "A mobile network that moves with a person", "A Body Area Network moves with a person, for example, a mobile device establishing a connection with a smartwatch."),
Q("CAT 1", "EASY", "A telecom company providing internet to hundreds of cities via fiber is an example of:", ["Body Area Network", "Last Mile WAN", "Offline Network", "PAN"], "Last Mile WAN", "This is an example of a WAN, specifically 'Last mile' connectivity to customers."),
Q("CAT 1", "EASY", "Which is a major disadvantage of WAN compared to LAN?", ["It is too fast", "It has fewer security issues", "It has more security issues and requires firewalls/antivirus", "It only supports 2 computers"], "It has more security issues and requires firewalls/antivirus", "WAN connects large networks across the internet, leading to higher security risks and the need for robust firewalls."),
Q("CAT 1", "EASY", "What are the rules and standards that govern how data is transmitted over a network?", ["Nodes", "Topology", "Protocol", "Firewall"], "Protocol", "A protocol is a set of rules governing data transmission, e.g., TCP/IP, HTTP."),
Q("CAT 1", "EASY", "What does IP Address stand for?", ["Internal Protocol Address", "Internet Protocol Address", "Intranet Private Address", "Interface Provider Address"], "Internet Protocol Address", "IP stands for Internet Protocol. It's a unique identifier assigned to every device on a network."),
Q("CAT 1", "EASY", "Which of the following is a 2-port device?", ["Hub", "Switch", "Router", "Bridge"], "Bridge", "A bridge is typically a 2-port device used to interconnect two LANs."),
Q("CAT 1", "MEDIUM", "What is the most widely used protocol in a Metropolitan Area Network (MAN)?", ["TCP/IP", "HTTP", "RS-232, Frame Relay, ATM", "Bluetooth"], "RS-232, Frame Relay, ATM", "Protocols commonly used in MAN include RS-232, Frame Relay, ATM, ISDN, etc."),
Q("CAT 1", "MEDIUM", "What is the primary function of a Repeater?", ["To route packets", "To block viruses", "To regenerate the signal before it becomes too weak", "To assign IP addresses"], "To regenerate the signal before it becomes too weak", "A repeater operates at the physical layer to copy and regenerate a weak signal bit by bit."),
Q("CAT 1", "MEDIUM", "Why is a switch considered more efficient than a hub?", ["Because it is cheaper", "Because it forwards packets selectively to the correct port", "Because it is smaller in size", "Because it is wireless"], "Because it forwards packets selectively to the correct port", "A switch performs error checking and forwards packets only to the intended destination, reducing collisions."),
Q("CAT 1", "MEDIUM", "Which device uses a dynamically updating routing table to make decisions?", ["Hub", "Repeater", "Switch", "Router"], "Router", "A router is a network layer device that uses routing tables to forward data packets between networks."),
Q("CAT 1", "MEDIUM", "What is Subnetting?", ["Combining multiple networks into one", "Partitioning a single physical network into multiple smaller sub-networks", "A type of network cable", "A routing protocol"], "Partitioning a single physical network into multiple smaller sub-networks", "Subnetting logically partitions a network into smaller sub-networks to simplify troubleshooting and improve security."),
Q("CAT 1", "HARD", "How does a Transparent Bridge work?", ["It sends a discovery frame to all nodes", "The stations are completely unaware of its existence and it uses forwarding/learning", "It acts as a firewall", "It translates IPv4 to IPv6"], "The stations are completely unaware of its existence and it uses forwarding/learning", "Transparent bridges operate invisibly to network stations, automatically learning MAC addresses and forwarding frames."),
Q("CAT 1", "HARD", "In an IP address, what does the Network Address (Network ID) do?", ["Identifies the specific computer", "Identifies the network prefix common to all hosts within that network", "Acts as the MAC address", "Translates domain names"], "Identifies the network prefix common to all hosts within that network", "The Network Address identifies the network itself. All hosts on the same network share this common prefix."),
Q("CAT 1", "HARD", "If you have a Class C network, what is the default number of bits used for the host address?", ["8 bits", "16 bits", "24 bits", "32 bits"], "8 bits", "In a Class C address, 24 bits are used for the network address and 8 bits are used for the host address."),
Q("CAT 1", "HARD", "Given the IP address 192.55.12.6 with subnet mask 255.255.255.252, what is the number of usable hosts?", ["2", "4", "6", "14"], "2", "The subnet mask .252 leaves 2 bits for hosts. 2^2 = 4 total IPs. Subtracting network and broadcast IDs leaves 2 usable hosts."),
Q("CAT 1", "HARD", "In Ring Topology, what happens if the data needs to be sent from the 1st node to the 100th node?", ["It goes directly to the 100th node", "It must pass through the 99 intermediate nodes", "It is broadcasted to all nodes simultaneously", "It is routed by a central hub"], "It must pass through the 99 intermediate nodes", "In a ring topology, data is passed sequentially from one node to the next until it reaches the destination."),

// ╔══════════════════════════════════╗
// ║         CAT 2 (20 Qns)           ║
// ╚══════════════════════════════════╝
Q("CAT 2", "EASY", "Which topology uses a central hub to which all other nodes are connected?", ["Mesh", "Bus", "Ring", "Star"], "Star", "In Star Topology, all devices are connected to a single central hub."),
Q("CAT 2", "EASY", "Which topology uses a single backbone cable with drop cables or direct connections?", ["Star", "Mesh", "Bus", "Tree"], "Bus", "Bus topology connects all stations through a single backbone cable."),
Q("CAT 2", "EASY", "What is an Intelligent Hub?", ["A hub that requires no electricity", "A hub with remote management capabilities and flexible data rates", "A hub that acts as a router", "A hub that translates IP to MAC"], "A hub with remote management capabilities and flexible data rates", "Intelligent hubs include remote management capabilities and allow administrators to monitor traffic."),
Q("CAT 2", "EASY", "What does a Gateway do?", ["It connects networks that work upon different networking models", "It only connects identical LANs", "It regenerates physical signals", "It provides wireless access"], "It connects networks that work upon different networking models", "Gateways act as protocol converters, interpreting and transferring data between different networking models."),
Q("CAT 2", "EASY", "Which device divides the broadcast domains of hosts?", ["Hub", "Switch", "Bridge", "Router"], "Router", "A router divides broadcast domains, whereas switches and bridges only divide collision domains."),
Q("CAT 2", "EASY", "How many bits are in an IPv4 address?", ["16", "32", "64", "128"], "32", "An IPv4 address consists of 32 bits, divided into four 8-bit octets."),
Q("CAT 2", "EASY", "What is the decimal equivalent of the binary octet 11111111?", ["128", "192", "255", "256"], "255", "In binary, 11111111 equals 255 in decimal."),
Q("CAT 2", "EASY", "Which address class is for networks with more than 65,536 hosts?", ["Class A", "Class B", "Class C", "Class D"], "Class A", "Class A networks leave 24 bits for hosts, allowing up to 16,777,214 hosts per network."),
Q("CAT 2", "EASY", "Which of these is the default subnet mask for Class B?", ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], "255.255.0.0", "Class B networks use the first 16 bits for the network ID, making the default mask 255.255.0.0."),
Q("CAT 2", "EASY", "What does CIDR stand for?", ["Classless Inter-Domain Routing", "Classful Internet Data Routing", "Computer Interface Domain Router", "Centralized Internal Data Routing"], "Classless Inter-Domain Routing", "CIDR is an IP address allocation method that improves data routing efficiency, represented like /28."),
Q("CAT 2", "MEDIUM", "What is 'Attenuation' in networking?", ["The strengthening of a signal", "The loss of signal strength over a distance", "A type of routing protocol", "A network topology"], "The loss of signal strength over a distance", "Attenuation is the loss of signal over distance, leading to communication issues. Repeaters are used to regenerate the signal."),
Q("CAT 2", "MEDIUM", "In a dual-ring topology, how does data flow?", ["Unidirectional", "Bidirectional", "Omnidirectional", "Randomly"], "Bidirectional", "By having 2 connections between each network node, a ring topology can be made bidirectional, known as Dual Ring Topology."),
Q("CAT 2", "MEDIUM", "Which node in a Ring Topology takes responsibility for performing operations?", ["The central hub", "The monitor station", "The gateway", "The router"], "The monitor station", "In ring topology operations, one station acts as the monitor station taking responsibility for operations."),
Q("CAT 2", "MEDIUM", "What is a major advantage of Tree Topology?", ["It is the cheapest topology", "It is completely immune to central hub failure", "Error detection and correction are very easy", "It requires no cables"], "Error detection and correction are very easy", "Due to its hierarchical structure, isolating segments and detecting/correcting errors is very easy in a tree topology."),
Q("CAT 2", "MEDIUM", "Which device is also known as a bridging router?", ["Gateway", "Switch", "Brouter", "Repeater"], "Brouter", "A Brouter combines features of both a bridge (data link layer) and a router (network layer)."),
Q("CAT 2", "HARD", "How is the Broadcast address determined when using a subnet mask?", ["By setting all host bits to 1s", "By setting all host bits to 0s", "By setting all network bits to 0s", "It is provided by the ISP"], "By setting all host bits to 1s", "The broadcast address is the highest IP in the subnet, obtained by setting all bits in the host portion to 1."),
Q("CAT 2", "HARD", "If the subnet mask is 255.255.255.224, what is the CIDR notation?", ["/24", "/26", "/27", "/28"], "/27", "255.255.255 is 24 bits. 224 in binary is 11100000 (3 bits). 24 + 3 = 27. So it is /27."),
Q("CAT 2", "HARD", "In subnetting calculations, what does the formula 2^n - 2 calculate?", ["The number of networks", "The total number of IPs", "The number of usable hosts", "The broadcast address"], "The number of usable hosts", "2^n gives the total IPs. Subtracting 2 (for the network ID and broadcast IP) gives the number of usable host IPs."),
Q("CAT 2", "HARD", "Why does an organization use subnetting?", ["To increase the physical size of cables", "To divide a network into several contiguous network groups, reducing IP wastage and isolating traffic", "To convert IP addresses to MAC addresses", "To bypass firewall security"], "To divide a network into several contiguous network groups, reducing IP wastage and isolating traffic", "Subnetting reduces broadcast traffic, isolates networks for security, and minimizes the wastage of IP addresses."),
Q("CAT 2", "HARD", "In which topology are the protocols AHCP and DHCP most notably mentioned in the context of dedicated channels?", ["Star", "Mesh", "Bus", "Tree"], "Mesh", "In Mesh topology, every device is connected via dedicated channels, and protocols like AHCP (Ad Hoc Configuration Protocols) and DHCP are used."),

// ╔══════════════════════════════════╗
// ║           UE (20 Qns)            ║
// ╚══════════════════════════════════╝
Q("UE", "EASY", "Which type of network is used to connect multiple LANs within a city?", ["LAN", "MAN", "WAN", "PAN"], "MAN", "A Metropolitan Area Network (MAN) covers a larger geographic area like a city by interconnecting different LANs."),
Q("UE", "EASY", "Which of the following describes a Star Topology?", ["All nodes connect to a single central hub", "All nodes connect in a straight line", "All nodes connect in a circle", "Every node connects to every other node"], "All nodes connect to a single central hub", "In a star topology, the central hub acts as a conduit to transmit messages to all connected devices."),
Q("UE", "EASY", "Which of the following is NOT a network device?", ["Hub", "Switch", "Browser", "Bridge"], "Browser", "A browser is a software application. Hubs, switches, and bridges are physical network hardware devices."),
Q("UE", "EASY", "Which layer of the OSI model does a Router operate on?", ["Physical Layer", "Data Link Layer", "Network Layer", "Transport Layer"], "Network Layer", "A router is mainly a Network Layer (Layer 3) device that routes data packets based on IP addresses."),
Q("UE", "EASY", "Which layer of the OSI model does a Switch operate on?", ["Physical Layer", "Data Link Layer", "Network Layer", "Session Layer"], "Data Link Layer", "A switch is a data link layer (Layer 2) device that uses MAC addresses to forward data to the correct port."),
Q("UE", "EASY", "What is the size of an IPv4 address?", ["16 bits", "32 bits", "64 bits", "128 bits"], "32 bits", "An IPv4 address is a 32-bit number, usually represented in four 8-bit octets (dot-decimal format)."),
Q("UE", "EASY", "Which component of an IP address identifies the specific device on a network?", ["Network ID", "Host ID", "Subnet Mask", "MAC Address"], "Host ID", "The IP address is divided into a Network ID and a Host ID. The Host ID identifies the specific device."),
Q("UE", "EASY", "In an IP address, the '255' in a default subnet mask indicates what?", ["Host portion", "Network portion", "Broadcast address", "MAC address"], "Network portion", "The '255' (all 1s in binary) in a subnet mask represents the network portion of the IP address."),
Q("UE", "EASY", "What is the primary purpose of a Subnet Mask?", ["To encrypt IP addresses", "To separate the IP address into Network ID and Host ID", "To prevent physical collisions", "To translate domain names"], "To separate the IP address into Network ID and Host ID", "A subnet mask determines which bits of the IP address belong to the network and which belong to the host."),
Q("UE", "EASY", "What is an example of a Hybrid Topology?", ["A home Wi-Fi network", "A simple peer-to-peer connection", "A university campus network combining Star and Bus topologies", "A direct cable between two PCs"], "A university campus network combining Star and Bus topologies", "A university campus often uses a hybrid topology, such as a star backbone connecting buses or rings in different buildings."),
Q("UE", "MEDIUM", "What causes 'Signal Interference' in a Bus Topology?", ["Using fiber optic cables", "When two nodes send messages simultaneously causing their signals to collide", "When the hub fails", "When a router has an empty table"], "When two nodes send messages simultaneously causing their signals to collide", "In a bus topology, all nodes share the same channel. Simultaneous transmission causes signal collision."),
Q("UE", "MEDIUM", "How does a repeater differ from a standard amplifier?", ["It decreases the signal strength", "It only amplifies the signal without regenerating the bits", "It copies the signal bit by bit and regenerates it to original strength", "It converts analog to digital"], "It copies the signal bit by bit and regenerates it to original strength", "Repeaters don't just amplify noise; they regenerate the original signal bit by bit."),
Q("UE", "MEDIUM", "What does a Passive Hub do?", ["Regenerates the signal", "Filters MAC addresses", "Routes IP packets", "Collects wiring and relays signals without cleaning or boosting them"], "Collects wiring and relays signals without cleaning or boosting them", "Passive hubs simply act as a physical connection point without regenerating or boosting the signal."),
Q("UE", "MEDIUM", "Why does a switch divide the collision domain but not the broadcast domain?", ["It routes packets via IP addresses", "It only understands MAC addresses and sends broadcasts to all ports", "It operates at the physical layer", "It encrypts broadcast packets"], "It only understands MAC addresses and sends broadcasts to all ports", "Switches operate at Layer 2. They isolate collision domains per port but must flood broadcast frames to all ports since they don't route."),
Q("UE", "MEDIUM", "Which device acts as a protocol converter between different networking models?", ["Gateway", "Hub", "Repeater", "Switch"], "Gateway", "A gateway takes data from one system, interprets it, and transfers it to a network using a different protocol/model."),
Q("UE", "HARD", "Given the IP 192.55.12.4/28, what is the network address and broadcast address?", ["Network: 192.55.12.0, Broadcast: 192.55.12.15", "Network: 192.55.12.4, Broadcast: 192.55.12.255", "Network: 192.55.12.0, Broadcast: 192.55.12.255", "Network: 192.55.0.0, Broadcast: 192.55.255.255"], "Network: 192.55.12.0, Broadcast: 192.55.12.15", "The /28 mask leaves 4 host bits (block size 16). The first subnet is .0 to .15. So Network is .0, Broadcast is .15."),
Q("UE", "HARD", "In subnet calculations, what does 'borrowed bits' refer to?", ["Bits stolen by hackers", "Host bits converted to network bits to create subnets", "Network bits converted to host bits", "Bits used for error correction"], "Host bits converted to network bits to create subnets", "Subnetting works by 'borrowing' bits from the host portion of the default mask and using them to define smaller sub-networks."),
Q("UE", "HARD", "Which statement about Tree Topology is false?", ["It is a variation of Star Topology", "It allows isolation of networks", "If a leaf node fails, the whole network crashes", "Error detection is relatively easy"], "If a leaf node fails, the whole network crashes", "In a tree topology, the failure of a leaf node (end device) does not crash the network, only the failure of the backbone or central hub does."),
Q("UE", "HARD", "What is the primary purpose of 'Classful Addressing' in IPv4?", ["To make IP addresses harder to guess", "To divide the IP address space into predetermined fixed-size blocks (Classes A, B, C)", "To replace MAC addresses", "To assign IPv6 addresses"], "To divide the IP address space into predetermined fixed-size blocks (Classes A, B, C)", "Classful addressing historically divided the IP space into Classes A, B, and C with fixed default subnet masks, though it led to IP wastage."),
Q("UE", "HARD", "If a network requires 60 usable hosts, what is the most efficient subnet mask to use?", ["255.255.255.0", "255.255.255.192", "255.255.255.224", "255.255.255.240"], "255.255.255.192", "255.255.255.192 gives a /26 mask, leaving 6 bits for hosts. 2^6 - 2 = 62 usable hosts. This is the smallest subnet that fits 60 hosts.")
];

async function insertPart2() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const existingTexts = new Set();
        const existing = await db.collection('questions')
            .find({ subjectId: SID }, { projection: { questionText: 1, category: 1 } })
            .toArray();
        existing.forEach(q => existingTexts.add(`${q.category}|${q.questionText.substring(0, 50)}`));

        const toInsert = questions_part2.filter(q => {
            const key = `${q.category}|${q.questionText.substring(0, 50)}`;
            if (existingTexts.has(key)) return false;
            return true;
        });

        if (toInsert.length > 0) {
            const result = await db.collection('questions').insertMany(toInsert);
            console.log(`Inserted ${result.insertedCount} questions from part 2.`);
        } else {
            console.log("No new questions in part 2.");
        }
    } finally {
        await client.close();
    }
}
insertPart2().catch(console.error);
