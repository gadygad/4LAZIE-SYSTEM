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
        <h3>THIRD YEAR (BATCH 18) SEMESTER II - DEGREE TIMETABLE APRIL 2026</h3>
        
        <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 15px; font-size: 14px;">
            <div>CLASS ADVISOR: MR PRABU</div>
            <div>STRENGHT: 122</div>
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
            <td colspan="2">ELCE00036</td>
            <td>CE3211</td>
            <td colspan="2">ELCE00022</td>
            <td colspan="2">CE3211</td>
        </tr>
        <tr>
            <td>TUESDAY</td>
            <td colspan="2">CE3209</td>
            <td>CE3208</td>
            <td colspan="2">CE3208</td>
            <td colspan="2">CE3210</td>
        </tr>
        <tr>
            <td>WEDNESDAY</td>
            <td colspan="2">ELCE00022</td>
            <td>CE3209</td>
            <td colspan="2">ELCE00036</td>
            <td colspan="2">CE3214/CE3215 P</td>
        </tr>
        <tr>
            <td>THURSDAY</td>
            <td colspan="2">ELCE00036</td>
            <td>ELCE00022</td>
            <td colspan="2">CE3209</td>
            <td colspan="2">CE3214/CE3215 P</td>
        </tr>
        <tr>
            <td>FRIDAY</td>
            <td colspan="2">CE3208</td>
            <td>CE3210</td>
            <td colspan="2">CE3211</td>
            <td colspan="2">CE3210</td>
        </tr>
    </table>

    <table style="margin-top: 20px; text-align: left;">
        <tr>
            <th style="width: 20%; background-color: #e0e0e0 !important;">MODULE CODE</th>
            <th style="width: 50%; background-color: #e0e0e0 !important;">MODULE NAME</th>
            <th style="width: 30%; background-color: #e0e0e0 !important;">MODULE TEACHER</th>
        </tr>
        <tr><td>CE3208</td><td>STRUCTURAL ANALYSIS II (T)</td><td>MR ALLEN</td></tr>
        <tr><td>CE3209</td><td>DESIGN OF RC STRUCTURE (T)</td><td>MR SANTHOSH</td></tr>
        <tr><td>CE3210</td><td>ENVIRONMENT ENGINEERING II (T)</td><td>MR PRABHU</td></tr>
        <tr><td>CE3211</td><td>DESIGN OF STEEL STRUCTURE (T)</td><td>MR SANTHOSH</td></tr>
        <tr><td>ELCE00022</td><td>PAVEMENT ENGINEERING (T)</td><td>PROF N. K. MUSHULE</td></tr>
        <tr><td>ELCE00036</td><td>HYDROLOGY AND WATER RESOURCE ENG. (T)</td><td>MRS DHIVYA</td></tr>
        <tr><td>CE3214</td><td>ENVIRONMENTAL ENGINEERING LAB (P)</td><td>Ms MODESTER</td></tr>
        <tr><td>CE3215</td><td>STRUCTURAL DETAILING & DRAWING LAB (P)</td><td>MR JUMA</td></tr>
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
    
    // DEG_CE, Year 3, Semester 2
    const doc = {
        programType: "DEG_CE",
        levelNo: 3,
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
