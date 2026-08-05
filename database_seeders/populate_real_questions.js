const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('school_db');
        
        // Find the "SERVER ADMINISTRATION" subject
        const subject = await db.collection('subjects').findOne({ name: /SERVER ADMINISTRATION/i });
        if (!subject) {
            console.log("No subject found for Server Administration.");
            process.exit(1);
        }
        
        const subjectId = subject._id.toString();
        const subjectName = subject.name;
        console.log(`Generating highly realistic questions for: ${subjectName} (Unit 3: Server Functionality & File Management)`);

        function createQuestion(category, type, text, options, correctIndex, explanation, difficulty = "MEDIUM") {
            const correctAnswerText = options ? options[correctIndex] : "Correct Answer";
            const q = {
                subjectId: subjectId,
                category: category,
                type: type, // MULTIPLE_CHOICE, TRUE_FALSE, SHORT_ANSWER
                difficulty: difficulty,
                questionText: text,
                correctAnswer: correctAnswerText,
                explanation: explanation,
                _class: "com.school.model.Question"
            };
            if (options) q.options = options;
            return q;
        }

        const questionsToInsert = [];

        // --- CAT 1 (17 Questions) - Focus: Basics of Server Functions & Initial File Mgmt ---
        // Section A: 10 Multiple Choice
        const cat1_mcq = [
            ["What is the primary role of a File Server in an enterprise network?", ["To route internet traffic", "To store and manage user files centrally", "To host web applications", "To manage IP addresses"], 1, "A file server provides a central location for storing and sharing files across the network."],
            ["Which file system is native to Windows Server and supports advanced features like encryption and compression?", ["ext4", "FAT32", "NTFS", "APFS"], 2, "NTFS (New Technology File System) is the default for Windows Server."],
            ["In Linux server administration, what does the 'chmod' command do?", ["Changes file owner", "Changes file permissions", "Changes file directory", "Checks disk space"], 1, "chmod modifies the read, write, and execute permissions of a file."],
            ["Which protocol is most commonly used for file sharing between Windows computers?", ["NFS", "FTP", "SMB/CIFS", "HTTP"], 2, "Server Message Block (SMB) is the standard protocol for Windows file sharing."],
            ["What is a 'Share Permission' in Windows Server?", ["Permissions applied locally on the hard drive", "Permissions that only apply when accessing the file over the network", "Permissions for internet access", "Permissions for printer sharing only"], 1, "Share permissions apply only to network access, while NTFS permissions apply locally and over the network."],
            ["Which of the following describes 'Disk Quotas'?", ["A limit on the CPU usage of a server", "A limit on how much disk space a user can consume", "A backup scheduling tool", "A method to compress files"], 1, "Disk quotas allow administrators to limit the amount of storage space allocated to users."],
            ["What is the purpose of DFS (Distributed File System) in Windows Server?", ["To distribute internet bandwidth", "To group shared folders located on different servers into one logical namespace", "To format hard drives", "To install operating systems remotely"], 1, "DFS provides a unified namespace for shared folders distributed across multiple servers."],
            ["In a Linux server, which configuration file is used to manage NFS exports?", ["/etc/fstab", "/etc/exports", "/etc/smb.conf", "/etc/network"], 1, "/etc/exports lists the directories that are shared via NFS."],
            ["What does the 'chown' command do in Linux?", ["Changes permissions", "Changes file owner", "Changes file format", "Creates a new file"], 1, "chown stands for 'change owner' and modifies the user ownership of a file."],
            ["Which port does FTP typically use for control connections?", ["Port 80", "Port 22", "Port 21", "Port 443"], 2, "FTP uses port 21 for control and port 20 for data transfer."]
        ];
        cat1_mcq.forEach(q => questionsToInsert.push(createQuestion("CAT", "MULTIPLE_CHOICE", q[0], q[1], q[2], q[3])));

        // Section B: 5 True/False
        const cat1_tf = [
            ["True or False: NTFS permissions are cumulative when a user belongs to multiple groups.", ["True", "False"], 0, "When a user belongs to multiple groups, their effective NTFS permissions are a combination (cumulative) of all group permissions, except for 'Deny' which overrides all."],
            ["True or False: FAT32 supports file-level security and encryption.", ["True", "False"], 1, "FAT32 does not support file-level security; this is a feature of NTFS."],
            ["True or False: A Web Server is an example of server functionality.", ["True", "False"], 0, "Yes, hosting websites is a core server functionality."],
            ["True or False: NFS is native to Windows environments.", ["True", "False"], 1, "NFS (Network File System) is native to UNIX/Linux environments."],
            ["True or False: DFS Replication can be used to synchronize files between two servers for redundancy.", ["True", "False"], 0, "DFS Replication keeps folders synchronized across multiple servers."]
        ];
        cat1_tf.forEach(q => questionsToInsert.push(createQuestion("CAT", "TRUE_FALSE", q[0], q[1], q[2], q[3])));

        // Section C: 2 Short Answer
        questionsToInsert.push(createQuestion("CAT", "SHORT_ANSWER", "Explain the difference between Share Permissions and NTFS Permissions in Windows Server.", null, 0, "Share permissions only apply when accessing a folder over the network. NTFS permissions apply to both local and network access, providing more granular control."));
        questionsToInsert.push(createQuestion("CAT", "SHORT_ANSWER", "Define the term 'Server Role' and give two examples.", null, 0, "A Server Role describes the primary function of a server, such as a File Server, Print Server, Web Server, or Active Directory Domain Controller."));

        // --- CAT 2 (17 Questions) - Focus: Advanced Server Functionality ---
        const cat2_mcq = [
            ["What is the function of the FSRM (File Server Resource Manager) role in Windows?", ["To monitor network traffic", "To manage file screening, quotas, and storage reports", "To manage Active Directory users", "To host databases"], 1, "FSRM provides advanced file management tools including quotas and file screens."],
            ["Which feature prevents users from saving specific types of files (like MP3s) on a file server?", ["Disk Quotas", "DFS Namespace", "File Screening", "Access Control Lists"], 2, "File Screening in FSRM allows admins to block specific file extensions."],
            ["What is the most restrictive NTFS permission?", ["Read", "Modify", "Deny", "Write"], 2, "An explicit 'Deny' permission overrides any 'Allow' permissions the user might have."],
            ["In Linux, what permission number represents 'Read, Write, and Execute'?", ["4", "5", "6", "7"], 3, "Read=4, Write=2, Execute=1. Total = 7."],
            ["What does RAID 1 provide for a file server?", ["Striping for performance", "Mirroring for fault tolerance", "Parity for error checking", "JBOD storage"], 1, "RAID 1 mirrors data across two disks to ensure fault tolerance."],
            ["Which of the following is NOT a standard Windows Server file sharing permission?", ["Read", "Change", "Full Control", "Execute Only"], 3, "The standard share permissions are Read, Change, and Full Control."],
            ["If a user has 'Read' share permission and 'Modify' NTFS permission, what is their effective network permission?", ["Modify", "Read", "Full Control", "Write"], 1, "When accessing over a network, the effective permission is the most restrictive combination of Share and NTFS permissions."],
            ["What service allows Windows servers to map domain names to IP addresses?", ["DHCP", "DNS", "WINS", "Active Directory"], 1, "DNS (Domain Name System) resolves names to IP addresses."],
            ["Which protocol provides secure file transfer over SSH?", ["TFTP", "FTP", "SFTP", "HTTP"], 2, "SFTP (SSH File Transfer Protocol) provides a secure channel."],
            ["What is a 'Hidden Share' in Windows?", ["A share ending with a $ symbol", "A share encrypted with BitLocker", "A share with no NTFS permissions", "A share hosted on a Linux server"], 0, "Appending a $ to a share name (e.g., Admin$) hides it from casual network browsing."]
        ];
        cat2_mcq.forEach(q => questionsToInsert.push(createQuestion("CAT", "MULTIPLE_CHOICE", q[0], q[1], q[2], q[3], "HARD")));

        // Section B: 5 True/False
        const cat2_tf = [
            ["True or False: The 'Administrator' account has implicit access to all files, even if explicitly denied.", ["True", "False"], 1, "If explicitly denied, even an Administrator cannot access the file without first taking ownership of it."],
            ["True or False: FSRM quotas can be set as 'Hard' or 'Soft'.", ["True", "False"], 0, "Hard quotas prevent users from saving files when the limit is reached, while soft quotas only trigger warnings."],
            ["True or False: DFS Namespaces require Active Directory to function.", ["True", "False"], 1, "DFS Namespaces can be domain-based (requiring AD) or standalone (not requiring AD)."],
            ["True or False: 'chmod 755' gives everyone full permissions.", ["True", "False"], 1, "755 gives the owner full permissions, but group and others only get read and execute permissions."],
            ["True or False: A print server manages spooling and print queues for network printers.", ["True", "False"], 0, "Yes, that is the primary function of a print server."]
        ];
        cat2_tf.forEach(q => questionsToInsert.push(createQuestion("CAT", "TRUE_FALSE", q[0], q[1], q[2], q[3], "HARD")));

        // Section C: 2 Short Answer
        questionsToInsert.push(createQuestion("CAT", "SHORT_ANSWER", "Explain the concept of 'Effective Permissions'.", null, 0, "Effective permissions are the actual rights a user has when multiple permissions (group memberships, Share vs NTFS) are combined. It is usually the most restrictive of the overlapping access rights.", "HARD"));
        questionsToInsert.push(createQuestion("CAT", "SHORT_ANSWER", "What is the primary benefit of using a DFS Namespace?", null, 0, "It simplifies user access by providing a single, logical folder structure, hiding the complexity of where the files are physically stored across multiple servers.", "HARD"));

        // Create a large pool of distinct questions to randomly sample from
        const allDistinctQuestions = [
            ...cat1_mcq, ...cat1_tf,
            ...cat2_mcq, ...cat2_tf,
            ["What is Active Directory?", ["A web server", "A directory service", "A file system", "A printer protocol"], 1, "AD is a directory service developed by Microsoft."],
            ["What port does RDP use by default?", ["3389", "80", "443", "22"], 0, "Remote Desktop Protocol uses port 3389."],
            ["What does DHCP do?", ["Assigns IP addresses", "Translates names to IPs", "Encrypts traffic", "Filters spam"], 0, "DHCP assigns IP addresses dynamically."],
            ["Which command checks network connectivity?", ["ping", "ipconfig", "ls", "chmod"], 0, "Ping tests reachability to another network host."],
            ["What is the purpose of a Subnet Mask?", ["To mask the MAC address", "To define the network and host portions of an IP", "To encrypt IP traffic", "To speed up the internet"], 1, "A subnet mask determines which part of the IP is the network."],
            ["What is LDAP used for?", ["File sharing", "Accessing and maintaining distributed directory info", "Sending emails", "Browsing the web"], 1, "Lightweight Directory Access Protocol is used for Active Directory."],
            ["Which type of DNS record maps a name to an IPv4 address?", ["MX", "CNAME", "A", "AAAA"], 2, "An 'A' record maps a hostname to an IPv4 address."],
            ["What does RAID 5 require?", ["Exactly 2 disks", "At least 3 disks", "Exactly 4 disks", "Only 1 disk"], 1, "RAID 5 requires a minimum of 3 disks to distribute parity."],
            ["Which role is needed to deploy Windows over the network?", ["WDS", "WSUS", "IIS", "Hyper-V"], 0, "Windows Deployment Services (WDS) is used for network installations."],
            ["What is WSUS used for?", ["Web hosting", "Managing and distributing Windows updates", "File sharing", "DNS resolution"], 1, "Windows Server Update Services manages updates."],
            ["Which tool is used to manage Group Policy?", ["Active Directory Users and Computers", "Group Policy Management Console", "Server Manager", "Task Manager"], 1, "GPMC is the tool for creating and managing GPOs."],
            ["What is a GPO?", ["General Public Object", "Group Policy Object", "Global Printing Option", "Generic Port Optimizer"], 1, "A Group Policy Object contains policy settings."],
            ["Which of the following provides virtualization in Windows Server?", ["IIS", "Hyper-V", "WDS", "DHCP"], 1, "Hyper-V is Microsoft's hardware virtualization product."],
            ["What is a Domain Controller?", ["A server that manages network printers", "A server that responds to security authentication requests", "A web server", "A firewall"], 1, "A DC authenticates users and computers in a Windows domain."]
        ];

        function getRandomQuestion() {
            const randomItem = allDistinctQuestions[Math.floor(Math.random() * allDistinctQuestions.length)];
            // If length is 4, it's MCQ. If 4 and options are True/False, it's TF.
            let type = "MULTIPLE_CHOICE";
            if (randomItem[1] && randomItem[1].length === 2 && randomItem[1][0] === "True") {
                type = "TRUE_FALSE";
            }
            return {
                type: type,
                text: randomItem[0],
                options: randomItem[1],
                correctIndex: randomItem[2],
                explanation: randomItem[3]
            };
        }

        // --- UE (50 Questions) ---
        for(let i=1; i<=50; i++) {
            let rq = getRandomQuestion();
            questionsToInsert.push(createQuestion("UE", rq.type, rq.text, rq.options, rq.correctIndex, rq.explanation));
        }

        // --- EXERCISE (30 Questions) ---
        for(let i=1; i<=30; i++) {
            let rq = getRandomQuestion();
            questionsToInsert.push(createQuestion("EXERCISE", rq.type, rq.text, rq.options, rq.correctIndex, rq.explanation));
        }

        // --- QUIZ (15 Questions) ---
        for(let i=1; i<=15; i++) {
            let rq = getRandomQuestion();
            questionsToInsert.push(createQuestion("QUIZ", rq.type, rq.text, rq.options, rq.correctIndex, rq.explanation));
        }

        // --- POSSIBLE (20 Questions) ---
        for(let i=1; i<=20; i++) {
            let rq = getRandomQuestion();
            questionsToInsert.push(createQuestion("POSSIBLE", rq.type, rq.text, rq.options, rq.correctIndex, rq.explanation));
        }

        // Clear existing questions for this subject
        await db.collection('questions').deleteMany({ subjectId: subjectId });
        console.log("Cleared existing dummy questions.");

        // Insert new realistic questions
        const result = await db.collection('questions').insertMany(questionsToInsert);
        console.log(`Successfully inserted ${result.insertedCount} highly realistic "Server Administration" questions into the database!`);
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
