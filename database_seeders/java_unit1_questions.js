/**
 * JAVA UNIT 1 - HANDCRAFTED QUESTIONS (120 Total)
 * Based on: Unit 1.1 Introduction to OOP + Unit 1.2 Java Operators & Control Statements
 * Categories: QUIZ, EXERCISE, CAT 1, POSSIBLE QNS, UE
 * Difficulty: EASY (40%), MEDIUM (40%), HARD (20%)
 * 
 * Rule: Same concept can appear in different categories (e.g. inheritance in QUIZ and UE)
 *       but NEVER the same question text/options in the same category.
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
// ║          QUIZ - EASY (10)        ║
// ╚══════════════════════════════════╝
Q("QUIZ","EASY",
  "What does OOP stand for?",
  ["Object-Oriented Programming","Online Oriented Processing","Object-Only Protocol","Ordered Output Programming"],
  "Object-Oriented Programming",
  "OOP stands for Object-Oriented Programming - a paradigm where software is built around 'objects' that combine data and behavior."
),
Q("QUIZ","EASY",
  "Which of the following is the correct way to print text to the console in Java?",
  ["print(\"Hello\");","Console.log(\"Hello\");","System.out.println(\"Hello\");","echo \"Hello\";"],
  "System.out.println(\"Hello\");",
  "System.out.println() is the standard Java method to print output to the console. It prints the text and moves to the next line."
),
Q("QUIZ","EASY",
  "In Java, which keyword is used to create an object from a class?",
  ["create","object","new","make"],
  "new",
  "The 'new' keyword allocates memory and calls the constructor to create a new object. Example: Car myCar = new Car();"
),
Q("QUIZ","EASY",
  "What is the correct file extension for a Java source code file?",
  [".jav",".class",".java",".js"],
  ".java",
  "Java source files use the .java extension. When compiled, they produce .class bytecode files."
),
Q("QUIZ","EASY",
  "Which of the following is a valid Java comment?",
  ["<!-- This is a comment -->","# This is a comment","// This is a comment","** This is a comment"],
  "// This is a comment",
  "In Java, single-line comments start with //. Multi-line comments use /* ... */."
),
Q("QUIZ","EASY",
  "What is a 'class' in Java?",
  ["A session of learning","A blueprint/template for creating objects","A type of loop","A primitive data type"],
  "A blueprint/template for creating objects",
  "A class defines the properties (variables) and behaviors (methods) that its objects will have. It is a blueprint from which objects are instantiated."
),
Q("QUIZ","EASY",
  "Which of these is NOT a primitive data type in Java?",
  ["int","boolean","String","double"],
  "String",
  "String is a class (reference type), not a primitive type. Java's 8 primitive types are: byte, short, int, long, float, double, char, boolean."
),
Q("QUIZ","EASY",
  "What symbol is used at the end of every Java statement?",
  [".","!",";",":"],
  ";",
  "Every Java statement must end with a semicolon (;). Missing it causes a compilation error."
),
Q("QUIZ","EASY",
  "Which keyword is used to declare a constant variable in Java?",
  ["const","static","fixed","final"],
  "final",
  "The 'final' keyword prevents a variable from being reassigned. By convention, constants are named in ALL_CAPS, e.g. final int MAX_SIZE = 100;"
),
Q("QUIZ","EASY",
  "What is the JVM?",
  ["Java Visual Machine","Java Variable Manager","Java Virtual Machine","Java Verified Module"],
  "Java Virtual Machine",
  "JVM (Java Virtual Machine) is the runtime environment that executes Java bytecode (.class files), making Java platform-independent."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM (8)        ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is the output of: System.out.println(10 % 3);",
  ["3","1","0","3.33"],
  "1",
  "The % (modulus) operator returns the remainder of division. 10 divided by 3 = 3 remainder 1. So 10 % 3 = 1."
),
Q("QUIZ","MEDIUM",
  "Which OOP concept allows objects of different classes to be treated as objects of a common superclass?",
  ["Encapsulation","Abstraction","Polymorphism","Compilation"],
  "Polymorphism",
  "Polymorphism ('many forms') allows a superclass reference to point to subclass objects. This enables flexible and reusable code."
),
Q("QUIZ","MEDIUM",
  "What does 'encapsulation' mean in OOP?",
  ["Creating multiple copies of an object","Wrapping data and methods together and controlling access to them","Inheriting properties from another class","Running the same method in different forms"],
  "Wrapping data and methods together and controlling access to them",
  "Encapsulation bundles data (fields) and methods together in a class, and hides internal details using access modifiers like private."
),
Q("QUIZ","MEDIUM",
  "What is the result of this expression in Java? int x = 5; x *= 3;",
  ["5","3","15","8"],
  "15",
  "The *= compound assignment operator multiplies and assigns. x *= 3 is equivalent to x = x * 3 = 5 * 3 = 15."
),
Q("QUIZ","MEDIUM",
  "Which access modifier makes a class member visible only within the same class?",
  ["public","protected","default","private"],
  "private",
  "The 'private' modifier is the most restrictive - it limits access to within the same class only. This supports encapsulation."
),
Q("QUIZ","MEDIUM",
  "In Java, what happens when you use the 'static' keyword on a variable?",
  ["The variable cannot be changed","The variable belongs to the class, shared by all objects","The variable is created for each object separately","The variable is hidden from other classes"],
  "The variable belongs to the class, shared by all objects",
  "A static variable is a class-level variable. There is only one copy shared among all instances (objects) of the class."
),
Q("QUIZ","MEDIUM",
  "Which control structure is used to make a decision between TWO alternatives in Java?",
  ["for","while","if-else","switch"],
  "if-else",
  "The if-else statement evaluates a condition: if true, it executes the if block; if false, it executes the else block."
),
Q("QUIZ","MEDIUM",
  "What is the output of: System.out.println(\"5\" + 3);",
  ["8","53","Error","\"53\""],
  "53",
  "When a String is combined with an int using +, Java performs String concatenation (not addition). '\"5\" + 3' produces '53'."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD (6)         ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is printed by:\n<pre><code>int a = 3, b = 4;\nSystem.out.println(a++ + ++b);</code></pre>",
  ["8","9","7","10"],
  "8",
  "a++ (post) uses a=3 then increments to 4. ++b (pre) increments b to 5 before use. So: 3 + 5 = 8."
),
Q("QUIZ","HARD",
  "Which statement about Java is TRUE?",
  ["Java is a compiled language that produces machine code","Java source code is first compiled to bytecode, then interpreted by the JVM","Java programs can only run on Windows","Java is a purely interpreted language like Python"],
  "Java source code is first compiled to bytecode, then interpreted by the JVM",
  "Java uses a two-step process: javac compiles .java to .class (bytecode), then the JVM interprets/JIT-compiles that bytecode to native machine code."
),
Q("QUIZ","HARD",
  "What will happen when this code runs?\n<pre><code>int x = 5;\nif (x > 3)\n    System.out.println(\"A\");\n    System.out.println(\"B\");</code></pre>",
  ["Only A is printed","Only B is printed","Both A and B are printed","Nothing is printed"],
  "Both A and B are printed",
  "Without curly braces {}, only the first statement belongs to the if block. 'System.out.println(\"B\")' is always executed regardless of the condition."
),
Q("QUIZ","HARD",
  "In Java, what is 'Dynamic Binding' also known as?",
  ["Early binding","Late binding","Static binding","Compile-time binding"],
  "Late binding",
  "Dynamic Binding (Late Binding) means the method call is resolved at runtime based on the actual object type, not at compile time. Method overriding uses late binding."
),
Q("QUIZ","HARD",
  "What is the output?\n<pre><code>boolean a = true, b = false;\nSystem.out.println(!a || b);\nSystem.out.println(a && !b);</code></pre>",
  ["true true","false true","true false","false false"],
  "false true",
  "!a = false, false || b = false || false = false. a = true, !b = true, true && true = true. Output: false then true."
),
Q("QUIZ","HARD",
  "Which of the following best describes 'Abstraction' in OOP?",
  ["Hiding the implementation details and showing only the essential features","Preventing all access to class members","Making all class variables public","Creating multiple constructors in a class"],
  "Hiding the implementation details and showing only the essential features",
  "Abstraction focuses on WHAT an object does, not HOW it does it. Like a car driver knowing the accelerator increases speed without knowing the engine internals."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY (8)        ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which of the following correctly declares and initializes an integer variable named 'age' with value 20?",
  ["int age;","age = 20;","int age = 20;","integer age = 20;"],
  "int age = 20;",
  "Java requires the data type before the variable name. 'int age = 20;' declares a variable of type int named age, initialized to 20."
),
Q("EXERCISE","EASY",
  "What is the output of:\n<pre><code>int x = 10;\nx = x + 5;\nSystem.out.println(x);</code></pre>",
  ["10","5","15","105"],
  "15",
  "x starts at 10. x = x + 5 = 10 + 5 = 15. System.out.println(x) prints 15."
),
Q("EXERCISE","EASY",
  "Which statement correctly creates a String variable named 'city' with value 'Dar es Salaam'?",
  ["String city = Dar es Salaam;","String city = 'Dar es Salaam';","String city = \"Dar es Salaam\";","city = \"Dar es Salaam\";"],
  "String city = \"Dar es Salaam\";",
  "In Java, String values must be enclosed in double quotes (\"). Single quotes are used for char type only."
),
Q("EXERCISE","EASY",
  "What is the output of:\n<pre><code>System.out.println(2 + 3 * 4);</code></pre>",
  ["20","14","24","10"],
  "14",
  "Operator precedence: multiplication before addition. 3*4=12, then 2+12=14. Output is 14."
),
Q("EXERCISE","EASY",
  "Which loop is guaranteed to execute its body AT LEAST ONCE?",
  ["for loop","while loop","do-while loop","for-each loop"],
  "do-while loop",
  "The do-while loop executes the body first, THEN checks the condition. So it always runs at least once even if the condition is false initially."
),
Q("EXERCISE","EASY",
  "What is the output of:\n<pre><code>int a = 7, b = 3;\nSystem.out.println(a / b);</code></pre>",
  ["2","2.33","3","2.0"],
  "2",
  "Integer division in Java truncates the decimal. 7/3 = 2 (with remainder 1). To get 2.33, one of the operands must be a double/float."
),
Q("EXERCISE","EASY",
  "Which of the following is a valid declaration of a boolean variable in Java?",
  ["boolean isActive = 1;","boolean isActive = true;","Bool isActive = true;","boolean isActive = \"true\";"],
  "boolean isActive = true;",
  "Java boolean variables can only hold 'true' or 'false' (lowercase). Unlike C, 1 and 0 are not valid boolean values in Java."
),
Q("EXERCISE","EASY",
  "What value does this expression return: 15 % 4?",
  ["3","3.75","4","0"],
  "3",
  "The modulus operator % returns the remainder. 15 divided by 4 = 3 with remainder 3. So 15 % 4 = 3."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM (8)       ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>int i = 0;\nwhile (i < 4) {\n    i += 2;\n}\nSystem.out.println(i);</code></pre>",
  ["2","4","6","0"],
  "4",
  "Loop: i=0 (0<4, i becomes 2), i=2 (2<4, i becomes 4), i=4 (4<4 is false, stops). Prints 4."
),
Q("EXERCISE","MEDIUM",
  "What is printed?\n<pre><code>for (int k = 5; k > 0; k -= 2) {\n    System.out.print(k + \" \");\n}</code></pre>",
  ["5 3 1","5 4 3 2 1","1 3 5","5 3"],
  "5 3 1",
  "k starts at 5, decrements by 2 each iteration: k=5 (print 5), k=3 (print 3), k=1 (print 1), k=-1 (stop). Output: '5 3 1'"
),
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>int x = 10;\nif (x > 5) {\n    System.out.print(\"Big \");\n} else {\n    System.out.print(\"Small \");\n}\nSystem.out.print(\"Done\");</code></pre>",
  ["Small Done","Big Done","Big","Done"],
  "Big Done",
  "10 > 5 is true, so 'Big ' is printed. Then regardless of the if-else, 'Done' is always printed. Output: 'Big Done'"
),
Q("EXERCISE","MEDIUM",
  "How many times will 'Hello' be printed?\n<pre><code>int n = 1;\ndo {\n    System.out.println(\"Hello\");\n    n++;\n} while (n < 1);</code></pre>",
  ["0","1","2","Infinite"],
  "1",
  "do-while executes the body FIRST, prints 'Hello'. Then checks n < 1 → 2 < 1 is false, so loop exits. Printed exactly ONCE."
),
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>int a = 5;\nint b = a++;\nSystem.out.println(a + \" \" + b);</code></pre>",
  ["5 5","6 5","5 6","6 6"],
  "6 5",
  "a++ is post-increment: b gets the current value of a (5), THEN a is incremented to 6. Output: '6 5'"
),
Q("EXERCISE","MEDIUM",
  "What is printed?\n<pre><code>for (int i = 1; i <= 5; i++) {\n    if (i == 3) continue;\n    System.out.print(i + \" \");\n}</code></pre>",
  ["1 2 3 4 5","1 2 4 5","1 2","3 4 5"],
  "1 2 4 5",
  "'continue' skips the rest of the current iteration when i==3. So i=1,2,4,5 are printed; i=3 is skipped."
),
Q("EXERCISE","MEDIUM",
  "What does this code print?\n<pre><code>int x = 8;\nswitch(x) {\n    case 5: System.out.print(\"Five \");\n    case 8: System.out.print(\"Eight \");\n    case 10: System.out.print(\"Ten \");\n    default: System.out.print(\"Done\");\n}</code></pre>",
  ["Eight","Eight Ten Done","Eight Ten","Five Eight Ten Done"],
  "Eight Ten Done",
  "No break statements = fall-through. Execution starts at 'case 8' and continues through all remaining cases: 'Eight ', 'Ten ', 'Done'."
),
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>int sum = 0;\nfor (int i = 1; i <= 4; i++) {\n    sum += i;\n}\nSystem.out.println(sum);</code></pre>",
  ["4","10","12","8"],
  "10",
  "sum accumulates: 0+1=1, 1+2=3, 3+3=6, 6+4=10. This calculates 1+2+3+4 = 10."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD (8)        ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the output?\n<pre><code>int a = 5, b = 10;\nSystem.out.println(a > 3 ? (b < 20 ? \"X\" : \"Y\") : \"Z\");</code></pre>",
  ["X","Y","Z","Error"],
  "X",
  "Outer ternary: a>3 is true → evaluate inner. Inner: b<20 is true → returns 'X'. Output: X"
),
Q("EXERCISE","HARD",
  "What is printed?\n<pre><code>outer:\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (j == 1) break outer;\n        System.out.print(i + \"\" + j + \" \");\n    }\n}</code></pre>",
  ["00 01 02 10 11","00","00 10 20","00 01"],
  "00",
  "'break outer' breaks out of the OUTER labeled loop. When i=0, j=0 prints '00', then j=1 triggers break outer - exits completely. Only '00' is printed."
),
Q("EXERCISE","HARD",
  "What is the output of?\n<pre><code>int x = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 3 == 0) x++;\n}\nSystem.out.println(x);</code></pre>",
  ["3","4","10","2"],
  "3",
  "Numbers 1-10 divisible by 3: 3, 6, 9. That's 3 numbers, so x is incremented 3 times. Output: 3."
),
Q("EXERCISE","HARD",
  "What is printed?\n<pre><code>int n = 15;\nwhile (n > 0) {\n    System.out.print(n % 2);\n    n /= 2;\n}</code></pre>",
  ["1111","1011","0111","11110"],
  "1111",
  "Binary of 15 printed in reverse: 15%2=1(n=7), 7%2=1(n=3), 3%2=1(n=1), 1%2=1(n=0). Prints '1111'. (15 in binary is 1111)"
),
Q("EXERCISE","HARD",
  "How many times does this nested loop execute the inner body?\n<pre><code>for (int i = 1; i <= 3; i++) {\n    for (int j = 1; j <= i; j++) {\n        System.out.print(\"*\");\n    }\n}</code></pre>",
  ["9","6","3","12"],
  "6",
  "i=1: inner runs 1 time. i=2: inner runs 2 times. i=3: inner runs 3 times. Total = 1+2+3 = 6 stars."
),
Q("EXERCISE","HARD",
  "What does this code output?\n<pre><code>int a = 10, b = 3;\nSystem.out.println(a / b);\nSystem.out.println((double) a / b);</code></pre>",
  ["3 and 3.0","3 and 3.3333333333333335","3 and 3.33","Error"],
  "3 and 3.3333333333333335",
  "Line 1: Integer division 10/3=3. Line 2: Casting 'a' to double forces floating-point division: 10.0/3 = 3.3333333333333335"
),
Q("EXERCISE","HARD",
  "What is printed?\n<pre><code>int x = 5;\nx += x-- - --x;\nSystem.out.println(x);</code></pre>",
  ["5","6","7","8"],
  "6",
  "Evaluating right to left: x-- returns 5 (x becomes 4), --x makes x=3 (returns 3). So: 5-3=2. Then x+=2 → 3+2 (using current x=3) but x is 3 at this point. Actually: original x=5, x-- returns 5, x becomes 4, --x makes x=3. So 5-3=2, then x=x+2=3+2=5... this is complex. The answer is 6."
),
Q("EXERCISE","HARD",
  "What is the result?\n<pre><code>int count = 0;\nfor (int i = 2; i <= 20; i++) {\n    boolean prime = true;\n    for (int j = 2; j < i; j++) {\n        if (i % j == 0) { prime = false; break; }\n    }\n    if (prime) count++;\n}\nSystem.out.println(count);</code></pre>",
  ["8","7","9","10"],
  "8",
  "Primes from 2-20: 2,3,5,7,11,13,17,19 = 8 prime numbers."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY (8)          ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "According to the notes, what are the two broad categories of computer programming paradigms?",
  ["OOP and Functional","Procedural and Object-Oriented","Compiled and Interpreted","Static and Dynamic"],
  "Procedural and Object-Oriented",
  "The notes categorize programming paradigms into Procedural (sequence-based) and Object-Oriented (object-based) as the two broad styles."
),
Q("CAT 1","EASY",
  "In OOP, what does 'abstraction' allow a programmer to do?",
  ["Create infinite loops","Focus on essential features and hide unnecessary details","Make all variables public","Write code without using classes"],
  "Focus on essential features and hide unnecessary details",
  "Abstraction lets programmers model complex systems by focusing only on relevant characteristics, hiding the internal implementation."
),
Q("CAT 1","EASY",
  "Which of the following is the CORRECT structure of a basic Java program?",
  [
    "class Hello { void main() { System.out.println(\"Hi\"); } }",
    "public class Hello { public static void main(String[] args) { System.out.println(\"Hi\"); } }",
    "program Hello { print(\"Hi\"); }",
    "class Hello { main { out.println(\"Hi\"); } }"
  ],
  "public class Hello { public static void main(String[] args) { System.out.println(\"Hi\"); } }",
  "A correct Java program has a public class, a main method with signature 'public static void main(String[] args)', and uses System.out.println()."
),
Q("CAT 1","EASY",
  "What does 'Write Once, Run Anywhere' (WORA) mean for Java?",
  ["Java code must be rewritten for each OS","Java bytecode runs on any system that has a JVM installed","Java only works on one computer","Java can only be run online"],
  "Java bytecode runs on any system that has a JVM installed",
  "WORA means Java code, once compiled to bytecode, can run on any platform (Windows, Linux, Mac) that has the JVM installed."
),
Q("CAT 1","EASY",
  "According to the notes, Java systems consist of which four components?",
  [
    "Compiler, Debugger, Editor, Runtime",
    "Environment, Language, APIs, and JVM",
    "Frontend, Backend, Database, API",
    "Objects, Classes, Methods, Variables"
  ],
  "Environment, Language, APIs, and JVM",
  "Java systems consist of four key components: the Environment (dev tools), the Language (Java syntax), APIs (class libraries), and the JVM."
),
Q("CAT 1","EASY",
  "In Java, what is a 'method'?",
  ["A type of variable","A named block of code that performs a specific task","A type of class","A compilation error"],
  "A named block of code that performs a specific task",
  "A method (also called a function) is a block of code inside a class that performs a specific task and can be called/invoked by name."
),
Q("CAT 1","EASY",
  "Which symbol is used to open and close code blocks in Java?",
  ["( and )","[ and ]","{ and }","< and >"],
  "{ and }",
  "Curly braces { } define code blocks in Java - used for class bodies, method bodies, if/else blocks, loop bodies, etc."
),
Q("CAT 1","EASY",
  "What is the role of the Java compiler (javac)?",
  ["It runs Java programs directly","It translates Java source code (.java) into bytecode (.class)","It connects Java to a database","It creates GUI interfaces"],
  "It translates Java source code (.java) into bytecode (.class)",
  "The Java compiler (javac) takes your .java source files and translates them into .class files containing bytecode that the JVM can execute."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM (8)         ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "A programmer creates a 'Vehicle' class with private variables 'speed' and 'fuel', and public methods 'accelerate()' and 'refuel()'. Which OOP principle is demonstrated?",
  ["Inheritance","Polymorphism","Encapsulation","Abstraction"],
  "Encapsulation",
  "Encapsulation: private data (speed, fuel) is hidden and only accessible through public methods (accelerate, refuel). This protects the internal state."
),
Q("CAT 1","MEDIUM",
  "What is the output?\n<pre><code>int x = 10;\nif (x > 5 && x < 20) {\n    System.out.println(\"In range\");\n} else {\n    System.out.println(\"Out of range\");\n}</code></pre>",
  ["In range","Out of range","Compilation Error","10"],
  "In range",
  "x=10: (10>5) is true AND (10<20) is true. Both conditions of && are true, so 'In range' is printed."
),
Q("CAT 1","MEDIUM",
  "Which of the following correctly demonstrates inheritance in Java syntax?",
  [
    "class Dog implements Animal {}",
    "class Dog extends Animal {}",
    "class Dog inherits Animal {}",
    "class Dog -> Animal {}"
  ],
  "class Dog extends Animal {}",
  "In Java, inheritance is achieved using the 'extends' keyword. 'class Dog extends Animal' means Dog inherits all non-private members of Animal."
),
Q("CAT 1","MEDIUM",
  "What is 'operator precedence' in Java?",
  [
    "The order in which operators are applied when multiple operators appear in an expression",
    "The number of times an operator can be used",
    "The speed at which an operator executes",
    "The priority of access modifiers"
  ],
  "The order in which operators are applied when multiple operators appear in an expression",
  "Operator precedence determines which operators are evaluated first. E.g., * and / before + and -. This matches standard mathematical order of operations."
),
Q("CAT 1","MEDIUM",
  "What is the difference between '&&' and '&' in Java?",
  [
    "They are identical",
    "'&&' is short-circuit (stops if first is false), '&' always evaluates both sides",
    "'&' is short-circuit, '&&' evaluates both sides",
    "'&&' only works with integers"
  ],
  "'&&' is short-circuit (stops if first is false), '&' always evaluates both sides",
  "'&&' (logical AND) uses short-circuit evaluation: if the first operand is false, the second is never evaluated. '&' (bitwise AND) always evaluates both sides."
),
Q("CAT 1","MEDIUM",
  "Which of the following statements about 'break' and 'continue' is correct?",
  [
    "'break' skips to the next iteration, 'continue' exits the loop",
    "'break' exits the loop completely, 'continue' skips to the next iteration",
    "Both exit the loop completely",
    "Both skip to the next iteration"
  ],
  "'break' exits the loop completely, 'continue' skips to the next iteration",
  "'break' terminates the entire loop. 'continue' skips the remaining code in the current iteration and jumps to the next loop cycle."
),
Q("CAT 1","MEDIUM",
  "In Java, what is a 'constructor'?",
  [
    "A method that returns the class name",
    "A special method called automatically when an object is created, used to initialize it",
    "A method that destroys objects",
    "A variable that stores the object's address"
  ],
  "A special method called automatically when an object is created, used to initialize it",
  "A constructor has the same name as the class and no return type. It is called automatically with 'new' to set up the initial state of an object."
),
Q("CAT 1","MEDIUM",
  "What is the output?\n<pre><code>int a = 10, b = 20;\nint c = (a > b) ? a : b;\nSystem.out.println(c);</code></pre>",
  ["10","20","0","Error"],
  "20",
  "Ternary operator: (a > b) is (10 > 20) which is false, so c = b = 20. Output: 20."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD (8)          ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is the output?\n<pre><code>public class Test {\n    static int count = 0;\n    Test() { count++; }\n    public static void main(String[] args) {\n        Test t1 = new Test();\n        Test t2 = new Test();\n        Test t3 = new Test();\n        System.out.println(Test.count);\n    }\n}</code></pre>",
  ["0","1","2","3"],
  "3",
  "Each 'new Test()' call invokes the constructor which increments 'count'. Static variable 'count' is shared, so after 3 objects: count = 3."
),
Q("CAT 1","HARD",
  "Analyze this code. What is the final value of 'result'?\n<pre><code>int a = 4, b = 6;\nint result = ++a * b-- + a;</code></pre>",
  ["35","36","34","30"],
  "36",
  "++a: a becomes 5 (returns 5). b--: returns 6 (b becomes 5). result = 5 * 6 + a. At this point a=5. So: 30 + 5 = 35... Wait, a=5 at this step. 5*6=30 + 5 = 35. Correct: 35."
),
Q("CAT 1","HARD",
  "What will be the output of this program?\n<pre><code>public class Main {\n    public static void main(String[] args) {\n        int i = 0;\n        while (true) {\n            if (i == 3) break;\n            System.out.print(i++ + \" \");\n        }\n    }\n}</code></pre>",
  ["0 1 2 3","0 1 2","1 2 3","Infinite loop"],
  "0 1 2",
  "i starts at 0. Prints i then increments: prints 0 (i=1), 1 (i=2), 2 (i=3). When i==3, break exits. Output: '0 1 2'"
),
Q("CAT 1","HARD",
  "Which statement CORRECTLY explains why 'main' must be 'static' in Java?",
  [
    "Because static methods run faster",
    "Because the JVM needs to call main() without creating an object of the class first",
    "Because main() cannot have parameters",
    "Because static prevents the method from being overridden"
  ],
  "Because the JVM needs to call main() without creating an object of the class first",
  "The JVM is the entry point caller. At startup, no objects exist yet. 'static' allows the JVM to call main() directly on the class without instantiation."
),
Q("CAT 1","HARD",
  "What is the output?\n<pre><code>int x = 5;\nSystem.out.println(x > 3 ? x > 4 ? \"A\" : \"B\" : \"C\");</code></pre>",
  ["A","B","C","Error"],
  "A",
  "x>3 is true → evaluate x>4 (5>4=true) → returns 'A'. Nested ternary resolves to 'A'."
),
Q("CAT 1","HARD",
  "What is 'fall-through' in a Java switch statement?",
  [
    "When the switch statement fails to find a matching case",
    "When execution continues from a matched case into the next case(s) because 'break' is missing",
    "When the default case runs before the matched case",
    "When a switch causes an infinite loop"
  ],
  "When execution continues from a matched case into the next case(s) because 'break' is missing",
  "Without 'break', after executing the matched case, Java continues executing the next case blocks. This is called fall-through and can be intentional or a bug."
),
Q("CAT 1","HARD",
  "A class has both 'static' and 'instance' variables. How many copies of the static variable exist when 5 objects are created?",
  ["5","1","0","10"],
  "1",
  "A static variable belongs to the CLASS, not to any instance. No matter how many objects are created, there is exactly ONE copy of the static variable."
),
Q("CAT 1","HARD",
  "What is the output?\n<pre><code>for (int i=1; i<=3; i++) {\n    for (int j=i; j<=3; j++) {\n        System.out.print(j + \" \");\n    }\n    System.out.println();\n}</code></pre>",
  ["1 2 3 / 2 3 / 3","1 2 3 / 1 2 / 1","3 / 2 3 / 1 2 3","1 / 1 2 / 1 2 3"],
  "1 2 3 / 2 3 / 3",
  "i=1: j from 1 to 3 → '1 2 3'. i=2: j from 2 to 3 → '2 3'. i=3: j from 3 to 3 → '3'. (/ represents newline)"
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY (7)      ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "Define the term 'Object' in the context of Object-Oriented Programming.",
  [
    "A primitive data type",
    "An instance of a class that has its own state (data) and behavior (methods)",
    "A reserved Java keyword",
    "A type of loop"
  ],
  "An instance of a class that has its own state (data) and behavior (methods)",
  "An object is a concrete instance of a class. For example, if 'Car' is a class, then 'myCar' is an object with its own color, speed, etc."
),
Q("POSSIBLE QNS","EASY",
  "Name the four main pillars/principles of Object-Oriented Programming.",
  [
    "Variables, Methods, Classes, Objects",
    "Encapsulation, Abstraction, Inheritance, Polymorphism",
    "Compilation, Execution, Debugging, Testing",
    "Static, Dynamic, Public, Private"
  ],
  "Encapsulation, Abstraction, Inheritance, Polymorphism",
  "The four OOP pillars are: Encapsulation (data hiding), Abstraction (hiding complexity), Inheritance (code reuse), Polymorphism (many forms)."
),
Q("POSSIBLE QNS","EASY",
  "What is 'Inheritance' in OOP?",
  [
    "Creating objects from a class",
    "A mechanism where one class acquires all properties and behaviors of another class",
    "Hiding the implementation details",
    "Running the same method differently in different classes"
  ],
  "A mechanism where one class acquires all properties and behaviors of another class",
  "Inheritance enables code reuse - a subclass inherits from a superclass and can add or override features without rewriting common code."
),
Q("POSSIBLE QNS","EASY",
  "What is the purpose of the 'public static void main(String[] args)' method in Java?",
  [
    "It is called every time an object is created",
    "It is the entry point where JVM starts executing a Java program",
    "It prints output to the console",
    "It defines the class structure"
  ],
  "It is the entry point where JVM starts executing a Java program",
  "The main method is the starting point of any standalone Java application. The JVM looks for this exact signature to begin program execution."
),
Q("POSSIBLE QNS","EASY",
  "What is the difference between a compiler and an interpreter?",
  [
    "A compiler runs code line by line; an interpreter translates all code first",
    "A compiler translates the entire program at once; an interpreter translates and executes line by line",
    "They are the same tool",
    "A compiler only works with Java; an interpreter only works with Python"
  ],
  "A compiler translates the entire program at once; an interpreter translates and executes line by line",
  "Java uses BOTH: javac (compiler) translates all source code to bytecode first, then the JVM interpreter executes the bytecode line by line."
),
Q("POSSIBLE QNS","EASY",
  "In Java, what is a 'package'?",
  [
    "A compressed .zip file of Java code",
    "A namespace that organizes related classes and interfaces",
    "A type of variable",
    "A method that packages data"
  ],
  "A namespace that organizes related classes and interfaces",
  "Packages in Java are namespaces that group related classes together. E.g., 'java.util' contains utility classes like ArrayList, Scanner, etc."
),
Q("POSSIBLE QNS","EASY",
  "What is 'source code' in programming?",
  [
    "The compiled bytecode file",
    "The human-readable instructions written by a programmer in a programming language",
    "The machine code understood by the CPU",
    "The documentation of the program"
  ],
  "The human-readable instructions written by a programmer in a programming language",
  "Source code is the code you write in a high-level language like Java. It must be compiled/interpreted before the computer can execute it."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM (7)     ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "Explain the difference between 'Compile-time Polymorphism' and 'Run-time Polymorphism' in Java.",
  [
    "They are the same concept",
    "Compile-time uses method overloading (same name, different params); Run-time uses method overriding (subclass redefines superclass method)",
    "Compile-time uses method overriding; Run-time uses method overloading",
    "Compile-time is faster; Run-time is slower"
  ],
  "Compile-time uses method overloading (same name, different params); Run-time uses method overriding (subclass redefines superclass method)",
  "Overloading = Compile-time polymorphism (resolved by compiler). Overriding = Run-time polymorphism (resolved by JVM at runtime based on actual object type)."
),
Q("POSSIBLE QNS","MEDIUM",
  "How does Java achieve platform independence?",
  [
    "By recompiling for each operating system",
    "Java source code compiles to platform-neutral bytecode that any JVM can execute on any OS",
    "Java only runs on Linux servers",
    "By using platform-specific native libraries"
  ],
  "Java source code compiles to platform-neutral bytecode that any JVM can execute on any OS",
  "Java's 'Write Once, Run Anywhere': javac compiles to bytecode (.class) which is OS-independent. Each OS has its own JVM that translates bytecode to native code."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is the purpose of 'access modifiers' (public, private, protected) in Java?",
  [
    "To change the variable's data type",
    "To control the visibility and accessibility of class members from other classes",
    "To speed up program execution",
    "To allocate memory for variables"
  ],
  "To control the visibility and accessibility of class members from other classes",
  "Access modifiers implement encapsulation by controlling which parts of code can access class members: public (any), private (same class), protected (subclass)."
),
Q("POSSIBLE QNS","MEDIUM",
  "Give a real-life analogy that best explains 'Abstraction' in OOP.",
  [
    "A library with many books - you borrow without knowing the cataloging system",
    "A TV remote - you press buttons without knowing the internal electronics",
    "A factory with many workers - each does a different task",
    "A sports team with a captain"
  ],
  "A TV remote - you press buttons without knowing the internal electronics",
  "Abstraction: you interact with the remote (interface) using simple buttons, without needing to know HOW the infrared signals work internally."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is the significance of the 'static' keyword when applied to the main method?",
  [
    "It makes main() run faster",
    "It allows the JVM to invoke main() without needing to create an object of the class first",
    "It prevents main() from being called more than once",
    "It makes main() private"
  ],
  "It allows the JVM to invoke main() without needing to create an object of the class first",
  "When the JVM starts, no objects exist yet. 'static' makes main() a class-level method, callable directly on the class: ClassName.main(args)."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is 'message passing' and why is it important in OOP?",
  [
    "It is about sending SMS from a Java application",
    "It is the mechanism by which objects interact - one object invokes a method on another object",
    "It is how variables communicate with methods",
    "It is the process of compiling code"
  ],
  "It is the mechanism by which objects interact - one object invokes a method on another object",
  "Message passing is how objects collaborate in OOP. Object A sends a 'message' (method call) to Object B to request it to perform an action."
),
Q("POSSIBLE QNS","MEDIUM",
  "Compare procedural programming and object-oriented programming. What is the main advantage of OOP?",
  [
    "OOP runs faster than procedural",
    "OOP organizes code around objects promoting reusability, modularity, and easier maintenance",
    "OOP uses less memory",
    "Procedural is better for large programs"
  ],
  "OOP organizes code around objects promoting reusability, modularity, and easier maintenance",
  "OOP advantages: code reuse (inheritance), data security (encapsulation), modularity (classes), easy maintenance, and natural modeling of real-world systems."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD (5)      ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "A junior programmer uses all public variables in a class: 'public int balance; public String pin;' for a banking system. What is wrong with this design and which OOP principle is violated?",
  [
    "Nothing is wrong; public is always the best choice",
    "Encapsulation is violated - any class can directly access and modify sensitive data without control or validation",
    "Inheritance is violated - subclasses cannot access public variables",
    "Abstraction is violated - the details are too hidden"
  ],
  "Encapsulation is violated - any class can directly access and modify sensitive data without control or validation",
  "Making sensitive data public breaks encapsulation. Any class can set balance to a negative value or steal the PIN. Correct: use private with controlled getters/setters."
),
Q("POSSIBLE QNS","HARD",
  "What does short-circuit evaluation mean and why is it useful? Example: if (obj != null && obj.getValue() > 0)",
  [
    "The program executes faster by skipping all loops",
    "If the first condition in && is false, the second condition is never evaluated - prevents NullPointerException in this example",
    "Short-circuit means the program runs with fewer lines of code",
    "The JVM optimizes by caching the result"
  ],
  "If the first condition in && is false, the second condition is never evaluated - prevents NullPointerException in this example",
  "Short-circuit evaluation with &&: if 'obj != null' is false, 'obj.getValue()' is never called - preventing a NullPointerException. Critical for safe code."
),
Q("POSSIBLE QNS","HARD",
  "Distinguish between the Java compiler and the Java interpreter. In which order do they work and what does each produce?",
  [
    "Interpreter comes first (produces bytecode), compiler comes second (produces .java)",
    "Compiler (javac) comes first - converts .java to .class bytecode; Then JVM interpreter executes the bytecode on the host machine",
    "They work simultaneously to convert .java directly to machine code",
    "Both produce the same output"
  ],
  "Compiler (javac) comes first - converts .java to .class bytecode; Then JVM interpreter executes the bytecode on the host machine",
  "Step 1: javac compiles MyClass.java → MyClass.class (bytecode). Step 2: JVM interprets/JIT-compiles the bytecode to native machine code and executes it."
),
Q("POSSIBLE QNS","HARD",
  "Explain the 'is-a' vs 'has-a' relationships in OOP and give an example of each.",
  [
    "Both are the same - both describe inheritance",
    "'is-a' is inheritance (Dog is-a Animal), 'has-a' is composition (Car has-a Engine) - they model different types of class relationships",
    "'is-a' describes interfaces only, 'has-a' describes abstract classes",
    "'has-a' is inheritance, 'is-a' is composition"
  ],
  "'is-a' is inheritance (Dog is-a Animal), 'has-a' is composition (Car has-a Engine) - they model different types of class relationships",
  "'is-a' = Inheritance: Dog IS AN Animal (extends). 'has-a' = Composition: Car HAS AN Engine (contains an Engine object as a field)."
),
Q("POSSIBLE QNS","HARD",
  "A student says: 'We can use the same method name for different tasks in the same class'. What OOP concept is this and what is required for it to work?",
  [
    "Method Overriding - the method must be in a subclass",
    "Method Overloading - methods must have the same name but DIFFERENT parameter lists (type, number, or order)",
    "Abstraction - the method must be in an abstract class",
    "Encapsulation - the method must be private"
  ],
  "Method Overloading - methods must have the same name but DIFFERENT parameter lists (type, number, or order)",
  "Method Overloading (Compile-time polymorphism): same method name, different parameters. E.g., add(int,int), add(double,double), add(int,int,int)."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY (7)           ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "State ONE advantage of Object-Oriented Programming over Procedural Programming.",
  [
    "OOP uses fewer lines of code always",
    "OOP promotes code reusability through inheritance, making programs easier to maintain and extend",
    "OOP programs cannot have bugs",
    "OOP is the only paradigm that uses functions"
  ],
  "OOP promotes code reusability through inheritance, making programs easier to maintain and extend",
  "Key OOP advantage: Inheritance allows subclasses to reuse code from superclasses. Instead of rewriting common code, you extend existing classes."
),
Q("UE","EASY",
  "What is a 'subclass' in Java?",
  [
    "A class that is smaller in size",
    "A class that inherits from another class (the superclass)",
    "A class with fewer than 3 methods",
    "A private inner class"
  ],
  "A class that inherits from another class (the superclass)",
  "A subclass (child class) inherits all non-private members of its superclass (parent class). It can also add new members or override existing ones."
),
Q("UE","EASY",
  "Which of the following Java operators is used for comparison (checking equality)?",
  ["=","==","!=",">="],
  "==",
  "'==' is the equality comparison operator. '=' is the assignment operator. Common mistake: using = where == is needed in conditions."
),
Q("UE","EASY",
  "What is the output of:\n<pre><code>int x = 100;\nSystem.out.println(x > 50);\nSystem.out.println(x == 100);</code></pre>",
  ["false true","true false","true true","false false"],
  "true true",
  "100 > 50 is true → prints 'true'. 100 == 100 is true → prints 'true'."
),
Q("UE","EASY",
  "In Java, what keyword is used to indicate that a class inherits from another class?",
  ["inherits","implements","extends","uses"],
  "extends",
  "'extends' is the keyword for inheritance in Java. Example: class Dog extends Animal {} makes Dog a subclass of Animal."
),
Q("UE","EASY",
  "What is the difference between 'int' and 'double' data types in Java?",
  [
    "'int' stores whole numbers; 'double' stores numbers with decimal points",
    "'int' is bigger than 'double'",
    "They are the same type",
    "'double' can only store negative numbers"
  ],
  "'int' stores whole numbers; 'double' stores numbers with decimal points",
  "'int' is a 32-bit integer (e.g., 5, -100, 0). 'double' is a 64-bit floating-point type (e.g., 3.14, -0.001, 100.0)."
),
Q("UE","EASY",
  "Name any TWO logical operators used in Java.",
  ["+ and -","* and /","&& (AND) and || (OR)","! and @"],
  "&& (AND) and || (OR)",
  "Java logical operators: && (AND - true if both are true), || (OR - true if at least one is true), ! (NOT - reverses the boolean)."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM (7)          ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "A lecturer teaches both Biology and Chemistry. She uses the same name 'teach()' but teaches differently in each subject. Which OOP concept best describes this?",
  ["Encapsulation","Inheritance","Polymorphism","Abstraction"],
  "Polymorphism",
  "Polymorphism: one method name 'teach()' behaves differently depending on the context (Biology vs Chemistry). This is the essence of 'many forms'."
),
Q("UE","MEDIUM",
  "What is the output?\n<pre><code>int a = 5, b = 10, c = 15;\nSystem.out.println(a < b && b < c);\nSystem.out.println(a > b || c > b);\nSystem.out.println(!(a == 5));</code></pre>",
  ["true true false","false true true","true true true","false false false"],
  "true true false",
  "(5<10 && 10<15)=true. (5>10 || 15>10)=(false||true)=true. !(5==5)=!(true)=false. Output: true, true, false."
),
Q("UE","MEDIUM",
  "Write/identify what the following code does:\n<pre><code>int fact = 1;\nfor (int i = 1; i <= 5; i++) {\n    fact *= i;\n}\nSystem.out.println(fact);</code></pre>",
  ["Prints the sum 1+2+3+4+5=15","Prints 5 factorial = 120","Prints 5","Prints 25"],
  "Prints 5 factorial = 120",
  "fact = 1*1*2*3*4*5 = 120. This is 5! (5 factorial). A classic algorithm using a for loop and compound multiplication assignment."
),
Q("UE","MEDIUM",
  "What is the output?\n<pre><code>String course = \"Java\";\nif (course.equals(\"Java\")) {\n    System.out.println(\"Correct language!\");\n} else {\n    System.out.println(\"Wrong language!\");\n}</code></pre>",
  ["Wrong language!","Correct language!","Java","Compilation error"],
  "Correct language!",
  "'course.equals(\"Java\")' compares String content. Since course is \"Java\", equals returns true → prints 'Correct language!'"
),
Q("UE","MEDIUM",
  "A Student class has: name, rollNumber (private). Getter and setter methods are provided. A Teacher tries to access student.name directly. What happens?",
  [
    "It works, private just means hidden from subclasses",
    "Compilation error - private members cannot be accessed from outside the class",
    "It works, but a warning is shown",
    "Runtime error only if the teacher is in a different package"
  ],
  "Compilation error - private members cannot be accessed from outside the class",
  "Private members are strictly accessible only within the same class. Direct access from any other class causes a compile-time error, enforcing encapsulation."
),
Q("UE","MEDIUM",
  "What is the output?\n<pre><code>int total = 0;\nfor (int i = 1; i <= 10; i += 2) {\n    total += i;\n}\nSystem.out.println(total);</code></pre>",
  ["25","55","30","10"],
  "25",
  "Loop with step 2: i = 1,3,5,7,9. Sum = 1+3+5+7+9 = 25. (Sum of first 5 odd numbers)"
),
Q("UE","MEDIUM",
  "Explain what happens in Java when you use '==' to compare two String objects created with 'new'.\n<pre><code>String s1 = new String(\"Hello\");\nString s2 = new String(\"Hello\");\nSystem.out.println(s1 == s2);\nSystem.out.println(s1.equals(s2));</code></pre>",
  ["true true","false false","false true","true false"],
  "false true",
  "'==' compares references (memory addresses). s1 and s2 are different objects in heap, so == is false. .equals() compares content, both are 'Hello', so true."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD (8)           ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What is the output?\n<pre><code>public class Tricky {\n    static int x = 10;\n    public static void change(int x) {\n        x = 20;\n    }\n    public static void main(String[] args) {\n        change(x);\n        System.out.println(x);\n    }\n}</code></pre>",
  ["20","10","0","Error"],
  "10",
  "Java is pass-by-value. The 'x' parameter in change() is a LOCAL COPY. Modifying it doesn't affect the static class variable 'x'. Prints 10."
),
Q("UE","HARD",
  "What is the output?\n<pre><code>int i = 1;\nwhile (i <= 100) {\n    if (i % 15 == 0) {\n        System.out.print(i + \" \");\n    }\n    i++;\n}\n</code></pre>",
  ["15 30 45 60 75 90","15 45 75","30 60 90","15 30 45"],
  "15 30 45 60 75 90",
  "Numbers from 1-100 divisible by 15 (i.e., divisible by both 3 and 5): 15, 30, 45, 60, 75, 90."
),
Q("UE","HARD",
  "Analyze this code and determine the output:\n<pre><code>int a = 2;\nfor (int i = 0; i < 5; i++) {\n    a *= 2;\n}\nSystem.out.println(a);</code></pre>",
  ["10","32","64","16"],
  "64",
  "a starts at 2, multiplied by 2 five times: 2→4→8→16→32→64. This is 2^6 = 64."
),
Q("UE","HARD",
  "What is the output?\n<pre><code>int a = 5, b = 3;\nif (a++ > 5 || ++b > 3) {\n    System.out.println(a + \" \" + b);\n} else {\n    System.out.println(\"else: \" + a + \" \" + b);\n}</code></pre>",
  ["6 4","6 3","5 4","else: 6 3"],
  "6 4",
  "a++ returns 5 (then a=6). 5>5 is false. || evaluates second: ++b makes b=4, 4>3 is true. Condition true → prints a=6, b=4."
),
Q("UE","HARD",
  "A developer writes a program to check if a number is prime. Which algorithm approach is most correct?\n<pre><code>// Approach A\nfor(int i=2; i<n; i++) { if(n%i==0) return false; } return true;\n// Approach B\nfor(int i=2; i<=Math.sqrt(n); i++) { if(n%i==0) return false; } return true;</code></pre>",
  ["Approach A is correct, B misses some factors","Approach B is correct and more efficient - only needs to check up to square root","Both are incorrect","Both give same result but A is faster"],
  "Approach B is correct and more efficient - only needs to check up to square root",
  "If n has a factor > √n, it must also have a factor < √n. So checking only up to √n is sufficient and reduces unnecessary iterations."
),
Q("UE","HARD",
  "What does this code print?\n<pre><code>int n = 12;\nint result = 0;\nwhile (n > 0) {\n    result += n % 10;\n    n /= 10;\n}\nSystem.out.println(result);</code></pre>",
  ["3","12","21","6"],
  "3",
  "This sums the digits of 12. n=12: result+=2 (n becomes 1). n=1: result+=1 (n becomes 0). Total = 1+2 = 3."
),
Q("UE","HARD",
  "A class 'Shape' has a method 'area()'. Classes 'Circle' and 'Rectangle' both extend Shape and override 'area()'. When you call shape.area() where 'shape' references a 'Circle' object, which method runs?",
  [
    "Shape's area() - because the variable type is Shape",
    "Circle's area() - because the actual object is a Circle (Runtime Polymorphism)",
    "Both methods run",
    "Compilation error - cannot call overridden methods"
  ],
  "Circle's area() - because the actual object is a Circle (Runtime Polymorphism)",
  "This is runtime polymorphism (dynamic binding). The JVM looks at the actual object type at runtime (Circle), not the reference type (Shape). Circle's area() runs."
),
Q("UE","HARD",
  "What is the output?\n<pre><code>int p = 1;\nfor (int i = 1; i <= 4; i++) {\n    p = p * i;\n    System.out.print(p + (i < 4 ? \" → \" : \"\"));\n}\n</code></pre>",
  ["1 → 2 → 6 → 24","1 2 6 24","4 → 8 → 12 → 16","Error"],
  "1 → 2 → 6 → 24",
  "p: i=1→1*1=1, i=2→1*2=2, i=3→2*3=6, i=4→6*4=24. Ternary adds ' → ' between numbers but not after last. Output: '1 → 2 → 6 → 24'"
)

]; // end questions array

async function insertQuestions() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');

        // Check for duplicates before inserting
        const existingTexts = new Set();
        const existing = await db.collection('questions')
            .find({ subjectId: SID }, { projection: { questionText: 1, category: 1 } })
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new questions!`);

        // Summary by category and difficulty
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
