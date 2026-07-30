const fs = require('fs');
const pdf = require('pdf-parse');
const axios = require('axios');

const url = "https://res.cloudinary.com/dc56iz9tc/raw/upload/v1783261411/07073f00-f37e-4747-ac70-eada02aa5866.pdf";

async function readPdf() {
    try {
        console.log("Downloading PDF...");
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        console.log("Parsing PDF...");
        const data = await pdf(buffer);
        console.log("--- PDF CONTENT ---");
        console.log(data.text);
    } catch(err) {
        console.error("Error:", err);
    }
}
readPdf();
