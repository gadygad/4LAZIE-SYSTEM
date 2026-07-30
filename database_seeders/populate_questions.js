const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('school_db');
        
        // Find a subject
        const subject = await db.collection('subjects').findOne({});
        if (!subject) {
            console.log("No subject found in the database. Please create a subject first.");
            process.exit(1);
        }
        
        const subjectId = subject._id.toString();
        const subjectName = subject.name;
        console.log(`Populating questions for Subject: ${subjectName} (ID: ${subjectId})`);

        // Helper to generate a question
        function createQuestion(category, type, text, options, correctIndex, explanation, difficulty = "MEDIUM") {
            const correctAnswerText = options ? options[correctIndex] : "Correct Answer";
            const q = {
                subjectId: subjectId,
                category: category,
                type: type, // MULTIPLE_CHOICE, TRUE_FALSE, SHORT_ANSWER
                difficulty: difficulty,
                questionText: text,
                correctAnswer: correctAnswerText,
                explanation: explanation || "This is based on standard syllabus concepts.",
                _class: "com.school.model.Question"
            };
            if (options) {
                q.options = options;
            }
            return q;
        }

        const questionsToInsert = [];

        // --- CAT 1 (17 Questions: Unit 1 to 2.5) ---
        // Section A: 10 Multiple Choice
        for(let i=1; i<=10; i++) {
            questionsToInsert.push(createQuestion("CAT", "MULTIPLE_CHOICE", 
                `(Section A) Which of the following is a primary concept introduced in Unit 1 of ${subjectName}? (Q${i})`, 
                ["Option A (Incorrect)", "Option B (Correct)", "Option C (Incorrect)", "Option D (Incorrect)"], 1, 
                "This covers the introductory principles of Unit 1."));
        }
        // Section B: 5 True/False
        for(let i=1; i<=5; i++) {
            questionsToInsert.push(createQuestion("CAT", "TRUE_FALSE", 
                `(Section B) True or False: In Unit 2 of ${subjectName}, the foundational models always require precise calibration. (Q${i})`, 
                ["True", "False"], 0, 
                "As discussed in Unit 2, calibration is essential."));
        }
        // Section C: 2 Short Answer
        for(let i=1; i<=2; i++) {
            questionsToInsert.push(createQuestion("CAT", "SHORT_ANSWER", 
                `(Section C) Briefly explain the main mechanism discussed in Unit 2.5 regarding ${subjectName}. (Q${i})`, 
                null, 0, 
                "A proper explanation should include the three main pillars discussed in class."));
        }

        // --- CAT 2 (17 Questions: Unit 2.5 to 5) ---
        // Section A: 10 Multiple Choice
        for(let i=1; i<=10; i++) {
            questionsToInsert.push(createQuestion("CAT", "MULTIPLE_CHOICE", 
                `(CAT 2 - Section A) Based on Unit 3 of ${subjectName}, identify the correct statement. (Q${i})`, 
                ["Statement 1", "Statement 2 (Correct)", "Statement 3", "Statement 4"], 1, 
                "Unit 3 focuses heavily on these statements."));
        }
        // Section B: 5 True/False
        for(let i=1; i<=5; i++) {
            questionsToInsert.push(createQuestion("CAT", "TRUE_FALSE", 
                `(CAT 2 - Section B) True or False: Unit 4 states that legacy systems are deprecated in modern applications of ${subjectName}. (Q${i})`, 
                ["True", "False"], 0, 
                "Unit 4 clearly outlines deprecation policies."));
        }
        // Section C: 2 Short Answer
        for(let i=1; i<=2; i++) {
            questionsToInsert.push(createQuestion("CAT", "SHORT_ANSWER", 
                `(CAT 2 - Section C) Summarize the concluding arguments presented in Unit 5. (Q${i})`, 
                null, 0, 
                "The conclusion integrates all concepts from Units 1 through 5."));
        }

        // --- UE (50 Questions) ---
        for(let i=1; i<=50; i++) {
            let type = (i % 5 === 0) ? "TRUE_FALSE" : "MULTIPLE_CHOICE";
            let options = type === "TRUE_FALSE" ? ["True", "False"] : ["A", "B", "C", "D"];
            let answerIdx = type === "TRUE_FALSE" ? 0 : (i % 4);
            questionsToInsert.push(createQuestion("UE", type, 
                `(UE Question ${i}) Comprehensive question covering topics from the entire syllabus of ${subjectName}.`, 
                options, answerIdx, 
                "UE questions test overall retention and application of the entire course."));
        }

        // --- EXERCISE (30 Questions) ---
        for(let i=1; i<=30; i++) {
            questionsToInsert.push(createQuestion("EXERCISE", "MULTIPLE_CHOICE", 
                `(Exercise Q${i}) Practice question for ${subjectName} to test deep understanding.`, 
                ["Option W", "Option X", "Option Y", "Option Z"], i%4, 
                "Exercises are meant to be challenging."));
        }

        // --- QUIZ (15 Questions) ---
        for(let i=1; i<=15; i++) {
            questionsToInsert.push(createQuestion("QUIZ", "MULTIPLE_CHOICE", 
                `(Quiz Q${i}) Quick knowledge check on ${subjectName}.`, 
                ["Yes", "No", "Maybe", "None of the above"], 0, 
                "Quizzes provide immediate feedback."));
        }

        // --- POSSIBLE (20 Questions) ---
        for(let i=1; i<=20; i++) {
            questionsToInsert.push(createQuestion("POSSIBLE", "MULTIPLE_CHOICE", 
                `(Possible Q${i}) A frequently asked past-paper question for ${subjectName}.`, 
                ["Ans 1", "Ans 2", "Ans 3", "Ans 4"], i%4, 
                "This question has appeared in 3 consecutive past papers."));
        }

        // Clear existing questions for this subject to avoid duplicates if run multiple times
        await db.collection('questions').deleteMany({ subjectId: subjectId });
        console.log("Cleared existing questions for this subject.");

        // Insert new questions
        const result = await db.collection('questions').insertMany(questionsToInsert);
        console.log(`Successfully inserted ${result.insertedCount} questions into the database!`);
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
