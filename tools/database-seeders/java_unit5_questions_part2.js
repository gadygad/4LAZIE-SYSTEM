/**
 * JAVA UNIT 5 - FILE I/O & SERIALIZATION - HANDCRAFTED QUESTIONS (PART 2)
 * Based on: Unit 5 (Byte Streams, Character Streams, Serialization, Readers, Writers)
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
  "What is the root class for all Byte input streams in Java?",
  ["InputStream", "Reader", "FileInputStream", "ObjectInputStream"],
  "InputStream",
  "The `java.io.InputStream` is the abstract superclass representing an input stream of raw bytes (8-bit data)."
),
Q("QUIZ","EASY",
  "Which stream class should you use if you want to read purely text/character data (like a .txt file) efficiently?",
  ["FileInputStream", "DataInputStream", "FileReader / BufferedReader", "ObjectInputStream"],
  "FileReader / BufferedReader",
  "Character streams (classes ending in Reader/Writer) are designed specifically for handling 16-bit Unicode characters, making them perfect for text files."
),
Q("QUIZ","EASY",
  "What does the `java.io.File` class represent?",
  ["The actual contents (data) of a file", "An abstract representation of file and directory pathnames", "A stream of bytes", "A text document"],
  "An abstract representation of file and directory pathnames",
  "The `File` class does not actually read or write data. It simply points to a location on the hard drive and gives you information about it (e.g., `exists()`, `length()`, `delete()`)."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is Object Serialization in Java?",
  ["The process of sorting an array of objects", "The process of converting an object's state (its variables) into a byte stream so it can be saved to a file or sent over a network", "The process of deleting objects from memory", "The process of copying an object"],
  "The process of converting an object's state (its variables) into a byte stream so it can be saved to a file or sent over a network",
  "Serialization allows you to take an object from RAM and save it to the hard drive as a `.ser` or `.dat` file."
),
Q("QUIZ","MEDIUM",
  "Which keyword is used to prevent a specific variable from being serialized?",
  ["static", "private", "transient", "volatile"],
  "transient",
  "If a variable is marked as `transient` (e.g., `transient String password;`), its value will not be saved during the serialization process. It will be restored as `null` (or 0) during deserialization."
),
Q("QUIZ","MEDIUM",
  "Why is `BufferedReader` preferred over using `FileReader` directly?",
  ["Because `FileReader` is deprecated", "Because `BufferedReader` provides an internal buffer (memory array) that reduces the number of physical disk reads, making it significantly faster", "Because `BufferedReader` reads bytes instead of characters", "Because it uses less RAM"],
  "Because `BufferedReader` provides an internal buffer (memory array) that reduces the number of physical disk reads, making it significantly faster",
  "Disk I/O is very slow. Reading one character at a time from the hard drive is terrible for performance. `BufferedReader` grabs a huge chunk of text at once into RAM."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What happens if you try to serialize an object of a class that does NOT implement the `Serializable` interface?",
  ["The object is serialized but with empty values", "The compiler throws an error", "A `NotSerializableException` is thrown at runtime", "It implements it automatically"],
  "A `NotSerializableException` is thrown at runtime",
  "`Serializable` is a marker interface. If `ObjectOutputStream.writeObject()` receives an object that isn't marked, it throws this exception."
),
Q("QUIZ","HARD",
  "If a Parent class implements `Serializable`, does the Child class also need to implement it?",
  ["No, the Child class automatically inherits serializability", "Yes, interfaces are not inherited", "Only if the Child has new variables", "Only if the Parent is abstract"],
  "No, the Child class automatically inherits serializability",
  "Because the parent implemented the interface, the 'IS-A' relationship means all subclasses are automatically serializable."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which method of the `Scanner` class is used to read an entire line of text from a file?",
  ["next()", "read()", "nextLine()", "readLine()"],
  "nextLine()",
  "The `nextLine()` method reads all characters up to the next line break (Enter/Return) and returns them as a String."
),
Q("EXERCISE","EASY",
  "Which class is used to WRITE raw bytes (like an image or audio file) to a file?",
  ["FileWriter", "FileOutputStream", "BufferedWriter", "PrintWriter"],
  "FileOutputStream",
  "Byte streams (`OutputStream`, `FileOutputStream`) are used for binary data. Character streams (`Writer`, `FileWriter`) are used for text."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What does `new FileOutputStream(\"data.txt\", true)` do?",
  ["It reads the file normally", "It creates the file if it doesn't exist, and APPENDS new data to the end of it rather than overwriting it", "It encrypts the file", "It locks the file from other users"],
  "It creates the file if it doesn't exist, and APPENDS new data to the end of it rather than overwriting it",
  "The second boolean parameter is the 'append' flag. If true, data is added to the end. If false (default), the file is wiped clean before writing."
),
Q("EXERCISE","MEDIUM",
  "What exception is typically thrown when a program tries to open a file that does not exist?",
  ["NullPointerException", "FileNotFoundException", "IOException", "FileMissingException"],
  "FileNotFoundException",
  "`FileNotFoundException` is a subclass of `IOException` specifically designed to indicate that a file could not be located at the specified path."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "During Deserialization, is the constructor of the serialized object called?",
  ["Yes, the default constructor is called", "Yes, the parameterized constructor is called", "No, the object's state is recreated directly from the byte stream without invoking its constructor", "Only if it is defined as public"],
  "No, the object's state is recreated directly from the byte stream without invoking its constructor",
  "This is a crucial concept. Deserialization bypasses standard object creation. It allocates memory and fills the variables directly from the file."
),
Q("EXERCISE","HARD",
  "What is the `serialVersionUID` used for?",
  ["To encrypt the serialized file", "To ensure that the same class version used during serialization is loaded during deserialization (version control)", "To count how many objects are serialized", "To uniquely identify the object in the database"],
  "To ensure that the same class version used during serialization is loaded during deserialization (version control)",
  "If you serialize an object, then change the class code (e.g., add a new variable), and try to deserialize the old file, the `serialVersionUID` won't match, throwing an `InvalidClassException`."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Why must you always call `.close()` on a file stream when you are done with it?",
  ["To prevent the JVM from crashing", "To release system resources (like file locks or memory buffers) back to the Operating System", "To compile the file", "To format the text"],
  "To release system resources (like file locks or memory buffers) back to the Operating System",
  "Leaving streams open causes resource leaks. Other programs might not be able to read/write the file, and the OS might run out of file handles."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "What does the `flush()` method do in an OutputStream?",
  ["It deletes the file contents", "It forces any buffered output bytes to be written immediately to the destination (hard drive/network)", "It closes the stream", "It resets the stream to the beginning"],
  "It forces any buffered output bytes to be written immediately to the destination (hard drive/network)",
  "Streams often hold data in a memory buffer to optimize disk writes. `flush()` tells the stream to push the data out NOW, even if the buffer isn't full."
),
Q("CAT 1","MEDIUM",
  "Which stream class allows you to read primitive Java data types (like int, double, boolean) directly from an input stream in a machine-independent way?",
  ["DataInputStream", "ObjectInputStream", "FileInputStream", "BufferedInputStream"],
  "DataInputStream",
  "`DataInputStream` has methods like `readInt()`, `readDouble()`, and `readBoolean()`, making it very easy to read structured binary data."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "If Class A contains a reference to Class B, and you serialize Class A, what happens to Class B?",
  ["Class B is ignored", "Class B is serialized automatically ONLY IF it also implements the `Serializable` interface. If it doesn't, an exception is thrown.", "Class B is converted to a string", "Class B must be marked transient"],
  "Class B is serialized automatically ONLY IF it also implements the `Serializable` interface. If it doesn't, an exception is thrown.",
  "Serialization recursively saves the entire object graph. Every single object referenced by the parent must be serializable."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "What is the difference between an absolute path and a relative path?",
  ["There is no difference", "An absolute path starts from the root of the file system (e.g. C:\\files\\data.txt), while a relative path depends on the current working directory of the program", "Absolute paths are for Windows, relative for Linux", "Relative paths cannot be used in Java"],
  "An absolute path starts from the root of the file system (e.g. C:\\files\\data.txt), while a relative path depends on the current working directory of the program",
  "Using relative paths makes your Java application portable across different computers."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "Which design pattern is heavily used in the `java.io` package (e.g., `new BufferedReader(new FileReader(\"file.txt\"))`)?",
  ["Singleton Pattern", "Factory Pattern", "Decorator Pattern", "Observer Pattern"],
  "Decorator Pattern",
  "The Decorator pattern allows behavior to be added to an individual object dynamically. We 'decorate' a basic `FileReader` with a `BufferedReader` to add buffering capabilities."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What happens if a static variable is present in a class during serialization?",
  ["It is serialized normally", "It is encrypted", "It is NOT serialized because static variables belong to the Class, not to the Object state", "It throws an exception"],
  "It is NOT serialized because static variables belong to the Class, not to the Object state",
  "Serialization only saves the state (instance variables) of a specific object. Static variables are shared across all instances and are thus ignored."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Which interface provides the ability to automatically close resources (like File streams) without needing a `finally` block?",
  ["Closeable", "AutoCloseable", "Streamable", "Disposable"],
  "AutoCloseable",
  "The Try-with-resources statement (Java 7+) works with any object that implements the `AutoCloseable` interface."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the return type of the `read()` method in `FileInputStream` when reading a single byte?",
  ["byte", "char", "int", "String"],
  "int",
  "It returns an `int` (from 0 to 255) representing the byte data. If the end of the file is reached, it returns `-1`."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "If a parent class does NOT implement `Serializable`, but the child class DOES, what happens to the parent's variables during deserialization?",
  ["They are left as null/0", "They throw an exception", "The parent's NO-ARG constructor is called to initialize them, while the child's variables are populated from the file stream", "They are serialized anyway"],
  "The parent's NO-ARG constructor is called to initialize them, while the child's variables are populated from the file stream",
  "This is a very tricky scenario. If the parent isn't serializable, its state isn't saved. Upon deserialization, the JVM must call the parent's default constructor to at least initialize the parent portion of the object."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 5 (Part 2) questions!`);

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
