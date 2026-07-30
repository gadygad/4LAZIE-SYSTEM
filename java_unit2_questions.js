/**
 * JAVA UNIT 2 - ARRAYS - HANDCRAFTED QUESTIONS (100 Total)
 * Based on: Unit 2. Array in Java
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
  "What is an array in Java?",
  ["A single variable that holds a single value","A collection of elements of different data types","A collection of elements of the same data type stored in contiguous memory locations","A primitive data type"],
  "A collection of elements of the same data type stored in contiguous memory locations",
  "An array is a data structure used to store a fixed-size sequential collection of elements of the same type."
),
Q("QUIZ","EASY",
  "Which index is the first element of an array located at in Java?",
  ["1","0","-1","Depends on the array declaration"],
  "0",
  "Arrays in Java are zero-indexed, meaning the first element is at index 0."
),
Q("QUIZ","EASY",
  "How do you declare an array of integers in Java?",
  ["int array[];","int[] array;","Both int array[]; and int[] array; are valid","Array<int> array;"],
  "Both int array[]; and int[] array; are valid",
  "Java supports two ways to declare an array: int[] arr; (preferred) or int arr[]; (C/C++ style)."
),
Q("QUIZ","EASY",
  "Which property of an array tells you how many elements it can hold?",
  ["size","length","count","capacity"],
  "length",
  "In Java, every array has a built-in final property called 'length' that returns the size of the array (e.g., arr.length)."
),
Q("QUIZ","EASY",
  "If an array has 5 elements, what is the index of the last element?",
  ["5","4","6","0"],
  "4",
  "Since arrays are zero-indexed, an array of size N has indices from 0 to N-1. For size 5, the last index is 4."
),
Q("QUIZ","EASY",
  "What keyword is used to allocate memory for an array in Java?",
  ["create","alloc","new","malloc"],
  "new",
  "The 'new' keyword is used to instantiate an array in memory. Example: int[] arr = new int[10];"
),
Q("QUIZ","EASY",
  "Can you change the size of an array after it has been created in Java?",
  ["Yes, anytime","No, arrays have a fixed size","Yes, using the resize() method","Yes, but only for String arrays"],
  "No, arrays have a fixed size",
  "Java arrays are static in size. Once created, their length cannot be modified. If you need a dynamic size, use an ArrayList."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What happens if you try to access an array element with an index less than 0 or greater than or equal to its length?",
  ["It returns null","It returns 0","It throws an ArrayIndexOutOfBoundsException","It loops back to the start of the array"],
  "It throws an ArrayIndexOutOfBoundsException",
  "Java strictly checks array bounds at runtime. Accessing an invalid index throws an ArrayIndexOutOfBoundsException."
),
Q("QUIZ","MEDIUM",
  "What is the default value of the elements in an integer array (int[]) when it is created using the 'new' keyword?",
  ["null","1","-1","0"],
  "0",
  "When an array is created, Java automatically initializes its elements to default values. For int, it is 0. For boolean, it is false. For objects, it is null."
),
Q("QUIZ","MEDIUM",
  "Which of the following creates and initializes an array in a single statement?",
  ["int[] arr = new int[3]; arr[0]=1;","int[] arr = {1, 2, 3};","int arr[] = new int[];","int[] arr; arr = {1, 2, 3};"],
  "int[] arr = {1, 2, 3};",
  "The array initializer syntax '{1, 2, 3}' can be used to declare, create, and initialize an array in one step."
),
Q("QUIZ","MEDIUM",
  "What is the output of the following code?\n<pre><code>int[] nums = {10, 20, 30};\nSystem.out.println(nums[1]);</code></pre>",
  ["10","20","30","Error"],
  "20",
  "Index 0 is 10, index 1 is 20, index 2 is 30. Therefore, nums[1] is 20."
),
Q("QUIZ","MEDIUM",
  "How do you instantiate a 2D array in Java with 3 rows and 4 columns?",
  ["int[][] arr = new int[4][3];","int arr[][] = new int[3, 4];","int[][] arr = new int[3][4];","int[][] arr = new int(3, 4);"],
  "int[][] arr = new int[3][4];",
  "A 2D array is an array of arrays. The first bracket specifies the number of rows, and the second specifies the columns."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What will be the output of the following code?\n<pre><code>int[] a = new int[0];\nSystem.out.println(a.length);</code></pre>",
  ["0","1","NullPointerException","Compile time error"],
  "0",
  "It is perfectly legal in Java to create an array of size 0. It is an empty array, and its length is 0."
),
Q("QUIZ","HARD",
  "What is the output of this code?\n<pre><code>int[][] matrix = {{1, 2, 3}, {4, 5}};\nSystem.out.println(matrix[1].length);</code></pre>",
  ["3","2","5","ArrayIndexOutOfBoundsException"],
  "2",
  "Java supports 'jagged arrays' where each row can have a different length. matrix[1] refers to the second row {4, 5}, which has a length of 2."
),
Q("QUIZ","HARD",
  "Consider the code:\n<pre><code>int[] arr1 = {1, 2, 3};\nint[] arr2 = arr1;\narr2[0] = 99;\nSystem.out.println(arr1[0]);</code></pre>\nWhat is printed?",
  ["1","99","Compile Error","NullPointerException"],
  "99",
  "Arrays are objects in Java. Assigning arr1 to arr2 only copies the reference, not the array itself. Both point to the same array in memory. Modifying via arr2 affects arr1."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "Which loop is often used to iterate through all elements of an array?",
  ["for loop","while loop","do-while loop","switch"],
  "for loop",
  "The 'for' loop (and the enhanced for-each loop) is the most common way to traverse an array because the number of iterations is known (array length)."
),
Q("EXERCISE","EASY",
  "What is the output?\n<pre><code>int[] marks = {50, 60, 70};\nSystem.out.println(marks.length);</code></pre>",
  ["2","3","4","50"],
  "3",
  "The array 'marks' contains exactly 3 elements, so marks.length is 3."
),
Q("EXERCISE","EASY",
  "Which of the following is an invalid array declaration?",
  ["int[] a;","int a[];","int []a;","int a[5];"],
  "int a[5];",
  "In Java, you cannot specify the size of the array in the declaration part. The size is specified when the array is created using 'new'."
),
Q("EXERCISE","EASY",
  "What happens if you try to print an array directly, e.g., System.out.println(myArray)?",
  ["It prints all elements separated by commas","It prints all elements separated by spaces","It prints the memory address/hash code of the array object","It throws an error"],
  "It prints the memory address/hash code of the array object",
  "Printing an array directly prints its type and hashcode (e.g., [I@15db9742). To print elements, use Arrays.toString(myArray) or a loop."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>int[] x = {10, 20, 30};\nfor(int i : x) {\n    System.out.print(i + \" \");\n}</code></pre>",
  ["0 1 2","10 20 30","1 2 3","Error"],
  "10 20 30",
  "This is an enhanced for loop (for-each). It iterates through each element in the array 'x', so it prints '10 20 30'."
),
Q("EXERCISE","MEDIUM",
  "What will be printed?\n<pre><code>String[] words = new String[2];\nSystem.out.println(words[0]);</code></pre>",
  ["\"\" (empty string)","null","0","ArrayIndexOutOfBoundsException"],
  "null",
  "For an array of objects (like String), the default initialized value for each element is null."
),
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>int[] arr = {1, 2, 3, 4};\nSystem.out.println(arr[arr.length]);</code></pre>",
  ["4","0","ArrayIndexOutOfBoundsException","3"],
  "ArrayIndexOutOfBoundsException",
  "arr.length is 4. The valid indices are 0, 1, 2, 3. Attempting to access arr[4] throws an ArrayIndexOutOfBoundsException."
),
Q("EXERCISE","MEDIUM",
  "How can you find the sum of all elements in an integer array named 'arr'?",
  ["sum = arr.sum();","int sum = 0; for(int i=0; i<arr.length; i++) sum += arr[i];","int sum = 0; for(int i=1; i<=arr.length; i++) sum += arr[i];","Arrays.sum(arr);"],
  "int sum = 0; for(int i=0; i<arr.length; i++) sum += arr[i];",
  "Java arrays do not have a built-in sum() method. You must iterate over the elements and add them to a sum variable."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the output?\n<pre><code>int[] a = {1, 2, 3};\nint[] b = {1, 2, 3};\nSystem.out.println(a == b);</code></pre>",
  ["true","false","1","Error"],
  "false",
  "'==' compares object references. Even though 'a' and 'b' have identical contents, they point to different array objects in memory. To compare contents, use Arrays.equals(a, b)."
),
Q("EXERCISE","HARD",
  "What is the output?\n<pre><code>int[][] arr = { {1, 2}, {3, 4, 5} };\nSystem.out.println(arr[1][1]);</code></pre>",
  ["1","2","3","4"],
  "4",
  "arr[1] gets the second row: {3, 4, 5}. Then index [1] of that row gets the second element, which is 4."
),
Q("EXERCISE","HARD",
  "What happens here?\n<pre><code>int[] nums = new int[-3];</code></pre>",
  ["Creates an array of size 3","Creates an array with indices -1, -2, -3","Throws NegativeArraySizeException at runtime","Compile-time error"],
  "Throws NegativeArraySizeException at runtime",
  "Array sizes must be non-negative integers. Attempting to create an array with a negative size compiles fine but throws NegativeArraySizeException at runtime."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which statement accurately describes an array?",
  ["It can shrink and grow dynamically during runtime","It stores elements of the same data type in contiguous memory","It can store integers and Strings in the same array","It does not require initialization"],
  "It stores elements of the same data type in contiguous memory",
  "An array is a fixed-size, homogeneous data structure (elements of the same type) stored in contiguous memory."
),
Q("CAT 1","EASY",
  "Which package contains the 'Arrays' utility class for sorting and searching arrays?",
  ["java.lang","java.util","java.io","java.array"],
  "java.util",
  "The java.util.Arrays class provides useful static methods like sort(), binarySearch(), equals(), and toString() for manipulating arrays."
),
Q("CAT 1","EASY",
  "To sort an array 'arr' in ascending order, which method from the Arrays class would you use?",
  ["Arrays.order(arr);","arr.sort();","Arrays.sort(arr);","Collections.sort(arr);"],
  "Arrays.sort(arr);",
  "Arrays.sort() is the standard way to sort primitive or object arrays in Java."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "How can you copy the contents of one array to another array in Java?",
  ["By assigning one array to another (e.g. arr2 = arr1)","Using System.arraycopy() or Arrays.copyOf()","Arrays cannot be copied","Using the clone keyword on the variable name"],
  "Using System.arraycopy() or Arrays.copyOf()",
  "Assigning arr2 = arr1 just copies the reference. To copy the actual contents, you must use methods like System.arraycopy(), Arrays.copyOf(), or copy elements manually in a loop."
),
Q("CAT 1","MEDIUM",
  "Which algorithm is commonly used by Arrays.sort() for primitive data types in Java?",
  ["Bubble Sort","Selection Sort","Dual-Pivot Quicksort","Merge Sort"],
  "Dual-Pivot Quicksort",
  "For primitive types (like int[], double[]), Java uses a highly optimized Dual-Pivot Quicksort. For object arrays, it uses TimSort (a hybrid of Merge Sort and Insertion Sort)."
),
Q("CAT 1","MEDIUM",
  "What is the output of the following code?\n<pre><code>int[] arr = {5, 2, 8, 1};\nArrays.sort(arr);\nSystem.out.println(arr[0]);</code></pre>",
  ["5","1","8","0"],
  "1",
  "Arrays.sort() sorts the array in ascending order (1, 2, 5, 8). The element at index 0 becomes 1."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What will this print?\n<pre><code>int[] a = {1, 2, 3};\nint[] b = a.clone();\nSystem.out.println(a == b);\nSystem.out.println(a[0] == b[0]);</code></pre>",
  ["true true","false false","false true","true false"],
  "false true",
  "clone() creates a new array object, so 'a == b' is false (different references). However, the contents are duplicated, so a[0] (1) == b[0] (1) is true."
),
Q("CAT 1","HARD",
  "Given an array 'int[] arr = {2, 4, 6, 8, 10}', what will Arrays.binarySearch(arr, 6) return?",
  ["2","3","6","true"],
  "2",
  "binarySearch returns the index of the search key if it is found. The value 6 is at index 2."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "What is the primary advantage of using an array?",
  ["It can change size automatically","It allows storing multiple values in a single variable, making data management easier","It uses less memory than a single variable","It can store any mix of data types"],
  "It allows storing multiple values in a single variable, making data management easier",
  "Arrays group related data items together under a single name, which can be easily traversed and manipulated using loops."
),
Q("POSSIBLE QNS","EASY",
  "What happens if you do not initialize the elements of a boolean array?",
  ["They default to true","They default to false","They are null","The code will not compile"],
  "They default to false",
  "In Java, boolean array elements are initialized to false by default."
),
Q("POSSIBLE QNS","EASY",
  "Which symbol represents a 1D array type in Java?",
  ["{}","()","[]","<>"],
  "[]",
  "Square brackets [] denote an array type in Java."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is an Anonymous Array in Java?",
  ["An array that is empty","An array created without assigning it to a variable, often passed directly to a method","An array with no data type","An array with private access"],
  "An array created without assigning it to a variable, often passed directly to a method",
  "Example: myMethod(new int[]{1, 2, 3}); This creates an array on-the-fly without giving it a variable name."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is the output?\n<pre><code>char[] letters = {'J', 'a', 'v', 'a'};\nString s = new String(letters);\nSystem.out.println(s);</code></pre>",
  ["[J, a, v, a]","Java","J a v a","Error"],
  "Java",
  "The String class has a constructor that accepts a char array and converts it into a String object."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "Explain what happens during the execution of this code:\n<pre><code>Object[] objArray = new Object[3];\nobjArray[0] = \"Hello\";\nobjArray[1] = 123;\nobjArray[2] = 45.67;</code></pre>",
  ["Compile-time error because array elements must be of the same type","Runtime error because 123 is not an Object","It compiles and runs fine because String, Integer, and Double are all subclasses of Object","It compiles but throws an error when printed"],
  "It compiles and runs fine because String, Integer, and Double are all subclasses of Object",
  "An array of type Object can store references to any object type in Java. Primitive values (123) are auto-boxed into their wrapper classes (Integer)."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "State the main limitation of standard Java arrays.",
  ["They are slow","They have a fixed size; they cannot grow or shrink dynamically","They cannot store objects","They cannot be passed to methods"],
  "They have a fixed size; they cannot grow or shrink dynamically",
  "Once initialized, a Java array's length is fixed. If you need more space, you must create a new, larger array and copy the contents over."
),
Q("UE","EASY",
  "In Java, are arrays considered objects or primitive types?",
  ["Primitive types","Objects","Neither","Both"],
  "Objects",
  "In Java, arrays are objects. They are dynamically allocated on the heap, inherit from the Object class, and have properties like 'length'."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What does the following enhanced for-loop do?\n<pre><code>int[] numbers = {1, 2, 3};\nfor(int num : numbers) {\n    num = num * 2;\n}</code></pre>",
  ["It doubles the value of each element in the array","It throws an error","It creates an infinite loop","It does NOT modify the array elements"],
  "It does NOT modify the array elements",
  "The loop variable 'num' is a COPY of the element. Modifying 'num' does not affect the original array. To modify the array, you must use a traditional for loop with an index."
),
Q("UE","MEDIUM",
  "How do you return an array from a method in Java?",
  ["Declare the method's return type as the array type, e.g., public int[] getArray()","Use the keyword 'array' in the return statement","You cannot return an array from a method","Return each element individually"],
  "Declare the method's return type as the array type, e.g., public int[] getArray()",
  "A method can return an array by specifying the array type in the method signature, like 'public int[] myMethod() { ... return arr; }'."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What is the output of the following code?\n<pre><code>int[] arr = {10, 20, 30};\nmodifyArray(arr);\nSystem.out.println(arr[0]);\n\nstatic void modifyArray(int[] a) {\n    a[0] = 99;\n}</code></pre>",
  ["10","99","Compile error","NullPointerException"],
  "99",
  "When an array is passed to a method, the reference to the array is passed by value. Modifying the elements inside the method affects the original array. So arr[0] becomes 99."
),
Q("UE","HARD",
  "Consider a jagged 2D array:\n<pre><code>int[][] jArr = new int[2][];\njArr[0] = new int[3];\njArr[1] = new int[2];</code></pre>\nWhat is jArr.length and jArr[0].length?",
  ["2 and 2","2 and 3","3 and 2","Both are 2"],
  "2 and 3",
  "jArr.length gives the number of rows (2). jArr[0].length gives the number of columns in the first row, which was initialized to 3."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 2 questions!`);

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
