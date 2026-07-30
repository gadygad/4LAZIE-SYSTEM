/**
 * JAVA UNIT 3 - CLASSES, OBJECTS & INHERITANCE - HANDCRAFTED QUESTIONS
 * Based on: Unit 3.1 Classes and Objects & Unit 3.2 Inheritance
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
  "What is a 'Class' in Java?",
  ["A real-world entity with state and behavior", "A blueprint or template from which objects are created", "A method that initializes an object", "A primitive data type"],
  "A blueprint or template from which objects are created",
  "A class is a logical template that defines the properties (variables) and behaviors (methods) that its objects will have."
),
Q("QUIZ","EASY",
  "What keyword is used to create an instance (object) of a class?",
  ["create", "instance", "new", "object"],
  "new",
  "The 'new' keyword allocates memory at runtime on the heap and calls the constructor to initialize the object."
),
Q("QUIZ","EASY",
  "Which keyword is used in Java to inherit a class?",
  ["inherits", "implements", "extends", "super"],
  "extends",
  "The 'extends' keyword establishes an IS-A relationship (inheritance) between a subclass and a superclass."
),
Q("QUIZ","EASY",
  "What is the name of a special method that is automatically called when an object is created?",
  ["destructor", "initializer", "main", "constructor"],
  "constructor",
  "A constructor has the same name as the class and no return type. It is invoked automatically by the 'new' keyword to initialize the object's state."
),
Q("QUIZ","EASY",
  "In Java, can a class extend multiple classes at the same time? (Multiple Inheritance)",
  ["Yes, Java supports multiple inheritance of classes", "No, Java only supports single inheritance for classes", "Yes, but only abstract classes", "Yes, using the 'super' keyword"],
  "No, Java only supports single inheritance for classes",
  "To prevent the Diamond Problem (ambiguity), Java classes can only extend ONE superclass. Multiple inheritance is achieved through Interfaces."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What does the 'this' keyword refer to in Java?",
  ["The superclass of the current class", "The current object instance calling the method", "A static variable", "The main method"],
  "The current object instance calling the method",
  "'this' is a reference variable that refers to the current object. It is heavily used to resolve ambiguity between instance variables and parameters."
),
Q("QUIZ","MEDIUM",
  "What does the 'super' keyword do?",
  ["It makes a variable a constant", "It calls the garbage collector", "It is used to refer to immediate parent class instance variable, method, or constructor", "It terminates the program"],
  "It is used to refer to immediate parent class instance variable, method, or constructor",
  "'super' refers to the direct superclass. super() calls the parent constructor, while super.methodName() calls a parent's overridden method."
),
Q("QUIZ","MEDIUM",
  "What is the output?\n<pre><code>class A {\n    A() { System.out.print(\"A \"); }\n}\nclass B extends A {\n    B() { System.out.print(\"B \"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        B obj = new B();\n    }\n}</code></pre>",
  ["B", "B A", "A B", "Compile error"],
  "A B",
  "When a subclass object is created, the superclass constructor is invoked first implicitly (via a hidden super() call) before the subclass constructor executes."
),
Q("QUIZ","MEDIUM",
  "What is Method Overloading?",
  ["Creating a method in a subclass with the exact same signature as in the parent class", "Having multiple methods in the same class with the same name but different parameters", "Making a method private", "Using the 'final' keyword on a method"],
  "Having multiple methods in the same class with the same name but different parameters",
  "Method Overloading (Compile-time polymorphism) allows multiple methods with the same name as long as their parameter lists (number, type, or order) are different."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What happens if you do not define any constructor in your class?",
  ["The code will not compile", "The JVM will crash at runtime", "The Java compiler automatically provides a default no-argument constructor", "You must define at least one method instead"],
  "The Java compiler automatically provides a default no-argument constructor",
  "If NO constructors are explicitly written, the compiler inserts a default, empty, no-argument constructor. If you write ANY constructor (even with params), the compiler does not provide the default one."
),
Q("QUIZ","HARD",
  "What is the output?\n<pre><code>class Parent {\n    void show() { System.out.print(\"P\"); }\n}\nclass Child extends Parent {\n    void show() { System.out.print(\"C\"); }\n}\nParent obj = new Child();\nobj.show();</code></pre>",
  ["P", "C", "P C", "Compile error"],
  "C",
  "This is Method Overriding (Runtime Polymorphism). The reference type is Parent, but the actual object is Child. The JVM dynamically binds to the Child's overridden show() method at runtime."
),
Q("QUIZ","HARD",
  "Can you override a 'static' method in Java?",
  ["Yes, just like normal methods", "Yes, but it must use the @Override annotation", "No, static methods belong to the class and are resolved at compile time (Method Hiding instead of Overriding)", "No, static methods cannot be inherited"],
  "No, static methods belong to the class and are resolved at compile time (Method Hiding instead of Overriding)",
  "Static methods cannot be overridden. If a subclass defines a static method with the same signature, it HIDES the parent's method (Early binding), it doesn't override it (Late binding)."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which concept in Java prevents an object's internal variables from being modified directly from outside the class?",
  ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"],
  "Encapsulation",
  "Encapsulation restricts direct access to data by making variables 'private' and providing 'public' getter and setter methods."
),
Q("EXERCISE","EASY",
  "Identify the correct syntax for a constructor of a class named 'Student'.",
  ["void Student() {}", "public static Student() {}", "public Student() {}", "public void Student() {}"],
  "public Student() {}",
  "A constructor has NO return type (not even void) and must exactly match the class name."
),
Q("EXERCISE","EASY",
  "What is the topmost root class of all classes in Java?",
  ["java.lang.System", "java.lang.Object", "java.lang.Class", "java.util.Main"],
  "java.lang.Object",
  "Every class in Java directly or indirectly inherits from java.lang.Object. It provides default methods like toString(), equals(), and hashCode()."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What will happen?\n<pre><code>class Test {\n    int x;\n    Test(int x) { x = x; }\n}\nTest t = new Test(5);\nSystem.out.println(t.x);</code></pre>",
  ["5", "0", "Compile error", "Garbage value"],
  "0",
  "Because of variable shadowing, 'x = x' just assigns the local parameter to itself. The instance variable 'x' remains its default value, 0. To fix it, use 'this.x = x'."
),
Q("EXERCISE","MEDIUM",
  "Which keyword is used to prevent a class from being inherited (subclassed)?",
  ["static", "private", "final", "abstract"],
  "final",
  "When a class is declared as 'final' (e.g., final class String), no other class can extend it."
),
Q("EXERCISE","MEDIUM",
  "What is 'Garbage Collection' in Java?",
  ["A manual process of deleting unused files", "A feature that automatically removes unreferenced objects from the Heap memory to free up space", "A class that stores deleted objects", "A compilation step"],
  "A feature that automatically removes unreferenced objects from the Heap memory to free up space",
  "Java manages memory automatically. When an object no longer has any active references pointing to it, the Garbage Collector destroys it."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the output?\n<pre><code>class Dog {\n    public Dog() {\n        System.out.print(\"Dog \");\n    }\n    public Dog(String name) {\n        this();\n        System.out.print(name);\n    }\n}\nnew Dog(\"Rex\");</code></pre>",
  ["Rex", "Dog Rex", "Rex Dog", "Compile error"],
  "Dog Rex",
  "The 'this()' call invokes the no-argument constructor of the same class FIRST (printing 'Dog '), and then the rest of the parameterized constructor executes (printing 'Rex')."
),
Q("EXERCISE","HARD",
  "Why is it illegal to use 'this' or 'super' inside a static method?",
  ["Because static methods execute too fast", "Because 'this' and 'super' are object references, but static methods belong to the class and can be called without any object", "Because they cause infinite loops", "It is completely legal"],
  "Because 'this' and 'super' are object references, but static methods belong to the class and can be called without any object",
  "Static context has no 'current object'. You cannot refer to 'this' or 'super' because there is no instance."
),
Q("EXERCISE","HARD",
  "What happens if a parent class only has a parameterized constructor (no default constructor), and the child class constructor does not explicitly call super(...) ?",
  ["The code compiles normally", "The JVM creates a default constructor for the parent at runtime", "Compile-time error: implicit super constructor is undefined", "The parent is ignored"],
  "Compile-time error: implicit super constructor is undefined",
  "Child constructors always implicitly call super() (the no-arg constructor) first. If the parent doesn't have a no-arg constructor, the child MUST explicitly call the parameterized super(args) in its first line."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which term describes the data (variables) inside an object?",
  ["State / Attributes", "Behavior / Methods", "Classes", "Packages"],
  "State / Attributes",
  "An object's variables represent its State (Attributes), while its methods represent its Behavior."
),
Q("CAT 1","EASY",
  "If class 'Car' extends class 'Vehicle', which is the superclass?",
  ["Car", "Vehicle", "Both", "Neither"],
  "Vehicle",
  "Vehicle is the Parent/Superclass. Car is the Child/Subclass."
),
Q("CAT 1","EASY",
  "Which of the following is true about abstract classes?",
  ["They can be instantiated using 'new'", "They cannot contain normal methods", "They cannot be instantiated directly and are meant to be subclassed", "They cannot have constructors"],
  "They cannot be instantiated directly and are meant to be subclassed",
  "Abstract classes serve as a foundational template. You cannot create objects of an abstract class using 'new'; you must extend them."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "Can a constructor be overloaded?",
  ["No, there can only be one constructor per class", "Yes, a class can have multiple constructors as long as their parameter lists are different", "Yes, but they must have different names", "No, constructors are strictly final"],
  "Yes, a class can have multiple constructors as long as their parameter lists are different",
  "Constructor Overloading allows creating objects in different ways (e.g. Employee(), Employee(String name), Employee(String name, int id))."
),
Q("CAT 1","MEDIUM",
  "What is the primary difference between Method Overloading and Method Overriding?",
  ["Overloading happens in the same class, Overriding happens between a superclass and subclass", "Overloading happens between classes, Overriding happens in the same class", "Overloading uses 'override', Overriding uses 'overload'", "They are exactly the same thing"],
  "Overloading happens in the same class, Overriding happens between a superclass and subclass",
  "Overloading = Same method name, different parameters, same class. Overriding = Same method name, same parameters, in a subclass (redefining parent behavior)."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is the output?\n<pre><code>class A {\n    public int calc(int a) { return a * 2; }\n}\nclass B extends A {\n    public double calc(int a) { return a * 2.0; }\n}</code></pre>",
  ["Code compiles successfully", "Compile error: return type is incompatible with A.calc(int)", "Runtime exception", "Returns double"],
  "Compile error: return type is incompatible with A.calc(int)",
  "To successfully OVERRIDE a method, the return type must be exactly the same (or a covariant subtype). You cannot change 'int' to 'double'."
),
Q("CAT 1","HARD",
  "What is printed?\n<pre><code>class X {\n    int val = 10;\n}\nclass Y extends X {\n    int val = 20;\n}\n\nX obj = new Y();\nSystem.out.println(obj.val);</code></pre>",
  ["10", "20", "30", "Error"],
  "10",
  "Variables are NOT polymorphic in Java, only methods are. The variable accessed depends entirely on the Reference Type (X), not the Object Type (Y). So X's val (10) is printed. This is Variable Hiding."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "What does 'Polymorphism' mean in Greek and in Java?",
  ["'Data hiding'", "'Code reuse'", "'Many forms' - one interface, multiple implementations", "'Fast execution'"],
  "'Many forms' - one interface, multiple implementations",
  "Polymorphism allows objects of different classes to be treated as objects of a common superclass, allowing one method call to behave differently based on the object type."
),
Q("POSSIBLE QNS","EASY",
  "Which access modifier makes a variable accessible everywhere, from any class in any package?",
  ["private", "default", "protected", "public"],
  "public",
  "'public' is the most permissive access level. 'private' is the most restrictive (same class only)."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is an 'Interface' in Java?",
  ["A class with all private methods", "A completely abstract blueprint containing only abstract methods (prior to Java 8) and constants", "A graphical user interface", "A primitive type"],
  "A completely abstract blueprint containing only abstract methods (prior to Java 8) and constants",
  "Interfaces are used to achieve 100% abstraction and multiple inheritance. Classes 'implement' interfaces rather than 'extend' them."
),
Q("POSSIBLE QNS","MEDIUM",
  "Why is it considered a bad practice to declare class variables as 'public'?",
  ["It makes the code run slower", "It breaks Encapsulation because external classes can change the data arbitrarily, risking system stability", "It prevents inheritance", "It causes compiler warnings"],
  "It breaks Encapsulation because external classes can change the data arbitrarily, risking system stability",
  "Data should be private and accessed via getters/setters to ensure validation and control over how the state changes."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What happens here?\n<pre><code>final class MathHelper {\n    public void calculate() {}\n}\nclass AdvancedMath extends MathHelper {}</code></pre>",
  ["Compiles successfully", "Compile error: Cannot inherit from final class", "Runtime error", "AdvancedMath becomes final automatically"],
  "Compile error: Cannot inherit from final class",
  "The 'final' keyword on a class prevents it from being extended. Java's 'String' class is an example of a final class."
),
Q("POSSIBLE QNS","HARD",
  "Explain what 'super.super.method()' does in Java.",
  ["Calls the method from the grandparent class", "Calls the superclass method twice", "It is invalid syntax and causes a compile-time error", "Calls the Object class method"],
  "It is invalid syntax and causes a compile-time error",
  "Java does NOT allow bypassing the direct parent class. You can only use 'super' to access the immediate superclass. 'super.super' is illegal."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Which keyword must a subclass use to satisfy an interface?",
  ["extends", "inherits", "implements", "uses"],
  "implements",
  "While classes 'extends' other classes, they 'implements' interfaces (e.g. class Dog implements Animal)."
),
Q("UE","EASY",
  "True or False: A class can implement multiple interfaces at the same time.",
  ["True", "False", "Only abstract classes can", "Only if they are in the same package"],
  "True",
  "Java allows multiple inheritance of interfaces. A class can do: class MyClass implements InterfaceA, InterfaceB {}."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the '@Override' annotation used for?",
  ["It forces the program to run faster", "It tells the compiler to check if the method is actually overriding a parent method, catching typos at compile time", "It makes a method private", "It overloads the method"],
  "It tells the compiler to check if the method is actually overriding a parent method, catching typos at compile time",
  "If you misspell a method name (e.g. tostring() instead of toString()), @Override will trigger a compile error, saving you from nasty bugs."
),
Q("UE","MEDIUM",
  "If a child class completely overrides a method from a parent class, can the child still call the parent's original version of that method?",
  ["No, the parent method is permanently erased", "Yes, by creating a new parent object", "Yes, by using the 'super.methodName()' syntax inside the child class", "Yes, by using 'this.methodName()'"],
  "Yes, by using the 'super.methodName()' syntax inside the child class",
  "'super' allows a subclass to reach up into its parent and invoke the overridden method (commonly done to add functionality rather than replace it entirely)."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "Analyze this code:\n<pre><code>class P { void run() throws Exception {} }\nclass C extends P {\n    void run() throws IOException {}\n}</code></pre>",
  ["Compile error: Subclass cannot throw exceptions", "Compile error: Subclass must throw exact same exception", "Compiles successfully", "Runtime error"],
  "Compiles successfully",
  "Rule of Overriding Exceptions: A subclass method can throw the SAME exception, a SUBCLASS exception (IOException is a subclass of Exception), or NO exception. It CANNOT throw a new, broader checked exception."
),
Q("UE","HARD",
  "What happens if a parent class has a private method `private void show()` and the child class declares `public void show()`?",
  ["Compile error: Cannot change access modifier", "Compile error: Cannot override private method", "Compiles fine, but it is NOT method overriding. It is just a completely new, independent method in the child class", "Runtime error"],
  "Compiles fine, but it is NOT method overriding. It is just a completely new, independent method in the child class",
  "Private methods are hidden from subclasses. The subclass doesn't even know the parent's private method exists. Therefore, declaring a method with the same name is simply creating a brand new method, not overriding."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 3 questions!`);

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
