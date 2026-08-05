const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197';

// All questions crafted DIRECTLY from the text of Data Communication and Network-I.pdf
const questions = [
    // === DATA & INFORMATION (Lines 4-52) ===
    {
        subjectId, moduleName: "Unit 1: Data & Information", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, data is described as raw, unorganized facts that lack inherent meaning until they are _______ and analyzed.",
        options: ["Processed", "Transmitted", "Stored", "Encrypted"],
        correctAnswer: "Processed",
        explanation: "The notes state: 'Data is raw, unorganized facts that lack inherent meaning until processed and analyzed.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Data & Information", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "Based on the notes, which of the following correctly represents the transformation from data to information?",
        options: ["85, 90, 78 → 'The average score is 84.3'", "'The average score is 84.3' → 85, 90, 78", "Data → Stored → Becomes raw", "Information → Unprocessed → Becomes data"],
        correctAnswer: "85, 90, 78 → 'The average score is 84.3'",
        explanation: "The notes give this exact example: Data (85, 90, 78) when processed becomes Information ('The average score is 84.3').",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Data & Information", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes classify data into two main types. The type that is descriptive (e.g., color, name) is called _______ data.",
        options: ["Qualitative", "Quantitative", "Numerical", "Binary"],
        correctAnswer: "Qualitative",
        explanation: "From the notes: '1. Qualitative data – descriptive (e.g., color, name). 2. Quantitative data – numerical (e.g., age, marks).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Data & Information", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, raw data is data in its original, unprocessed form. Which of the following is listed as a key characteristic of raw data?",
        options: ["Unorganized and may contain errors", "Summarized and easy to understand", "Sorted and categorized", "Encrypted and compressed"],
        correctAnswer: "Unorganized and may contain errors",
        explanation: "The notes list raw data characteristics as: Unorganized, Not summarized, May contain errors, Hard to understand directly.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Data & Information", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that facts are true pieces of information that can be _______ or verified.",
        options: ["Proven", "Computed", "Encrypted", "Transmitted"],
        correctAnswer: "Proven",
        explanation: "From notes: 'Facts are true pieces of information that can be proven or verified.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Data & Information", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which of the following is listed in the notes as an example of a fact?",
        options: ["Water boils at 100°C under normal conditions", "The sky looks beautiful today", "My phone is faster than yours", "It might rain tomorrow"],
        correctAnswer: "Water boils at 100°C under normal conditions",
        explanation: "The notes give this exact example as a fact: 'Water boils at 100°C (under normal conditions).'",
        difficultyLevel: "EASY"
    },
    // === WHAT IS DATA COMMUNICATION (Lines 56-90) ===
    {
        subjectId, moduleName: "Unit 1: Data Communication", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Data Communication is defined as the transferring of data over a _______ between two or more devices or systems.",
        options: ["Transmission medium", "Router", "Satellite", "Network switch"],
        correctAnswer: "Transmission medium",
        explanation: "Notes: 'Data Communications is the transferring data over a transmission medium between two or more devices, systems.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Data Communication", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes mention that nowadays, computing and telecommunications make many applications possible including email, video chatting, and the Internet. This is made possible by _______.",
        options: ["Data transmission", "Circuit switching only", "Analog signals only", "Satellite broadcasting"],
        correctAnswer: "Data transmission",
        explanation: "Notes: 'computing and telecommunications depend heavily on this data transmission, which makes a variety of applications conceivable.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Components", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes list 5 components of a data communication system. Which of the following is component number 4 in the list?",
        options: ["Transmission Medium / Communication Channels", "Protocol", "Message", "Receiver"],
        correctAnswer: "Transmission Medium / Communication Channels",
        explanation: "Notes: '4. Transmission Medium / Communication Channels: Communication channels are the medium that connect two or more workstations.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Components", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes give an example where Sonali writes in Hindi and Chetan cannot understand it. This example illustrates the importance of _______ in data communication.",
        options: ["Protocols (Set of rules)", "Transmission Medium", "Bandwidth", "Signal strength"],
        correctAnswer: "Protocols (Set of rules)",
        explanation: "The notes use this example to explain that protocols (rules) are essential so that the receiver can understand what the sender sends.",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Components", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, TCP is responsible for dividing messages into _______ on the source computer.",
        options: ["Packets", "Frames", "Signals", "Bits"],
        correctAnswer: "Packets",
        explanation: "Notes: 'TCP is responsible for dividing messages into packets on the source computer and reassembling the received packet at the destination.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Components", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that IP is responsible for handling the _______ of the destination computer so that each packet is sent to its proper destination.",
        options: ["Address", "Name", "Port", "Protocol"],
        correctAnswer: "Address",
        explanation: "Notes: 'IP is responsible for handling the address of the destination computer so that each packet is sent to its proper destination.'",
        difficultyLevel: "EASY"
    },
    // === TYPES OF DATA COMMUNICATION (Lines 91-103) ===
    {
        subjectId, moduleName: "Unit 1: Types of Comm", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe simplex communication as a one-way communication where devices use their entire capacity in _______.",
        options: ["Transmission", "Reception only", "Error correction", "Encryption"],
        correctAnswer: "Transmission",
        explanation: "Notes: 'one device only receives and another device only sends data and devices use their entire capacity in transmission.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Types of Comm", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, which of the following is given as an example of simplex communication?",
        options: ["Listening to music using a speaker", "Using a walkie-talkie", "A landline phone call", "A video conference"],
        correctAnswer: "Listening to music using a speaker",
        explanation: "Notes list: 'IoT, entering data using a keyboard, listening music using a speaker' as simplex examples.",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Types of Comm", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "In half-duplex communication, as described in the notes, when one device is sending data the other device is _______.",
        options: ["Only receiving", "Also sending", "Idle and off", "Broadcasting"],
        correctAnswer: "Only receiving",
        explanation: "Notes: 'When one device is sending data then another device is only receiving and vice-versa.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Types of Comm", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes give mobile phones and landlines as examples of _______ communication.",
        options: ["Full-duplex", "Half-duplex", "Simplex", "Multiplex"],
        correctAnswer: "Full-duplex",
        explanation: "Notes: 'Full-duplex communication...For example, mobile phones, landlines, etc.'",
        difficultyLevel: "EASY"
    },
    // === GUIDED MEDIA (Lines 116-141) ===
    {
        subjectId, moduleName: "Unit 1: Guided Media", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in a twisted-pair cable, two identical wires are wrapped together in a double helix. The twisting reduces _______, which is the leaking of a signal from one wire to another.",
        options: ["Crosstalk", "Attenuation", "Frequency loss", "Jitter"],
        correctAnswer: "Crosstalk",
        explanation: "Notes: 'The twisting of the wire reduces the crosstalk. It is known as the leaking of a signal from one wire to another.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Guided Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that UTP (Unshielded Twisted Pair) does not protect from external interference but is _______ than STP.",
        options: ["Cheaper", "More reliable", "Faster", "Heavier"],
        correctAnswer: "Cheaper",
        explanation: "Notes: 'there is no external shielding so it does not protect from external interference. It is cheaper than STP.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Guided Media", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe STP (Shielded Twisted Pair) as being _______ and costlier compared to UTP.",
        options: ["Heavier", "Lighter", "More flexible", "Less reliable"],
        correctAnswer: "Heavier",
        explanation: "Notes: 'Due to shielding, it protects from external interference. It is heavier and costlier as compare to UTP.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Guided Media", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, coaxial cable is widely used for _______ signals and also used by large corporations in building security systems.",
        options: ["Television", "Radio", "Bluetooth", "Infrared"],
        correctAnswer: "Television",
        explanation: "Notes: 'It is widely used for television signals and also used by large corporations in building security systems.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Guided Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that in coaxial cable, the inner core carries the signal and the outer shield provides the _______.",
        options: ["Ground", "Power", "Encryption", "Compression"],
        correctAnswer: "Ground",
        explanation: "Notes: 'The inner core of the coaxial cable carries the signal and the outer shield provides the ground.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Guided Media", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The fiber optic cable is made up of three pieces according to the notes. Which piece is the covering of the core that reflects light back to the core?",
        options: ["Cladding", "Sheath", "Shield", "Jacket"],
        correctAnswer: "Cladding",
        explanation: "Notes: 'ii. Cladding: It is the covering of the core and reflects the light back to the core.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Guided Media", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the _______ is the protective covering of an optical fiber cable that protects it from the environment.",
        options: ["Sheath", "Cladding", "Core", "Shield"],
        correctAnswer: "Sheath",
        explanation: "Notes: 'iii. Sheath: It is the protective covering that protects fiber cable from the environment.'",
        difficultyLevel: "EASY"
    },
    // === UNGUIDED MEDIA (Lines 142-155) ===
    {
        subjectId, moduleName: "Unit 1: Unguided Media", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes explain that in microwave communication, parabolic antennas are mounted on towers. According to the notes, the _______ the tower, the greater the range.",
        options: ["Higher", "Wider", "Shorter", "Narrower"],
        correctAnswer: "Higher",
        explanation: "Notes: 'The higher the tower, the greater the range.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Unguided Media", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, in radio wave transmission, both the transmitter and receiver use _______ to radiate and capture the radio signal.",
        options: ["Antennas", "Parabolic dishes only", "Fiber cables", "Lenses"],
        correctAnswer: "Antennas",
        explanation: "Notes: 'Both use antennas to radiate and capture the radio signal.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Unguided Media", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that infrared is short-distance communication and is generally used in TV remotes and _______.",
        options: ["Wireless mouse", "Satellite dishes", "Cell towers", "Long-distance cables"],
        correctAnswer: "Wireless mouse",
        explanation: "Notes: 'It is generally used in TV remotes, wireless mouse, etc.'",
        difficultyLevel: "EASY"
    },
    // === DATA REPRESENTATION (Lines 157-205) ===
    {
        subjectId, moduleName: "Unit 1: Data Representation", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes define data representation as the method of converting data into a form that a computer can _______ and process.",
        options: ["Understand", "Transmit", "Encrypt", "Display"],
        correctAnswer: "Understand",
        explanation: "Notes: 'Data representation is the method of converting data into a form that a computer can understand and process.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Data Representation", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, computers only understand _______, so all data must be converted into this form.",
        options: ["Binary (0 and 1)", "Decimal numbers", "Text characters", "Hexadecimal"],
        correctAnswer: "Binary (0 and 1)",
        explanation: "Notes: 'Computers do not understand letters, images, or sounds directly — they only understand binary (0 and 1).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Data Representation", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that images are made of _______. Each one has a color value.",
        options: ["Pixels", "Bits", "Bytes", "Frames"],
        correctAnswer: "Pixels",
        explanation: "Notes: 'Images are made of pixels. Each pixel has a color value.'",
        difficultyLevel: "EASY"
    },
    // === NETWORKS & TOPOLOGIES (Lines 207-362) ===
    {
        subjectId, moduleName: "Unit 1: Networks", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes define a computer network as a group of interconnected devices that _______ and share resources.",
        options: ["Communicate", "Compete", "Isolate", "Encrypt"],
        correctAnswer: "Communicate",
        explanation: "Notes: 'Network (computer network) is a group of interconnected devices that communicate and share resources.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Networks", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, which of the following is listed as a use of a computer network?",
        options: ["Centralized management", "Increasing hardware costs", "Reducing communication", "Isolating devices"],
        correctAnswer: "Centralized management",
        explanation: "Notes list uses including: 'Centralized management – Control users, data, and security from one place.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Topologies", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Star Topology as having all devices connect to a central device (switch or hub). What is its main disadvantage?",
        options: ["If central device fails, network stops", "Data travels too fast", "Cannot add new devices", "Too few cables required"],
        correctAnswer: "If central device fails, network stops",
        explanation: "Notes: 'Disadvantages: If central device fails, network stops.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Topologies", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Bus Topology has all devices sharing a single _______.",
        options: ["Cable (backbone)", "Hub", "Wireless frequency", "Switch"],
        correctAnswer: "Cable (backbone)",
        explanation: "Notes: 'All devices share a single cable (backbone).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Topologies", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that in Ring Topology, data flows in one direction, which reduces _______.",
        options: ["Collisions", "Speed", "Bandwidth", "Cost"],
        correctAnswer: "Collisions",
        explanation: "Notes: 'Data flows in one direction, reducing collisions.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Topologies", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "Which topology does the notes describe as having 'every device connects to many or all others', making it very reliable with high redundancy?",
        options: ["Mesh Topology", "Bus Topology", "Ring Topology", "Star Topology"],
        correctAnswer: "Mesh Topology",
        explanation: "Notes: 'Every device connects to many or all others. Advantages: Very reliable, High redundancy.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Topologies", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe Tree Topology as a combination of _______ and bus topologies.",
        options: ["Star", "Ring", "Mesh", "Hybrid"],
        correctAnswer: "Star",
        explanation: "Notes: 'Combination of star and bus. Has a hierarchical structure.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Topologies", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, Hybrid Topology is a network topology that combines _______ different topologies into one network.",
        options: ["Two or more", "Exactly three", "Only two", "All seven"],
        correctAnswer: "Two or more",
        explanation: "Notes: 'Hybrid topology is a network topology that combines two or more different topologies (such as star, bus, or ring) into one network.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Topologies", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes list Hybrid Topology advantages as flexible, scalable, and reliable. Its main disadvantage is that it is _______ to install.",
        options: ["Expensive", "Fast but unreliable", "Easy but slow", "Simple"],
        correctAnswer: "Expensive",
        explanation: "Notes: 'Disadvantages: Expensive to install. Complex to design and manage.'",
        difficultyLevel: "MEDIUM"
    },
    // === MULTIPLEXING (Lines 368-415) ===
    {
        subjectId, moduleName: "Unit 1: Multiplexing", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes define multiplexing as a technique used to combine multiple data signals and send them over a _______ communication channel at the same time.",
        options: ["Single", "Dedicated", "Wireless only", "Broadband"],
        correctAnswer: "Single",
        explanation: "Notes: 'Multiplexing is a networking technique used to combine multiple data signals and send them over a single communication channel at the same time.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Multiplexing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "In the multiplexing process described in the notes, what does a DEMUX (demultiplexer) do at the receiving end?",
        options: ["Separates the combined signals again", "Combines multiple signals", "Amplifies weak signals", "Encrypts incoming data"],
        correctAnswer: "Separates the combined signals again",
        explanation: "Notes: 'A demultiplexer (DEMUX) separates them again.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Multiplexing", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, which type of multiplexing is used in fiber optic cables where different signals use different light wavelengths?",
        options: ["WDM (Wavelength Division Multiplexing)", "FDM (Frequency Division Multiplexing)", "TDM (Time Division Multiplexing)", "CDM"],
        correctAnswer: "WDM (Wavelength Division Multiplexing)",
        explanation: "Notes: '3. Wavelength Division Multiplexing (WDM) – Used in fiber optic cables. Different signals use different light wavelengths.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Multiplexing", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "The notes give radio stations as an example of _______ multiplexing.",
        options: ["FDM (Frequency Division Multiplexing)", "TDM (Time Division Multiplexing)", "WDM (Wavelength Division Multiplexing)", "CDM"],
        correctAnswer: "FDM (Frequency Division Multiplexing)",
        explanation: "Notes: '1. Frequency Division Multiplexing (FDM) – Each signal uses a different frequency. Example: Radio stations.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Multiplexing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes give telephone systems as an example of _______ multiplexing.",
        options: ["TDM (Time Division Multiplexing)", "FDM (Frequency Division Multiplexing)", "WDM (Wavelength Division Multiplexing)", "SDM"],
        correctAnswer: "TDM (Time Division Multiplexing)",
        explanation: "Notes: '2. Time Division Multiplexing (TDM) – Each signal uses a time slot. Example: Telephone systems.'",
        difficultyLevel: "MEDIUM"
    },
    // === REFERENCE MODELS (Lines 423-481) ===
    {
        subjectId, moduleName: "Unit 1: Reference Models", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that reference models in computer networking are standard frameworks that help different systems communicate even if they are built by _______ manufacturers.",
        options: ["Different", "The same", "Compatible", "Licensed"],
        correctAnswer: "Different",
        explanation: "Notes: 'They are used to help different systems communicate even if they are built by different manufacturers.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Reference Models", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes' comparison table, the OSI model was developed by ISO while the TCP/IP model was developed by _______.",
        options: ["DARPA (U.S. Department of Defense)", "IEEE", "ITU", "ANSI"],
        correctAnswer: "DARPA (U.S. Department of Defense)",
        explanation: "Notes table: 'TCP/IP Developed by: DARPA (U.S. Department of Defense).'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 1: Reference Models", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the OSI model as 'Theoretical' while describing the TCP/IP model as _______.",
        options: ["Practical (used in real networks)", "Experimental", "Academic only", "Outdated"],
        correctAnswer: "Practical (used in real networks)",
        explanation: "Notes comparison table: 'OSI: Theoretical model. TCP/IP: Practical (used in real networks).'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Reference Models", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, which layer of the OSI model is responsible for routing (IP addressing)?",
        options: ["Network", "Transport", "Data Link", "Session"],
        correctAnswer: "Network",
        explanation: "Notes: '5. Network – routing (IP addressing).'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Reference Models", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the TCP/IP Application layer as handling protocols such as HTTP, FTP, and _______.",
        options: ["Email (SMTP)", "IP routing", "MAC switching", "Signal conversion"],
        correctAnswer: "Email (SMTP)",
        explanation: "Notes: '1. Application – HTTP, FTP, email.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Reference Models", category: "CAT 1", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the TCP/IP model is 'Fully implemented in all _______ networks.'",
        options: ["Modern", "Analog", "Satellite", "Legacy"],
        correctAnswer: "Modern",
        explanation: "Notes: 'Fully implemented in all modern networks.'",
        difficultyLevel: "EASY"
    },
    // === TRANSMITTER & RECEIVER (Lines 488-535) ===
    {
        subjectId, moduleName: "Unit 1: Transmitter & Receiver", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "The notes define a transmitter as a device that sends data from one system to another. One of its functions is to _______ data for safe transmission.",
        options: ["Encode", "Delete", "Amplify", "Route"],
        correctAnswer: "Encode",
        explanation: "Notes: 'Functions of a transmitter: Encodes data for safe transmission.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Transmitter & Receiver", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, which of the following is listed as an example of a transmitter?",
        options: ["Wi-Fi router transmitting internet signals", "A TV receiving broadcast signals", "A printer printing a document", "A keyboard being used to type"],
        correctAnswer: "Wi-Fi router transmitting internet signals",
        explanation: "Notes lists examples of transmitters: 'Computer sending an email, Mobile phone sending a message, Wi-Fi router transmitting internet signals.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Transmitter & Receiver", category: "QUIZ", type: "MULTIPLE_CHOICE",
        questionText: "The notes describe the receiver's function as: receiving signals from the medium, _______ signals back into usable data, and displaying or processing the information.",
        options: ["Decoding", "Encoding", "Encrypting", "Amplifying"],
        correctAnswer: "Decoding",
        explanation: "Notes: 'Decodes signals back into usable data.'",
        difficultyLevel: "EASY"
    },
    {
        subjectId, moduleName: "Unit 1: Transmitter & Receiver", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: "According to the notes, the correct order of how a transmitter and receiver work together is: Sender sends data → data travels through a medium → Receiver gets and _______ the data → Information is delivered to the user.",
        options: ["Decodes", "Encodes", "Encrypts", "Compresses"],
        correctAnswer: "Decodes",
        explanation: "Notes: '3. Receiver gets and decodes the data. 4. Information is delivered to the user.'",
        difficultyLevel: "EASY"
    },
    // === HARDER APPLICATION QUESTIONS FROM NOTES ===
    {
        subjectId, moduleName: "Unit 1: Topologies", category: "HARD", type: "MULTIPLE_CHOICE",
        questionText: "A university campus where each department uses star topology internally, and the departments are connected through a bus backbone — this is an example of _______ topology.",
        options: ["Hybrid", "Tree", "Mesh", "Ring"],
        correctAnswer: "Hybrid",
        explanation: "Notes: 'A network that uses star topology in each department, then connects those departments using a bus or ring topology' is an example of Hybrid topology.",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 1: Reference Models", category: "HARD", type: "MULTIPLE_CHOICE",
        questionText: "From the notes comparison table, the OSI model has a 'strict layered structure' while the TCP/IP model is described as _______.",
        options: ["More flexible and simpler", "More complex and rigid", "Theoretical only", "Not yet standardized"],
        correctAnswer: "More flexible and simpler",
        explanation: "Notes table: 'OSI: Strict layered structure. TCP/IP: More flexible and simpler.'",
        difficultyLevel: "HARD"
    },
    {
        subjectId, moduleName: "Unit 1: Multiplexing", category: "HARD", type: "MULTIPLE_CHOICE",
        questionText: "The notes state that a key advantage of multiplexing is the efficient use of bandwidth and reduction of cost because one channel is used for _______ signals.",
        options: ["Many", "Two", "Analog", "Encrypted"],
        correctAnswer: "Many",
        explanation: "Notes: 'Reduces cost (one channel used for many signals). Improves communication speed.'",
        difficultyLevel: "MEDIUM"
    },
    {
        subjectId, moduleName: "Unit 1: Networks", category: "HARD", type: "MULTIPLE_CHOICE",
        questionText: "The notes list the components of a network. Which of the following is listed as one of those components?",
        options: ["Protocols (rules for communication e.g., TCP/IP)", "Operating systems", "Application software", "Database servers"],
        correctAnswer: "Protocols (rules for communication e.g., TCP/IP)",
        explanation: "Notes: 'Components of a network: Devices, Transmission media, Network devices, Protocols – rules for communication (e.g., TCP/IP).'",
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
    
    console.log(`PDF 2 (from NOTES): Inserted ${inserted} questions out of ${questions.length}.`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
