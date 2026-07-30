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
            // ================== QUIZ ==================
            // EASY
            {
                category: "QUIZ", difficulty: "EASY",
                questionText: "Which of the following is NOT a Java keyword?",
                options: ["boolean", "extends", "String", "volatile"],
                correctAnswer: "String",
                explanation: "Java keywords (like boolean, extends, volatile) are all lowercase reserved words. 'String' is a class name in Java, not a keyword."
            },
            {
                category: "QUIZ", difficulty: "EASY",
                questionText: "What does the JVM stand for in Java?",
                options: ["Java Visual Machine", "Java Virtual Machine", "Java Variable Method", "Java Verified Mechanism"],
                correctAnswer: "Java Virtual Machine",
                explanation: "JVM stands for Java Virtual Machine, which runs on top of the OS and executes bytecode."
            },
            // MEDIUM
            {
                category: "QUIZ", difficulty: "MEDIUM",
                questionText: "In Java, what is the size of the 'char' data type?",
                options: ["8 bits", "16 bits", "32 bits", "64 bits"],
                correctAnswer: "16 bits",
                explanation: "In Java, 'char' uses 16 bits (2 bytes) to support Unicode characters, unlike C/C++ where it is usually 8 bits. (Note: The provided notes simplified it to 8 bits historically, but standard Java is 16. If based strictly on notes page 33, it says 'char, 8 bit' which is a common simplification in old curricula)."
            },
            // HARD
            {
                category: "QUIZ", difficulty: "HARD",
                questionText: "Which of the following statements about 'Dynamic Binding' is correct?",
                options: ["The compiler decides which method to call at compile time.", "It is also known as Early binding.", "Method overloading is a perfect example of it.", "It is also called Late binding, and method overriding is a perfect example of it."],
                correctAnswer: "It is also called Late binding, and method overriding is a perfect example of it.",
                explanation: "Dynamic binding (Late binding) means the method to be called is decided at runtime, not by the compiler. Method overriding is the perfect example."
            },

            // ================== EXERCISE ==================
            // EASY
            {
                category: "EXERCISE", difficulty: "EASY",
                questionText: "Write a statement that correctly declares a constant variable named MAX_SPEED with a value of 120.",
                options: ["final int MAX_SPEED = 120;", "const int MAX_SPEED = 120;", "int final MAX_SPEED = 120;", "static MAX_SPEED = 120;"],
                correctAnswer: "final int MAX_SPEED = 120;",
                explanation: "In Java, the 'final' keyword is used to declare constant variables, and by convention, they are written in uppercase."
            },
            // MEDIUM
            {
                category: "EXERCISE", difficulty: "MEDIUM",
                questionText: "<pre><code>int x = 10;\nx += 5 * 2;\nSystem.out.println(x);</code></pre>\nWhat is the output of the above code?",
                options: ["20", "30", "100", "150"],
                correctAnswer: "20",
                explanation: "Due to operator precedence, multiplication (5 * 2 = 10) happens before the compound assignment (+=). So x = 10 + 10 = 20."
            },
            // HARD
            {
                category: "EXERCISE", difficulty: "HARD",
                questionText: "<pre><code>int a = 5, b = 2;\nif (a == 5 || ++b > 2) {\n    System.out.print(b);\n}</code></pre>\nWhat will be printed?",
                options: ["2", "3", "Compilation Error", "Nothing will be printed"],
                correctAnswer: "2",
                explanation: "The logical OR (||) uses short-circuit evaluation. Since 'a == 5' is true, the second condition '++b > 2' is NEVER evaluated. Therefore, 'b' remains 2."
            },

            // ================== CAT 1 ==================
            // EASY
            {
                category: "CAT 1", difficulty: "EASY",
                questionText: "Java systems contain an environment, the language itself, APIs, and ____.",
                options: ["A web browser", "A Java Virtual Machine (JVM)", "A C++ compiler", "A database"],
                correctAnswer: "A Java Virtual Machine (JVM)",
                explanation: "As per the notes, Java systems consist of the Environment, Language, APIs, and the JVM."
            },
            // MEDIUM
            {
                category: "CAT 1", difficulty: "MEDIUM",
                questionText: "Which access control modifier prevents class variables from being read or modified by ANY other class?",
                options: ["public", "protected", "private", "default"],
                correctAnswer: "private",
                explanation: "The 'private' modifier ensures that the variables are strictly encapsulated and can only be accessed within their own class."
            },
            // HARD
            {
                category: "CAT 1", difficulty: "HARD",
                questionText: "<pre><code>public class Demo {\n    public static void main(String args[]) {\n        System.out.println(10 + 20 + \"Java\" + 10 + 20);\n    }\n}</code></pre>\nWhat is the exact output of this program?",
                options: ["30Java30", "1020Java1020", "30Java1020", "Compilation Error"],
                correctAnswer: "30Java1020",
                explanation: "Execution is left-to-right. 10 + 20 are integers, so they add up to 30. Then 30 + \"Java\" becomes \"30Java\" (String). From then on, the + operator concatenates, so + 10 becomes \"30Java10\" and + 20 becomes \"30Java1020\"."
            },

            // ================== POSSIBLE QNS ==================
            // EASY
            {
                category: "POSSIBLE QNS", difficulty: "EASY",
                questionText: "Which of the following describes a class in Java?",
                options: ["An instance of an object", "A blueprint that defines variables and methods common to all objects of a certain kind", "A primitive data type", "A reserved keyword for looping"],
                correctAnswer: "A blueprint that defines variables and methods common to all objects of a certain kind",
                explanation: "A class acts as a template or blueprint from which individual objects (instances) are created."
            },
            // MEDIUM
            {
                category: "POSSIBLE QNS", difficulty: "MEDIUM",
                questionText: "If 'Car' is the class, what would 'wheels, speed limits, and mileage' represent?",
                options: ["Objects", "Instances", "Properties (Variables)", "Methods (Behaviors)"],
                correctAnswer: "Properties (Variables)",
                explanation: "In OOP, physical characteristics or states like wheels and mileage are represented as properties (variables) of the class."
            },
            // HARD
            {
                category: "POSSIBLE QNS", difficulty: "HARD",
                questionText: "What is the difference between Compile-time polymorphism and Run-time polymorphism?",
                options: ["Compile-time is overriding, Run-time is overloading.", "Compile-time is overloading, Run-time is overriding.", "Compile-time involves interfaces, Run-time involves abstract classes.", "There is no difference in Java."],
                correctAnswer: "Compile-time is overloading, Run-time is overriding.",
                explanation: "Overloading (Compile-time) means methods share the same name but different signatures within the same class. Overriding (Run-time) means the derived class implements a method already provided by the base class."
            },

            // ================== UE ==================
            // EASY
            {
                category: "UE", difficulty: "EASY",
                questionText: "What filename extension MUST a Java source code file use?",
                options: [".class", ".txt", ".java", ".jvm"],
                correctAnswer: ".java",
                explanation: "A Java source code file uses the .java extension, which is then compiled into a .class file containing bytecode."
            },
            // MEDIUM
            {
                category: "UE", difficulty: "MEDIUM",
                questionText: "In terms of computers, what is 'Message Passing' in Object-Oriented Programming?",
                options: ["Sending an SMS via Java code", "Transferring data over the internet", "Communication between processes (e.g., sending an object/message from one thread to another)", "Passing variables to a method inside the same class"],
                correctAnswer: "Communication between processes (e.g., sending an object/message from one thread to another)",
                explanation: "Message passing is a form of communication used in OOP and parallel programming, resembling sending an object from one thread to another."
            },
            // HARD
            {
                category: "UE", difficulty: "HARD",
                questionText: "<pre><code>int count = 0;\nwhile (count < 3) {\n    count++;\n    if (count == 2) continue;\n    System.out.print(count + \" \");\n}</code></pre>\nWhat is the output?",
                options: ["1 2 3", "1 3", "0 1 2", "1"],
                correctAnswer: "1 3",
                explanation: "The loop runs for count=0,1,2. When count becomes 1, it prints '1 '. When count becomes 2, the 'continue' statement skips the print. When count becomes 3, it prints '3 '."
            }
        ];

        // Ensure subjectId and class are appended to all questions
        questions.forEach(q => {
            q.subjectId = subjectId;
            q._class = "com.school.model.Question";
        });

        await db.collection('questions').insertMany(questions);
        console.log(`Inserted ${questions.length} handcrafted questions for Unit 1.1 & 1.2.`);

    } finally {
        await client.close();
    }
}
run();
