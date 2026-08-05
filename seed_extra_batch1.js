const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

const questions = [
    // UNIT 1: INTRODUCTION & TOPOLOGIES (20 Questions)
    {
        subjectId, moduleName: "Unit 1: Introduction to Data Communication", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following defines the set of rules governing data communication?",
        options: ["Protocol", "Topology", "Medium", "Message"],
        correctAnswer: "Protocol",
        explanation: "A protocol is a set of rules that governs data communication.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Introduction to Data Communication", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What represents the physical path over which a message travels?",
        options: ["Medium", "Protocol", "Sender", "Receiver"],
        correctAnswer: "Medium",
        explanation: "The transmission medium is the physical path over which a message travels from sender to receiver.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Introduction to Data Communication", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which data flow direction allows data to travel in both directions, but only one direction at a time?",
        options: ["Half-duplex", "Simplex", "Full-duplex", "Multiplex"],
        correctAnswer: "Half-duplex",
        explanation: "In half-duplex mode, each station can both transmit and receive, but not at the same time.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Network Topologies", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In which topology is every device connected to every other device via a dedicated point-to-point link?",
        options: ["Mesh", "Star", "Bus", "Ring"],
        correctAnswer: "Mesh",
        explanation: "A mesh topology provides a dedicated point-to-point link to every other node.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Network Topologies", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What is the primary advantage of a Star topology over a Bus topology?",
        options: ["If one link fails, only that link is affected", "It requires less cabling", "It does not need a central hub", "It connects all computers in a closed loop"],
        correctAnswer: "If one link fails, only that link is affected",
        explanation: "In a star topology, if one link fails, only that specific node goes down. The rest of the network remains active.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Network Topologies", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which device is typically placed at the center of a Star topology?",
        options: ["Hub or Switch", "Router", "Modem", "Repeater"],
        correctAnswer: "Hub or Switch",
        explanation: "A star topology requires a central controller, commonly a hub or a switch.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Network Types", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "A network that spans a large geographical area, such as a country or a continent, is known as a:",
        options: ["WAN", "LAN", "MAN", "PAN"],
        correctAnswer: "WAN",
        explanation: "A Wide Area Network (WAN) provides long-distance transmission over large geographic areas.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Network Types", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which type of network is typically owned and operated by a single organization within a single office building?",
        options: ["LAN", "WAN", "MAN", "Internet"],
        correctAnswer: "LAN",
        explanation: "A Local Area Network (LAN) is usually privately owned and links devices in a single office, building, or campus.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Reliability", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Network reliability is primarily measured by:",
        options: ["Frequency of failure and recovery time", "Transit time and response time", "Throughput and delay", "Bandwidth and noise"],
        correctAnswer: "Frequency of failure and recovery time",
        explanation: "Reliability is measured by the frequency of failure, the time it takes to recover from a failure, and network robustness in a catastrophe.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Security", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Protecting data from unauthorized access, damage, and modification falls under which network criteria?",
        options: ["Security", "Performance", "Reliability", "Scalability"],
        correctAnswer: "Security",
        explanation: "Security issues include protecting data from unauthorized access, damage, and implementing policies for recovery.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Protocols", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which element of a protocol refers to the structure or format of the data?",
        options: ["Syntax", "Semantics", "Timing", "Routing"],
        correctAnswer: "Syntax",
        explanation: "Syntax refers to the structure or format of the data, meaning the order in which they are presented.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Protocols", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which element of a protocol dictates the meaning of each section of bits?",
        options: ["Semantics", "Syntax", "Timing", "Addressing"],
        correctAnswer: "Semantics",
        explanation: "Semantics refers to the meaning of each section of bits and how it should be interpreted.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Internet", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What was the precursor to the modern Internet developed by the US Department of Defense?",
        options: ["ARPANET", "NSFNET", "CSNET", "MILNET"],
        correctAnswer: "ARPANET",
        explanation: "The Advanced Research Projects Agency Network (ARPANET) was the precursor to the Internet.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: OSI Model", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "How many layers are in the OSI reference model?",
        options: ["7", "4", "5", "6"],
        correctAnswer: "7",
        explanation: "The Open Systems Interconnection (OSI) model consists of 7 layers.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: OSI Model", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which layer of the OSI model is closest to the transmission medium?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Application Layer"],
        correctAnswer: "Physical Layer",
        explanation: "The Physical Layer is the lowest layer, directly interfacing with the transmission medium.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: OSI Model", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which OSI layer is responsible for end-to-end delivery of the entire message?",
        options: ["Transport Layer", "Network Layer", "Data Link Layer", "Session Layer"],
        correctAnswer: "Transport Layer",
        explanation: "The Transport Layer is responsible for process-to-process delivery of the entire message.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: OSI Model", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The process of adding headers and trailers to data as it moves down the OSI layers is called:",
        options: ["Encapsulation", "Decapsulation", "Multiplexing", "Modulation"],
        correctAnswer: "Encapsulation",
        explanation: "Encapsulation is the process where each layer adds its own header (and sometimes trailer) to the data from the layer above.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: TCP/IP", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which protocol suite is the foundational architecture for the Internet?",
        options: ["TCP/IP", "OSI", "IPX/SPX", "AppleTalk"],
        correctAnswer: "TCP/IP",
        explanation: "The Transmission Control Protocol/Internet Protocol (TCP/IP) suite is the foundation of the Internet.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: TCP/IP", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In the TCP/IP model, which layer corresponds to the OSI model's Session, Presentation, and Application layers combined?",
        options: ["Application Layer", "Transport Layer", "Internet Layer", "Network Access Layer"],
        correctAnswer: "Application Layer",
        explanation: "The TCP/IP Application layer encompasses the functions of the top three OSI layers.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: OSI Model", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Dialog control and token management are primary responsibilities of which OSI layer?",
        options: ["Session Layer", "Presentation Layer", "Transport Layer", "Application Layer"],
        correctAnswer: "Session Layer",
        explanation: "The Session layer establishes, maintains, and synchronizes the interaction between communicating systems.",
        difficultyLevel: "HARD"
    },

    // UNIT 2: PHYSICAL & DATA LINK LAYER (60 Questions)
    {
        subjectId, moduleName: "Unit 2: Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which transmission medium uses glass or plastic threads to transmit data as pulses of light?",
        options: ["Fiber-optic cable", "Coaxial cable", "Twisted-pair cable", "Microwave"],
        correctAnswer: "Fiber-optic cable",
        explanation: "Fiber-optic cables use light to transmit data through glass or plastic cores.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Transmission Media", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What is the purpose of the twisting in twisted-pair cables?",
        options: ["To reduce electromagnetic interference (crosstalk)", "To increase flexibility", "To decrease the cost of manufacturing", "To allow light to travel faster"],
        correctAnswer: "To reduce electromagnetic interference (crosstalk)",
        explanation: "Twisting the wires helps cancel out electromagnetic interference from external sources and neighboring pairs.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Transmission Media", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is an example of an unguided (wireless) transmission medium?",
        options: ["Radio waves", "Coaxial cable", "UTP", "STP"],
        correctAnswer: "Radio waves",
        explanation: "Unguided media transport electromagnetic waves without using a physical conductor (e.g., radio, microwave, infrared).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Multiplexing", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which multiplexing technique assigns different frequency ranges to different signals over a single medium?",
        options: ["FDM (Frequency-Division Multiplexing)", "TDM (Time-Division Multiplexing)", "WDM (Wavelength-Division Multiplexing)", "CDM (Code-Division Multiplexing)"],
        correctAnswer: "FDM (Frequency-Division Multiplexing)",
        explanation: "FDM divides the bandwidth of a channel into several distinct frequency bands.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Multiplexing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which multiplexing technique is specifically used to combine optical signals (light) onto a single fiber?",
        options: ["WDM (Wavelength-Division Multiplexing)", "FDM", "TDM", "STDM"],
        correctAnswer: "WDM (Wavelength-Division Multiplexing)",
        explanation: "WDM is conceptually the same as FDM but used for optical signals.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Multiplexing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In which type of TDM are time slots allocated dynamically on demand, rather than being fixed for every channel?",
        options: ["Statistical TDM", "Synchronous TDM", "Asynchronous TDM", "Frequency TDM"],
        correctAnswer: "Statistical TDM",
        explanation: "Statistical TDM allocates time slots dynamically based on demand to improve efficiency.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Switching", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which switching technique establishes a dedicated physical path between the sender and receiver for the duration of the communication?",
        options: ["Circuit Switching", "Packet Switching", "Message Switching", "Virtual Switching"],
        correctAnswer: "Circuit Switching",
        explanation: "Circuit switching establishes a dedicated path, similar to traditional telephone networks.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Switching", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In packet switching, how is data transmitted?",
        options: ["Divided into small blocks called packets", "As a single continuous stream", "Via a dedicated physical path", "By waiting for the entire message to be received before forwarding"],
        correctAnswer: "Divided into small blocks called packets",
        explanation: "In packet switching, the message is divided into discrete packets that are routed independently.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Switching", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What is the primary drawback of message switching?",
        options: ["It requires large storage capacity at each intermediate node", "It is only suitable for voice calls", "It cannot route data dynamically", "It uses too much bandwidth"],
        correctAnswer: "It requires large storage capacity at each intermediate node",
        explanation: "Message switching (store-and-forward) requires nodes to store the entire message before forwarding it.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The Data Link Layer is conceptually divided into two sublayers. What are they?",
        options: ["LLC and MAC", "TCP and UDP", "IP and ARP", "Physical and Network"],
        correctAnswer: "LLC and MAC",
        explanation: "The Data Link Layer is divided into Logical Link Control (LLC) and Media Access Control (MAC).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What is the primary purpose of framing at the Data Link Layer?",
        options: ["To separate the continuous stream of bits into manageable units", "To compress the data", "To encrypt the data", "To route the data to the correct network"],
        correctAnswer: "To separate the continuous stream of bits into manageable units",
        explanation: "Framing organizes the raw bit stream into discrete, identifiable frames for reliable transmission.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In bit-oriented framing, what is 'bit stuffing' used for?",
        options: ["To prevent data from being accidentally interpreted as a flag pattern", "To increase the speed of transmission", "To perform error correction", "To compress the frame size"],
        correctAnswer: "To prevent data from being accidentally interpreted as a flag pattern",
        explanation: "Bit stuffing adds an extra bit (e.g., a 0 after five 1s) so the data payload doesn't mimic the start/end flag.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Error Detection", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which error detection method involves appending a single bit to ensure the total number of 1s is either even or odd?",
        options: ["Parity Check", "Checksum", "CRC", "Hamming Code"],
        correctAnswer: "Parity Check",
        explanation: "A parity bit is added to make the number of 1s in a set of bits either even or odd.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Error Detection", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which error detection technique uses polynomial division to generate a remainder appended to the frame?",
        options: ["CRC (Cyclic Redundancy Check)", "VRC", "LRC", "Checksum"],
        correctAnswer: "CRC (Cyclic Redundancy Check)",
        explanation: "CRC uses binary division and polynomial arithmetic to detect errors.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Error Detection", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which technique is primarily used in the Internet Protocol (IP) for error detection in headers?",
        options: ["Checksum", "CRC", "Parity Check", "Hamming Code"],
        correctAnswer: "Checksum",
        explanation: "The Internet uses checksums (e.g., 16-bit one's complement arithmetic) for header error detection.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Error Correction", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "What is Forward Error Correction (FEC)?",
        options: ["Correcting errors automatically at the receiver without requesting retransmission", "Requesting the sender to retransmit the frame", "Dropping the frame and ignoring the error", "Sending an ACK for the corrupted frame"],
        correctAnswer: "Correcting errors automatically at the receiver without requesting retransmission",
        explanation: "FEC uses redundant bits (like Hamming codes) to detect and correct errors on the fly.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Flow Control", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What is the main goal of flow control in the Data Link Layer?",
        options: ["To prevent a fast sender from overwhelming a slow receiver", "To route packets securely", "To detect transmission errors", "To manage multiple access to a shared medium"],
        correctAnswer: "To prevent a fast sender from overwhelming a slow receiver",
        explanation: "Flow control restricts the amount of data the sender can transmit before waiting for acknowledgment.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Flow Control", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In the Stop-and-Wait protocol, what does the sender do after transmitting a frame?",
        options: ["Waits for an acknowledgment (ACK) before sending the next frame", "Sends the next frame immediately", "Waits for a NAK before retransmitting", "Closes the connection"],
        correctAnswer: "Waits for an acknowledgment (ACK) before sending the next frame",
        explanation: "Stop-and-Wait requires the sender to pause and wait for an ACK for every single frame sent.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Flow Control", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which sliding window protocol requires the sender to retransmit ONLY the specific frame that was lost or corrupted?",
        options: ["Selective Repeat ARQ", "Go-Back-N ARQ", "Stop-and-Wait ARQ", "Sliding Window ARQ"],
        correctAnswer: "Selective Repeat ARQ",
        explanation: "Selective Repeat ARQ only retransmits the frames that actually failed, increasing efficiency.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Flow Control", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In Go-Back-N ARQ, if frame 3 is lost but frames 4 and 5 reach the receiver, what does the receiver do?",
        options: ["Discards frames 4 and 5, expecting the sender to resend from frame 3", "Accepts frames 4 and 5 and sends a NAK for 3", "Stores frames 4 and 5 in a buffer", "Acknowledges frame 5 directly"],
        correctAnswer: "Discards frames 4 and 5, expecting the sender to resend from frame 3",
        explanation: "Go-Back-N discards out-of-order frames. The sender must go back and retransmit N frames starting from the lost one.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Multiple Access", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In Pure ALOHA, when does a station transmit data?",
        options: ["Whenever it has data to send, without checking the channel", "Only at the beginning of a time slot", "After sensing the channel is idle", "When it receives a token"],
        correctAnswer: "Whenever it has data to send, without checking the channel",
        explanation: "Pure ALOHA allows stations to transmit immediately whenever they have data, leading to high collision rates.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Multiple Access", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What modification did Slotted ALOHA introduce to improve efficiency over Pure ALOHA?",
        options: ["Stations must wait for the beginning of a fixed time slot to transmit", "Stations sense the carrier before transmitting", "Stations use exponential backoff", "Stations transmit simultaneously on different frequencies"],
        correctAnswer: "Stations must wait for the beginning of a fixed time slot to transmit",
        explanation: "Slotted ALOHA reduces collisions by forcing stations to transmit only at the start of synchronized time slots.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What is the core principle of CSMA (Carrier Sense Multiple Access)?",
        options: ["Listen before you talk", "Transmit immediately and handle collisions later", "Wait for a token before transmitting", "Use a central controller to assign slots"],
        correctAnswer: "Listen before you talk",
        explanation: "CSMA requires a station to sense the medium (listen) for carrier signals before attempting to transmit.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CD", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In CSMA/CD, what happens if a collision is detected during transmission?",
        options: ["The transmission is aborted, a jam signal is sent, and stations wait a random backoff time", "The transmission continues but at a lower speed", "The receiver fixes the collision using error correction", "The token is passed to the next station"],
        correctAnswer: "The transmission is aborted, a jam signal is sent, and stations wait a random backoff time",
        explanation: "CSMA/CD (Collision Detection) aborts transmission immediately upon collision and uses binary exponential backoff.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CA", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which multiple access protocol is primarily used in Wireless LANs (802.11) because collision detection is difficult?",
        options: ["CSMA/CA", "CSMA/CD", "Token Ring", "Slotted ALOHA"],
        correctAnswer: "CSMA/CA",
        explanation: "CSMA/CA (Collision Avoidance) is used in wireless networks because a station cannot easily listen while transmitting.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In CSMA/CA, what is the purpose of RTS (Request To Send) and CTS (Clear To Send) frames?",
        options: ["To solve the hidden terminal problem", "To synchronize clocks between stations", "To encrypt the payload", "To dynamically allocate IP addresses"],
        correctAnswer: "To solve the hidden terminal problem",
        explanation: "RTS/CTS exchange reserves the channel and alerts hidden terminals to hold off transmission.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What is the standard size of an Ethernet MAC address?",
        options: ["48 bits (6 bytes)", "32 bits (4 bytes)", "64 bits (8 bytes)", "128 bits (16 bytes)"],
        correctAnswer: "48 bits (6 bytes)",
        explanation: "A MAC address is a 48-bit flat address usually written in hexadecimal.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In an Ethernet frame, what is the purpose of the 8-byte Preamble?",
        options: ["To synchronize the receiver's clock with the sender's clock", "To specify the MAC address of the destination", "To detect errors in the payload", "To indicate the IP version being used"],
        correctAnswer: "To synchronize the receiver's clock with the sender's clock",
        explanation: "The preamble contains alternating 1s and 0s to allow receivers to synchronize their clocks.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What does the 'T' in 10Base-T stand for?",
        options: ["Twisted Pair", "Thick coaxial", "Thin coaxial", "Token ring"],
        correctAnswer: "Twisted Pair",
        explanation: "In Ethernet standards, 'T' stands for unshielded twisted pair (UTP) cable.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What topology is logically used by standard 10Base-T Ethernet connected via a hub?",
        options: ["Star topology", "Bus topology", "Ring topology", "Mesh topology"],
        correctAnswer: "Star topology",
        explanation: "10Base-T physical layout is a star (with a central hub), though logically it operates as a shared bus.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Connecting Devices", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which device operates at the Physical layer and simply regenerates the signal to extend the network length?",
        options: ["Repeater", "Bridge", "Switch", "Router"],
        correctAnswer: "Repeater",
        explanation: "A repeater receives a signal, regenerates it, and transmits it, without inspecting MAC or IP addresses.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Connecting Devices", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "A bridge operates at which layer(s) of the OSI model?",
        options: ["Physical and Data Link layers", "Network layer only", "Physical layer only", "Transport and Network layers"],
        correctAnswer: "Physical and Data Link layers",
        explanation: "Bridges read the MAC address (Data Link layer) to filter traffic, while also regenerating the signal (Physical layer).",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Connecting Devices", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "How does a transparent bridge learn where host stations are located?",
        options: ["By examining the source MAC address of incoming frames", "By requesting IP configurations from a DHCP server", "By receiving manual inputs from the network administrator", "By broadcasting an ARP request every 5 seconds"],
        correctAnswer: "By examining the source MAC address of incoming frames",
        explanation: "Transparent bridges self-learn by looking at the source MAC address of incoming frames and associating it with the arrival port.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Connecting Devices", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What problem is solved by the Spanning Tree Protocol (STP) in bridged networks?",
        options: ["Broadcast storms caused by loops", "IP address depletion", "Collisions on a bus topology", "Signal attenuation over long cables"],
        correctAnswer: "Broadcast storms caused by loops",
        explanation: "STP prevents loops in networks with redundant bridges, which would otherwise cause endless broadcast storms.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Switches", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "An Ethernet switch is essentially a fast, multi-port version of a:",
        options: ["Bridge", "Hub", "Repeater", "Router"],
        correctAnswer: "Bridge",
        explanation: "A switch is basically a multi-interface bridge that forwards and filters frames based on MAC addresses.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Switches", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "What is 'cut-through' switching?",
        options: ["Forwarding the frame as soon as the destination MAC address is read, without waiting for the whole frame", "Storing the entire frame to check for errors before forwarding", "Dropping frames that exceed a certain size", "Sending frames on all ports to guarantee delivery"],
        correctAnswer: "Forwarding the frame as soon as the destination MAC address is read, without waiting for the whole frame",
        explanation: "Cut-through switching reduces latency by beginning transmission before the entire frame has been received.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Addressing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "A MAC address is considered a 'flat' address. What does this mean in terms of mobility?",
        options: ["It is portable and remains the same even if the device moves to a different network", "It changes based on the geographic location of the device", "It is assigned dynamically by the router", "It depends on the hierarchical structure of the IP network"],
        correctAnswer: "It is portable and remains the same even if the device moves to a different network",
        explanation: "A flat MAC address is burned into the hardware and moves with the adapter, providing portability.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "IEEE 802.11 is the standard for which type of network?",
        options: ["Wireless LAN (Wi-Fi)", "Ethernet LAN", "Bluetooth PAN", "Token Ring LAN"],
        correctAnswer: "Wireless LAN (Wi-Fi)",
        explanation: "The IEEE 802.11 standard defines the MAC and Physical layer specifications for Wireless LANs.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What does the 802.11 MAC use to reduce the chance of collisions when waiting for an idle channel?",
        options: ["Random backoff time", "Fixed time slots", "Token passing", "Sequential polling"],
        correctAnswer: "Random backoff time",
        explanation: "After sensing the channel is idle for a DIFS period, 802.11 uses a random backoff to avoid simultaneous transmissions.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Why is an explicit ACK required in 802.11 wireless networks?",
        options: ["Because the sender cannot reliably detect collisions (Hidden Terminal Problem)", "Because the data link layer must guarantee delivery to the transport layer", "Because it uses a token passing mechanism", "To negotiate the encryption key"],
        correctAnswer: "Because the sender cannot reliably detect collisions (Hidden Terminal Problem)",
        explanation: "Due to the hidden terminal problem, collision detection doesn't work, so an explicit ACK is needed to confirm receipt.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Point-to-Point", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which protocol is commonly used over direct point-to-point links (like dial-up or leased lines) and includes LCP and NCP components?",
        options: ["PPP (Point-to-Point Protocol)", "Ethernet", "HDLC", "CSMA/CD"],
        correctAnswer: "PPP (Point-to-Point Protocol)",
        explanation: "PPP is widely used for point-to-point links and handles link establishment (LCP) and network protocol negotiation (NCP).",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Point-to-Point", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Does the standard Point-to-Point Protocol (PPP) guarantee error correction or in-order delivery?",
        options: ["No, it relegates error recovery and ordering to higher layers", "Yes, it guarantees perfect reliability", "Yes, but only for IPv6 traffic", "No, it drops corrupted frames without notifying anyone"],
        correctAnswer: "No, it relegates error recovery and ordering to higher layers",
        explanation: "PPP non-requirements state that error recovery, flow control, and data reordering are left to higher layers.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Bluetooth", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Bluetooth operates as a low-power wireless networking technology primarily designed as a:",
        options: ["Personal Area Network (PAN)", "Wide Area Network (WAN)", "Metropolitan Area Network (MAN)", "Storage Area Network (SAN)"],
        correctAnswer: "Personal Area Network (PAN)",
        explanation: "Bluetooth is a short-range, low-power technology forming small Personal Area Networks (PANs).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: ATM", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Asynchronous Transfer Mode (ATM) uses fixed-length packets. What are these packets called?",
        options: ["Cells", "Frames", "Datagrams", "Segments"],
        correctAnswer: "Cells",
        explanation: "In ATM, data is divided into fixed 53-byte packets called cells.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: ATM", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Why does ATM use small, fixed-length 53-byte cells?",
        options: ["To minimize delay variance for time-sensitive traffic like voice", "To maximize throughput for large file transfers", "Because hardware at the time couldn't handle larger packets", "To be compatible with Ethernet framing"],
        correctAnswer: "To minimize delay variance for time-sensitive traffic like voice",
        explanation: "Small, fixed-length cells prevent large data packets from monopolizing the line, ensuring short delays for voice/video.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Multiplexing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In Time Division Multiplexing (TDM), how is the channel divided?",
        options: ["By allocating specific time slots to different users", "By assigning different frequency bands to users", "By assigning a unique mathematical code to each user", "By using different light wavelengths"],
        correctAnswer: "By allocating specific time slots to different users",
        explanation: "TDM divides the channel capacity into time slots, given sequentially to different senders.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Media Access Control", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In a Token Ring network, what is required for a station to transmit data?",
        options: ["It must capture the free token circulating on the ring", "It must sense the channel is idle for a DIFS period", "It must send an RTS packet", "It must win a random backoff contest"],
        correctAnswer: "It must capture the free token circulating on the ring",
        explanation: "Token Ring networks control access by passing a special frame (token). A station can only transmit if it holds the token.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Media Access Control", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "What is a primary disadvantage of Channel Partitioning MAC protocols (like TDMA/FDMA) at low traffic loads?",
        options: ["Bandwidth is wasted because idle slots/frequencies cannot be used by active nodes", "They suffer from excessive collisions", "They require complex exponential backoff algorithms", "They cannot support voice traffic"],
        correctAnswer: "Bandwidth is wasted because idle slots/frequencies cannot be used by active nodes",
        explanation: "At low loads, channel partitioning wastes bandwidth because a single active node only gets its 1/N fraction of the channel.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Transmission Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which type of coaxial cable is commonly used for thick Ethernet (10Base5)?",
        options: ["Thicknet (RG-8)", "Thinnet (RG-58)", "CAT 5e", "CAT 6"],
        correctAnswer: "Thicknet (RG-8)",
        explanation: "10Base5 (Thick Ethernet) utilizes a thick coaxial cable, often referred to as Thicknet or RG-8.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which sublayer of the Data Link layer provides an interface to the network layer protocols?",
        options: ["LLC (Logical Link Control)", "MAC (Media Access Control)", "PHY (Physical)", "IP (Internet Protocol)"],
        correctAnswer: "LLC (Logical Link Control)",
        explanation: "The LLC sublayer acts as an interface between the MAC sublayer and the network layer.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What is the function of the flag bytes in byte-oriented framing protocols like HDLC?",
        options: ["To mark the beginning and end of a frame", "To hold the destination MAC address", "To provide the CRC checksum", "To define the protocol type of the payload"],
        correctAnswer: "To mark the beginning and end of a frame",
        explanation: "Flag bytes (usually 01111110) are used as delimiters to mark where a frame starts and stops.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Multiple Access", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Why is Code Division Multiple Access (CDMA) unique compared to TDMA and FDMA?",
        options: ["It allows all users to transmit at the same time using the same frequency band by using unique codes", "It uses different frequencies for different users", "It relies on a central token", "It is only used in wired Ethernet LANs"],
        correctAnswer: "It allows all users to transmit at the same time using the same frequency band by using unique codes",
        explanation: "CDMA assigns a unique code to each user, allowing simultaneous transmission over the same frequency.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In the 802.11 architecture, a Basic Service Set (BSS) typically contains wireless stations and a central base station known as:",
        options: ["Access Point (AP)", "Switch", "Bridge", "Router"],
        correctAnswer: "Access Point (AP)",
        explanation: "The central base station in an infrastructure-mode 802.11 BSS is an Access Point (AP).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Fast Ethernet (100Base-T) operates at what transmission speed?",
        options: ["100 Mbps", "10 Mbps", "1000 Mbps", "1 Gbps"],
        correctAnswer: "100 Mbps",
        explanation: "Fast Ethernet specifies a transmission speed of 100 Megabits per second.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What is the primary advantage of a fully switched Ethernet network over a hub-based network?",
        options: ["It eliminates collisions by providing dedicated bandwidth to each port", "It requires less cable", "It extends the collision domain", "It uses a ring topology"],
        correctAnswer: "It eliminates collisions by providing dedicated bandwidth to each port",
        explanation: "A switch forwards frames only to the necessary port, creating a separate collision domain per port and effectively eliminating collisions in full-duplex mode.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Devices", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which device is primarily used to connect two different types of networks that use entirely different protocols?",
        options: ["Gateway", "Bridge", "Hub", "Repeater"],
        correctAnswer: "Gateway",
        explanation: "A gateway acts as a translator between two networks that use different protocols or architectures.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Network Topologies", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In a Ring topology, how does data travel?",
        options: ["In one direction around the ring from device to device", "Directly from the center hub to all devices", "Simultaneously on all links", "Through a central backbone cable"],
        correctAnswer: "In one direction around the ring from device to device",
        explanation: "In a traditional ring topology, a signal is passed along the ring in one direction from device to device until it reaches its destination.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Signals", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "What represents a digital signal that has only two discrete voltage levels?",
        options: ["Binary signal", "Analog wave", "Sine wave", "Continuous signal"],
        correctAnswer: "Binary signal",
        explanation: "A digital signal uses discrete values. A binary signal specifically uses two levels (0 and 1).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Modems", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "What function does a Modem perform?",
        options: ["Modulates digital data into analog signals and demodulates analog signals into digital data", "Routes IP packets across the internet", "Connects multiple computers in a LAN", "Checks for CRC errors in frames"],
        correctAnswer: "Modulates digital data into analog signals and demodulates analog signals into digital data",
        explanation: "The term MODEM stands for MOdulator-DEModulator, converting between digital and analog signals.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Physical Layer", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is a physical layer standard that defines the electrical and mechanical properties of a serial interface?",
        options: ["RS-232", "IPv4", "CSMA/CD", "HDLC"],
        correctAnswer: "RS-232",
        explanation: "RS-232 is a standard for serial communication transmission of data at the Physical layer.",
        difficultyLevel: "HARD"
    }
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    let inserted = 0, skipped = 0;
    for (let q of questions) {
        q.createdAt = new Date();
        const exists = await db.collection('questions').findOne({ subjectId: q.subjectId, questionText: q.questionText });
        if (!exists) { await db.collection('questions').insertOne(q); inserted++; }
        else skipped++;
    }
    const total = await db.collection('questions').countDocuments({ subjectId });
    console.log(`\n✅ AWAMU YA KWANZA (Maswali 80 ya ziada) IMEKAMILIKA!`);
    console.log(`   Maswali mapya: ${inserted} | Yaliyorukwa: ${skipped} | JUMLA: ${total}`);
  } finally { await client.close(); }
}
run().catch(console.dir);
