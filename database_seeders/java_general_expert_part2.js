/**
 * JAVA GENERAL EXPERT QUESTIONS - PART 2 (50 Questions)
 * Topics: Algorithms in Java, Data Structures, Big-O, Date/Time API, Optional
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
  "Which sorting algorithm is internally used by `Arrays.sort()` for primitive types in Java (like int, double)?",
  ["Bubble Sort", "Dual-Pivot Quicksort", "Merge Sort", "Insertion Sort"],
  "Dual-Pivot Quicksort",
  "Java relies on a highly optimized version of Quicksort (Dual-Pivot) for primitives because it offers excellent O(N log N) performance and uses minimal extra memory."
),
Q("QUIZ","EASY",
  "Which sorting algorithm is internally used by `Collections.sort()` for sorting Objects (like Strings or Custom Classes)?",
  ["Quicksort", "Timsort (a hybrid of Merge Sort and Insertion Sort)", "Selection Sort", "Radix Sort"],
  "Timsort (a hybrid of Merge Sort and Insertion Sort)",
  "Timsort guarantees stability (it doesn't swap identical elements) and worst-case O(N log N) performance, which is mandatory when sorting Objects to maintain their original relative order."
),
Q("QUIZ","EASY",
  "What is the time complexity (Big-O) of retrieving an element from an `ArrayList` by its index?",
  ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
  "O(1)",
  "Because an ArrayList is backed by an array in continuous memory, calculating the exact memory address of any index takes constant time O(1)."
),
Q("QUIZ","EASY",
  "What is the time complexity (Big-O) of retrieving an element from the middle of a `LinkedList`?",
  ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
  "O(n)",
  "Unlike arrays, linked lists require you to start at the head node and traverse (follow the pointers) one by one until you reach the middle, taking linear time O(n)."
),
Q("QUIZ","EASY",
  "In the Java 8 Date/Time API, which class represents a date and time WITH a specific time zone?",
  ["LocalDateTime", "LocalDate", "ZonedDateTime", "Instant"],
  "ZonedDateTime",
  "While `LocalDateTime` represents a date/time without geographical context, `ZonedDateTime` includes time zone rules (like DST shifts)."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is the average time complexity for adding, removing, and looking up an element in a properly functioning `HashMap`?",
  ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
  "O(1)",
  "Thanks to the hash function distributing keys evenly into buckets, most operations take constant time O(1)."
),
Q("QUIZ","MEDIUM",
  "What happens internally in a Java 8+ `HashMap` if too many keys produce the exact same HashCode, causing a massive collision in a single bucket?",
  ["It throws an Exception", "It rehashes the entire map automatically", "When a bucket gets too large (usually > 8 elements), the internal structure for that bucket transforms from a slow LinkedList into a fast Red-Black Tree, improving lookup from O(n) to O(log n).", "It deletes the oldest entry"],
  "When a bucket gets too large (usually > 8 elements), the internal structure for that bucket transforms from a slow LinkedList into a fast Red-Black Tree, improving lookup from O(n) to O(log n).",
  "This was a critical security update in Java 8 to prevent Denial of Service (DoS) attacks via Hash Collision."
),
Q("QUIZ","MEDIUM",
  "Which Java Date/Time class represents a single, specific point on the timeline in UTC (often used for timestamps in databases)?",
  ["LocalDate", "ZonedDateTime", "Instant", "Period"],
  "Instant",
  "`Instant.now()` gets the current timestamp. It is the best choice for logging and database records because it is always UTC."
),
Q("QUIZ","MEDIUM",
  "How do you safely extract a value from an `Optional<String>` while providing a fallback if it is empty?",
  ["opt.get()", "opt.orElse(\"Fallback\")", "opt.fallback(\"Fallback\")", "opt.value()"],
  "opt.orElse(\"Fallback\")",
  "Calling `.get()` on an empty Optional throws a `NoSuchElementException`. Always use `.orElse()` or `.ifPresent()`."
),
Q("QUIZ","MEDIUM",
  "What is a 'Binary Search' algorithm?",
  ["A search that converts numbers to binary", "An O(log n) algorithm that repeatedly divides a SORTED array in half to locate a target value", "An O(n) search that checks every element", "A search used only for HashMaps"],
  "An O(log n) algorithm that repeatedly divides a SORTED array in half to locate a target value",
  "Java provides this via `Arrays.binarySearch(array, key)`. Note: The array MUST be sorted first, otherwise the result is unpredictable."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "In Big-O notation, how would you classify an algorithm that contains a loop inside another loop (nested loops) iterating over the same dataset?",
  ["O(1)", "O(n)", "O(log n)", "O(n^2) - Quadratic Time"],
  "O(n^2) - Quadratic Time",
  "For every 1 element in the outer loop, the inner loop processes N elements. N * N = N^2. This scales very poorly for large datasets."
),
Q("QUIZ","HARD",
  "What is the difference between `Optional.orElse()` and `Optional.orElseGet()`?",
  ["No difference", "`orElse()` is evaluated immediately whether the Optional is empty or not. `orElseGet()` takes a Supplier (lambda) and is evaluated LAZILY, only running the code if the Optional is actually empty.", "`orElseGet()` throws an exception", "`orElse()` is for Strings, `orElseGet()` is for Objects"],
  "`orElse()` is evaluated immediately whether the Optional is empty or not. `orElseGet()` takes a Supplier (lambda) and is evaluated LAZILY, only running the code if the Optional is actually empty.",
  "If your fallback involves an expensive database call (e.g. `opt.orElse(expensiveDBQuery())`), you MUST use `orElseGet(() -> expensiveDBQuery())` to prevent the query from running needlessly when the Optional has data."
),
Q("QUIZ","HARD",
  "What is the time complexity of building a `PriorityQueue` (Min-Heap) from an unsorted array of N elements using the standard heapify process?",
  ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
  "O(n)",
  "While inserting elements one by one takes O(N log N), the bottom-up \"Heapify\" algorithm (used internally when you pass a Collection to the PriorityQueue constructor) can build the entire heap in O(N) time."
),
Q("QUIZ","HARD",
  "What is the 'Space Complexity' of the standard Recursive Merge Sort algorithm?",
  ["O(1) - Constant", "O(log n)", "O(n) - Linear", "O(n^2)"],
  "O(n) - Linear",
  "Merge sort requires creating temporary arrays to hold the divided halves during the merging process, requiring extra RAM proportional to the size of the input."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which interface does a class implement to define a 'Stack' (LIFO) or 'Queue' (FIFO) using modern Java?",
  ["List", "Deque (Double Ended Queue)", "Set", "Map"],
  "Deque (Double Ended Queue)",
  "The `Deque` interface (often implemented by `ArrayDeque`) is the recommended replacement for the old `Stack` class and handles both LIFO and FIFO seamlessly."
),
Q("EXERCISE","EASY",
  "If you want to measure the exact elapsed execution time of a method in modern Java, what should you use?",
  ["System.currentTimeMillis()", "System.nanoTime()", "Date.getTime()", "Clock.now()"],
  "System.nanoTime()",
  "`System.nanoTime()` is designed specifically for high-precision elapsed time measurement. `currentTimeMillis()` is tied to the system clock, which can be modified by the OS during the run (like a time sync), throwing off your measurements."
),
Q("EXERCISE","EASY",
  "What is the new standard API package for Dates and Times introduced in Java 8?",
  ["java.date", "java.util", "java.time", "java.calendar"],
  "java.time",
  "The `java.time` package (JSR-310) replaced the incredibly flawed, mutable, and non-thread-safe `java.util.Date` and `java.util.Calendar` classes."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is the difference between `Period` and `Duration` in the Java Time API?",
  ["They are exactly the same", "`Period` is used for Date-based amounts (years, months, days). `Duration` is used for Time-based amounts (hours, minutes, seconds, nanoseconds).", "`Period` is for historical dates", "`Duration` is for future dates"],
  "`Period` is used for Date-based amounts (years, months, days). `Duration` is used for Time-based amounts (hours, minutes, seconds, nanoseconds).",
  "If you want to calculate how many days are between two dates, use `Period.between(date1, date2)`."
),
Q("EXERCISE","MEDIUM",
  "Which data structure is the best choice if you need to perform frequent lookups to check if an element exists, but you do not care about the order of the elements?",
  ["ArrayList", "LinkedList", "HashSet", "TreeSet"],
  "HashSet",
  "A `HashSet` provides O(1) constant time for `contains()` checks, making it massively faster than an `ArrayList` which takes O(n) to scan the array."
),
Q("EXERCISE","MEDIUM",
  "What does `Optional.map(Function mapper)` do?",
  ["It converts the Optional to a HashMap", "If a value is present, it applies the mapping function to it and returns an Optional describing the result. If empty, it returns an empty Optional.", "It throws an exception", "It modifies the original value"],
  "If a value is present, it applies the mapping function to it and returns an Optional describing the result. If empty, it returns an empty Optional.",
  "E.g., `Optional<String> upper = optName.map(String::toUpperCase);` safely transforms the value without risking a NullPointerException."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "How can you convert the legacy `java.util.Date` to the modern `java.time.LocalDate`?",
  ["By casting: (LocalDate) date", "By calling `date.toLocalDate()`", "By converting the Date to an `Instant`, setting the TimeZone (ZoneId), and converting it to a LocalDate (e.g. `date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()`)", "It is impossible"],
  "By converting the Date to an `Instant`, setting the TimeZone (ZoneId), and converting it to a LocalDate (e.g. `date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate()`)",
  "Because `java.util.Date` is secretly just a UTC timestamp (not a real 'Date'), it must be converted via `Instant`."
),
Q("EXERCISE","HARD",
  "What is an 'AVL Tree' and how does it relate to Java?",
  ["It is an Audio-Video Library", "It is a type of self-balancing binary search tree. Java's `TreeMap` and `TreeSet` use a similar structure called a Red-Black Tree to ensure O(log n) performance.", "It is a memory management tree", "It is a network topology tree"],
  "It is a type of self-balancing binary search tree. Java's `TreeMap` and `TreeSet` use a similar structure called a Red-Black Tree to ensure O(log n) performance.",
  "Without self-balancing, a binary search tree could degenerate into a straight line (a Linked List), ruining its performance to O(n)."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which Java framework is currently the absolute industry standard for building enterprise web applications, REST APIs, and microservices?",
  ["Struts", "JavaServer Faces (JSF)", "Spring Boot", "Hibernate"],
  "Spring Boot",
  "Spring Boot drastically simplifies the Java EE (Jakarta EE) ecosystem by providing auto-configuration, embedded servers (like Tomcat), and production-ready defaults."
),
Q("CAT 1","EASY",
  "In web development, what does an API (Application Programming Interface) do?",
  ["It designs the user interface", "It acts as a software intermediary that allows two applications to talk to each other (e.g., a mobile app requesting data from a Java server)", "It compiles Java code", "It encrypts the database"],
  "It acts as a software intermediary that allows two applications to talk to each other (e.g., a mobile app requesting data from a Java server)",
  "In Java, APIs are typically built using Spring Boot REST Controllers, returning data in JSON format."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "What is Hibernate / JPA in the Java ecosystem?",
  ["A framework to put threads to sleep", "An Object-Relational Mapping (ORM) framework that maps Java Objects to Database Tables, automatically writing the SQL queries for you", "A UI drawing tool", "A networking framework"],
  "An Object-Relational Mapping (ORM) framework that maps Java Objects to Database Tables, automatically writing the SQL queries for you",
  "Instead of writing `SELECT * FROM User`, you simply call `entityManager.find(User.class, 1)` and Hibernate generates the SQL, executes it, and returns the Java Object."
),
Q("CAT 1","MEDIUM",
  "What is Maven in Java development?",
  ["A compiler", "A build automation and dependency management tool. It automatically downloads required libraries (.jar files) from the internet and builds the project based on a `pom.xml` file.", "A database server", "An operating system"],
  "A build automation and dependency management tool. It automatically downloads required libraries (.jar files) from the internet and builds the project based on a `pom.xml` file.",
  "Maven completely replaced the old process of manually downloading `.jar` files and trying to link them in IDEs."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is an 'N+1 Query Problem' in Hibernate/JPA?",
  ["A syntax error in SQL", "A massive performance flaw where an ORM framework executes 1 query to fetch N parent records, and then N separate queries to fetch the children of each parent, crippling the database", "A multithreading bug", "An out of memory error"],
  "A massive performance flaw where an ORM framework executes 1 query to fetch N parent records, and then N separate queries to fetch the children of each parent, crippling the database",
  "It is usually solved by writing an explicit `JOIN FETCH` query in JPA to fetch everything in a single SQL query."
),
Q("CAT 1","HARD",
  "What is 'Inversion of Control' (IoC) in the Spring Framework?",
  ["Taking control of the database", "A principle where the framework takes control of the program flow and object creation. Instead of your class using `new` to create dependencies, Spring injects them automatically at runtime.", "A way to reverse an array", "Inverting a boolean variable"],
  "A principle where the framework takes control of the program flow and object creation. Instead of your class using `new` to create dependencies, Spring injects them automatically at runtime.",
  "This is the core engine of Spring (The IoC Container). You mark a class with `@Service` or `@Component`, and Spring manages its entire lifecycle."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "What format is overwhelmingly used by modern Java REST APIs to transmit data to web/mobile clients?",
  ["XML", "JSON (JavaScript Object Notation)", "CSV", "Binary"],
  "JSON (JavaScript Object Notation)",
  "JSON is lightweight, readable, and perfectly compatible with front-end frameworks like React, Angular, and Flutter."
),
Q("POSSIBLE QNS","EASY",
  "Which HTTP method is used in a REST API to CREATE a completely new record in the database?",
  ["GET", "PUT", "POST", "DELETE"],
  "POST",
  "Standard REST conventions: POST (Create), GET (Read), PUT/PATCH (Update), DELETE (Delete)."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is a `NullPointerException` (NPE) and why is it dangerous in production?",
  ["It's a warning", "It's an unchecked `RuntimeException` that immediately crashes the thread if a variable is `null` when a method is called on it. It causes massive downtime if not handled.", "It slows down the server", "It deletes database records"],
  "It's an unchecked `RuntimeException` that immediately crashes the thread if a variable is `null` when a method is called on it. It causes massive downtime if not handled.",
  "The vast majority of server crashes in Java are caused by NPEs originating from unexpected data. This is why Java introduced `Optional`."
),
Q("POSSIBLE QNS","MEDIUM",
  "How does a `ConcurrentHashMap` achieve higher performance in multithreaded environments compared to a standard `Hashtable`?",
  ["By not locking anything", "Instead of locking the entire Map on every operation, it locks only a specific segment (or bucket) of the map. This allows multiple threads to read and write to different parts of the map simultaneously.", "By using a Database", "By using a thread pool"],
  "Instead of locking the entire Map on every operation, it locks only a specific segment (or bucket) of the map. This allows multiple threads to read and write to different parts of the map simultaneously.",
  "This 'Lock Striping' technique makes it the industry standard for high-performance concurrent caching."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is the 'Flyweight Pattern'?",
  ["A pattern for small UI elements", "A structural pattern that minimizes memory usage by sharing as much data as possible with similar objects, instead of creating redundant copies of identical data", "A pattern for sorting algorithms", "A pattern for networking"],
  "A structural pattern that minimizes memory usage by sharing as much data as possible with similar objects, instead of creating redundant copies of identical data",
  "The Java `String Pool` and the `Integer Cache` (-128 to 127) are perfect examples of the Flyweight Pattern implemented directly in the core Java JVM."
),
Q("POSSIBLE QNS","HARD",
  "What is 'Garbage Collection Roots' (GC Roots)?",
  ["The source code files", "The starting points the Garbage Collector uses to trace object references (e.g., active thread stacks, static variables). Any object that cannot be traced back to a GC Root is considered dead and is deleted.", "The root folder of the Java installation", "The database root user"],
  "The starting points the Garbage Collector uses to trace object references (e.g., active thread stacks, static variables). Any object that cannot be traced back to a GC Root is considered dead and is deleted.",
  "This Mark-and-Sweep algorithm prevents 'Islands of Isolation' from surviving."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Which interface provides the `.compareTo()` method to define how objects of a class should be sorted by default?",
  ["Comparable", "Comparator", "Sorter", "Iterator"],
  "Comparable",
  "You implement `Comparable<T>` inside the class itself to define its 'Natural Ordering'."
),
Q("UE","EASY",
  "What is the output of `System.out.println(1 + 2 + \"3\");`?",
  ["123", "6", "33", "Compile Error"],
  "33",
  "Java evaluates left to right. 1 + 2 equals 3 (integer addition). Then 3 + \"3\" equals \"33\" (string concatenation)."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "Trace the output:\n<pre><code>int x = 10;\nint y = (x > 5) ? (x < 20 ? 1 : 2) : 3;\nSystem.out.println(y);</code></pre>",
  ["1", "2", "3", "Compile Error"],
  "1",
  "This is a nested Ternary Operator. (x > 5) is true, so it evaluates the first block (x < 20 ? 1 : 2). Since 10 is < 20, it evaluates to 1."
),
Q("UE","MEDIUM",
  "What does it mean that Java is a 'Statically Typed' language?",
  ["The code is completely static", "Every variable's data type must be explicitly declared and is strictly checked at compile time, preventing type errors before the program even runs", "It doesn't support OOP", "The code cannot change"],
  "Every variable's data type must be explicitly declared and is strictly checked at compile time, preventing type errors before the program even runs",
  "Languages like Python or JavaScript are 'Dynamically Typed', where variables can change types at runtime."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "Analyze this code:\n<pre><code>try {\n    return 1;\n} finally {\n    return 2;\n}</code></pre>\nWhat does the method return?",
  ["1", "2", "Compile Error", "Runtime Exception"],
  "2",
  "The `finally` block ALWAYS executes before a `return` in a try block resolves. If the `finally` block also contains a `return`, it completely overwrites the previous return value."
),
Q("UE","HARD",
  "What is a `CyclicBarrier` in Java Concurrency?",
  ["A barrier to stop garbage collection", "A synchronization aid that allows a set of threads to all wait for each other to reach a common barrier point before any of them can continue", "A way to loop arrays", "A lock on the database"],
  "A synchronization aid that allows a set of threads to all wait for each other to reach a common barrier point before any of them can continue",
  "It is highly useful in parallel algorithms where a task is divided into multiple threads, and the next phase of the algorithm cannot start until ALL threads finish the first phase."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new GENERAL EXPERT (Part 2) questions!`);

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
