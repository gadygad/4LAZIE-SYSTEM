const { MongoClient } = require('mongodb');

const MONGO_URI = "mongodb+srv://kilingepazasauti_db_user:hugongaa@cluster0.oyiolad.mongodb.net/school_db?retryWrites=true&w=majority&appName=Cluster0";

const htmlContent = `
<div class="timetable-bw" style="background: white; padding: 20px; border-radius: 5px;">
    <style>
        .timetable-bw {
            font-family: Arial, sans-serif;
            color: black;
            background: white;
            width: 100%;
            overflow-x: auto;
        }
        .timetable-bw .doc-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .timetable-bw h1 { font-size: 18px; font-weight: bold; margin: 0; }
        .timetable-bw h2 { font-size: 14px; font-weight: bold; margin: 5px 0; }
        .timetable-bw h3 { font-size: 14px; font-weight: bold; margin: 5px 0; }
        .timetable-bw table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            text-align: center;
        }
        .timetable-bw th, .timetable-bw td {
            border: 2px solid black !important;
            padding: 8px 4px;
            font-size: 12px;
            font-weight: bold;
            color: black !important;
            background: transparent !important;
        }
        .break-col {
            width: 30px;
            font-weight: 900;
            letter-spacing: 2px;
            vertical-align: middle;
            background-color: #e0e0e0 !important;
        }
    </style>
    
    <div class="doc-header">
        <h1>St. JOSEPH COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
        <h2>DEPARTMENT OF CIVIL ENGINEERING AND BUILT ENVIRONMENT</h2>
        <h3>FOURTH YEAR SEMESTER I - DEGREE BATCH - 17 TIMETABLE NOVEMBER 2025</h3>
        
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 15px; font-size: 14px;">
            <div>CLASS ADVISOR: MR.NGWANDIRA</div>
            <div>STRENGTH: 142</div>
            <div>LECTURE HALL: 96</div>
        </div>
    </div>

    <table>
        <tr>
            <th rowspan="2" style="width: 80px;">HOUR<hr style="border-color: black; margin: 2px 0;">DAY/TIME</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th rowspan="7" class="break-col">B<br>R<br>E<br>A<br>K</th>
            <th>4</th>
            <th>5</th>
            <th rowspan="7" class="break-col">L<br>U<br>N<br>C<br>H<br><br>B<br>R<br>E<br>A<br>K</th>
            <th>6</th>
            <th>7</th>
        </tr>
        <tr>
            <th>8.00AM<br>TO<br>8.55AM</th>
            <th>8.55 AM<br>TO<br>9.50AM</th>
            <th>9.50 AM<br>TO<br>10.45AM</th>
            <th>11.00 AM<br>TO<br>11.55AM</th>
            <th>11.55 AM<br>TO<br>12.45PM</th>
            <th>1.45 PM<br>TO<br>2.40PM</th>
            <th>2.40PM<br>TO<br>3.35PM</th>
        </tr>
        <tr>
            <td>MONDAY</td>
            <td colspan="2">CE4102</td>
            <td>ELCE00021</td>
            <td colspan="2">ELCE00016</td>
            <td colspan="2">PJCE4106</td>
        </tr>
        <tr>
            <td>TUESDAY</td>
            <td colspan="2">ELCE00021</td>
            <td>CE4105 (P)</td>
            <td colspan="2">CE4105 (P)</td>
            <td colspan="2">PJCE4106</td>
        </tr>
        <tr>
            <td>WEDNESDAY</td>
            <td colspan="2">ELCE00021</td>
            <td>ELCE00016</td>
            <td colspan="2">PJCE4106</td>
            <td colspan="2">PJCE4106</td>
        </tr>
        <tr>
            <td>THURSDAY</td>
            <td colspan="2">CE4102</td>
            <td>PJCE4106</td>
            <td colspan="2">CE4105 (P)</td>
            <td colspan="2">ELCE00016</td>
        </tr>
        <tr>
            <td>FRIDAY</td>
            <td colspan="2">PJCE4106</td>
            <td>MG4101</td>
            <td>MG4101</td>
            <td>PJCE4106</td>
            <td colspan="2">PJCE4106</td>
        </tr>
    </table>

    <table style="margin-top: 20px; text-align: left;">
        <tr>
            <th style="width: 20%; background-color: #e0e0e0 !important;">MODULE CODE</th>
            <th style="width: 50%; background-color: #e0e0e0 !important;">MODULE NAME</th>
            <th style="width: 30%; background-color: #e0e0e0 !important;">MODULE TEACHER</th>
        </tr>
        <tr><td>MG4101</td><td>PRINCIPLES OF MANAGEMENT AND PROFFESIONAL ETHICS</td><td>MR VALERIAN</td></tr>
        <tr><td>CE4102</td><td>QUANTITY SURVEYING AND VALUATION</td><td>MR KOMBE</td></tr>
        <tr><td>ELCE00016</td><td>REPAIR AND REHABILITATION OF STRUCTURES</td><td>DR RWANDALLAH</td></tr>
        <tr><td>ELCE00021</td><td>ENVIRONMENTAL IMPACT ASSESSMENT</td><td>MRS DHIVYA</td></tr>
        <tr><td>CE4105</td><td>COMPUTER AIDED STRUCTURAL ANALYSIS LAB (P)</td><td>MR JUMA</td></tr>
        <tr><td>PJCE4106</td><td>Project Work Phase I & Viva Voce</td><td>DR RWANDALLAH / MR KOMBE / MR ALLEN</td></tr>
    </table>
    <br>
    <button class="print-btn" onclick="window.print()" style="display: block; margin: 20px auto 10px auto; background: black; color: white; border: none; padding: 12px 30px; font-size: 18px; font-weight: bold; border-radius: 5px; cursor: pointer; text-transform: uppercase;">
        <i class="bi bi-printer-fill" style="margin-right: 8px;"></i> Save as PDF / Print
    </button>
</div>
`;

async function run() {
    console.log("Connecting to MongoDB Atlas...");
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("Connected to MongoDB.");
    
    const db = client.db('school_db');
    const collection = db.collection('timetables');
    
    // DEG_CE, Year 4, Semester 1
    const doc = {
        programType: "DEG_CE",
        levelNo: 4,
        semesterNo: 1,
        academicYear: "2025/2026",
        htmlContent: htmlContent,
        uploadDate: new Date()
    };
    
    const result = await collection.updateOne(
        {
            programType: doc.programType,
            levelNo: doc.levelNo,
            semesterNo: doc.semesterNo,
            academicYear: doc.academicYear
        },
        { $set: doc },
        { upsert: true }
    );
    
    console.log(`Inserted/Updated: ${result.modifiedCount} modified, upsertedId: ${result.upsertedId}`);
    
    await client.close();
}

run().catch(console.dir);
