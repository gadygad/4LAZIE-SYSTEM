const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

// PDF 2: Data Communication and Network-I
// Covers: OSI model, TCP/IP, Physical layer, Data encoding, Multiplexing, Analog/Digital signals
const questions = [
    // OSI MODEL
    {
        subjectId, moduleName: "OSI Model", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The OSI model was developed by the _______ as a framework to allow diverse systems to communicate.",
        options: ["ISO (International Organization for Standardization)", "IEEE", "ITU", "ANSI"],
        correctAnswer: "ISO (International Organization for Standardization)",
        explanation: "The Open Systems Interconnection (OSI) model was developed by ISO to allow different systems from different manufacturers to communicate.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "OSI Model", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which layer of the OSI model is responsible for converting bits into signals suitable for physical transmission?",
        options: ["Physical Layer", "Data Link Layer", "Network Layer", "Session Layer"],
        correctAnswer: "Physical Layer",
        explanation: "The Physical Layer (Layer 1) is responsible for the actual bit transmission over a physical medium, converting bits into signals.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "OSI Model", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "At the sender side, data moves _______ the layers of the OSI model.",
        options: ["Downward through", "Upward through", "Across", "Randomly between"],
        correctAnswer: "Downward through",
        explanation: "At the sender, data is passed downward from the Application layer to the Physical layer, with each layer adding its header.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "OSI Model", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The process where each layer on the sender's side adds its own information (header/trailer) to the data is called _______.",
        options: ["Encapsulation", "Decapsulation", "Fragmentation", "Routing"],
        correctAnswer: "Encapsulation",
        explanation: "Encapsulation is the process of adding a header (and sometimes trailer) by each layer before passing data to the layer below.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "OSI Model", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which OSI layer is responsible for process-to-process delivery and manages port numbers?",
        options: ["Transport Layer", "Network Layer", "Session Layer", "Application Layer"],
        correctAnswer: "Transport Layer",
        explanation: "The Transport Layer (Layer 4) provides process-to-process delivery using port numbers and provides end-to-end reliability.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "OSI Model", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The _______ layer of the OSI model adds the source and destination IP addresses to the data unit.",
        options: ["Network", "Data Link", "Transport", "Physical"],
        correctAnswer: "Network",
        explanation: "The Network Layer (Layer 3) is responsible for logical addressing (IP addressing) and routing.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "OSI Model", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The Data Link Layer adds a _______ to the data unit for error detection.",
        options: ["Trailer (FCS)", "Header only", "Footer checksum", "IP address"],
        correctAnswer: "Trailer (FCS)",
        explanation: "The Data Link Layer adds both a header (containing MAC addresses) and a trailer (containing Frame Check Sequence for error detection).",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "OSI Model", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "Which OSI layer is responsible for data representation, encryption, and compression?",
        options: ["Presentation Layer", "Session Layer", "Application Layer", "Transport Layer"],
        correctAnswer: "Presentation Layer",
        explanation: "The Presentation Layer (Layer 6) handles data translation, encryption/decryption, and compression.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "OSI Model", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The _______ layer is the topmost layer of the OSI model and directly serves end-user applications like browsers and email clients.",
        options: ["Application", "Presentation", "Session", "Transport"],
        correctAnswer: "Application",
        explanation: "The Application Layer (Layer 7) provides network services directly to end-user applications.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "OSI Model", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The PDU (Protocol Data Unit) at the Data Link layer is called a _______.",
        options: ["Frame", "Packet", "Segment", "Bit"],
        correctAnswer: "Frame",
        explanation: "The PDUs are: Bits (Physical), Frames (Data Link), Packets (Network), Segments (Transport), Data (Application).",
        difficultyLevel: "EASY"
    },
    // TCP/IP MODEL
    {
        subjectId, moduleName: "TCP/IP Model", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The TCP/IP model has _______ layers, unlike the OSI model which has seven.",
        options: ["Four", "Three", "Five", "Six"],
        correctAnswer: "Four",
        explanation: "The TCP/IP model has 4 layers: Network Access, Internet, Transport, and Application.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "TCP/IP Model", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In the TCP/IP model, the _______ layer corresponds to both the Data Link and Physical layers of the OSI model.",
        options: ["Network Access", "Internet", "Transport", "Application"],
        correctAnswer: "Network Access",
        explanation: "The Network Access layer (also called Link layer) in TCP/IP corresponds to both the Data Link and Physical layers of OSI.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "TCP/IP Model", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Which protocol in the TCP/IP model's Internet layer is responsible for reporting errors and sending query messages?",
        options: ["ICMP", "ARP", "RARP", "IGMP"],
        correctAnswer: "ICMP",
        explanation: "Internet Control Message Protocol (ICMP) reports errors and provides diagnostic functions (e.g., ping uses ICMP).",
        difficultyLevel: "HARD"
    },
    // SIGNALS
    {
        subjectId, moduleName: "Signals", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "A _______ signal has infinitely many levels of intensity over a period of time (e.g., a sine wave).",
        options: ["Analog", "Digital", "Discrete", "Binary"],
        correctAnswer: "Analog",
        explanation: "An analog signal is continuous and can have any value within a range (e.g., voice and music).",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Signals", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "A _______ signal has only a limited number of defined values (typically 0 and 1) and is used in computers.",
        options: ["Digital", "Analog", "Continuous", "Periodic"],
        correctAnswer: "Digital",
        explanation: "Digital signals have discrete values (0 or 1), making them ideal for computers and digital communication.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Signals", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In a sine wave, the _______ describes the position of the waveform relative to time 0.",
        options: ["Phase", "Frequency", "Amplitude", "Period"],
        correctAnswer: "Phase",
        explanation: "Phase describes the position of the waveform relative to time zero. A phase of 0° means the signal starts at zero.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Signals", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The time required to complete one full cycle of a periodic signal is called its _______.",
        options: ["Period", "Frequency", "Amplitude", "Wavelength"],
        correctAnswer: "Period",
        explanation: "The period (T) is the amount of time in seconds for one full cycle. It is the inverse of frequency: T = 1/f.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Signals", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "If a signal completes 500 cycles per second, its frequency is _______ Hz.",
        options: ["500", "250", "1000", "0.002"],
        correctAnswer: "500",
        explanation: "Frequency is the number of cycles per second measured in Hertz (Hz). 500 cycles per second = 500 Hz.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Signals", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The _______ of a signal is the distance a simple signal can travel in one period.",
        options: ["Wavelength", "Amplitude", "Phase", "Frequency"],
        correctAnswer: "Wavelength",
        explanation: "Wavelength (λ) = propagation speed × period = propagation speed / frequency.",
        difficultyLevel: "MEDIUM"
    },
    // DATA ENCODING
    {
        subjectId, moduleName: "Data Encoding", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In digital-to-digital encoding, _______ encoding represents binary 1 as a positive voltage and binary 0 as a negative voltage.",
        options: ["Bipolar NRZ", "Unipolar NRZ", "RZ", "Manchester"],
        correctAnswer: "Bipolar NRZ",
        explanation: "Bipolar NRZ (Non-Return-to-Zero) uses two non-zero voltage levels: positive for 1 and negative for 0.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Data Encoding", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In Manchester encoding, a bit 1 is represented by a transition from _______ in the middle of the bit interval.",
        options: ["Low to High", "High to Low", "Zero to Positive", "No change"],
        correctAnswer: "Low to High",
        explanation: "In Manchester encoding, bit 1 = low-to-high transition, bit 0 = high-to-low transition in the middle of each bit interval.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Data Encoding", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which digital encoding scheme always has a transition at the middle of each bit interval, making it self-synchronizing?",
        options: ["Manchester", "NRZ-L", "NRZ-I", "Unipolar"],
        correctAnswer: "Manchester",
        explanation: "Manchester encoding always has a mid-bit transition which allows the receiver to synchronize its clock with the sender.",
        difficultyLevel: "MEDIUM"
    },
    // MULTIPLEXING
    {
        subjectId, moduleName: "Multiplexing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Multiplexing is the process of combining multiple signals to share a _______ transmission medium.",
        options: ["Single", "Dedicated", "Wireless", "Satellite"],
        correctAnswer: "Single",
        explanation: "Multiplexing allows multiple signals to share a single transmission medium simultaneously.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Multiplexing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In _______ multiplexing, each signal is allocated a portion of the total bandwidth for the entire duration of the communication.",
        options: ["FDM (Frequency Division Multiplexing)", "TDM (Time Division Multiplexing)", "CDM (Code Division Multiplexing)", "WDM (Wavelength Division Multiplexing)"],
        correctAnswer: "FDM (Frequency Division Multiplexing)",
        explanation: "FDM assigns a unique frequency band to each channel for the entire duration of the connection.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Multiplexing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The device that combines multiple signals at the sender side in multiplexing is called a _______.",
        options: ["Multiplexer (MUX)", "Demultiplexer (DEMUX)", "Router", "Switch"],
        correctAnswer: "Multiplexer (MUX)",
        explanation: "A multiplexer (MUX) combines multiple signals into one at the sending end.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Multiplexing", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Guard bands are used in FDM to _______.",
        options: ["Prevent interference between adjacent channels", "Increase data speed", "Compress data", "Improve synchronization"],
        correctAnswer: "Prevent interference between adjacent channels",
        explanation: "Guard bands are unused frequency ranges placed between channels in FDM to prevent interference.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Multiplexing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In synchronous TDM, if a channel has no data to send, its time slot is _______.",
        options: ["Wasted (sent empty)", "Assigned to another channel", "Skipped", "Delayed"],
        correctAnswer: "Wasted (sent empty)",
        explanation: "In synchronous TDM, time slots are pre-assigned. If a channel has nothing to send, its slot is wasted.",
        difficultyLevel: "MEDIUM"
    },
    // TRANSMISSION IMPAIRMENTS
    {
        subjectId, moduleName: "Transmission Impairments", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The unwanted alteration of signal strength as it travels through a transmission medium is called _______.",
        options: ["Attenuation", "Noise", "Distortion", "Jitter"],
        correctAnswer: "Attenuation",
        explanation: "Attenuation is the loss of signal energy (weakening) as the signal travels over a medium.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Transmission Impairments", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Signal _______ occurs because different frequency components of a signal travel at slightly different speeds through a medium.",
        options: ["Distortion", "Attenuation", "Noise", "Refraction"],
        correctAnswer: "Distortion",
        explanation: "Distortion is caused by different propagation speeds of different frequencies in a composite signal.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Transmission Impairments", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "Thermal noise (also called white noise), which is created by the random motion of electrons, is a type of _______.",
        options: ["Noise", "Attenuation", "Distortion", "Interference"],
        correctAnswer: "Noise",
        explanation: "Thermal noise is caused by random motion of electrons and is spread evenly across all frequencies.",
        difficultyLevel: "HARD"
    },
    // BANDWIDTH & CAPACITY
    {
        subjectId, moduleName: "Bandwidth", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The Shannon capacity formula C = B log2(1 + SNR) gives the maximum data rate where SNR stands for _______.",
        options: ["Signal-to-Noise Ratio", "Speed-to-Network Ratio", "Signal-to-Network Rate", "System Noise Reduction"],
        correctAnswer: "Signal-to-Noise Ratio",
        explanation: "SNR = Signal-to-Noise Ratio. The higher the SNR, the higher the channel capacity.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Bandwidth", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The Nyquist theorem states that the maximum bit rate of a noiseless channel with bandwidth B and L signal levels is _______.",
        options: ["2B log2 L", "B log2(1+SNR)", "B/2 × L", "B × SNR"],
        correctAnswer: "2B log2 L",
        explanation: "Nyquist: BitRate = 2 × Bandwidth × log2(L). This applies only to noiseless channels.",
        difficultyLevel: "HARD"
    },
    // ANALOG VS DIGITAL
    {
        subjectId, moduleName: "Analog vs Digital", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The process of converting an analog signal to digital form involves _______ and encoding.",
        options: ["Sampling", "Modulation", "Switching", "Amplifying"],
        correctAnswer: "Sampling",
        explanation: "ADC (Analog-to-Digital Conversion) involves sampling the analog signal at regular intervals and then encoding those samples.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Analog vs Digital", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Digital signals are less susceptible to noise than analog signals because they can be _______ instead of amplified.",
        options: ["Regenerated (re-created)", "Attenuated", "Compressed", "Modulated"],
        correctAnswer: "Regenerated (re-created)",
        explanation: "Digital signals can be perfectly regenerated from their binary values, while amplifying analog signals also amplifies the noise.",
        difficultyLevel: "MEDIUM"
    },
    // FLOW / ERROR CONTROL OVERVIEW
    {
        subjectId, moduleName: "Error & Flow Control", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which type of error affects only a single bit in a data unit while the surrounding bits remain intact?",
        options: ["Single-bit error", "Burst error", "Multiple-bit error", "Cyclic error"],
        correctAnswer: "Single-bit error",
        explanation: "A single-bit error is one in which only one bit in the data unit has changed from 1 to 0 or vice versa.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Error & Flow Control", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "A _______ error occurs when two or more consecutive bits in a data unit have been changed from 1 to 0 or vice versa.",
        options: ["Burst", "Single-bit", "Parity", "Cyclic"],
        correctAnswer: "Burst",
        explanation: "A burst error is when a group of consecutive bits are corrupted due to noise.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Error & Flow Control", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In error correction using Hamming code, the number of redundancy bits (r) needed to correct single-bit errors must satisfy _______.",
        options: ["2^r ≥ m + r + 1", "2^r ≥ m + 1", "r ≥ m/2", "r = m"],
        correctAnswer: "2^r ≥ m + r + 1",
        explanation: "The Hamming condition requires that 2^r ≥ m + r + 1, where m is the number of data bits.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Error & Flow Control", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "CRC (Cyclic Redundancy Check) is based on the concept of _______ division.",
        options: ["Binary (Modulo-2)", "Decimal", "Hexadecimal", "Octal"],
        correctAnswer: "Binary (Modulo-2)",
        explanation: "CRC uses modulo-2 binary division to compute the remainder, which is appended to the data as the CRC code.",
        difficultyLevel: "HARD"
    },
    // NETWORK TYPES
    {
        subjectId, moduleName: "Network Types", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "A _______ network interconnects devices within a limited geographic area, like an office or campus.",
        options: ["LAN", "WAN", "MAN", "SAN"],
        correctAnswer: "LAN",
        explanation: "A Local Area Network (LAN) is confined to a small geographic area.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Network Types", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "A _______ network connects cities, regions, or countries and is often managed by a service provider.",
        options: ["WAN", "LAN", "PAN", "CAN"],
        correctAnswer: "WAN",
        explanation: "A Wide Area Network (WAN) spans large geographic areas, often utilizing public telecommunications infrastructure.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Network Types", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "A Metropolitan Area Network (MAN) covers an area roughly the size of a _______.",
        options: ["City", "Country", "Home", "Building"],
        correctAnswer: "City",
        explanation: "A MAN typically spans the size of a city or large campus.",
        difficultyLevel: "EASY"
    },
    // PHYSICAL LAYER EXTRAS
    {
        subjectId, moduleName: "Physical Layer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "What is the function of a repeater at the Physical layer?",
        options: ["Regenerates weak signals", "Routes packets", "Filters frames", "Assigns IP addresses"],
        correctAnswer: "Regenerates weak signals",
        explanation: "A repeater operates at the Physical layer and regenerates signals that have weakened due to attenuation.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Physical Layer", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "A _______ device operates at the Physical layer and forwards every signal to all ports without any filtering.",
        options: ["Hub", "Switch", "Router", "Bridge"],
        correctAnswer: "Hub",
        explanation: "A hub is a Physical layer device that broadcasts incoming signals to all ports. It has no intelligence.",
        difficultyLevel: "MEDIUM"
    },
    // PROTOCOLS DEEP
    {
        subjectId, moduleName: "Protocols", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "TCP provides a _______ connection, meaning a connection is established before data is exchanged.",
        options: ["Connection-oriented", "Connectionless", "Best-effort", "Simplex"],
        correctAnswer: "Connection-oriented",
        explanation: "TCP is connection-oriented and uses a three-way handshake to establish a connection.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "UDP is preferred over TCP when _______ is more important than reliability.",
        options: ["Speed and low latency", "Packet ordering", "Error correction", "Flow control"],
        correctAnswer: "Speed and low latency",
        explanation: "UDP is used for real-time applications like video streaming and gaming where speed matters more than reliability.",
        difficultyLevel: "MEDIUM"
    },
    // MORE OSI
    {
        subjectId, moduleName: "OSI Model", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The _______ layer of the OSI model is responsible for establishing, maintaining, and terminating communication sessions.",
        options: ["Session", "Transport", "Presentation", "Application"],
        correctAnswer: "Session",
        explanation: "The Session Layer (Layer 5) manages sessions (dialogues) between two communicating hosts.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "OSI Model", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "On the receiver side, the process of removing headers added by each layer is called _______.",
        options: ["Decapsulation", "Encapsulation", "Fragmentation", "Routing"],
        correctAnswer: "Decapsulation",
        explanation: "Decapsulation is the reverse of encapsulation — each layer strips its own header as data moves upward.",
        difficultyLevel: "MEDIUM"
    },
    // NETWORKING CONCEPTS
    {
        subjectId, moduleName: "Network Concepts", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Which device operates at the Data Link layer and uses MAC addresses to forward frames within the same network?",
        options: ["Switch", "Hub", "Router", "Repeater"],
        correctAnswer: "Switch",
        explanation: "A switch is a Layer 2 device that uses MAC address tables to forward frames only to the correct port.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Network Concepts", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "A _______ operates at Layer 3 and uses IP addresses to forward packets between different networks.",
        options: ["Router", "Switch", "Hub", "Bridge"],
        correctAnswer: "Router",
        explanation: "Routers operate at the Network layer and use routing tables with IP addresses to forward packets.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Network Concepts", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "When data travels from sender to receiver, the Physical layer at the receiver converts _______ back into bits.",
        options: ["Signals", "Frames", "Packets", "Bytes"],
        correctAnswer: "Signals",
        explanation: "The Physical layer converts the received signals (electrical, light, or radio) back into bits.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Network Concepts", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In peer-to-peer communication in the OSI model, the logical communication is between _______ on both sides.",
        options: ["Same layers", "Different layers", "Physical layers only", "Application layers only"],
        correctAnswer: "Same layers",
        explanation: "In the OSI model, each layer communicates logically with the same layer on the remote system (peer-to-peer).",
        difficultyLevel: "MEDIUM"
    },
    // EXTRA FROM TYPICAL DATA COMM & NETWORKS-I CONTENT
    {
        subjectId, moduleName: "Analog Transmission", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In _______ modulation, the amplitude of the carrier signal is varied in proportion to the message signal.",
        options: ["AM (Amplitude Modulation)", "FM (Frequency Modulation)", "PM (Phase Modulation)", "QAM"],
        correctAnswer: "AM (Amplitude Modulation)",
        explanation: "In AM, the amplitude of the carrier is proportional to the instantaneous value of the modulating signal.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Analog Transmission", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "FM radio is more resistant to noise interference than AM radio because in FM, information is encoded in the _______ of the carrier.",
        options: ["Frequency", "Amplitude", "Phase", "Wavelength"],
        correctAnswer: "Frequency",
        explanation: "FM encodes information in frequency variations. Noise typically affects amplitude, not frequency, so FM is more noise-resistant.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Transmission Impairments", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "To overcome attenuation in long-distance communication, _______ are placed at regular intervals along the transmission medium.",
        options: ["Amplifiers or Repeaters", "Modems", "Switches", "Routers"],
        correctAnswer: "Amplifiers or Repeaters",
        explanation: "Amplifiers boost analog signals, and repeaters regenerate digital signals to overcome attenuation.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Multiplexing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In statistical TDM (also called asynchronous TDM), time slots are allocated _______, resulting in more efficient use of the link.",
        options: ["Dynamically (on demand)", "Statically (pre-assigned)", "Randomly", "By frequency"],
        correctAnswer: "Dynamically (on demand)",
        explanation: "Statistical TDM assigns slots only to channels that have data to send, eliminating wasted slots.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "OSI Model", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The Network layer uses _______ as its primary addressing scheme to route data between networks.",
        options: ["Logical (IP) addresses", "Physical (MAC) addresses", "Port numbers", "Domain names"],
        correctAnswer: "Logical (IP) addresses",
        explanation: "The Network layer uses logical IP addresses which are independent of hardware and support inter-network routing.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "TCP/IP Model", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In the TCP/IP model, the _______ layer is equivalent to the Network layer in OSI and uses IP as its core protocol.",
        options: ["Internet", "Transport", "Application", "Network Access"],
        correctAnswer: "Internet",
        explanation: "The Internet layer in TCP/IP corresponds to the OSI Network layer and uses IP for addressing and routing.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Error & Flow Control", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In the Go-Back-N sliding window protocol, if an error is detected in frame N, the receiver _______.",
        options: ["Discards frame N and all subsequent frames", "Only discards frame N", "Requests only frame N again", "Ignores the error"],
        correctAnswer: "Discards frame N and all subsequent frames",
        explanation: "In Go-Back-N, the receiver discards the erroneous frame AND all subsequent frames, requiring the sender to retransmit all of them.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Error & Flow Control", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Selective Repeat ARQ is more efficient than Go-Back-N because it only retransmits _______.",
        options: ["The specific damaged frame", "All frames after the error", "The entire message", "The last acknowledged frame"],
        correctAnswer: "The specific damaged frame",
        explanation: "Selective Repeat retransmits only the specific damaged or lost frame, avoiding unnecessary retransmissions.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Signals", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "A signal that repeats its pattern over identifiable periods is called a _______ signal.",
        options: ["Periodic", "Aperiodic", "Random", "Noise"],
        correctAnswer: "Periodic",
        explanation: "A periodic signal completes a pattern within a measurable time frame called a period and repeats that pattern.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Signals", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "A composite signal is made up of many simple sine waves each with different _______, frequency, and phase.",
        options: ["Amplitude", "Period", "Protocol", "Bandwidth"],
        correctAnswer: "Amplitude",
        explanation: "By Fourier analysis, any complex signal can be broken down into component sine waves with different amplitudes, frequencies, and phases.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Data Encoding", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Differential Manchester encoding differs from standard Manchester encoding in that transitions occur at the _______ of each bit interval.",
        options: ["Beginning (for bit 0)", "End", "Middle only", "Start and middle"],
        correctAnswer: "Beginning (for bit 0)",
        explanation: "In Differential Manchester, a transition at the START of the interval represents 0, while no transition at the start represents 1. A mid-bit transition always occurs.",
        difficultyLevel: "HARD"
    }
];

async function run() {
  const { MongoClient } = require('mongodb');
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
    
    console.log(`PDF 2 complete: Inserted ${inserted} questions out of ${questions.length}.`);

  } finally {
    await client.close();
  }
}

const { MongoClient } = require('mongodb');
run().catch(console.dir);
