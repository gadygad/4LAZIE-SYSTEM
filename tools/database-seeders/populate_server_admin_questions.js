const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const subjectId = "6a49ecb538bb37720e3e9193"; // SERVER ADMINISTRATION

const mcqBank = [
    { q: "What does DHCP stand for?", opts: ["Dynamic Host Configuration Protocol", "Domain Host Control Protocol", "Dynamic Hardware Configuration Protocol", "Data Host Control Protocol"], ans: "Dynamic Host Configuration Protocol", exp: "DHCP dynamically assigns IP addresses to devices on a network." },
    { q: "Which of the following is NOT a stage in the DHCP lease process (DORA)?", opts: ["Discover", "Offer", "Request", "Authorize"], ans: "Authorize", exp: "The four stages of DORA are Discover, Offer, Request, and Acknowledgment." },
    { q: "What is the primary advantage of NTFS over FAT32?", opts: ["Security and Access Control (ACLs)", "Simplicity", "Faster boot times", "Native Linux support"], ans: "Security and Access Control (ACLs)", exp: "NTFS provides file and folder permissions using Access Control Lists (ACLs), which FAT32 lacks." },
    { q: "Which file system is standard for modern Linux environments and supports extents and journaling?", opts: ["EXT4", "NTFS", "exFAT", "ZFS"], ans: "EXT4", exp: "EXT4 is the standard Linux file system supporting large volumes and journaling." },
    { q: "Which Linux command changes file ownership?", opts: ["chown", "chmod", "chgrp", "ls"], ans: "chown", exp: "chown is used to change the owner of a file or directory." },
    { q: "In numeric (octal) Linux file permissions, what does 755 mean?", opts: ["Owner full, group read+execute, others read+execute", "Owner full, group full, others read", "Owner read+execute, group read, others read", "Everyone full access"], ans: "Owner full, group read+execute, others read+execute", exp: "7 = rwx (4+2+1). 5 = r-x (4+1). Thus 755 is Owner full, group/others read+execute." },
    { q: "Which secure file transfer protocol runs over SSH and uses port 22?", opts: ["SFTP", "FTPS", "WebDAV", "SMB"], ans: "SFTP", exp: "SFTP (SSH File Transfer Protocol) uses a single connection on Port 22 and encrypts data and authentication." },
    { q: "Which access control model assigns permissions based on roles like Admin or Student?", opts: ["Role-Based Access Control (RBAC)", "Mandatory Access Control (MAC)", "Discretionary Access Control (DAC)", "Access Control List (ACL)"], ans: "Role-Based Access Control (RBAC)", exp: "RBAC simplifies management by assigning permissions to roles rather than individual users." },
    { q: "What is the primary function of a Domain Controller in Active Directory?", opts: ["Authenticate and authorize users", "Provide internet access", "Manage email servers", "Assign IP addresses"], ans: "Authenticate and authorize users", exp: "A DC responds to authentication requests and verifies users within a network domain." },
    { q: "Which tool is used to test DNS resolution and confirm domain names map to correct IP addresses?", opts: ["nslookup", "nltest", "dcdiag", "ping"], ans: "nslookup", exp: "nslookup resolves domain names to IP addresses to ensure DNS is working." },
    { q: "What is a 'Scope' in DHCP?", opts: ["The defined range of IP addresses a server can assign", "The amount of time a device keeps an IP", "The physical distance a signal can travel", "A security policy applied to IPs"], ans: "The defined range of IP addresses a server can assign", exp: "A scope ensures the server only distributes IPs within a specific predefined set." },
    { q: "Which command flushes the DNS cache on Windows?", opts: ["ipconfig /flushdns", "ipconfig /release", "ipconfig /renew", "ping /flush"], ans: "ipconfig /flushdns", exp: "ipconfig /flushdns is used to clear the local DNS resolver cache." },
    { q: "What port does SMB (Server Message Block) modernly use?", opts: ["445", "2049", "21", "22"], ans: "445", exp: "SMB natively uses port 445 (TCP) for Windows network sharing." },
    { q: "Which concept defines that users should only have the access necessary to perform their tasks?", opts: ["Principle of Least Privilege", "Inheritance", "Role-Based Access", "Mandatory Access"], ans: "Principle of Least Privilege", exp: "Least Privilege is a security best practice minimizing potential damage from errors or breaches." },
    { q: "What is used in Active Directory to define configurations and security policies applied to users and computers?", opts: ["Group Policy Objects (GPOs)", "Organizational Units (OUs)", "Distribution Groups", "Domain Controllers"], ans: "Group Policy Objects (GPOs)", exp: "GPOs allow centralized and automated management of system settings across the domain." }
];

