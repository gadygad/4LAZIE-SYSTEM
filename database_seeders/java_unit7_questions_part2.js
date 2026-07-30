/**
 * JAVA UNIT 7 - ADVANCED CORE & TRICKY CONCEPTS - HANDCRAFTED QUESTIONS (PART 2)
 * Based on: Unit 7 (Pass-by-Value, Reflection, Memory, Inner Classes, Diamond Problem)
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
  "Is Java Pass-by-Value or Pass-by-Reference?",
  ["Pass-by-Reference only", "Pass-by-Value only", "Pass-by-Value for primitives, Pass-by-Reference for Objects", "Neither"],
  "Pass-by-Value only",
  "This is a massive misconception. Java is ALWAYS strictly pass-by-value. When passing an object to a method, Java passes the VALUE of the REFERENCE (the memory address) by copy. It does not pass the actual object by reference."
),
Q("QUIZ","EASY",
  "What is the Java Reflection API used for?",
  ["To reflect light in graphics", "To examine or modify the runtime behavior of applications running in the Java Virtual Machine, such as inspecting classes, interfaces, fields, and methods at runtime without knowing their names at compile time", "To copy an object perfectly", "To communicate with a database"],
  "To examine or modify the runtime behavior of applications running in the Java Virtual Machine, such as inspecting classes, interfaces, fields, and methods at runtime without knowing their names at compile time",
  "Reflection (`java.lang.reflect`) allows a Java program to 'look inside itself'."
),
Q("QUIZ","EASY",
  "Which memory area in Java stores local variables and method call data?",
  ["The Heap", "The Stack", "The Metaspace", "The String Pool"],
  "The Stack",
  "The Stack memory is specific to a thread and operates on a LIFO basis for method frames and local primitive variables."
),
Q("QUIZ","EASY",
  "Where are all Objects (instantiated via `new`) stored in Java memory?",
  ["The Stack", "The Metaspace", "The Heap", "The CPU Cache"],
  "The Heap",
  "All objects, including their instance variables, are allocated on the Heap memory area, which is shared among all threads."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "Trace the code (Pass-by-Value concept):\n<pre><code>void change(int x) { x = 10; }\nint a = 5;\nchange(a);\nSystem.out.print(a);</code></pre>",
  ["10", "5", "Compile Error", "Exception"],
  "5",
  "Because primitive variables are passed by value, the `change()` method gets a copy of `a`. Modifying `x` does not affect `a`."
),
Q("QUIZ","MEDIUM",
  "What is an Anonymous Inner Class?",
  ["A class with no methods", "An inner class declared without a name, used to instantiate objects that require slight modifications (like overriding a method of an interface or superclass) on the fly", "A class that hides its variables", "A class that cannot be compiled"],
  "An inner class declared without a name, used to instantiate objects that require slight modifications (like overriding a method of an interface or superclass) on the fly",
  "E.g., `Runnable r = new Runnable() { public void run() { ... } };`"
),
Q("QUIZ","MEDIUM",
  "What happens if you use Reflection to access a `private` field of a class?",
  ["It throws an AccessDeniedException", "It works perfectly, but only if you call `field.setAccessible(true)` first, breaking the normal OOP encapsulation rules", "It crashes the JVM", "It returns null"],
  "It works perfectly, but only if you call `field.setAccessible(true)` first, breaking the normal OOP encapsulation rules",
  "Reflection is extremely powerful and is used heavily by frameworks (like Spring/Hibernate) to inject data into private fields without needing setter methods."
),
Q("QUIZ","MEDIUM",
  "What is the 'Metaspace' (formerly PermGen) in Java memory?",
  ["A space for storing temporary network packets", "A native memory region used by the JVM to store class metadata, static variables, and method bytecode", "A space for storing user files", "A space for the Stack"],
  "A native memory region used by the JVM to store class metadata, static variables, and method bytecode",
  "In Java 8, PermGen was removed and replaced with Metaspace, which automatically grows outside the main Heap using the OS's native memory."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "Trace the code (Pass Object Reference by Value):\n<pre><code>void change(StringBuilder sb) {\n    sb.append(\"B\");\n    sb = new StringBuilder(\"C\");\n}\nStringBuilder str = new StringBuilder(\"A\");\nchange(str);\nSystem.out.println(str);</code></pre>",
  ["A", "AB", "C", "ABC"],
  "AB",
  "A copy of the reference is passed. `sb.append(\"B\")` modifies the original object in the heap to \"AB\". But `sb = new StringBuilder(\"C\")` only changes the local copy of the reference to point to a new object, leaving the original `str` as \"AB\"."
),
Q("QUIZ","HARD",
  "Can an interface contain a `private` method?",
  ["No, all methods in an interface must be public", "No, interfaces can only have abstract methods", "Yes, starting in Java 9, interfaces can contain private methods to share common code between default methods without exposing it to the outside", "Yes, but only in Java 1.4"],
  "Yes, starting in Java 9, interfaces can contain private methods to share common code between default methods without exposing it to the outside",
  "This was added to prevent code duplication inside the interface itself when multiple `default` methods need to do the same internal processing."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "What is the purpose of a Static Nested Class?",
  ["To run multiple threads", "To logically group classes that are only used in one place, keeping them tightly coupled to their outer class without requiring an instance of the outer class to be created", "To hide variables", "To speed up compilation"],
  "To logically group classes that are only used in one place, keeping them tightly coupled to their outer class without requiring an instance of the outer class to be created",
  "Unlike a non-static inner class, a static nested class cannot access non-static members of the outer class."
),
Q("EXERCISE","EASY",
  "Which keyword is used to access the parent class's constructor from a child class?",
  ["this()", "parent()", "super()", "base()"],
  "super()",
  "`super()` must be the very first statement in the child constructor."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What does `Class.forName(\"MyClass\").newInstance()` do? (Prior to Java 9)",
  ["It deletes MyClass", "It compiles MyClass", "It uses Reflection to dynamically load the class at runtime and creates a new instance of it using its default (no-argument) constructor", "It creates a clone"],
  "It uses Reflection to dynamically load the class at runtime and creates a new instance of it using its default (no-argument) constructor",
  "This is heavily used in older JDBC code and framework dependency injection. In modern Java, `getDeclaredConstructor().newInstance()` is preferred."
),
Q("EXERCISE","MEDIUM",
  "What is a Memory Leak in Java if the Garbage Collector handles memory automatically?",
  ["A hardware defect in RAM", "When objects are no longer needed by the program but are accidentally kept alive by active references (e.g., in a static List), preventing the GC from cleaning them up", "When the GC deletes an object that is still in use", "A bug in the JVM"],
  "When objects are no longer needed by the program but are accidentally kept alive by active references (e.g., in a static List), preventing the GC from cleaning them up",
  "Automatic GC doesn't mean you don't have to think about memory. You must clear out old references (e.g., `list.remove()`) or the heap will fill up."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the 'Diamond Problem' in object-oriented programming?",
  ["A problem encrypting passwords", "An ambiguity that arises when a class inherits from two superclasses that have a method with the exact same signature (which is why Java blocks multiple inheritance of classes)", "A bug in the GUI layout", "A garbage collection algorithm"],
  "An ambiguity that arises when a class inherits from two superclasses that have a method with the exact same signature (which is why Java blocks multiple inheritance of classes)",
  "If Class D inherits from B and C, and both B and C implement a `print()` method inherited from A, which `print()` should D use? Java avoids this by forcing you to use Interfaces."
),
Q("EXERCISE","HARD",
  "If a child class shadows a parent's variable (`int x = 10` in parent, `int x = 20` in child), and you do `Parent p = new Child(); System.out.print(p.x);`, what prints?",
  ["20", "10", "Compile Error", "Runtime Exception"],
  "10",
  "Variables DO NOT override in Java; they shadow. When accessed through a Parent reference, the Parent's variable is accessed. Polymorphism (overriding) ONLY applies to instance methods, not variables."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which object class has a method `getClass()` that allows you to get the Class metadata object at runtime?",
  ["String", "Thread", "java.lang.Object", "Class"],
  "java.lang.Object",
  "Because every object inherits from `Object`, you can call `.getClass()` on literally any object in Java."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "Can you write `int x = null;` in Java?",
  ["Yes, null can be assigned to primitives", "No, primitives cannot be null. You must use the wrapper class `Integer x = null;`", "Yes, it defaults to 0", "Only in strictfp methods"],
  "No, primitives cannot be null. You must use the wrapper class `Integer x = null;`",
  "`null` is a reference literal. Since primitives (int, double, boolean) are not objects/references, they cannot point to null."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "How can you invoke a private method dynamically using Reflection?",
  ["You cannot invoke private methods", "method.setAccessible(true); method.invoke(objectInstance);", "Class.invokePrivate(methodName)", "objectInstance.invoke(methodName)"],
  "method.setAccessible(true); method.invoke(objectInstance);",
  "After getting the `Method` object via `getDeclaredMethod()`, you must bypass the security check with `setAccessible(true)` before calling `invoke()`."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "What is the difference between `Math.random()` and the `java.util.Random` class?",
  ["There is no difference", "`Math.random()` generates only doubles between 0.0 and 1.0. The `Random` class provides methods to easily generate random ints, booleans, and floats within specific ranges.", "`Random` is for security, `Math.random()` is not", "Both do not exist"],
  "`Math.random()` generates only doubles between 0.0 and 1.0. The `Random` class provides methods to easily generate random ints, booleans, and floats within specific ranges.",
  "Under the hood, `Math.random()` actually just creates a static instance of `java.util.Random` and calls `nextDouble()`."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is the `finalize()` method?",
  ["It finalizes a variable so it cannot be changed", "It is a deprecated method in `java.lang.Object` that the Garbage Collector calls just before destroying an object, allowing it to clean up resources", "It forces the program to close", "It compiles the object into bytecode"],
  "It is a deprecated method in `java.lang.Object` that the Garbage Collector calls just before destroying an object, allowing it to clean up resources",
  "It has been deprecated since Java 9 because its execution is never guaranteed by the JVM, making it highly unreliable for resource management (like closing files). Try-with-resources is the modern standard."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "Trace the static block execution:\n<pre><code>class A { static { System.out.print(\"A\"); } }\nclass B extends A { static { System.out.print(\"B\"); } }\npublic class Test { public static void main(String[] args) { new B(); } }</code></pre>",
  ["B", "A", "AB", "BA"],
  "AB",
  "Static blocks are executed exactly once when the class is loaded into memory by the ClassLoader. When `new B()` is called, the JVM must first load the parent class `A`, running its static block ('A'), and then load `B`, running its block ('B')."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "What does the `instanceof` operator do?",
  ["It creates a new instance of an object", "It tests whether an object reference is an instance of a specific class or interface type (returning a boolean)", "It deletes an instance", "It copies an instance"],
  "It tests whether an object reference is an instance of a specific class or interface type (returning a boolean)",
  "E.g., `if (animal instanceof Dog)` prevents a `ClassCastException` when you attempt to cast the `animal` variable down to a `Dog`."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is 'Type Erasure' in Java Generics?",
  ["Deleting all text from a file", "The process where the compiler removes all generic type information (like `<String>`) during compilation, replacing them with `Object` (or bounds) to maintain backward compatibility with older Java versions", "A garbage collection phase", "Erasing errors from the log"],
  "The process where the compiler removes all generic type information (like `<String>`) during compilation, replacing them with `Object` (or bounds) to maintain backward compatibility with older Java versions",
  "This is why you cannot do `if (list instanceof ArrayList<String>)` at runtime; the `<String>` part is already erased by the JVM."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What is the difference between `System.out.println` and `System.err.println`?",
  ["No difference", "`out` is for standard output (usually white/black text). `err` is for standard error output, which IDEs usually print in red, and can be redirected separately in the OS terminal.", "`err` crashes the program", "`err` writes to a database"],
  "`out` is for standard output (usually white/black text). `err` is for standard error output, which IDEs usually print in red, and can be redirected separately in the OS terminal.",
  "In a bash terminal, `out` is stdout (descriptor 1) and `err` is stderr (descriptor 2). This allows developers to log regular data to a file, while keeping error messages visible on the screen."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 7 (Part 2) questions!`);

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
