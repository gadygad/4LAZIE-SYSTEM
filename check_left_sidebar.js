const fs = require('fs');
const html = fs.readFileSync('src/main/resources/templates/fragments/sjuit_components.html', 'utf8');

const startIndex = html.indexOf('<div th:fragment="left_sidebar"');
const endStr = '<!-- Close th:fragment="left_sidebar" -->';
let endIndex = html.indexOf(endStr);
if (endIndex === -1) {
    const nextFrag = html.indexOf('<div th:fragment', startIndex + 1);
    endIndex = nextFrag !== -1 ? nextFrag : html.length;
} else {
    endIndex += endStr.length;
}

const fragment = html.substring(startIndex, endIndex);
const starts = (fragment.match(/<div(?=[\s>])/g) || []).length;
const ends = (fragment.match(/<\/div>/g) || []).length;

console.log(`Fragment left_sidebar: div starts: ${starts}, div ends: ${ends}, unclosed: ${starts - ends}`);
