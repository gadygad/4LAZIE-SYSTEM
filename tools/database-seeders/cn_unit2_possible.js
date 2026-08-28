const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const SID = "6a5d16dbf29e866583f45d27";

const Q = (cat, lvl, q, opts, ans, exp) => ({
    subjectId: SID, category: cat, difficultyLevel: lvl,
    questionText: q, options: opts, correctAnswer: ans, explanation: exp,
    _class: "com.school.model.Question"
});

const possible_unit2 = [
Q("POSSIBLE QNS", "EASY", "Which transmission medium transmits data via electromagnetic signals through copper wires?", ["Fiber Optic", "Coaxial and Twisted Pair", "Radio Waves", "Infrared"], "Coaxial and Twisted Pair", "Both coaxial and twisted pair cables use copper wires to transmit data in the form of electrical signals."),
Q("POSSIBLE QNS", "EASY", "What is the function of the 'Jacket' on a fiber optic cable?", ["To transmit light", "To reflect light back into the core", "To protect the fiber from physical damage and absorb shock", "To provide a ground connection"], "To protect the fiber from physical damage and absorb shock", "The outer plastic jacket protects the delicate glass core and cladding from external physical damage."),
Q("POSSIBLE QNS", "EASY", "What is 'Wireshark' used for?", ["To edit text documents", "To sniff and analyze network packets in detail", "To physically test cables", "To assign IP addresses"], "To sniff and analyze network packets in detail", "Wireshark is a popular software diagnostic tool used to capture and inspect network traffic packet by packet."),
Q("POSSIBLE QNS", "EASY", "A walkie-talkie operates using which transmission mode?", ["Simplex", "Half-Duplex", "Full-Duplex", "Multiplex"], "Half-Duplex", "A walkie-talkie allows two-way communication, but only one person can speak at a time, making it Half-Duplex."),
Q("POSSIBLE QNS", "EASY", "Which of the following is a disadvantage of a LAN?", ["High data transmission rates", "Resource sharing", "Initial setup cost can be high", "Small geographical location"], "Initial setup cost can be high", "While cheap in the long run due to resource sharing, purchasing servers, switches, and cabling makes the initial setup expensive."),
Q("POSSIBLE QNS", "EASY", "What is a 'Client' in a Client/Server network?", ["The central computer managing everything", "A device that requests services from the server", "The physical network cable", "The router connecting to the internet"], "A device that requests services from the server", "In a Client/Server network, client workstations send requests (like opening a file or printing) to the central server."),
Q("POSSIBLE QNS", "EASY", "Which type of unguided media cannot penetrate solid walls?", ["Radio Waves", "Microwaves", "Infrared", "Wi-Fi"], "Infrared", "Infrared waves are blocked by solid objects like walls, which is why your TV remote doesn't work from another room."),
Q("POSSIBLE QNS", "EASY", "Which networking device is known as an 'Adapter'?", ["Switch", "NIC (Network Interface Card)", "Hub", "Router"], "NIC (Network Interface Card)", "A NIC is often referred to as a network adapter or LAN adapter, providing the physical connection to the network."),
Q("POSSIBLE QNS", "EASY", "What does 'Broadband transmission' in coaxial cables mean?", ["Transmitting a single signal at high speed", "Transmitting multiple signals simultaneously over different frequencies", "Transmitting data via light", "Transmitting wireless signals"], "Transmitting multiple signals simultaneously over different frequencies", "Broadband allows a single cable to carry multiple signals (like TV, internet, phone) at the same time by dividing the frequency."),
Q("POSSIBLE QNS", "EASY", "When designing a LAN, what is the first step you should take?", ["Buy the cables", "Assess requirements and goals (users, devices, applications)", "Configure IP addresses", "Test the ping"], "Assess requirements and goals (users, devices, applications)", "Before buying anything, you must understand the client's needs, such as the number of users, speed required, and layout."),
Q("POSSIBLE QNS", "MEDIUM", "Why is a Network Operating System (NOS) said to improve 'Stability'?", ["It doesn't use electricity", "Centralized servers managed by a NOS are designed to handle heavy loads without crashing", "It uses peer-to-peer connections only", "It physically bolsters the hardware"], "Centralized servers managed by a NOS are designed to handle heavy loads without crashing", "A dedicated NOS running on robust server hardware ensures the network remains stable and available to all clients."),
Q("POSSIBLE QNS", "MEDIUM", "What is the main advantage of using Shielded Twisted Pair (STP) over Unshielded Twisted Pair (UTP)?", ["It is much cheaper", "It has a higher capacity and better protection against noise interference", "It does not require a router", "It uses light instead of electricity"], "It has a higher capacity and better protection against noise interference", "The metallic shield inside an STP cable blocks external electromagnetic interference, allowing for faster and more reliable data transmission."),
Q("POSSIBLE QNS", "MEDIUM", "What does a 'Multimeter' measure during network diagnostics?", ["Packet loss", "IP addresses", "Electrical signals, voltage, and continuity in cables", "DNS resolution time"], "Electrical signals, voltage, and continuity in cables", "A multimeter is a hardware tool used to ensure electrical circuits within the cables are intact and providing the correct voltage."),
Q("POSSIBLE QNS", "MEDIUM", "Which unguided transmission media is most affected by environmental conditions like rain and wind?", ["Infrared", "Radio Waves", "Microwaves", "Bluetooth"], "Microwaves", "Because microwaves operate at high frequencies and require line-of-sight, heavy rain or wind moving the antennas can severely distort the signal."),
Q("POSSIBLE QNS", "MEDIUM", "In a Full-Duplex communication system, what makes it faster than Half-Duplex?", ["It uses light", "It has two separate simplex channels, allowing simultaneous transmission and reception", "It removes the need for error checking", "It compresses data locally"], "It has two separate simplex channels, allowing simultaneous transmission and reception", "Full-Duplex effectively uses two channels (one for sending, one for receiving), eliminating the need to wait turns."),
Q("POSSIBLE QNS", "HARD", "How does 'Attenuation' affect a copper cable compared to a fiber optic cable?", ["Copper suffers more from attenuation over short distances compared to fiber optics", "Fiber optics suffer from more attenuation", "They suffer equally", "Attenuation does not affect copper"], "Copper suffers more from attenuation over short distances compared to fiber optics", "Electrical signals in copper degrade much faster over distance than light pulses in a fiber optic cable, which is why fiber can run for kilometers without repeaters."),
Q("POSSIBLE QNS", "HARD", "In LAN setup, what is the role of a 'Crossover Cable'?", ["To connect a PC to a hub", "To connect a router's LAN port to a switch's standard port (in older equipment lacking Auto-MDIX)", "To connect to Wi-Fi", "To provide electrical grounding"], "To connect a router's LAN port to a switch's standard port (in older equipment lacking Auto-MDIX)", "Crossover cables were specifically wired to connect similar devices directly, such as switch-to-switch or PC-to-PC."),
Q("POSSIBLE QNS", "HARD", "If you are receiving a 'Request timed out' message when pinging a server, what does this indicate?", ["The connection is perfect", "The DNS successfully resolved the name", "A problem exists; the server is unreachable or a firewall is blocking ICMP requests", "The network is too fast"], "A problem exists; the server is unreachable or a firewall is blocking ICMP requests", "A timeout means the echo request was sent, but no reply was received within the expected timeframe."),
Q("POSSIBLE QNS", "HARD", "What is the primary purpose of 'SolarWinds Network Performance Monitor'?", ["To edit video files", "To monitor network traffic, bandwidth usage, and unauthorized access continuously", "To replace a router", "To assign static IP addresses"], "To monitor network traffic, bandwidth usage, and unauthorized access continuously", "SolarWinds is an advanced network management tool used by administrators to ensure the LAN stays healthy after setup."),
Q("POSSIBLE QNS", "HARD", "Why is 'Documentation' considered a crucial final step in setting up a LAN?", ["To make the network run faster", "It is legally required by the government", "It provides a blueprint of IP assignments and configurations for future troubleshooting and expansion", "It stops viruses"], "It provides a blueprint of IP assignments and configurations for future troubleshooting and expansion", "Properly documented network diagrams and IP tables save immense amounts of time when resolving future issues or adding new devices.")
];

async function insertUnit2Possible() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');
        const existingTexts = new Set();
        const existing = await db.collection('questions')
            .find({ subjectId: SID }, { projection: { questionText: 1, category: 1 } })
            .toArray();
        existing.forEach(q => existingTexts.add(`${q.category}|${q.questionText.substring(0, 50)}`));

        const toInsert = possible_unit2.filter(q => {
            const key = `${q.category}|${q.questionText.substring(0, 50)}`;
            if (existingTexts.has(key)) return false;
            return true;
        });

        if (toInsert.length > 0) {
            const res = await db.collection('questions').insertMany(toInsert);
            console.log(`Inserted ${res.insertedCount} POSSIBLE QNS for Unit 2.`);
        } else {
            console.log("No new POSSIBLE QNS for Unit 2 to insert.");
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
insertUnit2Possible();
