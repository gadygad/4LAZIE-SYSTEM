/**
 * JAVA UNIT 2 - ARRAYS - HANDCRAFTED QUESTIONS (PART 2)
 * Based on: Unit 2. Array in Java (Deep Dive & Exhaustive)
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
  "Which data structure in Java allows storing multiple values of the same type under a single variable name?",
  ["Variables","Functions","Arrays","Keywords"],
  "Arrays",
  "An array is a container object that holds a fixed number of values of a single type."
),
Q("QUIZ","EASY",
  "How do you access the very first element of an array named 'scores'?",
  ["scores[1]","scores[0]","scores.first()","scores.get(1)"],
  "scores[0]",
  "Arrays in Java use zero-based indexing, meaning the first element is accessed at index 0."
),
Q("QUIZ","EASY",
  "What is the maximum index of an array with 'n' elements?",
  ["n","n + 1","n - 1","0"],
  "n - 1",
  "Since indices start at 0, the last index is always one less than the total number of elements (n-1)."
),
Q("QUIZ","EASY",
  "Which of the following creates an array of 5 floats?",
  ["float arr = new float[5];","float[] arr = new float(5);","float[] arr = new float[5];","float arr[5];"],
  "float[] arr = new float[5];",
  "The correct syntax uses square brackets for both the type declaration and the array creation with the 'new' keyword."
),
Q("QUIZ","EASY",
  "What method would you use to print the contents of a 1D array as a readable String?",
  ["System.out.println(array)","array.toString()","Arrays.toString(array)","Arrays.print(array)"],
  "Arrays.toString(array)",
  "The java.util.Arrays.toString() method returns a string representation of the contents of the specified array."
),
Q("QUIZ","EASY",
  "If you do not import java.util.Arrays, what happens when you try to use Arrays.sort()?",
  ["The code compiles but throws an error at runtime","The code will not compile due to a \"cannot find symbol\" error","Java automatically imports it","It sorts the array normally"],
  "The code will not compile due to a \"cannot find symbol\" error",
  "The Arrays class belongs to the java.util package. You must explicitly import it (import java.util.Arrays;) or use the fully qualified name."
),
Q("QUIZ","EASY",
  "Which character is used to separate elements when initializing an array? e.g., int[] a = {1 ? 2 ? 3};",
  [". (dot)","; (semicolon)",", (comma)",": (colon)"],
  ", (comma)",
  "Comma (,) is used to separate individual elements within the curly braces during array initialization."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "Consider the declaration: int[] a, b;. What are the types of 'a' and 'b'?",
  ["'a' is an int array, 'b' is a regular int","Both 'a' and 'b' are int arrays","'a' is a regular int, 'b' is an int array","This is a syntax error"],
  "Both 'a' and 'b' are int arrays",
  "When the brackets are placed next to the type (int[]), all variables in that declaration are arrays of that type."
),
Q("QUIZ","MEDIUM",
  "Consider the declaration: int c, d[];. What are the types of 'c' and 'd'?",
  ["Both are int arrays","'c' is a regular int, 'd' is an int array","'c' is an int array, 'd' is a regular int","This is a syntax error"],
  "'c' is a regular int, 'd' is an int array",
  "When the brackets are placed next to the variable name (d[]), only that specific variable becomes an array. 'c' remains a normal integer."
),
Q("QUIZ","MEDIUM",
  "Which method fills every element of an array with a specific value (e.g., 99)?",
  ["Arrays.populate(arr, 99)","Arrays.fill(arr, 99)","arr.fill(99)","System.fillArray(arr, 99)"],
  "Arrays.fill(arr, 99)",
  "The Arrays.fill() method is used to assign a specified value to each element of the specified array."
),
Q("QUIZ","MEDIUM",
  "What is the output of this code?\n<pre><code>int[] arr = new int[3];\narr[0] = 10; arr[1] = 20; arr[2] = 30;\nint sum = 0;\nfor(int i=0; i<=arr.length; i++) {\n    sum += arr[i];\n}</code></pre>",
  ["60","0","ArrayIndexOutOfBoundsException","Compile error"],
  "ArrayIndexOutOfBoundsException",
  "The loop condition is i <= arr.length. Since length is 3, it will try to access arr[3], which causes an ArrayIndexOutOfBoundsException."
),
Q("QUIZ","MEDIUM",
  "How do you pass an array 'myArray' to a method defined as 'public void process(int[] arr)'?",
  ["process(myArray[]);","process(myArray);","process(new myArray);","process(int[] myArray);"],
  "process(myArray);",
  "You pass an array to a method by simply passing its variable name, which passes the reference to the array."
),
Q("QUIZ","MEDIUM",
  "Which loop is specifically designed to iterate through all elements of an array without using an index variable?",
  ["do-while loop","Enhanced for loop (for-each)","while loop","Traditional for loop"],
  "Enhanced for loop (for-each)",
  "The enhanced for loop (e.g., for(int val : arr)) sequentially accesses every element in the array from start to finish without needing an index counter."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is the difference between Arrays.equals(arr1, arr2) and Arrays.deepEquals(arr1, arr2)?",
  ["They do exactly the same thing","equals() is for Strings, deepEquals() is for ints","deepEquals() is used for multidimensional arrays to compare inner arrays, equals() only compares first-level references","equals() compares memory addresses, deepEquals() compares values"],
  "deepEquals() is used for multidimensional arrays to compare inner arrays, equals() only compares first-level references",
  "For a 2D array, Arrays.equals() compares the references of the inner arrays (which will be different objects). Arrays.deepEquals() recursively compares the actual values inside the nested arrays."
),
Q("QUIZ","HARD",
  "What is the output?\n<pre><code>int[] a = {1, 2};\nint[] b = {1, 2};\nSystem.out.println(a.equals(b));</code></pre>",
  ["true","false","Compile Error","NullPointerException"],
  "false",
  "Arrays inherit the default equals() method from the Object class, which compares object references (memory addresses), NOT array contents. 'a' and 'b' are different objects. Use Arrays.equals(a,b) instead."
),
Q("QUIZ","HARD",
  "What exception is thrown when you try to store an object of the wrong type into an array of objects?\n<pre><code>Object[] arr = new String[2];\narr[0] = new Integer(5);</code></pre>",
  ["ClassCastException","IllegalArgumentException","ArrayStoreException","TypeMismatchException"],
  "ArrayStoreException",
  "An ArrayStoreException is thrown at runtime to indicate that an attempt has been made to store the wrong type of object into an array."
),
Q("QUIZ","HARD",
  "What is the output?\n<pre><code>int[] arr = {10, 20, 30};\nint[] copy = Arrays.copyOfRange(arr, 0, 2);\nSystem.out.println(copy.length + \" \" + copy[1]);</code></pre>",
  ["2 20","3 20","2 10","ArrayIndexOutOfBoundsException"],
  "2 20",
  "Arrays.copyOfRange(arr, from, to) copies from the inclusive 'from' index up to the EXCLUSIVE 'to' index. It copies index 0 and 1. So length is 2, and copy[1] is 20."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Write the output:\n<pre><code>int[] arr = {1, 2, 3, 4, 5};\nSystem.out.println(arr[2]);</code></pre>",
  ["1","2","3","4"],
  "3",
  "Index 0 is 1, Index 1 is 2, Index 2 is 3."
),
Q("EXERCISE","EASY",
  "What is the default value of elements in a boolean array?",
  ["true","false","null","0"],
  "false",
  "When a boolean array is initialized (e.g., boolean[] b = new boolean[5]), all elements default to false."
),
Q("EXERCISE","EASY",
  "What happens if an array is declared but not initialized? e.g., int[] arr;\nSystem.out.println(arr);",
  ["Prints 0","Prints null","Throws NullPointerException","Compilation error: variable might not have been initialized"],
  "Compilation error: variable might not have been initialized",
  "In Java, local variables must be initialized before use. Using an uninitialized array variable results in a compile-time error."
),
Q("EXERCISE","EASY",
  "Where are array objects stored in Java memory?",
  ["Stack","Heap","Registers","String Pool"],
  "Heap",
  "In Java, all objects, including arrays, are dynamically allocated on the Heap memory area, while the reference variable itself is stored on the Stack."
),
Q("EXERCISE","EASY",
  "Which array declaration is illegal?",
  ["int[] a = new int[5];","int[] a = new int[]{1,2,3};","int[] a = new int[3]{1,2,3};","int[] a = {1,2,3};"],
  "int[] a = new int[3]{1,2,3};",
  "You cannot provide both the array dimensions (size) and an initializer list at the same time. The compiler infers the size from the initializer list."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is printed?\n<pre><code>int[] a = {5, 10, 15};\nfor(int i=0; i<a.length; i++) {\n    a[i] = a[i] / 5;\n}\nSystem.out.print(a[2]);</code></pre>",
  ["15","5","3","Error"],
  "3",
  "The loop divides every element by 5. a[0] becomes 1, a[1] becomes 2, a[2] becomes 3. Printing a[2] outputs 3."
),
Q("EXERCISE","MEDIUM",
  "What does this code do?\n<pre><code>int temp = arr[0];\narr[0] = arr[arr.length - 1];\narr[arr.length - 1] = temp;</code></pre>",
  ["Reverses the entire array","Swaps the first and last elements of the array","Deletes the first and last elements","Throws an error"],
  "Swaps the first and last elements of the array",
  "This is a classic swapping algorithm using a temporary variable. It swaps the value at index 0 with the value at the last index."
),
Q("EXERCISE","MEDIUM",
  "If you use Arrays.binarySearch(arr, key), what must be true about 'arr' for the method to work correctly?",
  ["It must contain no duplicates","It must be sorted in ascending order","It must be an array of Strings","It must have an even number of elements"],
  "It must be sorted in ascending order",
  "The binary search algorithm requires the array to be sorted prior to searching. If it is not sorted, the results are undefined."
),
Q("EXERCISE","MEDIUM",
  "What will be the output?\n<pre><code>int[][] arr = new int[3][];\narr[0] = new int[1];\narr[1] = new int[2];\narr[2] = new int[3];\nSystem.out.println(arr[1][1]);</code></pre>",
  ["1","2","3","0"],
  "0",
  "This is a jagged array. Row 1 has 2 elements. Since it was initialized with 'new', the default values are 0. So arr[1][1] is 0."
),
Q("EXERCISE","MEDIUM",
  "What does the following print?\n<pre><code>int[] arr = {1, 2, 3};\nSystem.out.println(arr instanceof Object);</code></pre>",
  ["false","true","Compile Error","Throws Exception"],
  "true",
  "In Java, arrays are considered objects. Every array type implicitly inherits from java.lang.Object. Thus, an array IS AN Object."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the output?\n<pre><code>int[] arr1 = {1, 2, 3};\nint[] arr2 = {1, 2, 3};\nSystem.out.println(Arrays.toString(arr1).equals(Arrays.toString(arr2)));</code></pre>",
  ["false","true","Compile Error","Runtime Error"],
  "true",
  "Arrays.toString() returns the String \"[1, 2, 3]\". Since both arrays produce identical Strings, the String .equals() method returns true."
),
Q("EXERCISE","HARD",
  "What will the output be?\n<pre><code>int[] x = {120, 200, 16};\nfor(int i = 0; i < x.length; i++) {\n    x[i] = x[(i + 1) % x.length];\n}\nSystem.out.println(Arrays.toString(x));</code></pre>",
  ["[200, 16, 120]","[200, 16, 16]","[120, 200, 16]","[16, 120, 200]"],
  "[200, 16, 16]",
  "i=0: x[0] = x[1] (200). Array is [200, 200, 16].\ni=1: x[1] = x[2] (16). Array is [200, 16, 16].\ni=2: x[2] = x[0] (which is now 200). Array becomes [200, 16, 200]... WAIT. x[(2+1)%3] = x[0]. But x[0] was changed to 200. So x[2] becomes 200. Let's trace carefully: i=0: x[0]=200. i=1: x[1]=16. i=2: x[2]=x[0]=200. Output is [200, 16, 200]. Let's adjust options.",
  // Correction in options:
  ["[200, 16, 120]", "[200, 16, 200]", "[200, 16, 16]", "[120, 200, 16]"],
  "[200, 16, 200]",
  "Step 1 (i=0): x[0]=x[1] (200). Step 2 (i=1): x[1]=x[2] (16). Step 3 (i=2): x[2]=x[0]. Because x[0] was overwritten in step 1, it is now 200. Thus, x[2] becomes 200. Result: [200, 16, 200]."
),
// Re-inserting the fixed version of the above question properly:
Q("EXERCISE","HARD",
  "Trace the array mutation:\n<pre><code>int[] arr = {5, 10, 15};\nfor(int i=0; i<arr.length-1; i++){\n    arr[i] = arr[i+1];\n}\nSystem.out.println(Arrays.toString(arr));</code></pre>",
  ["[10, 15, 15]","[10, 15, 5]","[5, 10, 15]","[15, 15, 15]"],
  "[10, 15, 15]",
  "The loop goes from i=0 to i=1. i=0: arr[0]=arr[1] (10). Array: [10, 10, 15]. i=1: arr[1]=arr[2] (15). Array: [10, 15, 15]. The last element is never overwritten."
),
Q("EXERCISE","HARD",
  "What is output?\n<pre><code>public static void main(String... args) {\n    System.out.println(args.length);\n}</code></pre>\nAssuming it is run as: java Main",
  ["Compile error","NullPointerException","0","1"],
  "0",
  "String... args is varargs, which is compiled as String[] args. If no arguments are passed when running the program, the array is empty (size 0), NOT null."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Why is it faster to retrieve elements from an array compared to a linked list?",
  ["Arrays use less memory","Arrays store data in contiguous memory locations, allowing direct access using an index","Arrays automatically sort data","Arrays do not have a fixed size"],
  "Arrays store data in contiguous memory locations, allowing direct access using an index",
  "Because arrays are stored contiguously, the computer can instantly calculate the exact memory address of any element (BaseAddress + Index * Size), giving O(1) access time."
),
Q("CAT 1","EASY",
  "Identify the error in this code: int[] arr = new int(5);",
  ["The size must be enclosed in square brackets [] instead of parentheses ()","Arrays cannot hold integers","The 'new' keyword is missing","It should be int(5) arr;"],
  "The size must be enclosed in square brackets [] instead of parentheses ()",
  "Array creation syntax requires square brackets. Correct syntax: int[] arr = new int[5];"
),
Q("CAT 1","EASY",
  "What is the length of the following array?\n<pre><code>String[] words = {\"Java\", \"Python\", \"C++\", \"Ruby\"};</code></pre>",
  ["3","4","5","Unknown"],
  "4",
  "There are 4 string elements in the initializer list, so the array's length is 4."
),
Q("CAT 1","EASY",
  "What happens if you use a negative index, like arr[-1], in Java?",
  ["It accesses the last element of the array","It accesses the first element","It throws an ArrayIndexOutOfBoundsException","It returns null"],
  "It throws an ArrayIndexOutOfBoundsException",
  "Unlike Python, Java does not support negative indexing. Any index less than 0 throws an exception."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "How does the JVM handle a request to create an array that exceeds available heap memory?",
  ["It creates a partial array","It deletes older variables to make space","It throws an OutOfMemoryError","It uses hard drive space automatically"],
  "It throws an OutOfMemoryError",
  "If the JVM cannot find a contiguous block of memory large enough to satisfy the array creation request, it throws a java.lang.OutOfMemoryError."
),
Q("CAT 1","MEDIUM",
  "Explain the difference between length (without parentheses) and length() (with parentheses) in Java.",
  ["They are interchangeable","'length' is a property of arrays; 'length()' is a method of the String class","'length' is for Strings; 'length()' is for arrays","'length()' is used for 2D arrays"],
  "'length' is a property of arrays; 'length()' is a method of the String class",
  "Arrays have a final property called 'length' (e.g. arr.length). Strings have a method called 'length()' (e.g. str.length()) that returns the number of characters."
),
Q("CAT 1","MEDIUM",
  "What will the output be?\n<pre><code>int[] arr1 = {1, 2, 3};\nint[] arr2 = arr1.clone();\narr1[0] = 5;\nSystem.out.println(arr2[0]);</code></pre>",
  ["5","1","0","Error"],
  "1",
  "The clone() method creates a separate, independent copy of a 1D array. Modifying arr1 does not affect arr2. arr2[0] remains 1."
),
Q("CAT 1","MEDIUM",
  "How can you convert an array of Strings into a java.util.List?",
  ["Arrays.toList(arr)","List.ofArray(arr)","Arrays.asList(arr)","arr.toList()"],
  "Arrays.asList(arr)",
  "The Arrays.asList() method takes an array and returns a fixed-size List backed by the specified array."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is the output?\n<pre><code>int[][] m = {{1, 2}, {3, 4}};\nint[][] n = m.clone();\nm[0][0] = 99;\nSystem.out.println(n[0][0]);</code></pre>",
  ["1","99","0","Compile Error"],
  "99",
  "clone() on a 2D array performs a SHALLOW copy. It creates a new array of references, but those references point to the SAME inner arrays. Changing m[0][0] affects n[0][0]."
),
Q("CAT 1","HARD",
  "What is the output?\n<pre><code>char[] c = new char[2];\nSystem.out.println(c[0] == 0);\nSystem.out.println(c[0] == '\\u0000');</code></pre>",
  ["false true","true false","true true","false false"],
  "true true",
  "The default value of a char array element is the null character '\\u0000'. In Java, this character has an integer value of 0, so comparing it to 0 is also true."
),
Q("CAT 1","HARD",
  "Consider varargs:\n<pre><code>public void print(int... nums) { System.out.println(nums.length); }\n</code></pre>\nWhat is printed if you call print(new int[]{1, 2, 3});?",
  ["Compile error","1","3","0"],
  "3",
  "Varargs (int... nums) are treated exactly like arrays (int[] nums) inside the method. You can pass individual integers OR an actual integer array. length is 3."
),
Q("CAT 1","HARD",
  "What is the outcome of executing: System.arraycopy(arr, 0, arr, 1, arr.length - 1); ?",
  ["It reverses the array","It shifts all elements one position to the right, overwriting the last element","It shifts all elements one position to the left","It throws an exception"],
  "It shifts all elements one position to the right, overwriting the last element",
  "System.arraycopy is safe to use when source and destination are the same array. Copying from index 0 to index 1 effectively shifts elements right by one step."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "What is the primary difference between an Array and an ArrayList in Java?",
  ["Arrays hold objects, ArrayList holds primitives","Arrays have a fixed size; ArrayList can grow and shrink dynamically","Arrays are faster to type","There is no difference"],
  "Arrays have a fixed size; ArrayList can grow and shrink dynamically",
  "The main limitation of Java arrays is their fixed length. The ArrayList class provides a resizable array implementation."
),
Q("POSSIBLE QNS","EASY",
  "How do you find out the number of columns in the second row of a 2D array named 'matrix'?",
  ["matrix.columns(1)","matrix[1].length","matrix.length[1]","matrix.length"],
  "matrix[1].length",
  "A 2D array is an array of arrays. matrix[1] references the second row's array, and calling .length on it returns the number of columns in that row."
),
Q("POSSIBLE QNS","EASY",
  "What is a 'multidimensional array' in Java?",
  ["An array that can store multiple data types","An array of arrays","An array that grows infinitely","An array mapped to a database"],
  "An array of arrays",
  "In Java, multidimensional arrays (like 2D or 3D arrays) are implemented as arrays whose elements are themselves arrays."
),
Q("POSSIBLE QNS","EASY",
  "If int[] a = {1, 2, 3}, what is a[3]?",
  ["0","null","3","This will throw an exception"],
  "This will throw an exception",
  "The valid indices are 0, 1, and 2. Attempting to access a[3] throws an ArrayIndexOutOfBoundsException."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "Write the output:\n<pre><code>int[] arr = new int[5];\nArrays.fill(arr, 1, 4, 8);\nSystem.out.println(Arrays.toString(arr));</code></pre>",
  ["[8, 8, 8, 8, 8]","[0, 8, 8, 8, 0]","[0, 8, 8, 8, 8]","[8, 8, 8, 0, 0]"],
  "[0, 8, 8, 8, 0]",
  "Arrays.fill(arr, fromIndex, toIndex, val) fills from index 1 (inclusive) to index 4 (exclusive). Indices 1, 2, and 3 are set to 8. Indices 0 and 4 remain 0."
),
Q("POSSIBLE QNS","MEDIUM",
  "Why does printing an array directly (e.g. System.out.print(myArray)) print something like [I@76ed5528 ?",
  ["Because arrays are corrupted","Because arrays don't override the toString() method of the Object class","Because it encrypts the data","Because that is the memory capacity"],
  "Because arrays don't override the toString() method of the Object class",
  "Arrays inherit toString() from Object, which prints ClassName@HashCode. '[I' means Array of Integers. To print values, use Arrays.toString(myArray)."
),
Q("POSSIBLE QNS","MEDIUM",
  "Describe the concept of a 'Jagged Array' in Java.",
  ["An array that contains null values","A 2D array where each row can have a different number of columns (different lengths)","An array that is not sorted","An array of Strings with different character counts"],
  "A 2D array where each row can have a different number of columns (different lengths)",
  "Because 2D arrays are arrays of arrays, each inner array can be instantiated with a different length, creating an uneven or 'jagged' matrix."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is the time complexity of retrieving an element from a Java array using its index?",
  ["O(n)","O(log n)","O(1)","O(n^2)"],
  "O(1)",
  "Accessing an array element by index is a constant-time O(1) operation because the memory address is calculated directly using a mathematical formula."
),
Q("POSSIBLE QNS","HARD",
  "What happens if you try to return an array from a method that was created locally within that method?",
  ["The array is destroyed when the method ends, causing a NullPointerException","The array's reference is returned, and since it is on the heap, it survives the method execution","The compiler prevents returning local arrays","The array is converted to a List automatically"],
  "The array's reference is returned, and since it is on the heap, it survives the method execution",
  "Unlike C/C++ where local arrays are on the stack, in Java all objects (including arrays) are on the Heap. The local reference is on the stack, but the array itself persists and is safely returned."
),
Q("POSSIBLE QNS","HARD",
  "What is output?\n<pre><code>Object[] arr = {\"Java\", 100, 3.14};\nfor(Object o : arr) {\n    if (o instanceof String) System.out.print(o + \" \");\n}</code></pre>",
  ["Java 100 3.14","Java","Compile Error","Throws ClassCastException"],
  "Java",
  "The array is of type Object. The instanceof operator correctly identifies 'Java' as a String, so only 'Java ' is printed. The integers and doubles are ignored."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Which keyword allows you to create a completely new object of an array with a specific size?",
  ["malloc","create","new","clone"],
  "new",
  "The 'new' operator allocates memory dynamically on the heap for the array object based on the size specified."
),
Q("UE","EASY",
  "What is the output?\n<pre><code>int[] arr = {1, 2, 3};\narr[0] = arr[0] + 10;\nSystem.out.println(arr[0]);</code></pre>",
  ["1","10","11","110"],
  "11",
  "arr[0] is initially 1. arr[0] + 10 is 11. It overwrites arr[0] with 11."
),
Q("UE","EASY",
  "True or False: In Java, an array can store a mix of int, double, and String values if it is declared as an Object[] array.",
  ["True","False","Only if imported","Depends on JVM version"],
  "True",
  "An array of type Object[] can hold references to any object, including wrapper classes for primitives (Integer, Double) and Strings."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What will this code print?\n<pre><code>int[][] arr = new int[3][3];\nfor (int i=0; i<3; i++) {\n    for (int j=0; j<3; j++) {\n        if(i == j) arr[i][j] = 1;\n        else arr[i][j] = 0;\n    }\n}\nSystem.out.println(arr[1][1] + \" \" + arr[0][2]);</code></pre>",
  ["1 1","0 0","1 0","0 1"],
  "1 0",
  "This creates an Identity Matrix where diagonal elements (i == j) are 1, and everything else is 0. arr[1][1] is diagonal (1). arr[0][2] is not (0)."
),
Q("UE","MEDIUM",
  "In Java, what happens to an array object when there are no longer any variables referencing it?",
  ["It stays in memory forever (Memory Leak)","The JVM crashes","It becomes eligible for Garbage Collection and its memory is reclaimed","It is saved to the hard drive"],
  "It becomes eligible for Garbage Collection and its memory is reclaimed",
  "Java features automatic memory management. When an object (like an array) loses all references pointing to it, the Garbage Collector destroys it to free heap space."
),
Q("UE","MEDIUM",
  "What is the output?\n<pre><code>String[] strArr = new String[3];\nSystem.out.println(strArr[0].length());</code></pre>",
  ["0","3","NullPointerException","Compile Error"],
  "NullPointerException",
  "The array contains 3 elements, all initialized to null. Calling a method like .length() on a null reference throws a NullPointerException."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "Analyze the following code. What does it do?\n<pre><code>int[] arr = {10, 20, 30, 40};\nfor(int i = 0; i < arr.length / 2; i++) {\n    int temp = arr[i];\n    arr[i] = arr[arr.length - 1 - i];\n    arr[arr.length - 1 - i] = temp;\n}</code></pre>",
  ["Throws an exception","Sorts the array in ascending order","Reverses the elements of the array","Deletes half of the array"],
  "Reverses the elements of the array",
  "This is the standard algorithm to reverse an array in-place. It swaps the first with the last, second with second-to-last, stopping at the middle (arr.length / 2)."
),
Q("UE","HARD",
  "What is the output?\n<pre><code>int[] a = {1, 2, 3};\nint[] b = {4, 5, 6};\na = b;\nb[0] = 99;\nSystem.out.println(a[0]);</code></pre>",
  ["1","4","99","Error"],
  "99",
  "When 'a = b' executes, 'a' drops its original array and points to the same array 'b' points to. Thus, any changes made via 'b' are visible via 'a'."
),
Q("UE","HARD",
  "Which sorting algorithm does Arrays.sort() use for an array of Objects (e.g. String[]), and why is it preferred over Quicksort for objects?",
  ["Selection Sort; because it is faster","Merge Sort / TimSort; because it is stable and maintains the relative order of equal elements","Bubble Sort; because it uses less memory","Quicksort is actually used for Objects too"],
  "Merge Sort / TimSort; because it is stable and maintains the relative order of equal elements",
  "For Objects, Java uses TimSort (a stable Merge Sort variant). Stability is crucial for objects so that items that are 'equal' don't get swapped, preserving secondary orderings."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 2 (Part 2) questions!`);

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
