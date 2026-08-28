/**
 * JAVA GENERAL EXPERT QUESTIONS - PART 4 (68 Questions)
 * Topics: Collections Deep Dive, Threading, Serialization, Tricky Syntax
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
  "Which interface is the root of the Java Collections Framework hierarchy (excluding Maps)?",
  ["List", "Set", "Collection", "Iterable"],
  "Collection",
  "`Collection` is the root interface for `List`, `Set`, and `Queue`. `Map` is part of the framework but does not inherit from `Collection`."
),
Q("QUIZ","EASY",
  "What is the main difference between `HashSet` and `TreeSet`?",
  ["HashSet is slower", "HashSet stores elements in a random order based on hash codes. TreeSet automatically sorts its elements in their natural ascending order (e.g., A-Z, 1-100).", "TreeSet allows duplicates", "HashSet is for numbers only"],
  "HashSet stores elements in a random order based on hash codes. TreeSet automatically sorts its elements in their natural ascending order (e.g., A-Z, 1-100).",
  "Because TreeSet sorts data (using a Red-Black tree), operations like `add()` and `remove()` take O(log n) instead of O(1)."
),
Q("QUIZ","EASY",
  "What does the `final` keyword do when applied to a variable?",
  ["It makes the variable static", "It makes the variable a constant, meaning its value cannot be changed once initialized", "It prevents the variable from being deleted by the GC", "It hides the variable"],
  "It makes the variable a constant, meaning its value cannot be changed once initialized",
  "For objects, it means you cannot change the reference to point to a `new` object, though you can still modify the internal state of the object."
),
Q("QUIZ","EASY",
  "Which method from the `Object` class is called by the Garbage Collector before an object is destroyed?",
  ["destroy()", "finalize()", "clean()", "delete()"],
  "finalize()",
  "Note: `finalize()` is deprecated in modern Java because its execution is unpredictable. You should use `try-with-resources` or `Cleaner` instead."
),
Q("QUIZ","EASY",
  "What is the difference between `System.out.print()` and `System.out.println()`?",
  ["No difference", "`print()` outputs text on the current line. `println()` outputs text and then automatically moves the cursor to a new line (adds a newline character).", "`println()` is faster", "`print()` cannot output numbers"],
  "`print()` outputs text on the current line. `println()` outputs text and then automatically moves the cursor to a new line (adds a newline character).",
  "This is fundamental for formatting console output."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is the difference between `HashMap` and `LinkedHashMap`?",
  ["LinkedHashMap is thread-safe", "HashMap does not guarantee any iteration order. LinkedHashMap maintains a doubly-linked list running through all its entries, preserving the exact order in which elements were inserted.", "HashMap is deprecated", "LinkedHashMap allows nulls, HashMap does not"],
  "HashMap does not guarantee any iteration order. LinkedHashMap maintains a doubly-linked list running through all its entries, preserving the exact order in which elements were inserted.",
  "LinkedHashMap is perfect for building caches (like LRU Cache) because it remembers the order of insertion or access."
),
Q("QUIZ","MEDIUM",
  "Can a class implement two interfaces that have a `default` method with the exact same name and signature? (Java 8+)",
  ["Yes, and the JVM automatically picks one", "No, the compiler throws an error (Diamond Problem) unless the class explicitly overrides the conflicting method and provides its own implementation (or calls a specific interface's `super` method)", "Yes, if one is static", "Interfaces cannot have method bodies"],
  "No, the compiler throws an error (Diamond Problem) unless the class explicitly overrides the conflicting method and provides its own implementation (or calls a specific interface's `super` method)",
  "To resolve it, you write: `InterfaceA.super.methodName();` inside your overridden method."
),
Q("QUIZ","MEDIUM",
  "What does `String.intern()` do?",
  ["It encrypts the string", "It checks if an identical string already exists in the String Constant Pool. If yes, it returns the pooled reference; if no, it adds the string to the pool and returns its reference.", "It converts the string to uppercase", "It deletes the string"],
  "It checks if an identical string already exists in the String Constant Pool. If yes, it returns the pooled reference; if no, it adds the string to the pool and returns its reference.",
  "This saves massive amounts of memory when parsing documents (like XML) with millions of identical strings."
),
Q("QUIZ","MEDIUM",
  "What is a 'Daemon Thread'?",
  ["A thread that attacks the OS", "A low-priority background thread (like the Garbage Collector) that does not prevent the JVM from exiting. When all user threads finish, the JVM forcefully terminates all daemon threads.", "A thread that cannot be stopped", "A thread used only for UI"],
  "A low-priority background thread (like the Garbage Collector) that does not prevent the JVM from exiting. When all user threads finish, the JVM forcefully terminates all daemon threads.",
  "You make a thread a daemon by calling `thread.setDaemon(true)` before starting it."
),
Q("QUIZ","MEDIUM",
  "Why should you NEVER use `==` to compare two `float` or `double` values directly?",
  ["It causes a compile error", "Because floating-point math is imprecise in binary (e.g., 0.1 + 0.2 = 0.30000000000000004). You should check if the difference between them is less than a tiny 'epsilon' value.", "Because they are objects", "Because it is too slow"],
  "Because floating-point math is imprecise in binary (e.g., 0.1 + 0.2 = 0.30000000000000004). You should check if the difference between them is less than a tiny 'epsilon' value.",
  "E.g., `Math.abs(a - b) < 0.000001` is the correct way to compare floats."
),
Q("QUIZ","MEDIUM",
  "What is the output of `System.out.println(Math.min(Double.MIN_VALUE, 0.0d));`?",
  ["0.0", "Double.MIN_VALUE", "Compile Error", "Throws Exception"],
  "0.0",
  "Trick question! `Double.MIN_VALUE` is a POSITIVE number representing the smallest positive non-zero fraction the JVM can hold (like 4.9e-324). Since 0.0 is smaller than that, 0.0 is printed."
),
Q("QUIZ","MEDIUM",
  "What is a `ThreadLocal` variable?",
  ["A variable that runs on a separate thread", "A special variable class that provides thread-local variables. Each thread that accesses one has its own, independently initialized copy of the variable, avoiding concurrency issues.", "A variable that cannot be changed", "A variable stored in the hard drive"],
  "A special variable class that provides thread-local variables. Each thread that accesses one has its own, independently initialized copy of the variable, avoiding concurrency issues.",
  "This is heavily used in web servers (like Tomcat) to store data specific to the current user's request (like a Transaction ID or Database Connection)."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is a 'Race Condition' in Java concurrency?",
  ["When two threads run at different speeds", "A critical bug that occurs when two or more threads attempt to read and write shared data at the exact same time, and the final result depends on the unpredictable timing (scheduling) of the threads", "When a thread wins a process", "When the CPU overheats"],
  "A critical bug that occurs when two or more threads attempt to read and write shared data at the exact same time, and the final result depends on the unpredictable timing (scheduling) of the threads",
  "E.g., If thread A and B both try to increment `count++` at the exact same microsecond, the count might only increase by 1 instead of 2."
),
Q("QUIZ","HARD",
  "What is the difference between `wait()` and `sleep()` in Java?",
  ["They are identical", "`sleep()` pauses the thread but keeps all locks it holds. `wait()` is called on an Object and causes the thread to pause AND RELEASE the lock on that object so other threads can enter the synchronized block.", "`wait()` throws an exception", "`sleep()` is for objects, `wait()` is for threads"],
  "`sleep()` pauses the thread but keeps all locks it holds. `wait()` is called on an Object and causes the thread to pause AND RELEASE the lock on that object so other threads can enter the synchronized block.",
  "Also, `sleep()` is a static method of `Thread`, while `wait()` is an instance method of `Object`."
),
Q("QUIZ","HARD",
  "What is 'Serialization' in Java?",
  ["Sorting data alphabetically", "The process of converting the state of a Java Object into a byte stream, allowing it to be saved to a file, sent over a network, or saved to a database", "Encrypting a password", "Compiling code to bytecode"],
  "The process of converting the state of a Java Object into a byte stream, allowing it to be saved to a file, sent over a network, or saved to a database",
  "The reverse process is called Deserialization. The class must implement `java.io.Serializable`."
),
Q("QUIZ","HARD",
  "Why is it dangerous to deserialize an object from an untrusted source?",
  ["It might be a virus", "Because deserialization automatically executes code to reconstruct the object, making it highly vulnerable to Remote Code Execution (RCE) attacks if the attacker maliciously modifies the byte stream", "It will crash the OS", "It will delete your database"],
  "Because deserialization automatically executes code to reconstruct the object, making it highly vulnerable to Remote Code Execution (RCE) attacks if the attacker maliciously modifies the byte stream",
  "This is why modern Java applications prefer JSON or XML over native Java Serialization."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "What does `Collections.reverse(list)` do?",
  ["Deletes the list", "Permanently reverses the order of the elements inside the specified List", "Returns a new reversed list", "Throws an exception if the list is empty"],
  "Permanently reverses the order of the elements inside the specified List",
  "It modifies the original list in place."
),
Q("EXERCISE","EASY",
  "Which keyword is used to handle exceptions that are not caught by the current method?",
  ["throws", "throw", "catch", "pass"],
  "throws",
  "Used in the method signature, it tells the compiler that the calling method is responsible for handling the exception."
),
Q("EXERCISE","EASY",
  "What is the output of `System.out.println(\"Java\".substring(1, 3));`?",
  ["Jav", "av", "va", "ava"],
  "av",
  "Substring takes the start index (inclusive) and end index (exclusive). Index 1 is 'a', index 2 is 'v'. It stops before index 3."
),
Q("EXERCISE","EASY",
  "Can a `final` variable be initialized inside a constructor?",
  ["No, it must be initialized on declaration", "Yes, a 'blank final' variable can be initialized inside the constructor, but once initialized there, it can never change", "Yes, but only if it is static", "No, final variables are initialized by the OS"],
  "Yes, a 'blank final' variable can be initialized inside the constructor, but once initialized there, it can never change",
  "This is highly useful for assigning immutable configuration data to an object when it is created."
),
Q("EXERCISE","EASY",
  "What does the `.equals()` method of the `Object` class do by default?",
  ["It compares string values", "It compares the exact memory address of the objects (exactly the same as the `==` operator)", "It throws an exception", "It returns true"],
  "It compares the exact memory address of the objects (exactly the same as the `==` operator)",
  "This is why you MUST override `.equals()` in your custom classes if you want to compare their actual data (like comparing two Employees by their ID)."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What happens if you don't use `break` in a `switch` statement case?",
  ["Compile error", "The code will execute the matched case and then 'fall through', executing all subsequent cases sequentially until it hits a break or the end of the switch block", "It throws a RuntimeException", "It skips all other cases automatically"],
  "The code will execute the matched case and then 'fall through', executing all subsequent cases sequentially until it hits a break or the end of the switch block",
  "This 'fall-through' behavior is an infamous source of bugs. Java 14+ introduced the `->` syntax to fix this."
),
Q("EXERCISE","MEDIUM",
  "What is the purpose of the `volatile` keyword applied to a boolean flag in multithreading?",
  ["To make the boolean false", "To guarantee that if one thread changes the flag, ALL other threads will instantly see the updated value because the flag is written directly to main memory, bypassing CPU caches", "To encrypt the flag", "To make it thread-safe for arithmetic operations"],
  "To guarantee that if one thread changes the flag, ALL other threads will instantly see the updated value because the flag is written directly to main memory, bypassing CPU caches",
  "It is commonly used for a `boolean running = true;` flag to signal a thread to stop cleanly."
),
Q("EXERCISE","MEDIUM",
  "What is the difference between `Checked` and `Unchecked` exceptions in Java?",
  ["No difference", "Checked exceptions (like IOException) are verified at compile-time; you MUST handle them. Unchecked exceptions (like NullPointerException) extend RuntimeException and are not verified at compile-time.", "Unchecked exceptions cannot be caught", "Checked exceptions are faster"],
  "Checked exceptions (like IOException) are verified at compile-time; you MUST handle them. Unchecked exceptions (like NullPointerException) extend RuntimeException and are not verified at compile-time.",
  "Modern Java frameworks (like Spring) heavily prefer unchecked exceptions to reduce boilerplate try-catch blocks."
),
Q("EXERCISE","MEDIUM",
  "What is an `Anonymous Inner Class`?",
  ["A class with no name, created on the fly usually to instantiate an interface or extend a class for one-time use (like a button click listener)", "A class that hides its variables", "A class without a package", "A class that cannot be compiled"],
  "A class with no name, created on the fly usually to instantiate an interface or extend a class for one-time use (like a button click listener)",
  "E.g., `Runnable r = new Runnable() { public void run() { ... } };`"
),
Q("EXERCISE","MEDIUM",
  "What does `Math.round(-1.5)` return?",
  ["-1", "-2", "0", "-1.5"],
  "-1",
  "In Java, `Math.round(x)` adds 0.5 and takes the mathematical floor. -1.5 + 0.5 = -1.0. The floor is -1."
),
Q("EXERCISE","MEDIUM",
  "What does the `instanceof` operator check?",
  ["It checks the size of an object", "It checks whether an object reference is an instance of a specified Class or Interface, returning true or false", "It checks if a variable is null", "It creates a new instance"],
  "It checks whether an object reference is an instance of a specified Class or Interface, returning true or false",
  "Used heavily before casting to prevent a `ClassCastException`."
),
Q("EXERCISE","MEDIUM",
  "What is the difference between `System.out.print` and `System.err.print`?",
  ["`out` is for strings, `err` is for numbers", "`out` is the standard output stream (usually white/black text). `err` is the standard error stream (usually red text) and is used to output error messages separate from normal logs.", "`err` crashes the program", "No difference"],
  "`out` is the standard output stream (usually white/black text). `err` is the standard error stream (usually red text) and is used to output error messages separate from normal logs.",
  "In servers, `err` is often redirected to a specific `error.log` file."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the 'String Pool' and why does it exist?",
  ["A list of passwords", "A special storage area in the Java Heap memory. To save space, Java stores only one copy of each literal String. If you write \"Hello\" twice, both variables point to the exact same object in the pool.", "A garbage collection tool", "A networking buffer"],
  "A special storage area in the Java Heap memory. To save space, Java stores only one copy of each literal String. If you write \"Hello\" twice, both variables point to the exact same object in the pool.",
  "Because Strings are immutable, it is perfectly safe for multiple variables to share the same String object."
),
Q("EXERCISE","HARD",
  "Trace the output:\n<pre><code>try {\n  throw new Error();\n} catch (Exception e) {\n  System.out.print(\"E\");\n} finally {\n  System.out.print(\"F\");\n}</code></pre>",
  ["E", "F followed by program crash", "EF", "Compile Error"],
  "F followed by program crash",
  "The catch block only catches `Exception`. An `Error` (like OutOfMemoryError) does NOT inherit from `Exception`, so it bypasses the catch. However, the `finally` block ALWAYS runs before the thread crashes, so it prints 'F'."
),
Q("EXERCISE","HARD",
  "What is a `WeakReference` in Java?",
  ["A reference that throws exceptions", "A type of reference that does NOT protect an object from the Garbage Collector. If an object is only referenced by WeakReferences, the GC will aggressively delete it during the next cycle.", "A reference to a null object", "A reference used in old Java"],
  "A type of reference that does NOT protect an object from the Garbage Collector. If an object is only referenced by WeakReferences, the GC will aggressively delete it during the next cycle.",
  "It is used heavily in `WeakHashMap` to create caches that automatically delete old data when the JVM needs memory."
),
Q("EXERCISE","HARD",
  "What is 'Covariant Return Type' in method overriding?",
  ["Returning a boolean", "A feature that allows a subclass overriding a method to change the return type to a SUBCLASS of the original return type", "Returning multiple values", "Returning a generic type"],
  "A feature that allows a subclass overriding a method to change the return type to a SUBCLASS of the original return type",
  "E.g., If the parent method returns an `Animal`, the child's overridden method can return a `Dog` without causing a compile error."
),
Q("EXERCISE","HARD",
  "What is a Labeled Break (e.g., `break outerLoop;`) used for?",
  ["To crash the program", "To immediately break completely out of a deeply nested outer loop from within an inner loop, bypassing normal scope rules", "To break a switch statement", "To break a try-catch block"],
  "To immediately break completely out of a deeply nested outer loop from within an inner loop, bypassing normal scope rules",
  "Normally, a `break` only exits the immediate loop it is inside. By adding a label, you can target exactly which loop to exit."
),
Q("EXERCISE","HARD",
  "What is the time complexity of `ArrayList.add(0, element)` (adding to the front of the list)?",
  ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
  "O(n)",
  "Because ArrayList is backed by a continuous array, adding to index 0 forces the JVM to physically shift EVERY single existing element in the array one slot to the right, which takes O(n) time."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "What is the keyword `this`?",
  ["It refers to the parent class", "It is a reference variable that refers to the current object in which it is used", "It is a static method", "It refers to the main thread"],
  "It is a reference variable that refers to the current object in which it is used",
  "Commonly used inside a constructor to resolve naming conflicts: `this.name = name;`."
),
Q("CAT 1","EASY",
  "Which mathematical method is used to find the highest value between two numbers in Java?",
  ["Math.highest(a, b)", "Math.max(a, b)", "Math.ceiling(a, b)", "Math.top(a, b)"],
  "Math.max(a, b)",
  "The `java.lang.Math` class contains many static methods for basic numeric operations."
),
Q("CAT 1","EASY",
  "What is the result of `10 / 0` in Java for integers?",
  ["0", "Infinity", "Throws ArithmeticException", "NaN"],
  "Throws ArithmeticException",
  "Integer division by zero causes a crash. (Floating point division like `10.0 / 0` returns Infinity)."
),
Q("CAT 1","EASY",
  "Which logical operator represents 'OR' in Java?",
  ["&&", "||", "!", "=="],
  "||",
  "The `||` operator returns true if at least one of the operands is true."
),
Q("CAT 1","EASY",
  "Which package is automatically imported in every single Java program?",
  ["java.util", "java.io", "java.lang", "java.net"],
  "java.lang",
  "This is why you don't need to write `import java.lang.String;` or `import java.lang.System;`."
),
Q("CAT 1","EASY",
  "What is a 'POJO'?",
  ["Plain Old Java Object - A simple Java object containing only private variables, an empty constructor, and public getters/setters, unencumbered by any specific framework restrictions.", "A networking protocol", "A Java exception", "A database table"],
  "Plain Old Java Object - A simple Java object containing only private variables, an empty constructor, and public getters/setters, unencumbered by any specific framework restrictions.",
  "POJOs are used everywhere to represent Data Models."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "What does `Collections.unmodifiableList(list)` do?",
  ["It encrypts the list", "It returns a read-only view of the specified list. If anyone attempts to call `.add()` or `.remove()` on this view, it throws an `UnsupportedOperationException`.", "It deletes the list", "It makes the list run faster"],
  "It returns a read-only view of the specified list. If anyone attempts to call `.add()` or `.remove()` on this view, it throws an `UnsupportedOperationException`.",
  "This is heavily used to securely pass internal lists to third-party code without letting them alter the original data."
),
Q("CAT 1","MEDIUM",
  "What is the difference between an `Iterator` and an `Enumeration`?",
  ["No difference", "`Iterator` is modern, fail-fast, and allows removing elements during iteration via `.remove()`. `Enumeration` is a legacy interface (from Java 1.0) that is slow and cannot remove elements.", "`Enumeration` is for numbers only", "`Iterator` is deprecated"],
  "`Iterator` is modern, fail-fast, and allows removing elements during iteration via `.remove()`. `Enumeration` is a legacy interface (from Java 1.0) that is slow and cannot remove elements.",
  "You will only see Enumeration in very old code (like `Vector` or `Hashtable`)."
),
Q("CAT 1","MEDIUM",
  "What is the 'fail-fast' property of standard Java Collections?",
  ["They execute quickly", "If a thread modifies a collection (like an ArrayList) while an Iterator is iterating over it, the Iterator instantly throws a `ConcurrentModificationException` rather than risking unpredictable behavior.", "They ignore errors", "They skip null values"],
  "If a thread modifies a collection (like an ArrayList) while an Iterator is iterating over it, the Iterator instantly throws a `ConcurrentModificationException` rather than risking unpredictable behavior.",
  "To safely remove an element while looping, you MUST use the Iterator's `it.remove()` method, not the List's `list.remove()` method."
),
Q("CAT 1","MEDIUM",
  "In Java 8, what is a `Method Reference`?",
  ["A pointer to a memory address", "A compact, easy-to-read lambda expression used to refer to an existing method by name, using the `::` symbol (e.g., `System.out::println`)", "A way to override a method", "A deprecated feature"],
  "A compact, easy-to-read lambda expression used to refer to an existing method by name, using the `::` symbol (e.g., `System.out::println`)",
  "If a lambda expression simply calls one existing method, a method reference is preferred for readability."
),
Q("CAT 1","MEDIUM",
  "What does `Math.ceil(2.1)` return?",
  ["2.0", "3.0", "2.1", "3.1"],
  "3.0",
  "`ceil` stands for ceiling. It always rounds UP to the nearest whole mathematical integer."
),
Q("CAT 1","MEDIUM",
  "What is the purpose of the `Comparable` interface?",
  ["To check if two objects are the same", "To define the 'Natural Ordering' of a class (like sorting Students by ID) by implementing the `compareTo(T obj)` method inside the class itself", "To sort lists of integers", "To compare strings"],
  "To define the 'Natural Ordering' of a class (like sorting Students by ID) by implementing the `compareTo(T obj)` method inside the class itself",
  "If a class implements `Comparable`, `Collections.sort(list)` knows exactly how to sort it without any extra instructions."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What happens if you use `==` to compare `Integer x = 127; Integer y = 127;` vs `Integer a = 128; Integer b = 128;`?",
  ["Both true", "Both false", "x==y is true, a==b is false", "x==y is false, a==b is true"],
  "x==y is true, a==b is false",
  "The JVM caches Integer objects for values from -128 to 127. So x and y point to the exact same cached object in memory. 128 is outside the cache, so 'a' and 'b' are two completely separate objects in the heap."
),
Q("CAT 1","HARD",
  "What is a 'Deadlock' in Java Multithreading?",
  ["When a thread dies", "A fatal state where Thread A locks Resource X and waits for Resource Y, while Thread B locks Resource Y and waits for Resource X. Both threads are stuck waiting forever.", "When a loop runs infinitely", "When the CPU is overloaded"],
  "A fatal state where Thread A locks Resource X and waits for Resource Y, while Thread B locks Resource Y and waits for Resource X. Both threads are stuck waiting forever.",
  "Deadlocks completely freeze the affected threads and usually require a full server restart to fix. Proper lock ordering prevents this."
),
Q("CAT 1","HARD",
  "What is 'Type Inference' in Java Generics?",
  ["Casting objects", "The compiler's ability to look at a method invocation and corresponding declaration to automatically determine the type arguments (e.g., using the Diamond Operator `<>` instead of `<String>`)", "Converting int to string", "A runtime check"],
  "The compiler's ability to look at a method invocation and corresponding declaration to automatically determine the type arguments (e.g., using the Diamond Operator `<>` instead of `<String>`)",
  "E.g., `List<String> list = new ArrayList<>();` saves you from typing `<String>` twice."
),
Q("CAT 1","HARD",
  "Trace the exception flow:\n<pre><code>try { throw new NullPointerException(); }\ncatch(Exception e) { throw new RuntimeException(); }\nfinally { throw new ArithmeticException(); }</code></pre>",
  ["Throws NullPointerException", "Throws RuntimeException", "Throws ArithmeticException", "Program terminates normally"],
  "Throws ArithmeticException",
  "The `finally` block ALWAYS executes last. If it throws an exception, it completely overwrites and hides any exception thrown earlier in the try or catch blocks (This is called an Exception Suppression bug)."
),
Q("CAT 1","HARD",
  "What does the `transient` keyword do when an object is Serialized?",
  ["It encrypts the variable", "It tells the JVM to completely ignore the variable. The variable's data is NOT saved to the file/stream, and when deserialized, it reverts to its default value (null or 0).", "It compresses the variable", "It saves the variable twice"],
  "It tells the JVM to completely ignore the variable. The variable's data is NOT saved to the file/stream, and when deserialized, it reverts to its default value (null or 0).",
  "This is crucial for preventing sensitive data (like `transient String password;`) from being saved to the hard drive in plain text."
),
Q("CAT 1","HARD",
  "What is the difference between an `Interface` and an `Abstract Class` in modern Java?",
  ["They are identical", "A class can implement MULTIPLE interfaces but can extend only ONE abstract class. Abstract classes can have state (instance variables) and constructors, whereas interfaces cannot.", "Interfaces are faster", "Abstract classes are deprecated"],
  "A class can implement MULTIPLE interfaces but can extend only ONE abstract class. Abstract classes can have state (instance variables) and constructors, whereas interfaces cannot.",
  "Use an Abstract Class when you want to share core identity and variables (IS-A). Use an Interface when you want to share a capability or contract (CAN-DO)."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "Which keyword is used to create an instance of a class (an object) in memory?",
  ["create", "object", "new", "init"],
  "new",
  "The `new` keyword allocates memory on the Heap for the object and returns a reference to that memory."
),
Q("POSSIBLE QNS","EASY",
  "What is a 'Constructor'?",
  ["A method used to destroy objects", "A special block of code that is executed automatically when an object is created. It has the exact same name as the class and has NO return type.", "A class that builds UI", "A string builder"],
  "A special block of code that is executed automatically when an object is created. It has the exact same name as the class and has NO return type.",
  "Constructors are primarily used to initialize the object's instance variables."
),
Q("POSSIBLE QNS","EASY",
  "Can you have multiple methods with the same name in the same class?",
  ["No, never", "Yes, this is called Method Overloading. The methods must have a different number of parameters or different types of parameters.", "Yes, this is called Method Overriding", "Yes, but they must be private"],
  "Yes, this is called Method Overloading. The methods must have a different number of parameters or different types of parameters.",
  "The compiler knows which one to call based on the arguments you provide."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What does the `super()` keyword do inside a constructor?",
  ["It calls the superclass's constructor. It MUST be the very first statement inside the child's constructor.", "It makes the object superior", "It speeds up execution", "It creates a new thread"],
  "It calls the superclass's constructor. It MUST be the very first statement inside the child's constructor.",
  "If you don't explicitly write `super()`, the Java compiler silently inserts a call to the parent's default no-argument constructor anyway."
),
Q("POSSIBLE QNS","MEDIUM",
  "What happens if a child class defines a variable with the EXACT same name as a variable in the parent class?",
  ["Compile Error", "The child's variable 'Hides' (Shadows) the parent's variable. To access the parent's variable from within the child, you must use `super.variableName`.", "The parent variable is deleted", "The program crashes at runtime"],
  "The child's variable 'Hides' (Shadows) the parent's variable. To access the parent's variable from within the child, you must use `super.variableName`.",
  "Note: Variables DO NOT override polymorphically like methods do. They only shadow."
),
Q("POSSIBLE QNS","MEDIUM",
  "What does the `instanceof` keyword return if you test it against a `null` variable? (e.g., `null instanceof String`)",
  ["true", "false", "NullPointerException", "Compile Error"],
  "false",
  "It is perfectly safe to use `instanceof` on a null reference. It will simply return false without crashing."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is 'Upcasting' and 'Downcasting'?",
  ["Moving code up and down in a file", "Upcasting is casting a child object to a parent reference (safe, automatic). Downcasting is casting a parent reference back to a child type (risky, requires explicit cast `(Child) obj` and can throw ClassCastException).", "Sorting arrays up and down", "Networking terms"],
  "Upcasting is casting a child object to a parent reference (safe, automatic). Downcasting is casting a parent reference back to a child type (risky, requires explicit cast `(Child) obj` and can throw ClassCastException).",
  "Always use `instanceof` before attempting a Downcast to ensure safety."
),
Q("POSSIBLE QNS","HARD",
  "What is a 'Memory Leak' in Java?",
  ["When a variable is null", "When objects are no longer needed by the application but are still being referenced (e.g., stored in a static List). Because the reference exists, the Garbage Collector cannot delete them, eventually causing an OutOfMemoryError.", "A bug in the OS RAM", "When code runs too fast"],
  "When objects are no longer needed by the application but are still being referenced (e.g., stored in a static List). Because the reference exists, the Garbage Collector cannot delete them, eventually causing an OutOfMemoryError.",
  "Static Collections are the #1 cause of memory leaks in enterprise Java."
),
Q("POSSIBLE QNS","HARD",
  "What does `Runtime.getRuntime().availableProcessors()` do?",
  ["Closes the JVM", "Returns the number of logical CPU cores available to the JVM, heavily used to dynamically configure the size of Thread Pools (like ForkJoinPool) for maximum parallel performance.", "Returns the RAM size", "Returns the JVM version"],
  "Returns the number of logical CPU cores available to the JVM, heavily used to dynamically configure the size of Thread Pools (like ForkJoinPool) for maximum parallel performance.",
  "If you have an 8-core CPU, creating a thread pool with 100 threads for CPU-intensive tasks is actually counterproductive due to context-switching."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Which component of the JVM physically deletes unused objects from the Heap memory?",
  ["The Compiler", "The Garbage Collector (GC)", "The JIT Compiler", "The ClassLoader"],
  "The Garbage Collector (GC)",
  "The GC runs automatically in the background as a daemon thread, searching for objects that no longer have any active references pointing to them."
),
Q("UE","EASY",
  "What is a 'Thread' in Java?",
  ["A UI component", "A lightweight, independent path of execution within a program. Java allows multiple threads to run simultaneously (Multithreading) to perform background tasks.", "A type of string", "A networking socket"],
  "A lightweight, independent path of execution within a program. Java allows multiple threads to run simultaneously (Multithreading) to perform background tasks.",
  "Threads share the same Heap memory but have their own separate Stack memory."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the 'synchronized' keyword used for?",
  ["To download data from the internet", "To prevent Thread Interference (Race Conditions). It locks a method or block of code so that only ONE thread can execute it at a time on a given object.", "To format strings", "To encrypt a file"],
  "To prevent Thread Interference (Race Conditions). It locks a method or block of code so that only ONE thread can execute it at a time on a given object.",
  "While highly secure, overusing `synchronized` creates massive performance bottlenecks because threads are forced to wait in line."
),
Q("UE","MEDIUM",
  "What is the difference between `Comparable` and `Comparator`?",
  ["They are the same", "`Comparable` is implemented inside the class itself (Natural Ordering, 1 sorting logic). `Comparator` is implemented in a separate external class, allowing you to create multiple different ways to sort the same object (e.g., Sort by Name, Sort by Age).", "Comparable is for numbers, Comparator for strings", "Comparable is faster"],
  "`Comparable` is implemented inside the class itself (Natural Ordering, 1 sorting logic). `Comparator` is implemented in a separate external class, allowing you to create multiple different ways to sort the same object (e.g., Sort by Name, Sort by Age).",
  "You pass a `Comparator` as a second argument: `Collections.sort(list, new AgeComparator());`."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What is a 'Lambda Expression' (Java 8+)?",
  ["A way to declare variables", "A short, concise block of code that takes in parameters and returns a value. It is used primarily to implement the single method of a Functional Interface on the fly (e.g., `(x, y) -> x + y;`).", "A database query", "A math formula for GUI"],
  "A short, concise block of code that takes in parameters and returns a value. It is used primarily to implement the single method of a Functional Interface on the fly (e.g., `(x, y) -> x + y;`).",
  "Lambdas drastically reduce boilerplate code, completely replacing the need for bulky Anonymous Inner Classes in most scenarios."
),
Q("UE","HARD",
  "What is the 'Stream API' (Java 8+)?",
  ["A way to stream Netflix video", "A modern, functional-style sequence of elements supporting sequential and parallel aggregate operations (like filter, map, reduce) applied to Collections. It does NOT store data itself.", "A file reading API", "A networking API"],
  "A modern, functional-style sequence of elements supporting sequential and parallel aggregate operations (like filter, map, reduce) applied to Collections. It does NOT store data itself.",
  "E.g., `list.stream().filter(x -> x > 10).map(String::valueOf).collect(Collectors.toList());` allows you to process data in a highly readable, declarative pipeline."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new GENERAL EXPERT (Part 4) questions!`);

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
