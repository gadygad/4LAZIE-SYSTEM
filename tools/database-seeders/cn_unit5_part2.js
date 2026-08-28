const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const SID = "6a5d16dbf29e866583f45d27";

const Q = (cat, lvl, q, opts, ans, exp) => ({
    subjectId: SID, category: cat, difficultyLevel: lvl,
    questionText: q, options: opts, correctAnswer: ans, explanation: exp,
    _class: "com.school.model.Question"
});

const unit5_extra = [
// ╔══════════════════════════════════╗
// ║           QUIZ (6 Qns)           ║
// ╚══════════════════════════════════╝
Q("QUIZ", "EASY", "What is one major advantage of using a Network Switch?", ["It provides electrical power to the entire house", "It increases the bandwidth of the network by preventing traffic overloading", "It translates IP addresses to domain names", "It only allows wireless connections"], "It increases the bandwidth of the network by preventing traffic overloading", "By segmenting the network into smaller subnets and providing dedicated bandwidth, a switch drastically increases overall network performance."),
Q("QUIZ", "MEDIUM", "What is meant by 'Collision Domain' in the context of a switch?", ["A domain where hackers attack", "A segment where the switch creates a separate collision domain for each physical connection, reducing frame collisions", "A physical area where cables overlap", "A domain reserved for routers"], "A segment where the switch creates a separate collision domain for each physical connection, reducing frame collisions", "Unlike hubs which place all devices in a single collision domain, switches isolate each port so collisions are extremely rare."),
Q("QUIZ", "MEDIUM", "Which device uses 'Data Frames' instead of 'Data Packets'?", ["Network Switch", "Router", "Gateway", "Firewall"], "Network Switch", "Switches operate at Layer 2 and handle Data Frames. Routers operate at Layer 3 and handle Data Packets."),
Q("QUIZ", "HARD", "How do 'LAN Switches' attempt to avoid overlapping of data packets?", ["By dropping packets randomly", "By allocating bandwidth to specific ports in a controlled manner", "By encrypting the data", "By changing MAC addresses"], "By allocating bandwidth to specific ports in a controlled manner", "LAN (Data) switches assign and manage bandwidth on a per-port basis to ensure packets don't overlap and collide."),
Q("QUIZ", "HARD", "In the Network Lab section, what does 'RIP' stand for?", ["Routing Information Protocol", "Remote Internet Provider", "Routing Interface Process", "Rest In Packets"], "Routing Information Protocol", "RIP is a classic distance-vector routing protocol used in local and wide-area networks."),
Q("QUIZ", "HARD", "Why are hubs unable to prevent communication collisions?", ["They are too fast", "They lack the intelligence to read MAC addresses and simply broadcast all incoming signals to every port simultaneously", "They only use fiber optics", "They use IP addresses"], "They lack the intelligence to read MAC addresses and simply broadcast all incoming signals to every port simultaneously", "A hub physically connects lines together at Layer 1; it has no concept of frames, addresses, or flow control."),

// ╔══════════════════════════════════╗
// ║         EXERCISE (6 Qns)         ║
// ╚══════════════════════════════════╝
Q("EXERCISE", "EASY", "Which type of switch combines two logical switches into a single switch via a backplane?", ["Modular Switch", "Smart Switch", "Stackable Switch", "Unmanaged Switch"], "Stackable Switch", "Stackable switches are physically cabled together via a high-speed backplane to act as one single manageable unit."),
Q("EXERCISE", "MEDIUM", "What defines a 'Smart Switch'?", ["It has AI capabilities", "It has some extra controls over data transmissions but has limitations compared to fully managed switches", "It is completely unmanaged", "It is used inside virtual machines"], "It has some extra controls over data transmissions but has limitations compared to fully managed switches", "Smart switches offer an affordable middle ground between unmanaged and fully managed enterprise switches."),
Q("EXERCISE", "MEDIUM", "Which type of switch relies entirely on the 'plug and play' method?", ["Managed Switch", "Virtual Switch", "Unmanaged Switch", "Routing Switch"], "Unmanaged Switch", "Unmanaged switches are ready to use immediately upon plugging in devices, requiring no configuration whatsoever."),
Q("EXERCISE", "HARD", "Why might a Network Switch be considered 'more expensive' as a disadvantage?", ["Because it uses more electricity", "Because it contains complex processors and memory to maintain MAC tables and perform error checking", "Because it only uses fiber optics", "Because it requires monthly licensing"], "Because it contains complex processors and memory to maintain MAC tables and perform error checking", "The internal hardware required to perform intelligent Layer 2 switching is significantly more costly than the simple circuitry of a Layer 1 hub."),
Q("EXERCISE", "HARD", "How does a switch handle a frame destined for a MAC address it has not yet learned?", ["It deletes the frame", "It routes it to the internet", "It floods the frame out of all ports (except the receiving port) like a hub", "It sends an error message"], "It floods the frame out of all ports (except the receiving port) like a hub", "If the destination MAC is unknown, the switch broadcasts it. When the target replies, the switch records the MAC to its table for future use."),
Q("EXERCISE", "HARD", "In comparison to a router, why does a switch only work in a wired network connection (historically)?", ["Because wireless signals cannot carry MAC addresses", "Because standard Ethernet switches are designed to physically segment copper/fiber LANs, whereas routers often integrate wireless access points", "Because wireless is too fast for switches", "Because switches don't use electricity"], "Because standard Ethernet switches are designed to physically segment copper/fiber LANs, whereas routers often integrate wireless access points", "A pure Layer 2 network switch is a physical device meant for terminating physical cables. Wi-Fi bridging is usually handled by Access Points or Wireless Routers."),

// ╔══════════════════════════════════╗
// ║          CAT 1 (6 Qns)           ║
// ╚══════════════════════════════════╝
Q("CAT 1", "EASY", "Which network device operates at Layer 3 of the OSI Model?", ["Hub", "Unmanaged Switch", "Router", "PoE Switch"], "Router", "Routers operate at the Network Layer (Layer 3) and use IP addresses to move data between different networks."),
Q("CAT 1", "MEDIUM", "What feature allows network switches to automatically remove time-consuming manual settings?", ["Auto-negotiation and automatic link connections", "AI encryption", "Manual port forwarding", "MAC cloning"], "Auto-negotiation and automatic link connections", "Switches automatically negotiate speed and duplex settings with connected devices, providing easy and instant network access."),
Q("CAT 1", "MEDIUM", "Which of the following is true about Full Duplex mode in switches?", ["It only allows sending data", "It allows continuous data transmission and reception simultaneously, improving connectivity", "It causes massive collisions", "It splits the bandwidth in half"], "It allows continuous data transmission and reception simultaneously, improving connectivity", "Full-duplex means data can travel in both directions at the same time on a single cable without colliding."),
Q("CAT 1", "HARD", "What does a 'Routing Switch' do?", ["It only acts as a hub", "It is a Layer 3 switch that connects LANs and performs routing functions normally done by a router", "It routes analog telephone calls", "It operates at Layer 1"], "It is a Layer 3 switch that connects LANs and performs routing functions normally done by a router", "A routing switch has the hardware of a switch but includes software to handle IP routing between subnets internally."),
Q("CAT 1", "HARD", "What does it mean that a switch 'cannot stop traffic destined for a different LAN segment from traveling to all other LAN segments'?", ["It means switches route IPs", "It means that Broadcast frames (like ARP requests) cannot be stopped by a switch and will flood all ports in the broadcast domain", "It means switches are useless", "It means switches drop all packets"], "It means that Broadcast frames (like ARP requests) cannot be stopped by a switch and will flood all ports in the broadcast domain", "While switches stop collisions, they do not stop broadcasts. A router is required to divide a broadcast domain."),
Q("CAT 1", "HARD", "In the Network Lab section, what is the purpose of 'SERVER CONFIGURATION'?", ["To physically build a computer", "To set up and manage network services like DHCP, DNS, or File Sharing on a central machine", "To install a switch", "To cut cables"], "To set up and manage network services like DHCP, DNS, or File Sharing on a central machine", "Server configuration involves preparing a machine to handle and distribute services across the LAN segment."),

// ╔══════════════════════════════════╗
// ║          CAT 2 (6 Qns)           ║
// ╚══════════════════════════════════╝
Q("CAT 2", "EASY", "Which device is a physical device of Layer 1 of the OSI Model?", ["Network Switch", "Router", "Hub", "Gateway"], "Hub", "A Hub operates purely at the physical layer, dealing only with raw electrical signals."),
Q("CAT 2", "MEDIUM", "What does 'PoE' stand for in PoE Switches?", ["Port over Ethernet", "Power over Ethernet", "Point of Entry", "Protocol over Ethernet"], "Power over Ethernet", "Power over Ethernet allows a switch to deliver electrical power to connected devices (like cameras or phones) over the standard Ethernet data cable."),
Q("CAT 2", "MEDIUM", "Which device connects all nodes of a network but experiences frequent communication collisions?", ["Hub", "Switch", "Router", "Firewall"], "Hub", "Because a hub broadcasts everything to all ports, if two devices send data simultaneously, a collision occurs."),
Q("CAT 2", "HARD", "How are 'Virtual Switches' implemented?", ["They are made of clear plastic", "They are software constructs inside Virtual Machine hosting environments that act exactly like physical switches for the VMs", "They are wireless only", "They run on battery power"], "They are software constructs inside Virtual Machine hosting environments that act exactly like physical switches for the VMs", "Hypervisors (like VMware or Hyper-V) use virtual switches to network virtual machines together internally."),
Q("CAT 2", "HARD", "Why are Managed Switches typically used in large networks?", ["They are cheaper", "They provide precise control, better security, and support for complex architectures via protocols like SNMP", "They do not use MAC addresses", "They only support 2 ports"], "They provide precise control, better security, and support for complex architectures via protocols like SNMP", "Large enterprise networks require VLANs, QoS, port mirroring, and strict security—all of which require a managed switch interface."),
Q("CAT 2", "HARD", "What is the primary distinction between 'LAN Configuration' and 'Topology' in a network lab?", ["They are the same thing", "Topology is the physical/logical layout of the network, while LAN configuration is the software/IP setup of the devices", "Topology is software, LAN is hardware", "Topology uses routers, LAN uses hubs"], "Topology is the physical/logical layout of the network, while LAN configuration is the software/IP setup of the devices", "Topology describes the map (Star, Ring, Mesh), whereas configuration involves the actual settings (IP addresses, subnet masks, gateways)."),

// ╔══════════════════════════════════╗
// ║            UE (6 Qns)            ║
// ╚══════════════════════════════════╝
Q("UE", "EASY", "What does a switch do to prevent traffic overloading?", ["It deletes all emails", "It segments the network into smaller subnets (collision domains)", "It limits internet speed to 1 Mbps", "It blocks all unknown IPs"], "It segments the network into smaller subnets (collision domains)", "By giving each port its own collision domain, a switch drastically reduces network congestion."),
Q("UE", "MEDIUM", "What is a 'Modular Switch'?", ["A switch that cannot be modified", "A switch that helps accommodate two or more expansion cards, providing better flexibility for future upgrades", "A switch that only handles Wi-Fi", "A switch built into a wall"], "A switch that helps accommodate two or more expansion cards, providing better flexibility for future upgrades", "Modular switches are chassis-based, allowing you to slide in new line cards (e.g., adding fiber ports) as your network grows."),
Q("UE", "MEDIUM", "What is the difference in how resources are shared between a Switch and a Router?", ["Switches move data between different networks; Routers share resources on a single LAN", "Switches share resources among multiple devices on a single LAN; Routers move data between two or more different networks", "There is no difference", "Switches only use Wi-Fi"], "Switches share resources among multiple devices on a single LAN; Routers move data between two or more different networks", "A switch builds a local network. A router connects that local network to other networks (like the Internet)."),
Q("UE", "HARD", "What specific technique do switches use to transfer data packets from source to destination?", ["Circuit Switching", "Packet Switching techniques (specifically frame switching)", "Message Switching", "Analog Switching"], "Packet Switching techniques (specifically frame switching)", "Switches utilize packet switching concepts to receive a digital frame, store it in memory, inspect the MAC, and forward it."),
Q("UE", "HARD", "What happens in a switch when it operates in 'Full Duplex' mode?", ["Data travels in one direction at a time", "Data can be transmitted and received simultaneously on the same port, effectively eliminating collisions", "The switch duplicates every packet", "The switch divides the bandwidth in half"], "Data can be transmitted and received simultaneously on the same port, effectively eliminating collisions", "Full-duplex allows the transmit (TX) and receive (RX) wires to be used simultaneously, doubling potential throughput."),
Q("UE", "HARD", "Why are switches preferred over hubs for home networks that stream video regularly?", ["Hubs are illegal", "Switches use MAC addresses to deliver messages only to the required destination, providing dedicated bandwidth for heavy streaming", "Hubs encrypt video", "Switches use less electricity"], "Switches use MAC addresses to deliver messages only to the required destination, providing dedicated bandwidth for heavy streaming", "Video streaming requires high, uninterrupted bandwidth. A switch prevents other network traffic from colliding with and disrupting the video stream."),

// ╔══════════════════════════════════╗
// ║       POSSIBLE QNS (6 Qns)       ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS", "EASY", "Which device uses MAC addresses for transferring data to the proper destination?", ["Router", "Network Switch", "Hub", "Modem"], "Network Switch", "Switches use MAC addresses to direct frames precisely. Hubs broadcast, and Routers use IPs."),
Q("POSSIBLE QNS", "MEDIUM", "What is one major advantage of a Managed Switch over a Smart Switch?", ["Managed switches are cheaper", "Managed switches offer full SNMP support and complete control over complex architectures, whereas smart switches have limitations", "Smart switches do not have ports", "Managed switches are unmanaged"], "Managed switches offer full SNMP support and complete control over complex architectures, whereas smart switches have limitations", "Managed switches provide the deepest level of control, command-line interfaces, and full enterprise protocol support."),
Q("POSSIBLE QNS", "MEDIUM", "How does a switch process data when it arrives at a port?", ["It forwards it immediately without reading", "It reads the header, finds the destination MAC address, performs checks, and sends it out the appropriate port", "It translates it to an IP address", "It drops it by default"], "It reads the header, finds the destination MAC address, performs checks, and sends it out the appropriate port", "The switch acts intelligently, ensuring the frame is valid and then mapping the MAC to its internal address table to find the correct exit port."),
Q("POSSIBLE QNS", "HARD", "What is the primary characteristic of 'Multicast' transmission on a switch?", ["One-to-one communication", "One-to-many communication to a specific group of devices", "One-to-all communication", "Many-to-one communication"], "One-to-many communication to a specific group of devices", "Multicasting sends a single frame to a switch, which then replicates it only to the specific ports that have subscribed to that multicast group."),
Q("POSSIBLE QNS", "HARD", "Why is a Hub referred to as a 'Layer 1' device?", ["Because it uses IP addresses", "Because it uses MAC addresses", "Because it only deals with raw electrical signals and physical cables, without any logical data management", "Because it is the most advanced device"], "Because it only deals with raw electrical signals and physical cables, without any logical data management", "A hub doesn't understand frames or packets; it simply regenerates electrical voltage on the wire."),
Q("POSSIBLE QNS", "HARD", "In the context of the Network Lab, what does a 'RIP' routing protocol configuration achieve?", ["It physically connects cables", "It allows routers to dynamically learn and share network paths using distance-vector algorithms", "It tests the RAM of a server", "It encrypts Wi-Fi passwords"], "It allows routers to dynamically learn and share network paths using distance-vector algorithms", "Routing Information Protocol (RIP) is configured in labs to teach how routers automatically discover routes to distant subnets.")
];

async function insertUnit5Extra() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const existingTexts = new Set();
        const existing = await db.collection('questions')
            .find({ subjectId: SID }, { projection: { questionText: 1, category: 1 } })
            .toArray();
        existing.forEach(q => existingTexts.add(`${q.category}|${q.questionText.substring(0, 50)}`));

        const toInsert = unit5_extra.filter(q => {
            const key = `${q.category}|${q.questionText.substring(0, 50)}`;
            if (existingTexts.has(key)) return false;
            return true;
        });

        if (toInsert.length > 0) {
            const res = await db.collection('questions').insertMany(toInsert);
            console.log(`Inserted ${res.insertedCount} extra questions for Unit 5.`);
        } else {
            console.log("No new extra questions for Unit 5 to insert.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
insertUnit5Extra();
