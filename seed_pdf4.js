const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

// Questions crafted DIRECTLY from UNIT 2 DATA LINK LAYER.pdf (PDF 4)
const questions = [

    // ============================================================
    // FRAMING
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Framing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the data link layer needs to pack bits into _______, so that each one is distinguishable from another.",
        options: ["Frames", "Packets", "Segments", "Cells"],
        correctAnswer: "Frames",
        explanation: "Notes: 'The data link layer needs to pack bits into frames, so that each frame is distinguishable from another.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that framing separates a message by adding a sender address and a _______ address to the frame.",
        options: ["Destination", "Network", "Gateway", "Broadcast"],
        correctAnswer: "Destination",
        explanation: "Notes: 'Framing in the data link layer separates a message by adding a sender address and a destination address.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the destination address defines where the packet is to go, while the sender address helps the recipient _______.",
        options: ["Acknowledge the receipt", "Route the packet", "Encrypt the data", "Fragment the frame"],
        correctAnswer: "Acknowledge the receipt",
        explanation: "Notes: 'The destination address defines where the packet is to go; the sender address helps the recipient acknowledge the receipt.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that framing is of 2 types. In _______ framing, there is no need to define frame boundaries as the size itself can be used as a delimiter.",
        options: ["Fixed size", "Variable size", "Character-oriented", "Bit-oriented"],
        correctAnswer: "Fixed size",
        explanation: "Notes: 'In fixed size framing, there is no need to define boundaries of a frame. The size itself can be used as a delimiter.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes give ATM (wide area network) as an example of _______ framing, which uses frames of fixed size called cells.",
        options: ["Fixed size", "Variable size", "Byte-oriented", "Bit-oriented"],
        correctAnswer: "Fixed size",
        explanation: "Notes: 'An example of this network is ATM wide area network, which uses frames of fixed size called cells.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, variable-size framing is prevalent in _______.",
        options: ["LAN", "WAN", "MAN", "ATM networks"],
        correctAnswer: "LAN",
        explanation: "Notes: 'Variable-size framing is prevalent in LAN.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe two approaches for variable-size framing. Which of the following is listed as one of those approaches?",
        options: ["Character-oriented approach", "Cell-switching approach", "Token-passing approach", "CSMA approach"],
        correctAnswer: "Character-oriented approach",
        explanation: "Notes: 'There are two approaches used for this purpose: Character-oriented approach and Bit-oriented approach.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In a character-oriented protocol, data to be carried are 8-bit characters from a coding system such as _______.",
        options: ["ASCII", "Binary", "Hexadecimal", "Unicode only"],
        correctAnswer: "ASCII",
        explanation: "Notes: 'In a character-oriented protocol, data to be carried are 8-bit characters from a coding system such as ASCII.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "To separate one frame from another in character-oriented protocols, an 8-bit _______ is added at the beginning and end of the frame.",
        options: ["Flag", "Token", "Header", "Checksum"],
        correctAnswer: "Flag",
        explanation: "Notes: 'To separate one frame from another an 8-bit flag is added at the beginning and end of the frame.'",
        difficultyLevel: "EASY"
    },
    // BYTE STUFFING
    {
        subjectId, moduleName: "Unit 2: Framing", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes define byte stuffing as the process of adding 1 extra byte whenever there is a _______ or escape (esc) character in the data.",
        options: ["Flag", "Checksum", "Parity bit", "Sequence number"],
        correctAnswer: "Flag",
        explanation: "Notes: 'Byte stuffing is the process of adding 1 extra byte whenever there is a flag or escape(esc) character in the set i.e., data.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In byte stuffing, a character byte called _______ is added before the flag or esc sequence in the data.",
        options: ["ESC", "ACK", "NAK", "SYN"],
        correctAnswer: "ESC",
        explanation: "Notes: 'A character byte called esc is added before the flag or esc sequence.'",
        difficultyLevel: "MEDIUM"
    },
    // BIT-ORIENTED APPROACH
    {
        subjectId, moduleName: "Unit 2: Framing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in the bit-oriented approach, each frame starts and ends with a flag byte of _______.",
        options: ["01111110", "10000001", "11111111", "00000000"],
        correctAnswer: "01111110",
        explanation: "Notes: 'Generally each frame starts and ends with a stream of bits called 01111110 (called flag byte).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In bit stuffing, the sender data link layer automatically stuffs a 0 into the outgoing bit stream whenever it encounters _______ consecutive 1's in the data.",
        options: ["5", "4", "6", "8"],
        correctAnswer: "5",
        explanation: "Notes: 'Whenever sender datalink's layer encounters 5 consecutive 1's in the data then it automatically stuffs 0 into the outgoing bit stream.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Framing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "When the receiver sees five consecutive 1 bits followed by a 0 bit in bit-oriented framing, it automatically _______ (deletes) the 0 bit.",
        options: ["Destuffs", "Stuffs", "Discards", "Retransmits"],
        correctAnswer: "Destuffs",
        explanation: "Notes: 'When the receiver sees five consecutive incoming 1 bits, followed by a 0 bit, it automatically destuffs (i.e., deletes) the 0 bit.'",
        difficultyLevel: "HARD"
    },

    // ============================================================
    // FLOW CONTROL
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Flow Control", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes define flow control as a set of procedures that tells the sender how much data it can transmit before it must wait for an _______ from the receiver.",
        options: ["Acknowledgment", "Error report", "Token", "Request"],
        correctAnswer: "Acknowledgment",
        explanation: "Notes: 'Flow control is a set of procedures that tells the sender how much data it can transmit before it must wait for an acknowledgment from the receiver.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Flow Control", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, each receiving device has a block of memory called a _______, reserved for storing incoming data until they are processed.",
        options: ["Buffer", "Cache", "Register", "Queue"],
        correctAnswer: "Buffer",
        explanation: "Notes: 'each receiving device has a block of memory, called a buffer, reserved for storing incoming data until they are processed.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Flow Control", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that if the buffer begins to fill up, the receiver must tell the sender to halt transmission until it is once again able to _______.",
        options: ["Receive", "Transmit", "Encrypt", "Route"],
        correctAnswer: "Receive",
        explanation: "Notes: 'If the buffer begins to fill up, the receiver must be able to tell the sender to halt transmission until it is once again able to receive.'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // ERROR CONTROL
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Error Control", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that error control in the data link layer is often implemented simply: Any time an error is detected, specified frames are retransmitted. This process is called _______.",
        options: ["Automatic Repeat Request (ARQ)", "Forward Error Correction (FEC)", "Bit stuffing", "Hamming Code"],
        correctAnswer: "Automatic Repeat Request (ARQ)",
        explanation: "Notes: 'Any time an error is detected in an exchange, specified frames are retransmitted. This process is called automatic repeat request (ARQ).'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // TYPES OF ERRORS
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Error Types", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes define single-bit error as only _______ bit of a given data unit being changed from 1 to 0 or from 0 to 1.",
        options: ["1", "2", "3", "Multiple"],
        correctAnswer: "1",
        explanation: "Notes: 'Single-bit error means that only 1 bit of a given data unit is changed from 1 to 0 or from 0 to 1.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Error Types", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, burst error means that _______ or more bits in the data unit have changed from 1 to 0 or from 0 to 1.",
        options: ["2", "1", "4", "8"],
        correctAnswer: "2",
        explanation: "Notes: 'Burst error means that 2 or more bits in the data unit have changed from 1 to 0 or from 0 to 1.'",
        difficultyLevel: "EASY"
    },

    // ============================================================
    // REDUNDANCY
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Redundancy", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the central concept in detecting or correcting errors is _______.",
        options: ["Redundancy", "Encryption", "Compression", "Routing"],
        correctAnswer: "Redundancy",
        explanation: "Notes: 'The central concept in detecting or correcting errors is redundancy.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Redundancy", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, redundant bits are added by the _______ and removed by the receiver. Their presence allows the receiver to detect or correct errors.",
        options: ["Sender", "Router", "Switch", "Hub"],
        correctAnswer: "Sender",
        explanation: "Notes: 'These redundant bits are added by the sender and removed by the receiver.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Redundancy", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that error correction is more difficult than detection because in correction we need to know the exact number of bits corrected and more importantly their _______ in the message.",
        options: ["Location", "Value", "Frequency", "Timestamp"],
        correctAnswer: "Location",
        explanation: "Notes: 'In error correction we need to know the exact number of bits we have corrected and more importantly their location in the message.'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // CODING SCHEMES
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Coding", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, coding schemes can be divided into two broad categories: Block Coding and _______ Coding.",
        options: ["Convolution", "Cyclic", "Hamming", "Parity"],
        correctAnswer: "Convolution",
        explanation: "Notes: 'Coding schemes can be divided into two broad categories: Block Coding and Convolution Coding.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Coding", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In block coding, if the dataword length is 'k' bits and 'r' redundant bits are added, the codeword length 'n' is calculated as _______.",
        options: ["n = k + r", "n = k × r", "n = k - r", "n = r / k"],
        correctAnswer: "n = k + r",
        explanation: "Notes: 'length of the code word is n bits, to obtain code words so no. of redundant bits r are added. n = k + r'",
        difficultyLevel: "HARD"
    },

    // ============================================================
    // PARITY CHECK
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Parity Check", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe even parity as a procedure where a parity bit is chosen to make the total count of 1's in the codeword _______.",
        options: ["Even", "Odd", "Zero", "Random"],
        correctAnswer: "Even",
        explanation: "Notes: 'Generally to obtain parity we opt for a procedure called even parity which contains even no. of 1's in the codeword.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Parity Check", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the simple parity check detects single-bit errors and odd number of errors, but it CANNOT detect _______ number of errors.",
        options: ["Even", "Odd", "Single", "All"],
        correctAnswer: "Even",
        explanation: "Notes: 'The simple parity check codes cannot detect even no. of errors. The simple parity check detects one single error and also odd no. of errors.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Parity Check", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In parity check, the syndrome bit at the receiver is used to determine if the received codeword is valid. If the syndrome bit is _______, there is no error.",
        options: ["0", "1", "2", "Random"],
        correctAnswer: "0",
        explanation: "Notes: 'If the syndrome bit is 0 the no. of 1's in the codeword is even which says no error condition.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Parity Check", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that a simple parity check has a minimum Hamming distance of _______, so it can only detect single-bit errors.",
        options: ["2", "1", "3", "4"],
        correctAnswer: "2",
        explanation: "Notes: 'The minimum hamming distance considered for this case is 2. So it can correct a single-bit error and not any error.'",
        difficultyLevel: "HARD"
    },

    // ============================================================
    // HAMMING DISTANCE
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Hamming Distance", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes define Hamming distance as the number of _______ between the corresponding bits of two datawords.",
        options: ["Differences", "Similarities", "Errors", "Redundant bits"],
        correctAnswer: "Differences",
        explanation: "Notes: 'The hamming distance is nothing but the number of differences between the corresponding bits of two datawords.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Hamming Distance", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the Hamming distance is easily calculated using _______ operation between the datawords, and the number of 1's in the result determines it.",
        options: ["XOR", "AND", "OR", "NOT"],
        correctAnswer: "XOR",
        explanation: "Notes: 'The hamming distance is easily calculated using XOR operation between the datawords. The no. of 1's determine the result.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Hamming Distance", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes give an example: the Hamming distance between 000 and 111 is _______ since the XOR operation between these datawords is 111.",
        options: ["3", "1", "2", "0"],
        correctAnswer: "3",
        explanation: "Notes: 'Assume the datawords are 000 and 111 to be compared. The hamming distance between these datawords is 3 since the XOR operation between these datawords is 111.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Hamming Distance", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the minimum Hamming distance as the _______ Hamming distance between all possible pairs.",
        options: ["Smallest", "Largest", "Average", "Sum of all"],
        correctAnswer: "Smallest",
        explanation: "Notes: 'The minimum hamming distance is the smallest hamming distance between all possible pairs.'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // CRC (Cyclic Redundancy Check)
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: CRC", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe cyclic codes as special linear block codes with one extra property: if a codeword is cyclically _______ or rotated, the result is another valid codeword.",
        options: ["Shifted", "Compressed", "Encrypted", "Modulated"],
        correctAnswer: "Shifted",
        explanation: "Notes: 'Cyclic codes are special linear block codes with one extra property. If a codeword is cyclically shifted or rotated, the result is another codeword.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CRC", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, CRC (Cyclic Redundancy Check) codes are used in networks such as _______ and WAN.",
        options: ["LAN", "PAN", "MAN", "VLAN"],
        correctAnswer: "LAN",
        explanation: "Notes: 'This cyclic redundancy check's (CRC's) are used in networks such as LAN and WAN.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: CRC", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In CRC encoding, the dataword is augmented by adding _______ 0's on the rightmost side, and then fed into a generator for division.",
        options: ["n-k", "k+1", "n+k", "r"],
        correctAnswer: "n-k",
        explanation: "Notes: 'The size of the dataword is augmented by adding n-k 0's on the rightmost side of dataword. The n-bit result is fed into generator.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CRC", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In CRC, the _______ of the division is discarded and the remainder is appended to the dataword to create the codeword.",
        options: ["Quotient", "Divisor", "Dividend", "Generator"],
        correctAnswer: "Quotient",
        explanation: "Notes: 'The quotient of the division is discarded and the remainder is appended to the dataword to create the codeword.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CRC", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "At the CRC decoder/receiver, if the remainder is all 0's (000), it means _______.",
        options: ["No error in the received codeword", "An error was detected", "The codeword must be discarded", "Retransmission is needed"],
        correctAnswer: "No error in the received codeword",
        explanation: "Notes: 'If the remainder at the decoder is 000 (all 0's) then there is no error in the received code word, otherwise it is an error codeword.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: CRC", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes list cyclic code advantages. Which of the following is stated as an advantage of CRC?",
        options: ["Can detect single-bit errors, double errors, odd number of errors AND burst errors", "Only detects single-bit errors", "Cannot detect burst errors", "Requires no extra bits"],
        correctAnswer: "Can detect single-bit errors, double errors, odd number of errors AND burst errors",
        explanation: "Notes: 'Cyclic codes can detect single-bit error, double errors, an odd number of errors and burst errors.'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // CHECKSUM
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: Checksum", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the basic idea of checksum is that along with the data to be sent, the _______ of those data is also sent.",
        options: ["Sum", "Product", "Average", "Maximum value"],
        correctAnswer: "Sum",
        explanation: "Notes: 'The basic idea of checksum is along with the data that is to be sent the sum of those data is also sent.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: Checksum", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the Internet has been using a _______ checksum.",
        options: ["16-bit", "8-bit", "32-bit", "64-bit"],
        correctAnswer: "16-bit",
        explanation: "Notes: 'Internet has been using a 16-bit checksum.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: Checksum", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "In the Internet Checksum process at the sender site, the value of the checksum word is initially set to _______, then all words are added using one's complement arithmetic.",
        options: ["Zero", "One", "255", "Random"],
        correctAnswer: "Zero",
        explanation: "Notes: 'Sender site: ii) The value of checksum word is set to zero. iii) All words using checksum are added using one's complement arithmetic.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Checksum", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "At the Internet Checksum receiver site, if the new checksum value after complementing is _______, the message is accepted; otherwise it is rejected.",
        options: ["0 (zero)", "1 (one)", "255", "65535"],
        correctAnswer: "0 (zero)",
        explanation: "Notes: 'Receiver site: iv) If the value of checksum is 0, the message is accepted; otherwise rejected.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Checksum", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that checksum is well-suited for _______ implementation and is used in the internet by several protocols.",
        options: ["Software", "Hardware only", "Optical", "Analog"],
        correctAnswer: "Software",
        explanation: "Notes: 'The checksum is well-suited for software implementation.'",
        difficultyLevel: "MEDIUM"
    },

    // ============================================================
    // NOISELESS CHANNEL PROTOCOLS
    // ============================================================
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, a noiseless channel is an ideal channel where there is no chance of frame loss, data corruption, or _______.",
        options: ["Duplication", "Transmission", "Framing", "Addressing"],
        correctAnswer: "Duplication",
        explanation: "Notes: 'Noiseless channel is a type of ideal channel where there is no chance of frame lost, data corruption or duplication.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that the noiseless channel contains two protocols: Simplest Protocol and _______.",
        options: ["Stop and Wait ARQ", "Go-Back-N ARQ", "Selective Repeat ARQ", "CSMA/CD"],
        correctAnswer: "Stop and Wait ARQ",
        explanation: "Notes: 'The noiseless channel contains two protocols: Simplest protocol and Stop and Wait ARQ.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that the Stop-and-Wait protocol came to light because the Simplest Protocol sent data frames irrespective of the receiver's _______.",
        options: ["Bandwidth", "MAC address", "IP address", "Sequence number"],
        correctAnswer: "Bandwidth",
        explanation: "Notes: 'The stop and wait protocol came to light because in Simplest protocol the data frames are sent irrespective of the receiver's bandwidth.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In Stop-and-Wait protocol, after a frame is received by the receiver, a(n) _______ frame is sent back to the sender before the next frame is transmitted.",
        options: ["Acknowledgement", "Error", "Token", "Jam"],
        correctAnswer: "Acknowledgement",
        explanation: "Notes: 'After the frame is received by the receiver then a acknowledgement frame is sent by the receiver to sender after the acknowledgement frame is received next frame is sent by the sender.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that in the Simplest Protocol, both sender and receiver use a _______ Forever algorithm, meaning the process repeats infinitely.",
        options: ["Repeat", "Loop", "Execute", "Continue"],
        correctAnswer: "Repeat",
        explanation: "Notes: 'This process has a Repeat Forever algorithm to be executed. The loop is infinite loop because the condition of the loop is always true.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "In the Simplest Protocol, on the sender site, data from the _______ layer is made into frames and sent to the physical layer.",
        options: ["Network", "Transport", "Session", "Application"],
        correctAnswer: "Network",
        explanation: "Notes: 'On sender site of this protocol the data from network layer is sent to datalink layer made frames and is sent to physical layer and then to receiver.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 2: DLL Protocols", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "At the receiver site of Stop-and-Wait Protocol, after the frame is accepted and an acknowledgement is sent, the data is extracted from the frame and sent to _______ layers.",
        options: ["Upper (Network)", "Lower (Physical)", "Data Link", "Transport"],
        correctAnswer: "Upper (Network)",
        explanation: "Notes: 'After the acknowledgement is sent the data is extracted from frame and sent to upper layers.'",
        difficultyLevel: "MEDIUM"
    },
    // TWO-DIMENSIONAL PARITY CHECK
    {
        subjectId, moduleName: "Unit 2: Parity Check", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the two-dimensional parity check as having a minimum Hamming distance of 3, so it can detect _______ errors and correct a single error.",
        options: ["3", "1", "2", "4"],
        correctAnswer: "3",
        explanation: "Notes: 'This two dimensional parity check code uses minimum hamming distance is 3. So, it detects 3 errors and corrects single error.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: Parity Check", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in two-dimensional parity check, four errors in a specific _______ pattern cannot be detected because they don't affect the parity bits.",
        options: ["Square/rectangular", "Diagonal", "Linear", "Random"],
        correctAnswer: "Square/rectangular",
        explanation: "Notes: 'Four errors in the pattern given in fig(d) cannot be detected because they don't change or affect the parity bits.'",
        difficultyLevel: "HARD"
    },
    // POLYNOMIAL REPRESENTATION
    {
        subjectId, moduleName: "Unit 2: CRC", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that a better way to understand cyclic codes is using _______.",
        options: ["Polynomials", "Matrices", "Boolean algebra", "Decimal arithmetic"],
        correctAnswer: "Polynomials",
        explanation: "Notes: 'A better way to understand cyclic codes is using polynomials.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CRC", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "In polynomial representation of cyclic codes, the _______ of each term shows the position of the bit, while the coefficient shows the value.",
        options: ["Power (exponent)", "Coefficient", "Variable", "Remainder"],
        correctAnswer: "Power (exponent)",
        explanation: "Notes: 'The power of each term shows the position of the bit; coefficient shows the value.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 2: CRC", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in polynomial arithmetic for cyclic codes, addition and subtraction are the _______ operation because coefficients use modulo-2 addition.",
        options: ["Same (XOR)", "Different", "Multiplication", "Division"],
        correctAnswer: "Same (XOR)",
        explanation: "Notes: 'First, addition and subtraction are same.' (because modulo-2 arithmetic is used).",
        difficultyLevel: "HARD"
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
    console.log(`\n✅ PDF 4 (Unit 2 - Framing, Error Codes, CRC, Checksum) IMEKAMILIKA!`);
    console.log(`   Maswali mapya yaliyoingia: ${inserted}`);
    console.log(`   Yaliyorukwa (yalikuwepo): ${skipped}`);
    console.log(`   JUMLA YOTE DATABASE: ${total}`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
