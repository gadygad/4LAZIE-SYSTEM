/**
 * JAVA UNIT 3 - CLASSES, OBJECTS & INHERITANCE - HANDCRAFTED QUESTIONS (PART 2)
 * Based on: Unit 3 Deep Dive (Constructors, Static, Final, Upcasting/Downcasting, Initialization)
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
  "Which block of code is executed FIRST when a class is loaded into memory by the JVM?",
  ["Constructor", "Main method", "Static initialization block", "Instance initialization block"],
  "Static initialization block",
  "Static blocks (`static { ... }`) are executed exactly once when the class is first loaded into memory, before any objects are created or constructors are called."
),
Q("QUIZ","EASY",
  "What does the 'final' keyword do when applied to a method?",
  ["It forces subclasses to override the method", "It prevents the method from being overridden by any subclass", "It makes the method accessible only within the same package", "It makes the method execute faster"],
  "It prevents the method from being overridden by any subclass",
  "A final method cannot be overridden. This is useful for securing core logic that subclasses shouldn't be allowed to change."
),
Q("QUIZ","EASY",
  "What is an Anonymous Object in Java?",
  ["An object that does not belong to any class", "An object created without assigning it to a reference variable", "An object with private access", "An object that has been garbage collected"],
  "An object created without assigning it to a reference variable",
  "Example: `new Person().walk();`. The object is created, used immediately for one method call, and then becomes eligible for garbage collection because it has no reference name."
),
Q("QUIZ","EASY",
  "What is the output of `System.out.println(new Object());`?",
  ["null", "Object", "A string like java.lang.Object@15db9742", "Throws an error"],
  "A string like java.lang.Object@15db9742",
  "By default, the `toString()` method of the Object class returns the class name followed by the '@' symbol and the object's hashcode."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is 'Upcasting' in Java?",
  ["Converting a primitive type to a wrapper class", "Casting a superclass reference to a subclass type", "Casting a subclass reference to a superclass type", "Increasing the size of an array"],
  "Casting a subclass reference to a superclass type",
  "Upcasting (e.g., `Animal a = new Dog();`) happens automatically and is always safe. It allows treating a specific object as a more general type."
),
Q("QUIZ","MEDIUM",
  "What exception is thrown when 'Downcasting' fails at runtime?",
  ["NullPointerException", "ClassCastException", "IllegalArgumentException", "TypeMismatchException"],
  "ClassCastException",
  "If you try to downcast a parent reference to a child type, but the actual object is NOT of that child type (e.g., `Dog d = (Dog) new Animal();`), it throws a ClassCastException."
),
Q("QUIZ","MEDIUM",
  "Which operator is used to safely check an object's type before attempting to downcast it?",
  ["typeof", "instanceof", "isType", "checkCast"],
  "instanceof",
  "The `instanceof` operator evaluates to true if the object is an instance of the specified class or its subclasses, preventing ClassCastExceptions."
),
Q("QUIZ","MEDIUM",
  "Analyze this code:\n<pre><code>class A {\n    public A() { System.out.print(\"A\"); }\n}\nclass B extends A {\n    public B(int x) { System.out.print(\"B\"); }\n}\nnew B(5);</code></pre>",
  ["B", "A", "AB", "Compile Error"],
  "AB",
  "Even though B's constructor takes an argument, it still implicitly calls the default, no-arg constructor of its parent A (`super()`) before printing 'B'."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What happens if you define a return type for a constructor?\n<pre><code>class Demo {\n    public void Demo() { System.out.println(\"Hi\"); }\n}</code></pre>",
  ["Compile error: Constructors cannot have return types", "It compiles, but it is treated as a normal method, NOT a constructor", "It runs successfully as a constructor", "Runtime error"],
  "It compiles, but it is treated as a normal method, NOT a constructor",
  "If you add a return type (like `void`) to something that looks like a constructor, Java simply treats it as a regular method that happens to have the same name as the class. The compiler will insert a default empty constructor."
),
Q("QUIZ","HARD",
  "Trace the output:\n<pre><code>class Parent {\n    int x = 10;\n    void display() { System.out.print(x + \" \"); }\n}\nclass Child extends Parent {\n    int x = 20;\n    void display() { System.out.print(x + \" \"); }\n}\nParent p = new Child();\nSystem.out.print(p.x + \" \");\np.display();</code></pre>",
  ["10 10", "20 20", "10 20", "20 10"],
  "10 20",
  "Variables are NOT polymorphic; they are resolved based on the REFERENCE type (`Parent p`, so `p.x` is 10). Methods ARE polymorphic; they are resolved based on the OBJECT type (`new Child()`, so `p.display()` calls Child's method which prints its own `x`, 20)."
),
Q("QUIZ","HARD",
  "Can a class be both 'abstract' and 'final'?",
  ["Yes, it prevents instantiation and overriding simultaneously", "No, this is a compile-time error", "Yes, but only if it contains no methods", "Yes, but it requires the @SafeVarargs annotation"],
  "No, this is a compile-time error",
  "An `abstract` class MUST be extended (subclassed) to be useful. A `final` class CANNOT be extended. These two concepts completely contradict each other, making the combination illegal."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "What is the default value of an object reference variable in Java if it is not initialized?",
  ["0", "\"\"", "null", "undefined"],
  "null",
  "Object references default to `null` (meaning they don't point to any object in memory). Primitive numbers default to 0."
),
Q("EXERCISE","EASY",
  "Which memory area stores all newly created objects in Java?",
  ["The Stack", "The Heap", "The Method Area", "The CPU Register"],
  "The Heap",
  "Whenever you use the `new` keyword, the actual object is dynamically allocated in the Heap memory. The reference variable pointing to it lives on the Stack."
),
Q("EXERCISE","EASY",
  "What does the 'protected' access modifier do?",
  ["Makes members visible only within the same class", "Makes members visible everywhere", "Makes members visible to classes in the same package AND to subclasses in any package", "Makes members visible only to subclasses in different packages"],
  "Makes members visible to classes in the same package AND to subclasses in any package",
  "`protected` is slightly less restrictive than default package-private. It allows inheritance-based access even across different packages."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "Trace the output:\n<pre><code>class Counter {\n    static int count = 0;\n    Counter() { count++; }\n}\nnew Counter();\nnew Counter();\nSystem.out.println(Counter.count);</code></pre>",
  ["0", "1", "2", "Compile Error"],
  "2",
  "Because `count` is static, it belongs to the class and is shared by all instances. Each `new Counter()` increments the same shared variable. So 1 + 1 = 2."
),
Q("EXERCISE","MEDIUM",
  "What is 'Constructor Chaining'?",
  ["Linking multiple classes together", "Calling one constructor from another constructor within the same class using `this()`", "Calling a method from a constructor", "Creating an array of objects"],
  "Calling one constructor from another constructor within the same class using `this()`",
  "Constructor chaining allows a class to have multiple constructors that reuse each other's code. A constructor can call another using `this(args)` as its very first statement."
),
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>String s1 = new String(\"Hello\");\nString s2 = new String(\"Hello\");\nSystem.out.println(s1 == s2);</code></pre>",
  ["true", "false", "Compile Error", "Runtime Exception"],
  "false",
  "The `==` operator compares memory addresses (object references). Since we used `new` twice, two distinct objects were created in the Heap, so their addresses are different."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "Trace the execution order:\n<pre><code>class Test {\n    static { System.out.print(\"1\"); }\n    { System.out.print(\"2\"); }\n    Test() { System.out.print(\"3\"); }\n}\nnew Test();\nnew Test();</code></pre>",
  ["123123", "12323", "23123", "132132"],
  "12323",
  "1. Static block (1) runs ONCE when class is loaded.\n2. First object created: Instance block (2) runs, then Constructor (3).\n3. Second object created: Instance block (2) runs, then Constructor (3)."
),
Q("EXERCISE","HARD",
  "What happens here?\n<pre><code>class P { void print() { System.out.print(\"P\"); } }\nclass C extends P { void print() { System.out.print(\"C\"); } }\nP obj = new P();\nC child = (C) obj;\nchild.print();</code></pre>",
  ["P", "C", "Compile Error", "ClassCastException at runtime"],
  "ClassCastException at runtime",
  "The actual object in memory is of type `P`. You cannot downcast a true parent object into a child reference. It compiles fine (because P and C are related), but crashes at runtime."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which method of the `Object` class is used to compare if two objects have the same internal values/state?",
  ["compareTo()", "==", "equals()", "isSame()"],
  "equals()",
  "The `.equals()` method is designed to be overridden by classes (like String) to compare the actual contents/state of two objects, rather than their memory addresses."
),
Q("CAT 1","EASY",
  "In Java, can you declare a class inside another class?",
  ["No, every class must be in its own file", "Yes, these are called Inner Classes or Nested Classes", "Yes, but they must be abstract", "No, it causes a compile error"],
  "Yes, these are called Inner Classes or Nested Classes",
  "Java supports nested classes. They can be static or non-static (inner classes) and are useful for logically grouping classes that are only used in one place."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "What is the output?\n<pre><code>class Base {\n    Base() { System.out.print(\"Base \"); }\n}\nclass Derived extends Base {\n    Derived(int x) { System.out.print(\"Derived \"); }\n}\nnew Derived(10);</code></pre>",
  ["Derived", "Base Derived", "Derived Base", "Compile Error"],
  "Base Derived",
  "The compiler automatically inserts a `super();` call as the first line of `Derived(int x)`. So the `Base` constructor executes first."
),
Q("CAT 1","MEDIUM",
  "What does it mean if a variable is declared as `static final`?",
  ["It can be changed only by static methods", "It is a constant that belongs to the class, not to any instance, and its value cannot be changed", "It is stored in the cache", "It must be initialized in the constructor"],
  "It is a constant that belongs to the class, not to any instance, and its value cannot be changed",
  "This is how Java defines true constants (e.g., `Math.PI`). `static` means one copy for the whole class, and `final` means it can never be reassigned."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "Can you use `this()` and `super()` inside the same constructor?",
  ["Yes, in any order", "Yes, but `super()` must come first", "Yes, but `this()` must come first", "No, they both must be the VERY FIRST statement in a constructor, so you can only use one of them"],
  "No, they both must be the VERY FIRST statement in a constructor, so you can only use one of them",
  "Because both `this()` and `super()` demand to be the first line of execution in a constructor body to ensure proper object initialization, they are mutually exclusive in the same block."
),
Q("CAT 1","HARD",
  "Analyze this code:\n<pre><code>class Shape { void draw() throws Exception {} }\nclass Circle extends Shape {\n    void draw() {} // No throws clause\n}</code></pre>",
  ["Compile error: Subclass must throw the same exception", "Compile error: Subclass must throw a subclass exception", "Compiles and works fine", "Runtime error"],
  "Compiles and works fine",
  "When overriding a method, a subclass can choose to throw FEWER exceptions or NO exceptions at all. It just cannot throw NEW, broader checked exceptions."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "What is the purpose of the `hashCode()` method in Java?",
  ["To encrypt the object's data", "To return an integer representation of the object, often used in hash-based collections like HashMap", "To generate a random number", "To compare objects"],
  "To return an integer representation of the object, often used in hash-based collections like HashMap",
  "`hashCode()` is heavily used by structures like HashTable, HashMap, and HashSet to quickly sort and locate objects."
),
Q("POSSIBLE QNS","EASY",
  "If no access modifier (public, private, protected) is specified for a class member, what is its default accessibility?",
  ["Visible everywhere (like public)", "Visible only in the same class (like private)", "Package-Private (visible only to classes in the same package)", "Visible to subclasses only"],
  "Package-Private (visible only to classes in the same package)",
  "The default (or 'package-private') modifier restricts access strictly to other classes residing in the exact same package."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "Explain what a 'Copy Constructor' is.",
  ["A constructor that copies files", "A constructor that takes an object of the SAME class as a parameter to create a clone/copy of it", "A method that copies arrays", "It is not possible in Java"],
  "A constructor that takes an object of the SAME class as a parameter to create a clone/copy of it",
  "Example: `public Car(Car other) { this.color = other.color; }`. It is used to initialize a new object with the exact state of an existing object."
),
Q("POSSIBLE QNS","MEDIUM",
  "Why is Java not considered a \"100% Pure\" Object-Oriented language?",
  ["Because it supports functional programming", "Because it uses primitive data types (int, float, char) which are not objects", "Because it requires a JVM", "Because it supports static methods"],
  "Because it uses primitive data types (int, float, char) which are not objects",
  "In a purely object-oriented language (like Smalltalk), everything is an object. Java uses primitives for performance reasons, meaning not absolutely everything is an object."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is the output?\n<pre><code>class A {\n    static void print() { System.out.print(\"A\"); }\n}\nclass B extends A {\n    static void print() { System.out.print(\"B\"); }\n}\nA obj = new B();\nobj.print();</code></pre>",
  ["A", "B", "Compile Error", "Runtime Exception"],
  "A",
  "Because `print()` is a STATIC method, it is resolved at compile time based on the REFERENCE type (`A`), not the runtime object type (`B`). This is called Method Hiding. It prints 'A'."
),
Q("POSSIBLE QNS","HARD",
  "What is Object Slicing, and does it happen in Java?",
  ["It happens when passing an object to a method by value. Yes, it happens in Java.", "It is the process of splitting a large object. Yes, Java does this.", "It is when a subclass object is assigned to a superclass variable and loses its subclass data. No, Java uses references, so slicing doesn't occur.", "It is garbage collection."],
  "It is when a subclass object is assigned to a superclass variable and loses its subclass data. No, Java uses references, so slicing doesn't occur.",
  "In C++, assigning a subclass object to a superclass by value 'slices' off the extra subclass attributes. In Java, objects are accessed via references, so upcasting (`A obj = new B();`) never modifies or slices the actual object on the heap."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "What does the `final` keyword do when applied to a variable?",
  ["Makes it visible everywhere", "Prevents the variable from being initialized", "Turns the variable into a constant; its value cannot be changed once assigned", "Allows it to be overridden"],
  "Turns the variable into a constant; its value cannot be changed once assigned",
  "A final variable can only be assigned once. Any attempt to reassign it will result in a compile-time error."
),
Q("UE","EASY",
  "In OOP, what is the term for a class that contains at least one abstract method?",
  ["Concrete Class", "Final Class", "Abstract Class", "Interface"],
  "Abstract Class",
  "If a class has an abstract method (a method without a body), the entire class must be declared abstract. It cannot be instantiated."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the difference between `this` and `this()`?",
  ["They are exactly the same", "`this` refers to the current object instance; `this()` calls another constructor in the same class", "`this()` refers to a method, `this` refers to a variable", "`this` is used in Python, `this()` is used in Java"],
  "`this` refers to the current object instance; `this()` calls another constructor in the same class",
  "`this.x = x` uses the reference to access a variable. `this(x)` is a constructor call used for constructor chaining."
),
Q("UE","MEDIUM",
  "What happens if you try to instantiate an interface? (e.g., `Runnable r = new Runnable();`)",
  ["It works normally", "It creates an anonymous inner class automatically", "Compile error: Cannot instantiate an interface", "Runtime error"],
  "Compile error: Cannot instantiate an interface",
  "Interfaces are abstract blueprints. They have no implementation for their methods, so you cannot create an object directly from them using `new`."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "Analyze this situation: Class `Vehicle` has a default constructor. Class `Car` extends `Vehicle` and defines ONLY `Car(String brand)`. What happens when you do `new Car(\"Toyota\");`?",
  ["Compile error because Car doesn't have a default constructor", "It works perfectly. JVM calls super() implicitly in the Car constructor, which successfully finds Vehicle's default constructor", "Runtime error", "Vehicle's constructor is ignored"],
  "It works perfectly. JVM calls super() implicitly in the Car constructor, which successfully finds Vehicle's default constructor",
  "As long as the parent has a no-arg constructor, the child constructor's implicit `super()` call will succeed, regardless of whether the child constructor has parameters or not."
),
Q("UE","HARD",
  "What is the output?\n<pre><code>class P { int id = 1; }\nclass C extends P { int id = 2; }\n\nC obj = new C();\nSystem.out.println(obj.id + \" \" + ((P)obj).id);</code></pre>",
  ["2 2", "1 1", "2 1", "1 2"],
  "2 1",
  "Variables are resolved by REFERENCE type. `obj` is of type C, so `obj.id` is 2. `((P)obj)` casts the reference to type P, so `((P)obj).id` accesses the parent's hidden variable, which is 1."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 3 (Part 2) questions!`);

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
