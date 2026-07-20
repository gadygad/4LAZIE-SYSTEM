const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const subjectId = "6a49ecb538bb37720e3e9193"; // SERVER ADMINISTRATION

const mcqBank = [
    { q: "What is the primary design philosophy difference between a Normal OS and a Server OS?", opts: ["Server OS prioritizes throughput and uptime, while Normal OS prioritizes responsiveness and GUI", "Server OS is only CLI, Normal OS is only GUI", "Normal OS handles heavier workloads than Server OS", "There is no difference"], ans: "Server OS prioritizes throughput and uptime, while Normal OS prioritizes responsiveness and GUI", exp: "A normal OS is optimized for a single user's fast experience, while a server OS is built to serve many users and manage shared resources efficiently." },
    { q: "Which of the following is an example of a Server Operating System?", opts: ["Red Hat Enterprise Linux", "Windows 11", "macOS Sonoma", "ChromeOS"], ans: "Red Hat Enterprise Linux", exp: "RHEL, Windows Server 2022, and Ubuntu Server are examples of Server Operating Systems." },
    { q: "What does the subnet mask determine in IP configuration?", opts: ["Which part of the IP address identifies the network and which identifies the host", "The physical MAC address of the server", "The speed of the network connection", "The encryption standard used"], ans: "Which part of the IP address identifies the network and which identifies the host", exp: "The subnet mask is a critical setting that divides the IP address into the network portion and the host portion." },
    { q: "Which backup type only backs up data changed since the last backup (saving space and time)?", opts: ["Incremental Backup", "Full Backup", "Differential Backup", "System Restore"], ans: "Incremental Backup", exp: "Incremental backups only save the changes made since the most recent backup, unlike differential which backs up changes since the last FULL backup." },
    { q: "Which tool is commonly used for network traffic monitoring?", opts: ["Wireshark", "Task Manager", "Event Viewer", "Disk Management"], ans: "Wireshark", exp: "Wireshark, netstat, and SNMP-based monitors are used to track network traffic and detect bottlenecks." },
    { q: "What is the role of a Default Gateway?", opts: ["It is a router address that allows devices on a subnet to communicate with external networks", "It blocks unauthorized traffic", "It dynamically assigns IP addresses", "It translates domain names to IPs"], ans: "It is a router address that allows devices on a subnet to communicate with external networks", exp: "Without a default gateway, a device cannot send or receive packets outside of its local network." },
    { q: "What is 'Clean Installation' in the context of OS deployment?", opts: ["Installing a new OS on a formatted disk without retaining previous system files", "Installing the OS alongside a virus scanner", "Upgrading the OS while keeping all files", "Restoring from a backup image"], ans: "Installing a new OS on a formatted disk without retaining previous system files", exp: "Clean installation wipes the storage device completely, ensuring a fresh and stable system environment." },
    { q: "Which of the following defines 'Authentication' vs 'Authorization'?", opts: ["Authentication verifies identity, Authorization determines access rights", "Authentication encrypts data, Authorization decrypts it", "Authentication is for hardware, Authorization is for software", "There is no difference between them"], ans: "Authentication verifies identity, Authorization determines access rights", exp: "Authentication is proving WHO you are (e.g., logging in). Authorization is WHAT you are allowed to do (e.g., read-only access)." },
    { q: "What does 'System Throughput' refer to in a server environment?", opts: ["The amount of work a system can complete in a given time", "How fast a single application opens", "The visual quality of the GUI", "The length of the ethernet cable"], ans: "The amount of work a system can complete in a given time", exp: "Server OSs prioritize throughput (handling many requests) over responsiveness (how quickly one app opens)." },
    { q: "In a typical Class C network, what does the subnet mask 255.255.255.0 indicate?", opts: ["The first 24 bits are the network portion, allowing up to 254 hosts", "The entire IP is the host portion", "It is reserved for loopback testing", "It cannot communicate with other devices"], ans: "The first 24 bits are the network portion, allowing up to 254 hosts", exp: "255.255.255.0 covers the first 3 octets (24 bits) for the network, leaving the last octet (8 bits) for up to 254 usable hosts." }
];

