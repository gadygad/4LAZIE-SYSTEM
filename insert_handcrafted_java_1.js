const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('school_db');
        const subject = await db.collection('subjects').findOne({ name: /Object Oriented/i });
        const subjectId = subject._id.toString();

        const questions = [
            // UNIT 1.1: Introduction to OOP
            {
                subjectId, category: "QUIZ", type: "MULTIPLE_CHOICE", difficulty: "EASY",
                questionText: "According to the notes, OOP is a software development methodology in which a program is conceptualized as a group of what?",
                options: ["Functions that execute sequentially", "Objects that work together", "Variables and Pointers", "Classes that never interact"],
                correctAnswer: "Objects that work together",
                explanation: "OOP conceptualizes a program as a group of objects that work together, contrasting with procedural programming."
            },
            {
                subjectId, category: "CAT 1", type: "MULTIPLE_CHOICE", difficulty: "MEDIUM",
                questionText: "Which of the following describes the OOP principle where a class (subclass) immediately has all the functionality of an existing class (superclass)?",
                options: ["Encapsulation", "Polymorphism", "Abstraction", "Inheritance"],
                correctAnswer: "Inheritance",
                explanation: "Inheritance is the mechanism that enables one class to inherit all the behavior and attributes of another class, providing code reuse."
            },
            {
                subjectId, category: "POSSIBLE QNS", type: "MULTIPLE_CHOICE", difficulty: "HARD",
                questionText: "Consider the real-life example of a man driving a car. He knows how to press the accelerator to increase speed, but does not know the inner mechanism of how the speed actually increases. This scenario perfectly describes which OOP principle?",
                options: ["Message Passing", "Encapsulation", "Abstraction", "Dynamic Binding"],
                correctAnswer: "Abstraction",
                explanation: "Data Abstraction is the process of identifying only the required characteristics of an object, ignoring the irrelevant inner implementation details."
            },
            {
                subjectId, category: "QUIZ", type: "MULTIPLE_CHOICE", difficulty: "MEDIUM",
                questionText: "According to the Java conventions, which of the following is the CORRECT way to name a class and a final variable respectively?",
                options: ["myClass and PI", "MyClass and PI", "Myclass and pi", "myclass and Pi"],
                correctAnswer: "MyClass and PI",
                explanation: "Class names should start with an uppercase letter (MyClass), and final variables (constants) are always capitalized (PI)."
            },
            {
                subjectId, category: "CAT 1", type: "MULTIPLE_CHOICE", difficulty: "EASY",
                questionText: "Which of the following is a fundamental style of computer programming (such as procedural or OOP)?",
                options: ["Programming Paradigm", "Software Engineering", "Dynamic Binding", "Machine Learning"],
                correctAnswer: "Programming Paradigm",
                explanation: "A programming paradigm is a fundamental style of computer programming."
            },
            
            // UNIT 1.2: Java Basics & Compilation
            {
                subjectId, category: "CAT 1", type: "MULTIPLE_CHOICE", difficulty: "MEDIUM",
                questionText: "During the compilation of a Java application, what is the role of the Java interpreter?",
                options: ["It translates Java source code into bytecode.", "It converts the bytecode into Machine code.", "It breaks the line of code into Java tokens.", "It manages automatic garbage collection."],
                correctAnswer: "It converts the bytecode into Machine code.",
                explanation: "The Java compiler converts source code into bytecode (.class), and then the Java interpreter (part of the JVM) converts that bytecode into machine-specific code."
            },
            {
                subjectId, category: "UE", type: "MULTIPLE_CHOICE", difficulty: "HARD",
                questionText: "What will happen if you declare a method as 'public void main(String[] args)' instead of 'public static void main(String[] args)' in the main class?",
                options: ["The program will compile and run successfully.", "The Java interpreter will fail to start the program because the entry point must be a class method.", "The compiler will throw a syntax error.", "The program will run but throw a NullPointerException."],
                correctAnswer: "The Java interpreter will fail to start the program because the entry point must be a class method.",
                explanation: "The keyword 'static' means that main() is a class method. The JVM needs to call it without instantiating an object of the class first. Without 'static', it won't find the entry point."
            },
            
            // UNIT 1.2: Operators and Control Statements
            {
                subjectId, category: "CAT 1", type: "MULTIPLE_CHOICE", difficulty: "HARD",
                questionText: "<pre><code>int x = 5;\nint y = ++x + x++ + --x;\nSystem.out.println(y);</code></pre>\nWhat will be the output of the above code snippet?",
                options: ["18", "19", "17", "16"],
                correctAnswer: "18",
                explanation: "++x makes x=6 (returns 6). x++ returns 6 (then makes x=7). --x makes x=6 (returns 6). Total: 6 + 6 + 6 = 18."
            },
            {
                subjectId, category: "EXERCISE", type: "MULTIPLE_CHOICE", difficulty: "MEDIUM",
                questionText: "<pre><code>int a = 10, b = 20;\nif (a++ > 10 && ++b > 20) {\n    System.out.print(\"Inside \");\n}\nSystem.out.print(a + \" \" + b);</code></pre>\nWhat is the output?",
                options: ["Inside 11 21", "11 20", "11 21", "Inside 10 20"],
                correctAnswer: "11 20",
                explanation: "The condition `a++ > 10` is evaluated first. `a` is 10, so 10 > 10 is false. Due to short-circuiting of `&&`, `++b` is NEVER executed. Thus `a` becomes 11, and `b` remains 20."
            },
            {
                subjectId, category: "POSSIBLE QNS", type: "MULTIPLE_CHOICE", difficulty: "HARD",
                questionText: "Which of the following statements about the 'switch' control structure in Java is FALSE?",
                options: ["A 'break' statement is mandatory inside every 'case' block to avoid compilation errors.", "The 'default' case is optional.", "A switch statement can be evaluated on a String (in Java 7+).", "If a 'break' is omitted, execution will fall through to the next case."],
                correctAnswer: "A 'break' statement is mandatory inside every 'case' block to avoid compilation errors.",
                explanation: "A 'break' statement is NOT mandatory for compilation. If omitted, it simply causes a 'fall-through' to the next case block at runtime, which is sometimes done intentionally."
            },
            {
                subjectId, category: "QUIZ", type: "MULTIPLE_CHOICE", difficulty: "EASY",
                questionText: "Which data type would you use to store a 64-bit floating-point number in Java?",
                options: ["float", "long", "double", "int"],
                correctAnswer: "double",
                explanation: "In Java, 'double' is a 64-bit floating-point type, whereas 'float' is 32-bit."
            }
        ];

        // Format classes
        questions.forEach(q => q._class = "com.school.model.Question");

        await db.collection('questions').insertMany(questions);
        console.log(`Successfully handcrafted and inserted ${questions.length} questions for Batch 1.`);

    } finally {
        await client.close();
    }
}
run();
