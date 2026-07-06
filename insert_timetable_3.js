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
        <h1>ST. JOSEPH COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
        <h2>CSISE DEPARTMENT</h2>
        <h3>CSE VIII - SEM DEGREE - BATCH - 17 TH TIME TABLE - APRIL 2026</h3>
        
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 15px; font-size: 14px;">
            <div>CLASS ADVISOR : Mr. AnuJesus</div>
            <div>VENUE : 79</div>
        </div>
    </div>

    <table>
        <tr>
            <th style="width: 80px;">DAY / TIME</th>
            <th>8.00 AM - 8.55 AM</th>
            <th>8.55 AM - 9.50 AM</th>
            <th>9.50 AM - 10.45 AM</th>
            <th rowspan="5" class="break-col">T<br>E<br>A<br><br>B<br>R<br>E<br>A<br>K</th>
            <th>11.00 AM - 11.50 AM</th>
            <th>11.50 AM - 12.45 PM</th>
            <th rowspan="5" class="break-col">L<br>U<br>N<br>C<br>H<br><br>B<br>R<br>E<br>A<br>K</th>
            <th>1.45 PM - 2.40 PM</th>
            <th>2.40 PM - 3.35 PM</th>
        </tr>
        <tr>
            <td>MONDAY</td>
            <td colspan="2">CECS 0004</td>
            <td>PT</td>
            <td colspan="2">MG 4207</td>
            <td colspan="2">ELCS0036</td>
        </tr>
        <tr>
            <td>TUESDAY</td>
            <td colspan="2">CECS 0004</td>
            <td>PT</td>
            <td colspan="2">CECS 0004(LAB)</td>
            <td colspan="2">ELCS0036</td>
        </tr>
        <tr>
            <td>WEDNESDAY</td>
            <td colspan="2">MG 4207</td>
            <td>PT</td>
            <td>PT</td>
            <td>ELCS0036</td>
            <td colspan="2">TSCS 4210</td>
        </tr>
        <tr>
            <td>THURSDAY</td>
            <td colspan="3">PJCS 4211</td>
            <td>MG 4207</td>
            <td>PJCS 4211</td>
            <td colspan="2">PJCS 4211</td>
        </tr>
    </table>

    <table style="margin-top: 20px; text-align: left;">
        <tr>
            <th style="width: 20%; background-color: #e0e0e0 !important;">MODULE CODE</th>
            <th style="width: 50%; background-color: #e0e0e0 !important;">MODULE NAME</th>
            <th style="width: 30%; background-color: #e0e0e0 !important;">MODULE TEACHER</th>
        </tr>
        <tr><td>MG 4207</td><td>Entrepreneurship Development</td><td>Dr. Sasi kanth</td></tr>
        <tr><td>ELCS0036</td><td>Management Information Systems</td><td>Mr Murali</td></tr>
        <tr><td>ELCS0045</td><td>Disaster Management</td><td>PART TIME STAFF</td></tr>
        <tr><td>CECS 0004</td><td>Course for Design Professional (CDP) (T&P)</td><td>Mr AnuJesus</td></tr>
        <tr><td>TSCS 4210</td><td>Technical Seminar (P)</td><td>Mr Karthikeyan Subramaniam</td></tr>
        <tr><td>PJCS 4211</td><td>Project Work Phase II & Viva Voce</td><td>Mr.Karthikeyan Subramaniam</td></tr>
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
    
    // DEG_CSE, Year 4, Semester 2
    const doc = {
        programType: "DEG_CSE",
        levelNo: 4,
        semesterNo: 2,
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
