const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecd238bb37720e3e91de'; 
const moduleName = "Unit 2: Addressing & Routing Design";

function generateQuestions() {
    let qList = [];
    const categories = ["QUIZ", "EXERCISE", "CAT 1", "CAT 2", "POSSIBLE QNS", "UE"];
    
    // 1. Subnet Creation Questions (Borrowing Bits)
    for (let bits = 1; bits <= 8; bits++) {
        let subnets = Math.pow(2, bits);
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: bits > 4 ? "HARD" : "MEDIUM",
            createdAt: new Date(),
            questionText: `In an FLSM design, if a network administrator borrows ${bits} bits from the host portion, how many new subnets are created?`,
            options: [
                `${subnets} subnets`,
                `${subnets * 2} subnets`,
                `${subnets / 2} subnets`,
                `${subnets - 2} subnets`
            ].sort(() => Math.random() - 0.5),
            correctAnswer: `${subnets} subnets`,
            explanation: `The formula for the number of subnets is 2^n, where n is the number of borrowed bits. 2^${bits} = ${subnets}.`
        });
    }

    // 2. New Subnet Mask Questions (Class C /24)
    const masks = ["128", "192", "224", "240", "248", "252", "254", "255"];
    for (let bits = 1; bits <= 6; bits++) {
        let newCidr = 24 + bits;
        let correctMask = `255.255.255.${masks[bits-1]}`;
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "HARD",
            createdAt: new Date(),
            questionText: `A Class C network (192.168.1.0/24) needs to be subnetted to provide at least ${Math.pow(2, bits)} subnets. You borrow ${bits} bits. What is the new Subnet Mask in dotted decimal format?`,
            options: [
                correctMask,
                `255.255.255.${masks[bits]}`,
                `255.255.255.${masks[bits+1] || '0'}`,
                `255.255.0.${masks[bits-1]}`
            ].sort(() => Math.random() - 0.5),
            correctAnswer: correctMask,
            explanation: `Borrowing ${bits} bits from a /24 network results in a /${newCidr} prefix. The last octet binary is ${'1'.repeat(bits).padEnd(8, '0')}, which is ${masks[bits-1]} in decimal.`
        });
    }

    // 3. EIGRP Metric Calculations
    for (let i = 1; i <= 20; i++) {
        let bw = Math.floor(Math.random() * 50) + 10;
        let delay = Math.floor(Math.random() * 20) + 5;
        let metric = (bw + delay) * 256;
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "HARD",
            createdAt: new Date(),
            questionText: `Using the simplified EIGRP metric formula Metric = (Bandwidth + Delay) * 256, if a link has an adjusted Bandwidth value of ${bw} and a Delay value of ${delay}, what is the resulting EIGRP metric?`,
            options: [
                `${metric}`,
                `${(bw + delay) * 128}`,
                `${(bw * delay) * 256}`,
                `${metric + 256}`
            ].sort(() => Math.random() - 0.5),
            correctAnswer: `${metric}`,
            explanation: `Using the formula: (${bw} + ${delay}) * 256 = ${bw+delay} * 256 = ${metric}.`
        });
    }

    // 4. VLSM Host Requirement Math
    for (let hosts = 5; hosts <= 120; hosts += 5) {
        let power = Math.ceil(Math.log2(hosts + 2)); // +2 for network and broadcast
        let requiredSubnetSize = Math.pow(2, power);
        let prefix = 32 - power;
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "MEDIUM",
            createdAt: new Date(),
            questionText: `In a VLSM design, an administrator needs to accommodate a department with exactly ${hosts} hosts. What is the smallest subnet prefix (CIDR) that can support this requirement?`,
            options: [
                `/${prefix}`,
                `/${prefix + 1}`,
                `/${prefix - 1}`,
                `/${prefix + 2}`
            ].sort(() => Math.random() - 0.5),
            correctAnswer: `/${prefix}`,
            explanation: `${hosts} hosts require ${hosts + 2} addresses (including Network & Broadcast). The next power of 2 is ${requiredSubnetSize} (2^${power}). 32 - ${power} = /${prefix}.`
        });
    }

    // 5. OSPF Cost Calculations
    const refBw = 100000; // Let's say Reference Bandwidth is 100,000 Kbps (100 Mbps)
    const interfaces = [100000, 10000, 1000, 1544, 512, 128, 64];
    for (let intBw of interfaces) {
        let cost = Math.max(1, Math.floor(refBw / intBw));
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "EASY",
            createdAt: new Date(),
            questionText: `Using the OSPF Cost formula (Cost = Reference Bandwidth / Interface Bandwidth), if the Reference Bandwidth is 100,000 Kbps and the Interface Bandwidth is ${intBw} Kbps, what is the OSPF Cost? (Note: Minimum cost is 1)`,
            options: [
                `${cost}`,
                `${cost * 10}`,
                `${cost + 5}`,
                `${Math.floor(cost / 2) || 1}`
            ].sort(() => Math.random() - 0.5),
            correctAnswer: `${cost}`,
            explanation: `100,000 / ${intBw} = ${cost}.`
        });
    }

    // 6. IPv6 Abbreviation Scenarios
    for (let i=0; i<30; i++) {
        let hex1 = Math.floor(Math.random()*65535).toString(16).padStart(4, '0');
        let hex2 = Math.floor(Math.random()*65535).toString(16).padStart(4, '0');
        let hex3 = Math.floor(Math.random()*65535).toString(16).padStart(4, '0');
        let full = `2001:0db8:0000:0000:0000:${hex1}:${hex2}:${hex3}`;
        let short = `2001:db8::${hex1.replace(/^0+/, '') || '0'}:${hex2.replace(/^0+/, '') || '0'}:${hex3.replace(/^0+/, '') || '0'}`;
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "MEDIUM",
            createdAt: new Date(),
            questionText: `What is the correct, most simplified short form of the IPv6 address ${full}?`,
            options: [
                short,
                `2001:db8:0::${hex1}:${hex2}:${hex3}`,
                `2001:db8:0:0:0:${hex1}:${hex2}:${hex3}`,
                `2001:0db8::${hex1}:0000:${hex3}`
            ].sort(() => Math.random() - 0.5),
            correctAnswer: short,
            explanation: `Leading zeros in each 16-bit block can be omitted, and the longest sequence of continuous blocks of zeros can be replaced by a double colon (::).`
        });
    }

    // Return exact amount to hit 150 (We currently have 43, need 107)
    // We generated ~90 questions. Let's add some more theory variations to ensure we hit 110.
    
    // 7. Route Summarization IP matching
    for(let i=0; i<25; i++) {
        let baseIP = Math.floor(Math.random()*200);
        qList.push({
            subjectId, moduleName, type: "MULTIPLE_CHOICE",
            category: categories[Math.floor(Math.random() * categories.length)],
            difficultyLevel: "HARD",
            createdAt: new Date(),
            questionText: `An ISP wants to summarize the networks 10.${baseIP}.0.0/24, 10.${baseIP}.1.0/24, 10.${baseIP}.2.0/24, and 10.${baseIP}.3.0/24. What will be the summarized prefix length (CIDR)?`,
            options: [
                "/22", "/23", "/21", "/20"
            ].sort(() => Math.random() - 0.5),
            correctAnswer: "/22",
            explanation: `Summarizing 4 continuous /24 networks requires shifting the subnet mask back by 2 bits (since 2^2 = 4). Therefore, /24 becomes /22.`
        });
    }

    // We shuffle and pick exactly 107 questions to reach exactly 150.
    qList = qList.sort(() => Math.random() - 0.5);
    return qList.slice(0, 107);
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
        console.log(`Successfully generated and inserted ${inserted} highly dynamic mathematical questions for Unit 2! (Skipped ${duplicates} duplicates)`);
    } catch (e) {
        console.error("Error inserting questions:", e);
    } finally {
        await client.close();
    }
}
run();
