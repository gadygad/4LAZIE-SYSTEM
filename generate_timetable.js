const { MongoClient } = require('mongodb'); 
const htmlContent = `            <!-- HEADER -->
            <div class="doc-header">
                <h1>St. JOSEPH COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
                <h2>DEPARTMENT OF CIVIL ENGINEERING AND BUILT ENVIRONMENT</h2>
                <h3>THIRD YEAR (BATCH 18) SEMESTER II - DEGREE TIMETABLE APRIL 2026</h3>
                
                <div class="info-row">
                    <div>CLASS ADVISOR: MR PRABU</div>
                    <div>STRENGHT:122</div>
                </div>
                <div class="info-row" style="margin-top: 5px;">
                    <div>LECTURE HALL: 96</div>
                    <div></div>
                </div>
            </div>

            <!-- TIMETABLE GRID -->
            <table>
                <tr class="bg-header">
                    <th>HOUR</th>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th rowspan="7" class="break-col">B<br>R<br>E<br>A<br>K</th>
                    <th>4</th>
                    <th>5</th>
                    <th rowspan="7" class="break-col" style="background-color: #cccccc;">L<br>U<br>N<br>C<br>H<br><br>B<br>R<br>E<br>A<br>K</th>
                    <th>6</th>
                    <th>7</th>
                </tr>
                <tr class="bg-header">
                    <th>DAY/TIME</th>
                    <th>8.00AM<br>TO<br>8.55AM</th>
                    <th>8.55AM<br>TO<br>9.50AM</th>
                    <th>9.50AM<br>TO<br>10.45AM</th>
                    <th>11.00AM<br>TO<br>11.55AM</th>
                    <th>11.55AM<br>TO<br>12.45PM</th>
                    <th>1.45PM<br>TO<br>2.40PM</th>
                    <th>2.40PM<br>TO<br>3.35PM</th>
                </tr>
                <tr>
                    <td>MONDAY</td>
                    <td>ELCE00036</td>
                    <td colspan="2">CE3211</td>
                    <td colspan="2">ELCE00022</td>
                    <td colspan="2">CE3211</td>
                </tr>
                <tr>
                    <td>TUESDAY</td>
                    <td>CE3209</td>
                    <td>CE3208</td>
                    <td>CE3208</td>
                    <td>CE3208</td>
                    <td>CE3208</td>
                    <td colspan="2">CE3210</td>
                </tr>
                <tr>
                    <td>WEDNESDAY</td>
                    <td>ELCE00022</td>
                    <td colspan="2">CE3209</td>
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
                    <td>CE3208</td>
                    <td colspan="2">CE3210</td>
                    <td colspan="2">CE3211</td>
                    <td colspan="2">CE3210</td>
                </tr>
                <tr class="bg-header">
                    <th colspan="4">MODULE CODE & MODULE NAME</th>
                    <th colspan="6">MODULE TEACHER</th>
                </tr>
                <tr><td colspan="4" style="text-align:left; font-weight:bold;">CE3208 - STRUCTURAL ANALYSIS II (T)</td><td colspan="6">MR ALLEN</td></tr>
                <tr><td colspan="4" style="text-align:left; font-weight:bold;">CE3209 - DESIGN OF RC STRUCTURE (T)</td><td colspan="6">MR SANTHOSH</td></tr>
                <tr><td colspan="4" style="text-align:left; font-weight:bold;">CE3210 - ENVIRONMENT ENGINEERING II (T)</td><td colspan="6">MR PRABHU</td></tr>
                <tr><td colspan="4" style="text-align:left; font-weight:bold;">CE3211 - DESIGN OF STEEL STRUCTURE (T)</td><td colspan="6">MR SANTHOSH</td></tr>
                <tr><td colspan="4" style="text-align:left; font-weight:bold;">ELCE00022 - PAVEMENT ENGINEERING (T)</td><td colspan="6">PROF N. K. MUSHULE</td></tr>
                <tr><td colspan="4" style="text-align:left; font-weight:bold;">ELCE00036 - HYDROLOGY AND WATER RESOURCE ENG. (T)</td><td colspan="6">MRS DHIVYA</td></tr>
                <tr><td colspan="4" style="text-align:left; font-weight:bold;">CE3214 - ENVIRONMENTAL ENGINEERING LAB (P)</td><td colspan="6">Ms MODESTER</td></tr>
                <tr><td colspan="4" style="text-align:left; font-weight:bold;">CE3215 - STRUCTURAL DETAILING &amp; DRAWING LAB (P)</td><td colspan="6">MR JUMA</td></tr>
            </table>`;

async function run() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('school_db');
  
  await db.collection('timetables').updateOne(
    { programType: 'DEG_CE', levelNo: 3, semesterNo: 2, academicYear: '2025/2026' },
    { 
      $set: { 
        htmlContent: htmlContent,
        uploadDate: new Date(),
        _class: 'com.school.model.Timetable'
      }
    },
    { upsert: true }
  );
  
  console.log('Timetable saved.');
  await client.close();
}
run().catch(console.dir);
