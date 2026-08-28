const fs = require('fs');
const pdf = require('pdf-parse');
async function readLocalPdf() {
    try {
        const dataBuffer = fs.readFileSync("/home/careen/NOTES2/SEMESTER 4/COMPUTER NETWORK/Unit 1 Network.pdf");
        const data = await pdf(dataBuffer);
        fs.writeFileSync("cn_unit1.txt", data.text);
        console.log("PDF parsed and saved to cn_unit1.txt. Total characters: " + data.text.length);
    } catch(err) {
        console.error("Error:", err);
    }
}
readLocalPdf();
