const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\DATA COMMUNICATION\\DATA COMM.pdf';
const outPath = 'd:\\4LAZIE SYSTEM\\4LAZIE\\4LAZIE-SYSTEM\\data_comm_extracted.txt';

let dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync(outPath, data.text);
    console.log("Extraction complete. Total pages:", data.numpages);
}).catch(err => {
    console.error("Error reading PDF:", err);
});