const shortAnswerBank = [
    { q: "List and explain four key differences between a Normal Operating System and a Server Operating System.", ans: "1. Purpose: Normal is for personal use, Server manages network resources. 2. Workload: Normal handles light tasks, Server handles heavy concurrent tasks. 3. Optimization: Normal prioritizes responsiveness, Server prioritizes uptime/throughput. 4. Scalability: Server is highly scalable for growing users.", exp: "A normal OS focuses on a single user's GUI experience, while a server OS runs in the background serving thousands of clients." },
    { q: "Describe the three main types of Backup and Disaster Recovery Strategies.", ans: "Full Backup (complete copy), Incremental Backup (changes since last backup), Differential Backup (changes since last full backup).", exp: "A mix of these is usually scheduled (e.g., Full on Sunday, Incremental on weekdays) to balance storage space and recovery speed." },
    { q: "Explain the importance of Hostname and IP Configuration during post-installation setup.", ans: "Hostname provides a unique identifier on the network. Static IP ensures the server can always be reliably found by clients and other services.", exp: "Without a fixed IP and clear hostname, clients (like computers wanting to access a file share) would lose connection if the server's address changed." },
    { q: "Describe the main steps involved in the installation of a Server Operating System.", ans: "1. Hardware Requirements Checking, 2. BIOS/UEFI Configuration, 3. Bootable Media Creation, 4. Partitioning/Disk Setup, 5. Role Selection.", exp: "Unlike a normal OS, a server OS installation also involves selecting specific roles (like Web Server, Database, AD) to define its function." },
    { q: "Explain the concept of Multi-user Scheduling in Server Operating Systems.", ans: "It is the process by which the OS manages and coordinates the execution of processes from multiple users concurrently, ensuring fair-share without degradation.", exp: "Techniques like time-sharing and priority scheduling ensure no single user monopolizes CPU or memory, allowing hundreds of users to work simultaneously." }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function run() {
    try {
        await client.connect();
        const db = client.db('school_db');
        
        let questionsToInsert = [];
        
        const addMCQs = (count, category) => {
            for(let i=0; i<count; i++) {
                const baseQ = mcqBank[i % mcqBank.length];
                const finalOptions = [...baseQ.opts];
                shuffle(finalOptions);
                questionsToInsert.push({
                    subjectId: subjectId,
                    category: category,
                    type: "MULTIPLE_CHOICE",
                    difficulty: "MEDIUM",
                    questionText: baseQ.q,
                    correctAnswer: baseQ.ans,
                    explanation: baseQ.exp,
                    options: finalOptions,
                    _class: "com.school.model.Question"
                });
            }
        };

        const addShortAnswers = (count, category) => {
            for(let i=0; i<count; i++) {
                const baseQ = shortAnswerBank[i % shortAnswerBank.length];
                questionsToInsert.push({
                    subjectId: subjectId,
                    category: category,
                    type: "SHORT_ANSWER",
                    difficulty: "HARD",
                    questionText: baseQ.q,
                    correctAnswer: baseQ.ans,
                    explanation: baseQ.exp,
                    options: [],
                    _class: "com.school.model.Question"
                });
            }
        };

        // Add to Quiz, Exercise, Possible Qns
        addMCQs(10, "QUIZ");
        addMCQs(15, "EXERCISE");
        addShortAnswers(10, "POSSIBLE QNS");
        
        // Add to CAT 1 (Unit 1 stuff)
        addMCQs(5, "CAT 1");
        addShortAnswers(5, "CAT 1");

        // Add to UE (All units mixed)
        addMCQs(10, "UE");
        addShortAnswers(10, "UE");

        const result = await db.collection('questions').insertMany(questionsToInsert);
        console.log(`Successfully inserted ${result.insertedCount} additional questions for Unit 1 and 5 of SERVER ADMINISTRATION.`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
