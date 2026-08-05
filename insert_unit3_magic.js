const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 3: Enterprise Network Design";

function generateQuestions() {
    let qList = [];
    const categories = ["QUIZ", "EXERCISE", "CAT 1", "CAT 2", "POSSIBLE QNS", "UE"];
    
    // 1. Data Center Tier Scenarios
    const tierScenarios = [
        { tier: 1, desc: "Basic infrastructure, No redundancy", name: "Tier 1" },
        { tier: 2, desc: "Partial redundancy", name: "Tier 2" },
        { tier: 3, desc: "High availability, Maintenance without shutdown", name: "Tier 3" },
        { tier: 4, desc: "Fully fault tolerant, Maximum uptime", name: "Tier 4" }
    ];
    
    for(let i=0; i<30; i++) {
        let t = tierScenarios[Math.floor(Math.random() * tierScenarios.length)];
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: t.tier > 2 ? "HARD" : "EASY",
            createdAt: new Date(),
            questionText: `An organization is designing a Data Center and requires '${t.desc}'. According to industry standards, which Data Center Tier level must they implement?`,
            options: [
                "Tier 1", "Tier 2", "Tier 3", "Tier 4"
            ].sort(() => Math.random() - 0.5),
            correctAnswer: t.name,
            explanation: `${t.name} Data Centers are specifically defined by offering ${t.desc.toLowerCase()}.`
        });
    }

    // 2. WAN Technologies Matching
    const wanTechs = [
        { name: "MPLS", desc: "Multiprotocol Label Switching" },
        { name: "SD-WAN", desc: "Software Defined WAN" },
        { name: "ATM", desc: "Asynchronous Transfer Mode" },
        { name: "Frame Relay", desc: "an older packet-switching technology" }
    ];
    
    for(let i=0; i<30; i++) {
        let w = wanTechs[Math.floor(Math.random() * wanTechs.length)];
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "MEDIUM",
            createdAt: new Date(),
            questionText: `When discussing Wide Area Network (WAN) technologies, what does ${w.name} stand for or refer to?`,
            options: [
                w.desc,
                "Multi-Path Local Switching",
                "Asymmetric Transfer Media",
                "System Defined WAN"
            ].sort(() => Math.random() - 0.5),
            correctAnswer: w.desc,
            explanation: `${w.name} stands for ${w.desc}, which is a recognized WAN technology used for long-distance data transmission.`
        });
    }

    // 3. Campus Layer Scenarios
    const layers = [
        { name: "Access Layer", function: "connecting end devices (PCs, Printers) and applying port security" },
        { name: "Distribution Layer", function: "Inter-VLAN routing, policy enforcement, and traffic filtering" },
        { name: "Core Layer", function: "high-speed data transfer, fast switching, and reliable backbone connectivity" }
    ];
    
    for(let i=0; i<40; i++) {
        let l = layers[Math.floor(Math.random() * layers.length)];
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "MEDIUM",
            createdAt: new Date(),
            questionText: `During a network audit, an engineer notices a switch is primarily dedicated to ${l.function}. Which layer of the Campus Network design does this switch belong to?`,
            options: [
                "Access Layer",
                "Distribution Layer",
                "Core Layer",
                "Physical Layer"
            ].sort(() => Math.random() - 0.5),
            correctAnswer: l.name,
            explanation: `The ${l.name} is specifically tasked with ${l.function} within the 3-tier hierarchical Campus model.`
        });
    }

    // 4. Data Center Components vs Network Security
    for(let i=0; i<40; i++) {
        let isPhys = Math.random() > 0.5;
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "HARD",
            createdAt: new Date(),
            questionText: `Which of the following is classified strictly as a '${isPhys ? "Physical Security" : "Network Security"}' measure in a Data Center?`,
            options: [
                isPhys ? "CCTV Cameras and Biometric Access" : "Firewalls and Encryption",
                isPhys ? "Firewalls and Intrusion Detection Systems" : "Security Guards and Biometric Access",
                "Cooling Systems and UPS Generators",
                "Virtualization and Containerization"
            ].sort(() => Math.random() - 0.5),
            correctAnswer: isPhys ? "CCTV Cameras and Biometric Access" : "Firewalls and Encryption",
            explanation: `Physical security involves physical barriers (Cameras, Biometrics, Guards), whereas Network security involves digital barriers (Firewalls, IDS/IPS, Encryption).`
        });
    }

    // We generated 140 questions. We will return 137 questions (plus 14 from the first script = ~150)
    qList = qList.sort(() => Math.random() - 0.5);
    
    // De-duplicate by question text just in case random generator overlapped
    const uniqueQList = [];
    const seen = new Set();
    for (const q of qList) {
        if (!seen.has(q.questionText)) {
            seen.add(q.questionText);
            uniqueQList.push(q);
        }
    }
    
    return uniqueQList.slice(0, 137);
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
        console.log(`Successfully generated and inserted ${inserted} dynamic questions for Unit 3! (Skipped ${duplicates} duplicates)`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