const shortAnswerBank = [
    { q: "Explain the four stages of the DHCP lease process (DORA).", ans: "Discover, Offer, Request, Acknowledgment.", exp: "1. Discover: Client broadcasts looking for a server. 2. Offer: Server offers an IP. 3. Request: Client requests the offered IP. 4. Acknowledgment: Server confirms assignment." },
    { q: "Describe the purpose and types of Groups in Active Directory.", ans: "Groups simplify permission management. Types include Security groups (for resource access) and Distribution groups (for email lists).", exp: "Instead of assigning permissions to each user, administrators assign them to a group (like Security groups). Distribution groups are strictly for email." },
    { q: "Differentiate between Dynamic IP (DHCP) addressing and Static IP addressing.", ans: "Dynamic IPs are assigned automatically and temporarily by a server. Static IPs are manually configured and remain permanent.", exp: "DHCP is flexible and scales well for large networks. Static IPs are preferred for servers and printers that need fixed addresses." },
    { q: "State four advantages of using a Server Operating System in an enterprise environment.", ans: "Centralized management, enhanced security, scalability, and support for enterprise roles (AD, DNS, DHCP).", exp: "Server OSs are designed to handle heavy multi-user workloads, provide advanced networking features, and ensure high reliability." },
    { q: "With clear examples, explain secure file transfer methods (SFTP, FTPS, SCP) and their advantages over traditional FTP.", ans: "SFTP uses SSH (port 22) for secure management. FTPS uses SSL/TLS over FTP. SCP uses SSH for quick copying.", exp: "Traditional FTP sends credentials and data in plaintext. Secure methods encrypt data, preventing interception during transmission." },
    { q: "Explain the importance of file permissions and the Principle of Least Privilege in file management.", ans: "Permissions control who can read/write/execute. Least Privilege ensures users only have access needed for their job.", exp: "This prevents unauthorized access and limits damage if an account is compromised." },
    { q: "Describe four methods used for remote file access and explain the best use case for each method.", ans: "NFS (Linux LANs), SMB (Windows networks), SSHFS (Secure remote mounting), WebDAV (HTTP/Cloud access).", exp: "NFS is fast for Linux. SMB handles mixed Windows/Linux. SSHFS is great for secure remote admin. WebDAV is best for web-based collaboration." },
    { q: "Explain in detail the complete lifecycle of a Server Operating System.", ans: "Installation, Post-installation (Hostname, IPs, Updates), Role Configuration, Maintenance, and Decommissioning/Reinstallation.", exp: "A server lifecycle involves careful planning, securing the system immediately after install, deploying roles (like AD), and ongoing patching." },
    { q: "Explain the steps to configure a Static IP Address on a server.", ans: "Navigate to Network settings, enter the IPv4 Address, Subnet Mask, Default Gateway, and Preferred DNS Server.", exp: "Static IPs are required for infrastructure servers (like Domain Controllers) so clients can always reach them at a known address." }
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
        
        // Helper to generate MCQs
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

        // Helper to generate Short Answer / Essays
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

        // Generate counts as agreed
        addMCQs(15, "QUIZ");
        addMCQs(25, "EXERCISE");
        addShortAnswers(30, "POSSIBLE QNS");
        
        // CAT 1: Unit 1 & 2 (17 questions)
        addMCQs(7, "CAT 1");
        addShortAnswers(10, "CAT 1");

        // CAT 2: Unit 3 & 4 (17 questions)
        addMCQs(7, "CAT 2");
        addShortAnswers(10, "CAT 2");

        // UE: 30 questions
        addMCQs(15, "UE");
        addShortAnswers(15, "UE");

        const result = await db.collection('questions').insertMany(questionsToInsert);
        console.log(`Successfully generated and inserted ${result.insertedCount} highly contextual notes-based questions for SERVER ADMINISTRATION.`);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
