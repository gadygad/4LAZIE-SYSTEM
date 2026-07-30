const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

// ========================================================================
// HAPA NDIPO UNAPOWEKA MASWALI YAKO MAPYA (YALIYOPANGILIWA VIZURI)
// Unaweza kucopy muundo huu na kuongeza maswali mengi unavyotaka!
// ========================================================================

const NEW_QUESTIONS = [
    // ============================================
    // MASWALI YA WEB DESIGNING (Subject ID: 6a49ecb838bb37720e3e9198)
    // ============================================
    
    // --- MASWALI YA EASY (RAHISI) ---
    {
        subjectId: "6a49ecb838bb37720e3e9198",
        moduleName: "General Web Design",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        difficulty: "EASY",
        questionText: "Which HTML tag is used to define the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<head>"],
        correctAnswer: "<h1>",
        explanation: "The <h1> tag defines the most important and largest heading in HTML, while <h6> is the smallest.",
        createdAt: new Date(),
        _class: "com.school.model.Question"
    },
    {
        subjectId: "6a49ecb838bb37720e3e9198",
        moduleName: "General Web Design",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        difficulty: "EASY",
        questionText: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets",
        explanation: "CSS stands for Cascading Style Sheets, and it is used to describe the presentation of a document written in HTML.",
        createdAt: new Date(),
        _class: "com.school.model.Question"
    },
    
    // --- MASWALI YA MEDIUM (KATI) ---
    {
        subjectId: "6a49ecb838bb37720e3e9198",
        moduleName: "General Web Design",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        difficulty: "MEDIUM",
        questionText: "Which CSS property is used to change the background color of an element?",
        options: ["bgcolor", "color", "background-color", "bg-color"],
        correctAnswer: "background-color",
        explanation: "The 'background-color' property sets the background color of an HTML element.",
        createdAt: new Date(),
        _class: "com.school.model.Question"
    },
    {
        subjectId: "6a49ecb838bb37720e3e9198",
        moduleName: "General Web Design",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        difficulty: "MEDIUM",
        questionText: "How do you select an element with id 'header' in CSS?",
        options: [".header", "#header", "header", "*header"],
        correctAnswer: "#header",
        explanation: "In CSS, the hash symbol (#) is used to select an element by its ID attribute.",
        createdAt: new Date(),
        _class: "com.school.model.Question"
    },

    // --- MASWALI YA HARD (MAGUMU) ---
    {
        subjectId: "6a49ecb838bb37720e3e9198",
        moduleName: "General Web Design",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        difficulty: "HARD",
        questionText: "Which of the following is NOT a valid CSS position property value?",
        options: ["relative", "absolute", "static", "floating"],
        correctAnswer: "floating",
        explanation: "'floating' is not a valid value for the 'position' property. The valid values are static, relative, absolute, fixed, and sticky. ('float' is a separate property).",
        createdAt: new Date(),
        _class: "com.school.model.Question"
    },
    {
        subjectId: "6a49ecb838bb37720e3e9198",
        moduleName: "General Web Design",
        category: "QUIZ",
        type: "MULTIPLE_CHOICE",
        difficulty: "HARD",
        questionText: "What is the correct syntax for a media query that applies styles only when the viewport is exactly 768px wide or smaller?",
        options: [
            "@media (min-width: 768px)",
            "@media (max-width: 768px)",
            "@media screen and (width: 768px)",
            "@media queries (max-width: 768px)"
        ],
        correctAnswer: "@media (max-width: 768px)",
        explanation: "The 'max-width' media feature applies the styles if the viewport width is less than or equal to the specified value (768px).",
        createdAt: new Date(),
        _class: "com.school.model.Question"
    }
];

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("school_db");
        const coll = db.collection("questions");
        
        if (NEW_QUESTIONS.length > 0) {
            const result = await coll.insertMany(NEW_QUESTIONS);
            console.log(`✅ UCHAWI UMEKUBALI: Tumefanikiwa kuingiza maswali ${result.insertedCount} mapya yaliyopangiliwa vizuri!`);
        } else {
            console.log("⚠️ Hakuna maswali yaliyowekwa kwenye list ya NEW_QUESTIONS.");
        }

    } catch (e) {
        console.error("❌ Hitilafu:", e);
    } finally {
        await client.close();
    }
}

run();
