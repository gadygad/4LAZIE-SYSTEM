const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 8080;

const baseDir = path.join(__dirname, 'src', 'main', 'resources');

// Serve static files from static directory as root
app.use(express.static(path.join(baseDir, 'static')));

// Serve templates
app.use((req, res) => {
    let urlPath = req.path;
    if (urlPath === '/') urlPath = '/home';
    
    // Check if the html file exists in templates
    let htmlPath = path.join(baseDir, 'templates', urlPath + '.html');
    if (!fs.existsSync(htmlPath)) {
        htmlPath = path.join(baseDir, 'templates', urlPath);
    }
    
    if (fs.existsSync(htmlPath) && fs.statSync(htmlPath).isFile()) {
        // Read file and do a very basic replacement of th:href to href and th:src to src
        let content = fs.readFileSync(htmlPath, 'utf8');
        content = content.replace(/th:href="@\{([^}]+)\}"/g, 'href="$1"');
        content = content.replace(/th:src="@\{([^}]+)\}"/g, 'src="$1"');
        content = content.replace(/th:replace="~\{([^ ]+) :: ([^}]+)\}"/g, (match, fragPath, fragName) => {
             // Try to inline the fragment loosely for preview
             let fragFile = path.join(baseDir, 'templates', fragPath + '.html');
             if(fs.existsSync(fragFile)) {
                 return fs.readFileSync(fragFile, 'utf8'); // Injects entire fragment file
             }
             return match;
        });
        res.send(content);
    } else {
        res.status(404).send('Page not found for frontend preview.');
    }
});

app.listen(PORT, () => {
    console.log(`Frontend Preview Server running at http://localhost:${PORT}`);
});
