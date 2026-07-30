/**
 * JAVA UNIT 3 - CLASSES, OBJECTS & INHERITANCE - HANDCRAFTED QUESTIONS (PART 3)
 * Based on: Unit 3 Deep Dive (Inner Classes, Aggregation, Object Methods, Covariant Returns, Interfaces)
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
  "What is 'Composition' in Object-Oriented Programming?",
  ["A way to write comments in code", "A strong 'has-a' relationship where the child object cannot exist independently of the parent object", "The process of compiling source code", "A type of inheritance where a class extends multiple classes"],
  "A strong 'has-a' relationship where the child object cannot exist independently of the parent object",
  "Composition is a strong 'has-a' relationship. For example, a House 'has-a' Room. If the House is destroyed, the Rooms are also destroyed."
),
Q("QUIZ","EASY",
  "How does 'Aggregation' differ from 'Composition'?",
  ["They are exactly the same", "Aggregation is a weak 'has-a' relationship; objects can exist independently", "Aggregation is 'is-a', Composition is 'has-a'", "Composition uses the 'implements' keyword"],
  "Aggregation is a weak 'has-a' relationship; objects can exist independently",
  "In Aggregation, if a Department 'has-a' Professor, and the Department closes, the Professor still exists independently."
),
Q("QUIZ","EASY",
  "Which method from the `Object` class is called by the Garbage Collector before an object is destroyed?",
  ["destroy()", "dispose()", "finalize()", "kill()"],
  "finalize()",
  "The `finalize()` method is called by the Garbage Collector just before the object's memory is reclaimed. (Note: It is deprecated in modern Java, but still an important historical concept)."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is a 'Covariant Return Type' in Java?",
  ["Returning a negative integer", "When an overridden method in a subclass returns a subtype of the return type declared in the superclass method", "When a method returns multiple values", "Returning void from a method that previously returned an int"],
  "When an overridden method in a subclass returns a subtype of the return type declared in the superclass method",
  "Since Java 5, if a parent method returns `Animal`, the overridden method in the child class can return `Dog`. This is perfectly legal and is called a Covariant Return Type."
),
Q("QUIZ","MEDIUM",
  "Analyze this code:\n<pre><code>class Outer {\n    class Inner {\n        void display() { System.out.println(\"Inner\"); }\n    }\n}</code></pre>\nHow do you instantiate the `Inner` class from another class?",
  ["Outer.Inner obj = new Outer.Inner();", "Outer.Inner obj = new Outer().new Inner();", "Inner obj = new Inner();", "Outer.Inner obj = new Inner();"],
  "Outer.Inner obj = new Outer().new Inner();",
  "A non-static inner class is associated with an INSTANCE of its outer class. You must create an object of the Outer class first, then use it to create the Inner class object."
),
Q("QUIZ","MEDIUM",
  "What does the `getClass()` method do?",
  ["It returns the current package name", "It returns the runtime class of an object", "It creates a new class", "It returns the name of the file"],
  "It returns the runtime class of an object",
  "`getClass()` is a final method in the `Object` class that returns the actual runtime `Class` metadata object representing the type of the object."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is the output?\n<pre><code>class P { int x = 10; }\nclass C extends P {\n    int x = 20;\n    void print() {\n        System.out.println(x + \" \" + super.x);\n    }\n}\nnew C().print();</code></pre>",
  ["20 10", "10 20", "20 20", "Compile Error"],
  "20 10",
  "In the child class, `x` refers to the child's hidden variable (20). `super.x` explicitly tells Java to access the parent's version of the variable (10)."
),
Q("QUIZ","HARD",
  "Can you override a `private` method in Java?",
  ["Yes, but only if the subclass is in the same package", "Yes, just like public methods", "No, because private methods are not inherited and are invisible to the subclass", "No, unless you use the 'super' keyword"],
  "No, because private methods are not inherited and are invisible to the subclass",
  "Overriding requires inheritance. Since private methods are not inherited, any method in the subclass with the same name is considered a brand new method, not an override."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which interface MUST a class implement to allow its objects to be copied using the `clone()` method?",
  ["Serializable", "Copyable", "Cloneable", "Comparable"],
  "Cloneable",
  "A class must implement the `Cloneable` marker interface. If it doesn't, calling `clone()` will throw a `CloneNotSupportedException`."
),
Q("EXERCISE","EASY",
  "What does the `import` statement do in Java?",
  ["It copies all the code from another file into your file", "It allows you to use classes from other packages without typing their fully qualified name (e.g. `java.util.Scanner`)", "It inherits properties from another class", "It adds new keywords to the Java language"],
  "It allows you to use classes from other packages without typing their fully qualified name (e.g. `java.util.Scanner`)",
  "Importing simply tells the compiler where to find the classes you reference. It does not bloat your compiled `.class` file."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "Trace the output:\n<pre><code>class Animal { Animal() { System.out.print(\"Animal \"); } }\nclass Dog extends Animal { Dog() { System.out.print(\"Dog \"); } }\nclass Puppy extends Dog { Puppy() { System.out.print(\"Puppy \"); } }\nnew Puppy();</code></pre>",
  ["Puppy Dog Animal", "Puppy", "Animal Dog Puppy", "Error"],
  "Animal Dog Puppy",
  "Constructor chaining goes all the way up to the highest parent (Object -> Animal -> Dog -> Puppy). So the highest parent constructor finishes first, then the next, downwards."
),
Q("EXERCISE","MEDIUM",
  "What is a 'Static Nested Class'?",
  ["An inner class that cannot have methods", "A class defined within another class that is marked static and can be instantiated without an instance of the outer class", "A class that can only be used once", "A class that extends multiple classes"],
  "A class defined within another class that is marked static and can be instantiated without an instance of the outer class",
  "Unlike regular inner classes, a static nested class doesn't need an outer class object. E.g., `Outer.Nested obj = new Outer.Nested();`"
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the output of this covariant return type code?\n<pre><code>class P {\n    Object get() { return \"Parent\"; }\n}\nclass C extends P {\n    String get() { return \"Child\"; }\n}\nP obj = new C();\nSystem.out.println(obj.get());</code></pre>",
  ["Parent", "Child", "Compile Error", "Runtime Exception"],
  "Child",
  "Because `String` is a subclass of `Object`, `get()` is a valid override (Covariant Return Type). Runtime polymorphism executes the Child's method."
),
Q("EXERCISE","HARD",
  "What is an 'Anonymous Inner Class'?",
  ["A class with no variables", "A class that doesn't extend Object", "A local inner class without a name, created and instantiated in a single expression", "A private static class"],
  "A local inner class without a name, created and instantiated in a single expression",
  "Used frequently for one-off interface implementations or class extensions. E.g., `Thread t = new Thread(new Runnable() { public void run() { ... } });`"
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "What is the main difference between an Abstract Class and an Interface (prior to Java 8)?",
  ["Abstract classes can have both abstract and non-abstract methods; Interfaces can ONLY have abstract methods", "Interfaces can have constructors; Abstract classes cannot", "They are exactly the same", "You can instantiate an Interface, but not an Abstract Class"],
  "Abstract classes can have both abstract and non-abstract methods; Interfaces can ONLY have abstract methods",
  "Abstract classes provide partial implementation. Interfaces provide a 100% abstract contract (pure abstraction)."
),
Q("CAT 1","EASY",
  "Which keyword is used to call a method from the parent class when it has been overridden in the child class?",
  ["this", "super", "parent", "base"],
  "super",
  "`super.methodName()` allows a child class to reuse the logic of the parent's overridden method."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "What happens if two interfaces have the exact same default method signature, and a class implements both interfaces?",
  ["The code compiles and randomly chooses one", "The code throws a compile-time error due to the Diamond Problem", "The JVM crashes at runtime", "The class inherits the method from the first interface listed"],
  "The code throws a compile-time error due to the Diamond Problem",
  "Because of the ambiguity (Diamond Problem), the compiler forces the class to explicitly override the method and resolve the conflict itself."
),
Q("CAT 1","MEDIUM",
  "What is the output?\n<pre><code>class A {\n    A() { this(5); System.out.print(\"1\"); }\n    A(int x) { System.out.print(\"2\"); }\n}\nnew A();</code></pre>",
  ["12", "21", "1", "2"],
  "21",
  "`new A()` calls the no-arg constructor. It immediately calls `this(5)`, jumping to the parameterized constructor. It prints '2', finishes, returns to the first constructor, and prints '1'."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "Analyze this code:\n<pre><code>class Engine {}\nclass Car {\n    Engine engine;\n    Car(Engine e) { this.engine = e; }\n}</code></pre>\nWhat type of relationship is this?",
  ["Inheritance (IS-A)", "Aggregation (Weak HAS-A)", "Composition (Strong HAS-A)", "Encapsulation"],
  "Aggregation (Weak HAS-A)",
  "Because the `Engine` is created OUTSIDE the `Car` and passed via the constructor (Dependency Injection), if the `Car` is destroyed, the `Engine` still exists. This is a weak 'HAS-A' relationship (Aggregation)."
),
Q("CAT 1","HARD",
  "Analyze this code:\n<pre><code>class Heart {}\nclass Human {\n    Heart heart = new Heart();\n}</code></pre>\nWhat type of relationship is this?",
  ["Inheritance (IS-A)", "Aggregation (Weak HAS-A)", "Composition (Strong HAS-A)", "Polymorphism"],
  "Composition (Strong HAS-A)",
  "Because the `Heart` is created strictly INSIDE the `Human`, if the `Human` object is destroyed (garbage collected), the `Heart` object is also destroyed. This is a strong 'HAS-A' relationship (Composition)."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "Can you write a Java program without any classes?",
  ["Yes, Java supports standalone functions", "Yes, using scripts", "No, everything in Java must be inside a class", "Only in Java 9+"],
  "No, everything in Java must be inside a class",
  "Java is heavily object-oriented. Even the `main` entry point must be encapsulated inside a class."
),
Q("POSSIBLE QNS","EASY",
  "Which operator is used to create an object?",
  ["==", "+", "new", "->"],
  "new",
  "The `new` operator dynamically allocates memory for an object and returns a reference to it."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is a 'Local Inner Class'?",
  ["A class defined inside a method body", "A class that doesn't require importing", "A class restricted to local network access", "A subclass within the same package"],
  "A class defined inside a method body",
  "You can define a class completely inside a method (e.g. `public void run() { class Local { ... } }`). Its scope is strictly limited to that method block."
),
Q("POSSIBLE QNS","MEDIUM",
  "What does `import java.util.*;` do?",
  ["Imports all classes from all Java packages", "Imports all classes inside the `java.util` package, making them available without typing their full names", "Copies the entire Java standard library into your file, making it very large", "It is illegal syntax"],
  "Imports all classes inside the `java.util` package, making them available without typing their full names",
  "The `*` wildcard imports all classes in that specific directory/package. It does NOT import sub-packages (e.g., `java.util.concurrent` is not imported)."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "Why is multiple inheritance of classes restricted in Java but multiple inheritance of interfaces allowed?",
  ["Because interfaces compile faster", "Because interfaces (prior to Java 8) had no method implementations, there is no ambiguity (Diamond Problem) about which method body to inherit", "Because classes take up too much memory", "Because interfaces are final"],
  "Because interfaces (prior to Java 8) had no method implementations, there is no ambiguity (Diamond Problem) about which method body to inherit",
  "If two classes provide the same method body, a child class inheriting both wouldn't know which to execute. Since pure interfaces have no bodies, the child simply provides one implementation for both."
),
Q("POSSIBLE QNS","HARD",
  "What is the output?\n<pre><code>interface A { int x = 10; }\nclass B implements A {\n    public static void main(String[] args) {\n        x = 20;\n        System.out.println(x);\n    }\n}</code></pre>",
  ["20", "10", "Compile Error: Cannot assign a value to final variable 'x'", "Runtime Error"],
  "Compile Error: Cannot assign a value to final variable 'x'",
  "Any variable declared inside an Interface is implicitly `public static final` (a true constant). You cannot reassign it."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "What is a Marker Interface in Java?",
  ["An interface used for drawing markers", "An empty interface (no methods, no fields) used to signal to the JVM that a class possesses some special property", "An interface that marks errors", "An interface with only default methods"],
  "An empty interface (no methods, no fields) used to signal to the JVM that a class possesses some special property",
  "Examples include `Serializable` and `Cloneable`. By implementing them, you 'mark' your class so the JVM handles it in a special way."
),
Q("UE","EASY",
  "True or False: A constructor can be marked as `final`.",
  ["True", "False", "Only in abstract classes", "Only if it takes no arguments"],
  "False",
  "Constructors are never inherited, so the concept of preventing a constructor from being 'overridden' (which is what `final` does for methods) doesn't make sense. The compiler will reject a final constructor."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "Explain the difference between early binding and late binding.",
  ["Early binding happens at compile-time (e.g., method overloading, static methods). Late binding happens at run-time (e.g., method overriding)", "They are the same thing", "Early binding is for variables, late binding is for methods", "Early binding is for Java, late binding is for Python"],
  "Early binding happens at compile-time (e.g., method overloading, static methods). Late binding happens at run-time (e.g., method overriding)",
  "Early binding: The compiler knows exactly which method to call. Late binding (Dynamic Dispatch): The JVM waits until runtime to see the actual object type to decide which overridden method to call."
),
Q("UE","MEDIUM",
  "What happens if you throw an exception from inside a static initialization block?",
  ["The code continues normally", "It throws an ExceptionInInitializerError and the class fails to load", "The block is skipped", "The compiler issues a warning"],
  "It throws an ExceptionInInitializerError and the class fails to load",
  "If a static block fails (e.g., division by zero, null pointer), the JVM wraps it in an `ExceptionInInitializerError`. The class cannot be used."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "Analyze this tricky code:\n<pre><code>class A { }\nclass B extends A { }\nclass C extends B { }\n\nB obj = new C();\nSystem.out.println(obj instanceof A);</code></pre>",
  ["false", "true", "Compile Error", "Runtime Exception"],
  "true",
  "`obj` actually holds an instance of `C`. `C` extends `B`, which extends `A`. So a `C` is also an `A`. The `instanceof` operator checks the actual object type, returning `true`."
),
Q("UE","HARD",
  "What is the output?\n<pre><code>class Test {\n    Test() { System.out.print(\"Default \"); }\n    Test(int x) {\n        this();\n        System.out.print(\"Param \");\n    }\n    {\n        System.out.print(\"Init \");\n    }\n}\nnew Test(10);</code></pre>",
  ["Init Default Param", "Default Param Init", "Init Param Default", "Param Default Init"],
  "Init Default Param",
  "Instance initialization blocks (Init) run BEFORE the body of any constructor executes. Then `this()` calls the default constructor (Default), and finally the parameterized constructor body finishes (Param)."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 3 (Part 3) questions!`);

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
