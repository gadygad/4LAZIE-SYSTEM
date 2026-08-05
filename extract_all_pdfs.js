const pdf = require('pdf-parse');
const fs = require('fs');

// Extract all PDFs
const pdfs = [
    { name: 'pdf1', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\DATA COMM.pdf' },
    { name: 'pdf2', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\Data Communication and Network-I.pdf' },
    { name: 'pdf3', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\DATA COMMUNICATION UNIT II.pdf' },
    { name: 'pdf4', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\UNIT 2 DATA LINK LAYER.pdf' },
    { name: 'pdf5', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\DATA LINK LAYER.pdf' },
    { name: 'pdf6', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\DATA LINK LAYER 2.pdf' },
    { name: 'pdf7', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\DATA COMMUNICATION-III NEW.pdf' },
    { name: 'pdf8', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\NETWORK LAYER.pdf' },
    { name: 'pdf9', path: 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\NETWORK LAYER unit IV.pdf' },
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
    console.log("All done!");
}

extractAll();
