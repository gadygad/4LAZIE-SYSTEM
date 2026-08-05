const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197'; 

const questions = [
    // CONCEPT & COMPONENTS
    {
        subjectId, moduleName: "Concept of Communication", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following refers specifically to the exchange of data between two or more networked or connected devices?",
        options: ["Data Transfer", "Data Communication", "Data Encoding", "Data Processing"],
        correctAnswer: "Data Communication",
        explanation: "Data communication refers to the exchange of data between two or more networked or connected devices.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Concept of Communication", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In a computer network, the sender and receiver are generally referred to as _______.",
        options: ["Links", "Nodes", "Terminals", "Vertices"],
        correctAnswer: "Nodes",
        explanation: "In computer communication, the sender and receiver are known as nodes in a network.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Concept of Communication", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The _______ is the actual data or information that needs to be exchanged between the sender and the receiver.",
        options: ["Message", "Protocol", "Medium", "Header"],
        correctAnswer: "Message",
        explanation: "Message is the data or information (text, number, image, audio, video) that needs to be exchanged.",
        difficultyLevel: "EASY"
    },
    // MEASURING CAPACITY
    {
        subjectId, moduleName: "Measuring Capacity", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The capacity of a communication channel is normally measured in terms of bandwidth and _______.",
        options: ["Signal strength", "Data transfer rate", "Wavelength", "Error rate"],
        correctAnswer: "Data transfer rate",
        explanation: "The capacity of a channel is measured in terms of bandwidth and data transfer rate.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Measuring Capacity", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Bandwidth is typically measured in _______.",
        options: ["Bits per second", "Hertz (Hz)", "Bytes", "Baud"],
        correctAnswer: "Hertz (Hz)",
        explanation: "Bandwidth is measured in Hertz (Hz), whereas data transfer rate is measured in bits per second (bps).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Measuring Capacity", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "If the data transfer rate is given as 1 Mbps, this is equal to _______ bps.",
        options: ["1000", "1024", "1048576", "2^10"],
        correctAnswer: "1048576",
        explanation: "1 Mbps = 2^20 bps = 1,048,576 bps (or commonly approximated as 1024 Kbps).",
        difficultyLevel: "HARD"
    },
    // TYPES OF COMMUNICATION
    {
        subjectId, moduleName: "Types of Communication", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Data entered through a keyboard into a computer is an example of _______ communication.",
        options: ["Simplex", "Half-duplex", "Full-duplex", "Multiplex"],
        correctAnswer: "Simplex",
        explanation: "Keyboard to computer is one-way communication, which is Simplex.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Types of Communication", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "A landline telephone network represents a _______ communication channel.",
        options: ["Simplex", "Half-duplex", "Full-duplex", "Unidirectional"],
        correctAnswer: "Full-duplex",
        explanation: "Landline telephones allow both parties to speak and listen simultaneously, which is Full-duplex.",
        difficultyLevel: "EASY"
    },
    // SWITCHING TECHNIQUES
    {
        subjectId, moduleName: "Switching Techniques", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In packet switching, each packet contains a main message part and a _______ containing the destination address.",
        options: ["Footer", "Trailer", "Header", "Payload"],
        correctAnswer: "Header",
        explanation: "Each packet has a header containing the address of the destination, and the main message part.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Switching Techniques", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The traditional telephone system is the best historical example of _______ switching.",
        options: ["Packet", "Message", "Circuit", "Frame"],
        correctAnswer: "Circuit",
        explanation: "In earlier days, placing a telephone call involved finding a physical path all the way to the receiver, an example of circuit switching.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Switching Techniques", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In _______ switching, different packets of the same message may take different routes depending on network availability.",
        options: ["Circuit", "Packet", "Dedicated", "Static"],
        correctAnswer: "Packet",
        explanation: "In packet switching, packets are transmitted independently and may take different routes.",
        difficultyLevel: "MEDIUM"
    },
    // TRANSMISSION MEDIA (GUIDED)
    {
        subjectId, moduleName: "Transmission Media", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "A twisted-pair cable consists of two copper wires twisted like a _______ structure to minimize electrical interference.",
        options: ["Linear", "DNA helical", "Circular", "Parallel"],
        correctAnswer: "DNA helical",
        explanation: "A twisted-pair consists of two copper wires twisted like a DNA helical structure to minimize the effect of electrical interference.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which guided media has a copper wire at the core surrounded by insulating material and an outer braided conductor?",
        options: ["UTP", "STP", "Coaxial cable", "Fiber Optic"],
        correctAnswer: "Coaxial cable",
        explanation: "Coaxial cable has a copper core, insulating material, and an outer conductor (usually a copper mesh).",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Optical fibers are generally _______, requiring two cables for full-duplex communication.",
        options: ["Omnidirectional", "Unidirectional", "Bidirectional", "Multidirectional"],
        correctAnswer: "Unidirectional",
        explanation: "Optic fibers are unidirectional. Two cables are required for full duplex communication.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is NOT a type of wired (guided) transmission media?",
        options: ["Twisted-pair", "Coaxial cable", "Fiber-optic cable", "Microwave"],
        correctAnswer: "Microwave",
        explanation: "Microwaves belong to unguided (wireless) transmission media.",
        difficultyLevel: "EASY"
    },
    // TRANSMISSION MEDIA (UNGUIDED)
    {
        subjectId, moduleName: "Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The electromagnetic spectrum range available for wireless communication is approximately _______.",
        options: ["3 KHz to 900 THz", "1 MHz to 100 GHz", "300 KHz to 30 MHz", "100 THz to 1000 THz"],
        correctAnswer: "3 KHz to 900 THz",
        explanation: "The electromagnetic spectrum range of 3 KHz to 900 THz is available for wireless communication.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which wireless waves are primarily used for short-distance point-to-point communication like TV remote controls?",
        options: ["Radio waves", "Microwaves", "Infrared waves", "Ultraviolet waves"],
        correctAnswer: "Infrared waves",
        explanation: "Infrared waves are used for short-distance point-to-point communication such as remote-control-to-TV.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Because Microwaves cannot penetrate solid objects, their transmission requires _______ propagation.",
        options: ["Omnidirectional", "Line-of-sight", "Scattered", "Ground-wave"],
        correctAnswer: "Line-of-sight",
        explanation: "Microwaves need line-of-sight propagation, meaning communicating antennas must be facing each other without solid obstacles.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Radio waves used in AM/FM radio are highly susceptible to _______.",
        options: ["Interference", "Refraction", "Line-of-sight blockage", "High costs"],
        correctAnswer: "Interference",
        explanation: "Radio waves are omnidirectional and can penetrate walls, but they are susceptible to interference.",
        difficultyLevel: "EASY"
    },
    // WIRELESS TECH (BLUETOOTH/WLAN)
    {
        subjectId, moduleName: "Wireless Technologies", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In Bluetooth technology, the communicating devices within a range of 10 meters build a personal area network called a _______.",
        options: ["Subnet", "Piconet", "Scatternet", "VLAN"],
        correctAnswer: "Piconet",
        explanation: "A Bluetooth network within 10 meters is called a piconet.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Wireless Technologies", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "A Bluetooth piconet operates in a master-slave configuration where a master device can communicate with up to _______ active slave devices simultaneously.",
        options: ["4", "7", "8", "255"],
        correctAnswer: "7",
        explanation: "A master device can communicate with up to 7 active slave devices at the same time in a piconet.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Wireless Technologies", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The international organization IEEE assigns standard numbers to networks. Wireless LAN (Wi-Fi) is numbered as _______.",
        options: ["802.3", "802.11", "802.15", "802.16"],
        correctAnswer: "802.11",
        explanation: "The wireless LAN standard is numbered as 802.11 by the IEEE.",
        difficultyLevel: "MEDIUM"
    },
    // MOBILE TECHNOLOGIES
    {
        subjectId, moduleName: "Mobile Technologies", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The first generation (1G) mobile network system was introduced around 1982 and used _______ signals to carry voices.",
        options: ["Digital", "Analog", "Optical", "Infrared"],
        correctAnswer: "Analog",
        explanation: "1G used analog signals to transmit only voice calls.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Mobile Technologies", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The _______ generation of mobile networks was the first to offer both digital voice and data services, facilitating Internet access on mobile phones.",
        options: ["1G", "2G", "3G", "4G"],
        correctAnswer: "3G",
        explanation: "3G, introduced commercially around 2001, offered both digital voice and data services for Internet access.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Mobile Technologies", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "4G systems completely revolutionized telecommunications by supporting interactive multimedia and introducing _______ for voice calls.",
        options: ["Analog switching", "VoLTE", "Simplex audio", "Circuit switching"],
        correctAnswer: "VoLTE",
        explanation: "4G introduced VoLTE (Voice over Long-Term Evolution) as a standard for high-speed wireless communication.",
        difficultyLevel: "HARD"
    },
    // PROTOCOLS
    {
        subjectId, moduleName: "Protocols", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "If computers are sending data simultaneously through the same link, _______ control is required to prevent packet collisions.",
        options: ["Flow", "Error", "Access", "Routing"],
        correctAnswer: "Access",
        explanation: "Access control decides which node in a communication channel accesses the shared link at a particular time to avoid collisions.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Protocols", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which protocol sets up a connection between two nodes specifically for accessing and transferring files, optionally requiring authentication?",
        options: ["HTTP", "SMTP", "FTP", "PPP"],
        correctAnswer: "FTP",
        explanation: "File Transfer Protocol (FTP) is used for transferring files and often requires user ID and password authentication.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The protocol primarily responsible for breaking a message into smaller chunks (packets) and guaranteeing their delivery is _______.",
        options: ["IP", "TCP", "HTTP", "SMTP"],
        correctAnswer: "TCP",
        explanation: "TCP breaks data into chunks, routes them, guarantees delivery, and reorders them at the destination. IP just assigns addresses.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Protocols", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "When an email is sent, the _______ sender program takes mails from the outgoing queue and transmits them to the destination.",
        options: ["POP3", "IMAP", "FTP", "SMTP"],
        correctAnswer: "SMTP",
        explanation: "Simple Mail Transfer Protocol (SMTP) takes mails from the outgoing queue and transmits them.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Wireless Technologies", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "While Wi-Fi is used to form small WLANs, _______ is used to deliver connections over a larger area (MAN applications) using a larger spectrum.",
        options: ["Bluetooth", "NFC", "WiMax", "Infrared"],
        correctAnswer: "WiMax",
        explanation: "WiMax stands for Worldwide Interoperability for Microwave Access and is used for MAN (Metropolitan Area Network) applications.",
        difficultyLevel: "HARD"
    },
    // MORE VARIATIONS FROM TEXT
    {
        subjectId, moduleName: "Concept of Communication", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the PDF chapter, 'Data Communication' refers to the exchange of data between two or more _______ devices.",
        options: ["Analog", "Networked or connected", "Standalone", "Wireless"],
        correctAnswer: "Networked or connected",
        explanation: "Data communication refers to the exchange of data between two or more networked or connected devices.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Concept of Communication", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "A _______ is a computer or any device capable of sending data over a network.",
        options: ["Server", "Receiver", "Sender", "Hub"],
        correctAnswer: "Sender",
        explanation: "A sender is any device capable of sending data over a network.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Measuring Capacity", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "1 Terabit per second (Tbps) is equal to _______ bps.",
        options: ["2^10", "2^20", "2^30", "2^40"],
        correctAnswer: "2^40",
        explanation: "1 Tbps = 2^40 bps = 1024 Gbps.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Types of Communication", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In simplex communication, devices use the _______ capacity of the link to transmit the data in one direction.",
        options: ["Half", "Entire", "Variable", "Shared"],
        correctAnswer: "Entire",
        explanation: "In simplex, devices use the entire capacity of the link to transmit the data since it's unidirectional.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Types of Communication", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In full-duplex communication, the capacity of the transmission link is _______ between the signals going in both directions.",
        options: ["Divided by 4", "Shared", "Doubled", "Ignored"],
        correctAnswer: "Shared",
        explanation: "The capacity of the link is shared between signals travelling in both directions in full-duplex.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Switching Techniques", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In a very large network, making a dedicated connection between each pair of devices (_______ topology) is too costly.",
        options: ["Star", "Mesh", "Bus", "Ring"],
        correctAnswer: "Mesh",
        explanation: "Making a dedicated connection between every pair of devices corresponds to a mesh topology, which is costly.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Switching Techniques", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In packet switching, when all packets reach the destination, they are _______ and the complete message is received.",
        options: ["Discarded", "Broadcasted", "Reassembled", "Encrypted"],
        correctAnswer: "Reassembled",
        explanation: "Packets are reassembled at the destination to form the complete message.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which type of twisted-pair cable has a metal shield surrounding the plastic-covered wires?",
        options: ["UTP", "STP", "Coaxial", "Fiber"],
        correctAnswer: "STP",
        explanation: "Shielded Twisted-Pair (STP) has a metal shield to further prevent interference.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Geostationary satellites orbiting around the Earth use _______ for communication with a satellite dish.",
        options: ["Radio waves", "Infrared waves", "Microwaves", "Light waves"],
        correctAnswer: "Microwaves",
        explanation: "Satellites use microwaves for communication between a dish and the hub.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Wireless Technologies", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In a WLAN, an AP stands for _______.",
        options: ["Access Point", "Active Protocol", "Antenna Port", "Assigned Path"],
        correctAnswer: "Access Point",
        explanation: "APs are Access Points installed in buildings to create wireless local area networks.",
        difficultyLevel: "EASY"
    }
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    
    let inserted = 0;
    for (let q of questions) {
        q.createdAt = new Date();
        const exists = await db.collection('questions').findOne({ 
            subjectId: q.subjectId, 
            questionText: q.questionText 
        });

        if (!exists) {
            await db.collection('questions').insertOne(q);
            inserted++;
        }
    }
    
    console.log(`PDF 1 Part 2 Extraction complete: Inserted ${inserted} questions.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
