const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const SID = "6a5d16dbf29e866583f45d27";

const Q = (cat, lvl, q, opts, ans, exp) => ({
    subjectId: SID, category: cat, difficultyLevel: lvl,
    questionText: q, options: opts, correctAnswer: ans, explanation: exp,
    _class: "com.school.model.Question"
});

const unit4_extra2 = [
Q("QUIZ", "EASY", "What is the primary function of a Router?", ["To provide power to computers", "To receive, analyze, and forward data packets between computer networks", "To display graphics on a screen", "To store local files"], "To receive, analyze, and forward data packets between computer networks", "Routers route data traffic across different networks, ensuring packets reach their correct destinations."),
Q("QUIZ", "MEDIUM", "What defines an 'Edge Router'?", ["It only works on the edge of a desk", "It is located at the boundary of a network, usually connecting it to an Internet Service Provider (ISP)", "It routes traffic between core routers only", "It provides physical security to the server room"], "It is located at the boundary of a network, usually connecting it to an Internet Service Provider (ISP)", "Edge routers act as gateways between the local network and the external internet."),
Q("EXERCISE", "EASY", "How does a router provide 'Security'?", ["By hiding the computer monitor", "By utilizing firewalls, NAT, and access controls to protect the network from unauthorized access and malware", "By encrypting all MAC addresses", "By turning off the internet at night"], "By utilizing firewalls, NAT, and access controls to protect the network from unauthorized access and malware", "Routers sit between the internet and the local network, blocking malicious traffic before it reaches internal devices."),
Q("EXERCISE", "MEDIUM", "What is one common disadvantage of using a router?", ["They are very cheap and break easily", "They can slow down connections because they must analyze multiple layers of information (Physical to Network layer)", "They only support wired connections", "They do not support IPv4"], "They can slow down connections because they must analyze multiple layers of information (Physical to Network layer)", "The deep packet inspection required for routing inherently adds processing delay compared to simple switching."),
Q("CAT 1", "EASY", "Which router feature manages bandwidth by controlling data flow to prevent network congestion?", ["Bandwidth Management", "MAC Cloning", "Port Forwarding", "Virtual Routing"], "Bandwidth Management", "Bandwidth management ensures that critical traffic is prioritized and the network does not become overwhelmed."),
Q("CAT 1", "MEDIUM", "What does 'Decapsulation' mean at a router's input port?", ["Wrapping a packet in a new frame", "Stripping off the physical/link-layer frame to expose the IP packet inside", "Encrypting the packet", "Sending the packet to the output port"], "Stripping off the physical/link-layer frame to expose the IP packet inside", "When a frame arrives, the router decapsulates it to read the Layer 3 IP address needed for the routing decision."),
Q("CAT 2", "EASY", "Which type of router is implemented using software on a virtual machine?", ["Core Router", "Virtual Router", "Wired Router", "Broadband Router"], "Virtual Router", "Virtual routers are software-based appliances that replicate the functions of hardware routers, providing high flexibility."),
Q("CAT 2", "HARD", "How does 'DDoS' threaten router security?", ["It deletes the router's firmware", "Attackers flood the network infrastructure with traffic, potentially overloading the router and causing outages", "It steals admin passwords", "It changes the MAC address"], "Attackers flood the network infrastructure with traffic, potentially overloading the router and causing outages", "Distributed Denial of Service attacks overwhelm a router's processing capability or bandwidth, taking the network offline."),
Q("UE", "EASY", "What is the primary characteristic of an 'OUI' in a MAC address?", ["It identifies the specific IP address", "It consists of the first 6 hex digits and uniquely identifies the hardware manufacturer", "It is randomly generated", "It changes when the device reboots"], "It consists of the first 6 hex digits and uniquely identifies the hardware manufacturer", "The Organizational Unique Identifier is assigned to vendors so their hardware can be globally identified."),
Q("UE", "MEDIUM", "What is 'MAC spoofing'?", ["Cleaning the network card", "Using software to mask or alter a device's broadcasted MAC address, often to bypass network access controls", "Assigning an IP address to a MAC address", "A hardware failure"], "Using software to mask or alter a device's broadcasted MAC address, often to bypass network access controls", "While the physical MAC is burned in, operating systems can broadcast a fake MAC, which attackers use to bypass MAC filtering."),
Q("UE", "HARD", "Which of the following is true about 'Static Routing Tables'?", ["They update automatically when a cable breaks", "They are configured manually by administrators and do not change automatically based on network activity", "They are used exclusively by Core Routers", "They require no configuration"], "They are configured manually by administrators and do not change automatically based on network activity", "Static routing requires manual setup, making it highly secure but inflexible to network topology changes."),
Q("POSSIBLE QNS", "EASY", "Which of the following devices is known as a Layer 3 device?", ["Hub", "Switch", "Router", "Repeater"], "Router", "Routers operate at Layer 3 (Network Layer) of the OSI model, making decisions based on IP addresses."),
Q("POSSIBLE QNS", "MEDIUM", "What does 'Packet Filtering' do on a router?", ["It compresses large files", "It applies a collection of rules to either allow or block packets from passing through the network", "It speeds up the internet connection", "It translates IP to MAC"], "It applies a collection of rules to either allow or block packets from passing through the network", "Packet filtering acts as a basic firewall, inspecting packet headers against security rules."),
Q("POSSIBLE QNS", "HARD", "What is 'NAT Usage' on a router?", ["It maps multiple public IPs to one private IP", "It uses Network Address Translation (NAT) to map multiple private IP addresses into one public IP address for internet access", "It translates MAC addresses to IP addresses", "It connects virtual routers"], "It uses Network Address Translation (NAT) to map multiple private IP addresses into one public IP address for internet access", "NAT allows an entire private local network to share a single, globally routable public IP address."),
Q("QUIZ", "MEDIUM", "What happens if a user leaves the default administration credentials (e.g., admin/admin) on a newly installed router?", ["The router functions faster", "Attackers can easily guess them and remotely take over the router", "The router will automatically update its firmware", "The router restricts all Wi-Fi access"], "Attackers can easily guess them and remotely take over the router", "Default credentials are well-known to hackers and automated botnets, making them a massive security risk if left unchanged."),
Q("EXERCISE", "HARD", "What is the primary function of the 'BGP' (Border Gateway Protocol)?", ["To route packets within a single local network", "To facilitate information sharing between edge routers to control packet routing and maintain network stability across the internet", "To assign MAC addresses", "To check cable continuity"], "To facilitate information sharing between edge routers to control packet routing and maintain network stability across the internet", "BGP is the routing protocol of the internet, exchanging reachability information between massive autonomous systems."),
Q("CAT 1", "HARD", "What is the main role of 'Firmware' in a router?", ["It acts as a physical firewall", "It is the software that assists the hardware's operation and requires frequent updates to patch security vulnerabilities", "It generates MAC addresses", "It translates Domain Names to IPs"], "It is the software that assists the hardware's operation and requires frequent updates to patch security vulnerabilities", "Router firmware is the operating system of the router. Exploiting outdated firmware is a common method for attackers to compromise routers.")
];

async function insertUnit4Extra2() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const existingTexts = new Set();
        const existing = await db.collection('questions')
            .find({ subjectId: SID }, { projection: { questionText: 1, category: 1 } })
            .toArray();
        existing.forEach(q => existingTexts.add(`${q.category}|${q.questionText.substring(0, 50)}`));

        const toInsert = unit4_extra2.filter(q => {
            const key = `${q.category}|${q.questionText.substring(0, 50)}`;
            if (existingTexts.has(key)) return false;
            return true;
        });

        if (toInsert.length > 0) {
            const res = await db.collection('questions').insertMany(toInsert);
            console.log(`Inserted ${res.insertedCount} extra2 questions for Unit 4.`);
        } else {
            console.log("No new extra2 questions for Unit 4 to insert.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
insertUnit4Extra2();
