const fs = require('fs');
const path = require('path');

const files = [
    'cat1_past_papers.html',
    'cat2_past_papers.html',
    'assignments_past_papers.html',
    'ue_past_papers.html',
    'projects_past_papers.html'
];
const base_dir = path.join('d:', '4LAZIE', 'src', 'main', 'resources', 'templates');

files.forEach(filename => {
    const filepath = path.join(base_dir, filename);
    let content = fs.readFileSync(filepath, 'utf8');
    
    // The broken code looks like:
    //                 courseList.appendChild(item);
    //             });
    //         });
    //         }
    // 
    //         
    //         updateCourses();
    
    // We want to replace `});\n        }\n\n        \n        updateCourses();`
    // Let's use a regex that matches `});\n        }` if it is followed by `updateCourses();`
    content = content.replace(/\}\);\s*\n\s*\}\s*\n\s*updateCourses\(\);/, '}\n\n        updateCourses();');
    
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Fixed ${filename}`);
});
