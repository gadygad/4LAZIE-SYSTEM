const fs = require('fs');
const html = fs.readFileSync('src/main/resources/templates/fragments/sjuit_components.html', 'utf8');

const fragment = html.substring(
    html.indexOf('<div th:fragment="notes_accordion"'), 
    html.indexOf('<!-- Close th:fragment="notes_accordion" -->') + 46
);

const starts = (fragment.match(/<div(?=[\s>])/g) || []).length;
const ends = (fragment.match(/<\/div>/g) || []).length;

console.log('Fragment div starts:', starts);
console.log('Fragment div ends:', ends);
