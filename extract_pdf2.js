const { PDFParse } = require('pdf-parse');
const fs = require('fs');

const pdfPath = 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\Data Communication and Network-I.pdf';
const outPath = 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\pdf2_text.txt';

const dataBuffer = fs.readFileSync(pdfPath);

async function main() {
    try {
        const parser = new PDFParse({ verbosity: -1 });
        await parser.load(dataBuffer);
        
        let fullText = '';
        const numPages = parser.doc ? parser.doc.numPages : 0;
        console.log("Total pages:", numPages);
        
        for (let i = 1; i <= numPages; i++) {
            const pageText = await parser.getPageText(i);
            fullText += pageText + '\n\n';
            process.stdout.write(`\rExtracting page ${i}/${numPages}...`);
        }
        
        fs.writeFileSync(outPath, fullText, 'utf8');
        console.log("\nDone! Characters:", fullText.length);
    } catch(err) {
        console.error("Error:", err.message);
        console.error(err.stack);
    }
}

main();
