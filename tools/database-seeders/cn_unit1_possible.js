const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const SID = "6a5d16dbf29e866583f45d27";

const Q = (cat, lvl, q, opts, ans, exp) => ({
    subjectId: SID, category: cat, difficultyLevel: lvl,
    questionText: q, options: opts, correctAnswer: ans, explanation: exp,
    _class: "com.school.model.Question"
});

const possible_unit1 = [
Q("POSSIBLE QNS", "EASY", "Which type of computer network is typically established using Bluetooth?", ["LAN", "MAN", "WAN", "PAN"], "PAN", "Bluetooth is a short-range wireless technology often used to create a Personal Area Network (PAN)."),
Q("POSSIBLE QNS", "EASY", "What is the primary function of a network topology?", ["To provide antivirus protection", "To define the physical and logical arrangement of nodes", "To assign IP addresses to devices", "To convert domain names"], "To define the physical and logical arrangement of nodes", "A network topology describes how the devices (nodes) and cables in a network are arranged."),
Q("POSSIBLE QNS", "MEDIUM", "What is 'Attenuation' in the context of computer networks?", ["A routing protocol", "The loss of signal strength over distance", "A type of network switch", "An encryption method"], "The loss of signal strength over distance", "Attenuation is the loss of signal strength. Repeaters are used to regenerate signals to overcome this."),
Q("POSSIBLE QNS", "MEDIUM", "Which device is classified as a multi-port repeater?", ["Switch", "Bridge", "Hub", "Router"], "Hub", "A hub acts as a multi-port repeater. It broadcasts data packets to all ports without filtering."),
Q("POSSIBLE QNS", "HARD", "How does 'Delayed token release' work in a Ring Topology?", ["The token is released just after transmitting data", "The token is released after the acknowledgment is received from the receiver", "The token is never released", "The token is released randomly"], "The token is released after the acknowledgment is received from the receiver", "In Delayed token release, the transmitting station waits for the acknowledgment before releasing the token."),
Q("POSSIBLE QNS", "EASY", "Which device converts protocols between two different networking models?", ["Gateway", "Bridge", "Repeater", "Hub"], "Gateway", "A gateway acts as a protocol converter between networks using different networking models."),
Q("POSSIBLE QNS", "EASY", "What is an offline network inside a home commonly called?", ["Home network", "Wide network", "Public network", "Cloud network"], "Home network", "An offline network inside a home connecting printers and PCs without internet is called a home network."),
Q("POSSIBLE QNS", "MEDIUM", "Why do we use the formula 2^n - 2 to calculate the number of hosts?", ["To subtract the router and the switch", "To subtract the network address and the broadcast address", "To account for parity bits", "It is just a mathematical constant"], "To subtract the network address and the broadcast address", "The first IP (all 0s) is reserved for the network address, and the last IP (all 1s) is reserved for the broadcast address."),
Q("POSSIBLE QNS", "MEDIUM", "Which of the following describes 'Source Routing Bridges'?", ["Stations are unaware of the bridge", "The bridge translates IPv4 to IPv6", "The source station performs the routing operation using discovery frames", "The bridge acts as a wireless access point"], "The source station performs the routing operation using discovery frames", "In source routing, the host discovers the route by sending a special discovery frame that spreads through all paths."),
Q("POSSIBLE QNS", "HARD", "What is the main drawback of a Bus Topology?", ["High cost of cables", "Difficult troubleshooting and signal interference", "It requires a central hub", "It can only connect two devices"], "Difficult troubleshooting and signal interference", "Bus topology shares a single backbone, making troubleshooting hard, and simultaneous transmissions cause collisions."),
Q("POSSIBLE QNS", "EASY", "Which type of network provides the highest security since it's restricted to a small local area?", ["WAN", "MAN", "LAN", "Mobile Broadband"], "LAN", "Local Area Networks (LAN) generally provide higher security because they are restricted to a small area and not broadly exposed."),
Q("POSSIBLE QNS", "EASY", "Which device is a 2-port device used at the data link layer?", ["Hub", "Repeater", "Bridge", "Switch"], "Bridge", "A bridge is a 2-port Layer 2 device used for interconnecting LANs and filtering traffic."),
Q("POSSIBLE QNS", "MEDIUM", "What is a 'Passive Hub'?", ["A hub with remote management", "A hub that cleans and boosts signals", "A hub that collects wiring and relays signals without boosting them", "A hub that routes IP packets"], "A hub that collects wiring and relays signals without boosting them", "A passive hub is simply a wiring center that passes the signal along without amplifying it."),
Q("POSSIBLE QNS", "MEDIUM", "What does CSMA stand for in networking?", ["Computer System Media Access", "Carrier Sense Multiple Access", "Central Switching Mechanism Agent", "Collision System Memory Access"], "Carrier Sense Multiple Access", "CSMA is a media access control used in bus topologies to maintain data integrity and avoid packet loss."),
Q("POSSIBLE QNS", "HARD", "Given the IP address 172.16.254.1, what represents the default network address if it's a Class B network?", ["172.16.254.0", "172.16.0.0", "172.0.0.0", "172.16.254.1"], "172.16.0.0", "For a default Class B network (Subnet Mask 255.255.0.0), the first two octets represent the network address."),
Q("POSSIBLE QNS", "EASY", "Which topology involves connecting exactly two neighboring devices to form a continuous circle?", ["Bus Topology", "Star Topology", "Ring Topology", "Mesh Topology"], "Ring Topology", "In a Ring Topology, each device is connected to exactly two other devices, forming a ring."),
Q("POSSIBLE QNS", "EASY", "Which network type connects 44 bank offices located across a country?", ["LAN", "PAN", "WAN", "Body Area Network"], "WAN", "A network connecting offices across a wide geographic area like a country is a Wide Area Network (WAN)."),
Q("POSSIBLE QNS", "MEDIUM", "What happens to the collision domain when you use a switch instead of a hub?", ["It remains the same", "It is divided, improving efficiency", "It increases, causing more collisions", "It disappears entirely"], "It is divided, improving efficiency", "A switch divides the collision domain for each connected host, unlike a hub where the entire network shares one collision domain."),
Q("POSSIBLE QNS", "MEDIUM", "Which device is installed inside a computer to enable it to connect to a network?", ["Router", "NIC (Network Interface Card)", "Switch", "Repeater"], "NIC (Network Interface Card)", "A NIC is a hardware component installed in a computer that allows it to connect to a network using a physical cable or wirelessly."),
Q("POSSIBLE QNS", "HARD", "What does a subnet mask of 255.255.255.252 (/30) indicate?", ["It is a default Class C network", "It provides 2 usable host IP addresses, often used for point-to-point links", "It is an invalid mask", "It provides 254 usable hosts"], "It provides 2 usable host IP addresses, often used for point-to-point links", "A /30 mask leaves 2 bits for hosts (2^2 = 4 total IPs). Subtracting 2 gives exactly 2 usable hosts, ideal for connecting two routers directly.")
];

async function insertUnit1Possible() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const existingTexts = new Set();
        const existing = await db.collection('questions')
            .find({ subjectId: SID }, { projection: { questionText: 1, category: 1 } })
            .toArray();
        existing.forEach(q => existingTexts.add(`${q.category}|${q.questionText.substring(0, 50)}`));

        const toInsert = possible_unit1.filter(q => {
            const key = `${q.category}|${q.questionText.substring(0, 50)}`;
            if (existingTexts.has(key)) return false;
            return true;
        });

        if (toInsert.length > 0) {
            const res = await db.collection('questions').insertMany(toInsert);
            console.log(`Inserted ${res.insertedCount} POSSIBLE QNS for Unit 1.`);
        } else {
            console.log("No new POSSIBLE QNS for Unit 1 to insert.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
insertUnit1Possible();
