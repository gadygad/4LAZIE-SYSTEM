const { MongoClient } = require('mongodb');

async function updateTimetable() {
    const client = new MongoClient('mongodb://localhost:27017');
    try {
        await client.connect();
        const db = client.db('school_db');
        const coll = db.collection('timetables');
        
        const html = `<div style="font-family: Arial, sans-serif; padding: 20px; background: #ffffff; color: #000; max-width: 1000px; margin: auto;">
        <!-- HEADER -->
        <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-size: 1.4rem; font-weight: bold; color: #000; margin: 0 0 5px 0;">ST. JOSEPH COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
            <h2 style="font-size: 1.1rem; font-weight: bold; color: #000; margin: 0 0 5px 0;">DEPARTMENT OF CIVIL ENGINEERING AND BUILT ENVIRONMENT</h2>
            <h3 style="font-size: 1rem; font-weight: bold; color: #000; margin: 0;">THIRD YEAR (BATCH 18) SEMESTER II - DEGREE TIMETABLE APRIL 2026</h3>
            <div style="display: flex; justify-content: space-between; margin-top: 20px; font-size: 0.9rem; font-weight: bold;">
                <div>CLASS ADVISOR: MR PRABU</div>
                <div>STRENGTH: 122</div>
                <div>LECTURE HALL: 96</div>
            </div>
        </div>
        <!-- TIMETABLE GRID -->
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 0.85rem; border: 2px solid #000;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 10px;">HOUR</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 10px;">1</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 10px;">2</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 10px;">3</th>
                        <th rowspan="7" style="border: 1px solid #000; background: #a3a3a3; padding: 10px; width: 40px; font-weight: bold; line-height: 1.5; text-align: center;">B<br>R<br>E<br>A<br>K</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 10px;">4</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 10px;">5</th>
                        <th rowspan="7" style="border: 1px solid #000; background: #a3a3a3; padding: 10px; width: 40px; font-weight: bold; line-height: 1.5; text-align: center;">L<br>U<br>N<br>C<br>H<br><br>B<br>R<br>E<br>A<br>K</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 10px;">6</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 10px;">7</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 8px;">DAY/TIME</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 8px; font-size: 0.75rem;">8.00AM<br>TO<br>8.55AM</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 8px; font-size: 0.75rem;">8.55AM<br>TO<br>9.50AM</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 8px; font-size: 0.75rem;">9.50AM<br>TO<br>10.45AM</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 8px; font-size: 0.75rem;">11.00AM<br>TO<br>11.55AM</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 8px; font-size: 0.75rem;">11.55AM<br>TO<br>12.45PM</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 8px; font-size: 0.75rem;">1.45PM<br>TO<br>2.40PM</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; padding: 8px; font-size: 0.75rem;">2.40PM<br>TO<br>3.35PM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">MONDAY</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00036</td>
                        <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3211</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00022</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3211</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">TUESDAY</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3209</td>
                        <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3208</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3208</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3210</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">WEDNESDAY</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00022</td>
                        <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3209</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00036</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3214/CE3215 P</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">THURSDAY</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00036</td>
                        <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">ELCE00022</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3209</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3214/CE3215 P</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #000; font-weight: bold; padding: 10px;">FRIDAY</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3208</td>
                        <td style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3210</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3211</td>
                        <td colspan="2" style="border: 1px solid #000; padding: 10px; font-weight: bold;">CE3210</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- MODULES LIST -->
        <div style="margin-top: 0; overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; border: 2px solid #000; border-top: none;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #000; background: #e2e8f0; color: #000; padding: 10px;">MODULE CODE & MODULE NAME</th>
                        <th style="border: 1px solid #000; background: #e2e8f0; color: #000; padding: 10px;">MODULE TEACHER</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">CE3208 - STRUCTURAL ANALYSIS II (T)</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MR ALLEN</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">CE3209 - DESIGN OF RC STRUCTURE (T)</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MR SANTHOSH</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">CE3210 - ENVIRONMENT ENGINEERING II (T)</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MR PRABHU</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">CE3211 - DESIGN OF STEEL STRUCTURE (T)</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MR SANTHOSH</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">ELCE00022 - PAVEMENT ENGINEERING (T)</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">PROF N. K. MUSHULE</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">ELCE00036 - HYDROLOGY AND WATER RESOURCE ENG. (T)</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MRS DHIVYA</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">CE3214 - ENVIRONMENTAL ENGINEERING LAB (P)</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">Ms MODESTER</td></tr>
                    <tr><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: left;">CE3215 - STRUCTURAL DETAILING & DRAWING LAB (P)</td><td style="border: 1px solid #000; padding: 8px; font-weight: bold; text-align: center;">MR JUMA</td></tr>
                </tbody>
            </table>
        </div>
    </div>`;

        await coll.updateMany({ programType: "DEG_CE" }, { $set: { htmlContent: html } });
        console.log(`Updated timetables.`);
    } finally {
        await client.close();
    }
}
updateTimetable().catch(console.error);
