/**
 * JAVA UNIT 6 - GUI PROGRAMMING (AWT & SWING) - HANDCRAFTED QUESTIONS (PART 2)
 * Based on: Unit 6 (AWT, Swing, JFrame, Layout Managers, Event Handling)
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
  "What does AWT stand for in Java?",
  ["Advanced Window Tools", "Abstract Window Toolkit", "Application Web Technologies", "Abstract Widget Toolkit"],
  "Abstract Window Toolkit",
  "AWT is Java's original platform-dependent windowing, graphics, and user-interface widget toolkit."
),
Q("QUIZ","EASY",
  "Which of the following is a key difference between AWT and Swing?",
  ["AWT components are lightweight, Swing components are heavyweight", "AWT components are platform-independent, Swing is platform-dependent", "AWT components are heavyweight (relying on the OS), while Swing components are lightweight (written entirely in Java)", "Swing is older than AWT"],
  "AWT components are heavyweight (relying on the OS), while Swing components are lightweight (written entirely in Java)",
  "Because AWT uses the native OS GUI peers, an AWT button looks like a Windows button on Windows, and a Mac button on Mac. Swing draws its own components, so they look the same everywhere."
),
Q("QUIZ","EASY",
  "Which class is used to create a main window with a title bar and border in Swing?",
  ["JWindow", "JDialog", "JFrame", "JPanel"],
  "JFrame",
  "`JFrame` is the primary container used in Swing to create a standalone application window."
),

// ╔══════════════════════════════════╗
// ║         QUIZ - MEDIUM            ║
// ╚══════════════════════════════════╝
Q("QUIZ","MEDIUM",
  "What is the default Layout Manager for a `JFrame` in Swing?",
  ["FlowLayout", "BorderLayout", "GridLayout", "Null Layout"],
  "BorderLayout",
  "By default, the content pane of a `JFrame` uses `BorderLayout`, which divides the window into North, South, East, West, and Center regions."
),
Q("QUIZ","MEDIUM",
  "What is the default Layout Manager for a `JPanel`?",
  ["BorderLayout", "FlowLayout", "GridLayout", "GridBagLayout"],
  "FlowLayout",
  "`JPanel` defaults to `FlowLayout`, which simply places components in a line, one after another, wrapping to the next line if there is no space."
),
Q("QUIZ","MEDIUM",
  "Which listener interface must be implemented to handle button click events?",
  ["MouseListener", "ButtonListener", "ActionListener", "ClickListener"],
  "ActionListener",
  "You implement `ActionListener` and override the `actionPerformed(ActionEvent e)` method to define what happens when the button is clicked."
),

// ╔══════════════════════════════════╗
// ║          QUIZ - HARD             ║
// ╚══════════════════════════════════╝
Q("QUIZ","HARD",
  "Why should Swing GUI updates always be performed on the Event Dispatch Thread (EDT)?",
  ["Because Swing components are not thread-safe", "Because it is faster", "To save memory", "Because AWT requires it"],
  "Because Swing components are not thread-safe",
  "If multiple threads try to update the GUI simultaneously (like adding text to a JTextArea), it can cause deadlocks or visual corruption. You use `SwingUtilities.invokeLater()` to pass updates to the EDT safely."
),
Q("QUIZ","HARD",
  "What does `frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);` do?",
  ["It closes the frame but keeps the application running in the background", "It terminates the entire Java application (JVM) when the user clicks the 'X' button on the window", "It prevents the window from being closed", "It opens a confirmation dialog before closing"],
  "It terminates the entire Java application (JVM) when the user clicks the 'X' button on the window",
  "If you don't set this, clicking 'X' will just hide the window (`HIDE_ON_CLOSE`), and the program will continue running invisibly."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - EASY            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","EASY",
  "In Swing, what prefix is generally added to AWT component names to distinguish them as Swing components?",
  ["S (e.g., SButton)", "J (e.g., JButton)", "Swing (e.g., SwingButton)", "X (e.g., XButton)"],
  "J (e.g., JButton)",
  "Almost all Swing component classes start with 'J': `JLabel`, `JTextField`, `JCheckBox`, `JPanel`, etc."
),
Q("EXERCISE","EASY",
  "Which component is used to allow a user to type in a single line of text?",
  ["JTextArea", "JTextBox", "JTextField", "JLabel"],
  "JTextField",
  "`JTextField` is for single-line input. `JTextArea` is for multi-line input."
),

// ╔══════════════════════════════════╗
// ║      EXERCISE - MEDIUM           ║
// ╚══════════════════════════════════╝
Q("EXERCISE","MEDIUM",
  "What is the purpose of the `pack()` method in a `JFrame`?",
  ["It compresses the Java code to make it run faster", "It sizes the frame so that all its contents are at or above their preferred sizes, automatically making the window just big enough to hold everything", "It puts the frame into a `.jar` file", "It locks the window size so it cannot be resized"],
  "It sizes the frame so that all its contents are at or above their preferred sizes, automatically making the window just big enough to hold everything",
  "Instead of manually guessing pixels with `setSize(400, 300)`, calling `pack()` calculates the perfect size automatically."
),
Q("EXERCISE","MEDIUM",
  "Which Layout Manager arranges components in a rectangular grid of equally sized cells?",
  ["GridBagLayout", "GridLayout", "FlowLayout", "TableLayout"],
  "GridLayout",
  "In a `new GridLayout(rows, cols)`, every component takes up exactly the same amount of space (like a chessboard)."
),

// ╔══════════════════════════════════╗
// ║       EXERCISE - HARD            ║
// ╚══════════════════════════════════╝
Q("EXERCISE","HARD",
  "What is the Delegation Event Model in Java?",
  ["A way of drawing graphics on the screen", "The architecture where an Event Source (like a button) generates an event and delegates the handling of that event to one or more registered Event Listeners", "A method for delegating thread execution", "A network communication protocol"],
  "The architecture where an Event Source (like a button) generates an event and delegates the handling of that event to one or more registered Event Listeners",
  "This separates the UI code from the logic code. The button doesn't know *what* to do; it just tells the Listener that it was clicked."
),
Q("EXERCISE","HARD",
  "What is an `Adapter` class in Java Event Handling (e.g., `MouseAdapter`)?",
  ["A class that converts AWT to Swing", "An abstract class that provides empty, default implementations for all methods in a listener interface, saving you from having to implement methods you don't need", "A class used to connect to databases", "A hardware interface"],
  "An abstract class that provides empty, default implementations for all methods in a listener interface, saving you from having to implement methods you don't need",
  "For example, `MouseListener` has 5 methods. If you only care about `mouseClicked`, you can extend `MouseAdapter` and override just that one method, instead of implementing the interface and leaving 4 methods blank."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - EASY              ║
// ╚══════════════════════════════════╝
Q("CAT 1","EASY",
  "How do you add a `JButton` named 'btn' to a `JFrame` named 'frame'?",
  ["frame.add(btn);", "frame.append(btn);", "frame.insert(btn);", "btn.addTo(frame);"],
  "frame.add(btn);",
  "You use the `add()` method to attach a component to a container."
),

// ╔══════════════════════════════════╗
// ║       CAT 1 - MEDIUM             ║
// ╚══════════════════════════════════╝
Q("CAT 1","MEDIUM",
  "If a JFrame is using `BorderLayout`, what happens if you add two buttons to the `BorderLayout.NORTH` region?",
  ["They appear side by side", "The second button overwrites/hides the first button", "An exception is thrown", "They appear stacked on top of each other"],
  "The second button overwrites/hides the first button",
  "Each region in `BorderLayout` (North, South, East, West, Center) can hold exactly ONE component. If you need multiple buttons in the North, you must put them in a `JPanel` first, and add the panel to the North."
),

// ╔══════════════════════════════════╗
// ║        CAT 1 - HARD              ║
// ╚══════════════════════════════════╝
Q("CAT 1","HARD",
  "What does `setLayout(null)` do?",
  ["It crashes the program", "It disables layout managers entirely, forcing you to manually specify the exact X, Y coordinates, width, and height of every component using `setBounds()`", "It uses the default layout manager", "It hides all components"],
  "It disables layout managers entirely, forcing you to manually specify the exact X, Y coordinates, width, and height of every component using `setBounds()`",
  "This is called 'Absolute Positioning'. While it seems easy, it is highly discouraged because your GUI won't adapt if the user resizes the window or uses a different OS/screen resolution."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - EASY          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","EASY",
  "Which class is used to group mutually exclusive radio buttons (so that selecting one deselects the others)?",
  ["JRadioButtonGroup", "ButtonGroup", "RadioGroup", "JToggleGroup"],
  "ButtonGroup",
  "You instantiate a `ButtonGroup` object and `add()` the `JRadioButton` objects to it. It manages the logic so only one can be true at a time."
),

// ╔══════════════════════════════════╗
// ║    POSSIBLE QNS - MEDIUM         ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","MEDIUM",
  "What is the difference between `JOptionPane.showMessageDialog()` and `JOptionPane.showInputDialog()`?",
  ["There is no difference", "`showMessageDialog` only displays information to the user with an OK button. `showInputDialog` provides a text field for the user to type a response and returns that String.", "showMessageDialog is for AWT, showInputDialog is for Swing", "showInputDialog can only accept numbers"],
  "`showMessageDialog` only displays information to the user with an OK button. `showInputDialog` provides a text field for the user to type a response and returns that String.",
  "`JOptionPane` is the standard way to create quick pop-up dialog boxes in Swing."
),

// ╔══════════════════════════════════╗
// ║     POSSIBLE QNS - HARD          ║
// ╚══════════════════════════════════╝
Q("POSSIBLE QNS","HARD",
  "What is the most powerful, flexible, and complex layout manager in Java, which places components in a grid of rows and columns, allowing components to span multiple rows or columns?",
  ["GridLayout", "GridBagLayout", "BoxLayout", "GroupLayout"],
  "GridBagLayout",
  "`GridBagLayout` uses a helper class called `GridBagConstraints` to specify exactly how each component behaves (spanning, padding, weighting) within the grid."
),

// ╔══════════════════════════════════╗
// ║          UE - EASY               ║
// ╚══════════════════════════════════╝
Q("UE","EASY",
  "Which method do you call to make a JFrame visible on the screen?",
  ["frame.show();", "frame.setVisible(true);", "frame.display();", "frame.render();"],
  "frame.setVisible(true);",
  "Calling `setVisible(true)` is always the final step in your GUI initialization code."
),

// ╔══════════════════════════════════╗
// ║         UE - MEDIUM              ║
// ╚══════════════════════════════════╝
Q("UE","MEDIUM",
  "What does an `ItemListener` respond to?",
  ["Mouse movements", "Keyboard presses", "State changes of components that have an 'on/off' or 'selected/unselected' state (like Checkboxes, RadioButtons, or ComboBox selections)", "Window closing events"],
  "State changes of components that have an 'on/off' or 'selected/unselected' state (like Checkboxes, RadioButtons, or ComboBox selections)",
  "You override `itemStateChanged(ItemEvent e)` to handle when a user checks or unchecks a box."
),

// ╔══════════════════════════════════╗
// ║          UE - HARD               ║
// ╚══════════════════════════════════╝
Q("UE","HARD",
  "What is the purpose of the `repaint()` method in a custom graphics component (e.g., extending JPanel)?",
  ["It changes the background color of the panel", "It clears the screen", "It requests that the JVM schedule a call to the `paintComponent(Graphics g)` method as soon as possible to redraw the component", "It saves the image to a file"],
  "It requests that the JVM schedule a call to the `paintComponent(Graphics g)` method as soon as possible to redraw the component",
  "If your data changes (e.g., moving a circle in a game loop), you never call `paintComponent` directly. You call `repaint()`, and the EDT handles it safely."
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
        console.log(`\n✅ Successfully inserted ${result.insertedCount} new Unit 6 (Part 2) questions!`);

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
