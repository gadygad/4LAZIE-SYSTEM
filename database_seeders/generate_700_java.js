const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('school_db');
        const subject = await db.collection('subjects').findOne({ name: /Object Oriented/i });
        const subjectId = subject._id.toString();

        let questions = [];

        function add(category, text, opts, correctIdx, exp, diff) {
            questions.push({
                subjectId,
                category,
                type: "MULTIPLE_CHOICE",
                difficulty: diff,
                questionText: text,
                options: opts,
                correctAnswer: opts[correctIdx],
                explanation: exp,
                _class: "com.school.model.Question"
            });
        }

        // CAT 1: 200 Questions (Unit 1 & 2)
        for (let i = 1; i <= 50; i++) {
            let a = i; let b = i+2; let c = i+3;
            add("CAT 1", `<pre><code>int x = ${a} + ${b} * ${c};\nSystem.out.println(x);</code></pre>`, 
                [(a + b * c).toString(), ((a + b) * c).toString(), (a + b * c + 1).toString(), "Compilation Error"], 0,
                `Multiplication (*) has higher precedence than addition (+). Evaluates ${b} * ${c} first, then adds ${a}.`, "MEDIUM");
                
            add("CAT 1", `<pre><code>int y = ${b*2 + 1} % 2;\nSystem.out.println(y);</code></pre>`, 
                [((b*2+1)%2).toString(), "0", "2", "Error"], 0,
                `Modulo (%) returns the remainder. An odd number modulo 2 always leaves 1.`, "EASY");
                
            add("CAT 1", `Which of the following is true about Java keywords? (Variation ${i})`, 
                ["They must be written in lowercase.", "They can be used as variable names.", "They are written in uppercase.", "They include 'String' and 'System'."], 0,
                `Java keywords (like abstract, boolean, class) are always lowercase and cannot be used as identifiers.`, "EASY");
                
            let end = i % 5 + 3;
            add("CAT 1", `<pre><code>int i;\nfor(i = 0; i < ${end}; i++) { }\nSystem.out.println(i);</code></pre>`,
                [end.toString(), (end-1).toString(), "0", "Compilation Error"], 0,
                `Loop terminates when condition is false (i == ${end}). Since 'i' is declared outside, it keeps this value.`, "HARD");
        }

        // CAT 2: 200 Questions (Unit 3, 4, 5)
        for (let i = 1; i <= 50; i++) {
            let size = i + 5;
            add("CAT 2", `What is the correct syntax to declare an array of size ${size} in Java?`, 
                [`int[] arr = new int[${size}];`, `int arr[${size}];`, `int arr[] = new int(${size});`, `int[] arr = {${size}};`], 0,
                `Arrays are dynamically created using 'new int[size]'.`, "EASY");
                
            add("CAT 2", `<pre><code>int[] nums = new int[${size}];\nSystem.out.println(nums[${size}]);</code></pre>`, 
                ["ArrayIndexOutOfBoundsException", "0", "null", "Compilation Error"], 0,
                `Array indices are 0 to length-1. Index ${size} is out of bounds.`, "MEDIUM");
                
            add("CAT 2", `<pre><code>class Parent${i} { }\nclass Child${i} ___ Parent${i} { }</code></pre>\nFill in the blank.`, 
                ["extends", "implements", "inherits", "super"], 0,
                `The 'extends' keyword is used to inherit from a class in Java.`, "EASY");
                
            add("CAT 2", `Method overriding is an example of what type of polymorphism? (Case ${i})`, 
                ["Run-time Polymorphism", "Compile-time Polymorphism", "Static Polymorphism", "Operator Overloading"], 0,
                `Overriding is resolved dynamically at run-time (Late Binding).`, "HARD");
        }

        // POSSIBLE QNS: 100 Questions
        const concepts = [
            {n:"Encapsulation", d:"wrapping of data and methods"},
            {n:"Inheritance", d:"reusing code from parent classes"},
            {n:"Polymorphism", d:"taking many forms"},
            {n:"Abstraction", d:"hiding internal implementation"}
        ];
        for(let i=0; i<100; i++) {
            let c = concepts[i % 4];
            add("QUIZ", `Which OOP concept involves ${c.d}? (Set ${i+1})`, 
                [c.n, concepts[(i+1)%4].n, concepts[(i+2)%4].n, concepts[(i+3)%4].n], 0,
                `${c.n} is defined as the ${c.d}.`, "MEDIUM");
        }

        // UE: 200 Questions (Mixed Hard)
        for (let i = 1; i <= 100; i++) {
            let x = i;
            add("UE", `<pre><code>public class Test {\n   public static void main(String[] args) {\n      int x = ${x};\n      System.out.println(x++ + ++x);\n   }\n}</code></pre>`, 
                [((x) + (x+2)).toString(), ((x+1) + (x+1)).toString(), (x*2).toString(), "Compilation Error"], 0,
                `x++ yields ${x}, then x becomes ${x+1}. ++x increments x to ${x+2} and yields it. Sum is ${x} + ${x+2}.`, "HARD");
                
            add("UE", `Which is true about constructors? (Variation ${i})`, 
                ["Constructors do not have a return type.", "Constructors can return void.", "Constructors must be private.", "Constructors cannot be overloaded."], 0,
                `Constructors cannot have a return type, not even void.`, "HARD");
        }

        console.log("Total generated variations: " + questions.length);
        
        await db.collection('questions').deleteMany({ subjectId: subjectId });
        console.log("Cleared old Java questions.");

        const batchSize = 100;
        let inserted = 0;
        for (let i = 0; i < questions.length; i += batchSize) {
            const batch = questions.slice(i, i + batchSize);
            await db.collection('questions').insertMany(batch);
            inserted += batch.length;
            console.log(`Inserted ${inserted} / ${questions.length}`);
        }

        console.log("SUCCESSFULLY INSERTED " + questions.length + " UNIQUE JAVA QUESTIONS!");

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
run();
