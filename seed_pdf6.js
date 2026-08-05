const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

const questions = [
    // IDEAL MULTIPLE ACCESS PROTOCOL
    {
        subjectId, moduleName: "Unit 2: MAC Access Methods", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the ideal multiple access protocol: when M nodes want to transmit, each can send at an average rate of _______.",
        options: ["R/M", "R×M", "R-M", "R+M"],
        correctAnswer: "R/M",
        explanation: "Notes: 'Ideal Multiple Access Protocol: When M nodes want to transmit, each can send at average rate R/M.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: MAC Access Methods", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the ideal multiple access protocol must be fully _______, meaning no special node coordinates transmissions and no synchronization is needed.",
        options: ["Decentralized", "Centralized", "Token-based", "Polling-based"],
        correctAnswer: "Decentralized",
        explanation: "Notes: 'Ideal Multiple Access Protocol: 3. Fully decentralized: no special node to coordinate transmissions, no synchronization of clocks, slots.'",
        difficultyLevel: "MEDIUM"
    },
    // SLOTTED ALOHA (PDF 6 specific details)
    {
        subjectId, moduleName: "Unit 2: ALOHA", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that in Slotted ALOHA, if a collision occurs, the node retransmits the frame in each subsequent slot with probability _______ until success.",
        options: ["p (some probability)", "1 (always)", "0 (never)", "0.5 (half)"],
        correctAnswer: "p (some probability)",
        explanation: "Notes: 'if collision, node retransmits frame in each subsequent slot with prob. p until success.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: ALOHA", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that Slotted ALOHA's maximum efficiency for many nodes approaches _______ (1/e).",
        options: ["0.37 (37%)", "0.18 (18%)", "0.50 (50%)", "1.00 (100%)"],
        correctAnswer: "0.37 (37%)",
        explanation: "Notes: 'For many nodes, take limit as N goes to infinity, gives 1/e = .37. At best: channel used for useful transmissions 37% of time!'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: ALOHA", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Pure (unslotted) ALOHA has an efficiency of _______, which is even worse than Slotted ALOHA.",
        options: ["0.18 (18%)", "0.37 (37%)", "0.50 (50%)", "0.10 (10%)"],
        correctAnswer: "0.18 (18%)",
        explanation: "Notes: 'Pure Aloha efficiency = 1/(2e) = .18. Even worse!'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: ALOHA", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes note a disadvantage of Slotted ALOHA: unused slots go _______.",
        options: ["Idle (wasted)", "To other nodes", "To the base station", "Back to the pool"],
        correctAnswer: "Idle (wasted)",
        explanation: "Notes: 'TDMA: unused slots go idle. Slotted ALOHA Cons: idle slots.'",
        difficultyLevel: "EASY"
    },
    // CSMA COLLISIONS
    {
        subjectId, moduleName: "Unit 2: CSMA", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that collisions can still occur in CSMA because _______ delay means two nodes may not hear each other's transmission.",
        options: ["Propagation", "Processing", "Queuing", "Transmission"],
        correctAnswer: "Propagation",
        explanation: "Notes: 'CSMA collisions can still occur: propagation delay means two nodes may not hear each other's transmission.'",
        difficultyLevel: "MEDIUM"
    },
    // CSMA/CD ALGORITHM (ETHERNET specific)
    {
        subjectId, moduleName: "Unit 2: CSMA/CD", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in Ethernet's CSMA/CD algorithm, after aborting due to a collision, the adapter enters _______ backoff.",
        options: ["Exponential", "Linear", "Fixed", "Random uniform"],
        correctAnswer: "Exponential",
        explanation: "Notes: 'After aborting, adapter enters exponential backoff: after the mth collision, adapter chooses a K at random from {0,1,2,...,2^m-1}.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CD", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the Jam Signal in Ethernet CSMA/CD is used to make sure all other transmitters are aware of the collision. Its size is _______ bits.",
        options: ["48", "64", "32", "16"],
        correctAnswer: "48",
        explanation: "Notes: 'Jam Signal: make sure all other transmitters are aware of collision; 48 bits.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CD", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that collision detection is easy in _______ LANs (by measuring signal strengths) but difficult in wireless LANs.",
        options: ["Wired", "Satellite", "Infrared", "Optical"],
        correctAnswer: "Wired",
        explanation: "Notes: 'collision detection: easy in wired LANs: measure signal strengths, compare transmitted, received signals. difficult in wireless LANs: receiver shut off while transmitting.'",
        difficultyLevel: "MEDIUM"
    },
    // MAC ADDRESSES & ARP (PDF 6 specific)
    {
        subjectId, moduleName: "Unit 2: MAC Addresses", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that MAC addresses for most LANs are _______ bits long and burned into the adapter ROM.",
        options: ["48", "32", "64", "128"],
        correctAnswer: "48",
        explanation: "Notes: '48 bit MAC address (for most LANs) burned in the adapter ROM.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: MAC Addresses", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, MAC address allocation is administered by _______.",
        options: ["IEEE", "IETF", "ISO", "ITU"],
        correctAnswer: "IEEE",
        explanation: "Notes: 'MAC address allocation administered by IEEE. Manufacturer buys portion of MAC address space (to assure uniqueness).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: MAC Addresses", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes compare MAC addresses to Social Security Numbers because they are _______ (can move LAN card from one LAN to another).",
        options: ["Portable (flat address)", "Hierarchical", "IP-dependent", "Location-specific"],
        correctAnswer: "Portable (flat address)",
        explanation: "Notes: 'MAC flat address => portability. Can move LAN card from one LAN to another. IP hierarchical address NOT portable — depends on IP network to which node is attached.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: ARP", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, each node's ARP table stores IP/MAC address mappings with a TTL (Time To Live) that is typically _______ minutes.",
        options: ["20", "5", "60", "120"],
        correctAnswer: "20",
        explanation: "Notes: 'TTL (Time To Live): time after which address mapping will be forgotten (typically 20 min).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: ARP", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe ARP as 'plug-and-play' because nodes create their ARP tables without intervention from the _______ administrator.",
        options: ["Network", "System", "Database", "Hardware"],
        correctAnswer: "Network",
        explanation: "Notes: 'ARP is plug-and-play: nodes create their ARP tables without intervention from net administrator.'",
        difficultyLevel: "MEDIUM"
    },
    // ETHERNET FRAME STRUCTURE
    {
        subjectId, moduleName: "Unit 2: Ethernet Frame", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the Ethernet frame Preamble consists of 7 bytes with pattern 10101010, followed by one byte with pattern _______, used to synchronize clocks.",
        options: ["10101011", "10101010", "11111111", "01111110"],
        correctAnswer: "10101011",
        explanation: "Notes: 'Preamble: 7 bytes with pattern 10101010 followed by one byte with pattern 10101011. Used to synchronize receiver, sender clock rates.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet Frame", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the Ethernet frame Addresses field is _______ bytes long.",
        options: ["6", "4", "2", "8"],
        correctAnswer: "6",
        explanation: "Notes: 'Addresses: 6 bytes. If adapter receives frame with matching destination address, or with broadcast address, it passes data in frame to net-layer protocol.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet Frame", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the Ethernet frame Type field as indicating the _______ layer protocol (mostly IP, but others may be supported such as Novell IPX and AppleTalk).",
        options: ["Higher (network)", "Lower (physical)", "Same (data link)", "Transport"],
        correctAnswer: "Higher (network)",
        explanation: "Notes: 'Type: indicates the higher layer protocol, mostly IP but others may be supported such as Novell IPX and AppleTalk.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet Frame", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Ethernet provides an _______ connectionless service — the receiving adapter doesn't send acks or nacks to the sending adapter.",
        options: ["Unreliable", "Reliable", "Guaranteed", "Error-free"],
        correctAnswer: "Unreliable",
        explanation: "Notes: 'Unreliable: receiving adapter doesn't send acks or nacks to sending adapter.'",
        difficultyLevel: "MEDIUM"
    },
    // ETHERNET TECHNOLOGIES
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that 10Base2 Ethernet runs at _______ Mbps and uses thin coaxial cable in a bus topology.",
        options: ["10", "100", "1000", "50"],
        correctAnswer: "10",
        explanation: "Notes: '10BaseT: 10Mbps. 10Base2: 10Mbps; 2: under 200 meters max cable length. Thin coaxial cable in a bus topology.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the 'T' in 10BaseT and 100BaseT stands for _______.",
        options: ["Twisted Pair", "Token", "Trunk", "Transmission"],
        correctAnswer: "Twisted Pair",
        explanation: "Notes: 'T stands for Twisted Pair. Nodes connect to a hub: star topology; 100 m max distance between nodes and hub.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that Manchester encoding is used in 10BaseT and 10Base2. Each bit has a _______, allowing clocks in sending and receiving nodes to synchronize.",
        options: ["Transition", "Header", "Preamble", "Flag"],
        correctAnswer: "Transition",
        explanation: "Notes: 'Manchester encoding: Used in 10BaseT, 10Base2. Each bit has a transition. Allows clocks in sending and receiving nodes to synchronize to each other.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in shared Gigabit Ethernet (Gbit), _______ is used for multiple access, with short distances between nodes for efficiency.",
        options: ["CSMA/CD", "Token Passing", "CSMA/CA", "Polling"],
        correctAnswer: "CSMA/CD",
        explanation: "Notes: 'Gbit Ethernet: in shared mode, CSMA/CD is used; short distances between nodes to be efficient.'",
        difficultyLevel: "HARD"
    },
    // BRIDGES
    {
        subjectId, moduleName: "Unit 2: Bridges & Switches", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe a bridge as a link layer device that stores and forwards Ethernet frames, and selectively forwards frames based on _______ destination address.",
        options: ["MAC", "IP", "Port", "DNS"],
        correctAnswer: "MAC",
        explanation: "Notes: 'Bridges: Link layer device. Stores and forwards Ethernet frames. Examines frame header and selectively forwards frame based on MAC dest address.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Bridges & Switches", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, bridges are _______ (hosts are unaware of their presence) and plug-and-play (do not need to be configured).",
        options: ["Transparent", "Active", "Visible", "Managed"],
        correctAnswer: "Transparent",
        explanation: "Notes: 'transparent: hosts are unaware of presence of bridges. plug-and-play, self-learning: bridges do not need to be configured.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Bridges & Switches", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that bridges filter packets, so same-LAN-segment frames are NOT forwarded to other segments, making each segment a separate _______ domain.",
        options: ["Collision", "Broadcast", "MAC", "IP"],
        correctAnswer: "Collision",
        explanation: "Notes: 'bridges filter packets: same-LAN-segment frames not usually forwarded onto other LAN segments. Segments become separate collision domains.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Bridges & Switches", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, when a bridge receives a frame and the destination is NOT in the bridge table, it _______ (forwards on all but the incoming interface).",
        options: ["Floods", "Drops", "Queues", "Broadcasts selectively"],
        correctAnswer: "Floods",
        explanation: "Notes: 'else flood: forward on all but the interface on which the frame arrived.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Bridges & Switches", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe bridge table entries as containing: Node LAN Address, Bridge Interface, and _______.",
        options: ["Time Stamp", "IP Address", "Port Number", "MAC type"],
        correctAnswer: "Time Stamp",
        explanation: "Notes: 'entry in bridge table: (Node LAN Address, Bridge Interface, Time Stamp). Stale entries in table dropped (TTL can be 60 min).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Bridges & Switches", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, with multiple paths between bridges, _______ result, causing bridges to multiply and forward frames forever. The solution is a spanning tree.",
        options: ["Cycles (loops)", "Collisions", "Broadcast storms", "Deadlocks"],
        correctAnswer: "Cycles (loops)",
        explanation: "Notes: 'with multiple paths, cycles result - bridges may multiply and forward frame forever. solution: organize bridges in a spanning tree by disabling subset of interfaces.'",
        difficultyLevel: "HARD"
    },
    // BRIDGES VS ROUTERS COMPARISON
    {
        subjectId, moduleName: "Unit 2: Bridges & Switches", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes compare bridges and routers. Which statement is TRUE according to the notes?",
        options: ["Bridges are self-learning (plug-and-play), routers require IP address configuration", "Routers are plug-and-play, bridges are not", "Bridges offer optimal routing, routers do not", "Bridges support broadcast storms, routers do not"],
        correctAnswer: "Bridges are self-learning (plug-and-play), routers require IP address configuration",
        explanation: "Notes: 'Bridges + and -: plug and play: yes. Routers: plug and play: no, require IP address configuration.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Bridges & Switches", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, an Ethernet switch is essentially a multi-interface _______, using layer 2 (frame) forwarding and filtering using LAN addresses.",
        options: ["Bridge", "Router", "Hub", "Repeater"],
        correctAnswer: "Bridge",
        explanation: "Notes: 'Ethernet Switches: Essentially a multi-interface bridge. Layer 2 (frame) forwarding, filtering using LAN addresses.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Bridges & Switches", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe cut-through switching in Ethernet switches as forwarding frames from input to output port without awaiting assembly of the _______ frame.",
        options: ["Entire", "Header", "Payload only", "Trailer"],
        correctAnswer: "Entire",
        explanation: "Notes: 'cut-through switching: frame forwarded from input to output port without awaiting for assembly of entire frame. slight reduction in latency.'",
        difficultyLevel: "MEDIUM"
    },
    // WIRELESS LAN (802.11)
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, all IEEE 802.11 wireless LAN standards (802.11a/b/g) use _______ for multiple access.",
        options: ["CSMA/CA", "CSMA/CD", "Token Passing", "Polling"],
        correctAnswer: "CSMA/CA",
        explanation: "Notes: 'All 802.11 standards use CSMA/CA for multiple access.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that 802.11b operates in the _______ GHz unlicensed radio spectrum at up to 11 Mbps.",
        options: ["2.4-5", "5-6", "1-2", "900 MHz"],
        correctAnswer: "2.4-5",
        explanation: "Notes: '802.11b: 2.4-5 GHz unlicensed radio spectrum, up to 11 Mbps.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in wireless LANs, collision detection doesn't work due to the _______ terminal problem.",
        options: ["Hidden", "Exposed", "Distant", "Silent"],
        correctAnswer: "Hidden",
        explanation: "Notes: 'Collision detection doesn't work: hidden terminal problem.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the 802.11 collision avoidance RTS-CTS mechanism: the sender transmits a short _______ (request to send) packet indicating duration of transmission.",
        options: ["RTS", "CTS", "ACK", "NAK"],
        correctAnswer: "RTS",
        explanation: "Notes: 'sender transmits short RTS (request to send) packet: indicates duration of transmission. receiver replies with short CTS (clear to send) packet.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in 802.11 CSMA/CA, the sender waits for the channel to be idle for _______ seconds before transmitting.",
        options: ["DIFS", "SIFS", "RTS", "ACK"],
        correctAnswer: "DIFS",
        explanation: "Notes: '802.11 CSMA: sender - if sense channel idle for DISF sec. then transmit entire frame.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Wireless LAN", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that in 802.11, the receiver sends an ACK after _______ (a short interframe space), which is needed due to the hidden terminal problem.",
        options: ["SIFS", "DIFS", "RTS", "NAV"],
        correctAnswer: "SIFS",
        explanation: "Notes: '802.11 CSMA receiver - if received OK return ACK after SIFS (ACK is needed due to hidden terminal problem).'",
        difficultyLevel: "HARD"
    },
    // BLUETOOTH
    {
        subjectId, moduleName: "Unit 2: Bluetooth", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Bluetooth operates in the _______ GHz unlicensed radio band at up to 721 kbps.",
        options: ["2.4-2.5", "5-6", "1-2", "900 MHz"],
        correctAnswer: "2.4-2.5",
        explanation: "Notes: 'Bluetooth: 2.4-2.5 GHz unlicensed radio band. up to 721 kbps.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Bluetooth", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that Bluetooth is a low-power, small radius wireless technology that operates within _______ meters.",
        options: ["10-100", "100-1000", "1-10", "1000+"],
        correctAnswer: "10-100",
        explanation: "Notes: 'Bluetooth: Low-power, small radius, wireless networking technology. 10-100 meters.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Bluetooth", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Bluetooth uses _______ hopping to deal with interference from wireless LANs, digital cordless phones, and microwave ovens.",
        options: ["Frequency", "Time", "Code", "Phase"],
        correctAnswer: "Frequency",
        explanation: "Notes: 'Interference from wireless LANs, digital cordless phones, microwave ovens: frequency hopping helps.'",
        difficultyLevel: "MEDIUM"
    },
    // ATM
    {
        subjectId, moduleName: "Unit 2: ATM", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes define ATM (Asynchronous Transfer Mode) as a 1990s standard for high-speed broadband networks using packet-switching with fixed-length packets called _______.",
        options: ["Cells", "Frames", "Datagrams", "Segments"],
        correctAnswer: "Cells",
        explanation: "Notes: 'ATM: packet-switching (fixed length packets, called cells) using virtual circuits.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: ATM", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, an ATM cell has a _______ byte header and a _______ byte payload.",
        options: ["5 header / 48 payload", "8 header / 48 payload", "5 header / 64 payload", "4 header / 48 payload"],
        correctAnswer: "5 header / 48 payload",
        explanation: "Notes: '5-byte ATM cell header. 48-byte payload.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: ATM", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the ATM cell payload is 48 bytes because this is a compromise between _______ and _______ bytes.",
        options: ["32 and 64", "16 and 64", "32 and 128", "48 and 64"],
        correctAnswer: "32 and 64",
        explanation: "Notes: 'Why? small payload -> short cell-creation delay for digitized voice. halfway between 32 and 64 (compromise!)'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: ATM", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, AAL1 (ATM Adaptation Layer 1) is used for _______ (Constant Bit Rate) services such as circuit emulation.",
        options: ["CBR", "VBR", "ABR", "UBR"],
        correctAnswer: "CBR",
        explanation: "Notes: 'AAL1: for CBR (Constant Bit Rate) services, e.g. circuit emulation.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: ATM", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe ATM Virtual Circuits (VCs) as requiring call _______ and teardown for each call before data can flow.",
        options: ["Setup", "Configuration", "Encryption", "Routing"],
        correctAnswer: "Setup",
        explanation: "Notes: 'VC transport: call setup, teardown for each call before data can flow. Each packet carries VC identifier (not destination ID).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: ATM", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the ATM cell header field CLP (Cell Loss Priority bit) means that when CLP = 1, the cell has _______ priority and can be discarded if congestion occurs.",
        options: ["Low", "High", "Normal", "Maximum"],
        correctAnswer: "Low",
        explanation: "Notes: 'CLP: Cell Loss Priority bit. CLP = 1 implies low priority cell, can be discarded if congestion.'",
        difficultyLevel: "HARD"
    },
    // CHANNEL PARTITIONING SUMMARY
    {
        subjectId, moduleName: "Unit 2: MAC Access Methods", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe a disadvantage of channel partitioning protocols at low load: _______ bandwidth is allocated even if only 1 node is active.",
        options: ["1/N", "N/2", "1/2", "Full"],
        correctAnswer: "1/N",
        explanation: "Notes: 'channel partitioning MAC protocols: inefficient at low load: delay in channel access, 1/N bandwidth allocated even if only 1 active node!'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: MAC Access Methods", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, random access protocols are efficient at _______ load (single node can fully utilize channel), but suffer from collision overhead at high load.",
        options: ["Low", "High", "Medium", "Maximum"],
        correctAnswer: "Low",
        explanation: "Notes: 'Random access MAC protocols: efficient at low load: single node can fully utilize channel. high load: collision overhead.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: MAC Access Methods", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that CDMA assigns a unique _______ to each user, allowing multiple users to coexist and transmit simultaneously.",
        options: ["Code (chipping sequence)", "Frequency band", "Time slot", "Token"],
        correctAnswer: "Code (chipping sequence)",
        explanation: "Notes: 'CDMA: unique code assigned to each user. All users share same frequency, but each user has own chipping sequence to encode data.'",
        difficultyLevel: "MEDIUM"
    },
    // PPP FROM PDF 6
    {
        subjectId, moduleName: "Unit 2: PPP", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, PPP design requirements include bit _______, meaning it must carry any bit pattern in the data field.",
        options: ["Transparency", "Stuffing", "Interleaving", "Encoding"],
        correctAnswer: "Transparency",
        explanation: "Notes: 'PPP Design Requirements: bit transparency: must carry any bit pattern in the data field.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: PPP", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that PPP requirements include network layer address negotiation, meaning each endpoint can _______ each other's network address.",
        options: ["Learn/configure", "Encrypt", "Route to", "Filter"],
        correctAnswer: "Learn/configure",
        explanation: "Notes: 'PPP Design Requirements: network layer address negotiation: endpoint can learn/configure each other's network address.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: PPP", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, PPP explicitly does NOT provide: error correction/recovery, flow control, and _______ delivery.",
        options: ["Out-of-order (allows it)", "In-order", "Guaranteed", "Reliable"],
        correctAnswer: "Out-of-order (allows it)",
        explanation: "Notes: 'PPP non-requirements: out of order delivery OK. Error recovery, flow control, data re-ordering all relegated to higher layers!'",
        difficultyLevel: "HARD"
    },
    // NIC / ADAPTOR
    {
        subjectId, moduleName: "Unit 2: NIC", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the link layer is implemented in an 'adaptor' (also known as a _______), such as an Ethernet card or 802.11 card.",
        options: ["NIC (Network Interface Card)", "Router", "Hub", "Switch"],
        correctAnswer: "NIC (Network Interface Card)",
        explanation: "Notes: 'link layer implemented in adaptor (aka NIC). Ethernet card, PCMCI card, 802.11 card.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: NIC", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, on the sending side, the NIC/adaptor encapsulates the datagram in a frame and adds _______ bits, rdt, flow control, etc.",
        options: ["Error checking", "IP address", "Port numbers", "Routing"],
        correctAnswer: "Error checking",
        explanation: "Notes: 'sending side: encapsulates datagram in a frame. adds error checking bits, rdt, flow control, etc.'",
        difficultyLevel: "EASY"
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
    console.log(`\n✅ PDF 6 IMEKAMILIKA!`);
    console.log(`   Maswali mapya: ${inserted} | Yaliyorukwa: ${skipped} | JUMLA: ${total}`);
  } finally { await client.close(); }
}
run().catch(console.dir);
