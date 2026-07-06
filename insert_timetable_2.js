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
            padding: 4px;
            font-size: 12px;
            font-weight: bold;
            color: black !important;
            background: transparent !important;
        }
        .break-col {
            width: 20px;
            font-weight: 900;
            letter-spacing: 2px;
            vertical-align: middle;
        }
    </style>
    
    <div class="doc-header">
        <h1>ST. JOSEPH COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
        <h2>DEPARTMENT OF MECHANICAL, MECHATRONICS AND INDUSTRIAL ENGINEERING</h2>
        <h3>TIMETABLE NTA LEVEL 5 SEM II MECHANICAL ENGINEERING</h3>
        
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 15px; font-size: 14px;">
            <div>VENUE: B14</div>
            <div>Class Advisor: Mr. Godwin J Mutolzi</div>
        </div>
    </div>

    <table>
        <tr>
            <th rowspan="2" style="width: 80px;">DAY/TIME</th>
            <th>I</th>
            <th>II</th>
            <th>III</th>
            <th rowspan="7" class="break-col">B<br>R<br>E<br>A<br>K<br><br>T<br>I<br>M<br>E</th>
            <th>IV</th>
            <th>V</th>
            <th rowspan="7" class="break-col">L<br>U<br>N<br>C<br>H<br><br>T<br>I<br>M<br>E</th>
            <th>VI</th>
            <th>VII</th>
            <th>VIII</th>
        </tr>
        <tr>
            <th>08:00a.m-08:55 a.m</th>
            <th>08:55a.m-09:50 a.m</th>
            <th>09:50a.m-10:45 a.m</th>
            <th>11:00a.m-11:55 a.m</th>
            <th>11:55a.m-12:45 p.m</th>
            <th>01:45p.m-02:40 p.m</th>
            <th>02:40p.m-03:35 p.m</th>
            <th>03:35p.m-04:30 p.m</th>
        </tr>
        <tr>
            <td>MONDAY</td>
            <td>MET05206</td>
            <td>MET05206</td>
            <td>SEMINAR</td>
            <td>SEMINAR</td>
            <td>SEMINAR</td>
            <td>SEMINAR</td>
            <td>LIBRARY</td>
            <td></td>
        </tr>
        <tr>
            <td>TUESDAY</td>
            <td>MET05207</td>
            <td>MET05207</td>
            <td>SEMINAR</td>
            <td>MET05206</td>
            <td>MET05206</td>
            <td>SEMINAR</td>
            <td>LIBRARY</td>
            <td></td>
        </tr>
        <tr>
            <td>WEDNESDAY</td>
            <td>MET05209</td>
            <td>MET05209</td>
            <td>SEMINAR</td>
            <td>MET05205</td>
            <td>MET05205</td>
            <td>SEMINAR</td>
            <td>LIBRARY</td>
            <td></td>
        </tr>
        <tr>
            <td>THURSDAY</td>
            <td>MET05205</td>
            <td>MET05205</td>
            <td>SEMINAR</td>
            <td>MET05211 P</td>
            <td>MET05211 P</td>
            <td>MET05211 P</td>
            <td>LIBRARY</td>
            <td></td>
        </tr>
        <tr>
            <td>FRIDAY</td>
            <td>MET05207</td>
            <td>MET05207</td>
            <td>SEMINAR</td>
            <td>MET05209</td>
            <td>MET05209</td>
            <td>SEMINAR</td>
            <td>LIBRARY</td>
            <td></td>
        </tr>
    </table>

    <table style="margin-top: 20px; text-align: left;">
        <tr>
            <th style="width: 15%;">Module Code</th>
            <th style="width: 50%;">Module Name</th>
            <th style="width: 10%;">Credit</th>
            <th style="width: 25%;">Staff</th>
        </tr>
        <tr><td>MET05205</td><td>INTRODUCTION TO WELDING AND FOUNDRY TEHNOLOGIES</td><td>10T</td><td>Mr. MLACHA -MECH</td></tr>
        <tr><td>MET05206</td><td>MACHINE COMPONENT PRODUCTION</td><td>9T</td><td>Mr. ANDREW -MECH</td></tr>
        <tr><td>MET05207</td><td>FLUID MECHANICS AND FLUID POWER</td><td>10T</td><td>Mr. NESTORY -MECH</td></tr>
        <tr><td>MET05209</td><td>APPLIED THERMODYNAMICS</td><td>9T</td><td>Mr. NESTORY -MECH</td></tr>
        <tr><td>MET05211</td><td>METAL CUTTING PROCESSES</td><td>12P</td><td>Mr. MKAWE /Mr.ANDREW -MECH</td></tr>
        <tr><td>MET05212</td><td>INDUSTRIAL PRACTICAL TRAINING -II</td><td>10P</td><td></td></tr>
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
    
    // DIP_ME, Level 5, Semester 2
    const doc = {
        programType: "DIP_ME",
        levelNo: 5,
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
