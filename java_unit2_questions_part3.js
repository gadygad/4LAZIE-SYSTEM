/**
 * JAVA UNIT 2 - ARRAYS - HANDCRAFTED QUESTIONS (PART 3)
 * Based on: Unit 2. Array in Java (Mastery & Edge Cases)
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
  "Which array declaration specifically allocates memory for exactly 10 integers?",
  [
    "int[] arr = new int[9];",
    "int[] arr = new int(10);",
    "int[] arr = new int[10];",
    "int[10] arr;"
  ],
  "int[] arr = new int[10];",
  "The correct syntax uses the 'new' keyword followed by the type and the size in square brackets: new int[10]."
),
Q("QUIZ","EASY",
  "What is the output of this code?\n<pre><code>int[] arr = {1, 2, 3};\narr[1] = 99;\nSystem.out.println(arr[1]);</code></pre>",
  ["2", "1", "99", "Compile error"],
  "99",
  "Arrays are mutable. The element at index 1 (which was initially 2) is updated to 99."
),
Q("QUIZ","EASY",
  "In a 2D array representing a grid, if you declare it as int[][] grid = new int[5][4];, how many total integer elements can it hold?",
  ["9", "20", "5", "4"],
  "20",
  "A 5x4 grid contains 5 rows and 4 columns. 5 * 4 = 20 total elements."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "Which of the following is true regarding Java arrays and covariance?",
  [
    "Arrays in Java are invariant (Object[] cannot point to String[])",
    "Arrays in Java are covariant (Object[] can point to String[])",
    "Arrays in Java are contravariant",
    "Covariance only applies to primitive arrays"
  ],
  "Arrays in Java are covariant (Object[] can point to String[])",
  "In Java, if B is a subclass of A, then B[] is considered a subtype of A[]. Thus, Object[] objArr = new String[5]; is perfectly legal (though it can lead to ArrayStoreException)."
),
Q("QUIZ","MEDIUM",
  "What is the output of the following snippet?\n<pre><code>int[] nums = {10, 20, 30};\nint x = nums.length;\nint y = nums[x - 1];\nSystem.out.println(y);</code></pre>",
  ["10", "20", "30", "ArrayIndexOutOfBoundsException"],
  "30",
  "nums.length is 3. x = 3. y = nums[3 - 1] = nums[2]. The element at index 2 is 30."
),
Q("QUIZ","MEDIUM",
  "Consider this method signature: public static void process(int[]... matrices). What does this accept?",
  [
    "A single 1D array of integers",
    "A variable number of integer variables",
    "A variable number of 1D integer arrays (effectively a 2D array)",
    "This is invalid Java syntax"
  ],
  "A variable number of 1D integer arrays (effectively a 2D array)",
  "The syntax 'int[]... matrices' means varargs of int arrays. You can pass zero or more int[] objects, which the method receives as an int[][] (a 2D array)."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is the output?\n<pre><code>Number[] arr = new Integer[3];\narr[0] = 10;\narr[1] = 3.14;\nSystem.out.println(arr[0]);</code></pre>",
  [
    "10",
    "3.14",
    "Compile error",
    "ArrayStoreException at runtime"
  ],
  "ArrayStoreException at runtime",
  "Because of array covariance, 'Number[] arr = new Integer[3]' compiles. However, at runtime, the array is strictly an Integer array. Attempting to insert a Double (3.14) throws an ArrayStoreException."
),
Q("QUIZ","HARD",
  "What does this code do?\n<pre><code>int[] a = {1, 2, 3};\nSystem.arraycopy(a, 0, a, 1, 2);\nSystem.out.println(Arrays.toString(a));</code></pre>",
  [
    "[1, 1, 2]",
    "[1, 2, 3]",
    "[1, 2, 2]",
    "ArrayIndexOutOfBoundsException"
  ],
  "[1, 1, 2]",
  "System.arraycopy safely handles overlapping ranges. It copies 2 elements starting from index 0 (which are 1, 2) and pastes them starting at index 1. The array {1, 2, 3} becomes {1, 1, 2}."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Write the output:\n<pre><code>String[] colors = {\"Red\", \"Green\", \"Blue\"};\nSystem.out.println(colors[colors.length - 1]);</code></pre>",
  ["Red", "Green", "Blue", "IndexOutOfBoundsException"],
  "Blue",
  "colors.length is 3. The expression (length - 1) is 2. colors[2] is 'Blue'."
),
Q("EXERCISE","EASY",
  "Which array represents a proper initialization of a String array containing empty strings?",
  [
    "String[] s = new String[5];",
    "String[] s = {\"\", \"\", \"\"};",
    "String[] s = {null, null};",
    "String[] s = new String[];"
  ],
  "String[] s = {\"\", \"\", \"\"};",
  "Using new String[5] initializes elements to null, not empty strings. Providing explicit empty strings inside curly braces {\"\", \"\", \"\"} is correct."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What will be printed?\n<pre><code>int[] arr = new int[5];\nbyte b = 4;\narr[b] = 100;\nSystem.out.println(arr[4]);</code></pre>",
  [
    "0",
    "100",
    "Compile Error: byte cannot be used as index",
    "Exception"
  ],
  "100",
  "Java allows using byte, short, char, and int as array indices. The byte 'b' (4) is implicitly promoted to int. arr[4] is successfully set to 100."
),
Q("EXERCISE","MEDIUM",
  "Trace the output:\n<pre><code>int[] data = {1, 2, 3, 4};\nfor (int i = 0; i < data.length; i += 2) {\n    System.out.print(data[i] + \" \");\n}</code></pre>",
  [
    "1 2 3 4",
    "1 3",
    "2 4",
    "1 2"
  ],
  "1 3",
  "The loop increments 'i' by 2 each iteration. It accesses index 0 (1) and index 2 (3)."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the output of this reflection code?\n<pre><code>int[] arr = (int[]) java.lang.reflect.Array.newInstance(int.class, 3);\njava.lang.reflect.Array.setInt(arr, 1, 50);\nSystem.out.println(arr[1]);</code></pre>",
  [
    "0",
    "1",
    "50",
    "Compile error"
  ],
  "50",
  "This code uses the Reflection API to dynamically create an int array of size 3 and set the value at index 1 to 50. It successfully prints 50."
),
Q("EXERCISE","HARD",
  "What does this code do? (Assume 'arr' is an int array)\n<pre><code>int max = arr[0];\nfor (int i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n        max = arr[i];\n    }\n}</code></pre>",
  [
    "Finds the minimum value in the array",
    "Sorts the array in ascending order",
    "Finds the maximum value in the array",
    "Counts the number of elements in the array"
  ],
  "Finds the maximum value in the array",
  "This is the classic algorithm to find the largest element in an array. It initializes 'max' to the first element and updates it whenever a larger element is found."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Why must you specify the size of an array when creating it with the 'new' keyword (e.g. new int[5])?",
  [
    "Because the compiler needs to know what values to put inside",
    "Because the JVM needs to allocate a specific, contiguous block of memory on the heap",
    "To prevent loops from running infinitely",
    "It is optional in Java 8+"
  ],
  "Because the JVM needs to allocate a specific, contiguous block of memory on the heap",
  "Arrays require contiguous memory allocation. The JVM must know the exact size upfront to reserve a continuous block of memory large enough to hold all elements."
),
Q("CAT 1","EASY",
  "What is the difference between declaring an array as Object[] and int[]?",
  [
    "int[] is faster; Object[] is slower",
    "Object[] can store any reference type (Strings, instances of classes); int[] can only store primitive integers",
    "Object[] has dynamic size; int[] is fixed size",
    "There is no difference"
  ],
  "Object[] can store any reference type (Strings, instances of classes); int[] can only store primitive integers",
  "Object is the root class of all Java objects. Thus, an Object[] can store any object. int[] is specifically restricted to primitive integer values."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "Analyze this code:\n<pre><code>int[] arr = {1, 2, 3};\nList&lt;int[]&gt; list = Arrays.asList(arr);\nSystem.out.println(list.size());</code></pre>\nWhat is the output?",
  [
    "3",
    "1",
    "Compile error",
    "UnsupportedOperationException"
  ],
  "1",
  "Tricky question! Arrays.asList() expects varargs of objects. Since 'int' is a primitive, the entire int[] array is treated as a SINGLE Object. Thus, a List containing exactly ONE element (the array itself) is created."
),
Q("CAT 1","MEDIUM",
  "How do you properly convert an array of primitives (e.g., int[]) to a List in modern Java (Java 8+)?",
  [
    "Arrays.asList(arr)",
    "List.of(arr)",
    "Arrays.stream(arr).boxed().collect(Collectors.toList())",
    "arr.toList()"
  ],
  "Arrays.stream(arr).boxed().collect(Collectors.toList())",
  "Because Arrays.asList() doesn't autobox primitive arrays, you must use Streams to convert the int[] to an IntStream, box the primitives into Integers, and collect them into a List."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is printed?\n<pre><code>int[][] m = {{1,2}, {3,4,5}, {6}};\nint sum = 0;\nfor (int[] row : m) {\n    sum += row.length;\n}\nSystem.out.println(sum);</code></pre>",
  ["3", "6", "9", "ArrayIndexOutOfBoundsException"],
  "6",
  "The loop iterates over the rows of the jagged array. It adds the lengths of each row: 2 (for {1,2}) + 3 (for {3,4,5}) + 1 (for {6}) = 6. This effectively counts the total number of elements."
),
Q("CAT 1","HARD",
  "What is the output?\n<pre><code>int[] arr = new int[2];\narr[0] = 5;\narr[1] = 10;\narr = new int[3];\nSystem.out.println(arr[0]);</code></pre>",
  ["5", "10", "0", "Compile Error"],
  "0",
  "The statement 'arr = new int[3];' creates a BRAND NEW array on the heap and points the 'arr' reference to it. The new array has default values (0). The old array {5, 10} becomes eligible for garbage collection."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "Which array is completely filled with zeros?",
  [
    "int[] a = {1, 2, 3};",
    "int[] a = new int[5];",
    "int[] a = new int[]{1, 1, 1};",
    "Integer[] a = new Integer[5];"
  ],
  "int[] a = new int[5];",
  "When created with the 'new' keyword without an initializer list, primitive numeric arrays are filled with their default value, which is 0."
),
Q("POSSIBLE QNS","EASY",
  "In a method `public void process(int[] data)`, what happens if you pass `null` instead of an array?",
  [
    "The code won't compile",
    "The method receives an empty array",
    "The method receives null, which will cause a NullPointerException if it tries to access data.length or data[0]",
    "Java automatically converts null to new int[0]"
  ],
  "The method receives null, which will cause a NullPointerException if it tries to access data.length or data[0]",
  "Arrays are objects, so array references can be null. Dereferencing a null array (like checking its length) throws a NullPointerException."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is the output of this array rotation logic?\n<pre><code>int[] arr = {1, 2, 3, 4};\nint temp = arr[0];\nfor (int i = 0; i < arr.length - 1; i++) {\n    arr[i] = arr[i + 1];\n}\narr[arr.length - 1] = temp;\nSystem.out.println(Arrays.toString(arr));</code></pre>",
  [
    "[1, 2, 3, 4]",
    "[4, 1, 2, 3]",
    "[2, 3, 4, 1]",
    "[2, 3, 4, 4]"
  ],
  "[2, 3, 4, 1]",
  "This algorithm performs a Left Rotation by one position. The first element (1) is saved, elements are shifted left, and the saved element is placed at the very end."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is printed?\n<pre><code>String[] s1 = {\"A\", \"B\"};\nString[] s2 = {\"A\", \"B\"};\nSystem.out.println(s1 == s2);\nSystem.out.println(Arrays.equals(s1, s2));</code></pre>",
  [
    "true true",
    "false true",
    "false false",
    "true false"
  ],
  "false true",
  "'s1 == s2' is false because they are distinct objects in memory. Arrays.equals(s1, s2) is true because the contents of the arrays are identical."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "A developer needs to sort a massive array of 10 million integers as quickly as possible on a multi-core processor. Which Java method should they use?",
  [
    "Arrays.sort(arr)",
    "Arrays.parallelSort(arr)",
    "Collections.sort(arr)",
    "arr.parallelSort()"
  ],
  "Arrays.parallelSort(arr)",
  "Introduced in Java 8, Arrays.parallelSort() uses the Fork/Join framework to divide the array into sub-arrays, sorts them concurrently on multiple CPU cores, and merges them, providing faster sorting for huge arrays."
),
Q("POSSIBLE QNS","HARD",
  "What does this code do to the array?\n<pre><code>int j = 0;\nfor (int i = 0; i < arr.length; i++) {\n    if (arr[i] != 0) {\n        arr[j++] = arr[i];\n    }\n}\nwhile (j < arr.length) {\n    arr[j++] = 0;\n}</code></pre>",
  [
    "Reverses the array",
    "Sorts the array",
    "Moves all non-zero elements to the front and all zeros to the end",
    "Deletes all zero elements and shrinks the array size"
  ],
  "Moves all non-zero elements to the front and all zeros to the end",
  "This is a classic algorithm. It first compacts all non-zero elements to the beginning of the array, then fills the remaining trailing spaces with zeros."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Can an array in Java store mixed data types, such as integers and floats, in a single int[] array?",
  [
    "Yes, but they are converted to Strings",
    "Yes, Java automatically converts floats to ints",
    "No, arrays are homogeneous data structures (same data type only)",
    "Yes, if the array is created with varargs"
  ],
  "No, arrays are homogeneous data structures (same data type only)",
  "An int[] can only store integers. If you try to store a float, it will result in a compile-time type mismatch error (unless explicitly cast, causing data loss)."
),
Q("UE","EASY",
  "If you need an array that automatically grows in size when you add more elements, what should you use instead of standard arrays?",
  [
    "DynamicArray",
    "java.util.ArrayList",
    "GrowableArray",
    "VectorArray"
  ],
  "java.util.ArrayList",
  "The ArrayList class in Java provides a resizable-array implementation of the List interface, handling dynamic resizing automatically under the hood."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the output?\n<pre><code>char[] letters = new char[]{'H', 'e', 'l', 'l', 'o'};\nSystem.out.println(letters);\nint[] numbers = new int[]{1, 2, 3};\nSystem.out.println(numbers);</code></pre>",
  [
    "Hello and 123",
    "Hello and [I@hashcode",
    "[C@hashcode and [I@hashcode",
    "Compile error"
  ],
  "Hello and [I@hashcode",
  "PrintStream (System.out) has a special overloaded print() method specifically for char arrays, which prints the actual characters. For other arrays like int[], it falls back to Object.toString(), printing the hashcode."
),
Q("UE","MEDIUM",
  "How do you declare a 2D array and initialize it with values immediately?",
  [
    "int[][] arr = new int[2][2] = {{1, 2}, {3, 4}};",
    "int[][] arr = {{1, 2}, {3, 4}};",
    "int arr[][] = new int({{1, 2}, {3, 4}});",
    "int[][] arr = {1, 2, 3, 4};"
  ],
  "int[][] arr = {{1, 2}, {3, 4}};",
  "Using nested curly braces without specifying dimensions is the correct syntax for inline initialization of multidimensional arrays."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What is the output?\n<pre><code>Integer[] arr = {1, 2, 3};\nList&lt;Integer&gt; list = Arrays.asList(arr);\nlist.set(0, 99);\nSystem.out.println(arr[0]);</code></pre>",
  ["1", "99", "Compile error", "UnsupportedOperationException"],
  "99",
  "Arrays.asList() returns a List that is BACKED by the original array. Any changes made to the List (via set()) directly reflect in the original array."
),
Q("UE","HARD",
  "What is the output?\n<pre><code>Integer[] arr = {1, 2, 3};\nList&lt;Integer&gt; list = Arrays.asList(arr);\nlist.add(4);\nSystem.out.println(list.size());</code></pre>",
  ["4", "3", "UnsupportedOperationException", "Compile error"],
  "UnsupportedOperationException",
  "Arrays.asList() returns a FIXED-SIZE list backed by the array. You can modify existing elements, but you cannot add or remove elements. Doing so throws an UnsupportedOperationException."
)

];

async function insertQuestions() {
    const client = new MongoClient(URI);
    try {
        await client.connect();
        const db = client.db('school_db');

        // Check for duplicates before inserting
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 2 (Part 3) questions!`);

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
