/**
 * JAVA UNIT 7 - ADVANCED TOPICS (NETWORKING, ENUMS, GC) - HANDCRAFTED QUESTIONS (PART 1)
 * Based on: Unit 7 (Sockets, ServerSocket, Enums, Annotations, Garbage Collection)
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
  "Which package contains classes for networking in Java?",
  ["java.io", "java.net", "java.web", "java.network"],
  "java.net",
  "The `java.net` package provides the classes for implementing networking applications (like Sockets and URLs)."
),
Q("QUIZ","EASY",
  "What is an `enum` in Java?",
  ["A special class that represents a group of constants (unchangeable variables, like final variables)", "A method for encrypting data", "A type of exception", "A loop structure similar to `while`"],
  "A special class that represents a group of constants (unchangeable variables, like final variables)",
  "Enums (e.g., `enum Level { LOW, MEDIUM, HIGH }`) are used when you have values that you know aren't going to change, like days of the week or colors."
),
Q("QUIZ","EASY",
  "What does the `@Override` annotation do?",
  ["It forces the program to run faster", "It tells the compiler that the following method is intended to override a method in a superclass or interface. If the method doesn't actually override anything, the compiler throws an error.", "It prevents a method from being overridden", "It deletes the method"],
  "It tells the compiler that the following method is intended to override a method in a superclass or interface. If the method doesn't actually override anything, the compiler throws an error.",
  "Annotations like `@Override` provide metadata to the compiler to catch typos (e.g., spelling it `toSting()` instead of `toString()`)."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "In Java Socket Programming, which class is used by the SERVER to listen for incoming client connections?",
  ["Socket", "ServerSocket", "ClientSocket", "HttpServer"],
  "ServerSocket",
  "The server uses a `ServerSocket` bound to a specific port (e.g., 8080) and calls `.accept()` to wait for a client to connect."
),
Q("QUIZ","MEDIUM",
  "What is returned by the `accept()` method of the `ServerSocket` class?",
  ["A boolean indicating success", "A string containing the client's IP address", "A `Socket` object that represents the established connection to the client", "Void"],
  "A `Socket` object that represents the established connection to the client",
  "Once a client connects, the `accept()` method stops blocking and returns a standard `Socket` which the server uses to communicate with that specific client."
),
Q("QUIZ","MEDIUM",
  "Can an `enum` contain methods, variables, and a constructor in Java?",
  ["No, enums can only contain constants", "Yes, because an enum is internally compiled as a special type of Class", "Yes, but only static methods", "Only in Java 11 and above"],
  "Yes, because an enum is internally compiled as a special type of Class",
  "Unlike C/C++, Java enums are full-fledged objects. You can give them fields, methods, and private constructors (e.g., `enum Size { SMALL(\"S\"), LARGE(\"L\"); }`)."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is the difference between TCP (Transmission Control Protocol) and UDP (User Datagram Protocol) in Java?",
  ["There is no difference", "TCP is connection-oriented and reliable (uses `Socket`). UDP is connectionless, faster, but unreliable, meaning packets might be lost (uses `DatagramSocket`).", "UDP is used for local files, TCP for the internet", "TCP is faster than UDP"],
  "TCP is connection-oriented and reliable (uses `Socket`). UDP is connectionless, faster, but unreliable, meaning packets might be lost (uses `DatagramSocket`).",
  "TCP ensures every byte arrives in order (good for text/files). UDP just blasts packets (good for video streaming/gaming where losing a frame is okay)."
),
Q("QUIZ","HARD",
  "What does the `@Deprecated` annotation signify?",
  ["The method is broken and will crash the program", "It marks a class, method, or field that is no longer recommended for use, usually because a better alternative exists. The compiler issues a warning if it is used.", "The method is highly secure", "The method can only be used by the admin"],
  "It marks a class, method, or field that is no longer recommended for use, usually because a better alternative exists. The compiler issues a warning if it is used.",
  "For example, `Thread.stop()` is marked with `@Deprecated` because it is unsafe."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "How do you connect a CLIENT to a Server running on the same machine at port 5000 in Java?",
  ["new ServerSocket(5000)", "new Socket(\"localhost\", 5000)", "new ClientSocket(\"127.0.0.1\", 5000)", "Socket.connect(5000)"],
  "new Socket(\"localhost\", 5000)",
  "The client uses the `Socket(String host, int port)` constructor to attempt a connection to the server."
),
Q("EXERCISE","EASY",
  "Which object in Java is responsible for destroying objects that are no longer referenced by any part of the program?",
  ["The Memory Manager", "The Garbage Collector (GC)", "The Thread Scheduler", "The Compiler"],
  "The Garbage Collector (GC)",
  "The Garbage Collector runs automatically in the background (as a daemon thread) to reclaim memory from unreachable objects."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What are the two streams used for two-way communication in a Socket?",
  ["InputReader and OutputWriter", "InputStream (for receiving data) and OutputStream (for sending data)", "DataStream and FileStream", "UpStream and DownStream"],
  "InputStream (for receiving data) and OutputStream (for sending data)",
  "You get these by calling `socket.getInputStream()` and `socket.getOutputStream()`."
),
Q("EXERCISE","MEDIUM",
  "Which method do you use to get an array of all the constants defined in an enum?",
  ["getAll()", "values()", "list()", "constants()"],
  "values()",
  "The compiler automatically generates a static `values()` method for every enum. E.g., `Level[] allLevels = Level.values();`."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is an 'Island of Isolation' in Java Garbage Collection?",
  ["When a thread is isolated from the main memory", "When object A references object B, and object B references object A, but NEITHER can be reached from any active thread (the root). Both are eligible for garbage collection despite referencing each other.", "When an object is locked by a synchronized block", "A networking error"],
  "When object A references object B, and object B references object A, but NEITHER can be reached from any active thread (the root). Both are eligible for garbage collection despite referencing each other.",
  "The GC uses a 'Mark and Sweep' algorithm starting from GC Roots. Since isolated cycles have no path to a root, they are swept away."
),
Q("EXERCISE","HARD",
  "What is the default superclass of all enums in Java?",
  ["java.lang.Object", "java.lang.Enum", "java.lang.Class", "They don't have a superclass"],
  "java.lang.Enum",
  "Because every enum implicitly extends `java.lang.Enum`, an enum CANNOT extend any other class (since Java doesn't support multiple inheritance of classes)."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "What does an IP Address (like 192.168.1.5) represent compared to a Port Number (like 8080)?",
  ["They are the same thing", "The IP Address identifies the specific computer/device on the network, while the Port Number identifies the specific application/service running on that computer", "The IP is for the application, the Port is for the computer", "The Port is for the hardware address"],
  "The IP Address identifies the specific computer/device on the network, while the Port Number identifies the specific application/service running on that computer",
  "Think of the IP Address as the building's street address, and the Port Number as the specific apartment number inside the building."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "How does a multi-threaded Server handle multiple clients connecting at the same time?",
  ["It makes them wait in a queue", "The server's `accept()` method returns a Socket, and the server immediately passes that Socket to a NEW Thread to handle communication, freeing up the main server thread to loop back and wait for the next client", "It uses UDP", "It opens multiple ServerSockets"],
  "The server's `accept()` method returns a Socket, and the server immediately passes that Socket to a NEW Thread to handle communication, freeing up the main server thread to loop back and wait for the next client",
  "This is the standard architecture for web servers and chat applications."
),
Q("CAT 1","MEDIUM",
  "What does the `ordinal()` method of an Enum return?",
  ["The string name of the constant", "The integer position of the enum constant in its declaration, starting from 0", "The hashcode", "The number of parameters"],
  "The integer position of the enum constant in its declaration, starting from 0",
  "If `enum Color { RED, GREEN, BLUE }`, then `Color.GREEN.ordinal()` returns 1."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "Can you instantiate an Annotation (e.g. `@MyAnnotation`) using the `new` keyword?",
  ["Yes, like a normal class", "No, Annotations are interfaces. They are implemented by the JVM dynamically at runtime, and their values are retrieved using Reflection.", "Yes, but only in static blocks", "Only if it has a constructor"],
  "No, Annotations are interfaces. They are implemented by the JVM dynamically at runtime, and their values are retrieved using Reflection.",
  "Annotations (declared with `@interface`) do not contain logic. They are purely metadata read by the compiler or by Reflection tools (like Spring or Hibernate)."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "In Java, can you force an object to be garbage collected?",
  ["Yes, by setting it to null", "No, setting an object to `null` makes it *eligible* for garbage collection, but you cannot force the GC to destroy it immediately.", "Yes, using System.gc()", "Yes, by calling Object.delete()"],
  "No, setting an object to `null` makes it *eligible* for garbage collection, but you cannot force the GC to destroy it immediately.",
  "Garbage collection is non-deterministic. The JVM decides when to run it based on memory needs."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What does the `@SuppressWarnings(\"unchecked\")` annotation do?",
  ["It ignores syntax errors", "It tells the compiler to ignore specific warnings (in this case, warnings about raw types or unchecked casts in Generics) that it would normally print during compilation", "It suppresses runtime exceptions", "It hides the code from other developers"],
  "It tells the compiler to ignore specific warnings (in this case, warnings about raw types or unchecked casts in Generics) that it would normally print during compilation",
  "This is commonly used when interacting with legacy code that doesn't use Generics."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is a memory leak in Java?",
  ["When the RAM physically breaks", "When the program stops running", "When objects are no longer needed by the application but are still being referenced by something (like a static List), preventing the Garbage Collector from freeing their memory", "When a NullPointerException occurs"],
  "When objects are no longer needed by the application but are still being referenced by something (like a static List), preventing the Garbage Collector from freeing their memory",
  "If you keep adding unused data to a static `HashMap` and never remove it, the GC can't delete it, eventually causing an `OutOfMemoryError`."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "What is the Localhost IP address used for loopback testing?",
  ["192.168.0.1", "255.255.255.0", "127.0.0.1", "0.0.0.0"],
  "127.0.0.1",
  "127.0.0.1 (or 'localhost') is standard across all networking, telling the computer to connect back to itself."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "Can an enum implement an interface?",
  ["Yes, enums can implement one or multiple interfaces", "No, enums cannot implement interfaces", "Only if the interface has no methods", "Only in Java 1.4"],
  "Yes, enums can implement one or multiple interfaces",
  "While they cannot *extend* another class, they are perfectly capable of *implementing* interfaces and providing method bodies for them."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "In networking, what does `socket.setSoTimeout(5000)` do?",
  ["It closes the socket after 5 seconds", "It sets a timeout for reading from the InputStream. If no data arrives within 5000 milliseconds, it throws a `SocketTimeoutException`.", "It limits the upload speed", "It pings the server every 5 seconds"],
  "It sets a timeout for reading from the InputStream. If no data arrives within 5000 milliseconds, it throws a `SocketTimeoutException`.",
  "Without a timeout, a `read()` operation could block (hang) forever if the network goes down unexpectedly without closing the connection properly."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 7 (Part 1) questions!`);

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
