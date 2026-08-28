/**
 * JAVA UNIT 5 - MULTITHREADING - HANDCRAFTED QUESTIONS (PART 1)
 * Based on: Unit 5 (Multithreading, Thread Lifecycle, Runnable, Synchronization, Deadlock)
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
  "What is a 'Thread' in Java?",
  ["A string variable", "A lightweight sub-process or the smallest unit of processing that can run concurrently with other threads", "A networking protocol", "A method to pause the program"],
  "A lightweight sub-process or the smallest unit of processing that can run concurrently with other threads",
  "Multithreading allows multiple parts of a program (threads) to execute at the same time, maximizing CPU utilization."
),
Q("QUIZ","EASY",
  "Which interface must a class implement to define a task that can be run by a thread?",
  ["Threadable", "Executable", "Runnable", "Task"],
  "Runnable",
  "The `Runnable` interface has a single method, `public void run()`, which contains the code that the thread will execute."
),
Q("QUIZ","EASY",
  "How do you actually start the execution of a Thread?",
  ["Calling the `run()` method", "Calling the `start()` method", "Calling the `execute()` method", "Calling the `begin()` method"],
  "Calling the `start()` method",
  "Calling `start()` tells the JVM to allocate a new call stack for the thread and then automatically invoke its `run()` method. Calling `run()` directly just executes it in the current thread like a normal method."
),
Q("QUIZ","EASY",
  "Which keyword is used to prevent multiple threads from accessing a shared resource at the same exact time (preventing race conditions)?",
  ["volatile", "locked", "synchronized", "atomic"],
  "synchronized",
  "The `synchronized` keyword ensures that only one thread can execute a specific block of code or method at any given time."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is the difference between extending the `Thread` class vs implementing the `Runnable` interface?",
  ["There is no difference", "Extending Thread limits your class because Java doesn't support multiple inheritance of classes, whereas implementing Runnable allows your class to extend another class if needed", "Runnable is for integers, Thread is for Strings", "Extending Thread is faster"],
  "Extending Thread limits your class because Java doesn't support multiple inheritance of classes, whereas implementing Runnable allows your class to extend another class if needed",
  "Because of Java's single inheritance rule, implementing `Runnable` is the preferred and more flexible way to create threads."
),
Q("QUIZ","MEDIUM",
  "What does the `Thread.sleep(1000)` method do?",
  ["Kills the thread permanently after 1000 seconds", "Pauses the execution of the current thread for exactly 1000 milliseconds (1 second)", "Forces the thread to wait for user input", "Puts the entire JVM to sleep"],
  "Pauses the execution of the current thread for exactly 1000 milliseconds (1 second)",
  "`sleep()` is used to temporarily pause execution. It throws a checked `InterruptedException` which must be caught."
),
Q("QUIZ","MEDIUM",
  "What happens if you call `start()` on a Thread object twice?",
  ["The thread runs twice in parallel", "The thread restarts from the beginning", "It throws an IllegalThreadStateException", "The compiler throws an error"],
  "It throws an IllegalThreadStateException",
  "Once a thread has been started, its state changes. You cannot restart a thread that is already running or has already completed. It throws a runtime exception."
),
Q("QUIZ","MEDIUM",
  "What are the possible states in the Java Thread Lifecycle?",
  ["Start, Run, Stop", "New, Runnable, Running, Blocked/Waiting, Terminated", "Created, Suspended, Resumed", "Init, Execution, Destruction"],
  "New, Runnable, Running, Blocked/Waiting, Terminated",
  "A thread goes from New (created) -> Runnable (ready to run) -> Running (executing) -> Waiting (paused) -> Terminated (dead)."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is the difference between `wait()` and `sleep()` in Java?",
  ["They are exactly the same", "`sleep()` releases the lock while waiting, `wait()` does not release the lock", "`wait()` releases the object lock so other threads can use it, while `sleep()` keeps the lock and just pauses execution", "`wait()` is used for threads, `sleep()` is for the main program"],
  "`wait()` releases the object lock so other threads can use it, while `sleep()` keeps the lock and just pauses execution",
  "This is a classic interview/exam question. `sleep()` is a static method in `Thread` that just pauses time. `wait()` is a method in `Object` used for inter-thread communication, requiring the thread to surrender the lock it holds."
),
Q("QUIZ","HARD",
  "What is a 'Daemon Thread' in Java?",
  ["A thread that attacks the system (malware)", "A high-priority thread that executes before all others", "A low-priority background thread (like Garbage Collector) that provides services to user threads; the JVM exits when only daemon threads remain", "A thread that cannot be stopped"],
  "A low-priority background thread (like Garbage Collector) that provides services to user threads; the JVM exits when only daemon threads remain",
  "Daemon threads (e.g., set via `thread.setDaemon(true)`) do not prevent the JVM from shutting down once all normal 'user' threads have finished their work."
),
Q("QUIZ","HARD",
  "What does the `join()` method do?",
  ["It merges two threads into one", "It causes the current thread to pause execution until the thread on which `join()` was called has finished executing (died)", "It connects a thread to a database", "It synchronizes variables between threads"],
  "It causes the current thread to pause execution until the thread on which `join()` was called has finished executing (died)",
  "If Thread A calls `threadB.join()`, Thread A goes into a waiting state until Thread B finishes completely. This is used to ensure tasks happen in a specific sequence."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which method do you override when implementing the `Runnable` interface?",
  ["start()", "main()", "run()", "execute()"],
  "run()",
  "The `run()` method contains the job/task that the thread is supposed to execute."
),
Q("EXERCISE","EASY",
  "How can you get the name of the currently executing thread?",
  ["Thread.getName()", "Thread.currentThread().getName()", "System.getThreadName()", "this.name"],
  "Thread.currentThread().getName()",
  "The static method `Thread.currentThread()` returns a reference to the thread that is currently executing the code, allowing you to call `.getName()` on it."
),
Q("EXERCISE","EASY",
  "What is the default priority of a Thread in Java?",
  ["0", "1", "5", "10"],
  "5",
  "Thread priorities range from `MIN_PRIORITY` (1) to `MAX_PRIORITY` (10). The default `NORM_PRIORITY` is 5."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is a 'Race Condition'?",
  ["When two threads try to execute the `run()` method first", "When multiple threads access and modify a shared resource concurrently, leading to unpredictable and incorrect data", "A speed test for threads", "When a thread enters an infinite loop"],
  "When multiple threads access and modify a shared resource concurrently, leading to unpredictable and incorrect data",
  "For example, if Thread A and Thread B both try to increment `count` at the exact same millisecond, one update might overwrite the other. Synchronization prevents this."
),
Q("EXERCISE","MEDIUM",
  "Trace the logic:\n<pre><code>Thread t = new Thread(new Runnable() {\n    public void run() { System.out.print(\"Task\"); }\n});\nt.run();</code></pre>\nWhat happens?",
  ["It runs normally as a separate thread, printing 'Task'", "It prints 'Task' but executes in the current (main) thread, NOT as a new concurrent thread", "Compile error", "Runtime exception"],
  "It prints 'Task' but executes in the current (main) thread, NOT as a new concurrent thread",
  "You must call `t.start()` to spawn a new thread. Calling `t.run()` directly is just a normal, synchronous method call on the object."
),
Q("EXERCISE","MEDIUM",
  "What is a 'Deadlock' in Multithreading?",
  ["When a thread is paused forever using sleep()", "When two or more threads are blocked forever, each waiting for a lock that the other thread holds", "When a thread throws an exception and dies", "When the CPU overheats"],
  "When two or more threads are blocked forever, each waiting for a lock that the other thread holds",
  "Example: Thread 1 locks Resource A and waits for Resource B. Thread 2 locks Resource B and waits for Resource A. Both wait forever."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "Which object's monitor (lock) is acquired when a `static synchronized` method is executed?",
  ["The object instance (`this`)", "The `Class` object associated with the class", "The `Thread` object", "No lock is acquired"],
  "The `Class` object associated with the class",
  "A normal `synchronized` method locks the current instance (`this`). A `static synchronized` method locks the entire `Class` metadata object (e.g., `MyClass.class`), meaning NO OTHER static synchronized method in that class can be executed by any thread."
),
Q("EXERCISE","HARD",
  "Why must `wait()`, `notify()`, and `notifyAll()` be called from inside a `synchronized` block?",
  ["Because they are slow methods", "Because they need to release and re-acquire the lock of the object they are called on. If called without holding the lock, they throw an IllegalMonitorStateException", "Because it is a syntax rule in Java 8", "Because they modify static variables"],
  "Because they need to release and re-acquire the lock of the object they are called on. If called without holding the lock, they throw an IllegalMonitorStateException",
  "These methods are used for thread coordination over a shared resource. You cannot tell a thread to wait for a resource if you haven't even locked (synchronized) that resource first."
),
Q("EXERCISE","HARD",
  "What does `Thread.yield()` do?",
  ["It forces the thread to stop permanently", "It pauses the thread for 1 second", "It acts as a hint to the thread scheduler that the current thread is willing to yield its current use of a processor to other threads of equal priority", "It throws an exception"],
  "It acts as a hint to the thread scheduler that the current thread is willing to yield its current use of a processor to other threads of equal priority",
  "Yielding simply moves the thread from the 'Running' state back to the 'Runnable' queue, letting the OS scheduler pick another thread. It is not guaranteed to do anything."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which class provides methods for creating a thread pool rather than managing individual threads manually?",
  ["ThreadPool", "ThreadManager", "ExecutorService (from java.util.concurrent)", "MultiThreader"],
  "ExecutorService (from java.util.concurrent)",
  "Modern Java uses the `ExecutorService` (like `Executors.newFixedThreadPool(5)`) to manage a pool of reusable worker threads, which is much more efficient than creating thousands of raw `Thread` objects."
),
Q("CAT 1","EASY",
  "What exception must be handled when using `Thread.sleep()`?",
  ["IOException", "InterruptedException", "RuntimeException", "ThreadDeathException"],
  "InterruptedException",
  "A sleeping thread can be rudely awakened if another thread calls `.interrupt()` on it. Therefore, Java forces you to catch `InterruptedException`."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "In Java, can you pass arguments to the `run()` method of a thread?",
  ["Yes, by changing the method signature to `public void run(int x)`", "No, the `Runnable` interface explicitly defines `run()` with no arguments. You must pass data to the class via its Constructor before starting the thread.", "Yes, by passing arguments through `start(args)`", "Only in daemon threads"],
  "No, the `Runnable` interface explicitly defines `run()` with no arguments. You must pass data to the class via its Constructor before starting the thread.",
  "Since you can't alter the `run()` signature, you give the thread object its data when you instantiate it (e.g. `new MyThread(data)`), store it in instance variables, and then `run()` uses those variables."
),
Q("CAT 1","MEDIUM",
  "What is the output of `System.out.println(Thread.currentThread().isDaemon());` if run directly in the `main` method?",
  ["true", "false", "Compile error", "Throws Exception"],
  "false",
  "The `main` thread is a non-daemon (user) thread. The program will not terminate as long as the main thread (or any other user thread) is still running."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "Consider two threads, T1 and T2, both calling a `synchronized` method on TWO DIFFERENT objects (Object A and Object B) of the same class. Will they block each other?",
  ["Yes, because the method is synchronized", "Yes, because they are of the same class", "No, because non-static synchronized methods lock the specific object instance. Since they operate on different objects, they acquire different locks and run concurrently.", "Compile Error"],
  "No, because non-static synchronized methods lock the specific object instance. Since they operate on different objects, they acquire different locks and run concurrently.",
  "Synchronization at the method level uses `this` as the lock. Two different objects mean two different locks, so there is no contention."
),
Q("CAT 1","HARD",
  "What happens if you use the `volatile` keyword on a variable?",
  ["It makes the variable a constant", "It ensures that any thread reading the variable will always see the most recently written value (prevents threads from caching the variable locally in CPU registers)", "It encrypts the variable", "It synchronizes the entire class"],
  "It ensures that any thread reading the variable will always see the most recently written value (prevents threads from caching the variable locally in CPU registers)",
  "`volatile` provides visibility guarantees across threads, but it does NOT provide atomicity (it won't solve `count++` race conditions)."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "What is the name of the main thread created by the JVM when a Java program starts?",
  ["main", "system", "root", "thread-0"],
  "main",
  "The JVM automatically creates a thread named 'main' which executes the `public static void main(String[] args)` method."
),
Q("POSSIBLE QNS","EASY",
  "What method is used to notify exactly ONE waiting thread to wake up and acquire a lock?",
  ["wakeUp()", "notifyAll()", "resume()", "notify()"],
  "notify()",
  "`notify()` wakes up a single thread waiting on the object's monitor. `notifyAll()` wakes up ALL threads waiting on the monitor."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "Why is `Thread.stop()` considered deprecated and dangerous?",
  ["Because it makes the program slow", "Because it forces the thread to unlock all monitors immediately, potentially leaving shared data in an inconsistent or corrupted state", "Because it requires admin privileges", "Because it causes infinite loops"],
  "Because it forces the thread to unlock all monitors immediately, potentially leaving shared data in an inconsistent or corrupted state",
  "Instead of using `stop()`, you should use a boolean flag (`while(isRunning)`) or `thread.interrupt()` to allow the thread to shut down gracefully."
),
Q("POSSIBLE QNS","MEDIUM",
  "If Thread A creates Thread B, what happens if Thread A finishes execution before Thread B?",
  ["Thread B is immediately killed", "Thread B pauses until Thread A restarts", "Thread B continues running normally. A thread's lifecycle is independent of the thread that created it.", "A runtime exception is thrown"],
  "Thread B continues running normally. A thread's lifecycle is independent of the thread that created it.",
  "Unless Thread B is a daemon thread and Thread A was the last user thread, Thread B will finish its execution completely independently."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is a `Callable` in Java, and how does it differ from `Runnable`?",
  ["They are exactly the same", "`Runnable` returns a value, `Callable` does not", "`Callable` can return a result and can throw a checked exception, whereas `Runnable`'s run() method returns void and cannot throw checked exceptions", "`Callable` is used for GUI, `Runnable` is for background logic"],
  "`Callable` can return a result and can throw a checked exception, whereas `Runnable`'s run() method returns void and cannot throw checked exceptions",
  "Introduced in `java.util.concurrent`, `Callable<T>` is extremely useful when you want a thread to compute a value and return it (via a `Future` object) to the main thread."
),
Q("POSSIBLE QNS","HARD",
  "What does `thread.setPriority(Thread.MAX_PRIORITY)` actually guarantee?",
  ["It guarantees the thread will finish first", "It guarantees the thread gets 100% of CPU time", "It guarantees absolutely nothing; it is merely a hint to the underlying Operating System's thread scheduler", "It pauses all other threads"],
  "It guarantees absolutely nothing; it is merely a hint to the underlying Operating System's thread scheduler",
  "Java thread priority mapping depends entirely on the OS (Windows vs Linux). The OS scheduler may completely ignore thread priorities to prevent starvation."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Can a class implement `Runnable` and also extend another class like `Applet`?",
  ["Yes, because Java allows implementing multiple interfaces while extending one superclass", "No, implementing Runnable prevents inheritance", "Yes, but only if Applet is an interface", "No, this is a compile error"],
  "Yes, because Java allows implementing multiple interfaces while extending one superclass",
  "This is the primary reason developers prefer `implements Runnable` over `extends Thread`. It frees up the class's single inheritance slot."
),
Q("UE","EASY",
  "What method is used to check if a thread is currently alive (started but not yet terminated)?",
  ["isAlive()", "isRunning()", "isActive()", "checkAlive()"],
  "isAlive()",
  "The `.isAlive()` method returns true if the thread has been started and has not yet died."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the output?\n<pre><code>Thread t = new Thread();\nSystem.out.println(t.getPriority());</code></pre>",
  ["0", "1", "5", "10"],
  "5",
  "Unless explicitly changed, a new thread inherits the priority of the thread that created it. The main thread has priority 5 (`NORM_PRIORITY`)."
),
Q("UE","MEDIUM",
  "What is a 'Thread Local' variable (`ThreadLocal<T>`)?",
  ["A variable that can only be used in local methods", "A variable that provides thread-local variables. Each thread that accesses one has its own, independently initialized copy of the variable", "A variable stored in the hard drive", "A variable that stops threads"],
  "A variable that provides thread-local variables. Each thread that accesses one has its own, independently initialized copy of the variable",
  "It is very useful for maintaining state per-thread (like database connections or user session data in web servers) without needing synchronization."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "Analyze this code snippet:\n<pre><code>synchronized (this) {\n    // Code here\n}</code></pre>\nWhat does `this` represent?",
  ["The currently running thread", "The Object monitor (lock) that the block is synchronizing on", "The parent class", "A generic lock"],
  "The Object monitor (lock) that the block is synchronizing on",
  "It means \"Lock the current object instance\". Any other thread trying to execute any synchronized block or method that also locks on `this` will be blocked until the first thread exits."
),
Q("UE","HARD",
  "What is Starvation in multithreading?",
  ["When a thread runs out of memory", "When a high-priority thread monopolizes the CPU, causing lower-priority threads to be indefinitely postponed (starved) of CPU time", "When a thread throws an exception", "When the main thread dies"],
  "When a high-priority thread monopolizes the CPU, causing lower-priority threads to be indefinitely postponed (starved) of CPU time",
  "If the OS scheduler aggressively favors high-priority threads, a priority 1 thread might wait forever to execute. This is called Thread Starvation."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 5 (Part 1) questions!`);

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
