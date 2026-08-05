/**
 * JAVA UNIT 4 - COLLECTIONS FRAMEWORK - HANDCRAFTED QUESTIONS (PART 3)
 * Based on: Unit 4 (ArrayList, HashMap, HashSet, Iterators, Generics)
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
  "What is the Java Collections Framework?",
  ["A library for creating graphical user interfaces", "A unified architecture for representing and manipulating collections of objects (like Lists, Sets, and Maps)", "A framework for connecting to databases", "A tool for memory management"],
  "A unified architecture for representing and manipulating collections of objects (like Lists, Sets, and Maps)",
  "The Collections Framework provides pre-packaged data structures and algorithms to store, retrieve, manipulate, and communicate aggregate data."
),
Q("QUIZ","EASY",
  "Which Collection type allows you to store elements in a specific order and allows duplicate values?",
  ["Set", "Map", "List", "Tree"],
  "List",
  "A `List` (like ArrayList or LinkedList) is an ordered collection (sequence) that allows you to store duplicate elements and access them by their integer index."
),
Q("QUIZ","EASY",
  "Which Collection type does NOT allow duplicate elements?",
  ["List", "Set", "Array", "Vector"],
  "Set",
  "A `Set` (like HashSet or TreeSet) mathematically represents a collection of unique elements. If you try to add a duplicate, it simply ignores it."
),
Q("QUIZ","EASY",
  "How are elements stored in a Map (like HashMap)?",
  ["As a simple list of values", "As a set of unique objects", "As Key-Value pairs", "As a multidimensional array"],
  "As Key-Value pairs",
  "A Map stores data in Key-Value pairs. Each Key must be unique, and it maps to a specific Value (e.g., mapping Student IDs to Student Names)."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is the main difference between ArrayList and LinkedList?",
  ["ArrayList allows duplicates, LinkedList does not", "ArrayList uses a dynamic array to store elements, LinkedList uses a doubly-linked list", "ArrayList is faster for adding/removing elements in the middle, LinkedList is slower", "There is no difference"],
  "ArrayList uses a dynamic array to store elements, LinkedList uses a doubly-linked list",
  "Because ArrayList uses arrays, it is fast for reading (O(1)). LinkedList uses nodes with pointers, making it faster for insertions/deletions in the middle of the list (O(1)) but slower for reading."
),
Q("QUIZ","MEDIUM",
  "Which interface does `java.util.Map` inherit from?",
  ["Collection", "List", "Iterable", "It does NOT inherit from the Collection interface"],
  "It does NOT inherit from the Collection interface",
  "This is a common trick question! Maps are part of the Collections Framework, but the `Map` interface stands alone and does NOT extend the `Collection` interface like List and Set do."
),
Q("QUIZ","MEDIUM",
  "What happens if you try to put a duplicate Key into a HashMap?",
  ["It throws a DuplicateKeyException", "It ignores the new entry", "It replaces the old value with the new value for that key", "It allows multiple keys with the same name"],
  "It replaces the old value with the new value for that key",
  "Keys in a Map must be unique. If you `put(key, newValue)` and the key already exists, the old value is simply overwritten."
),
Q("QUIZ","MEDIUM",
  "Why do we use Generics (the angle brackets `< >`) with Collections? E.g., `List<String>`",
  ["To make the code compile faster", "To provide compile-time type safety and eliminate the need for type casting when retrieving elements", "To increase the size of the list", "To allow primitive data types in the collection"],
  "To provide compile-time type safety and eliminate the need for type casting when retrieving elements",
  "Before Generics (pre-Java 5), collections held `Object` types, requiring manual casting. Generics enforce that a `List<String>` can ONLY contain Strings."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "Which of the following classes is completely Thread-Safe (Synchronized) by default?",
  ["ArrayList", "HashMap", "Vector", "HashSet"],
  "Vector",
  "`Vector` and `Hashtable` are legacy classes from Java 1.0 that are synchronized (thread-safe). Modern equivalents like `ArrayList` and `HashMap` are not synchronized for performance reasons."
),
Q("QUIZ","HARD",
  "What is the time complexity of searching for an element using `contains()` in a HashSet vs an ArrayList?",
  ["O(1) for HashSet, O(n) for ArrayList", "O(n) for HashSet, O(1) for ArrayList", "O(log n) for both", "O(1) for both"],
  "O(1) for HashSet, O(n) for ArrayList",
  "HashSet uses a hash table internally, allowing constant-time O(1) lookups. ArrayList must scan through elements one by one, taking O(n) time."
),
Q("QUIZ","HARD",
  "Trace the output:\n<pre><code>List&lt;Integer&gt; list = new ArrayList&lt;&gt;();\nlist.add(10);\nlist.add(20);\nlist.remove(1);\nSystem.out.println(list);</code></pre>",
  ["[20]", "[10]", "Compile Error", "IndexOutOfBoundsException"],
  "[10]",
  "The `remove(int index)` method removes the element at that index. Index 1 holds the value 20. Thus, 20 is removed, leaving [10]."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "How do you find out how many elements are currently inside an ArrayList named `myList`?",
  ["myList.length", "myList.length()", "myList.size()", "myList.count()"],
  "myList.size()",
  "Arrays use the `.length` property, Strings use the `.length()` method, but all Java Collections use the `.size()` method to get the number of elements."
),
Q("EXERCISE","EASY",
  "Can you store primitive data types (like `int`, `double`, `char`) directly in an ArrayList?",
  ["Yes, normally", "No, Collections can only store Objects; you must use Wrapper classes like Integer or Double", "Yes, but only in Java 8+", "No, arrays are used for primitives instead"],
  "No, Collections can only store Objects; you must use Wrapper classes like Integer or Double",
  "Java's Collections Framework relies on object references. Autoboxing automatically converts an `int` to an `Integer` object when you add it to a collection."
),
Q("EXERCISE","EASY",
  "Which method is used to retrieve an element from a specific index in a List?",
  ["retrieve()", "get()", "fetch()", "pull()"],
  "get()",
  "`list.get(index)` returns the element at the specified position in the list."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is an `Iterator` in Java?",
  ["A loop keyword like `for` or `while`", "An object that allows you to traverse through a collection safely, with the ability to remove elements during iteration", "A method to sort an array", "A type of exception"],
  "An object that allows you to traverse through a collection safely, with the ability to remove elements during iteration",
  "While you can use a `for-each` loop to read elements, if you try to remove an element during a `for-each` loop, you will get a `ConcurrentModificationException`. An `Iterator` prevents this."
),
Q("EXERCISE","MEDIUM",
  "What will happen?\n<pre><code>Set&lt;String&gt; set = new HashSet&lt;&gt;();\nset.add(\"Apple\");\nset.add(\"Apple\");\nSystem.out.println(set.size());</code></pre>",
  ["2", "1", "Compile error", "Throws Exception"],
  "1",
  "Sets do not allow duplicates. When you try to add \"Apple\" a second time, the `add()` method returns false and the set remains unchanged (size 1)."
),
Q("EXERCISE","MEDIUM",
  "How does a TreeSet differ from a HashSet?",
  ["TreeSet allows duplicates, HashSet does not", "TreeSet is faster than HashSet", "TreeSet automatically sorts its elements, while HashSet does not guarantee any order", "TreeSet only stores numbers"],
  "TreeSet automatically sorts its elements, while HashSet does not guarantee any order",
  "TreeSet is backed by a Red-Black Tree, which keeps elements sorted (either naturally or via a Comparator). HashSet is backed by a Hash Table, which is unordered."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What happens if you use a custom object as a Key in a HashMap, but you forget to override `hashCode()` and `equals()`?",
  ["The code will not compile", "The HashMap will throw a RuntimeException", "The HashMap will use memory addresses as keys, meaning you won't be able to retrieve your data using a new object with the same values", "The HashMap automatically generates them"],
  "The HashMap will use memory addresses as keys, meaning you won't be able to retrieve your data using a new object with the same values",
  "Without overriding `hashCode()` and `equals()`, two logically identical objects (e.g., two Student objects with ID 10) will be treated as completely different keys because their memory addresses differ."
),
Q("EXERCISE","HARD",
  "What is the output?\n<pre><code>List&lt;Integer&gt; list = new ArrayList&lt;&gt;();\nlist.add(1);\nlist.add(2);\nlist.remove(Integer.valueOf(1));\nSystem.out.println(list);</code></pre>",
  ["[1]", "[2]", "IndexOutOfBoundsException", "Compile Error"],
  "[2]",
  "Because `remove()` is overloaded (`remove(int index)` and `remove(Object o)`), passing `Integer.valueOf(1)` calls the Object version, which removes the VALUE 1, not the index 1."
),
Q("EXERCISE","HARD",
  "Which interface should your class implement if you want to define a natural sorting order for objects of your class (e.g., sorting Students by their GPA)?",
  ["Comparator", "Comparable", "Sortable", "Cloneable"],
  "Comparable",
  "Implementing `Comparable<T>` requires you to override the `compareTo()` method, defining the default 'natural' sorting logic for the objects of that class."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which class provides methods to sort and reverse Lists, similar to how the `Arrays` class works for arrays?",
  ["Collections", "Collection", "Sorter", "ListHelper"],
  "Collections",
  "The `java.util.Collections` class (plural) is a utility class consisting exclusively of static methods that operate on or return collections (like `Collections.sort(list)`)."
),
Q("CAT 1","EASY",
  "If you need a Key-Value data structure that maintains the order in which you inserted the keys, what should you use?",
  ["HashMap", "TreeMap", "LinkedHashMap", "OrderedMap"],
  "LinkedHashMap",
  "A `HashMap` scrambles the order. A `TreeMap` sorts them alphabetically/numerically. A `LinkedHashMap` maintains the exact insertion order."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "What is the output?\n<pre><code>Map&lt;Integer, String&gt; map = new HashMap&lt;&gt;();\nmap.put(1, \"A\");\nmap.put(1, \"B\");\nSystem.out.println(map.size());</code></pre>",
  ["2", "1", "0", "Exception"],
  "1",
  "The key `1` already exists. The second `put` overwrites the value \"A\" with \"B\". The map only contains one entry: `{1=\"B\"}`."
),
Q("CAT 1","MEDIUM",
  "What does the `Collections.unmodifiableList(list)` method do?",
  ["It prevents the list from being sorted", "It returns a read-only view of the specified list; any attempt to add or remove elements will throw an UnsupportedOperationException", "It encrypts the list", "It creates a deep clone of the list"],
  "It returns a read-only view of the specified list; any attempt to add or remove elements will throw an UnsupportedOperationException",
  "This is highly useful for encapsulating internal lists inside a class. You can return an unmodifiable list so external code can read it, but cannot alter the original data."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "Trace the output:\n<pre><code>List&lt;String&gt; list = new ArrayList&lt;&gt;(Arrays.asList(\"A\", \"B\", \"C\"));\nfor(String s : list) {\n    if(s.equals(\"B\")) list.remove(s);\n}</code></pre>",
  ["The list becomes [A, C]", "Compile Error", "ConcurrentModificationException at runtime", "The list remains unchanged"],
  "ConcurrentModificationException at runtime",
  "You CANNOT modify (add/remove) a collection structurally while iterating over it using a `for-each` loop. You must use an `Iterator` and call `iterator.remove()` to do this safely."
),
Q("CAT 1","HARD",
  "What is the default initial capacity of an ArrayList in Java?",
  ["0", "10", "16", "Infinite"],
  "10",
  "When you create `new ArrayList<>()`, Java creates an internal array with a capacity of 10. When it fills up, it creates a new array 1.5 times larger and copies the data over."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "Which method do you use to check if a specific key exists in a HashMap?",
  ["hasKey()", "containsKey()", "includes()", "findKey()"],
  "containsKey()",
  "`map.containsKey(key)` returns true if the map contains a mapping for the specified key."
),
Q("POSSIBLE QNS","EASY",
  "How do you remove all elements from any Collection (List, Set, Map)?",
  ["delete()", "empty()", "clear()", "removeAll()"],
  "clear()",
  "The `clear()` method removes all of the elements from the collection, leaving it empty."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is a Queue in Java Collections?",
  ["A collection used to store key-value pairs", "A collection designed for holding elements prior to processing, typically ordering them in a FIFO (First-In-First-Out) manner", "A collection that prevents duplicates", "An alternative to arrays"],
  "A collection designed for holding elements prior to processing, typically ordering them in a FIFO (First-In-First-Out) manner",
  "Queues are used in scenarios like task scheduling or message processing where the first item added should be the first item processed."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is the difference between `Comparable` and `Comparator`?",
  ["There is no difference", "`Comparable` is used to define multiple sorting logic, `Comparator` defines default logic", "`Comparable` defines the default, natural sorting order within the class itself. `Comparator` is a separate class used to define multiple custom sorting rules (e.g. sort by Name, then by Age).", "Both are used for memory management"],
  "`Comparable` defines the default, natural sorting order within the class itself. `Comparator` is a separate class used to define multiple custom sorting rules (e.g. sort by Name, then by Age).",
  "`Comparable` uses `compareTo(Object o)`. `Comparator` uses `compare(Object o1, Object o2)`."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What does it mean when we say HashMap has a default Load Factor of 0.75?",
  ["It means it can only store 75 items", "It means when the hash table is 75% full, it automatically resizes (doubles its capacity) to maintain performance and avoid collisions", "It means 25% of data might be lost", "It is the compression ratio of the data"],
  "It means when the hash table is 75% full, it automatically resizes (doubles its capacity) to maintain performance and avoid collisions",
  "The Load Factor is a measure that decides when to increase the capacity of the HashMap. 0.75 offers a good tradeoff between time and space costs."
),
Q("POSSIBLE QNS","HARD",
  "Can you insert `null` into a TreeSet?",
  ["Yes, multiple nulls are allowed", "Yes, but only one null is allowed", "No, inserting null into a TreeSet throws a NullPointerException", "Only if it is the first element"],
  "No, inserting null into a TreeSet throws a NullPointerException",
  "Because TreeSet relies on comparing elements to sort them, comparing an element to `null` causes a `NullPointerException`."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Which keyword is used in a `for` loop to iterate over all elements in an ArrayList?",
  ["in", ": (colon)", "->", "=>"],
  ": (colon)",
  "The enhanced for-loop syntax is `for (Type variable : collection)`. The colon acts as 'in'."
),
Q("UE","EASY",
  "If you need a collection that works exactly like a Stack (Last-In-First-Out / LIFO), which class should you use?",
  ["ArrayList", "HashMap", "Stack or ArrayDeque", "Queue"],
  "Stack or ArrayDeque",
  "The `Stack` class extends Vector to implement LIFO. However, in modern Java, `ArrayDeque` is highly recommended for stack implementations as it is much faster."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the output?\n<pre><code>List&lt;String&gt; list = new ArrayList&lt;&gt;();\nlist.add(\"A\");\nlist.add(\"B\");\nlist.add(1, \"C\");\nSystem.out.println(list);</code></pre>",
  ["[A, B, C]", "[A, C, B]", "[C, A, B]", "IndexOutOfBoundsException"],
  "[A, C, B]",
  "The `add(index, element)` method inserts the element at the specified position. It pushes 'B' to the right to make room for 'C' at index 1."
),
Q("UE","MEDIUM",
  "How does a `HashSet` internally ensure that elements are unique?",
  ["It loops through all elements using `.equals()` every time", "It internally uses a `HashMap`. The element you add becomes the Key, and a dummy object is used as the Value. Since Keys must be unique, the Set guarantees uniqueness", "It uses the `Comparable` interface", "It encrypts the data"],
  "It internally uses a `HashMap`. The element you add becomes the Key, and a dummy object is used as the Value. Since Keys must be unique, the Set guarantees uniqueness",
  "Yes! The source code of HashSet literally just wraps a HashMap. `set.add(e)` translates to `map.put(e, PRESENT)`."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "Trace the output:\n<pre><code>PriorityQueue&lt;Integer&gt; pq = new PriorityQueue&lt;&gt;();\npq.add(5);\npq.add(1);\npq.add(3);\nSystem.out.println(pq.poll() + \" \" + pq.poll());</code></pre>",
  ["5 1", "5 3", "1 3", "1 5"],
  "1 3",
  "A `PriorityQueue` orders elements according to their natural ordering (lowest to highest for Integers). `.poll()` removes and returns the head of the queue. First is 1, next is 3."
),
Q("UE","HARD",
  "What is the difference between `map.put(key, value)` and `map.replace(key, value)`?",
  ["There is no difference", "`put` adds the entry if it doesn't exist or overwrites it if it does. `replace` ONLY overwrites the value if the key ALREADY exists; if the key is missing, it does nothing", "`replace` is faster", "`put` is for new keys only, it throws an error if the key exists"],
  "`put` adds the entry if it doesn't exist or overwrites it if it does. `replace` ONLY overwrites the value if the key ALREADY exists; if the key is missing, it does nothing",
  "`replace` is safer when you specifically want to update an existing record but don't want to accidentally create a new record if the ID is wrong."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 4 (Part 3) questions!`);

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
