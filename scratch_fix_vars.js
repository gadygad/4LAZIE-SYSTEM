const fs = require('fs');
const path = require('path');

const files = [
    { name: 'cat1_past_papers.html', prefix: 'cat1' },
    { name: 'cat2_past_papers.html', prefix: 'cat2' },
    { name: 'assignments_past_papers.html', prefix: 'assignment' },
    { name: 'ue_past_papers.html', prefix: 'ue' },
    { name: 'projects_past_papers.html', prefix: 'project' }
];

const base_dir = path.join('d:', '4LAZIE', 'src', 'main', 'resources', 'templates');

files.forEach(fileInfo => {
    const filepath = path.join(base_dir, fileInfo.name);
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Fix 1: Remove const programSelect = document.getElementById('{prefix}Program');
    // Because the id is gone (we changed it to radio inputs), so this throws an error.
    content = content.replace(new RegExp(`const programSelect = document.getElementById\\('${fileInfo.prefix}Program'\\);`, 'g'), '');
    
    // Fix 2: Change if (programSelect.value === 'DIPLOMA') to use the radio button value
    content = content.replace(/if \((?:programSelect\.value|program) === 'DIPLOMA'\) \{/, `
                const progValue = document.querySelector('input[name="${fileInfo.prefix}Program"]:checked').value;
                if (progValue === 'DIPLOMA') {`);
    
    // Fix 3: In projects_past_papers, if it doesn't have level, we should not fail. But let's just make sure.
    // Also change `if(programSelect.value === 'DIPLOMA')` in projects if it exists.
    content = content.replace(/if \(programSelect\.value === 'DIPLOMA'\) \{/, `
                const progValue = document.querySelector('input[name="${fileInfo.prefix}Program"]:checked').value;
                if (progValue === 'DIPLOMA') {`);

    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed JS references in ${fileInfo.name}`);
});
