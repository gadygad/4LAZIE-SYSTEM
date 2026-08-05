const fs = require('fs');
let file = 'src/main/resources/templates/public/home.html';
let content = fs.readFileSync(file, 'utf8');

let pos = 0;
while (true) {
    let idx = content.indexOf('premium-glass-card', pos);
    if (idx === -1) break;
    console.log(`Found 'premium-glass-card' at char ${idx}:`);
    console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 150)));
    console.log('--------------------------------------------------');
    pos = idx + 1;
}
