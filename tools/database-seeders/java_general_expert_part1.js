/**
 * JAVA GENERAL EXPERT QUESTIONS - PART 1 (50 Questions)
 * Topics: Java 9-17 Features (Records, var, Switch, Text Blocks), JVM Internals, Edge Cases
 * Categories: QUIZ, EXERCISE, CAT 1, POSSIBLE QNS, UE
 * Difficulty: EASY, MEDIUM, HARD
 */

const { MongoClient } = require('/run/media/careen/EE68-0880/4LAZIE/node_modules/mongodb');
const URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";
const SID = "6a5fc0d11b56432cd9e6f585";

const Q = (cat, lvl, q, opts, ans, exp) => ({
    subjectId: SID, category: cat, difficultyLevel: lvl,
    questionText: q, options: opts, correctAnswer: ans, explanation: exp,
    _class: "com.school.model.Question"
});

const questions = [

// ╔══════════════════════════════════╗
// ║          QUIZ - EASY             ║
// ╚══════════════════════════════════╝
Q("QUIZ","EASY",
  "Which keyword was introduced in Java 10 to allow local variable type inference?",
  ["let", "auto", "var", "dynamic"],
  "var",
  "The `var` keyword allows the compiler to infer the data type based on the assigned value (e.g., `var list = new ArrayList<String>();`). It can only be used for local variables inside methods."
),
Q("QUIZ","EASY",
  "What is a 'Record' in modern Java (Java 14+)?",
  ["A way to connect to a database record", "A restricted identifier that provides a compact syntax for declaring classes that are transparent carriers for immutable data", "A logging framework", "A multimedia file format"],
  "A restricted identifier that provides a compact syntax for declaring classes that are transparent carriers for immutable data",
  "Records eliminate boilerplate code. `public record Point(int x, int y) {}` automatically generates private final fields, a constructor, getters, `equals()`, `hashCode()`, and `toString()`."
),
Q("QUIZ","EASY",
  "What are Text Blocks (introduced in Java 15)?",
  ["Blocks of code that cannot be executed", "A multi-line string literal that avoids the need for most escape sequences, automatically formats the string in a predictable way", "A UI component for displaying large text", "Encrypted data chunks"],
  "A multi-line string literal that avoids the need for most escape sequences, automatically formats the string in a predictable way",
  "Text blocks start with `\"\"\"` and end with `\"\"\"`. They are perfect for embedding HTML, JSON, or SQL directly into Java code without ugly `\\n` and `+` concatenations."
),
Q("QUIZ","EASY",
  "Which component of the JVM is responsible for converting Java bytecode into native machine code at runtime?",
  ["The ClassLoader", "The Bytecode Verifier", "The Just-In-Time (JIT) Compiler", "The Garbage Collector"],
  "The Just-In-Time (JIT) Compiler",
  "The JIT compiler monitors which parts of the bytecode are executed frequently ('hot spots') and compiles them directly into native hardware instructions for maximum speed."
),
Q("QUIZ","EASY",
  "What is the extension of a compiled Java file containing bytecode?",
  [".java", ".exe", ".class", ".jar"],
  ".class",
  "The `javac` compiler converts human-readable `.java` source code into `.class` files containing JVM bytecode."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "Can you assign `null` to a variable declared with `var`? (e.g., `var data = null;`)",
  ["Yes, always", "No, the compiler cannot infer the type of a null literal because null has no type", "Only if it is cast later", "Yes, but it defaults to Object"],
  "No, the compiler cannot infer the type of a null literal because null has no type",
  "You must provide an explicit type or cast (e.g., `var data = (String) null;`) for the compiler to know how much memory to allocate conceptually."
),
Q("QUIZ","MEDIUM",
  "What is the Java Module System (Project Jigsaw) introduced in Java 9?",
  ["A way to run Java on mobile devices", "A structural feature that allows developers to group related packages and resources together into modules, specifying which packages are exposed and which dependencies are required", "A new IDE integration tool", "A replacement for Maven/Gradle"],
  "A structural feature that allows developers to group related packages and resources together into modules, specifying which packages are exposed and which dependencies are required",
  "Defined in a `module-info.java` file, it solves the \"JAR hell\" problem by enforcing strong encapsulation at the library level."
),
Q("QUIZ","MEDIUM",
  "What is the primary benefit of the new Switch Expressions (Java 12+)?",
  ["They execute faster than if-else", "They can return a value directly (e.g., `int x = switch(day) {...}`), and they use `->` syntax to avoid accidental fall-throughs (no `break` needed)", "They can switch on objects", "They replace the `for` loop"],
  "They can return a value directly (e.g., `int x = switch(day) {...}`), and they use `->` syntax to avoid accidental fall-throughs (no `break` needed)",
  "This turns the switch statement into an expression, making the code much cleaner and less prone to missing-break bugs."
),
Q("QUIZ","MEDIUM",
  "What is the difference between `ClassNotFoundException` and `NoClassDefFoundError`?",
  ["They are exactly the same", "`ClassNotFoundException` is a checked exception thrown when trying to load a class dynamically at runtime using `Class.forName()`. `NoClassDefFoundError` is a fatal error when the JVM cannot find a class at runtime that was present during compile-time.", "The former is for JVM, the latter is for the compiler", "One is for Web Apps, the other for Desktop"],
  "`ClassNotFoundException` is a checked exception thrown when trying to load a class dynamically at runtime using `Class.forName()`. `NoClassDefFoundError` is a fatal error when the JVM cannot find a class at runtime that was present during compile-time.",
  "`NoClassDefFoundError` usually means your classpath is broken or a `.jar` file went missing after compilation."
),
Q("QUIZ","MEDIUM",
  "What does the `yield` keyword do in modern Java?",
  ["It stops a thread", "It is used inside a multi-line Switch Expression block to return a value, replacing the old `return` keyword in that specific context", "It pauses the Garbage Collector", "It yields memory to the OS"],
  "It is used inside a multi-line Switch Expression block to return a value, replacing the old `return` keyword in that specific context",
  "If a case branch in a switch expression requires multiple lines of logic, you wrap it in `{}` and use `yield result;` to return the value for that branch."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is a 'Sealed Class' (Java 15+)?",
  ["A class that cannot be instantiated", "A class that restricts which other classes or interfaces may extend or implement it, giving developers precise control over the inheritance hierarchy", "A class that encrypts its variables", "A class that prevents reflection"],
  "A class that restricts which other classes or interfaces may extend or implement it, giving developers precise control over the inheritance hierarchy",
  "Example: `public sealed class Shape permits Circle, Square {}`. Only Circle and Square are legally allowed to extend Shape."
),
Q("QUIZ","HARD",
  "What is 'Pattern Matching for instanceof' (Java 14+)?",
  ["Using Regex inside instanceof", "A feature that eliminates the need for explicit casting after an `instanceof` check by binding the matched object to a new variable directly in the condition", "A way to match design patterns", "A switch statement feature"],
  "A feature that eliminates the need for explicit casting after an `instanceof` check by binding the matched object to a new variable directly in the condition",
  "Instead of `if (obj instanceof String) { String s = (String) obj; s.length(); }`, you can just write `if (obj instanceof String s) { s.length(); }`."
),
Q("QUIZ","HARD",
  "How does the JVM physically execute bytecode?",
  ["It translates everything to C++ first", "It uses an Interpreter to execute bytecode instruction by instruction. When it finds 'hot' code executed many times, it passes it to the JIT Compiler for native execution.", "It sends it to the OS to execute directly", "It runs it in a web browser"],
  "It uses an Interpreter to execute bytecode instruction by instruction. When it finds 'hot' code executed many times, it passes it to the JIT Compiler for native execution.",
  "This hybrid approach gives Java fast startup times (Interpreter) and peak performance (JIT) during long-running processes."
),
Q("QUIZ","HARD",
  "What happens if you run out of Metaspace memory?",
  ["The program slows down", "The JVM throws a `java.lang.OutOfMemoryError: Metaspace`", "The JVM automatically restarts", "The GC deletes old objects from the Heap"],
  "The JVM throws a `java.lang.OutOfMemoryError: Metaspace`",
  "This usually happens in massive enterprise applications (like Tomcat/WebLogic) that dynamically load and unload thousands of classes (e.g., via Spring or Hibernate) causing metadata to pile up."
),
Q("QUIZ","HARD",
  "What is the Bootstrap ClassLoader?",
  ["A script that starts the computer", "The parent of all classloaders in the JVM, responsible for loading the core Java API classes (like `java.lang.String` and `java.util.List`) from `rt.jar` or module systems", "A tool for loading CSS/HTML", "A dependency manager"],
  "The parent of all classloaders in the JVM, responsible for loading the core Java API classes (like `java.lang.String` and `java.util.List`) from `rt.jar` or module systems",
  "It is written in native code (C/C++), not Java. It delegates to the Extension/Platform ClassLoader, which delegates to the System/Application ClassLoader."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Is Java completely 100% Object-Oriented?",
  ["Yes, everything is an object", "No, because it supports primitive data types (int, double, char, etc.) which are not objects", "No, because it uses pointers", "Yes, but only in Java 8+"],
  "No, because it supports primitive data types (int, double, char, etc.) which are not objects",
  "Languages like Ruby or Smalltalk are 100% OOP because even a number like `5` is an object. Java compromises for performance by keeping primitives."
),
Q("EXERCISE","EASY",
  "What does the `javap` command do in the JDK?",
  ["It packages files into a .jar", "It runs the program", "It is the Java Class File Disassembler. It reads a `.class` file and prints its human-readable bytecode instructions and method signatures.", "It compiles Java code"],
  "It is the Java Class File Disassembler. It reads a `.class` file and prints its human-readable bytecode instructions and method signatures.",
  "It is highly useful for reverse engineering or analyzing what the compiler actually did to your code."
),
Q("EXERCISE","EASY",
  "What does `String::isBlank` do (introduced in Java 11)?",
  ["Checks if the string is empty (length 0)", "Checks if the string is empty OR contains only white space codepoints", "Checks if the string is null", "Replaces spaces with blanks"],
  "Checks if the string is empty OR contains only white space codepoints",
  "Unlike `isEmpty()` which returns false for `\"  \"`, `isBlank()` returns true, making it perfect for validating user input."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is the difference between `Array` and `ArrayList` regarding size?",
  ["Both can change size dynamically", "An Array has a fixed size defined at creation. An ArrayList grows and shrinks dynamically as you add/remove elements.", "ArrayList is fixed size, Array is dynamic", "Array can only hold numbers"],
  "An Array has a fixed size defined at creation. An ArrayList grows and shrinks dynamically as you add/remove elements.",
  "Under the hood, ArrayList manages a normal Array. When it gets full, it creates a new Array that is 50% larger and copies the data over."
),
Q("EXERCISE","MEDIUM",
  "What is `BigDecimal` used for?",
  ["Storing massive strings", "Storing numbers with infinite length", "Performing exact, high-precision decimal arithmetic without the rounding errors typical of `float` or `double`. It is mandatory for financial/currency calculations.", "Calculating geometric angles"],
  "Performing exact, high-precision decimal arithmetic without the rounding errors typical of `float` or `double`. It is mandatory for financial/currency calculations.",
  "Because `double` uses binary floating-point math, `0.1 + 0.2` might result in `0.30000000000000004`. `BigDecimal` fixes this."
),
Q("EXERCISE","MEDIUM",
  "What is the purpose of the `volatile` keyword?",
  ["To make a variable faster", "To indicate that a variable's value will be modified by different threads, forcing all threads to read the value directly from main memory instead of their local CPU caches", "To prevent a variable from being serialized", "To make a variable a constant"],
  "To indicate that a variable's value will be modified by different threads, forcing all threads to read the value directly from main memory instead of their local CPU caches",
  "It provides visibility guarantees, but unlike `synchronized`, it does not provide mutual exclusion (atomicity) for compound operations like `i++`."
),
Q("EXERCISE","MEDIUM",
  "How does Java implement 'Multiple Inheritance'?",
  ["It doesn't support it at all", "Through classes extending multiple classes", "A class can extend only ONE parent class, but it can implement MULTIPLE interfaces", "By using the `super` keyword multiple times"],
  "A class can extend only ONE parent class, but it can implement MULTIPLE interfaces",
  "This design choice avoids the infamous 'Diamond Problem' found in C++, while still allowing polymorphic behavior from multiple sources."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "Trace the output:\n<pre><code>Integer a = 1000, b = 1000;\nSystem.out.println(a == b);\nInteger c = 100, d = 100;\nSystem.out.println(c == d);</code></pre>",
  ["true true", "false false", "false true", "true false"],
  "false true",
  "Java maintains an Integer Cache for values between -128 and 127. Since 100 falls in this range, `c` and `d` point to the exact same cached object (`true`). 1000 is outside the cache, so `new` objects are created, meaning different memory addresses (`false`)."
),
Q("EXERCISE","HARD",
  "What is a 'Memory Leak' in Java, considering the Garbage Collector (GC) runs automatically?",
  ["A hardware failure", "When objects are no longer needed by the business logic, but the program unintentionally maintains a strong reference to them (e.g., in a static HashMap), preventing the GC from reclaiming the memory", "When the GC runs too frequently", "When variables are marked as null"],
  "When objects are no longer needed by the business logic, but the program unintentionally maintains a strong reference to them (e.g., in a static HashMap), preventing the GC from reclaiming the memory",
  "Over time, these 'forgotten' objects consume all the Heap space, resulting in a `java.lang.OutOfMemoryError`."
),
Q("EXERCISE","HARD",
  "What is 'Type Erasure' in Generics?",
  ["Removing a class from a package", "A process where the Java compiler replaces all generic type parameters with their bounds or `Object`. This ensures the bytecode contains no generic information, maintaining backward compatibility.", "Deleting generic methods", "Converting all objects to Strings"],
  "A process where the Java compiler replaces all generic type parameters with their bounds or `Object`. This ensures the bytecode contains no generic information, maintaining backward compatibility.",
  "Because of type erasure, `List<String>` and `List<Integer>` become exactly the same thing (`List`) at runtime. You cannot use `instanceof` with a specific generic type."
),
Q("EXERCISE","HARD",
  "Analyze this code: `double x = 0.0 / 0.0;` What is the result?",
  ["Throws ArithmeticException", "0.0", "NaN (Not a Number)", "Infinity"],
  "NaN (Not a Number)",
  "In floating-point math, division by zero does NOT throw an exception. `5.0 / 0` gives `Infinity`. `0.0 / 0.0` gives `NaN`."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which method is called first when a standalone Java application starts?",
  ["init()", "start()", "public static void main(String[] args)", "run()"],
  "public static void main(String[] args)",
  "The JVM specifically looks for this exact method signature to use as the entry point of the program."
),
Q("CAT 1","EASY",
  "What is the size of an `int` variable in Java?",
  ["8 bits (1 byte)", "16 bits (2 bytes)", "32 bits (4 bytes)", "64 bits (8 bytes)"],
  "32 bits (4 bytes)",
  "A standard `int` is a 32-bit signed integer. A `byte` is 8 bits, `short` is 16 bits, and `long` is 64 bits."
),
Q("CAT 1","EASY",
  "What is the output of `System.out.println(10 % 3);`?",
  ["3.33", "3", "1", "0"],
  "1",
  "The modulo operator (`%`) returns the remainder of a division. 10 divided by 3 is 9, with a remainder of 1."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "What is a `ClassLoader` in Java?",
  ["A part of the JVM that loads classes into memory from the file system or network, dynamically at runtime, when they are first referenced by the application", "A tool for zipping files", "A database connection pool", "A server component"],
  "A part of the JVM that loads classes into memory from the file system or network, dynamically at runtime, when they are first referenced by the application",
  "Java uses a Delegation Model. When a class is requested, the application classloader asks the extension classloader, which asks the bootstrap classloader."
),
Q("CAT 1","MEDIUM",
  "What does the `final` keyword mean when applied to a Class?",
  ["The class cannot be instantiated", "The class cannot be subclassed (extended) by any other class", "All its methods must be abstract", "The class is automatically synchronized"],
  "The class cannot be subclassed (extended) by any other class",
  "The `String` class is a perfect example. It is `final` to ensure that nobody can create a subclass and override its methods to break its immutability guarantee."
),
Q("CAT 1","MEDIUM",
  "What happens if you define a method inside an interface without using the `default` or `static` keywords?",
  ["It causes a compile error", "It is implicitly treated as `public abstract`, meaning any class implementing the interface MUST provide a concrete body for it", "It is treated as a private method", "It is ignored"],
  "It is implicitly treated as `public abstract`, meaning any class implementing the interface MUST provide a concrete body for it",
  "You don't need to write `public abstract void run();` in an interface. `void run();` means exactly the same thing."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is an 'Out Of Memory Error' (OOM) and how is it different from an Exception?",
  ["It is exactly the same", "It is a subclass of `Error`, which indicates serious problems that a reasonable application should not try to catch. It means the JVM literally has no RAM left to allocate to a new object.", "It is thrown when the hard drive is full", "It is checked at compile time"],
  "It is a subclass of `Error`, which indicates serious problems that a reasonable application should not try to catch. It means the JVM literally has no RAM left to allocate to a new object.",
  "You can technically catch an `Error`, but you shouldn't, because the JVM is usually in an unstable/unrecoverable state at that point."
),
Q("CAT 1","HARD",
  "Trace the code:\n<pre><code>String a = \"hello\";\nString b = \"hello\";\na = a.concat(\" world\");\nSystem.out.println(b);</code></pre>",
  ["hello world", "hello", "world", "null"],
  "hello",
  "Strings are immutable. `a.concat` creates a brand new String object and assigns the reference to `a`. Variable `b` still points to the original \"hello\" in the String Pool."
),
Q("CAT 1","HARD",
  "What is a 'PhantomReference' in Java?",
  ["A reference to a deleted object", "A type of Reference object (along with Soft and Weak) used to track objects after they have been finalized by the GC, but before their memory is actually reclaimed", "A security term for ghost objects", "A reference to a null pointer"],
  "A type of Reference object (along with Soft and Weak) used to track objects after they have been finalized by the GC, but before their memory is actually reclaimed",
  "PhantomReferences are used primarily as a safer, more flexible alternative to the `finalize()` method for performing cleanup actions."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "Which keyword is used to stop the current iteration of a loop and immediately jump to the next iteration?",
  ["break", "stop", "continue", "skip"],
  "continue",
  "While `break` kills the entire loop, `continue` just skips the remaining lines inside the loop for that specific cycle."
),
Q("POSSIBLE QNS","EASY",
  "What is the difference between `i++` and `++i`?",
  ["No difference", "`i++` (post-increment) uses the current value of `i` in the expression, then adds 1. `++i` (pre-increment) adds 1 to `i` first, then uses the new value in the expression.", "`++i` is for subtraction", "`i++` increments by 2"],
  "`i++` (post-increment) uses the current value of `i` in the expression, then adds 1. `++i` (pre-increment) adds 1 to `i` first, then uses the new value in the expression.",
  "E.g., if `i=5`, `int x = i++;` makes `x=5` and `i=6`. But `int y = ++i;` makes `y=6` and `i=6`."
),
Q("POSSIBLE QNS","EASY",
  "Which data structure operates on a First-In, First-Out (FIFO) principle?",
  ["Stack", "Queue", "Set", "HashMap"],
  "Queue",
  "Like a line at a bank, the first person to enter the Queue is the first one served. A Stack is Last-In, First-Out (LIFO)."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "Why is it considered bad practice to use `==` to compare Strings?",
  ["It is too slow", "Because `==` compares the memory address references, not the actual text content. Two different String objects with the exact same text will return `false` if compared with `==`.", "It causes a compile error", "It is actually the best practice"],
  "Because `==` compares the memory address references, not the actual text content. Two different String objects with the exact same text will return `false` if compared with `==`.",
  "Always use `.equals()` to compare the meaningful content of an object."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is 'Autoboxing' in Java?",
  ["A way to box a GUI component", "The automatic conversion the Java compiler makes between the primitive types and their corresponding object wrapper classes (e.g., converting an `int` to an `Integer`)", "A memory optimization technique", "A way to automatically run methods"],
  "The automatic conversion the Java compiler makes between the primitive types and their corresponding object wrapper classes (e.g., converting an `int` to an `Integer`)",
  "Autoboxing makes Collections easy to use. You can do `list.add(10);` instead of `list.add(Integer.valueOf(10));`."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is the difference between `List`, `Set`, and `Map`?",
  ["They are the same", "`List` is an ordered sequence that allows duplicates. `Set` is an unordered collection that prohibits duplicates. `Map` stores Key-Value pairs where Keys must be unique.", "`List` is for numbers, `Set` is for objects, `Map` is for files", "`Set` allows duplicates, `List` does not"],
  "`List` is an ordered sequence that allows duplicates. `Set` is an unordered collection that prohibits duplicates. `Map` stores Key-Value pairs where Keys must be unique.",
  "This is the fundamental trinity of the Java Collections Framework."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is 'String Interning'?",
  ["Erasing a string", "The process where Java stores only one copy of each distinct String value in the String Constant Pool. If a dynamically created String calls `.intern()`, Java returns the reference from the pool instead of the heap.", "Formatting a string", "Converting a string to lower case"],
  "The process where Java stores only one copy of each distinct String value in the String Constant Pool. If a dynamically created String calls `.intern()`, Java returns the reference from the pool instead of the heap.",
  "This is a massive memory-saving optimization technique for applications that generate the same text repeatedly (like XML parsing)."
),
Q("POSSIBLE QNS","HARD",
  "What does the `transient` keyword do?",
  ["Makes a variable run faster", "It tells the JVM that the variable should NOT be serialized. When the object is saved to a file or sent over a network, the `transient` variable's data is completely ignored.", "It prevents threads from accessing the variable", "It marks a variable as a constant"],
  "It tells the JVM that the variable should NOT be serialized. When the object is saved to a file or sent over a network, the `transient` variable's data is completely ignored.",
  "This is crucial for security (e.g., not saving a password variable to a file) or for performance (not saving derived calculations)."
),
Q("POSSIBLE QNS","HARD",
  "What is 'Thread Contention'?",
  ["When threads are destroyed", "A state where multiple threads are aggressively competing for the same resource (lock). It causes performance degradation because threads spend more time waiting (blocked) than executing.", "When a thread throws an exception", "When a thread is isolated"],
  "A state where multiple threads are aggressively competing for the same resource (lock). It causes performance degradation because threads spend more time waiting (blocked) than executing.",
  "High contention usually means your `synchronized` blocks are too large (coarse-grained). You should only synchronize the bare minimum lines of code needed."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "What is the purpose of the `break` keyword?",
  ["To pause the program", "To immediately terminate a loop or a switch statement, transferring control to the code immediately following the structure", "To throw an exception", "To skip one iteration of a loop"],
  "To immediately terminate a loop or a switch statement, transferring control to the code immediately following the structure",
  "Without a `break` in a `switch` case, the code will \"fall through\" and execute the subsequent cases as well."
),
Q("UE","EASY",
  "Which data structure uses the LIFO (Last-In, First-Out) principle?",
  ["Queue", "LinkedList", "Stack", "TreeSet"],
  "Stack",
  "Like a stack of plates, the last plate you place on top is the first one you take off."
),
Q("UE","EASY",
  "What is a 'NullPointerException' (NPE)?",
  ["A syntax error", "A runtime exception thrown when an application attempts to use an object reference that has the null value (i.e., trying to call a method or access a variable on an object that doesn't exist)", "A network error", "A database error"],
  "A runtime exception thrown when an application attempts to use an object reference that has the null value (i.e., trying to call a method or access a variable on an object that doesn't exist)",
  "It is the most common runtime exception in Java. Often called 'The Billion Dollar Mistake'."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the `java.util.Scanner` class primarily used for?",
  ["Scanning for viruses", "A simple text scanner which can parse primitive types and strings using regular expressions, commonly used to read input from `System.in` (the keyboard)", "Scanning barcode data", "Scanning memory leaks"],
  "A simple text scanner which can parse primitive types and strings using regular expressions, commonly used to read input from `System.in` (the keyboard)",
  "E.g., `Scanner sc = new Scanner(System.in); int num = sc.nextInt();`"
),
Q("UE","MEDIUM",
  "Can you force a subclass to OVERRIDE a method from the parent class?",
  ["No, overriding is always optional", "Yes, by declaring the parent class's method as `abstract`. This forces any concrete subclass to provide a body for that method.", "Yes, using the `final` keyword", "Yes, using the `@ForceOverride` annotation"],
  "Yes, by declaring the parent class's method as `abstract`. This forces any concrete subclass to provide a body for that method.",
  "Abstract methods act as a strict contract. If the child doesn't fulfill the contract, it won't compile."
),
Q("UE","MEDIUM",
  "What is 'Method Overloading'?",
  ["Defining a method in a child class that already exists in the parent class", "Having multiple methods in the SAME class with the exact same name, but with different parameters (different type, number, or order of parameters)", "A network overload", "Calling a method too many times"],
  "Having multiple methods in the SAME class with the exact same name, but with different parameters (different type, number, or order of parameters)",
  "Overloading is compile-time (static) polymorphism. Overriding is runtime (dynamic) polymorphism."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "Analyze this code:\n<pre><code>int[] arr = new int[5];\nSystem.out.println(arr[0]);</code></pre>",
  ["Throws ArrayOutOfBoundsException", "Throws NullPointerException", "Prints 0", "Compile Error: array not initialized"],
  "Prints 0",
  "When you allocate an array of primitives with `new`, the JVM automatically initializes all elements to their default values. For integers, the default is 0."
),
Q("UE","HARD",
  "What does the `synchronized` keyword actually lock?",
  ["It locks a specific block of code so nobody can read it", "It locks the Monitor (Mutex) of an Object. When a thread enters the block, it acquires the lock. Any other thread trying to access any synchronized block locking on the *same object* is forced to wait.", "It locks the CPU", "It locks a specific variable"],
  "It locks the Monitor (Mutex) of an Object. When a thread enters the block, it acquires the lock. Any other thread trying to access any synchronized block locking on the *same object* is forced to wait.",
  "You are not locking the 'code', you are locking the 'Object'. This is a critical distinction in concurrency."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new GENERAL EXPERT (Part 1) questions!`);

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
