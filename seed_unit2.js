const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

// Unit 2 questions - crafted directly from DATA COMMUNICATION UNIT II.pdf notes
const questions = [

    // ============================================================
    // SECTION 1: DATA LINK LAYER - DEFINITION & MAIN FUNCTIONS
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the Data Link Layer is the _______ layer (Layer 2) in the OSI Model used in computer networking.",
        options: ["Second", "Third", "First", "Fourth"],
        correctAnswer: "Second",
        explanation: "Notes: 'The Data Link Layer is the second layer (Layer 2) in the OSI Model used in computer networking.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes define the Data Link Layer as responsible for reliable transfer of data between two _______ connected devices on the same network.",
        options: ["Directly", "Indirectly", "Wirelessly only", "Remotely"],
        correctAnswer: "Directly",
        explanation: "Notes: 'The Data Link Layer is responsible for reliable transfer of data between two directly connected devices on the same network.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is listed in the notes as a main function of the Data Link Layer?",
        options: ["Framing", "IP routing", "DNS resolution", "Encryption only"],
        correctAnswer: "Framing",
        explanation: "Notes list 5 main functions: Framing, Physical Addressing (MAC), Error Detection & Correction, Flow Control, and Access Control.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the Data Link Layer takes raw data from the Network Layer and breaks it into _______ (smaller units) during the framing function.",
        options: ["Frames", "Packets", "Segments", "Bits"],
        correctAnswer: "Frames",
        explanation: "Notes: '1. Framing - It takes raw data from the Network Layer and breaks it into frames (smaller units).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, which Data Link Layer function adds source and destination MAC addresses to each frame so devices can identify each other on a local network?",
        options: ["Physical Addressing", "Framing", "Flow Control", "Error Detection"],
        correctAnswer: "Physical Addressing",
        explanation: "Notes: '2. Physical Addressing (MAC Address) - It adds source and destination MAC addresses to each frame.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe _______ control as ensuring that data is sent at a speed the receiver can handle.",
        options: ["Flow", "Access", "Error", "Link"],
        correctAnswer: "Flow",
        explanation: "Notes: '4. Flow Control - Ensures that data is sent at a speed the receiver can handle.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the Access Control function of the Data Link Layer determines which device has _______ to send data at a given time.",
        options: ["Permission", "The fastest speed", "The shortest path", "The most memory"],
        correctAnswer: "Permission",
        explanation: "Notes: '5. Access Control - Determines which device has permission to send data at a given time (important in shared networks).'",
        difficultyLevel: "EASY"
    },
    // SUBLAYERS
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the Data Link Layer is divided into two sub-layers. The one that manages communication between devices and provides error checking and flow control is called _______.",
        options: ["LLC (Logical Link Control)", "MAC (Media Access Control)", "PHY (Physical)", "NIC (Network Interface)"],
        correctAnswer: "LLC (Logical Link Control)",
        explanation: "Notes: '1. Logical Link Control (LLC) - Manages communication between devices, provides error checking and flow control.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Data Link Layer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the _______ (MAC) sublayer controls how devices access the network medium and handles MAC addressing.",
        options: ["Media Access Control", "Message Access Control", "Multiple Access Channel", "Medium Addressing Controller"],
        correctAnswer: "Media Access Control",
        explanation: "Notes: '2. Media Access Control (MAC) - Controls how devices access the network medium. Handles MAC addressing.'",
        difficultyLevel: "EASY"
    },

    // ============================================================
    // SECTION 2: DESIGN ISSUES
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Design Issues", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe framing as solving the problem of: how to divide a continuous stream of _______ into meaningful units.",
        options: ["Bits", "Packets", "Signals", "Bytes"],
        correctAnswer: "Bits",
        explanation: "Notes: '1. Framing - Problem: How to divide a continuous stream of bits into meaningful units.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Design Issues", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes list four framing methods. Which of the following is NOT listed as a framing method?",
        options: ["IP addressing", "Character count", "Byte stuffing", "Bit stuffing"],
        correctAnswer: "IP addressing",
        explanation: "Notes list: Character count, Byte stuffing, Bit stuffing, Physical layer coding violations. IP addressing is a Network layer function.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Design Issues", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the design issue of Physical Addressing solves the problem of how devices identify each other on the same network using _______ (unique hardware addresses).",
        options: ["MAC addresses", "IP addresses", "Port numbers", "Domain names"],
        correctAnswer: "MAC addresses",
        explanation: "Notes: 'Solution: Use MAC addresses (unique hardware addresses). Ensures data reaches the correct device within a LAN.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Design Issues", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe two methods for flow control: Stop-and-Wait and _______.",
        options: ["Sliding Window", "Token Passing", "Polling", "CSMA/CD"],
        correctAnswer: "Sliding Window",
        explanation: "Notes: '4. Flow Control - Methods: Stop-and-Wait, Sliding Window. Prevents data loss due to overflow.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Design Issues", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, CSMA/CD is used in Ethernet and CSMA/CA is used in _______ for access control.",
        options: ["Wi-Fi (wireless)", "Bluetooth only", "Fiber optic", "Satellite"],
        correctAnswer: "Wi-Fi (wireless)",
        explanation: "Notes: 'Techniques: CSMA/CD (used in Ethernet), CSMA/CA (used in Wi-Fi). Prevents collisions and chaos in the network.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Design Issues", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Link Management as dealing with how to establish, maintain, and _______ a connection.",
        options: ["Terminate", "Encrypt", "Route", "Fragment"],
        correctAnswer: "Terminate",
        explanation: "Notes: '6. Link Management - How to establish, maintain, and terminate a connection.'",
        difficultyLevel: "EASY"
    },

    // ============================================================
    // SECTION 3: ERROR DETECTION
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Error Detection", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes define error detection as the process of identifying whether data has been corrupted during transmission. It does not fix the error, it only tells that an error _______.",
        options: ["Exists", "Has been corrected", "Was lost", "Was encrypted"],
        correctAnswer: "Exists",
        explanation: "Notes: 'Error detection is the process of identifying whether data has been corrupted during transmission. It does not fix the error, it only tells that an error exists.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Error Detection", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, a Parity Check adds _______ extra bit(s) to detect errors.",
        options: ["1", "2", "4", "8"],
        correctAnswer: "1",
        explanation: "Notes: 'Parity Check - Adds 1 extra bit (parity bit). Types: Even parity, Odd parity. Simple but not very reliable.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Error Detection", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the Checksum method as: data is divided into blocks, the sender computes a sum and sends it, and the receiver _______ and compares.",
        options: ["Recomputes", "Ignores", "Encrypts", "Discards"],
        correctAnswer: "Recomputes",
        explanation: "Notes: 'Sender computes a sum and sends it. Receiver recomputes and compares.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Error Detection", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, CRC (Cyclic Redundancy Check) is described as the _______ and most widely used error detection method.",
        options: ["Most powerful", "Simplest", "Least reliable", "Oldest"],
        correctAnswer: "Most powerful",
        explanation: "Notes: '3. CRC (Cyclic Redundancy Check) - Most powerful and widely used method.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Error Detection", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that CRC uses binary division with a _______ polynomial to detect errors.",
        options: ["Generator", "Divisor", "Quotient", "Modulus"],
        correctAnswer: "Generator",
        explanation: "Notes: 'Uses binary division with a generator polynomial.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Error Detection", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, CRC is very effective in detecting errors in Ethernet and _______.",
        options: ["Wi-Fi", "Bluetooth only", "USB", "PSTN only"],
        correctAnswer: "Wi-Fi",
        explanation: "Notes: 'Very effective in detecting errors in: Ethernet, Wi-Fi.'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // SECTION 4: ERROR CORRECTION
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Error Correction", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes define error correction as the process of detecting AND _______ errors in the received data.",
        options: ["Fixing", "Reporting", "Ignoring", "Retransmitting"],
        correctAnswer: "Fixing",
        explanation: "Notes: 'Error correction is the process of detecting AND fixing errors in the received data.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Error Correction", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In Forward Error Correction (FEC) as described in the notes, the sender adds extra _______ bits so the receiver can correct errors without retransmission.",
        options: ["Redundant", "Encrypted", "Compressed", "Random"],
        correctAnswer: "Redundant",
        explanation: "Notes: 'Forward Error Correction (FEC) - Sender adds extra redundant bits. Receiver can correct errors without retransmission.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Error Correction", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes give Hamming Code as an example of _______ Error Correction.",
        options: ["Forward", "Backward", "Cyclic", "Selective"],
        correctAnswer: "Forward",
        explanation: "Notes: 'Forward Error Correction (FEC) - Example: Hamming Code.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Error Correction", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that FEC is used where retransmission is costly, giving _______ communication as an example.",
        options: ["Satellite", "LAN", "USB", "Bluetooth"],
        correctAnswer: "Satellite",
        explanation: "Notes: 'Used where retransmission is costly (e.g., satellite communication).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Error Correction", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in ARQ (Automatic Repeat reQuest), if an error is detected, the receiver asks for _______.",
        options: ["Retransmission", "A new connection", "Error correction bits", "The full file again"],
        correctAnswer: "Retransmission",
        explanation: "Notes: 'Automatic Repeat reQuest (ARQ) - If error is detected → receiver asks for retransmission.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Error Correction", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes list three types of ARQ. Which of the following is NOT one of them?",
        options: ["Continuous ARQ", "Stop-and-Wait ARQ", "Go-Back-N ARQ", "Selective Repeat ARQ"],
        correctAnswer: "Continuous ARQ",
        explanation: "Notes list: '1. Stop-and-Wait ARQ. 2. Go-Back-N ARQ. 3. Selective Repeat ARQ.' Continuous ARQ is not listed.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Error Correction", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Using the analogy in the notes, Error Detection is like a teacher marking an answer wrong, while Error Correction is like a teacher _______ it to the right answer.",
        options: ["Correcting", "Ignoring", "Erasing", "Reporting"],
        correctAnswer: "Correcting",
        explanation: "Notes: 'Error Detection → Like a teacher marking an answer wrong. Error Correction → Like a teacher correcting it to the right answer.'",
        difficultyLevel: "EASY"
    },

    // ============================================================
    // SECTION 5: ELEMENTARY PROTOCOLS
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the Simple Protocol (Unrestricted Simplex Protocol) as one where data flows in _______ direction only and the sender keeps sending without waiting.",
        options: ["One", "Two", "Three", "Multiple"],
        correctAnswer: "One",
        explanation: "Notes: 'Simple Protocol - Data flows in one direction only (simplex). Sender keeps sending data without waiting.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, what are the assumptions of the Simple Protocol?",
        options: ["No errors, no data loss, receiver can handle all data", "Errors exist, receiver may lose data", "Data flows in both directions", "Uses encryption"],
        correctAnswer: "No errors, no data loss, receiver can handle all data",
        explanation: "Notes: 'Assumptions: No errors. No data loss. Receiver can handle all incoming data.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Stop-and-Wait Protocol as: the sender sends one frame at a time and waits for _______ before sending the next.",
        options: ["ACK (acknowledgment)", "Another request", "A timeout", "A token"],
        correctAnswer: "ACK (acknowledgment)",
        explanation: "Notes: 'Stop-and-Wait Protocol - Sender sends one frame at a time. Waits for ACK (acknowledgment) before sending next.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes list the disadvantage of Stop-and-Wait Protocol as being _______.",
        options: ["Slow (low efficiency)", "Complex to implement", "Unreliable", "Uses too much memory"],
        correctAnswer: "Slow (low efficiency)",
        explanation: "Notes: 'Disadvantages: Slow (low efficiency).'",
        difficultyLevel: "EASY"
    },

    // ============================================================
    // SECTION 6: SLIDING WINDOW PROTOCOLS
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Sliding Window", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that Sliding Window Protocols are used to improve efficiency, _______ control, and error control compared to Stop-and-Wait.",
        options: ["Flow", "Access", "Signal", "Frequency"],
        correctAnswer: "Flow",
        explanation: "Notes: 'Sliding Window Protocols are advanced techniques to improve efficiency, flow control, and error control compared to Stop-and-Wait.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Sliding Window", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in Sliding Window protocols, frames are numbered using _______ numbers.",
        options: ["Sequence", "Random", "Binary only", "Hexadecimal"],
        correctAnswer: "Sequence",
        explanation: "Notes: 'Frames are numbered (sequence numbers). Sender sends multiple frames within the window.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Sliding Window", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Go-Back-N ARQ as: if an error occurs, the sender retransmits from the error frame _______.",
        options: ["Onward (all following frames)", "Only that one frame", "From the beginning", "After a timeout only"],
        correctAnswer: "Onward (all following frames)",
        explanation: "Notes: 'If error occurs → sender retransmits from the error frame onward.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Sliding Window", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes list the disadvantage of Go-Back-N ARQ as _______ (retransmits many frames).",
        options: ["Wastes bandwidth", "Too complex", "Uses too much memory", "Cannot detect errors"],
        correctAnswer: "Wastes bandwidth",
        explanation: "Notes: 'Disadvantages: Wastes bandwidth (retransmits many frames).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Sliding Window", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in Selective Repeat ARQ, the receiver accepts and _______ out-of-order frames (unlike Go-Back-N).",
        options: ["Stores (buffers)", "Discards", "Retransmits", "Ignores"],
        correctAnswer: "Stores (buffers)",
        explanation: "Notes: 'Selective Repeat ARQ - Receiver accepts and stores out-of-order frames. Only incorrect/lost frames are retransmitted.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Sliding Window", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that Selective Repeat ARQ is more efficient than Go-Back-N but has the disadvantage of requiring more _______ (buffering).",
        options: ["Memory", "Bandwidth", "Time", "Cables"],
        correctAnswer: "Memory",
        explanation: "Notes: 'Disadvantages: More complex. Requires more memory (buffering).'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // SECTION 7: MULTIPLE ACCESS PROTOCOLS
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Multiple Access", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the main goal of Multiple Access Protocols is to avoid _______ and ensure fair use of the medium.",
        options: ["Collisions", "Encryption failures", "Routing loops", "IP conflicts"],
        correctAnswer: "Collisions",
        explanation: "Notes: 'The main goal: avoid collisions and ensure fair use of the medium.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Multiple Access", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Multiple Access Protocols are categorized into three types. Which of the following is NOT one of those categories?",
        options: ["Dedicated Access Protocols", "Random Access Protocols", "Controlled Access Protocols", "Channelization Protocols"],
        correctAnswer: "Dedicated Access Protocols",
        explanation: "Notes list three categories: 1. Random Access, 2. Controlled Access, 3. Channelization Protocols.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Multiple Access", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Controlled Access Protocols as devices taking turns in a _______ manner.",
        options: ["Controlled", "Random", "Chaotic", "Frequency-based"],
        correctAnswer: "Controlled",
        explanation: "Notes: '2. Controlled Access Protocols - Devices take turns in a controlled manner.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Multiple Access", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Channelization Protocols divide the _______ into smaller parts for each device.",
        options: ["Channel", "Frame", "Packet", "Router"],
        correctAnswer: "Channel",
        explanation: "Notes: '3. Channelization Protocols - The channel is divided into smaller parts.'",
        difficultyLevel: "EASY"
    },

    // ============================================================
    // SECTION 8: ALOHA
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: ALOHA", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Pure ALOHA as a protocol where devices send data at _______ without synchronization between devices.",
        options: ["Any time", "Scheduled slots only", "Regular intervals", "Master's permission"],
        correctAnswer: "Any time",
        explanation: "Notes: 'Pure ALOHA - Send data at any time. No synchronization between devices.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: ALOHA", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the maximum efficiency of Pure ALOHA is approximately _______.",
        options: ["18.4%", "36.8%", "50%", "100%"],
        correctAnswer: "18.4%",
        explanation: "Notes: 'Pure ALOHA - Maximum efficiency ≈ 18.4%'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: ALOHA", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "Slotted ALOHA improves over Pure ALOHA because devices can only send at the _______ of a time slot, which reduces collisions.",
        options: ["Beginning", "Middle", "End", "Random point"],
        correctAnswer: "Beginning",
        explanation: "Notes: 'Slotted ALOHA - Devices can send only at the beginning of a slot. Advantage: Reduces collisions.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: ALOHA", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that Slotted ALOHA has a maximum efficiency of approximately _______, which is better than Pure ALOHA.",
        options: ["36.8%", "18.4%", "50%", "75%"],
        correctAnswer: "36.8%",
        explanation: "Notes: 'Slotted ALOHA - Maximum efficiency ≈ 36.8% (better than Pure ALOHA)'",
        difficultyLevel: "HARD"
    },

    // ============================================================
    // SECTION 9: CSMA & CSMA/CD & CSMA/CA
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: CSMA", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that CSMA improves on ALOHA by making devices _______ before transmitting.",
        options: ["Listen", "Encrypt data", "Send a token", "Request permission"],
        correctAnswer: "Listen",
        explanation: "Notes: 'CSMA improves on ALOHA by making devices listen before transmitting.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in CSMA, if the channel is idle the device _______, and if the channel is busy the device waits.",
        options: ["Transmits", "Waits anyway", "Sends a jam signal", "Backs off"],
        correctAnswer: "Transmits",
        explanation: "Notes: 'If the channel is idle → transmit. If the channel is busy → wait.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Persistent CSMA as having the disadvantage of high chance of collision because many devices _______ at the same time.",
        options: ["Send at once when channel is idle", "Wait indefinitely", "Back off randomly", "Use token passing"],
        correctAnswer: "Send at once when channel is idle",
        explanation: "Notes: 'Persistent CSMA - If channel is idle → transmit immediately (probability = 1). Disadvantage: High chance of collision (many devices send at once).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Non-Persistent CSMA has fewer collisions than Persistent CSMA because when the channel is busy, it waits a _______ time before retrying.",
        options: ["Random", "Fixed", "Longer", "Shorter"],
        correctAnswer: "Random",
        explanation: "Notes: 'Non-Persistent CSMA - If channel is busy → wait a random time before retrying. Advantage: Fewer collisions.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CD", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe CSMA/CD as used in classic wired LANs like _______.",
        options: ["Ethernet", "Wi-Fi (802.11)", "Bluetooth", "ZigBee"],
        correctAnswer: "Ethernet",
        explanation: "Notes: 'Where CSMA/CD is used: Classic wired LANs like Ethernet.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CD", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in CSMA/CD, when a collision is detected, the device stops transmission and sends a _______ signal.",
        options: ["Jam", "ACK", "Token", "Sync"],
        correctAnswer: "Jam",
        explanation: "Notes CSMA/CD steps: 'If collision detected: Stops transmission. Sends a jam signal. Waits for a random time (backoff).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CD", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that modern switched Ethernet does NOT use CSMA/CD because there is no shared medium and no _______ (due to full-duplex communication).",
        options: ["Collisions", "MAC addresses", "Flow control", "Error detection"],
        correctAnswer: "Collisions",
        explanation: "Notes: 'Modern switched Ethernet does not use CSMA/CD because: No shared medium. No collisions (full-duplex communication).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CA", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that unlike CSMA/CD, wireless devices cannot easily _______ collisions while transmitting, so CSMA/CA tries to prevent them in advance.",
        options: ["Detect", "Avoid", "Report", "Buffer"],
        correctAnswer: "Detect",
        explanation: "Notes: 'Unlike CSMA/CD, wireless devices cannot easily detect collisions while transmitting. So instead, they try to prevent collisions in advance.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CA", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in CSMA/CA, after sensing the channel is idle, the device waits for a short time called _______ before using a random backoff timer.",
        options: ["DIFS", "ACK", "RTS", "CTS"],
        correctAnswer: "DIFS",
        explanation: "Notes CSMA/CA steps: 'If idle → waits for a short time (DIFS). Uses random backoff timer.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CSMA/CA", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that CSMA/CA is mainly used in _______ networks to avoid collisions before they happen.",
        options: ["Wireless", "Wired Ethernet", "Fiber optic", "PSTN"],
        correctAnswer: "Wireless",
        explanation: "Notes: 'CSMA/CA is mainly used in wireless networks to avoid collisions before they happen.'",
        difficultyLevel: "EASY"
    },

    // ============================================================
    // SECTION 10: COLLISION-FREE PROTOCOLS
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Collision-Free Protocols", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in the Bit-Map Protocol, stations indicate they want to transmit by setting their bit to _______ in the reservation cycle.",
        options: ["1", "0", "255", "Random"],
        correctAnswer: "1",
        explanation: "Notes: 'Stations indicate if they want to transmit by setting their bit to 1.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Collision-Free Protocols", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Token Passing as a protocol where only the device _______ the token can transmit.",
        options: ["Holding", "Requesting", "Acknowledging", "Broadcasting"],
        correctAnswer: "Holding",
        explanation: "Notes: 'Token Passing - Only the device holding the token can transmit.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Collision-Free Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, a disadvantage of Token Passing is that if the token is _______, the network fails.",
        options: ["Lost", "Duplicated", "Slowed", "Encrypted"],
        correctAnswer: "Lost",
        explanation: "Notes: 'Disadvantage: If token is lost → network fails.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Collision-Free Protocols", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Polling Protocol as having a central controller (master) that checks each device _______ and devices respond only when asked.",
        options: ["One by one", "Simultaneously", "Randomly", "By frequency"],
        correctAnswer: "One by one",
        explanation: "Notes: 'Polling Protocol - A central controller (master) checks each device one by one. Devices respond only when asked.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Collision-Free Protocols", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, a disadvantage of Polling Protocol is that it has a _______ point of failure.",
        options: ["Single", "Multiple", "No", "Distributed"],
        correctAnswer: "Single",
        explanation: "Notes: 'Disadvantage: Single point of failure. Polling delay.'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // SECTION 11: ETHERNET PHYSICAL LAYER
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that Ethernet at the Physical Layer is responsible for sending raw _______ (0s and 1s) across the network cable.",
        options: ["Bits", "Frames", "Packets", "Bytes"],
        correctAnswer: "Bits",
        explanation: "Notes: 'It is responsible for sending raw bits (0s and 1s) across the network cable or wireless medium.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, twisted pair cable used in Ethernet LANs (Cat5e, Cat6) uses _______ connectors.",
        options: ["RJ-45", "BNC", "SFP", "ST"],
        correctAnswer: "RJ-45",
        explanation: "Notes: 'Twisted Pair Cable (most common) - Used in LANs (Cat5e, Cat6, Cat6a). Uses RJ-45 connectors.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that classic Ethernet (10 Mbps) uses _______ encoding.",
        options: ["Manchester", "4B/5B", "PAM", "NRZ"],
        correctAnswer: "Manchester",
        explanation: "Notes: 'Manchester encoding (classic Ethernet).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Fast Ethernet (100 Mbps) uses _______ encoding.",
        options: ["4B/5B", "Manchester", "PAM", "NRZ-I"],
        correctAnswer: "4B/5B",
        explanation: "Notes: '4B/5B encoding (Fast Ethernet).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Ethernet", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that modern Ethernet uses _______ topology where devices connect to a switch.",
        options: ["Star", "Bus", "Ring", "Mesh"],
        correctAnswer: "Star",
        explanation: "Notes: '4. Topology Support - Modern Ethernet uses star topology: Devices connect to a switch.'",
        difficultyLevel: "EASY"
    },

    // ============================================================
    // SECTION 12: ETHERNET MAC SUBLAYER
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: MAC Sublayer", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Ethernet MAC addresses are _______ hardware addresses used to identify devices on a local network.",
        options: ["48-bit", "32-bit", "64-bit", "128-bit"],
        correctAnswer: "48-bit",
        explanation: "Notes: 'Uses MAC addresses (48-bit hardware addresses) to identify devices on a local network. Example: 00:1A:2B:3C:4D:5E'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: MAC Sublayer", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that in an Ethernet frame, the FCS (Frame Check Sequence) is used for _______ detection.",
        options: ["Error", "Speed", "Address", "Frequency"],
        correctAnswer: "Error",
        explanation: "Notes: 'FCS (Frame Check Sequence for error detection).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: MAC Sublayer", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, when a device sends data in Ethernet, the first step of the MAC sublayer is to create an Ethernet _______.",
        options: ["Frame", "Packet", "Segment", "Cell"],
        correctAnswer: "Frame",
        explanation: "Notes: '1. MAC sub-layer creates an Ethernet frame. 2. Adds MAC addresses. 3. Sends frame to Physical Layer.'",
        difficultyLevel: "EASY"
    },

    // ============================================================
    // SECTION 13: PSTN
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: PSTN", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes define PSTN as the traditional global telephone system that uses _______ technology for making voice calls.",
        options: ["Circuit-switched", "Packet-switched", "Message-switched", "Cell-switched"],
        correctAnswer: "Circuit-switched",
        explanation: "Notes: 'PSTN is the traditional global telephone system used for making voice calls over landline telephones using circuit-switched technology.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: PSTN", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the Local Loop in PSTN is the physical cable connecting the user to the local _______ and is usually copper wire or fiber.",
        options: ["Exchange", "Gateway", "Trunk", "Satellite"],
        correctAnswer: "Exchange",
        explanation: "Notes: 'Local Loop - The physical cable connecting the user to the local exchange. Usually copper wire or fiber.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: PSTN", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Trunk Lines in PSTN as high-capacity lines connecting different exchanges or cities that can carry _______ calls at once.",
        options: ["Many", "Only two", "Exactly one", "Unlimited encrypted"],
        correctAnswer: "Many",
        explanation: "Notes: 'Trunk Lines - High-capacity lines connecting different exchanges or cities. Carry many calls at once.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: PSTN", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the Switching System in PSTN is described as 'the brain of PSTN' because it establishes, maintains, and _______ call connections.",
        options: ["Ends", "Routes", "Encrypts", "Amplifies"],
        correctAnswer: "Ends",
        explanation: "Notes: 'Switching System - The brain of PSTN. Establishes, maintains, and ends call connections.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: PSTN", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes list disadvantages of PSTN. Which of the following is stated as a disadvantage?",
        options: ["Expensive for long-distance calls", "Poor call quality", "Cannot work without internet", "Uses packet switching"],
        correctAnswer: "Expensive for long-distance calls",
        explanation: "Notes: 'Disadvantages: Expensive for long-distance calls. Limited to voice (not efficient for data).'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // SECTION 14: COMMUNICATION SYSTEM COMPONENTS (from PDF 3)
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Communication System", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Noise in a communication system as unwanted _______ that affect signal quality, which can occur in any part of the channel.",
        options: ["Disturbances", "Packets", "Delays", "Addresses"],
        correctAnswer: "Disturbances",
        explanation: "Notes: '6. Noise - Unwanted disturbances that affect signal quality. Can occur in any part of the channel.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Communication System", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the Transmitter (Sender) performs encoding, modulation, and sometimes _______ before sending data.",
        options: ["Compression", "Routing", "Switching", "Encryption only"],
        correctAnswer: "Compression",
        explanation: "Notes: 'Transmitter (Sender) - Performs encoding, modulation, and sometimes compression.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Communication System", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes define the Destination in a communication system as the final point where the message is _______.",
        options: ["Delivered", "Encrypted", "Fragmented", "Retransmitted"],
        correctAnswer: "Delivered",
        explanation: "Notes: '5. Destination - The final point where the message is delivered.'",
        difficultyLevel: "EASY"
    }
];

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');

    let inserted = 0;
    let skipped = 0;
    for (let q of questions) {
        q.createdAt = new Date();
        const exists = await db.collection('questions').findOne({
            subjectId: q.subjectId,
            questionText: q.questionText
        });
        if (!exists) {
            await db.collection('questions').insertOne(q);
            inserted++;
        } else {
            skipped++;
        }
    }

    const total = await db.collection('questions').countDocuments({ subjectId });
    console.log(`\n✅ Unit 2 IMEKAMILIKA!`);
    console.log(`   Maswali mapya yaliyoingia: ${inserted}`);
    console.log(`   Yaliyorukwa (yalikuwepo): ${skipped}`);
    console.log(`   JUMLA YOTE DATABASE: ${total}`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
