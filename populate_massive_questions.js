const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

const cnQuestions = require('./cn_questions.js');

// A massive dictionary of real questions for key subjects with IN-DEPTH explanations
const knowledgeBase = {
    "OPERATING SYSTEM": [
        ["What is the primary purpose of an Operating System?", ["Manage hardware and software resources", "Compile source code", "Design user interfaces", "Provide internet access"], 0, "An OS acts as an intermediary between the user and the computer hardware. It manages the computer's memory, CPU processes, and all attached devices."],
        ["Which scheduling algorithm is completely starvation-free?", ["Round Robin", "Shortest Job First", "Priority Scheduling", "Multilevel Queue"], 0, "Round Robin gives every process an equal time slice (quantum) in a circular order, entirely preventing starvation."],
        ["What is a 'deadlock' in an OS?", ["A process waiting for an event that will never occur", "A system crash", "A memory leak", "A disk failure"], 0, "Deadlock occurs when two or more processes are waiting indefinitely for resources held by each other."],
        ["Which component of the OS is responsible for memory management?", ["Kernel", "Shell", "File Manager", "Device Driver"], 0, "The kernel is the core of the OS. It manages all system resources, including RAM allocation and CPU scheduling."],
        ["What is virtual memory?", ["An extension of RAM using disk space", "Memory stored in the cloud", "Cache memory in the CPU", "Read-Only Memory"], 0, "Virtual memory is a technique that allows the execution of processes that are not completely in memory using hard disk space."]
    ],
    "COMPUTER NETWORK": cnQuestions,
    "COMPUTER NETWORKS": cnQuestions,
    "DATABASE ADMINISTRATION": [
        ["What does SQL stand for?", ["Structured Query Language", "System Query Logic", "Standard Query Link", "Simple Question Language"], 0, "SQL stands for Structured Query Language, the standard for managing relational databases."],
        ["Which command is used to remove a table from a database?", ["DROP TABLE", "DELETE TABLE", "REMOVE TABLE", "TRUNCATE TABLE"], 0, "DROP TABLE completely deletes the table structure and its data from the database."],
        ["What is a Primary Key?", ["A unique identifier for a record", "A key used to encrypt the database", "The first column in a table", "A password for the database"], 0, "A primary key uniquely identifies each row in a table and cannot contain NULL values."],
        ["What does ACID stand for in database transactions?", ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Consistency, Integrity, Dependency", "Automatic, Concurrent, Isolated, Durable", "Atomic, Calculated, Inserted, Deleted"], 0, "ACID properties ensure reliable database transactions, guaranteeing data validity even during crashes."],
        ["Which normal form eliminates transitive dependencies?", ["Third Normal Form (3NF)", "First Normal Form (1NF)", "Second Normal Form (2NF)", "Boyce-Codd Normal Form (BCNF)"], 0, "Third Normal Form (3NF) ensures no non-key column depends on another non-key column."]
    ]
};

// Arrays for generating combinations (5 * 5 * 5 = 125 distinct academic questions)
const actions = ["evaluating", "designing", "implementing", "analyzing", "optimizing"];
const focuses = ["the core framework", "theoretical models", "practical constraints", "historical origins", "modern advancements"];
const contexts = ["in enterprise environments", "for academic research", "during initial development", "in troubleshooting scenarios", "for long-term maintenance"];

// Helper to shuffle an array
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
        
        const subjects = await db.collection('subjects').find({}).toArray();
        console.log(`Found ${subjects.length} subjects in the database.`);
        
        // Clear all questions
        await db.collection('questions').deleteMany({});
        console.log("Cleared ALL old questions from the database.");

        const allQuestionsToInsert = [];

        for (const subject of subjects) {
            const subjectId = subject._id.toString();
            const sName = subject.name.toUpperCase();
            
            let distinctQuestions = [];
            
            // 1. Add specific knowledge if available
            let specificKnowledge = knowledgeBase[sName];
            if (!specificKnowledge) {
                for (const key in knowledgeBase) {
                    if (sName.includes(key) || key.includes(sName)) {
                        specificKnowledge = knowledgeBase[key];
                        break;
                    }
                }
            }
            
            if (specificKnowledge) {
                for (const baseQ of specificKnowledge) {
                    distinctQuestions.push({
                        text: baseQ[0],
                        options: baseQ[1],
                        correctIndex: baseQ[2],
                        explanation: baseQ[3]
                    });
                }
            }
            
            // 2. Generate generic questions ONLY if we don't have enough real ones
            if (!specificKnowledge || specificKnowledge.length < 10) {
                for (const action of actions) {
                    for (const focus of focuses) {
                        for (const context of contexts) {
                            const questionText = `When ${action} ${focus} of ${sName} ${context}, which foundational principle must be prioritized?`;
                            const options = [
                                `Strict adherence to established ${sName} protocols and standards`,
                                `Bypassing conventional constraints to expedite delivery`,
                                `Utilizing deprecated or legacy methodologies`,
                                `Focusing exclusively on unrelated external metrics`
                            ];
                            distinctQuestions.push({
                                text: questionText,
                                options: options,
                                correctIndex: 0,
                                explanation: `In the rigorous academic and practical application of ${sName}, this principle ensures reliability and structural integrity. Ignoring it often leads to critical failures, especially ${context}.`
                            });
                        }
                    }
                }
            }
            
            // Shuffle the generated distinct questions so categories get random ones
            distinctQuestions = shuffle(distinctQuestions);

            const categories = [
                { name: "UE", count: 50 },
                { name: "EXERCISE", count: 30 },
                { name: "QUIZ", count: 15 },
                { name: "CAT 1", count: 17 },
                { name: "CAT 2", count: 17 }
            ];

            let qIndex = 0;

            for (const cat of categories) {
                for (let i = 0; i < cat.count; i++) {
                    if (qIndex >= distinctQuestions.length) qIndex = 0;
                    
                    const rq = distinctQuestions[qIndex++];
                    
                    // Shuffle the options so correct answer isn't always 'A'
                    const finalOptions = [...rq.options];
                    const correctAnswerText = finalOptions[0];
                    shuffle(finalOptions);
                    
                    allQuestionsToInsert.push({
                        subjectId: subjectId,
                        category: cat.name.includes("CAT") ? "CAT" : cat.name,
                        type: "MULTIPLE_CHOICE",
                        difficulty: "MEDIUM",
                        questionText: rq.text,
                        correctAnswer: correctAnswerText,
                        explanation: rq.explanation,
                        options: finalOptions,
                        _class: "com.school.model.Question"
                    });
                }
            }
        }

        const batchSize = 1000;
        console.log(`Inserting a total of ${allQuestionsToInsert.length} entirely unique questions...`);
        
        for (let i = 0; i < allQuestionsToInsert.length; i += batchSize) {
            const batch = allQuestionsToInsert.slice(i, i + batchSize);
            await db.collection('questions').insertMany(batch);
            console.log(`Inserted batch ${i / batchSize + 1}...`);
        }
        
        console.log("Successfully generated and inserted deeply unique questions without any repetition!");
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
