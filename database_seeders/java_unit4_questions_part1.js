/**
 * JAVA UNIT 4 - EXCEPTIONS & ERROR HANDLING - HANDCRAFTED QUESTIONS (PART 1)
 * Based on: Unit 4 (Exceptions, Try-Catch-Finally, Throw/Throws, Checked vs Unchecked)
 * Categories: QUIZ, EXERCISE, CAT 1, POSSIBLE QNS, UE
 * Difficulty: EASY, MEDIUM, HARD
 */

const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const SID = "6a5fc0d11b56432cd9e6f585";

const Q = (cat, lvl, q, opts, ans, exp) => ({
    subjectId: SID, category: cat, difficultyLevel: lvl,
    questionText: q, options: opts, correctAnswer: ans, exp,
    _class: "com.school.model.Question"
});

const questions = [

// ╔══════════════════════════════════╗
// ║          QUIZ - EASY             ║
// ╚══════════════════════════════════╝
Q("QUIZ","EASY",
  "What is an Exception in Java?",
  ["A syntax error in the code", "An unwanted or unexpected event that occurs during the execution of a program, disrupting the normal flow of instructions", "A compile-time warning", "A special method used to terminate the program"],
  "An unwanted or unexpected event that occurs during the execution of a program, disrupting the normal flow of instructions",
  "Exceptions occur at runtime (e.g., dividing by zero, file not found) and can be caught and handled so the program doesn't crash."
),
Q("QUIZ","EASY",
  "Which block is used to write code that might throw an exception?",
  ["catch", "finally", "try", "throw"],
  "try",
  "The `try` block encloses the code that is at risk of generating an exception. It must be followed by either a `catch` or a `finally` block (or both)."
),
Q("QUIZ","EASY",
  "Which keyword is used to explicitly throw an exception manually in the code?",
  ["throws", "catch", "throw", "finally"],
  "throw",
  "The `throw` keyword (e.g., `throw new ArithmeticException(\"Error\");`) is used inside a method to actually generate and throw a new exception object."
),
Q("QUIZ","EASY",
  "What is the superclass of all exception and error classes in Java?",
  ["java.lang.Exception", "java.lang.Error", "java.lang.Throwable", "java.lang.Object"],
  "java.lang.Throwable",
  "The `Throwable` class is the root class for the entire exception hierarchy. It has two main subclasses: `Error` and `Exception`."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is the difference between Checked and Unchecked exceptions?",
  ["Checked exceptions are checked at runtime, Unchecked at compile-time", "Checked exceptions (e.g. IOException) must be handled or declared in the method signature (compile-time checking). Unchecked exceptions (e.g. NullPointerException) do not require mandatory handling.", "There is no difference", "Unchecked exceptions cannot be caught"],
  "Checked exceptions (e.g. IOException) must be handled or declared in the method signature (compile-time checking). Unchecked exceptions (e.g. NullPointerException) do not require mandatory handling.",
  "The compiler forces you to write `try-catch` or `throws` for Checked Exceptions. Unchecked exceptions (subclasses of RuntimeException) are usually programming logic errors."
),
Q("QUIZ","MEDIUM",
  "What happens if a `finally` block is provided after a `try-catch` block?",
  ["It executes only if an exception was thrown", "It executes only if NO exception was thrown", "It always executes regardless of whether an exception occurred or not", "It causes a compilation error"],
  "It always executes regardless of whether an exception occurred or not",
  "The `finally` block is designed for cleanup code (like closing files or database connections) and is guaranteed to run even if an exception crashes the `try` block."
),
Q("QUIZ","MEDIUM",
  "What is the output?\n<pre><code>try {\n    int data = 50 / 0;\n} catch(ArithmeticException e) {\n    System.out.print(\"Catch \");\n} finally {\n    System.out.print(\"Finally\");\n}</code></pre>",
  ["Catch", "Finally", "Catch Finally", "Program crashes before printing anything"],
  "Catch Finally",
  "The division by zero throws an ArithmeticException. The `catch` block handles it (printing 'Catch '), and then the `finally` block executes (printing 'Finally')."
),
Q("QUIZ","MEDIUM",
  "Can you have multiple `catch` blocks for a single `try` block?",
  ["No, only one catch is allowed", "Yes, but they must all catch the exact same exception type", "Yes, allowing you to handle different types of exceptions in different ways", "Yes, but it slows down the program significantly"],
  "Yes, allowing you to handle different types of exceptions in different ways",
  "You can stack multiple catch blocks. The JVM will check them from top to bottom and execute the first one that matches the thrown exception type."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "If you have multiple `catch` blocks, what is the rule regarding the order of exception classes?",
  ["Alphabetical order", "Superclasses (broader exceptions) must be caught FIRST before Subclasses (specific exceptions)", "Subclasses (specific exceptions) must be caught FIRST before Superclasses (broader exceptions)", "Order does not matter"],
  "Subclasses (specific exceptions) must be caught FIRST before Superclasses (broader exceptions)",
  "If you put `catch(Exception e)` first, it will catch EVERYTHING, making any specific catch blocks below it unreachable code (which causes a compile-time error in Java)."
),
Q("QUIZ","HARD",
  "What happens here?\n<pre><code>try {\n    return;\n} finally {\n    System.out.println(\"Finally\");\n}</code></pre>",
  ["The method returns immediately and prints nothing", "Prints 'Finally' and then the method returns", "Compile Error: try without catch", "Runtime Exception"],
  "Prints 'Finally' and then the method returns",
  "Even if there is a `return` statement inside the `try` block, the `finally` block is guaranteed to execute BEFORE the actual return happens."
),
Q("QUIZ","HARD",
  "When will a `finally` block NOT execute?",
  ["When an exception is thrown but not caught", "When the try block executes successfully", "When System.exit(0) is called in the try or catch block", "When a return statement is encountered in the catch block"],
  "When System.exit(0) is called in the try or catch block",
  "Calling `System.exit()` immediately shuts down the entire JVM. This is one of the very few scenarios where a `finally` block is bypassed."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which exception is thrown when an array is accessed with an illegal index (e.g., negative or greater than size)?",
  ["NullPointerException", "ArithmeticException", "ArrayIndexOutOfBoundsException", "IllegalArgumentException"],
  "ArrayIndexOutOfBoundsException",
  "This unchecked exception occurs whenever you try to access an index that doesn't exist in the array."
),
Q("EXERCISE","EASY",
  "What does it mean to 'Catch' an exception?",
  ["To pause the program", "To handle the exception using a catch block so the program can continue running instead of crashing", "To ignore the error completely", "To send the error to the compiler"],
  "To handle the exception using a catch block so the program can continue running instead of crashing",
  "Catching an exception prevents the JVM from abnormally terminating the program and allows you to provide a graceful fallback."
),
Q("EXERCISE","EASY",
  "Which keyword is placed in the method signature to indicate that the method might throw a checked exception?",
  ["throw", "throws", "catch", "try"],
  "throws",
  "The `throws` keyword (e.g., `void readFile() throws IOException`) warns any caller of the method that they must handle this potential checked exception."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>try {\n    String s = null;\n    System.out.print(s.length());\n} catch(NullPointerException e) {\n    System.out.print(\"Null\");\n}</code></pre>",
  ["0", "Null", "Compile error", "Runtime exception"],
  "Null",
  "Attempting to call `.length()` on a null reference throws a `NullPointerException`. The catch block intercepts it and prints 'Null'."
),
Q("EXERCISE","MEDIUM",
  "Can a `try` block exist by itself without a `catch` or `finally` block?",
  ["Yes, it is perfectly legal", "No, it must be followed by either `catch` or `finally` (or both)", "Yes, if the method uses 'throws'", "No, it must have BOTH `catch` and `finally`"],
  "No, it must be followed by either `catch` or `finally` (or both)",
  "A `try` block without a handler or a cleanup block is meaningless and results in a compilation error."
),
Q("EXERCISE","MEDIUM",
  "Explain the difference between `Error` and `Exception` in Java.",
  ["They are exactly the same", "Exceptions are recoverable issues that programs should handle; Errors are severe, unrecoverable problems (like OutOfMemoryError) that programs generally should not try to catch", "Errors are checked at compile time, Exceptions at runtime", "Errors are for logic mistakes, Exceptions are for hardware failures"],
  "Exceptions are recoverable issues that programs should handle; Errors are severe, unrecoverable problems (like OutOfMemoryError) that programs generally should not try to catch",
  "Both inherit from `Throwable`. Errors (e.g., StackOverflowError) indicate serious JVM problems, while Exceptions (e.g., IOException) are typical application-level issues."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is printed?\n<pre><code>int test() {\n    try { return 1; }\n    catch(Exception e) { return 2; }\n    finally { return 3; }\n}\nSystem.out.println(test());</code></pre>",
  ["1", "2", "3", "Compile error"],
  "3",
  "If a `finally` block contains a `return` statement, it OVERRIDES any `return` statement from the `try` or `catch` blocks. The method will return 3."
),
Q("EXERCISE","HARD",
  "What is Exception Propagation?",
  ["Creating a new exception from an old one", "The process where an unhandled exception is passed down the method call stack until it finds a suitable catch block or crashes the program", "Broadcasting exceptions to other threads", "The JVM converting Errors into Exceptions"],
  "The process where an unhandled exception is passed down the method call stack until it finds a suitable catch block or crashes the program",
  "If MethodA calls MethodB, and MethodB throws an exception it doesn't catch, the exception 'propagates' back to MethodA. If MethodA doesn't catch it, it goes to the JVM, which halts the program."
),
Q("EXERCISE","HARD",
  "Do Unchecked Exceptions (like RuntimeException) propagate automatically?",
  ["No, they must be explicitly declared with 'throws'", "Yes, they automatically propagate up the call stack without needing to be declared with 'throws'", "They do not propagate at all", "Only if the compiler is configured to allow it"],
  "Yes, they automatically propagate up the call stack without needing to be declared with 'throws'",
  "Unlike Checked exceptions which force you to use `throws` or `try-catch`, Unchecked exceptions are 'invisible' to the compiler and propagate up the stack silently until caught or the app crashes."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which exception is thrown if you try to divide an integer by zero?",
  ["ArithmeticException", "MathException", "ZeroDivisionError", "NumberFormatException"],
  "ArithmeticException",
  "Dividing an integer by zero (e.g. `5 / 0`) throws a `java.lang.ArithmeticException`. Note: dividing a float by zero (e.g. `5.0 / 0`) results in `Infinity`, not an exception."
),
Q("CAT 1","EASY",
  "What does it mean to create a 'Custom Exception'?",
  ["Modifying the JVM core files", "Creating a new class that extends `Exception` or `RuntimeException` to represent a specific, application-level error (e.g., `InsufficientFundsException`)", "Overriding the `main` method", "Using special keywords to ignore errors"],
  "Creating a new class that extends `Exception` or `RuntimeException` to represent a specific, application-level error (e.g., `InsufficientFundsException`)",
  "Java allows you to define your own exception classes by inheriting from the Exception hierarchy to handle business-specific logic."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "What happens if a method declares `throws IOException` but the code inside never actually throws it?",
  ["Compile-time error", "Runtime exception", "It compiles and runs perfectly fine", "The JVM throws an empty exception"],
  "It compiles and runs perfectly fine",
  "The `throws` clause is just a warning to the caller. The compiler does not strictly enforce that the exception MUST be thrown inside the body, only that the caller must handle the *possibility* of it."
),
Q("CAT 1","MEDIUM",
  "What is the output?\n<pre><code>try {\n    throw new Exception(\"Hello\");\n} catch(Exception e) {\n    System.out.print(e.getMessage());\n}</code></pre>",
  ["Hello", "Exception: Hello", "null", "Compile error"],
  "Hello",
  "The `getMessage()` method of the Exception class returns the detail message string that was passed to the constructor (in this case, 'Hello')."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "Analyze this code:\n<pre><code>void test() throws Exception {\n    try {\n        throw new ArithmeticException();\n    } catch (RuntimeException e) {\n        throw new Exception();\n    }\n}</code></pre>",
  ["Compile error", "Throws ArithmeticException", "Throws Exception", "Program terminates normally"],
  "Throws Exception",
  "The ArithmeticException is thrown and caught by `catch (RuntimeException e)` because it is a subclass. Inside the catch block, a new generic `Exception` is thrown out of the method."
),
Q("CAT 1","HARD",
  "What is 'Exception Chaining' in Java?",
  ["Putting multiple try-catch blocks in a line", "Catching one exception, wrapping it inside a new exception, and throwing the new one while preserving the original exception as the 'cause'", "Throwing an exception from a finally block", "Ignoring exceptions"],
  "Catching one exception, wrapping it inside a new exception, and throwing the new one while preserving the original exception as the 'cause'",
  "Constructors like `new CustomException(\"Failed\", originalException)` allow you to chain exceptions. This is crucial for debugging, as it preserves the original stack trace (the root cause)."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "Which exception is thrown when you try to convert a string like \"ABC\" into an integer using `Integer.parseInt()`?",
  ["StringIndexOutOfBoundsException", "ArithmeticException", "NumberFormatException", "TypeCastException"],
  "NumberFormatException",
  "`Integer.parseInt()` requires a string containing only valid numeric digits. Providing letters throws a `NumberFormatException`."
),
Q("POSSIBLE QNS","EASY",
  "What is the purpose of the `printStackTrace()` method?",
  ["To print the program's output to a printer", "To print the exception's name, description, and the exact line numbers (call stack) where the error occurred", "To resume the program", "To ignore the exception"],
  "To print the exception's name, description, and the exact line numbers (call stack) where the error occurred",
  "It is a highly useful diagnostic tool used in catch blocks to find exactly where and how an exception occurred."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is the multi-catch block feature introduced in Java 7?",
  ["Allowing `try` blocks inside `catch` blocks", "Catching multiple exceptions in a single catch block using the bitwise OR operator `|` (e.g. `catch(IOException | SQLException e)`)", "Catching exceptions across different threads automatically", "Catching all errors without an Exception parameter"],
  "Catching multiple exceptions in a single catch block using the bitwise OR operator `|` (e.g. `catch(IOException | SQLException e)`)",
  "This feature reduces code duplication when you want to handle several different exceptions in the exact same way."
),
Q("POSSIBLE QNS","MEDIUM",
  "In a multi-catch block `catch(ExceptionA | ExceptionB e)`, what is the rule regarding the relationship between the exceptions?",
  ["They must be from the same package", "They must be checked exceptions", "They CANNOT have a parent-child inheritance relationship", "They MUST have a parent-child inheritance relationship"],
  "They CANNOT have a parent-child inheritance relationship",
  "If `ExceptionB` is a subclass of `ExceptionA`, the compiler will throw an error because catching the parent `ExceptionA` automatically covers the child, making the OR statement redundant."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What happens if an exception is thrown inside a `catch` block?",
  ["The program ignores it", "The `finally` block (if present) executes, and then the new exception propagates up the call stack, replacing the original exception", "The original exception continues to propagate", "The JVM crashes immediately without running `finally`"],
  "The `finally` block (if present) executes, and then the new exception propagates up the call stack, replacing the original exception",
  "Exceptions in catch blocks are treated just like exceptions anywhere else. They abort the catch block, run the finally block, and propagate outward."
),
Q("POSSIBLE QNS","HARD",
  "What is 'Try-with-Resources' in Java?",
  ["A way to automatically assign CPU resources", "A feature (Java 7+) that automatically closes resources (like files or database connections) when the try block exits, eliminating the need for a finally block", "A try block that executes multiple times", "A way to catch errors automatically"],
  "A feature (Java 7+) that automatically closes resources (like files or database connections) when the try block exits, eliminating the need for a finally block",
  "Syntax: `try (Scanner sc = new Scanner(System.in)) { ... }`. Any resource implementing the `AutoCloseable` interface is automatically closed."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "True or False: You can throw an unchecked exception (like RuntimeException) without declaring it in the `throws` clause of the method signature.",
  ["True", "False", "Only in the main method", "Only if it is caught immediately"],
  "True",
  "Unchecked exceptions do not require the `throws` declaration. The compiler does not verify them."
),
Q("UE","EASY",
  "If a method contains `throw new IOException();`, what must be added to the method signature for the code to compile?",
  ["throws Exception", "throws IOException", "Either throws IOException or a superclass like throws Exception", "Nothing is required"],
  "Either throws IOException or a superclass like throws Exception",
  "`IOException` is a checked exception. You must declare that the method `throws` it, so the caller knows they have to deal with it."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the output?\n<pre><code>try {\n    System.out.print(\"A\");\n    int x = 10 / 0;\n    System.out.print(\"B\");\n} catch(Exception e) {\n    System.out.print(\"C\");\n}</code></pre>",
  ["ABC", "AC", "C", "A followed by Exception stack trace"],
  "AC",
  "It prints 'A'. The division by zero throws an exception, skipping 'B' and jumping straight to the catch block, which prints 'C'."
),
Q("UE","MEDIUM",
  "When overriding a method, what is the rule regarding Checked Exceptions?",
  ["The overriding method must throw the exact same exceptions", "The overriding method CANNOT throw new or broader checked exceptions than the overridden method", "The overriding method can throw any exception", "Exceptions cannot be used in overridden methods"],
  "The overriding method CANNOT throw new or broader checked exceptions than the overridden method",
  "If the parent method throws `IOException`, the child method can throw `IOException`, `FileNotFoundException` (a subclass), or no exception. It CANNOT throw `Exception` (a broader superclass)."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What happens in this try-with-resources code if `close()` throws an exception?\n<pre><code>try (MyResource r = new MyResource()) {\n    throw new Exception(\"Try block error\");\n} catch (Exception e) {\n    // handling\n}</code></pre>",
  ["The close() exception replaces the try block exception", "The try block exception is suppressed and replaced by the close() exception", "The try block exception is thrown, and the close() exception is added to it as a 'suppressed' exception", "The program crashes"],
  "The try block exception is thrown, and the close() exception is added to it as a 'suppressed' exception",
  "In try-with-resources, if both the try block and the auto-close process throw exceptions, the try block's exception is the primary one. The close exception is 'suppressed' and can be retrieved using `e.getSuppressed()`."
),
Q("UE","HARD",
  "Can you force a Garbage Collection in Java to prevent an OutOfMemoryError?",
  ["Yes, by using System.gc() which guarantees immediate collection", "Yes, by calling Object.finalize()", "No, System.gc() is only a request/suggestion to the JVM, it does not guarantee immediate garbage collection", "No, Garbage Collection cannot be triggered manually in any way"],
  "No, System.gc() is only a request/suggestion to the JVM, it does not guarantee immediate garbage collection",
  "While you can call `System.gc()`, the JVM is free to ignore it. You can never 100% force garbage collection to happen at a specific exact millisecond."
)

];

async function insertQuestions() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');

        const existingTexts = new Set();
        const existing = await db.collection('questions')
            .find({ subjectId: SID, category: { $in: ["QUIZ","EXERCISE","CAT 1","POSSIBLE QNS","UE"] } })
            .toArray();
        existing.forEach(q => existingTexts.add(`${q.category}|${q.questionText.substring(0, 50)}`));

        const toInsert = questions.filter(q => {
            const key = `${q.category}|${q.questionText.substring(0, 50)}`;
            if (existingTexts.has(key)) {
                console.log(`⚠️  Skipping duplicate: [${q.category}] ${q.questionText.substring(0, 40)}...`);
                return false;
            }
            return true;
        });

        if (toInsert.length === 0) {
            console.log('✅ No new questions to insert (all already exist)');
            return;
        }

        const result = await db.collection('questions').insertMany(toInsert);
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 4 (Part 1) questions!`);

        const summary = {};
        toInsert.forEach(q => {
            const key = `${q.category} (${q.difficultyLevel})`;
            summary[key] = (summary[key] || 0) + 1;
        });
        console.log('\n📊 Breakdown:');
        Object.entries(summary).sort().forEach(([k, v]) => console.log(`   ${k}: ${v}`));

    } finally {
        await client.close();
    }
}

insertQuestions().catch(console.error);
