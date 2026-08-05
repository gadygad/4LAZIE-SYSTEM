/**
 * JAVA GRAND FINALE - ARCHITECTURE & DESIGN PATTERNS - HANDCRAFTED QUESTIONS (PART 3)
 * Based on: Design Patterns, SOLID Principles, Best Practices, Tricky Output
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
  "What is a Design Pattern in Software Engineering?",
  ["A way to design user interfaces", "A general, reusable solution to a commonly occurring problem within a given context in software design", "A specific block of code", "A database schema"],
  "A general, reusable solution to a commonly occurring problem within a given context in software design",
  "Design patterns are not finished code, but templates/blueprints (like Singleton or Factory) for solving common architectural problems."
),
Q("QUIZ","EASY",
  "Which design pattern restricts the instantiation of a class to ONE single instance across the entire Java Virtual Machine?",
  ["Factory Pattern", "Observer Pattern", "Singleton Pattern", "Decorator Pattern"],
  "Singleton Pattern",
  "Singleton is used for things like a single Database Connection Pool or a Logger, where creating multiple objects would cause issues."
),
Q("QUIZ","EASY",
  "What does the 'S' in SOLID principles stand for?",
  ["Static Typing Principle", "Single Responsibility Principle", "System Design Principle", "Standard Logic Principle"],
  "Single Responsibility Principle",
  "A class should have one, and only one, reason to change. It should only do one specific job."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "How do you typically implement a Singleton class in Java?",
  ["By making the class abstract", "By making the constructor `private`, creating a `private static` instance variable, and providing a `public static` getter method", "By using the `@Singleton` annotation", "By using an interface"],
  "By making the constructor `private`, creating a `private static` instance variable, and providing a `public static` getter method",
  "A private constructor prevents `new Singleton()` from being called anywhere outside the class."
),
Q("QUIZ","MEDIUM",
  "What is the Factory Method Pattern?",
  ["A pattern that deletes objects", "A creational pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created", "A pattern for multithreading", "A UI pattern"],
  "A creational pattern that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created",
  "Instead of calling `new Dog()`, you call `AnimalFactory.getAnimal(\"dog\")`, which hides the complex creation logic from the user."
),
Q("QUIZ","MEDIUM",
  "What is the Observer Pattern?",
  ["A pattern where a class observes the database", "A behavioral pattern where an object (Subject) maintains a list of its dependents (Observers) and notifies them automatically of any state changes, usually by calling one of their methods", "A pattern for encrypting data", "A testing pattern"],
  "A behavioral pattern where an object (Subject) maintains a list of its dependents (Observers) and notifies them automatically of any state changes, usually by calling one of their methods",
  "This is the core pattern behind all GUI Event Listeners (like `ActionListener`) in Java."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "In a multithreaded environment, what is the 'Double-Checked Locking' idiom used for?",
  ["To lock a database twice", "To safely implement a lazy-initialized Singleton by checking if the instance is null, synchronizing the block, and then checking if it is null AGAIN before creating it", "To prevent exceptions", "To lock the GUI thread"],
  "To safely implement a lazy-initialized Singleton by checking if the instance is null, synchronizing the block, and then checking if it is null AGAIN before creating it",
  "This reduces the massive performance overhead of putting the `synchronized` keyword on the entire getter method."
),
Q("QUIZ","HARD",
  "What does the 'O' in SOLID principles (Open-Closed Principle) mean?",
  ["Software entities should be open to all users but closed to hackers", "Software entities should be open for EXTENSION, but closed for MODIFICATION", "Files should be opened and then closed immediately", "Classes should be open but interfaces closed"],
  "Software entities should be open for EXTENSION, but closed for MODIFICATION",
  "You should be able to add new functionality (e.g., via inheritance or interfaces) without touching and potentially breaking the existing, tested code."
),
Q("QUIZ","HARD",
  "What does the `strictfp` keyword do?",
  ["It makes the code run in strict mode", "It ensures that floating-point calculations are exactly the same across all hardware platforms (resolving precision differences between 32-bit and 64-bit processors)", "It strictly checks variables for null", "It is deprecated"],
  "It ensures that floating-point calculations are exactly the same across all hardware platforms (resolving precision differences between 32-bit and 64-bit processors)",
  "Note: Since Java 17, `strictfp` is redundant because all floating-point expressions are strictly evaluated by default."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Can you have a constructor in an abstract class?",
  ["No, abstract classes cannot be instantiated", "Yes, it is used to initialize the variables of the abstract class when a concrete subclass is instantiated", "Yes, but it must be abstract as well", "Only in Java 8+"],
  "Yes, it is used to initialize the variables of the abstract class when a concrete subclass is instantiated",
  "Even though you can't do `new AbstractClass()`, when you do `new SubClass()`, the subclass constructor MUST call `super()` to trigger the abstract parent's constructor."
),
Q("EXERCISE","EASY",
  "What is the default value of a `boolean` instance variable in Java?",
  ["true", "false", "null", "0"],
  "false",
  "All object references default to `null`, numbers default to `0`, and booleans default to `false`."
),
Q("EXERCISE","EASY",
  "Which symbol represents the bitwise XOR operator in Java?",
  ["~", "|", "^", "&"],
  "^",
  "The `^` operator compares two binary digits and returns 1 if they are different, and 0 if they are the same."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is a Marker Interface in Java?",
  ["An interface with multiple methods used for marking data", "An interface with exactly NO methods and NO fields, used only to indicate (mark) to the JVM or compiler that the implementing class has a special property (e.g., `Serializable` or `Cloneable`)", "An interface used in GUI maps", "A deprecated feature"],
  "An interface with exactly NO methods and NO fields, used only to indicate (mark) to the JVM or compiler that the implementing class has a special property (e.g., `Serializable` or `Cloneable`)",
  "It is simply a tag. E.g., `public interface Serializable { }`."
),
Q("EXERCISE","MEDIUM",
  "Trace the output:\n<pre><code>int x = 5;\nSystem.out.println(x++ + ++x);</code></pre>",
  ["10", "11", "12", "13"],
  "12",
  "`x++` uses 5 then increments `x` to 6. `++x` increments `x` to 7 then uses 7. The sum is 5 + 7 = 12."
),
Q("EXERCISE","MEDIUM",
  "What is the difference between shallow copy and deep copy?",
  ["No difference", "Shallow copy creates a new object but inserts references to the original nested objects. Deep copy creates a completely new object AND completely new copies of all nested objects.", "Deep copy is for integers, shallow copy for strings", "Shallow copy deletes the original"],
  "Shallow copy creates a new object but inserts references to the original nested objects. Deep copy creates a completely new object AND completely new copies of all nested objects.",
  "Using `clone()` in Java provides a shallow copy by default."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the 'Liskov Substitution Principle' (The L in SOLID)?",
  ["Objects of a superclass shall be replaceable with objects of its subclasses without breaking the application", "Classes should have single responsibilities", "Interfaces must be small", "Dependencies should be injected"],
  "Objects of a superclass shall be replaceable with objects of its subclasses without breaking the application",
  "If your program expects a `Bird`, and you pass it a `Penguin` (which inherits from Bird), the program shouldn't crash just because `Penguin.fly()` throws an Exception."
),
Q("EXERCISE","HARD",
  "Trace the output:\n<pre><code>String s1 = new String(\"Hi\");\nString s2 = new String(\"Hi\");\nSystem.out.println(s1.hashCode() == s2.hashCode());</code></pre>",
  ["false", "true", "Compile Error", "Throws Exception"],
  "true",
  "The `String` class overrides `hashCode()` to calculate the hash based on the actual *characters* in the string, not the memory address. Since they both contain \"Hi\", their hash codes are identical."
),
Q("EXERCISE","HARD",
  "Why is it a bad idea to call an overridable (non-final) method inside a Constructor?",
  ["It throws an exception", "Because the subclass object might not be fully initialized yet, leading the overridden method to access variables that are still null or 0", "It creates an infinite loop", "It is not allowed by the compiler"],
  "Because the subclass object might not be fully initialized yet, leading the overridden method to access variables that are still null or 0",
  "If the parent constructor calls `init()`, and the child overrides `init()`, the child's `init()` runs BEFORE the child's constructor finishes setting up its own variables."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which loop executes at least once regardless of the condition?",
  ["for loop", "while loop", "do-while loop", "for-each loop"],
  "do-while loop",
  "Because the condition (`while(x < 10)`) is checked at the *end* of the block, the code inside a `do { ... }` block will always execute at least one time."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "Can you override a `static` method in Java?",
  ["Yes, completely", "No, if a subclass defines a static method with the same signature, it 'Hides' the superclass method, it does not Override it (Polymorphism does not apply)", "Yes, but only if it is public", "No, it causes a compile error"],
  "No, if a subclass defines a static method with the same signature, it 'Hides' the superclass method, it does not Override it (Polymorphism does not apply)",
  "Method overriding requires dynamic binding at runtime based on the object instance. Static methods are bound at compile time based on the reference type."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is 'Dependency Injection' (The D in SOLID: Dependency Inversion)?",
  ["A security flaw", "A design pattern where a class receives its dependencies (objects it needs) from the outside (e.g., via constructor parameters) rather than creating them internally using `new`", "A way to inject SQL", "A networking concept"],
  "A design pattern where a class receives its dependencies (objects it needs) from the outside (e.g., via constructor parameters) rather than creating them internally using `new`",
  "This makes the class much easier to test, because you can inject \"Mock\" or fake database objects instead of real ones."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "What is the use of the `continue` keyword in a loop?",
  ["It stops the entire loop", "It skips the rest of the code in the current iteration and jumps straight to the next iteration of the loop", "It exits the method", "It pauses the loop"],
  "It skips the rest of the code in the current iteration and jumps straight to the next iteration of the loop",
  "Unlike `break` (which kills the loop completely), `continue` just says 'skip this one and keep going'."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What happens if you use the `==` operator on two Wrapper class objects, e.g., `Integer a = 128; Integer b = 128;`?",
  ["It returns true", "It returns false because they are two different objects in memory", "It throws an exception", "It returns 0"],
  "It returns false because they are two different objects in memory",
  "Trick: Java caches Integers from -128 to 127. If you used `100`, `a == b` would be `true`. Because 128 is outside the cache, two separate objects are created, so `a == b` is `false`."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is Covariant Return Type in Java?",
  ["When a method returns multiple values", "The ability of an overridden method in a subclass to return a type that is a subclass of the type returned by the parent's method", "A method that returns void", "When a method returns a generic type"],
  "The ability of an overridden method in a subclass to return a type that is a subclass of the type returned by the parent's method",
  "For example, if `Parent.getObj()` returns an `Animal`, `Child.getObj()` is allowed to return a `Dog` (which IS-A Animal)."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "What is the output of `System.out.println(10 / 3);` in Java?",
  ["3.3333", "3.0", "3", "Compile error"],
  "3",
  "Because both 10 and 3 are integers, Java performs integer division, completely discarding the remainder. It does not round up."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What does the `instanceof` operator return if the variable being tested is `null`?",
  ["true", "false", "NullPointerException", "Compile Error"],
  "false",
  "If the reference is `null`, it isn't an instance of ANYTHING. `null instanceof String` safely returns `false` without crashing."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What is a 'Daemon Thread' and how does it affect JVM shutdown?",
  ["It is a virus thread", "It is a low-priority background thread. The JVM will automatically exit as soon as all User (non-daemon) threads have finished, mercilessly killing any Daemon threads that are still running.", "It prevents the JVM from shutting down", "It speeds up the JVM"],
  "It is a low-priority background thread. The JVM will automatically exit as soon as all User (non-daemon) threads have finished, mercilessly killing any Daemon threads that are still running.",
  "You set it with `thread.setDaemon(true)`. The Garbage Collector itself runs as a Daemon thread."
),
Q("UE","HARD",
  "Trace the exception flow:\n<pre><code>try {\n    throw new RuntimeException();\n} catch (Exception e) {\n    throw new NullPointerException();\n} finally {\n    throw new ArithmeticException();\n}</code></pre>",
  ["Throws RuntimeException", "Throws NullPointerException", "Throws ArithmeticException", "Program terminates normally"],
  "Throws ArithmeticException",
  "If an exception is thrown in a `finally` block, it OVERRIDES any exception that was previously thrown in the `try` or `catch` block."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new GRAND FINALE questions!`);

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
