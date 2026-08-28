const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const SID = "6a5d16dbf29e866583f45d27";

const Q = (cat, lvl, q, opts, ans, exp) => ({
    subjectId: SID, category: cat, difficultyLevel: lvl,
    questionText: q, options: opts, correctAnswer: ans, explanation: exp,
    _class: "com.school.model.Question"
});

const questions_part1 = [
// ╔══════════════════════════════════╗
// ║          QUIZ (20 Qns)           ║
// ╚══════════════════════════════════╝
Q("QUIZ", "EASY", "What is a Computer Network?", ["A single computer without internet", "A practice of connecting computers together to enable communication", "A software for typing documents", "A physical cable"], "A practice of connecting computers together to enable communication", "Computer Networking is the practice of connecting computers together to enable communication and data exchange between them."),
Q("QUIZ", "EASY", "Which type of network covers a small area such as a building or an office?", ["WAN", "MAN", "LAN", "PAN"], "LAN", "Local Area Network (LAN) connects computers in a small area like an office or a building."),
Q("QUIZ", "EASY", "Which type of network is used to connect computer devices of personal use within 10 meters?", ["WAN", "MAN", "LAN", "PAN"], "PAN", "Personal Area Network (PAN) is arranged within an individual person, typically within 10 meters."),
Q("QUIZ", "EASY", "Who was the first research scientist to bring the idea of the Personal Area Network?", ["Thomas Zimmerman", "Alan Turing", "Charles Babbage", "Tim Berners-Lee"], "Thomas Zimmerman", "Thomas Zimmerman brought the idea of PAN, which covers an area of about 30 feet."),
Q("QUIZ", "EASY", "A network that connects cities and private industries over a larger geographic area is called:", ["LAN", "MAN", "PAN", "Offline Network"], "MAN", "Metropolitan Area Network (MAN) covers a larger geographic area by interconnecting different LANs."),
Q("QUIZ", "EASY", "The Internet is considered as the biggest example of which type of network?", ["LAN", "MAN", "WAN", "PAN"], "WAN", "A Wide Area Network (WAN) extends over a large geographical area like countries. The internet is the biggest WAN in the world."),
Q("QUIZ", "EASY", "What is an offline network usually referred to when created inside a home?", ["WAN", "Home Network", "Global Business Network", "Mobile Broadband"], "Home Network", "An offline network inside a home is called a home network. It integrates devices like printers without an internet connection."),
Q("QUIZ", "EASY", "Which network topology connects every device to every other device via dedicated channels?", ["Star Topology", "Bus Topology", "Mesh Topology", "Ring Topology"], "Mesh Topology", "In a mesh topology, every device is connected to another device via a particular dedicated channel."),
Q("QUIZ", "EASY", "Which network topology uses a single cable known as a backbone?", ["Bus Topology", "Star Topology", "Ring Topology", "Mesh Topology"], "Bus Topology", "The bus topology is designed such that all stations are connected through a single cable known as a backbone."),
Q("QUIZ", "EASY", "In which topology are all devices connected to a single central hub?", ["Star Topology", "Ring Topology", "Bus Topology", "Tree Topology"], "Star Topology", "In Star Topology, all devices are connected to a single central hub, which acts as the central node."),
Q("QUIZ", "MEDIUM", "What is the most common access method used in Bus Topology?", ["Token Passing", "CSMA", "DHCP", "AHCP"], "CSMA", "The most common access method of the bus topologies is CSMA (Carrier Sense Multiple Access) to control data flow."),
Q("QUIZ", "MEDIUM", "Which device operates at the physical layer and is used to regenerate signals?", ["Router", "Bridge", "Switch", "Repeater"], "Repeater", "A repeater operates at the physical layer. Its job is to regenerate the signal before it becomes too weak."),
Q("QUIZ", "MEDIUM", "Which network device is basically a multi-port repeater without intelligence to filter data?", ["Router", "Switch", "Hub", "Gateway"], "Hub", "A hub connects multiple wires but cannot filter data; data packets are sent to all connected devices."),
Q("QUIZ", "MEDIUM", "A bridge operates at which layer of the network model?", ["Physical Layer", "Network Layer", "Data Link Layer", "Transport Layer"], "Data Link Layer", "A bridge operates at the data link layer and filters content by reading the MAC addresses of the source and destination."),
Q("QUIZ", "MEDIUM", "Which device divides the collision domain of hosts but keeps the broadcast domain the same?", ["Hub", "Repeater", "Switch", "Gateway"], "Switch", "A switch is a data link layer device that divides the collision domain but the broadcast domain remains the same."),
Q("QUIZ", "HARD", "Which subnet mask claims the first two octets for the network and leaves 16 bits for the host?", ["Class A", "Class B", "Class C", "Class D"], "Class B", "Class B subnet mask claims the first two octets for the network, leaving 16 bits for the host part."),
Q("QUIZ", "HARD", "Given the IP address 192.168.2.4 with subnet mask 255.255.255.240, what is the network address?", ["192.168.2.0", "192.168.2.4", "192.168.2.15", "192.168.2.255"], "192.168.2.0", "The last 4 bits of the subnet mask are 0. The host IP 4 falls in the range 1-14. Thus, the network address is 192.168.2.0."),
Q("QUIZ", "HARD", "What does a Brouter do?", ["Acts only as a router", "Acts only as a bridge", "Combines features of both bridge and router", "Filters only analog signals"], "Combines features of both bridge and router", "A Brouter (bridging router) can work at either the data link layer (bridge) or network layer (router)."),
Q("QUIZ", "HARD", "How many usable hosts can be connected in a network with the subnet mask 255.255.255.240?", ["14", "16", "254", "30"], "14", "The subnet mask 255.255.255.240 leaves 4 bits for hosts. 2^4 = 16 IPs. Subtracting network and broadcast addresses gives 14 usable hosts."),
Q("QUIZ", "HARD", "In Ring Topology, what is the frame that circulates around the network called?", ["Token", "Packet", "Segment", "Datagram"], "Token", "A token is a frame that circulates around the network in a Ring Topology using the token passing access method."),

// ╔══════════════════════════════════╗
// ║        EXERCISE (20 Qns)         ║
// ╚══════════════════════════════════╝
Q("EXERCISE", "EASY", "What is a Node in a computer network?", ["A cable connecting two computers", "Devices that are connected to a network like computers and printers", "A software application", "A protocol for sending emails"], "Devices that are connected to a network like computers and printers", "Nodes are devices connected to a network, including computers, servers, printers, routers, and switches."),
Q("EXERCISE", "EASY", "Which protocol translates human-readable domain names into IP addresses?", ["IP", "TCP", "DNS", "FTP"], "DNS", "The Domain Name System (DNS) translates domain names (like www.google.com) into IP addresses."),
Q("EXERCISE", "EASY", "What device is used to monitor and control incoming and outgoing network traffic?", ["Hub", "Firewall", "NIC", "Repeater"], "Firewall", "A firewall is a security device used to protect networks from unauthorized access and monitor traffic."),
Q("EXERCISE", "EASY", "Which topology is a variation of the Star topology with a hierarchical flow of data?", ["Bus Topology", "Ring Topology", "Mesh Topology", "Tree Topology"], "Tree Topology", "Tree Topology has a hierarchical flow of data and is a variation of the Star topology."),
Q("EXERCISE", "EASY", "Which topology combines various types of topologies like Ring and Star?", ["Hybrid Topology", "Bus Topology", "Mesh Topology", "Tree Topology"], "Hybrid Topology", "Hybrid Topology is the combination of various types of topologies, offering great flexibility."),
Q("EXERCISE", "EASY", "What is the primary advantage of a Mesh Topology?", ["It uses very few cables", "Communication is very fast and it is robust", "It is very cheap to install", "Configuration is very simple"], "Communication is very fast and it is robust", "In a mesh topology, dedicated channels make communication very fast, reliable, and robust."),
Q("EXERCISE", "EASY", "Which network type spans states or countries?", ["PAN", "LAN", "MAN", "WAN"], "WAN", "A Wide Area Network (WAN) extends over a large geographical area, such as states or countries."),
Q("EXERCISE", "EASY", "What does NIC stand for?", ["Network Internet Connection", "Network Interface Card", "Node Integration Controller", "New Internet Cable"], "Network Interface Card", "NIC stands for Network Interface Card, which connects a computer to a network."),
Q("EXERCISE", "EASY", "What is the default subnet mask for a Class A IP address?", ["255.255.0.0", "255.255.255.0", "255.0.0.0", "0.0.0.0"], "255.0.0.0", "Class A networks have a natural or default subnet mask of 255.0.0.0."),
Q("EXERCISE", "EASY", "What is the default subnet mask for a Class C IP address?", ["255.0.0.0", "255.255.0.0", "255.255.255.0", "255.255.255.255"], "255.255.255.0", "Class C networks have a natural or default subnet mask of 255.255.255.0."),
Q("EXERCISE", "MEDIUM", "What happens in a Bus Topology if the backbone cable fails?", ["Only one computer loses connection", "The entire network crashes", "The network speed decreases slightly", "The hub takes over"], "The entire network crashes", "In a bus topology, all stations rely on the single backbone cable. If it fails, the entire network is disrupted."),
Q("EXERCISE", "MEDIUM", "What is the difference between an Active Hub and a Passive Hub?", ["Active hubs regenerate the signal, passive hubs do not", "Passive hubs require electricity, active hubs do not", "Active hubs only connect 2 devices, passive hubs connect many", "There is no difference"], "Active hubs regenerate the signal, passive hubs do not", "Active hubs clean, boost, and relay signals. Passive hubs only collect wiring and relay signals without boosting them."),
Q("EXERCISE", "MEDIUM", "Which device works as a messenger agent to connect networks working on different networking models?", ["Switch", "Gateway", "Bridge", "Repeater"], "Gateway", "A gateway takes data from one system, interprets it, and transfers it to another system, often acting as a protocol converter."),
Q("EXERCISE", "MEDIUM", "How many octets are there in an IPv4 address?", ["2", "4", "6", "8"], "4", "A 32-bit IPv4 address is divided into four 8-bit octets."),
Q("EXERCISE", "MEDIUM", "What is a Broadcast IP?", ["The first IP in a sub-network", "The middle IP in a sub-network", "The last IP address in each sub-network", "The router's IP address"], "The last IP address in each sub-network", "The Broadcast IP is always the last IP address in each sub-network."),
Q("EXERCISE", "HARD", "If an IP address is 192.168.2.4/28, what does the '/28' represent?", ["The number of devices connected", "The number of bits used for the host", "The number of 1s in the subnet mask (CIDR notation)", "The port number"], "The number of 1s in the subnet mask (CIDR notation)", "The '/28' is CIDR notation indicating that the first 28 bits of the subnet mask are 1s."),
Q("EXERCISE", "HARD", "What is the main drawback of a Star Topology?", ["It is difficult to troubleshoot", "If the central hub fails, all connected nodes cannot communicate", "It requires token passing", "It is very slow"], "If the central hub fails, all connected nodes cannot communicate", "The central point of failure is the main drawback. If the switch/hub goes down, the whole network fails."),
Q("EXERCISE", "HARD", "In Ring Topology, what are 'Early token release' and 'Delayed token release'?", ["Techniques to turn off the network", "Token release techniques after data transmission", "Types of cables used", "Methods of encrypting data"], "Token release techniques after data transmission", "Early release drops the token just after transmission; Delayed release drops it after receiving an acknowledgment."),
Q("EXERCISE", "HARD", "Which type of bridge performs routing operations by the source station sending a discovery frame?", ["Transparent Bridge", "Source Routing Bridge", "Switching Bridge", "Multiport Bridge"], "Source Routing Bridge", "In Source Routing Bridges, the host discovers the route by sending a special discovery frame through the network."),
Q("EXERCISE", "HARD", "In subnetting, if 3 bits are borrowed from the host portion of a Class C address, how many subnets are created?", ["4", "6", "8", "16"], "8", "The formula for the number of networks is 2^n. By borrowing 3 bits, 2^3 = 8 subnets are created.")
];
module.exports = questions_part1;

async function insertPart1() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const existingTexts = new Set();
        const existing = await db.collection('questions')
            .find({ subjectId: SID }, { projection: { questionText: 1, category: 1 } })
            .toArray();
        existing.forEach(q => existingTexts.add(`${q.category}|${q.questionText.substring(0, 50)}`));

        const toInsert = questions_part1.filter(q => {
            const key = `${q.category}|${q.questionText.substring(0, 50)}`;
            if (existingTexts.has(key)) return false;
            return true;
        });

        if (toInsert.length > 0) {
            const result = await db.collection('questions').insertMany(toInsert);
            console.log(`Inserted ${result.insertedCount} questions from part 1.`);
        } else {
            console.log("No new questions in part 1.");
        }
    } finally {
        await client.close();
    }
}
insertPart1().catch(console.error);
