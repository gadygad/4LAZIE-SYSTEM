const pdf = require('pdf-parse');
const fs = require('fs');

const pdfs = [
    { name: 'design_unit1', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\COURSE FOR DESIGN PROFESSIONAL\\CECS0004-COURSE FOR DESIGN PROFESSIONAL -UNIT-I.pdf' },
    { name: 'design_unit2', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\COURSE FOR DESIGN PROFESSIONAL\\CECS0004-COURSE FOR DESIGN PROFESSIONAL - UNIT-II.pdf' },
    { name: 'design_unit3', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\COURSE FOR DESIGN PROFESSIONAL\\CECS0004-COURSE FOR DESIGN PROFESSIONAL - UNIT-III.pdf' },
    { name: 'design_unit4', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\COURSE FOR DESIGN PROFESSIONAL\\CECS0004-COURSE FOR DESIGN PROFESSIONAL - UNIT - IV.pdf' },
    { name: 'design_unit5', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\COURSE FOR DESIGN PROFESSIONAL\\CECS0004-COURSE FOR DESIGN PROFESSIONAL - UNIT - V.pdf' },
];

async function extractAll() {
    for (const p of pdfs) {
        try {
            if (!fs.existsSync(p.path)) {
                console.log(`SKIP (not found): ${p.name}`);
                continue;
            }
            const buf = fs.readFileSync(p.path);
            const data = await pdf(buf);
            const outPath = `d:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\extracted_${p.name}.txt`;
            fs.writeFileSync(outPath, data.text, 'utf8');
            console.log(`OK: ${p.name} | Pages: ${data.numpages} | Chars: ${data.text.length}`);
        } catch(err) {
            console.error(`ERROR: ${p.name} => ${err.message}`);
        }
    }
    console.log("Extraction complete!");
}

extractAll();
