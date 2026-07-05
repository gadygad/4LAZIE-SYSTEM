const html = `<div style="font-family: Arial, sans-serif; padding: 20px; background: #ffffff; color: #000; max-width: 1000px; margin: auto;">
        <!-- HEADER -->
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 1.4rem; font-weight: bold; color: #000; margin: 0 0 5px 0;">St. JOSEPH COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
            <h2 style="font-size: 1.1rem; font-weight: bold; color: #000; margin: 0 0 5px 0;">DEPARTMENT OF CIVIL ENGINEERING AND BUILT ENVIRONMENT</h2>
            <h3 style="font-size: 1rem; font-weight: bold; color: #000; margin: 0;">FOURTH YEAR SEMESTER I - DEGREE BATCH - 17 TIMETABLE NOVEMBER 2025</h3>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.95rem; font-weight: bold; margin-bottom: 5px;">
            <div>CLASS ADVISOR: MR.NGWANDIRA</div>
            <div>STRENGTH: 142</div>
        </div>
        <div style="font-size: 0.95rem; font-weight: bold; margin-bottom: 15px; text-align: left;">
            LECTURE HALL: 96
        </div>
        <!-- TIMETABLE GRID -->
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 0.85rem; border: 2px solid #000;">
                <tr>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 10px;">HOUR</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 10px;">1</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 10px;">2</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 10px;">3</th>
                    <th rowspan="7" style="border: 1px solid #000; background: #e5e7eb; padding: 10px; width: 40px; font-weight: bold; line-height: 1.5; text-align: center; vertical-align: middle;">B<br>R<br>E<br>A<br>K</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 10px;">4</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 10px;">5</th>
                    <th rowspan="7" style="border: 1px solid #000; background: #e5e7eb; padding: 10px; width: 40px; font-weight: bold; line-height: 1.5; text-align: center; vertical-align: middle;">L<br>U<br>N<br>C<br>H<br><br>B<br>R<br>E<br>A<br>K</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 10px;">6</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 10px;">7</th>
                </tr>
                <tr>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 8px;">DAY/TIME</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 8px; font-size: 0.75rem;">8.00AM<br>TO<br>8.55AM</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 8px; font-size: 0.75rem;">8.55 AM<br>TO<br>9.50AM</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 8px; font-size: 0.75rem;">9.50 AM<br>TO<br>10.45AM</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 8px; font-size: 0.75rem;">11.00 AM<br>TO<br>11.55AM</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 8px; font-size: 0.75rem;">11.55 AM<br>TO<br>12.45PM</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 8px; font-size: 0.75rem;">1.45 PM<br>TO<br>2.40PM</th>
                    <th style="border: 1px solid #000; background: #e8f0fe; padding: 8px; font-size: 0.75rem;">2.40PM<br>TO<br>3.35PM</th>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">MONDAY</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE4102</td>
                    <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00021</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00016</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">PJCE4106</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">TUESDAY</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00021</td>
                    <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE4105 (P)</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE4105 (P)</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">PJCE4106</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">WEDNESDAY</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00021</td>
                    <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00016</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">PJCE4106</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">PJCE4106</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">THURSDAY</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE4102</td>
                    <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">PJCE4106</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE4105 (P)</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00016</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">FRIDAY</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">PJCE4106</td>
                    <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">MG4101</td>
                    <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">MG4101</td>
                    <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">PJCE4106</td>
                    <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">PJCE4106</td>
                </tr>
            </table>
        </div>
        <!-- MODULES LIST -->
        <div style="margin-top: 0; overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; border: 2px solid #000; border-top: none;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #000; background: #e8f0fe; color: #000; padding: 10px;">MODULE<br>CODE</th>
                        <th style="border: 1px solid #000; background: #e8f0fe; color: #000; padding: 10px;">MODULE NAME</th>
                        <th style="border: 1px solid #000; background: #e8f0fe; color: #000; padding: 10px;">MODULE TEACHER</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MG4101</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">PRINCIPLES OF MANAGEMENT AND PROFFESIONAL ETHICS</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MR VALERIAN</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">CE4102</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">QUANTITY SURVEYING AND VALUATION</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MR KOMBE</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">ELCE00016</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">REPAIR AND REHABILITATION OF STRUCTURES</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">DR RWANDALLAH</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">ELCE00021</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">ENVIRONMENTAL IMPACT ASSESSMENT</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MRS DHIVYA</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">CE4105</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">COMPUTER AIDED STRUCTURAL ANALYSIS LAB (P)</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MR JUMA</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">PJCE4106</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">Project Work Phase I & Viva Voce</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">DR RWANDALLAH / MR<br>KOMBE / MR ALLEN</td></tr>
                </tbody>
            </table>
        </div>
    </div>`;
const fs = require('fs');
const { MongoClient } = require('mongodb');
async function updateTimetable() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('school_db');
        const coll = db.collection('timetables');
        
        await coll.updateOne(
            { programType: "DEG_CE", levelNo: 4, semesterNo: 1 },
            { $set: { htmlContent: html } },
            { upsert: true }
        );
        console.log(`Inserted/Updated timetable for DEG_CE Level 4 Sem 1.`);
    } finally {
        await client.close();
    }
}
updateTimetable().catch(console.error);
