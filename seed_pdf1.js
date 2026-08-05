const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197'; 

const questions = [
    {
        subjectId: subjectId,
        moduleName: "Concept of Communication",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "According to the fundamental concepts of networks, the five most important components of data communication are sender, receiver, communication medium, the message, and _______.",
        options: ["Protocols", "Bandwidth", "Switching", "Modem"],
        correctAnswer: "Protocols",
        explanation: "The five components are sender, receiver, communication medium, message, and protocols (rules to be followed during communication).",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Measuring Capacity",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "Bandwidth is normally measured as the difference between the _______ contained in the composite signals.",
        options: ["Maximum and minimum frequency", "Highest and lowest amplitude", "Peak and average voltage", "Longest and shortest wavelength"],
        correctAnswer: "Maximum and minimum frequency",
        explanation: "Bandwidth is the range of frequencies available for transmission, calculated as the difference between the maximum and minimum frequency.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Data Transfer Rate",
        category: "CAT 1",
        type: "MULTIPLE_CHOICE",
        questionText: "In data transfer rate calculations, 1 Gbps is equivalent to _______ Mbps.",
        options: ["1024", "1000", "2^20", "8"],
        correctAnswer: "1024",
        explanation: "According to the standard digital conversion, 1 Gbps = 2^10 Mbps = 1024 Mbps.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Types of Communication",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "Controlling home appliances (like a fridge or oven) remotely while sitting in the office using IoT is an example of _______ communication.",
        options: ["Simplex", "Half-duplex", "Full-duplex", "Multipoint"],
        correctAnswer: "Simplex",
        explanation: "Controlling appliances remotely involves sending unidirectional commands without expecting a reciprocal data stream in the same channel, acting as a Simplex communication.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Types of Communication",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "A walkie-talkie represents a _______ communication channel where the direction of transmission can be switched.",
        options: ["Half-duplex", "Simplex", "Full-duplex", "Broadcast"],
        correctAnswer: "Half-duplex",
        explanation: "In half-duplex communication, both devices can send and receive data, but not at the same time (like sharing a one-way narrow bridge).",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Switching Techniques",
        category: "CAT 1",
        type: "MULTIPLE_CHOICE",
        questionText: "In _______ switching, a dedicated path is identified between the sender and the receiver before communication starts.",
        options: ["Circuit", "Packet", "Message", "Frame"],
        correctAnswer: "Circuit",
        explanation: "In circuit switching, a dedicated physical path is established all the way from the sender to the receiver before data is transmitted.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Switching Techniques",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "Unlike circuit switching, a channel is occupied in _______ switching only during the transmission of the broken down pieces of a message.",
        options: ["Packet", "Circuit", "Line", "Dedicated"],
        correctAnswer: "Packet",
        explanation: "In packet switching, messages are broken into packets and transmitted independently. The channel is only occupied during the packet's transmission.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Transmission Media",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "In an Optical Fiber cable, a thin transparent strand of glass at the centre is covered with a layer of less dense glass called _______.",
        options: ["Cladding", "Core", "Jacket", "Shield"],
        correctAnswer: "Cladding",
        explanation: "Optic fiber uses refraction to direct light. The central strand is covered with a less dense glass layer called cladding.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Transmission Media",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "Which unguided transmission waves require line-of-sight propagation, meaning communicating antennas must be facing each other?",
        options: ["Microwaves", "Radio Waves", "Infrared Waves", "Bluetooth"],
        correctAnswer: "Microwaves",
        explanation: "Microwaves (1GHz - 300GHz) travel in a straight line and cannot penetrate solid objects, thus requiring line-of-sight propagation (e.g., dish antennas).",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Transmission Media",
        category: "CAT 1",
        type: "MULTIPLE_CHOICE",
        questionText: "_______ waves are omni-directional, meaning they can move in all directions and can penetrate walls easily.",
        options: ["Radio", "Micro", "Infrared", "Light"],
        correctAnswer: "Radio",
        explanation: "Radio waves (3 KHz - 1 GHz) are omni-directional and can penetrate solid objects like walls, making them useful for AM/FM radio.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Wireless Technologies",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "Bluetooth devices use an unlicensed frequency band of _______ to transmit and receive data over short distances.",
        options: ["2.4 GHz", "5.0 GHz", "900 MHz", "3.6 GHz"],
        correctAnswer: "2.4 GHz",
        explanation: "Bluetooth operates in the unlicensed industrial, scientific, and medical (ISM) frequency band of 2.4 GHz.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Mobile Technologies",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "The _______ generation of mobile networks, introduced around 1991, replaced analog signals with digital form and introduced SMS/MMS services.",
        options: ["2G", "1G", "3G", "4G"],
        correctAnswer: "2G",
        explanation: "The second generation (2G) shifted from analog to digital, improving call quality, allowing encryption, and introducing SMS.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Mobile Technologies",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "Machine to machine (M2M) direct communication and the widespread success of IoT is expected to be a milestone development driven primarily by _______ networks.",
        options: ["5G", "4G", "3G", "VoLTE"],
        correctAnswer: "5G",
        explanation: "The fifth generation (5G) is expected to support all future connected vehicles and IoT devices via Gbps data transfers and direct M2M communications.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Protocols",
        category: "CAT 2",
        type: "MULTIPLE_CHOICE",
        questionText: "_______ control is required when the sender and receiver have different speeds of sending and receiving data.",
        options: ["Flow", "Access", "Error", "Routing"],
        correctAnswer: "Flow",
        explanation: "Flow control prevents a fast sender from overwhelming a slow receiver by ensuring there is a mechanism to adjust the data transmission rate.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Protocols",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        questionText: "The primary protocol used to access the World Wide Web, developed by Tim Berners-Lee at CERN in 1989, is called _______.",
        options: ["HTTP", "FTP", "SMTP", "PPP"],
        correctAnswer: "HTTP",
        explanation: "HyperText Transfer Protocol (HTTP) is the client-server protocol used to access and transfer hypertext across the World Wide Web.",
        difficultyLevel: "EASY"
    },
    {
        subjectId: subjectId,
        moduleName: "Protocols",
        category: "EXERCISE",
        type: "MULTIPLE_CHOICE",
        questionText: "Which protocol is responsible for establishing a dedicated and direct connection between two communicating devices, often used by ISPs through a modem?",
        options: ["PPP", "FTP", "SMTP", "TCP"],
        correctAnswer: "PPP",
        explanation: "Point to Point Protocol (PPP) establishes a direct link between two nodes, authenticating each other to exchange data.",
        difficultyLevel: "HARD"
    },
    {
        subjectId: subjectId,
        moduleName: "Protocols",
        category: "POSSIBLE",
        type: "MULTIPLE_CHOICE",
        questionText: "In the SMTP protocol, the email containing the header and body are entered into a queue of _______ mails before being transmitted.",
        options: ["Outgoing", "Incoming", "Spam", "Draft"],
        correctAnswer: "Outgoing",
        explanation: "The SMTP sender program takes mails from the outgoing queue and transmits them to the destinations.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId: subjectId,
        moduleName: "Protocols",
        category: "CAT 2",
        type: "MULTIPLE_CHOICE",
        questionText: "The _______ protocol ensures that each computer connected to the Internet is assigned an address to identify it independently.",
        options: ["Internet Protocol (IP)", "Transmission Control Protocol (TCP)", "File Transfer Protocol (FTP)", "Simple Mail Transfer Protocol (SMTP)"],
        correctAnswer: "Internet Protocol (IP)",
        explanation: "IP acts as the adhesive of the Internet by assigning IP addresses to each node independently.",
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
    
    console.log(`PDF 1 Extraction complete: Inserted ${inserted} questions.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
