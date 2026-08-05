const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

const questions = [
    // NODES AND LINKS
    {
        subjectId, moduleName: "Unit 2: Nodes and Links", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, communication at the data-link layer is _______.",
        options: ["Node-to-node", "End-to-end", "Host-to-host", "Port-to-port"],
        correctAnswer: "Node-to-node",
        explanation: "Notes: 'Communication at the data-link layer is node-to-node.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Nodes and Links", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe that LANs and WANs in the Internet are connected by _______. These are referred to as nodes, and the networks in between are links.",
        options: ["Routers", "Hubs", "Modems", "Repeaters"],
        correctAnswer: "Routers",
        explanation: "Notes: 'These LANs and WANs are connected by routers. It is customary to refer to the two end hosts and the routers as nodes and the networks in between as links.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Nodes and Links", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the data-link layer is located between the physical layer and the _______ layer.",
        options: ["Network", "Transport", "Session", "Application"],
        correctAnswer: "Network",
        explanation: "Notes: 'The data-link layer is located between the physical and the network layers.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Nodes and Links", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the data-link layer of the sending node needs to _______ the datagram received from the network in a frame.",
        options: ["Encapsulate", "Decapsulate", "Fragment", "Encrypt"],
        correctAnswer: "Encapsulate",
        explanation: "Notes: 'The data-link layer of the sending node needs to encapsulate the datagram received from the network in a frame.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Nodes and Links", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, which node ONLY needs to encapsulate (not decapsulate)?",
        options: ["Source host", "Destination host", "Intermediate router", "Switch"],
        correctAnswer: "Source host",
        explanation: "Notes: 'The data-link layer of the source host needs only to encapsulate, the destination host needs to decapsulate, but each intermediate node needs to both.'",
        difficultyLevel: "MEDIUM"
    },
    // LINK TYPES
    {
        subjectId, moduleName: "Unit 2: Link Types", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe two types of links: a _______ link (dedicated to two devices) and a broadcast link (shared between several pairs of devices).",
        options: ["Point-to-point", "Multicast", "Unicast", "Token-ring"],
        correctAnswer: "Point-to-point",
        explanation: "Notes: 'In a point-to-point link, the link is dedicated to the two devices; in a broadcast link, the link is shared between several pairs of devices.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Link Types", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the data-link layer is divided into two sub-layers: Data Link Control (DLC) and _______.",
        options: ["Media Access Control (MAC)", "Network Access Control (NAC)", "Physical Layer Control (PLC)", "Error Control Layer (ECL)"],
        correctAnswer: "Media Access Control (MAC)",
        explanation: "Notes: 'We can divide the data-link layer into two sub layers: data link control (DLC) and media access control (MAC).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Link Types", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the DLC sub-layer deals with issues common to both point-to-point and broadcast links, while the MAC sub-layer deals only with issues specific to _______ links.",
        options: ["Broadcast", "Point-to-point", "Dedicated", "Fiber"],
        correctAnswer: "Broadcast",
        explanation: "Notes: 'The data link control sub layer deals with all issues common to both point-to-point and broadcast links; the media access control sub layer deals only with issues specific to broadcast links.'",
        difficultyLevel: "HARD"
    },
    // LINK-LAYER ADDRESSING
    {
        subjectId, moduleName: "Unit 2: Link-Layer Addressing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that a link-layer address is sometimes called a link address, sometimes a physical address, and sometimes a _______ address.",
        options: ["MAC", "IP", "Port", "Domain"],
        correctAnswer: "MAC",
        explanation: "Notes: 'A link-layer address is sometimes called a link address, sometimes a physical address, and sometimes a MAC address.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Link-Layer Addressing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the link-layer addresses in a frame header are changed every time the frame moves from one _______ to another.",
        options: ["Link", "Router", "Network", "Protocol"],
        correctAnswer: "Link",
        explanation: "Notes: 'These two addresses are changed every time the frame moves from one link to another.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Link-Layer Addressing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes define three types of link-layer addresses. Which of the following means one-to-all communication?",
        options: ["Broadcast", "Unicast", "Multicast", "Anycast"],
        correctAnswer: "Broadcast",
        explanation: "Notes: 'Broadcasting means one-to-all communication. A frame with a destination broadcast address is sent to all entities in the link.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Link-Layer Addressing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, _______ means one-to-one communication, where each host or router interface is assigned a unique address.",
        options: ["Unicast", "Multicast", "Broadcast", "Anycast"],
        correctAnswer: "Unicast",
        explanation: "Notes: 'Unicast Address: Each host or each interface of a router is assigned a unicast address. Unicasting means one-to-one communication.'",
        difficultyLevel: "EASY"
    },
    // ARP
    {
        subjectId, moduleName: "Unit 2: ARP", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that the IP address of the next node is NOT enough to move a frame through a link; we also need the _______ address of the next node.",
        options: ["Link-layer (MAC)", "Port", "Domain", "Network"],
        correctAnswer: "Link-layer (MAC)",
        explanation: "Notes: 'The IP address of the next node is not helpful in moving a frame through a link; we need the link-layer address of the next node. This is when ARP becomes helpful.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: ARP", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, ARP (Address Resolution Protocol) accepts an _______ address from the IP protocol and maps it to the corresponding link-layer address.",
        options: ["IP", "MAC", "Port", "Physical"],
        correctAnswer: "IP",
        explanation: "Notes: 'ARP accepts an IP address from the IP protocol, maps the address to the corresponding link-layer address, and passes it to the data-link layer.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: ARP", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe that an ARP request packet is broadcast over the link because the sender does not know the _______ of the receiver.",
        options: ["Link-layer address", "IP address", "Port number", "Domain name"],
        correctAnswer: "Link-layer address",
        explanation: "Notes: 'Because the sender does not know the link-layer address of the receiver, the query is broadcast over the link using the link-layer broadcast address.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: ARP", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, when a host or router receives an ARP request, only the _______ recognizes its IP address and sends back an ARP response packet.",
        options: ["Intended recipient", "All devices on the network", "The router only", "The switch only"],
        correctAnswer: "Intended recipient",
        explanation: "Notes: 'Every host or router on the network receives and processes the ARP request packet, but only the intended recipient recognizes its IP address and sends back an ARP response packet.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: ARP", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In the ARP packet format, the hardware type field defines the type of the link-layer protocol. Ethernet is given the type _______.",
        options: ["1", "0", "255", "0x0800"],
        correctAnswer: "1",
        explanation: "Notes: 'The hardware type field defines the type of the link-layer protocol; Ethernet is given the type 1.'",
        difficultyLevel: "HARD"
    },
    // FORWARD ERROR CORRECTION / FEC
    {
        subjectId, moduleName: "Unit 2: FEC", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that retransmission of corrupted packets is not useful for real-time multimedia transmission because it creates an unacceptable _______.",
        options: ["Delay", "Cost", "Bandwidth usage", "CPU load"],
        correctAnswer: "Delay",
        explanation: "Notes: 'Retransmission of corrupted and lost packets is not useful for real-time multimedia transmission because it creates an unacceptable delay.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: FEC", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that to detect 's' errors, the minimum Hamming distance should be dmin = _______.",
        options: ["s + 1", "2s + 1", "s - 1", "2s"],
        correctAnswer: "s + 1",
        explanation: "Notes: 'To detect s errors, the minimum Hamming distance should be dmin = s + 1.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: FEC", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, to correct 't' errors using Hamming distance, we need dmin = _______.",
        options: ["2t + 1", "t + 1", "2t", "t - 1"],
        correctAnswer: "2t + 1",
        explanation: "Notes: 'It can be shown that to detect t errors, we need to have dmin = 2t + 1.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: FEC", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe chunk interleaving as an FEC technique where each packet is divided into chunks, so that if a packet is lost, we miss only _______ chunk in each packet.",
        options: ["One", "All", "Two", "Half"],
        correctAnswer: "One",
        explanation: "Notes: 'If the packet is lost, we miss only one chunk in each packet, which is normally acceptable in multimedia communication.'",
        difficultyLevel: "HARD"
    },
    // CHECKSUM (PDF 5 version)
    {
        subjectId, moduleName: "Unit 2: Checksum", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that at the checksum destination/receiver, if the new checksum created from the message and sent checksum is all _______, the message is accepted.",
        options: ["0s", "1s", "255s", "Random"],
        correctAnswer: "0s",
        explanation: "Notes: 'At the destination, the checker creates a new checksum from the combination of the message and sent checksum. If the new checksum is all 0s, the message is accepted; otherwise, the message is discarded.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Checksum", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes note that checksum in the Internet is mostly used at the _______ layer rather than the data-link layer.",
        options: ["Network and transport", "Physical and data-link", "Session and application", "Data-link and physical"],
        correctAnswer: "Network and transport",
        explanation: "Notes: 'In the Internet, the checksum technique is mostly used at the network and transport layer rather than the data-link layer.'",
        difficultyLevel: "HARD"
    },
    // DLC PROTOCOLS
    {
        subjectId, moduleName: "Unit 2: DLC Protocols", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Stop-and-Wait Protocol as using both _______ and error control, unlike the Simple Protocol which has neither.",
        options: ["Flow control", "Token passing", "Polling", "Channelization"],
        correctAnswer: "Flow control",
        explanation: "Notes: 'Stop-and-Wait protocol uses both flow and error control. Simple protocol has neither flow nor error control.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: DLC Protocols", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in Stop-and-Wait Protocol, to detect corrupted frames, a _______ is added to each data frame.",
        options: ["CRC", "Token", "Flag byte", "Preamble"],
        correctAnswer: "CRC",
        explanation: "Notes: 'To detect corrupted frames, we need to add a CRC to each data frame.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: DLC Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that in Stop-and-Wait, if the timer expires before an acknowledgment arrives, the sender _______.",
        options: ["Resends the previous frame", "Sends the next frame", "Terminates the connection", "Requests a new connection"],
        correctAnswer: "Resends the previous frame",
        explanation: "Notes: 'If the timer expires, the sender resends the previous frame, assuming that the frame was either lost or corrupted.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: DLC Protocols", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe piggybacking as making communication more efficient by combining data in one direction with the _______ in the other direction.",
        options: ["Acknowledgment", "Token", "Error signal", "NAK frame"],
        correctAnswer: "Acknowledgment",
        explanation: "Notes: 'The data in one direction is piggybacked with the acknowledgment in the other direction.'",
        difficultyLevel: "MEDIUM"
    },
    // HDLC
    {
        subjectId, moduleName: "Unit 2: HDLC", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes define HDLC as a _______ protocol for communication over point-to-point and multipoint links.",
        options: ["Bit-oriented", "Character-oriented", "Byte-oriented", "Frame-oriented"],
        correctAnswer: "Bit-oriented",
        explanation: "Notes: 'High-level Data Link Control (HDLC) is a bit-oriented protocol for communication over point-to-point and multipoint links.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: HDLC", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, HDLC defines three types of frames. Which type is used to carry data-link user data?",
        options: ["I-frames (Information frames)", "S-frames (Supervisory frames)", "U-frames (Unnumbered frames)", "F-frames (Flag frames)"],
        correctAnswer: "I-frames (Information frames)",
        explanation: "Notes: 'I-frames are used to data-link user data and control information relating to user data (piggybacking).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: HDLC", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe S-frames (Supervisory frames) in HDLC as used only to transport _______ information.",
        options: ["Control", "User data", "Management", "Address"],
        correctAnswer: "Control",
        explanation: "Notes: 'S-frames are used only to transport control information.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: HDLC", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In HDLC, the FCS (Frame Check Sequence) field can contain either a 2- or 4-byte _______.",
        options: ["CRC", "Flag", "Token", "ACK"],
        correctAnswer: "CRC",
        explanation: "Notes: 'FCS field. The frame check sequence (FCS) is the HDLC error detection field. It can contain either a 2- or 4-byte CRC.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: HDLC", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in HDLC's Normal Response Mode (NRM), there is one _______ station and multiple secondary stations.",
        options: ["Primary", "Master", "Control", "Host"],
        correctAnswer: "Primary",
        explanation: "Notes: 'We have one primary station and multiple secondary stations. A primary station can send commands; a secondary station can only respond.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: HDLC", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that in HDLC's ABM (Asynchronous Balanced Mode), each station can function as both a primary and a _______, acting as peers.",
        options: ["Secondary", "Master", "Hub", "Bridge"],
        correctAnswer: "Secondary",
        explanation: "Notes: 'In ABM, the configuration is balanced. The link is point-to-point, and each station can function as a primary and a secondary (acting as peers).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: HDLC", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, U-frames (Unnumbered frames) in HDLC are reserved for _______ management.",
        options: ["System", "Data", "Error", "Flow"],
        correctAnswer: "System",
        explanation: "Notes: 'U-frames are reserved for system management. Information carried by U-frames is intended for managing the link itself.'",
        difficultyLevel: "HARD"
    },
    // PPP
    {
        subjectId, moduleName: "Unit 2: PPP", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe PPP (Point-to-Point Protocol) as one of the most common protocols for _______ access, widely used by home Internet users.",
        options: ["Point-to-point", "Broadcast", "Multipoint", "Token-ring"],
        correctAnswer: "Point-to-point",
        explanation: "Notes: 'One of the most common protocols for point-to-point access is the Point-to-Point Protocol (PPP). Today, millions of Internet users use PPP.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: PPP", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, PPP does NOT provide _______. A sender can send several frames without concern about overwhelming the receiver.",
        options: ["Flow control", "Error detection", "Authentication", "Framing"],
        correctAnswer: "Flow control",
        explanation: "Notes: 'PPP does not provide flow control. A sender can send several frames one after another with no concern about overwhelming the receiver.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: PPP", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that a PPP frame starts and ends with a 1-byte flag with the bit pattern _______.",
        options: ["01111110", "10000001", "11111111", "00000000"],
        correctAnswer: "01111110",
        explanation: "Notes: 'Flag. A PPP frame starts and ends with a 1-byte flag with the bit pattern 01111110.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: PPP", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the PPP address field is a constant value set to _______ (broadcast address).",
        options: ["11111111", "00000000", "01111110", "10101010"],
        correctAnswer: "11111111",
        explanation: "Notes: 'Address. The address field in this protocol is a constant value and set to 11111111 (broadcast address).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: PPP", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the PPP payload field has a default maximum of _______ bytes, but this can be changed during negotiation.",
        options: ["1500", "1024", "512", "4096"],
        correctAnswer: "1500",
        explanation: "Notes: 'The data field is a sequence of bytes with the default of a maximum of 1500 bytes; but this can be changed during negotiation.'",
        difficultyLevel: "HARD"
    },
    // RANDOM ACCESS / MAC
    {
        subjectId, moduleName: "Unit 2: MAC Access Methods", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe random-access methods as also called _______ methods because stations compete with one another to access the medium.",
        options: ["Contention", "Controlled", "Scheduled", "Token-based"],
        correctAnswer: "Contention",
        explanation: "Notes: 'Stations compete with one another to access the medium. That is why these methods are also called contention methods.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: MAC Access Methods", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in random access, CSMA (Carrier Sense Multiple Access) improved on ALOHA by forcing the station to _______ before transmitting.",
        options: ["Sense (listen to) the medium", "Request a token", "Poll the master", "Reserve a time slot"],
        correctAnswer: "Sense (listen to) the medium",
        explanation: "Notes: 'The method was improved with the addition of a procedure that forces the station to sense the medium before transmitting. This was called carrier sense multiple access (CSMA).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: MAC Access Methods", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that in controlled access, a station cannot send unless it has been _______ by other stations.",
        options: ["Authorized", "Polled", "Tokenized", "Scheduled"],
        correctAnswer: "Authorized",
        explanation: "Notes: 'In controlled access, the stations consult one another to find which station has the right to send. A station cannot send unless it has been authorized by other stations.'",
        difficultyLevel: "EASY"
    },
    // RESERVATION
    {
        subjectId, moduleName: "Unit 2: MAC Access Methods", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In the reservation method described in the notes, if there are N stations, the reservation frame has exactly _______ reservation minislots.",
        options: ["N", "N-1", "2N", "N+1"],
        correctAnswer: "N",
        explanation: "Notes: 'If there are N stations in the system, there are exactly N reservation minislots in the reservation frame. Each minislot belongs to a station.'",
        difficultyLevel: "HARD"
    },
    // POLLING (PDF 5 detailed version)
    {
        subjectId, moduleName: "Unit 2: Polling", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the Select function in Polling as used by the primary device when it has something to _______ to a secondary station.",
        options: ["Send (transmit)", "Receive (poll)", "Acknowledge", "Fragment"],
        correctAnswer: "Send (transmit)",
        explanation: "Notes: 'Select: The select function is used whenever the primary device has something to send. Before sending data, the primary creates and transmits a select (SEL) frame.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Polling", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the Poll function in polling is used by the primary device to _______ transmissions from secondary devices.",
        options: ["Solicit", "Block", "Acknowledge", "Fragment"],
        correctAnswer: "Solicit",
        explanation: "Notes: 'Poll: The poll function is used by the primary device to solicit transmissions from the secondary devices.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Polling", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In polling, when a secondary device has nothing to send, it responds with a _______ frame.",
        options: ["NAK", "ACK", "SEL", "Token"],
        correctAnswer: "NAK",
        explanation: "Notes: 'When the first secondary is approached, it responds either with a NAK frame if it has nothing to send or with data if it does.'",
        difficultyLevel: "MEDIUM"
    },
    // TOKEN PASSING (PDF 5 detailed)
    {
        subjectId, moduleName: "Unit 2: Token Passing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe token passing as organizing stations in a logical _______, where each station has a predecessor and a successor.",
        options: ["Ring", "Star", "Bus", "Tree"],
        correctAnswer: "Ring",
        explanation: "Notes: 'In the token-passing method, the stations in a network are organized in a logical ring. In other words, for each station, there is a predecessor and a successor.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Token Passing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, when a station in token passing has no more data to send, it _______ the token, passing it to the next logical station.",
        options: ["Releases", "Holds", "Discards", "Duplicates"],
        correctAnswer: "Releases",
        explanation: "Notes: 'When the station has no more data to send, it releases the token, passing it to the next logical station in the ring.'",
        difficultyLevel: "EASY"
    },
    // CHANNELIZATION (PDF 5 detailed)
    {
        subjectId, moduleName: "Unit 2: Channelization", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe channelization as sharing available bandwidth in time, frequency, or through _______, among different stations.",
        options: ["Code (CDMA)", "Topology", "Distance", "Voltage"],
        correctAnswer: "Code (CDMA)",
        explanation: "Notes: 'Channelization is a multiple-access method in which the available bandwidth of a link is shared in time, frequency, or through code, among different stations.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Channelization", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that in FDMA, each station is allocated a band to send its data, and the allocated bands are separated from each other by small _______ bands.",
        options: ["Guard", "Data", "Control", "Sync"],
        correctAnswer: "Guard",
        explanation: "Notes: 'To prevent station interferences, the allocated bands are separated from one another by small guard bands.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Channelization", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes distinguish FDMA from FDM: FDMA is an _______ method at the data-link layer, while FDM is a physical layer technique.",
        options: ["Access", "Modulation", "Encryption", "Routing"],
        correctAnswer: "Access",
        explanation: "Notes: 'FDMA is an access method in the data-link layer. FDM is a physical layer technique that combines the loads from low bandwidth channels.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Channelization", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the main problem with TDMA is achieving _______ between different stations.",
        options: ["Synchronization", "Encryption", "Routing", "Framing"],
        correctAnswer: "Synchronization",
        explanation: "Notes: 'The main problem with TDMA lies in achieving synchronization between the different stations.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Channelization", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that in TDMA, to compensate for propagation delays, _______ times and preamble bits are inserted at the beginning of each slot.",
        options: ["Guard", "Idle", "Token", "Flag"],
        correctAnswer: "Guard",
        explanation: "Notes: 'To compensate for the delays, we can insert guard times. Synchronization is normally accomplished by having some synchronization bits (preamble bits) at the beginning of each slot.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Channelization", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe CDMA as differing from TDMA in that all stations can send data _______, with no timesharing.",
        options: ["Simultaneously", "In turns", "In time slots", "Via a token"],
        correctAnswer: "Simultaneously",
        explanation: "Notes: 'It differs from TDMA in that all stations can send data simultaneously; there is no timesharing. In CDMA, one channel carries all transmissions simultaneously.'",
        difficultyLevel: "MEDIUM"
    },
    // CONNECTING DEVICES
    {
        subjectId, moduleName: "Unit 2: Connecting Devices", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that hubs operate in the _______ layer, link-layer switches operate in the first two layers, and routers operate in the first three layers.",
        options: ["Physical (first)", "Data link (second)", "Network (third)", "Transport (fourth)"],
        correctAnswer: "Physical (first)",
        explanation: "Notes: 'Hubs today operate in the first layer of the Internet model. Link-layer switches operate in the first two layers. Routers operate in the first three layers.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Connecting Devices", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, a hub forwards a packet from all outgoing ports except the one from which the signal was received, making it effectively a _______ device.",
        options: ["Broadcast", "Unicast", "Multicast", "Routing"],
        correctAnswer: "Broadcast",
        explanation: "Notes: 'The hub forwards the packet from all outgoing ports except the one from which the signal was received. In other words, the frame is broadcast.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Connecting Devices", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that a hub (repeater) has no _______ capability — it does not check link-layer addresses and simply regenerates bits from every port.",
        options: ["Filtering", "Routing", "Switching", "Encrypting"],
        correctAnswer: "Filtering",
        explanation: "Notes: 'A repeater has no filtering capability. They do not have a link-layer address and they do not check the link-layer address of the received frame.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Connecting Devices", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe a link-layer switch as operating in both the physical and the data-link layers, and able to check the _______ addresses contained in the frame.",
        options: ["MAC (source and destination)", "IP", "Port", "Broadcast"],
        correctAnswer: "MAC (source and destination)",
        explanation: "Notes: 'As a link-layer device, the link-layer switch can check the MAC addresses (source and destination) contained in the frame.'",
        difficultyLevel: "EASY"
    },
    // CONNECTIONLESS / CONNECTION-ORIENTED
    {
        subjectId, moduleName: "Unit 2: DLC Protocols", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that in a _______ protocol, frames are sent from one node to the next without any relationship between frames; each frame is independent.",
        options: ["Connectionless", "Connection-oriented", "Token-based", "Sliding window"],
        correctAnswer: "Connectionless",
        explanation: "Notes: 'In a connectionless protocol, frames are sent from one node to the next without any relationship between the frames; each frame is independent.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: DLC Protocols", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in a connection-oriented protocol, the three phases are: setup phase (establish logical connection), transfer phase, and _______ phase.",
        options: ["Teardown", "Acknowledge", "Polling", "Collision"],
        correctAnswer: "Teardown",
        explanation: "Notes: 'A logical connection should first be established between the two nodes (setup phase). After all frames are transmitted (transfer phase), the logical connection is terminated (teardown phase).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Congestion Control", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that congestion control is generally considered an issue at the _______ layer or the transport layer because of its end-to-end nature.",
        options: ["Network", "Data Link", "Physical", "Application"],
        correctAnswer: "Network",
        explanation: "Notes: 'In general, congestion control is considered an issue in the network layer or the transport layer because of its end-to-end nature.'",
        difficultyLevel: "MEDIUM"
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
    console.log(`\n✅ PDF 5 IMEKAMILIKA!`);
    console.log(`   Maswali mapya: ${inserted} | Yaliyorukwa: ${skipped} | JUMLA: ${total}`);
  } finally { await client.close(); }
}
run().catch(console.dir);
