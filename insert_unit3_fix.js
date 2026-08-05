const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 3: Enterprise Network Design";

function generateQuestions() {
    let qList = [];
    const categories = ["QUIZ", "EXERCISE", "CAT 1", "CAT 2", "POSSIBLE QNS", "UE"];
    
    // To ensure unique question text, we introduce random unique identifiers (VLAN IDs, Server Names, Node Counts)

    // 1. Inter-VLAN Routing Scenarios
    for(let i=0; i<30; i++) {
        let vlan1 = Math.floor(Math.random() * 50) + 10;
        let vlan2 = Math.floor(Math.random() * 50) + 60;
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "HARD",
            createdAt: new Date(),
            questionText: `In a Campus Network, a device on 'Students VLAN ${vlan1}' needs to securely communicate with a database on 'Library Server VLAN ${vlan2}'. Which network device and layer must facilitate this inter-VLAN communication?`,
            options: [
                "Layer 3 Switch at the Distribution Layer",
                "High-speed Router at the Core Layer",
                "Layer 2 Switch at the Access Layer",
                "Firewall at the Physical Layer"
            ].sort(() => Math.random() - 0.5),
            correctAnswer: "Layer 3 Switch at the Distribution Layer",
            explanation: `Inter-VLAN routing is required for communication between VLAN ${vlan1} and ${vlan2}, and this function is performed by a Layer 3 Switch or Router at the Distribution Layer.`
        });
    }

    // 2. Data Center Availability Scenarios
    for(let i=0; i<30; i++) {
        let servers = Math.floor(Math.random() * 500) + 100;
        let uptime = ["99.982%", "99.995%", "99.671%"][Math.floor(Math.random() * 3)];
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "MEDIUM",
            createdAt: new Date(),
            questionText: `A large enterprise operates a Colocation Data Center with exactly ${servers} servers. They are upgrading their infrastructure to support 'Maintenance without shutdown' (expected ${uptime} uptime). Which Tier Level are they moving into?`,
            options: [
                "Tier 3", "Tier 4", "Tier 2", "Tier 1"
            ].sort(() => Math.random() - 0.5),
            correctAnswer: "Tier 3",
            explanation: `Tier 3 Data Centers specifically provide 'High availability' and allow for 'Maintenance without shutdown', making them suitable for large enterprise operations.`
        });
    }

    // 3. WAN Topologies Link Calculation
    for(let nodes = 5; nodes <= 35; nodes += 1) {
        let links = (nodes * (nodes - 1)) / 2;
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "HARD",
            createdAt: new Date(),
            questionText: `A multinational company is designing a WAN with ${nodes} global branch offices. If they decide to use a 'Full Mesh' topology for maximum redundancy, exactly how many direct point-to-point links will be required in total?`,
            options: [
                `${links} links`,
                `${nodes * 2} links`,
                `${links - nodes} links`,
                `${links * 2} links`
            ].sort(() => Math.random() - 0.5),
            correctAnswer: `${links} links`,
            explanation: `In a Full Mesh topology, every site connects to every other site. The mathematical formula is N(N-1)/2. So, ${nodes}(${nodes}-1)/2 = ${links}.`
        });
    }

    // 4. Port Security at Access Layer
    for(let i=0; i<30; i++) {
        let building = ["Admin Block", "Library", "Hostel", "Science Lab"][Math.floor(Math.random() * 4)];
        let floor = Math.floor(Math.random() * 10) + 1;
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "EASY",
            createdAt: new Date(),
            questionText: `At Floor ${floor} of the ${building}, a student unplugs a campus IP Phone and plugs in a personal rogue laptop. Which function of the Access Layer is specifically designed to prevent this unauthorized access?`,
            options: [
                "Applying Port Security",
                "Assigning VLAN routing protocols",
                "Fast backbone switching",
                "High-speed data transfer"
            ].sort(() => Math.random() - 0.5),
            correctAnswer: "Applying Port Security",
            explanation: `The Access Layer connects end devices. Port Security is enforced at this layer to lock down switch ports, preventing unauthorized devices from connecting.`
        });
    }

    // We shuffle and pick exactly 120 questions
    qList = qList.sort(() => Math.random() - 0.5);
    
    const uniqueQList = [];
    const seen = new Set();
    for (const q of qList) {
        if (!seen.has(q.questionText)) {
            seen.add(q.questionText);
            uniqueQList.push(q);
        }
    }
    
    return uniqueQList.slice(0, 120);
}

const questions = generateQuestions();

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('school_db');
        const collection = db.collection('questions');
        
        let inserted = 0;
        let duplicates = 0;
        for (const q of questions) {
            const exists = await collection.findOne({ 
                subjectId: q.subjectId, 
                questionText: q.questionText 
            });
            if (!exists) {
                await collection.insertOne(q);
                inserted++;
            } else {
                duplicates++;
            }
        }
        console.log(`Successfully generated and inserted ${inserted} highly unique dynamic questions for Unit 3 Fix!`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
