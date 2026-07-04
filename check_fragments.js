const fs = require('fs');
const html = fs.readFileSync('src/main/resources/templates/fragments/sjuit_components.html', 'utf8');

const fragments = ['premium_sidebar', 'restricted_modal', 'preview_modal'];

for (const frag of fragments) {
    const startIndex = html.indexOf('<div th:fragment="' + frag + '"');
    if (startIndex === -1) {
        console.log(frag, 'not found');
        continue;
    }
    const endStr = '<!-- Close th:fragment="' + frag + '" -->';
    let endIndex = html.indexOf(endStr);
    if (endIndex === -1) {
        // If there's no explicit close comment, just find the next fragment or EOF
        const nextFrag = html.indexOf('<div th:fragment', startIndex + 1);
        endIndex = nextFrag !== -1 ? nextFrag : html.length;
    } else {
        endIndex += endStr.length;
    }
    
    const fragment = html.substring(startIndex, endIndex);
    const starts = (fragment.match(/<div(?=[\s>])/g) || []).length;
    const ends = (fragment.match(/<\/div>/g) || []).length;
    
    console.log(`Fragment ${frag}: div starts: ${starts}, div ends: ${ends}, unclosed: ${starts - ends}`);
}
