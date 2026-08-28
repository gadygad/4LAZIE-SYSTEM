const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const SID = "6a5d16dbf29e866583f45d27";

const Q = (cat, lvl, q, opts, ans, exp) => ({
    subjectId: SID, category: cat, difficultyLevel: lvl,
    questionText: q, options: opts, correctAnswer: ans, explanation: exp,
    _class: "com.school.model.Question"
});

const unit4_extra = [
Q("QUIZ", "EASY", "Which router component stores packets temporarily when traffic exceeds the outgoing link's capacity?", ["Input Port", "Queuing Buffer at the Output Port", "Switching Fabric", "Routing Processor"], "Queuing Buffer at the Output Port", "The queuing buffer holds packets in memory when the output port is busy, releasing them when the link is free."),
Q("QUIZ", "MEDIUM", "What is an 'Edge Router' primarily connected to?", ["A virtual machine", "An Internet Service Provider (ISP)", "A printer", "A switch in the same room"], "An Internet Service Provider (ISP)", "Edge routers are located at the boundary of a local network, serving as the gateway to the internet via an ISP."),
Q("QUIZ", "HARD", "How does 'Network overhead' cause bandwidth shortages in routers using dynamic routing?", ["The router's cooling fans consume bandwidth", "The constant exchanging of routing table updates between routers consumes a large portion of available bandwidth", "The router encrypts all data twice", "The router blocks UDP traffic"], "The constant exchanging of routing table updates between routers consumes a large portion of available bandwidth", "Dynamic routing algorithms require routers to talk to each other frequently to map the network, eating up bandwidth that could be used for user data."),
Q("EXERCISE", "EASY", "Why is it recommended not to use a modem to connect directly to the internet without a router?", ["Because modems don't have cables", "Because using a modem directly exposes your computer to several security risks; a router acts as a secure intermediary", "Because modems are too fast", "Because modems only support IPv6"], "Because using a modem directly exposes your computer to several security risks; a router acts as a secure intermediary", "Routers provide NAT and hardware firewalls, making them an essential first step in securing a network connection."),
Q("EXERCISE", "MEDIUM", "What does 'EIGRP' do if it cannot find a path to a destination in its own routing tables?", ["It drops the packet immediately", "It broadcasts a request to its neighboring routers asking for a path", "It restarts the router", "It changes the MAC address"], "It broadcasts a request to its neighboring routers asking for a path", "Enhanced IGRP dynamically requests routes from neighbor routers, which propagate the request until a valid path is found."),
Q("EXERCISE", "HARD", "What is 'MAC Address Collision'?", ["When two cables are plugged into the same port", "A rare event where two devices on a network have the same MAC address, causing network disruptions and identification issues", "When an IP address matches a MAC address", "When a router blocks a MAC address"], "A rare event where two devices on a network have the same MAC address, causing network disruptions and identification issues", "While MAC addresses should be globally unique, manufacturing errors or intentional spoofing can lead to two identical MACs on a LAN, causing severe switching errors."),
Q("CAT 1", "EASY", "What is a 'Multicast MAC address' used for?", ["To send a packet to every single device on the network", "To send a single packet to a specific group of devices at once", "To send a packet back to the sender", "To assign an IP address"], "To send a single packet to a specific group of devices at once", "Multicast MACs (where the LSB of the first octet is 1) allow efficient distribution of data to a group of interested devices without broadcasting to everyone."),
Q("CAT 1", "MEDIUM", "Why is a router considered slower than a Layer 2 switch?", ["Routers have less RAM", "Routers must analyze multiple layers of information (up to Layer 3), which requires more processing time than simple MAC address lookups", "Routers only use wireless connections", "Routers must wait for the ISP to approve each packet"], "Routers must analyze multiple layers of information (up to Layer 3), which requires more processing time than simple MAC address lookups", "Decapsulating the frame, inspecting the IP header, routing, and re-encapsulating takes significant CPU cycles compared to a switch just reading a MAC address."),
Q("CAT 1", "HARD", "In router architecture, what happens during 'Switching via Bus'?", ["The CPU manually copies every packet", "A packet is tagged with a token and placed on a shared internal bus; all output ports see it but only the targeted port accepts it", "Packets are sent over a 2N crossbar", "Packets are sent via fiber optic cables"], "A packet is tagged with a token and placed on a shared internal bus; all output ports see it but only the targeted port accepts it", "Bus switching shares a single internal pathway. The token ensures only the correct output port scrapes the packet off the bus."),
Q("CAT 2", "EASY", "What is one application of a router in the telecommunications industry?", ["To print invoices", "To connect hardware equipment like BSC, MGW, IN, and SGSN servers from remote location networks", "To scan for hardware viruses", "To create a MAC address"], "To connect hardware equipment like BSC, MGW, IN, and SGSN servers from remote location networks", "Routers are extensively used in telecom backbones to link remote switching centers securely over STM connections."),
Q("CAT 2", "MEDIUM", "What is the primary characteristic of an 'Interior Gateway Routing Protocol' (IGRP)?", ["It connects two different ISPs", "It outlines the protocol for exchanging routing data between gateways inside the same separate network (Autonomous System)", "It handles MAC addresses only", "It converts IPv4 to IPv6"], "It outlines the protocol for exchanging routing data between gateways inside the same separate network (Autonomous System)", "IGRP is used to share routing information strictly within the boundaries of a single organization's network."),
Q("CAT 2", "HARD", "How does NAT (Network Address Translation) map multiple devices?", ["It maps multiple private IP addresses into one public IP address, allowing them all to share a single internet connection", "It assigns a unique public IP to every device", "It changes their MAC addresses to match the router's", "It compresses the payload to 50%"], "It maps multiple private IP addresses into one public IP address, allowing them all to share a single internet connection", "NAT changes the source IP of outgoing packets from a private IP to the router's public IP, keeping track of the translation in a table."),
Q("UE", "EASY", "What is the function of 'Monitoring and diagnostics' on a router?", ["To monitor the physical temperature of the room", "To track network traffic, identify failures, and provide information to resolve network problems", "To monitor employee screen time", "To diagnose hard drive failures"], "To track network traffic, identify failures, and provide information to resolve network problems", "Advanced routers offer diagnostics and logging (like SNMP or Syslog) to help administrators troubleshoot network issues quickly."),
Q("UE", "MEDIUM", "What does it mean that MAC addresses are 'static' by nature?", ["They are randomly generated every time the computer boots", "They are assigned at the time of manufacture and cannot be easily changed without spoofing software", "They are assigned by the DHCP server", "They cannot be used on wireless networks"], "They are assigned at the time of manufacture and cannot be easily changed without spoofing software", "Unlike IP addresses which change as you move between networks, your device's MAC address remains physically the same everywhere you go."),
Q("UE", "HARD", "Which routing protocol is described as facilitating information sharing specifically between 'edge routers' to offer 'network stability'?", ["OSPF", "BGP (Border Gateway Protocol)", "IGRP", "RIP"], "BGP (Border Gateway Protocol)", "BGP is the protocol used between massive autonomous systems (like ISPs) to stabilize internet routing and switch paths if a link fails."),
Q("POSSIBLE QNS", "EASY", "What determines the first 3 bytes (6 hex digits) of a MAC address?", ["The internet provider", "The OUI (Organizational Unique Identifier) assigned to the manufacturer", "The DHCP server", "The operating system"], "The OUI (Organizational Unique Identifier) assigned to the manufacturer", "The IEEE assigns OUIs to hardware manufacturers so that the first half of a MAC address identifies the brand of the NIC."),
Q("POSSIBLE QNS", "MEDIUM", "What is the difference between a 'Static' and 'Dynamic' routing table in a router?", ["Static tables are wireless, Dynamic are wired", "Dynamic tables update automatically based on network activity, while static tables must be configured manually by an admin", "Static tables hold MAC addresses, Dynamic hold IPs", "Static tables are used only by switches"], "Dynamic tables update automatically based on network activity, while static tables must be configured manually by an admin", "Dynamic routing (like OSPF) automatically learns new routes when topology changes. Static routing requires human intervention."),
Q("POSSIBLE QNS", "HARD", "How does MAC filtering restrict network access?", ["By requiring a complex password", "By only allowing devices whose specific hardware MAC address is on an authorized list to connect", "By blocking all Class C IP addresses", "By turning off the router's broadcast signal"], "By only allowing devices whose specific hardware MAC address is on an authorized list to connect", "Administrators can configure the router to inspect incoming connection requests and reject any device whose MAC address is not pre-approved.")
];

async function insertUnit4Extra() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const existingTexts = new Set();
        const existing = await db.collection('questions')
            .find({ subjectId: SID }, { projection: { questionText: 1, category: 1 } })
            .toArray();
        existing.forEach(q => existingTexts.add(`${q.category}|${q.questionText.substring(0, 50)}`));

        const toInsert = unit4_extra.filter(q => {
            const key = `${q.category}|${q.questionText.substring(0, 50)}`;
            if (existingTexts.has(key)) return false;
            return true;
        });

        if (toInsert.length > 0) {
            const res = await db.collection('questions').insertMany(toInsert);
            console.log(`Inserted ${res.insertedCount} extra questions for Unit 4.`);
        } else {
            console.log("No new extra questions for Unit 4 to insert.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
insertUnit4Extra();
