const { MongoClient } = require('mongodb');

async function run() {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    await client.connect();
    const db = client.db('school_db');
    const collection = db.collection('timetables');
    
    // Check if it already exists
    const query = {
        programType: 'DEG_CE',
        levelNo: 3,
        semesterNo: 2
    };
    
    const htmlContent = `
    <div style="font-family: 'Outfit', sans-serif; padding: 20px; background: #ffffff; color: #1e293b; max-width: 1000px; margin: auto; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);">
        <!-- HEADER -->
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 2px solid #10b981; padding-bottom: 15px;">
            <h1 style="font-size: 1.5rem; font-weight: 800; color: #0f172a; margin: 0 0 5px 0;">St. JOSEPH COLLEGE OF ENGINEERING AND TECHNOLOGY</h1>
            <h2 style="font-size: 1.1rem; font-weight: 700; color: #059669; margin: 0 0 5px 0;">DEPARTMENT OF CIVIL ENGINEERING AND BUILT ENVIRONMENT</h2>
            <h3 style="font-size: 0.95rem; font-weight: 600; color: #475569; margin: 0;">THIRD YEAR (BATCH 18) SEMESTER II - DEGREE TIMETABLE APRIL 2026</h3>
            
            <div style="display: flex; justify-content: space-between; margin-top: 15px; font-size: 0.85rem; font-weight: 700; background: #f8fafc; padding: 10px 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
                <div>CLASS ADVISOR: MR PRABU</div>
                <div>STRENGTH: 122</div>
                <div>LECTURE HALL: 96</div>
            </div>
        </div>

        <!-- TIMETABLE GRID -->
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; text-align: center; font-size: 0.85rem;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #cbd5e1; background: #0f172a; color: #fff; padding: 10px;">HOUR</th>
                        <th style="border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;">1</th>
                        <th style="border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;">2</th>
                        <th style="border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;">3</th>
                        <th rowspan="7" style="border: 1px solid #cbd5e1; background: #f1f5f9; color: #0f172a; padding: 10px; width: 40px; font-weight: 800; text-orientation: upright; writing-mode: vertical-rl;">B<br>R<br>E<br>A<br>K</th>
                        <th style="border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;">4</th>
                        <th style="border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;">5</th>
                        <th rowspan="7" style="border: 1px solid #cbd5e1; background: #f1f5f9; color: #0f172a; padding: 10px; width: 40px; font-weight: 800; text-orientation: upright; writing-mode: vertical-rl;">L<br>U<br>N<br>C<br>H</th>
                        <th style="border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;">6</th>
                        <th style="border: 1px solid #cbd5e1; background: #1e293b; color: #fff; padding: 10px;">7</th>
                    </tr>
                    <tr>
                        <th style="border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px;">DAY/TIME</th>
                        <th style="border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;">8.00AM<br>TO<br>8.55AM</th>
                        <th style="border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;">8.55AM<br>TO<br>9.50AM</th>
                        <th style="border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;">9.50AM<br>TO<br>10.45AM</th>
                        <th style="border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;">11.00AM<br>TO<br>11.55AM</th>
                        <th style="border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;">11.55AM<br>TO<br>12.45PM</th>
                        <th style="border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;">1.45PM<br>TO<br>2.40PM</th>
                        <th style="border: 1px solid #cbd5e1; background: #f8fafc; color: #0f172a; padding: 8px; font-size: 0.75rem;">2.40PM<br>TO<br>3.35PM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;">MONDAY</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);">ELCE00036</td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3211</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);">ELCE00022</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3211</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;">TUESDAY</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3209</td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3208</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);">CE3208</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3210</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;">WEDNESDAY</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);">ELCE00022</td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3209</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);">ELCE00036</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; background: #fef3c7; color: #d97706;">CE3214/CE3215 P</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;">THURSDAY</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);">ELCE00036</td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">ELCE00022</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3209</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; background: #fef3c7; color: #d97706;">CE3214/CE3215 P</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #cbd5e1; background: #10b981; color: white; font-weight: bold; padding: 10px;">FRIDAY</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3208</td>
                        <td style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3210</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600; color: #059669; background: rgba(16, 185, 129, 0.05);">CE3211</td>
                        <td colspan="2" style="border: 1px solid #cbd5e1; padding: 10px; font-weight: 600;">CE3210</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- MODULES LIST -->
        <div style="margin-top: 20px; overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; border: 1px solid #cbd5e1;">
                <thead>
                    <tr>
                        <th style="border: 1px solid #cbd5e1; background: #0f172a; color: white; padding: 10px;">MODULE CODE</th>
                        <th style="border: 1px solid #cbd5e1; background: #0f172a; color: white; padding: 10px;">MODULE NAME</th>
                        <th style="border: 1px solid #cbd5e1; background: #0f172a; color: white; padding: 10px;">MODULE TEACHER</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;">CE3208</td><td style="border: 1px solid #cbd5e1; padding: 8px;">STRUCTURAL ANALYSIS II (T)</td><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;">MR ALLEN</td></tr>
                    <tr style="background: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;">CE3209</td><td style="border: 1px solid #cbd5e1; padding: 8px;">DESIGN OF RC STRUCTURE (T)</td><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;">MR SANTHOSH</td></tr>
                    <tr><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;">CE3210</td><td style="border: 1px solid #cbd5e1; padding: 8px;">ENVIRONMENT ENGINEERING II (T)</td><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;">MR PRABHU</td></tr>
                    <tr style="background: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;">CE3211</td><td style="border: 1px solid #cbd5e1; padding: 8px;">DESIGN OF STEEL STRUCTURE (T)</td><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;">MR SANTHOSH</td></tr>
                    <tr><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;">ELCE00022</td><td style="border: 1px solid #cbd5e1; padding: 8px;">PAVEMENT ENGINEERING (T)</td><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;">PROF N. K. MUSHULE</td></tr>
                    <tr style="background: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;">ELCE00036</td><td style="border: 1px solid #cbd5e1; padding: 8px;">HYDROLOGY AND WATER RESOURCE ENG. (T)</td><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;">MRS DHIVYA</td></tr>
                    <tr><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;">CE3214</td><td style="border: 1px solid #cbd5e1; padding: 8px;">ENVIRONMENTAL ENGINEERING LAB (P)</td><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;">Ms MODESTER</td></tr>
                    <tr style="background: #f8fafc;"><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: bold; color: #059669;">CE3215</td><td style="border: 1px solid #cbd5e1; padding: 8px;">STRUCTURAL DETAILING & DRAWING LAB (P)</td><td style="border: 1px solid #cbd5e1; padding: 8px; font-weight: 600;">MR JUMA</td></tr>
                </tbody>
            </table>
        </div>
    </div>
    `;

    const newDoc = {
        programType: 'DEG_CE',
        levelNo: 3,
        semesterNo: 2,
        academicYear: '2025/2026',
        htmlContent: htmlContent,
        uploadDate: new Date(),
        _class: "com.school.model.Timetable"
    };

    const existing = await collection.findOne(query);
    if (existing) {
        await collection.updateOne(query, { $set: newDoc });
        console.log("Timetable updated.");
    } else {
        await collection.insertOne(newDoc);
        console.log("Timetable inserted.");
    }

    await client.close();
}

run().catch(console.dir);
