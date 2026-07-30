/**
 * JAVA UNIT 4 - STRINGS & STRINGBUILDER - HANDCRAFTED QUESTIONS (PART 2)
 * Based on: Unit 4 (String Pool, Immutability, == vs equals, StringBuilder, StringBuffer)
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
  "In Java, what is the 'String' data type?",
  ["A primitive data type like int or char", "A class in the java.lang package used to represent a sequence of characters", "A special keyword to print text", "An array of bytes"],
  "A class in the java.lang package used to represent a sequence of characters",
  "Unlike C++, String in Java is not an array of characters or a primitive type; it is a full-fledged Object instantiated from the `java.lang.String` class."
),
Q("QUIZ","EASY",
  "What does it mean that Java Strings are 'Immutable'?",
  ["They cannot contain numbers", "They can only be created once per program", "Once a String object is created, its data/state cannot be changed", "They cannot be used in `switch` statements"],
  "Once a String object is created, its data/state cannot be changed",
  "Immutability means that any operation that appears to modify a String (like `.toUpperCase()` or `.concat()`) actually creates a brand new String object, leaving the original unchanged."
),
Q("QUIZ","EASY",
  "Which operator is used to concatenate (join) two Strings together?",
  ["&", "||", "+", "concat() ONLY"],
  "+",
  "Java overloads the `+` operator specifically for Strings to allow easy concatenation (e.g., `\"Hello \" + \"World\"`)."
),
Q("QUIZ","EASY",
  "What is the output of `\"Java\".length()`?",
  ["3", "4", "5", "Compile error"],
  "4",
  "The `.length()` method returns the exact number of characters in the String, which is 4."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is the String Constant Pool (SCP) in Java?",
  ["A pool of threads handling string processing", "A special memory area in the Heap where Java stores string literals to save memory by reusing identical strings", "A garbage collection algorithm", "An array of all strings in the program"],
  "A special memory area in the Heap where Java stores string literals to save memory by reusing identical strings",
  "If you create `String s1 = \"Hi\";` and `String s2 = \"Hi\";`, Java doesn't create two objects. Both variables point to the exact same \"Hi\" object in the String Pool."
),
Q("QUIZ","MEDIUM",
  "What is the output?\n<pre><code>String s1 = \"Hello\";\nString s2 = new String(\"Hello\");\nSystem.out.println(s1 == s2);</code></pre>",
  ["true", "false", "Compile Error", "Runtime Exception"],
  "false",
  "The `==` operator compares memory references. `s1` points to the String Pool, while `new String()` forces Java to create a brand new object in the general Heap memory. Thus, their addresses are different."
),
Q("QUIZ","MEDIUM",
  "What is the output?\n<pre><code>String s = \"Java\";\ns.concat(\" Programming\");\nSystem.out.println(s);</code></pre>",
  ["Java", "Java Programming", "Compile Error", "NullPointerException"],
  "Java",
  "Because Strings are immutable, `s.concat(...)` creates a new string but doesn't alter `s`. Since the new string wasn't assigned back to `s` (e.g., `s = s.concat(...)`), `s` remains just \"Java\"."
),
Q("QUIZ","MEDIUM",
  "Which class provides a mutable sequence of characters and is NOT thread-safe (meaning it is faster)?",
  ["String", "StringBuffer", "StringBuilder", "CharacterArray"],
  "StringBuilder",
  "`StringBuilder` allows modifying strings (append, insert, delete) without creating new objects. It is not synchronized (not thread-safe), making it much faster than `StringBuffer`."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "What is the output?\n<pre><code>String s1 = \"Apple\";\nString s2 = \"Apple\";\nString s3 = \"App\" + \"le\";\nSystem.out.println(s1 == s3);</code></pre>",
  ["false", "true", "Compile error", "Runtime exception"],
  "true",
  "Constant folding! Because \"App\" and \"le\" are both compile-time literal constants, the compiler merges them into \"Apple\" during compilation. At runtime, it resolves to the exact same String Pool object as `s1`."
),
Q("QUIZ","HARD",
  "What does the `intern()` method do when called on a String object?",
  ["It converts the string to uppercase", "It deletes the string from memory", "It searches the String Pool for an identical string. If found, it returns the reference from the pool; if not, it adds the string to the pool and returns its reference", "It encrypts the string"],
  "It searches the String Pool for an identical string. If found, it returns the reference from the pool; if not, it adds the string to the pool and returns its reference",
  "`intern()` is used to force a dynamically created string (e.g. via `new String()`) into the String Pool to save memory and allow `==` comparisons."
),
Q("QUIZ","HARD",
  "Trace the output:\n<pre><code>System.out.println(10 + 20 + \"Java\" + 10 + 20);</code></pre>",
  ["1020Java1020", "30Java30", "30Java1020", "Compile Error"],
  "30Java1020",
  "Execution is left-to-right. 10 + 20 (both integers) equals 30. 30 + \"Java\" concatenates to \"30Java\". Then \"30Java\" + 10 concatenates to \"30Java10\", and finally + 20 becomes \"30Java1020\"."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "How do you properly compare the actual text content of two String objects in Java?",
  ["if (str1 == str2)", "if (str1 = str2)", "if (str1.equals(str2))", "if (str1.matches(str2))"],
  "if (str1.equals(str2))",
  "The `.equals()` method compares the actual characters inside the strings. The `==` operator compares memory addresses, which can lead to bugs."
),
Q("EXERCISE","EASY",
  "Which String method is used to extract a portion of a string?",
  ["extract()", "slice()", "substring()", "cut()"],
  "substring()",
  "`substring(startIndex, endIndex)` extracts characters from the original string and returns a new String."
),
Q("EXERCISE","EASY",
  "What is the result of `\"Hello\".charAt(1)`?",
  ["'H'", "'e'", "'l'", "IndexOutOfBoundsException"],
  "'e'",
  "Strings in Java are zero-indexed. Index 0 is 'H', Index 1 is 'e'."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What happens here?\n<pre><code>String word = \"Programming\";\nSystem.out.println(word.substring(3, 7));</code></pre>",
  ["gram", "gramm", "ogra", "ogram"],
  "gram",
  "`substring(beginIndex, endIndex)` includes the beginIndex (3 -> 'g') and excludes the endIndex (7 -> 'm'). So it takes indices 3, 4, 5, 6, which are 'g', 'r', 'a', 'm'."
),
Q("EXERCISE","MEDIUM",
  "Which class should you use if you are in a multi-threaded environment and multiple threads are aggressively modifying the same text data?",
  ["String", "StringBuilder", "StringBuffer", "CharBuffer"],
  "StringBuffer",
  "`StringBuffer` is thread-safe (its methods are synchronized), ensuring that multiple threads don't corrupt the string data when appending simultaneously."
),
Q("EXERCISE","MEDIUM",
  "What is the output?\n<pre><code>StringBuilder sb = new StringBuilder(\"Java\");\nsb.append(\"11\");\nsb.reverse();\nSystem.out.println(sb);</code></pre>",
  ["Java11", "11avaJ", "11Java", "avaJ11"],
  "11avaJ",
  "`sb.append` makes it \"Java11\". `.reverse()` reverses the entire sequence in-place, resulting in \"11avaJ\"."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the output?\n<pre><code>String a = new String(\"Test\");\nString b = new String(\"Test\");\nSystem.out.println((a == b) + \" \" + a.equals(b));</code></pre>",
  ["true true", "false false", "false true", "true false"],
  "false true",
  "Because both were created with `new`, they occupy different memory locations in the heap (`a == b` is false). But they contain the exact same characters (`a.equals(b)` is true)."
),
Q("EXERCISE","HARD",
  "What is printed?\n<pre><code>String s = \"  Hello World  \";\ns.trim();\nSystem.out.println(s.length());</code></pre>",
  ["11", "15", "13", "Compile Error"],
  "15",
  "Strings are immutable! `s.trim()` creates a new trimmed string (\"Hello World\"), but the original string `s` remains untouched with all its spaces. Length is 15."
),
Q("EXERCISE","HARD",
  "Analyze this code:\n<pre><code>String s1 = \"A\";\nString s2 = \"B\";\nString s3 = s1 + s2;\nString s4 = \"AB\";\nSystem.out.println(s3 == s4);</code></pre>",
  ["true", "false", "Compile Error", "Runtime Error"],
  "false",
  "When concatenating variables (`s1 + s2`), Java internally uses a `StringBuilder` and calls `.toString()`, which creates a brand NEW string on the heap, NOT in the String pool. Thus `s3` (Heap) != `s4` (Pool)."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "Which method converts all characters in a string to lower case?",
  ["toLower()", "toLowerCase()", "lowerCase()", "caseLower()"],
  "toLowerCase()",
  "The `toLowerCase()` method creates and returns a new String with all characters converted to lowercase."
),
Q("CAT 1","EASY",
  "What will `\"Data\".indexOf('a')` return?",
  ["0", "1", "2", "3"],
  "1",
  "`indexOf` returns the index of the FIRST occurrence of the specified character. The first 'a' is at index 1."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "How can you convert an integer (e.g., `int x = 100`) into a String?",
  ["String.valueOf(x)", "Integer.toString(x)", "x + \"\"", "All of the above"],
  "All of the above",
  "All three methods successfully convert a primitive integer to a String object in Java."
),
Q("CAT 1","MEDIUM",
  "What does `\"Java\".compareTo(\"Java\")` return?",
  ["true", "false", "0", "1"],
  "0",
  "The `compareTo()` method compares strings lexicographically (alphabetically). If the strings are identical, it returns 0. If the first string is greater, it returns > 0, otherwise < 0."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What is printed?\n<pre><code>StringBuilder sb1 = new StringBuilder(\"Code\");\nStringBuilder sb2 = new StringBuilder(\"Code\");\nSystem.out.println(sb1.equals(sb2));</code></pre>",
  ["true", "false", "Compile Error", "Throws Exception"],
  "false",
  "`StringBuilder` and `StringBuffer` do NOT override the `equals()` method from the `Object` class. Therefore, they fall back to checking memory addresses (like `==`), which is false since they are two different objects."
),
Q("CAT 1","HARD",
  "What does this code do?\n<pre><code>String text = \"apple,banana,orange\";\nString[] fruits = text.split(\",\");\nSystem.out.println(fruits.length);</code></pre>",
  ["1", "3", "0", "4"],
  "3",
  "The `split(\",\")` method splits the string at every comma, returning an array of substrings: `[\"apple\", \"banana\", \"orange\"]`. The array length is 3."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "If you want to check if a string ends with \".pdf\", which method should you use?",
  ["endsWith(\".pdf\")", "contains(\".pdf\")", "last(\".pdf\")", "matches(\".pdf\")"],
  "endsWith(\".pdf\")",
  "The `endsWith()` method returns a boolean indicating whether the string ends with the specified suffix."
),
Q("POSSIBLE QNS","EASY",
  "Which string is considered 'empty' in Java?",
  ["String s = null;", "String s = \" \";", "String s = \"\";", "String s = \"null\";"],
  "String s = \"\";",
  "`\"\"` is an empty string (length 0). `\" \"` is a blank string (length 1). `null` means the string object doesn't exist at all."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What does `equalsIgnoreCase()` do?",
  ["Compares strings but ignores all spaces", "Compares strings and ignores case differences (e.g., 'A' == 'a')", "Compares string memory locations", "Converts both strings to lower case permanently"],
  "Compares strings and ignores case differences (e.g., 'A' == 'a')",
  "This is highly useful for user input validation, e.g., `\"YES\".equalsIgnoreCase(\"yes\")` evaluates to true."
),
Q("POSSIBLE QNS","MEDIUM",
  "What is the output?\n<pre><code>System.out.println(\"Hello\".replace('l', 'w'));</code></pre>",
  ["Hewwo", "Hewlo", "Hello", "Compile Error"],
  "Hewwo",
  "The `replace(oldChar, newChar)` method replaces ALL occurrences of the old character with the new character."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "Trace the output:\n<pre><code>String str = \"null\";\nif (str == null) {\n    System.out.print(\"A\");\n} else if (str.length() == 0) {\n    System.out.print(\"B\");\n} else {\n    System.out.print(\"C\");\n}</code></pre>",
  ["A", "B", "C", "NullPointerException"],
  "C",
  "The variable `str` contains the actual literal text \"null\" (a 4-letter word), not the null reference. It is not empty, so it prints 'C'."
),
Q("POSSIBLE QNS","HARD",
  "Analyze this code:\n<pre><code>StringBuilder sb = new StringBuilder(5);\nsb.append(\"abcdefghi\");\nSystem.out.println(sb.capacity());</code></pre>",
  ["5", "9", "12", "Exception: Capacity Exceeded"],
  "12",
  "The initial capacity is 5. When 9 characters are appended, it exceeds capacity. StringBuilder automatically expands. The formula is usually `(oldCapacity * 2) + 2`, so `(5 * 2) + 2 = 12`."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "How can you check if a string contains another string?",
  ["indexOf()", "contains()", "matches()", "All of the above"],
  "All of the above",
  "`contains()` returns a boolean. `indexOf()` returns >= 0 if found. `matches()` can use regex."
),
Q("UE","EASY",
  "Why is it a security risk to store passwords in a `String` rather than a `char[]`?",
  ["Because Strings can be hacked easily", "Because Strings are immutable and stay in the String Pool in memory until garbage collected, leaving them vulnerable to memory dumps", "Because Strings limit character length", "It is not a security risk"],
  "Because Strings are immutable and stay in the String Pool in memory until garbage collected, leaving them vulnerable to memory dumps",
  "A `char[]` can be explicitly overwritten with zeros (e.g. `Arrays.fill(password, '0')`) immediately after use, erasing the password from RAM."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What is the output?\n<pre><code>String s1 = \"Java\";\nString s2 = new String(\"Java\").intern();\nSystem.out.println(s1 == s2);</code></pre>",
  ["true", "false", "Compile Error", "Runtime Exception"],
  "true",
  "The `intern()` method fetches the string from the String Pool. Since `s1` (\"Java\") is already in the pool, `s2` is given the exact same reference. Thus, `s1 == s2` is true."
),
Q("UE","MEDIUM",
  "What does `String.join(\"-\", \"Java\", \"is\", \"fun\")` return? (Java 8+)",
  ["Javaisfun-", "Java-is-fun", "Java-is-fun-", "Compile error"],
  "Java-is-fun",
  "`String.join(delimiter, elements...)` is a convenient way to concatenate multiple strings separated by a specific delimiter."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What is printed?\n<pre><code>String a = \"100\";\nString b = \"100\";\na += \"\";\nSystem.out.println(a == b);</code></pre>",
  ["true", "false", "Compile Error", "Runtime Exception"],
  "false",
  "The statement `a += \"\";` creates a new String on the heap using a StringBuilder. It is no longer pointing to the \"100\" in the String Pool that `b` points to."
),
Q("UE","HARD",
  "What happens here?\n<pre><code>System.out.println(\"Java\".substring(2, 2));</code></pre>",
  ["v", "va", "An empty string \"\"", "StringIndexOutOfBoundsException"],
  "An empty string \"\"",
  "When beginIndex and endIndex are exactly the same, `substring` returns an empty string because it includes index 2 but excludes index 2 (a range of 0 characters)."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 4 (Part 2) questions!`);

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
