/**
 * JAVA UNITS 5, 6, 7 EXPANSION PACK - DEEP DIVE QUESTIONS
 * Based on: Advanced Multithreading, File NIO, JDBC Batch, Graphics2D, JVM Internals
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

// ============================================================================
// UNIT 5 EXPANSION: MULTITHREADING & FILE NIO
// ============================================================================

// ╔══════════════════════════════════╗
// ║          QUIZ - EASY             ║
// ╚══════════════════════════════════╝
Q("QUIZ","EASY",
  "What is the new I/O API introduced in Java 4 (and updated in Java 7) that provides faster file operations than `java.io`?",
  ["java.fastio", "java.nio (New I/O)", "java.stream", "java.file"],
  "java.nio (New I/O)",
  "The `java.nio` package uses Buffers and Channels for high-performance, non-blocking I/O operations."
),
Q("QUIZ","EASY",
  "In Java Multithreading, what is a `Runnable`?",
  ["A thread that is currently running", "An interface representing a task that can be executed by a thread", "A method inside the Thread class", "A state in the thread lifecycle"],
  "An interface representing a task that can be executed by a thread",
  "`Runnable` has a single method, `run()`, which holds the code to be executed concurrently."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "How does a `ReentrantLock` differ from a standard `synchronized` block?",
  ["They are identical in every way", "`ReentrantLock` provides advanced features like testing if a lock is available (`tryLock()`), interruptible lock waiting, and fairness policies", "`synchronized` is faster in modern Java", "`ReentrantLock` cannot be used in loops"],
  "`ReentrantLock` provides advanced features like testing if a lock is available (`tryLock()`), interruptible lock waiting, and fairness policies",
  "Found in `java.util.concurrent.locks`, it allows much finer control over thread locking than the basic `synchronized` keyword."
),
Q("QUIZ","MEDIUM",
  "What does `Files.readAllLines(Path path)` do in Java NIO?",
  ["Reads only the first line", "Reads all lines from a file into a `List<String>`, automatically opening and closing the file", "Reads the file into a single massive String", "Reads the file byte by byte"],
  "Reads all lines from a file into a `List<String>`, automatically opening and closing the file",
  "This is a massive convenience method introduced in Java 8 for quickly reading entire text files without manually managing streams."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is the difference between `submit()` and `execute()` in an `ExecutorService`?",
  ["There is no difference", "`execute()` takes a Runnable and returns void; `submit()` takes a Runnable or Callable and returns a `Future` object to track the result or exceptions", "`submit()` is for UI threads", "`execute()` runs immediately, `submit()` delays execution"],
  "`execute()` takes a Runnable and returns void; `submit()` takes a Runnable or Callable and returns a `Future` object to track the result or exceptions",
  "Using `submit()` is generally preferred because it allows you to catch exceptions that occur inside the thread via `future.get()`."
),
Q("QUIZ","HARD",
  "In Java memory architecture, what is the 'Young Generation'?",
  ["A space for storing new classes", "A portion of the Heap where newly created objects are allocated. It is garbage-collected frequently using Minor GC.", "A thread pool for new threads", "The Metaspace"],
  "A portion of the Heap where newly created objects are allocated. It is garbage-collected frequently using Minor GC.",
  "Most objects die young. The Young Gen is optimized to quickly clean up short-lived objects. Survivors are eventually moved to the Old Generation."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which interface is heavily used in the `java.nio.file` package to represent a file or directory location?",
  ["File", "Path", "Directory", "Location"],
  "Path",
  "The `Path` interface (e.g., `Paths.get(\"data.txt\")`) is the modern replacement for the old `java.io.File` class."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What does the `ThreadLocalRandom` class provide?",
  ["A random number generator that works across networks", "A random number generator isolated to the current thread, avoiding the synchronization overhead and contention of `Math.random()` in multithreaded apps", "A predictable random sequence", "A random generator for passwords"],
  "A random number generator isolated to the current thread, avoiding the synchronization overhead and contention of `Math.random()` in multithreaded apps",
  "In highly concurrent applications, `ThreadLocalRandom.current().nextInt()` is significantly faster than using a shared `Random` instance."
),
Q("EXERCISE","MEDIUM",
  "What is a `RandomAccessFile`?",
  ["A file that can only be read by random threads", "A class that allows reading and writing at any specific position in a file (using a file pointer), rather than sequentially from beginning to end", "An encrypted file", "A temporary file"],
  "A class that allows reading and writing at any specific position in a file (using a file pointer), rather than sequentially from beginning to end",
  "You can use `file.seek(position)` to jump straight to byte 5000 and overwrite it."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What happens if a thread calls `Future.get()` on a task that hasn't finished yet?",
  ["It returns null", "It throws an Exception immediately", "The calling thread blocks (pauses) and waits until the task finishes and the result is available", "It returns a proxy object"],
  "The calling thread blocks (pauses) and waits until the task finishes and the result is available",
  "This makes `Future` a powerful synchronization tool, allowing the main thread to dispatch work and then wait for the results at exactly the right moment."
),
Q("EXERCISE","HARD",
  "What is the difference between `Collections.synchronizedList()` and `CopyOnWriteArrayList`?",
  ["There is no difference", "`synchronizedList` locks the entire list for every operation (slow). `CopyOnWriteArrayList` locks nothing for reads, but makes a brand new copy of the underlying array for every write operation (extremely fast for read-heavy scenarios).", "`CopyOnWriteArrayList` is deprecated", "`synchronizedList` does not allow nulls"],
  "`synchronizedList` locks the entire list for every operation (slow). `CopyOnWriteArrayList` locks nothing for reads, but makes a brand new copy of the underlying array for every write operation (extremely fast for read-heavy scenarios).",
  "`CopyOnWriteArrayList` is part of `java.util.concurrent` and prevents `ConcurrentModificationException` entirely."
),


// ============================================================================
// UNIT 6 EXPANSION: JDBC DEEP DIVE & GUI GRAPHICS
// ============================================================================

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "In Swing, which method is used to force a component to repaint itself immediately?",
  ["draw()", "refresh()", "repaint()", "updateGUI()"],
  "repaint()",
  "Calling `repaint()` safely tells the Event Dispatch Thread to schedule a redraw of the component as soon as possible."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "What is JDBC Batch Processing?",
  ["Sending emails in bulk", "Grouping multiple SQL statements (like 1000 INSERTs) into a single 'batch' and sending them to the database in one network trip, massively improving performance", "A way to backup the database", "Executing queries on multiple threads"],
  "Grouping multiple SQL statements (like 1000 INSERTs) into a single 'batch' and sending them to the database in one network trip, massively improving performance",
  "You use `pstmt.addBatch()` in a loop, followed by `pstmt.executeBatch()`."
),
Q("CAT 1","MEDIUM",
  "In Java 2D Graphics, what is `Graphics2D`?",
  ["A 3D rendering engine", "A subclass of `Graphics` that provides advanced 2D rendering capabilities like drawing shapes with anti-aliasing, gradients, and custom strokes", "A UI library for Android", "An external library"],
  "A subclass of `Graphics` that provides advanced 2D rendering capabilities like drawing shapes with anti-aliasing, gradients, and custom strokes",
  "Inside `paintComponent(Graphics g)`, you typically cast `g` to `Graphics2D` (e.g., `Graphics2D g2d = (Graphics2D) g;`) to unlock these features."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is a JDBC `Savepoint`?",
  ["A backup of the database file", "A marker within a transaction that allows you to rollback part of the transaction without rolling back the entire thing", "A method to save queries to the hard drive", "A commit automatically triggered by the database"],
  "A marker within a transaction that allows you to rollback part of the transaction without rolling back the entire thing",
  "If you do step A, set a savepoint, do step B, and step B fails, you can `conn.rollback(savepoint)` to undo B while keeping A intact."
),
Q("CAT 1","HARD",
  "Why is it extremely dangerous to perform database queries or `Thread.sleep()` directly inside an `ActionListener`'s `actionPerformed` method?",
  ["Because listeners cannot access variables", "Because `actionPerformed` runs on the Event Dispatch Thread (EDT). Blocking this thread will completely freeze the entire GUI until the query or sleep finishes.", "Because it causes SQL syntax errors", "Because the listener will execute twice"],
  "Because `actionPerformed` runs on the Event Dispatch Thread (EDT). Blocking this thread will completely freeze the entire GUI until the query or sleep finishes.",
  "Long-running tasks should be handed off to a separate worker thread (e.g., using `SwingWorker`), allowing the EDT to continue redrawing the screen and processing clicks."
),


// ============================================================================
// UNIT 7 EXPANSION: NETWORKING UDP, ADVANCED COLLECTIONS, GC
// ============================================================================

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "Which Java class is used to send and receive UDP packets?",
  ["Socket", "UdpSocket", "DatagramSocket", "PacketSocket"],
  "DatagramSocket",
  "Unlike TCP's `Socket`, UDP uses `DatagramSocket` to send `DatagramPacket` objects without establishing a permanent connection."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is an `EnumSet`?",
  ["A standard HashSet that contains Enums", "A highly optimized, high-performance Set implementation specifically designed for use with enum types, internally represented as a bit-vector", "A set of Strings", "An array of Enums"],
  "A highly optimized, high-performance Set implementation specifically designed for use with enum types, internally represented as a bit-vector",
  "Because enums are predefined, `EnumSet` uses a single 64-bit `long` to represent up to 64 enum values, making operations like `add()` and `contains()` blistering fast."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is the main advantage of G1GC (Garbage First Garbage Collector) over older collectors like CMS?",
  ["It doesn't delete anything", "It splits the heap into equal-sized regions and prioritizes sweeping the regions with the most garbage first, providing predictable pause times and reducing memory fragmentation", "It is written in C++", "It runs on the GPU"],
  "It splits the heap into equal-sized regions and prioritizes sweeping the regions with the most garbage first, providing predictable pause times and reducing memory fragmentation",
  "G1GC is the default garbage collector in Java 9 and later, designed for applications with large heaps and strict response-time requirements."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is Java Multicasting?",
  ["Running multiple threads at once", "A networking concept where a UDP `MulticastSocket` sends a single packet to a specific IP address (224.0.0.0 to 239.255.255.255), and routers deliver copies of it to multiple subscribers simultaneously", "Sending emails to multiple people", "A database replication technique"],
  "A networking concept where a UDP `MulticastSocket` sends a single packet to a specific IP address (224.0.0.0 to 239.255.255.255), and routers deliver copies of it to multiple subscribers simultaneously",
  "This is highly efficient for things like streaming live stock market data or IPTV, as the server only sends the data once, regardless of how many thousands of clients are listening."
),
Q("POSSIBLE QNS","HARD",
  "Analyze this code: `ResultSet rs = stmt.executeQuery(query); rs.absolute(5);` What does `absolute(5)` do?",
  ["Reads 5 rows", "Moves the cursor to exactly the 5th row in the ResultSet. This requires a scrollable ResultSet.", "Updates the 5th row", "Deletes the first 5 rows"],
  "Moves the cursor to exactly the 5th row in the ResultSet. This requires a scrollable ResultSet.",
  "If the ResultSet was created as `TYPE_FORWARD_ONLY` (the default), calling `absolute(5)` will throw an `SQLException`."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Which interface allows you to define a method that takes a variable number of arguments (e.g., `void print(String... args)`)?",
  ["Varargs", "VarArgs", "MultiArgs", "It is not an interface, it is a syntax feature called Varargs"],
  "It is not an interface, it is a syntax feature called Varargs",
  "The syntax `Type... variableName` allows you to pass zero or multiple arguments to a method. Internally, Java treats it as an array."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is 'Connection Leak' in a database application?",
  ["When hackers access the database", "When an application opens database connections but fails to close them (e.g., missing a `finally` block), eventually exhausting the database's connection pool and causing it to reject new requests", "When data is lost during transfer", "When passwords are leaked in the URL"],
  "When an application opens database connections but fails to close them (e.g., missing a `finally` block), eventually exhausting the database's connection pool and causing it to reject new requests",
  "This is one of the most common causes of production server crashes in Java applications."
),
Q("UE","MEDIUM",
  "How can you convert an array `String[] arr = {\"A\", \"B\"};` into a List?",
  ["arr.toList()", "Arrays.asList(arr)", "new List(arr)", "Collections.toList(arr)"],
  "Arrays.asList(arr)",
  "`Arrays.asList()` returns a fixed-size list backed by the specified array. Note: You cannot `add()` or `remove()` elements from this list, as it is tied directly to the array's size."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What is a 'Memory Barrier' (or Memory Fence) in the context of the `volatile` keyword?",
  ["A firewall blocking hackers", "A CPU instruction that forces the processor to flush its cache to main memory and prevents the compiler from reordering read/write instructions around the barrier, ensuring visibility of variables across threads", "A limit on how much RAM the JVM can use", "A Garbage Collection pause"],
  "A CPU instruction that forces the processor to flush its cache to main memory and prevents the compiler from reordering read/write instructions around the barrier, ensuring visibility of variables across threads",
  "This is the low-level magic that makes `volatile` work. It guarantees that if Thread A writes to a volatile variable, Thread B will see it immediately."
),
Q("UE","HARD",
  "What happens if you throw an Error (like `OutOfMemoryError`) in a `catch` block?",
  ["It is suppressed", "The compiler blocks it", "It behaves exactly like throwing an Exception. It bypasses further processing, runs the `finally` block, and propagates up the call stack to crash the thread unless caught.", "The JVM ignores it"],
  "It behaves exactly like throwing an Exception. It bypasses further processing, runs the `finally` block, and propagates up the call stack to crash the thread unless caught.",
  "Errors inherit from `Throwable` just like Exceptions do, meaning they follow the exact same throw/catch/finally propagation mechanics in the JVM."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new DEEP DIVE EXPANSION questions!`);

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
