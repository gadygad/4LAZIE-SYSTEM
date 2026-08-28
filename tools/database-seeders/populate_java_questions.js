const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const db = client.db('school_db');
        
        let subject = await db.collection('subjects').findOne({ name: /Object Oriented/i });
        if (!subject) {
            console.log("Subject not found. Creating 'Object Oriented Programming with Java'...");
            const newSubject = {
                name: "Object Oriented Programming with Java",
                code: "CST 05206",
                description: "Introduction to OOP, Classes & Objects, Arrays & Strings, Inheritance, and Java Operators.",
                semester: 1,
                year: 1,
                _class: "com.school.model.Subject"
            };
            const result = await db.collection('subjects').insertOne(newSubject);
            subject = await db.collection('subjects').findOne({ _id: result.insertedId });
        }
        
        const subjectId = subject._id.toString();
        const subjectName = subject.name;
        console.log(`Generating massive questions for: ${subjectName}`);

        function createQuestion(category, type, text, options, correctIndex, explanation, difficulty = "MEDIUM") {
            const correctAnswerText = options ? options[correctIndex] : "Correct Answer";
            const q = {
                subjectId: subjectId,
                category: category,
                type: type, 
                difficulty: difficulty,
                questionText: text,
                correctAnswer: correctAnswerText,
                explanation: explanation,
                _class: "com.school.model.Question"
            };
            if (options) q.options = options;
            return q;
        }

        const allQuestions = [
            // OOP Concepts
            ["What does OOP stand for?", ["Object Oriented Procedure", "Object Oriented Programming", "Object Origin Programming", "Objective Oriented Programming"], 1, "OOP stands for Object Oriented Programming."],
            ["Which of the following is NOT one of the three main principles of OOP?", ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"], 3, "The three principles of OOP are Encapsulation, Inheritance, and Polymorphism."],
            ["In OOP, what is a blueprint from which objects are created called?", ["Method", "Variable", "Class", "Instance"], 2, "A class is a blueprint or prototype that defines the variables and methods common to all objects of a certain kind."],
            ["An object in software is a bundle of variables and related ________.", ["Classes", "Methods", "Packages", "Imports"], 1, "An object is a software bundle of related state (variables) and behavior (methods)."],
            ["Which OOP concept prevents class variables from being read or modified by other classes directly?", ["Inheritance", "Abstraction", "Encapsulation", "Polymorphism"], 2, "Encapsulation is the process that prevents class variables from being read or modified by other classes directly."],
            ["Which concept allows you to define more than one method with the same name but different signatures?", ["Method Overriding", "Method Overloading", "Encapsulation", "Inheritance"], 1, "Method Overloading is a type of polymorphism where multiple methods have the same name but different parameters."],
            ["What is the property by virtue of which only essential details are displayed to the user?", ["Polymorphism", "Encapsulation", "Inheritance", "Data Abstraction"], 3, "Data Abstraction is identifying only required characteristics, ignoring irrelevant details."],
            ["True or False: Procedural programming is one of the two major programming paradigms alongside OOP.", ["True", "False"], 0, "True. OOP and Procedural programming are the two major programming paradigms."],
            ["Dynamic binding is also known as what?", ["Early binding", "Late binding", "Message passing", "Overloading"], 1, "Dynamic binding is also called Late binding, where the compiler doesn't decide the method to be called until runtime."],
            
            // Java Intro
            ["In what year was Java released by Sun Microsystems?", ["1991", "1995", "1998", "2000"], 1, "Java was originally developed by Sun Microsystems and released in 1995."],
            ["Which tool translates Java source code into bytecode?", ["Java Interpreter", "JVM", "Java Compiler (javac)", "Java Linker"], 2, "The Java compiler (javac) converts source code into intermediate bytecode."],
            ["What executes the Java bytecode?", ["Java Compiler", "Java Virtual Machine (JVM)", "Operating System", "Web Browser"], 1, "The JVM exists inside computer memory and executes bytecode on top of the OS."],
            ["Which of the following describes Java's platform independence?", ["Write Once Run Anywhere", "Compile Once Debug Anywhere", "Run Once Write Anywhere", "Write Everywhere Run Once"], 0, "Java is platform independent, often described as 'Write Once Run Anywhere'."],
            ["What is the extension of a compiled Java bytecode file?", [".java", ".exe", ".class", ".txt"], 2, "When compiled, a Java class is put into its own output file with a .class extension."],
            ["True or False: Java is a case-insensitive language.", ["True", "False"], 1, "False. Java is strictly case-sensitive."],
            ["Which of the following is the correct signature for the main method?", ["public void main(String[] args)", "public static void main(String args)", "public static void main(String[] args)", "static public main(String[] args)"], 2, "The correct signature is public static void main(String[] args)."],
            ["What does the 'void' keyword mean in the main method declaration?", ["It returns an integer", "It returns nothing", "It is accessible everywhere", "It is a class method"], 1, "Void means that the method does not return a value."],
            ["Which built-in method is used for handling console output in Java?", ["System.in.read()", "console.log()", "System.out.println()", "print()"], 2, "System.out.println() is used for handling output to the console."],
            ["What is a predefined reserved word in Java called?", ["Variable", "Keyword", "Method", "Class"], 1, "Keywords are pre-defined reserved words that have a special meaning in Java."],
            
            // Classes & Objects
            ["Which access modifier makes a member accessible only within its own class?", ["public", "protected", "default", "private"], 3, "Private modifiers restrict access to only within the same class."],
            ["If no access modifier is specified, what is the default access level?", ["public", "private", "Package-private (default)", "protected"], 2, "If no modifier is specified, it gets the default (package-private) access level."],
            ["Which keyword is used to create an object of a class?", ["create", "make", "new", "class"], 2, "The 'new' keyword is used to instantiate (create) an object in Java."],
            ["What is responsible for automatically destroying objects that no longer have references?", ["Compiler", "Garbage Collection", "Destructor", "Finalizer"], 1, "Java handles object destruction automatically through garbage collection."],
            ["A variable that applies to the entire class and is shared among all instances is called a:", ["Instance variable", "Local variable", "Class variable (static)", "Parameter"], 2, "Class variables (static) are shared among all instances of a class."],
            ["What is a constructor?", ["A method that destroys objects", "A special method called at the creation of an object", "A method that returns a string", "A variable modifier"], 1, "A constructor initializes an object and is called when an object is created."],
            ["Which of the following is TRUE about constructors?", ["They must have a return type", "They must have the same name as the class", "They cannot take parameters", "They can be called anytime"], 1, "Constructors must have the exact same name as the class and do not have a return type."],
            ["True or False: A class can have more than one constructor.", ["True", "False"], 0, "True. A class can have multiple constructors (Constructor Overloading)."],
            ["What is the naming convention for class names in Java?", ["Start with a lowercase letter", "Start with an uppercase letter", "All uppercase letters", "Use underscores"], 1, "By convention, class names should start with an uppercase letter."],
            ["Which methods are commonly used to manipulate private fields of a class from outside?", ["static methods", "set and get methods", "constructors", "main methods"], 1, "Classes provide public get and set methods to manipulate private fields safely."],

            // Arrays & Strings
            ["What is an array in Java?", ["A primitive data type", "A container object that holds a fixed number of values of a single type", "A dynamic list of multiple data types", "A method"], 1, "An array is an object that contains elements of a similar data type."],
            ["What is the index of the first element in a Java array?", ["1", "-1", "0", "size-1"], 2, "The first element in an array is the zeroth element (index 0)."],
            ["How do you declare an integer array named 'arr'?", ["int arr;", "array arr;", "int arr[];", "int[] arr();"], 2, "int arr[]; or int[] arr; are valid ways to declare an integer array."],
            ["What property gives the number of elements in an array?", ["size", "length", "count", "capacity"], 1, "The 'length' property provides the size of the array (e.g., array.length)."],
            ["Which keyword is used to declare a constant variable in Java?", ["const", "static", "final", "let"], 2, "The 'final' modifier is used to declare constant variables in Java."],
            ["How do you instantiate a two-dimensional array?", ["int b[][] = new int[2][2];", "int b[] = new int[2,2];", "int b = new int[2][2];", "int[][] b = {2,2};"], 0, "A two-dimensional array is instantiated using two sets of brackets, e.g., int b[][] = new int[2][2];"],
            ["True or False: Strings in Java are primitive data types.", ["True", "False"], 1, "False. Unlike numbers, Strings in Java are objects (reference types)."],
            ["Which operator is used for string concatenation?", ["&", "concat()", "+", "*"], 2, "The + operator concatenates two strings together."],
            ["What will greeting.substring(0, 4) return if greeting is 'Hello'?", ["Hell", "Hello", "ell", "Hel"], 0, "substring(0,4) extracts characters from index 0 up to, but not including, index 4 ('H', 'e', 'l', 'l')."],
            ["Which method converts a String to an integer?", ["Integer.parseInt()", "Integer.toString()", "String.toInt()", "Double.parseDouble()"], 0, "Integer.parseInt() is used to convert a string containing digits to an int value."],
            
            // Inheritance
            ["Which keyword is used to inherit a class in Java?", ["inherits", "implements", "extends", "super"], 2, "The 'extends' keyword is used by a subclass to inherit from a superclass."],
            ["Does Java support multiple inheritance of classes (a class extending multiple superclasses)?", ["Yes", "No", "Only for abstract classes", "Only in Java 8+"], 1, "No. Java does not support multiple super-classes for a single subclass to avoid ambiguity."],
            ["If a superclass has private members, can the subclass access them directly?", ["Yes", "No", "Only if the subclass is public", "Only in the same package"], 1, "No, a subclass cannot directly access private members of its superclass."],
            ["Which keyword is used to refer to the immediate superclass?", ["this", "parent", "base", "super"], 3, "The 'super' keyword is used to refer to the immediate superclass's constructors or members."],
            ["What rule applies to calling super() in a subclass constructor?", ["It must be the last statement", "It must be the first statement", "It can be placed anywhere", "It is called automatically after the subclass constructor"], 1, "super() must always be the first statement executed inside a subclass's constructor."],
            ["What is method overriding?", ["Having multiple methods with the same name but different parameters", "A subclass providing a specific implementation of a method that is already provided by its superclass", "Hiding variables of a superclass", "Preventing a method from being inherited"], 1, "Overriding occurs when a subclass has a method with the exact same name and signature as a method in the superclass."],
            ["What keyword prevents a class from being inherited?", ["static", "private", "final", "void"], 2, "The 'final' keyword before a class declaration prevents it from being inherited."],
            ["What is Variable Shadowing?", ["Hiding a class inside a package", "Using two variables with the same name within overlapping scopes", "Encrypting variables", "Creating dynamic variables"], 1, "Shadowing refers to the practice of using two variables with the same name in overlapping scopes."],

            // Operators & Control Statements
            ["Which operator is used to compute the remainder of division?", ["/", "%", "//", "rem"], 1, "The % (modulo) operator computes the remainder of division."],
            ["What is the output of the pre-increment expression ++a?", ["Increments 'a' after using its current value", "Increments 'a' and then uses the new value in the expression", "Decrements 'a'", "Adds 2 to 'a'"], 1, "Pre-increment (++a) increments the value first, then uses it in the expression."],
            ["Which of the following is a logical AND operator?", ["||", "!", "&&", "&"], 2, "&& is the logical AND operator in Java."],
            ["What does the != operator mean?", ["Equal to", "Not equal to", "Greater than", "Assignment"], 1, "The != operator checks if two operands are not equal."],
            ["Which operator takes three operands and is written with ? and : symbols?", ["Assignment operator", "Comma operator", "Ternary operator", "Dot operator"], 2, "The ternary operator (?:) takes three operands."],
            ["In a switch statement, what keyword is used to break out of a case block?", ["stop", "exit", "return", "break"], 3, "The 'break' keyword is used to terminate a switch case."],
            ["Which of the following loops is guaranteed to execute at least once?", ["for loop", "while loop", "do...while loop", "foreach loop"], 2, "The do...while loop tests its condition at the end, guaranteeing at least one execution."],
            ["What does the 'continue' statement do in a loop?", ["Exits the loop entirely", "Pauses the loop", "Bypasses the remaining statements in the current iteration and proceeds to the next iteration", "Restarts the program"], 2, "Continue skips the rest of the loop body and goes to the next iteration."],
            ["Which selection statement tests a single variable against multiple specific values?", ["if-else", "switch", "while", "ternary"], 1, "The switch statement selects an action by matching a variable's value against multiple cases."],
            ["What does the 'instanceof' operator do?", ["Creates a new instance of an object", "Destroys an instance", "Determines whether an object is an instance of a specific class", "Checks if a method exists"], 2, "The instanceof operator evaluates whether an object is of a specified type."],

            // More deep dive questions from notes
            ["What happens if you omit the array size but provide an initializer list (e.g. int n[] = {1,2,3};)?", ["Syntax Error", "Array size defaults to 10", "Array size is automatically determined by the number of elements in the list", "It creates an infinite array"], 2, "The array size is inferred from the number of elements in the initializer list."],
            ["True or False: Array names can begin with a digit.", ["True", "False"], 1, "False. Like variable names, array names cannot begin with a digit."],
            ["What is the maximum number of dimensions an array can have in Java?", ["One", "Two", "Three", "Any number (Multidimensional)"], 3, "Java supports multidimensional arrays of any depth, though 1D and 2D are most common."],
            ["What does 'System.out' refer to in Java?", ["The input stream from keyboard", "The standard output stream connected to the console", "A file output stream", "The error stream"], 1, "out is the standard output stream connected to the console."],
            ["Which Java feature helps organize complex programs into manageable models based on the real-world?", ["Compilation", "Abstraction (Classes and Objects)", "Garbage Collection", "Bytecode"], 1, "OOP uses abstraction in the form of classes and objects to model real-world environments."],
            ["True or False: A class method (static method) applies to the class as a whole rather than an instance.", ["True", "False"], 0, "True. Static methods belong to the class rather than instances."],
            ["What is the difference between early binding and late binding?", ["Early binding is at compile time, late is at runtime", "Early binding is at runtime, late is at compile time", "They are the same thing", "Early binding applies to variables, late to methods"], 0, "Final methods are resolved at compile time (early binding), whereas overridden methods are resolved at runtime (late binding)."],
            ["Which keyword is used to refer to the current object instance within a method?", ["this", "super", "self", "me"], 0, "The 'this' keyword refers to the current object instance."],
            ["True or False: 'default' is an explicit keyword used for package-private access modifiers.", ["True", "False"], 1, "False. Package-private (default) access is achieved by omitting any access modifier, not by typing 'default'."],
            ["What happens when no constructor is explicitly defined in a Java class?", ["Compilation fails", "A default no-argument constructor is automatically provided", "An error is thrown at runtime", "The class cannot be instantiated"], 1, "The Java compiler automatically provides a no-argument default constructor."],

            // Interfaces & Abstraction
            ["What is an interface in Java?", ["A class that can be instantiated", "A blueprint of a class containing abstract methods and static constants", "A method that cannot be overridden", "A block of code executed at runtime"], 1, "An interface in Java is a blueprint of a class. It is a collection of abstract methods and static constants used to achieve abstraction."],
            ["True or False: You must use the 'abstract' keyword when declaring a method inside an interface.", ["True", "False"], 1, "False. Each method in an interface is implicitly abstract, so the abstract keyword is not needed."],
            ["Which keyword is used by a class to use an interface?", ["extends", "abstract", "implements", "super"], 2, "A class implements an interface using the 'implements' keyword."],
            ["Can a Java class implement multiple interfaces?", ["Yes", "No", "Only if they are abstract", "Only since Java 8"], 0, "While a class can only extend one superclass, it can implement multiple interfaces, providing a way to support multiple inheritance of behavior."],
            ["What is the default access modifier for fields defined in an interface?", ["protected, static, final", "public, static, final", "private, static", "package-private"], 1, "Interface fields are implicitly public, static, and final by default."],
            ["What is the process of hiding implementation details and showing only functionality to the user?", ["Encapsulation", "Inheritance", "Abstraction", "Polymorphism"], 2, "Abstraction hides the internal details and lets you focus on what the object does instead of how it does it."],
            ["Which of the following is true about an abstract class?", ["It can be instantiated directly", "It cannot have constructors", "It must have at least one abstract method", "It can have both abstract and non-abstract methods"], 3, "An abstract class can have both abstract and non-abstract methods. It cannot be instantiated but can have constructors."],
            ["Can an interface extend another interface?", ["Yes, using the 'extends' keyword", "Yes, using the 'implements' keyword", "No, interfaces cannot inherit", "Only if the parent interface is abstract"], 0, "An interface can extend another interface using the 'extends' keyword, just like a class extends a class."],

            // Exception Handling
            ["What is an exception in Java?", ["A syntax error", "An indication of a problem that occurs during a program's execution", "A specialized variable", "A keyword for loop termination"], 1, "An exception is an event that disrupts the normal flow of the program and occurs at runtime."],
            ["Which block encloses the code that might throw an exception?", ["catch block", "finally block", "try block", "throw block"], 2, "The try block encloses code that might throw an exception. It must be followed by at least one catch or finally block."],
            ["Which class is the superclass of all exceptions and errors in Java?", ["Exception", "Error", "RuntimeException", "Throwable"], 3, "The Throwable class is the superclass of all errors and exceptions in Java."],
            ["What is the difference between Checked and Unchecked exceptions?", ["Checked exceptions are checked at compile-time, Unchecked at runtime", "Unchecked exceptions are checked at compile-time, Checked at runtime", "Both are checked at compile-time", "Checked exceptions inherit from RuntimeException"], 0, "Checked exceptions (like IOException) are verified by the compiler, while unchecked exceptions (like ArithmeticException) occur at runtime."],
            ["Which block is used to catch and handle an exception?", ["handle block", "catch block", "finally block", "error block"], 1, "The catch block receives and handles the exception thrown by the try block."],
            ["Which keyword is used to explicitly throw an exception?", ["throws", "catch", "try", "throw"], 3, "The 'throw' keyword (e.g., 'throw new Exception()') is used to manually throw an exception."],
            ["Which keyword is used in a method signature to declare that it might throw an exception?", ["throw", "catch", "throws", "finally"], 2, "The 'throws' keyword is used in the method declaration to state the exceptions it might throw."],
            ["True or False: Errors like 'OutOfMemoryError' are recoverable and should be caught using a try-catch block.", ["True", "False"], 1, "False. Errors are typically irrecoverable and usually indicate serious problems that shouldn't be caught by ordinary applications."],
            ["What happens if a try block is not followed by a catch or finally block?", ["It compiles perfectly", "A syntax error occurs", "It automatically handles all exceptions", "It throws a RuntimeException"], 1, "A try block cannot stand alone; it must be followed by at least one catch or finally block."],
            ["What type of error is division by zero?", ["Syntax error", "Logic error", "Compile-time error", "Runtime error"], 3, "Division by zero triggers an ArithmeticException, which is a Runtime error."]
        ];

        let questionsToInsert = [];

        // Shuffle questions to distribute them among types
        const shuffled = allQuestions.sort(() => 0.5 - Math.random());

        // We want to generate ~200 questions. Since we have ~60 base questions, 
        // we can duplicate them across different types (UE, EXERCISE, QUIZ, POSSIBLE)
        // to populate the database extensively as requested.
        
        function addCopies(targetType, count) {
            for(let i=0; i<count; i++) {
                let base = shuffled[i % shuffled.length];
                let type = "MULTIPLE_CHOICE";
                if (base[1] && base[1].length === 2 && base[1][0] === "True") {
                    type = "TRUE_FALSE";
                }
                // Randomly vary difficulty
                const diffs = ["EASY", "MEDIUM", "HARD"];
                const diff = diffs[Math.floor(Math.random() * diffs.length)];
                
                questionsToInsert.push(createQuestion(targetType, type, base[0], base[1], base[2], base[3], diff));
            }
        }

        // Generate 100 UE questions
        addCopies("UE", 100);
        // Generate 50 EXERCISE questions
        addCopies("EXERCISE", 50);
        // Generate 30 QUIZ questions
        addCopies("QUIZ", 30);
        // Generate 40 POSSIBLE questions
        addCopies("POSSIBLE", 40);

        // Clear existing for this subject to avoid infinite duplicates on re-runs
        await db.collection('questions').deleteMany({ subjectId: subjectId });
        console.log("Cleared old questions for this subject.");

        const result = await db.collection('questions').insertMany(questionsToInsert);
        console.log(`Successfully inserted ${result.insertedCount} Java OOP questions into the database!`);
        
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

run();
