/**
 * JAVA UNIT 5 - ADVANCED (JAVA 8+) - HANDCRAFTED QUESTIONS (PART 3)
 * Based on: Unit 5 (Lambda Expressions, Streams API, Functional Interfaces, Optional)
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
  "What is a Lambda Expression in Java?",
  ["A way to connect to a database", "A short block of code which takes in parameters and returns a value, providing a clear and concise way to represent a method interface using an expression", "A new primitive data type", "A type of exception"],
  "A short block of code which takes in parameters and returns a value, providing a clear and concise way to represent a method interface using an expression",
  "Introduced in Java 8, lambdas (`(params) -> { body }`) are essentially anonymous functions that help write cleaner, more functional code."
),
Q("QUIZ","EASY",
  "What is a 'Functional Interface'?",
  ["An interface with multiple abstract methods", "An interface with exactly ONE abstract method", "An interface that cannot be implemented", "An interface used only for mathematics"],
  "An interface with exactly ONE abstract method",
  "Lambdas can only be used to implement functional interfaces. The interface can have multiple `default` or `static` methods, but only one `abstract` method."
),
Q("QUIZ","EASY",
  "Which symbol is known as the 'arrow operator' used to construct lambda expressions?",
  ["=>", "->", "::", "~>"],
  "->",
  "The arrow operator `->` separates the parameters from the implementation body in a lambda expression."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is the Java Streams API?",
  ["A library for reading text files (InputStream/OutputStream)", "A sequence of elements supporting sequential and parallel aggregate operations (like filter, map, reduce) to process collections of objects", "A tool for playing videos in Java", "A framework for multithreading"],
  "A sequence of elements supporting sequential and parallel aggregate operations (like filter, map, reduce) to process collections of objects",
  "Note: The `java.util.stream` API (Java 8+) is completely different from `java.io` (Input/Output streams). It is used to process data structures declaratively."
),
Q("QUIZ","MEDIUM",
  "What does the `filter()` method do in a Java Stream?",
  ["Removes all elements from a collection", "Returns a stream consisting of the elements that match the given predicate (condition)", "Transforms elements into another type", "Sorts the elements"],
  "Returns a stream consisting of the elements that match the given predicate (condition)",
  "For example, `list.stream().filter(n -> n > 10)` keeps only the numbers strictly greater than 10, discarding the rest."
),
Q("QUIZ","MEDIUM",
  "What is the `java.util.Optional` class used for?",
  ["To make a variable optional for compilation", "To provide a container object which may or may not contain a non-null value, helping to prevent NullPointerExceptions", "To allow multiple return types from a method", "To encrypt passwords"],
  "To provide a container object which may or may not contain a non-null value, helping to prevent NullPointerExceptions",
  "Instead of returning `null`, a method can return an `Optional<T>`. The caller then explicitly checks `.isPresent()` before retrieving the value."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is the difference between Intermediate and Terminal operations in a Stream?",
  ["They are the same thing", "Intermediate operations (e.g., `filter`) return a new Stream and are lazy. Terminal operations (e.g., `collect`, `forEach`) produce a non-stream result and trigger the actual processing of the pipeline.", "Terminal operations return a Stream, Intermediate operations return void", "Intermediate operations are used for Arrays, Terminal for Lists"],
  "Intermediate operations (e.g., `filter`) return a new Stream and are lazy. Terminal operations (e.g., `collect`, `forEach`) produce a non-stream result and trigger the actual processing of the pipeline.",
  "Because streams are lazy, intermediate operations do nothing until a terminal operation is invoked."
),
Q("QUIZ","HARD",
  "What is a 'Method Reference' (`::`) in Java?",
  ["A pointer to a memory address", "A shorthand syntax for a lambda expression that simply calls an existing method by name", "A way to override a method", "A new way to write comments"],
  "A shorthand syntax for a lambda expression that simply calls an existing method by name",
  "Instead of writing `x -> System.out.println(x)`, you can write `System.out::println`."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which annotation ensures that an interface meets the requirements of a functional interface (having only one abstract method)?",
  ["@Override", "@FunctionalInterface", "@SingleMethod", "@Lambda"],
  "@FunctionalInterface",
  "Placing `@FunctionalInterface` above an interface tells the compiler to throw an error if a second abstract method is accidentally added."
),
Q("EXERCISE","EASY",
  "Write the lambda expression equivalent for: `public int add(int a, int b) { return a + b; }`",
  ["(a, b) -> a + b", "a, b => a + b", "int a, int b -> return a + b", "(a) (b) -> a + b"],
  "(a, b) -> a + b",
  "The curly braces and `return` keyword can be omitted if the body is a single expression."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What does the `map()` operation do in a Stream?",
  ["Creates a HashMap", "Filters elements", "Transforms each element into another object/value using the provided function", "Combines all elements into one"],
  "Transforms each element into another object/value using the provided function",
  "For example, `stream.map(String::toUpperCase)` takes a stream of strings and transforms every single string into its uppercase version."
),
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>List&lt;String&gt; names = Arrays.asList(\"A\", \"B\", \"C\");\nnames.forEach(System.out::print);</code></pre>",
  ["ABC", "A, B, C", "Compile Error", "Exception"],
  "ABC",
  "The `forEach` method (added in Java 8 to `Iterable`) takes a Consumer lambda. `System.out::print` consumes and prints each element sequentially."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "Can a Java Stream be reused after a terminal operation has been called on it?",
  ["Yes, you can reuse it infinitely", "No, a stream is consumed and closed once a terminal operation is executed. Trying to reuse it throws an IllegalStateException.", "Yes, but you must reset it first", "Only if it is a parallel stream"],
  "No, a stream is consumed and closed once a terminal operation is executed. Trying to reuse it throws an IllegalStateException.",
  "Streams are single-use pipelines. Once data flows through and the terminal operation collects/reduces it, the stream is dead. You must generate a new stream from the source collection."
),
Q("EXERCISE","HARD",
  "What does `reduce()` do in a Stream?",
  ["Deletes elements", "Reduces the size of the collection", "Performs a reduction on the elements of the stream, combining them into a single summary result (e.g., sum, max, or string concatenation)", "Shrinks the memory footprint"],
  "Performs a reduction on the elements of the stream, combining them into a single summary result (e.g., sum, max, or string concatenation)",
  "For example, `stream.reduce(0, (a, b) -> a + b)` sums up all the numbers in the stream."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which interface from `java.util.function` takes one argument and returns a boolean? (Often used for filtering)",
  ["Consumer", "Supplier", "Function", "Predicate"],
  "Predicate",
  "A `Predicate<T>` represents a boolean-valued function of one argument. E.g., `Predicate<Integer> isEven = n -> n % 2 == 0;`"
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "Which interface takes NO arguments but returns a value? (Often used for lazy generation of values)",
  ["Consumer", "Supplier", "Function", "Predicate"],
  "Supplier",
  "A `Supplier<T>` has the method `T get()`. It supplies a value without taking any input. E.g., `Supplier<Double> randomNum = () -> Math.random();`"
),
Q("CAT 1","MEDIUM",
  "Which interface takes one argument and returns NO value (void)? (Often used for printing or modifying state)",
  ["Consumer", "Supplier", "Function", "Predicate"],
  "Consumer",
  "A `Consumer<T>` has the method `void accept(T t)`. E.g., `Consumer<String> printer = s -> System.out.println(s);`"
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is the difference between `map()` and `flatMap()` in the Streams API?",
  ["There is no difference", "`map()` transforms a single element into another single element. `flatMap()` transforms a single element into a STREAM of elements, and then 'flattens' all those streams into one single continuous stream.", "`flatMap()` is faster", "`map()` is for Maps, `flatMap()` is for Lists"],
  "`map()` transforms a single element into another single element. `flatMap()` transforms a single element into a STREAM of elements, and then 'flattens' all those streams into one single continuous stream.",
  "`flatMap()` is used to flatten nested structures (like a List of Lists) into a single flat List."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "How do you execute a stream operations in parallel across multiple CPU cores?",
  ["stream.parallel() or list.parallelStream()", "stream.threads()", "stream.multi()", "It happens automatically"],
  "stream.parallel() or list.parallelStream()",
  "Invoking `.parallelStream()` on a collection splits the work among multiple threads using the Fork/Join framework, which can drastically speed up processing for large datasets."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What does `collect(Collectors.toList())` do at the end of a stream pipeline?",
  ["It prints the list", "It accumulates the processed stream elements and packs them into a brand new `List` object", "It deletes the stream", "It throws an exception"],
  "It accumulates the processed stream elements and packs them into a brand new `List` object",
  "`collect()` is a terminal operation that repackages the stream results back into a standard Collection."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "Analyze this code:\n<pre><code>Optional&lt;String&gt; opt = Optional.ofNullable(null);\nSystem.out.println(opt.orElse(\"Default\"));</code></pre>",
  ["null", "Default", "NullPointerException", "Compile Error"],
  "Default",
  "`Optional.ofNullable()` safely wraps a null value. `.orElse(\"Default\")` provides a fallback value if the Optional is empty, preventing a crash and returning \"Default\"."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "True or False: Interfaces in Java 8 can have method bodies.",
  ["True", "False", "Only abstract methods", "Only in abstract classes"],
  "True",
  "Before Java 8, interfaces could only have abstract methods. Java 8 introduced `default` and `static` methods in interfaces, allowing them to contain concrete method bodies."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "Why were `default` methods introduced to Interfaces in Java 8?",
  ["To allow multiple inheritance of classes", "To allow backward compatibility. You can add new methods to an existing interface without breaking all the old classes that implement it", "To replace abstract classes", "To make Java faster"],
  "To allow backward compatibility. You can add new methods to an existing interface without breaking all the old classes that implement it",
  "For example, Java 8 added `forEach` to the `Iterable` interface. Without making it `default`, every single Java program worldwide that implemented a custom List would have broken."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What happens if a class implements two interfaces, and BOTH interfaces have a `default` method with the exact same name and signature?",
  ["The code compiles normally, using the first interface's method", "The JVM crashes", "Compile Error: The class inherits unrelated defaults, causing a Diamond Problem. The class MUST override the method to resolve the ambiguity.", "The methods are merged"],
  "Compile Error: The class inherits unrelated defaults, causing a Diamond Problem. The class MUST override the method to resolve the ambiguity.",
  "The compiler forces you to provide an overridden implementation in your class. You can choose to call one of the specific interface defaults using `InterfaceName.super.methodName()`."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 5 (Part 3) questions!`);

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
