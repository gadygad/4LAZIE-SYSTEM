const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197'; 

const questions = [
    // CONCEPT OF COMM
    {
        subjectId, moduleName: "Concept of Communication", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The term 'Data Communication' comprises two words: Data and Communication. Data can be any text, image, audio, video, and _______ files.",
        options: ["Multimedia", "Analog", "Print", "Database"],
        correctAnswer: "Multimedia",
        explanation: "Data can be any text, image, audio, video, and multimedia files.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Concept of Communication", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is NOT given as an example of a sender or receiver device in a network?",
        options: ["Smartwatch", "Walkie-talkie", "Video recording device", "Electric fan"],
        correctAnswer: "Electric fan",
        explanation: "While fans can be controlled via IoT, they are typically considered end appliances rather than primary computing nodes like smartwatches or walkie-talkies.",
        difficultyLevel: "MEDIUM"
    },
    // COMPONENTS
    {
        subjectId, moduleName: "Components", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Whenever we talk about communication between two computing devices using a network, _______ most important aspects come to our mind.",
        options: ["Three", "Four", "Five", "Six"],
        correctAnswer: "Five",
        explanation: "Five most important aspects: sender, receiver, communication medium, message, and protocols.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Components", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The communication media is also called _______ media.",
        options: ["Transmission", "Transfer", "Transport", "Transit"],
        correctAnswer: "Transmission",
        explanation: "The communication media is also called transmission media.",
        difficultyLevel: "EASY"
    },
    // MEASURING CAPACITY
    {
        subjectId, moduleName: "Measuring Capacity", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In data communication, the transmission medium is also known as a _______.",
        options: ["Channel", "Port", "Socket", "Bridge"],
        correctAnswer: "Channel",
        explanation: "In data communication, the transmission medium is also known as a channel.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Measuring Capacity", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The maximum amount of signals or traffic that a channel can carry is called its _______.",
        options: ["Capacity", "Velocity", "Throughput", "Latency"],
        correctAnswer: "Capacity",
        explanation: "The capacity of a channel is the maximum amount of signals or traffic that it can carry.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Measuring Capacity", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Higher the bandwidth, _______ the data transfer rate.",
        options: ["Lower", "Higher", "Slower", "More erratic"],
        correctAnswer: "Higher",
        explanation: "Higher the bandwidth, higher the data transfer rate.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Measuring Capacity", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Data travels in the form of _______ over a channel.",
        options: ["Signals", "Tokens", "Numbers", "Frequencies"],
        correctAnswer: "Signals",
        explanation: "Data travels in the form of signals over a channel. One signal carries one or more bits.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Measuring Capacity", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Data transfer rate is also known as _______.",
        options: ["Bit rate", "Baud rate", "Signal rate", "Packet rate"],
        correctAnswer: "Bit rate",
        explanation: "Data transfer rate is the number of bits transmitted in one second, also known as bit rate.",
        difficultyLevel: "EASY"
    },
    // TYPES
    {
        subjectId, moduleName: "Types of Communication", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Audio sent to a speaker is an example of _______ communication.",
        options: ["Simplex", "Half-duplex", "Full-duplex", "Multipoint"],
        correctAnswer: "Simplex",
        explanation: "Audio sent to a speaker is a one-way communication.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Types of Communication", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Simplex communication is like a _______ street where vehicles can move in only one direction.",
        options: ["One-way", "Two-way", "Dead-end", "Roundabout"],
        correctAnswer: "One-way",
        explanation: "It is like a one-way street where vehicles can move in only one direction.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Types of Communication", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "A walkie-talkie has a push-to-talk button that enables the _______ and turns off the receiver in that device.",
        options: ["Transmitter", "Battery", "Antenna", "Speaker"],
        correctAnswer: "Transmitter",
        explanation: "The push-to-talk button enables the transmitter and turns off the receiver.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Types of Communication", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Full-duplex communication can be done by using two physically separate _______ lines.",
        options: ["Simplex", "Half-duplex", "Multiplex", "Parallel"],
        correctAnswer: "Simplex",
        explanation: "Full-duplex can be done by using two separate simplex lines, one for sending and other for receiving.",
        difficultyLevel: "HARD"
    },
    // SWITCHING
    {
        subjectId, moduleName: "Switching Techniques", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Switching forms a _______ route for the data to be transmitted.",
        options: ["Permanent", "Temporary", "Logical", "Physical"],
        correctAnswer: "Temporary",
        explanation: "This switching process forms a temporary route for the data to be transmitted.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Switching Techniques", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In packet switching, the message is broken down into smaller pieces, called _______.",
        options: ["Packets", "Frames", "Cells", "Segments"],
        correctAnswer: "Packets",
        explanation: "The message is broken down into smaller pieces, called packets.",
        difficultyLevel: "EASY"
    },
    // MEDIA
    {
        subjectId, moduleName: "Transmission Media", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Guided transmission media are also known as _______ media.",
        options: ["Wired", "Wireless", "Bounded", "Optical"],
        correctAnswer: "Wired",
        explanation: "They are also known as wired media.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In unguided transmission, data travels in air in terms of _______ waves using an antenna.",
        options: ["Electromagnetic", "Mechanical", "Sound", "Magnetic"],
        correctAnswer: "Electromagnetic",
        explanation: "Data travels in air in terms of electromagnetic waves.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Dish-shaped antennas are used for sending and receiving data at _______ distances.",
        options: ["Short", "Longer", "Micro", "Nano"],
        correctAnswer: "Longer",
        explanation: "Dish-shaped antennas are used for sending and receiving data at longer distances.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Repeaters are installed to _______ the signals of the same energy after they travel a certain distance.",
        options: ["Regenerate", "Destroy", "Absorb", "Reflect"],
        correctAnswer: "Regenerate",
        explanation: "Repeaters are installed to regenerate the signals of the same energy.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Twisted-pair cables are less expensive and most commonly used in telephone lines and _______.",
        options: ["LANs", "WANs", "MANs", "PANs"],
        correctAnswer: "LANs",
        explanation: "They are most commonly used in telephone lines and LANs.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In coaxial cable, the copper core is surrounded with an _______ material.",
        options: ["Insulating", "Conducting", "Magnetic", "Optical"],
        correctAnswer: "Insulating",
        explanation: "It has a copper wire at the core which is surrounded with insulating material.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The key to success of coaxial cable is its _______ design that allows the copper core to transmit data without environmental interference.",
        options: ["Shielded", "Twisted", "Optical", "Unshielded"],
        correctAnswer: "Shielded",
        explanation: "The key is its shielded design.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which media uses refraction to direct light through a thin transparent strand?",
        options: ["Optical fiber", "Coaxial cable", "UTP", "STP"],
        correctAnswer: "Optical fiber",
        explanation: "Optic fiber uses refraction to direct the light through the media.",
        difficultyLevel: "EASY"
    },
    // WIRELESS
    {
        subjectId, moduleName: "Wireless Media", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the table in the PDF, which waves have a frequency range of 3 KHz - 1 GHz?",
        options: ["Radio Waves", "Microwaves", "Infrared Waves", "Visible Light"],
        correctAnswer: "Radio Waves",
        explanation: "Radio Waves range from 3 KHz to 1 GHz.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Wireless Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the table, which waves are used in point-to-point communication such as radar and satellite?",
        options: ["Microwaves", "Radio waves", "Infrared", "Bluetooth"],
        correctAnswer: "Microwaves",
        explanation: "Microwaves are used in radar and satellite.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Wireless Tech", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Bluetooth devices can send data within a range of _______ meters with a speed of 1 - 2 Mbps.",
        options: ["10", "100", "50", "5"],
        correctAnswer: "10",
        explanation: "Range of 10 meters.",
        difficultyLevel: "MEDIUM"
    },
    // MOBILE
    {
        subjectId, moduleName: "Mobile Tech", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The _______ generation (3G) mobile network technology was developed during late 90s, but introduced commercially around 2001.",
        options: ["Third", "Second", "Fourth", "First"],
        correctAnswer: "Third",
        explanation: "The third generation (3G) was developed during late 90s.",
        difficultyLevel: "EASY"
    },
    // PROTOCOLS
    {
        subjectId, moduleName: "Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Protocols also define how to rearrange the packets and _______ them at the destination.",
        options: ["Process", "Delete", "Encrypt", "Reject"],
        correctAnswer: "Process",
        explanation: "How to rearrange the packets and process them at the destination.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Protocols", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "HTTP is a _______ (also called client-server) protocol that runs over TCP.",
        options: ["Request-response", "Peer-to-peer", "Push-pull", "Token-ring"],
        correctAnswer: "Request-response",
        explanation: "HTTP is a request-response protocol.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Protocols", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In FTP, a user specifies the file name and location, after which _______ sets up and the file transfer happens.",
        options: ["Another connection", "A proxy", "A firewall", "A routing table"],
        correctAnswer: "Another connection",
        explanation: "After that, another connection sets up and the file transfer happens.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Protocols", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The _______ protocol can be considered the adhesive that holds the whole Internet together by routing packets.",
        options: ["IP", "TCP", "HTTP", "FTP"],
        correctAnswer: "IP",
        explanation: "It can be considered the adhesive that holds the whole Internet together.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "TCP is responsible for _______ the packets so that they are delivered in sequence.",
        options: ["Ordering", "Dropping", "Encrypting", "Compressing"],
        correctAnswer: "Ordering",
        explanation: "TCP is responsible for ordering the packets.",
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
    
    console.log(`PDF 1 Part 3 Extraction complete: Inserted ${inserted} questions.`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
