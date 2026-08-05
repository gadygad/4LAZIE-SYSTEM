const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const subjectId = '6a49ecb738bb37720e3e9197'; 

let questions = [];

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// 1. Generate MAC Address Format Questions (100 questions)
// Explain OUI vs NIC specific parts
for(let hex = 10; hex <= 109; hex++) {
    const mac = `${hex}:1B:44:11:3A:B7`;
    questions.push({
        subjectId, moduleName: "Unit 3: MAC", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: `In the MAC address ${mac}, the first 24 bits (${hex}:1B:44) represent the _______.`,
        options: shuffle(["Organizationally Unique Identifier (OUI)", "Network Interface Controller (NIC)", "Subnet Mask", "IP Prefix"]), 
        correctAnswer: "Organizationally Unique Identifier (OUI)",
        explanation: `A MAC address is 48 bits. The first 24 bits are the OUI assigned by IEEE to the manufacturer, and the last 24 bits are assigned by the manufacturer.`,
        difficultyLevel: "MEDIUM"
    });
}

// 2. Generate Shannon Capacity Theorem Questions (100 questions)
// C = B * log2(1 + SNR)
for(let snr = 3; snr <= 102; snr++) {
    const bw = 3000; // Typical voice channel bandwidth in Hz
    const C = bw * Math.log2(1 + snr);
    const capacityRounded = Math.round(C);
    
    questions.push({
        subjectId, moduleName: "Unit 2: Capacity", category: "POSSIBLE", type: "MULTIPLE_CHOICE",
        questionText: `For a channel with a bandwidth of ${bw} Hz and a Signal-to-Noise Ratio (SNR) of ${snr}, what is the approximate maximum data rate according to Shannon's capacity formula?`,
        options: shuffle([`${capacityRounded} bps`, `${capacityRounded * 2} bps`, `${Math.round(capacityRounded/2)} bps`, `${bw * snr} bps`]), 
        correctAnswer: `${capacityRounded} bps`,
        explanation: `Shannon Capacity C = B * log2(1 + SNR). C = 3000 * log2(1 + ${snr}) = ${capacityRounded} bps.`,
        difficultyLevel: "HARD"
    });
}

// 3. Subnetting / Network Address Calculation (100 questions)
// IP = 192.168.x.y, Mask = 255.255.255.0
for(let net = 10; net <= 109; net++) {
    const host = 55;
    const ip = `192.168.${net}.${host}`;
    const mask = `255.255.255.0`;
    const networkAddress = `192.168.${net}.0`;
    const broadcastAddress = `192.168.${net}.255`;
    
    questions.push({
        subjectId, moduleName: "Unit 4: Subnetting", category: "CAT 2", type: "MULTIPLE_CHOICE",
        questionText: `Given the IP address ${ip} and a subnet mask of ${mask}, what is the Network Address?`,
        options: shuffle([networkAddress, broadcastAddress, `192.168.0.0`, ip]), 
        correctAnswer: networkAddress,
        explanation: `Performing a bitwise AND between the IP address (${ip}) and the Subnet Mask (${mask}) yields the network address ${networkAddress}.`,
        difficultyLevel: "MEDIUM"
    });
}

// 4. Multiplexing - TDM Frame Duration (100 questions)
for(let sources = 5; sources <= 104; sources++) {
    questions.push({
        subjectId, moduleName: "Unit 2: Multiplexing", category: "EXERCISE", type: "MULTIPLE_CHOICE",
        questionText: `In synchronous TDM, if there are ${sources} sources each transmitting at 100 kbps, what is the data rate of the main multiplexed link (ignoring overhead)?`,
        options: shuffle([`${sources * 100} kbps`, `${sources * 10} kbps`, `100 kbps`, `${sources * 1000} kbps`]), 
        correctAnswer: `${sources * 100} kbps`,
        explanation: `In synchronous TDM, the link data rate is equal to the sum of the data rates of all sources. ${sources} * 100 = ${sources * 100} kbps.`,
        difficultyLevel: "EASY"
    });
}


async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('school_db');
    
    const docs = questions.map(q => ({...q, createdAt: new Date()}));
    
    let inserted = 0;
    for (let i = 0; i < docs.length; i++) {
        const q = docs[i];
        const exists = await db.collection('questions').findOne({ 
            subjectId: q.subjectId, 
            questionText: q.questionText 
        });

        if (!exists) {
            await db.collection('questions').insertOne(q);
            inserted++;
        }
    }
    
    console.log(`Batch 4 complete: Inserted ${inserted} questions out of ${questions.length}. Total generated reaches ~700!`);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
